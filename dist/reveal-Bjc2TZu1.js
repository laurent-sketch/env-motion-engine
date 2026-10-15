function m(o) {
  return { name: "reveal", mount({ root: s, reducedMotion: f, cleanup: a }) {
    if (f || typeof IntersectionObserver > "u") return;
    const c = o.context(() => {
    }, s);
    a(() => c.revert());
    const i = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting && (i.unobserve(t.target), c.add(() => {
          const n = t.target;
          if (n.dataset.envReveal === "fade-scale") {
            const r = o.timeline();
            r.from(n, { scale: 0.99, duration: 0.75, ease: "power3.out" }, 0.2), r.from(n, { opacity: 0, duration: 0.5, ease: "none" }, 0.2);
          } else
            o.from(n, { y: 24, opacity: 0, duration: 0.6, ease: "power2.out" });
        }));
    }, { threshold: 0 });
    a(() => i.disconnect()), s.querySelectorAll("[data-env-reveal]").forEach((e) => {
      const t = e.getAttribute("data-w-id"), r = window.Webflow?.require("ix2"), l = Object.values(r?.store?.getState().ixData?.events ?? {});
      if (t && l.some((u) => [u.target, ...u.targets ?? []].some((v) => v?.id?.split("|").pop() === t))) {
        console.warn("[ENV] Reveal skipped: remove the native interaction before transferring this element", e);
        return;
      }
      const d = e.getBoundingClientRect();
      d.bottom > 0 && d.top < window.innerHeight || i.observe(e);
    });
  } };
}
export {
  m as createReveal
};
//# sourceMappingURL=reveal-Bjc2TZu1.js.map
