export function anchorOffset(doc = document) {
  return parseFloat(doc.documentElement.style.getPropertyValue('--env-anchor-offset')) || 0;
}

// Native hashes use scroll-padding. Swup's coordinate-based scroll explicitly
// receives the same offset, since compute-scroll-into-view ignores padding.
export function installAnchorPadding(nav, win = window) {
  const root = nav.ownerDocument.documentElement;
  const properties = ['--env-anchor-offset', 'scroll-padding-top'];
  const previous = properties.map(property => [property, root.style.getPropertyValue(property), root.style.getPropertyPriority(property)]);
  const header = nav.querySelector('.navbar-logo-center-container') || nav;
  function update() {
    const height = Math.ceil(header.getBoundingClientRect().height || nav.getBoundingClientRect().height);
    root.style.setProperty('--env-anchor-offset', `${height + 24}px`);
    root.style.setProperty('scroll-padding-top', `${height + 24}px`);
  }
  const observer = win.ResizeObserver ? new win.ResizeObserver(update) : null;
  const doc = nav.ownerDocument;
  function anchorClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('target') || link.hasAttribute('download') || link.closest('[data-no-swup]')) return;
    const url = new URL(link.href, win.location.href);
    if (url.origin !== win.location.origin || url.pathname !== win.location.pathname || url.search !== win.location.search || !url.hash || url.hash === '#') return;
    let target;
    try { target = doc.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (_) { return; }
    if (!target) return;
    // Webflow's native smooth-scroll handler calculates its own coordinates
    // without scroll-padding. Own this one same-page action before it runs.
    event.preventDefault(); event.stopImmediatePropagation();
    if (link.closest('.menu-modal') && nav.classList.contains('is-env-menu-open')) nav.querySelector('.burger-menu-wrap')?.click();
    update();
    const margin = parseFloat(win.getComputedStyle(target).scrollMarginTop) || 0;
    const top = Math.max(0, target.getBoundingClientRect().top + win.scrollY - anchorOffset(doc) - margin);
    if (win.location.hash !== url.hash) win.history.pushState(win.history.state, '', url.href);
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (win.lenis && !reduced) win.lenis.scrollTo(top, { force: true });
    else win.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' });
  }
  observer?.observe(header);
  win.addEventListener('resize', update);
  doc.addEventListener('click', anchorClick, true);
  update();
  return () => {
    observer?.disconnect(); win.removeEventListener('resize', update);
    doc.removeEventListener('click', anchorClick, true);
    previous.forEach(([property, value, priority]) => value ? root.style.setProperty(property, value, priority) : root.style.removeProperty(property));
  };
}
