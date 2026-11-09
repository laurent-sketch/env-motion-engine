export function footerRevealProgress(top, height, viewport) {
  return Math.max(0, Math.min(1, (viewport - top) / Math.max(1, Math.min(height, viewport))));
}

// Own only the footer's vertical translation. Webflow keeps the logo entrance
// and link hovers; its page-percentage translation cannot overwrite this one.
export function installFooterReveal(root, win = window) {
  const footer = root?.querySelector('.section.footer.static');
  if (!footer) return () => {};
  const doc = footer.ownerDocument;
  const savedAttr = footer.getAttribute('data-env-footer-reveal');
  const savedValue = footer.style.getPropertyValue('--env-footer-y');
  const savedPriority = footer.style.getPropertyPriority('--env-footer-y');
  const style = doc.createElement('style');
  style.textContent = '[data-env-footer-reveal]{transform:translate3d(0,var(--env-footer-y,0px),0)!important}';
  doc.head.append(style); footer.setAttribute('data-env-footer-reveal', '');
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  const wide = win.matchMedia('(min-width: 768px)');
  let y = 0, frame = 0, disposed = false, previousTime = 0, initialized = false;
  function schedule() { if (!disposed && !frame) frame = win.requestAnimationFrame(render); }
  function render(time) {
    frame = 0;
    if (disposed || !root.isConnected) return;
    if (doc.documentElement.hasAttribute('data-env-transition-active') || root.hasAttribute('data-env-alt-reveal-wait')) { previousTime = 0; return; }
    const rect = footer.getBoundingClientRect();
    // Remove our own translation from the measurement to avoid feedback.
    const progress = footerRevealProgress(rect.top - y, rect.height, win.innerHeight);
    const target = reduced.matches || !wide.matches ? 0 : -300 * (1 - progress);
    const alpha = !initialized || reduced.matches ? 1 : 1 - Math.exp(-Math.min(Math.max(time - previousTime, 0), 64) / 90);
    y += (target - y) * alpha;
    if (Math.abs(target - y) < .1) y = target;
    footer.style.setProperty('--env-footer-y', `${y.toFixed(3)}px`);
    previousTime = time; initialized = true;
    if (y !== target) schedule();
  }
  const resize = win.ResizeObserver ? new win.ResizeObserver(schedule) : null;
  resize?.observe(footer);
  const changes = new win.MutationObserver(schedule);
  changes.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-env-transition-active'] });
  changes.observe(root, { attributes: true, attributeFilter: ['data-env-alt-reveal-wait'] });
  win.addEventListener('scroll', schedule, { passive: true });
  win.addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule); wide.addEventListener('change', schedule);
  footer.addEventListener('load', schedule, true);
  doc.fonts?.ready.then(schedule);
  // First render is synchronous: no frame with the old page-percent transform.
  render(win.performance.now());
  return () => {
    disposed = true; win.cancelAnimationFrame(frame); resize?.disconnect(); changes.disconnect();
    win.removeEventListener('scroll', schedule); win.removeEventListener('resize', schedule);
    reduced.removeEventListener('change', schedule); wide.removeEventListener('change', schedule); footer.removeEventListener('load', schedule, true);
    if (savedAttr === null) footer.removeAttribute('data-env-footer-reveal'); else footer.setAttribute('data-env-footer-reveal', savedAttr);
    if (savedValue) footer.style.setProperty('--env-footer-y', savedValue, savedPriority); else footer.style.removeProperty('--env-footer-y');
    style.remove();
  };
}
