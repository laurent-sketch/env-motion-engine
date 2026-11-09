// Keep the existing contact animation/focus restoration; the mobile Back wrapper
// delegates to its original close button instead of adding a second modal owner.
export function installMobileContact(nav, win = window) {
  const modal = nav?.querySelector('.contact-modal-bloc');
  if (!modal) return () => {};
  const mobile = win.matchMedia('(max-width: 767px)');
  const controller = new win.AbortController();
  const attributes = new Map();
  let disposed = false;
  const properties = ['role', 'tabindex', 'aria-label'];
  function sync() {
    if (disposed) return;
    const visible = !modal.hidden && modal.getAttribute('aria-hidden') !== 'true' &&
      win.getComputedStyle(modal).display !== 'none';
    nav.classList.toggle('is-env-contact-open', mobile.matches && visible);
    modal.querySelectorAll('.close-bloc').forEach(block => {
      if (!attributes.has(block)) attributes.set(block, new Map(properties.map(name => [name, block.getAttribute(name)])));
      const saved = attributes.get(block);
      if (mobile.matches) {
        if (block.tagName !== 'BUTTON' && block.tagName !== 'A') {
          if (!saved.get('role')) block.setAttribute('role', 'button');
          if (saved.get('tabindex') === null) block.setAttribute('tabindex', '0');
        }
        if (!saved.get('aria-label')) block.setAttribute('aria-label', 'Close contact form');
      } else restore(block, saved);
    });
  }
  function restore(element, saved) {
    saved.forEach((value, name) => value === null ? element.removeAttribute(name) : element.setAttribute(name, value));
  }
  function close(event) {
    if (!mobile.matches) return;
    const block = event.target.closest?.('.close-bloc');
    if (!block || !modal.contains(block) || event.target.closest('.close-btn')) return;
    const button = block.querySelector('.close-btn') || modal.querySelector('.close-btn');
    if (!button) return;
    event.preventDefault(); event.stopPropagation();
    button.click();
  }
  modal.addEventListener('click', close, { signal: controller.signal });
  modal.addEventListener('keydown', event => {
    if (!mobile.matches || !['Enter', ' '].includes(event.key) || !event.target.matches?.('.close-bloc')) return;
    // Buttons and links already synthesize their own keyboard clicks.
    if (event.target.matches('button,a[href]')) return;
    close(event);
  }, { signal: controller.signal });
  const observer = new win.MutationObserver(sync);
  observer.observe(modal, { attributes: true, attributeFilter: ['style', 'hidden', 'aria-hidden'] });
  mobile.addEventListener('change', sync);
  sync();
  return () => {
    disposed = true; controller.abort(); observer.disconnect(); mobile.removeEventListener('change', sync);
    nav.classList.remove('is-env-contact-open');
    attributes.forEach((saved, block) => restore(block, saved));
  };
}
