import { c as A } from "./index-9UII6FTU.js";
const x = {
  name: "pilot-faq",
  mount({ root: f, signal: l, cleanup: p }) {
    for (const a of f.querySelectorAll(".faq-bloc")) {
      const d = [...a.querySelectorAll(".faq-item[data-faq]")], n = [...a.querySelectorAll(".img-faq-content[data-faq-content]")], s = ["class", "role", "tabindex", "aria-expanded"], c = [...d, ...n].map((t) => ({
        element: t,
        values: s.map((o) => t.getAttribute(o))
      }));
      p(() => c.forEach(({ element: t, values: o }) => s.forEach((r, g) => {
        const m = o[g];
        m === null ? t.removeAttribute(r) : t.setAttribute(r, m);
      })));
      const u = (t) => {
        d.forEach((o) => {
          const r = o.dataset.faq === t;
          o.classList.toggle("active", r), o.setAttribute("aria-expanded", String(r));
        }), n.forEach((o) => o.classList.toggle("active", o.dataset.faqContent === t));
      };
      for (const t of d)
        t.matches("button, a[href], input, select, textarea") || (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0"), t.addEventListener("keydown", (r) => {
          r.target !== t || !["Enter", " "].includes(r.key) || (r.preventDefault(), u(t.dataset.faq));
        }, { signal: l })), t.addEventListener("click", () => u(t.dataset.faq), { signal: l });
      d.length && u(d[0].dataset.faq);
    }
  }
};
function O(f) {
  return { name: "pilot-testimonials", mount({ root: l, reducedMotion: p, signal: a, cleanup: d }) {
    for (const n of l.querySelectorAll(".testimonial-section")) {
      const s = n.querySelector(".testimonial-swiper"), c = s?.querySelector(".swiper-wrapper"), u = n.querySelector(".max-w-global"), t = n.querySelector(".swiper-button-next"), o = n.querySelector(".swiper-button-prev");
      if (!s || !c || !u || !t || !o)
        throw new Error("[ENV] Incomplete testimonial markup");
      if (s.swiper)
        throw new Error("[ENV] Swiper already initialized: remove the old testimonial script first");
      if (typeof ResizeObserver > "u") throw new Error("[ENV] ResizeObserver required");
      let r, g, m, e, w = !0;
      const h = c.getAttribute("style");
      d(() => {
        w = !1, r !== void 0 && cancelAnimationFrame(r), clearTimeout(g), m?.disconnect(), e && !e.destroyed && e.destroy(!0, !0), h === null ? c.removeAttribute("style") : c.setAttribute("style", h);
      });
      const b = () => Math.max(u.getBoundingClientRect().left - s.getBoundingClientRect().left, 0), y = () => Math.max(s.getBoundingClientRect().right - t.getBoundingClientRect().right, 0), E = (i) => {
        i.snapGrid.length && (i.snapGrid[i.snapGrid.length - 1] = Math.max(i.virtualSize - i.width - Number(i.params.slidesOffsetAfter || 0), 0));
      }, v = (i) => {
        r !== void 0 && cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = void 0, w && i();
        });
      }, q = () => {
        if (!w || !e || e.destroyed) return;
        const i = e.activeIndex, S = e.isEnd;
        e.params.slidesOffsetBefore = b(), e.params.slidesOffsetAfter = y(), e.updateSize(), e.updateSlides(), E(e), e.updateProgress(), e.updateSlidesClasses(), v(() => {
          !e || e.destroyed || (e.slideTo(S ? Math.max(e.slides.length - 1, 0) : i, 0, !1), e.updateProgress(), e.updateSlidesClasses(), e.navigation.update());
        });
      };
      Object.assign(c.style, { margin: "0", width: "100%", maxWidth: "none" }), e = new f(s, {
        direction: "horizontal",
        slidesPerView: "auto",
        slidesPerGroup: 1,
        slidesPerGroupAuto: !1,
        spaceBetween: 16,
        slidesOffsetBefore: b(),
        slidesOffsetAfter: y(),
        speed: p ? 0 : 700,
        grabCursor: !0,
        loop: !1,
        rewind: !1,
        freeMode: !1,
        allowTouchMove: !0,
        simulateTouch: !0,
        navigation: { nextEl: t, prevEl: o },
        on: { init(i) {
          E(i), v(() => {
            i.slideTo(0, 0, !1), i.navigation.update();
          });
        } }
      }), m = new ResizeObserver(() => v(q)), [s, u, n].forEach((i) => m.observe(i)), window.addEventListener("resize", () => {
        clearTimeout(g), g = setTimeout(q, 100);
      }, { signal: a });
    }
  } };
}
async function R(f) {
  if (f.legacyScriptsRemoved !== !0) throw new Error("[ENV] Remove the legacy FAQ and testimonial scripts before migration");
  document.readyState === "loading" && await new Promise((a) => {
    document.addEventListener("DOMContentLoaded", () => a(), { once: !0 });
  });
  const l = document.querySelector("[data-env-page]");
  if (!l) return;
  const p = [x];
  if (l.querySelector(".testimonial-section")) {
    const a = f.Swiper ?? window.Swiper;
    if (!a) throw new Error("[ENV] Swiper 12 must load before the pilot module");
    p.push(O(a));
  }
  return A({ pages: [], modules: p });
}
export {
  R as createPilotEngine
};
//# sourceMappingURL=pilot.js.map
