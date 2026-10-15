import { c as A } from "./index-9UII6FTU.js";
function x() {
  return document.readyState === "complete" ? Promise.resolve() : new Promise((a) => {
    const s = () => {
      document.removeEventListener("DOMContentLoaded", s), window.removeEventListener("load", s), a();
    };
    document.addEventListener("DOMContentLoaded", s, { once: !0 }), window.addEventListener("load", s, { once: !0 });
  });
}
const L = {
  name: "pilot-faq",
  mount({ root: a, signal: s, cleanup: p }) {
    for (const d of a.querySelectorAll(".faq-bloc")) {
      const c = [...d.querySelectorAll(".faq-item[data-faq]")], l = [...d.querySelectorAll(".img-faq-content[data-faq-content]")], n = ["class", "role", "tabindex", "aria-expanded"], u = [...c, ...l].map((t) => ({
        element: t,
        values: n.map((i) => t.getAttribute(i))
      }));
      p(() => u.forEach(({ element: t, values: i }) => n.forEach((r, w) => {
        const m = i[w];
        m === null ? t.removeAttribute(r) : t.setAttribute(r, m);
      })));
      const f = (t) => {
        c.forEach((i) => {
          const r = i.dataset.faq === t;
          i.classList.toggle("active", r), i.setAttribute("aria-expanded", String(r));
        }), l.forEach((i) => i.classList.toggle("active", i.dataset.faqContent === t));
      };
      for (const t of c)
        t.matches("button, a[href], input, select, textarea") || (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0"), t.addEventListener("keydown", (r) => {
          r.target !== t || !["Enter", " "].includes(r.key) || (r.preventDefault(), f(t.dataset.faq));
        }, { signal: s })), t.addEventListener("click", () => f(t.dataset.faq), { signal: s });
      c.length && f(c[0].dataset.faq);
    }
  }
};
function O(a) {
  return { name: "pilot-testimonials", mount({ root: s, reducedMotion: p, signal: d, cleanup: c }) {
    for (const l of s.querySelectorAll(".testimonial-section")) {
      const n = l.querySelector(".testimonial-swiper"), u = n?.querySelector(".swiper-wrapper"), f = l.querySelector(".max-w-global"), t = l.querySelector(".swiper-button-next"), i = l.querySelector(".swiper-button-prev");
      if (!n || !u || !f || !t || !i)
        throw new Error("[ENV] Incomplete testimonial markup");
      if (n.swiper)
        throw new Error("[ENV] Swiper already initialized: remove the old testimonial script first");
      if (typeof ResizeObserver > "u") throw new Error("[ENV] ResizeObserver required");
      let r, w, m, e, v = !0;
      const h = u.getAttribute("style");
      c(() => {
        v = !1, r !== void 0 && cancelAnimationFrame(r), clearTimeout(w), m?.disconnect(), e && !e.destroyed && e.destroy(!0, !0), h === null ? u.removeAttribute("style") : u.setAttribute("style", h);
      });
      const E = () => Math.max(f.getBoundingClientRect().left - n.getBoundingClientRect().left, 0), b = () => Math.max(n.getBoundingClientRect().right - t.getBoundingClientRect().right, 0), y = (o) => {
        o.snapGrid.length && (o.snapGrid[o.snapGrid.length - 1] = Math.max(o.virtualSize - o.width - Number(o.params.slidesOffsetAfter || 0), 0));
      }, g = (o) => {
        r !== void 0 && cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = void 0, v && o();
        });
      }, S = () => {
        if (!v || !e || e.destroyed) return;
        const o = e.activeIndex, q = e.isEnd;
        e.params.slidesOffsetBefore = E(), e.params.slidesOffsetAfter = b(), e.updateSize(), e.updateSlides(), y(e), e.updateProgress(), e.updateSlidesClasses(), g(() => {
          !e || e.destroyed || (e.slideTo(q ? Math.max(e.slides.length - 1, 0) : o, 0, !1), e.updateProgress(), e.updateSlidesClasses(), e.navigation.update());
        });
      };
      Object.assign(u.style, { margin: "0", width: "100%", maxWidth: "none" }), e = new a(n, {
        direction: "horizontal",
        slidesPerView: "auto",
        slidesPerGroup: 1,
        slidesPerGroupAuto: !1,
        spaceBetween: 16,
        slidesOffsetBefore: E(),
        slidesOffsetAfter: b(),
        speed: p ? 0 : 700,
        grabCursor: !0,
        loop: !1,
        rewind: !1,
        freeMode: !1,
        allowTouchMove: !0,
        simulateTouch: !0,
        navigation: { nextEl: t, prevEl: i },
        on: { init(o) {
          y(o), g(() => {
            o.slideTo(0, 0, !1), o.navigation.update();
          });
        } }
      }), m = new ResizeObserver(() => g(S)), [n, f, l].forEach((o) => m.observe(o)), window.addEventListener("resize", () => {
        clearTimeout(w), w = setTimeout(S, 100);
      }, { signal: d });
    }
  } };
}
async function R(a) {
  if (a.legacyScriptsRemoved !== !0) throw new Error("[ENV] Remove the legacy FAQ and testimonial scripts before migration");
  await x();
  const s = document.querySelector("[data-env-page]");
  if (!s) return;
  const p = [L];
  if (s.querySelector(".testimonial-section")) {
    const d = a.Swiper ?? window.Swiper;
    if (!d) throw new Error("[ENV] Swiper 12 must load before the pilot module");
    p.push(O(d));
  }
  return A({ pages: [], modules: p });
}
export {
  R as createPilotEngine
};
//# sourceMappingURL=pilot.js.map
