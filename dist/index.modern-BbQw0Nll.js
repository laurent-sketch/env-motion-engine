function v() {
  return v = Object.assign ? Object.assign.bind() : function(n) {
    for (var o = 1; o < arguments.length; o++) {
      var t = arguments[o];
      for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
    }
    return n;
  }, v.apply(this, arguments);
}
const j = (n) => String(n).split(".").map((o) => String(parseInt(o || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");
let G = class {
  constructor() {
    this.isSwupPlugin = !0, this.swup = void 0, this.version = void 0, this.requires = {}, this.handlersToUnregister = [];
  }
  mount() {
  }
  unmount() {
    this.handlersToUnregister.forEach((o) => o()), this.handlersToUnregister = [];
  }
  _beforeMount() {
    if (!this.name) throw new Error("You must define a name of plugin when creating a class.");
  }
  _afterUnmount() {
  }
  _checkRequirements() {
    return typeof this.requires != "object" || Object.entries(this.requires).forEach(([o, t]) => {
      if (!(function(e, r, s) {
        const c = (function(a, g) {
          var f;
          if (a === "swup") return (f = g.version) != null ? f : "";
          {
            var u;
            const i = g.findPlugin(a);
            return (u = i?.version) != null ? u : "";
          }
        })(e, s);
        return !!c && ((a, g) => g.every((f) => {
          const [, u, i] = f.match(/^([\D]+)?(.*)$/) || [];
          var S, w;
          return ((H, L) => {
            const T = { "": (h) => h === 0, ">": (h) => h > 0, ">=": (h) => h >= 0, "<": (h) => h < 0, "<=": (h) => h <= 0 };
            return (T[L] || T[""])(H);
          })((w = i, S = j(S = a), w = j(w), S.localeCompare(w, void 0, { numeric: !0 })), u || ">=");
        }))(c, r);
      })(o, t = Array.isArray(t) ? t : [t], this.swup)) {
        const e = `${o} ${t.join(", ")}`;
        throw new Error(`Plugin version mismatch: ${this.name} requires ${e}`);
      }
    }), !0;
  }
  on(o, t, e = {}) {
    var r;
    t = !(r = t).name.startsWith("bound ") || r.hasOwnProperty("prototype") ? t.bind(this) : t;
    const s = this.swup.hooks.on(o, t, e);
    return this.handlersToUnregister.push(s), s;
  }
  once(o, t, e = {}) {
    return this.on(o, t, v({}, e, { once: !0 }));
  }
  before(o, t, e = {}) {
    return this.on(o, t, v({}, e, { before: !0 }));
  }
  replace(o, t, e = {}) {
    return this.on(o, t, v({}, e, { replace: !0 }));
  }
  off(o, t) {
    return this.swup.hooks.off(o, t);
  }
};
const I = (n) => typeof n == "object" && n != null && n.nodeType === 1, q = (n, o) => (!o || n !== "hidden") && n !== "visible" && n !== "clip", C = (n, o) => {
  if (n.clientHeight < n.scrollHeight || n.clientWidth < n.scrollWidth) {
    const t = getComputedStyle(n, null);
    return q(t.overflowY, o) || q(t.overflowX, o) || ((e) => {
      const r = ((s) => {
        if (!s.ownerDocument || !s.ownerDocument.defaultView) return null;
        try {
          return s.ownerDocument.defaultView.frameElement;
        } catch {
          return null;
        }
      })(e);
      return !!r && (r.clientHeight < e.scrollHeight || r.clientWidth < e.scrollWidth);
    })(n);
  }
  return !1;
}, J = (n) => {
  const o = n.parentElement;
  return o ?? (n.getRootNode().host || null);
}, Q = (n, o) => {
  var t, e, r, s;
  if (typeof document > "u") return [];
  const { boundary: c, skipOverflowHiddenElements: a } = o, g = typeof c == "function" ? c : (m) => m !== c;
  if (!I(n)) throw new TypeError("Invalid target");
  const f = document.scrollingElement || document.documentElement, u = [];
  let i = n;
  for (; I(i) && g(i); ) {
    if (i = J(i), i === f) {
      u.push(i);
      break;
    }
    i != null && i === document.body && C(i) && !C(document.documentElement) || i != null && C(i, a) && u.push(i);
  }
  (e = (t = window.visualViewport) == null ? void 0 : t.width) != null || innerWidth, (s = (r = window.visualViewport) == null ? void 0 : r.height) != null || innerHeight;
  const { scrollX: S, scrollY: w } = window, { height: H, width: L, top: T, right: h, bottom: Z, left: U } = n.getBoundingClientRect(), { top: x, left: D } = ((m) => {
    const l = window.getComputedStyle(m);
    return { top: parseFloat(l.scrollMarginTop) || 0, right: parseFloat(l.scrollMarginRight) || 0, bottom: parseFloat(l.scrollMarginBottom) || 0, left: parseFloat(l.scrollMarginLeft) || 0 };
  })(n);
  let b = T - x, E = U - D;
  const W = [];
  for (let m = 0; m < u.length; m++) {
    const l = u[m], { height: k, width: B, top: Y, right: tt, bottom: ot, left: X } = l.getBoundingClientRect(), y = getComputedStyle(l), M = parseInt(y.borderLeftWidth, 10), O = parseInt(y.borderTopWidth, 10), _ = parseInt(y.borderRightWidth, 10), K = parseInt(y.borderBottomWidth, 10);
    let d = 0, p = 0;
    const N = "offsetWidth" in l ? l.offsetWidth - l.clientWidth - M - _ : 0, z = "offsetHeight" in l ? l.offsetHeight - l.clientHeight - O - K : 0, P = "offsetWidth" in l ? l.offsetWidth === 0 ? 0 : B / l.offsetWidth : 0, A = "offsetHeight" in l ? l.offsetHeight === 0 ? 0 : k / l.offsetHeight : 0;
    if (f === l) d = b, p = E, d = Math.max(0, d + w), p = Math.max(0, p + S);
    else {
      d = b - Y - O, p = E - X - M;
      const { scrollLeft: V, scrollTop: $ } = l;
      d = A === 0 ? 0 : Math.max(0, Math.min($ + d / A, l.scrollHeight - k / A + z)), p = P === 0 ? 0 : Math.max(0, Math.min(V + p / P, l.scrollWidth - B / P + N)), b += $ - d, E += V - p;
    }
    W.push({ el: l, top: d, left: p });
  }
  return W;
};
function R() {
  return R = Object.assign ? Object.assign.bind() : function(n) {
    for (var o = 1; o < arguments.length; o++) {
      var t = arguments[o];
      for (var e in t) ({}).hasOwnProperty.call(t, e) && (n[e] = t[e]);
    }
    return n;
  }, R.apply(null, arguments);
}
const F = (n, o = document) => Array.from(o.querySelectorAll(n));
class st extends G {
  constructor(o = {}) {
    super(), this.name = "SwupScrollPlugin", this.requires = { swup: ">=4.2.0" }, this.defaults = { doScrollingRightAway: !1, animateScroll: { betweenPages: !0, samePageWithHash: !0, samePage: !0 }, getAnchorElement: void 0, offset: 0, scrollContainers: "[data-swup-scroll-container]", shouldResetScrollPosition: () => !0, markScrollTarget: !1, scrollFunction: void 0 }, this.options = void 0, this.cachedScrollPositions = {}, this.previousScrollRestoration = void 0, this.currentCacheKey = void 0, this.getAnchorElement = (t = "") => typeof this.options.getAnchorElement == "function" ? this.options.getAnchorElement(t) : this.swup.getAnchorElement(t), this.getOffset = (t, e, r) => {
      let s;
      return s = typeof this.options.offset == "function" ? this.options.offset(t, e, r) : this.options.offset, typeof s == "object" && typeof s.top == "number" && typeof s.left == "number" ? s : { top: parseInt(String(s ?? ""), 10) || 0, left: 0 };
    }, this.onBeforeLinkToSelf = (t) => {
      t.scroll.animate = this.shouldAnimate("samePage");
    }, this.handleScrollToTop = (t) => (this.scrollTo({ top: 0, left: 0 }, t.scroll.animate), !0), this.onBeforeLinkToAnchor = (t) => {
      t.scroll.animate = this.shouldAnimate("samePageWithHash");
    }, this.handleScrollToAnchor = (t, { hash: e }) => this.maybeScrollToAnchor(e, t.scroll.animate), this.onBeforeVisitStart = (t) => {
      t.scroll.scrolledToContent = !1, t.scroll.animate = this.shouldAnimate("betweenPages");
    }, this.onVisitStart = (t) => {
      var e;
      this.cacheScrollPositions(t.from.url), this.maybeResetScrollPositions(t);
      const r = (e = t.scroll.target) != null ? e : t.to.hash;
      t.scroll.animate && this.options.doScrollingRightAway && !r && this.doScrollingBetweenPages(t);
    }, this.handleScrollToContent = (t) => {
      t.scroll.scrolledToContent || this.doScrollingBetweenPages(t), this.restoreScrollContainers(t.to.url);
    }, this.doScrollingBetweenPages = (t) => {
      var e;
      if (t.history.popstate && !t.animation.animate) return;
      const r = (e = t.scroll.target) != null ? e : t.to.hash;
      if (r && this.maybeScrollToAnchor(r, t.scroll.animate) || !t.scroll.reset) return;
      const s = this.getCachedScrollPositions(t.to.url), { top: c = 0, left: a = 0 } = s?.window || { top: 0, left: 0 };
      requestAnimationFrame(() => this.scrollTo({ top: c, left: a }, t.scroll.animate)), t.scroll.scrolledToContent = !0;
    }, this.maybeResetScrollPositions = (t) => {
      const { popstate: e } = t.history, { url: r } = t.to, { el: s } = t.trigger;
      e || s && !this.options.shouldResetScrollPosition(s) || this.resetScrollPositions(r);
    }, this.options = R({}, this.defaults, o);
  }
  mount() {
    const o = this.swup;
    o.hooks.create("scroll:start"), o.hooks.create("scroll:end"), o.scrollTo = this.scrollTo.bind(this), this.previousScrollRestoration = window.history.scrollRestoration, o.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.updateScrollTarget = this.updateScrollTarget.bind(this), this.options.markScrollTarget && (window.addEventListener("popstate", this.updateScrollTarget), window.addEventListener("hashchange", this.updateScrollTarget), this.on("page:view", this.updateScrollTarget), this.on("link:anchor", this.updateScrollTarget), this.on("link:self", this.updateScrollTarget), this.updateScrollTarget()), this.before("visit:start", this.onBeforeVisitStart, { priority: -1 }), this.on("visit:start", this.onVisitStart, { priority: 1 }), this.replace("content:scroll", this.handleScrollToContent), this.before("link:self", this.onBeforeLinkToSelf, { priority: -1 }), this.replace("scroll:top", this.handleScrollToTop), this.before("link:anchor", this.onBeforeLinkToAnchor, { priority: -1 }), this.replace("scroll:anchor", this.handleScrollToAnchor);
  }
  unmount() {
    super.unmount(), this.previousScrollRestoration && (window.history.scrollRestoration = this.previousScrollRestoration), window.removeEventListener("popstate", this.updateScrollTarget), window.removeEventListener("hashchange", this.updateScrollTarget), this.cachedScrollPositions = {}, delete this.swup.scrollTo;
  }
  shouldAnimate(o) {
    return typeof this.options.animateScroll == "boolean" ? this.options.animateScroll : this.options.animateScroll[o];
  }
  maybeScrollToAnchor(o, t = !1) {
    if (!o) return !1;
    const e = this.getAnchorElement(o);
    return e ? e instanceof Element ? (this.scrollElementIntoView(e, t), !0) : (console.warn(`Anchor target ${o} is not a DOM node`), !1) : (console.warn(`Anchor target ${o} not found`), !1);
  }
  cacheScrollPositions(o) {
    const t = this.swup.resolveUrl(o), e = F(this.options.scrollContainers).map((s) => ({ top: s.scrollTop, left: s.scrollLeft })), r = { window: { top: window.scrollY, left: window.scrollX }, containers: e };
    this.cachedScrollPositions[t] = r;
  }
  resetScrollPositions(o) {
    const t = this.swup.resolveUrl(o);
    delete this.cachedScrollPositions[t];
  }
  getCachedScrollPositions(o) {
    const t = this.swup.resolveUrl(o);
    return this.cachedScrollPositions[t];
  }
  restoreScrollContainers(o) {
    const t = this.getCachedScrollPositions(o);
    t && t.containers.length !== 0 && F(this.options.scrollContainers).forEach((e, r) => {
      const s = t.containers[r];
      s != null && (e.scrollTop = s.top, e.scrollLeft = s.left);
    });
  }
  updateScrollTarget() {
    var o;
    const { hash: t } = window.location, e = document.querySelector("[data-swup-scroll-target]");
    let r = this.getAnchorElement(t);
    r instanceof HTMLBodyElement && (r = null), e !== r && (e?.removeAttribute("data-swup-scroll-target"), (o = r) == null || o.setAttribute("data-swup-scroll-target", ""));
  }
  getRootScrollContainer() {
    return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
  }
  scrollTo(o, t = !0, e) {
    var r;
    const s = this.swup.createVisit({ to: this.swup.location.url }), { top: c = 0, left: a = 0 } = typeof o == "number" ? { top: o } : o;
    e != null || (e = this.getRootScrollContainer()), ((r = this.options.scrollFunction) != null ? r : this.applyScroll)(e, c, a, t, () => this.swup.hooks.callSync("scroll:start", s, void 0), () => this.swup.hooks.callSync("scroll:end", s, void 0));
  }
  applyScroll(o, t, e, r, s, c) {
    const a = o instanceof HTMLHtmlElement || o instanceof HTMLBodyElement ? window : o;
    s(), a.addEventListener("scrollend", c, { once: !0 }), a.addEventListener("wheel", () => {
      o.scrollTo({ top: o.scrollTop, left: o.scrollLeft, behavior: "instant" });
    }, { once: !0 }), o.scrollTo({ top: t, left: e, behavior: r ? "smooth" : "instant" });
  }
  scrollElementIntoView(o, t = !1) {
    Q(o, {}).forEach(({ top: e, left: r, el: s }) => {
      const { top: c = 0, left: a = 0 } = this.getOffset(o, s, { top: e, left: r });
      this.scrollTo({ top: e - c, left: r - a }, t, s);
    });
  }
}
export {
  st as default
};
//# sourceMappingURL=index.modern-BbQw0Nll.js.map
