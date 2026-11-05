// Compiled lifecycle adapter for the audited page-inline About scripts.
export function mountInlineAbout(groups, responsive = true) {

  const root =
    document.querySelector(".section-animation-about") ||
    document.querySelector(".section.hero-about")?.parentElement;

  if (!root) return;

  const lines = [...root.querySelectorAll(".bloc-big-text > img")];
  if (!lines.length) return;

  window.ENVAboutPageTest?.destroy();
  window.ENVAboutReveals?.destroy();

  /* TEXTES 1 À 4 */
  const firstGroup = groups.firstGroup;

  /* TEXTES 5 ET 6 — réglages indépendants */
  const secondGroup = groups.secondGroup;

  const originalIgnore = new Map(
    lines.map(line => [line, line.getAttribute("data-env-ignore")])
  );

  lines.forEach(line => {
    line.setAttribute("data-env-ignore", "");
  });

  let disposed = false;
  let media;
  let refreshFrame;

  const followers = new Set();

  function destroy() {
    if (disposed) return;
    disposed = true;

    cancelAnimationFrame(refreshFrame);
    followers.forEach(tween => tween.kill());
    followers.clear();
    media?.revert();

    lines.forEach(line => {
      line.removeEventListener("load", refresh);

      const previous = originalIgnore.get(line);
      if (previous === null) line.removeAttribute("data-env-ignore");
      else line.setAttribute("data-env-ignore", previous);
    });
  }

  function refresh() {
    if (disposed || refreshFrame) return;

    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;

      if (!disposed && root.isConnected) {
        ScrollTrigger.refresh();
      }
    });
  }

  window.ENVAboutPageTest = { destroy };

  window.Webflow = window.Webflow || [];
  window.Webflow.push(() => {
    if (disposed || !window.gsap || !window.ScrollTrigger) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    media = gsap.matchMedia();
    media.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)"
    }, context => {
      const isMobile = responsive && context.conditions.mobile;

      gsap.context(() => {
      gsap.set(root, { overflowX: "clip" });

      lines.forEach((line, index) => {
        const settings = index < 4 ? firstGroup : secondGroup;
        const direction = index % 2 === 0 ? -1 : 1;
        const state = { progress: 0 };

        let follower;

        const animation = gsap.fromTo(line,
          isMobile ? {
            opacity: 0.1
          } : {
            x: () => direction * Math.min(innerWidth * (innerWidth <= 767 ? settings.distanceMobile : settings.distance), 720),
            opacity: 0,
            filter: `blur(${settings.blur}px)`
          },
          isMobile ? {
            opacity: 1,
            duration: 1,
            ease: "none",
            paused: true
          } : {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "none",
            paused: true
          }
        );

        function follow(trigger, immediate = false) {
          if (follower) {
            follower.kill();
            followers.delete(follower);
          }

          if (immediate) {
            state.progress = trigger.progress;
            animation.progress(state.progress);
            return;
          }

          const scrollingDown = trigger.direction >= 0;

          follower = gsap.to(state, {
            progress: trigger.progress,
            duration: scrollingDown
              ? settings.downDuration
              : settings.upDuration,
            ease: scrollingDown
              ? settings.downEase
              : settings.upEase,
            onUpdate: () => animation.progress(state.progress),
            onComplete: () => followers.delete(follower)
          });

          followers.add(follower);
        }

        ScrollTrigger.create({
          trigger: line,
          start: settings.start,
          end: settings.end,
          invalidateOnRefresh: true,
          onUpdate: trigger => follow(trigger),
          onRefresh: trigger => {
            animation.invalidate();
            follow(trigger, true);
          }
        });
      });
      }, root);

      // Cancel direction-following tweens when switching breakpoints.
      // matchMedia restores the previous transforms/blur automatically.
      return () => {
        followers.forEach(tween => tween.kill());
        followers.clear();
      };
    });

    lines.forEach(line => {
      if (!line.complete) {
        line.addEventListener("load", refresh, { once: true });
      }
    });

    document.fonts?.ready.then(refresh);
    refresh();

  });

}
