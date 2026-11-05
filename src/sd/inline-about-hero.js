// Known hero-release behavior; the page keeps its own inline script.
export function mountInlineHeroRelease() {

  const hero = document.querySelector(".section.hero-about");
  const content = hero?.parentElement.querySelector(
    ":scope > .section.about-second"
  );

  if (!hero || !content) return;

  hero.__envReleaseCleanup?.();

  const controller = new AbortController();
  let frame = null;

  function destroy() {
    controller.abort();
    if (frame !== null) cancelAnimationFrame(frame);
    hero.removeAttribute("data-env-hero-released");
    delete hero.__envReleaseCleanup;
  }

  function update() {
    frame = null;

    if (!hero.isConnected) return destroy();

    hero.toggleAttribute(
      "data-env-hero-released",
      content.getBoundingClientRect().top <= 0
    );
  }

  function schedule() {
    if (frame === null) frame = requestAnimationFrame(update);
  }

  hero.__envReleaseCleanup = destroy;

  addEventListener("scroll", schedule, {
    passive: true,
    signal: controller.signal
  });

  addEventListener("resize", schedule, {
    signal: controller.signal
  });

  addEventListener("pageshow", schedule, {
    signal: controller.signal
  });

  update();

}
