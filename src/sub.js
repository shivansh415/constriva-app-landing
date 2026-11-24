import { wireLinks, loadAds } from './links.js';
wireLinks();
if ('requestIdleCallback' in window) requestIdleCallback(loadAds); else setTimeout(loadAds, 1200);
