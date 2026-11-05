function Qe() {
  window.ENVOrganicBlob?.destroy();
  const t = new AbortController(), e = t.signal, n = matchMedia("(prefers-reduced-motion: reduce)"), a = matchMedia("(hover: hover) and (pointer: fine)"), o = [];
  document.querySelectorAll('#env-sd-page [data-env-blob="orange"]').forEach((i) => {
    if (i.closest("[data-env-transition-snapshot]")) return;
    const s = document.createElement("div");
    s.className = "env-blob-background", s.setAttribute("aria-hidden", "true"), s.style.cssText = "position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit";
    const r = document.createElement("canvas");
    r.style.cssText = "display:block;width:100%;height:100%;filter:blur(32px)";
    const d = r.getContext("2d");
    if (!d) return;
    s.append(r), i.prepend(s);
    let c = 1, f = 1, p = 0, b = 0, y = 0, v = !1, m = !1, T = 0, l = 0, E = 0, O = 0, I = 0, N = 0;
    function _() {
      d.clearRect(0, 0, c, f);
      const L = n.matches ? 0 : y, R = Math.min(c * 0.38, 500) * 2.1 * 1.35, x = Math.min(f * 0.49, 350) * 2.1 * 0.78, B = c * 0.23 + E + Math.sin(L * 0.29) * c * 0.13, z = f * 0.98 + O + Math.cos(L * 0.23) * f * 0.075, j = [];
      for (let U = 0; U < 10; U++) {
        const k = U / 10 * Math.PI * 2, V = 1 + 0.55 * (0.2 * Math.sin(k * 3 + L * 0.33) + 0.13 * Math.cos(k * 2 - L * 0.25) + 0.07 * Math.sin(k * 5 + L * 0.17));
        j.push({ x: B + Math.cos(k) * R * V, y: z + Math.sin(k) * x * V });
      }
      d.beginPath(), j.forEach((U, k) => {
        const V = j[(k + 9) % 10], $ = j[(k + 1) % 10];
        k || d.moveTo((V.x + U.x) / 2, (V.y + U.y) / 2), d.quadraticCurveTo(U.x, U.y, (U.x + $.x) / 2, (U.y + $.y) / 2);
      }), d.closePath(), d.save(), d.translate(B, z), d.scale(R / x, 1);
      const W = d.createRadialGradient(-x * 0.12, -x * 0.2, 0, 0, 0, x * 0.94);
      [[0, 0.5], [0.28, 0.36], [0.6, 0.15], [0.82, 0.035], [1, 0]].forEach(([U, k]) => W.addColorStop(U, `rgba(238,69,43,${k})`)), d.fillStyle = W, d.fill(), d.restore();
    }
    function S() {
      if (!m || n.matches || !a.matches) {
        I = N = 0;
        return;
      }
      const L = i.getBoundingClientRect();
      I = ((T - L.left) / c - 0.5) * Math.min(c * 0.65, 760) * 0.7, N = ((l - L.top) / f - 0.5) * Math.min(f * 0.28, 180) * 0.7;
    }
    function g(L) {
      if (p = 0, !v || document.hidden) return;
      const R = Math.min((L - (b || L)) / 1e3, 0.05);
      b = L, n.matches || (y += R);
      const x = 1 - Math.exp(-R * 4.5);
      E += (I - E) * x, O += (N - O) * x, _(), n.matches || (p = requestAnimationFrame(g));
    }
    function h() {
      cancelAnimationFrame(p), p = 0, b = 0;
    }
    function u() {
      !p && v && !document.hidden && (b = 0, p = requestAnimationFrame(g));
    }
    function w() {
      m = !1, S();
    }
    const M = new ResizeObserver(() => {
      const L = i.getBoundingClientRect();
      c = Math.max(L.width, 1), f = Math.max(L.height, 1);
      const R = Math.min(devicePixelRatio || 1, 1.5);
      r.width = Math.round(c * R), r.height = Math.round(f * R), d.setTransform(R, 0, 0, R, 0, 0), S(), _();
    }), C = new IntersectionObserver((L) => {
      v = L[0].isIntersecting, v ? u() : h();
    });
    M.observe(i), C.observe(i), i.addEventListener("pointermove", (L) => {
      L.pointerType !== "touch" && (m = !0, T = L.clientX, l = L.clientY, S());
    }, { passive: !0, signal: e }), i.addEventListener("pointerleave", w, { signal: e }), window.addEventListener("scroll", S, { passive: !0, signal: e }), window.addEventListener("blur", w, { signal: e }), document.addEventListener("visibilitychange", () => document.hidden ? h() : u(), { signal: e }), n.addEventListener("change", () => {
      E = O = I = N = 0, _(), u();
    }, { signal: e }), a.addEventListener("change", w, { signal: e }), o.push(() => {
      h(), M.disconnect(), C.disconnect(), s.remove();
    });
  }), window.ENVOrganicBlob = { destroy() {
    t.abort(), o.forEach((i) => i()), window.ENVOrganicBlob === this && delete window.ENVOrganicBlob;
  } };
}
function Xe() {
  window.ENVCTABlob?.destroy();
  const t = new AbortController(), { signal: e } = t, n = matchMedia("(hover: hover) and (pointer: fine)"), a = matchMedia("(prefers-reduced-motion: reduce)");
  let o = null, i = 0, s = 0, r = 0, d = 0, c = 0;
  function f() {
    cancelAnimationFrame(c), c = 0, o?.style.removeProperty("--blob-x"), o?.style.removeProperty("--blob-y"), o = null, i = s = r = d = 0;
  }
  function p() {
    if (c = 0, !o?.isConnected) {
      f();
      return;
    }
    i += (r - i) * 0.07, s += (d - s) * 0.07, o.style.setProperty("--blob-x", `${i.toFixed(2)}px`), o.style.setProperty("--blob-y", `${s.toFixed(2)}px`), Math.abs(r - i) + Math.abs(d - s) > 0.1 && (c = requestAnimationFrame(p));
  }
  function b(m, T) {
    r = m, d = T, c || (c = requestAnimationFrame(p));
  }
  function y() {
    o && b(0, 0);
  }
  document.addEventListener("pointermove", (m) => {
    if (!n.matches || a.matches || m.pointerType === "touch") {
      f();
      return;
    }
    const T = m.target instanceof Element ? m.target.closest(".section.cta") : null;
    if (!T) {
      y();
      return;
    }
    T !== o && (f(), o = T);
    const l = o.getBoundingClientRect();
    b(
      ((m.clientX - l.left) / l.width - 0.5) * Math.min(l.width * 0.3, 320),
      ((m.clientY - l.top) / l.height - 0.5) * Math.min(l.height * 0.12, 60)
    );
  }, { passive: !0, signal: e }), document.documentElement.addEventListener("pointerleave", y, { signal: e }), window.addEventListener("blur", y, { signal: e }), window.addEventListener("scroll", y, { passive: !0, signal: e });
  const v = () => {
    (!n.matches || a.matches) && f();
  };
  n.addEventListener("change", v, { signal: e }), a.addEventListener("change", v, { signal: e }), window.ENVCTABlob = {
    destroy() {
      t.abort(), f();
    }
  };
}
async function He({ visit: t, useMask: e, transition: n, root: a, lenis: o, mount: i }) {
  const s = e && t.animation.animate;
  s || (n.cleanup(), a?.removeAttribute("data-env-alt-reveal-wait"), o?.start()), await i({ deferReveals: s });
}
function D(t, e = window, n = e.lenis) {
  const a = !t.history.popstate && t.scroll.reset && !(t.scroll.target ?? t.to.hash), o = a ? 0 : e.scrollY, i = a ? 0 : e.scrollX;
  a && e.scrollTo({ top: o, left: i, behavior: "instant" }), n?.resize(), n?.scrollTo(o, { immediate: !0, force: !0 });
}
const Q = /* @__PURE__ */ new Set();
function Fe(t = document, e = window) {
  const n = [
    [".navbar-logo-center .nav-link-sd", "color"],
    [".navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd)", "color"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "color"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "backgroundColor"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "borderColor"],
    [".navbar-logo-center .dot-link, .navbar-logo-center .line-burger", "backgroundColor"]
  ].flatMap(([a, o]) => [...t.querySelectorAll(a)].map((i) => ({
    el: i,
    property: o,
    before: e.getComputedStyle(i)[o],
    transition: i.style.getPropertyValue("transition"),
    priority: i.style.getPropertyPriority("transition")
  })));
  return Q.forEach((a) => a.cancel()), Q.clear(), n.forEach(({ el: a }) => a.style.setProperty("transition", "none", "important")), () => {
    const a = n.map((o) => ({ ...o, after: e.getComputedStyle(o.el)[o.property] }));
    for (const { el: o, property: i, before: s, after: r, transition: d, priority: c } of a) {
      if (s !== r && !e.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const f = o.animate([{ [i]: s }, { [i]: r }], { duration: 400, easing: "ease", fill: "both" });
        Q.add(f), f.finished.then(() => {
          f.cancel(), Q.delete(f);
        }).catch(() => Q.delete(f));
      }
      d ? o.style.setProperty("transition", d, c) : o.style.removeProperty("transition");
    }
  };
}
function qe(t, e = window) {
  const n = (t.getAnimations?.({ subtree: !0 }) || []).filter((d) => d.playState === "running");
  n.forEach((d) => d.pause());
  const a = (e.ScrollTrigger?.getAll() || []).filter((d) => d.enabled !== !1 && d.trigger && t.contains(d.trigger)), o = new Set(e.gsap?.getTweensOf([t, ...t.querySelectorAll("*")]) || []);
  a.forEach((d) => {
    d.animation && o.add(d.animation);
    const c = d.getTween?.();
    c && o.add(c);
  });
  const i = [...o].filter((d) => !d.paused());
  a.forEach((d) => d.disable(!1, !1)), i.forEach((d) => d.pause());
  const s = e.lenis, r = s && !s.isStopped;
  return r && s.stop(), () => {
    if (!t.isConnected) return;
    const d = e.ScrollTrigger?.getAll() || [];
    a.forEach((c) => {
      d.includes(c) && c.enable(!1, !1);
    }), i.forEach((c) => c.resume()), n.forEach((c) => {
      c.playState === "paused" && c.play();
    }), r && s.start();
  };
}
function We({ doc: t = document, win: e = window } = {}) {
  let n, a, o, i, s, r = [], d = 0;
  const c = () => e.matchMedia("(prefers-reduced-motion: reduce)").matches, f = (m) => m.preventDefault();
  function p() {
    d++, r.forEach((m) => m.cancel()), r = [], n?.remove(), n = null, a = null, s?.(), s = null, o && (i === null ? o.removeAttribute("style") : o.setAttribute("style", i), o = null), e.removeEventListener("wheel", f, !0), e.removeEventListener("touchmove", f, !0), t.documentElement.removeAttribute("data-env-transition-active");
  }
  function b() {
    p();
    const m = t.querySelector("#env-sd-page");
    if (!m || c()) return;
    s = qe(m, e);
    const T = m.cloneNode(!0), l = [m, ...m.querySelectorAll("*")], E = [T, ...T.querySelectorAll("*")], O = [];
    E.forEach((g, h) => {
      const u = e.getComputedStyle(l[h]);
      for (let w = 0; w < u.length; w++) {
        const M = u[w];
        g.style.setProperty(M, u.getPropertyValue(M));
      }
      u.position === "sticky" && (O.push({ element: g, rect: l[h].getBoundingClientRect() }), g.style.position = "relative", g.style.inset = "auto"), g.style.setProperty("animation", "none", "important"), g.style.setProperty("transition", "none", "important"), g.classList.remove("w-slider", "w-slide", "w-slider-mask", "w-slider-nav", "w-slider-dot"), g.classList.remove("footer"), l[h].matches(".project-row, .project-work, .project-item.work.left, .project-item.work.right") && g.removeAttribute("class"), l[h].closest('[data-services="reveal"]') && g.removeAttribute("class");
    });
    const I = l.map((g, h) => ({ element: g, copy: E[h] })).filter(({ element: g }) => g.parentElement === m || g.parentElement?.matches("main.main-wrapper")).filter(({ element: g }) => !g.matches("main.main-wrapper")).map(({ element: g, copy: h }) => ({ copy: h, rect: g.getBoundingClientRect() }));
    T.querySelectorAll("script").forEach((g) => g.remove()), [T, ...T.querySelectorAll("*")].forEach((g) => {
      g.removeAttribute("id"), g.removeAttribute("data-services");
      for (const h of [...g.attributes]) (h.name.startsWith("data-env-") || h.name.startsWith("data-w-id")) && g.removeAttribute(h.name);
    });
    const N = m.querySelectorAll("canvas");
    T.querySelectorAll("canvas").forEach((g, h) => {
      const u = N[h];
      g.width = u.width, g.height = u.height;
      try {
        g.getContext("2d")?.drawImage(u, 0, 0);
      } catch {
      }
    });
    const _ = m.querySelectorAll("video");
    T.querySelectorAll("video").forEach((g, h) => {
      const u = _[h], w = t.createElement("canvas");
      w.style.cssText = g.style.cssText, w.className = g.className;
      const M = e.getComputedStyle(u);
      for (const C of ["position", "top", "left", "right", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "objectFit", "objectPosition", "transform", "zIndex", "marginTop", "marginRight", "marginBottom", "marginLeft", "display", "boxSizing", "borderRadius"]) w.style[C] = M[C];
      w.width = u.videoWidth || 320, w.height = u.videoHeight || 180;
      try {
        if (u.readyState < 2) throw Error("Video frame unavailable");
        w.getContext("2d").drawImage(u, 0, 0, w.width, w.height), g.replaceWith(w);
      } catch {
        const L = u.poster || u.closest(".w-background-video")?.getAttribute("data-poster-url");
        if (L) {
          const R = t.createElement("img");
          R.src = L, R.style.cssText = w.style.cssText, R.className = g.className, g.replaceWith(R);
        } else g.remove();
      }
    }), T.style.cssText = `position:absolute;left:0;top:${-e.scrollY}px;width:100%;margin:0;background:#fff;pointer-events:none;z-index:0;`, n = t.createElement("div"), n.dataset.envTransitionSnapshot = "", n.dataset.envIgnore = "", n.setAttribute("aria-hidden", "true"), n.inert = !0, n.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:8;background:#fff;transform-origin:50% 50%;", a = t.createElement("div"), a.dataset.envTransitionShade = "", a.style.cssText = "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:1;", n.append(T, a), t.body.append(n), I.map(({ copy: g, rect: h }) => {
      const u = g.getBoundingClientRect();
      return { element: g, x: h.left - u.left, y: h.top - u.top };
    }).forEach(({ element: g, x: h, y: u }) => {
      if (Math.abs(h) < 0.1 && Math.abs(u) < 0.1) return;
      const w = g.style.transform;
      g.style.transform = `translate(${h}px,${u}px) ${w === "none" ? "" : w}`;
    }), O.forEach(({ element: g, rect: h }) => {
      const u = g.getBoundingClientRect(), w = h.left - u.left, M = h.top - u.top;
      if (Math.abs(w) < 0.1 && Math.abs(M) < 0.1) return;
      const C = g.style.transform;
      g.style.transform = `translate(${w}px,${M}px) ${C === "none" ? "" : C}`;
    }), t.documentElement.setAttribute("data-env-transition-active", ""), e.addEventListener("wheel", f, { capture: !0, passive: !1 }), e.addEventListener("touchmove", f, { capture: !0, passive: !1 });
  }
  function y(m) {
    !n || c() || (o = m, i = m.getAttribute("style"), Object.assign(m.style, { position: "relative", zIndex: "9", clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)", backgroundColor: "#fff", willChange: "clip-path" }));
  }
  async function v(m) {
    if (!n || c()) {
      p();
      return;
    }
    o || y(m);
    const T = d, l = Math.max(0, -m.getBoundingClientRect().top), E = e.innerHeight, O = `polygon(0 ${l + E}px,100% ${l + E}px,100% 100%,0 100%)`, I = `polygon(0 ${l}px,100% ${l}px,100% 100%,0 100%)`, N = { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" };
    r = [
      n.animate([{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-12vh) scale(1.04)" }], N),
      m.animate([{ clipPath: O }, { clipPath: I }], N),
      a.animate([{ opacity: 0 }, { opacity: 0.35 }], N)
    ];
    const _ = t.timeline?.currentTime;
    _ != null && r.forEach((S) => {
      S.startTime = _;
    }), await Promise.all(r.map((S) => S.finished.catch(() => {
    }))), T === d && p();
  }
  return { capture: b, prepare: y, reveal: v, cleanup: p };
}
const le = /* @__PURE__ */ new WeakMap();
function re(t, e, n, a) {
  if (!t && !le.has(e))
    return !1;
  const o = le.get(e) ?? /* @__PURE__ */ new WeakMap();
  le.set(e, o);
  const i = o.get(n) ?? /* @__PURE__ */ new Set();
  o.set(n, i);
  const s = i.has(a);
  return t ? i.add(a) : i.delete(a), s && t;
}
function $e(t, e) {
  let n = t.target;
  if (n instanceof Text && (n = n.parentElement), n instanceof Element && t.currentTarget instanceof Node) {
    const a = n.closest(e);
    if (a && t.currentTarget.contains(a))
      return a;
  }
}
function Ue(t, e, n, a = {}) {
  if (Array.isArray(e)) {
    for (const v of e)
      Ue(t, v, n, a);
    return;
  }
  const o = e, { signal: i, base: s = document } = a;
  if (i?.aborted)
    return;
  const { once: r, ...d } = a, c = s instanceof Document ? s.documentElement : s, f = !!(typeof a == "object" ? a.capture : a), p = (v) => {
    const m = $e(v, String(t));
    if (m) {
      const T = Object.assign(v, { delegateTarget: m });
      n.call(c, T), r && (c.removeEventListener(o, p, d), re(!1, c, n, b));
    }
  }, b = JSON.stringify({ selector: t, type: o, capture: f });
  re(!0, c, n, b) || c.addEventListener(o, p, d), i?.addEventListener("abort", () => {
    re(!1, c, n, b);
  });
}
function A() {
  return A = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) ({}).hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, A.apply(null, arguments);
}
const Ve = (t, e) => String(t).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || e || "", Y = ({ hash: t } = {}) => window.location.pathname + window.location.search + (t ? window.location.hash : ""), Ke = (t, e = {}) => {
  const n = A({ url: t = t || Y({ hash: !0 }), random: Math.random(), source: "swup" }, e);
  window.history.pushState(n, "", t);
}, X = (t = null, e = {}) => {
  t = t || Y({ hash: !0 });
  const n = A({}, window.history.state || {}, { url: t, random: Math.random(), source: "swup" }, e);
  window.history.replaceState(n, "", t);
}, Ze = (t, e, n, a) => {
  const o = new AbortController();
  return a = A({}, a, { signal: o.signal }), Ue(t, e, n, a), { destroy: () => o.abort() };
};
let G = class ne extends URL {
  constructor(e, n = document.baseURI) {
    super(e.toString(), n), Object.setPrototypeOf(this, ne.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(e) {
    const n = e.getAttribute("href") || e.getAttribute("xlink:href") || "";
    return new ne(n);
  }
  static fromUrl(e) {
    return new ne(e);
  }
};
class K extends Error {
  constructor(e, n) {
    super(e), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = n.url, this.status = n.status, this.aborted = n.aborted || !1, this.timedOut = n.timedOut || !1;
  }
}
async function Je(t, e = {}) {
  var n;
  t = G.fromUrl(t).url;
  const { visit: a = this.visit } = e, o = A({}, this.options.requestHeaders, e.headers), i = (n = e.timeout) != null ? n : this.options.timeout, s = new AbortController(), { signal: r } = s;
  e = A({}, e, { headers: o, signal: r });
  let d, c = !1, f = null;
  i && i > 0 && (f = setTimeout(() => {
    c = !0, s.abort("timeout");
  }, i));
  try {
    d = await this.hooks.call("fetch:request", a, { url: t, options: e }, (T, { url: l, options: E }) => fetch(l, E)), f && clearTimeout(f);
  } catch (T) {
    throw c ? (this.hooks.call("fetch:timeout", a, { url: t }), new K(`Request timed out: ${t}`, { url: t, timedOut: c })) : T?.name === "AbortError" || r.aborted ? new K(`Request aborted: ${t}`, { url: t, aborted: !0 }) : T;
  }
  const { status: p, url: b } = d, y = await d.text();
  if (p === 500) throw this.hooks.call("fetch:error", a, { status: p, response: d, url: b }), new K(`Server error: ${b}`, { status: p, url: b });
  if (!y) throw new K(`Empty response: ${b}`, { status: p, url: b });
  const { url: v } = G.fromUrl(b), m = { url: v, html: y };
  return !a.cache.write || e.method && e.method !== "GET" || t !== v || this.cache.set(m.url, m), m;
}
class en {
  constructor(e) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = e;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const e = /* @__PURE__ */ new Map();
    return this.pages.forEach((n, a) => {
      e.set(a, A({}, n));
    }), e;
  }
  has(e) {
    return this.pages.has(this.resolve(e));
  }
  get(e) {
    const n = this.pages.get(this.resolve(e));
    return n && A({}, n);
  }
  set(e, n) {
    n = A({}, n, { url: e = this.resolve(e) }), this.pages.set(e, n), this.swup.hooks.callSync("cache:set", void 0, { page: n });
  }
  update(e, n) {
    e = this.resolve(e);
    const a = A({}, this.get(e), n, { url: e });
    this.pages.set(e, a);
  }
  delete(e) {
    this.pages.delete(this.resolve(e));
  }
  clear() {
    this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
  }
  prune(e) {
    this.pages.forEach((n, a) => {
      e(a, n) && this.delete(a);
    });
  }
  resolve(e) {
    const { url: n } = G.fromUrl(e);
    return this.swup.resolveUrl(n);
  }
}
const fe = (t, e = document) => e.querySelector(t), ye = (t, e = document) => Array.from(e.querySelectorAll(t)), Ge = () => new Promise((t) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t();
    });
  });
});
function Pe(t) {
  return !!t && (typeof t == "object" || typeof t == "function") && typeof t.then == "function";
}
function nn(t, e = []) {
  return new Promise((n, a) => {
    const o = t(...e);
    Pe(o) ? o.then(n, a) : n(o);
  });
}
function he(t, e) {
  const n = t?.closest(`[${e}]`);
  return n != null && n.hasAttribute(e) ? n?.getAttribute(e) || !0 : void 0;
}
class tn {
  constructor(e) {
    this.swup = void 0, this.swupClasses = ["to-", "is-changing", "is-rendering", "is-popstate", "is-animating", "is-leaving"], this.swup = e;
  }
  get selectors() {
    const { scope: e } = this.swup.visit.animation;
    return e === "containers" ? this.swup.visit.containers : e === "html" ? ["html"] : Array.isArray(e) ? e : [];
  }
  get selector() {
    return this.selectors.join(",");
  }
  get targets() {
    return this.selector.trim() ? ye(this.selector) : [];
  }
  add(...e) {
    this.targets.forEach((n) => n.classList.add(...e));
  }
  remove(...e) {
    this.targets.forEach((n) => n.classList.remove(...e));
  }
  clear() {
    this.targets.forEach((e) => {
      const n = e.className.split(" ").filter((a) => this.isSwupClass(a));
      e.classList.remove(...n);
    });
  }
  isSwupClass(e) {
    return this.swupClasses.some((n) => e.startsWith(n));
  }
}
class Be {
  constructor(e, n) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: a, from: o, hash: i, el: s, event: r } = n;
    this.id = Math.random(), this.state = 1, this.from = { url: o ?? e.location.url, hash: e.location.hash }, this.to = { url: a, hash: i }, this.containers = e.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: e.options.native, scope: e.options.animationScope, selector: e.options.animationSelector }, this.trigger = { el: s, event: r }, this.cache = { read: e.options.cache, write: e.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
  }
  advance(e) {
    this.state < e && (this.state = e);
  }
  abort() {
    this.state = 8;
  }
  ignore() {
    this.state = 10;
  }
  get done() {
    return this.state >= 7;
  }
  get ignored() {
    return this.state === 10;
  }
}
function an(t) {
  return new Be(this, t);
}
class on {
  constructor(e) {
    this.swup = void 0, this.registry = /* @__PURE__ */ new Map(), this.hooks = ["animation:out:start", "animation:out:await", "animation:out:end", "animation:in:start", "animation:in:await", "animation:in:end", "animation:skip", "cache:clear", "cache:set", "content:replace", "content:scroll", "enable", "disable", "fetch:request", "fetch:error", "fetch:timeout", "history:popstate", "link:click", "link:self", "link:anchor", "link:newtab", "page:load", "page:view", "scroll:top", "scroll:anchor", "visit:start", "visit:transition", "visit:abort", "visit:end", "visit:fail"], this.nextHookId = 0, this.swup = e, this.init();
  }
  init() {
    this.hooks.forEach((e) => this.create(e));
  }
  create(e) {
    this.registry.has(e) || this.registry.set(e, /* @__PURE__ */ new Map());
  }
  exists(e) {
    return this.registry.has(e);
  }
  get(e) {
    const n = this.registry.get(e);
    if (n) return n;
    console.error(`Unknown hook '${e}'`);
  }
  clear() {
    this.registry.forEach((e) => e.clear());
  }
  on(e, n, a = {}) {
    const o = this.get(e);
    if (!o) return console.warn(`Hook '${e}' not found.`), () => {
    };
    const i = A({}, a, { id: ++this.nextHookId, hook: e, handler: n });
    return o.set(n, i), () => this.off(e, n);
  }
  before(e, n, a = {}) {
    return this.on(e, n, A({}, a, { before: !0 }));
  }
  replace(e, n, a = {}) {
    return this.on(e, n, A({}, a, { replace: !0 }));
  }
  once(e, n, a = {}) {
    return this.on(e, n, A({}, a, { once: !0 }));
  }
  off(e, n) {
    const a = this.get(e);
    a && n ? a.delete(n) || console.warn(`Handler for hook '${e}' not found.`) : a && a.clear();
  }
  async call(e, n, a, o) {
    const [i, s, r] = this.parseCallArgs(e, n, a, o), { before: d, handler: c, after: f } = this.getHandlers(e, r);
    await this.run(d, i, s);
    const [p] = await this.run(c, i, s, !0);
    return await this.run(f, i, s), this.dispatchDomEvent(e, i, s), p;
  }
  callSync(e, n, a, o) {
    const [i, s, r] = this.parseCallArgs(e, n, a, o), { before: d, handler: c, after: f } = this.getHandlers(e, r);
    this.runSync(d, i, s);
    const [p] = this.runSync(c, i, s, !0);
    return this.runSync(f, i, s), this.dispatchDomEvent(e, i, s), p;
  }
  parseCallArgs(e, n, a, o) {
    return n instanceof Be || typeof n != "object" && typeof a != "function" ? [n, a, o] : [void 0, n, a];
  }
  async run(e, n = this.swup.visit, a, o = !1) {
    const i = [];
    for (const { hook: s, handler: r, defaultHandler: d, once: c } of e) if (n == null || !n.done) {
      c && this.off(s, r);
      try {
        const f = await nn(r, [n, a, d]);
        i.push(f);
      } catch (f) {
        if (o) throw f;
        console.error(`Error in hook '${s}':`, f);
      }
    }
    return i;
  }
  runSync(e, n = this.swup.visit, a, o = !1) {
    const i = [];
    for (const { hook: s, handler: r, defaultHandler: d, once: c } of e) if (n == null || !n.done) {
      c && this.off(s, r);
      try {
        const f = r(n, a, d);
        i.push(f), Pe(f) && console.warn(`Swup will not await Promises in handler for synchronous hook '${s}'.`);
      } catch (f) {
        if (o) throw f;
        console.error(`Error in hook '${s}':`, f);
      }
    }
    return i;
  }
  getHandlers(e, n) {
    const a = this.get(e);
    if (!a) return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const o = Array.from(a.values()), i = this.sortRegistrations, s = o.filter(({ before: p, replace: b }) => p && !b).sort(i), r = o.filter(({ replace: p }) => p).filter((p) => !0).sort(i), d = o.filter(({ before: p, replace: b }) => !p && !b).sort(i), c = r.length > 0;
    let f = [];
    if (n && (f = [{ id: 0, hook: e, handler: n }], c)) {
      const p = r.length - 1, { handler: b, once: y } = r[p], v = (m) => {
        const T = r[m - 1];
        return T ? (l, E) => T.handler(l, E, v(m - 1)) : n;
      };
      f = [{ id: 0, hook: e, once: y, handler: b, defaultHandler: v(p) }];
    }
    return { found: !0, before: s, handler: f, after: d, replaced: c };
  }
  sortRegistrations(e, n) {
    var a, o;
    return ((a = e.priority) != null ? a : 0) - ((o = n.priority) != null ? o : 0) || e.id - n.id || 0;
  }
  dispatchDomEvent(e, n, a) {
    if (n != null && n.done) return;
    const o = { hook: e, args: a, visit: n || this.swup.visit };
    document.dispatchEvent(new CustomEvent("swup:any", { detail: o, bubbles: !0 })), document.dispatchEvent(new CustomEvent(`swup:${e}`, { detail: o, bubbles: !0 }));
  }
  parseName(e) {
    const [n, ...a] = e.split(".");
    return [n, a.reduce((o, i) => A({}, o, { [i]: !0 }), {})];
  }
}
const sn = (t) => {
  if (t && t.charAt(0) === "#" && (t = t.substring(1)), !t) return null;
  const e = decodeURIComponent(t);
  let n = document.getElementById(t) || document.getElementById(e) || fe(`a[name='${CSS.escape(t)}']`) || fe(`a[name='${CSS.escape(e)}']`);
  return n || t !== "top" || (n = document.body), n;
}, Z = "transition", de = "animation";
async function ln({ selector: t, elements: e }) {
  if (t === !1 && !e) return;
  let n = [];
  if (e) n = Array.from(e);
  else if (t && (n = ye(t, document.body), !n.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${t}\``);
  const a = n.map((o) => (function(i) {
    const { type: s, timeout: r, propCount: d } = (function(c) {
      const f = window.getComputedStyle(c), p = J(f, `${Z}Delay`), b = J(f, `${Z}Duration`), y = we(p, b), v = J(f, `${de}Delay`), m = J(f, `${de}Duration`), T = we(v, m), l = Math.max(y, T), E = l > 0 ? y > T ? Z : de : null;
      return { type: E, timeout: l, propCount: E ? E === Z ? b.length : m.length : 0 };
    })(i);
    return !(!s || !r) && new Promise((c) => {
      const f = `${s}end`, p = performance.now();
      let b = 0;
      const y = () => {
        i.removeEventListener(f, v), c();
      }, v = (m) => {
        m.target === i && ((performance.now() - p) / 1e3 < m.elapsedTime || ++b >= d && y());
      };
      setTimeout(() => {
        b < d && y();
      }, r + 1), i.addEventListener(f, v);
    });
  })(o)).filter((o) => o !== !1);
  a.length ? await Promise.all(a) : t && console.warn(`[swup] No CSS animation duration defined on elements matching \`${t}\``);
}
function J(t, e) {
  return (t[e] || "").split(", ");
}
function we(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((n, a) => Oe(n) + Oe(t[a])));
}
function Oe(t) {
  return 1e3 * parseFloat(t);
}
function rn(t, e = {}, n = {}) {
  if (typeof t != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(t, { el: n.el, event: n.event })) return void window.location.assign(t);
  const { url: a, hash: o } = G.fromUrl(t), i = this.createVisit(A({}, n, { to: a, hash: o }));
  this.performNavigation(i, e);
}
async function dn(t, e = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return t.state = 2, void (this.onVisitEnd = () => this.performNavigation(t, e));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = t;
  const { el: n } = t.trigger;
  e.referrer = e.referrer || this.location.url, e.animate === !1 && (t.animation.animate = !1), t.animation.animate || this.classes.clear();
  const a = e.history || he(n, "data-swup-history");
  typeof a == "string" && ["push", "replace"].includes(a) && (t.history.action = a);
  const o = e.animation || he(n, "data-swup-animation");
  var i, s;
  typeof o == "string" && (t.animation.name = o), t.meta = e.meta || {}, typeof e.cache == "object" ? (t.cache.read = (i = e.cache.read) != null ? i : t.cache.read, t.cache.write = (s = e.cache.write) != null ? s : t.cache.write) : e.cache !== void 0 && (t.cache = { read: !!e.cache, write: !!e.cache }), delete e.cache;
  try {
    await this.hooks.call("visit:start", t, void 0), t.state = 3;
    const r = this.hooks.call("page:load", t, { options: e }, async (c, f) => {
      let p;
      return c.cache.read && (p = this.cache.get(c.to.url)), f.page = p || await this.fetchPage(c.to.url, f.options), f.cache = !!p, f.page;
    });
    r.then(({ html: c }) => {
      t.advance(5), t.to.html = c, t.to.document = new DOMParser().parseFromString(c, "text/html");
    });
    const d = t.to.url + t.to.hash;
    if (t.history.popstate || (t.history.action === "replace" || t.to.url === this.location.url ? X(d) : (this.currentHistoryIndex++, Ke(d, { index: this.currentHistoryIndex }))), this.location = G.fromUrl(d), t.history.popstate && this.classes.add("is-popstate"), t.animation.name && this.classes.add(`to-${Ve(t.animation.name)}`), t.animation.wait && await r, t.ignored) throw new Error(`Visit to ${t.to.url} manually ignored`);
    if (t.done || (await this.hooks.call("visit:transition", t, void 0, async () => {
      if (!t.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(t, await r);
      t.advance(4), await this.animatePageOut(t), t.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(t, await r)).finished : await this.renderPage(t, await r), await this.animatePageIn(t);
    }), t.done)) return;
    await this.hooks.call("visit:end", t, void 0, () => this.classes.clear()), t.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (r) {
    if (!r || r != null && r.aborted) return void t.advance(8);
    if (t.ignored) return void Le.call(this, t);
    await this.hooks.call("visit:fail", t, { error: r }, (d, { error: c }) => {
      console.error(c), Le.call(this, d);
    }), t.advance(9);
  } finally {
    delete t.to.document, this.visit === t && (this.navigating = !1);
  }
}
function Le(t) {
  const e = t.to.url + t.to.hash;
  Y() === t.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(e), { once: !0 }), window.history.back()) : window.location.assign(e);
}
const cn = async function(t) {
  await this.hooks.call("animation:out:start", t, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", t, { skip: !1 }, (e, { skip: n }) => {
    if (!n) return this.awaitAnimations({ selector: e.animation.selector });
  }), await this.hooks.call("animation:out:end", t, void 0);
}, fn = function(t) {
  var e;
  const n = t.to.document;
  if (!n) return !1;
  const a = ((e = n.querySelector("title")) == null ? void 0 : e.innerText) || "";
  document.title = a;
  const o = ye('[data-swup-persist]:not([data-swup-persist=""])'), i = t.containers.map((s) => {
    const r = document.querySelector(s), d = n.querySelector(s);
    return r && d ? (r.replaceWith(d.cloneNode(!0)), !0) : (r || console.warn(`[swup] Container missing in current document: ${s}`), d || console.warn(`[swup] Container missing in incoming document: ${s}`), !1);
  }).filter(Boolean);
  return o.forEach((s) => {
    const r = s.getAttribute("data-swup-persist"), d = fe(`[data-swup-persist="${r}"]`);
    d && d !== s && d.replaceWith(s);
  }), i.length === t.containers.length;
}, un = function(t) {
  const e = { behavior: "auto" }, { target: n, reset: a } = t.scroll, o = n ?? t.to.hash;
  let i = !1;
  return o && (i = this.hooks.callSync("scroll:anchor", t, { hash: o, options: e }, (s, { hash: r, options: d }) => {
    const c = this.getAnchorElement(r);
    return c && c.scrollIntoView(d), !!c;
  })), a && !i && (i = this.hooks.callSync("scroll:top", t, { options: e }, (s, { options: r }) => (window.scrollTo(A({ top: 0, left: 0 }, r)), !0))), i;
}, pn = async function(t) {
  if (t.done) return;
  const e = this.hooks.call("animation:in:await", t, { skip: !1 }, (n, { skip: a }) => {
    if (!a) return this.awaitAnimations({ selector: n.animation.selector });
  });
  await Ge(), await this.hooks.call("animation:in:start", t, void 0, () => {
    this.classes.remove("is-animating");
  }), await e, await this.hooks.call("animation:in:end", t, void 0);
}, bn = async function(t, e) {
  if (t.done) return;
  t.advance(6);
  const { url: n } = e;
  this.isSameResolvedUrl(Y(), n) || (X(n), this.location = G.fromUrl(n), t.to.url = this.location.url, t.to.hash = this.location.hash), await this.hooks.call("content:replace", t, { page: e }, (a, {}) => {
    if (this.classes.remove("is-leaving"), a.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(a)) throw new Error("[swup] Container mismatch, aborting");
    a.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), a.animation.name && this.classes.add(`to-${Ve(a.animation.name)}`));
  }), await this.hooks.call("content:scroll", t, void 0, () => this.scrollToContent(t)), await this.hooks.call("page:view", t, { url: this.location.url, title: document.title });
}, mn = function(t) {
  var e;
  if (e = t, !!e?.isSwupPlugin) {
    if (t.swup = this, !t._checkRequirements || t._checkRequirements()) return t._beforeMount && t._beforeMount(), t.mount(), this.plugins.push(t), this.plugins;
  } else console.error("Not a swup plugin instance", t);
};
function gn(t) {
  const e = this.findPlugin(t);
  if (e) return e.unmount(), e._afterUnmount && e._afterUnmount(), this.plugins = this.plugins.filter((n) => n !== e), this.plugins;
  console.error("No such plugin", e);
}
function yn(t) {
  return this.plugins.find((e) => typeof t == "string" ? [`Swup${t}`, t].includes(e.name) : e === t);
}
function En(t) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), t;
  const e = this.options.resolveUrl(t);
  return e && typeof e == "string" ? e.startsWith("//") || e.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), t) : e : (console.warn("[swup] options.resolveUrl needs to return a url"), t);
}
function Tn(t, e) {
  return this.resolveUrl(t) === this.resolveUrl(e);
}
const In = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (t, { el: e } = {}) => !(e == null || !e.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (t) => t, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (t) => {
  var e;
  return ((e = t.state) == null ? void 0 : e.source) !== "swup";
}, timeout: 0 };
class vn {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(e = {}) {
    var n, a;
    this.version = "4.10.0", this.options = void 0, this.defaults = In, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = G.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = mn, this.unuse = gn, this.findPlugin = yn, this.log = () => {
    }, this.navigate = rn, this.performNavigation = dn, this.createVisit = an, this.delegateEvent = Ze, this.fetchPage = Je, this.awaitAnimations = ln, this.renderPage = bn, this.replaceContent = fn, this.animatePageIn = pn, this.animatePageOut = cn, this.scrollToContent = un, this.getAnchorElement = sn, this.getCurrentUrl = Y, this.resolveUrl = En, this.isSameResolvedUrl = Tn, this.options = A({}, this.defaults, e), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new en(this), this.classes = new tn(this), this.hooks = new on(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (n = (a = window.history.state) == null ? void 0 : a.index) != null ? n : 1, this.enable();
  }
  async enable() {
    var e;
    const { linkSelector: n } = this.options;
    this.clickDelegate = this.delegateEvent(n, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((a) => this.use(a));
    for (const [a, o] of Object.entries(this.options.hooks)) {
      const [i, s] = this.hooks.parseName(a);
      this.hooks.on(i, o, s);
    }
    ((e = window.history.state) == null ? void 0 : e.source) !== "swup" && X(null, { index: this.currentHistoryIndex }), await Ge(), await this.hooks.call("enable", void 0, void 0, () => {
      const a = document.documentElement;
      a.classList.add("swup-enabled"), a.classList.toggle("swup-native", this.options.native);
    });
  }
  async destroy() {
    this.clickDelegate.destroy(), window.removeEventListener("popstate", this.handlePopState), this.cache.clear(), this.plugins.forEach((e) => this.unuse(e)), await this.hooks.call("disable", void 0, void 0, () => {
      const e = document.documentElement;
      e.classList.remove("swup-enabled"), e.classList.remove("swup-native");
    }), this.hooks.clear();
  }
  shouldIgnoreVisit(e, { el: n, event: a } = {}) {
    const { origin: o, url: i, hash: s } = G.fromUrl(e);
    return o !== window.location.origin || !(!n || !this.triggerWillOpenNewWindow(n)) || !!this.options.ignoreVisit(i + s, { el: n, event: a });
  }
  handleLinkClick(e) {
    const n = e.delegateTarget, { href: a, url: o, hash: i } = G.fromElement(n);
    if (this.shouldIgnoreVisit(a, { el: n, event: e })) return;
    if (this.navigating && o === this.visit.to.url) return void e.preventDefault();
    const s = this.createVisit({ to: o, hash: i, el: n, event: e });
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? this.hooks.callSync("link:newtab", s, { href: a }) : e.button === 0 && this.hooks.callSync("link:click", s, { el: n, event: e }, () => {
      var r;
      const d = (r = s.from.url) != null ? r : "";
      e.preventDefault(), o && o !== d ? this.isSameResolvedUrl(o, d) || this.performNavigation(s) : i ? this.hooks.callSync("link:anchor", s, { hash: i }, () => {
        X(o + i), this.scrollToContent(s);
      }) : this.hooks.callSync("link:self", s, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(s) : (X(o), this.scrollToContent(s));
      });
    });
  }
  handlePopState(e) {
    var n, a, o, i;
    const s = (n = (a = e.state) == null ? void 0 : a.url) != null ? n : window.location.href;
    if (this.options.skipPopStateHandling(e) || this.isSameResolvedUrl(Y(), this.location.url)) return;
    const { url: r, hash: d } = G.fromUrl(s), c = this.createVisit({ to: r, hash: d, event: e });
    c.history.popstate = !0;
    const f = (o = (i = e.state) == null ? void 0 : i.index) != null ? o : 0;
    f && f !== this.currentHistoryIndex && (c.history.direction = f - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = f), c.animation.animate = !1, c.scroll.reset = !1, c.scroll.target = !1, this.options.animateHistoryBrowsing && !e.hasUAVisualTransition && (c.animation.animate = !0, c.scroll.reset = !0), this.hooks.callSync("history:popstate", c, { event: e }, () => {
      this.performNavigation(c);
    });
  }
  triggerWillOpenNewWindow(e) {
    return !!e.matches('[download], [target="_blank"]');
  }
}
function hn(t, { doc: e = document, win: n = window, fetchHTML: a = fetch, now: o = Date.now, ttl: i = 3e5, limit: s = 8, delay: r = 1200, warmPage: d } = {}) {
  const c = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = new AbortController();
  let b, y = !1, v = !1;
  const m = n.navigator.connection, T = () => m?.saveData || /(^|-)2g$/.test(m?.effectiveType || "");
  function l() {
    for (const [u, w] of c) o() - w >= i && (t.cache.delete(u), c.delete(u));
    for (; c.size > s; ) {
      const u = c.keys().next().value;
      t.cache.delete(u), c.delete(u);
    }
  }
  const E = (u, { page: w }) => {
    c.delete(w.url), c.set(w.url, o()), l();
  };
  t.hooks.on("cache:set", E);
  for (const [u] of t.cache.all || []) c.set(u, o());
  l();
  function O(u) {
    if (!u || u.closest("[data-no-swup]") || u.hasAttribute("download") || u.hasAttribute("target")) return;
    const w = new URL(u.getAttribute("href"), n.location.href);
    if (!(w.origin !== n.location.origin || w.search || w.hash || w.pathname === n.location.pathname || /\.[a-z0-9]+$/i.test(w.pathname)))
      return w.pathname;
  }
  async function I(u) {
    if (l(), v || T() || t.cache.has(u)) return;
    if (f.has(u)) return f.get(u);
    const w = new AbortController(), M = n.setTimeout(() => w.abort(), 4e3), C = (async () => {
      try {
        const L = await a(u, { headers: { "X-Requested-With": "swup", Accept: "text/html" }, credentials: "same-origin", signal: w.signal, priority: "low" });
        if (!L.ok || !L.headers.get("content-type")?.includes("text/html")) return;
        const R = new URL(L.url || u, n.location.href);
        if (R.origin !== n.location.origin || R.pathname !== u || R.search) return;
        const x = await L.text();
        !v && x && x.length < 1e6 && (t.cache.set(u, { url: u, html: x }), d && Promise.resolve().then(() => d(x)).catch(() => {
        }));
      } catch {
      } finally {
        n.clearTimeout(M), f.delete(u);
      }
    })();
    return f.set(u, C), C;
  }
  function N() {
    n.clearTimeout(b), !(v || T()) && (b = n.setTimeout(async () => {
      if (y || e.hidden || v) return;
      const u = [...new Set([...e.querySelectorAll(".navbar-logo-center .nav-link-sd[href], .navbar-logo-center .link-menu-overlay[href]")].map(O).filter(Boolean))].slice(0, 3);
      for (const w of u) {
        if (y || v || e.hidden) break;
        await I(w);
      }
    }, r));
  }
  const _ = () => {
    y = !0, n.clearTimeout(b);
  }, S = () => {
    y = !1, N();
  }, g = async (u) => {
    l(), u.cache.read && f.has(u.to.url) && await f.get(u.to.url);
  };
  t.hooks.on("visit:start", _), t.hooks.before("page:load", g);
  for (const u of ["page:view", "visit:fail", "visit:abort"]) t.hooks.on(u, S);
  const h = (u) => {
    if (!y && !e.hidden) {
      const w = O(u.target.closest?.(".navbar-logo-center a[href]"));
      w && I(w);
    }
  };
  return e.addEventListener("pointerover", h, { passive: !0, signal: p.signal }), e.addEventListener("focusin", h, { signal: p.signal }), N(), () => {
    v = !0, n.clearTimeout(b), p.abort(), t.hooks.off("cache:set", E), t.hooks.off("visit:start", _), t.hooks.off("page:load", g);
    for (const u of ["page:view", "visit:fail", "visit:abort"]) t.hooks.off(u, S);
  };
}
function wn({ doc: t = document, win: e = window } = {}) {
  const n = t.createElement("style");
  n.dataset.envSdGradientStyle = "", n.textContent = "#env-sd-gradient{position:absolute;pointer-events:none;z-index:0;opacity:0;transition:opacity 350ms ease,height 350ms ease}#env-sd-page[data-env-sd-gradient-page]>.main-wrapper{background-color:transparent!important}#env-sd-page [data-env-sd-gradient-source]{background-image:none!important;background-color:transparent!important}@media(prefers-reduced-motion:reduce){#env-sd-gradient{transition:none}}", t.head.append(n);
  const a = t.createElement("div");
  a.id = "env-sd-gradient", a.setAttribute("aria-hidden", "true"), t.querySelector("#env-sd-page").before(a);
  let o, i, s, r, d = !1;
  const c = () => {
    if (!o?.isConnected) return;
    const y = o.getBoundingClientRect();
    a.style.top = `${y.top + e.scrollY}px`, a.style.left = `${y.left + e.scrollX}px`, a.style.width = `${y.width}px`, a.style.height = `${y.height}px`;
  }, f = () => {
    r || (r = e.requestAnimationFrame(() => {
      r = 0, c();
    }));
  };
  function p() {
    if (s?.disconnect(), o?.removeAttribute("data-env-sd-gradient-source"), i?.removeAttribute("data-env-sd-gradient-page"), i = t.querySelector("#env-sd-page"), o = i?.querySelector(".hero-wrapper.gradient-blue"), d = !!o, !o) return;
    o.removeAttribute("data-env-sd-gradient-source");
    const y = e.getComputedStyle(o);
    for (const v of ["backgroundImage", "backgroundColor", "backgroundSize", "backgroundPosition", "backgroundRepeat", "backgroundAttachment", "backgroundBlendMode"]) a.style[v] = y[v];
    i.setAttribute("data-env-sd-gradient-page", ""), o.setAttribute("data-env-sd-gradient-source", ""), c(), e.ResizeObserver && (s = new e.ResizeObserver(f), s.observe(o));
  }
  const b = () => {
    c(), a.style.opacity = d ? "1" : "0";
  };
  return e.addEventListener("resize", f, { passive: !0 }), p(), b(), {
    prepare: p,
    commit: b,
    refresh() {
      p(), b();
    },
    destroy() {
      s?.disconnect(), e.cancelAnimationFrame(r), e.removeEventListener("resize", f), o?.removeAttribute("data-env-sd-gradient-source"), i?.removeAttribute("data-env-sd-gradient-page"), n.remove(), a.remove();
    }
  };
}
function H() {
  return H = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, H.apply(this, arguments);
}
const Ne = (t) => String(t).split(".").map((e) => String(parseInt(e || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");
let On = class {
  constructor() {
    this.isSwupPlugin = !0, this.swup = void 0, this.version = void 0, this.requires = {}, this.handlersToUnregister = [];
  }
  mount() {
  }
  unmount() {
    this.handlersToUnregister.forEach((e) => e()), this.handlersToUnregister = [];
  }
  _beforeMount() {
    if (!this.name) throw new Error("You must define a name of plugin when creating a class.");
  }
  _afterUnmount() {
  }
  _checkRequirements() {
    return typeof this.requires != "object" || Object.entries(this.requires).forEach(([e, n]) => {
      if (!(function(a, o, i) {
        const s = (function(r, d) {
          var c;
          if (r === "swup") return (c = d.version) != null ? c : "";
          {
            var f;
            const p = d.findPlugin(r);
            return (f = p?.version) != null ? f : "";
          }
        })(a, i);
        return !!s && ((r, d) => d.every((c) => {
          const [, f, p] = c.match(/^([\D]+)?(.*)$/) || [];
          var b, y;
          return ((v, m) => {
            const T = { "": (l) => l === 0, ">": (l) => l > 0, ">=": (l) => l >= 0, "<": (l) => l < 0, "<=": (l) => l <= 0 };
            return (T[m] || T[""])(v);
          })((y = p, b = Ne(b = r), y = Ne(y), b.localeCompare(y, void 0, { numeric: !0 })), f || ">=");
        }))(s, o);
      })(e, n = Array.isArray(n) ? n : [n], this.swup)) {
        const a = `${e} ${n.join(", ")}`;
        throw new Error(`Plugin version mismatch: ${this.name} requires ${a}`);
      }
    }), !0;
  }
  on(e, n, a = {}) {
    var o;
    n = !(o = n).name.startsWith("bound ") || o.hasOwnProperty("prototype") ? n.bind(this) : n;
    const i = this.swup.hooks.on(e, n, a);
    return this.handlersToUnregister.push(i), i;
  }
  once(e, n, a = {}) {
    return this.on(e, n, H({}, a, { once: !0 }));
  }
  before(e, n, a = {}) {
    return this.on(e, n, H({}, a, { before: !0 }));
  }
  replace(e, n, a = {}) {
    return this.on(e, n, H({}, a, { replace: !0 }));
  }
  off(e, n) {
    return this.swup.hooks.off(e, n);
  }
};
const Se = (t) => typeof t == "object" && t != null && t.nodeType === 1, Re = (t, e) => (!e || t !== "hidden") && t !== "visible" && t !== "clip", ce = (t, e) => {
  if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
    const n = getComputedStyle(t, null);
    return Re(n.overflowY, e) || Re(n.overflowX, e) || ((a) => {
      const o = ((i) => {
        if (!i.ownerDocument || !i.ownerDocument.defaultView) return null;
        try {
          return i.ownerDocument.defaultView.frameElement;
        } catch {
          return null;
        }
      })(a);
      return !!o && (o.clientHeight < a.scrollHeight || o.clientWidth < a.scrollWidth);
    })(t);
  }
  return !1;
}, Ln = (t) => {
  const e = t.parentElement;
  return e ?? (t.getRootNode().host || null);
}, Nn = (t, e) => {
  var n, a, o, i;
  if (typeof document > "u") return [];
  const { boundary: s, skipOverflowHiddenElements: r } = e, d = typeof s == "function" ? s : (h) => h !== s;
  if (!Se(t)) throw new TypeError("Invalid target");
  const c = document.scrollingElement || document.documentElement, f = [];
  let p = t;
  for (; Se(p) && d(p); ) {
    if (p = Ln(p), p === c) {
      f.push(p);
      break;
    }
    p != null && p === document.body && ce(p) && !ce(document.documentElement) || p != null && ce(p, r) && f.push(p);
  }
  (a = (n = window.visualViewport) == null ? void 0 : n.width) != null || innerWidth, (i = (o = window.visualViewport) == null ? void 0 : o.height) != null || innerHeight;
  const { scrollX: b, scrollY: y } = window, { height: v, width: m, top: T, right: l, bottom: E, left: O } = t.getBoundingClientRect(), { top: I, left: N } = ((h) => {
    const u = window.getComputedStyle(h);
    return { top: parseFloat(u.scrollMarginTop) || 0, right: parseFloat(u.scrollMarginRight) || 0, bottom: parseFloat(u.scrollMarginBottom) || 0, left: parseFloat(u.scrollMarginLeft) || 0 };
  })(t);
  let _ = T - I, S = O - N;
  const g = [];
  for (let h = 0; h < f.length; h++) {
    const u = f[h], { height: w, width: M, top: C, right: L, bottom: R, left: x } = u.getBoundingClientRect(), B = getComputedStyle(u), z = parseInt(B.borderLeftWidth, 10), j = parseInt(B.borderTopWidth, 10), W = parseInt(B.borderRightWidth, 10), U = parseInt(B.borderBottomWidth, 10);
    let k = 0, V = 0;
    const $ = "offsetWidth" in u ? u.offsetWidth - u.clientWidth - z - W : 0, De = "offsetHeight" in u ? u.offsetHeight - u.clientHeight - j - U : 0, oe = "offsetWidth" in u ? u.offsetWidth === 0 ? 0 : M / u.offsetWidth : 0, se = "offsetHeight" in u ? u.offsetHeight === 0 ? 0 : w / u.offsetHeight : 0;
    if (c === u) k = _, V = S, k = Math.max(0, k + y), V = Math.max(0, V + b);
    else {
      k = _ - C - j, V = S - x - z;
      const { scrollLeft: Ie, scrollTop: ve } = u;
      k = se === 0 ? 0 : Math.max(0, Math.min(ve + k / se, u.scrollHeight - w / se + De)), V = oe === 0 ? 0 : Math.max(0, Math.min(Ie + V / oe, u.scrollWidth - M / oe + $)), _ += ve - k, S += Ie - V;
    }
    g.push({ el: u, top: k, left: V });
  }
  return g;
};
function ue() {
  return ue = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) ({}).hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, ue.apply(null, arguments);
}
const ke = (t, e = document) => Array.from(e.querySelectorAll(t));
class Sn extends On {
  constructor(e = {}) {
    super(), this.name = "SwupScrollPlugin", this.requires = { swup: ">=4.2.0" }, this.defaults = { doScrollingRightAway: !1, animateScroll: { betweenPages: !0, samePageWithHash: !0, samePage: !0 }, getAnchorElement: void 0, offset: 0, scrollContainers: "[data-swup-scroll-container]", shouldResetScrollPosition: () => !0, markScrollTarget: !1, scrollFunction: void 0 }, this.options = void 0, this.cachedScrollPositions = {}, this.previousScrollRestoration = void 0, this.currentCacheKey = void 0, this.getAnchorElement = (n = "") => typeof this.options.getAnchorElement == "function" ? this.options.getAnchorElement(n) : this.swup.getAnchorElement(n), this.getOffset = (n, a, o) => {
      let i;
      return i = typeof this.options.offset == "function" ? this.options.offset(n, a, o) : this.options.offset, typeof i == "object" && typeof i.top == "number" && typeof i.left == "number" ? i : { top: parseInt(String(i ?? ""), 10) || 0, left: 0 };
    }, this.onBeforeLinkToSelf = (n) => {
      n.scroll.animate = this.shouldAnimate("samePage");
    }, this.handleScrollToTop = (n) => (this.scrollTo({ top: 0, left: 0 }, n.scroll.animate), !0), this.onBeforeLinkToAnchor = (n) => {
      n.scroll.animate = this.shouldAnimate("samePageWithHash");
    }, this.handleScrollToAnchor = (n, { hash: a }) => this.maybeScrollToAnchor(a, n.scroll.animate), this.onBeforeVisitStart = (n) => {
      n.scroll.scrolledToContent = !1, n.scroll.animate = this.shouldAnimate("betweenPages");
    }, this.onVisitStart = (n) => {
      var a;
      this.cacheScrollPositions(n.from.url), this.maybeResetScrollPositions(n);
      const o = (a = n.scroll.target) != null ? a : n.to.hash;
      n.scroll.animate && this.options.doScrollingRightAway && !o && this.doScrollingBetweenPages(n);
    }, this.handleScrollToContent = (n) => {
      n.scroll.scrolledToContent || this.doScrollingBetweenPages(n), this.restoreScrollContainers(n.to.url);
    }, this.doScrollingBetweenPages = (n) => {
      var a;
      if (n.history.popstate && !n.animation.animate) return;
      const o = (a = n.scroll.target) != null ? a : n.to.hash;
      if (o && this.maybeScrollToAnchor(o, n.scroll.animate) || !n.scroll.reset) return;
      const i = this.getCachedScrollPositions(n.to.url), { top: s = 0, left: r = 0 } = i?.window || { top: 0, left: 0 };
      requestAnimationFrame(() => this.scrollTo({ top: s, left: r }, n.scroll.animate)), n.scroll.scrolledToContent = !0;
    }, this.maybeResetScrollPositions = (n) => {
      const { popstate: a } = n.history, { url: o } = n.to, { el: i } = n.trigger;
      a || i && !this.options.shouldResetScrollPosition(i) || this.resetScrollPositions(o);
    }, this.options = ue({}, this.defaults, e);
  }
  mount() {
    const e = this.swup;
    e.hooks.create("scroll:start"), e.hooks.create("scroll:end"), e.scrollTo = this.scrollTo.bind(this), this.previousScrollRestoration = window.history.scrollRestoration, e.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.updateScrollTarget = this.updateScrollTarget.bind(this), this.options.markScrollTarget && (window.addEventListener("popstate", this.updateScrollTarget), window.addEventListener("hashchange", this.updateScrollTarget), this.on("page:view", this.updateScrollTarget), this.on("link:anchor", this.updateScrollTarget), this.on("link:self", this.updateScrollTarget), this.updateScrollTarget()), this.before("visit:start", this.onBeforeVisitStart, { priority: -1 }), this.on("visit:start", this.onVisitStart, { priority: 1 }), this.replace("content:scroll", this.handleScrollToContent), this.before("link:self", this.onBeforeLinkToSelf, { priority: -1 }), this.replace("scroll:top", this.handleScrollToTop), this.before("link:anchor", this.onBeforeLinkToAnchor, { priority: -1 }), this.replace("scroll:anchor", this.handleScrollToAnchor);
  }
  unmount() {
    super.unmount(), this.previousScrollRestoration && (window.history.scrollRestoration = this.previousScrollRestoration), window.removeEventListener("popstate", this.updateScrollTarget), window.removeEventListener("hashchange", this.updateScrollTarget), this.cachedScrollPositions = {}, delete this.swup.scrollTo;
  }
  shouldAnimate(e) {
    return typeof this.options.animateScroll == "boolean" ? this.options.animateScroll : this.options.animateScroll[e];
  }
  maybeScrollToAnchor(e, n = !1) {
    if (!e) return !1;
    const a = this.getAnchorElement(e);
    return a ? a instanceof Element ? (this.scrollElementIntoView(a, n), !0) : (console.warn(`Anchor target ${e} is not a DOM node`), !1) : (console.warn(`Anchor target ${e} not found`), !1);
  }
  cacheScrollPositions(e) {
    const n = this.swup.resolveUrl(e), a = ke(this.options.scrollContainers).map((i) => ({ top: i.scrollTop, left: i.scrollLeft })), o = { window: { top: window.scrollY, left: window.scrollX }, containers: a };
    this.cachedScrollPositions[n] = o;
  }
  resetScrollPositions(e) {
    const n = this.swup.resolveUrl(e);
    delete this.cachedScrollPositions[n];
  }
  getCachedScrollPositions(e) {
    const n = this.swup.resolveUrl(e);
    return this.cachedScrollPositions[n];
  }
  restoreScrollContainers(e) {
    const n = this.getCachedScrollPositions(e);
    n && n.containers.length !== 0 && ke(this.options.scrollContainers).forEach((a, o) => {
      const i = n.containers[o];
      i != null && (a.scrollTop = i.top, a.scrollLeft = i.left);
    });
  }
  updateScrollTarget() {
    var e;
    const { hash: n } = window.location, a = document.querySelector("[data-swup-scroll-target]");
    let o = this.getAnchorElement(n);
    o instanceof HTMLBodyElement && (o = null), a !== o && (a?.removeAttribute("data-swup-scroll-target"), (e = o) == null || e.setAttribute("data-swup-scroll-target", ""));
  }
  getRootScrollContainer() {
    return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
  }
  scrollTo(e, n = !0, a) {
    var o;
    const i = this.swup.createVisit({ to: this.swup.location.url }), { top: s = 0, left: r = 0 } = typeof e == "number" ? { top: e } : e;
    a != null || (a = this.getRootScrollContainer()), ((o = this.options.scrollFunction) != null ? o : this.applyScroll)(a, s, r, n, () => this.swup.hooks.callSync("scroll:start", i, void 0), () => this.swup.hooks.callSync("scroll:end", i, void 0));
  }
  applyScroll(e, n, a, o, i, s) {
    const r = e instanceof HTMLHtmlElement || e instanceof HTMLBodyElement ? window : e;
    i(), r.addEventListener("scrollend", s, { once: !0 }), r.addEventListener("wheel", () => {
      e.scrollTo({ top: e.scrollTop, left: e.scrollLeft, behavior: "instant" });
    }, { once: !0 }), e.scrollTo({ top: n, left: a, behavior: o ? "smooth" : "instant" });
  }
  scrollElementIntoView(e, n = !1) {
    Nn(e, {}).forEach(({ top: a, left: o, el: i }) => {
      const { top: s = 0, left: r = 0 } = this.getOffset(e, i, { top: a, left: o });
      this.scrollTo({ top: a - s, left: o - r }, n, i);
    });
  }
}
const Rn = /* @__PURE__ */ JSON.parse('{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1755082284250},"e-60":{"id":"e-60","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-354"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-66":{"id":"e-66","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1755253957866},"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1755520593128},"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530611763},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-136":{"id":"e-136","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-140":{"id":"e-140","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-141":{"id":"e-141","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067163},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067164},"e-154":{"id":"e-154","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-155":{"id":"e-155","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-156":{"id":"e-156","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755871097680},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755875094862},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755876464121},"e-159":{"id":"e-159","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755879802104},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756115114996},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629063},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629064},"e-167":{"id":"e-167","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-168":{"id":"e-168","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-169":{"id":"e-169","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-170"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-170":{"id":"e-170","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-169"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-171":{"id":"e-171","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1756212521436},"e-172":{"id":"e-172","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-14","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-14-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-173":{"id":"e-173","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756212521436},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-176"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-176":{"id":"e-176","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-177":{"id":"e-177","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-178":{"id":"e-178","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-179":{"id":"e-179","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-180"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-180":{"id":"e-180","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-181":{"id":"e-181","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-182"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-182":{"id":"e-182","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-181"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-183":{"id":"e-183","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-184"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-184":{"id":"e-184","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-183"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-185":{"id":"e-185","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-186"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-186":{"id":"e-186","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-187":{"id":"e-187","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-188"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-188":{"id":"e-188","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-187"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-189":{"id":"e-189","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-190"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-190":{"id":"e-190","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-189"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-191":{"id":"e-191","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-192":{"id":"e-192","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-199":{"id":"e-199","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-200":{"id":"e-200","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-201":{"id":"e-201","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-32","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-32-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-207":{"id":"e-207","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-208":{"id":"e-208","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-209":{"id":"e-209","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-40","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-40-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-210":{"id":"e-210","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-213":{"id":"e-213","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-214":{"id":"e-214","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-215":{"id":"e-215","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-216":{"id":"e-216","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-215"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-217":{"id":"e-217","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-218":{"id":"e-218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-220":{"id":"e-220","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-221":{"id":"e-221","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-222":{"id":"e-222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-224":{"id":"e-224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-226":{"id":"e-226","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-227":{"id":"e-227","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-228":{"id":"e-228","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-230":{"id":"e-230","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-231":{"id":"e-231","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-232":{"id":"e-232","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-235":{"id":"e-235","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-237":{"id":"e-237","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-239":{"id":"e-239","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1756213073122},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756215368838},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756217402865},"e-246":{"id":"e-246","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-247"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-248":{"id":"e-248","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-61","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-61-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756219072551},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-44","affectedElements":{},"duration":0}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-44-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756285635295},"e-252":{"id":"e-252","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":35}],"createdOn":1756289409368},"e-253":{"id":"e-253","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-255":{"id":"e-255","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-256":{"id":"e-256","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-257":{"id":"e-257","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-258"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450212},"e-258":{"id":"e-258","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-257"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450213},"e-261":{"id":"e-261","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-262":{"id":"e-262","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-261"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-263":{"id":"e-263","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-264"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-264":{"id":"e-264","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-263"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-267":{"id":"e-267","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-268":{"id":"e-268","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-269":{"id":"e-269","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-270":{"id":"e-270","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-271":{"id":"e-271","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756479519311},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756717531882},"e-274":{"id":"e-274","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756806270936},"e-322":{"id":"e-322","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756810004678},"e-323":{"id":"e-323","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756810004678},"e-324":{"id":"e-324","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-55","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-325"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756810004678},"e-326":{"id":"e-326","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756811004558},"e-327":{"id":"e-327","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756811004558},"e-328":{"id":"e-328","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-329"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756811004558},"e-330":{"id":"e-330","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-332":{"id":"e-332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-333"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-334":{"id":"e-334","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-335"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-335":{"id":"e-335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-334"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-336":{"id":"e-336","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-337"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-338":{"id":"e-338","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-339"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-340":{"id":"e-340","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-341"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338311},"e-341":{"id":"e-341","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-340"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338312},"e-342":{"id":"e-342","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-343"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358713},"e-343":{"id":"e-343","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-342"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358714},"e-344":{"id":"e-344","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894354535},"e-346":{"id":"e-346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-347"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894852503},"e-348":{"id":"e-348","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894943483},"e-350":{"id":"e-350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-351":{"id":"e-351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-352":{"id":"e-352","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-62","affectedElements":{},"duration":0}},"mediaQueries":["tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-62-p","smoothing":80,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1788970142603},"e-353":{"id":"e-353","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-63","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-63-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1789722760158},"e-354":{"id":"e-354","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-355"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1784644100563},"e-356":{"id":"e-356","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-357"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-357":{"id":"e-357","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-356"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-358":{"id":"e-358","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-359"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-359":{"id":"e-359","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-358"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-360":{"id":"e-360","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-361"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-361":{"id":"e-361","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-362":{"id":"e-362","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-363"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-363":{"id":"e-363","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-362"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-364":{"id":"e-364","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-365"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-365":{"id":"e-365","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-364"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-366":{"id":"e-366","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-367"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-367":{"id":"e-367","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-366"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-368":{"id":"e-368","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-369"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-369":{"id":"e-369","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-368"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-370":{"id":"e-370","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-371"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-371":{"id":"e-371","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-370"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-372":{"id":"e-372","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-373":{"id":"e-373","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-374":{"id":"e-374","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-375"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-375":{"id":"e-375","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-374"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-376":{"id":"e-376","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-377"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-377":{"id":"e-377","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-376"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-378":{"id":"e-378","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-379"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-379":{"id":"e-379","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-378"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-380":{"id":"e-380","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-381"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-381":{"id":"e-381","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-380"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-382":{"id":"e-382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-383":{"id":"e-383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-384":{"id":"e-384","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-385"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-385":{"id":"e-385","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-384"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-386":{"id":"e-386","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792143403693},"e-388":{"id":"e-388","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792144646842},"e-389":{"id":"e-389","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792406953011},"e-390":{"id":"e-390","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"SLIDE_EFFECT","instant":false,"config":{"actionListId":"slideInBottom","autoStopEventId":"e-391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":0,"direction":"BOTTOM","effectIn":true},"createdOn":1792407576931},"e-396":{"id":"e-396","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-72","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"},"targets":[{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"}],"config":[{"continuousParameterGroupId":"a-72-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792428529433},"e-398":{"id":"e-398","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-399"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792485126279},"e-400":{"id":"e-400","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-70","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-70-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487033715},"e-401":{"id":"e-401","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487214244},"e-402":{"id":"e-402","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487313748},"e-403":{"id":"e-403","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487915879},"e-404":{"id":"e-404","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792488478134},"e-405":{"id":"e-405","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-76","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-76-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":30}],"createdOn":1792493994486},"e-406":{"id":"e-406","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792583833272},"e-407":{"id":"e-407","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583940147},"e-408":{"id":"e-408","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583959514},"e-409":{"id":"e-409","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792669014788},"e-410":{"id":"e-410","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792684178623},"e-412":{"id":"e-412","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792746547632},"e-413":{"id":"e-413","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-414"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-414":{"id":"e-414","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-415":{"id":"e-415","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-416"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-416":{"id":"e-416","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-415"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-417":{"id":"e-417","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-418"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609184},"e-418":{"id":"e-418","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-417"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609186},"e-419":{"id":"e-419","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-420"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-420":{"id":"e-420","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-419"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-421":{"id":"e-421","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-422"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-422":{"id":"e-422","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-421"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-423":{"id":"e-423","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792765396560}},"actionLists":{"a-4":{"id":"a-4","title":"Hero Big Title | Fade Reveal","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n-9","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":25,"actionItems":[{"id":"a-4-n-11","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-10","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]},{"keyframe":50,"actionItems":[{"id":"a-4-n-12","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-13","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":75,"actionItems":[{"id":"a-4-n-15","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-14","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-17","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":100,"actionItems":[{"id":"a-4-n-16","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}},{"id":"a-4-n-18","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}]}],"createdOn":1755103578616},"a-11":{"id":"a-11","title":"\\"Quote\\" | Reveal On Hover","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}},{"id":"a-11-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}},{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":20,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-12":{"id":"a-12","title":"\\"Quote\\" | Hide on Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-12-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}},{"id":"a-12-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659295499},"a-13":{"id":"a-13","title":"Slider | Scroll Moving","continuousParameterGroups":[{"id":"a-13-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":0,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":-180.5,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]}]}],"createdOn":1755254411359},"a-16":{"id":"a-16","title":"Moving | Contact Bloc","continuousParameterGroups":[{"id":"a-16-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-16-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":-20,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755520603487},"a-20":{"id":"a-20","title":"Bio Members | Fade In","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"flex"}},{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755528746326},"a-18":{"id":"a-18","title":"Team Members | Hover In","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-18-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}},{"id":"a-18-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":1,"unit":""}},{"id":"a-18-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":1,"unit":""}},{"id":"a-18-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755526280358},"a-19":{"id":"a-19","title":"Team Members | Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755526280358},"a-21":{"id":"a-21","title":"Bio Members | Close Fade Out","actionItemGroups":[{"actionItems":[{"id":"a-21-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755528746326},"a-27":{"id":"a-27","title":"Menu Modal in 2","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-27-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-7","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-27-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-27-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-14","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-28":{"id":"a-28","title":"Menu Modal Out 2","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-28-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-30":{"id":"a-30","title":"(D) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-30-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":712,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-30-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-31":{"id":"a-31","title":"(D) Testimonial | View Less","actionItemGroups":[{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-31-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755852982792},"a-29":{"id":"a-29","title":"Burger Overlap","continuousParameterGroups":[{"id":"a-29-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-29-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":19,"actionItems":[{"id":"a-29-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755794506046},"a-34":{"id":"a-34","title":"Playing Lottie w/ Image","continuousParameterGroups":[{"id":"a-34-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-34-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-34-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]},{"keyframe":65,"actionItems":[{"id":"a-34-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}},{"id":"a-34-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":75,"actionItems":[{"id":"a-34-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}},{"id":"a-34-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":1,"unit":""}}]},{"keyframe":85,"actionItems":[{"id":"a-34-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":0,"unit":""}},{"id":"a-34-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-34-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":1,"unit":""}}]}]}],"createdOn":1755264981960},"a-35":{"id":"a-35","title":"100% | Mask Moving","continuousParameterGroups":[{"id":"a-35-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-35-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":100,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-36":{"id":"a-36","title":"100% | Text On Mask Moving","continuousParameterGroups":[{"id":"a-36-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-36-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":-540,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"keyframe":42,"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-36-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-36-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]}]}],"createdOn":1755871103819},"a-37":{"id":"a-37","title":"100% | Mask Moving Parallax","continuousParameterGroups":[{"id":"a-37-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-37-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":-20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":96,"actionItems":[{"id":"a-37-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-54":{"id":"a-54","title":"Lottie | Parallax 2.1","continuousParameterGroups":[{"id":"a-54-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-54-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-54-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":100}}]}]}],"createdOn":1755773678347},"a-50":{"id":"a-50","title":"Hover IN | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-50-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-51":{"id":"a-51","title":"Hover OUT | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-14":{"id":"a-14","title":"Playing Lottie","continuousParameterGroups":[{"id":"a-14-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-14-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-14-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":1,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-14-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-32":{"id":"a-32","title":"Playing Lottie without Text","continuousParameterGroups":[{"id":"a-32-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-32-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":100,"actionItems":[{"id":"a-32-n-4","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-40":{"id":"a-40","title":"Lottie | Parallax 3","continuousParameterGroups":[{"id":"a-40-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-40-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-40-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":100}}]}]}],"createdOn":1755773678347},"a-41":{"id":"a-41","title":"02 DESIGN | Content Animation 2","continuousParameterGroups":[{"id":"a-41-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":5,"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":1,"unit":""}},{"id":"a-41-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":1,"unit":""}}]},{"keyframe":8,"actionItems":[{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":0,"unit":""}},{"id":"a-41-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":0,"unit":""}}]},{"keyframe":20,"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":1,"unit":""}},{"id":"a-41-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":1,"unit":""}}]},{"keyframe":40,"actionItems":[{"id":"a-41-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":0,"unit":""}},{"id":"a-41-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}}]},{"keyframe":60,"actionItems":[{"id":"a-41-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":1,"unit":""}},{"id":"a-41-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":1,"unit":""}}]},{"keyframe":80,"actionItems":[{"id":"a-41-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":0,"unit":""}},{"id":"a-41-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}},{"id":"a-41-n-18","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-41-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":1,"unit":""}},{"id":"a-41-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":1,"unit":""}}]}]}],"createdOn":1755857273626},"a-26":{"id":"a-26","title":"Lottie | Parallax 2","continuousParameterGroups":[{"id":"a-26-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-26-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-26-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":100}}]}]}],"createdOn":1755773678347},"a-38":{"id":"a-38","title":"Hover IN | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":0,"yValue":0,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":100,"yValue":-100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-42":{"id":"a-42","title":"HERO | Title Reveal","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-5","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1000,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-8","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756213078962},"a-53":{"id":"a-53","title":"Lottie | Parallax 2.0","continuousParameterGroups":[{"id":"a-53-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-53-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-53-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":100}}]}]}],"createdOn":1755773678347},"a-59":{"id":"a-59","title":"\\"Quote\\" | Reveal On Hover Mobile","actionItemGroups":[{"actionItems":[{"id":"a-59-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]},{"actionItems":[{"id":"a-59-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-61":{"id":"a-61","title":"Lottie | Parallax D-only","continuousParameterGroups":[{"id":"a-61-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-61-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-61-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":100}}]}]}],"createdOn":1755773678347},"a-44":{"id":"a-44","title":"100% Tablet | Mask Moving","continuousParameterGroups":[{"id":"a-44-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-44-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-44-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-45":{"id":"a-45","title":"BTN | Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-45-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-46":{"id":"a-46","title":"BTN | Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-46-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-49":{"id":"a-49","title":"Hover OUT | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-49-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-49-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-52":{"id":"a-52","title":"LOADING | Intro","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-52-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-52-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-52-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-52-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-52-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-52-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-55":{"id":"a-55","title":"LOADING | Intro 2","actionItemGroups":[{"actionItems":[{"id":"a-55-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-55-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-55-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-55-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-55-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-55-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-55-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-55-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-56":{"id":"a-56","title":"LOADING | Intro 3","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-56-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-56-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-56-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-56-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-56-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-57":{"id":"a-57","title":"(T) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-57-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-57-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-57-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":792,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-57-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-58":{"id":"a-58","title":"(M) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-58-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-58-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":892,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-60":{"id":"a-60","title":"\\"Quote\\" | Reveal Hover Out Mobile","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659228000},"a-62":{"id":"a-62","title":"ENV 27 | SD","continuousParameterGroups":[{"id":"a-62-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":30,"actionItems":[{"id":"a-62-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-62-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-63":{"id":"a-63","title":"ENV 27","continuousParameterGroups":[{"id":"a-63-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-63-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-63-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-64":{"id":"a-64","title":"Fadein Scale","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":0.99,"yValue":0.99,"locked":true}},{"id":"a-64-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":200,"easing":"outQuart","duration":750,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1784299779426},"a-65":{"id":"a-65","title":"Hover IN | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-66":{"id":"a-66","title":"Hover OUT | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-67":{"id":"a-67","title":"Hero Parralax","continuousParameterGroups":[{"id":"a-67-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-67-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-67-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-69":{"id":"a-69","title":"Footer Move","continuousParameterGroups":[{"id":"a-69-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-69-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-69-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-72":{"id":"a-72","title":"Project Apparation","continuousParameterGroups":[{"id":"a-72-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-72-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-72-n-3","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":10,"unit":"px"}]}}]},{"keyframe":30,"actionItems":[{"id":"a-72-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-72-n-4","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":0,"unit":"px"}]}}]}]}],"createdOn":1792428347426},"a-73":{"id":"a-73","title":"Big Logo Footer Anim","actionItemGroups":[{"actionItems":[{"id":"a-73-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":3,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":0,"unit":""}},{"id":"a-73-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-73-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-73-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1792485129495},"a-70":{"id":"a-70","title":"Hero Parralax 2","continuousParameterGroups":[{"id":"a-70-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-70-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-70-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-75":{"id":"a-75","title":"Footer Move 2","continuousParameterGroups":[{"id":"a-75-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":60,"actionItems":[{"id":"a-75-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-150,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-76":{"id":"a-76","title":"Gradient Move","continuousParameterGroups":[{"id":"a-76-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-76-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":-50,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792493736787},"a-77":{"id":"a-77","title":"Menu Modal in 3","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-77-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-77-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-78":{"id":"a-78","title":"Menu Modal Out 3","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-78-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-78-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-79":{"id":"a-79","title":"BTN | Hover IN 2","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-79-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-80":{"id":"a-80","title":"BTN | Hover OUT 2","actionItemGroups":[{"actionItems":[{"id":"a-80-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-80-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-22":{"id":"a-22","title":"Menu Modal in","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-22-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-13","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-22-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"block"}},{"id":"a-22-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":300,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":1,"unit":""}},{"id":"a-22-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":-4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-23":{"id":"a-23","title":"Menu Modal out","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-23-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"slideInBottom":{"id":"slideInBottom","useFirstGroupAsInitialState":true,"actionItemGroups":[{"actionItems":[{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":0}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":100,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":0,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}},{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":1}}]}]}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'), kn = [{ id: "i-3369b7ea", scope: { type: "site" }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "top 60%", end: "bottom top", scrub: 0.8, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", [], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-0a46efea"], deleted: !1 }, { id: "i-c5fa3e77", scope: { type: "pages", value: ["6ad0cb2816e9afd85c684ff1", "6ad616f21f8cbecf97edd7bc", "6ad72f57e23d005096ad353f", "6ad883e4d375bd5dc8fcd9b1", "6ad887d71c76507742d263fd", "6ad88b6cba1a7277fb148e6d", "6ada10acf7b862f8202a551a", "6adb1bf31beca6c8f035e7c7"] }, triggers: [["wf:load", { control: "play", controlType: "load" }]], timelineIds: ["t-f67ae376"], deleted: !1 }, { id: "i-4d923125", scope: { type: "pages", value: ["6ad883e4d375bd5dc8fcd9b1"] }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "20% bottom", end: "bottom bottom", scrub: 1.4, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", ["section.big-padding-top-bottom"], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-5be7f1c4"], deleted: !1 }], _n = [{ id: "t-0a46efea", deleted: !1, actions: [{ id: "ta-9e398187", targets: [["wf:trigger-only", "", { relationship: "none", firstMatchOnly: !1 }]], timing: { duration: 0, position: 0, stagger: { amount: 0.3 }, ease: 29 }, tt: 2, properties: { "wf:transform": { opacity: ["30%", "100%"] } }, splitText: { type: "chars" } }], canvasDuration: 1 }, { id: "t-f67ae376", deleted: !1, actions: [{ id: "ta-72b6a8c0", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars" } }, { id: "ta-a9ce4ab1", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars", mask: "chars" } }] }, { id: "t-5be7f1c4", deleted: !1, actions: [{ id: "ta-ef2e1e28", targets: [["wf:class", ["h3.first"], { relationship: "within", filterBy: ["wf:trigger-only", ""], firstMatchOnly: !1 }]], timing: { duration: 1.233, position: 0.8220000000000001, stagger: { each: 0.12329999999999999 }, ease: 0 }, tt: 2, properties: { "wf:transform": { opacity: ["20%", "100%"] }, "wf:style": { color: ["var(--_colors---normal-blue)", "var(--_colors---dark-blue)"] } }, splitText: { type: "words" } }], canvasDuration: 4.11 }], An = {
  ix2: Rn,
  interactions: kn,
  timelines: _n
}, pe = {
  "/": { page: "6ad72f57e23d005096ad353f", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.f333faf3.85bca775f0996350.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/home-sd": { page: "6ad0cb2816e9afd85c684ff1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.f333faf3.85bca775f0996350.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`], slider: { script: "sd-slider.js", factory: 4345 } },
  "/work-v2": { page: "6ad887d71c76507742d263fd", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.e9ae7b87.bf575ff57e99e7e0.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/home-sd-v2": { page: "6ad616f21f8cbecf97edd7bc", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.f333faf3.85bca775f0996350.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/work-v1": { page: "6ad883e4d375bd5dc8fcd9b1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.df5abef7.e59d214d258d11f1.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: ["html.w-mod-js:not(.w-mod-ix3) :is(.section.big-padding-top-bottom .h3.first) {visibility: hidden !important;}", `
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/project-page": { page: "6ad88b6cba1a7277fb148e6d", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.e9ae7b87.bf575ff57e99e7e0.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/about": { page: "6adb1bf31beca6c8f035e7c7", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.5d927149.4a81b6463e391a35.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] },
  "/press": { page: "6ada10acf7b862f8202a551a", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0deddfcf011ec5b8.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.5d927149.4a81b6463e391a35.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.da781107f.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`] }
}, Mn = {
  "/sd-2026-grid-a": { page: "6ad72f57e23d005096ad353f", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0e4a7967fd438f05.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.37bcae995d8d4bea.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.ce8e94a4.e832a68c1413f730.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.c0a9eaafe.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } },
  "/work": { page: "6ad883e4d375bd5dc8fcd9b1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.c4dfe6d040dda842.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.383dfa10.8ea9146feb8ff93b.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.fb841554c.min.css"], styles: ["html.w-mod-js:not(.w-mod-ix3) :is(.section.big-padding-top-bottom .h3.first, .bloc-100.gap24.padding-right *) {visibility: hidden !important;}", `
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } },
  "/about": { page: "6adb1bf31beca6c8f035e7c7", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.c4dfe6d040dda842.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.f10943e6.5ecd2152c4a7f717.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.fb841554c.min.css"], styles: ['html.w-mod-js:not(.w-mod-ix3) :is([data-reveal-text="trigger"] [data-reveal-text="manifesto"], [data-reveal-text="trigger"] [data-reveal-text="manifesto-sd"], .bloc-100.gap24.padding-right *) {visibility: hidden !important;}', `
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`, `
.hero-motion {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.hero-motion [data-env-hero-shape] {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } },
  "/press": { page: "6ada10acf7b862f8202a551a", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.c4dfe6d040dda842.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.02b6e6fc46f470e4.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.2cf5e36d.6f9ec2fe8da15a32.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.fb841554c.min.css"], styles: [`
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } },
  "/home-sd-2026-vf": { page: "6ae06f629453db37984c27c2", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.c4dfe6d040dda842.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.bdf58efcee47c042.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.bdc15719.8c59292552e09e08.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.fb841554c.min.css"], styles: ['html.w-mod-js:not(.w-mod-ix3) :is([data-reveal-text="trigger"] [data-reveal-text="text"], .logo-client-grid-wrapper *) {visibility: hidden !important;}', `
  ::selection {
  background: #2f7fff;
  color: #fff;
}

::-moz-selection {
  background: #2f7fff;
  color: #fff;
}
  
/* lenis */
  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
/* fin lenis */
  
.project-item .btn-sd.more {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-item:hover .btn-sd.more,
.project-item:focus-within .btn-sd.more {
  opacity: 1;
  transform: translateY(0);
}

.project-item .media-project-wrap {
  overflow: hidden;
}

.project-item .cover-project {
  opacity: 1;
  transition: opacity 200ms ease;
}

.project-item:hover .cover-project,
.project-item:focus-within .cover-project{
  opacity: 0;
  transform: translateY(0);
}


.contact-item-bloc .image-contact {
  transform: scale(1);
  transition: transform 700ms cubic-bezier(.2, .7, .2, 1);
}

.contact-item-bloc:hover .image-contact,
.contact-item-bloc:focus-within .image-contact {
  transform: scale(1.025);
}
  
.link-box .dot-link {
  opacity: 0;
  width: 0%;
  transform: translateY(0px);
  transform-origin: left;
  transition: opacity 200ms ease, transform 200ms ease, width 300ms ease;
}

.link-box:hover .dot-link,
.link-box:focus-within .dot-link {
  opacity: 1;
  width: 100%;
  transform: translateY(0);
}

  
.swiper-news {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  touch-action: pan-y;
}

.swiper-news > .swiper-wrapper-news {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
  box-sizing: content-box;
  transition-property: transform;
  transition-timing-function: ease;
}

.swiper-news > .swiper-wrapper-news > .swiper-slide-news {
  position: relative;
  display: block;
  flex-shrink: 0;
  /*width: 100%;*/
  min-width: 0;
  box-sizing: border-box;
}

/* Conserve tes flèches et leur placement Webflow */
.s-nav.swiper-button-prev,
.s-nav.swiper-button-next {
  position: static;
  inset: auto;
  margin: 0;
  /*transform: none;*/
  cursor: pointer;
}

/* Masque les icônes fournies par Swiper */
.s-nav.swiper-button-prev::after,
.s-nav.swiper-button-next::after {
  content: none;
}

.s-nav.swiper-button-prev > .swiper-navigation-icon,
.s-nav.swiper-button-next > .swiper-navigation-icon {
  display: none;
}

/* Début ou fin du slider */
.s-nav.swiper-button-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.s-nav.swiper-button-lock {
  display: none;
}

  .swiper-news,
.swiper-news * {
  -webkit-user-select: none;
  user-select: none;
}

.swiper-news img,
.swiper-news video {
  -webkit-user-drag: none;
}


.h2 {
  font-size: clamp(2rem, calc(1.443rem + 2.286vw), 3.5rem);
}

.h3 {
  font-size: clamp(1.75rem, calc(1.425rem + 1.333vw), 2.625rem);
}

.h4 {
  font-size: clamp(1.5rem, calc(1.314rem + 0.762vw), 2rem);
}

.h5,
.project-title {
  font-size: clamp(1.25rem, calc(1.157rem + 0.381vw), 1.5rem);
}

.large-text {
  font-size: clamp(1.125rem, calc(1.079rem + 0.190vw), 1.25rem);
}

.navbar-logo-center {
  transition: background-color 400ms ease;
}

.navbar-logo-center .nav-link-sd {
  transition: color 400ms ease;
}

.navbar-logo-center.is-past-hero {
  background-color: #fff;
}

.navbar-logo-center.is-past-hero .nav-link-sd {
  color: var(--nav-dark-blue, #102b46);
}

.navbar-logo-center.is-past-hero .dot-link{
  background-color: var(--nav-dark-blue, #102b46);
}


/*news format*/
.swiper-news[data-env-news-layout="alternating"] {
  --env-news-big: 320px;
  --env-news-small: 240px;
  --env-news-landscape: 560px;
}

@media (max-width: 767px) {
  .swiper-news[data-env-news-layout="alternating"] {
    --env-news-big: min(68vw, 320px);
    --env-news-small: min(54vw, 240px);
    --env-news-landscape: min(76vw, 560px);
  }
}

h1, h2, h3, h4, h5, h6 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
`, `
/* Informations normales */
.project-item.home .info-project.flex:not(.hover) {
  opacity: 1;
  transform: none;
  transition: opacity 250ms ease;
}

/* Informations hover + bouton */
.project-item.home .info-project.flex.hover,
.project-item.home .btn-sd.more {
  opacity: 0;
  transform: none;
  pointer-events: none;
  transition: opacity 250ms ease;
  transition-delay: 0ms;
}

/* Aucun mouvement sur les textes */
.project-item.home .info-project.flex.hover > * {
  opacity: 1;
  transform: none;
  transition: none;
}

.project-item.home .cover-project {
  transition: opacity 250ms ease;
}

/* Masque le normal uniquement si un bloc hover existe */
.project-item.home.is-env-video-playing:has(.info-project.flex.hover)
.info-project.flex:not(.hover) {
  opacity: 0;
}

/* Affiche le hover et le bouton ensemble */
.project-item.home.is-env-video-playing .info-project.flex.hover,
.project-item.home.is-env-video-playing .btn-sd.more {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

/* Dégradé sans déplacement */
.project-item.home .overlay-project {
  opacity: 0;
  transform: none;
  transition: opacity 250ms ease;
}

.project-item.home.is-env-video-playing .overlay-project {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .project-item.home .info-project.flex,
  .project-item.home .btn-sd.more,
  .project-item.home .cover-project,
  .project-item.home .overlay-project {
    transition: none;
  }
}
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } }
}, xn = [
  `
(() => {
  let previousFocus;
  let animations = [];
  let version = 0;

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  async function toggleModal(open, trigger) {
    const modal = document.querySelector('.contact-modal-bloc');
    if (!modal) return;
    if (!open && getComputedStyle(modal).display === 'none') return;

    const currentVersion = ++version;
    const panel = modal.querySelector('.contact-form-wrapper');

    animations.forEach(animation => animation.cancel());
    animations = [];

    if (open) {
      previousFocus = trigger;
      modal.style.display = 'flex';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Contact');
      modal.setAttribute('aria-hidden', 'false');
    }

    const options = {
      duration: reduced.matches ? 0 : 250,
      easing: 'cubic-bezier(.2, .7, .2, 1)',
      fill: 'both'
    };

    animations.push(
      modal.animate(
        [{ opacity: open ? 0 : 1 }, { opacity: open ? 1 : 0 }],
        options
      )
    );

    if (panel) {
      animations.push(
        panel.animate(
          [
            { transform: open ? 'translateY(12px)' : 'translateY(0)' },
            { transform: open ? 'translateY(0)' : 'translateY(12px)' }
          ],
          options
        )
      );
    }

    if (open) {
      modal.querySelector(
        'input:not([type="hidden"]), button, [tabindex="0"]'
      )?.focus({ preventScroll: true });
    }

    await Promise.all(
      animations.map(animation => animation.finished.catch(() => {}))
    );

    if (currentVersion !== version) return;

    if (!open) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      previousFocus?.focus({ preventScroll: true });
    }

    animations.forEach(animation => animation.cancel());
    animations = [];
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-modal="contact"]');
    const close = event.target.closest(
      '.contact-modal-bloc .close-btn'
    );

    if (!trigger && !close) return;

    event.preventDefault();
    event.stopPropagation();

    toggleModal(!close, trigger);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') toggleModal(false);
  });
})();
`,
  `
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.section.mask').forEach(section => {
    if (section.dataset.maskInitialized) return;
    section.dataset.maskInitialized = 'true';

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(section, { clipPath: 'inset(0%)' });
      return;
    }

    gsap.fromTo(section,
      {
        clipPath: 'inset(15%)'
      },
      {
        clipPath: 'inset(0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 15%',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      }
    );
  });
});
`,
  `
(() => {
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

    section.style.setProperty("--blob-x", \`\${x.toFixed(2)}px\`);
    section.style.setProperty("--blob-y", \`\${y.toFixed(2)}px\`);

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
})();
`
], Cn = [
  [
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js",
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.86352264da6a98d3.js"
  ],
  [
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js",
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.c4dfe6d040dda842.js"
  ],
  [
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.181a2070a530b302.js",
    "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.471ffd7ff3ef9f20.js"
  ]
];
async function Un(t, e, { doc: n = document, events: a = window, timeout: o = 4e3 } = {}) {
  let i = !n.querySelector("[data-env-reveal],[data-env-text]"), s, r;
  const d = i ? Promise.resolve() : new Promise((f) => {
    s = f, r = setTimeout(f, o);
  }), c = () => {
    i = !0, s?.();
  };
  a.addEventListener("env:animations-ready", c, { once: !0 });
  try {
    await t(), e(), await d;
  } finally {
    clearTimeout(r), a.removeEventListener("env:animations-ready", c), i || n.documentElement.setAttribute("data-env-sd-reveal-expired", ""), n.documentElement.classList.remove("env-sd-boot");
  }
}
function Vn(t) {
  try {
    if (typeof t?.require != "function") return { compatible: !1, reason: "Webflow.require unavailable" };
    const e = t.require("ix2"), n = t.require("ix3");
    for (const [i, s] of [
      ["ix2.init", e?.init],
      ["ix2.destroy", e?.destroy],
      ["ix3.ready", n?.ready],
      ["ix3.destroy", n?.destroy],
      ["ix3.getInstance", n?.getInstance]
    ]) if (typeof s != "function") return { compatible: !1, reason: `Webflow ${i} unavailable` };
    const a = n.getInstance();
    if (!a) return { compatible: !1, pending: !0, reason: "Webflow interactions not ready" };
    for (const i of ["register", "setFeatures"])
      if (typeof a[i] != "function") return { compatible: !1, reason: `Webflow interactions.${i} unavailable` };
    const o = ["slider", "navbar", "dropdown", "tabs"].map((i) => [i, t.require(i)]).filter(([, i]) => i);
    for (const [i, s] of o)
      if (typeof s.ready != "function" || s.destroy != null && typeof s.destroy != "function") return { compatible: !1, reason: `Webflow ${i} lifecycle unavailable` };
    return { compatible: !0, ix2: e, ix3: n, native: o.map(([, i]) => i) };
  } catch {
    return { compatible: !1, reason: "Webflow runtime inspection failed" };
  }
}
async function Gn(t, { timeout: e = 4e3, pause: n = (o) => new Promise((i) => setTimeout(i, o)), now: a = Date.now } = {}) {
  const o = a();
  for (; ; ) {
    const i = Vn(t);
    if (i.compatible) return i;
    if (!i.pending || a() - o >= e) throw Error(i.reason);
    await n(50);
  }
}
function Pn(t, e = !1) {
  return Math.max(0, t) > (e ? 2 : 8);
}
function Bn(t) {
  return [t?.querySelector(".main-picto") || t?.querySelector(".nav-link-sd"), t?.querySelector(".logo-nav")];
}
function jn(t, e, n, a, o = window) {
  if (!t || !e?.matches(".main-picto")) return;
  let i = !1, s = !1;
  const r = () => n(i || s);
  e.addEventListener("pointerenter", (d) => {
    d.pointerType === "touch" || !o.matchMedia("(hover: hover) and (pointer: fine)").matches || (i = !0, r());
  }, { signal: a }), t.addEventListener("pointerleave", () => {
    i = !1, r();
  }, { signal: a }), t.addEventListener("focusin", () => {
    s = !0, r();
  }, { signal: a }), t.addEventListener("focusout", (d) => {
    d.relatedTarget && t.contains(d.relatedTarget) || (s = !1, r());
  }, { signal: a });
}
function Yn(t, e) {
  t?.querySelectorAll(".navbar-brand-three img.main-picto, .logo-mobile img.logo-nav").forEach((n) => {
    !n.matches(".main-picto") && !/sd-picto(?:-blue)?\.svg(?:[?#]|$)/i.test(n.getAttribute("src") || "") || (n.classList.add("is-env-nav-picto"), n.removeAttribute("srcset"), n.src = e);
  });
}
function zn(t, e, n) {
  if (t.matches(".main-picto")) return [
    { transform: "none", opacity: 1 },
    { transform: `translateX(${n ? 0 : -10}px)`, opacity: n ? 1 : 0 }
  ];
  const a = t.getBoundingClientRect(), o = e.getBoundingClientRect();
  return [
    { transform: `translateY(${n ? -a.height * 1.2 : 0}px)`, opacity: n ? 0 : 1 },
    { transform: `translate(${a.left - o.left}px,${a.top + a.height / 2 - o.top - o.height / 2 + (n ? 0 : a.height * 1.2)}px)`, opacity: n ? 1 : 0 }
  ];
}
function Dn(t = document) {
  if (t.querySelector("style[data-env-sd-mobile-nav]")) return;
  const e = t.createElement("style");
  e.dataset.envSdMobileNav = "", e.textContent = `.navbar-logo-center .btn-sd.nav{transition:color 400ms ease,background-color 400ms ease,border-color 400ms ease,transform 400ms cubic-bezier(.23,1,.32,1)}
.navbar-logo-center:not(.is-past-hero) .btn-sd.nav:not(:hover):not(:focus-visible){color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a));background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .btn-sd.nav:not(:hover):not(:focus-visible){color:#fff;background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center .btn-primary{transition:background-color 400ms ease,color 400ms ease,border-color 400ms ease}
.navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd){transition:color 400ms ease}
.navbar-logo-center:not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible){color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a));background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible){color:#fff}
.navbar-logo-center:not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible) :is(.btn-text-main,.btn-text-scd){color:inherit}
.see-more-bloc{cursor:pointer}
.see-more-bloc:is(:hover,:focus-within) img,a:focus-visible .see-more-bloc img{animation:env-see-more-arrow 450ms cubic-bezier(.22,1,.36,1)}
@keyframes env-see-more-arrow{0%{transform:translate(0,0);opacity:1}40%{transform:translate(10px,-10px);opacity:0}41%{transform:translate(-10px,10px);opacity:0}100%{transform:translate(0,0);opacity:1}}
@media(prefers-reduced-motion:reduce){.see-more-bloc img{animation:none!important}}
@media(max-width:767px){.project-item .btn-sd.more.mobile{opacity:1!important;visibility:visible!important;transform:none!important;pointer-events:auto!important}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-primary,.navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd){transition:none}}
.navbar-logo-center .link-box:has(a.w--current) .dot-link,.navbar-logo-center .link-box.w--current .dot-link{opacity:1;width:100%;transform:translateY(0)}
.navbar-logo-center .navbar-brand-three:has(.main-picto) .logo-nav{opacity:0}
.navbar-logo-center .navbar-brand-three .main-picto{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .main-picto{filter:brightness(0) invert(1)}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .navbar-brand-three .main-picto{transition:none}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-sd.nav{transition:none}}
@media(max-width:991px){
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(1) invert(0);transition:opacity 400ms ease,filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(0) invert(1)}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto,.navbar-logo-center .burger-menu-wrap .line-burger{transition:none}}`, t.head.append(e);
}
function _e(t) {
  let e = t.querySelector("#env-sd-page");
  if (e) return e;
  const n = t.querySelector("main.main-wrapper");
  if (!n || n.parentElement !== t.body) throw Error("Unsupported page layout");
  e = t.createElement("div"), e.id = "env-sd-page", n.before(e), e.append(n);
  const a = t.querySelector("body > .section.footer");
  return a && e.append(a), e;
}
function Ae(t, e, n, { refreshRuntime: a = !1, gsapScripts: o, profiles: i = pe, inlineScripts: s = [], persistentContact: r = !1, auditedCores: d = [], runtimeCompatible: c = !1 } = {}) {
  const f = [...t.scripts].map((l) => l.getAttribute("src")).filter((l) => l?.includes("/js/webflow.")), p = i[e], b = p || Object.values(i).find((l) => JSON.stringify(l.scripts) === JSON.stringify(f)) || (a ? pe["/home-sd"] : void 0);
  if (!b || t.documentElement.getAttribute("data-wf-site") !== b.site || !t.documentElement.getAttribute("data-wf-page") || p && t.documentElement.getAttribute("data-wf-page") !== p.page) throw Error("Uncertified page");
  const y = JSON.stringify(f) !== JSON.stringify(b.scripts);
  if (y && !a) throw Error("Webflow export changed; rebuild SD snapshots");
  const v = [...Object.values(i).map((l) => l.scripts.slice(0, 2)), ...d].some((l) => l.length === 2 && l.every((E) => f.includes(E)));
  if (y && !v) {
    const l = f.slice(0, 2), E = l.length === 2 && l.every((O) => {
      try {
        const I = new URL(O);
        return I.origin === "https://cdn.prod.website-files.com" && I.pathname.startsWith(`/${b.site}/js/webflow.schunk.`) && /\.[a-f0-9]{16}\.js$/.test(I.pathname) && !I.search && !I.hash && !I.username && !I.password;
      } catch {
        return !1;
      }
    });
    if (!c || !E) throw Error("Webflow shared core changed");
  }
  const m = f.find((l) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(l));
  if (y && !m) throw Error("Missing Webflow data bootstrap");
  if (o && [...t.scripts].map((l) => l.src).filter((l) => l.includes("/gsap/")).some((l) => !o.includes(l))) throw Error("New GSAP dependency requires native navigation");
  if (!t.querySelector(".navbar-logo-center") || !t.querySelector("body > main.main-wrapper, #env-sd-page > main.main-wrapper")) throw Error("Page needs the shared SD menu and main wrapper");
  const T = [...t.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href"));
  if (!(n || b.sheets).every((l) => T.includes(l)) || n && T.length !== n.length) throw Error("Stylesheets changed");
  for (const l of t.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(l.src)) throw Error("Remove the legacy env.js loader on pilot routes");
    if (/const brand =/.test(l.textContent) && !/ENV SD/.test(l.textContent)) throw Error("Remove the legacy brand initializer on pilot routes");
    if (!(l.src || !l.textContent.trim() || l.type === "application/ld+json") && !s.includes(l.textContent) && !/^\s*window\.ENVSDTransition\s*=\s*(['"])[a-zA-Z-]*\1\s*;?\s*$/.test(l.textContent) && !/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(l.textContent))
      throw Error("Additional inline script needs an adapter");
  }
  if (t.querySelector('[data-animation-type="spline"]') || [...t.querySelectorAll(".w-form")].some((l) => !r || !l.closest(".navbar-logo-center .contact-modal-bloc"))) throw Error("Unsupported page widget");
  return a ? { ...b, runtimeChanged: y, bootstrap: m, dataScripts: f.slice(2) } : b;
}
function Qn(t, e) {
  const n = t.querySelector(".navbar-logo-center .link-box.mobile"), a = e.querySelector(".navbar-logo-center .link-box.mobile");
  if (n && a) {
    const o = n.querySelector(".dot-link"), i = a.querySelector(".dot-link");
    o && !i ? o.remove() : !o && i && n.append(i.cloneNode(!0));
  }
  for (const [o, i] of [[".nav-link-sd", "white"], [".dot-link", "dark"], [".burger-menu-wrap .line-burger", "white"], [".menu-modal", "darker"], [".menu-modal .link-overlay", "dark"]]) {
    const s = [...t.querySelectorAll(`.navbar-logo-center ${o}`)], r = [...e.querySelectorAll(`.navbar-logo-center ${o}`)];
    if (s.length !== r.length) throw Error("Menu variants structure changed");
    s.forEach((d, c) => d.classList.toggle(i, r[c].classList.contains(i)));
  }
}
function Xn(t, e) {
  for (const n of [".navbar-brand-three", ".logo-mobile", ".menu-modal"]) {
    const a = t.querySelector(`.navbar-logo-center ${n}`), o = e.querySelector(`.navbar-logo-center ${n}`);
    if (!a && !o) continue;
    if (!a || !o) throw Error("Menu image slot changed");
    let i = [...a.querySelectorAll("img")];
    const s = [...o.querySelectorAll("img")];
    if (n !== ".logo-mobile" && i.length !== s.length) throw Error("Menu images structure changed");
    for (; i.length > s.length; ) i.pop().remove();
    for (; i.length < s.length; ) {
      const r = s[i.length].cloneNode(!0);
      a.append(r), i.push(r);
    }
    i.forEach((r, d) => {
      r.className = s[d].className;
      for (const c of ["src", "srcset", "sizes", "alt"]) {
        const f = s[d].getAttribute(c);
        f === null ? r.removeAttribute(c) : r.setAttribute(c, f);
      }
    });
  }
}
const be = { ...pe, ...Mn }, Hn = { profiles: be, inlineScripts: xn, persistentContact: !0, auditedCores: Cn }, Ee = document.createElement("style");
Ee.dataset.envAlternativeRevealGate = "";
Ee.textContent = '.navbar-logo-center [data-modal="contact"]{pointer-events:auto!important}#env-sd-page[data-env-alt-reveal-wait] :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden!important}';
document.head.append(Ee);
const Te = document.createElement("style");
Te.dataset.envNavBackground = "";
Te.textContent = `
.navbar-logo-center { background:transparent!important; transition:none!important; isolation:isolate; }
.navbar-logo-center::before { content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:#fff;opacity:0;transition:opacity 400ms ease;will-change:opacity; }
.navbar-logo-center.is-past-hero::before { opacity:1; }
@media(prefers-reduced-motion:reduce){.navbar-logo-center::before{transition:none}}
`;
document.head.append(Te);
const ie = new URL(import.meta.url);
ie.pathname = ie.pathname.replace(/[^/]*$/, "");
const Fn = () => location.pathname.replace(/\/$/, "") || "/", F = matchMedia("(prefers-reduced-motion: reduce)"), qn = () => document.querySelector("main.main-wrapper");
let me = () => {
}, te, q, ee, ge = [];
const Me = /* @__PURE__ */ new Set(), ae = () => {
  document.documentElement.classList.remove("env-sd-boot"), window.dispatchEvent(new Event("env:sd-ready"));
}, je = (t) => new Promise((e) => setTimeout(e, t));
function P(t, e = !1) {
  return !e && Me.has(t) ? Promise.resolve() : new Promise((n, a) => {
    const o = document.createElement("script");
    o.src = new URL(t, ie).href;
    const i = setTimeout(() => {
      o.remove(), a(Error(`ENV SD timeout: ${t}`));
    }, 8e3);
    o.onload = () => {
      clearTimeout(i), Me.add(t), o.remove(), n();
    }, o.onerror = () => {
      clearTimeout(i), o.remove(), a(Error(`ENV SD could not load ${t}`));
    }, o.dataset.envSdModule = t, document.head.append(o);
  });
}
function Wn(t) {
  const e = Fe();
  try {
    Qn(document, t), Xn(document, t);
    const n = [...document.querySelectorAll(".navbar-logo-center a[href]")], a = [...t.querySelectorAll(".navbar-logo-center a[href]")];
    n.forEach((i, s) => {
      a[s] && i.setAttribute("href", a[s].getAttribute("href"));
    });
    for (const i of ["lang", "dir"]) {
      const s = t.documentElement.getAttribute(i);
      s === null ? document.documentElement.removeAttribute(i) : document.documentElement.setAttribute(i, s);
    }
    document.documentElement.setAttribute("data-wf-page", t.documentElement.getAttribute("data-wf-page")), document.body.className = t.body.className;
    const o = 'meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
    document.head.querySelectorAll(o).forEach((i) => i.remove()), t.head.querySelectorAll(o).forEach((i) => document.head.append(i.cloneNode(!0))), document.head.querySelectorAll("style[data-env-sd-page-style]").forEach((i) => i.remove()), t.head.querySelectorAll("style:not([data-env-sd-mobile-nav]):not([data-env-sd-gradient-style])").forEach((i) => {
      const s = i.cloneNode(!0);
      s.dataset.envSdPageStyle = "", document.head.append(s);
    });
  } finally {
    e();
  }
}
function Ye() {
  me();
  const t = document.querySelector(".navbar-logo-center"), e = t?.querySelector(".navbar-brand-three");
  Yn(t, new URL("sd-picto-blue.svg", ie).href);
  const [n, a] = Bn(e);
  if (!t) return;
  Dn();
  const o = new AbortController();
  let i, s, r = !1, d = [], c = !1;
  function f(b = !1) {
    const y = Pn(window.scrollY, i);
    t.classList.toggle("is-past-hero", y), i = y;
    const v = y || r;
    if (!b && v === s) return;
    const m = s === void 0;
    if (s = v, !n || !a || !n.getClientRects().length) {
      d.forEach((I) => I.cancel()), d = [];
      return;
    }
    const T = [n, a], l = T.map((I) => ({ transform: getComputedStyle(I).transform, opacity: getComputedStyle(I).opacity }));
    d.forEach((I) => I.cancel());
    const E = T.map((I) => I.style.transform);
    T.forEach((I) => I.style.transform = "none");
    const O = zn(n, a, v);
    T.forEach((I, N) => I.style.transform = E[N]), d = T.map((I, N) => I.animate([l[N], O[N]], { duration: m || F.matches ? 0 : 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }));
  }
  jn(e, n, (b) => {
    r = b, f();
  }, o.signal);
  function p() {
    c || (c = !0, requestAnimationFrame(() => {
      c = !1, f();
    }));
  }
  addEventListener("scroll", p, { passive: !0, signal: o.signal }), addEventListener("resize", () => f(!0), { signal: o.signal }), [n, a].forEach((b) => b?.addEventListener("load", () => f(!0), { signal: o.signal })), f(), document.querySelectorAll(".navbar-logo-center a[href]").forEach((b) => {
    const y = new URL(b.href), v = y.origin === location.origin && y.pathname === location.pathname && !y.hash;
    b.classList.toggle("w--current", v), v ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current");
  }), me = () => {
    o.abort(), d.forEach((b) => b.cancel());
  };
}
async function ze() {
  if (document.querySelector(".section-animation-about, .section.hero-about + .section.about-second") && await P("about-reveals.js", !0), !document.querySelector("[data-env-reveal],[data-env-text]")) return;
  if (!window.gsap) throw Error("GSAP unavailable");
  let t;
  const e = new Promise((n) => {
    t = n;
  });
  window.addEventListener("env:animations-ready", t, { once: !0 });
  try {
    await P("animations.js", !0), await Promise.race([e, je(1500)]);
  } finally {
    window.removeEventListener("env:animations-ready", t);
  }
}
async function xe({ deferReveals: t = !1 } = {}) {
  Ye(), Xe(), Qe(), window.ENVVideos?.refresh(), window.gsap && window.ScrollTrigger && document.querySelectorAll("#env-sd-page .section.mask").forEach((n) => {
    n.dataset.maskInitialized || (n.dataset.maskInitialized = "true", ge.push(window.gsap.fromTo(n, { clipPath: "inset(10%)" }, { clipPath: "inset(0%)", ease: "none", scrollTrigger: { trigger: n, start: "top bottom", end: "top 15%", scrub: 0.6, invalidateOnRefresh: !0 } })));
  }), await Promise.all([
    document.querySelector(".hero-wrapper .sd-slider") ? P("hero.js", !0) : Promise.resolve(),
    document.querySelector("#env-sd-page [data-env-hero-shape]") ? P("hero-shape.js", !0) : Promise.resolve(),
    t ? Promise.resolve() : ze()
  ]);
  const e = [...document.querySelectorAll(".swiper-news[data-env-news]")];
  e.length && (te = new IntersectionObserver((n) => {
    n.some((a) => a.isIntersecting) && (te.disconnect(), P("news.js", !0).catch(console.error));
  }, { rootMargin: "600px" }), e.forEach((n) => te.observe(n)));
}
function $n() {
  window.ENVAboutReveals?.destroy(), window.ENVHeroShape?.destroy(), window.ENVOrganicBlob?.destroy(), window.ENVCTABlob?.destroy(), ge.forEach((e) => {
    e.scrollTrigger?.kill(), e.kill();
  }), ge = [], window.ScrollTrigger?.getAll().filter((e) => e.trigger?.matches?.("#env-sd-page .section.mask")).forEach((e) => e.kill()), me(), te?.disconnect(), document.querySelector(".hero-wrapper")?.__envHeroCleanup?.(), window.ENVAnimations?.destroy(), window.ENVNews?.destroy(), window.ENVNewsMarquee?.destroy();
  const t = document.querySelector("#env-sd-page");
  t && window.ENVVideos?.release(t);
}
async function Ce(t, e, n, a) {
  F.matches || (q = t.animate([{ opacity: e }, { opacity: n }], { duration: a, easing: "ease", fill: "forwards" }), await q.finished.catch(() => {
  }));
}
async function Kn() {
  if (window.ENVSD) {
    ae();
    return;
  }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error("Install the matching SD head block before enabling navigation");
  const t = We(), e = window.ENVSDTransition === "mask";
  document.documentElement.dataset.envTransitionMode = e ? "mask" : "classic";
  const n = window.Webflow, a = await Gn(n), { ix2: o, ix3: i } = a, s = { ...Hn, runtimeCompatible: a.compatible };
  let r;
  const d = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href")), c = [...document.scripts].map((l) => l.src).filter((l) => l.includes("/gsap/")), f = Ae(document, Fn(), d, { refreshRuntime: !0, gsapScripts: c, ...s });
  let p;
  const b = async (l) => !l.runtimeChanged && !l.currentExport ? An : (p ||= import("./runtime-config-Dr6I2voi.js"), (await p).runtimeConfig(l.dataScripts || l.bootstrap, l.site)), y = (l) => {
    const E = [...l.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((I) => I[1]), O = E.find((I) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(I));
    if (!(!O || Object.values(be).some((I) => !I.currentExport && I.scripts.includes(O))))
      return b({ runtimeChanged: !0, bootstrap: O, dataScripts: E.filter((I) => I.includes("/js/webflow.")).slice(2), site: f.site });
  }, v = async () => {
    if (n.require("slider")?.ready) return;
    const l = f.slider || be["/home-sd"].slider;
    await P(l.script);
    let E = !1;
    if (window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, (O) => {
      O(l.factory), E = !0;
    }]), !E || !n.require("slider")?.ready) throw Error("Audited slider factory unavailable");
  };
  r = a.native, _e(document), ee = e ? null : wn(), document.head.querySelectorAll("style").forEach((l) => {
    f.styles.includes(l.textContent) && (l.dataset.envSdPageStyle = "");
  }), await window.ENVSDLoader?.prepare?.(), await xe(), document.querySelector(".navbar-logo-center")?.setAttribute("data-env-ignore", "");
  const m = new vn({
    containers: ["#env-sd-page"],
    animationSelector: !1,
    cache: window.ENVSDPreload === !0,
    plugins: [new Sn({ animateScroll: { betweenPages: !1, samePageWithHash: !F.matches, samePage: !F.matches } })],
    linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])",
    ignoreVisit: (l, { el: E } = {}) => {
      const O = new URL(l, location.href);
      return O.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(O.pathname) || !!E?.closest("[data-no-swup]");
    }
  });
  window.ENVSD = { swup: m, status: "ready" }, window.ENVSDPreload === !0 && (window.ENVSD.stopPreload = hn(m, { warmPage: y }), b(f).catch(() => {
  })), document.documentElement.setAttribute("data-env-sd-document", crypto.randomUUID()), m.replaceContent = (l) => {
    const E = document.querySelector("#env-sd-page"), O = l.to.document?.querySelector("#env-sd-page");
    return !E || !O ? !1 : (window.ENVVideos?.stage(O), E.replaceWith(O), document.title = l.to.document.querySelector("title")?.textContent || "", !0);
  }, m.hooks.before("visit:start", (l) => {
    e && l.animation.animate && t.capture();
  }), m.hooks.replace("animation:out:await", async () => {
    e || await Ce(document.querySelector("#env-sd-page"), 1, 0, 200);
  }), m.hooks.replace("content:replace", async (l, E, O) => {
    const I = l.to.document;
    if (!I || !O) throw Error("Missing incoming page");
    const N = Ae(I, new URL(l.to.url, location.href).pathname, d, { refreshRuntime: !0, gsapScripts: c, ...s }), _ = await b(N);
    if (I.querySelectorAll(".navbar-logo-center a[href]").length !== document.querySelectorAll(".navbar-logo-center a[href]").length) throw Error("Menu structure changed");
    const S = _e(I);
    if (S.classList.add("env-sd-pending"), e && S.setAttribute("data-env-alt-reveal-wait", ""), S.querySelector(".w-slider") && !n.require("slider")?.ready) {
      await v();
      const h = n.require("slider");
      r.includes(h) || r.push(h);
    }
    window.lenis?.stop(), $n(), r.forEach((h) => h.destroy?.()), o.destroy(), i.destroy(), q?.cancel(), await O(l, E), Wn(I), ee?.prepare(), D(l), await new Promise((h) => requestAnimationFrame(h)), D(l), e && t.prepare(document.querySelector("#env-sd-page")), r.forEach((h) => h.ready?.()), o.init(_.ix2), await Promise.race([i.ready(), je(4e3).then(() => {
      throw Error("Webflow interaction restart timeout");
    })]);
    const g = i.getInstance();
    if (!g) throw Error("Webflow interactions did not restart");
    g.setFeatures({ timelineGroups: !1 }), g.register(_.interactions, _.timelines), document.documentElement.classList.add("w-mod-ix3");
  }), m.hooks.replace("animation:in:await", async (l) => {
    D(l);
    const E = document.querySelector("#env-sd-page");
    if (e) {
      await t.reveal(E);
      try {
        await ze();
      } finally {
        E.removeAttribute("data-env-alt-reveal-wait"), window.lenis?.start();
      }
    } else
      await Ce(E, 0, 1, 350), q?.cancel();
  }), m.hooks.on("page:view", async (l) => {
    try {
      await new Promise((O) => requestAnimationFrame(O)), D(l), await He({ visit: l, useMask: e, transition: t, root: document.querySelector("#env-sd-page"), lenis: window.lenis, mount: xe }), window.ScrollTrigger?.refresh(), D(l), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), ee?.commit(), !["localhost", "127.0.0.1"].includes(location.hostname) && typeof window.gtag == "function" && window.gtag("event", "page_view", { page_title: document.title, page_location: location.href });
      const E = qn();
      if (E) {
        const O = E.getAttribute("tabindex");
        E.setAttribute("tabindex", "-1"), E.focus({ preventScroll: !0 }), O === null ? E.removeAttribute("tabindex") : E.setAttribute("tabindex", O);
      }
    } catch (E) {
      document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), console.error("[ENV SD] Page initialization failed; native fallback", E), window.location.assign(l.to.url);
    }
  });
  const T = () => {
    document.querySelector("#env-sd-page")?.removeAttribute("data-env-alt-reveal-wait"), t.cleanup(), ee?.refresh(), ae(), window.lenis?.start(), q?.cancel(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending");
  };
  m.hooks.on("visit:fail", T), m.hooks.on("visit:abort", T), ae(), (async () => {
    if (!window.lenis && !F.matches)
      try {
        await P("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"), window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: !0, easing: (l) => Math.min(1, 1.001 - Math.pow(2, -10 * l)) }), requestAnimationFrame(function l(E) {
          window.lenis?.raf(E), requestAnimationFrame(l);
        });
      } catch (l) {
        console.warn("[ENV SD] Native scroll retained", l);
      }
  })();
}
const Zn = () => Kn().catch((t) => {
  console.error("[ENV SD] Native navigation retained", t), Un(() => P("env.js"), () => {
    [...document.scripts].some((e) => /const brand =/.test(e.textContent) && !/ENV SD/.test(e.textContent)) || Ye();
  }).catch((e) => console.error("[ENV SD] Widget fallback failed", e)).finally(ae);
});
window.Webflow = window.Webflow || [];
window.Webflow.push(Zn);
//# sourceMappingURL=sd-navigation-alternative.js.map
