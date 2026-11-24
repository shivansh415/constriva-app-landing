// The guide: one character that stands at a "stop" inside each section and
// travels to the next one while the page scrolls (riding a steel beam on a crane).
//
// While he stands he is positioned in the document, so he scrolls natively with
// the page. While he travels, or inside a pinned section, he is fixed to the screen.

const B = 300; // drawing height of a standing pose
//            aspect = w/h · k = height vs a standing pose · ax = feet · hx,hy = top of the head
const POSES = {
  stride:  { a: 689 / 1000, k: 1.02, ax: .5,  hx: .5,  hy: 0 },
  beam:    { a: 827 / 1100, k: 1.28, ax: .51, hx: .52, hy: .23, beam: true },
  jump:    { a: 679 / 900,  k: .92, ax: .5,  hx: .52, hy: 0, air: true },
  sit:     { a: 486 / 900,  k: .88, ax: .5,  hx: .57, hy: 0, air: true },
  present: { a: 642 / 1000, k: .97, ax: .35, hx: .31, hy: 0 },
  phone:   { a: 470 / 1000, k: 1,   ax: .6,  hx: .68, hy: 0 },
  trolley: { a: 726 / 960,  k: .96, ax: .45, hx: .26, hy: 0 },
  orb:     { a: 493 / 1000, k: 1,   ax: .33, hx: .24, hy: 0 },
  hat:     { a: 455 / 1000, k: 1,   ax: .5,  hx: .43, hy: 0 },
  key:     { a: 481 / 1000, k: 1,   ax: .42, hx: .39, hy: 0 },
};
const src = (p) => `/img/guide/${p}.webp`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const mix = (a, b, t) => a + (b - a) * t;

export function staticGuide() {
  document.querySelectorAll('.stop').forEach((s) => {
    const p = POSES[s.dataset.pose], h = baseH() * .9 * p.k, img = new Image();
    img.src = src(s.dataset.pose); img.alt = ''; img.className = 'stop-static'; img.loading = 'lazy';
    img.style.height = h + 'px'; if (s.dataset.flip) img.style.transform = 'translateX(-50%) scaleX(-1)';
    s.append(img);
  });
}
const baseH = () => (innerWidth < 720 ? clamp(innerHeight * .23, 160, 200) : innerWidth < 1040 ? 240 : 290);

export class Guide {
  constructor() {
    this.root = document.getElementById('guide');
    this.scaleEl = this.root.querySelector('.g-scale');
    this.body = this.root.querySelector('.g-body');
    this.cable = this.root.querySelector('.g-cable');
    this.bubble = document.getElementById('bubble');
    this.text = this.bubble.querySelector('span');
    this.stops = [...document.querySelectorAll('.stop')].map((el) => ({ el, sticky: 'sticky' in el.dataset }));
    this.darks = [...document.querySelectorAll('.ai,.slab-store,.trust-in')];
    this.imgs = {}; this.pose = null; this.rot = 0; this.lastY = scrollY; this.said = ''; this.cur = null;
    this.ensure('stride'); this.ensure('beam');
    this.measure();
    this.root.classList.add('ready');
  }
  ensure(p) {
    if (this.imgs[p]) return this.imgs[p];
    const d = POSES[p], i = new Image(), h = B * d.k, w = h * d.a;
    i.alt = ''; i.decoding = 'async'; i.src = src(p);
    i.style.cssText = `width:${w}px;height:${h}px;left:${-w * d.ax}px`;
    this.body.append(i);
    return (this.imgs[p] = i);
  }
  measure() {
    const vh = innerHeight, y = scrollY;
    this.said = null;
    this.vw = document.documentElement.clientWidth; this.vh = vh; this.H = baseH();
    this.stops.forEach((s, i) => {
      const r = s.el.getBoundingClientRect();
      s.k = parseFloat(getComputedStyle(s.el).getPropertyValue('--k')) || 1;
      if (s.sticky) {
        s.pinEl = s.el.closest('.pin'); s.stickyEl = s.el.closest('.sticky');
        const top = s.pinEl.getBoundingClientRect().top + y;
        s.hs = top - vh * .04; s.he = top + s.pinEl.offsetHeight - vh + vh * .04;
      } else {
        s.x = r.left; s.y = r.top + y;
        s.hs = s.y - vh * .97; s.he = s.y - Math.max(this.H * .9 * s.k, vh * .34);
      }
      if (i === 0) s.hs = -1e6;
      if (i === this.stops.length - 1) s.he = 1e9;
    });
    for (let i = 0; i < this.stops.length - 1; i++) {
      const a = this.stops[i], b = this.stops[i + 1], gap = vh * .12;
      if (b.hs - a.he < gap) {
        if (a.sticky) b.hs = a.he + gap;
        else if (b.sticky) a.he = b.hs - gap;
        else { const m = (a.he + b.hs) / 2; a.he = m - gap / 2; b.hs = m + gap / 2; }
      }
    }
    this.dark = this.darks.map((e) => { const r = e.getBoundingClientRect(); return [r.top + y, r.bottom + y, r.left, r.right]; });
  }
  // where a stop is on screen for a given scroll position
  at(s, sc) {
    if (s.sticky) {
      const a = s.el.getBoundingClientRect(), b = s.stickyEl.getBoundingClientRect();
      return [a.left - b.left, a.top - b.top];
    }
    return [s.x, s.y - sc];
  }
  setPose(p, flip) {
    const key = p + (flip ? 'f' : '');
    if (this.key === key) return;
    this.key = key; this.pose = p; this.flip = flip;
    const img = this.ensure(p), d = POSES[p];
    for (const k in this.imgs) this.imgs[k].classList.toggle('on', this.imgs[k] === img);
    this.root.classList.toggle('on-beam', !!d.beam);
    this.root.classList.toggle('no-shadow', !!d.air);
    this.body.style.transformOrigin = d.beam ? `0 ${-B * d.k}px` : '0 0';
    this.body.animate(
      [{ scale: '.94 1.06' }, { scale: '1.06 .93', offset: .4 }, { scale: '.985 1.02', offset: .72 }, { scale: '1 1' }],
      { duration: 460, easing: 'cubic-bezier(.3,.7,.3,1)' },
    );
  }
  say(t) {
    if (t === this.said) return;
    this.said = t;
    if (!t) { this.bubble.classList.remove('show'); return; }
    this.text.innerHTML = t.split(' ').map((w, i) => `<em style="animation-delay:${.12 + i * .045}s">${w}</em>`).join(' ');
    const bs = this.bubble.style; bs.width = ''; const pad = this.bubble.offsetWidth - this.bubble.clientWidth + parseFloat(getComputedStyle(this.bubble).paddingLeft) * 2;
    bs.width = Math.ceil(this.text.offsetWidth + pad) + 1 + 'px';
    this.bw = this.bubble.offsetWidth; this.bh = this.bubble.offsetHeight;
    this.bubble.classList.add('show');
  }
  tick() {
    const sc = scrollY, S = this.stops, vw = this.vw, vh = this.vh;
    const vel = sc - this.lastY; this.lastY = sc;
    let i = 0; while (i < S.length - 1 && sc > S[i].he) { if (sc >= S[i + 1].hs) i++; else break; }
    const a = S[i], b = S[i + 1], travel = b && sc > a.he;
    if (this.ni !== i) { this.ni = i; for (const n of [1, 2]) if (S[i + n]) this.ensure(S[i + n].el.dataset.pose); if (i > S.length - 3) this.ensure('jump'); if (S[i + 1]) this.ensure('jump'); }
    let x, y, k = a.k, pose, flip, doc = false, say = '';
    if (!travel) {
      [x, y] = this.at(a, sc); doc = !a.sticky; pose = a.el.dataset.pose; flip = !!a.el.dataset.flip; say = a.el.dataset.say || '';
      if (i === S.length - 1 && y < vh * .66) { pose = 'jump'; say = 'See you on site!'; }
      this.rot = mix(this.rot, POSES[pose].beam ? Math.sin(performance.now() / 900) * 2.2 + clamp(vel * .05, -5, 5) : 0, .08);
    } else {
      const d = b.hs - a.he, t = clamp((sc - a.he) / d, 0, 1);
      const [ax, ay] = this.at(a, a.he), [bx, by] = this.at(b, b.hs);
      const right = vw < 1040 || ax > vw * .5 || bx > vw * .5;
      const px = right ? vw - (vw < 720 ? 36 : 74) : (vw < 720 ? 36 : 74), py = vh * (vw < 720 ? .9 : .82);
      const e = clamp(vh * .55 / d, .28, .5);
      const u = smooth(clamp(t / e, 0, 1)), v = smooth(clamp((t - (1 - e)) / e, 0, 1));
      const ux = smooth(clamp(t / (e * .55), 0, 1)), vx = smooth(clamp((t - (1 - e * .55)) / (e * .55), 0, 1));
      x = mix(mix(ax, px, ux), bx, vx); y = mix(mix(ay, py, u), by, v);
      const pk = vw < 720 ? .52 : .6; k = mix(mix(a.k, pk, u), b.k, v);
      pose = d < vh * .3 ? 'jump' : 'beam'; flip = right;
      this.rot = mix(this.rot, clamp(vel * -.12, -9, 9) + Math.sin(performance.now() / 700) * 2, .1);
    }
    this.setPose(pose, flip);
    const D = POSES[pose], s = this.H / B * k, h = B * D.k * s, w = h * D.a, f = flip ? -1 : 1;
    const mode = doc ? 'doc' : 'fixed', yy = doc ? y + sc : y;
    if (mode !== this.mode) { this.mode = mode; this.root.classList.toggle('fixed', !doc); this.bubble.classList.toggle('fixed', !doc); }
    this.root.style.transform = `translate3d(${x.toFixed(2)}px,${yy.toFixed(2)}px,0)`;
    this.scaleEl.style.transform = `scale(${s.toFixed(4)})`;
    const breathe = D.beam ? 0 : Math.sin(performance.now() / 620) * .006;
    this.body.style.transform = `scale(${f},1) rotate(${(this.rot * f).toFixed(2)}deg) scaleY(${(1 + breathe).toFixed(4)})`;
    if (D.beam) {
      const ct = -y; // up to the top of the screen
      this.cable.style.cssText = `left:${(.51 - D.ax) * w * f}px;top:${ct - 40}px;height:${Math.max(0, y - h + 44)}px`;
    }
    let dark = false;
    const my = y + sc - h * .5;
    for (const q of this.dark) if (my > q[0] && my < q[1] && x > q[2] && x < q[3]) dark = true;
    if (dark !== this.isDark) { this.isDark = dark; this.root.classList.toggle('on-dark', dark); }
    // speech
    const vis = y - h > -h * .25 && y - h < vh * .94;
    this.say(vis ? say : '');
    if (say && vis) {
      const hx = x + (D.hx - D.ax) * w * f, hy = y - h * (1 - D.hy);
      const bx = clamp(hx - this.bw * (f > 0 ? .4 : .6), 10, vw - this.bw - 10), by = hy - this.bh - 14;
      this.bubble.style.setProperty('--tx', clamp(hx - bx, 20, this.bw - 20) + 'px');
      this.bubble.style.transform = `translate3d(${bx.toFixed(1)}px,${(doc ? by + sc : by).toFixed(1)}px,0)`;
    }
  }
}
