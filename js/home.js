/* ═══════════════════════════════════════════════════════════════
   RIMU — home · v6 "window"
   concept, design & code by ghostly.grl ♥

   the window opens on scroll · a card of the birds seen today ·
   words that light up · a card that follows your hand over the
   names · trail windows that stack · a clock that runs the day ·
   huts you drag · cards that turn · a ticket you can fill
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, RM, FINE } = KP;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const pad2 = n => String(n).padStart(2, '0');
  const slot = (img, note, tone) => `<span class="slot" data-img="HOME/${img}.jpg" data-note="${note}"${tone ? ` data-tone="${tone}"` : ''}></span>`;
  const fill = root => $$('.slot[data-img]', root).forEach(KP.fillSlot);

  /* ═══════════════ the birds ═══════════════ */
  const BIRDS = [
    { n: 'KŌTUKU', id: 'kotuku', w: 'white heron', lat: 'Ardea alba modesta', note: 'One colony in the whole country. It fishes the estuary at nine.', tone: 'sea' },
    { n: 'KĀKĀPŌ', id: 'kakapo', w: 'night parrot', lat: 'Strigops habroptilus', note: 'Can\'t fly, smells of honey, booms at night. Hut guests only.', tone: 'night' },
    { n: 'TAKAHĒ', id: 'takahe', w: 'swamp hen', lat: 'Porphyrio hochstetteri', note: 'Thought extinct for fifty years. Now it eats the meadow.' },
    { n: 'HIHI', id: 'hihi', w: 'stitchbird', lat: 'Notiomystis cincta', note: 'Small and fast, it drinks nectar like a hummingbird.', tone: 'sun' },
    { n: 'TŪĪ', id: 'tui', w: 'parson bird', lat: 'Prosthemadera novaeseelandiae', note: 'Two voice boxes. It copies every sound it hears.' },
    { n: 'KOEKOEĀ', id: 'koekoea', w: 'long-tailed cuckoo', lat: 'Urodynamis taitensis', note: 'The tail is longer than the bird. It flies in from the Pacific.' },
  ];

  /* ═══════════════ island time: open or closed ═══════════════ */
  const status = () => {
    const t = KP.nzNow(), open = t.h >= KP.OPEN[0] && t.h < KP.OPEN[1];
    const hm = pad2(t.h) + ':' + pad2(t.m);
    $$('.nz-t').forEach(e => e.textContent = hm);
    const ho = $('.hh-open');
    if (ho) { ho.textContent = open ? 'Open now · till 18:00' : 'Closed · opens 08:00'; ho.classList.toggle('on', open); }
    const vn = $('.vi-now');
    if (vn) vn.textContent = open ? `It's ${hm} on the island. The park is open, last ferry 18:20.` : `It's ${hm} on the island. The birds are alone till 08:00.`;
    return t;
  };
  status(); setInterval(status, 20000);

  /* ═══════════════ 1 · hero ═══════════════ */
  const hcImgs = $('.hc-imgs');
  hcImgs.innerHTML = BIRDS.map(b => slot('b-' + b.id, b.n.toLowerCase(), b.tone)).join('');
  fill(hcImgs);
  const hcS = $$('.slot', hcImgs);
  let hc = 4, hz = 1;
  hcS[hc].classList.add('on');
  const seenAt = k => { const t = KP.nzNow(); let m = t.h * 60 + t.m - 7 - k * 23; m = (m + 1440) % 1440; return pad2(m / 60 | 0) + ':' + pad2(m % 60); };
  $('.hc-time').textContent = seenAt(0);
  let seenK = 0;
  const nextSeen = () => {
    hc = (hc + 1) % BIRDS.length; seenK++;
    const s = hcS[hc];
    s.style.zIndex = ++hz;
    if (hasG && !RM) gsap.fromTo(s, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'expo.inOut' });
    else s.style.clipPath = 'inset(0)';
    KP.scramble($('.hc-name'), BIRDS[hc].n);
    KP.scramble($('.hc-time'), seenAt(seenK % 9));
  };
  let hcTimer = setInterval(nextSeen, 3200);
  $('.hero-card').addEventListener('click', () => { clearInterval(hcTimer); nextSeen(); KP.call(1600 + hc * 120); hcTimer = setInterval(nextSeen, 3200); });

  const heroWin = $('.hero-win'), heroImg = $('.hero-img'), heroT = $('.hero-t');
  if (hasG && !RM) {
    // the photo breathes a little with the hand
    if (FINE) {
      const qx = gsap.quickTo(heroImg, 'xPercent', { duration: 1.4, ease: 'power3' }), qy = gsap.quickTo(heroImg, 'yPercent', { duration: 1.4, ease: 'power3' });
      $('.hero').addEventListener('pointermove', e => { qx((e.clientX / innerWidth - .5) * -2.4); qy((e.clientY / innerHeight - .5) * -2.4); });
    }
    gsap.set(heroImg, { scale: 1.12 });
    gsap.set([heroT.children, '.hh > *', '.hero-card', '.hero-scroll'], { autoAlpha: 0 });
    KP.ready.then(() => {
      gsap.timeline()
        .fromTo(heroImg, { scale: 1.3 }, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 0)
        .fromTo(heroT.children, { autoAlpha: 0, yPercent: 50, filter: 'blur(14px)' }, { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.6, stagger: .14, ease: 'expo.out' }, .15)
        .fromTo('.hh > *', { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 1, stagger: .08, ease: 'expo.out' }, .4)
        .fromTo('.hero-card', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'expo.out' }, .7)
        .to('.hero-scroll', { autoAlpha: 1, duration: 1 }, 1);
    });
    // scroll: the window opens to the edges, the name grows
    const gut = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gut')) || 14;
    gsap.timeline({ scrollTrigger: { trigger: '.hero-pin', pin: true, start: 'top top', end: '+=110%', scrub: 1, invalidateOnRefresh: true } })
      .fromTo(heroWin, { '--hx': () => innerWidth * (innerWidth > 900 ? .07 : 0) + 'px', '--hy': () => innerHeight * .125 + 'px' }, { '--hx': () => gut() + 'px', '--hy': () => gut() + 'px', ease: 'none' }, 0)
      .to(heroImg, { scale: 1, ease: 'none' }, 0)
      .to(heroT, { scale: () => innerWidth > 900 ? 1.18 : 1, ease: 'none' }, 0)
      .to('.hero-scroll', { autoAlpha: 0, duration: .2 }, 0);
    // the bar comes once you leave the first window
    ScrollTrigger.create({ trigger: '.intro', start: 'top 70%', onEnter: () => $('.top').classList.add('show'), onLeaveBack: () => $('.top').classList.remove('show') });
  } else $('.top').classList.add('show');

  /* ═══════════════ 2 · the park in one sentence: words light up as you read ═══════════════ */
  const big = $('.intro-big');
  [...big.childNodes].forEach(nd => {
    if (nd.nodeType !== 3) return;
    const f = document.createDocumentFragment();
    nd.textContent.split(/(\s+)/).forEach(w => {
      if (!w) return;
      if (/^\s+$/.test(w)) f.append(document.createTextNode(w));
      else { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; f.append(s); }
    });
    nd.replaceWith(f);
  });
  const words = $$('.w', big);
  if (hasG && !RM) {
    ScrollTrigger.create({ trigger: big, start: 'top 78%', end: 'bottom 45%', scrub: true, onUpdate: s => { const n = Math.round(s.progress * words.length); words.forEach((w, i) => w.classList.toggle('lit', i < n)); } });
    $$('.pill', big).forEach(p => gsap.from(p, { width: 0, borderWidth: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 70%' } }));
    $$('.intro-n b').forEach(b => {
      const o = { v: 0 }, to = +b.dataset.n;
      ScrollTrigger.create({ trigger: b, start: 'top 88%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 2, ease: 'expo.out', onUpdate: () => b.textContent = Math.round(o.v) }) });
      if (to === 0) b.textContent = '0';
    });
  } else { words.forEach(w => w.classList.add('lit')); $$('.intro-n b').forEach(b => b.textContent = b.dataset.n); }

  /* ═══════════════ 3 · birds: a list of names, the card follows the hand ═══════════════ */
  const list = $('.bd-list'), bw = $('.bd-win'), bImgs = $('.bd-imgs');
  list.innerHTML = BIRDS.map((b, i) => `<li data-i="${i}" data-cur="${b.w}"><span class="bi">${pad2(i + 1)}</span><h3>${b.n}</h3><span class="bl">${b.lat}<br>${b.w}</span><span class="bw">${b.note}</span></li>`).join('');
  bImgs.innerHTML = BIRDS.map(b => slot('b-' + b.id, b.n.toLowerCase(), b.tone)).join('');
  fill(bImgs);
  const bS = $$('.slot', bImgs);
  let bz = 1;
  const setB = i => {
    const b = BIRDS[i];
    bS.forEach((s, k) => { if (k === i) { s.style.zIndex = ++bz; s.classList.add('on'); } });
    setTimeout(() => bS.forEach((s, k) => { if (k !== i && +s.style.zIndex < bz) s.classList.remove('on'); }), 700);
    $('.bd-n', bw).textContent = b.n; $('.bd-i', bw).textContent = pad2(i + 1) + ' / 06'; $('.bd-l', bw).textContent = b.w.toUpperCase();
  };
  if (hasG && FINE && !RM) {
    const qx = gsap.quickTo(bw, 'x', { duration: .7, ease: 'power3' }), qy = gsap.quickTo(bw, 'y', { duration: .7, ease: 'power3' }), qr = gsap.quickTo(bw, 'rotation', { duration: .9, ease: 'power3' });
    let lx = 0;
    addEventListener('pointermove', e => {
      const w = bw.offsetWidth, h = bw.offsetHeight;
      qx(Math.min(e.clientX + 40, innerWidth - w - 20)); qy(e.clientY - h / 2);
      qr(gsap.utils.clamp(-10, 10, (e.clientX - lx) * .6)); lx = e.clientX;
    });
    list.addEventListener('pointerenter', () => gsap.to(bw, { autoAlpha: 1, scale: 1, duration: .6, ease: 'expo.out', overwrite: 'auto' }));
    list.addEventListener('pointerleave', () => gsap.to(bw, { autoAlpha: 0, scale: .7, duration: .4, ease: 'power2.in', overwrite: 'auto' }));
    gsap.set(bw, { scale: .7 });
    $$('li', list).forEach(li => li.addEventListener('pointerenter', () => { setB(+li.dataset.i); KP.call(1400 + +li.dataset.i * 160, .025); }));
  }
  if (hasG && !RM) $$('li', list).forEach(li => {
    gsap.from($('h3', li), { yPercent: 70, autoAlpha: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 92%' } });
  });

  /* band: the names run, faster when you scroll */
  $$('.mq').forEach((m, k) => {
    const p = $('p', m), row = document.createElement('div');
    row.className = 'mq-row'; row.append(p, p.cloneNode(true), p.cloneNode(true)); m.append(row);
    if (!hasG || RM) return;
    let x = 0;
    gsap.ticker.add(() => {
      const v = KP.lenis ? KP.lenis.velocity : 0;
      x -= 1 + Math.abs(v) * .5; const w = p.offsetWidth;
      if (-x >= w) x += w;
      row.style.transform = `translateX(${x}px)`;
    });
  });

  /* ═══════════════ 4 · trails: four windows that stack ═══════════════ */
  const TRAILS = [
    { t: 'THE ESTUARY', km: '1.2 km', time: '40 min', lvl: 'easy', meet: ['kōtuku', 'tōrea', 'kawau'], p: 'A flat boardwalk over the mudflats. Come at nine, when the herons fish.', bird: 'kotuku', tone: 'sea' },
    { t: 'THE BOARDWALK', km: '2.4 km', time: '1 h 10', lvl: 'easy', meet: ['hihi', 'tūī', 'korimako'], p: 'A raised walk through the rimu forest, past the nectar feeders.', bird: 'hihi' },
    { t: 'THE MEADOW', km: '1.8 km', time: '50 min', lvl: 'easy', meet: ['takahē', 'pūkeko', 'pīwakawaka'], p: 'Open tussock and one picnic table. The takahē don\'t mind you.', bird: 'takahe', tone: 'sun' },
    { t: 'THE RIDGE', km: '3.6 km', time: '2 h', lvl: 'steep', meet: ['koekoeā', 'kākā', 'kererū'], p: 'Steep and quiet, to the top of the island. The tūī chorus starts at four.', bird: 'koekoea' },
  ];
  const stack = $('.tr-stack');
  stack.innerHTML = TRAILS.map((t, i) => `
    <div class="tr-card"><div class="win tr-win">
      ${slot('t' + (i + 1), 't' + (i + 1) + ' — ' + t.t.toLowerCase(), t.tone)}
      <div class="win-shade"></div>
      <div class="tr-top"><p class="tr-k">Trail ${pad2(i + 1)} <em>/ 04</em><br>${t.km} · ${t.time} · ${t.lvl}</p><div class="tr-meet">${t.meet.map(m => `<span>${m}</span>`).join('')}</div></div>
      <p class="tr-n">${t.km}</p>
      <p class="tr-p">${t.p}</p>
      <h3 class="tr-t">${t.t}</h3>
      <div class="pc tr-pc"><span class="pc-s"><b>TRAIL ${pad2(i + 1)}</b><b>${t.time.toUpperCase()}</b></span><span class="pc-img">${slot('b-' + t.bird, t.bird, t.tone)}</span><span class="pc-s"><b>${t.meet[0].toUpperCase()}</b><b>${t.lvl.toUpperCase()}</b></span></div>
    </div></div>`).join('');
  fill(stack);
  $$('.pc-img .slot', stack).forEach(s => { s.style.position = 'absolute'; s.style.inset = '0'; });
  if (hasG && !RM) {
    const cards = $$('.tr-card', stack);
    cards.forEach((c, i) => {
      const w = $('.tr-win', c);
      gsap.from($('.tr-t', c), { yPercent: 60, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 55%', toggleActions: 'play none none reverse' } });
      gsap.from([$('.tr-pc', c), $('.tr-p', c)], { y: 40, autoAlpha: 0, duration: 1.2, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 50%', toggleActions: 'play none none reverse' } });
      gsap.fromTo($('.slot', w), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'top top', scrub: true } });
      const nx = cards[i + 1];
      if (nx) gsap.to(w, { scale: .9, filter: 'brightness(.3)', ease: 'none', scrollTrigger: { trigger: nx, start: 'top bottom', end: 'top top', scrub: true } });
    });
  }

  /* ═══════════════ 5 · a day on the island: the clock runs ═══════════════ */
  const DAY = [
    { h: 6, m: 40, t: 'The first ferry leaves Bluff.', w: 'Bluff harbour', tone: 'sea' },
    { h: 8, m: 0, t: 'The gate opens at the jetty.', w: 'the jetty' },
    { h: 9, m: 0, t: 'The kōtuku fish the estuary.', w: 'trail 01', tone: 'sea' },
    { h: 11, m: 0, t: 'The hihi come to the feeders.', w: 'trail 02', tone: 'sun' },
    { h: 13, m: 0, t: 'Lunch in the meadow, with takahē.', w: 'trail 03', tone: 'sun' },
    { h: 16, m: 0, t: 'The tūī chorus on the ridge.', w: 'trail 04' },
    { h: 18, m: 20, t: 'The last ferry. The birds stay.', w: 'the jetty', tone: 'sun' },
    { h: 22, m: 0, t: 'The kākāpō booms. Hut guests only.', w: 'the ridge', tone: 'night' },
  ];
  const dImgs = $('.day-imgs'), clock = $('.day-clock'), rule = $('.day-rule');
  dImgs.innerHTML = DAY.map((d, i) => slot('d' + (i + 1), `d${i + 1} — ${d.t.toLowerCase()}`, d.tone)).join('');
  fill(dImgs);
  rule.innerHTML = '<i></i>' + [6, 9, 12, 15, 18, 21, 24].map(h => `<span>${pad2(h % 24)}</span>`).join('');
  const dS = $$('.slot', dImgs);
  let di = -1, dz = 1;
  const clk = { v: DAY[0].h * 60 + DAY[0].m };
  const drawClock = () => { const v = Math.round(clk.v); clock.textContent = pad2(v / 60 | 0) + ':' + pad2(v % 60); };
  const setDay = i => {
    if (i === di) return;
    const d = DAY[i], first = di < 0; di = i;
    const s = dS[i]; s.style.zIndex = ++dz;
    if (hasG && !RM && !first) gsap.fromTo(s, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.inOut', overwrite: true });
    else s.style.clipPath = 'inset(0)';
    const to = d.h * 60 + d.m;
    if (hasG && !RM) gsap.to(clk, { v: to, duration: 1, ease: 'power3.inOut', onUpdate: drawClock, overwrite: true }); else { clk.v = to; drawClock(); }
    const pos = ((d.h + d.m / 60) - 6) / 18 * 100;
    if (hasG) gsap.to($('i', rule), { left: pos + '%', duration: 1, ease: 'power3.inOut' });
    $('.dc-k').textContent = pad2(d.h) + ':' + pad2(d.m);
    KP.scramble($('.dc-t'), d.t);
    $('.dc-w').textContent = d.w.toUpperCase();
    $('.dc-i').textContent = (i + 1) + ' / ' + DAY.length;
    if (!first) KP.call(1300 + i * 110, .02);
  };
  setDay(0); drawClock();
  if (hasG && !RM) {
    gsap.timeline({ scrollTrigger: { trigger: '.day-pin', pin: true, start: 'top top', end: '+=' + DAY.length * 55 + '%', scrub: true, onUpdate: s => setDay(Math.min(DAY.length - 1, Math.floor(s.progress * DAY.length))) } })
      .fromTo('.day-win', { scale: .86 }, { scale: 1, duration: .12, ease: 'none' }, 0)
      .to({}, { duration: .88 });
    gsap.from(clock, { yPercent: 40, autoAlpha: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.day', start: 'top 60%' } });
  }

  /* ═══════════════ 6 · huts: drag the row ═══════════════ */
  const HUTS = [
    { n: 'RIMU', k: 'Hut 01', s: 'sleeps 4', p: 'NZ$ 180 a night', t: 'Under the big rimu tree, by the boardwalk.' },
    { n: 'FERN', k: 'Hut 02', s: 'sleeps 2', p: 'NZ$ 140 a night', t: 'In the tree ferns, one window onto the forest.' },
    { n: 'RIDGE', k: 'Hut 03', s: 'sleeps 6', p: 'NZ$ 260 a night', t: 'On top of the island, nearest to the kākāpō.', tone: 'night' },
    { n: 'TIDE', k: 'Hut 04', s: 'sleeps 2', p: 'NZ$ 150 a night', t: 'On stilts over the estuary. Herons at breakfast.', tone: 'sea' },
    { n: 'NIGHT', k: 'Included', s: '22:00', p: 'with every hut', t: 'The walk with a ranger. Red torches only.', tone: 'night' },
  ];
  const wrap = $('.hu-wrap'), track = $('.hu-track');
  track.innerHTML = HUTS.map((h, i) => `
    <article class="hut"><div class="win">${slot('h' + (i + 1), 'h' + (i + 1) + ' — ' + h.n.toLowerCase() + ' hut', h.tone)}<div class="win-shade"></div>
      <span class="hut-k">${h.k}</span><span class="hut-tag">${h.s}</span><h3>${h.n}</h3></div>
      <p class="hut-m"><span>${h.t}</span><b>${h.p}</b></p></article>`).join('');
  fill(track);
  const bar = document.createElement('div'); bar.className = 'hu-bar'; bar.innerHTML = '<i></i>'; wrap.after(bar);
  if (hasG) {
    let x = 0, sx = 0, ox = 0, down = false, vx = 0, lx = 0;
    const min = () => Math.min(0, wrap.clientWidth - parseFloat(getComputedStyle(wrap).paddingLeft) * 2 - track.scrollWidth);
    const qx = gsap.quickTo(track, 'x', { duration: .6, ease: 'power3' });
    const barI = $('i', bar);
    const draw = () => { x = gsap.utils.clamp(min(), 0, x); qx(x); const m = min(); barI.style.width = (wrap.clientWidth / (wrap.clientWidth - m) * 100) + '%'; barI.style.left = (m ? x / m : 0) * (100 - parseFloat(barI.style.width)) + '%'; };
    wrap.addEventListener('pointerdown', e => { down = true; sx = e.clientX; ox = x; lx = e.clientX; vx = 0; wrap.setPointerCapture(e.pointerId); gsap.to($$('.hut .win', track), { scale: .97, duration: .4 }); });
    wrap.addEventListener('pointermove', e => { if (!down) return; vx = e.clientX - lx; lx = e.clientX; x = ox + (e.clientX - sx) * 1.3; draw(); });
    const up = () => { if (!down) return; down = false; x += vx * 12; draw(); gsap.to($$('.hut .win', track), { scale: 1, duration: .6, ease: 'expo.out' }); };
    wrap.addEventListener('pointerup', up); wrap.addEventListener('pointercancel', up);
    // the scroll also pushes the row a little, so it moves even if you don't drag
    ScrollTrigger.create({ trigger: '.huts', start: 'top bottom', end: 'bottom top', onUpdate: s => { if (!down) { x -= s.getVelocity() * .0025; draw(); } } });
    addEventListener('resize', draw); draw();
    if (!RM) gsap.from($$('.hut', track), { x: 160, autoAlpha: 0, duration: 1.4, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: wrap, start: 'top 80%' } });
  }

  /* ═══════════════ 7 · adopt: cards that turn ═══════════════ */
  const ADOPT = [
    { n: 'TĪWAI', b: 'kākāpō', age: '4 years', lat: 'Strigops habroptilus', pr: 60, get: ['a photo of her every month', 'the ranger\'s notes, by post', 'her name on the ridge hut wall'], tone: 'night' },
    { n: 'HINE', b: 'kōtuku', age: '7 years', lat: 'Ardea alba modesta', pr: 40, get: ['a photo every month', 'news from the colony in spring', 'one free ferry for two'], tone: 'sea' },
    { n: 'PIP', b: 'hihi', age: '1 year', lat: 'Notiomystis cincta', pr: 25, get: ['a photo every month', 'his feeder, with his name on it', 'a postcard from the island'], tone: 'sun' },
    { n: 'MOANA', b: 'takahē', age: 'chick', lat: 'Porphyrio hochstetteri', pr: 45, get: ['a photo every week, she\'s growing', 'the day she\'s weighed, live', 'her name on the meadow sign'] },
  ];
  const row = $('.ad-row');
  row.innerHTML = ADOPT.map((a, i) => `
    <div class="ad" data-cur="turn the card" role="button" tabindex="0"><div class="ad-in">
      <div class="ad-f win">${slot('a' + (i + 1), 'a' + (i + 1) + ' — ' + a.n.toLowerCase() + ', ' + a.b, a.tone)}<div class="win-shade"></div>
        <span class="pc-s"><b>${a.b.toUpperCase()} · ${a.age.toUpperCase()}</b><b>TURN →</b></span><h3>${a.n}</h3></div>
      <div class="ad-b pc"><span class="pc-s"><b>ADOPT</b><b>${pad2(i + 1)} / 04</b></span>
        <div class="ad-body"><h4>${a.n}</h4><p class="al">${a.b} · ${a.lat}</p><ul>${a.get.map(g => `<li>${g}</li>`).join('')}</ul></div>
        <span class="pc-s"><b>ONE YEAR</b><b>NZ$ ${a.pr}</b></span>
        <button class="ad-go" type="button" data-cur="adopt ${a.n.toLowerCase()}">Adopt ${a.n} →</button></div>
    </div></div>`).join('');
  fill(row);
  $$('.ad', row).forEach((c, i) => {
    const turn = () => { c.classList.toggle('flip'); KP.call(1500 + i * 140, .025); };
    c.addEventListener('click', e => { if (e.target.closest('.ad-go')) return; turn(); });
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); turn(); } });
    $('.ad-go', c).addEventListener('click', () => KP.toast('adopt', `${ADOPT[i].n} is waiting. the adoption desk opens soon.`));
  });
  if (hasG && !RM) gsap.from($$('.ad', row), { y: 120, rotation: (i) => [-4, 2, -2, 4][i], autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 82%' } });

  /* ═══════════════ 8 · visit: a ticket you can fill ═══════════════ */
  const days = $('.tk-days');
  const fmt = (d, o) => new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: 'Pacific/Auckland' }, o)).format(d);
  days.innerHTML = [0, 1, 2, 3, 4].map(k => { const d = new Date(Date.now() + k * 864e5); return `<button type="button"${k ? '' : ' class="on"'} data-d="${fmt(d, { weekday: 'short', day: 'numeric', month: 'short' })}"><span>${k ? fmt(d, { weekday: 'short' }) : 'today'}</span>${fmt(d, { day: 'numeric' })}</button>`; }).join('');
  let ppl = 2;
  const tot = () => { $('.tk-tot').textContent = ppl * 32; $('.tk-ppl b').textContent = ppl; };
  const pick = (box) => box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', box).forEach(x => x.classList.toggle('on', x === b)); });
  pick(days); pick($('.tk-ferry'));
  $$('.tk-ppl button').forEach(b => b.addEventListener('click', () => { ppl = Math.max(1, Math.min(9, ppl + +b.dataset.d)); tot(); if (hasG) gsap.fromTo('.tk-tot', { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: .5 }); }));
  tot();
  $('.tk-go').addEventListener('click', () => {
    const d = $('.tk-days .on').dataset.d, f = $('.tk-ferry .on').textContent;
    KP.toast('tickets', `${ppl} on the ${f} ferry, ${d}. the ticket desk opens soon.`); KP.call();
  });
  if (hasG && !RM) {
    gsap.fromTo('.vi-win', { clipPath: 'inset(14% 10% 14% 10% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.from('.vi-t span', { yPercent: 50, autoAlpha: 0, filter: 'blur(12px)', duration: 1.6, stagger: .14, ease: 'expo.out', scrollTrigger: { trigger: '.visit', start: 'top 30%' } });
    gsap.from('.tk', { y: 60, autoAlpha: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.visit', start: 'top 25%' } });
  }

  /* ═══════════════ the rest: headings arrive, the footer name rises ═══════════════ */
  if (hasG && !RM) {
    $$('.sec-head').forEach(h => gsap.from(h.children, { y: 50, autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    const fb = $('.ft-big');
    fb.innerHTML = fb.textContent.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
    gsap.from($$('span', fb), { yPercent: 70, autoAlpha: 0, duration: 1.6, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 90%' } });
    addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
