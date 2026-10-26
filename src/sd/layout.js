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
export function validate(doc, pathname, expectedSheets, { refreshRuntime = false, gsapScripts, profiles = routes, inlineScripts = [], persistentContact = false } = {}) {
  const scripts = [...doc.scripts].map(s => s.getAttribute('src')).filter(s => s?.includes('/js/webflow.'));
  const known = profiles[pathname];
  const record = known || Object.values(profiles).find(r => JSON.stringify(r.scripts) === JSON.stringify(scripts)) || (refreshRuntime ? routes['/home-sd'] : undefined);
  if (!record || doc.documentElement.getAttribute('data-wf-site') !== record.site || !doc.documentElement.getAttribute('data-wf-page') || (known && doc.documentElement.getAttribute('data-wf-page') !== known.page)) throw Error('Uncertified page');
  const runtimeChanged = JSON.stringify(scripts) !== JSON.stringify(record.scripts);
  if (runtimeChanged && !refreshRuntime) throw Error('Webflow export changed; rebuild SD snapshots');
  // Keep the audited shared core; publication-specific chunks/bootstrap may rotate.
  if (runtimeChanged && !Object.values(profiles).some(profile => profile.scripts.slice(0, 2).every(url => scripts.includes(url)))) throw Error('Webflow shared core changed');
  const bootstrap = scripts.find(url => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(url));
  if (runtimeChanged && !bootstrap) throw Error('Missing Webflow data bootstrap');
  if (gsapScripts && [...doc.scripts].map(s => s.src).filter(url => url.includes('/gsap/')).some(url => !gsapScripts.includes(url))) throw Error('New GSAP dependency requires native navigation');
  if (!doc.querySelector('.navbar-logo-center') || !doc.querySelector('body > main.main-wrapper, #env-sd-page > main.main-wrapper')) throw Error('Page needs the shared SD menu and main wrapper');
  const sheets = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(e => e.getAttribute('href'));
  if (!(expectedSheets || record.sheets).every(s => sheets.includes(s)) || (expectedSheets && sheets.length !== expectedSheets.length)) throw Error('Stylesheets changed');
  // Unknown inline scripts need a lifecycle adapter rather than blind execution.
  for (const s of doc.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(s.src)) throw Error('Remove the legacy env.js loader on pilot routes');
    if (/const brand =/.test(s.textContent) && !/ENV SD/.test(s.textContent)) throw Error('Remove the legacy brand initializer on pilot routes');
    if (s.src || !s.textContent.trim() || s.type === 'application/ld+json') continue;
    if (inlineScripts.includes(s.textContent)) continue;
    if (/^\s*window\.ENVSDTransition\s*=\s*(['"])[a-zA-Z-]*\1\s*;?\s*$/.test(s.textContent)) continue;
    if (!/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(s.textContent)) throw Error('Additional inline script needs an adapter');
  }
  if (doc.querySelector('[data-animation-type="spline"]') || [...doc.querySelectorAll('.w-form')].some(form => !persistentContact || !form.closest('.navbar-logo-center .contact-modal-bloc'))) throw Error('Unsupported page widget');
  return refreshRuntime ? { ...record, runtimeChanged, bootstrap, dataScripts: scripts.slice(2) } : record;
}

// Keep the persistent menu nodes/listeners, but adopt the destination color variants.
export function syncMenuVariants(live, incoming) {
  // Home omits the mobile contact underline; inner pages include it.
  const contact = live.querySelector('.navbar-logo-center .link-box.mobile');
  const nextContact = incoming.querySelector('.navbar-logo-center .link-box.mobile');
  if (contact && nextContact) {
    const dot = contact.querySelector('.dot-link'), nextDot = nextContact.querySelector('.dot-link');
    if (dot && !nextDot) dot.remove();
    else if (!dot && nextDot) contact.append(nextDot.cloneNode(true));
  }
  for (const [selector, variant] of [['.nav-link-sd', 'white'], ['.dot-link', 'dark'], ['.burger-menu-wrap .line-burger', 'white'], ['.menu-modal', 'darker'], ['.menu-modal .link-overlay', 'dark']]) {
    const current = [...live.querySelectorAll(`.navbar-logo-center ${selector}`)];
    const next = [...incoming.querySelectorAll(`.navbar-logo-center ${selector}`)];
    if (current.length !== next.length) throw Error('Menu variants structure changed');
    current.forEach((el, i) => el.classList.toggle(variant, next[i].classList.contains(variant)));
  }
}

export function syncMenuImages(live, incoming) {
  // Match roles, not all images by index: only the mobile logo may gain/lose its second image.
  for (const selector of ['.navbar-brand-three', '.logo-mobile', '.menu-modal']) {
    const current = live.querySelector(`.navbar-logo-center ${selector}`);
    const next = incoming.querySelector(`.navbar-logo-center ${selector}`);
    if (!current && !next) continue;
    if (!current || !next) throw Error('Menu image slot changed');
    let images = [...current.querySelectorAll('img')];
    const nextImages = [...next.querySelectorAll('img')];
    if (selector !== '.logo-mobile' && images.length !== nextImages.length) throw Error('Menu images structure changed');
    while (images.length > nextImages.length) images.pop().remove();
    while (images.length < nextImages.length) {
      const copy = nextImages[images.length].cloneNode(true);
      current.append(copy); images.push(copy);
    }
    images.forEach((el, i) => {
      el.className = nextImages[i].className;
      for (const attr of ['src', 'srcset', 'sizes', 'alt']) {
        const value = nextImages[i].getAttribute(attr);
        if (value === null) el.removeAttribute(attr); else el.setAttribute(attr, value);
      }
    });
  }
}
