// About story only: remove a repeated copy of the shared menu from the page
// body. Never touch unrelated pages or a structurally different secondary nav.
export function normalizeAboutComponent(doc) {
  if (!doc.querySelector('.section-animation-about, .section.hero-about + .section.about-second')) return;
  const main = doc.querySelector('main.main-wrapper');
  const primary = [...doc.querySelectorAll('.navbar-logo-center')].find(nav => !main?.contains(nav));
  if (!main || !primary) return;
  const signature = nav => JSON.stringify([...nav.querySelectorAll('a[href]')].map(link => [link.getAttribute('href'), link.textContent.trim()]));
  const expected = signature(primary);
  main.querySelectorAll('.navbar-logo-center').forEach(nav => {
    if (nav.querySelector('.navbar-brand-three') && signature(nav) === expected) nav.remove();
  });
}
