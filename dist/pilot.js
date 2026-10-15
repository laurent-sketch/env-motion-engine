import { createEngine as h } from "./env-motion.js";
function x() {
  return document.readyState === "complete" ? Promise.resolve() : new Promise((d) => {
    const n = () => {
      document.removeEventListener("DOMContentLoaded", n), window.removeEventListener("load", n), d();
    };
    document.addEventListener("DOMContentLoaded", n, { once: !0 }), window.addEventListener("load", n, { once: !0 });
  });
}
const P = {
  name: "pilot-faq",
  mount({ root: d, signal: n, cleanup: m }) {
    for (const u of d.querySelectorAll(".faq-bloc")) {
      const s = [...u.querySelectorAll(".faq-item[data-faq]")], l = [...u.querySelectorAll(".img-faq-content[data-faq-content]")], a = ["class", "role", "tabindex", "aria-expanded"], c = [...s, ...l].map((e) => ({
        element: e,
        values: a.map((i) => e.getAttribute(i))
      }));
      m(() => c.forEach(({ element: e, values: i }) => a.forEach((r, p) => {
        const w = i[p];
        w === null ? e.removeAttribute(r) : e.setAttribute(r, w);
      })));
      const f = (e) => {
        s.forEach((i) => {
          const r = i.dataset.faq === e;
          i.classList.toggle("active", r), i.setAttribute("aria-expanded", String(r));
        }), l.forEach((i) => i.classList.toggle("active", i.dataset.faqContent === e));
      };
      for (const e of s)
        e.matches("button, a[href], input, select, textarea") || (e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.addEventListener("keydown", (r) => {
          r.target !== e || !["Enter", " "].includes(r.key) || (r.preventDefault(), f(e.dataset.faq));
        }, { signal: n })), e.addEventListener("click", () => f(e.dataset.faq), { signal: n });
      s.length && f(s[0].dataset.faq);
    }
  }
};
function L(d) {
  return { name: "pilot-testimonials", mount({ root: n, reducedMotion: m, signal: u, cleanup: s }) {
    for (const l of n.querySelectorAll(".testimonial-section")) {
      const a = l.querySelector(".testimonial-swiper"), c = a?.querySelector(".swiper-wrapper"), f = l.querySelector(".max-w-global"), e = l.querySelector(".swiper-button-next"), i = l.querySelector(".swiper-button-prev");
      if (!a || !c || !f || !e || !i)
        throw new Error("[ENV] Incomplete testimonial markup");
      if (a.swiper)
        throw new Error("[ENV] Swiper already initialized: remove the old testimonial script first");
      if (typeof ResizeObserver > "u") throw new Error("[ENV] ResizeObserver required");
      let r, p, w, t, g = !0;
      const b = c.getAttribute("style");
      s(() => {
        g = !1, r !== void 0 && cancelAnimationFrame(r), clearTimeout(p), w?.disconnect(), t && !t.destroyed && t.destroy(!0, !0), b === null ? c.removeAttribute("style") : c.setAttribute("style", b);
      });
      const E = () => Math.max(f.getBoundingClientRect().left - a.getBoundingClientRect().left, 0), y = () => Math.max(a.getBoundingClientRect().right - e.getBoundingClientRect().right, 0), S = (o) => {
        o.snapGrid.length && (o.snapGrid[o.snapGrid.length - 1] = Math.max(o.virtualSize - o.width - Number(o.params.slidesOffsetAfter || 0), 0));
      }, v = (o) => {
        r !== void 0 && cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = void 0, g && o();
        });
      }, q = () => {
        if (!g || !t || t.destroyed) return;
        const o = t.activeIndex, A = t.isEnd;
        t.params.slidesOffsetBefore = E(), t.params.slidesOffsetAfter = y(), t.updateSize(), t.updateSlides(), S(t), t.updateProgress(), t.updateSlidesClasses(), v(() => {
          !t || t.destroyed || (t.slideTo(A ? Math.max(t.slides.length - 1, 0) : o, 0, !1), t.updateProgress(), t.updateSlidesClasses(), t.navigation.update());
        });
      };
      Object.assign(c.style, { margin: "0", width: "100%", maxWidth: "none" }), t = new d(a, {
        direction: "horizontal",
        slidesPerView: "auto",
        slidesPerGroup: 1,
        slidesPerGroupAuto: !1,
        spaceBetween: 16,
        slidesOffsetBefore: E(),
        slidesOffsetAfter: y(),
        speed: m ? 0 : 700,
        grabCursor: !0,
        loop: !1,
        rewind: !1,
        freeMode: !1,
        allowTouchMove: !0,
        simulateTouch: !0,
        navigation: { nextEl: e, prevEl: i },
        on: { init(o) {
          S(o), v(() => {
            o.slideTo(0, 0, !1), o.navigation.update();
          });
        } }
      }), w = new ResizeObserver(() => v(q)), [a, f, l].forEach((o) => w.observe(o)), window.addEventListener("resize", () => {
        clearTimeout(p), p = setTimeout(q, 100);
      }, { signal: u });
    }
  } };
}
async function C(d) {
  if (d.legacyScriptsRemoved !== !0) throw new Error("[ENV] Remove the legacy FAQ and testimonial scripts before migration");
  await x();
  const n = document.querySelector("[data-env-page]");
  if (!n) return;
  const m = window.gsap, u = [P];
  if (n.querySelector(".testimonial-section")) {
    const s = d.Swiper ?? window.Swiper;
    if (!s) throw new Error("[ENV] Swiper 12 must load before the pilot module");
    u.push(L(s));
  }
  if (d.navigation && ["/", "/about"].includes(location.pathname)) {
    const { createWebflowNavigation: s, certifiedPaths: l } = await import("./navigation-rfmZzrDj.js"), a = window.Webflow;
    if (!a?.require) throw Error("[ENV] Webflow runtime not ready");
    let c;
    try {
      c = await s(a, location.pathname);
    } catch (p) {
      return console.warn("[ENV] Navigation guard: using native navigation", p), h({ pages: [], modules: u, gsap: m });
    }
    const { default: f } = await import("./index.modern-BbQw0Nll.js"), i = a.require("spline")?.createInstance ? l : l.filter((p) => p !== "/"), r = await h({ container: "[data-env-shell]", pages: i, modules: u, gsap: m, adapter: c, transitionOffset: 0 });
    return r.swup?.use(new f({ animateScroll: { betweenPages: !1, samePageWithHash: !1, samePage: !1 } })), r;
  }
  return h({ pages: [], modules: u, gsap: m });
}
export {
  C as createPilotEngine
};
//# sourceMappingURL=pilot.js.map
