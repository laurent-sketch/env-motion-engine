function He() {
  window.ENVOrganicBlob?.destroy();
  const n = new AbortController(), e = n.signal, t = matchMedia("(prefers-reduced-motion: reduce)"), a = matchMedia("(hover: hover) and (pointer: fine)"), i = [];
  document.querySelectorAll('#env-sd-page [data-env-blob="orange"]').forEach((s) => {
    if (s.closest("[data-env-transition-snapshot]")) return;
    const o = document.createElement("div");
    o.className = "env-blob-background", o.setAttribute("aria-hidden", "true"), o.style.cssText = "position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit";
    const d = document.createElement("canvas");
    d.style.cssText = "display:block;width:100%;height:100%;filter:blur(32px)";
    const c = d.getContext("2d");
    if (!c) return;
    o.append(d), s.prepend(o);
    let r = 1, l = 1, b = 0, E = 0, T = 0, f = !1, u = !1, m = 0, y = 0, v = 0, S = 0, N = 0, R = 0;
    function h() {
      c.clearRect(0, 0, r, l);
      const L = t.matches ? 0 : T, k = Math.min(r * 0.38, 500) * 2.1 * 1.35, M = Math.min(l * 0.49, 350) * 2.1 * 0.78, P = r * 0.23 + v + Math.sin(L * 0.29) * r * 0.13, D = l * 0.98 + S + Math.cos(L * 0.23) * l * 0.075, B = [];
      for (let U = 0; U < 10; U++) {
        const _ = U / 10 * Math.PI * 2, x = 1 + 0.55 * (0.2 * Math.sin(_ * 3 + L * 0.33) + 0.13 * Math.cos(_ * 2 - L * 0.25) + 0.07 * Math.sin(_ * 5 + L * 0.17));
        B.push({ x: P + Math.cos(_) * k * x, y: D + Math.sin(_) * M * x });
      }
      c.beginPath(), B.forEach((U, _) => {
        const x = B[(_ + 9) % 10], $ = B[(_ + 1) % 10];
        _ || c.moveTo((x.x + U.x) / 2, (x.y + U.y) / 2), c.quadraticCurveTo(U.x, U.y, (U.x + $.x) / 2, (U.y + $.y) / 2);
      }), c.closePath(), c.save(), c.translate(P, D), c.scale(k / M, 1);
      const W = c.createRadialGradient(-M * 0.12, -M * 0.2, 0, 0, 0, M * 0.94);
      [[0, 0.5], [0.28, 0.36], [0.6, 0.15], [0.82, 0.035], [1, 0]].forEach(([U, _]) => W.addColorStop(U, `rgba(238,69,43,${_})`)), c.fillStyle = W, c.fill(), c.restore();
    }
    function g() {
      if (!u || t.matches || !a.matches) {
        N = R = 0;
        return;
      }
      const L = s.getBoundingClientRect();
      N = ((m - L.left) / r - 0.5) * Math.min(r * 0.65, 760) * 0.7, R = ((y - L.top) / l - 0.5) * Math.min(l * 0.28, 180) * 0.7;
    }
    function O(L) {
      if (b = 0, !f || document.hidden) return;
      const k = Math.min((L - (E || L)) / 1e3, 0.05);
      E = L, t.matches || (T += k);
      const M = 1 - Math.exp(-k * 4.5);
      v += (N - v) * M, S += (R - S) * M, h(), t.matches || (b = requestAnimationFrame(O));
    }
    function I() {
      cancelAnimationFrame(b), b = 0, E = 0;
    }
    function p() {
      !b && f && !document.hidden && (E = 0, b = requestAnimationFrame(O));
    }
    function w() {
      u = !1, g();
    }
    const C = new ResizeObserver(() => {
      const L = s.getBoundingClientRect();
      r = Math.max(L.width, 1), l = Math.max(L.height, 1);
      const k = Math.min(devicePixelRatio || 1, 1.5);
      d.width = Math.round(r * k), d.height = Math.round(l * k), c.setTransform(k, 0, 0, k, 0, 0), g(), h();
    }), V = new IntersectionObserver((L) => {
      f = L[0].isIntersecting, f ? p() : I();
    });
    C.observe(s), V.observe(s), s.addEventListener("pointermove", (L) => {
      L.pointerType !== "touch" && (u = !0, m = L.clientX, y = L.clientY, g());
    }, { passive: !0, signal: e }), s.addEventListener("pointerleave", w, { signal: e }), window.addEventListener("scroll", g, { passive: !0, signal: e }), window.addEventListener("blur", w, { signal: e }), document.addEventListener("visibilitychange", () => document.hidden ? I() : p(), { signal: e }), t.addEventListener("change", () => {
      v = S = N = R = 0, h(), p();
    }, { signal: e }), a.addEventListener("change", w, { signal: e }), i.push(() => {
      I(), C.disconnect(), V.disconnect(), o.remove();
    });
  }), window.ENVOrganicBlob = { destroy() {
    n.abort(), i.forEach((s) => s()), window.ENVOrganicBlob === this && delete window.ENVOrganicBlob;
  } };
}
function Fe() {
  window.ENVCTABlob?.destroy();
  const n = new AbortController(), { signal: e } = n, t = matchMedia("(hover: hover) and (pointer: fine)"), a = matchMedia("(prefers-reduced-motion: reduce)");
  let i = null, s = 0, o = 0, d = 0, c = 0, r = 0;
  function l() {
    cancelAnimationFrame(r), r = 0, i?.style.removeProperty("--blob-x"), i?.style.removeProperty("--blob-y"), i = null, s = o = d = c = 0;
  }
  function b() {
    if (r = 0, !i?.isConnected) {
      l();
      return;
    }
    s += (d - s) * 0.07, o += (c - o) * 0.07, i.style.setProperty("--blob-x", `${s.toFixed(2)}px`), i.style.setProperty("--blob-y", `${o.toFixed(2)}px`), Math.abs(d - s) + Math.abs(c - o) > 0.1 && (r = requestAnimationFrame(b));
  }
  function E(u, m) {
    d = u, c = m, r || (r = requestAnimationFrame(b));
  }
  function T() {
    i && E(0, 0);
  }
  document.addEventListener("pointermove", (u) => {
    if (!t.matches || a.matches || u.pointerType === "touch") {
      l();
      return;
    }
    const m = u.target instanceof Element ? u.target.closest(".section.cta") : null;
    if (!m) {
      T();
      return;
    }
    m !== i && (l(), i = m);
    const y = i.getBoundingClientRect();
    E(
      ((u.clientX - y.left) / y.width - 0.5) * Math.min(y.width * 0.3, 320),
      ((u.clientY - y.top) / y.height - 0.5) * Math.min(y.height * 0.12, 60)
    );
  }, { passive: !0, signal: e }), document.documentElement.addEventListener("pointerleave", T, { signal: e }), window.addEventListener("blur", T, { signal: e }), window.addEventListener("scroll", T, { passive: !0, signal: e });
  const f = () => {
    (!t.matches || a.matches) && l();
  };
  t.addEventListener("change", f, { signal: e }), a.addEventListener("change", f, { signal: e }), window.ENVCTABlob = {
    destroy() {
      n.abort(), l();
    }
  };
}
async function qe({ visit: n, useMask: e, transition: t, root: a, lenis: i, mount: s }) {
  const o = e && n.animation.animate;
  o || (t.cleanup(), a?.removeAttribute("data-env-alt-reveal-wait"), i?.start()), await s({ deferReveals: o });
}
function z(n, e = window, t = e.lenis) {
  const a = !n.history.popstate && n.scroll.reset && !(n.scroll.target ?? n.to.hash), i = a ? 0 : e.scrollY, s = a ? 0 : e.scrollX;
  a && e.scrollTo({ top: i, left: s, behavior: "instant" }), t?.resize(), t?.scrollTo(i, { immediate: !0, force: !0 });
}
const Q = /* @__PURE__ */ new Set();
function We(n = document, e = window) {
  const t = [
    [".navbar-logo-center .nav-link-sd", "color"],
    [".navbar-logo-center .dot-link, .navbar-logo-center .line-burger", "backgroundColor"]
  ].flatMap(([a, i]) => [...n.querySelectorAll(a)].map((s) => ({
    el: s,
    property: i,
    before: e.getComputedStyle(s)[i],
    transition: s.style.getPropertyValue("transition"),
    priority: s.style.getPropertyPriority("transition")
  })));
  return Q.forEach((a) => a.cancel()), Q.clear(), t.forEach(({ el: a }) => a.style.setProperty("transition", "none", "important")), () => {
    const a = t.map((i) => ({ ...i, after: e.getComputedStyle(i.el)[i.property] }));
    for (const { el: i, property: s, before: o, after: d, transition: c, priority: r } of a) {
      if (o !== d && !e.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const l = i.animate([{ [s]: o }, { [s]: d }], { duration: 400, easing: "ease", fill: "both" });
        Q.add(l), l.finished.then(() => {
          l.cancel(), Q.delete(l);
        }).catch(() => Q.delete(l));
      }
      c ? i.style.setProperty("transition", c, r) : i.style.removeProperty("transition");
    }
  };
}
function $e({ doc: n = document, win: e = window } = {}) {
  let t, a, i, s, o = [], d = 0;
  const c = () => e.matchMedia("(prefers-reduced-motion: reduce)").matches, r = (f) => f.preventDefault();
  function l() {
    d++, o.forEach((f) => f.cancel()), o = [], t?.remove(), t = null, a = null, i && (s === null ? i.removeAttribute("style") : i.setAttribute("style", s), i = null), e.removeEventListener("wheel", r, !0), e.removeEventListener("touchmove", r, !0), n.documentElement.removeAttribute("data-env-transition-active");
  }
  function b() {
    l();
    const f = n.querySelector("#env-sd-page");
    if (!f || c()) return;
    const u = f.cloneNode(!0), m = [f, ...f.querySelectorAll("*")], y = [u, ...u.querySelectorAll("*")], v = [];
    y.forEach((g, O) => {
      const I = e.getComputedStyle(m[O]);
      for (let p = 0; p < I.length; p++) {
        const w = I[p];
        g.style.setProperty(w, I.getPropertyValue(w));
      }
      I.position === "sticky" && (v.push({ element: g, rect: m[O].getBoundingClientRect() }), g.style.position = "relative", g.style.inset = "auto"), g.style.setProperty("animation", "none", "important"), g.style.setProperty("transition", "none", "important"), g.classList.remove("w-slider", "w-slide", "w-slider-mask", "w-slider-nav", "w-slider-dot"), g.classList.remove("footer"), m[O].closest('[data-services="reveal"]') && g.removeAttribute("class");
    });
    const S = m.map((g, O) => ({ element: g, copy: y[O] })).filter(({ element: g }) => g.parentElement === f || g.parentElement?.matches("main.main-wrapper")).filter(({ element: g }) => !g.matches("main.main-wrapper")).map(({ element: g, copy: O }) => ({ copy: O, rect: g.getBoundingClientRect() }));
    u.querySelectorAll("script").forEach((g) => g.remove()), [u, ...u.querySelectorAll("*")].forEach((g) => {
      g.removeAttribute("id"), g.removeAttribute("data-services");
      for (const O of [...g.attributes]) (O.name.startsWith("data-env-") || O.name.startsWith("data-w-id")) && g.removeAttribute(O.name);
    });
    const N = f.querySelectorAll("canvas");
    u.querySelectorAll("canvas").forEach((g, O) => {
      const I = N[O];
      g.width = I.width, g.height = I.height;
      try {
        g.getContext("2d")?.drawImage(I, 0, 0);
      } catch {
      }
    });
    const R = f.querySelectorAll("video");
    u.querySelectorAll("video").forEach((g, O) => {
      const I = R[O], p = n.createElement("canvas");
      p.style.cssText = g.style.cssText, p.className = g.className;
      const w = e.getComputedStyle(I);
      for (const C of ["position", "top", "left", "right", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "objectFit", "objectPosition", "transform", "zIndex", "marginTop", "marginRight", "marginBottom", "marginLeft", "display", "boxSizing", "borderRadius"]) p.style[C] = w[C];
      p.width = I.videoWidth || 320, p.height = I.videoHeight || 180;
      try {
        if (I.readyState < 2) throw Error("Video frame unavailable");
        p.getContext("2d").drawImage(I, 0, 0, p.width, p.height), g.replaceWith(p);
      } catch {
        const V = I.poster || I.closest(".w-background-video")?.getAttribute("data-poster-url");
        if (V) {
          const L = n.createElement("img");
          L.src = V, L.style.cssText = p.style.cssText, L.className = g.className, g.replaceWith(L);
        } else g.remove();
      }
    }), u.style.cssText = `position:absolute;left:0;top:${-e.scrollY}px;width:100%;margin:0;background:#fff;pointer-events:none;z-index:0;`, t = n.createElement("div"), t.dataset.envTransitionSnapshot = "", t.dataset.envIgnore = "", t.setAttribute("aria-hidden", "true"), t.inert = !0, t.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:8;background:#fff;transform-origin:50% 50%;", a = n.createElement("div"), a.dataset.envTransitionShade = "", a.style.cssText = "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:1;", t.append(u, a), n.body.append(t), S.map(({ copy: g, rect: O }) => {
      const I = g.getBoundingClientRect();
      return { element: g, x: O.left - I.left, y: O.top - I.top };
    }).forEach(({ element: g, x: O, y: I }) => {
      if (Math.abs(O) < 0.1 && Math.abs(I) < 0.1) return;
      const p = g.style.transform;
      g.style.transform = `translate(${O}px,${I}px) ${p === "none" ? "" : p}`;
    }), v.forEach(({ element: g, rect: O }) => {
      const I = g.getBoundingClientRect(), p = O.left - I.left, w = O.top - I.top;
      if (Math.abs(p) < 0.1 && Math.abs(w) < 0.1) return;
      const C = g.style.transform;
      g.style.transform = `translate(${p}px,${w}px) ${C === "none" ? "" : C}`;
    }), n.documentElement.setAttribute("data-env-transition-active", ""), e.addEventListener("wheel", r, { capture: !0, passive: !1 }), e.addEventListener("touchmove", r, { capture: !0, passive: !1 });
  }
  function E(f) {
    !t || c() || (i = f, s = f.getAttribute("style"), Object.assign(f.style, { position: "relative", zIndex: "9", clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)", backgroundColor: "#fff", willChange: "clip-path" }));
  }
  async function T(f) {
    if (!t || c()) {
      l();
      return;
    }
    i || E(f);
    const u = d, m = Math.max(0, -f.getBoundingClientRect().top), y = e.innerHeight, v = `polygon(0 ${m + y}px,100% ${m + y}px,100% 100%,0 100%)`, S = `polygon(0 ${m}px,100% ${m}px,100% 100%,0 100%)`, N = { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" };
    o = [
      t.animate([{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-12vh) scale(1.04)" }], N),
      f.animate([{ clipPath: v }, { clipPath: S }], N),
      a.animate([{ opacity: 0 }, { opacity: 0.35 }], N)
    ];
    const R = n.timeline?.currentTime;
    R != null && o.forEach((h) => {
      h.startTime = R;
    }), await Promise.all(o.map((h) => h.finished.catch(() => {
    }))), u === d && l();
  }
  return { capture: b, prepare: E, reveal: T, cleanup: l };
}
const oe = /* @__PURE__ */ new WeakMap();
function le(n, e, t, a) {
  if (!n && !oe.has(e))
    return !1;
  const i = oe.get(e) ?? /* @__PURE__ */ new WeakMap();
  oe.set(e, i);
  const s = i.get(t) ?? /* @__PURE__ */ new Set();
  i.set(t, s);
  const o = s.has(a);
  return n ? s.add(a) : s.delete(a), o && n;
}
function Ke(n, e) {
  let t = n.target;
  if (t instanceof Text && (t = t.parentElement), t instanceof Element && n.currentTarget instanceof Node) {
    const a = t.closest(e);
    if (a && n.currentTarget.contains(a))
      return a;
  }
}
function Ge(n, e, t, a = {}) {
  if (Array.isArray(e)) {
    for (const f of e)
      Ge(n, f, t, a);
    return;
  }
  const i = e, { signal: s, base: o = document } = a;
  if (s?.aborted)
    return;
  const { once: d, ...c } = a, r = o instanceof Document ? o.documentElement : o, l = !!(typeof a == "object" ? a.capture : a), b = (f) => {
    const u = Ke(f, String(n));
    if (u) {
      const m = Object.assign(f, { delegateTarget: u });
      t.call(r, m), d && (r.removeEventListener(i, b, c), le(!1, r, t, E));
    }
  }, E = JSON.stringify({ selector: n, type: i, capture: l });
  le(!0, r, t, E) || r.addEventListener(i, b, c), s?.addEventListener("abort", () => {
    le(!1, r, t, E);
  });
}
function A() {
  return A = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, A.apply(null, arguments);
}
const Pe = (n, e) => String(n).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || e || "", j = ({ hash: n } = {}) => window.location.pathname + window.location.search + (n ? window.location.hash : ""), Ze = (n, e = {}) => {
  const t = A({ url: n = n || j({ hash: !0 }), random: Math.random(), source: "swup" }, e);
  window.history.pushState(t, "", n);
}, X = (n = null, e = {}) => {
  n = n || j({ hash: !0 });
  const t = A({}, window.history.state || {}, { url: n, random: Math.random(), source: "swup" }, e);
  window.history.replaceState(t, "", n);
}, Je = (n, e, t, a) => {
  const i = new AbortController();
  return a = A({}, a, { signal: i.signal }), Ge(n, e, t, a), { destroy: () => i.abort() };
};
let G = class te extends URL {
  constructor(e, t = document.baseURI) {
    super(e.toString(), t), Object.setPrototypeOf(this, te.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(e) {
    const t = e.getAttribute("href") || e.getAttribute("xlink:href") || "";
    return new te(t);
  }
  static fromUrl(e) {
    return new te(e);
  }
};
class K extends Error {
  constructor(e, t) {
    super(e), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = t.url, this.status = t.status, this.aborted = t.aborted || !1, this.timedOut = t.timedOut || !1;
  }
}
async function et(n, e = {}) {
  var t;
  n = G.fromUrl(n).url;
  const { visit: a = this.visit } = e, i = A({}, this.options.requestHeaders, e.headers), s = (t = e.timeout) != null ? t : this.options.timeout, o = new AbortController(), { signal: d } = o;
  e = A({}, e, { headers: i, signal: d });
  let c, r = !1, l = null;
  s && s > 0 && (l = setTimeout(() => {
    r = !0, o.abort("timeout");
  }, s));
  try {
    c = await this.hooks.call("fetch:request", a, { url: n, options: e }, (m, { url: y, options: v }) => fetch(y, v)), l && clearTimeout(l);
  } catch (m) {
    throw r ? (this.hooks.call("fetch:timeout", a, { url: n }), new K(`Request timed out: ${n}`, { url: n, timedOut: r })) : m?.name === "AbortError" || d.aborted ? new K(`Request aborted: ${n}`, { url: n, aborted: !0 }) : m;
  }
  const { status: b, url: E } = c, T = await c.text();
  if (b === 500) throw this.hooks.call("fetch:error", a, { status: b, response: c, url: E }), new K(`Server error: ${E}`, { status: b, url: E });
  if (!T) throw new K(`Empty response: ${E}`, { status: b, url: E });
  const { url: f } = G.fromUrl(E), u = { url: f, html: T };
  return !a.cache.write || e.method && e.method !== "GET" || n !== f || this.cache.set(u.url, u), u;
}
class tt {
  constructor(e) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = e;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const e = /* @__PURE__ */ new Map();
    return this.pages.forEach((t, a) => {
      e.set(a, A({}, t));
    }), e;
  }
  has(e) {
    return this.pages.has(this.resolve(e));
  }
  get(e) {
    const t = this.pages.get(this.resolve(e));
    return t && A({}, t);
  }
  set(e, t) {
    t = A({}, t, { url: e = this.resolve(e) }), this.pages.set(e, t), this.swup.hooks.callSync("cache:set", void 0, { page: t });
  }
  update(e, t) {
    e = this.resolve(e);
    const a = A({}, this.get(e), t, { url: e });
    this.pages.set(e, a);
  }
  delete(e) {
    this.pages.delete(this.resolve(e));
  }
  clear() {
    this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
  }
  prune(e) {
    this.pages.forEach((t, a) => {
      e(a, t) && this.delete(a);
    });
  }
  resolve(e) {
    const { url: t } = G.fromUrl(e);
    return this.swup.resolveUrl(t);
  }
}
const ce = (n, e = document) => e.querySelector(n), Ee = (n, e = document) => Array.from(e.querySelectorAll(n)), Be = () => new Promise((n) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n();
    });
  });
});
function je(n) {
  return !!n && (typeof n == "object" || typeof n == "function") && typeof n.then == "function";
}
function nt(n, e = []) {
  return new Promise((t, a) => {
    const i = n(...e);
    je(i) ? i.then(t, a) : t(i);
  });
}
function we(n, e) {
  const t = n?.closest(`[${e}]`);
  return t != null && t.hasAttribute(e) ? t?.getAttribute(e) || !0 : void 0;
}
class at {
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
    return this.selector.trim() ? Ee(this.selector) : [];
  }
  add(...e) {
    this.targets.forEach((t) => t.classList.add(...e));
  }
  remove(...e) {
    this.targets.forEach((t) => t.classList.remove(...e));
  }
  clear() {
    this.targets.forEach((e) => {
      const t = e.className.split(" ").filter((a) => this.isSwupClass(a));
      e.classList.remove(...t);
    });
  }
  isSwupClass(e) {
    return this.swupClasses.some((t) => e.startsWith(t));
  }
}
class Ye {
  constructor(e, t) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: a, from: i, hash: s, el: o, event: d } = t;
    this.id = Math.random(), this.state = 1, this.from = { url: i ?? e.location.url, hash: e.location.hash }, this.to = { url: a, hash: s }, this.containers = e.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: e.options.native, scope: e.options.animationScope, selector: e.options.animationSelector }, this.trigger = { el: o, event: d }, this.cache = { read: e.options.cache, write: e.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
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
function it(n) {
  return new Ye(this, n);
}
class st {
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
    const t = this.registry.get(e);
    if (t) return t;
    console.error(`Unknown hook '${e}'`);
  }
  clear() {
    this.registry.forEach((e) => e.clear());
  }
  on(e, t, a = {}) {
    const i = this.get(e);
    if (!i) return console.warn(`Hook '${e}' not found.`), () => {
    };
    const s = A({}, a, { id: ++this.nextHookId, hook: e, handler: t });
    return i.set(t, s), () => this.off(e, t);
  }
  before(e, t, a = {}) {
    return this.on(e, t, A({}, a, { before: !0 }));
  }
  replace(e, t, a = {}) {
    return this.on(e, t, A({}, a, { replace: !0 }));
  }
  once(e, t, a = {}) {
    return this.on(e, t, A({}, a, { once: !0 }));
  }
  off(e, t) {
    const a = this.get(e);
    a && t ? a.delete(t) || console.warn(`Handler for hook '${e}' not found.`) : a && a.clear();
  }
  async call(e, t, a, i) {
    const [s, o, d] = this.parseCallArgs(e, t, a, i), { before: c, handler: r, after: l } = this.getHandlers(e, d);
    await this.run(c, s, o);
    const [b] = await this.run(r, s, o, !0);
    return await this.run(l, s, o), this.dispatchDomEvent(e, s, o), b;
  }
  callSync(e, t, a, i) {
    const [s, o, d] = this.parseCallArgs(e, t, a, i), { before: c, handler: r, after: l } = this.getHandlers(e, d);
    this.runSync(c, s, o);
    const [b] = this.runSync(r, s, o, !0);
    return this.runSync(l, s, o), this.dispatchDomEvent(e, s, o), b;
  }
  parseCallArgs(e, t, a, i) {
    return t instanceof Ye || typeof t != "object" && typeof a != "function" ? [t, a, i] : [void 0, t, a];
  }
  async run(e, t = this.swup.visit, a, i = !1) {
    const s = [];
    for (const { hook: o, handler: d, defaultHandler: c, once: r } of e) if (t == null || !t.done) {
      r && this.off(o, d);
      try {
        const l = await nt(d, [t, a, c]);
        s.push(l);
      } catch (l) {
        if (i) throw l;
        console.error(`Error in hook '${o}':`, l);
      }
    }
    return s;
  }
  runSync(e, t = this.swup.visit, a, i = !1) {
    const s = [];
    for (const { hook: o, handler: d, defaultHandler: c, once: r } of e) if (t == null || !t.done) {
      r && this.off(o, d);
      try {
        const l = d(t, a, c);
        s.push(l), je(l) && console.warn(`Swup will not await Promises in handler for synchronous hook '${o}'.`);
      } catch (l) {
        if (i) throw l;
        console.error(`Error in hook '${o}':`, l);
      }
    }
    return s;
  }
  getHandlers(e, t) {
    const a = this.get(e);
    if (!a) return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const i = Array.from(a.values()), s = this.sortRegistrations, o = i.filter(({ before: b, replace: E }) => b && !E).sort(s), d = i.filter(({ replace: b }) => b).filter((b) => !0).sort(s), c = i.filter(({ before: b, replace: E }) => !b && !E).sort(s), r = d.length > 0;
    let l = [];
    if (t && (l = [{ id: 0, hook: e, handler: t }], r)) {
      const b = d.length - 1, { handler: E, once: T } = d[b], f = (u) => {
        const m = d[u - 1];
        return m ? (y, v) => m.handler(y, v, f(u - 1)) : t;
      };
      l = [{ id: 0, hook: e, once: T, handler: E, defaultHandler: f(b) }];
    }
    return { found: !0, before: o, handler: l, after: c, replaced: r };
  }
  sortRegistrations(e, t) {
    var a, i;
    return ((a = e.priority) != null ? a : 0) - ((i = t.priority) != null ? i : 0) || e.id - t.id || 0;
  }
  dispatchDomEvent(e, t, a) {
    if (t != null && t.done) return;
    const i = { hook: e, args: a, visit: t || this.swup.visit };
    document.dispatchEvent(new CustomEvent("swup:any", { detail: i, bubbles: !0 })), document.dispatchEvent(new CustomEvent(`swup:${e}`, { detail: i, bubbles: !0 }));
  }
  parseName(e) {
    const [t, ...a] = e.split(".");
    return [t, a.reduce((i, s) => A({}, i, { [s]: !0 }), {})];
  }
}
const ot = (n) => {
  if (n && n.charAt(0) === "#" && (n = n.substring(1)), !n) return null;
  const e = decodeURIComponent(n);
  let t = document.getElementById(n) || document.getElementById(e) || ce(`a[name='${CSS.escape(n)}']`) || ce(`a[name='${CSS.escape(e)}']`);
  return t || n !== "top" || (t = document.body), t;
}, Z = "transition", de = "animation";
async function lt({ selector: n, elements: e }) {
  if (n === !1 && !e) return;
  let t = [];
  if (e) t = Array.from(e);
  else if (n && (t = Ee(n, document.body), !t.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${n}\``);
  const a = t.map((i) => (function(s) {
    const { type: o, timeout: d, propCount: c } = (function(r) {
      const l = window.getComputedStyle(r), b = J(l, `${Z}Delay`), E = J(l, `${Z}Duration`), T = Oe(b, E), f = J(l, `${de}Delay`), u = J(l, `${de}Duration`), m = Oe(f, u), y = Math.max(T, m), v = y > 0 ? T > m ? Z : de : null;
      return { type: v, timeout: y, propCount: v ? v === Z ? E.length : u.length : 0 };
    })(s);
    return !(!o || !d) && new Promise((r) => {
      const l = `${o}end`, b = performance.now();
      let E = 0;
      const T = () => {
        s.removeEventListener(l, f), r();
      }, f = (u) => {
        u.target === s && ((performance.now() - b) / 1e3 < u.elapsedTime || ++E >= c && T());
      };
      setTimeout(() => {
        E < c && T();
      }, d + 1), s.addEventListener(l, f);
    });
  })(i)).filter((i) => i !== !1);
  a.length ? await Promise.all(a) : n && console.warn(`[swup] No CSS animation duration defined on elements matching \`${n}\``);
}
function J(n, e) {
  return (n[e] || "").split(", ");
}
function Oe(n, e) {
  for (; n.length < e.length; ) n = n.concat(n);
  return Math.max(...e.map((t, a) => Le(t) + Le(n[a])));
}
function Le(n) {
  return 1e3 * parseFloat(n);
}
function dt(n, e = {}, t = {}) {
  if (typeof n != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(n, { el: t.el, event: t.event })) return void window.location.assign(n);
  const { url: a, hash: i } = G.fromUrl(n), s = this.createVisit(A({}, t, { to: a, hash: i }));
  this.performNavigation(s, e);
}
async function rt(n, e = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return n.state = 2, void (this.onVisitEnd = () => this.performNavigation(n, e));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = n;
  const { el: t } = n.trigger;
  e.referrer = e.referrer || this.location.url, e.animate === !1 && (n.animation.animate = !1), n.animation.animate || this.classes.clear();
  const a = e.history || we(t, "data-swup-history");
  typeof a == "string" && ["push", "replace"].includes(a) && (n.history.action = a);
  const i = e.animation || we(t, "data-swup-animation");
  var s, o;
  typeof i == "string" && (n.animation.name = i), n.meta = e.meta || {}, typeof e.cache == "object" ? (n.cache.read = (s = e.cache.read) != null ? s : n.cache.read, n.cache.write = (o = e.cache.write) != null ? o : n.cache.write) : e.cache !== void 0 && (n.cache = { read: !!e.cache, write: !!e.cache }), delete e.cache;
  try {
    await this.hooks.call("visit:start", n, void 0), n.state = 3;
    const d = this.hooks.call("page:load", n, { options: e }, async (r, l) => {
      let b;
      return r.cache.read && (b = this.cache.get(r.to.url)), l.page = b || await this.fetchPage(r.to.url, l.options), l.cache = !!b, l.page;
    });
    d.then(({ html: r }) => {
      n.advance(5), n.to.html = r, n.to.document = new DOMParser().parseFromString(r, "text/html");
    });
    const c = n.to.url + n.to.hash;
    if (n.history.popstate || (n.history.action === "replace" || n.to.url === this.location.url ? X(c) : (this.currentHistoryIndex++, Ze(c, { index: this.currentHistoryIndex }))), this.location = G.fromUrl(c), n.history.popstate && this.classes.add("is-popstate"), n.animation.name && this.classes.add(`to-${Pe(n.animation.name)}`), n.animation.wait && await d, n.ignored) throw new Error(`Visit to ${n.to.url} manually ignored`);
    if (n.done || (await this.hooks.call("visit:transition", n, void 0, async () => {
      if (!n.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(n, await d);
      n.advance(4), await this.animatePageOut(n), n.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(n, await d)).finished : await this.renderPage(n, await d), await this.animatePageIn(n);
    }), n.done)) return;
    await this.hooks.call("visit:end", n, void 0, () => this.classes.clear()), n.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (d) {
    if (!d || d != null && d.aborted) return void n.advance(8);
    if (n.ignored) return void Ne.call(this, n);
    await this.hooks.call("visit:fail", n, { error: d }, (c, { error: r }) => {
      console.error(r), Ne.call(this, c);
    }), n.advance(9);
  } finally {
    delete n.to.document, this.visit === n && (this.navigating = !1);
  }
}
function Ne(n) {
  const e = n.to.url + n.to.hash;
  j() === n.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(e), { once: !0 }), window.history.back()) : window.location.assign(e);
}
const ct = async function(n) {
  await this.hooks.call("animation:out:start", n, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", n, { skip: !1 }, (e, { skip: t }) => {
    if (!t) return this.awaitAnimations({ selector: e.animation.selector });
  }), await this.hooks.call("animation:out:end", n, void 0);
}, ft = function(n) {
  var e;
  const t = n.to.document;
  if (!t) return !1;
  const a = ((e = t.querySelector("title")) == null ? void 0 : e.innerText) || "";
  document.title = a;
  const i = Ee('[data-swup-persist]:not([data-swup-persist=""])'), s = n.containers.map((o) => {
    const d = document.querySelector(o), c = t.querySelector(o);
    return d && c ? (d.replaceWith(c.cloneNode(!0)), !0) : (d || console.warn(`[swup] Container missing in current document: ${o}`), c || console.warn(`[swup] Container missing in incoming document: ${o}`), !1);
  }).filter(Boolean);
  return i.forEach((o) => {
    const d = o.getAttribute("data-swup-persist"), c = ce(`[data-swup-persist="${d}"]`);
    c && c !== o && c.replaceWith(o);
  }), s.length === n.containers.length;
}, ut = function(n) {
  const e = { behavior: "auto" }, { target: t, reset: a } = n.scroll, i = t ?? n.to.hash;
  let s = !1;
  return i && (s = this.hooks.callSync("scroll:anchor", n, { hash: i, options: e }, (o, { hash: d, options: c }) => {
    const r = this.getAnchorElement(d);
    return r && r.scrollIntoView(c), !!r;
  })), a && !s && (s = this.hooks.callSync("scroll:top", n, { options: e }, (o, { options: d }) => (window.scrollTo(A({ top: 0, left: 0 }, d)), !0))), s;
}, pt = async function(n) {
  if (n.done) return;
  const e = this.hooks.call("animation:in:await", n, { skip: !1 }, (t, { skip: a }) => {
    if (!a) return this.awaitAnimations({ selector: t.animation.selector });
  });
  await Be(), await this.hooks.call("animation:in:start", n, void 0, () => {
    this.classes.remove("is-animating");
  }), await e, await this.hooks.call("animation:in:end", n, void 0);
}, bt = async function(n, e) {
  if (n.done) return;
  n.advance(6);
  const { url: t } = e;
  this.isSameResolvedUrl(j(), t) || (X(t), this.location = G.fromUrl(t), n.to.url = this.location.url, n.to.hash = this.location.hash), await this.hooks.call("content:replace", n, { page: e }, (a, {}) => {
    if (this.classes.remove("is-leaving"), a.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(a)) throw new Error("[swup] Container mismatch, aborting");
    a.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), a.animation.name && this.classes.add(`to-${Pe(a.animation.name)}`));
  }), await this.hooks.call("content:scroll", n, void 0, () => this.scrollToContent(n)), await this.hooks.call("page:view", n, { url: this.location.url, title: document.title });
}, mt = function(n) {
  var e;
  if (e = n, !!e?.isSwupPlugin) {
    if (n.swup = this, !n._checkRequirements || n._checkRequirements()) return n._beforeMount && n._beforeMount(), n.mount(), this.plugins.push(n), this.plugins;
  } else console.error("Not a swup plugin instance", n);
};
function gt(n) {
  const e = this.findPlugin(n);
  if (e) return e.unmount(), e._afterUnmount && e._afterUnmount(), this.plugins = this.plugins.filter((t) => t !== e), this.plugins;
  console.error("No such plugin", e);
}
function yt(n) {
  return this.plugins.find((e) => typeof n == "string" ? [`Swup${n}`, n].includes(e.name) : e === n);
}
function Et(n) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), n;
  const e = this.options.resolveUrl(n);
  return e && typeof e == "string" ? e.startsWith("//") || e.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), n) : e : (console.warn("[swup] options.resolveUrl needs to return a url"), n);
}
function Tt(n, e) {
  return this.resolveUrl(n) === this.resolveUrl(e);
}
const It = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (n, { el: e } = {}) => !(e == null || !e.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (n) => n, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (n) => {
  var e;
  return ((e = n.state) == null ? void 0 : e.source) !== "swup";
}, timeout: 0 };
class vt {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(e = {}) {
    var t, a;
    this.version = "4.10.0", this.options = void 0, this.defaults = It, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = G.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = mt, this.unuse = gt, this.findPlugin = yt, this.log = () => {
    }, this.navigate = dt, this.performNavigation = rt, this.createVisit = it, this.delegateEvent = Je, this.fetchPage = et, this.awaitAnimations = lt, this.renderPage = bt, this.replaceContent = ft, this.animatePageIn = pt, this.animatePageOut = ct, this.scrollToContent = ut, this.getAnchorElement = ot, this.getCurrentUrl = j, this.resolveUrl = Et, this.isSameResolvedUrl = Tt, this.options = A({}, this.defaults, e), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new tt(this), this.classes = new at(this), this.hooks = new st(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (t = (a = window.history.state) == null ? void 0 : a.index) != null ? t : 1, this.enable();
  }
  async enable() {
    var e;
    const { linkSelector: t } = this.options;
    this.clickDelegate = this.delegateEvent(t, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((a) => this.use(a));
    for (const [a, i] of Object.entries(this.options.hooks)) {
      const [s, o] = this.hooks.parseName(a);
      this.hooks.on(s, i, o);
    }
    ((e = window.history.state) == null ? void 0 : e.source) !== "swup" && X(null, { index: this.currentHistoryIndex }), await Be(), await this.hooks.call("enable", void 0, void 0, () => {
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
  shouldIgnoreVisit(e, { el: t, event: a } = {}) {
    const { origin: i, url: s, hash: o } = G.fromUrl(e);
    return i !== window.location.origin || !(!t || !this.triggerWillOpenNewWindow(t)) || !!this.options.ignoreVisit(s + o, { el: t, event: a });
  }
  handleLinkClick(e) {
    const t = e.delegateTarget, { href: a, url: i, hash: s } = G.fromElement(t);
    if (this.shouldIgnoreVisit(a, { el: t, event: e })) return;
    if (this.navigating && i === this.visit.to.url) return void e.preventDefault();
    const o = this.createVisit({ to: i, hash: s, el: t, event: e });
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? this.hooks.callSync("link:newtab", o, { href: a }) : e.button === 0 && this.hooks.callSync("link:click", o, { el: t, event: e }, () => {
      var d;
      const c = (d = o.from.url) != null ? d : "";
      e.preventDefault(), i && i !== c ? this.isSameResolvedUrl(i, c) || this.performNavigation(o) : s ? this.hooks.callSync("link:anchor", o, { hash: s }, () => {
        X(i + s), this.scrollToContent(o);
      }) : this.hooks.callSync("link:self", o, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(o) : (X(i), this.scrollToContent(o));
      });
    });
  }
  handlePopState(e) {
    var t, a, i, s;
    const o = (t = (a = e.state) == null ? void 0 : a.url) != null ? t : window.location.href;
    if (this.options.skipPopStateHandling(e) || this.isSameResolvedUrl(j(), this.location.url)) return;
    const { url: d, hash: c } = G.fromUrl(o), r = this.createVisit({ to: d, hash: c, event: e });
    r.history.popstate = !0;
    const l = (i = (s = e.state) == null ? void 0 : s.index) != null ? i : 0;
    l && l !== this.currentHistoryIndex && (r.history.direction = l - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = l), r.animation.animate = !1, r.scroll.reset = !1, r.scroll.target = !1, this.options.animateHistoryBrowsing && !e.hasUAVisualTransition && (r.animation.animate = !0, r.scroll.reset = !0), this.hooks.callSync("history:popstate", r, { event: e }, () => {
      this.performNavigation(r);
    });
  }
  triggerWillOpenNewWindow(e) {
    return !!e.matches('[download], [target="_blank"]');
  }
}
function ht(n, { doc: e = document, win: t = window, fetchHTML: a = fetch, now: i = Date.now, ttl: s = 3e5, limit: o = 8, delay: d = 1200, warmPage: c } = {}) {
  const r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), b = new AbortController();
  let E, T = !1, f = !1;
  const u = t.navigator.connection, m = () => u?.saveData || /(^|-)2g$/.test(u?.effectiveType || "");
  function y() {
    for (const [p, w] of r) i() - w >= s && (n.cache.delete(p), r.delete(p));
    for (; r.size > o; ) {
      const p = r.keys().next().value;
      n.cache.delete(p), r.delete(p);
    }
  }
  const v = (p, { page: w }) => {
    r.delete(w.url), r.set(w.url, i()), y();
  };
  n.hooks.on("cache:set", v);
  for (const [p] of n.cache.all || []) r.set(p, i());
  y();
  function S(p) {
    if (!p || p.closest("[data-no-swup]") || p.hasAttribute("download") || p.hasAttribute("target")) return;
    const w = new URL(p.getAttribute("href"), t.location.href);
    if (!(w.origin !== t.location.origin || w.search || w.hash || w.pathname === t.location.pathname || /\.[a-z0-9]+$/i.test(w.pathname)))
      return w.pathname;
  }
  async function N(p) {
    if (y(), f || m() || n.cache.has(p)) return;
    if (l.has(p)) return l.get(p);
    const w = new AbortController(), C = t.setTimeout(() => w.abort(), 4e3), V = (async () => {
      try {
        const L = await a(p, { headers: { "X-Requested-With": "swup", Accept: "text/html" }, credentials: "same-origin", signal: w.signal, priority: "low" });
        if (!L.ok || !L.headers.get("content-type")?.includes("text/html")) return;
        const k = new URL(L.url || p, t.location.href);
        if (k.origin !== t.location.origin || k.pathname !== p || k.search) return;
        const M = await L.text();
        !f && M && M.length < 1e6 && (n.cache.set(p, { url: p, html: M }), c && Promise.resolve().then(() => c(M)).catch(() => {
        }));
      } catch {
      } finally {
        t.clearTimeout(C), l.delete(p);
      }
    })();
    return l.set(p, V), V;
  }
  function R() {
    t.clearTimeout(E), !(f || m()) && (E = t.setTimeout(async () => {
      if (T || e.hidden || f) return;
      const p = [...new Set([...e.querySelectorAll(".navbar-logo-center .nav-link-sd[href], .navbar-logo-center .link-menu-overlay[href]")].map(S).filter(Boolean))].slice(0, 3);
      for (const w of p) {
        if (T || f || e.hidden) break;
        await N(w);
      }
    }, d));
  }
  const h = () => {
    T = !0, t.clearTimeout(E);
  }, g = () => {
    T = !1, R();
  }, O = async (p) => {
    y(), p.cache.read && l.has(p.to.url) && await l.get(p.to.url);
  };
  n.hooks.on("visit:start", h), n.hooks.before("page:load", O);
  for (const p of ["page:view", "visit:fail", "visit:abort"]) n.hooks.on(p, g);
  const I = (p) => {
    if (!T && !e.hidden) {
      const w = S(p.target.closest?.(".navbar-logo-center a[href]"));
      w && N(w);
    }
  };
  return e.addEventListener("pointerover", I, { passive: !0, signal: b.signal }), e.addEventListener("focusin", I, { signal: b.signal }), R(), () => {
    f = !0, t.clearTimeout(E), b.abort(), n.hooks.off("cache:set", v), n.hooks.off("visit:start", h), n.hooks.off("page:load", O);
    for (const p of ["page:view", "visit:fail", "visit:abort"]) n.hooks.off(p, g);
  };
}
function wt({ doc: n = document, win: e = window } = {}) {
  const t = n.createElement("style");
  t.dataset.envSdGradientStyle = "", t.textContent = "#env-sd-gradient{position:absolute;pointer-events:none;z-index:0;opacity:0;transition:opacity 350ms ease,height 350ms ease}#env-sd-page[data-env-sd-gradient-page]>.main-wrapper{background-color:transparent!important}#env-sd-page [data-env-sd-gradient-source]{background-image:none!important;background-color:transparent!important}@media(prefers-reduced-motion:reduce){#env-sd-gradient{transition:none}}", n.head.append(t);
  const a = n.createElement("div");
  a.id = "env-sd-gradient", a.setAttribute("aria-hidden", "true"), n.querySelector("#env-sd-page").before(a);
  let i, s, o, d, c = !1;
  const r = () => {
    if (!i?.isConnected) return;
    const T = i.getBoundingClientRect();
    a.style.top = `${T.top + e.scrollY}px`, a.style.left = `${T.left + e.scrollX}px`, a.style.width = `${T.width}px`, a.style.height = `${T.height}px`;
  }, l = () => {
    d || (d = e.requestAnimationFrame(() => {
      d = 0, r();
    }));
  };
  function b() {
    if (o?.disconnect(), i?.removeAttribute("data-env-sd-gradient-source"), s?.removeAttribute("data-env-sd-gradient-page"), s = n.querySelector("#env-sd-page"), i = s?.querySelector(".hero-wrapper.gradient-blue"), c = !!i, !i) return;
    i.removeAttribute("data-env-sd-gradient-source");
    const T = e.getComputedStyle(i);
    for (const f of ["backgroundImage", "backgroundColor", "backgroundSize", "backgroundPosition", "backgroundRepeat", "backgroundAttachment", "backgroundBlendMode"]) a.style[f] = T[f];
    s.setAttribute("data-env-sd-gradient-page", ""), i.setAttribute("data-env-sd-gradient-source", ""), r(), e.ResizeObserver && (o = new e.ResizeObserver(l), o.observe(i));
  }
  const E = () => {
    r(), a.style.opacity = c ? "1" : "0";
  };
  return e.addEventListener("resize", l, { passive: !0 }), b(), E(), {
    prepare: b,
    commit: E,
    refresh() {
      b(), E();
    },
    destroy() {
      o?.disconnect(), e.cancelAnimationFrame(d), e.removeEventListener("resize", l), i?.removeAttribute("data-env-sd-gradient-source"), s?.removeAttribute("data-env-sd-gradient-page"), t.remove(), a.remove();
    }
  };
}
function H() {
  return H = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, H.apply(this, arguments);
}
const Se = (n) => String(n).split(".").map((e) => String(parseInt(e || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");
let Ot = class {
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
    return typeof this.requires != "object" || Object.entries(this.requires).forEach(([e, t]) => {
      if (!(function(a, i, s) {
        const o = (function(d, c) {
          var r;
          if (d === "swup") return (r = c.version) != null ? r : "";
          {
            var l;
            const b = c.findPlugin(d);
            return (l = b?.version) != null ? l : "";
          }
        })(a, s);
        return !!o && ((d, c) => c.every((r) => {
          const [, l, b] = r.match(/^([\D]+)?(.*)$/) || [];
          var E, T;
          return ((f, u) => {
            const m = { "": (y) => y === 0, ">": (y) => y > 0, ">=": (y) => y >= 0, "<": (y) => y < 0, "<=": (y) => y <= 0 };
            return (m[u] || m[""])(f);
          })((T = b, E = Se(E = d), T = Se(T), E.localeCompare(T, void 0, { numeric: !0 })), l || ">=");
        }))(o, i);
      })(e, t = Array.isArray(t) ? t : [t], this.swup)) {
        const a = `${e} ${t.join(", ")}`;
        throw new Error(`Plugin version mismatch: ${this.name} requires ${a}`);
      }
    }), !0;
  }
  on(e, t, a = {}) {
    var i;
    t = !(i = t).name.startsWith("bound ") || i.hasOwnProperty("prototype") ? t.bind(this) : t;
    const s = this.swup.hooks.on(e, t, a);
    return this.handlersToUnregister.push(s), s;
  }
  once(e, t, a = {}) {
    return this.on(e, t, H({}, a, { once: !0 }));
  }
  before(e, t, a = {}) {
    return this.on(e, t, H({}, a, { before: !0 }));
  }
  replace(e, t, a = {}) {
    return this.on(e, t, H({}, a, { replace: !0 }));
  }
  off(e, t) {
    return this.swup.hooks.off(e, t);
  }
};
const Re = (n) => typeof n == "object" && n != null && n.nodeType === 1, _e = (n, e) => (!e || n !== "hidden") && n !== "visible" && n !== "clip", re = (n, e) => {
  if (n.clientHeight < n.scrollHeight || n.clientWidth < n.scrollWidth) {
    const t = getComputedStyle(n, null);
    return _e(t.overflowY, e) || _e(t.overflowX, e) || ((a) => {
      const i = ((s) => {
        if (!s.ownerDocument || !s.ownerDocument.defaultView) return null;
        try {
          return s.ownerDocument.defaultView.frameElement;
        } catch {
          return null;
        }
      })(a);
      return !!i && (i.clientHeight < a.scrollHeight || i.clientWidth < a.scrollWidth);
    })(n);
  }
  return !1;
}, Lt = (n) => {
  const e = n.parentElement;
  return e ?? (n.getRootNode().host || null);
}, Nt = (n, e) => {
  var t, a, i, s;
  if (typeof document > "u") return [];
  const { boundary: o, skipOverflowHiddenElements: d } = e, c = typeof o == "function" ? o : (I) => I !== o;
  if (!Re(n)) throw new TypeError("Invalid target");
  const r = document.scrollingElement || document.documentElement, l = [];
  let b = n;
  for (; Re(b) && c(b); ) {
    if (b = Lt(b), b === r) {
      l.push(b);
      break;
    }
    b != null && b === document.body && re(b) && !re(document.documentElement) || b != null && re(b, d) && l.push(b);
  }
  (a = (t = window.visualViewport) == null ? void 0 : t.width) != null || innerWidth, (s = (i = window.visualViewport) == null ? void 0 : i.height) != null || innerHeight;
  const { scrollX: E, scrollY: T } = window, { height: f, width: u, top: m, right: y, bottom: v, left: S } = n.getBoundingClientRect(), { top: N, left: R } = ((I) => {
    const p = window.getComputedStyle(I);
    return { top: parseFloat(p.scrollMarginTop) || 0, right: parseFloat(p.scrollMarginRight) || 0, bottom: parseFloat(p.scrollMarginBottom) || 0, left: parseFloat(p.scrollMarginLeft) || 0 };
  })(n);
  let h = m - N, g = S - R;
  const O = [];
  for (let I = 0; I < l.length; I++) {
    const p = l[I], { height: w, width: C, top: V, right: L, bottom: k, left: M } = p.getBoundingClientRect(), P = getComputedStyle(p), D = parseInt(P.borderLeftWidth, 10), B = parseInt(P.borderTopWidth, 10), W = parseInt(P.borderRightWidth, 10), U = parseInt(P.borderBottomWidth, 10);
    let _ = 0, x = 0;
    const $ = "offsetWidth" in p ? p.offsetWidth - p.clientWidth - D - W : 0, Xe = "offsetHeight" in p ? p.offsetHeight - p.clientHeight - B - U : 0, ie = "offsetWidth" in p ? p.offsetWidth === 0 ? 0 : C / p.offsetWidth : 0, se = "offsetHeight" in p ? p.offsetHeight === 0 ? 0 : w / p.offsetHeight : 0;
    if (r === p) _ = h, x = g, _ = Math.max(0, _ + T), x = Math.max(0, x + E);
    else {
      _ = h - V - B, x = g - M - D;
      const { scrollLeft: ve, scrollTop: he } = p;
      _ = se === 0 ? 0 : Math.max(0, Math.min(he + _ / se, p.scrollHeight - w / se + Xe)), x = ie === 0 ? 0 : Math.max(0, Math.min(ve + x / ie, p.scrollWidth - C / ie + $)), h += he - _, g += ve - x;
    }
    O.push({ el: p, top: _, left: x });
  }
  return O;
};
function fe() {
  return fe = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, fe.apply(null, arguments);
}
const Ae = (n, e = document) => Array.from(e.querySelectorAll(n));
class St extends Ot {
  constructor(e = {}) {
    super(), this.name = "SwupScrollPlugin", this.requires = { swup: ">=4.2.0" }, this.defaults = { doScrollingRightAway: !1, animateScroll: { betweenPages: !0, samePageWithHash: !0, samePage: !0 }, getAnchorElement: void 0, offset: 0, scrollContainers: "[data-swup-scroll-container]", shouldResetScrollPosition: () => !0, markScrollTarget: !1, scrollFunction: void 0 }, this.options = void 0, this.cachedScrollPositions = {}, this.previousScrollRestoration = void 0, this.currentCacheKey = void 0, this.getAnchorElement = (t = "") => typeof this.options.getAnchorElement == "function" ? this.options.getAnchorElement(t) : this.swup.getAnchorElement(t), this.getOffset = (t, a, i) => {
      let s;
      return s = typeof this.options.offset == "function" ? this.options.offset(t, a, i) : this.options.offset, typeof s == "object" && typeof s.top == "number" && typeof s.left == "number" ? s : { top: parseInt(String(s ?? ""), 10) || 0, left: 0 };
    }, this.onBeforeLinkToSelf = (t) => {
      t.scroll.animate = this.shouldAnimate("samePage");
    }, this.handleScrollToTop = (t) => (this.scrollTo({ top: 0, left: 0 }, t.scroll.animate), !0), this.onBeforeLinkToAnchor = (t) => {
      t.scroll.animate = this.shouldAnimate("samePageWithHash");
    }, this.handleScrollToAnchor = (t, { hash: a }) => this.maybeScrollToAnchor(a, t.scroll.animate), this.onBeforeVisitStart = (t) => {
      t.scroll.scrolledToContent = !1, t.scroll.animate = this.shouldAnimate("betweenPages");
    }, this.onVisitStart = (t) => {
      var a;
      this.cacheScrollPositions(t.from.url), this.maybeResetScrollPositions(t);
      const i = (a = t.scroll.target) != null ? a : t.to.hash;
      t.scroll.animate && this.options.doScrollingRightAway && !i && this.doScrollingBetweenPages(t);
    }, this.handleScrollToContent = (t) => {
      t.scroll.scrolledToContent || this.doScrollingBetweenPages(t), this.restoreScrollContainers(t.to.url);
    }, this.doScrollingBetweenPages = (t) => {
      var a;
      if (t.history.popstate && !t.animation.animate) return;
      const i = (a = t.scroll.target) != null ? a : t.to.hash;
      if (i && this.maybeScrollToAnchor(i, t.scroll.animate) || !t.scroll.reset) return;
      const s = this.getCachedScrollPositions(t.to.url), { top: o = 0, left: d = 0 } = s?.window || { top: 0, left: 0 };
      requestAnimationFrame(() => this.scrollTo({ top: o, left: d }, t.scroll.animate)), t.scroll.scrolledToContent = !0;
    }, this.maybeResetScrollPositions = (t) => {
      const { popstate: a } = t.history, { url: i } = t.to, { el: s } = t.trigger;
      a || s && !this.options.shouldResetScrollPosition(s) || this.resetScrollPositions(i);
    }, this.options = fe({}, this.defaults, e);
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
  maybeScrollToAnchor(e, t = !1) {
    if (!e) return !1;
    const a = this.getAnchorElement(e);
    return a ? a instanceof Element ? (this.scrollElementIntoView(a, t), !0) : (console.warn(`Anchor target ${e} is not a DOM node`), !1) : (console.warn(`Anchor target ${e} not found`), !1);
  }
  cacheScrollPositions(e) {
    const t = this.swup.resolveUrl(e), a = Ae(this.options.scrollContainers).map((s) => ({ top: s.scrollTop, left: s.scrollLeft })), i = { window: { top: window.scrollY, left: window.scrollX }, containers: a };
    this.cachedScrollPositions[t] = i;
  }
  resetScrollPositions(e) {
    const t = this.swup.resolveUrl(e);
    delete this.cachedScrollPositions[t];
  }
  getCachedScrollPositions(e) {
    const t = this.swup.resolveUrl(e);
    return this.cachedScrollPositions[t];
  }
  restoreScrollContainers(e) {
    const t = this.getCachedScrollPositions(e);
    t && t.containers.length !== 0 && Ae(this.options.scrollContainers).forEach((a, i) => {
      const s = t.containers[i];
      s != null && (a.scrollTop = s.top, a.scrollLeft = s.left);
    });
  }
  updateScrollTarget() {
    var e;
    const { hash: t } = window.location, a = document.querySelector("[data-swup-scroll-target]");
    let i = this.getAnchorElement(t);
    i instanceof HTMLBodyElement && (i = null), a !== i && (a?.removeAttribute("data-swup-scroll-target"), (e = i) == null || e.setAttribute("data-swup-scroll-target", ""));
  }
  getRootScrollContainer() {
    return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
  }
  scrollTo(e, t = !0, a) {
    var i;
    const s = this.swup.createVisit({ to: this.swup.location.url }), { top: o = 0, left: d = 0 } = typeof e == "number" ? { top: e } : e;
    a != null || (a = this.getRootScrollContainer()), ((i = this.options.scrollFunction) != null ? i : this.applyScroll)(a, o, d, t, () => this.swup.hooks.callSync("scroll:start", s, void 0), () => this.swup.hooks.callSync("scroll:end", s, void 0));
  }
  applyScroll(e, t, a, i, s, o) {
    const d = e instanceof HTMLHtmlElement || e instanceof HTMLBodyElement ? window : e;
    s(), d.addEventListener("scrollend", o, { once: !0 }), d.addEventListener("wheel", () => {
      e.scrollTo({ top: e.scrollTop, left: e.scrollLeft, behavior: "instant" });
    }, { once: !0 }), e.scrollTo({ top: t, left: a, behavior: i ? "smooth" : "instant" });
  }
  scrollElementIntoView(e, t = !1) {
    Nt(e, {}).forEach(({ top: a, left: i, el: s }) => {
      const { top: o = 0, left: d = 0 } = this.getOffset(e, s, { top: a, left: i });
      this.scrollTo({ top: a - o, left: i - d }, t, s);
    });
  }
}
const Rt = /* @__PURE__ */ JSON.parse('{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1755082284250},"e-60":{"id":"e-60","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-354"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-66":{"id":"e-66","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1755253957866},"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1755520593128},"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530611763},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-136":{"id":"e-136","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-140":{"id":"e-140","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-141":{"id":"e-141","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067163},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067164},"e-154":{"id":"e-154","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-155":{"id":"e-155","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-156":{"id":"e-156","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755871097680},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755875094862},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755876464121},"e-159":{"id":"e-159","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755879802104},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756115114996},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629063},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629064},"e-167":{"id":"e-167","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-168":{"id":"e-168","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-169":{"id":"e-169","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-170"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-170":{"id":"e-170","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-169"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-171":{"id":"e-171","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1756212521436},"e-172":{"id":"e-172","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-14","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-14-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-173":{"id":"e-173","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756212521436},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-176"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-176":{"id":"e-176","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-177":{"id":"e-177","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-178":{"id":"e-178","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-179":{"id":"e-179","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-180"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-180":{"id":"e-180","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-181":{"id":"e-181","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-182"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-182":{"id":"e-182","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-181"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-183":{"id":"e-183","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-184"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-184":{"id":"e-184","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-183"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-185":{"id":"e-185","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-186"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-186":{"id":"e-186","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-187":{"id":"e-187","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-188"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-188":{"id":"e-188","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-187"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-189":{"id":"e-189","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-190"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-190":{"id":"e-190","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-189"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-191":{"id":"e-191","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-192":{"id":"e-192","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-199":{"id":"e-199","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-200":{"id":"e-200","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-201":{"id":"e-201","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-32","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-32-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-207":{"id":"e-207","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-208":{"id":"e-208","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-209":{"id":"e-209","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-40","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-40-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-210":{"id":"e-210","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-213":{"id":"e-213","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-214":{"id":"e-214","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-215":{"id":"e-215","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-216":{"id":"e-216","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-215"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-217":{"id":"e-217","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-218":{"id":"e-218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-220":{"id":"e-220","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-221":{"id":"e-221","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-222":{"id":"e-222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-224":{"id":"e-224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-226":{"id":"e-226","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-227":{"id":"e-227","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-228":{"id":"e-228","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-230":{"id":"e-230","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-231":{"id":"e-231","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-232":{"id":"e-232","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-235":{"id":"e-235","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-237":{"id":"e-237","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-239":{"id":"e-239","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1756213073122},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756215368838},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756217402865},"e-246":{"id":"e-246","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-247"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-248":{"id":"e-248","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-61","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-61-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756219072551},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-44","affectedElements":{},"duration":0}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-44-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756285635295},"e-252":{"id":"e-252","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":35}],"createdOn":1756289409368},"e-253":{"id":"e-253","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-255":{"id":"e-255","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-256":{"id":"e-256","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-257":{"id":"e-257","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-258"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450212},"e-258":{"id":"e-258","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-257"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450213},"e-261":{"id":"e-261","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-262":{"id":"e-262","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-261"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-263":{"id":"e-263","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-264"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-264":{"id":"e-264","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-263"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-267":{"id":"e-267","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-268":{"id":"e-268","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-269":{"id":"e-269","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-270":{"id":"e-270","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-271":{"id":"e-271","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756479519311},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756717531882},"e-274":{"id":"e-274","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756806270936},"e-322":{"id":"e-322","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756810004678},"e-323":{"id":"e-323","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756810004678},"e-324":{"id":"e-324","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-55","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-325"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756810004678},"e-326":{"id":"e-326","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756811004558},"e-327":{"id":"e-327","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756811004558},"e-328":{"id":"e-328","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-329"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756811004558},"e-330":{"id":"e-330","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-332":{"id":"e-332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-333"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-334":{"id":"e-334","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-335"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-335":{"id":"e-335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-334"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-336":{"id":"e-336","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-337"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-338":{"id":"e-338","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-339"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-340":{"id":"e-340","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-341"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338311},"e-341":{"id":"e-341","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-340"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338312},"e-342":{"id":"e-342","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-343"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358713},"e-343":{"id":"e-343","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-342"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358714},"e-344":{"id":"e-344","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894354535},"e-346":{"id":"e-346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-347"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894852503},"e-348":{"id":"e-348","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894943483},"e-350":{"id":"e-350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-351":{"id":"e-351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-352":{"id":"e-352","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-62","affectedElements":{},"duration":0}},"mediaQueries":["tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-62-p","smoothing":80,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1788970142603},"e-353":{"id":"e-353","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-63","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-63-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1789722760158},"e-354":{"id":"e-354","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-355"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1784644100563},"e-356":{"id":"e-356","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-357"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-357":{"id":"e-357","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-356"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-358":{"id":"e-358","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-359"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-359":{"id":"e-359","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-358"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-360":{"id":"e-360","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-361"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-361":{"id":"e-361","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-362":{"id":"e-362","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-363"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-363":{"id":"e-363","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-362"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-364":{"id":"e-364","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-365"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-365":{"id":"e-365","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-364"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-366":{"id":"e-366","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-367"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-367":{"id":"e-367","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-366"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-368":{"id":"e-368","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-369"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-369":{"id":"e-369","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-368"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-370":{"id":"e-370","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-371"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-371":{"id":"e-371","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-370"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-372":{"id":"e-372","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-373":{"id":"e-373","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-374":{"id":"e-374","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-375"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-375":{"id":"e-375","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-374"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-376":{"id":"e-376","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-377"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-377":{"id":"e-377","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-376"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-378":{"id":"e-378","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-379"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-379":{"id":"e-379","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-378"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-380":{"id":"e-380","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-381"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-381":{"id":"e-381","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-380"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-382":{"id":"e-382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-383":{"id":"e-383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-384":{"id":"e-384","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-385"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-385":{"id":"e-385","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-384"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-386":{"id":"e-386","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792143403693},"e-388":{"id":"e-388","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792144646842},"e-389":{"id":"e-389","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792406953011},"e-390":{"id":"e-390","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"SLIDE_EFFECT","instant":false,"config":{"actionListId":"slideInBottom","autoStopEventId":"e-391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":0,"direction":"BOTTOM","effectIn":true},"createdOn":1792407576931},"e-396":{"id":"e-396","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-72","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"},"targets":[{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"}],"config":[{"continuousParameterGroupId":"a-72-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792428529433},"e-398":{"id":"e-398","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-399"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792485126279},"e-400":{"id":"e-400","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-70","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-70-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487033715},"e-401":{"id":"e-401","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487214244},"e-402":{"id":"e-402","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487313748},"e-403":{"id":"e-403","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487915879},"e-404":{"id":"e-404","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792488478134},"e-405":{"id":"e-405","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-76","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-76-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":30}],"createdOn":1792493994486},"e-406":{"id":"e-406","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792583833272},"e-407":{"id":"e-407","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583940147},"e-408":{"id":"e-408","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583959514},"e-409":{"id":"e-409","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792669014788},"e-410":{"id":"e-410","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792684178623},"e-412":{"id":"e-412","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792746547632},"e-413":{"id":"e-413","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-414"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-414":{"id":"e-414","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-415":{"id":"e-415","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-416"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-416":{"id":"e-416","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-415"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-417":{"id":"e-417","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-418"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609184},"e-418":{"id":"e-418","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-417"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609186},"e-419":{"id":"e-419","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-420"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-420":{"id":"e-420","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-419"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-421":{"id":"e-421","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-422"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-422":{"id":"e-422","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-421"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-423":{"id":"e-423","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792765396560}},"actionLists":{"a-4":{"id":"a-4","title":"Hero Big Title | Fade Reveal","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n-9","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":25,"actionItems":[{"id":"a-4-n-11","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-10","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]},{"keyframe":50,"actionItems":[{"id":"a-4-n-12","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-13","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":75,"actionItems":[{"id":"a-4-n-15","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-14","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-17","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":100,"actionItems":[{"id":"a-4-n-16","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}},{"id":"a-4-n-18","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}]}],"createdOn":1755103578616},"a-11":{"id":"a-11","title":"\\"Quote\\" | Reveal On Hover","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}},{"id":"a-11-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}},{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":20,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-12":{"id":"a-12","title":"\\"Quote\\" | Hide on Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-12-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}},{"id":"a-12-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659295499},"a-13":{"id":"a-13","title":"Slider | Scroll Moving","continuousParameterGroups":[{"id":"a-13-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":0,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":-180.5,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]}]}],"createdOn":1755254411359},"a-16":{"id":"a-16","title":"Moving | Contact Bloc","continuousParameterGroups":[{"id":"a-16-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-16-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":-20,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755520603487},"a-20":{"id":"a-20","title":"Bio Members | Fade In","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"flex"}},{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755528746326},"a-18":{"id":"a-18","title":"Team Members | Hover In","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-18-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}},{"id":"a-18-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":1,"unit":""}},{"id":"a-18-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":1,"unit":""}},{"id":"a-18-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755526280358},"a-19":{"id":"a-19","title":"Team Members | Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755526280358},"a-21":{"id":"a-21","title":"Bio Members | Close Fade Out","actionItemGroups":[{"actionItems":[{"id":"a-21-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755528746326},"a-27":{"id":"a-27","title":"Menu Modal in 2","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-27-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-7","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-27-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-27-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-14","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-28":{"id":"a-28","title":"Menu Modal Out 2","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-28-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-30":{"id":"a-30","title":"(D) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-30-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":712,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-30-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-31":{"id":"a-31","title":"(D) Testimonial | View Less","actionItemGroups":[{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-31-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755852982792},"a-29":{"id":"a-29","title":"Burger Overlap","continuousParameterGroups":[{"id":"a-29-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-29-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":19,"actionItems":[{"id":"a-29-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755794506046},"a-34":{"id":"a-34","title":"Playing Lottie w/ Image","continuousParameterGroups":[{"id":"a-34-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-34-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-34-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]},{"keyframe":65,"actionItems":[{"id":"a-34-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}},{"id":"a-34-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":75,"actionItems":[{"id":"a-34-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}},{"id":"a-34-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":1,"unit":""}}]},{"keyframe":85,"actionItems":[{"id":"a-34-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":0,"unit":""}},{"id":"a-34-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-34-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":1,"unit":""}}]}]}],"createdOn":1755264981960},"a-35":{"id":"a-35","title":"100% | Mask Moving","continuousParameterGroups":[{"id":"a-35-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-35-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":100,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-36":{"id":"a-36","title":"100% | Text On Mask Moving","continuousParameterGroups":[{"id":"a-36-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-36-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":-540,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"keyframe":42,"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-36-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-36-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]}]}],"createdOn":1755871103819},"a-37":{"id":"a-37","title":"100% | Mask Moving Parallax","continuousParameterGroups":[{"id":"a-37-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-37-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":-20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":96,"actionItems":[{"id":"a-37-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-54":{"id":"a-54","title":"Lottie | Parallax 2.1","continuousParameterGroups":[{"id":"a-54-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-54-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-54-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":100}}]}]}],"createdOn":1755773678347},"a-50":{"id":"a-50","title":"Hover IN | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-50-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-51":{"id":"a-51","title":"Hover OUT | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-14":{"id":"a-14","title":"Playing Lottie","continuousParameterGroups":[{"id":"a-14-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-14-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-14-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":1,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-14-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-32":{"id":"a-32","title":"Playing Lottie without Text","continuousParameterGroups":[{"id":"a-32-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-32-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":100,"actionItems":[{"id":"a-32-n-4","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-40":{"id":"a-40","title":"Lottie | Parallax 3","continuousParameterGroups":[{"id":"a-40-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-40-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-40-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":100}}]}]}],"createdOn":1755773678347},"a-41":{"id":"a-41","title":"02 DESIGN | Content Animation 2","continuousParameterGroups":[{"id":"a-41-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":5,"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":1,"unit":""}},{"id":"a-41-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":1,"unit":""}}]},{"keyframe":8,"actionItems":[{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":0,"unit":""}},{"id":"a-41-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":0,"unit":""}}]},{"keyframe":20,"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":1,"unit":""}},{"id":"a-41-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":1,"unit":""}}]},{"keyframe":40,"actionItems":[{"id":"a-41-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":0,"unit":""}},{"id":"a-41-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}}]},{"keyframe":60,"actionItems":[{"id":"a-41-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":1,"unit":""}},{"id":"a-41-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":1,"unit":""}}]},{"keyframe":80,"actionItems":[{"id":"a-41-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":0,"unit":""}},{"id":"a-41-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}},{"id":"a-41-n-18","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-41-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":1,"unit":""}},{"id":"a-41-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":1,"unit":""}}]}]}],"createdOn":1755857273626},"a-26":{"id":"a-26","title":"Lottie | Parallax 2","continuousParameterGroups":[{"id":"a-26-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-26-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-26-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":100}}]}]}],"createdOn":1755773678347},"a-38":{"id":"a-38","title":"Hover IN | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":0,"yValue":0,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":100,"yValue":-100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-42":{"id":"a-42","title":"HERO | Title Reveal","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-5","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1000,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-8","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756213078962},"a-53":{"id":"a-53","title":"Lottie | Parallax 2.0","continuousParameterGroups":[{"id":"a-53-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-53-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-53-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":100}}]}]}],"createdOn":1755773678347},"a-59":{"id":"a-59","title":"\\"Quote\\" | Reveal On Hover Mobile","actionItemGroups":[{"actionItems":[{"id":"a-59-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]},{"actionItems":[{"id":"a-59-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-61":{"id":"a-61","title":"Lottie | Parallax D-only","continuousParameterGroups":[{"id":"a-61-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-61-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-61-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":100}}]}]}],"createdOn":1755773678347},"a-44":{"id":"a-44","title":"100% Tablet | Mask Moving","continuousParameterGroups":[{"id":"a-44-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-44-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-44-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-45":{"id":"a-45","title":"BTN | Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-45-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-46":{"id":"a-46","title":"BTN | Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-46-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-49":{"id":"a-49","title":"Hover OUT | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-49-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-49-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-52":{"id":"a-52","title":"LOADING | Intro","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-52-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-52-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-52-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-52-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-52-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-52-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-55":{"id":"a-55","title":"LOADING | Intro 2","actionItemGroups":[{"actionItems":[{"id":"a-55-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-55-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-55-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-55-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-55-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-55-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-55-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-55-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-56":{"id":"a-56","title":"LOADING | Intro 3","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-56-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-56-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-56-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-56-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-56-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-57":{"id":"a-57","title":"(T) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-57-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-57-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-57-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":792,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-57-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-58":{"id":"a-58","title":"(M) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-58-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-58-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":892,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-60":{"id":"a-60","title":"\\"Quote\\" | Reveal Hover Out Mobile","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659228000},"a-62":{"id":"a-62","title":"ENV 27 | SD","continuousParameterGroups":[{"id":"a-62-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":30,"actionItems":[{"id":"a-62-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-62-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-63":{"id":"a-63","title":"ENV 27","continuousParameterGroups":[{"id":"a-63-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-63-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-63-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-64":{"id":"a-64","title":"Fadein Scale","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":0.99,"yValue":0.99,"locked":true}},{"id":"a-64-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":200,"easing":"outQuart","duration":750,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1784299779426},"a-65":{"id":"a-65","title":"Hover IN | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-66":{"id":"a-66","title":"Hover OUT | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-67":{"id":"a-67","title":"Hero Parralax","continuousParameterGroups":[{"id":"a-67-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-67-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-67-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-69":{"id":"a-69","title":"Footer Move","continuousParameterGroups":[{"id":"a-69-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-69-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-69-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-72":{"id":"a-72","title":"Project Apparation","continuousParameterGroups":[{"id":"a-72-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-72-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-72-n-3","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":10,"unit":"px"}]}}]},{"keyframe":30,"actionItems":[{"id":"a-72-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-72-n-4","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":0,"unit":"px"}]}}]}]}],"createdOn":1792428347426},"a-73":{"id":"a-73","title":"Big Logo Footer Anim","actionItemGroups":[{"actionItems":[{"id":"a-73-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":3,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":0,"unit":""}},{"id":"a-73-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-73-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-73-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1792485129495},"a-70":{"id":"a-70","title":"Hero Parralax 2","continuousParameterGroups":[{"id":"a-70-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-70-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-70-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-75":{"id":"a-75","title":"Footer Move 2","continuousParameterGroups":[{"id":"a-75-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":60,"actionItems":[{"id":"a-75-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-150,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-76":{"id":"a-76","title":"Gradient Move","continuousParameterGroups":[{"id":"a-76-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-76-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":-50,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792493736787},"a-77":{"id":"a-77","title":"Menu Modal in 3","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-77-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-77-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-78":{"id":"a-78","title":"Menu Modal Out 3","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-78-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-78-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-79":{"id":"a-79","title":"BTN | Hover IN 2","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-79-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-80":{"id":"a-80","title":"BTN | Hover OUT 2","actionItemGroups":[{"actionItems":[{"id":"a-80-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-80-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-22":{"id":"a-22","title":"Menu Modal in","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-22-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-13","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-22-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"block"}},{"id":"a-22-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":300,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":1,"unit":""}},{"id":"a-22-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":-4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-23":{"id":"a-23","title":"Menu Modal out","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-23-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"slideInBottom":{"id":"slideInBottom","useFirstGroupAsInitialState":true,"actionItemGroups":[{"actionItems":[{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":0}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":100,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":0,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}},{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":1}}]}]}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'), _t = [{ id: "i-3369b7ea", scope: { type: "site" }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "top 60%", end: "bottom top", scrub: 0.8, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", [], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-0a46efea"], deleted: !1 }, { id: "i-c5fa3e77", scope: { type: "pages", value: ["6ad0cb2816e9afd85c684ff1", "6ad616f21f8cbecf97edd7bc", "6ad72f57e23d005096ad353f", "6ad883e4d375bd5dc8fcd9b1", "6ad887d71c76507742d263fd", "6ad88b6cba1a7277fb148e6d", "6ada10acf7b862f8202a551a", "6adb1bf31beca6c8f035e7c7"] }, triggers: [["wf:load", { control: "play", controlType: "load" }]], timelineIds: ["t-f67ae376"], deleted: !1 }, { id: "i-4d923125", scope: { type: "pages", value: ["6ad883e4d375bd5dc8fcd9b1"] }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "20% bottom", end: "bottom bottom", scrub: 1.4, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", ["section.big-padding-top-bottom"], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-5be7f1c4"], deleted: !1 }], At = [{ id: "t-0a46efea", deleted: !1, actions: [{ id: "ta-9e398187", targets: [["wf:trigger-only", "", { relationship: "none", firstMatchOnly: !1 }]], timing: { duration: 0, position: 0, stagger: { amount: 0.3 }, ease: 29 }, tt: 2, properties: { "wf:transform": { opacity: ["30%", "100%"] } }, splitText: { type: "chars" } }], canvasDuration: 1 }, { id: "t-f67ae376", deleted: !1, actions: [{ id: "ta-72b6a8c0", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars" } }, { id: "ta-a9ce4ab1", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars", mask: "chars" } }] }, { id: "t-5be7f1c4", deleted: !1, actions: [{ id: "ta-ef2e1e28", targets: [["wf:class", ["h3.first"], { relationship: "within", filterBy: ["wf:trigger-only", ""], firstMatchOnly: !1 }]], timing: { duration: 1.233, position: 0.8220000000000001, stagger: { each: 0.12329999999999999 }, ease: 0 }, tt: 2, properties: { "wf:transform": { opacity: ["20%", "100%"] }, "wf:style": { color: ["var(--_colors---normal-blue)", "var(--_colors---dark-blue)"] } }, splitText: { type: "words" } }], canvasDuration: 4.11 }], kt = {
  ix2: Rt,
  interactions: _t,
  timelines: At
}, ue = {
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
}, Mt = {
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
  "/work": { page: "6ad883e4d375bd5dc8fcd9b1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0e4a7967fd438f05.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.3d072d11.8ad687695e28e287.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.c0a9eaafe.min.css"], styles: ["html.w-mod-js:not(.w-mod-ix3) :is(.section.big-padding-top-bottom .h3.first) {visibility: hidden !important;}", `
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
  "/about": { page: "6adb1bf31beca6c8f035e7c7", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0e4a7967fd438f05.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.4877934d.acdb3612be021a49.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.c0a9eaafe.min.css"], styles: ["html.w-mod-js:not(.w-mod-ix3) :is(.hero-wrapper.auto.gradient-blue .quote-about) {visibility: hidden !important;}", `
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
  "/press": { page: "6ada10acf7b862f8202a551a", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.0e4a7967fd438f05.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.37bcae995d8d4bea.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.cf680847.62bb2cda22aeca7e.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/saiddifferently-2026.webflow.shared.c0a9eaafe.min.css"], styles: [`
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
`], currentExport: !0, slider: { script: "sd-slider-current.js", factory: 4345 } }
}, Ct = [
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
];
async function Ut(n, e, { doc: t = document, events: a = window, timeout: i = 4e3 } = {}) {
  let s = !t.querySelector("[data-env-reveal],[data-env-text]"), o, d;
  const c = s ? Promise.resolve() : new Promise((l) => {
    o = l, d = setTimeout(l, i);
  }), r = () => {
    s = !0, o?.();
  };
  a.addEventListener("env:animations-ready", r, { once: !0 });
  try {
    await n(), e(), await c;
  } finally {
    clearTimeout(d), a.removeEventListener("env:animations-ready", r), s || t.documentElement.setAttribute("data-env-sd-reveal-expired", ""), t.documentElement.classList.remove("env-sd-boot");
  }
}
function xt(n = document) {
  if (n.querySelector("style[data-env-sd-mobile-nav]")) return;
  const e = n.createElement("style");
  e.dataset.envSdMobileNav = "", e.textContent = `@media(max-width:991px){
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .burger-menu-wrap .line-burger{transition:none}}`, n.head.append(e);
}
function ke(n) {
  let e = n.querySelector("#env-sd-page");
  if (e) return e;
  const t = n.querySelector("main.main-wrapper");
  if (!t || t.parentElement !== n.body) throw Error("Unsupported page layout");
  e = n.createElement("div"), e.id = "env-sd-page", t.before(e), e.append(t);
  const a = n.querySelector("body > .section.footer");
  return a && e.append(a), e;
}
function Me(n, e, t, { refreshRuntime: a = !1, gsapScripts: i, profiles: s = ue, inlineScripts: o = [], persistentContact: d = !1 } = {}) {
  const c = [...n.scripts].map((f) => f.getAttribute("src")).filter((f) => f?.includes("/js/webflow.")), r = s[e], l = r || Object.values(s).find((f) => JSON.stringify(f.scripts) === JSON.stringify(c)) || (a ? ue["/home-sd"] : void 0);
  if (!l || n.documentElement.getAttribute("data-wf-site") !== l.site || !n.documentElement.getAttribute("data-wf-page") || r && n.documentElement.getAttribute("data-wf-page") !== r.page) throw Error("Uncertified page");
  const b = JSON.stringify(c) !== JSON.stringify(l.scripts);
  if (b && !a) throw Error("Webflow export changed; rebuild SD snapshots");
  if (b && !Object.values(s).some((f) => f.scripts.slice(0, 2).every((u) => c.includes(u)))) throw Error("Webflow shared core changed");
  const E = c.find((f) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(f));
  if (b && !E) throw Error("Missing Webflow data bootstrap");
  if (i && [...n.scripts].map((f) => f.src).filter((f) => f.includes("/gsap/")).some((f) => !i.includes(f))) throw Error("New GSAP dependency requires native navigation");
  if (!n.querySelector(".navbar-logo-center") || !n.querySelector("body > main.main-wrapper, #env-sd-page > main.main-wrapper")) throw Error("Page needs the shared SD menu and main wrapper");
  const T = [...n.querySelectorAll('link[rel="stylesheet"]')].map((f) => f.getAttribute("href"));
  if (!(t || l.sheets).every((f) => T.includes(f)) || t && T.length !== t.length) throw Error("Stylesheets changed");
  for (const f of n.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(f.src)) throw Error("Remove the legacy env.js loader on pilot routes");
    if (/const brand =/.test(f.textContent) && !/ENV SD/.test(f.textContent)) throw Error("Remove the legacy brand initializer on pilot routes");
    if (!(f.src || !f.textContent.trim() || f.type === "application/ld+json") && !o.includes(f.textContent) && !/^\s*window\.ENVSDTransition\s*=\s*(['"])[a-zA-Z-]*\1\s*;?\s*$/.test(f.textContent) && !/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(f.textContent))
      throw Error("Additional inline script needs an adapter");
  }
  if (n.querySelector('[data-animation-type="spline"]') || [...n.querySelectorAll(".w-form")].some((f) => !d || !f.closest(".navbar-logo-center .contact-modal-bloc"))) throw Error("Unsupported page widget");
  return a ? { ...l, runtimeChanged: b, bootstrap: E, dataScripts: c.slice(2) } : l;
}
function Vt(n, e) {
  const t = n.querySelector(".navbar-logo-center .link-box.mobile"), a = e.querySelector(".navbar-logo-center .link-box.mobile");
  if (t && a) {
    const i = t.querySelector(".dot-link"), s = a.querySelector(".dot-link");
    i && !s ? i.remove() : !i && s && t.append(s.cloneNode(!0));
  }
  for (const [i, s] of [[".nav-link-sd", "white"], [".dot-link", "dark"], [".burger-menu-wrap .line-burger", "white"], [".menu-modal", "darker"], [".menu-modal .link-overlay", "dark"]]) {
    const o = [...n.querySelectorAll(`.navbar-logo-center ${i}`)], d = [...e.querySelectorAll(`.navbar-logo-center ${i}`)];
    if (o.length !== d.length) throw Error("Menu variants structure changed");
    o.forEach((c, r) => c.classList.toggle(s, d[r].classList.contains(s)));
  }
}
function Gt(n, e) {
  for (const t of [".navbar-brand-three", ".logo-mobile", ".menu-modal"]) {
    const a = n.querySelector(`.navbar-logo-center ${t}`), i = e.querySelector(`.navbar-logo-center ${t}`);
    if (!a && !i) continue;
    if (!a || !i) throw Error("Menu image slot changed");
    let s = [...a.querySelectorAll("img")];
    const o = [...i.querySelectorAll("img")];
    if (t !== ".logo-mobile" && s.length !== o.length) throw Error("Menu images structure changed");
    for (; s.length > o.length; ) s.pop().remove();
    for (; s.length < o.length; ) {
      const d = o[s.length].cloneNode(!0);
      a.append(d), s.push(d);
    }
    s.forEach((d, c) => {
      d.className = o[c].className;
      for (const r of ["src", "srcset", "sizes", "alt"]) {
        const l = o[c].getAttribute(r);
        l === null ? d.removeAttribute(r) : d.setAttribute(r, l);
      }
    });
  }
}
const pe = { ...ue, ...Mt }, Ce = { profiles: pe, inlineScripts: Ct, persistentContact: !0 }, Te = document.createElement("style");
Te.dataset.envAlternativeRevealGate = "";
Te.textContent = '.navbar-logo-center [data-modal="contact"]{pointer-events:auto!important}#env-sd-page[data-env-alt-reveal-wait] :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden!important}';
document.head.append(Te);
const Ie = document.createElement("style");
Ie.dataset.envNavBackground = "";
Ie.textContent = `
.navbar-logo-center { background:transparent!important; transition:none!important; isolation:isolate; }
.navbar-logo-center::before { content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:#fff;opacity:0;transition:opacity 400ms ease;will-change:opacity; }
.navbar-logo-center.is-past-hero::before { opacity:1; }
@media(prefers-reduced-motion:reduce){.navbar-logo-center::before{transition:none}}
`;
document.head.append(Ie);
const be = new URL(import.meta.url);
be.pathname = be.pathname.replace(/[^/]*$/, "");
const me = () => location.pathname.replace(/\/$/, "") || "/", F = matchMedia("(prefers-reduced-motion: reduce)"), Pt = () => document.querySelector("main.main-wrapper");
let ge = () => {
}, ne, q, ee, ye = [];
const Ue = /* @__PURE__ */ new Set(), ae = () => {
  document.documentElement.classList.remove("env-sd-boot"), window.dispatchEvent(new Event("env:sd-ready"));
}, De = (n) => new Promise((e) => setTimeout(e, n));
function Y(n, e = !1) {
  return !e && Ue.has(n) ? Promise.resolve() : new Promise((t, a) => {
    const i = document.createElement("script");
    i.src = new URL(n, be).href;
    const s = setTimeout(() => {
      i.remove(), a(Error(`ENV SD timeout: ${n}`));
    }, 8e3);
    i.onload = () => {
      clearTimeout(s), Ue.add(n), i.remove(), t();
    }, i.onerror = () => {
      clearTimeout(s), i.remove(), a(Error(`ENV SD could not load ${n}`));
    }, i.dataset.envSdModule = n, document.head.append(i);
  });
}
function Bt(n) {
  const e = We();
  try {
    Vt(document, n), Gt(document, n);
    const t = [...document.querySelectorAll(".navbar-logo-center a[href]")], a = [...n.querySelectorAll(".navbar-logo-center a[href]")];
    t.forEach((s, o) => {
      a[o] && s.setAttribute("href", a[o].getAttribute("href"));
    });
    for (const s of ["lang", "dir"]) {
      const o = n.documentElement.getAttribute(s);
      o === null ? document.documentElement.removeAttribute(s) : document.documentElement.setAttribute(s, o);
    }
    document.documentElement.setAttribute("data-wf-page", n.documentElement.getAttribute("data-wf-page")), document.body.className = n.body.className;
    const i = 'meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
    document.head.querySelectorAll(i).forEach((s) => s.remove()), n.head.querySelectorAll(i).forEach((s) => document.head.append(s.cloneNode(!0))), document.head.querySelectorAll("style[data-env-sd-page-style]").forEach((s) => s.remove()), n.head.querySelectorAll("style:not([data-env-sd-mobile-nav]):not([data-env-sd-gradient-style])").forEach((s) => {
      const o = s.cloneNode(!0);
      o.dataset.envSdPageStyle = "", document.head.append(o);
    });
  } finally {
    e();
  }
}
function ze() {
  ge();
  const n = document.querySelector(".navbar-logo-center"), e = n?.querySelector(".navbar-brand-three"), t = e?.querySelector(".nav-link-sd"), a = e?.querySelector(".logo-nav");
  if (!n) return;
  xt();
  const i = new AbortController();
  let s, o = [], d = !1;
  function c(l = !1) {
    const b = me() === "/home-sd-2026-vf" || me() === "/", E = b ? document.querySelector(".hero-wrapper") : null, T = Math.max(0, Math.round(window.scrollY)), f = b ? !E || E.getBoundingClientRect().bottom <= 0 : s === void 0 ? T >= 320 : s ? T >= 80 : T >= 320;
    if (n.classList.toggle("is-past-hero", f), !l && f === s) return;
    const u = s === void 0;
    if (s = f, !t || !a || !t.getClientRects().length) {
      o.forEach((h) => h.cancel()), o = [];
      return;
    }
    const m = [t, a], y = m.map((h) => ({ transform: getComputedStyle(h).transform, opacity: getComputedStyle(h).opacity }));
    o.forEach((h) => h.cancel());
    const v = m.map((h) => h.style.transform);
    m.forEach((h) => h.style.transform = "none");
    const S = t.getBoundingClientRect(), N = a.getBoundingClientRect();
    m.forEach((h, g) => h.style.transform = v[g]);
    const R = [
      { transform: `translateY(${f ? -S.height * 1.2 : 0}px)`, opacity: f ? 0 : 1 },
      { transform: `translate(${S.left - N.left}px,${S.top + S.height / 2 - N.top - N.height / 2 + (f ? 0 : S.height * 1.2)}px)`, opacity: f ? 1 : 0 }
    ];
    o = m.map((h, g) => h.animate([y[g], R[g]], { duration: u || F.matches ? 0 : 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }));
  }
  function r() {
    d || (d = !0, requestAnimationFrame(() => {
      d = !1, c();
    }));
  }
  addEventListener("scroll", r, { passive: !0, signal: i.signal }), addEventListener("resize", () => c(!0), { signal: i.signal }), a?.addEventListener("load", () => c(!0), { signal: i.signal }), c(), document.querySelectorAll(".navbar-logo-center a[href]").forEach((l) => {
    const b = new URL(l.href), E = b.origin === location.origin && b.pathname === location.pathname && !b.hash;
    l.classList.toggle("w--current", E), E ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current");
  }), ge = () => {
    i.abort(), o.forEach((l) => l.cancel());
  };
}
async function Qe() {
  if (!document.querySelector("[data-env-reveal],[data-env-text]")) return;
  if (!window.gsap) throw Error("GSAP unavailable");
  let n;
  const e = new Promise((t) => {
    n = t;
  });
  window.addEventListener("env:animations-ready", n, { once: !0 });
  try {
    await Y("animations.js", !0), await Promise.race([e, De(1500)]);
  } finally {
    window.removeEventListener("env:animations-ready", n);
  }
}
async function xe({ deferReveals: n = !1 } = {}) {
  ze(), Fe(), He(), window.ENVVideos?.refresh(), window.gsap && window.ScrollTrigger && document.querySelectorAll("#env-sd-page .section.mask").forEach((t) => {
    t.dataset.maskInitialized || (t.dataset.maskInitialized = "true", ye.push(window.gsap.fromTo(t, { clipPath: "inset(10%)" }, { clipPath: "inset(0%)", ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "top 15%", scrub: 0.6, invalidateOnRefresh: !0 } })));
  }), await Promise.all([
    document.querySelector(".hero-wrapper .sd-slider") ? Y("hero.js", !0) : Promise.resolve(),
    n ? Promise.resolve() : Qe()
  ]);
  const e = [...document.querySelectorAll(".swiper-news[data-env-news]")];
  e.length && (ne = new IntersectionObserver((t) => {
    t.some((a) => a.isIntersecting) && (ne.disconnect(), Y("news.js", !0).catch(console.error));
  }, { rootMargin: "600px" }), e.forEach((t) => ne.observe(t)));
}
function jt() {
  window.ENVOrganicBlob?.destroy(), window.ENVCTABlob?.destroy(), ye.forEach((e) => {
    e.scrollTrigger?.kill(), e.kill();
  }), ye = [], window.ScrollTrigger?.getAll().filter((e) => e.trigger?.matches?.("#env-sd-page .section.mask")).forEach((e) => e.kill()), ge(), ne?.disconnect(), document.querySelector(".hero-wrapper")?.__envHeroCleanup?.(), window.ENVAnimations?.destroy(), window.ENVNews?.destroy(), window.ENVNewsMarquee?.destroy();
  const n = document.querySelector("#env-sd-page");
  n && window.ENVVideos?.release(n);
}
async function Ve(n, e, t, a) {
  F.matches || (q = n.animate([{ opacity: e }, { opacity: t }], { duration: a, easing: "ease", fill: "forwards" }), await q.finished.catch(() => {
  }));
}
async function Yt() {
  if (window.ENVSD) {
    ae();
    return;
  }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error("Install the matching SD head block before enabling navigation");
  const n = $e(), e = window.ENVSDTransition === "mask";
  document.documentElement.dataset.envTransitionMode = e ? "mask" : "classic";
  const t = window.Webflow, a = t?.require("ix2"), i = t?.require("ix3");
  let s;
  if (!a?.init || !i?.ready) throw Error("Webflow runtime unavailable");
  const o = [...document.querySelectorAll('link[rel="stylesheet"]')].map((u) => u.getAttribute("href")), d = [...document.scripts].map((u) => u.src).filter((u) => u.includes("/gsap/")), c = Me(document, me(), o, { refreshRuntime: !0, gsapScripts: d, ...Ce });
  let r;
  const l = async (u) => !u.runtimeChanged && !u.currentExport ? kt : (r ||= import("./runtime-config-Dr6I2voi.js"), (await r).runtimeConfig(u.dataScripts || u.bootstrap, u.site)), b = (u) => {
    const m = [...u.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((v) => v[1]), y = m.find((v) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(v));
    if (!(!y || Object.values(pe).some((v) => !v.currentExport && v.scripts.includes(y))))
      return l({ runtimeChanged: !0, bootstrap: y, dataScripts: m.filter((v) => v.includes("/js/webflow.")).slice(2), site: c.site });
  }, E = async () => {
    if (t.require("slider")?.ready) return;
    const u = c.slider || pe["/home-sd"].slider;
    await Y(u.script);
    let m = !1;
    if (window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, (y) => {
      y(u.factory), m = !0;
    }]), !m || !t.require("slider")?.ready) throw Error("Audited slider factory unavailable");
  };
  s = ["slider", "navbar", "dropdown", "tabs"].map((u) => t.require(u)).filter(Boolean), ke(document), ee = e ? null : wt(), document.head.querySelectorAll("style").forEach((u) => {
    c.styles.includes(u.textContent) && (u.dataset.envSdPageStyle = "");
  }), await window.ENVSDLoader?.prepare?.(), await xe(), document.querySelector(".navbar-logo-center")?.setAttribute("data-env-ignore", "");
  const T = new vt({
    containers: ["#env-sd-page"],
    animationSelector: !1,
    cache: window.ENVSDPreload === !0,
    plugins: [new St({ animateScroll: { betweenPages: !1, samePageWithHash: !F.matches, samePage: !F.matches } })],
    linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])",
    ignoreVisit: (u, { el: m } = {}) => {
      const y = new URL(u, location.href);
      return y.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(y.pathname) || !!m?.closest("[data-no-swup]");
    }
  });
  window.ENVSD = { swup: T, status: "ready" }, window.ENVSDPreload === !0 && (window.ENVSD.stopPreload = ht(T, { warmPage: b }), l(c).catch(() => {
  })), document.documentElement.setAttribute("data-env-sd-document", crypto.randomUUID()), T.replaceContent = (u) => {
    const m = document.querySelector("#env-sd-page"), y = u.to.document?.querySelector("#env-sd-page");
    return !m || !y ? !1 : (window.ENVVideos?.stage(y), m.replaceWith(y), document.title = u.to.document.querySelector("title")?.textContent || "", !0);
  }, T.hooks.replace("animation:out:await", async () => {
    e ? n.capture() : await Ve(document.querySelector("#env-sd-page"), 1, 0, 200);
  }), T.hooks.replace("content:replace", async (u, m, y) => {
    const v = u.to.document;
    if (!v || !y) throw Error("Missing incoming page");
    const S = Me(v, new URL(u.to.url, location.href).pathname, o, { refreshRuntime: !0, gsapScripts: d, ...Ce }), N = await l(S);
    if (v.querySelectorAll(".navbar-logo-center a[href]").length !== document.querySelectorAll(".navbar-logo-center a[href]").length) throw Error("Menu structure changed");
    const R = ke(v);
    if (R.classList.add("env-sd-pending"), e && R.setAttribute("data-env-alt-reveal-wait", ""), R.querySelector(".w-slider") && !t.require("slider")?.ready) {
      await E();
      const g = t.require("slider");
      s.includes(g) || s.push(g);
    }
    window.lenis?.stop(), jt(), s.forEach((g) => g.destroy?.()), a.destroy(), i.destroy(), q?.cancel(), await y(u, m), Bt(v), ee?.prepare(), z(u), await new Promise((g) => requestAnimationFrame(g)), z(u), e && n.prepare(document.querySelector("#env-sd-page")), s.forEach((g) => g.ready?.()), a.init(N.ix2), await Promise.race([i.ready(), De(4e3).then(() => {
      throw Error("Webflow interaction restart timeout");
    })]);
    const h = i.getInstance();
    if (!h) throw Error("Webflow interactions did not restart");
    h.setFeatures({ timelineGroups: !1 }), h.register(N.interactions, N.timelines), document.documentElement.classList.add("w-mod-ix3");
  }), T.hooks.replace("animation:in:await", async (u) => {
    z(u);
    const m = document.querySelector("#env-sd-page");
    if (e) {
      await n.reveal(m);
      try {
        await Qe();
      } finally {
        m.removeAttribute("data-env-alt-reveal-wait"), window.lenis?.start();
      }
    } else
      await Ve(m, 0, 1, 350), q?.cancel();
  }), T.hooks.on("page:view", async (u) => {
    try {
      await new Promise((y) => requestAnimationFrame(y)), z(u), await qe({ visit: u, useMask: e, transition: n, root: document.querySelector("#env-sd-page"), lenis: window.lenis, mount: xe }), window.ScrollTrigger?.refresh(), z(u), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), ee?.commit(), !["localhost", "127.0.0.1"].includes(location.hostname) && typeof window.gtag == "function" && window.gtag("event", "page_view", { page_title: document.title, page_location: location.href });
      const m = Pt();
      if (m) {
        const y = m.getAttribute("tabindex");
        m.setAttribute("tabindex", "-1"), m.focus({ preventScroll: !0 }), y === null ? m.removeAttribute("tabindex") : m.setAttribute("tabindex", y);
      }
    } catch (m) {
      document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), console.error("[ENV SD] Page initialization failed; native fallback", m), window.location.assign(u.to.url);
    }
  });
  const f = () => {
    document.querySelector("#env-sd-page")?.removeAttribute("data-env-alt-reveal-wait"), n.cleanup(), ee?.refresh(), ae(), window.lenis?.start(), q?.cancel(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending");
  };
  T.hooks.on("visit:fail", f), T.hooks.on("visit:abort", f), ae(), (async () => {
    if (!window.lenis && !F.matches)
      try {
        await Y("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"), window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: !0, easing: (u) => Math.min(1, 1.001 - Math.pow(2, -10 * u)) }), requestAnimationFrame(function u(m) {
          window.lenis?.raf(m), requestAnimationFrame(u);
        });
      } catch (u) {
        console.warn("[ENV SD] Native scroll retained", u);
      }
  })();
}
const Dt = () => Yt().catch((n) => {
  console.error("[ENV SD] Native navigation retained", n), Ut(() => Y("env.js"), () => {
    [...document.scripts].some((e) => /const brand =/.test(e.textContent) && !/ENV SD/.test(e.textContent)) || ze();
  }).catch((e) => console.error("[ENV SD] Widget fallback failed", e)).finally(ae);
});
window.Webflow = window.Webflow || [];
window.Webflow.push(Dt);
//# sourceMappingURL=sd-navigation-alternative.js.map
