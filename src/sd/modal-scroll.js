// One lock for both overlays. Keep the document at its real scroll offset (no
// body position:fixed), while native scrolling stays available inside a modal.
export function installModalScroll(nav, win = window) {
  const contact = nav?.querySelector('.contact-modal-bloc');
  const menu = nav?.querySelector('.menu-modal');
  if (!contact && !menu) return () => {};
  const doc = nav.ownerDocument, html = doc.documentElement;
  const mobile = win.matchMedia('(max-width: 991px)');
  const controller = new win.AbortController();
  const modals = [contact, menu].filter(Boolean);
  const originals = new Map(modals.map(element => [element, element.getAttribute('data-lenis-prevent')]));
  const headerHeight = contact?.style.getPropertyValue('--env-modal-header-height');
  modals.forEach(element => element.setAttribute('data-lenis-prevent', ''));
  let active = [], locked = false, disposed = false, lenis, resumeLenis = false, touchY;
  const saved = [];
  function measureHeader() {
    if (!contact) return;
    const header = nav.querySelector('.navbar-logo-center-container') || nav;
    contact.style.setProperty('--env-modal-header-height', `${header.getBoundingClientRect().height || 78}px`);
  }
  function property(element, name, value) {
    saved.push([element, name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name)]);
    element.style.setProperty(name, value, 'important');
  }
  function release() {
    if (!locked) return;
    locked = false;
    saved.splice(0).forEach(([element, name, value, priority]) => {
      if (value) element.style.setProperty(name, value, priority); else element.style.removeProperty(name);
    });
    html.removeAttribute('data-env-modal-scroll-lock');
    // The navigation mask owns Lenis after a page link has been clicked.
    if (resumeLenis && !html.hasAttribute('data-env-transition-active')) lenis?.start();
    lenis = null; resumeLenis = false;
  }
  function sync() {
    if (disposed) return;
    active = modals.filter(element => {
      const css = win.getComputedStyle(element);
      if (!element.isConnected || element.hidden || css.display === 'none' || element.getAttribute('aria-hidden') === 'true') return false;
      return element === contact || mobile.matches && (nav.classList.contains('is-env-menu-open') || Number(css.opacity) > .001);
    });
    if (!active.length) { release(); return; }
    if (locked) return;
    locked = true;
    lenis = win.lenis; resumeLenis = !!lenis && !lenis.isStopped;
    lenis?.stop();
    property(html, 'scrollbar-gutter', 'stable');
    property(html, 'overflow', 'hidden');
    property(doc.body, 'overflow', 'hidden');
    html.setAttribute('data-env-modal-scroll-lock', '');
  }
  function canScroll(target, delta) {
    const modal = active.find(element => element.contains(target));
    if (!modal) return false;
    for (let element = target; element && modal.contains(element); element = element.parentElement) {
      const css = win.getComputedStyle(element);
      if (/(auto|scroll)/.test(css.overflowY) && element.scrollHeight > element.clientHeight + 1) {
        if (delta < 0 && element.scrollTop > 0 || delta > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1) return true;
      }
      if (element === modal) break;
    }
    return false;
  }
  doc.addEventListener('wheel', event => {
    if (locked && !event.ctrlKey && event.deltaY && !canScroll(event.target, event.deltaY)) event.preventDefault();
  }, { capture: true, passive: false, signal: controller.signal });
  doc.addEventListener('touchstart', event => { touchY = event.touches.length === 1 ? event.touches[0].clientY : undefined; }, { capture: true, passive: true, signal: controller.signal });
  doc.addEventListener('touchmove', event => {
    if (!locked || event.touches.length !== 1 || touchY === undefined) return;
    const next = event.touches[0].clientY, delta = touchY - next; touchY = next;
    if (delta && !canScroll(event.target, delta)) event.preventDefault();
  }, { capture: true, passive: false, signal: controller.signal });
  doc.addEventListener('keydown', event => {
    if (!locked || !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return;
    if (event.target.closest?.('input,textarea,select,button,a[href],[role="button"],[contenteditable="true"]')) return;
    const delta = ['ArrowUp', 'PageUp', 'Home'].includes(event.key) || event.key === ' ' && event.shiftKey ? -1 : 1;
    if (!canScroll(event.target, delta)) event.preventDefault();
  }, { capture: true, signal: controller.signal });
  const observer = new win.MutationObserver(sync);
  modals.forEach(element => observer.observe(element, { attributes: true, attributeFilter: ['style', 'hidden', 'aria-hidden'] }));
  observer.observe(nav, { attributes: true, attributeFilter: ['class'] });
  mobile.addEventListener('change', sync);
  win.addEventListener('resize', measureHeader, { signal: controller.signal });
  measureHeader();
  sync();
  return () => {
    disposed = true; controller.abort(); observer.disconnect(); mobile.removeEventListener('change', sync); release();
    originals.forEach((value, element) => value === null ? element.removeAttribute('data-lenis-prevent') : element.setAttribute('data-lenis-prevent', value));
    if (contact) {
      if (headerHeight) contact.style.setProperty('--env-modal-header-height', headerHeight);
      else contact.style.removeProperty('--env-modal-header-height');
    }
  };
}
