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
    copies.forEach((element, index) => {
      const css = win.getComputedStyle(originals[index]);
      for (let i = 0; i < css.length; i++) { const property = css[i]; element.style.setProperty(property, css.getPropertyValue(property)); }
      element.style.setProperty('animation', 'none', 'important');
      element.style.setProperty('transition', 'none', 'important');
      element.classList.remove('w-slider', 'w-slide', 'w-slider-mask', 'w-slider-nav', 'w-slider-dot');
    });
    // This is a non-interactive visual snapshot, never a second Webflow runtime.
    copy.querySelectorAll('script').forEach(el => el.remove());
    [copy, ...copy.querySelectorAll('*')].forEach(el => {
      el.removeAttribute('id');
      for (const attr of [...el.attributes]) if (attr.name.startsWith('data-env-') || attr.name.startsWith('data-w-id')) el.removeAttribute(attr.name);
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
    doc.documentElement.setAttribute('data-env-transition-active', '');
    win.addEventListener('wheel', blockScroll, { capture: true, passive: false });
    win.addEventListener('touchmove', blockScroll, { capture: true, passive: false });
  }
  function prepare(root) {
    if (!overlay || reduced()) return;
    incoming = root; originalStyle = root.getAttribute('style');
    Object.assign(root.style, { position: 'relative', zIndex: '9', clipPath: 'polygon(0% 100%,100% 110%,100% 100%,0% 100%)', backgroundColor: '#fff', willChange: 'clip-path' });
    const gradient = doc.querySelector('#env-sd-gradient');
    if (root.hasAttribute('data-env-sd-gradient-page') && gradient) {
      root.style.backgroundImage = gradient.style.backgroundImage;
      root.style.backgroundSize = `100% ${gradient.style.height}`;
      root.style.backgroundRepeat = 'no-repeat';
    }
  }
  async function reveal(root) {
    if (!overlay || reduced()) { cleanup(); return; }
    if (!incoming) prepare(root);
    const revision = generation;
    // The mask travels through the viewport, not the full (potentially very tall) page.
    const top = Math.max(0, -root.getBoundingClientRect().top);
    const height = win.innerHeight;
    const startClip = `polygon(0 ${top + height}px,100% ${top + height * 1.1}px,100% 100%,0 100%)`;
    const endClip = `polygon(0 ${top}px,100% ${top}px,100% 100%,0 100%)`;
    const options = { duration: 850, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'both' };
    animations = [
      overlay.animate([{ transform: 'translateY(0) rotate(0) scale(1)' }, { transform: 'translateY(-12vh) rotate(-1.2deg) scale(1.04)' }], options),
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
