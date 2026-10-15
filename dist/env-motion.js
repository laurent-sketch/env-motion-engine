const $ = /* @__PURE__ */ new WeakMap();
function V(e, t, i, s) {
  if (!e && !$.has(t))
    return !1;
  const n = $.get(t) ?? /* @__PURE__ */ new WeakMap();
  $.set(t, n);
  const o = n.get(i) ?? /* @__PURE__ */ new Set();
  n.set(i, o);
  const r = o.has(s);
  return e ? o.add(s) : o.delete(s), r && e;
}
function F(e, t) {
  let i = e.target;
  if (i instanceof Text && (i = i.parentElement), i instanceof Element && e.currentTarget instanceof Node) {
    const s = i.closest(t);
    if (s && e.currentTarget.contains(s))
      return s;
  }
}
function M(e, t, i, s = {}) {
  if (Array.isArray(t)) {
    for (const w of t)
      M(e, w, i, s);
    return;
  }
  const n = t, { signal: o, base: r = document } = s;
  if (o?.aborted)
    return;
  const { once: a, ...c } = s, l = r instanceof Document ? r.documentElement : r, h = !!(typeof s == "object" ? s.capture : s), u = (w) => {
    const f = F(w, String(e));
    if (f) {
      const m = Object.assign(w, { delegateTarget: f });
      i.call(l, m), a && (l.removeEventListener(n, u, c), V(!1, l, i, p));
    }
  }, p = JSON.stringify({ selector: e, type: n, capture: h });
  V(!0, l, i, p) || l.addEventListener(n, u, c), o?.addEventListener("abort", () => {
    V(!1, l, i, p);
  });
}
function g() {
  return g = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = arguments[t];
      for (var s in i) ({}).hasOwnProperty.call(i, s) && (e[s] = i[s]);
    }
    return e;
  }, g.apply(null, arguments);
}
const D = (e, t) => String(e).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || t || "", A = ({ hash: e } = {}) => window.location.pathname + window.location.search + (e ? window.location.hash : ""), _ = (e, t = {}) => {
  const i = g({ url: e = e || A({ hash: !0 }), random: Math.random(), source: "swup" }, t);
  window.history.pushState(i, "", e);
}, C = (e = null, t = {}) => {
  e = e || A({ hash: !0 });
  const i = g({}, window.history.state || {}, { url: e, random: Math.random(), source: "swup" }, t);
  window.history.replaceState(i, "", e);
}, K = (e, t, i, s) => {
  const n = new AbortController();
  return s = g({}, s, { signal: n.signal }), M(e, t, i, s), { destroy: () => n.abort() };
};
class y extends URL {
  constructor(t, i = document.baseURI) {
    super(t.toString(), i), Object.setPrototypeOf(this, y.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(t) {
    const i = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
    return new y(i);
  }
  static fromUrl(t) {
    return new y(t);
  }
}
class U extends Error {
  constructor(t, i) {
    super(t), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = i.url, this.status = i.status, this.aborted = i.aborted || !1, this.timedOut = i.timedOut || !1;
  }
}
async function z(e, t = {}) {
  var i;
  e = y.fromUrl(e).url;
  const { visit: s = this.visit } = t, n = g({}, this.options.requestHeaders, t.headers), o = (i = t.timeout) != null ? i : this.options.timeout, r = new AbortController(), { signal: a } = r;
  t = g({}, t, { headers: n, signal: a });
  let c, l = !1, h = null;
  o && o > 0 && (h = setTimeout(() => {
    l = !0, r.abort("timeout");
  }, o));
  try {
    c = await this.hooks.call("fetch:request", s, { url: e, options: t }, (m, { url: b, options: d }) => fetch(b, d)), h && clearTimeout(h);
  } catch (m) {
    throw l ? (this.hooks.call("fetch:timeout", s, { url: e }), new U(`Request timed out: ${e}`, { url: e, timedOut: l })) : m?.name === "AbortError" || a.aborted ? new U(`Request aborted: ${e}`, { url: e, aborted: !0 }) : m;
  }
  const { status: u, url: p } = c, v = await c.text();
  if (u === 500) throw this.hooks.call("fetch:error", s, { status: u, response: c, url: p }), new U(`Server error: ${p}`, { status: u, url: p });
  if (!v) throw new U(`Empty response: ${p}`, { status: u, url: p });
  const { url: w } = y.fromUrl(p), f = { url: w, html: v };
  return !s.cache.write || t.method && t.method !== "GET" || e !== w || this.cache.set(f.url, f), f;
}
class G {
  constructor(t) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = t;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const t = /* @__PURE__ */ new Map();
    return this.pages.forEach((i, s) => {
      t.set(s, g({}, i));
    }), t;
  }
  has(t) {
    return this.pages.has(this.resolve(t));
  }
  get(t) {
    const i = this.pages.get(this.resolve(t));
    return i && g({}, i);
  }
  set(t, i) {
    i = g({}, i, { url: t = this.resolve(t) }), this.pages.set(t, i), this.swup.hooks.callSync("cache:set", void 0, { page: i });
  }
  update(t, i) {
    t = this.resolve(t);
    const s = g({}, this.get(t), i, { url: t });
    this.pages.set(t, s);
  }
  delete(t) {
    this.pages.delete(this.resolve(t));
  }
  clear() {
    this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
  }
  prune(t) {
    this.pages.forEach((i, s) => {
      t(s, i) && this.delete(s);
    });
  }
  resolve(t) {
    const { url: i } = y.fromUrl(t);
    return this.swup.resolveUrl(i);
  }
}
const q = (e, t = document) => t.querySelector(e), T = (e, t = document) => Array.from(t.querySelectorAll(e)), W = () => new Promise((e) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e();
    });
  });
});
function j(e) {
  return !!e && (typeof e == "object" || typeof e == "function") && typeof e.then == "function";
}
function J(e, t = []) {
  return new Promise((i, s) => {
    const n = e(...t);
    j(n) ? n.then(i, s) : i(n);
  });
}
function N(e, t) {
  const i = e?.closest(`[${t}]`);
  return i != null && i.hasAttribute(t) ? i?.getAttribute(t) || !0 : void 0;
}
class X {
  constructor(t) {
    this.swup = void 0, this.swupClasses = ["to-", "is-changing", "is-rendering", "is-popstate", "is-animating", "is-leaving"], this.swup = t;
  }
  get selectors() {
    const { scope: t } = this.swup.visit.animation;
    return t === "containers" ? this.swup.visit.containers : t === "html" ? ["html"] : Array.isArray(t) ? t : [];
  }
  get selector() {
    return this.selectors.join(",");
  }
  get targets() {
    return this.selector.trim() ? T(this.selector) : [];
  }
  add(...t) {
    this.targets.forEach((i) => i.classList.add(...t));
  }
  remove(...t) {
    this.targets.forEach((i) => i.classList.remove(...t));
  }
  clear() {
    this.targets.forEach((t) => {
      const i = t.className.split(" ").filter((s) => this.isSwupClass(s));
      t.classList.remove(...i);
    });
  }
  isSwupClass(t) {
    return this.swupClasses.some((i) => t.startsWith(i));
  }
}
class B {
  constructor(t, i) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: s, from: n, hash: o, el: r, event: a } = i;
    this.id = Math.random(), this.state = 1, this.from = { url: n ?? t.location.url, hash: t.location.hash }, this.to = { url: s, hash: o }, this.containers = t.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: t.options.native, scope: t.options.animationScope, selector: t.options.animationSelector }, this.trigger = { el: r, event: a }, this.cache = { read: t.options.cache, write: t.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
  }
  advance(t) {
    this.state < t && (this.state = t);
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
function Q(e) {
  return new B(this, e);
}
class Y {
  constructor(t) {
    this.swup = void 0, this.registry = /* @__PURE__ */ new Map(), this.hooks = ["animation:out:start", "animation:out:await", "animation:out:end", "animation:in:start", "animation:in:await", "animation:in:end", "animation:skip", "cache:clear", "cache:set", "content:replace", "content:scroll", "enable", "disable", "fetch:request", "fetch:error", "fetch:timeout", "history:popstate", "link:click", "link:self", "link:anchor", "link:newtab", "page:load", "page:view", "scroll:top", "scroll:anchor", "visit:start", "visit:transition", "visit:abort", "visit:end", "visit:fail"], this.nextHookId = 0, this.swup = t, this.init();
  }
  init() {
    this.hooks.forEach((t) => this.create(t));
  }
  create(t) {
    this.registry.has(t) || this.registry.set(t, /* @__PURE__ */ new Map());
  }
  exists(t) {
    return this.registry.has(t);
  }
  get(t) {
    const i = this.registry.get(t);
    if (i) return i;
    console.error(`Unknown hook '${t}'`);
  }
  clear() {
    this.registry.forEach((t) => t.clear());
  }
  on(t, i, s = {}) {
    const n = this.get(t);
    if (!n) return console.warn(`Hook '${t}' not found.`), () => {
    };
    const o = g({}, s, { id: ++this.nextHookId, hook: t, handler: i });
    return n.set(i, o), () => this.off(t, i);
  }
  before(t, i, s = {}) {
    return this.on(t, i, g({}, s, { before: !0 }));
  }
  replace(t, i, s = {}) {
    return this.on(t, i, g({}, s, { replace: !0 }));
  }
  once(t, i, s = {}) {
    return this.on(t, i, g({}, s, { once: !0 }));
  }
  off(t, i) {
    const s = this.get(t);
    s && i ? s.delete(i) || console.warn(`Handler for hook '${t}' not found.`) : s && s.clear();
  }
  async call(t, i, s, n) {
    const [o, r, a] = this.parseCallArgs(t, i, s, n), { before: c, handler: l, after: h } = this.getHandlers(t, a);
    await this.run(c, o, r);
    const [u] = await this.run(l, o, r, !0);
    return await this.run(h, o, r), this.dispatchDomEvent(t, o, r), u;
  }
  callSync(t, i, s, n) {
    const [o, r, a] = this.parseCallArgs(t, i, s, n), { before: c, handler: l, after: h } = this.getHandlers(t, a);
    this.runSync(c, o, r);
    const [u] = this.runSync(l, o, r, !0);
    return this.runSync(h, o, r), this.dispatchDomEvent(t, o, r), u;
  }
  parseCallArgs(t, i, s, n) {
    return i instanceof B || typeof i != "object" && typeof s != "function" ? [i, s, n] : [void 0, i, s];
  }
  async run(t, i = this.swup.visit, s, n = !1) {
    const o = [];
    for (const { hook: r, handler: a, defaultHandler: c, once: l } of t) if (i == null || !i.done) {
      l && this.off(r, a);
      try {
        const h = await J(a, [i, s, c]);
        o.push(h);
      } catch (h) {
        if (n) throw h;
        console.error(`Error in hook '${r}':`, h);
      }
    }
    return o;
  }
  runSync(t, i = this.swup.visit, s, n = !1) {
    const o = [];
    for (const { hook: r, handler: a, defaultHandler: c, once: l } of t) if (i == null || !i.done) {
      l && this.off(r, a);
      try {
        const h = a(i, s, c);
        o.push(h), j(h) && console.warn(`Swup will not await Promises in handler for synchronous hook '${r}'.`);
      } catch (h) {
        if (n) throw h;
        console.error(`Error in hook '${r}':`, h);
      }
    }
    return o;
  }
  getHandlers(t, i) {
    const s = this.get(t);
    if (!s) return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const n = Array.from(s.values()), o = this.sortRegistrations, r = n.filter(({ before: u, replace: p }) => u && !p).sort(o), a = n.filter(({ replace: u }) => u).filter((u) => !0).sort(o), c = n.filter(({ before: u, replace: p }) => !u && !p).sort(o), l = a.length > 0;
    let h = [];
    if (i && (h = [{ id: 0, hook: t, handler: i }], l)) {
      const u = a.length - 1, { handler: p, once: v } = a[u], w = (f) => {
        const m = a[f - 1];
        return m ? (b, d) => m.handler(b, d, w(f - 1)) : i;
      };
      h = [{ id: 0, hook: t, once: v, handler: p, defaultHandler: w(u) }];
    }
    return { found: !0, before: r, handler: h, after: c, replaced: l };
  }
  sortRegistrations(t, i) {
    var s, n;
    return ((s = t.priority) != null ? s : 0) - ((n = i.priority) != null ? n : 0) || t.id - i.id || 0;
  }
  dispatchDomEvent(t, i, s) {
    if (i != null && i.done) return;
    const n = { hook: t, args: s, visit: i || this.swup.visit };
    document.dispatchEvent(new CustomEvent("swup:any", { detail: n, bubbles: !0 })), document.dispatchEvent(new CustomEvent(`swup:${t}`, { detail: n, bubbles: !0 }));
  }
  parseName(t) {
    const [i, ...s] = t.split(".");
    return [i, s.reduce((n, o) => g({}, n, { [o]: !0 }), {})];
  }
}
const Z = (e) => {
  if (e && e.charAt(0) === "#" && (e = e.substring(1)), !e) return null;
  const t = decodeURIComponent(e);
  let i = document.getElementById(e) || document.getElementById(t) || q(`a[name='${CSS.escape(e)}']`) || q(`a[name='${CSS.escape(t)}']`);
  return i || e !== "top" || (i = document.body), i;
}, P = "transition", H = "animation";
async function tt({ selector: e, elements: t }) {
  if (e === !1 && !t) return;
  let i = [];
  if (t) i = Array.from(t);
  else if (e && (i = T(e, document.body), !i.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${e}\``);
  const s = i.map((n) => (function(o) {
    const { type: r, timeout: a, propCount: c } = (function(l) {
      const h = window.getComputedStyle(l), u = L(h, `${P}Delay`), p = L(h, `${P}Duration`), v = I(u, p), w = L(h, `${H}Delay`), f = L(h, `${H}Duration`), m = I(w, f), b = Math.max(v, m), d = b > 0 ? v > m ? P : H : null;
      return { type: d, timeout: b, propCount: d ? d === P ? p.length : f.length : 0 };
    })(o);
    return !(!r || !a) && new Promise((l) => {
      const h = `${r}end`, u = performance.now();
      let p = 0;
      const v = () => {
        o.removeEventListener(h, w), l();
      }, w = (f) => {
        f.target === o && ((performance.now() - u) / 1e3 < f.elapsedTime || ++p >= c && v());
      };
      setTimeout(() => {
        p < c && v();
      }, a + 1), o.addEventListener(h, w);
    });
  })(n)).filter((n) => n !== !1);
  s.length ? await Promise.all(s) : e && console.warn(`[swup] No CSS animation duration defined on elements matching \`${e}\``);
}
function L(e, t) {
  return (e[t] || "").split(", ");
}
function I(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((i, s) => O(i) + O(e[s])));
}
function O(e) {
  return 1e3 * parseFloat(e);
}
function et(e, t = {}, i = {}) {
  if (typeof e != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(e, { el: i.el, event: i.event })) return void window.location.assign(e);
  const { url: s, hash: n } = y.fromUrl(e), o = this.createVisit(g({}, i, { to: s, hash: n }));
  this.performNavigation(o, t);
}
async function it(e, t = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return e.state = 2, void (this.onVisitEnd = () => this.performNavigation(e, t));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = e;
  const { el: i } = e.trigger;
  t.referrer = t.referrer || this.location.url, t.animate === !1 && (e.animation.animate = !1), e.animation.animate || this.classes.clear();
  const s = t.history || N(i, "data-swup-history");
  typeof s == "string" && ["push", "replace"].includes(s) && (e.history.action = s);
  const n = t.animation || N(i, "data-swup-animation");
  var o, r;
  typeof n == "string" && (e.animation.name = n), e.meta = t.meta || {}, typeof t.cache == "object" ? (e.cache.read = (o = t.cache.read) != null ? o : e.cache.read, e.cache.write = (r = t.cache.write) != null ? r : e.cache.write) : t.cache !== void 0 && (e.cache = { read: !!t.cache, write: !!t.cache }), delete t.cache;
  try {
    await this.hooks.call("visit:start", e, void 0), e.state = 3;
    const a = this.hooks.call("page:load", e, { options: t }, async (l, h) => {
      let u;
      return l.cache.read && (u = this.cache.get(l.to.url)), h.page = u || await this.fetchPage(l.to.url, h.options), h.cache = !!u, h.page;
    });
    a.then(({ html: l }) => {
      e.advance(5), e.to.html = l, e.to.document = new DOMParser().parseFromString(l, "text/html");
    });
    const c = e.to.url + e.to.hash;
    if (e.history.popstate || (e.history.action === "replace" || e.to.url === this.location.url ? C(c) : (this.currentHistoryIndex++, _(c, { index: this.currentHistoryIndex }))), this.location = y.fromUrl(c), e.history.popstate && this.classes.add("is-popstate"), e.animation.name && this.classes.add(`to-${D(e.animation.name)}`), e.animation.wait && await a, e.ignored) throw new Error(`Visit to ${e.to.url} manually ignored`);
    if (e.done || (await this.hooks.call("visit:transition", e, void 0, async () => {
      if (!e.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(e, await a);
      e.advance(4), await this.animatePageOut(e), e.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(e, await a)).finished : await this.renderPage(e, await a), await this.animatePageIn(e);
    }), e.done)) return;
    await this.hooks.call("visit:end", e, void 0, () => this.classes.clear()), e.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (a) {
    if (!a || a != null && a.aborted) return void e.advance(8);
    if (e.ignored) return void R.call(this, e);
    await this.hooks.call("visit:fail", e, { error: a }, (c, { error: l }) => {
      console.error(l), R.call(this, c);
    }), e.advance(9);
  } finally {
    delete e.to.document, this.visit === e && (this.navigating = !1);
  }
}
function R(e) {
  const t = e.to.url + e.to.hash;
  A() === e.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(t), { once: !0 }), window.history.back()) : window.location.assign(t);
}
const st = async function(e) {
  await this.hooks.call("animation:out:start", e, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", e, { skip: !1 }, (t, { skip: i }) => {
    if (!i) return this.awaitAnimations({ selector: t.animation.selector });
  }), await this.hooks.call("animation:out:end", e, void 0);
}, nt = function(e) {
  var t;
  const i = e.to.document;
  if (!i) return !1;
  const s = ((t = i.querySelector("title")) == null ? void 0 : t.innerText) || "";
  document.title = s;
  const n = T('[data-swup-persist]:not([data-swup-persist=""])'), o = e.containers.map((r) => {
    const a = document.querySelector(r), c = i.querySelector(r);
    return a && c ? (a.replaceWith(c.cloneNode(!0)), !0) : (a || console.warn(`[swup] Container missing in current document: ${r}`), c || console.warn(`[swup] Container missing in incoming document: ${r}`), !1);
  }).filter(Boolean);
  return n.forEach((r) => {
    const a = r.getAttribute("data-swup-persist"), c = q(`[data-swup-persist="${a}"]`);
    c && c !== r && c.replaceWith(r);
  }), o.length === e.containers.length;
}, ot = function(e) {
  const t = { behavior: "auto" }, { target: i, reset: s } = e.scroll, n = i ?? e.to.hash;
  let o = !1;
  return n && (o = this.hooks.callSync("scroll:anchor", e, { hash: n, options: t }, (r, { hash: a, options: c }) => {
    const l = this.getAnchorElement(a);
    return l && l.scrollIntoView(c), !!l;
  })), s && !o && (o = this.hooks.callSync("scroll:top", e, { options: t }, (r, { options: a }) => (window.scrollTo(g({ top: 0, left: 0 }, a)), !0))), o;
}, rt = async function(e) {
  if (e.done) return;
  const t = this.hooks.call("animation:in:await", e, { skip: !1 }, (i, { skip: s }) => {
    if (!s) return this.awaitAnimations({ selector: i.animation.selector });
  });
  await W(), await this.hooks.call("animation:in:start", e, void 0, () => {
    this.classes.remove("is-animating");
  }), await t, await this.hooks.call("animation:in:end", e, void 0);
}, at = async function(e, t) {
  if (e.done) return;
  e.advance(6);
  const { url: i } = t;
  this.isSameResolvedUrl(A(), i) || (C(i), this.location = y.fromUrl(i), e.to.url = this.location.url, e.to.hash = this.location.hash), await this.hooks.call("content:replace", e, { page: t }, (s, {}) => {
    if (this.classes.remove("is-leaving"), s.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(s)) throw new Error("[swup] Container mismatch, aborting");
    s.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), s.animation.name && this.classes.add(`to-${D(s.animation.name)}`));
  }), await this.hooks.call("content:scroll", e, void 0, () => this.scrollToContent(e)), await this.hooks.call("page:view", e, { url: this.location.url, title: document.title });
}, lt = function(e) {
  var t;
  if (t = e, !!t?.isSwupPlugin) {
    if (e.swup = this, !e._checkRequirements || e._checkRequirements()) return e._beforeMount && e._beforeMount(), e.mount(), this.plugins.push(e), this.plugins;
  } else console.error("Not a swup plugin instance", e);
};
function ct(e) {
  const t = this.findPlugin(e);
  if (t) return t.unmount(), t._afterUnmount && t._afterUnmount(), this.plugins = this.plugins.filter((i) => i !== t), this.plugins;
  console.error("No such plugin", t);
}
function ht(e) {
  return this.plugins.find((t) => typeof e == "string" ? [`Swup${e}`, e].includes(t.name) : t === e);
}
function ut(e) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), e;
  const t = this.options.resolveUrl(e);
  return t && typeof t == "string" ? t.startsWith("//") || t.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), e) : t : (console.warn("[swup] options.resolveUrl needs to return a url"), e);
}
function dt(e, t) {
  return this.resolveUrl(e) === this.resolveUrl(t);
}
const pt = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (e, { el: t } = {}) => !(t == null || !t.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (e) => e, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (e) => {
  var t;
  return ((t = e.state) == null ? void 0 : t.source) !== "swup";
}, timeout: 0 };
class ft {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(t = {}) {
    var i, s;
    this.version = "4.10.0", this.options = void 0, this.defaults = pt, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = y.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = lt, this.unuse = ct, this.findPlugin = ht, this.log = () => {
    }, this.navigate = et, this.performNavigation = it, this.createVisit = Q, this.delegateEvent = K, this.fetchPage = z, this.awaitAnimations = tt, this.renderPage = at, this.replaceContent = nt, this.animatePageIn = rt, this.animatePageOut = st, this.scrollToContent = ot, this.getAnchorElement = Z, this.getCurrentUrl = A, this.resolveUrl = ut, this.isSameResolvedUrl = dt, this.options = g({}, this.defaults, t), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new G(this), this.classes = new X(this), this.hooks = new Y(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (i = (s = window.history.state) == null ? void 0 : s.index) != null ? i : 1, this.enable();
  }
  async enable() {
    var t;
    const { linkSelector: i } = this.options;
    this.clickDelegate = this.delegateEvent(i, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((s) => this.use(s));
    for (const [s, n] of Object.entries(this.options.hooks)) {
      const [o, r] = this.hooks.parseName(s);
      this.hooks.on(o, n, r);
    }
    ((t = window.history.state) == null ? void 0 : t.source) !== "swup" && C(null, { index: this.currentHistoryIndex }), await W(), await this.hooks.call("enable", void 0, void 0, () => {
      const s = document.documentElement;
      s.classList.add("swup-enabled"), s.classList.toggle("swup-native", this.options.native);
    });
  }
  async destroy() {
    this.clickDelegate.destroy(), window.removeEventListener("popstate", this.handlePopState), this.cache.clear(), this.plugins.forEach((t) => this.unuse(t)), await this.hooks.call("disable", void 0, void 0, () => {
      const t = document.documentElement;
      t.classList.remove("swup-enabled"), t.classList.remove("swup-native");
    }), this.hooks.clear();
  }
  shouldIgnoreVisit(t, { el: i, event: s } = {}) {
    const { origin: n, url: o, hash: r } = y.fromUrl(t);
    return n !== window.location.origin || !(!i || !this.triggerWillOpenNewWindow(i)) || !!this.options.ignoreVisit(o + r, { el: i, event: s });
  }
  handleLinkClick(t) {
    const i = t.delegateTarget, { href: s, url: n, hash: o } = y.fromElement(i);
    if (this.shouldIgnoreVisit(s, { el: i, event: t })) return;
    if (this.navigating && n === this.visit.to.url) return void t.preventDefault();
    const r = this.createVisit({ to: n, hash: o, el: i, event: t });
    t.metaKey || t.ctrlKey || t.shiftKey || t.altKey ? this.hooks.callSync("link:newtab", r, { href: s }) : t.button === 0 && this.hooks.callSync("link:click", r, { el: i, event: t }, () => {
      var a;
      const c = (a = r.from.url) != null ? a : "";
      t.preventDefault(), n && n !== c ? this.isSameResolvedUrl(n, c) || this.performNavigation(r) : o ? this.hooks.callSync("link:anchor", r, { hash: o }, () => {
        C(n + o), this.scrollToContent(r);
      }) : this.hooks.callSync("link:self", r, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(r) : (C(n), this.scrollToContent(r));
      });
    });
  }
  handlePopState(t) {
    var i, s, n, o;
    const r = (i = (s = t.state) == null ? void 0 : s.url) != null ? i : window.location.href;
    if (this.options.skipPopStateHandling(t) || this.isSameResolvedUrl(A(), this.location.url)) return;
    const { url: a, hash: c } = y.fromUrl(r), l = this.createVisit({ to: a, hash: c, event: t });
    l.history.popstate = !0;
    const h = (n = (o = t.state) == null ? void 0 : o.index) != null ? n : 0;
    h && h !== this.currentHistoryIndex && (l.history.direction = h - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = h), l.animation.animate = !1, l.scroll.reset = !1, l.scroll.target = !1, this.options.animateHistoryBrowsing && !t.hasUAVisualTransition && (l.animation.animate = !0, l.scroll.reset = !0), this.hooks.callSync("history:popstate", l, { event: t }, () => {
      this.performNavigation(l);
    });
  }
  triggerWillOpenNewWindow(t) {
    return !!t.matches('[download], [target="_blank"]');
  }
}
class mt {
  controller = new AbortController();
  disposers = [];
  constructor(t, i, s) {
    try {
      for (const n of i) {
        const o = n.mount({ root: t, signal: this.controller.signal, reducedMotion: s, cleanup: (r) => this.disposers.push(r) });
        o && this.disposers.push(o);
      }
    } catch (n) {
      throw this.destroy(), n;
    }
  }
  destroy() {
    this.controller.abort();
    for (const t of this.disposers.splice(0).reverse())
      try {
        t();
      } catch (i) {
        console.error("[ENV] cleanup", i);
      }
  }
}
async function gt(e = {}) {
  const t = e.container ?? "[data-env-page]", i = () => document.querySelector(t);
  if (!i()) throw new Error(`[ENV] Missing container ${t}`);
  const s = e.gsap ?? (await import("./index-CPGkGNo2.js")).gsap, n = [...e.modules ?? []], o = i();
  (document.documentElement.hasAttribute("data-env-reveal") || o.querySelector("[data-env-reveal]")) && n.push((await import("./reveal-Bjc2TZu1.js")).createReveal(s)), (document.documentElement.hasAttribute("data-env-micro") || o.querySelector("[data-env-hover]")) && n.push((await import("./micro-B9Y5l6bO.js")).micro), document.documentElement.hasAttribute("data-env-faq") && n.push((await import("./faq-Cip6y42V.js")).faq);
  let a, c, l;
  const h = matchMedia("(prefers-reduced-motion: reduce)");
  let u = !1;
  const p = e.transitionOffset ?? 8, v = () => {
    a?.destroy(), a = new mt(i(), n, h.matches);
  };
  v();
  const w = new Set(e.pages ?? []), f = w.has(location.pathname) ? new ft({ containers: [t], animationSelector: !1, linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])", ignoreVisit: (d, { el: S } = {}) => {
    const E = new URL(d, location.href);
    return E.origin !== location.origin || !w.has(E.pathname) || !!S?.closest("[data-no-swup]");
  } }) : void 0, m = () => {
    const d = l;
    l = void 0, c?.progress(1), c?.kill(), c = void 0, d && (d.style === null ? d.element.removeAttribute("style") : d.element.setAttribute("style", d.style));
  };
  f?.hooks.replace("animation:out:await", async () => {
    const d = i();
    l = { element: d, style: d.getAttribute("style") }, h.matches || (c = s.to(d, { opacity: 0, y: -p, duration: 0.18 }), await c);
  }), f?.hooks.replace("content:replace", async (d, S, E) => {
    const k = d.to.document;
    if (!k || !E) throw new Error("[ENV] Missing incoming document/replacement handler");
    try {
      await e.adapter?.prepare(k, d.to.url);
    } catch (x) {
      throw m(), console.info("[ENV] Native navigation fallback", x), x;
    }
    u || d.done || (a?.destroy(), a = void 0, m(), await e.adapter?.leave(), !(u || d.done) && (await E(d, S), await e.adapter?.enter(k, d.to.url), !u && !d.done && v()));
  }), f?.hooks.on("page:view", () => {
    document.querySelectorAll("a[href]").forEach((k) => {
      if (k.getAttribute("href")?.includes("#")) return;
      const x = k.origin === location.origin && k.pathname === location.pathname;
      k.classList.toggle("w--current", x), x ? k.setAttribute("aria-current", "page") : k.removeAttribute("aria-current");
    });
    const d = i(), S = d.matches("body, [data-env-shell]") ? d.querySelector("main") ?? d : d, E = S.getAttribute("tabindex");
    S.setAttribute("tabindex", "-1"), S.focus({ preventScroll: !0 }), E === null ? S.removeAttribute("tabindex") : S.setAttribute("tabindex", E);
  }), f?.hooks.replace("animation:in:await", async () => {
    const d = i();
    l = { element: d, style: d.getAttribute("style") }, h.matches || (c = s.fromTo(d, { opacity: 0, y: p }, { opacity: 1, y: 0, duration: 0.25 }), await c, m());
  }), f?.hooks.on("fetch:error", () => m()), f?.hooks.on("visit:abort", () => m()), f?.hooks.on("visit:fail", () => m());
  const b = () => {
    u || (m(), v());
  };
  return h.addEventListener("change", b), { swup: f, destroy() {
    u || (u = !0, f?.destroy(), m(), a?.destroy(), e.adapter?.destroy?.(), h.removeEventListener("change", b));
  } };
}
export {
  mt as PageScope,
  gt as createEngine
};
//# sourceMappingURL=env-motion.js.map
