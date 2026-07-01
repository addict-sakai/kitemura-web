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
  const lbVideo    = document.getElementById('lb-video');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');
  const galleryImgs = Array.from(document.querySelectorAll('.gc:not(.gc-video) img'));
  let currentIdx   = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lightbox.classList.remove('video-mode');
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbImg.src  = galleryImgs[idx].src;
    lbImg.alt  = galleryImgs[idx].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function openVideoLightbox(src) {
    lightbox.classList.add('video-mode');
    lbVideo.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbVideo.play();
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.classList.remove('video-mode');
    document.body.style.overflow = '';
    lbImg.src = '';
    lbVideo.pause();
    lbVideo.removeAttribute('src');
  }

  function showPrev() {
    if (lightbox.classList.contains('video-mode')) return;
    currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src  = galleryImgs[currentIdx].src;
    lbImg.alt  = galleryImgs[currentIdx].alt;
  }

  function showNext() {
    if (lightbox.classList.contains('video-mode')) return;
    currentIdx = (currentIdx + 1) % galleryImgs.length;
    lbImg.src  = galleryImgs[currentIdx].src;
    lbImg.alt  = galleryImgs[currentIdx].alt;
  }

  galleryImgs.forEach(function (img, i) {
    img.parentElement.addEventListener('click', function () { openLightbox(i); });
  });

  const galleryVideoCard = document.getElementById('gc-video');
  if (galleryVideoCard) {
    galleryVideoCard.addEventListener('click', function () {
      const videoEl = galleryVideoCard.querySelector('video');
      openVideoLightbox(videoEl.currentSrc || videoEl.src);
    });
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  showPrev);
  lbNext.addEventListener('click',  showNext);

  // close on overlay click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('active')) closeLightbox();
      if (progModal.classList.contains('active')) closeProgramModal();
    }
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });

  /* ----------------------------------------------------------
     PROGRAM DETAIL MODAL
     ---------------------------------------------------------- */
  const PROGRAMS = {
    1: {
      num: '01 — SPORT KITE',
      name: 'スポーツカイト体験',
      img: 'images/4_kite.jpeg',
      meta: [['開催場所（実績）', '富士川河川敷'], ['体験人数', '〜10名']],
      sections: [
        { numbered: true, items: [
          { title: 'シングルライン（1本）', desc: '1本のラインで操る最もシンプルなカイト。初心者に最適。' },
          { title: 'デュアルライン（2本）', desc: '2本のラインでアクロバティックな動きが楽しめる。' },
          { title: 'クアッドライン 固定翼（4本）', desc: '4本のラインで細かな動きを制御。プロ仕様の操作感。' },
          { title: 'クアッドライン パラフォイル型（4本）', desc: 'パラフォイル構造で風の引きが強く、スリリングな体験。' }
        ]}
      ],
      note: '※ 経験・目的に合わせてプログラムをカスタマイズします'
    },
    2: {
      num: '02 — KAYAK',
      name: 'カヤック体験',
      img: 'images/kaya_r4.jpeg',
      meta: [],
      sections: [
        { items: [
          { title: 'リバーカヤック（狩野川）', desc: '狩野川 リバー（伊豆長岡・函南）／5〜10名' },
          { title: 'レイクカヤック（本栖湖・西湖）', desc: '本栖湖／西湖（湖上カヤック）／実績（小学生、中学生、高校生、その他団体）／5〜100名' }
        ]}
      ]
    },
    3: {
      num: '03 — SUP',
      name: 'SUP体験',
      img: 'images/sup1.jpg',
      meta: [],
      sections: [
        { items: [
          { title: 'リバーSUP（狩野川）', desc: '狩野川 リバー（伊豆長岡・函南）／5〜10名' },
          { title: 'レイクSUP（本栖湖）', desc: '本栖湖（レイクSUP）／5〜10名' }
        ]}
      ]
    },
    4: {
      num: '04 — PARAGLIDER',
      name: 'パラグライダー体験',
      img: 'images/para.JPG',
      meta: [['開催場所（実績）', '朝霧高原'], ['体験人数', '5〜40名'], ['高度差', '約 20〜25m']],
      sections: [
        { items: [
          { title: '緩やかな斜面での浮遊体験', desc: '下段より徐々に高さを上げながら、無理のないペースで体験。' },
          { title: 'インストラクター同伴', desc: '経験豊富なインストラクターが安全に指導。初体験の方も安心してご参加いただけます。' },
          { title: 'グループ対応（5〜40名）', desc: '団体旅行、企業研修、学校行事にも最適なプログラムです。' },
          { title: '天候・風条件を徹底管理', desc: '安全を最優先に、風速・天候を確認してから実施します。' }
        ]}
      ],
      note: '※ 体験は天候・風速により実施日・時間を調整する場合があります'
    },
    5: {
      num: '05 — CRAFT',
      name: 'クラフト体験',
      img: 'images/rentako1.jpeg',
      meta: [['開催場所', '体育館・公民館・会議室 等'], ['体験人数', '〜100名'], ['形式', '屋内開催']],
      sections: [
        { heading: '◆ 連凧づくり', bullet: true, items: [
          { desc: '複数の凧をつなげる「連凧」を手作り体験' },
          { desc: '完成後にみんなで揚げる達成感' },
          { desc: 'グループ協力で大きな連凧に挑戦も可' },
          { desc: '子どもから大人まで楽しめる工作体験' }
        ]},
        { heading: '◆ 飛行機づくり', bullet: true, items: [
          { desc: 'バルサ材や紙を使った飛行機制作' },
          { desc: '飛行原理を楽しく学べる教育プログラム' },
          { desc: '完成後に飛距離・高度を競い合うゲーム' },
          { desc: 'STEM教育・理科教育にも活用可能' }
        ]}
      ],
      note: '※ 人数・会場規模に応じて内容をカスタマイズいたします'
    },
    6: {
      num: '06 — SEGWAY',
      name: 'セグウェイ体験',
      img: 'images/seg1.jpeg',
      meta: [['対象', '小学生以上'], ['時間', '5分程度／回'], ['開催場所', 'イベント会場、道の駅 等']],
      sections: [
        { heading: '◆ セグウェイ', bullet: true, items: [
          { desc: '自立二輪電動モビリティで気軽にライド体験。バランス感覚を楽しみながら、子どもから大人まで安全に走行できます。' }
        ]},
        { heading: '◆ 電動カート', bullet: true, items: [
          { desc: 'ゴーカート型の電動モビリティ。スリリングな乗り心地で、イベント会場を盛り上げる人気アトラクションです。' }
        ]}
      ],
      note: '※ 1回あたりの体験人数・実施時間は会場規模に応じて調整いたします'
    },
    7: {
      num: '07 — HOT BALLOON',
      name: '熱気球搭乗体験',
      img: 'images/kikyuu1.jpeg',
      meta: [['搭乗人数', '5〜8名'], ['時間', '5分程度／回（計3時間）'], ['開催場所', 'イベント会場、道の駅 等']],
      sections: [
        { bullet: true, items: [
          { desc: '地上から大空へ。係留フライトで上昇する迫力満点の熱気球体験をお届けします。カラフルなバルーンが空に浮かぶ様子はイベントの目玉として大人気。搭乗時は専門スタッフが安全に運航いたします。' }
        ]}
      ]
    },
    8: {
      num: '08 — HELICOPTER',
      name: 'ヘリコプター搭乗体験',
      img: 'images/heri2.jpeg',
      meta: [['搭乗人数', '1〜3名'], ['時間', '5分程度／回'], ['開催場所', 'イベント会場、道の駅 等']],
      sections: [
        { bullet: true, items: [
          { desc: '空からの絶景を体験できる特別な遊覧フライト。専門パイロットによる安全運航で、富士山や周辺の自然を一望できます。' }
        ]}
      ]
    },
    9: {
      num: '09 — EVENT',
      name: 'イベント参加',
      icon: '🎪',
      meta: [['人数', '要相談']],
      sections: [
        { heading: '開催実績会場', bullet: true, items: [
          { desc: '朝霧アリーナ' },
          { desc: '川の駅 伊豆ゲートウェイ函南、　川の駅 伊豆城山' }
        ]},
        { heading: '体験ラインナップ', items: [
          { title: 'スポーツカイト', desc: 'シングル、デュアル、クアッド、パラフォイル型のカイトを体験' },
          { title: 'ビックカイト', desc: 'みんなでビックカイトを揚げよう！' },
          { title: '連凧づくり', desc: 'みんなで作った凧を繋げて飛ばそう！' },
          { title: 'パラグライダー体験', desc: '浮遊体験をしてみよう' },
          { title: '熱気球搭乗体験', desc: '係留フライトで上昇' },
          { title: 'カヤック体験', desc: 'レイク＆リバーカヤック体験' },
          { title: 'SUP体験', desc: 'レイク＆リバーSUP体験' },
          { title: 'セグウェイ', desc: '自立二輪電動モビリティ' },
          { title: '電動カート', desc: '電動モビリティ体験ツアー' },
          { title: 'ヘリコプター', desc: '富士山・駿河湾 遊覧飛行' }
        ]}
      ]
    },
    10: {
      num: '10 — WATER PARK',
      name: 'ウォーターパーク（水上アスレチック）',
      img: 'images/wp1.jpg',
      meta: [['開催場所（実績）', '熱海・江の島'], ['対象', '小学生以上'], ['形式', '制作・設置・運用']],
      sections: [
        { items: [
          { title: '水上アスレチック制作', desc: 'フロート・スライダー等の水上遊具を企画・制作します。' },
          { title: '設置・撤去対応', desc: '会場に合わせた設置・運営・撤去まで一括サポート。' },
          { title: '安全管理・運営', desc: 'ライフセーバー配置や安全管理体制の構築も対応。' }
        ]}
      ],
      note: '※ 規模・会場・期間に応じてご提案いたします'
    },
    11: {
      num: '11 — KITE MAKING',
      name: 'カイト制作',
      img: 'images/bickite5.JPeG',
      meta: [],
      sections: [
        { heading: '◆ ビッグカイト制作', bullet: true, items: [
          { desc: '大型カイトをゼロからオーダーメイド' },
          { desc: '1〜数メートル級の大型カイトを制作' },
          { desc: '素材・デザインを自由にカスタマイズ' },
          { desc: '学校・企業・団体の記念制作にも対応' },
          { desc: '世界チャンピオンが品質を直接監修' }
        ]},
        { heading: '◆ オリジナルカイト制作', bullet: true, items: [
          { desc: '世界に一つだけのカイトをつくる' },
          { desc: 'デザインから縫製まで自分でカスタマイズ' },
          { desc: 'ロゴ・イラスト・名前を自由に入れられる' },
          { desc: '完成品を持ち帰り・揚げることができる' },
          { desc: '企業PR・記念品・土産物としても最適' }
        ]}
      ]
    }
  };

  const progModal       = document.getElementById('prog-modal');
  const progModalClose  = document.getElementById('prog-modal-close');
  const progModalMedia  = document.getElementById('prog-modal-media');
  const progModalImg    = document.getElementById('prog-modal-img');
  const progModalIcon   = document.getElementById('prog-modal-icon');
  const progModalNum    = document.getElementById('prog-modal-num');
  const progModalTitle  = document.getElementById('prog-modal-title');
  const progModalMeta   = document.getElementById('prog-modal-meta');
  const progModalSections = document.getElementById('prog-modal-sections');
  const progModalNote   = document.getElementById('prog-modal-note');

  function renderItem(item, sec) {
    if (sec.bullet) {
      return '<div class="pm-item pm-item-bullet"><span class="pm-bullet">▶</span>' +
             '<span class="pm-item-desc">' + item.desc + '</span></div>';
    }
    if (sec.numbered) {
      const idx = sec.items.indexOf(item) + 1;
      return '<div class="pm-item pm-item-numbered"><span class="pm-num-badge">' + idx + '</span>' +
             '<div><div class="pm-item-title">' + item.title + '</div>' +
             '<div class="pm-item-desc">' + item.desc + '</div></div></div>';
    }
    const titleHtml = item.title ? '<div class="pm-item-title">' + item.title + '</div>' : '';
    return '<div class="pm-item">' + titleHtml +
           '<div class="pm-item-desc">' + item.desc + '</div></div>';
  }

  function openProgramModal(id) {
    const p = PROGRAMS[id];
    if (!p) return;

    progModalNum.textContent   = p.num;
    progModalTitle.textContent = p.name;

    if (p.img) {
      progModalMedia.classList.remove('no-img');
      progModalImg.src = p.img;
      progModalImg.alt = p.name;
      progModalIcon.textContent = '';
    } else {
      progModalMedia.classList.add('no-img');
      progModalIcon.textContent = p.icon || '🪁';
    }

    progModalMeta.innerHTML = p.meta.map(function (m) {
      return '<span class="pm-chip"><b>' + m[0] + '</b>：' + m[1] + '</span>';
    }).join('');
    progModalMeta.style.display = p.meta.length ? 'flex' : 'none';

    progModalSections.innerHTML = p.sections.map(function (sec) {
      let html = '';
      if (sec.heading) html += '<div class="pm-section-heading">' + sec.heading + '</div>';
      html += '<div class="pm-items">';
      html += sec.items.map(function (item) { return renderItem(item, sec); }).join('');
      html += '</div>';
      return html;
    }).join('');

    progModalNote.textContent = p.note || '';

    progModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProgramModal() {
    progModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.ac[data-program]').forEach(function (card) {
    card.addEventListener('click', function () {
      openProgramModal(card.getAttribute('data-program'));
    });
  });

  progModalClose.addEventListener('click', closeProgramModal);
  progModal.addEventListener('click', function (e) {
    if (e.target === progModal) closeProgramModal();
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
