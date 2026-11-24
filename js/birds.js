/* ═══════════════════════════════════════════════════════════════
   RIMU — the birds · v6 "window"
   concept, design & code by ghostly.grl ♥

   one player for the whole page. every call is decoded once, so
   the bars you see are the real shape of that bird's voice (and
   the silence at the start of a recording is skipped).
   dawn chorus · fourteen cards · field card · who's singing?
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, RM } = KP;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const pad2 = n => String(n).padStart(2, '0');
  const fmt = s => (s / 60 | 0) + ':' + pad2(Math.floor(s % 60));

  /* ═══════════════ the fourteen ═══════════════
     hab = filter · where = trail · many = how they're doing (rough, for the concept) */
  const B = [
    { id: 'kakapo', n: 'KĀKĀPŌ', w: 'night parrot', lat: 'Strigops habroptilus', hab: 'night', where: 'Ridge, after dark', when: '22:00, hut guests only', many: 'about 250 in the world', hot: 1, size: '60 cm · up to 4 kg', s: 'A deep boom you feel in your chest, then a metallic "ching".', note: 'The heaviest parrot. It can\'t fly, it climbs, and it smells of honey.' },
    { id: 'kotuku', n: 'KŌTUKU', w: 'white heron', lat: 'Ardea alba modesta', hab: 'estuary', where: 'Trail 01 · the estuary', when: '09:00, low tide', many: 'one colony in the country', hot: 1, size: '92 cm · 0.9 kg', s: 'A dry croak. Mostly it says nothing at all.', note: 'Seeing one once in your life is lucky, people say.' },
    { id: 'takahe', n: 'TAKAHĒ', w: 'swamp hen', lat: 'Porphyrio hochstetteri', hab: 'meadow', where: 'Trail 03 · the meadow', when: 'all day, slowly', many: 'about 500', hot: 1, size: '63 cm · 2.7 kg', s: 'A loud "oop", like a pūkeko but deeper.', note: 'Declared extinct in 1898, found again in 1948.' },
    { id: 'hihi', n: 'HIHI', w: 'stitchbird', lat: 'Notiomystis cincta', hab: 'forest', where: 'Trail 02 · the feeders', when: '11:00', many: 'a few thousand', size: '18 cm · 35 g', s: 'A sharp "stitch", which is where its english name comes from.', note: 'It drinks nectar and moves like a hummingbird.' },
    { id: 'tui', n: 'TŪĪ', w: 'parson bird', lat: 'Prosthemadera novaeseelandiae', hab: 'forest', where: 'Trail 02 & 04', when: '16:00, the chorus', many: 'doing fine', size: '30 cm · 120 g', s: 'Bells, clicks, coughs and notes too high for us. Two voice boxes.', note: 'It copies everything: other birds, phones, people.' },
    { id: 'koekoea', n: 'KOEKOEĀ', w: 'long-tailed cuckoo', lat: 'Urodynamis taitensis', hab: 'ridge', where: 'Trail 04 · the ridge', when: 'spring & summer', many: 'fewer every year', size: '40 cm, half of it tail', s: 'A long screech, "zzwheesht", from high in the canopy.', note: 'It winters in the Pacific islands and comes back in October.' },
    { id: 'kaka', n: 'KĀKĀ', w: 'forest parrot', lat: 'Nestor meridionalis', hab: 'forest', where: 'Trail 02 · the canopy', when: 'early morning', many: 'getting better', size: '45 cm · 500 g', s: 'A harsh "ka-aa", then liquid whistles.', note: 'Loud, curious, and it will steal your sandwich.' },
    { id: 'kereru', n: 'KERERŪ', w: 'wood pigeon', lat: 'Hemiphaga novaeseelandiae', hab: 'forest', where: 'Trail 02 · the boardwalk', when: 'all day', many: 'doing fine', size: '51 cm · 650 g', s: 'Almost silent, a soft "oo". You hear the wings first: whoosh.', note: 'The only bird left big enough to swallow the biggest forest fruit.' },
    { id: 'titi', n: 'TĪTĪ', w: 'sooty shearwater', lat: 'Ardenna grisea', hab: 'night', where: 'The coast, after dark', when: 'dusk, coming home', many: 'millions, but fewer', size: '45 cm · 800 g', s: 'Moans and croons from the burrows under your feet.', note: 'Flies to the north Pacific and back every year.' },
    { id: 'mohua', n: 'MOHUA', w: 'yellowhead', lat: 'Mohoua ochrocephala', hab: 'ridge', where: 'Trail 04 · beech trees', when: 'mid-morning', many: 'a few thousand', hot: 1, size: '15 cm · 30 g', s: 'A buzzing chatter, a whole flock at once.', note: 'Feeds upside down on the bark. On the old $100 note.' },
    { id: 'korimako', n: 'KORIMAKO', w: 'bellbird', lat: 'Anthornis melanura', hab: 'forest', where: 'Trail 02 & 04', when: 'dawn', many: 'doing fine', size: '20 cm · 30 g', s: 'Pure bells. Cook wrote it sounded like small bells, finely tuned.', note: 'The dawn chorus on the island starts with it.' },
    { id: 'piwakawaka', n: 'PĪWAKAWAKA', w: 'fantail', lat: 'Rhipidura fuliginosa', hab: 'meadow', where: 'every trail, behind you', when: 'all day', many: 'doing fine', size: '16 cm · 8 g', s: 'A cheeky "cheet cheet".', note: 'It follows you to eat the insects you wake up.' },
    { id: 'toutouwai', n: 'TOUTOUWAI', w: 'robin', lat: 'Petroica australis', hab: 'forest', where: 'Trail 02 · the ground', when: 'all day', many: 'doing fine here', size: '18 cm · 35 g', s: 'A long song of falling notes, sometimes for half an hour.', note: 'It will stand on your boot. Don\'t move.' },
    { id: 'titipounamu', n: 'TĪTIPOUNAMU', w: 'rifleman', lat: 'Acanthisitta chloris', hab: 'ridge', where: 'Trail 04 · the ridge', when: 'all day', many: 'doing fine', size: '8 cm · 6 g', s: 'A "zipt" so high that some adults can\'t hear it.', note: 'The smallest bird in New Zealand.', ext: 'm4a' },
  ];
  const byId = Object.fromEntries(B.map(b => [b.id, b]));
  const src = b => 'audio/' + b.id + '.' + (b.ext || 'mp3');
  const slot = (b, cls = '') => `<span class="slot ${cls}" data-img="BIRDS/${b.id}.jpg" data-note="${b.n.toLowerCase()}"></span>`;
  const fill = r => $$('.slot[data-img]', r).forEach(KP.fillSlot);

  /* ═══════════════ the voices: decode once, keep the real shape ═══════════════ */
  const CLIP = 30, BARS = 120;
  let AC = null;
  const peaks = {};
  const getPeaks = (b) => peaks[b.id] || (peaks[b.id] = (async () => {
    try {
      if (!AC) { const C = window.AudioContext || window.webkitAudioContext; AC = new C(); }
      const buf = await (await fetch(src(b))).arrayBuffer();
      const ab = await new Promise((res, rej) => AC.decodeAudioData(buf, res, rej));
      const d = ab.getChannelData(0), sr = ab.sampleRate;
      // skip the silence at the start: the first moment the bird is really there
      let mx = 0; for (let i = 0; i < d.length; i += 64) mx = Math.max(mx, Math.abs(d[i]));
      let st = 0; for (let i = 0; i < d.length; i += 64) if (Math.abs(d[i]) > mx * .22) { st = i; break; }
      const off = Math.max(0, st / sr - .25), len = Math.min(CLIP, ab.duration - off);
      const a = Math.floor(off * sr), n = Math.floor(len * sr), step = Math.max(1, Math.floor(n / BARS));
      const p = [];
      for (let k = 0; k < BARS; k++) { let m = 0; for (let i = a + k * step, e = Math.min(a + (k + 1) * step, d.length); i < e; i += 8) m = Math.max(m, Math.abs(d[i])); p.push(m); }
      const top = Math.max(...p) || 1;
      return { p: p.map(v => Math.pow(v / top, .7)), off, len };
    } catch (e) { return { p: Array.from({ length: BARS }, () => .15), off: 0, len: CLIP }; }
  })());

  const draw = (cv, pk, prog = 0, ink = '#0a0a09', dim = 'rgba(10,10,9,.22)', hot = '#e8821e') => {
    if (!cv || !pk) return;
    const r = devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (!w) return;
    if (cv.width !== Math.round(w * r)) { cv.width = Math.round(w * r); cv.height = Math.round(h * r); }
    const c = cv.getContext('2d'); c.setTransform(r, 0, 0, r, 0, 0); c.clearRect(0, 0, w, h);
    const n = pk.p.length, bw = w / n;
    pk.p.forEach((v, i) => {
      const bh = Math.max(1.5, v * (h - 2));
      c.fillStyle = i / n < prog ? hot : (prog > 0 ? ink : dim);
      if (prog === 0) c.fillStyle = ink;
      c.fillRect(i * bw + bw * .2, (h - bh) / 2, Math.max(1, bw * .6), bh);
    });
  };

  /* one player for the whole page */
  const au = new Audio(); au.preload = 'auto';
  let cur = null, curPk = null, curEnd = 0, onEnd = null, views = [];
  const stopAll = () => { au.pause(); if (cur) setUI(cur, false); cur = null; views = []; onEnd = null; };
  const setUI = (id, on) => {
    $$(`[data-play="${id}"]`).forEach(b => b.classList.toggle('on', on));
    $$(`.bd[data-id="${id}"]`).forEach(c => c.classList.toggle('playing', on));
  };
  // play(b, {max, views:[canvases], end})
  const play = async (b, o = {}) => {
    const same = cur === b.id && !au.paused;
    stopAll();
    if (same && !o.force) return;
    cur = b.id; setUI(b.id, true);
    const pk = curPk = await getPeaks(b);
    if (cur !== b.id) return;
    views = o.views || []; onEnd = o.end || null;
    curEnd = pk.off + Math.min(o.max || CLIP, pk.len);
    if (!au.src.endsWith(src(b))) au.src = src(b);
    try { au.currentTime = pk.off; } catch (e) {}
    au.volume = 0;
    au.play().then(() => { if (hasG) gsap.to(au, { volume: 1, duration: .6 }); else au.volume = 1; }).catch(() => { setUI(b.id, false); cur = null; });
  };
  const tick = () => {
    if (cur && curPk && !au.paused) {
      const prog = Math.min(1, (au.currentTime - curPk.off) / (curEnd - curPk.off));
      views.forEach(v => draw(v.cv, curPk, prog, v.ink, v.dim));
      $$(`.bd[data-id="${cur}"] time, .fc time`).forEach(t => t.textContent = fmt(Math.max(0, au.currentTime - curPk.off)));
      if (au.currentTime >= curEnd - .5 && !au._fading) {
        au._fading = true;
        const id = cur, fin = onEnd;
        const done = () => { au._fading = false; if (cur !== id) return; au.pause(); setUI(id, false); views.forEach(v => draw(v.cv, curPk, 0, v.ink, v.dim)); cur = null; fin && fin(); };
        if (hasG) gsap.to(au, { volume: 0, duration: .45, onComplete: done }); else done();
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  au.addEventListener('ended', () => { if (!cur) return; const fin = onEnd, id = cur; setUI(id, false); cur = null; fin && fin(); });

  /* ═══════════════ 2 · the fourteen cards ═══════════════ */
  const grid = $('.sp-grid');
  grid.innerHTML = B.map((b, i) => `
    <article class="bd" data-id="${b.id}" data-hab="${b.hab}">
      <div class="win" data-cur="open the field card" role="button" tabindex="0">${slot(b)}<div class="win-shade"></div>
        <span class="bd-k">${pad2(i + 1)} · ${b.w}</span><span class="bd-tag${b.hot ? ' hot' : ''}">${b.many}</span><h3>${b.n}</h3></div>
      <div class="pc">
        <div class="pl"><button class="pb" type="button" data-play="${b.id}" data-cur="listen" aria-label="play the call of the ${b.w}"></button><canvas></canvas><time>0:00</time></div>
        <p class="bd-s"><i>${b.lat}</i>${b.s}</p>
      </div>
    </article>`).join('');
  fill(grid);
  const cardCv = b => $(`.bd[data-id="${b.id}"] canvas`);
  // draw each voice when its card comes near
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const b = byId[e.target.dataset.id]; getPeaks(b).then(pk => draw(cardCv(b), pk));
  }), { rootMargin: '300px' });
  $$('.bd', grid).forEach(c => io.observe(c));
  addEventListener('resize', () => B.forEach(b => peaks[b.id] && peaks[b.id].then(pk => draw(cardCv(b), pk))));

  grid.addEventListener('click', e => {
    const pb = e.target.closest('.pb');
    if (pb) { const b = byId[pb.dataset.play]; stopChorus(); play(b, { views: [{ cv: cardCv(b) }] }); return; }
    const w = e.target.closest('.bd .win');
    if (w) openFc(B.indexOf(byId[w.closest('.bd').dataset.id]));
  });
  grid.addEventListener('keydown', e => { const w = e.target.closest('.bd .win'); if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFc(B.indexOf(byId[w.closest('.bd').dataset.id])); } });

  // where they live
  $('.sp-f').addEventListener('click', e => {
    const f = e.target.closest('button'); if (!f) return;
    $$('.sp-f button').forEach(x => x.classList.toggle('on', x === f));
    const k = f.dataset.f, cards = $$('.bd', grid);
    grid.classList.toggle('filtered', k !== 'all');
    cards.forEach(c => c.classList.toggle('hide', k !== 'all' && c.dataset.hab !== k));
    if (hasG) gsap.fromTo(cards.filter(c => !c.classList.contains('hide')), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .06, ease: 'expo.out' });
    B.forEach(b => peaks[b.id] && peaks[b.id].then(pk => draw(cardCv(b), pk)));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  /* ═══════════════ the field card ═══════════════ */
  const fc = $('.fc');
  let fi = 0;
  const openFc = (i) => {
    fi = (i + B.length) % B.length; const b = B[fi];
    $('.fc-img').innerHTML = slot(b); fill($('.fc-img'));
    $('.fc-t').innerHTML = `<small>${b.w} · ${b.lat}</small>${b.n}`;
    $('.fc-card').innerHTML = `<span class="pc-s"><b>FIELD CARD</b><b>${pad2(fi + 1)} / ${B.length}</b></span>
      <div class="fc-rows"><p><b>where</b>${b.where}</p><p><b>when</b>${b.when}</p><p><b>size</b>${b.size}</p><p><b>how many</b>${b.many}</p><p><b>sounds like</b>${b.s}</p><p><b>one more thing</b>${b.note}</p></div>
      <div class="pl"><button class="pb" type="button" data-play="${b.id}" data-cur="listen"></button><canvas></canvas><time>0:00</time></div>`;
    const cv = $('.fc-card canvas'); getPeaks(b).then(pk => draw(cv, pk));
    $('.fc-card .pb').addEventListener('click', () => { stopChorus(); play(b, { views: [{ cv }, { cv: cardCv(b) }] }); });
    if (fc.style.visibility !== 'visible') {
      document.documentElement.classList.add('fc-open'); KP.lenis && KP.lenis.stop();
      if (hasG) gsap.timeline().set(fc, { visibility: 'visible' }).to(fc, { opacity: 1, duration: .4 }).fromTo('.fc-win', { clipPath: 'inset(20% 20% 20% 20% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'expo.inOut' }, 0).from('.fc-t', { yPercent: 40, autoAlpha: 0, duration: 1.2, ease: 'expo.out' }, .5);
      else { fc.style.visibility = 'visible'; fc.style.opacity = 1; }
    } else if (hasG) gsap.fromTo(['.fc-img', '.fc-t', '.fc-card'], { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, stagger: .06 });
    fc.setAttribute('aria-hidden', 'false');
  };
  const closeFc = () => {
    stopAll(); fc.setAttribute('aria-hidden', 'true'); KP.lenis && KP.lenis.start();
    if (hasG) gsap.to(fc, { opacity: 0, duration: .4, onComplete: () => fc.style.visibility = 'hidden' }); else fc.style.visibility = 'hidden';
  };
  $('.fc-x').addEventListener('click', closeFc);
  $$('.fc-nav button').forEach(b => b.addEventListener('click', () => { stopAll(); openFc(fi + +b.dataset.d); }));
  addEventListener('keydown', e => {
    if (fc.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') closeFc();
    if (e.key === 'ArrowRight') { stopAll(); openFc(fi + 1); }
    if (e.key === 'ArrowLeft') { stopAll(); openFc(fi - 1); }
  });

  /* ═══════════════ 1 · the dawn chorus ═══════════════ */
  const ORDER = ['korimako', 'tui', 'kaka', 'hihi', 'toutouwai', 'piwakawaka', 'kereru', 'titipounamu', 'mohua', 'koekoea', 'takahe', 'kotuku', 'titi', 'kakapo'].map(id => byId[id]);
  const chImgs = $('.ch-imgs');
  chImgs.innerHTML = `<span class="slot first" data-img="HOME/hero.jpg" data-note="the island"></span>` + ORDER.map(b => slot(b)).join('');
  fill(chImgs);
  const chS = $$('.slot', chImgs), chCv = $('.ch-wave'), chBtn = $('.ch-play');
  let chOn = false, chI = -1, chZ = 2;
  const chShow = (i) => {
    const b = ORDER[i], s = chS[i + 1];
    s.style.zIndex = ++chZ;
    if (hasG && !RM) gsap.fromTo(s, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.inOut' });
    else s.style.clipPath = 'inset(0)';
    KP.scramble($('.ch-name'), b.n);
    $('.ch-sub').textContent = b.w + ' · ' + b.s;
    $('.ch-i').textContent = pad2(i + 1) + ' / ' + pad2(ORDER.length);
    $('.ch-now').textContent = b.where.toUpperCase();
  };
  const chNext = () => {
    if (!chOn) return;
    chI++;
    if (chI >= ORDER.length) { stopChorus(true); return; }
    chShow(chI);
    const b = ORDER[chI];
    getPeaks(b).then(pk => draw(chCv, pk, 0, 'rgba(10,10,9,.3)'));
    play(b, { force: true, max: 8, views: [{ cv: chCv, ink: 'rgba(10,10,9,.3)' }, { cv: cardCv(b) }], end: () => setTimeout(chNext, 250) });
  };
  function stopChorus(finished) {
    if (!chOn) return;
    chOn = false; chBtn.classList.remove('on'); $('span', chBtn).textContent = finished ? 'Play it again' : 'Play the dawn chorus';
    if (!finished) stopAll();
    if (finished) { KP.scramble($('.ch-name'), 'FOURTEEN'); $('.ch-sub').textContent = 'that was all of them. now go and find them'; }
  }
  chBtn.addEventListener('click', () => {
    if (chOn) { stopChorus(); return; }
    chOn = true; chI = -1; chBtn.classList.add('on'); $('span', chBtn).textContent = 'Stop the chorus';
    chNext();
  });
  getPeaks(ORDER[0]).then(pk => draw(chCv, pk, 0, 'rgba(10,10,9,.3)'));

  /* ═══════════════ 3 · who's singing? ═══════════════ */
  const qImgs = $('.qz-imgs');
  qImgs.innerHTML = B.map(b => slot(b)).join(''); fill(qImgs);
  const qCv = $('.qz-wave'), qPlay = $('.qz-play'), qOpts = $('.qz-opts');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let qRounds = [], qR = 0, qScore = 0, qDone = false;
  const qNew = () => { qRounds = shuffle(B).slice(0, 5); qR = 0; qScore = 0; qRound(); };
  const qRound = () => {
    stopAll(); qDone = false;
    const b = qRounds[qR];
    const opts = shuffle([b, ...shuffle(B.filter(x => x !== b)).slice(0, 3)]);
    qOpts.innerHTML = opts.map(o => `<button type="button" data-id="${o.id}">${o.n}<span>${o.w}</span></button>`).join('');
    $('.qz-n').textContent = (qR + 1) + ' / 5'; $('.qz-sc').textContent = 'SCORE ' + qScore;
    $('.qz-next').textContent = 'SKIP →';
    $$('.slot', qImgs).forEach(s => s.classList.remove('show'));
    $('.qz-ans').textContent = '';
    qPlay.dataset.play = b.id;
    getPeaks(b).then(pk => draw(qCv, pk, 0, 'rgba(242,236,220,.85)', 'rgba(242,236,220,.3)'));
  };
  qPlay.addEventListener('click', () => {
    const b = qRounds[qR]; stopChorus();
    qPlay.classList.add('on');
    play(b, { max: 14, views: [{ cv: qCv, ink: 'rgba(242,236,220,.85)', dim: 'rgba(242,236,220,.3)' }], end: () => qPlay.classList.remove('on') });
  });
  qOpts.addEventListener('click', e => {
    const o = e.target.closest('button'); if (!o || qDone) return;
    qDone = true;
    const b = qRounds[qR], ok = o.dataset.id === b.id;
    if (ok) qScore++;
    $$('button', qOpts).forEach(x => { x.disabled = true; if (x.dataset.id === b.id) x.classList.add('ok'); else if (x === o) x.classList.add('no'); });
    const s = $$('.slot', qImgs)[B.indexOf(b)];
    s.style.zIndex = 2; $$('.slot', qImgs).forEach(x => { if (x !== s) x.style.zIndex = 1; });
    if (hasG) gsap.fromTo(s, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.inOut', onComplete: () => s.classList.add('show') }); else s.classList.add('show');
    KP.scramble($('.qz-ans'), ok ? b.n : b.n);
    $('.qz-sc').textContent = 'SCORE ' + qScore;
    KP.toast(ok ? 'yes' : 'no', ok ? `that's the ${b.w}. ${b.note.toLowerCase()}` : `it was the ${b.w}. ${b.s.toLowerCase()}`);
    $('.qz-next').textContent = qR === 4 ? 'SEE SCORE →' : 'NEXT →';
  });
  $('.qz-next').addEventListener('click', () => {
    if ($('.qz-next').textContent.startsWith('AGAIN')) { qNew(); return; }
    if (qR === 4 && qDone) {
      stopAll();
      const v = qScore >= 4 ? 'you could be a ranger.' : qScore >= 2 ? 'not bad. come and listen in person.' : 'the birds forgive you.';
      $('.qz-ans').textContent = qScore + ' / 5';
      qOpts.innerHTML = `<p style="padding:10px 4px;font:400 26px/1.05 var(--serif)">${v}</p>`;
      $('.qz-next').textContent = 'AGAIN →'; return;
    }
    qR = Math.min(4, qR + 1); qRound();
  });
  qNew();

  /* ═══════════════ 4 · the recordings ═══════════════ */
  const CRED = {"kotuku": ["kotuku", "Stanislas Wroza", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Great_Egret_(Ardea_alba_alba)_call.ogg"], "kakapo": ["kakapo", "Mnolf", "CC BY 2.5", "https://commons.wikimedia.org/wiki/File:051226-kakapo-billbooming.ogg"], "takahe": ["takahe", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Porphyrio_hochstetteri_-_Takahe-song-10.mp3"], "hihi": ["hihi", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Stitchbird_-_hihi_-_song.mp3"], "tui": ["tui", "Marshelec", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tui_song_-_Trelissick_Park_-8_March_2021.ogg"], "kaka": ["kaka", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:South-island-kaka.mp3"], "kereru": ["kereru", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Nz-pigeon-song.wav"], "mohua": ["mohua", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Yellowhead-song.ogg"], "korimako": ["korimako", "Sabine's Sunbird", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:New_Zealand_Bellbird_(Anthornis_melanura).ogg"], "piwakawaka": ["piwakawaka", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:South-island-fantail.mp3"], "toutouwai": ["toutouwai", "Department of Conservation", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:South-island-robin-song-48.wav"], "koekoea": ["koekoea", "Matt Slaymaker", "CC BY-NC-SA 4.0", "https://xeno-canto.org/467378"], "titi": ["titi", "David Boyle", "CC BY-NC-SA 4.0", "https://xeno-canto.org/1011959"], "titipounamu": ["titipounamu", "Meena Haribal", "CC BY-NC-SA 4.0", "https://xeno-canto.org/960628"]};
  $('.cr-list').innerHTML = B.map(b => { const c = CRED[b.id]; return `<li><b>${b.n.charAt(0) + b.n.slice(1).toLowerCase()}</b><span>${c[1]} · ${c[2]}</span><a href="${c[3]}" target="_blank" rel="noopener" data-cur="the recording">source ↗</a></li>`; }).join('');

  /* ═══════════════ motion ═══════════════ */
  if (hasG && !RM) {
    gsap.set(['.ch-t', '.ch-card', '.ch-k'], { autoAlpha: 0 });
    KP.ready.then(() => gsap.timeline()
      .fromTo('.ch-imgs .first', { scale: 1.2 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .fromTo('.ch-t', { autoAlpha: 0, y: 60, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' }, .2)
      .fromTo(['.ch-k', '.ch-card'], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: .1, ease: 'expo.out' }, .5));
    $$('.sp-head').forEach(h => gsap.from(h.children, { y: 50, autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    $$('.bd').forEach(c => gsap.from(c, { y: 90, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 92%' } }));
    gsap.fromTo('.qz-win', { clipPath: 'inset(12% 8% 12% 8% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.qz-win', start: 'top bottom', end: 'top 15%', scrub: true } });
    $$('.cr-list li').forEach(li => gsap.from(li, { y: 20, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 95%' } }));
    const fb = $('.ft-big');
    fb.innerHTML = fb.textContent.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
    gsap.from($$('span', fb), { yPercent: 70, autoAlpha: 0, duration: 1.6, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 90%' } });
    addEventListener('load', () => ScrollTrigger.refresh());
  }
  // leave the page quiet when the tab is hidden
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stopChorus(); stopAll(); } });
})();
