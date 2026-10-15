import a from "./index-CPGkGNo2.js";
const v = { name: "reveal", mount({ root: o, reducedMotion: c, cleanup: n }) {
  if (c) return;
  const s = a.context(() => {
  }, o);
  n(() => s.revert());
  const e = new IntersectionObserver((r) => {
    for (const t of r) t.isIntersecting && (s.add(() => {
      a.from(t.target, { y: 24, opacity: 0, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity" });
    }), e.unobserve(t.target));
  }, { threshold: 0.12 });
  n(() => e.disconnect()), o.querySelectorAll("[data-env-reveal]").forEach((r) => e.observe(r));
} };
export {
  v as reveal
};
//# sourceMappingURL=reveal-CMooUES2.js.map
