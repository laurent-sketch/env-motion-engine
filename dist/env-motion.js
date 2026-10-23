import { F as S } from "./Swup.modern-Bls6az6f.js";
class k {
  controller = new AbortController();
  disposers = [];
  constructor(l, o, m) {
    try {
      for (const s of o) {
        const h = s.mount({ root: l, signal: this.controller.signal, reducedMotion: m, cleanup: (b) => this.disposers.push(b) });
        h && this.disposers.push(h);
      }
    } catch (s) {
      throw this.destroy(), s;
    }
  }
  destroy() {
    this.controller.abort();
    for (const l of this.disposers.splice(0).reverse())
      try {
        l();
      } catch (o) {
        console.error("[ENV] cleanup", o);
      }
  }
}
async function x(t = {}) {
  const l = t.container ?? "[data-env-page]", o = () => document.querySelector(l);
  if (!o()) throw new Error(`[ENV] Missing container ${l}`);
  const m = t.gsap ?? (await import("./index-CPGkGNo2.js")).gsap, s = [...t.modules ?? []], h = o();
  (document.documentElement.hasAttribute("data-env-reveal") || h.querySelector("[data-env-reveal]")) && s.push((await import("./reveal-Bjc2TZu1.js")).createReveal(m)), (document.documentElement.hasAttribute("data-env-micro") || h.querySelector("[data-env-hover]")) && s.push((await import("./micro-B9Y5l6bO.js")).micro), document.documentElement.hasAttribute("data-env-faq") && s.push((await import("./faq-Cip6y42V.js")).faq);
  let f, d, g;
  const p = matchMedia("(prefers-reduced-motion: reduce)");
  let u = !1;
  const v = t.transitionOffset ?? 8, w = () => {
    f?.destroy(), f = new k(o(), s, p.matches);
  };
  w();
  const A = new Set(t.pages ?? []), n = A.has(location.pathname) ? new S({ containers: [l], animationSelector: !1, linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])", ignoreVisit: (e, { el: a } = {}) => {
    const c = new URL(e, location.href);
    return c.origin !== location.origin || !A.has(c.pathname) || !!a?.closest("[data-no-swup]");
  } }) : void 0, i = () => {
    const e = g;
    g = void 0, d?.progress(1), d?.kill(), d = void 0, e && (e.style === null ? e.element.removeAttribute("style") : e.element.setAttribute("style", e.style));
  };
  n?.hooks.replace("animation:out:await", async () => {
    const e = o();
    g = { element: e, style: e.getAttribute("style") }, p.matches || (d = m.to(e, { opacity: 0, y: -v, duration: 0.18 }), await d);
  }), n?.hooks.replace("content:replace", async (e, a, c) => {
    const r = e.to.document;
    if (!r || !c) throw new Error("[ENV] Missing incoming document/replacement handler");
    try {
      await t.adapter?.prepare(r, e.to.url);
    } catch (y) {
      throw i(), console.info("[ENV] Native navigation fallback", y), y;
    }
    u || e.done || (f?.destroy(), f = void 0, i(), await t.adapter?.leave(), !(u || e.done) && (await c(e, a), await t.adapter?.enter(r, e.to.url), !u && !e.done && w()));
  }), n?.hooks.on("page:view", () => {
    document.querySelectorAll("a[href]").forEach((r) => {
      if (r.getAttribute("href")?.includes("#")) return;
      const y = r.origin === location.origin && r.pathname === location.pathname;
      r.classList.toggle("w--current", y), y ? r.setAttribute("aria-current", "page") : r.removeAttribute("aria-current");
    });
    const e = o(), a = e.matches("body, [data-env-shell]") ? e.querySelector("main") ?? e : e, c = a.getAttribute("tabindex");
    a.setAttribute("tabindex", "-1"), a.focus({ preventScroll: !0 }), c === null ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", c);
  }), n?.hooks.replace("animation:in:await", async () => {
    const e = o();
    g = { element: e, style: e.getAttribute("style") }, p.matches || (d = m.fromTo(e, { opacity: 0, y: v }, { opacity: 1, y: 0, duration: 0.25 }), await d, i());
  }), n?.hooks.on("fetch:error", () => i()), n?.hooks.on("visit:abort", () => i()), n?.hooks.on("visit:fail", () => i());
  const E = () => {
    u || (i(), w());
  };
  return p.addEventListener("change", E), { swup: n, destroy() {
    u || (u = !0, n?.destroy(), i(), f?.destroy(), t.adapter?.destroy?.(), p.removeEventListener("change", E));
  } };
}
export {
  k as PageScope,
  x as createEngine
};
//# sourceMappingURL=env-motion.js.map
