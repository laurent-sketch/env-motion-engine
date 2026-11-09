// Pause only the outgoing page: menu and transition animations remain independent.
export function freezePageMotion(root, win = window) {
  const browserAnimations = (root.getAnimations?.({ subtree: true }) || [])
    .filter(animation => animation.playState === 'running');
  browserAnimations.forEach(animation => animation.pause());
  const triggers = (win.ScrollTrigger?.getAll() || []).filter(trigger =>
    trigger.enabled !== false && trigger.trigger && root.contains(trigger.trigger));
  const tweens = new Set(win.gsap?.getTweensOf([root, ...root.querySelectorAll('*')]) || []);
  triggers.forEach(trigger => {
    if (trigger.animation) tweens.add(trigger.animation);
    const scrub = trigger.getTween?.();
    if (scrub) tweens.add(scrub);
  });
  const playing = [...tweens].filter(tween => !tween.paused());
  // Read pause states before disabling: ScrollTrigger can pause its scrub tween.
  // Never revert transforms or pin positions when navigation starts.
  triggers.forEach(trigger => trigger.disable(false, false));
  playing.forEach(tween => tween.pause());
  const lenis = win.lenis;
  const resumeScroll = lenis && !lenis.isStopped;
  if (resumeScroll) lenis.stop();
  return () => {
    // A failed/aborted visit restores the same page. Removed pages stay stopped.
    if (!root.isConnected) return;
    const current = win.ScrollTrigger?.getAll() || [];
    triggers.forEach(trigger => { if (current.includes(trigger)) trigger.enable(false, false); });
    playing.forEach(tween => tween.resume());
    browserAnimations.forEach(animation => {
      if (animation.playState === 'paused') animation.play();
    });
    if (resumeScroll) lenis.start();
  };
}

// Temporary visual experiment. Keeps the stable navigation entry unchanged.
export function createAlternativeTransition({ doc = document, win = window } = {}) {
  let overlay, shade, incoming, originalStyle, releaseMotion, animations = [], generation = 0;
  let fixedHeroes = [];
  let restoreMenu = () => {};
  const reduced = () => win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const blockScroll = event => event.preventDefault();
  function cleanup() {
    generation++;
    animations.forEach(animation => animation.cancel()); animations = [];
    overlay?.remove(); overlay = null; shade = null;
    restoreMenu(); restoreMenu = () => {};
    releaseMotion?.(); releaseMotion = null;
    fixedHeroes.forEach(({ element, style }) => {
      if (style === null) element.removeAttribute('style');
      else element.setAttribute('style', style);
    });
    fixedHeroes = [];
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
    const capturedAt = win.performance.now();
    releaseMotion = freezePageMotion(root, win);
    const copy = root.cloneNode(true);
    // Destination sheets, page IDs and native slider reinitialization must not
    // change the outgoing visual. Resolve its styles before sanitizing IDs.
    const originals = [root, ...root.querySelectorAll('*')];
    const copies = [copy, ...copy.querySelectorAll('*')];
    const stickies = [];
    const rows = [];
    const rects = originals.map(element => element.getBoundingClientRect());
    const measured = rects[0].width > 0;
    // The snapshot travels only 12vh: resolve visible pixels plus a generous
    // buffer, not every split character several screens below the viewport.
    const inView = rect => rect.width > 0 && rect.height > 0 && rect.bottom > -win.innerHeight * .25 && rect.top < win.innerHeight * 1.35 && rect.right > -win.innerWidth * .1 && rect.left < win.innerWidth * 1.1;
    const structural = '.main-row, .project-work, .project-row, .project-item.work.left, .project-item.work.right';
    const resolved = new Set([root]);
    originals.forEach((element, index) => {
      if (!measured || inView(rects[index]) || element.matches(structural) || element.parentElement === root || element.parentElement?.matches('main.main-wrapper')) {
        for (let parent = element; parent && root.contains(parent); parent = parent.parentElement) resolved.add(parent);
      }
    });
    copies.forEach((element, index) => {
      const css = win.getComputedStyle(originals[index]);
      // One CSSOM assignment avoids reserializing hundreds of declarations for every property.
      if (resolved.has(originals[index])) {
        const declarations = [];
        for (let i = 0; i < css.length; i++) { const property = css[i]; declarations.push(`${property}:${css.getPropertyValue(property)}`); }
        element.style.cssText = declarations.join(';');
      }
      if (css.position === 'sticky') {
        if (!measured || inView(rects[index])) stickies.push({ element, rect: rects[index] });
        element.style.position = 'relative';
        element.style.inset = 'auto';
      }
      if (originals[index].matches('.main-row, .project-work, .project-row') && (!measured || inView(rects[index]))) {
        rows.push({ element, rect: rects[index] });
      }
      element.style.setProperty('animation', 'none', 'important');
      element.style.setProperty('transition', 'none', 'important');
      element.classList.remove('w-slider', 'w-slide', 'w-slider-mask', 'w-slider-nav', 'w-slider-dot');
      // IX3 footer parallax selects by class even after data-w-id is removed.
      // Styles are already resolved; this inert copy must not match that target.
      element.classList.remove('footer');
      // IX2 resolves these scroll targets globally on restart, including clones.
      // Home grid rows otherwise jump back to blur(10px)/scale(.95) under the mask.
      if (originals[index].matches('.project-row, .project-work, .project-item.work.left, .project-item.work.right')) element.removeAttribute('class');
      // Native IX2 restarts resolve Step triggers by class across the whole
      // document. These inert copies must not become new scale/blur/parallax
      // targets when the destination resets its interaction state.
      element.classList.remove('step-single-item', 'bg-services-wrapper');
      // Isolate class-filtered IX3 service action targets as well as the trigger.
      if (originals[index].closest('[data-services="reveal"]')) element.removeAttribute('class');
    });
    // Freezing auto heights can change descendant margin collapsing. Preserve
    // each top-level section's rendered position, independently of normal flow.
    const sections = originals.map((element, index) => ({ element, copy: copies[index] }))
      .filter(({ element }) => element.parentElement === root || element.parentElement?.matches('main.main-wrapper'))
      .filter(({ element }) => !element.matches('main.main-wrapper'))
      .map(({ element, copy }) => ({ copy, rect: rects[originals.indexOf(element)] }));
    // This is a non-interactive visual snapshot, never a second Webflow runtime.
    copy.querySelectorAll('script').forEach(el => el.remove());
    [copy, ...copy.querySelectorAll('*')].forEach(el => {
      el.removeAttribute('id');
      el.removeAttribute('data-services'); // Native IX3 reveal must target only the live page.
      el.removeAttribute('data-reveal-text');
      for (const attr of [...el.attributes]) if (attr.name.startsWith('data-env-') || attr.name.startsWith('data-w-id')) el.removeAttribute(attr.name);
    });
    // cloneNode copies canvas attributes, but never its painted pixels.
    const painted = root.querySelectorAll('canvas');
    copy.querySelectorAll('canvas').forEach((canvas, index) => {
      const source = painted[index];
      canvas.width = source.width; canvas.height = source.height;
      try { canvas.getContext('2d')?.drawImage(source, 0, 0); } catch (_) { /* Unavailable WebGL buffer. */ }
    });
    const videoRects = new Map(originals.filter(element => element.tagName === 'VIDEO').map(element => [element, rects[originals.indexOf(element)]]));
    const sources = root.querySelectorAll('video');
    copy.querySelectorAll('video').forEach((video, index) => {
      const source = sources[index], canvas = doc.createElement('canvas');
      canvas.style.cssText = video.style.cssText;
      canvas.className = video.className;
      const css = win.getComputedStyle(source);
      for (const property of ['position', 'top', 'left', 'right', 'bottom', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'objectFit', 'objectPosition', 'transform', 'zIndex', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'display', 'boxSizing', 'borderRadius']) canvas.style[property] = css[property];
      // Distant video frames cannot enter the 12vh departure. Keep their box,
      // but never paint their poster/frame into the frozen page: an offscreen
      // auto-sized media element must not become a huge visible replacement.
      if (measured && !inView(videoRects.get(source))) {
        const placeholder = doc.createElement('div');
        placeholder.style.cssText = canvas.style.cssText;
        video.replaceWith(placeholder);
        return;
      }
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
    overlay.append(copy, shade);
    // The persistent navigation sits above the page mask. Move only its open
    // modal's rendered appearance into the outgoing layer before hiding it.
    const menuScroll = [];
    const menu = doc.querySelector('.navbar-logo-center.is-env-menu-open .menu-modal');
    if (menu && win.matchMedia('(max-width: 991px)').matches) {
      const menuCopy = menu.cloneNode(true);
      const sources = [menu, ...menu.querySelectorAll('*')];
      const targets = [menuCopy, ...menuCopy.querySelectorAll('*')];
      sources.forEach((source, index) => {
        const css = win.getComputedStyle(source), target = targets[index];
        if (source.scrollTop || source.scrollLeft) menuScroll.push({ source, target });
        for (let i = 0; i < css.length; i++) { const property = css.item(i); target.style.setProperty(property, css.getPropertyValue(property), 'important'); }
        target.removeAttribute('id'); target.removeAttribute('class');
        for (const attr of [...target.attributes]) if (attr.name.startsWith('data-w-id')) target.removeAttribute(attr.name);
        for (const attr of [...target.attributes]) if (attr.name.startsWith('data-env-')) target.removeAttribute(attr.name);
        target.style.setProperty('animation', 'none', 'important');
        target.style.setProperty('transition', 'none', 'important');
      });
      const rect = menu.getBoundingClientRect();
      for (const [property, value] of Object.entries({ position: 'absolute', top: `${rect.top}px`, left: `${rect.left}px`, right: 'auto', bottom: 'auto', width: `${rect.width}px`, height: `${rect.height}px`, margin: '0', transform: 'none', zIndex: '0', pointerEvents: 'none' })) {
        menuCopy.style.setProperty(property.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`), value, 'important');
      }
      menuCopy.querySelectorAll('script').forEach(element => element.remove());
      menuCopy.dataset.envTransitionMenu = '';
      menuCopy.inert = true; menuCopy.setAttribute('aria-hidden', 'true');
      overlay.insertBefore(menuCopy, shade);
      const visibility = menu.style.getPropertyValue('visibility'), priority = menu.style.getPropertyPriority('visibility');
      menu.style.setProperty('visibility', 'hidden', 'important');
      restoreMenu = () => { if (visibility) menu.style.setProperty('visibility', visibility, priority); else menu.style.removeProperty('visibility'); };
    }
    doc.body.append(overlay);
    menuScroll.forEach(({ source, target }) => { target.scrollTop = source.scrollTop; target.scrollLeft = source.scrollLeft; });
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
    // A resolved width can stop a nested main-row from being centered by its
    // block parent. Section-only corrections miss this inner displacement.
    // Process outer rows first so nested rows do not compensate twice.
    rows.forEach(({ element, rect }) => {
      const captured = element.getBoundingClientRect();
      const x = rect.left - captured.left, y = rect.top - captured.top;
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
    overlay.dataset.envCaptureMs = String(Math.round(win.performance.now() - capturedAt));
    doc.documentElement.setAttribute('data-env-transition-active', '');
    win.addEventListener('wheel', blockScroll, { capture: true, passive: false });
    win.addEventListener('touchmove', blockScroll, { capture: true, passive: false });
  }
  // Give preparation subtle feedback without starting a separate page movement.
  // All spatial movement starts together on the mask clock once content is ready.
  function depart() {
    if (!overlay || reduced() || animations.length) return;
    const options = { duration: 1200, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' };
    animations = [
      shade.animate([{ opacity: 0 }, { opacity: 0.08 }], options)
    ];
  }
  function prepare(root) {
    if (!overlay || reduced() || incoming === root) return;
    incoming = root; originalStyle = root.getAttribute('style');
    // A viewport-fixed About hero can paint outside the incoming page's clip.
    // Keep its rendered box, but make it a clipped page descendant for the mask.
    fixedHeroes = [...root.querySelectorAll('.section.hero-about')]
      .filter(element => win.getComputedStyle(element).position === 'fixed')
      .map(element => ({ element, style: element.getAttribute('style'), rect: element.getBoundingClientRect() }));
    // Contain the first child's top margin inside the mask box. Otherwise an
    // offset root can leave its viewport hero outside the clipping reference.
    Object.assign(root.style, { display: 'flow-root', position: 'relative', zIndex: '9', clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)', backgroundColor: '#fff', willChange: 'clip-path' });
    fixedHeroes.forEach(({ element, rect }) => {
      Object.assign(element.style, { position: 'absolute', top: '0px', left: '0px', right: 'auto', bottom: 'auto', margin: '0px', width: `${rect.width}px`, height: `${rect.height}px` });
      const placed = element.getBoundingClientRect();
      element.style.left = `${rect.left - placed.left}px`;
      element.style.top = `${rect.top - placed.top}px`;
    });
  }
  async function reveal(root) {
    if (!overlay || reduced()) { cleanup(); return; }
    if (!incoming) prepare(root);
    const revision = generation;
    // The mask travels through the viewport, not the full (potentially very tall) page.
    // A first-child margin can put the root below the viewport while its fixed
    // hero is still at y=0. Negative local coordinates must remain valid here.
    const top = -root.getBoundingClientRect().top;
    const height = win.innerHeight;
    const startClip = `polygon(0 ${top + height}px,100% ${top + height}px,100% 100%,0 100%)`;
    const endClip = `polygon(0 ${top}px,100% ${top}px,100% 100%,0 100%)`;
    const options = { duration: 850, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'both' };
    const departureShade = animations.length ? Number(win.getComputedStyle(shade).opacity) : 0;
    animations.forEach(animation => animation.cancel());
    animations = [
      overlay.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-12vh) scale(1.04)' }], options),
      root.animate([{ clipPath: startClip }, { clipPath: endClip }], options),
      shade.animate([{ opacity: departureShade }, { opacity: 0.35 }], options)
    ];
    const startTime = doc.timeline?.currentTime;
    if (startTime != null) animations.forEach(animation => { animation.startTime = startTime; });
    await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    if (revision === generation) cleanup();
  }
  return { capture, depart, prepare, reveal, cleanup };
}
