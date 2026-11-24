/* ═══════════════════════════════════════════════════════════════
   RIMU — adopt · v6 "window"
   concept, design & code by ghostly.grl ♥

   pick one of eight birds → the postcard writes itself while you
   type (and downloads as a png, drawn on a canvas) → the ranger's
   letters slide sideways with the scroll.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, RM } = KP;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const pad2 = n => String(n).padStart(2, '0');
  const fill = r => $$('.slot[data-img]', r).forEach(KP.fillSlot);
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ═══════════════ the eight ═══════════════ */
  const A = [
    { n: 'TĪWAI', b: 'kākāpō', lat: 'Strigops habroptilus', age: '4 years', img: 'HOME/a1.jpg', tone: 'night', had: 38, t: 'Booms on the ridge every night in summer. Shy by day.' },
    { n: 'HINE', b: 'kōtuku', lat: 'Ardea alba modesta', age: '7 years', img: 'HOME/a2.jpg', tone: 'sea', had: 29, t: 'Fishes the estuary at nine. Ignores everyone.' },
    { n: 'PIP', b: 'hihi', lat: 'Notiomystis cincta', age: '1 year', img: 'HOME/a3.jpg', tone: 'sun', had: 17, t: 'First summer. Already the boss of feeder two.' },
    { n: 'MOANA', b: 'takahē', lat: 'Porphyrio hochstetteri', age: 'chick', img: 'HOME/a4.jpg', had: 33, t: 'Hatched in October. Weighed every Thursday.' },
    { n: 'KORO', b: 'kākā', lat: 'Nestor meridionalis', age: '12 years', img: 'BIRDS/kaka.jpg', had: 21, t: 'The oldest on the boardwalk. Steals pens.' },
    { n: 'AROHA', b: 'toutouwai', lat: 'Petroica australis', age: '3 years', img: 'BIRDS/toutouwai.jpg', had: 12, t: 'Will stand on your boot if you wait long enough.' },
    { n: 'WIRI', b: 'tūī', lat: 'Prosthemadera novaeseelandiae', age: '5 years', img: 'BIRDS/tui.jpg', had: 24, t: 'Has learned the sound of the ferry horn.' },
    { n: 'KAHU', b: 'koekoeā', lat: 'Urodynamis taitensis', age: '2 years', img: 'BIRDS/koekoea.jpg', had: 6, t: 'Gone for the winter. Back in October, we hope.' },
  ];
  const CAP = 40;
  const TIERS = [
    { n: 'Feather', pr: 25, get: ['a photo of your bird every month', 'this postcard, by email', 'your name in the hut book'] },
    { n: 'Nest', pr: 60, get: ['everything in Feather', 'Mere\'s letters, by post, on paper', 'your name on the hut wall'] },
    { n: 'Flock', pr: 120, get: ['everything in Nest', 'a morning on the island with Mere', 'the day your bird is weighed, live'] },
  ];
  const mine = KP.get('adopted', []);
  const total = A.reduce((s, a) => s + a.had, 0) + mine.length;
  $('.ad-total').textContent = A.length; $('.ad-ppl').textContent = total;

  const grid = $('.ag-grid');
  grid.innerHTML = A.map((a, i) => `
    <button type="button" class="ag-c" data-i="${i}" data-cur="pick ${a.n.toLowerCase()}">
      <div class="win"><span class="slot" data-img="${a.img}" data-note="${a.n.toLowerCase()}, ${a.b}"${a.tone ? ` data-tone="${a.tone}"` : ''}></span><div class="win-shade"></div>
        <span class="bd-k">${pad2(i + 1)} · ${a.b}<br>${a.age}</span><span class="tag">${CAP - a.had} left</span><h3>${a.n}</h3></div>
      <p class="meta"><span>${a.t}</span><b>${a.had}/${CAP}</b></p>
      <div class="fill"><i style="width:${a.had / CAP * 100}%"></i></div>
    </button>`).join('');
  fill(grid);

  /* ═══════════════ the postcard ═══════════════ */
  let ai = 0, ti = 1;
  const nameI = $('.mk-name'), msgI = $('.mk-msg');
  const today = new Intl.DateTimeFormat('en-GB', { timeZone: 'Pacific/Auckland', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const num = () => 'Nº ' + String(1000 + ai * 97 + A[ai].had + 1).padStart(4, '0');
  const write = () => {
    const a = A[ai], t = TIERS[ti];
    $('.mk-bird').innerHTML = `${a.n}<small>${a.b} · ${a.age}</small>`;
    $('.mk-pc-name').textContent = a.n;
    $('.mk-pc-sp').textContent = a.b + ' · ' + a.lat;
    $('.mk-pc-by').textContent = nameI.value.trim() || 'your name';
    $('.mk-pc-msg').textContent = '“' + (msgI.value.trim() || 'stay away from the edge') + '”';
    $('.mk-pc-d').textContent = today;
    $('.mk-pc-t').textContent = t.n + ' · NZ$ ' + t.pr;
    $('.mk-no').textContent = num();
    $('.mk-gets').innerHTML = t.get.map(g => `<li>${esc(g)}</li>`).join('');
  };
  const pick = (i, scroll) => {
    ai = i;
    $$('.ag-c').forEach((c, k) => c.classList.toggle('on', k === i));
    const box = $('.mk-pc-img');
    box.innerHTML = `<span class="slot" data-img="${A[i].img}" data-note="${A[i].n.toLowerCase()}"${A[i].tone ? ` data-tone="${A[i].tone}"` : ''}></span>`; fill(box);
    write();
    KP.scramble($('.mk-pc-name'), A[i].n);
    if (hasG && !RM) gsap.fromTo('.mk-pc', { rotation: -2.5, y: 20 }, { rotation: 0, y: 0, duration: 1.2, ease: 'elastic.out(1,.6)' });
    if (scroll && KP.lenis) KP.lenis.scrollTo('#make', { duration: 1.8, offset: -40 });
    KP.call(1500 + i * 90, .02);
  };
  grid.addEventListener('click', e => { const c = e.target.closest('.ag-c'); if (c) pick(+c.dataset.i, true); });
  [nameI, msgI].forEach(i => i.addEventListener('input', write));
  $$('.mk-tiers button').forEach(b => b.addEventListener('click', () => {
    ti = +b.dataset.t; $$('.mk-tiers button').forEach(x => x.classList.toggle('on', x === b)); write();
    if (hasG) gsap.from('.mk-gets li', { x: -14, autoAlpha: 0, duration: .6, stagger: .05 });
  }));
  pick(0, false);

  $('.mk-go .a').addEventListener('click', () => {
    const who = nameI.value.trim();
    if (!who) { nameI.focus(); KP.toast('one thing', 'write your name first. it goes on the card.'); return; }
    const a = A[ai];
    if (!mine.includes(a.n)) { mine.push(a.n); KP.set('adopted', mine); }
    KP.toast('adopted', `${a.n.toLowerCase()} has a new person: ${who.toLowerCase()}. the adoption desk opens soon, this is a concept.`);
    KP.call(1800, .03);
  });

  /* the png: the same card, drawn on a canvas */
  $('.mk-go .d').addEventListener('click', async () => {
    const a = A[ai], t = TIERS[ti];
    if (document.fonts) await document.fonts.ready;
    const W = 1600, H = 1120, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    c.fillStyle = '#f2ecdc'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#0a0a09'; c.font = '500 22px "Inter Tight"'; c.textBaseline = 'middle';
    c.fillText('RIMU · ADOPTION CARD', 28, 36); c.textAlign = 'right'; c.fillText(num(), W - 28, 36);
    c.fillText('LEARN THE BIRDS, THEN LET THEM BE', W - 28, H - 36); c.textAlign = 'left'; c.fillText('WHENUA HOU · NEW ZEALAND', 28, H - 36);
    const im = $('.mk-pc-img img');
    const px = 10, py = 72, pw = 800, phh = H - 144;
    if (im && im.complete) {
      const s = Math.max(pw / im.naturalWidth, phh / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s;
      c.save(); c.beginPath(); c.rect(px, py, pw, phh); c.clip(); c.drawImage(im, px + (pw - w) / 2, py + (phh - h) / 2, w, h); c.restore();
    } else { c.fillStyle = '#2f4a2c'; c.fillRect(px, py, pw, phh); }
    const x = 870;
    c.fillStyle = '#6b665c'; c.font = '500 20px "Inter Tight"'; c.fillText('ADOPTED FOR ONE YEAR', x, 130);
    c.fillStyle = '#0a0a09'; c.font = '148px Italiana'; c.textBaseline = 'alphabetic'; c.fillText(a.n, x - 6, 320);
    c.fillStyle = '#6b665c'; c.font = 'italic 26px "Inter Tight"'; c.fillText(a.b + ' · ' + a.lat, x, 372);
    c.fillStyle = '#0a0a09'; c.font = '96px "Pinyon Script"'; c.fillText(nameI.value.trim() || 'your name', x, 720);
    c.fillStyle = '#3d3a34'; c.font = '28px "Inter Tight"'; c.fillText('“' + (msgI.value.trim() || 'stay away from the edge') + '”', x, 800);
    c.strokeStyle = 'rgba(10,10,9,.25)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, 900); c.lineTo(W - 40, 900); c.stroke();
    c.fillStyle = '#6b665c'; c.font = '500 20px "Inter Tight"'; c.fillText(today.toUpperCase(), x, 940);
    c.textAlign = 'right'; c.fillText((t.n + ' · NZ$ ' + t.pr).toUpperCase(), W - 40, 940); c.textAlign = 'left';
    // the stamp: a koru in a dashed circle
    c.save(); c.translate(W - 130, 170); c.rotate(-.2);
    c.setLineDash([8, 7]); c.strokeStyle = '#e8821e'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 76, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
    c.fillStyle = '#e8821e'; c.beginPath(); c.arc(0, 0, 44, 0, Math.PI * 2); c.fill();
    c.scale(2.2, 2.2); c.translate(-20, -20); c.strokeStyle = '#0a0a09'; c.lineWidth = 2.4; c.lineCap = 'round';
    c.stroke(new Path2D('M13 33 C12.5 22 14.5 10 24 10 C31 10 32 19 26.5 21 C22 22.6 19.5 18 22.5 16 C24.5 14.8 26 16.8 24.6 18')); c.restore();
    try {
      const link = document.createElement('a'); link.download = 'rimu-' + a.n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + '-card.png';
      link.href = cv.toDataURL('image/png'); link.click();
      KP.toast('saved', 'your card is in your downloads. put it on the fridge.');
    } catch (e) { KP.toast('hm', 'open the page from a server to download the card.'); }
  });

  /* ═══════════════ letters from the ranger ═══════════════ */
  const L = [
    { m: 'January', to: 'TĪWAI', img: 'HOME/d8.jpg', tone: 'night', t: 'She boomed for six hours last night. Nobody slept. Worth it.' },
    { m: 'February', to: 'MOANA', img: 'BIRDS/takahe.jpg', t: 'The chick has a name now, and 1.1 kg of opinions.' },
    { m: 'March', to: 'HINE', img: 'TRAILS/e2.jpg', tone: 'sea', t: 'Fog all week. She fished anyway, alone at the hide.' },
    { m: 'April', to: 'PIP', img: 'BIRDS/hihi.jpg', tone: 'sun', t: 'He chased a tūī twice his size off feeder two. Proud.' },
    { m: 'May', to: 'KORO', img: 'BIRDS/kaka.jpg', t: 'He took my pen again. That\'s why this one is in pencil.' },
    { m: 'June', to: 'AROHA', img: 'TRAILS/b1.jpg', t: 'Stood on my boot for eleven minutes. I didn\'t move.' },
    { m: 'July', to: 'WIRI', img: 'BIRDS/tui.jpg', t: 'He does the ferry horn now. The ferry was not coming.' },
    { m: 'October', to: 'KAHU', img: 'TRAILS/r2.jpg', t: 'Heard him on the ridge this morning. He\'s back.' },
  ];
  const track = $('.lt-track');
  track.innerHTML = L.map(l => `<article class="pc lt-c"><span class="pc-s"><b>${l.m.toUpperCase()}</b><b>TO ${l.to}'S PEOPLE</b></span>
    <span class="pc-img"><span class="slot" data-img="${l.img}" data-note="${l.to.toLowerCase()}"${l.tone ? ` data-tone="${l.tone}"` : ''}></span></span>
    <p>${l.t}</p><span class="pc-s"><b class="lt-sign">Mere</b><b>RANGER · THE RIDGE</b></span></article>`).join('');
  fill(track);

  /* ═══════════════ motion ═══════════════ */
  if (hasG && !RM) {
    gsap.set(['.ph-t', '.ph-card', '.ph-k', '.ph-r'], { autoAlpha: 0 });
    KP.ready.then(() => gsap.timeline()
      .fromTo('.ph-win>.slot', { scale: 1.2 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .fromTo('.ph-t', { autoAlpha: 0, y: 60, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' }, .2)
      .fromTo(['.ph-k', '.ph-r', '.ph-card'], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: .1, ease: 'expo.out' }, .5));
    $$('.sh').forEach(h => gsap.from(h.children, { y: 50, autoAlpha: 0, duration: 1.4, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    gsap.from('.ag-c', { y: 100, autoAlpha: 0, duration: 1.4, stagger: { each: .07, grid: [2, 4] }, ease: 'expo.out', scrollTrigger: { trigger: grid, start: 'top 80%' } });
    gsap.from('.mk-pc', { y: 120, rotation: 4, autoAlpha: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.mk-grid', start: 'top 75%' } });
    // the letters slide sideways while the page holds still
    gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: '.lt-pin', pin: true, start: 'top top', end: () => '+=' + (track.scrollWidth - innerWidth), scrub: 1, invalidateOnRefresh: true } });
    gsap.fromTo('.nx-win', { clipPath: 'inset(12% 8% 12% 8% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.nx', start: 'top bottom', end: 'top 20%', scrub: true } });
    const fb = $('.ft-big');
    fb.innerHTML = fb.textContent.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
    gsap.from($$('span', fb), { yPercent: 70, autoAlpha: 0, duration: 1.6, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: fb, start: 'top 90%' } });
    addEventListener('load', () => ScrollTrigger.refresh());
  } else track.style.overflowX = 'auto';
})();
