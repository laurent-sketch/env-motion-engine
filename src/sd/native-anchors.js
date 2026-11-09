export function nativeAnchorTarget(href, doc = document, win = window) {
  let url;
  try { url = new URL(href, win.location.href); } catch (_) { return null; }
  if (url.origin !== win.location.origin || url.pathname !== win.location.pathname || url.search !== win.location.search || !url.hash) return null;
  try { return doc.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (_) { return null; }
}

// Keep the browser's default hash navigation, focus, history and CSS offset.
// This guard never prevents the default action or calculates scroll positions.
export function installNativeAnchors(doc = document, win = window) {
  function click(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || link.hasAttribute('target') || link.closest('[data-no-swup],.w-tab-link,[data-modal]')) return;
    if (!nativeAnchorTarget(link.href, doc, win)) return;
    // Bypass Webflow's delegated scroll handler and Swup without cancelling
    // the anchor's native default action. Empty # modal triggers stay untouched.
    event.stopImmediatePropagation();
    const nav = link.closest('.navbar-logo-center.is-env-menu-open');
    if (link.closest('.menu-modal')) nav?.querySelector('.burger-menu-wrap')?.click();
    // Cancel an unfinished wheel tween; native scroll events then synchronize
    // Lenis normally. Never restart a stopped/locked modal or transition.
    const lenis = win.lenis;
    if (lenis && !lenis.isStopped && lenis.isScrolling === 'smooth') { lenis.stop(); lenis.start(); }
  }
  doc.addEventListener('click', click, true);
  return () => doc.removeEventListener('click', click, true);
}
