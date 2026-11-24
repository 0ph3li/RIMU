/* ═══════════════════════════════════════════════════════════════
   RIMU — visit · v6 "window"
   concept, design & code by ghostly.grl ♥

   the live card is real: island time, the next ferry, and the
   weather off whenua hou right now (open-meteo, no key).
   then the crossing slides sideways while a clock runs, the bag
   check turns card by card, and the boarding pass fills itself.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, RM } = KP;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const pad2 = n => String(n).padStart(2, '0');
  const hm = m => pad2((m / 60 | 0) % 24) + ':' + pad2(Math.round(m % 60));
  const fill = r => $$('.slot[data-img]', r).forEach(KP.fillSlot);

  /* ═══════════════ the live card ═══════════════ */
  const OUT = [8 * 60 + 30, 10 * 60 + 30, 12 * 60 + 30];
  const live = () => {
    const t = KP.nzNow(), now = t.h * 60 + t.m, open = t.h >= KP.OPEN[0] && t.h < KP.OPEN[1];
    $('.lv-t').textContent = hm(now);
    $('.lv-open').textContent = open ? 'GATE OPEN' : 'GATE CLOSED';
    const nx = OUT.find(f => f > now);
    $('.lv-f').textContent = nx ? hm(nx) : 'tomorrow';
    $('.lv-f').title = nx ? 'in ' + (nx - now) + ' min' : '08:30';
  };
  live(); setInterval(live, 20000);
  const SKY = { 0: 'clear sky', 1: 'mostly clear', 2: 'some cloud', 3: 'grey sky', 45: 'fog', 48: 'fog', 51: 'drizzle', 53: 'drizzle', 55: 'drizzle', 61: 'rain', 63: 'rain', 65: 'heavy rain', 71: 'snow', 80: 'showers', 81: 'showers', 82: 'heavy showers', 95: 'storm' };
  fetch('https://api.open-meteo.com/v1/forecast?latitude=-46.77&longitude=167.64&current=temperature_2m,wind_speed_10m,weather_code&timezone=Pacific%2FAuckland')
    .then(r => r.json()).then(d => {
      const c = d.current;
      $('.lv-w').textContent = Math.round(c.temperature_2m) + '°C';
      $('.lv-v').textContent = Math.round(c.wind_speed_10m) + ' km/h';
      const sky = SKY[c.weather_code] || 'island weather';
      $('.lv-sky').textContent = (sky + (c.weather_code >= 51 ? ' · bring a jacket' : ' · good day for it')).toUpperCase();
    }).catch(() => { $('.lv-w').textContent = '12°C'; $('.lv-v').textContent = 'windy'; $('.lv-sky').textContent = 'BRING A JACKET. ALWAYS.'; });

  /* ═══════════════ the crossing ═══════════════ */
  const J = [
    { m: 490, n: 'THE WHARF', img: 'v7', p: 'Check in at the blue shed in Bluff. Coffee, a toilet, your last phone signal.', where: 'bluff' },
    { m: 510, n: 'CAST OFF', img: 'v1', p: 'Twenty-eight seats inside, twelve outside. Sit outside.', where: 'bluff' },
    { m: 525, n: 'THE STRAIT', img: 'v2', p: 'Forty minutes of open sea. Albatross sometimes follow the wake.', where: 'foveaux strait' },
    { m: 545, n: 'LAND', img: 'v8', p: 'The island comes out of the grey. Somebody always points.', where: 'whenua hou' },
    { m: 552, n: 'THE BOOTS', img: 'v4', p: 'Brushes and a tub at the end of the jetty. Scrub. The ranger checks.', where: 'the jetty' },
    { m: 560, n: 'THE GATE', img: 'v6', p: 'Down the jetty, through the gate. The fantail is already waiting.', where: 'the gate' },
  ];
  const track = $('.jr-track');
  track.innerHTML = J.map((j, i) => `<article class="jr-c"><div class="win"><span class="slot" data-img="VISIT/${j.img}.jpg" data-note="${j.n.toLowerCase()}" data-tone="sea"></span><div class="win-shade"></div>
    <span class="t">${hm(j.m)} · ${pad2(i + 1)}/0${J.length}</span><h3>${j.n}</h3></div><p>${j.p}</p></article>`).join('');
  fill(track);
  const clock = $('.jr-clock');
  const setClock = p => {
    const f = p * (J.length - 1), i = Math.min(J.length - 2, Math.floor(f)), k = f - i;
    const m = J[i].m + (J[i + 1].m - J[i].m) * k;
    clock.innerHTML = hm(m) + `<small>${J[Math.round(f)].where}</small>`;
    $('.jr-line i').style.width = p * 100 + '%';
  };
  setClock(0);

  /* ═══════════════ the bag check ═══════════════ */
  const BAG = [
    { n: 'A sandwich', s: 'in a sealed box', v: 'yes', a: 'YES', p: 'Sealed food is fine. Eat it at the picnic table, take the crumbs back.' },
    { n: 'Muddy boots', s: 'from your last walk', v: 'maybe', a: 'SCRUB', p: 'Seeds and soil travel in the treads. Scrub at the jetty, then yes.' },
    { n: 'Binoculars', s: 'of course', v: 'yes', a: 'YES', p: 'Please. Hire a pair at the blue shed if you forgot.' },
    { n: 'A mouse', s: 'you didn\'t know about', v: 'no', a: 'NO', p: 'It happens: they hide in bags of food. That\'s why we look.' },
    { n: 'Your dog', s: 'very good boy', v: 'no', a: 'NO', p: 'No dogs, no cats, ever. One dog can find a kākāpō nest in minutes.' },
    { n: 'A red torch', s: 'for the night walk', v: 'yes', a: 'YES', p: 'Red only. White light blinds the birds that live in the dark.' },
    { n: 'Velcro', s: 'on your jacket', v: 'maybe', a: 'CHECK', p: 'Velcro collects seeds like a magnet. Pick them off before the gate.' },
    { n: 'A drone', s: 'for the views', v: 'no', a: 'NO', p: 'The kākā attack them. The rangers confiscate them. Both are true.' },
    { n: 'An apple', s: 'loose, in a pocket', v: 'maybe', a: 'EAT IT', p: 'Eat it on the ferry. Apple cores grow trees that don\'t belong here.' },
    { n: 'A field guide', s: 'paper, a bit wet', v: 'yes', a: 'YES', p: 'The island has no signal. Paper works everywhere.' },
  ];
  const bg = $('.bg-grid');
  bg.innerHTML = BAG.map((b, i) => `<div class="bg-c" role="button" tabindex="0" data-cur="check it"><div class="bg-in">
    <div class="bg-f"><span class="k">item ${pad2(i + 1)}</span><h3>${b.n}</h3><span>${b.s}</span></div>
    <div class="bg-b ${b.v}"><span class="k">the ranger says</span><b>${b.a}</b><p>${b.p}</p></div></div></div>`).join('');
  const turned = new Set();
  const turn = (c, i) => {
    c.classList.toggle('open'); turned.add(i);
    $('.bg-n').textContent = turned.size;
    KP.call(BAG[i].v === 'no' ? 900 : 1700, .02);
    if (turned.size === BAG.length) { $('.bg-v').textContent = 'bag cleared · see you at the jetty'; KP.toast('bag cleared', 'ten out of ten. the ranger nods. you may pass.'); }
  };
  $$('.bg-c', bg).forEach((c, i) => {
    c.addEventListener('click', () => turn(c, i));
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); turn(c, i); } });
  });

  /* ═══════════════ tickets ═══════════════ */
  const fmt = (d, o) => new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: 'Pacific/Auckland' }, o)).format(d);
  const days = $('.tx-days');
  days.innerHTML = Array.from({ length: 10 }, (_, k) => { const d = new Date(Date.now() + k * 864e5); return `<button type="button"${k ? '' : ' class="on"'} data-d="${fmt(d, { day: 'numeric', month: 'short' })}"><span>${k ? fmt(d, { weekday: 'short' }) : 'today'}</span>${fmt(d, { day: 'numeric', month: 'short' })}</button>`; }).join('');
  const T = { ad: 2, kd: 0 };
  const sel = box => $('.on', box);
  const radio = box => box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.disabled) return; $$('button', box).forEach(x => x.classList.toggle('on', x === b)); pass(); });
  [days, $('.tx-out'), $('.tx-back'), $('.tx-hut')].forEach(radio);
  $$('.tx-ppl button').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k; T[k] = Math.max(k === 'ad' ? 1 : 0, Math.min(9, T[k] + +b.dataset.d));
    $('.tx-' + k).textContent = T[k]; pass();
  }));
  const bars = $('.tx-bars');
  const pass = () => {
    const out = sel($('.tx-out')).textContent, hut = sel($('.tx-hut')), hp = +hut.dataset.p;
    // you can't come back before you've arrived: at least three hours on the island
    const om = +out.slice(0, 2) * 60 + +out.slice(3);
    $$('.tx-back button').forEach(b => { const bm = +b.textContent.slice(0, 2) * 60 + +b.textContent.slice(3); b.disabled = !!hp || bm < om + 180; });
    if (!hp && sel($('.tx-back')).disabled) { const ok = $$('.tx-back button').find(b => !b.disabled); $$('.tx-back button').forEach(x => x.classList.toggle('on', x === ok)); }
    const back = hp ? '10:00 +1' : sel($('.tx-back')).textContent;
    const tot = T.ad * 32 + T.kd * 16 + hp;
    $('.tf-d').textContent = sel(days).dataset.d;
    $('.tf-o').textContent = out; $('.tf-b').textContent = back;
    $('.tf-a').textContent = T.ad; $('.tf-k').textContent = T.kd;
    $('.tf-h').textContent = hp ? hut.lastChild.textContent : '—';
    $('.tx-tot span').textContent = tot;
    const seed = (sel(days).dataset.d + out + back + T.ad + T.kd + hp).split('').reduce((s, c) => (s * 31 + c.charCodeAt(0)) >>> 0, 7);
    $('.tx-no').textContent = 'RM ' + String(seed % 100000).padStart(5, '0');
    let r = seed; bars.innerHTML = Array.from({ length: 34 }, () => { r = (r * 1103515245 + 12345) >>> 0; return `<i style="width:${1 + (r >> 16) % 4}px"></i>`; }).join('');
    if (hasG) gsap.fromTo('.tx-tot span', { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: .45 });
  };
  pass();
  $('.tx-go').addEventListener('click', () => {
    const n = T.ad + T.kd;
    KP.toast('booked (almost)', `${n} on the ${$('.tf-o').textContent} ferry, ${$('.tf-d').textContent}. the ticket desk opens soon, this is a concept.`);
    KP.call(1800, .03);
    if (hasG) gsap.fromTo('.tx-pass .pc', { rotation: 0 }, { rotation: -3, yoyo: true, repeat: 1, duration: .25 });
  });

  /* ═══════════════ questions ═══════════════ */
  const QA = [
    ['How do I get to Bluff?', 'Bluff is the bottom of the South Island, 30 minutes by car or bus from Invercargill airport. The blue shed is on the wharf, you can\'t miss it.'],
    ['What if the sea is rough?', 'Foveaux Strait can be wild. If the skipper says no, the ferry doesn\'t go, and your ticket moves to any other day, or we give the money back.'],
    ['Is it okay for kids?', 'Yes. The estuary and the meadow are flat and short. The ridge is steep: ten and up. Kids under five travel free.'],
    ['Can I walk without boots?', 'Good shoes are enough on the boardwalk and the meadow. For the ridge, boots. Everything gets scrubbed at the jetty anyway.'],
    ['Wheelchairs and prams?', 'The jetty, the estuary boardwalk and the feeders are flat and wide. The ferry has a ramp. Tell us when you book.'],
    ['Is Rimu real?', 'No, it\'s a concept. Whenua Hou is a real nature reserve and it\'s closed to visitors, to protect the kākāpō. The real recovery work is done by the Department of Conservation and Ngāi Tahu.'],
  ];
  const ql = $('.qa-list');
  ql.innerHTML = QA.map((q, i) => `<li><button type="button" aria-expanded="false"><span>${pad2(i + 1)}</span>${q[0]}<i>+</i></button><div class="qa-a"><p>${q[1]}</p></div></li>`).join('');
  $$('li', ql).forEach(li => $('button', li).addEventListener('click', () => {
    const open = !li.classList.contains('open'), a = $('.qa-a', li);
    $$('li.open', ql).forEach(o => { if (o !== li) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); hasG ? gsap.to($('.qa-a', o), { height: 0, duration: .6, ease: 'expo.out' }) : $('.qa-a', o).style.height = 0; } });
    li.classList.toggle('open', open); $('button', li).setAttribute('aria-expanded', open);
    if (hasG) gsap.to(a, { height: open ? 'auto' : 0, duration: .7, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() }); else a.style.height = open ? 'auto' : 0;
  }));

  /* ═══════════════ motion ═══════════════ */
  if (hasG && !RM) {
    gsap.set(['.ph-t', '.ph-card', '.ph-k', '.ph-r'], { autoAlpha: 0 });
    KP.ready.then(() => gsap.timeline()
      .fromTo('.ph-win>.slot', { scale: 1.2 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .fromTo('.ph-t', { autoAlpha: 0, y: 60, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' }, .2)
      .fromTo(['.ph-k', '.ph-r', '.ph-card'], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: .1, ease: 'expo.out' }, .5));
    gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: '.jr-pin', pin: true, start: 'top top', end: () => '+=' + (track.scrollWidth - innerWidth) * 1.2, scrub: 1, invalidateOnRefresh: true, onUpdate: s => setClock(s.progress) } });
    $$('.sh').forEach(h => gsap.from(h.children, { y: 50, autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    gsap.from('.bg-c', { y: 80, rotation: i => (i % 2 ? 3 : -3), autoAlpha: 0, duration: 1.3, stagger: .05, ease: 'expo.out', scrollTrigger: { trigger: bg, start: 'top 80%' } });
    gsap.from('.tx-pass .pc', { y: 120, rotation: -4, autoAlpha: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.tx-grid', start: 'top 75%' } });
    gsap.from('.qa-list li', { y: 30, autoAlpha: 0, duration: 1, stagger: .06, ease: 'expo.out', scrollTrigger: { trigger: ql, start: 'top 85%' } });
    const fb = $('.ft-big');
    fb.innerHTML = fb.textContent.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
    gsap.from($$('span', fb), { yPercent: 70, autoAlpha: 0, duration: 1.6, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 90%' } });
    addEventListener('load', () => ScrollTrigger.refresh());
  } else { track.style.overflowX = 'auto'; }
})();
