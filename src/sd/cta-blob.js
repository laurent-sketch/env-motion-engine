export function installCTABlob() {
  window.ENVCTABlob?.destroy();

  const controller = new AbortController();
  const { signal } = controller;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  let section = null;
  let x = 0, y = 0;
  let targetX = 0, targetY = 0;
  let frame = 0;

  function clear() {
    cancelAnimationFrame(frame);
    frame = 0;
    section?.style.removeProperty("--blob-x");
    section?.style.removeProperty("--blob-y");
    section = null;
    x = y = targetX = targetY = 0;
  }

  function tick() {
    frame = 0;

    if (!section?.isConnected) {
      clear();
      return;
    }

    x += (targetX - x) * 0.07;
    y += (targetY - y) * 0.07;

    section.style.setProperty("--blob-x", `${x.toFixed(2)}px`);
    section.style.setProperty("--blob-y", `${y.toFixed(2)}px`);

    if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) {
      frame = requestAnimationFrame(tick);
    }
  }

  function move(nextX, nextY) {
    targetX = nextX;
    targetY = nextY;
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function reset() {
    if (section) move(0, 0);
  }

  document.addEventListener("pointermove", event => {
    if (!fine.matches || reduced.matches || event.pointerType === "touch") {
      clear();
      return;
    }

    const next = event.target instanceof Element
      ? event.target.closest(".section.cta")
      : null;

    if (!next) {
      reset();
      return;
    }

    if (next !== section) {
      clear();
      section = next;
    }

    const rect = section.getBoundingClientRect();

    move(
      ((event.clientX - rect.left) / rect.width - 0.5) *
        Math.min(rect.width * 0.3, 320),
      ((event.clientY - rect.top) / rect.height - 0.5) *
        Math.min(rect.height * 0.12, 60)
    );
  }, { passive: true, signal });

  document.documentElement.addEventListener("pointerleave", reset, { signal });
  window.addEventListener("blur", reset, { signal });
  window.addEventListener("scroll", reset, { passive: true, signal });

  const preferenceChanged = () => {
    if (!fine.matches || reduced.matches) clear();
  };

  fine.addEventListener("change", preferenceChanged, { signal });
  reduced.addEventListener("change", preferenceChanged, { signal });

  window.ENVCTABlob = {
    destroy() {
      controller.abort();
      clear();
    }
  };
}
