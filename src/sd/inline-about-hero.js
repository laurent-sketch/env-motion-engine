// Known hero-release behavior; the page keeps its own inline script.
export function mountInlineHeroRelease() {

  const hero = document.querySelector(".section.hero-about");
  const content = hero?.parentElement.querySelector(
    ":scope > .section.about-second"
  );

  if (!hero || !content) return;

  // The shorter mobile story can remain stuck below the viewport top.
  // Use the following flow section and the real footer as release boundaries too.
  const following = content.nextElementSibling;
  const page = hero.closest('#env-sd-page') || document;
  const footer = page.querySelector('footer, .section.footer');

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
      content.getBoundingClientRect().top <= 0 ||
      (following && following.getBoundingClientRect().top <= 0) ||
      (footer && footer.getBoundingClientRect().top < innerHeight)
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
