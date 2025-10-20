<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ELEKTROATOM — Profesjonalny zespół</title>
    <meta name="description" content="ELEKTROATOM — doradztwo, szkolenia i ekspertyzy. Profesjonalny zespół, elegancki i responsywny serwis." />
    <link rel="icon" href="assets/img/ico/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <img src="assets/img/wm_ia_logo.png" alt="ELEKTROATOM" class="logo" />
          <span class="brand-name">ELEKTROATOM</span>
        </div>
        <nav class="nav">
          <a href="#home">Home</a>
          <a href="#oferta">Oferta</a>
          <a href="#referencje">Referencje</a>
          <a href="#galeria">Galeria</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero / Home -->
      <section id="home" class="section hero">
        <div class="container hero-inner">
          <h1>Profesjonalizm i doświadczenie</h1>
          <p>ELEKTROATOM — zespół specjalistów wspierających Twoją firmę szkoleniami, doradztwem i ekspertyzami.</p>
          <div class="cta">
            <a href="#oferta" class="btn primary">Poznaj ofertę</a>
            <a href="#kontakt" class="btn">Skontaktuj się</a>
          </div>
        </div>
      </section>

      <!-- Oferta -->
      <section id="oferta" class="section">
        <div class="container">
          <header class="section-header">
            <h2>Oferta — szkolenia, doradztwo, ekspertyzy</h2>
            <p>Kompleksowe wsparcie w zakresie technologii druku i opakowań giętkich.</p>
          </header>

          <div class="grid two">
            <div>
              <h3>Technologia fleksograficzna</h3>
              <p>
                Podstawy procesu druku fleksograficznego: produkty, sprzęt i materiały, z naciskiem
                na efekty jakościowe i ekonomiczne.
              </p>
              <p>
                <a class="download" href="download/progr_szkol_fleks.pdf" target="_blank">Pełny program szkolenia (PDF)</a>
              </p>
            </div>
            <div>
              <h3>Technologia laminowania</h3>
              <p>
                Wiedza o produkcji laminatów opakowaniowych: procesy, produkty i wymagania
                technologiczne.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Referencje -->
      <section id="referencje" class="section alt">
        <div class="container">
          <header class="section-header">
            <h2>Referencje</h2>
            <p>Wybrane firmy, z którymi współpracowaliśmy.</p>
          </header>

          <div class="refs grid two">
            <ul>
              <li>PAKPOL SA, Białystok</li>
              <li>AKERLUND &amp; RAUSING SA, Białystok</li>
              <li>PPHU Jacek Sukiennik, Łódź</li>
              <li>TEICH POLAND Sp. z o.o., Rogowiec</li>
              <li>ERGPAK Sp. z o.o., Oława</li>
              <li>PAKFOL Sp. z o.o., Karczew</li>
              <li>CEZAR SA, Zaścianki</li>
            </ul>
            <ul>
              <li>DK-LAMIN SJ, Zaścianki</li>
              <li>INTERAK Sp. z o.o., Czarnków</li>
              <li>GRUPA3 SJ: S-DRUK; PLASTCARD, Kraków</li>
              <li>CDM Sp. z o.o., Ksawerów</li>
              <li>FLEXFILM EUROPE Sp. z o.o., Września</li>
              <li>BAHPOL Sp. z o.o., Kłobuck</li>
              <li>SÜDPACK KŁOBUCK, Kłobuck</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Galeria -->
      <section id="galeria" class="section">
        <div class="container">
          <header class="section-header">
            <h2>Galeria</h2>
            <p>Zdjęcia i materiały wideo.</p>
          </header>

          <div class="gallery grid two three-md four-lg">
            <?php
            $dir = __DIR__ . '/foto';
            $images = [];
            // Wczytaj mapę nazw z NAME.txt (format: zdjN=Nazwa)
            $names = [];
            $namePath = $dir . '/NAME.txt';
            if (is_file($namePath)) {
              $lines = file($namePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
              foreach ($lines as $line) {
                if (preg_match('/^\s*(?:zdj)?(\d+)\s*=\s*(.+)$/i', $line, $mm)) {
                  $names[(int)$mm[1]] = trim($mm[2]);
                }
              }
            }

            if (is_dir($dir)) {
              foreach (scandir($dir) as $file) {
                if (preg_match('/\.(jpe?g|png|gif|webp)$/i', $file) && preg_match('/(\d+)(?=\.[^.]+$)/', $file, $m)) {
                  $images[] = ['file' => $file, 'order' => (int)$m[1]];
                }
              }
              usort($images, function($a, $b) { return $a['order'] <=> $b['order']; });
              foreach ($images as $img) {
                $file = $img['file'];
                $name = preg_replace('/\.[^.]+$/', '', $file);
                $caption = $names[$img['order']] ?? $name;
                echo '<figure class="tile">';
                echo '<img src="foto/' . htmlspecialchars($file, ENT_QUOTES) . '" data-full="foto/' . htmlspecialchars($file, ENT_QUOTES) . '" alt="' . htmlspecialchars($caption, ENT_QUOTES) . '" />';
                echo '<figcaption>' . htmlspecialchars($caption, ENT_QUOTES) . '</figcaption>';
                echo '</figure>';
              }
            }
            ?>
          </div>
        </div>
      </section>

      <!-- Kontakt -->
      <section id="kontakt" class="section alt">
        <div class="container">
          <header class="section-header">
            <h2>Kontakt</h2>
            <p>Bądźmy w kontakcie — chętnie odpowiemy na pytania.</p>
          </header>

          <div class="grid two">
            <div>
              <ul class="contact-list">
                <li><strong>ELEKTROATOM</strong></li>
                <li>ul. Waszyngtońska 10/1; 15-523 Grabówka</li>
                <li>+48 603 38 11 18</li>
                <li><a href="mailto:elektroatom@pbi.pl">elektroatom@pbi.pl</a></li>
                <li><a href="https://www.linkedin.com/in/hulpowski/" target="_blank" rel="noopener">LinkedIn</a></li>
              </ul>
            </div>
            <form id="contactForm" class="form" novalidate>
              <div class="form-row">
                <label for="name">Imię i nazwisko</label>
                <input id="name" name="name" type="text" placeholder="Jan Kowalski" required />
              </div>
              <div class="form-row">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" placeholder="jan.kowalski@example.com" required />
              </div>
              <div class="form-row">
                <label for="message">Treść wiadomości</label>
                <textarea id="message" name="message" rows="5" placeholder="Wiadomość..." required></textarea>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn primary">Wyślij</button>
                <p id="formStatus" class="form-status" aria-live="polite"></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>&copy; <span id="year"></span> ELEKTROATOM — Profesjonalny zespół</p>
      </div>
    </footer>

    <!-- Modal for gallery -->
    <div id="modal" class="modal" aria-hidden="true" role="dialog" aria-label="Podgląd zdjęcia">
      <button class="modal-close" aria-label="Zamknij">×</button>
      <button class="modal-prev" aria-label="Poprzednie">‹</button>
      <img class="modal-img" alt="Podgląd" />
      <button class="modal-next" aria-label="Następne">›</button>
    </div>

    <script src="assets/js/main.js"></script>
  </body>
</html>