const pages = new Set(['68bb0b6fbfff68e3dfd32f3d', '68bb0b6fbfff68e3dfd32f3e']);

// These two published legal pages predate the shared main wrapper. Normalize
// only their known section layout; all ordinary pages retain strict validation.
export function normalizeLegalLayout(doc) {
  if (doc.documentElement.getAttribute('data-wf-site') !== '68bb0b6fbfff68e3dfd32f3f' || !pages.has(doc.documentElement.getAttribute('data-wf-page'))) return;
  if (doc.querySelector('main.main-wrapper')) return;
  const footer = doc.querySelector('body > .section.footer');
  const sections = [...doc.querySelectorAll('body > section:not(.footer)')];
  if (!footer || sections.length !== 2 || !sections[0].matches('.section.policy') || !sections[1].matches('.section.padding-top-bottom') || sections.some(section => section.compareDocumentPosition(footer) & 2)) return;
  const main = doc.createElement('main'); main.className = 'main-wrapper';
  main.setAttribute('data-env-legal-main', '');
  sections[0].before(main); sections.forEach(section => main.append(section));
}
