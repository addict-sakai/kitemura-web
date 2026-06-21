/* ============================================================
   カイト村 — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     LIGHTBOX
     ---------------------------------------------------------- */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');
  const galleryImgs = Array.from(document.querySelectorAll('.gc img'));
  let currentIdx   = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lbImg.src  = galleryImgs[idx].src;
    lbImg.alt  = galleryImgs[idx].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showPrev() {
    currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src  = galleryImgs[currentIdx].src;
    lbImg.alt  = galleryImgs[currentIdx].alt;
  }

  function showNext() {
    currentIdx = (currentIdx + 1) % galleryImgs.length;
    lbImg.src  = galleryImgs[currentIdx].src;
    lbImg.alt  = galleryImgs[currentIdx].alt;
  }

  galleryImgs.forEach(function (img, i) {
    img.parentElement.addEventListener('click', function () { openLightbox(i); });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  showPrev);
  lbNext.addEventListener('click',  showNext);

  // close on overlay click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });

  /* ----------------------------------------------------------
     SCROLL-REVEAL  (IntersectionObserver)
     Adds .visible class when elements enter the viewport
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(
    '.ac, .gc, .champ-inner, .contact-card'
  );

  // set initial hidden state via JS so CSS-only visitors still see content
  revealEls.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = el.style.transform
      ? el.style.transform + ' translateY(24px)'
      : 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        // reset only the translateY we added; preserve any existing rotate
        const cur = entry.target.style.transform;
        entry.target.style.transform = cur.replace('translateY(24px)', 'translateY(0)');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });

  /* ----------------------------------------------------------
     NAV — active link highlight on scroll
     ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.style.background  = '';
      a.style.color       = '';
      a.style.borderColor = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.background  = 'var(--sun)';
        a.style.color       = 'var(--deep)';
        a.style.borderColor = 'var(--sun)';
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ----------------------------------------------------------
     ACTIVITY CARDS — random subtle tilt on hover
     ---------------------------------------------------------- */
  document.querySelectorAll('.ac, .ac-plain').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      const tilt = (Math.random() * 2 - 1).toFixed(1); // -1 to +1 deg
      card.style.transform = 'scale(1.02) rotate(' + tilt + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ----------------------------------------------------------
     HERO MOSAIC — subtle parallax on mouse move
     ---------------------------------------------------------- */
  const heroMosaic = document.querySelector('.hero-mosaic');
  const heroSection = document.querySelector('.hero');

  if (heroMosaic && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to 0.5
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      heroMosaic.style.transform =
        'translate(' + (cx * 12) + 'px, ' + (cy * 8) + 'px)';
    });
    heroSection.addEventListener('mouseleave', function () {
      heroMosaic.style.transform = 'translate(0, 0)';
    });
  }

  /* ----------------------------------------------------------
     EASTER EGG — Konami code triggers rainbow shake
     ---------------------------------------------------------- */
  const KONAMI = [38,38,40,40,37,39,37,39,66,65];
  let konamiIdx = 0;

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        triggerRainbowShake();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function triggerRainbowShake() {
    document.body.style.animation = 'shake 0.12s ease-in-out 8';
    document.body.style.filter    = 'hue-rotate(0deg)';
    let deg = 0;
    const id = setInterval(function () {
      deg += 30;
      document.body.style.filter = 'hue-rotate(' + deg + 'deg)';
      if (deg >= 360) {
        clearInterval(id);
        document.body.style.filter    = '';
        document.body.style.animation = '';
      }
    }, 80);
  }

})();
