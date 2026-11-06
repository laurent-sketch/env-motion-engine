// Follow rendered positions: About's story parent itself moves with Webflow IX2.
// A cached document scroll range cannot track its moving white-text children.
export function installAboutScroll(root, win = window) {
  const story = root?.querySelector('.about-hero');
  if (!story?.querySelector('.hero-about')) return { destroy() {} };
  const controller = new win.AbortController();
  const style = win.document.createElement('style');
  style.textContent = '[data-env-about-word]{opacity:var(--env-about-opacity,1)!important}' +
    '[data-env-about-mask]{clip-path:inset(var(--env-about-inset,10%))!important}';
  win.document.head.append(style);
  const preference = win.matchMedia('(prefers-reduced-motion: reduce)');
  const texts = [...story.querySelectorAll('[data-reveal-text="trigger"]')]
    .map(trigger => ({ trigger, text: trigger.querySelector('[data-reveal-text="text-white"]'), progress: null, words: [] }))
    .filter(record => record.text);
  const masks = [...root.querySelectorAll('.section.mask')].map(element => ({ element, progress: null }));
  const originals = new Map();
  let frame = 0, disposed = false, previousTime = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function own(element, attribute, property) {
    if (originals.has(element)) return;
    originals.set(element, { attribute, property, attr: element.getAttribute(attribute), value: element.style.getPropertyValue(property), priority: element.style.getPropertyPriority(property) });
    element.setAttribute(attribute, '');
  }
  function release(element) {
    const saved = originals.get(element);
    if (!saved) return;
    const { attribute, property, attr, value, priority } = saved;
    if (attr === null) element.removeAttribute(attribute); else element.setAttribute(attribute, attr);
    if (value) element.style.setProperty(property, value, priority); else element.style.removeProperty(property);
    originals.delete(element);
  }
  function words() {
    texts.forEach(record => {
      const split = [...record.text.querySelectorAll('.gsap_split_word')];
      record.words.filter(word => !(split.length ? split : [record.text]).includes(word)).forEach(release);
      record.words = split.length ? split : [record.text];
      record.words.forEach(word => own(word, 'data-env-about-word', '--env-about-opacity'));
    });
  }
  masks.forEach(({ element }) => own(element, 'data-env-about-mask', '--env-about-inset'));
  words();
  function schedule() {
    if (!disposed && !frame) frame = win.requestAnimationFrame(render);
  }
  function render(time) {
    frame = 0;
    if (disposed || !root.isConnected) return;
    if (win.document.documentElement.hasAttribute('data-env-transition-active') || root.hasAttribute('data-env-alt-reveal-wait')) {
      previousTime = 0;
      return;
    }
    const height = win.innerHeight;
    const alpha = preference.matches || !previousTime ? 1 : 1 - Math.exp(-Math.min(time - previousTime, 64) / 90);
    previousTime = time;
    let moving = false;
    // Read every box before writing: no per-word layout measurements.
    const targets = texts.map(record => {
      const rect = record.trigger.getBoundingClientRect();
      return clamp((height * .65 - rect.top) / Math.max(rect.height, 1));
    });
    const maskTargets = masks.map(({ element }) => clamp((height - element.getBoundingClientRect().top) / (height * .85)));
    function follow(record, target) {
      record.progress = record.progress === null ? target : record.progress + (target - record.progress) * alpha;
      if (Math.abs(target - record.progress) < .001) record.progress = target;
      else moving = true;
      return preference.matches ? 1 : record.progress;
    }
    texts.forEach((record, index) => {
      const progress = follow(record, targets[index]);
      // Match the native 1.8s word fade / .54s stagger, normalized to the range.
      const duration = 1 + .3 * (record.words.length - 1);
      record.words.forEach((word, wordIndex) => {
        const opacity = .1 + .9 * clamp(progress * duration - wordIndex * .3);
        word.style.setProperty('--env-about-opacity', opacity.toFixed(4));
      });
    });
    masks.forEach((record, index) => record.element.style.setProperty('--env-about-inset', `${((1 - follow(record, maskTargets[index])) * 10).toFixed(4)}%`));
    if (moving) schedule();
    else previousTime = 0;
  }
  const observer = new win.MutationObserver(records => {
    if (records.some(record => record.type === 'childList')) words();
    schedule();
  });
  observer.observe(story, { childList: true, subtree: true });
  observer.observe(root, { attributes: true, attributeFilter: ['data-env-alt-reveal-wait'] });
  observer.observe(win.document.documentElement, { attributes: true, attributeFilter: ['data-env-transition-active'] });
  const resize = win.ResizeObserver ? new win.ResizeObserver(schedule) : null;
  root.querySelectorAll('.section').forEach(section => resize?.observe(section));
  win.addEventListener('scroll', schedule, { passive: true, signal: controller.signal });
  win.addEventListener('resize', schedule, { signal: controller.signal });
  win.addEventListener('pageshow', schedule, { signal: controller.signal });
  preference.addEventListener('change', schedule, { signal: controller.signal });
  schedule();
  return { destroy() {
    disposed = true; controller.abort(); observer.disconnect(); resize?.disconnect();
    win.cancelAnimationFrame(frame); style.remove();
    [...originals.keys()].forEach(release);
  } };
}
