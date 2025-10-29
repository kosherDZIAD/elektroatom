<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ELEKTROATOM</title>
    <link rel="icon" href="zdjecia/ico/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="template/style.css" />
    <link rel="stylesheet" href="assets/style.css" />
  </head>
  <body>
    <header id="header">
      <div class="inner">
        <nav class="nav">
          <a href="#home" class="nav-link active">Home</a>
          <a href="#oferta" class="nav-link">Oferta</a>
          <a href="#referencje" class="nav-link">Referencje</a>
          <a href="#galeria" class="nav-link">Galeria</a>
          <a href="#kontakt" class="nav-link">Kontakt</a>
        </nav>
      </div>
  </header>

    <!-- Cienka elektryczna linia pod nagłówkiem -->
    <div class="electric-line top">
      <svg class="svg-container" aria-hidden="true">
        <defs>
          <filter id="turbulent-displace-line" color-interpolation-filters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="500; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -500" dur="8s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="350; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -350" dur="8s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="20" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      <div class="card-container">
        <div class="inner-container">
          <div class="border-outer">
            <div class="main-card"></div>
          </div>
          <div class="glow-layer-1"></div>
          <div class="glow-layer-2"></div>
        </div>
        <div class="overlay-1"></div>
        <div class="overlay-2"></div>
        <div class="background-glow"></div>
      </div>
    </div>

    <main id="main">
      

      <section id="home" class="section active">
        <header class="major">
          <h2>Home</h2>
        </header>
        <div class="row two-col">
          <div>
            <img alt="ELEKTROATOM" src="zdjecia/wm_ia_logo.png" class="hero-image">
          </div>
          <div>
            <h3>Dane formalne</h3>
            <ul>
              <li><span class="label">Nazwa firmy:</span> ELEKTROATOM</li>
              <li><span class="label">Rodzaj działalności:</span> usługi elektryczne i instalacyjne</li>
              <li><span class="label">Właściciel:</span> Zespół ELEKTROATOM</li>
              <li><span class="label">Zakres działalności:</span> projektowanie, montaż, serwis instalacji elektrycznych</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="oferta" class="section">
        <header class="major">
          <h2>Oferta</h2>
        </header>
        <ul class="alt">
          <li>Instalacje elektryczne w budynkach mieszkalnych i komercyjnych.</li>
          <li>Modernizacje i audyty instalacji.</li>
          <li>Systemy zabezpieczeń i automatyka.</li>
          <li>Serwis i przeglądy okresowe.</li>
        </ul>
      </section>

      <section id="referencje" class="section">
        <header class="major">
          <h2>Referencje</h2>
        </header>
        <p>Wieloletnie doświadczenie oraz realizacje dla klientów indywidualnych i firm.</p>
      </section>

      <section id="galeria" class="section">
        <header class="major">
          <h2>Galeria</h2>
        </header>
        <div class="gallery-grid gallery" id="galleryGrid">
          <?php
            $base = __DIR__;
            $fotoDir = $base . '/foto';
            $fullsDir = $base . '/zdjecia/fulls';
            $thumbsDir = $base . '/zdjecia/thumbs';
            $images = [];
            $names = [];

            $namePath = is_dir($fotoDir) ? ($fotoDir . '/NAME.txt') : ($base . '/zdjecia/NAME.txt');
            if (is_file($namePath)) {
              $lines = file($namePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
              foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || $line[0] === '#') continue;
                if (preg_match('/^\s*(?:zdj)?(\d+)\s*[=:]\s*(.+)$/i', $line, $mm)) {
                  $names[(int)$mm[1]] = trim($mm[2]);
                } elseif (preg_match('/^\s*([^|=]+)\s*[|=]\s*(.+)$/', $line, $mm)) {
                  $names[strtolower(trim($mm[1]))] = trim($mm[2]);
                }
              }
            }

            if (is_dir($fotoDir)) {
              foreach (scandir($fotoDir) as $file) {
                if (preg_match('/\.(jpe?g|png|gif|webp)$/i', $file)) {
                  $order = null;
                  if (preg_match('/(\d+)(?=\.[^.]+$)/', $file, $m)) { $order = (int)$m[1]; }
                  $images[] = ['file' => $file, 'order' => $order];
                }
              }
              usort($images, function($a, $b) {
                if ($a['order'] === null && $b['order'] === null) return strnatcasecmp($a['file'], $b['file']);
                if ($a['order'] === null) return 1;
                if ($b['order'] === null) return -1;
                return $a['order'] <=> $b['order'];
              });
              foreach ($images as $img) {
                $file = $img['file'];
                $baseName = preg_replace('/\.[^.]+$/', '', $file);
                $caption = $img['order'] !== null
                  ? ($names[$img['order']] ?? $baseName)
                  : ($names[strtolower($baseName)] ?? preg_replace('/[_-]+/', ' ', $baseName));
                echo '<figure class="tile">';
                echo '<img src="foto/' . htmlspecialchars($file, ENT_QUOTES) . '" data-full="foto/' . htmlspecialchars($file, ENT_QUOTES) . '" alt="' . htmlspecialchars($caption, ENT_QUOTES) . '" />';
                echo '<figcaption>' . htmlspecialchars($caption, ENT_QUOTES) . '</figcaption>';
                echo '</figure>';
              }
            } elseif (is_dir($fullsDir)) {
              $files = array_values(array_filter(scandir($fullsDir), function($f) { return preg_match('/\.(jpe?g|png|gif|webp)$/i', $f); }));
              sort($files, SORT_NATURAL | SORT_FLAG_CASE);
              foreach ($files as $file) {
                $baseName = preg_replace('/\.[^.]+$/', '', $file);
                $thumb = $thumbsDir . '/thumb_' . $file;
                $thumbRel = is_file($thumb) ? ('zdjecia/thumbs/thumb_' . $file) : ('zdjecia/fulls/' . $file);
                $caption = $names[strtolower($baseName)] ?? preg_replace('/[_-]+/', ' ', $baseName);
                echo '<figure class="tile">';
                echo '<img src="' . htmlspecialchars($thumbRel, ENT_QUOTES) . '" data-full="zdjecia/fulls/' . htmlspecialchars($file, ENT_QUOTES) . '" alt="' . htmlspecialchars($caption, ENT_QUOTES) . '" />';
                echo '<figcaption>' . htmlspecialchars($caption, ENT_QUOTES) . '</figcaption>';
                echo '</figure>';
              }
            } else {
              echo '<p>Brak obrazów do wyświetlenia.</p>';
            }
          ?>
        </div>
        <div id="modal" class="modal" aria-hidden="true" role="dialog" aria-label="Podgląd zdjęcia">
          <button class="modal-close" aria-label="Zamknij">×</button>
          <button class="modal-prev" aria-label="Poprzednie">‹</button>
          <img class="modal-img" alt="Podgląd" />
          <button class="modal-next" aria-label="Następne">›</button>
        </div>
      </section>

      <section id="kontakt" class="section">
        <header class="major">
          <h2>Kontakt</h2>
        </header>
        <form class="contact-form" id="contactForm">
          <div class="form-row">
            <label for="name">Imię i nazwisko</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-row">
            <label for="message">Wiadomość</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="button">Wyślij</button>
          <p id="formStatus" class="form-status" role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>

    <!-- Cienka elektryczna linia nad stopką -->
    <div class="electric-line bottom">
      <!-- reuse same filter id defined above -->
      <div class="card-container">
        <div class="inner-container">
          <div class="border-outer">
            <div class="main-card"></div>
          </div>
          <div class="glow-layer-1"></div>
          <div class="glow-layer-2"></div>
        </div>
        <div class="overlay-1"></div>
        <div class="overlay-2"></div>
        <div class="background-glow"></div>
      </div>
    </div>

    <footer id="footer">
      <div class="inner">
        <div class="footer-brand">
          <img src="zdjecia/wm_ia_logo.png" alt="ELEKTROATOM" class="footer-logo" />
        </div>
        <ul class="labeled-icons footer-contact">
          <li><span class="icon">🏢</span> ELEKTROATOM</li>
          <li><span class="icon">📍</span> Białystok, Polska</li>
          <li><span class="icon">📱</span> +48 000 000 000</li>
          <li><span class="icon">✉️</span> <a href="mailto:elektroatom@pbi.pl">elektroatom@pbi.pl</a></li>
          <li><span class="icon">🔗</span> <a href="#" target="_blank">LinkedIn</a></li>
        </ul>
        <ul class="icons">
          <li><a href="#kontakt" class="icon">✉️ Email</a></li>
        </ul>
        <ul class="copyright">
          <li>&copy; ELEKTROATOM</li>
          <li>Design: PBI-SERWIS</li>
        </ul>
      </div>
    </footer>

    <script src="assets/script.js"></script>
    <script src="assets/gallery.js"></script>
  </body>
  </html>