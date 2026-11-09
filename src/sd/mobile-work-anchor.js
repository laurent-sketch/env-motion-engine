// One narrowly scoped owner for Home's mobile Explore our work action. Keeping
// this in the navigation bundle avoids unrecognized standalone inline scripts.
export function installMobileWorkAnchor(doc = document, win = window) {
  function click(event) {
    if (!win.matchMedia('(max-width: 767px)').matches || event.defaultPrevented || event.button !== 0) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || doc.documentElement.hasAttribute('data-env-transition-active')) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('target') || link.hasAttribute('download') || link.closest('[data-no-swup]')) return;
    let url;
    try { url = new URL(link.href, win.location.href); } catch (_) { return; }
    if (url.origin !== win.location.origin || url.pathname !== win.location.pathname || url.search !== win.location.search || url.hash !== '#work') return;
    const target = doc.getElementById('work');
    if (!target) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const padding = parseFloat(win.getComputedStyle(doc.documentElement).scrollPaddingTop);
    const offset = Number.isFinite(padding) ? padding : 90;
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (win.lenis && !win.lenis.isStopped) {
      win.lenis.scrollTo(target, { offset: -offset, immediate: reduced });
    } else {
      win.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + win.scrollY - offset), behavior: reduced ? 'instant' : 'smooth' });
    }
  }
  doc.addEventListener('click', click, true);
  return () => doc.removeEventListener('click', click, true);
}
