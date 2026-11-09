const sheets = doc => [...doc.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute('href'));
function family(href, site) {
  try {
    const url = new URL(href);
    if (url.origin !== 'https://cdn.prod.website-files.com' || url.search || url.hash || url.username || url.password) return null;
    const prefix = `/${site}/css/`;
    if (!url.pathname.startsWith(prefix)) return null;
    const match = url.pathname.slice(prefix.length).match(/^([a-zA-Z0-9_-]+\.webflow\.shared)\.[a-f0-9]{6,32}\.min\.css$/);
    return match ? prefix + match[1] : null;
  } catch (_) { return null; }
}
// Accept only a new version of the same official, same-site shared stylesheet.
// Additional styles, changed families or arbitrary CSS still require a reload.
export function planStylesheetUpdate(incoming, baseline, site) {
  const next = sheets(incoming);
  if (next.length !== baseline.length) throw Error('Stylesheets changed');
  const replacements = [];
  next.forEach((to, index) => {
    const from = baseline[index];
    if (to === from) return;
    const key = family(from, site);
    if (!key || family(to, site) !== key) throw Error('Stylesheets changed');
    replacements.push({ from, to, media: incoming.querySelectorAll('link[rel="stylesheet"]')[index].getAttribute('media') || 'all' });
  });
  return { sheets: next, replacements };
}
export async function stageStylesheetUpdate(doc, plan, { timeout = 5000 } = {}) {
  const owned = [];
  let committed = false;
  const rollback = () => { if (!committed) owned.forEach(link => link.remove()); };
  try {
    await Promise.all(plan.replacements.map(({ to }) => new Promise((resolve, reject) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet'; link.href = to; link.media = 'not all';
      link.setAttribute('data-env-staged-sheet', ''); owned.push(link);
      const timer = setTimeout(() => finish(Error('Webflow stylesheet update timed out')), timeout);
      const finish = error => {
        clearTimeout(timer); link.onload = link.onerror = null;
        if (error) reject(error); else resolve();
      };
      link.onload = () => finish(); link.onerror = () => finish(Error('Webflow stylesheet update failed'));
      doc.head.append(link);
    })));
  } catch (error) { rollback(); throw error; }
  return { rollback, commit() {
    if (committed) return;
    committed = true;
    // Activate only after the outgoing view has been frozen and content replaced.
    owned.forEach((link, index) => {
      link.media = plan.replacements[index].media; link.removeAttribute('data-env-staged-sheet');
    });
    const previous = new Set(plan.replacements.map(item => item.from));
    doc.querySelectorAll('link[rel="stylesheet"]:not([data-env-staged-sheet])').forEach(link => {
      if (previous.has(link.getAttribute('href'))) link.remove();
    });
  } };
}
