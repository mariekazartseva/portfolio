const grid = document.getElementById('track-grid');
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('modal-close');

tracks.forEach(track => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-cover">
      <img src="${track.cover}" alt="${track.title}">
      ${track.coverAI ? '<span class="ai-badge">AI</span>' : ''}
    </div>
    <div class="card-body">
      <h3>${track.title}</h3>
      <p>${track.teaser}</p>
    </div>
  `;
  card.addEventListener('click', () => openModal(track));
  grid.appendChild(card);
});

function openModal(track) {
  modalContent.innerHTML = `<h2>${track.title}</h2>${track.fullHtml}`;
  overlay.classList.add('active');
  bindLightbox();
}

closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function bindLightbox() {
  const images = modalContent.querySelectorAll('.carousel img');
  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxOverlay.classList.add('active');
    });
  });
}

lightboxClose.addEventListener('click', () => lightboxOverlay.classList.remove('active'));
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightboxOverlay.classList.remove('active');
    overlay.classList.remove('active');
  }
});
