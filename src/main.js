import Lenis from 'lenis';
import { Guide, staticGuide } from './guide.js';
import { beams } from './beams.js';
import { wireLinks, loadAds, os } from './links.js';
import { showReviews } from './reviews.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
wireLinks();
showReviews();
$('#yr').textContent = new Date().getFullYear();

// Marquee: two copies so the loop is seamless
const track = $('.track'), first = $$('figure', track);
for (let i = 0; i < 2; i++) track.append(...first.map((n) => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $('img', c).alt = ''; return c; }));
$$('.pick button').forEach((b) => b.addEventListener('click', () => {
  $$('.pick button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
  track.dataset.show = b.dataset.f; track.style.animation = 'none'; void track.offsetWidth; track.style.animation = '';
}));

// Words light up as they are read
const words = $$('.words');
words.forEach((h) => { const t = h.textContent.trim(); h.setAttribute('aria-label', t); h.innerHTML = t.split(/\s+/).map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' '); });

// Pinned sections
$$('.pin').forEach((p) => p.style.setProperty('--len', p.dataset.len));
const pins = { build: $('#build'), hand: $('#hand') };
const prog = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight)); };
const swapTo = (root, i) => $$('.swap', root).forEach((s) => [...s.children].forEach((c, j) => { c.classList.toggle('on', j === i); c.classList.toggle('past', j < i); }));

// 3 · the house goes up
const stages = $$('.stages img'), laser = $('.laser'), rail = $$('.rail li'), sBuild = $('.s-build');
const buildSay = ['I’ll bring it down gently.', 'Footings first. Always.', 'Mind your head!', 'Welcome home.'];
let bi = 0;
function build() {
  const p = prog(pins.build), q = clamp((p - .06) / .82) * 3;
  let edge = -1;
  for (let i = 1; i < 4; i++) {
    const raw = clamp((q - (i - 1) - .22) / .62), e = raw * raw * (3 - 2 * raw);
    stages[i].style.clipPath = `inset(${((1 - e) * 100).toFixed(2)}% 0 0 0)`;
    if (raw > 0 && raw < 1) edge = 1 - e;
  }
  laser.style.opacity = edge < 0 ? 0 : 1; if (edge >= 0) laser.style.top = (edge * 100).toFixed(2) + '%';
  const i = Math.min(3, Math.floor(q + .45));
  rail.forEach((l, j) => { l.classList.toggle('on', j === i); l.style.setProperty('--p', clamp(q + .45 - j)); });
  if (i !== bi) { bi = i; swapTo(pins.build, i); sBuild.dataset.say = buildSay[i]; }
  sBuild.style.transform = `translateY(${(Math.sin(p * Math.PI * 3) * 1.6).toFixed(2)}svh)`;
}

// 7 · one hand, five screens
const rig = $('.hand-rig'), screens = $$('.hand-screen img'), dots = $$('.hand-dots i'), sHand = $('.s-hand');
const handSay = ['Go on. It fits in one hand.', 'Zoom in. Feel the veins.', 'Three seconds. Done.', 'My vote? Travertine.', 'Pool it is!'];
let hi = 0;
function hand() {
  const r = pins.hand.getBoundingClientRect(), vh = innerHeight;
  const inn = clamp(1 - r.top / vh), p = prog(pins.hand), q = p * 5, out = clamp((r.bottom < vh ? (vh - r.bottom) / vh : 0));
  const ease = 1 - Math.pow(1 - inn, 3);
  rig.style.transform = `translateY(${((1 - ease) * 46 - out * 10).toFixed(2)}svh) rotate(${((1 - ease) * 16 + Math.sin(q * 1.3) * 1.6).toFixed(2)}deg)`;
  const i = Math.min(4, Math.floor(q));
  screens.forEach((s, j) => {
    const t = clamp((q - j + .12) / .24); // slides up from below as its turn starts
    s.style.transform = j === 0 ? '' : `translateY(${((1 - t) * 100).toFixed(2)}%)`;
    const prev = clamp((q - j - 1 + .12) / .24); s.style.filter = prev > 0 ? `brightness(${(1 - prev * .5).toFixed(2)})` : '';
    s.style.scale = prev > 0 ? (1 - prev * .07).toFixed(3) : '';
  });
  if (i !== hi) { hi = i; swapTo(pins.hand, i); dots.forEach((d, j) => d.classList.toggle('on', j === i)); sHand.dataset.say = handSay[i]; }
}

// 8 · the phone that travels over the AI cards (desktop)
const aiPhone = $('.ai-phone'), aiImgs = $$('.ai-phone img'), aiCards = $$('.ai-card');
function ai() {
  if (innerWidth < 1040) return;
  const r = aiPhone.getBoundingClientRect(), m = r.top + r.height * .5;
  let k = 0; aiCards.forEach((c, i) => { if (c.getBoundingClientRect().top < m) k = i; });
  aiImgs.forEach((im, i) => im.classList.toggle('on', i === k));
}

// Reveal words, nav colour, built %
const nav = $('#nav'), ring = $('#ring'), pct = $('#pct'), darkEls = $$('.ai,.slab-store,.trust-in');
const tilt = $$('.tile .phone,.pair .phone,.ai-card .phone');
function chrome() {
  const vh = innerHeight;
  words.forEach((h) => { const r = h.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return; const n = h.children.length, t = clamp((vh * .9 - r.top) / (vh * .42)); [...h.children].forEach((w, i) => w.classList.toggle('in', t > (i + .5) / (n + 1))); });
  const line = 40; nav.classList.toggle('dark', darkEls.some((e) => { const r = e.getBoundingClientRect(); return r.top < line && r.bottom > line; }));
  const end = $('#get').offsetTop - vh * .3, v = Math.round(clamp(scrollY / end) * 100);
  if (pct.textContent !== String(v)) { pct.textContent = v; ring.style.strokeDasharray = `${v} 100`; }
}
new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')), { threshold: .35 }).observe($('.trust-in'));

// 9 · list that plays itself
const acc = $('#acc'), li = $$('li', acc), phone = $('#accPhone');
let ai9 = 0, t9 = 0, live = false, hold = 0;
const base = '/img/screens/';
li.forEach((l, i) => { if (i) { const im = new Image(); im.loading = 'lazy'; im.alt = ''; im.src = `${base}${l.dataset.img}.webp`; phone.append(im); } $('button', l).addEventListener('click', () => { pick(i); hold = performance.now() + 9000; }); });
function pick(i) { ai9 = i; t9 = 0; li.forEach((l, j) => { l.classList.toggle('on', j === i); $('button', l).setAttribute('aria-expanded', j === i); }); $$('img', phone).forEach((im, j) => im.classList.toggle('on', j === i)); }
pick(0);
new IntersectionObserver(([e]) => { live = e.isIntersecting; }, { threshold: .2 }).observe(acc);
// Keep the page from jumping while items open and close
const lockAcc = () => { acc.style.minHeight = ''; acc.style.minHeight = acc.offsetHeight + 'px'; };

if (!still && os === 'desktop') { const l = new Lenis({ lerp: .11, anchors: { offset: -80 } }); const f = (t) => { l.raf(t); requestAnimationFrame(f); }; requestAnimationFrame(f); }
beams($('#beams'), still);

let guide = null;
if (still) staticGuide(); else guide = new Guide();
window.__guide = guide;

let last = performance.now();
function frame(now) {
  const dt = now - last; last = now;
  build(); hand(); ai(); chrome();
  guide?.tick();
  if (live && !still && now > hold) { t9 += dt; li[ai9].style.setProperty('--v', clamp(t9 / 4200) * 100); if (t9 > 4200) pick((ai9 + 1) % li.length); }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

let vw = innerWidth, rt;
const remeasure = () => { clearTimeout(rt); rt = setTimeout(() => { lockAcc(); guide?.measure(); }, 120); };
addEventListener('resize', () => { if (innerWidth !== vw || os === 'desktop') { vw = innerWidth; remeasure(); } });
addEventListener('orientationchange', remeasure); addEventListener('load', remeasure);
document.fonts?.ready.then(remeasure);
new ResizeObserver(remeasure).observe($('#main'));
if ('requestIdleCallback' in window) requestIdleCallback(loadAds); else setTimeout(loadAds, 1200);
