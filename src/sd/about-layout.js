// About's SVG headlines have intrinsic heights. Lazy decoding them changes all
// later scroll ranges; transforms must never be used as layout resize signals.
export function installAboutLayout(root, win = window) {
  if (!root?.querySelector('.hero-about')) return { refresh() {}, destroy() {} };
  const controller = new win.AbortController();
  const images = [...root.querySelectorAll('img')];
  const headlines = new Set(root.querySelectorAll('.bloc-big-text > img'));
  let disposed = false, frame = 0, timer = 0, dirty = false;
  let lastScroll = -Infinity;
  const sizes = new WeakMap();

  function flush() {
    frame = 0;
    if (disposed || !root.isConnected || !dirty) return;
    // Never refresh during a frozen outgoing snapshot or midway through a mask.
    if (win.document.documentElement.hasAttribute('data-env-transition-active') ||
        root.hasAttribute('data-env-alt-reveal-wait') || win.performance.now() - lastScroll < 140) {
      timer = win.setTimeout(refresh, 160);
      return;
    }
    dirty = false;
    win.lenis?.resize();
    win.ScrollTrigger?.refresh();
  }
  function refresh() {
    if (disposed) return;
    dirty = true;
    win.clearTimeout(timer);
    if (!frame) frame = win.requestAnimationFrame(flush);
  }
  function loaded(event) {
    const image = event.currentTarget;
    if (headlines.has(image) && image.naturalWidth && image.naturalHeight &&
        !image.hasAttribute('width') && !image.hasAttribute('height')) {
      // Leave intrinsic metadata in place on teardown: it remains valid in a
      // transition capture and prevents the old zero-height layout returning.
      image.setAttribute('width', image.naturalWidth);
      image.setAttribute('height', image.naturalHeight);
    }
    refresh();
  }
  images.forEach(image => {
    image.addEventListener('load', loaded, { signal: controller.signal });
    image.addEventListener('error', refresh, { signal: controller.signal });
    if (headlines.has(image)) image.loading = 'eager';
    if (image.complete && image.naturalWidth) loaded({ currentTarget: image });
  });
  const observer = win.ResizeObserver ? new win.ResizeObserver(entries => {
    let changed = false;
    entries.forEach(({ target, contentRect }) => {
      const next = `${contentRect.width.toFixed(1)}:${contentRect.height.toFixed(1)}`;
      const previous = sizes.get(target);
      sizes.set(target, next);
      if (previous !== undefined && previous !== next) changed = true;
    });
    if (changed) refresh();
  }) : null;
  // Section boxes capture font wrapping/media layout changes, without tracking
  // the Webflow transforms that run on every scroll frame.
  root.querySelectorAll('.section').forEach(section => observer?.observe(section));
  win.addEventListener('scroll', () => {
    lastScroll = win.performance.now();
    if (dirty) { win.clearTimeout(timer); timer = win.setTimeout(refresh, 160); }
  }, { passive: true, signal: controller.signal });
  win.addEventListener('resize', refresh, { signal: controller.signal });
  win.addEventListener('pageshow', refresh, { signal: controller.signal });
  win.document.fonts?.ready.then(refresh);
  refresh();
  return { refresh, destroy() {
    disposed = true;
    controller.abort(); observer?.disconnect();
    win.cancelAnimationFrame(frame); win.clearTimeout(timer);
  } };
}
