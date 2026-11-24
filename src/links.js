import { CONFIG as C } from './config.js';
const ua = navigator.userAgent;
export const os = /android/i.test(ua) ? 'android' : /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'ios' : 'desktop';
document.documentElement.classList.add('os-' + os);

// Carry the ad campaign through to the stores so installs can be attributed.
function tag(url, kind) {
  const q = new URLSearchParams(location.search), utm = new URLSearchParams();
  for (const [k, v] of q) if (/^(utm_|gclid|fbclid|gbraid|wbraid)/.test(k)) utm.set(k, v);
  if (![...utm].length) return url;
  const u = new URL(url);
  if (kind === 'android') u.searchParams.set('referrer', utm.toString());
  else if (utm.get('utm_campaign')) u.searchParams.set('ct', utm.get('utm_campaign').slice(0, 40));
  return u.href;
}
const url = (app, kind) => tag(C[app][kind], kind);

const badge = (app, kind) => `<a class="badge ${kind}" href="${url(app, kind)}" data-track="${app}:${kind}" rel="noopener">
  <svg aria-hidden="true"><use href="#i-${kind === 'ios' ? 'apple' : 'play'}"/></svg><span><small>${kind === 'ios' ? 'Download on the' : 'Get it on'}</small><b>${kind === 'ios' ? 'App Store' : 'Google Play'}</b></span></a>`;

export function wireLinks() {
  document.querySelectorAll('[data-badges]').forEach((el) => { const a = el.dataset.badges; el.innerHTML = badge(a, 'ios') + badge(a, 'android'); });
  document.querySelectorAll('a[data-store]').forEach((a) => {
    if (os === 'desktop') return; // on a computer these scroll to the two store badges
    a.href = url(a.dataset.store, os); a.dataset.track = a.dataset.store + ':' + os; a.rel = 'noopener';
  });
  document.querySelectorAll('[data-supplier]').forEach((a) => { a.href = C.supplierWeb; a.dataset.track = 'supplier:web'; });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-track]'); if (!a) return;
    const [app, platform] = a.dataset.track.split(':');
    window.gtag?.('event', 'store_click', { app, platform });
    if (C.googleAdsId && C.googleAdsLabel) window.gtag?.('event', 'conversion', { send_to: `${C.googleAdsId}/${C.googleAdsLabel}` });
    window.fbq?.('track', 'Lead', { content_name: app, content_category: platform });
  });
}
export function loadAds() {
  const add = (s) => { const el = document.createElement('script'); el.async = true; el.src = s; document.head.append(el); };
  const g = C.ga4Id || C.googleAdsId;
  if (g) {
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); if (C.ga4Id) gtag('config', C.ga4Id); if (C.googleAdsId) gtag('config', C.googleAdsId);
    add('https://www.googletagmanager.com/gtag/js?id=' + g);
  }
  if (C.metaPixelId) {
    const n = (window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
    window._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    add('https://connect.facebook.net/en_US/fbevents.js'); fbq('init', C.metaPixelId); fbq('track', 'PageView');
  }
}
