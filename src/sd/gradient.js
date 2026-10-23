// One authored header background, outside Swup's fading/replaced content.
export function installGradient({ doc = document, win = window } = {}) {
  const style = doc.createElement('style');
  style.dataset.envSdGradientStyle = '';
  style.textContent = '#env-sd-gradient{position:absolute;pointer-events:none;z-index:0;opacity:0;transition:opacity 350ms ease,height 350ms ease}#env-sd-page[data-env-sd-gradient-page]>.main-wrapper{background-color:transparent!important}#env-sd-page [data-env-sd-gradient-source]{background-image:none!important;background-color:transparent!important}@media(prefers-reduced-motion:reduce){#env-sd-gradient{transition:none}}';
  doc.head.append(style);
  const layer = doc.createElement('div'); layer.id = 'env-sd-gradient'; layer.setAttribute('aria-hidden', 'true');
  doc.querySelector('#env-sd-page').before(layer);
  let source, root, observer, frame, wantsGradient = false;
  const update = () => {
    if (!source?.isConnected) return;
    const rect = source.getBoundingClientRect();
    layer.style.top = `${rect.top + win.scrollY}px`;
    layer.style.left = `${rect.left + win.scrollX}px`;
    layer.style.width = `${rect.width}px`;
    layer.style.height = `${rect.height}px`;
  };
  const schedule = () => { if (frame) return; frame = win.requestAnimationFrame(() => { frame = 0; update(); }); };
  function prepare() {
    observer?.disconnect();
    source?.removeAttribute('data-env-sd-gradient-source');
    root?.removeAttribute('data-env-sd-gradient-page');
    root = doc.querySelector('#env-sd-page');
    source = root?.querySelector('.hero-wrapper.gradient-blue');
    wantsGradient = !!source;
    if (!source) return;
    // Cached initial HTML can already carry our marker; remove it before measuring.
    source.removeAttribute('data-env-sd-gradient-source');
    // Read the real Webflow styles before hiding the original background.
    const css = win.getComputedStyle(source);
    for (const name of ['backgroundImage', 'backgroundColor', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat', 'backgroundAttachment', 'backgroundBlendMode']) layer.style[name] = css[name];
    root.setAttribute('data-env-sd-gradient-page', '');
    source.setAttribute('data-env-sd-gradient-source', '');
    update();
    if (win.ResizeObserver) { observer = new win.ResizeObserver(schedule); observer.observe(source); }
  }
  const commit = () => { update(); layer.style.opacity = wantsGradient ? '1' : '0'; };
  win.addEventListener('resize', schedule, { passive: true });
  prepare(); commit();
  return {
    prepare, commit,
    refresh() { prepare(); commit(); },
    destroy() {
      observer?.disconnect(); win.cancelAnimationFrame(frame); win.removeEventListener('resize', schedule);
      source?.removeAttribute('data-env-sd-gradient-source'); root?.removeAttribute('data-env-sd-gradient-page');
      style.remove(); layer.remove();
    }
  };
}
