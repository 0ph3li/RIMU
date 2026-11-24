/* ═══════════════════════════════════════════════════════════════
   RIMU — trails · v6 "window"
   concept, design & code by ghostly.grl ♥

   the map is pinned. scrolling moves an orange dot along the four
   trails, stop by stop; the window on the right shows that stop.
   then the walker's pact: six promises, saved on your device.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, RM } = KP;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const pad2 = n => String(n).padStart(2, '0');
  const NS = 'http://www.w3.org/2000/svg';
  const fill = r => $$('.slot[data-img]', r).forEach(KP.fillSlot);

  /* ═══════════════ the hero: is the gate open? ═══════════════ */
  const status = () => {
    const t = KP.nzNow(), open = t.h >= KP.OPEN[0] && t.h < KP.OPEN[1];
    $('.nz-t').textContent = pad2(t.h) + ':' + pad2(t.m);
    $('.tr-light').textContent = open ? (t.h < 16 ? 'trails open · good light' : 'trails open · last ferry 18:20') : 'trails closed · the birds have the island';
  };
  status(); setInterval(status, 20000);

  /* ═══════════════ the four trails, the thirteen stops ═══════════════ */
  const TR = [
    { n: 'THE ESTUARY', km: 1.2, time: '40 min · easy', d: 'M170 452 C210 470 250 480 300 481 C340 482 372 470 404 448', lx: 410, ly: 470 },
    { n: 'THE BOARDWALK', km: 2.4, time: '1 h 10 · easy', d: 'M170 452 C160 410 172 372 204 342 C234 314 268 302 300 282', lx: 150, ly: 330 },
    { n: 'THE MEADOW', km: 1.8, time: '50 min · easy', d: 'M170 452 C220 432 270 412 320 392 C362 376 404 360 446 328', lx: 452, ly: 318 },
    { n: 'THE RIDGE', km: 3.6, time: '2 h · steep', d: 'M300 282 C318 240 338 202 368 172 C398 142 430 128 462 118', lx: 380, ly: 106 },
  ];
  const ST = [
    { tr: 0, f: .12, img: 'e1', w: 'the mudflats', b: 'tōrea, kōtuku', t: 'Low tide. The whole bay turns to mirror and the herons walk on it.' },
    { tr: 0, f: .4, img: 'e3', w: 'the shell bank', b: 'tōrea · oystercatcher', t: 'The oystercatchers shout at you. They shout at everyone.' },
    { tr: 0, f: .7, img: 'e4', w: 'the rocks', b: 'kawau · shag', t: 'Shags drying their wings, like coats on a line.' },
    { tr: 0, f: 1, img: 'e2', w: 'the hide', b: 'kōtuku, if you\'re lucky', t: 'A wooden hide over the water. Sit. The white heron comes at nine.' },
    { tr: 1, f: .2, img: 'b1', w: 'into the forest', b: 'pīwakawaka', t: 'The boardwalk goes in. A fantail follows you from the first step.' },
    { tr: 1, f: .6, img: 'b2', w: 'the feeders', b: 'hihi · tūī · korimako', t: 'Sugar water in the tree ferns. The hihi drink upside down.' },
    { tr: 1, f: 1, img: 'b3', w: 'the big rimu', b: 'kākā', t: 'The tree the park is named after. Six hundred years old, more or less.' },
    { tr: 2, f: .25, img: 'm1', w: 'the tussock', b: 'takahē', t: 'Golden grass up to your waist. Something blue moves in it.' },
    { tr: 2, f: .62, img: 'm2', w: 'the picnic table', b: 'takahē, pūkeko', t: 'One table, in the open. The takahē will come and check your lunch.' },
    { tr: 2, f: 1, img: 'm3', w: 'the swamp edge', b: 'pūkeko', t: 'Pūkeko, the takahē\'s loud cousin. They can fly. Badly.' },
    { tr: 3, f: .25, img: 'r1', w: 'the moss', b: 'mohua · yellowhead', t: 'Beech forest, everything green and soft. Listen for a buzzing flock.' },
    { tr: 3, f: .6, img: 'r2', w: 'the old beech', b: 'koekoeā · cuckoo', t: 'The trail gets steep and quiet. The cuckoo screams from the top.' },
    { tr: 3, f: 1, img: 'r3', w: 'the summit', b: 'tūī · the 16:00 chorus', t: 'Red rātā in flower and the whole sea below. Sit down here at four.' },
  ];
  const before = i => TR.slice(0, i).reduce((s, t) => s + t.km, 0);

  /* draw the map */
  const svg = $('.mp-map svg');
  const land = $('.mp-land');
  const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); p.append(e); return e; };
  // the sea: the coast repeated outward, like depth lines
  [1.1, 1.22, 1.36, 1.52].forEach(s => mk('path', { d: land.getAttribute('d'), class: 'mp-sea', transform: `translate(${310 * (1 - s)} ${290 * (1 - s)}) scale(${s})` }, $('.mp-seas')));
  const trP = TR.map(t => mk('path', { d: t.d, class: 'mp-tr' }, $('.mp-trs')));
  const trL = trP.map(p => p.getTotalLength());
  const stE = ST.map(s => { const pt = trP[s.tr].getPointAtLength(trL[s.tr] * s.f); return mk('circle', { cx: pt.x, cy: pt.y, r: 4.5, class: 'mp-st' }, $('.mp-sts')); });
  const lbls = TR.map((t, i) => { const e = mk('text', { x: t.lx, y: t.ly, class: 'mp-lbl', 'text-anchor': 'middle' }, $('.mp-lbls')); e.textContent = pad2(i + 1) + ' ' + t.n.replace('THE ', '').toLowerCase(); return e; });
  const jetty = mk('text', { x: 150, y: 482, class: 'mp-lbl on', 'text-anchor': 'middle' }, $('.mp-lbls')); jetty.textContent = 'the jetty';
  const on = $('.mp-on'), you = $('.mp-you'), youR = $('.mp-you-r');

  /* the window */
  const imgs = $('.mp-imgs');
  imgs.innerHTML = ST.map((s, i) => `<span class="slot${i ? '' : ' first'}" data-img="TRAILS/${s.img}.jpg" data-note="${s.w}"${s.tr === 0 ? ' data-tone="sea"' : s.tr === 2 ? ' data-tone="sun"' : ''}></span>`).join('');
  fill(imgs);
  const sl = $$('.slot', imgs);

  let cur = -1, ctr = -1, z = 2;
  const walk = { f: 0 };
  const place = () => {
    const t = Math.max(0, ctr), L = trL[t], pt = trP[t].getPointAtLength(L * walk.f);
    on.setAttribute('d', TR[t].d); on.style.strokeDasharray = L; on.style.strokeDashoffset = L * (1 - walk.f);
    [you, youR].forEach(c => { c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); });
    $('.mp-km').textContent = (before(t) + TR[t].km * walk.f).toFixed(1) + ' km';
  };
  const setStop = (i) => {
    if (i === cur) return;
    const s = ST[i], first = cur < 0, newTr = s.tr !== ctr;
    cur = i;
    if (newTr) { ctr = s.tr; walk.f = 0; KP.scramble($('.mp-t'), TR[ctr].n); }
    // the dot walks to the stop
    if (hasG && !RM && !first) gsap.to(walk, { f: s.f, duration: .9, ease: 'power2.inOut', onUpdate: place, overwrite: true });
    else { walk.f = s.f; place(); }
    stE.forEach((e, k) => e.classList.toggle('seen', k <= i));
    lbls.forEach((e, k) => e.classList.toggle('on', k === ctr));
    // the window
    const el = sl[i]; el.style.zIndex = ++z;
    if (hasG && !RM && !first) gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.inOut', overwrite: true });
    else el.style.clipPath = 'inset(0)';
    $('.mp-tk').innerHTML = `Trail ${pad2(ctr + 1)} <em>/ 04</em>`;
    $('.mp-tm').textContent = TR[ctr].km + ' km · ' + TR[ctr].time;
    $('.mp-ck').textContent = 'STOP ' + pad2(i + 1);
    $('.mp-cw').textContent = s.w.toUpperCase();
    KP.scramble($('.mp-cp'), s.t);
    $('.mp-cb').textContent = s.b.toUpperCase();
    $('.mp-ci').textContent = (i + 1) + ' / ' + ST.length;
    $('.mp-tn').textContent = 'Trail ' + pad2(ctr + 1);
    $('.mp-sn').textContent = 'stop ' + (i + 1) + ' / ' + ST.length;
    $('.mp-legend span').lastChild.textContent = TR[ctr].n.replace('THE ', 'the ').toLowerCase();
    if (!first) KP.call(1400 + i * 60, .02);
  };
  setStop(0);

  let mapST = null;
  if (hasG && !RM) {
    mapST = ScrollTrigger.create({
      trigger: '.mp-pin', pin: true, start: 'top top', end: '+=' + ST.length * 45 + '%', scrub: true,
      onUpdate: s => { setStop(Math.min(ST.length - 1, Math.floor(s.progress * ST.length))); $('.mp-bar i').style.width = s.progress * 100 + '%'; },
    });
  } else {
    // no motion: click the stops instead
    stE.forEach((e, k) => { e.style.cursor = 'pointer'; e.addEventListener('click', () => setStop(k)); });
  }

  // the hero card: jump to the first stop of a trail
  $$('.ph-in button').forEach(b => b.addEventListener('click', () => {
    const t = +b.dataset.go, k = ST.findIndex(s => s.tr === t);
    if (mapST && KP.lenis) KP.lenis.scrollTo(mapST.start + (k + .5) / ST.length * (mapST.end - mapST.start), { duration: 2.2 });
    else { $('#map').scrollIntoView({ behavior: 'smooth' }); setStop(k); }
  }));

  /* ═══════════════ the walker's pact ═══════════════ */
  const PACT = [
    ['Check your bag', 'for seeds, soil and mice. Yes, mice. It has happened.'],
    ['Scrub your boots', 'at the jetty, before the first step. The brushes are there.'],
    ['Stay on the path', 'the kākāpō nest on the ground and you won\'t see them.'],
    ['Feed no one', 'not the takahē, not the kākā, not even with a look.'],
    ['Red light only', 'after dark. White torches blind the night birds.'],
    ['Take it all back', 'every wrapper, every crumb, every apple core.'],
  ];
  const kept = KP.get('pact', []);
  const list = $('.pa-list');
  list.innerHTML = PACT.map((p, i) => `<li class="${kept.includes(i) ? 'ok' : ''}" data-i="${i}" data-cur="promise" role="button" tabindex="0"><span class="n">${pad2(i + 1)}</span><h3>${p[0]}</h3><p>${p[1]}</p><i></i></li>`).join('');
  const count = () => { const n = $$('.pa-list li.ok').length; $('.pa-count b').textContent = n; return n; };
  count();
  const tick = li => {
    li.classList.toggle('ok');
    const n = count();
    KP.set('pact', $$('.pa-list li.ok').map(x => +x.dataset.i));
    if (li.classList.contains('ok')) { KP.call(1600 + n * 120, .025); if (hasG) gsap.fromTo($('h3', li), { x: -10 }, { x: 0, duration: .8, ease: 'elastic.out(1,.4)' }); }
    if (n === PACT.length && li.classList.contains('ok')) KP.toast('promised', 'six out of six. the island says thank you. see you at the jetty.');
  };
  list.addEventListener('click', e => { const li = e.target.closest('li'); if (li) tick(li); });
  list.addEventListener('keydown', e => { const li = e.target.closest('li'); if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); tick(li); } });

  /* ═══════════════ motion ═══════════════ */
  if (hasG && !RM) {
    gsap.set(['.ph-t', '.ph-card', '.ph-k', '.ph-r'], { autoAlpha: 0 });
    KP.ready.then(() => gsap.timeline()
      .fromTo('.ph-win>.slot', { scale: 1.2 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .fromTo('.ph-t', { autoAlpha: 0, y: 60, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' }, .2)
      .fromTo(['.ph-k', '.ph-r', '.ph-card'], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: .1, ease: 'expo.out' }, .5));
    gsap.fromTo('.mp-map path.mp-land', { strokeDasharray: 1600, strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut', scrollTrigger: { trigger: '.mp-pin', start: 'top 70%' } });
    gsap.from('.mp-tr', { autoAlpha: 0, duration: 1, stagger: .2, scrollTrigger: { trigger: '.mp-pin', start: 'top 50%' } });
    $$('.sh').forEach(h => gsap.from(h.children, { y: 50, autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    gsap.from('.pa-list li', { y: 40, autoAlpha: 0, duration: 1.2, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: '.pa-list', start: 'top 80%' } });
    gsap.fromTo('.nx-win', { clipPath: 'inset(12% 8% 12% 8% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.nx', start: 'top bottom', end: 'top 20%', scrub: true } });
    const fb = $('.ft-big');
    fb.innerHTML = fb.textContent.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
    gsap.from($$('span', fb), { yPercent: 70, autoAlpha: 0, duration: 1.6, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 90%' } });
    addEventListener('load', () => ScrollTrigger.refresh());
  }
})();
