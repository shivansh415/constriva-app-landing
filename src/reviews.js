// Real reviews only. The section stays hidden while this list is empty.
// Example: { text: '…', name: 'First name L.', place: 'Dubai, UAE', stars: 5, source: 'Google Play', date: '2027-01-15' }
export const REVIEWS = [];

export function showReviews() {
  const box = document.getElementById('reviews');
  if (!box || !REVIEWS.length) return;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  box.innerHTML = REVIEWS.map((r) => `<figure><div aria-label="${r.stars} out of 5">${'★'.repeat(r.stars)}</div><blockquote>${esc(r.text)}</blockquote><figcaption><b>${esc(r.name)}</b>${esc(r.place)} · ${esc(r.source)}</figcaption></figure>`).join('');
  box.hidden = false;
}
