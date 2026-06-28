#!/usr/bin/env bash
set -Eeuo pipefail

MAX_IMAGE_KB="${MAX_IMAGE_KB:-50}"
MAX_VIDEO_KB="${MAX_VIDEO_KB:-200}"
IMG_MAX_BYTES=$((MAX_IMAGE_KB * 1024))
VID_MAX_BYTES=$((MAX_VIDEO_KB * 1024))
DEFAULT_OUT_DIR="${DEFAULT_OUT_DIR:-./optimized_media}"
DEFAULT_JOBS="${DEFAULT_JOBS:-$(nproc)}"

show_help() {
  cat <<'HELP'
Usage:
  ./optimize_media_v3.sh [options] <file_or_dir> [more_files_or_dirs...]

Options:
  -o, --out DIR        Dossier de sortie (défaut: ./optimized_media)
  -j, --jobs N         Nombre de workers (défaut: nproc)
  --img-kb N           Limite image en Ko (défaut: 50)
  --vid-kb N           Limite vidéo en Ko (défaut: 200)
  -h, --help           Afficher cette aide

Exemples:
  ./optimize_media_v3.sh ./photos
  ./optimize_media_v3.sh -o ./out -j 6 ./photos ./video.mp4 ./dossier2
  ./optimize_media_v3.sh --img-kb 40 --vid-kb 180 img1.jpg img2.png clip.mp4

Dépendances:
  ffmpeg, ffprobe, magick, parallel
HELP
}

have() { command -v "$1" >/dev/null 2>&1; }
ts() { date '+%H:%M:%S'; }
log() { printf '[%s] %s\n' "$(ts)" "$*"; }
fsize() { stat -c%s "$1" 2>/dev/null || echo 0; }
lower_ext() { local x="${1##*.}"; printf '%s' "${x,,}"; }

require_cmds() {
  local missing=0
  for cmd in ffmpeg ffprobe magick parallel; do
    if ! have "$cmd"; then
      echo "Commande manquante: $cmd" >&2
      missing=1
    fi
  done
  (( missing == 0 )) || exit 1
}

is_image() {
  case "$(lower_ext "$1")" in
    jpg|jpeg|png|webp|heic) return 0 ;;
    *) return 1 ;;
  esac
}

is_video() {
  case "$(lower_ext "$1")" in
    mp4|mov|mkv|avi|webm|m4v) return 0 ;;
    *) return 1 ;;
  esac
}

declare -a INPUTS=()
OUT_DIR="$DEFAULT_OUT_DIR"
JOBS="$DEFAULT_JOBS"

while (($#)); do
  case "$1" in
    -o|--out)
      OUT_DIR="$2"
      shift 2
      ;;
    -j|--jobs)
      JOBS="$2"
      shift 2
      ;;
    --img-kb)
      MAX_IMAGE_KB="$2"
      IMG_MAX_BYTES=$((MAX_IMAGE_KB * 1024))
      shift 2
      ;;
    --vid-kb)
      MAX_VIDEO_KB="$2"
      VID_MAX_BYTES=$((MAX_VIDEO_KB * 1024))
      shift 2
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    --)
      shift
      while (($#)); do INPUTS+=("$1"); shift; done
      ;;
    -*)
      echo "Option inconnue: $1" >&2
      exit 1
      ;;
    *)
      INPUTS+=("$1")
      shift
      ;;
  esac
done

if ((${#INPUTS[@]} == 0)); then
  show_help
  exit 1
fi

mkdir -p "$OUT_DIR" "$OUT_DIR/failed"
LOG="$OUT_DIR/run_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

WORK_DIR=$(mktemp -d)
CNT_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR" "$CNT_DIR"' EXIT

ok_inc() { touch "$CNT_DIR/ok_$$_$RANDOM"; }
warn_inc() { touch "$CNT_DIR/warn_$$_$RANDOM"; }

compress_image() {
  local in="$1"
  local base stem out tmp size best_tmp="" best_size=999999999
  base=$(basename "$in")
  stem="${base%.*}"
  out="$OUT_DIR/${stem}.jpg"
  tmp="$WORK_DIR/${stem}_$$_tmp.jpg"

  if [[ -f "$out" ]]; then
    size=$(fsize "$out")
    if (( size <= IMG_MAX_BYTES )); then
      log "IMG SKIP | $base"
      ok_inc
      return 0
    fi
  fi

  local -a widths=(1280 960 800 640 480 320)
  local -a qualities=(82 72 62 52 42 32 24 16 10)

  for w in "${widths[@]}"; do
    for q in "${qualities[@]}"; do
      magick "$in" \
        -auto-orient -strip \
        -resize "${w}x${w}>" \
        -sampling-factor 4:2:0 \
        -interlace Plane \
        -quality "$q" \
        "$tmp" 2>/dev/null || continue

      [[ -f "$tmp" ]] || continue
      size=$(fsize "$tmp")

      if (( size <= IMG_MAX_BYTES )); then
        mv -f "$tmp" "$out"
        log "IMG OK   | $base -> $(basename "$out") | ${size}B"
        ok_inc
        return 0
      fi

      if (( size < best_size )); then
        best_size=$size
        best_tmp="$WORK_DIR/${stem}_$$_best.jpg"
        cp -f "$tmp" "$best_tmp"
      fi
      rm -f "$tmp"
    done
  done

  if [[ -n "$best_tmp" && -f "$best_tmp" ]]; then
    mv -f "$best_tmp" "$out"
    log "IMG WARN | $base -> $(basename "$out") | ${best_size}B"
    warn_inc
    return 1
  fi

  cp -f "$in" "$OUT_DIR/failed/$base"
  log "IMG FAIL | $base"
  warn_inc
  return 1
}

video_duration() {
  ffprobe -v error \
    -show_entries format=duration \
    -of default=noprint_wrappers=1:nokey=1 \
    "$1" 2>/dev/null | awk '{printf "%d", ($1 < 1 ? 1 : $1)}'
}

compress_video() {
  local in="$1"
  local base stem out tmp tmp2 dur budget vbr size
  base=$(basename "$in")
  stem="${base%.*}"
  out="$OUT_DIR/${stem}.mp4"
  tmp="$WORK_DIR/${stem}_$$_tmp.mp4"
  tmp2="$WORK_DIR/${stem}_$$_tmp2.mp4"

  if [[ -f "$out" ]]; then
    size=$(fsize "$out")
    if (( size <= VID_MAX_BYTES )); then
      log "VID SKIP | $base"
      ok_inc
      return 0
    fi
  fi

  dur=$(video_duration "$in")
  budget=$(( (VID_MAX_BYTES * 8) / dur ))
  vbr=$(( budget - 4000 ))
  (( vbr < 12000 )) && vbr=12000

  ffmpeg -y -v error -i "$in" \
    -map 0:v:0 -an \
    -vf "scale='min(480,iw)':-2:force_original_aspect_ratio=decrease,fps=15,format=yuv420p" \
    -c:v libx264 -preset fast -profile:v baseline -level 3.0 -pix_fmt yuv420p \
    -b:v "$vbr" -maxrate "$((vbr * 2))" -bufsize "$((vbr * 4))" \
    -movflags +faststart \
    "$tmp" </dev/null >/dev/null 2>&1 || true

  if [[ ! -f "$tmp" ]] || (( $(fsize "$tmp") == 0 )); then
    ffmpeg -y -v error -i "$in" \
      -map 0:v:0 -an \
      -vf "scale='min(360,iw)':-2:force_original_aspect_ratio=decrease,fps=12,format=yuv420p" \
      -c:v libx264 -preset fast -pix_fmt yuv420p \
      -crf 35 \
      -movflags +faststart \
      "$tmp2" </dev/null >/dev/null 2>&1 || true

    if [[ -f "$tmp2" ]] && (( $(fsize "$tmp2") > 0 )); then
      mv -f "$tmp2" "$tmp"
    else
      cp -f "$in" "$OUT_DIR/failed/$base"
      log "VID FAIL | $base"
      warn_inc
      return 1
    fi
  fi

  size=$(fsize "$tmp")

  if (( size > VID_MAX_BYTES )); then
    ffmpeg -y -v error -i "$in" \
      -map 0:v:0 -an \
      -vf "scale='min(360,iw)':-2:force_original_aspect_ratio=decrease,fps=12,format=yuv420p" \
      -c:v libx264 -preset fast -profile:v baseline -level 3.0 -pix_fmt yuv420p \
      -b:v 18000 -maxrate 28000 -bufsize 56000 \
      -movflags +faststart \
      "$tmp2" </dev/null >/dev/null 2>&1 || true

    if [[ -f "$tmp2" ]] && (( $(fsize "$tmp2") > 0 )); then
      mv -f "$tmp2" "$tmp"
      size=$(fsize "$tmp")
    fi
  fi

  mv -f "$tmp" "$out"

  if (( size <= VID_MAX_BYTES )); then
    log "VID OK   | $base -> $(basename "$out") | ${size}B"
    ok_inc
  else
    log "VID WARN | $base -> $(basename "$out") | ${size}B"
    warn_inc
  fi
}

export OUT_DIR WORK_DIR CNT_DIR IMG_MAX_BYTES VID_MAX_BYTES MAX_IMAGE_KB MAX_VIDEO_KB
export -f log ts fsize ok_inc warn_inc compress_image compress_video video_duration lower_ext is_image is_video

collect_files() {
  local item
  for item in "$@"; do
    if [[ -d "$item" ]]; then
      find "$item" -maxdepth 1 -type f
    elif [[ -f "$item" ]]; then
      printf '%s\n' "$item"
    else
      log "WARN     | introuvable: $item"
    fi
  done
}

main() {
  require_cmds

  mapfile -t ALL_FILES < <(collect_files "${INPUTS[@]}")
  if ((${#ALL_FILES[@]} == 0)); then
    echo "Aucun fichier valide trouvé." >&2
    exit 1
  fi

  local -a imgs=() vids=()
  local f
  for f in "${ALL_FILES[@]}"; do
    if is_image "$f"; then
      imgs+=("$f")
    elif is_video "$f"; then
      vids+=("$f")
    fi
  done

  local total=$(( ${#imgs[@]} + ${#vids[@]} ))
  local vid_jobs=$(( JOBS > 2 ? JOBS / 2 : 1 ))

  log "=== optimize_media v3 ==="
  log "Limites : image<=${MAX_IMAGE_KB}KB video<=${MAX_VIDEO_KB}KB"
  log "Sortie  : $OUT_DIR"
  log "Workers : images=$JOBS videos=$vid_jobs"
  log "Total   : ${#imgs[@]} images + ${#vids[@]} videos = $total"

  if ((${#imgs[@]} > 0)); then
    printf '%s\n' "${imgs[@]}" | parallel --jobs "$JOBS" --line-buffer compress_image {}
  fi

  if ((${#vids[@]} > 0)); then
    printf '%s\n' "${vids[@]}" | parallel --jobs "$vid_jobs" --line-buffer compress_video {}
  fi

  local ok warn
  ok=$(find "$CNT_DIR" -name 'ok_*' | wc -l)
  warn=$(find "$CNT_DIR" -name 'warn_*' | wc -l)

  log "-------------------------------------------"
  log "Traites : $total | OK : $ok | A verifier : $warn"
  log "Dossier : $OUT_DIR"
  log "Log     : $LOG"
}

main