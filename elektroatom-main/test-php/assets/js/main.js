// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Gallery modal
const modal = document.getElementById('modal');
const modalImg = modal.querySelector('.modal-img');
const modalClose = modal.querySelector('.modal-close');
const modalPrev = modal.querySelector('.modal-prev');
const modalNext = modal.querySelector('.modal-next');

const galleryImages = Array.from(document.querySelectorAll('.gallery .tile img'));
let currentIndex = -1;

function showImageByIndex(i) {
  if (i < 0 || i >= galleryImages.length) return;
  currentIndex = i;
  const full = galleryImages[currentIndex].getAttribute('data-full');
  modalImg.src = full;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.removeAttribute('src');
  currentIndex = -1;
}

function prevImage() {
  if (!galleryImages.length) return;
  let i = currentIndex - 1;
  if (i < 0) i = galleryImages.length - 1;
  showImageByIndex(i);
}

function nextImage() {
  if (!galleryImages.length) return;
  let i = currentIndex + 1;
  if (i >= galleryImages.length) i = 0;
  showImageByIndex(i);
}

galleryImages.forEach((img, idx) => {
  img.addEventListener('click', () => showImageByIndex(idx));
});

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', prevImage);
modalNext.addEventListener('click', nextImage);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); nextImage(); }
  else if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
});

// Contact form validation + mailto fallback (no backend)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Uzupełnij wszystkie pola.';
    status.style.color = '#ff7b7b';
    return;
  }
  if (!validateEmail(email)) {
    status.textContent = 'Podaj poprawny adres email.';
    status.style.color = '#ff7b7b';
    return;
  }

  const subject = encodeURIComponent(`Wiadomość od: ${name}`);
  const body = encodeURIComponent(`Imię i nazwisko: ${name}\nEmail: ${email}\n\nTreść:\n${message}`);
  const mailto = `mailto:elektroatom@pbi.pl?subject=${subject}&body=${body}`;

  status.textContent = 'Otwieram klienta poczty...';
  status.style.color = '#b8c2d1';
  window.location.href = mailto;
});