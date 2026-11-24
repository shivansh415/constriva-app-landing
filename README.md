# Constriva landing page

Static page (Vite, no framework). Mobile first.

- `npm install`, then `npm run dev` → http://127.0.0.1:5190
- `npm run build` → upload the `dist` folder to any host

**Before running ads, edit `src/config.js`:** store links, GA4 / Google Ads / Meta Pixel ids.
Nothing is tracked while those ids are empty. UTM values are passed on to the stores.

Guide: `src/guide.js`. Every `<span class="stop" data-pose data-say>` in `index.html` is a place
where the guide stops. `data-say` is his line; position lives in `src/style.css` (`.s-*`).

`source-art/` and `reference/` are working files. They are not published.

## Deploys

Push to `main`. GitHub Actions builds, checks and publishes to the `release` branch; the server
(`server/`) pulls it within about 30 seconds. The old versions stay in `/var/www/constriva-landing/releases`,
so going back is `ln -sfn` to an older folder (or revert the commit).

Search pages are written by `scripts/pages.mjs`. `npm run check` fails on broken links, missing alt text,
duplicate titles or pages missing from the sitemap. Reviews (`src/reviews.js`) must be real.
