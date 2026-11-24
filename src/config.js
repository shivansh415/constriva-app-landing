// ─────────────────────────────────────────────────────────────
// Everything you change before running ads lives in this file.
// ─────────────────────────────────────────────────────────────
export const CONFIG = {
  // Store links. The client app package and bundle id is ae.constriva.client.
  // TODO: replace `ios` with the real App Store link (…/app/constriva/id##########) once it is live.
  client: {
    ios: 'https://apps.apple.com/app/constriva',
    android: 'https://play.google.com/store/apps/details?id=ae.constriva.client',
  },
  team: {
    ios: 'https://apps.apple.com/app/constriva-team',
    android: 'https://play.google.com/store/apps/details?id=ae.constriva.team',
  },
  supplierWeb: 'https://supplier.constriva.ae',

  // Ads. Leave empty to load nothing at all.
  ga4Id: '',            // e.g. 'G-XXXXXXX'
  googleAdsId: '',      // e.g. 'AW-XXXXXXX'
  googleAdsLabel: '',   // conversion label for a store click
  metaPixelId: '',      // e.g. '123456789012345'
};
