// Explicit handover survives publication-specific stylesheet/class replacement.
const active = new Set();
export function beginMenuColors(doc = document, win = window) {
  const entries = [
    ['.navbar-logo-center .nav-link-sd', 'color'],
    ['.navbar-logo-center .dot-link, .navbar-logo-center .line-burger', 'backgroundColor']
  ].flatMap(([selector, property]) => [...doc.querySelectorAll(selector)].map(el => ({
    el, property, before: win.getComputedStyle(el)[property],
    transition: el.style.getPropertyValue('transition'), priority: el.style.getPropertyPriority('transition')
  })));
  active.forEach(animation => animation.cancel()); active.clear();
  entries.forEach(({ el }) => el.style.setProperty('transition', 'none', 'important'));
  return () => {
    const targets = entries.map(entry => ({ ...entry, after: win.getComputedStyle(entry.el)[entry.property] }));
    for (const { el, property, before, after, transition, priority } of targets) {
      if (before !== after && !win.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const animation = el.animate([{ [property]: before }, { [property]: after }], { duration: 400, easing: 'ease', fill: 'both' });
        active.add(animation);
        animation.finished.then(() => { animation.cancel(); active.delete(animation); }).catch(() => active.delete(animation));
      }
      if (transition) el.style.setProperty('transition', transition, priority);
      else el.style.removeProperty('transition');
    }
  };
}
