// Temporary visual experiment. Keeps the stable navigation entry unchanged.
export function createAlternativeTransition({ doc = document, win = window } = {}) {
  let overlay, shade, incoming, originalStyle, animations = [], generation = 0;
  const reduced = () => win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const blockScroll = event => event.preventDefault();
  function cleanup() {
    generation++;
    animations.forEach(animation => animation.cancel()); animations = [];
    overlay?.remove(); overlay = null; shade = null;
    if (incoming) {
      if (originalStyle === null) incoming.removeAttribute('style');
      else incoming.setAttribute('style', originalStyle);
      incoming = null;
    }
    win.removeEventListener('wheel', blockScroll, true);
    win.removeEventListener('touchmove', blockScroll, true);
    doc.documentElement.removeAttribute('data-env-transition-active');
  }
  function capture() {
    cleanup();
    const root = doc.querySelector('#env-sd-page');
    if (!root || reduced()) return;
    const copy = root.cloneNode(true);
    // Destination sheets, page IDs and native slider reinitialization must not
    // change the outgoing visual. Resolve its styles before sanitizing IDs.
    const originals = [root, ...root.querySelectorAll('*')];
    const copies = [copy, ...copy.querySelectorAll('*')];
    const stickies = [];
    copies.forEach((element, index) => {
      const css = win.getComputedStyle(originals[index]);
      for (let i = 0; i < css.length; i++) { const property = css[i]; element.style.setProperty(property, css.getPropertyValue(property)); }
      if (css.position === 'sticky') {
        stickies.push({ element, rect: originals[index].getBoundingClientRect() });
        element.style.position = 'relative';
        element.style.inset = 'auto';
      }
      element.style.setProperty('animation', 'none', 'important');
      element.style.setProperty('transition', 'none', 'important');
      element.classList.remove('w-slider', 'w-slide', 'w-slider-mask', 'w-slider-nav', 'w-slider-dot');
      // IX3 footer parallax selects by class even after data-w-id is removed.
      // Styles are already resolved; this inert copy must not match that target.
      element.classList.remove('footer');
      // IX2 Work parallax resolves its left/right card targets globally.
      if (originals[index].matches('.project-item.work.left, .project-item.work.right')) element.removeAttribute('class');
      // Isolate class-filtered IX3 service action targets as well as the trigger.
      if (originals[index].closest('[data-services="reveal"]')) element.removeAttribute('class');
    });
    // Freezing auto heights can change descendant margin collapsing. Preserve
    // each top-level section's rendered position, independently of normal flow.
    const sections = originals.map((element, index) => ({ element, copy: copies[index] }))
      .filter(({ element }) => element.parentElement === root || element.parentElement?.matches('main.main-wrapper'))
      .filter(({ element }) => !element.matches('main.main-wrapper'))
      .map(({ element, copy }) => ({ copy, rect: element.getBoundingClientRect() }));
    // This is a non-interactive visual snapshot, never a second Webflow runtime.
    copy.querySelectorAll('script').forEach(el => el.remove());
    [copy, ...copy.querySelectorAll('*')].forEach(el => {
      el.removeAttribute('id');
      el.removeAttribute('data-services'); // Native IX3 reveal must target only the live page.
      for (const attr of [...el.attributes]) if (attr.name.startsWith('data-env-') || attr.name.startsWith('data-w-id')) el.removeAttribute(attr.name);
    });
    // cloneNode copies canvas attributes, but never its painted pixels.
    const painted = root.querySelectorAll('canvas');
    copy.querySelectorAll('canvas').forEach((canvas, index) => {
      const source = painted[index];
      canvas.width = source.width; canvas.height = source.height;
      try { canvas.getContext('2d')?.drawImage(source, 0, 0); } catch (_) { /* Unavailable WebGL buffer. */ }
    });
    const sources = root.querySelectorAll('video');
    copy.querySelectorAll('video').forEach((video, index) => {
      const source = sources[index], canvas = doc.createElement('canvas');
      canvas.style.cssText = video.style.cssText;
      canvas.className = video.className;
      const css = win.getComputedStyle(source);
      for (const property of ['position', 'top', 'left', 'right', 'bottom', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'objectFit', 'objectPosition', 'transform', 'zIndex', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'display', 'boxSizing', 'borderRadius']) canvas.style[property] = css[property];
      canvas.width = source.videoWidth || 320; canvas.height = source.videoHeight || 180;
      try {
        if (source.readyState < 2) throw Error('Video frame unavailable');
        canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
        video.replaceWith(canvas);
      } catch (_) {
        const poster = source.poster || source.closest('.w-background-video')?.getAttribute('data-poster-url');
        if (poster) { const img = doc.createElement('img'); img.src = poster; img.style.cssText = canvas.style.cssText; img.className = video.className; video.replaceWith(img); }
        else video.remove();
      }
    });
    copy.style.cssText = `position:absolute;left:0;top:${-win.scrollY}px;width:100%;margin:0;background:#fff;pointer-events:none;z-index:0;`;
    overlay = doc.createElement('div');
    overlay.dataset.envTransitionSnapshot = ''; overlay.dataset.envIgnore = '';
    overlay.setAttribute('aria-hidden', 'true'); overlay.inert = true;
    overlay.style.cssText = 'position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:8;background:#fff;transform-origin:50% 50%;';
    shade = doc.createElement('div');
    shade.dataset.envTransitionShade = '';
    shade.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:1;';
    overlay.append(copy, shade); doc.body.append(overlay);
    // Read before writing to avoid layout work for each individual section.
    const corrections = sections.map(({ copy: element, rect }) => {
      const captured = element.getBoundingClientRect();
      return { element, x: rect.left - captured.left, y: rect.top - captured.top };
    });
    corrections.forEach(({ element, x, y }) => {
      if (Math.abs(x) < .1 && Math.abs(y) < .1) return;
      const transform = element.style.transform;
      element.style.transform = `translate(${x}px,${y}px) ${transform === 'none' ? '' : transform}`;
    });
    // After parent sections are aligned, freeze nested sticky boxes at their
    // actual viewport position. They must no longer react to destination scroll.
    stickies.forEach(({ element, rect }) => {
      const captured = element.getBoundingClientRect();
      const x = rect.left - captured.left, y = rect.top - captured.top;
      if (Math.abs(x) < .1 && Math.abs(y) < .1) return;
      const transform = element.style.transform;
      element.style.transform = `translate(${x}px,${y}px) ${transform === 'none' ? '' : transform}`;
    });
    doc.documentElement.setAttribute('data-env-transition-active', '');
    win.addEventListener('wheel', blockScroll, { capture: true, passive: false });
    win.addEventListener('touchmove', blockScroll, { capture: true, passive: false });
  }
  function prepare(root) {
    if (!overlay || reduced()) return;
    incoming = root; originalStyle = root.getAttribute('style');
    Object.assign(root.style, { position: 'relative', zIndex: '9', clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)', backgroundColor: '#fff', willChange: 'clip-path' });

  }
  async function reveal(root) {
    if (!overlay || reduced()) { cleanup(); return; }
    if (!incoming) prepare(root);
    const revision = generation;
    // The mask travels through the viewport, not the full (potentially very tall) page.
    const top = Math.max(0, -root.getBoundingClientRect().top);
    const height = win.innerHeight;
    const startClip = `polygon(0 ${top + height}px,100% ${top + height}px,100% 100%,0 100%)`;
    const endClip = `polygon(0 ${top}px,100% ${top}px,100% 100%,0 100%)`;
    const options = { duration: 850, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'both' };
    animations = [
      overlay.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-12vh) scale(1.04)' }], options),
      root.animate([{ clipPath: startClip }, { clipPath: endClip }], options),
      shade.animate([{ opacity: 0 }, { opacity: 0.35 }], options)
    ];
    const startTime = doc.timeline?.currentTime;
    if (startTime != null) animations.forEach(animation => { animation.startTime = startTime; });
    await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    if (revision === generation) cleanup();
  }
  return { capture, prepare, reveal, cleanup };
}
