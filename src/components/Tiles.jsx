function pickSpan(isVideo) {
  if (isVideo) {
    const options = [
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 3, rowSpan: 2 },
      { colSpan: 4, rowSpan: 2 },
      { colSpan: 3, rowSpan: 3 },
    ];

    return options[Math.floor(Math.random() * options.length)];
  }

  const roll = Math.random();

  if (roll > 0.98) return { colSpan: 3, rowSpan: 3 };
  if (roll > 0.94) return { colSpan: 2, rowSpan: 2 };
  if (roll > 0.90) return { colSpan: 2, rowSpan: 3 };

  return { colSpan: 1, rowSpan: 1 };
}

function Tile({ tile }) {
  return (
    <div
      className={`tile ${tile.content === 'Video' ? 'is-video' : 'is-image'}`}
      style={{
        gridColumn: `span ${tile.colSpan}`,
        gridRow: `span ${tile.rowSpan}`,
      }}
    >
      {tile.content === 'Video' ? (
        <video src={tile.url} muted playsInline autoPlay loop preload="metadata" />
      ) : (
        <img src={tile.url} alt={tile.name} loading="lazy" />
      )}
    </div>
  );
}

function Tiles() {
  const modules = import.meta.glob('/src/assets/content/*.{png,jpg,jpeg,webp,avif,gif,mp4,webm}', {
    eager: true,
    import: 'default',
  });

  const tiles = Object.entries(modules)
    .map(([filePath, url], index) => {
      const fileName = filePath.split('/').pop();
      const name = fileName.replace(/\.[^/.]+$/, '');
      const ext = fileName.split('.').pop().toLowerCase();
      const isVideo = ['mp4', 'webm'].includes(ext);
      const { colSpan, rowSpan } = pickSpan(isVideo);

      return {
        id: index,
        name,
        content: isVideo ? 'Video' : 'Image',
        url,
        colSpan,
        rowSpan,
      };
    })
    .sort((a, b) => a.id - b.id);

  return (
    <section className="tiles-section">
      <div className="tiles-marquee">
        <div className="tiles-track">
          <div className="tiles-group">
            {tiles.map((tile) => (
              <Tile key={tile.id} tile={tile} />
            ))}
          </div>

          <div className="tiles-group" aria-hidden="true">
            {tiles.map((tile) => (
              <Tile key={`copy-${tile.id}`} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tiles;
