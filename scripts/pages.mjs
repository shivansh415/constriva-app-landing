// Writes the search pages, sitemap, robots and llms.txt from the copy below.
// Run by `npm run build`; edit the copy here, not the generated HTML.
import { mkdirSync, writeFileSync } from 'node:fs';

export const SITE = 'https://app.constrivaglobal.com';
const TODAY = new Date().toISOString().slice(0, 10);

const PAGES = [
  {
    slug: 'home-construction-app',
    title: 'Home Construction App: Plan, Price and Follow Your Build',
    desc: 'A home construction app for owners. Draw or share your plans, compare supplier quotes, follow approved site progress and keep every document in one place.',
    eyebrow: 'For owners', h1: 'The home construction app that keeps you in the picture.',
    intro: 'Building a house means hundreds of decisions, dozens of people and one budget. Constriva puts all of it on your phone, in plain words.',
    pose: 'present', say: 'Let me show you around.', hero: 'home', heroAlt: 'Constriva client app showing a villa that is 64 percent built',
    rows: [
      ['Progress you can trust', 'A percentage means little if anyone can type it. In Constriva, progress counts only after the engineer on your project approves it, with photos from the site. You see the stage, the week and what happens next.', 'overview', 'Project overview with approved progress'],
      ['Every quote, side by side', 'Describe what you need once. Verified suppliers reply with priced quotes, and the app lines them up with delivery, fixing and lead time, so you compare like with like.', 'quotes', 'Four facade stone quotes compared'],
      ['Decisions with a deadline', 'Stone, tiles, window colour: each choice arrives as a short card with options and the date it is needed. Tap one and the site knows.', 'decisions', 'A facade stone decision with three options'],
      ['A passport for your home', 'At handover you keep the as-built drawings, installed brands, paint colours and warranties in one building passport, ready for the next repair or the next owner.', 'passport', 'Digital building passport'],
    ],
    list: ['Where to begin', ['Draw a first plan by answering a few questions, or share the drawings you have.', 'Ask for a quotation. An engineer reviews it and speaks to you.', 'Read the agreement and sign with a one-time code.', 'Follow each phase until you get the keys.']],
    faq: [['Do I need plans before I start?', 'No. The app can draw a first layout from your answers and you can move rooms by hand. If you have plans already, share them with the engineer.'], ['Are the costs in the app final?', 'Early figures are marked as preliminary. Final prices come from supplier quotes for your own quantities.'], ['Can I use it if I live in another country?', 'Yes. Progress, photos, quotes and decisions reach you on your phone wherever you are.']],
  },
  {
    slug: 'construction-site-app',
    title: 'Construction Site App for Engineers and Contractors',
    desc: 'Constriva Team is a construction site app for check-in, voice daily reports, snags, material lists and signed approvals. Made for engineers and site teams.',
    eyebrow: 'For site teams', h1: 'A construction site app you can use with one hand.',
    intro: 'Dust, sun, gloves and no time. Constriva Team is built for the people on site: few taps, big buttons, and reports you can simply speak.',
    pose: 'hat', say: 'Helmet on. Phone out.', hero: 'onsite', heroAlt: 'Constriva Team app with an engineer checked in on site', app: 'team',
    rows: [
      ['Check in where you stand', 'Hold to check in at the site. The app notes the time and place, so the day’s attendance is ready without a paper register.', 'onsite', 'Site check-in screen'],
      ['Speak the daily report', 'Say who came, what moved and what is stuck. Your words become the daily report, ready to review and submit.', 'voice', 'Voice daily report'],
      ['Snags with before and after', 'Drop a pin, describe the problem, add a photo. When it is fixed, the after photo sits next to the before.', 'before-after', 'Snag before and after photos'],
      ['Approvals with a signature', 'Purchase orders and decisions wait in one place. Sign, stamp and the record is kept with the date.', 'approve', 'Purchase order waiting for approval'],
    ],
    list: ['Who uses it', ['Site engineers and project managers', 'Contractors and supervisors', 'Procurement and approval teams', 'Maintenance engineers after handover']],
    faq: [['Is this the same app the owner uses?', 'No. Owners use the Constriva app. Site teams use Constriva Team. Both work on the same project.'], ['Which languages are available?', 'English, Arabic, Hindi and Russian.'], ['Does the owner see everything we write?', 'Owners see approved progress, photos and decisions. Internal approvals stay with the team.']],
  },
  {
    slug: 'building-materials-quotes',
    title: 'Building Materials Quotes: Walk the Store, Compare Prices',
    desc: 'Choose building materials in a walkable 3D-style store, make one list and ask for one quotation. Marble, tiles, doors, taps, paint and more in the Constriva app.',
    eyebrow: 'The Constriva Store', h1: 'Building materials quotes, without the running around.',
    intro: 'Walk the aisles on your phone, stand in front of the slab, see an indicative price and add it to your trolley. One list goes out. One quotation comes back.',
    pose: 'trolley', say: 'Trolley’s ready.', hero: 'store-slab', heroAlt: 'A marble slab in the Constriva Store',
    rows: [
      ['Stand in front of it', 'Marble, porcelain, timber doors, mixers and paint are shown at a size that makes sense next to a person, with the details that matter for ordering.', 'store-aisle', 'The stone gallery aisle'],
      ['Quantities that match your room', 'Enter the length and width and the app works out how many square metres you need, with an allowance for cuts.', 'store-slab', 'Choosing a quantity of marble'],
      ['One request, checked first', 'Your list is checked by Constriva before suppliers see it, so units and quantities are clear.', 'quotation', 'Quotation request timeline'],
      ['Compared, then you decide', 'Nothing is ordered until you accept. You see the quotes together and choose.', 'quotes', 'Supplier quotes compared'],
    ],
    list: ['What you can look for', ['Marble, granite and porcelain', 'Doors, joinery and kitchens', 'Sanitary ware and mixers', 'Paint, gypsum and ceilings', 'Cement, blocks and steel', 'Lighting, cables and air conditioning']],
    faq: [['Do I pay in the store?', 'No. The store makes a list and asks for a quotation. Prices on the shelf are indicative.'], ['Are the pictures the real product?', 'They are representative images. The quotation names the exact product.'], ['Can suppliers join?', 'Yes. See the supplier page for how requests and quotes work.']],
  },
  {
    slug: 'ai-floor-plan-and-cost',
    title: 'AI Floor Plan and Build Cost App',
    desc: 'Answer a few questions and get a floor plan you can edit by dragging rooms, with a preliminary cost range and an AI engineer that answers your what-ifs.',
    eyebrow: 'Constriva AI', h1: 'An AI floor plan you can move with your thumb.',
    intro: 'Start from a few answers, not a blank page. Change the rooms, see the preliminary cost follow, and ask an AI engineer about your own project.',
    pose: 'orb', say: 'Ask it anything.', hero: 'plan-edit', heroAlt: 'Editing a floor plan by hand in the Constriva app',
    rows: [
      ['Questions, not software', 'How many bedrooms, which layout, a pool or not. Each answer shapes the plan you see.', 'plan-questions', 'Plan questions'],
      ['Drag, swap, resize', 'Move a room onto another to swap them. Pull a corner to resize. Distances to the plot boundary stay on screen.', 'plan-edit', 'Dragging rooms on a floor plan'],
      ['Ask what it would cost', '“What would a pool add to my budget?” The answer comes from your project and is marked as preliminary.', 'ai-answer', 'AI answer about adding a pool'],
      ['See the style first', 'Pick the styles you like and compare concepts before anything is built.', 'concepts', 'Concept comparison'],
    ],
    list: ['Good questions to ask', ['What would another bedroom add?', 'Which stone suits this facade?', 'What should I decide this month?', 'How long does a pool take to build?']],
    faq: [['Is the AI plan ready for construction?', 'No. It is a starting point. Licensed engineers prepare and check the drawings used on site.'], ['Are AI costs a quotation?', 'No. They are preliminary ranges. A quotation comes from an engineer and from suppliers.'], ['Can I edit the plan myself?', 'Yes. You can move and resize rooms by hand.']],
  },
  {
    slug: 'home-maintenance-app',
    title: 'Home Maintenance App: Report It, Understand It, Fix It',
    desc: 'A home maintenance app that explains the problem, shows the risk and what to do now, and brings an engineer. For leaks, AC, electrical, cracks and more.',
    eyebrow: 'Home care', h1: 'A home maintenance app that tells you what is wrong.',
    intro: 'A drip at midnight, an AC that only blows warm air. Describe it, get a clear first answer, and follow the visit until it is fixed.',
    pose: 'key', say: 'We stay after the keys.', hero: 'care', heroAlt: 'Home maintenance and care screen',
    rows: [
      ['Pick what is happening', 'Leak, electrical, plumbing, AC, cracks, finishes. Choose, say how urgent it is and add a photo.', 'care-new', 'New maintenance request'],
      ['A first answer in plain words', 'The AI gives a preliminary view of the risk, what to do right now and the likely next step. An engineer confirms it.', 'triage', 'AI triage of an air conditioning problem'],
      ['Every request in one list', 'See what is open, who is assigned and what was done before.', 'care', 'Maintenance list'],
      ['Records that help the next repair', 'Because the building passport knows the brand and the paint code, the next fix starts with facts.', 'passport', 'Building passport'],
    ],
    list: ['What people report', ['Leaks and damp', 'Air conditioning', 'Electrical faults', 'Cracks and facade', 'Doors, paint and finishes', 'Fire systems']],
    faq: [['Is the AI answer final?', 'No. It is preliminary and an engineer confirms it.'], ['What if it is an emergency?', 'Use the emergency option in the app. If there is danger to life, call your local emergency number first.'], ['Do I need to have built with Constriva?', 'You can add a property in the app and ask for care.']],
  },
  {
    slug: 'for-suppliers',
    title: 'Supplier Portal for Construction Materials',
    desc: 'Constriva’s supplier portal brings real material requests, a fast quote builder, orders and delivery notes into one screen for construction suppliers.',
    eyebrow: 'For suppliers', h1: 'A supplier portal that starts with a real request.',
    intro: 'Requests arrive with quantities, units and a closing time. Price them, send the quotation and follow the order to the gate.',
    pose: 'phone', say: 'Real requests only.', hero: null, heroWide: 'sup-requests', heroAlt: 'Supplier portal with requests to quote', app: 'supplier',
    rows: [
      ['See what closes first', 'Open requests are laid out on a timeline, so the one that closes in four hours does not hide under the one due next week.', 'sup-requests', 'Requests on a timeline', 1],
      ['Build the quote as you read', 'Price line by line, skip what you cannot supply, add transport and lead time. The quotation writes itself next to it.', 'sup-quote', 'Quote builder', 1],
      ['Orders you can picture', 'Acknowledge the order, schedule the truck and see what is left to send.', 'sup-order', 'Order view', 1],
      ['Delivery notes with a code', 'The site confirms arrival and both sides keep the same record.', 'sup-delivery', 'Delivery note', 1],
    ],
    list: ['Good to have ready', ['Your trade licence and company details', 'The categories you supply', 'Delivery areas and lead times', 'A contact who answers requests']],
    faq: [['How do suppliers join?', 'Register in the supplier portal. Constriva verifies suppliers before they receive requests.'], ['Is it an app or a website?', 'It is a website that works on a computer or a phone browser.'], ['Who sees my prices?', 'Your quote goes to the Constriva team and the project that asked for it.']],
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="logo" viewBox="0 0 44 46"><polygon points="6,2 40,2 33.5,12.4 6,12.4" fill="var(--logo-1,#8BB800)"/><rect x=".5" y="17.4" width="17" height="10.4" fill="currentColor"/><polygon points="6,32.8 33.5,32.8 40,43.2 6,43.2" fill="currentColor"/></symbol><symbol id="i-apple" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.8 1.3 10.35.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.27 3.14-2.53.99-1.45 1.4-2.85 1.42-2.93-.03-.01-2.72-1.04-2.74-4.13zM14.47 4.93c.71-.87 1.2-2.07 1.06-3.27-1.03.04-2.27.69-3.01 1.55-.66.76-1.24 1.99-1.08 3.16 1.15.09 2.32-.58 3.03-1.44z"/></symbol><symbol id="i-play" viewBox="0 0 24 24"><path fill="#34A853" d="M3.6 1.9c-.35.36-.55.92-.55 1.64v16.92c0 .72.2 1.28.56 1.63l.08.08 9.5-9.48v-.22L3.68 1.82z"/><path fill="#FBBC04" d="m16.35 15.85-3.16-3.16v-.22l3.17-3.16.07.04 3.75 2.13c1.07.6 1.07 1.6 0 2.2l-3.75 2.13z"/><path fill="#EA4335" d="m16.43 15.81-3.24-3.24-9.58 9.58c.36.37.94.42 1.6.05l11.22-6.39"/><path fill="#4285F4" d="M16.43 9.35 5.21 2.97c-.66-.38-1.24-.33-1.6.05l9.58 9.57z"/></symbol><symbol id="i-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol></svg>`;

const learn = (skip) => PAGES.filter((p) => p.slug !== skip).map((p) => `<a href="/${p.slug}/">${p.title.split(':')[0]}</a>`).join('');

export function footer(skip) {
  return `<footer class="foot"><div class="foot-top"><a class="nav-logo" href="/"><svg><use href="#logo"/></svg><span>Constriva</span></a><p>Design. Build. Maintain.</p></div>
  <div class="foot-cols"><div><b>Learn</b>${learn(skip)}</div><div><b>Apps</b><a data-store="client" href="/#get">For owners</a><a data-store="team" href="/#get">For teams</a><a data-supplier href="/#get">For suppliers</a></div><div><b>Company</b><a href="https://constrivaglobal.com">Constriva</a><a href="https://constrivaglobal.com/projects">Projects</a><a href="https://constrivaglobal.com/contact">Contact</a></div></div>
  <p class="fine">© <span id="yr">${new Date().getFullYear()}</span> Constriva. App screens show sample projects. The guide and some pictures are computer generated. App Store is a trademark of Apple Inc. Google Play is a trademark of Google LLC.</p></footer>`;
}

function page(p) {
  const url = `${SITE}/${p.slug}/`, title = `${p.title} | Constriva`;
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': url + '#page', url, name: title, description: p.desc, inLanguage: 'en', isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': 'https://constrivaglobal.com/#organization' }, primaryImageOfPage: `${SITE}/og.jpg` },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Constriva', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: p.title.split(':')[0], item: url }] },
    { '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ] };
  const app = p.app || 'client';
  const cta = app === 'supplier' ? `<div class="badges"><a class="badge" data-supplier href="/#get" style="padding:0 24px"><span><small>Open the</small><b>Supplier portal</b></span></a></div>` : `<div class="badges" data-badges="${app}"></div>`;
  const visual = p.heroWide ? `<div class="win big"><i></i><img src="/img/screens/${p.heroWide}.webp" alt="${esc(p.heroAlt)}" width="880" height="550" fetchpriority="high"></div>` : `<div class="phone"><img src="/img/screens/${p.hero}.webp" alt="${esc(p.heroAlt)}" width="540" height="1168" fetchpriority="high"></div>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#E9E2FF">
<meta property="og:type" content="website"><meta property="og:site_name" content="Constriva"><meta property="og:url" content="${url}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:image" content="${SITE}/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.png"><link rel="apple-touch-icon" href="/icon-180.png"><link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/src/style.css">
${ld(graph)}
</head>
<body class="sub-page">
<a class="skip" href="#main">Skip to content</a>
${SPRITE}
<header class="nav" id="nav"><a class="nav-logo" href="/" aria-label="Constriva home"><svg><use href="#logo"/></svg><span>Constriva</span></a><nav class="nav-links" aria-label="Sections"><a href="/#build">How it works</a><a href="/#store">The store</a><a href="/#ai">AI engineer</a><a href="/#everyone">For everyone</a></nav><a class="btn btn-ink nav-cta" ${app === 'supplier' ? 'data-supplier' : `data-store="${app}"`} href="#get">${app === 'supplier' ? 'Open portal' : 'Get the app'}</a></header>
<main id="main">
<section class="p-hero"><div class="p-copy"><nav class="crumb" aria-label="Breadcrumb"><a href="/">Constriva</a><span>/</span>${esc(p.eyebrow)}</nav><h1>${p.h1}</h1><p>${p.intro}</p>${cta}</div>
<div class="p-visual">${visual}<figure class="p-guide"><figcaption>${p.say}</figcaption><img src="/img/guide/${p.pose}.webp" alt="" width="300" height="600"></figure></div></section>
<section class="p-rows">${p.rows.map(([h, t, img, alt, wide], i) => `<article class="p-row r${i % 4}"><div><h2>${h}</h2><p>${t}</p></div>${wide ? `<div class="win"><i></i><img src="/img/screens/${img}.webp" alt="${esc(alt)}" width="880" height="550" loading="lazy"></div>` : `<div class="phone"><img src="/img/screens/${img}.webp" alt="${esc(alt)}" width="540" height="1168" loading="lazy"></div>`}</article>`).join('')}</section>
<section class="p-list"><h2 class="h2 left">${p.list[0]}</h2><ol>${p.list[1].map((x) => `<li>${x}</li>`).join('')}</ol></section>
<section class="faq"><h2 class="h2 left">Good to know.</h2><div class="qs">${p.faq.map(([q, a]) => `<details><summary>${q}<svg><use href="#i-chev"/></svg></summary><p>${a}</p></details>`).join('')}</div></section>
<section class="p-more"><h2 class="h2 left">Keep reading.</h2><div>${PAGES.filter((x) => x.slug !== p.slug).map((x) => `<a href="/${x.slug}/"><span>${x.eyebrow}</span><b>${x.title.split(':')[0]}</b></a>`).join('')}</div></section>
<section class="final p-final" id="get"><h2>Ready when you are.</h2><p class="sub">Start with a sketch, a plot or just a wish.</p>${cta}</section>
</main>
${footer(p.slug)}
<script type="module" src="/src/sub.js"></script>
</body>
</html>
`;
}

for (const p of PAGES) { mkdirSync(p.slug, { recursive: true }); writeFileSync(`${p.slug}/index.html`, page(p)); }

const urls = ['', ...PAGES.map((p) => p.slug + '/')];
writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}/${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync('public/llms.txt', `# Constriva\n\n> Constriva is a set of apps for building and looking after a home: a client app for owners, a Team app for engineers and contractors, and a web portal for suppliers. It is made by Constriva, a general contractor in Abu Dhabi, UAE (https://constrivaglobal.com).\n\n## Pages\n${PAGES.map((p) => `- [${p.title}](${SITE}/${p.slug}/): ${p.desc}`).join('\n')}\n\n## Languages\nEnglish, Arabic, Hindi, Russian (in the apps)\n`);
writeFileSync('public/site.webmanifest', JSON.stringify({ name: 'Constriva', short_name: 'Constriva', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#E9E2FF', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
writeFileSync('404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | Constriva</title><meta name="robots" content="noindex"><link rel="icon" href="/favicon.png"><link rel="stylesheet" href="/src/style.css"></head><body class="sub-page">${SPRITE}<main class="nf"><img src="/img/guide/hat.webp" alt="" width="200" height="440"><h1>Nothing built here yet.</h1><p>That page does not exist.</p><a class="btn btn-ink" href="/">Back to Constriva</a></main></body></html>`);
console.log(`pages: ${PAGES.length} search pages, sitemap with ${urls.length} urls`);
