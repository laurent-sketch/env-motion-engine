// Webflow retains ownership of modal opening/closing. This adapter follows its
// click/state changes, adds a cross/color state and animates only child links.
export function installMobileMenu(nav, win = window) {
  const burger = nav?.querySelector('.burger-menu-wrap');
  const modal = nav?.querySelector('.menu-modal');
  const top = burger?.querySelector('.line-burger.top');
  const bottom = burger?.querySelector('.line-burger.bottom');
  if (!burger || !modal || !top || !bottom) return () => {};
  const mobile = win.matchMedia('(max-width: 991px)');
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  const abort = new AbortController();
  const original = new Map(['role', 'tabindex', 'aria-expanded', 'aria-label', 'aria-controls'].map(name => [name, burger.getAttribute(name)]));
  const modalId = modal.getAttribute('id');
  const wasInert = modal.inert;
  const shift = burger.style.getPropertyValue('--env-burger-shift');
  if (!modalId) modal.id = 'env-sd-mobile-menu';
  if (burger.tagName !== 'BUTTON') {
    burger.setAttribute('role', 'button');
    if (!burger.hasAttribute('tabindex')) burger.setAttribute('tabindex', '0');
  }
  burger.setAttribute('aria-controls', modal.id);
  nav.classList.add('is-env-burger-managed');
  let open = false, pending = null, disposed = false;
  let opacity = Number(modal.style.opacity || 0);
  const effects = new Set();
  function clearEffects() { effects.forEach(effect => effect.cancel()); effects.clear(); }
  function measure() {
    const distance = (bottom.offsetTop + bottom.offsetHeight / 2 - top.offsetTop - top.offsetHeight / 2) / 2;
    burger.style.setProperty('--env-burger-shift', `${distance > 0 ? distance : 4.5}px`);
  }
  function cascade() {
    clearEffects();
    if (reduced.matches || !burger.animate) return;
    const items = [...modal.querySelectorAll('.logo-menu-mobile, .link-menu-overlay')];
    items.forEach((element, index) => {
      const css = win.getComputedStyle(element);
      const finalTransform = css.transform;
      const effect = element.animate([
        { opacity: 0, transform: `translateY(18px) ${finalTransform === 'none' ? '' : finalTransform}`.trim() },
        { opacity: css.opacity, transform: finalTransform }
      ], { duration: 550, delay: 70 + index * 65, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      effects.add(effect);
      effect.finished?.then(() => effects.delete(effect), () => effects.delete(effect));
    });
  }
  function state(next) {
    const changed = next !== open;
    open = next;
    nav.classList.toggle('is-env-menu-open', open);
    modal.inert = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!changed) return;
    if (open) { measure(); cascade(); } else clearEffects();
  }
  function sync() {
    if (disposed) return;
    const nextOpacity = Number(modal.style.opacity || win.getComputedStyle(modal).opacity);
    const hidden = (modal.style.display || win.getComputedStyle(modal).display) === 'none' || modal.hidden || modal.getAttribute('aria-hidden') === 'true';
    if (!mobile.matches) { pending = null; state(false); }
    else if (pending === true) {
      if (!hidden && nextOpacity >= .999) pending = null;
    } else if (pending === false) {
      if (hidden || nextOpacity <= .001) pending = null;
    } else if (hidden || nextOpacity <= .001) state(false);
    else if (nextOpacity < opacity - .001) state(false);
    else if (nextOpacity > opacity + .001 || nextOpacity >= .999) state(true);
    opacity = nextOpacity;
  }
  burger.addEventListener('click', () => {
    if (!mobile.matches) return;
    pending = !open;
    state(pending);
    // Do not prevent or duplicate this click: native Webflow handles the modal.
  }, { capture: true, signal: abort.signal });
  burger.addEventListener('keydown', event => {
    if (burger.tagName === 'BUTTON' || !mobile.matches || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault(); burger.click();
  }, { signal: abort.signal });
  modal.addEventListener('click', event => {
    if (open && mobile.matches && event.target.closest?.('a[href]')) burger.click();
  }, { signal: abort.signal });
  nav.ownerDocument.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open && mobile.matches) { event.preventDefault(); burger.click(); }
  }, { signal: abort.signal });
  const observer = new win.MutationObserver(sync);
  observer.observe(modal, { attributes: true, attributeFilter: ['style', 'hidden', 'aria-hidden'] });
  mobile.addEventListener('change', sync);
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Open menu');
  sync();
  return () => {
    disposed = true; observer.disconnect(); abort.abort(); mobile.removeEventListener('change', sync); clearEffects();
    nav.classList.remove('is-env-burger-managed', 'is-env-menu-open');
    original.forEach((value, name) => value === null ? burger.removeAttribute(name) : burger.setAttribute(name, value));
    modal.inert = wasInert;
    if (modalId === null) modal.removeAttribute('id');
    if (shift) burger.style.setProperty('--env-burger-shift', shift); else burger.style.removeProperty('--env-burger-shift');
  };
}
