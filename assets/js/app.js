// Nowoczesna nawigacja + formularz kontaktowy
const user_http = "www.elektroatom.pbi.pl";
const user_email_recip = "artur.m@poczta.pbi.pl";

const idMap = {
  100: "home",
  200: "oferta",
  300: "referencje",
  400: "galeria",
  500: "kontakt",
};

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getTargetSection() {
  // Priorytet: hash -> parametr m -> domyślnie 'home'
  const hash = (location.hash || "").replace("#", "");
  if (hash && document.getElementById(hash)) return hash;
  const m = parseInt(getParam("m") || "100", 10);
  return idMap[m] || "home";
}

function renderSection() {
  const target = getTargetSection();
  const sections = ["home", "oferta", "referencje", "galeria", "kontakt"];
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === target ? "block" : "none";
  });
  // Active state on nav
  document.querySelectorAll(".nav-link").forEach((a) => {
    const sec = a.getAttribute("data-section");
    a.classList.toggle("active", sec === target);
  });
}

function showMessage(text, type = "OK") {
  const box = document.getElementById("message-box");
  if (!box) return;
  box.textContent = text;
  box.classList.remove("error", "ok");
  box.classList.add(type === "OK" ? "ok" : "error");
}

function form_kont_check() {
  const form = document.getElementById("f_kontakt");
  if (!form) return false;

  const name = form.imie_nazw.value.trim();
  if (!name || name.length < 5) {
    showMessage(!name ? "Pole 'Imię, nazwisko' nie może być puste." : "Pole 'Imię, nazwisko' jest zbyt krótkie.", "NO");
    form.imie_nazw.focus();
    return false;
  }

  const email = form.w_email.value.trim();
  if (!email || email.length < 5) {
    showMessage(!email ? "Pole 'Email' nie może być puste." : "Pole 'Email' jest zbyt krótkie.", "NO");
    form.w_email.focus();
    return false;
  }

  const human = document.getElementById("w_czlowiek").checked;
  if (!human) {
    showMessage("Nie wysyłamy wiadomości od robotów.", "NO");
    return false;
  }

  let tekst = form.w_tekst.value.trim();
  if (!tekst || tekst.length < 5) {
    showMessage(!tekst ? "Pole 'Tekst wiadomości' nie może być puste." : "Pole 'Tekst wiadomości' jest zbyt krótkie.", "NO");
    form.w_tekst.focus();
    return false;
  }
  return true;
}

function handleContactSubmit(ev) {
  ev.preventDefault();
  if (!form_kont_check()) return false;

  const form = document.getElementById("f_kontakt");
  const name = form.imie_nazw.value.trim();
  const email = form.w_email.value.trim();
  const copy = document.getElementById("m_copy").checked;
  let tekst = form.w_tekst.value.trim();
  if (tekst.length > 2000) tekst = tekst.substring(0, 2000);

  const dzisiaj = new Date();
  const stamp = `${dzisiaj.toLocaleDateString()} ${dzisiaj.toLocaleTimeString()}`;

  let body = "";
  body += `Wiadomość ze strony: ${user_http}\n`;
  body += `Wysyłający: ${name}\n`;
  body += `E-mail: ${email}\n`;
  body += `Wysłano: ${stamp}\n`;
  if (copy) body += `Kopia: ${email}\n`;
  body += "-------------------------------------------------------------------------------\n";
  body += "Treść wiadomości:\n";
  body += tekst;

  const subject = `Wiadomość z formularza kontaktowego ${user_http}`;
  let mailto = `mailto:${encodeURIComponent(user_email_recip)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (copy) mailto += `&cc=${encodeURIComponent(email)}`;

  window.location.href = mailto;
  showMessage("Wiadomość przygotowana w Twoim programie pocztowym. Wyślij, aby zakończyć.", "OK");
  return false;
}

function init() {
  // initial nav + routing
  renderSection();
  window.addEventListener("hashchange", renderSection);
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.addEventListener('click', (e) => {
      const sec = a.getAttribute('data-section');
      if (sec) {
        // ensure hash updates, renderSection listens to hashchange
        location.hash = sec;
      }
    });
  });

  // form
  const form = document.getElementById("f_kontakt");
  if (form) form.addEventListener("submit", handleContactSubmit);
}

document.addEventListener("DOMContentLoaded", init);