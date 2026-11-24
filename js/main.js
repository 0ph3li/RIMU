/* ═══════════════════════════════════════════════════════════════
   RIMU — bird park · shared engine (window.KP) · v6 "window"
   concept, design & code by ghostly.grl ♥

   image slots, lenis, the small-light cursor, scramble, magnetic,
   sound (one soft call), toast for pages still asleep, tab title,
   konami (the rimu fruits), loader (the window draws itself), console
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const KP = (window.KP = {});
  const RM = (KP.RM = matchMedia('(prefers-reduced-motion: reduce)').matches);
  const FINE = (KP.FINE = matchMedia('(hover: hover) and (pointer: fine)').matches);
  const $ = (KP.$ = (s, r = document) => r.querySelector(s));
  const $$ = (KP.$$ = (s, r = document) => [...r.querySelectorAll(s)]);
  KP.get = (k, d) => { try { const v = localStorage.getItem('rm-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  KP.set = (k, v) => { try { localStorage.setItem('rm-' + k, JSON.stringify(v)); } catch (e) {} };
  if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.clearScrollMemory('manual'); }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);

  /* ═══════════════ image slots ═══════════════ */
  KP.fillSlot = (el) => {
    const path = el.dataset.img;
    el.classList.remove('has-img');
    $$(':scope > img', el).forEach(i => i.remove());
    el.dataset.label = path ? 'img/' + path + (el.dataset.note ? ' — ' + el.dataset.note : '') : (el.dataset.note || '');
    if (!path) return;
    const base = path.replace(/\.(jpe?g|png|webp)$/i, '');
    const tries = [path, base + '.png', base + '.webp', base + '.jpg', base + '.jpeg'].filter((v, i, a) => a.indexOf(v) === i);
    const go = (i) => {
      if (i >= tries.length || el.dataset.img !== path) return;
      const im = new Image(); im.alt = ''; im.decoding = 'async';
      im.onload = () => { if (el.dataset.img !== path) return; el.prepend(im); el.classList.add('has-img'); };
      im.onerror = () => go(i + 1);
      im.src = 'img/' + tries[i];
    };
    go(0);
  };
  $$('.slot[data-img]').forEach(KP.fillSlot);

  /* ═══════════════ lenis ═══════════════ */
  if (window.Lenis && !RM) {
    const lenis = (KP.lenis = new Lenis({ duration: 1.3, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true }));
    if (window.ScrollTrigger) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { duration: 2 }); } }));
  }

  /* the top bar gets a soft shade once you leave the first screen */
  const top = $('.top');
  // the page menu steps aside while you scroll down, and comes back when you scroll up
  const nav = $('.nav');
  let lastY = 0;
  // on the home the bar waits for the first window to open (home.js adds .show); elsewhere it's there at once
  if (top) {
    if (!document.body.classList.contains('home')) top.classList.add('show');
    const st = () => { if (innerWidth > 900 && scrollY > lastY + 2 && scrollY > innerHeight) top.classList.add('away'); if (scrollY < lastY - 2) top.classList.remove('away'); lastY = scrollY; };
    addEventListener('scroll', st, { passive: true }); st();
  }

  /* ═══════════════ cursor: a small light ═══════════════ */
  KP.mx = innerWidth / 2; KP.my = innerHeight / 2;
  addEventListener('pointermove', e => { KP.mx = e.clientX; KP.my = e.clientY; }, { passive: true });
  const cur = $('.cur');
  if (cur && FINE && window.gsap) {
    const lab = $('span', cur);
    const qx = gsap.quickTo(cur, 'x', { duration: .2, ease: 'power3' }), qy = gsap.quickTo(cur, 'y', { duration: .2, ease: 'power3' });
    addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cur]');
      cur.classList.toggle('big', !!t);
      lab.dataset.t = t ? t.dataset.cur : '';
    });
  }

  /* ═══════════════ scramble ═══════════════ */
  const GLY = 'āēīōū·';
  KP.scramble = (el, txt = el.dataset.text || el.textContent) => {
    el.dataset.text = txt;
    if (RM) { el.textContent = txt; return; }
    clearInterval(el._s);
    let f = 0; const n = 14;
    el._s = setInterval(() => {
      el.textContent = txt.split('').map((c, i) => i < (f / n) * txt.length || c === ' ' ? c : GLY[Math.random() * GLY.length | 0]).join('');
      if (++f > n) { clearInterval(el._s); el.textContent = txt; }
    }, 34);
  };
  if (window.ScrollTrigger) $$('[data-scramble]').forEach(el => {
    el.dataset.text = el.textContent;
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => KP.scramble(el) });
  });

  /* ═══════════════ magnetic ═══════════════ */
  if (FINE && window.gsap) $$('[data-magnetic]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .5, ease: 'power3' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
  });

  /* ═══════════════ sound: off by default. a soft bird call ═══════════════ */
  let AC = null;
  KP.sound = KP.get('sound', false);
  const ac = () => { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (C) AC = new C(); } if (AC && AC.state === 'suspended') AC.resume(); return AC; };
  // a two-note whistle that slides, like a bellbird far away
  KP.call = (f = 1800, v = .035) => {
    if (!KP.sound) return; const a = ac(); if (!a) return;
    const t = a.currentTime;
    [[0, f, f * 1.25], [.22, f * 1.18, f * .92]].forEach(([d, f0, f1]) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f0, t + d); o.frequency.exponentialRampToValueAtTime(f1, t + d + .18);
      g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(v, t + d + .03); g.gain.exponentialRampToValueAtTime(.0001, t + d + .22);
      o.connect(g).connect(a.destination); o.start(t + d); o.stop(t + d + .25);
    });
  };
  const snds = $$('.snd');
  const sndTxt = () => snds.forEach(snd => { snd.textContent = KP.sound ? 'Sound on' : 'Sound off'; snd.classList.toggle('on', KP.sound); snd.dataset.cur = KP.sound ? 'bird calls on' : 'bird calls · off'; });
  snds.forEach(snd => snd.addEventListener('click', () => { KP.sound = !KP.sound; KP.set('sound', KP.sound); if (KP.sound) { ac(); KP.call(); } sndTxt(); }));
  sndTxt();

  /* ═══════════════ pages that exist (a fixed list, so it works opened as a file) ═══════════════ */
  const toast = $('.toast');
  KP.toast = (k, txt) => {
    if (!toast || !window.gsap) return;
    toast.innerHTML = `<b>${k}</b><span>${txt}</span>`;
    gsap.killTweensOf(toast);
    gsap.timeline().to(toast, { autoAlpha: 1, duration: .4, ease: 'power3.out' }).to(toast, { autoAlpha: 0, duration: .6 }, '+=2');
  };
  KP.PAGES = ['index.html', 'birds.html', 'trails.html', 'adopt.html', 'visit.html'];
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('a[href$=".html"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here) a.classList.add('here');
    if (!KP.PAGES.includes(href)) a.addEventListener('click', e => { e.preventDefault(); KP.toast('soon', 'this trail is still closed. it opens soon.'); });
  });
  const mbtn = $('.mbtn');
  if (mbtn) mbtn.addEventListener('click', () => { const o = document.documentElement.classList.toggle('nav-open'); mbtn.textContent = o ? 'close' : 'menu'; });

  /* ═══════════════ tab title ═══════════════ */
  const title = document.title;
  document.addEventListener('visibilitychange', () => { document.title = document.hidden ? 'the birds are still here. come back' : title; });

  /* ═══════════════ konami: the rimu fruits ═══════════════ */
  const K = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a'.split(' ');
  let ki = 0;
  addEventListener('keydown', e => {
    ki = e.key === K[ki] ? ki + 1 : (e.key === K[0] ? 1 : 0);
    if (ki === K.length) { ki = 0; KP.mast(); }
  });
  KP.mast = () => {
    const b = $('.boomall'); if (!b || !window.gsap) return;
    b.innerHTML = '<p>the rimu fruited.<br>it\'s a breeding year.</p>' + '<i></i>'.repeat(90);
    gsap.set(b, { autoAlpha: 1 });
    const tl = gsap.timeline({ onComplete: () => gsap.set(b, { autoAlpha: 0 }) });
    tl.from($('p', b), { autoAlpha: 0, duration: 1 }, 0);
    $$('i', b).forEach(f => { f.style.left = Math.random() * 100 + '%'; tl.to(f, { y: innerHeight + 30, duration: 1.6 + Math.random() * 2, ease: 'power1.in' }, Math.random() * 2.4); });
    for (let k = 0; k < 5; k++) tl.add(() => KP.call(1500 + k * 140), k * .5);
    tl.to($('p', b), { autoAlpha: 0, duration: .8 }, '-=.8');
  };

  /* ═══════════════ the island's clock (new zealand time) ═══════════════ */
  KP.nzNow = () => {
    try {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' }).formatToParts(new Date());
      const g = t => (p.find(x => x.type === t) || {}).value;
      return { h: +g('hour') % 24, m: +g('minute'), day: g('weekday') };
    } catch (e) { const d = new Date(); return { h: d.getHours(), m: d.getMinutes(), day: '' }; }
  };
  KP.OPEN = [8, 18]; // the park is open 08:00 – 18:00, island time

  /* ═══════════════ loader: the day runs along the ruler to now (once per visit) ═══════════════ */
  KP.ready = new Promise(res => {
    const L = $('.loader');
    if (!L || !window.gsap) { L && L.remove(); return res(); }
    const seen = sessionStorage.getItem('rm-in');
    sessionStorage.setItem('rm-in', 1);
    if (seen || RM) { gsap.to(L, { autoAlpha: 0, duration: .4, onComplete: () => L.remove() }); return res(); }
    // the mark, then the window draws itself where the first photo will be
    const R = $('rect', L), W = $('.hero-win') || $('.win');
    const g = W ? W.getBoundingClientRect() : { left: innerWidth * .07, top: innerHeight * .125, width: innerWidth * .86, height: innerHeight * .75 };
    const rr = W ? parseFloat(getComputedStyle(W).borderTopLeftRadius) || 16 : 16;
    Object.entries({ x: g.left + .75, y: g.top + .75, width: g.width - 1.5, height: g.height - 1.5, rx: rr, pathLength: 1 }).forEach(([k, v]) => R.setAttribute(k, v));
    gsap.set(R, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.timeline({ onComplete: () => L.remove() })
      .from('.ld-mark', { scale: 0, rotation: -200, duration: 1.2, ease: 'expo.out' }, 0)
      .from('.ld-s', { autoAlpha: 0, duration: .8 }, .3)
      .to(R, { strokeDashoffset: 0, duration: 1.5, ease: 'expo.inOut' }, .5)
      .to(['.ld-mark', '.ld-s'], { autoAlpha: 0, duration: .5 }, 1.7)
      .to(L, { backgroundColor: 'rgba(10,10,9,0)', duration: .9, ease: 'power2.inOut' }, 1.9)
      .add(res, 2)
      .to(R, { autoAlpha: 0, duration: .4 }, 2.6);
  });


  /* ═══════════════ console ═══════════════ */
  console.log('%c\n          .-"""-.\n         / .   . \\      RIMU · bird park\n        |  (o_o)  |     whenua hou, new zealand\n         \\ \\___/ /      open 08:00 – 18:00.\n          `-...-´\n                                   /\\_/\\\n                                  ( o.o )  the cat is not allowed\n                                   > ^ <   in the park. ever.\n\n   ┌─┐┬ ┬┌─┐┌─┐┌┬┐┬ ┬ ┬  ┌─┐┬─┐┬\n   │ ┬├─┤│ │└─┐ │ │ └┬┘  │ ┬├┬┘│\n   └─┘┴ ┴└─┘└─┘ ┴ ┴─┘┴ o └─┘┴└─┴─┘ ♥\n\n   concept, design & code by ghostly.grl ♥\n   try KP.help()\n', 'color:#e8821e;font-family:monospace;font-size:12px');
  KP.help = () => console.log('KP.mast()      → the rimu fruits (or konami)\nKP.call()      → a bird call (turn sound on)\nKP.toast(k, t) → a small note');
})();
