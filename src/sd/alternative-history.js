// History visits skip animation:in; release everything that normally finishes there.
export async function resumePageVisit({ visit, useMask, transition, root, lenis, mount }) {
  const deferReveals = useMask && visit.animation.animate;
  if (!deferReveals) {
    transition.cleanup();
    root?.removeAttribute('data-env-alt-reveal-wait');
    lenis?.start();
  }
  await mount({ deferReveals });
}

// Reset ordinary page links before Webflow registers scroll-driven timelines.
// History and explicit anchors retain their own restoration behavior.
export function syncDestinationScroll(visit, win = window, lenis = win.lenis) {
  const reset = !visit.history.popstate && visit.scroll.reset && !(visit.scroll.target ?? visit.to.hash);
  const top = reset ? 0 : win.scrollY;
  const left = reset ? 0 : win.scrollX;
  if (reset) win.scrollTo({ top, left, behavior: 'instant' });
  lenis?.resize();
  lenis?.scrollTo(top, { immediate: true, force: true });
}
