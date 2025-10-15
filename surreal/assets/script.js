// Surreal interactions: floating shapes, smooth scroll, subtle parallax

function createFloatingShapes() {
  const host = document.querySelector('.floating-shapes');
  if (!host) return;
  const count = 10;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const size = 80 + Math.random() * 180;
    s.style.position = 'absolute';
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${Math.random() * 95}%`;
    s.style.top = `${Math.random() * 95}%`;
    s.style.borderRadius = `${30 + Math.random() * 50}%`;
    s.style.filter = 'blur(8px)';
    s.style.mixBlendMode = 'screen';
    const hue = Math.floor(260 + Math.random() * 120); // 260–380
    s.style.background = `radial-gradient(circle at 30% 30%, hsla(${hue}, 85%, 65%, 0.22), transparent 60%)`;
    s.style.animation = `float-${i} 16s ease-in-out ${-Math.random() * 12}s infinite`;
    const key = document.createElement('style');
    key.textContent = `@keyframes float-${i} { 0%, 100% { transform: translate3d(0,0,0) rotate(0deg) } 50% { transform: translate3d(${(Math.random()*6-3).toFixed(2)}%, ${(Math.random()*6-3).toFixed(2)}%, 0) rotate(${(Math.random()*18-9).toFixed(2)}deg) } }`;
    document.head.appendChild(key);
    host.appendChild(s);
  }
}

function enableSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const el = href && document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });
}

function subtleParallax() {
  const aurora = document.querySelector('.aurora');
  if (!aurora) return;
  let rafId = null;
  const onMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      aurora.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
    });
  };
  window.addEventListener('pointermove', onMove);
}

function wireForm() {
  const form = document.getElementById('f_kontakt');
  const box = document.getElementById('message-box');
  if (!form || !box) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    box.textContent = 'Dziękujemy! Wiadomość została zapisana (podgląd).';
    box.style.color = 'var(--accent-1)';
    form.reset();
    setTimeout(() => { box.textContent = ''; }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createFloatingShapes();
  enableSmoothScroll();
  subtleParallax();
  wireForm();
});