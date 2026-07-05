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

function Tiles2() {
  const modules = import.meta.glob('/src/assets/content/optimized/*.{png,jpg,jpeg,webp,avif,gif,mp4,webm}', {
    eager: true,
    import: 'default',
  });

  const tiles = Object.entries(modules)
    .map(([filePath, url], index) => {
      const fileName = filePath.split('/').pop();
      const name = fileName.replace(/\.[^/.]+$/, '');
      const ext = fileName.split('.').pop().toLowerCase();
      const isVideo = ['mp4', 'webm'].includes(ext);
      const { colSpan, rowSpan } = [1, 1];

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

  const rawCount = Math.floor((window.innerWidth / 47) * 7 * 1.25);
  const count = rawCount - (rawCount % 7);
  return (
    <section className="tiles-section">
      <div className="tiles-marquee">
        <div className="tiles-track">
          <div className="tiles-group2">
            {[...Array(count)].map((_, i) => (
              <Tile key={i} tile={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tiles2;
