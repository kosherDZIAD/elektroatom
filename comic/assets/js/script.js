// Komiksowe drobne efekty: aktywna nawigacja i animacja przycisków

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = (a.getAttribute('href') || '').replace('#','');
    a.classList.toggle('active', href === id);
  });
}

function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) setActiveNav(id);
      }
    });
  }, { threshold: 0.6 });
  sections.forEach((sec) => observer.observe(sec));
}

function initKapowButtons() {
  document.querySelectorAll('.kapow').forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.add('animate');
      setTimeout(() => el.classList.remove('animate'), 350);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavObserver();
  initKapowButtons();
});