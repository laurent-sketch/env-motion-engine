// The published 404 intentionally has neither shared navigation nor footer.
export function isNotFoundPage(doc) {
  return doc.documentElement.getAttribute('data-wf-site') === '68bb0b6fbfff68e3dfd32f3f' && doc.documentElement.getAttribute('data-wf-page') === '6af2216acddf96f8782c12c8';
}
export function normalizeUtilityLayout(doc) {
  if (!isNotFoundPage(doc) || doc.querySelector('main.main-wrapper')) return;
  const sections = [...doc.querySelectorAll('body > section')];
  if (sections.length !== 1 || !sections[0].matches('.section.full-dark-blue')) return;
  const main = doc.createElement('main'); main.className = 'main-wrapper';
  sections[0].before(main); main.append(sections[0]);
}
const savedNavigation = new WeakMap();
export function syncOptionalNavigation(live, incoming) {
  let nav = live.querySelector('.navbar-logo-center');
  const next = incoming.querySelector('.navbar-logo-center');
  if (!next) {
    if (!isNotFoundPage(incoming)) throw Error('Missing destination navigation');
    if (nav && !savedNavigation.has(nav)) {
      savedNavigation.set(nav, ['style', 'hidden', 'inert', 'aria-hidden'].map(name => [name, nav.getAttribute(name)]));
      nav.style.setProperty('display', 'none', 'important');
      nav.setAttribute('hidden', ''); nav.setAttribute('inert', ''); nav.setAttribute('aria-hidden', 'true');
    }
    return false;
  }
  if (!nav) {
    nav = live.importNode(next, true);
    live.querySelector('#env-sd-page').before(nav);
    return true;
  }
  const saved = savedNavigation.get(nav);
  if (saved) {
    saved.forEach(([name, value]) => value === null ? nav.removeAttribute(name) : nav.setAttribute(name, value));
    savedNavigation.delete(nav);
  }
  return false;
}
