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

document.querySelectorAll('.gallery .tile img').forEach(img => {
  img.addEventListener('click', () => {
    const full = img.getAttribute('data-full');
    modalImg.src = full;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.removeAttribute('src');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.removeAttribute('src');
  }
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