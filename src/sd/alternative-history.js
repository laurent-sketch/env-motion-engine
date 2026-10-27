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
