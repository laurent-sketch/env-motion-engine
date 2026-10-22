import routes from './routes.json';
export function wrap(doc) {
  let root = doc.querySelector('#env-sd-page');
  if (root) return root;
  const content = doc.querySelector('main.main-wrapper');
  if (!content || content.parentElement !== doc.body) throw Error('Unsupported page layout');
  root = doc.createElement('div'); root.id = 'env-sd-page';
  content.before(root); root.append(content);
  const footer = doc.querySelector('body > .section.footer');
  if (footer) root.append(footer);
  return root;
}
export function validate(doc, pathname) {
  const scripts = [...doc.scripts].map(s => s.getAttribute('src')).filter(s => s?.includes('/js/webflow.'));
  const known = routes[pathname];
  const record = known || Object.values(routes).find(r => JSON.stringify(r.scripts) === JSON.stringify(scripts));
  if (!record || doc.documentElement.getAttribute('data-wf-site') !== record.site || !doc.documentElement.getAttribute('data-wf-page') || (known && doc.documentElement.getAttribute('data-wf-page') !== known.page)) throw Error('Uncertified page');
  if (JSON.stringify(scripts) !== JSON.stringify(record.scripts)) throw Error('Webflow export changed; rebuild SD snapshots');
  if (!doc.querySelector('.navbar-logo-center') || !doc.querySelector('body > main.main-wrapper, #env-sd-page > main.main-wrapper')) throw Error('Page needs the shared SD menu and main wrapper');
  const sheets = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(e => e.getAttribute('href'));
  if (!record.sheets.every(s => sheets.includes(s))) throw Error('Stylesheets changed');
  // Unknown inline scripts need a lifecycle adapter rather than blind execution.
  for (const s of doc.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(s.src)) throw Error('Remove the legacy env.js loader on pilot routes');
    if (/const brand =/.test(s.textContent) && !/ENV SD/.test(s.textContent)) throw Error('Remove the legacy brand initializer on pilot routes');
    if (s.src || !s.textContent.trim() || s.type === 'application/ld+json') continue;
    if (!/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(s.textContent)) throw Error('Additional inline script needs an adapter');
  }
  if (doc.querySelector('.w-form,[data-animation-type="spline"]')) throw Error('Unsupported page widget');
  return record;
}

// Keep the persistent menu nodes/listeners, but adopt the destination color variants.
export function syncMenuVariants(live, incoming) {
  for (const [selector, variant] of [['.nav-link-sd', 'white'], ['.dot-link', 'dark']]) {
    const current = [...live.querySelectorAll(`.navbar-logo-center ${selector}`)];
    const next = [...incoming.querySelectorAll(`.navbar-logo-center ${selector}`)];
    if (current.length !== next.length) throw Error('Menu variants structure changed');
    current.forEach((el, i) => el.classList.toggle(variant, next[i].classList.contains(variant)));
  }
}

export function syncMenuImages(live, incoming) {
  const current = [...live.querySelectorAll('.navbar-logo-center img')];
  const next = [...incoming.querySelectorAll('.navbar-logo-center img')];
  if (current.length !== next.length) throw Error('Menu images structure changed');
  current.forEach((el, i) => {
    for (const attr of ['src', 'srcset', 'sizes', 'alt']) {
      const value = next[i].getAttribute(attr);
      if (value === null) el.removeAttribute(attr); else el.setAttribute(attr, value);
    }
  });
}
