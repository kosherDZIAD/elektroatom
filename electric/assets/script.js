// Nawigacja między sekcjami
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(n => n.classList.remove('active'));
    document.getElementById(targetId)?.classList.add('active');
    link.classList.add('active');
    // scroll to top of main
    document.getElementById('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Galeria – wczytanie obrazów z lokalnego folderu „zdjecia” (skopiowanego z „modern”)
const galleryGrid = document.getElementById('galleryGrid');
// Pary: miniatura (thumb) + pełny obraz (full)
const imagePairs = [
  { thumb: 'zdjecia/thumbs/thumb_ja_obecnie.jpg', full: 'zdjecia/fulls/ja_obecnie.jpg' },
  { thumb: 'zdjecia/thumbs/thumb_ja_tr_wcz.jpg', full: 'zdjecia/fulls/ja_tr_wcz.jpg' },
  { thumb: 'zdjecia/thumbs/thumb_ja_relaks.jpg', full: 'zdjecia/fulls/ja_relaks.jpg' },
  { thumb: 'zdjecia/thumbs/thumb_po_szkol.jpg', full: 'zdjecia/fulls/po_szkol.jpg' },
];

function tryLoadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function buildGallery() {
  const available = [];
  for (const pair of imagePairs) {
    const okThumb = await tryLoadImage(pair.thumb);
    const okFull = await tryLoadImage(pair.full);
    if (okThumb && okFull) available.push(pair);
  }
  if (available.length === 0) {
    galleryGrid.innerHTML = '<p>Brak zdjęć do wyświetlenia.</p>';
    return;
  }
  available.forEach(({ thumb, full }) => {
    const img = document.createElement('img');
    img.src = thumb;
    img.alt = 'Galeria';
    img.addEventListener('click', () => openLightbox(full));
    galleryGrid.appendChild(img);
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Formularz kontaktowy – prosty handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  formStatus.textContent = 'Dziękujemy! Wiadomość została zapisana lokalnie.';
  console.log('Form:', Object.fromEntries(data.entries()));
});

// Init
buildGallery();