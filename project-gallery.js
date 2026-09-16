const gallery = document.body;
const { galleryPrefix, galleryCount, imageWidth, tileHeight } = gallery.dataset;
const tileCount = Number(galleryCount);

for (let index = 2; index <= tileCount; index += 1) {
  const tile = String(index).padStart(2, '0');
  const image = document.createElement('img');
  image.className = 'concept-tile';
  image.dataset.src = `./assets/${galleryPrefix}-${tile}.png`;
  image.width = Number(imageWidth);
  image.height = Number(tileHeight);
  image.alt = '';
  gallery.append(image);
}

const deferredTiles = document.querySelectorAll('.concept-tile[data-src]');
const loadTile = (tile) => {
  tile.src = `${tile.dataset.src}?v=1`;
  tile.removeAttribute('data-src');
};

if ('IntersectionObserver' in window) {
  const tileObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadTile(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '1400px 0px' });

  deferredTiles.forEach((tile) => tileObserver.observe(tile));
} else {
  deferredTiles.forEach(loadTile);
}
