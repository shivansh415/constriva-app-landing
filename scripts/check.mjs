// Fails the build when something that hurts visitors or search is broken.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const D = 'dist', errors = [];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmls = walk(D).filter((f) => f.endsWith('.html'));
const exists = (u) => { const p = u.split(/[?#]/)[0]; return existsSync(join(D, p)) && (!p.endsWith('/') || existsSync(join(D, p, 'index.html'))); };
const titles = new Map(), descs = new Map();

for (const f of htmls) {
  const s = readFileSync(f, 'utf8'), is404 = f.endsWith('404.html');
  const bad = (m) => errors.push(`${f}: ${m}`);
  for (const [, u] of s.matchAll(/(?:src|href)="(\/[^"]*)"/g)) if (!exists(u)) bad(`broken link or file ${u}`);
  for (const [t] of s.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(t)) bad(`image without alt: ${t.slice(0, 80)}`);
  if ((s.match(/<h1\b/g) || []).length !== 1) bad('needs exactly one h1');
  for (const [, j] of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) try { JSON.parse(j); } catch { bad('structured data is not valid JSON'); }
  if (is404) continue;
  const title = s.match(/<title>([^<]*)/)?.[1] || '', desc = s.match(/name="description" content="([^"]*)/)?.[1] || '', canon = s.match(/rel="canonical" href="([^"]*)/)?.[1];
  if (title.length < 25 || title.length > 75) bad(`title length ${title.length}`);
  if (desc.length < 80 || desc.length > 180) bad(`description length ${desc.length}`);
  if (titles.has(title)) bad('duplicate title'); titles.set(title, f);
  if (descs.has(desc)) bad('duplicate description'); descs.set(desc, f);
  if (!canon) bad('no canonical');
  const map = readFileSync(join(D, 'sitemap.xml'), 'utf8');
  if (canon && !map.includes(`<loc>${canon}</loc>`)) bad('not in the sitemap');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`check: ${htmls.length} pages ok`);
