const ze = /* @__PURE__ */ new WeakMap();
function Ie(o, t, e, i) {
  if (!o && !ze.has(t))
    return !1;
  const r = ze.get(t) ?? /* @__PURE__ */ new WeakMap();
  ze.set(t, r);
  const n = r.get(e) ?? /* @__PURE__ */ new Set();
  r.set(e, n);
  const s = n.has(i);
  return o ? n.add(i) : n.delete(i), s && o;
}
function Zr(o, t) {
  let e = o.target;
  if (e instanceof Text && (e = e.parentElement), e instanceof Element && o.currentTarget instanceof Node) {
    const i = e.closest(t);
    if (i && o.currentTarget.contains(i))
      return i;
  }
}
function Qi(o, t, e, i = {}) {
  if (Array.isArray(t)) {
    for (const m of t)
      Qi(o, m, e, i);
    return;
  }
  const r = t, { signal: n, base: s = document } = i;
  if (n?.aborted)
    return;
  const { once: a, ...l } = i, u = s instanceof Document ? s.documentElement : s, h = !!(typeof i == "object" ? i.capture : i), f = (m) => {
    const c = Zr(m, String(o));
    if (c) {
      const p = Object.assign(m, { delegateTarget: c });
      e.call(u, p), a && (u.removeEventListener(r, f, l), Ie(!1, u, e, d));
    }
  }, d = JSON.stringify({ selector: o, type: r, capture: h });
  Ie(!0, u, e, d) || u.addEventListener(r, f, l), n?.addEventListener("abort", () => {
    Ie(!1, u, e, d);
  });
}
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e) ({}).hasOwnProperty.call(e, i) && (o[i] = e[i]);
    }
    return o;
  }, $.apply(null, arguments);
}
const Zi = (o, t) => String(o).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || t || "", jt = ({ hash: o } = {}) => window.location.pathname + window.location.search + (o ? window.location.hash : ""), Jr = (o, t = {}) => {
  const e = $({ url: o = o || jt({ hash: !0 }), random: Math.random(), source: "swup" }, t);
  window.history.pushState(e, "", o);
}, oe = (o = null, t = {}) => {
  o = o || jt({ hash: !0 });
  const e = $({}, window.history.state || {}, { url: o, random: Math.random(), source: "swup" }, t);
  window.history.replaceState(e, "", o);
}, tn = (o, t, e, i) => {
  const r = new AbortController();
  return i = $({}, i, { signal: r.signal }), Qi(o, t, e, i), { destroy: () => r.abort() };
};
class K extends URL {
  constructor(t, e = document.baseURI) {
    super(t.toString(), e), Object.setPrototypeOf(this, K.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(t) {
    const e = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
    return new K(e);
  }
  static fromUrl(t) {
    return new K(t);
  }
}
class ye extends Error {
  constructor(t, e) {
    super(t), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = e.url, this.status = e.status, this.aborted = e.aborted || !1, this.timedOut = e.timedOut || !1;
  }
}
async function en(o, t = {}) {
  var e;
  o = K.fromUrl(o).url;
  const { visit: i = this.visit } = t, r = $({}, this.options.requestHeaders, t.headers), n = (e = t.timeout) != null ? e : this.options.timeout, s = new AbortController(), { signal: a } = s;
  t = $({}, t, { headers: r, signal: a });
  let l, u = !1, h = null;
  n && n > 0 && (h = setTimeout(() => {
    u = !0, s.abort("timeout");
  }, n));
  try {
    l = await this.hooks.call("fetch:request", i, { url: o, options: t }, (p, { url: v, options: g }) => fetch(v, g)), h && clearTimeout(h);
  } catch (p) {
    throw u ? (this.hooks.call("fetch:timeout", i, { url: o }), new ye(`Request timed out: ${o}`, { url: o, timedOut: u })) : p?.name === "AbortError" || a.aborted ? new ye(`Request aborted: ${o}`, { url: o, aborted: !0 }) : p;
  }
  const { status: f, url: d } = l, _ = await l.text();
  if (f === 500) throw this.hooks.call("fetch:error", i, { status: f, response: l, url: d }), new ye(`Server error: ${d}`, { status: f, url: d });
  if (!_) throw new ye(`Empty response: ${d}`, { status: f, url: d });
  const { url: m } = K.fromUrl(d), c = { url: m, html: _ };
  return !i.cache.write || t.method && t.method !== "GET" || o !== m || this.cache.set(c.url, c), c;
}
class rn {
  constructor(t) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = t;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const t = /* @__PURE__ */ new Map();
    return this.pages.forEach((e, i) => {
      t.set(i, $({}, e));
    }), t;
  }
  has(t) {
    return this.pages.has(this.resolve(t));
  }
  get(t) {
    const e = this.pages.get(this.resolve(t));
    return e && $({}, e);
  }
  set(t, e) {
    e = $({}, e, { url: t = this.resolve(t) }), this.pages.set(t, e), this.swup.hooks.callSync("cache:set", void 0, { page: e });
  }
  update(t, e) {
    t = this.resolve(t);
    const i = $({}, this.get(t), e, { url: t });
    this.pages.set(t, i);
  }
  delete(t) {
    this.pages.delete(this.resolve(t));
  }
  clear() {
    this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
  }
  prune(t) {
    this.pages.forEach((e, i) => {
      t(i, e) && this.delete(i);
    });
  }
  resolve(t) {
    const { url: e } = K.fromUrl(t);
    return this.swup.resolveUrl(e);
  }
}
const He = (o, t = document) => t.querySelector(o), ui = (o, t = document) => Array.from(t.querySelectorAll(o)), Ji = () => new Promise((o) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      o();
    });
  });
});
function tr(o) {
  return !!o && (typeof o == "object" || typeof o == "function") && typeof o.then == "function";
}
function nn(o, t = []) {
  return new Promise((e, i) => {
    const r = o(...t);
    tr(r) ? r.then(e, i) : e(r);
  });
}
function Ai(o, t) {
  const e = o?.closest(`[${t}]`);
  return e != null && e.hasAttribute(t) ? e?.getAttribute(t) || !0 : void 0;
}
class sn {
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
    return this.selector.trim() ? ui(this.selector) : [];
  }
  add(...t) {
    this.targets.forEach((e) => e.classList.add(...t));
  }
  remove(...t) {
    this.targets.forEach((e) => e.classList.remove(...t));
  }
  clear() {
    this.targets.forEach((t) => {
      const e = t.className.split(" ").filter((i) => this.isSwupClass(i));
      t.classList.remove(...e);
    });
  }
  isSwupClass(t) {
    return this.swupClasses.some((e) => t.startsWith(e));
  }
}
class er {
  constructor(t, e) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: i, from: r, hash: n, el: s, event: a } = e;
    this.id = Math.random(), this.state = 1, this.from = { url: r ?? t.location.url, hash: t.location.hash }, this.to = { url: i, hash: n }, this.containers = t.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: t.options.native, scope: t.options.animationScope, selector: t.options.animationSelector }, this.trigger = { el: s, event: a }, this.cache = { read: t.options.cache, write: t.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
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
function on(o) {
  return new er(this, o);
}
class an {
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
    const e = this.registry.get(t);
    if (e) return e;
    console.error(`Unknown hook '${t}'`);
  }
  clear() {
    this.registry.forEach((t) => t.clear());
  }
  on(t, e, i = {}) {
    const r = this.get(t);
    if (!r) return console.warn(`Hook '${t}' not found.`), () => {
    };
    const n = $({}, i, { id: ++this.nextHookId, hook: t, handler: e });
    return r.set(e, n), () => this.off(t, e);
  }
  before(t, e, i = {}) {
    return this.on(t, e, $({}, i, { before: !0 }));
  }
  replace(t, e, i = {}) {
    return this.on(t, e, $({}, i, { replace: !0 }));
  }
  once(t, e, i = {}) {
    return this.on(t, e, $({}, i, { once: !0 }));
  }
  off(t, e) {
    const i = this.get(t);
    i && e ? i.delete(e) || console.warn(`Handler for hook '${t}' not found.`) : i && i.clear();
  }
  async call(t, e, i, r) {
    const [n, s, a] = this.parseCallArgs(t, e, i, r), { before: l, handler: u, after: h } = this.getHandlers(t, a);
    await this.run(l, n, s);
    const [f] = await this.run(u, n, s, !0);
    return await this.run(h, n, s), this.dispatchDomEvent(t, n, s), f;
  }
  callSync(t, e, i, r) {
    const [n, s, a] = this.parseCallArgs(t, e, i, r), { before: l, handler: u, after: h } = this.getHandlers(t, a);
    this.runSync(l, n, s);
    const [f] = this.runSync(u, n, s, !0);
    return this.runSync(h, n, s), this.dispatchDomEvent(t, n, s), f;
  }
  parseCallArgs(t, e, i, r) {
    return e instanceof er || typeof e != "object" && typeof i != "function" ? [e, i, r] : [void 0, e, i];
  }
  async run(t, e = this.swup.visit, i, r = !1) {
    const n = [];
    for (const { hook: s, handler: a, defaultHandler: l, once: u } of t) if (e == null || !e.done) {
      u && this.off(s, a);
      try {
        const h = await nn(a, [e, i, l]);
        n.push(h);
      } catch (h) {
        if (r) throw h;
        console.error(`Error in hook '${s}':`, h);
      }
    }
    return n;
  }
  runSync(t, e = this.swup.visit, i, r = !1) {
    const n = [];
    for (const { hook: s, handler: a, defaultHandler: l, once: u } of t) if (e == null || !e.done) {
      u && this.off(s, a);
      try {
        const h = a(e, i, l);
        n.push(h), tr(h) && console.warn(`Swup will not await Promises in handler for synchronous hook '${s}'.`);
      } catch (h) {
        if (r) throw h;
        console.error(`Error in hook '${s}':`, h);
      }
    }
    return n;
  }
  getHandlers(t, e) {
    const i = this.get(t);
    if (!i) return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const r = Array.from(i.values()), n = this.sortRegistrations, s = r.filter(({ before: f, replace: d }) => f && !d).sort(n), a = r.filter(({ replace: f }) => f).filter((f) => !0).sort(n), l = r.filter(({ before: f, replace: d }) => !f && !d).sort(n), u = a.length > 0;
    let h = [];
    if (e && (h = [{ id: 0, hook: t, handler: e }], u)) {
      const f = a.length - 1, { handler: d, once: _ } = a[f], m = (c) => {
        const p = a[c - 1];
        return p ? (v, g) => p.handler(v, g, m(c - 1)) : e;
      };
      h = [{ id: 0, hook: t, once: _, handler: d, defaultHandler: m(f) }];
    }
    return { found: !0, before: s, handler: h, after: l, replaced: u };
  }
  sortRegistrations(t, e) {
    var i, r;
    return ((i = t.priority) != null ? i : 0) - ((r = e.priority) != null ? r : 0) || t.id - e.id || 0;
  }
  dispatchDomEvent(t, e, i) {
    if (e != null && e.done) return;
    const r = { hook: t, args: i, visit: e || this.swup.visit };
    document.dispatchEvent(new CustomEvent("swup:any", { detail: r, bubbles: !0 })), document.dispatchEvent(new CustomEvent(`swup:${t}`, { detail: r, bubbles: !0 }));
  }
  parseName(t) {
    const [e, ...i] = t.split(".");
    return [e, i.reduce((r, n) => $({}, r, { [n]: !0 }), {})];
  }
}
const ln = (o) => {
  if (o && o.charAt(0) === "#" && (o = o.substring(1)), !o) return null;
  const t = decodeURIComponent(o);
  let e = document.getElementById(o) || document.getElementById(t) || He(`a[name='${CSS.escape(o)}']`) || He(`a[name='${CSS.escape(t)}']`);
  return e || o !== "top" || (e = document.body), e;
}, we = "transition", Ue = "animation";
async function un({ selector: o, elements: t }) {
  if (o === !1 && !t) return;
  let e = [];
  if (t) e = Array.from(t);
  else if (o && (e = ui(o, document.body), !e.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${o}\``);
  const i = e.map((r) => (function(n) {
    const { type: s, timeout: a, propCount: l } = (function(u) {
      const h = window.getComputedStyle(u), f = xe(h, `${we}Delay`), d = xe(h, `${we}Duration`), _ = Ei(f, d), m = xe(h, `${Ue}Delay`), c = xe(h, `${Ue}Duration`), p = Ei(m, c), v = Math.max(_, p), g = v > 0 ? _ > p ? we : Ue : null;
      return { type: g, timeout: v, propCount: g ? g === we ? d.length : c.length : 0 };
    })(n);
    return !(!s || !a) && new Promise((u) => {
      const h = `${s}end`, f = performance.now();
      let d = 0;
      const _ = () => {
        n.removeEventListener(h, m), u();
      }, m = (c) => {
        c.target === n && ((performance.now() - f) / 1e3 < c.elapsedTime || ++d >= l && _());
      };
      setTimeout(() => {
        d < l && _();
      }, a + 1), n.addEventListener(h, m);
    });
  })(r)).filter((r) => r !== !1);
  i.length ? await Promise.all(i) : o && console.warn(`[swup] No CSS animation duration defined on elements matching \`${o}\``);
}
function xe(o, t) {
  return (o[t] || "").split(", ");
}
function Ei(o, t) {
  for (; o.length < t.length; ) o = o.concat(o);
  return Math.max(...t.map((e, i) => Mi(e) + Mi(o[i])));
}
function Mi(o) {
  return 1e3 * parseFloat(o);
}
function hn(o, t = {}, e = {}) {
  if (typeof o != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(o, { el: e.el, event: e.event })) return void window.location.assign(o);
  const { url: i, hash: r } = K.fromUrl(o), n = this.createVisit($({}, e, { to: i, hash: r }));
  this.performNavigation(n, t);
}
async function cn(o, t = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return o.state = 2, void (this.onVisitEnd = () => this.performNavigation(o, t));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = o;
  const { el: e } = o.trigger;
  t.referrer = t.referrer || this.location.url, t.animate === !1 && (o.animation.animate = !1), o.animation.animate || this.classes.clear();
  const i = t.history || Ai(e, "data-swup-history");
  typeof i == "string" && ["push", "replace"].includes(i) && (o.history.action = i);
  const r = t.animation || Ai(e, "data-swup-animation");
  var n, s;
  typeof r == "string" && (o.animation.name = r), o.meta = t.meta || {}, typeof t.cache == "object" ? (o.cache.read = (n = t.cache.read) != null ? n : o.cache.read, o.cache.write = (s = t.cache.write) != null ? s : o.cache.write) : t.cache !== void 0 && (o.cache = { read: !!t.cache, write: !!t.cache }), delete t.cache;
  try {
    await this.hooks.call("visit:start", o, void 0), o.state = 3;
    const a = this.hooks.call("page:load", o, { options: t }, async (u, h) => {
      let f;
      return u.cache.read && (f = this.cache.get(u.to.url)), h.page = f || await this.fetchPage(u.to.url, h.options), h.cache = !!f, h.page;
    });
    a.then(({ html: u }) => {
      o.advance(5), o.to.html = u, o.to.document = new DOMParser().parseFromString(u, "text/html");
    });
    const l = o.to.url + o.to.hash;
    if (o.history.popstate || (o.history.action === "replace" || o.to.url === this.location.url ? oe(l) : (this.currentHistoryIndex++, Jr(l, { index: this.currentHistoryIndex }))), this.location = K.fromUrl(l), o.history.popstate && this.classes.add("is-popstate"), o.animation.name && this.classes.add(`to-${Zi(o.animation.name)}`), o.animation.wait && await a, o.ignored) throw new Error(`Visit to ${o.to.url} manually ignored`);
    if (o.done || (await this.hooks.call("visit:transition", o, void 0, async () => {
      if (!o.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(o, await a);
      o.advance(4), await this.animatePageOut(o), o.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(o, await a)).finished : await this.renderPage(o, await a), await this.animatePageIn(o);
    }), o.done)) return;
    await this.hooks.call("visit:end", o, void 0, () => this.classes.clear()), o.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (a) {
    if (!a || a != null && a.aborted) return void o.advance(8);
    if (o.ignored) return void Di.call(this, o);
    await this.hooks.call("visit:fail", o, { error: a }, (l, { error: u }) => {
      console.error(u), Di.call(this, l);
    }), o.advance(9);
  } finally {
    delete o.to.document, this.visit === o && (this.navigating = !1);
  }
}
function Di(o) {
  const t = o.to.url + o.to.hash;
  jt() === o.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(t), { once: !0 }), window.history.back()) : window.location.assign(t);
}
const fn = async function(o) {
  await this.hooks.call("animation:out:start", o, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", o, { skip: !1 }, (t, { skip: e }) => {
    if (!e) return this.awaitAnimations({ selector: t.animation.selector });
  }), await this.hooks.call("animation:out:end", o, void 0);
}, dn = function(o) {
  var t;
  const e = o.to.document;
  if (!e) return !1;
  const i = ((t = e.querySelector("title")) == null ? void 0 : t.innerText) || "";
  document.title = i;
  const r = ui('[data-swup-persist]:not([data-swup-persist=""])'), n = o.containers.map((s) => {
    const a = document.querySelector(s), l = e.querySelector(s);
    return a && l ? (a.replaceWith(l.cloneNode(!0)), !0) : (a || console.warn(`[swup] Container missing in current document: ${s}`), l || console.warn(`[swup] Container missing in incoming document: ${s}`), !1);
  }).filter(Boolean);
  return r.forEach((s) => {
    const a = s.getAttribute("data-swup-persist"), l = He(`[data-swup-persist="${a}"]`);
    l && l !== s && l.replaceWith(s);
  }), n.length === o.containers.length;
}, _n = function(o) {
  const t = { behavior: "auto" }, { target: e, reset: i } = o.scroll, r = e ?? o.to.hash;
  let n = !1;
  return r && (n = this.hooks.callSync("scroll:anchor", o, { hash: r, options: t }, (s, { hash: a, options: l }) => {
    const u = this.getAnchorElement(a);
    return u && u.scrollIntoView(l), !!u;
  })), i && !n && (n = this.hooks.callSync("scroll:top", o, { options: t }, (s, { options: a }) => (window.scrollTo($({ top: 0, left: 0 }, a)), !0))), n;
}, pn = async function(o) {
  if (o.done) return;
  const t = this.hooks.call("animation:in:await", o, { skip: !1 }, (e, { skip: i }) => {
    if (!i) return this.awaitAnimations({ selector: e.animation.selector });
  });
  await Ji(), await this.hooks.call("animation:in:start", o, void 0, () => {
    this.classes.remove("is-animating");
  }), await t, await this.hooks.call("animation:in:end", o, void 0);
}, mn = async function(o, t) {
  if (o.done) return;
  o.advance(6);
  const { url: e } = t;
  this.isSameResolvedUrl(jt(), e) || (oe(e), this.location = K.fromUrl(e), o.to.url = this.location.url, o.to.hash = this.location.hash), await this.hooks.call("content:replace", o, { page: t }, (i, {}) => {
    if (this.classes.remove("is-leaving"), i.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(i)) throw new Error("[swup] Container mismatch, aborting");
    i.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), i.animation.name && this.classes.add(`to-${Zi(i.animation.name)}`));
  }), await this.hooks.call("content:scroll", o, void 0, () => this.scrollToContent(o)), await this.hooks.call("page:view", o, { url: this.location.url, title: document.title });
}, gn = function(o) {
  var t;
  if (t = o, !!t?.isSwupPlugin) {
    if (o.swup = this, !o._checkRequirements || o._checkRequirements()) return o._beforeMount && o._beforeMount(), o.mount(), this.plugins.push(o), this.plugins;
  } else console.error("Not a swup plugin instance", o);
};
function vn(o) {
  const t = this.findPlugin(o);
  if (t) return t.unmount(), t._afterUnmount && t._afterUnmount(), this.plugins = this.plugins.filter((e) => e !== t), this.plugins;
  console.error("No such plugin", t);
}
function yn(o) {
  return this.plugins.find((t) => typeof o == "string" ? [`Swup${o}`, o].includes(t.name) : t === o);
}
function wn(o) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), o;
  const t = this.options.resolveUrl(o);
  return t && typeof t == "string" ? t.startsWith("//") || t.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), o) : t : (console.warn("[swup] options.resolveUrl needs to return a url"), o);
}
function xn(o, t) {
  return this.resolveUrl(o) === this.resolveUrl(t);
}
const bn = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (o, { el: t } = {}) => !(t == null || !t.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (o) => o, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (o) => {
  var t;
  return ((t = o.state) == null ? void 0 : t.source) !== "swup";
}, timeout: 0 };
class Tn {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(t = {}) {
    var e, i;
    this.version = "4.10.0", this.options = void 0, this.defaults = bn, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = K.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = gn, this.unuse = vn, this.findPlugin = yn, this.log = () => {
    }, this.navigate = hn, this.performNavigation = cn, this.createVisit = on, this.delegateEvent = tn, this.fetchPage = en, this.awaitAnimations = un, this.renderPage = mn, this.replaceContent = dn, this.animatePageIn = pn, this.animatePageOut = fn, this.scrollToContent = _n, this.getAnchorElement = ln, this.getCurrentUrl = jt, this.resolveUrl = wn, this.isSameResolvedUrl = xn, this.options = $({}, this.defaults, t), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new rn(this), this.classes = new sn(this), this.hooks = new an(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (e = (i = window.history.state) == null ? void 0 : i.index) != null ? e : 1, this.enable();
  }
  async enable() {
    var t;
    const { linkSelector: e } = this.options;
    this.clickDelegate = this.delegateEvent(e, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((i) => this.use(i));
    for (const [i, r] of Object.entries(this.options.hooks)) {
      const [n, s] = this.hooks.parseName(i);
      this.hooks.on(n, r, s);
    }
    ((t = window.history.state) == null ? void 0 : t.source) !== "swup" && oe(null, { index: this.currentHistoryIndex }), await Ji(), await this.hooks.call("enable", void 0, void 0, () => {
      const i = document.documentElement;
      i.classList.add("swup-enabled"), i.classList.toggle("swup-native", this.options.native);
    });
  }
  async destroy() {
    this.clickDelegate.destroy(), window.removeEventListener("popstate", this.handlePopState), this.cache.clear(), this.plugins.forEach((t) => this.unuse(t)), await this.hooks.call("disable", void 0, void 0, () => {
      const t = document.documentElement;
      t.classList.remove("swup-enabled"), t.classList.remove("swup-native");
    }), this.hooks.clear();
  }
  shouldIgnoreVisit(t, { el: e, event: i } = {}) {
    const { origin: r, url: n, hash: s } = K.fromUrl(t);
    return r !== window.location.origin || !(!e || !this.triggerWillOpenNewWindow(e)) || !!this.options.ignoreVisit(n + s, { el: e, event: i });
  }
  handleLinkClick(t) {
    const e = t.delegateTarget, { href: i, url: r, hash: n } = K.fromElement(e);
    if (this.shouldIgnoreVisit(i, { el: e, event: t })) return;
    if (this.navigating && r === this.visit.to.url) return void t.preventDefault();
    const s = this.createVisit({ to: r, hash: n, el: e, event: t });
    t.metaKey || t.ctrlKey || t.shiftKey || t.altKey ? this.hooks.callSync("link:newtab", s, { href: i }) : t.button === 0 && this.hooks.callSync("link:click", s, { el: e, event: t }, () => {
      var a;
      const l = (a = s.from.url) != null ? a : "";
      t.preventDefault(), r && r !== l ? this.isSameResolvedUrl(r, l) || this.performNavigation(s) : n ? this.hooks.callSync("link:anchor", s, { hash: n }, () => {
        oe(r + n), this.scrollToContent(s);
      }) : this.hooks.callSync("link:self", s, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(s) : (oe(r), this.scrollToContent(s));
      });
    });
  }
  handlePopState(t) {
    var e, i, r, n;
    const s = (e = (i = t.state) == null ? void 0 : i.url) != null ? e : window.location.href;
    if (this.options.skipPopStateHandling(t) || this.isSameResolvedUrl(jt(), this.location.url)) return;
    const { url: a, hash: l } = K.fromUrl(s), u = this.createVisit({ to: a, hash: l, event: t });
    u.history.popstate = !0;
    const h = (r = (n = t.state) == null ? void 0 : n.index) != null ? r : 0;
    h && h !== this.currentHistoryIndex && (u.history.direction = h - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = h), u.animation.animate = !1, u.scroll.reset = !1, u.scroll.target = !1, this.options.animateHistoryBrowsing && !t.hasUAVisualTransition && (u.animation.animate = !0, u.scroll.reset = !0), this.hooks.callSync("history:popstate", u, { event: t }, () => {
      this.performNavigation(u);
    });
  }
  triggerWillOpenNewWindow(t) {
    return !!t.matches('[download], [target="_blank"]');
  }
}
function vt(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function ir(o, t) {
  o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.__proto__ = t;
}
var ot = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, he = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, hi, X, M, ct = 1e8, A = 1 / ct, Ge = Math.PI * 2, kn = Ge / 4, Sn = 0, rr = Math.sqrt, Pn = Math.cos, On = Math.sin, Y = function(t) {
  return typeof t == "string";
}, I = function(t) {
  return typeof t == "function";
}, wt = function(t) {
  return typeof t == "number";
}, ci = function(t) {
  return typeof t > "u";
}, mt = function(t) {
  return typeof t == "object";
}, Q = function(t) {
  return t !== !1;
}, fi = function() {
  return typeof window < "u";
}, be = function(t) {
  return I(t) || Y(t);
}, nr = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, G = Array.isArray, Cn = /random\([^)]+\)/g, An = /,\s*/g, Ri = /(?:-?\.?\d|\.)+/gi, sr = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Wt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ne = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, or = /[+-]=-?[.\d]+/, En = /[^,'"\[\]\s]+/gi, Mn = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, R, dt, je, di, at = {}, Pe = {}, ar, lr = function(t) {
  return (Pe = Kt(t, at)) && et;
}, _i = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, ce = function(t, e) {
  return !e && console.warn(t);
}, ur = function(t, e) {
  return t && (at[t] = e) && Pe && (Pe[t] = e) || at;
}, fe = function() {
  return 0;
}, Dn = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Te = {
  suppressEvents: !0,
  kill: !1
}, Rn = {
  suppressEvents: !0
}, pi = {}, St = [], Ke = {}, hr, it = {}, Ve = {}, Li = 30, ke = [], mi = "", gi = function(t) {
  var e = t[0], i, r;
  if (mt(e) || I(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ke.length; r-- && !ke[r].targetTest(e); )
      ;
    i = ke[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new Dr(t[r], i))) || t.splice(r, 1);
  return t;
}, It = function(t) {
  return t._gsap || gi(ft(t))[0]._gsap;
}, cr = function(t, e, i) {
  return (i = t[e]) && I(i) ? t[e]() : ci(i) && t.getAttribute && t.getAttribute(e) || i;
}, Z = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, V = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, D = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Xt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, Ln = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Oe = function() {
  var t = St.length, e = St.slice(0), i, r;
  for (Ke = {}, St.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, vi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, fr = function(t, e, i, r) {
  St.length && !X && Oe(), t.render(e, i, !!(X && e < 0 && vi(t))), St.length && !X && Oe();
}, dr = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(En).length < 2 ? e : Y(t) ? t.trim() : t;
}, _r = function(t) {
  return t;
}, lt = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Fn = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Kt = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Fi = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = mt(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Ce = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, ae = function(t) {
  var e = t.parent || R, i = t.keyframes ? Fn(G(t.keyframes)) : lt;
  if (Q(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, zn = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, pr = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Re = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Ot = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Ut = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, In = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Qe = function(t, e, i, r) {
  return t._startAt && (X ? t._startAt.revert(Te) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, Un = function o(t) {
  return !t || t._ts && o(t.parent);
}, zi = function(t) {
  return t._repeat ? Qt(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Qt = function(t, e) {
  var i = Math.floor(t = D(t / e));
  return t && i === t ? i - 1 : i;
}, Ae = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Le = function(t) {
  return t._end = D(t._start + (t._tDur / Math.abs(t._ts || t._rts || A) || 0));
}, Fe = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = D(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Le(t), i._dirty || Ut(i, t)), t;
}, mr = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Ae(t.rawTime(), e), (!e._dur || ve(0, e.totalDuration(), i) - e._tTime > A) && e.render(i, !0)), Ut(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -A;
  }
}, _t = function(t, e, i, r) {
  return e.parent && Ot(e), e._start = D((wt(i) ? i : i || t !== R ? ht(t, i, e) : t._time) + e._delay), e._end = D(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), pr(t, e, "_first", "_last", t._sort ? "_start" : 0), Ze(e) || (t._recent = e), r || mr(t, e), t._ts < 0 && Fe(t, t._tTime), t;
}, gr = function(t, e) {
  return (at.ScrollTrigger || _i("scrollTrigger", e)) && at.ScrollTrigger.create(e, t);
}, vr = function(t, e, i, r, n) {
  if (wi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !X && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && hr !== rt.frame)
    return St.push(t), t._lazy = [n, r], 1;
}, Nn = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, Ze = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Vn = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && Nn(t) && !(!t._initted && Ze(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ze(t)) ? 0 : 1, a = t._rDelay, l = 0, u, h, f;
  if (a && t._repeat && (l = ve(0, t._tDur, e), h = Qt(l, a), t._yoyo && h & 1 && (s = 1 - s), h !== Qt(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || X || r || t._zTime === A || !e && t._zTime) {
    if (!t._initted && vr(t, e, r, i, l))
      return;
    for (f = t._zTime, t._zTime = e || (i ? A : 0), i || (i = e && !f), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    e < 0 && Qe(t, e, i, !0), t._onUpdate && !i && nt(t, "onUpdate"), l && t._repeat && !i && t.parent && nt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Ot(t, 1), !i && !X && (nt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Bn = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, Zt = function(t, e, i, r) {
  var n = t._repeat, s = D(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : D(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && Fe(t, t._tTime = t._tDur * a), t.parent && Le(t), i || Ut(t.parent, t), t;
}, Ii = function(t) {
  return t instanceof j ? Ut(t) : Zt(t, t._dur);
}, qn = {
  _start: 0,
  endTime: fe,
  totalDuration: fe
}, ht = function o(t, e, i) {
  var r = t.labels, n = t._recent || qn, s = t.duration() >= ct ? n.endTime(!1) : t._dur, a, l, u;
  return Y(e) && (isNaN(e) || e in r) ? (l = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && i && (l = l / 100 * (G(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + l : s + l)) : e == null ? s : +e;
}, le = function(t, e, i) {
  var r = wt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, l;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = Q(l.vars.inherit) && l.parent;
    s.immediateRender = Q(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new B(e[0], s, e[n + 1]);
}, Et = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, ve = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, H = function(t, e) {
  return !Y(t) || !(e = Mn.exec(t)) ? "" : e[1];
}, $n = function(t, e, i) {
  return Et(i, function(r) {
    return ve(t, e, r);
  });
}, Je = [].slice, yr = function(t, e) {
  return t && mt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && mt(t[0])) && !t.nodeType && t !== dt;
}, Wn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Y(r) && !e || yr(r, 1) ? (n = i).push.apply(n, ft(r)) : i.push(r);
  }) || i;
}, ft = function(t, e, i) {
  return M && !e && M.selector ? M.selector(t) : Y(t) && !i && (je || !Jt()) ? Je.call((e || di).querySelectorAll(t), 0) : G(t) ? Wn(t, i) : yr(t) ? Je.call(t, 0) : t ? [t] : [];
}, ti = function(t) {
  return t = ft(t)[0] || ce("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return ft(e, i.querySelectorAll ? i : i === t ? ce("Invalid scope") || di.createElement("div") : t);
  };
}, wr = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, xr = function(t) {
  if (I(t))
    return t;
  var e = mt(t) ? t : {
    each: t
  }, i = Nt(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, l = isNaN(r) || a, u = e.axis, h = r, f = r;
  return Y(r) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && l && (h = r[0], f = r[1]), function(d, _, m) {
    var c = (m || e).length, p = s[c], v, g, w, x, y, S, b, k, T;
    if (!p) {
      if (T = e.grid === "auto" ? 0 : (e.grid || [1, ct])[1], !T) {
        for (b = -ct; b < (b = m[T++].getBoundingClientRect().left) && T < c; )
          ;
        T < c && T--;
      }
      for (p = s[c] = [], v = l ? Math.min(T, c) * h - 0.5 : r % T, g = T === ct ? 0 : l ? c * f / T - 0.5 : r / T | 0, b = 0, k = ct, S = 0; S < c; S++)
        w = S % T - v, x = g - (S / T | 0), p[S] = y = u ? Math.abs(u === "y" ? x : w) : rr(w * w + x * x), y > b && (b = y), y < k && (k = y);
      r === "random" && wr(p), p.max = b - k, p.min = k, p.v = c = (parseFloat(e.amount) || parseFloat(e.each) * (T > c ? c - 1 : u ? u === "y" ? c / T : T : Math.max(T, c / T)) || 0) * (r === "edges" ? -1 : 1), p.b = c < 0 ? n - c : n, p.u = H(e.amount || e.each) || 0, i = i && c < 0 ? rs(i) : i;
    }
    return c = (p[d] - p.min) / p.max || 0, D(p.b + (i ? i(c) : c) * p.v) + p.u;
  };
}, ei = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = D(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (wt(i) ? 0 : H(i));
  };
}, br = function(t, e) {
  var i = G(t), r, n;
  return !i && mt(t) && (r = i = t.radius || ct, t.values ? (t = ft(t.values), (n = !wt(t[0])) && (r *= r)) : t = ei(t.increment)), Et(e, i ? I(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = ct, h = 0, f = t.length, d, _; f--; )
      n ? (d = t[f].x - a, _ = t[f].y - l, d = d * d + _ * _) : d = Math.abs(t[f] - a), d < u && (u = d, h = f);
    return h = !r || u <= r ? t[h] : s, n || h === s || wt(s) ? h : h + H(s);
  } : ei(t));
}, Tr = function(t, e, i, r) {
  return Et(G(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return G(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, Yn = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, Xn = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || H(i));
  };
}, Hn = function(t, e, i) {
  return Sr(t, e, 0, 1, i);
}, kr = function(t, e, i) {
  return Et(i, function(r) {
    return t[~~e(r)];
  });
}, Gn = function o(t, e, i) {
  var r = e - t;
  return G(t) ? kr(t, o(0, t.length), e) : Et(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, jn = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return G(t) ? kr(t, o(0, t.length - 1), e) : Et(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, de = function(t) {
  return t.replace(Cn, function(e) {
    var i = e.indexOf("[") + 1, r = e.substring(i || 7, i ? e.indexOf("]") : e.length - 1).split(An);
    return Tr(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5);
  });
}, Sr = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Et(n, function(l) {
    return i + ((l - t) / s * a || 0);
  });
}, Kn = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(_) {
    return (1 - _) * t + _ * e;
  };
  if (!n) {
    var s = Y(t), a = {}, l, u, h, f, d;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (G(t) && !G(e)) {
      for (h = [], f = t.length, d = f - 2, u = 1; u < f; u++)
        h.push(o(t[u - 1], t[u]));
      f--, n = function(m) {
        m *= f;
        var c = Math.min(d, ~~m);
        return h[c](m - c);
      }, i = e;
    } else r || (t = Kt(G(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        yi.call(a, t, l, "get", e[l]);
      n = function(m) {
        return Ti(m, a) || (s ? t.p : t);
      };
    }
  }
  return Et(i, n);
}, Ui = function(t, e, i) {
  var r = t.labels, n = ct, s, a, l;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (l = s, n = a);
  return l;
}, nt = function(t, e, i) {
  var r = t.vars, n = r[e], s = M, a = t._ctx, l, u, h;
  if (n)
    return l = r[e + "Params"], u = r.callbackScope || t, i && St.length && Oe(), a && (M = a), h = l ? n.apply(u, l) : n.call(u), M = s, h;
}, ne = function(t) {
  return Ot(t), t.scrollTrigger && t.scrollTrigger.kill(!!X), t.progress() < 1 && nt(t, "onInterrupt"), t;
}, Yt, Pr = [], Or = function(t) {
  if (t)
    if (t = !t.name && t.default || t, fi() || t.headless) {
      var e = t.name, i = I(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: fe,
        render: Ti,
        add: yi,
        kill: ds,
        modifier: fs,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: bi,
        aliases: {},
        register: 0
      };
      if (Jt(), t !== r) {
        if (it[e])
          return;
        lt(r, lt(Ce(t, n), s)), Kt(r.prototype, Kt(n, Ce(t, s))), it[r.prop = e] = r, t.targetTest && (ke.push(r), pi[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      ur(e, r), t.register && t.register(et, r, J);
    } else
      Pr.push(t);
}, C = 255, se = {
  aqua: [0, C, C],
  lime: [0, C, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, C],
  navy: [0, 0, 128],
  white: [C, C, C],
  olive: [128, 128, 0],
  yellow: [C, C, 0],
  orange: [C, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [C, 0, 0],
  pink: [C, 192, 203],
  cyan: [0, C, C],
  transparent: [C, C, C, 0]
}, Be = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * C + 0.5 | 0;
}, Cr = function(t, e, i) {
  var r = t ? wt(t) ? [t >> 16, t >> 8 & C, t & C] : 0 : se.black, n, s, a, l, u, h, f, d, _, m;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), se[t])
      r = se[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & C, r & C, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & C, t & C];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = m = t.match(Ri), !e)
        l = +r[0] % 360 / 360, u = +r[1] / 100, h = +r[2] / 100, s = h <= 0.5 ? h * (u + 1) : h + u - h * u, n = h * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Be(l + 1 / 3, n, s), r[1] = Be(l, n, s), r[2] = Be(l - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(sr), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Ri) || se.transparent;
    r = r.map(Number);
  }
  return e && !m && (n = r[0] / C, s = r[1] / C, a = r[2] / C, f = Math.max(n, s, a), d = Math.min(n, s, a), h = (f + d) / 2, f === d ? l = u = 0 : (_ = f - d, u = h > 0.5 ? _ / (2 - f - d) : _ / (f + d), l = f === n ? (s - a) / _ + (s < a ? 6 : 0) : f === s ? (a - n) / _ + 2 : (n - s) / _ + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(h * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Ar = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Pt).forEach(function(n) {
    var s = n.match(Wt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Ni = function(t, e, i) {
  var r = "", n = (t + r).match(Pt), s = e ? "hsla(" : "rgba(", a = 0, l, u, h, f;
  if (!n)
    return t;
  if (n = n.map(function(d) {
    return (d = Cr(d, e, 1)) && s + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = Ar(t), l = i.c, l.join(r) !== h.c.join(r)))
    for (u = t.replace(Pt, "1").split(Wt), f = u.length - 1; a < f; a++)
      r += u[a] + (~l.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
  if (!u)
    for (u = t.split(Pt), f = u.length - 1; a < f; a++)
      r += u[a] + n[a];
  return r + u[f];
}, Pt = (function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in se)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
})(), Qn = /hsl[a]?\(/, Er = function(t) {
  var e = t.join(" "), i;
  if (Pt.lastIndex = 0, Pt.test(e))
    return i = Qn.test(e), t[1] = Ni(t[1], i), t[0] = Ni(t[0], i, Ar(t[1])), !0;
}, _e, rt = (function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], l, u, h, f, d, _, m = function c(p) {
    var v = o() - r, g = p === !0, w, x, y, S;
    if ((v > t || v < 0) && (i += v - e), r += v, y = r - i, w = y - s, (w > 0 || g) && (S = ++f.frame, d = y - f.time * 1e3, f.time = y = y / 1e3, s += w + (w >= n ? 4 : n - w), x = 1), g || (l = u(c)), x)
      for (_ = 0; _ < a.length; _++)
        a[_](y, d, S, p);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(p) {
      return d / (1e3 / (p || 60));
    },
    wake: function() {
      ar && (!je && fi() && (dt = je = window, di = dt.document || {}, at.gsap = et, (dt.gsapVersions || (dt.gsapVersions = [])).push(et.version), lr(Pe || dt.GreenSockGlobals || !dt.gsap && dt || {}), Pr.forEach(Or)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), u = h || function(p) {
        return setTimeout(p, s - f.time * 1e3 + 1 | 0);
      }, _e = 1, m(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), _e = 0, u = fe;
    },
    lagSmoothing: function(p, v) {
      t = p || 1 / 0, e = Math.min(v || 33, t);
    },
    fps: function(p) {
      n = 1e3 / (p || 240), s = f.time * 1e3 + n;
    },
    add: function(p, v, g) {
      var w = v ? function(x, y, S, b) {
        p(x, y, S, b), f.remove(w);
      } : p;
      return f.remove(p), a[g ? "unshift" : "push"](w), Jt(), w;
    },
    remove: function(p, v) {
      ~(v = a.indexOf(p)) && a.splice(v, 1) && _ >= v && _--;
    },
    _listeners: a
  }, f;
})(), Jt = function() {
  return !_e && rt.wake();
}, O = {}, Zn = /^[\d.\-M][\d.\-,\s]/, Jn = /["']/g, ts = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, l, u; n < s; n++)
    l = i[n], a = n !== s - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), e[r] = isNaN(u) ? u.replace(Jn, "").trim() : +u, r = l.substr(a + 1).trim();
  return e;
}, es = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, is = function(t) {
  var e = (t + "").split("("), i = O[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [ts(e[1])] : es(t).split(",").map(dr)) : O._CE && Zn.test(t) ? O._CE("", t) : i;
}, rs = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Nt = function(t, e) {
  return t && (I(t) ? t : O[t] || is(t)) || e;
}, Bt = function(t, e, i, r) {
  i === void 0 && (i = function(l) {
    return 1 - e(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return Z(t, function(a) {
    O[a] = at[a] = n, O[s = a.toLowerCase()] = i;
    for (var l in n)
      O[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = O[a + "." + l] = n[l];
  }), n;
}, Mr = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, qe = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ge * (Math.asin(1 / r) || 0), a = function(h) {
    return h === 1 ? 1 : r * Math.pow(2, -10 * h) * On((h - s) * n) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Mr(a);
  return n = Ge / n, l.config = function(u, h) {
    return o(t, u, h);
  }, l;
}, $e = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Mr(i);
  return r.config = function(n) {
    return o(t, n);
  }, r;
};
Z("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, t) {
  var e = t < 5 ? t + 1 : t;
  Bt(o + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
O.Linear.easeNone = O.none = O.Linear.easeIn;
Bt("Elastic", qe("in"), qe("out"), qe());
(function(o, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? o * a * a : a < i ? o * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? o * (a -= 2.25 / t) * a + 0.9375 : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Bt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Bt("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
Bt("Circ", function(o) {
  return -(rr(1 - o * o) - 1);
});
Bt("Sine", function(o) {
  return o === 1 ? 1 : -Pn(o * kn) + 1;
});
Bt("Back", $e("in"), $e("out"), $e());
O.SteppedEase = O.steps = at.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - A;
    return function(a) {
      return ((r * ve(0, s, a) | 0) + n) * i;
    };
  }
};
he.ease = O["quad.out"];
Z("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return mi += o + "," + o + "Params,";
});
var Dr = function(t, e) {
  this.id = Sn++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : cr, this.set = e ? e.getSetter : bi;
}, pe = /* @__PURE__ */ (function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Zt(this, +e.duration, 1, 1), this.data = e.data, M && (this._ctx = M, M.data.push(this)), _e || rt.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Zt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (Jt(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Fe(this, i), !n._dp || n.parent || mr(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && _t(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === A || !this._initted && this._dur && i || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), fr(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + zi(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + zi(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Qt(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -A ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Ae(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -A ? 0 : this._rts, this.totalTime(ve(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Le(this), In(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Jt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== A && (this._tTime -= A)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = D(i);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && _t(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (Q(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ae(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Rn);
    var r = X;
    return X = i, vi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), X = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Ii(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Ii(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(ht(this, i), Q(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, Q(r)), this._dur || (this._zTime = -A), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -A : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -A, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - A);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this, n = r._prom;
    return new Promise(function(s) {
      var a = I(i) ? i : _r, l = function() {
        var h = r.then;
        r.then = null, n && n(), I(a) && (a = a(r)) && (a.then || a === r) && (r.then = h), s(a), r.then = h;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? l() : r._prom = l;
    });
  }, t.kill = function() {
    ne(this);
  }, o;
})();
lt(pe.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -A,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var j = /* @__PURE__ */ (function(o) {
  ir(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = Q(i.sortChildren), R && _t(i.parent || R, vt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && gr(vt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return le(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return le(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return le(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, ae(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new B(r, n, ht(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return _t(this, B.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, l, u, h) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = u, s.onCompleteParams = h, s.parent = this, new B(r, s, ht(this, l)), this;
  }, e.staggerFrom = function(r, n, s, a, l, u, h) {
    return s.runBackwards = 1, ae(s).immediateRender = Q(s.immediateRender), this.staggerTo(r, n, s, a, l, u, h);
  }, e.staggerFromTo = function(r, n, s, a, l, u, h, f) {
    return a.startAt = s, ae(a).immediateRender = Q(a.immediateRender), this.staggerTo(r, n, a, l, u, h, f);
  }, e.render = function(r, n, s) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, h = r <= 0 ? 0 : D(r), f = this._zTime < 0 != r < 0 && (this._initted || !u), d, _, m, c, p, v, g, w, x, y, S, b;
    if (this !== R && h > l && r >= 0 && (h = l), h !== this._tTime || s || f) {
      if (a !== this._time && u && (h += this._time - a, r += this._time - a), d = h, x = this._start, w = this._ts, v = !w, f && (u || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (S = this._yoyo, p = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(p * 100 + r, n, s);
        if (d = D(h % p), h === l ? (c = this._repeat, d = u) : (y = D(h / p), c = ~~y, c && c === y && (d = u, c--), d > u && (d = u)), y = Qt(this._tTime, p), !a && this._tTime && y !== c && this._tTime - y * p - this._dur <= 0 && (y = c), S && c & 1 && (d = u - d, b = 1), c !== y && !this._lock) {
          var k = S && y & 1, T = k === (S && c & 1);
          if (c < y && (k = !k), a = k ? 0 : h % u ? u : h, this._lock = 1, this.render(a || (b ? 0 : D(c * p)), n, !u)._lock = 0, this._tTime = h, !n && this.parent && nt(this, "onRepeat"), this.vars.repeatRefresh && !b && (this.invalidate()._lock = 1, y = c), a && a !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, T && (this._lock = 2, a = k ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !b && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (g = Bn(this, D(a), D(d)), g && (h -= d - (d = g._start))), this._tTime = h, this._time = d, this._act = !!w, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && u && !n && !y && (nt(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && r >= 0)
        for (_ = this._first; _; ) {
          if (m = _._next, (_._act || d >= _._start) && _._ts && g !== _) {
            if (_.parent !== this)
              return this.render(r, n, s);
            if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, n, s), d !== this._time || !this._ts && !v) {
              g = 0, m && (h += this._zTime = -A);
              break;
            }
          }
          _ = m;
        }
      else {
        _ = this._last;
        for (var P = r < 0 ? r : d; _; ) {
          if (m = _._prev, (_._act || P <= _._end) && _._ts && g !== _) {
            if (_.parent !== this)
              return this.render(r, n, s);
            if (_.render(_._ts > 0 ? (P - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (P - _._start) * _._ts, n, s || X && vi(_)), d !== this._time || !this._ts && !v) {
              g = 0, m && (h += this._zTime = P ? -A : A);
              break;
            }
          }
          _ = m;
        }
      }
      if (g && !n && (this.pause(), g.render(d >= a ? 0 : -A)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = x, Le(this), this.render(r, n, s);
      this._onUpdate && !n && nt(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (x === this._start || Math.abs(w) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (h === l && this._ts > 0 || !h && this._ts < 0) && Ot(this, 1), !n && !(r < 0 && !a) && (h || a || !l) && (nt(this, h === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (wt(n) || (n = ht(this, n, r)), !(r instanceof pe)) {
      if (G(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (Y(r))
        return this.addLabel(r, n);
      if (I(r))
        r = B.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? _t(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ct);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof B ? n && l.push(u) : (s && l.push(u), r && l.push.apply(l, u.getChildren(!0, n, s)))), u = u._next;
    return l;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return Y(r) ? this.removeLabel(r) : I(r) ? this.killTweensOf(r) : (r.parent === this && Re(this, r), r === this._recent && (this._recent = this._last), Ut(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = D(rt.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = ht(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = B.delayedCall(0, n || fe, s);
    return a.data = "isPause", this._hasPause = 1, _t(this, a, ht(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = ht(this, r); n; )
      n._start === r && n.data === "isPause" && Ot(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), l = a.length; l--; )
      bt !== a[l] && a[l].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = ft(r), l = this._first, u = wt(n), h; l; )
      l instanceof B ? Ln(l._targets, a) && (u ? (!bt || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (h = l.getTweensOf(a, n)).length && s.push.apply(s, h), l = l._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = ht(s, r), l = n, u = l.startAt, h = l.onStart, f = l.onStartParams, d = l.immediateRender, _, m = B.to(s, lt({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || A,
      onStart: function() {
        if (s.pause(), !_) {
          var p = n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          m._dur !== p && Zt(m, p, 0, 1).render(m._time, !0, !0), _ = 1;
        }
        h && h.apply(m, f || []);
      }
    }, n));
    return d ? m.render(0) : m;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, lt({
      startAt: {
        time: ht(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Ui(this, ht(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Ui(this, ht(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + A);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    var a = this._first, l = this.labels, u;
    for (r = D(r); a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (u in l)
        l[u] >= s && (l[u] += r);
    return Ut(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Ut(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, l = ct, u, h, f;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (f = s.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && s._sort && a._ts && !s._lock ? (s._lock = 1, _t(s, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (n -= h, (!f && !s._dp || f && f.smoothChildTiming) && (s._start += D(h / s._ts), s._time -= h, s._tTime -= h), s.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > n && a._ts && (n = a._end), a = u;
      Zt(s, s === R && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (R._ts && (fr(R, Ae(r, R)), hr = rt.frame), rt.frame >= Li) {
      Li += ot.autoSleep || 120;
      var n = R._first;
      if ((!n || !n._ts) && ot.autoSleep && rt._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || rt.sleep();
      }
    }
  }, t;
})(pe);
lt(j.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var ns = function(t, e, i, r, n, s, a) {
  var l = new J(this._pt, t, e, 0, 1, Ur, null, n), u = 0, h = 0, f, d, _, m, c, p, v, g;
  for (l.b = i, l.e = r, i += "", r += "", (v = ~r.indexOf("random(")) && (r = de(r)), s && (g = [i, r], s(g, t, e), i = g[0], r = g[1]), d = i.match(Ne) || []; f = Ne.exec(r); )
    m = f[0], c = r.substring(u, f.index), _ ? _ = (_ + 1) % 5 : c.substr(-5) === "rgba(" && (_ = 1), m !== d[h++] && (p = parseFloat(d[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: c || h === 1 ? c : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: p,
      c: m.charAt(1) === "=" ? Xt(p, m) - p : parseFloat(m) - p,
      m: _ && _ < 4 ? Math.round : 0
    }, u = Ne.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = a, (or.test(r) || v) && (l.e = 0), this._pt = l, l;
}, yi = function(t, e, i, r, n, s, a, l, u, h) {
  I(r) && (r = r(n || 0, t, s));
  var f = t[e], d = i !== "get" ? i : I(f) ? u ? t[e.indexOf("set") || !I(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : f, _ = I(f) ? u ? us : zr : xi, m;
  if (Y(r) && (~r.indexOf("random(") && (r = de(r)), r.charAt(1) === "=" && (m = Xt(d, r) + (H(d) || 0), (m || m === 0) && (r = m))), !h || d !== r || ii)
    return !isNaN(d * r) && r !== "" ? (m = new J(this._pt, t, e, +d || 0, r - (d || 0), typeof f == "boolean" ? cs : Ir, 0, _), u && (m.fp = u), a && m.modifier(a, this, t), this._pt = m) : (!f && !(e in t) && _i(e, r), ns.call(this, t, e, d, r, _, l || ot.stringFilter, u));
}, ss = function(t, e, i, r, n) {
  if (I(t) && (t = ue(t, n, e, i, r)), !mt(t) || t.style && t.nodeType || G(t) || nr(t))
    return Y(t) ? ue(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = ue(t[a], n, e, i, r);
  return s;
}, Rr = function(t, e, i, r, n, s) {
  var a, l, u, h;
  if (it[t] && (a = new it[t]()).init(n, a.rawVars ? e[t] : ss(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = l = new J(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== Yt))
    for (u = i._ptLookup[i._targets.indexOf(n)], h = a._props.length; h--; )
      u[a._props[h]] = l;
  return a;
}, bt, ii, wi = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, l = r.lazy, u = r.onUpdate, h = r.runBackwards, f = r.yoyoEase, d = r.keyframes, _ = r.autoRevert, m = t._dur, c = t._startAt, p = t._targets, v = t.parent, g = v && v.data === "nested" ? v.vars.targets : p, w = t._overwrite === "auto" && !hi, x = t.timeline, y = r.easeReverse || f, S, b, k, T, P, U, F, E, z, W, q, N, ut;
  if (x && (!d || !n) && (n = "none"), t._ease = Nt(n, he.ease), t._rEase = y && (Nt(y) || t._ease), t._from = !x && !!r.runBackwards, t._from && (t.ratio = 1), !x || d && !r.stagger) {
    if (E = p[0] ? It(p[0]).harness : 0, N = E && r[E.prop], S = Ce(r, pi), c && (c._zTime < 0 && c.progress(1), e < 0 && h && a && !_ ? c.render(-1, !0) : c.revert(h && m ? Te : Dn), c._lazy = 0), s) {
      if (Ot(t._startAt = B.set(p, lt({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !c && Q(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return nt(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X || !a && !_) && t._startAt.revert(Te), a && m && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && m && !c) {
      if (e && (a = !1), k = lt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !c && Q(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, S), N && (k[E.prop] = N), Ot(t._startAt = B.set(p, k)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X ? t._startAt.revert(Te) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, A, A);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && Q(l) || l && !m, b = 0; b < p.length; b++) {
      if (P = p[b], F = P._gsap || gi(p)[b]._gsap, t._ptLookup[b] = W = {}, Ke[F.id] && St.length && Oe(), q = g === p ? b : g.indexOf(P), E && (z = new E()).init(P, N || S, t, q, g) !== !1 && (t._pt = T = new J(t._pt, P, z.name, 0, 1, z.render, z, 0, z.priority), z._props.forEach(function(qt) {
        W[qt] = T;
      }), z.priority && (U = 1)), !E || N)
        for (k in S)
          it[k] && (z = Rr(k, S, t, q, P, g)) ? z.priority && (U = 1) : W[k] = T = yi.call(t, P, k, "get", S[k], q, g, 0, r.stringFilter);
      t._op && t._op[b] && t.kill(P, t._op[b]), w && t._pt && (bt = t, R.killTweensOf(P, W, t.globalTime(e)), ut = !t.parent, bt = 0), t._pt && l && (Ke[F.id] = 1);
    }
    U && Nr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !ut, d && e <= 0 && x.render(ct, !0, !0);
}, os = function(t, e, i, r, n, s, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, _;
  if (!u)
    for (u = t._ptCache[e] = [], d = t._ptLookup, _ = t._targets.length; _--; ) {
      if (h = d[_][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return ii = 1, t.vars[e] = "+=0", wi(t, a), ii = 0, l ? ce(e + " not eligible for reset. Try splitting into individual properties") : 1;
      u.push(h);
    }
  for (_ = u.length; _--; )
    f = u[_], h = f._pt || f, h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + s * h.c, h.c = i - h.s, f.e && (f.e = V(i) + H(f.e)), f.b && (f.b = h.s + H(f.b));
}, as = function(t, e) {
  var i = t[0] ? It(t[0]).harness : 0, r = i && i.aliases, n, s, a, l;
  if (!r)
    return e;
  n = Kt({}, e);
  for (s in r)
    if (s in n)
      for (l = r[s].split(","), a = l.length; a--; )
        n[l[a]] = n[s];
  return n;
}, ls = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if (G(e))
    a = i[t] || (i[t] = []), e.forEach(function(l, u) {
      return a.push({
        t: u / (e.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (s in e)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, ue = function(t, e, i, r, n) {
  return I(t) ? t.call(e, i, r, n) : Y(t) && ~t.indexOf("random(") ? de(t) : t;
}, Lr = mi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", Fr = {};
Z(Lr + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return Fr[o] = 1;
});
var B = /* @__PURE__ */ (function(o) {
  ir(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : ae(r)) || this;
    var l = a.vars, u = l.duration, h = l.delay, f = l.immediateRender, d = l.stagger, _ = l.overwrite, m = l.keyframes, c = l.defaults, p = l.scrollTrigger, v = r.parent || R, g = (G(i) || nr(i) ? wt(i[0]) : "length" in r) ? [i] : ft(i), w, x, y, S, b, k, T, P;
    if (a._targets = g.length ? gi(g) : ce("GSAP target " + i + " not found. https://gsap.com", !ot.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = _, m || d || be(u) || be(h)) {
      r = a.vars;
      var U = r.easeReverse || r.yoyoEase;
      if (w = a.timeline = new j({
        data: "nested",
        defaults: c || {},
        targets: v && v.data === "nested" ? v.vars.targets : g
      }), w.kill(), w.parent = w._dp = vt(a), w._start = 0, d || be(u) || be(h)) {
        if (S = g.length, T = d && xr(d), mt(d))
          for (b in d)
            ~Lr.indexOf(b) && (P || (P = {}), P[b] = d[b]);
        for (x = 0; x < S; x++)
          y = Ce(r, Fr), y.stagger = 0, U && (y.easeReverse = U), P && Kt(y, P), k = g[x], y.duration = +ue(u, vt(a), x, k, g), y.delay = (+ue(h, vt(a), x, k, g) || 0) - a._delay, !d && S === 1 && y.delay && (a._delay = h = y.delay, a._start += h, y.delay = 0), w.to(k, y, T ? T(x, k, g) : 0), w._ease = O.none;
        w.duration() ? u = h = 0 : a.timeline = 0;
      } else if (m) {
        ae(lt(w.vars.defaults, {
          ease: "none"
        })), w._ease = Nt(m.ease || r.ease || "none");
        var F = 0, E, z, W;
        if (G(m))
          m.forEach(function(q) {
            return w.to(g, q, ">");
          }), w.duration();
        else {
          y = {};
          for (b in m)
            b === "ease" || b === "easeEach" || ls(b, m[b], y, m.easeEach);
          for (b in y)
            for (E = y[b].sort(function(q, N) {
              return q.t - N.t;
            }), F = 0, x = 0; x < E.length; x++)
              z = E[x], W = {
                ease: z.e,
                duration: (z.t - (x ? E[x - 1].t : 0)) / 100 * u
              }, W[b] = z.v, w.to(g, W, F), F += W.duration;
          w.duration() < u && w.to({}, {
            duration: u - w.duration()
          });
        }
      }
      u || a.duration(u = w.duration());
    } else
      a.timeline = 0;
    return _ === !0 && !hi && (bt = vt(a), R.killTweensOf(g), bt = 0), _t(v, vt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (f || !u && !m && a._start === D(v._time) && Q(f) && Un(vt(a)) && v.data !== "nested") && (a._tTime = -A, a.render(Math.max(0, -h) || 0)), p && gr(vt(a), p), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, l = this._tDur, u = this._dur, h = r < 0, f = r > l - A && !h ? l : r < A ? 0 : r, d, _, m, c, p, v, g, w;
    if (!u)
      Vn(this, r, n, s);
    else if (f !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, w = this.timeline, this._repeat) {
        if (c = u + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(c * 100 + r, n, s);
        if (d = D(f % c), f === l ? (m = this._repeat, d = u) : (p = D(f / c), m = ~~p, m && m === p ? (d = u, m--) : d > u && (d = u)), v = this._yoyo && m & 1, v && (d = u - d), p = Qt(this._tTime, c), d === a && !s && this._initted && m === p)
          return this._tTime = f, this;
        m !== p && this.vars.repeatRefresh && !v && !this._lock && d !== c && this._initted && (this._lock = s = 1, this.render(D(c * m), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (vr(this, h ? r : d, s, n, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && m !== p))
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._rEase) {
        var x = d < a;
        if (x !== this._inv) {
          var y = x ? a : u - a;
          this._inv = x, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = y ? (x ? -1 : 1) / y : 0, this._invScale = x ? -this.ratio : 1 - this.ratio, this._invEase = x ? this._rEase : this._ease;
        }
        this.ratio = g = this._invRatio + this._invScale * this._invEase((d - this._invTime) * this._invRecip);
      } else
        this.ratio = g = this._ease(d / u);
      if (this._from && (this.ratio = g = 1 - g), this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && f && !n && !p && (nt(this, "onStart"), this._tTime !== f))
        return this;
      for (_ = this._pt; _; )
        _.r(g, _.d), _ = _._next;
      w && w.render(r < 0 ? r : w._dur * w._ease(d / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (h && Qe(this, r, n, s), nt(this, "onUpdate")), this._repeat && m !== p && this.vars.onRepeat && !n && this.parent && nt(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && Qe(this, r, !0, !0), (r || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Ot(this, 1), !n && !(h && !a) && (f || a || v) && (nt(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, l) {
    _e || rt.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || wi(this, u), h = this._ease(u / this._dur), os(this, r, n, s, a, h, u, l) ? this.resetTo(r, n, s, a, 1) : (Fe(this, 0), this.parent || pr(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? ne(this) : this.scrollTrigger && this.scrollTrigger.kill(!!X), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, bt && bt.vars.overwrite !== !0)._first || ne(this), this.parent && s !== this.timeline.totalDuration() && Zt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, l = r ? ft(r) : a, u = this._ptLookup, h = this._pt, f, d, _, m, c, p, v;
    if ((!n || n === "all") && zn(a, l))
      return n === "all" && (this._pt = 0), ne(this);
    for (f = this._op = this._op || [], n !== "all" && (Y(n) && (c = {}, Z(n, function(g) {
      return c[g] = 1;
    }), n = c), n = as(a, n)), v = a.length; v--; )
      if (~l.indexOf(a[v])) {
        d = u[v], n === "all" ? (f[v] = n, m = d, _ = {}) : (_ = f[v] = f[v] || {}, m = n);
        for (c in m)
          p = d && d[c], p && ((!("kill" in p.d) || p.d.kill(c) === !0) && Re(this, p, "_pt"), delete d[c]), _ !== "all" && (_[c] = 1);
      }
    return this._initted && !this._pt && h && ne(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return le(1, arguments);
  }, t.delayedCall = function(r, n, s, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, s) {
    return le(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return R.killTweensOf(r, n, s);
  }, t;
})(pe);
lt(B.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Z("staggerTo,staggerFrom,staggerFromTo", function(o) {
  B[o] = function() {
    var t = new j(), e = Je.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var xi = function(t, e, i) {
  return t[e] = i;
}, zr = function(t, e, i) {
  return t[e](i);
}, us = function(t, e, i, r) {
  return t[e](r.fp, i);
}, hs = function(t, e, i) {
  return t.setAttribute(e, i);
}, bi = function(t, e) {
  return I(t[e]) ? zr : ci(t[e]) && t.setAttribute ? hs : xi;
}, Ir = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, cs = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Ur = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, Ti = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, fs = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, ds = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Re(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, _s = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, Nr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, J = /* @__PURE__ */ (function() {
  function o(e, i, r, n, s, a, l, u, h) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Ir, this.d = l || this, this.set = u || xi, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = _s, this.m = i, this.mt = n, this.tween = r;
  }, o;
})();
Z(mi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(o) {
  return pi[o] = 1;
});
at.TweenMax = at.TweenLite = B;
at.TimelineLite = at.TimelineMax = j;
R = new j({
  sortChildren: !1,
  defaults: he,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
ot.stringFilter = Er;
var Vt = [], Se = {}, ps = [], Vi = 0, ms = 0, We = function(t) {
  return (Se[t] || ps).map(function(e) {
    return e();
  });
}, ri = function() {
  var t = Date.now(), e = [];
  t - Vi > 2 && (We("matchMediaInit"), Vt.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, l, u;
    for (a in r)
      s = dt.matchMedia(r[a]).matches, s && (l = 1), s !== n[a] && (n[a] = s, u = 1);
    u && (i.revert(), l && e.push(i));
  }), We("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Vi = t, We("matchMedia"));
}, Vr = /* @__PURE__ */ (function() {
  function o(e, i) {
    this.selector = i && ti(i), this.data = [], this._r = [], this.isReverted = !1, this.id = ms++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    I(i) && (n = r, r = i, i = I);
    var s = this, a = function() {
      var u = M, h = s.selector, f;
      return u && u !== s && u.data.push(s), n && (s.selector = ti(n)), M = s, f = r.apply(s, arguments), I(f) && s._r.push(f), M = u, s.selector = h, s.isReverted = !1, f;
    };
    return s.last = a, i === I ? a(s, function(l) {
      return s.add(null, l);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = M;
    M = null, i(this), M = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof B && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? (function() {
      for (var a = n.getTweens(), l = n.data.length, u; l--; )
        u = n.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(h) {
          return a.splice(a.indexOf(h), 1);
        }));
      for (a.map(function(h) {
        return {
          g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
          t: h
        };
      }).sort(function(h, f) {
        return f.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), l = n.data.length; l--; )
        u = n.data[l], u instanceof j ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof B) && u.revert && u.revert(i);
      n._r.forEach(function(h) {
        return h(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Vt.length; s--; )
        Vt[s].id === this.id && Vt.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
})(), gs = /* @__PURE__ */ (function() {
  function o(e) {
    this.contexts = [], this.scope = e, M && M.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    mt(i) || (i = {
      matches: i
    });
    var s = new Vr(0, n || this.scope), a = s.conditions = {}, l, u, h;
    M && !s.selector && (s.selector = M.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (u in i)
      u === "all" ? h = 1 : (l = dt.matchMedia(i[u]), l && (Vt.indexOf(s) < 0 && Vt.push(s), (a[u] = l.matches) && (h = 1), l.addListener ? l.addListener(ri) : l.addEventListener("change", ri)));
    return h && r(s, function(f) {
      return s.add(null, f);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
})(), Ee = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return Or(r);
    });
  },
  timeline: function(t) {
    return new j(t);
  },
  getTweensOf: function(t, e) {
    return R.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    Y(t) && (t = ft(t)[0]);
    var n = It(t || {}).get, s = i ? _r : dr;
    return i === "native" && (i = ""), t && (e ? s((it[e] && it[e].get || n)(t, e, i, r)) : function(a, l, u) {
      return s((it[a] && it[a].get || n)(t, a, l, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = ft(t), t.length > 1) {
      var r = t.map(function(h) {
        return et.quickSetter(h, e, i);
      }), n = r.length;
      return function(h) {
        for (var f = n; f--; )
          r[f](h);
      };
    }
    t = t[0] || {};
    var s = it[e], a = It(t), l = a.harness && (a.harness.aliases || {})[e] || e, u = s ? function(h) {
      var f = new s();
      Yt._pt = 0, f.init(t, i ? h + i : h, Yt, 0, [t]), f.render(1, f), Yt._pt && Ti(1, Yt);
    } : a.set(t, l);
    return s ? u : function(h) {
      return u(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = et.to(t, lt((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(l, u, h) {
      return n.resetTo(e, l, u, h);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return R.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Nt(t.ease, he.ease)), Fi(he, t || {});
  },
  config: function(t) {
    return Fi(ot, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !it[a] && !at[a] && ce(e + " effect requires " + a + " plugin.");
    }), Ve[e] = function(a, l, u) {
      return i(ft(a), lt(l || {}, n), u);
    }, s && (j.prototype[e] = function(a, l, u) {
      return this.add(Ve[e](a, mt(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    O[t] = Nt(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Nt(t, e) : O;
  },
  getById: function(t) {
    return R.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new j(t), r, n;
    for (i.smoothChildTiming = Q(t.smoothChildTiming), R.remove(i), i._dp = 0, i._time = i._tTime = R._time, r = R._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof B && r.vars.onComplete === r._targets[0])) && _t(i, r, r._start - r._delay), r = n;
    return _t(R, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Vr(t, e) : M;
  },
  matchMedia: function(t) {
    return new gs(t);
  },
  matchMediaRefresh: function() {
    return Vt.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || ri();
  },
  addEventListener: function(t, e) {
    var i = Se[t] || (Se[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = Se[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Gn,
    wrapYoyo: jn,
    distribute: xr,
    random: Tr,
    snap: br,
    normalize: Hn,
    getUnit: H,
    clamp: $n,
    splitColor: Cr,
    toArray: ft,
    selector: ti,
    mapRange: Sr,
    pipe: Yn,
    unitize: Xn,
    interpolate: Kn,
    shuffle: wr
  },
  install: lr,
  effects: Ve,
  ticker: rt,
  updateRoot: j.updateRoot,
  plugins: it,
  globalTimeline: R,
  core: {
    PropTween: J,
    globals: ur,
    Tween: B,
    Timeline: j,
    Animation: pe,
    getCache: It,
    _removeLinkedListItem: Re,
    reverting: function() {
      return X;
    },
    context: function(t) {
      return t && M && (M.data.push(t), t._ctx = M), M;
    },
    suppressOverwrites: function(t) {
      return hi = t;
    }
  }
};
Z("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return Ee[o] = B[o];
});
rt.add(j.updateRoot);
Yt = Ee.to({}, {
  duration: 0
});
var vs = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, ys = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = vs(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Ye = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var l, u;
        if (Y(n) && (l = {}, Z(n, function(h) {
          return l[h] = 1;
        }), n = l), e) {
          l = {};
          for (u in n)
            l[u] = e(n[u]);
          n = l;
        }
        ys(a, n);
      };
    }
  };
}, et = Ee.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, l;
    this.tween = i;
    for (s in e)
      l = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (l || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = l, this._props.push(s);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      X ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, Ye("roundProps", ei), Ye("modifiers"), Ye("snap", br)) || Ee;
B.version = j.version = et.version = "3.15.0";
ar = 1;
fi() && Jt();
O.Power0;
O.Power1;
O.Power2;
O.Power3;
O.Power4;
O.Linear;
O.Quad;
O.Cubic;
O.Quart;
O.Quint;
O.Strong;
O.Elastic;
O.Back;
O.SteppedEase;
O.Bounce;
O.Sine;
O.Expo;
O.Circ;
var Bi, Tt, Ht, ki, zt, qi, Si, ws = function() {
  return typeof window < "u";
}, xt = {}, Ft = 180 / Math.PI, Gt = Math.PI / 180, $t = Math.atan2, $i = 1e8, Pi = /([A-Z])/g, xs = /(left|right|width|margin|padding|x)/i, bs = /[\s,\(]\S/, pt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ni = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Ts = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, ks = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Ss = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Ps = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Br = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, qr = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Os = function(t, e, i) {
  return t.style[e] = i;
}, Cs = function(t, e, i) {
  return t.style.setProperty(e, i);
}, As = function(t, e, i) {
  return t._gsap[e] = i;
}, Es = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Ms = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, Ds = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, L = "transform", tt = L + "Origin", Rs = function o(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in xt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = pt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = yt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : yt(r, t), t === tt && (this.tfm.zOrigin = s.zOrigin);
    else
      return pt.transform.split(",").forEach(function(a) {
        return o.call(i, a, e);
      });
    if (this.props.indexOf(L) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(tt, e, "")), t = L;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, $r = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Ls = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Pi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Si(), (!n || !n.isStart) && !i[L] && ($r(i), r.zOrigin && i[tt] && (i[tt] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Wr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: Ls,
    save: Rs
  };
  return t._gsap || et.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Yr, si = function(t, e) {
  var i = Tt.createElementNS ? Tt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Tt.createElement(t);
  return i && i.style ? i : Tt.createElement(t);
}, st = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Pi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, te(e) || e, 1) || "";
}, Wi = "O,Moz,ms,Ms,Webkit".split(","), te = function(t, e, i) {
  var r = e || zt, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Wi[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Wi[s] : "") + t;
}, oi = function() {
  ws() && window.document && (Bi = window, Tt = Bi.document, Ht = Tt.documentElement, zt = si("div") || {
    style: {}
  }, si("div"), L = te(L), tt = L + "Origin", zt.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Yr = !!te("perspective"), Si = et.core.reverting, ki = 1);
}, Yi = function(t) {
  var e = t.ownerSVGElement, i = si("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Ht.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Ht.removeChild(i), n;
}, Xi = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Xr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Yi(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Yi(t)), e && !e.width && !e.x && !e.y ? {
    x: +Xi(t, ["x", "cx", "x1"]) || 0,
    y: +Xi(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Hr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Xr(t));
}, Ct = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in xt && e !== tt && (e = L), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(Pi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, kt = function(t, e, i, r, n, s) {
  var a = new J(t._pt, e, i, 0, 1, s ? qr : Br);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Hi = {
  deg: 1,
  rad: 1,
  turn: 1
}, Fs = {
  grid: 1,
  flex: 1
}, At = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = zt.style, l = xs.test(e), u = t.tagName.toLowerCase() === "svg", h = (u ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, d = r === "px", _ = r === "%", m, c, p, v;
  if (r === s || !n || Hi[r] || Hi[s])
    return n;
  if (s !== "px" && !d && (n = o(t, e, i, "px")), v = t.getCTM && Hr(t), (_ || s === "%") && (xt[e] || ~e.indexOf("adius")))
    return m = v ? t.getBBox()[l ? "width" : "height"] : t[h], V(_ ? n / m * f : n / 100 * m);
  if (a[l ? "width" : "height"] = f + (d ? s : r), c = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, v && (c = (t.ownerSVGElement || {}).parentNode), (!c || c === Tt || !c.appendChild) && (c = Tt.body), p = c._gsap, p && _ && p.width && l && p.time === rt.time && !p.uncache)
    return V(n / p.width * f);
  if (_ && (e === "height" || e === "width")) {
    var g = t.style[e];
    t.style[e] = f + r, m = t[h], g ? t.style[e] = g : Ct(t, e);
  } else
    (_ || s === "%") && !Fs[st(c, "display")] && (a.position = st(t, "position")), c === t && (a.position = "static"), c.appendChild(zt), m = zt[h], c.removeChild(zt), a.position = "absolute";
  return l && _ && (p = It(c), p.time = rt.time, p.width = c[h]), V(d ? m * n / f : m && n ? f / m * n : 0);
}, yt = function(t, e, i, r) {
  var n;
  return ki || oi(), e in pt && e !== "transform" && (e = pt[e], ~e.indexOf(",") && (e = e.split(",")[0])), xt[e] && e !== "transform" ? (n = ge(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : De(st(t, tt)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Me[e] && Me[e](t, e, i) || st(t, e) || cr(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? At(t, e, n, i) + i : n;
}, zs = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = te(e, t, 1), s = n && st(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = st(t, "borderTopColor"));
  }
  var a = new J(this._pt, t.style, e, 0, 1, Ur), l = 0, u = 0, h, f, d, _, m, c, p, v, g, w, x, y;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = st(t, r.substring(4, r.indexOf(")")))), r === "auto" && (c = t.style[e], t.style[e] = r, r = st(t, e) || r, c ? t.style[e] = c : Ct(t, e)), h = [i, r], Er(h), i = h[0], r = h[1], d = i.match(Wt) || [], y = r.match(Wt) || [], y.length) {
    for (; f = Wt.exec(r); )
      p = f[0], g = r.substring(l, f.index), m ? m = (m + 1) % 5 : (g.substr(-5) === "rgba(" || g.substr(-5) === "hsla(") && (m = 1), p !== (c = d[u++] || "") && (_ = parseFloat(c) || 0, x = c.substr((_ + "").length), p.charAt(1) === "=" && (p = Xt(_, p) + x), v = parseFloat(p), w = p.substr((v + "").length), l = Wt.lastIndex - w.length, w || (w = w || ot.units[e] || x, l === r.length && (r += w, a.e += w)), x !== w && (_ = At(t, e, c, w) || 0), a._pt = {
        _next: a._pt,
        p: g || u === 1 ? g : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: _,
        c: v - _,
        m: m && m < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? qr : Br;
  return or.test(r) && (a.e = 0), this._pt = a, a;
}, Gi = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Is = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Gi[i] || i, e[1] = Gi[r] || r, e.join(" ");
}, Us = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, l, u;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        a = n[u], xt[a] && (l = 1, a = a === "transformOrigin" ? tt : L), Ct(i, a);
    l && (Ct(i, L), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", ge(i, 1), s.uncache = 1, $r(r)));
  }
}, Me = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new J(t._pt, e, i, 0, 0, Us);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, me = [1, 0, 0, 1, 0, 0], Gr = {}, jr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, ji = function(t) {
  var e = st(t, L);
  return jr(e) ? me : e.substr(7).match(sr).map(V);
}, Oi = function(t, e) {
  var i = t._gsap || It(t), r = t.style, n = ji(t), s, a, l, u;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? me : n) : (n === me && !t.offsetParent && t !== Ht && !i.svg && (l = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, Ht.appendChild(t)), n = ji(t), l ? r.display = l : Ct(t, "display"), u && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : Ht.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ai = function(t, e, i, r, n, s) {
  var a = t._gsap, l = n || Oi(t, !0), u = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, _ = l[0], m = l[1], c = l[2], p = l[3], v = l[4], g = l[5], w = e.split(" "), x = parseFloat(w[0]) || 0, y = parseFloat(w[1]) || 0, S, b, k, T;
  i ? l !== me && (b = _ * p - m * c) && (k = x * (p / b) + y * (-c / b) + (c * g - p * v) / b, T = x * (-m / b) + y * (_ / b) - (_ * g - m * v) / b, x = k, y = T) : (S = Xr(t), x = S.x + (~w[0].indexOf("%") ? x / 100 * S.width : x), y = S.y + (~(w[1] || w[0]).indexOf("%") ? y / 100 * S.height : y)), r || r !== !1 && a.smooth ? (v = x - u, g = y - h, a.xOffset = f + (v * _ + g * c) - v, a.yOffset = d + (v * m + g * p) - g) : a.xOffset = a.yOffset = 0, a.xOrigin = x, a.yOrigin = y, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[tt] = "0px 0px", s && (kt(s, a, "xOrigin", u, x), kt(s, a, "yOrigin", h, y), kt(s, a, "xOffset", f, a.xOffset), kt(s, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", x + " " + y);
}, ge = function(t, e) {
  var i = t._gsap || new Dr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", l = getComputedStyle(t), u = st(t, tt) || "0", h, f, d, _, m, c, p, v, g, w, x, y, S, b, k, T, P, U, F, E, z, W, q, N, ut, qt, ee, ie, Mt, Ci, gt, Dt;
  return h = f = d = c = p = v = g = w = x = 0, _ = m = 1, i.svg = !!(t.getCTM && Hr(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[L] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[L] !== "none" ? l[L] : "")), r.scale = r.rotate = r.translate = "none"), b = Oi(t, i.svg), i.svg && (i.uncache ? (ut = t.getBBox(), u = i.xOrigin - ut.x + "px " + (i.yOrigin - ut.y) + "px", N = "") : N = !e && t.getAttribute("data-svg-origin"), ai(t, N || u, !!N || i.originIsAbsolute, i.smooth !== !1, b)), y = i.xOrigin || 0, S = i.yOrigin || 0, b !== me && (U = b[0], F = b[1], E = b[2], z = b[3], h = W = b[4], f = q = b[5], b.length === 6 ? (_ = Math.sqrt(U * U + F * F), m = Math.sqrt(z * z + E * E), c = U || F ? $t(F, U) * Ft : 0, g = E || z ? $t(E, z) * Ft + c : 0, g && (m *= Math.abs(Math.cos(g * Gt))), i.svg && (h -= y - (y * U + S * E), f -= S - (y * F + S * z))) : (Dt = b[6], Ci = b[7], ee = b[8], ie = b[9], Mt = b[10], gt = b[11], h = b[12], f = b[13], d = b[14], k = $t(Dt, Mt), p = k * Ft, k && (T = Math.cos(-k), P = Math.sin(-k), N = W * T + ee * P, ut = q * T + ie * P, qt = Dt * T + Mt * P, ee = W * -P + ee * T, ie = q * -P + ie * T, Mt = Dt * -P + Mt * T, gt = Ci * -P + gt * T, W = N, q = ut, Dt = qt), k = $t(-E, Mt), v = k * Ft, k && (T = Math.cos(-k), P = Math.sin(-k), N = U * T - ee * P, ut = F * T - ie * P, qt = E * T - Mt * P, gt = z * P + gt * T, U = N, F = ut, E = qt), k = $t(F, U), c = k * Ft, k && (T = Math.cos(k), P = Math.sin(k), N = U * T + F * P, ut = W * T + q * P, F = F * T - U * P, q = q * T - W * P, U = N, W = ut), p && Math.abs(p) + Math.abs(c) > 359.9 && (p = c = 0, v = 180 - v), _ = V(Math.sqrt(U * U + F * F + E * E)), m = V(Math.sqrt(q * q + Dt * Dt)), k = $t(W, q), g = Math.abs(k) > 2e-4 ? k * Ft : 0, x = gt ? 1 / (gt < 0 ? -gt : gt) : 0), i.svg && (N = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !jr(st(t, L)), N && t.setAttribute("transform", N))), Math.abs(g) > 90 && Math.abs(g) < 270 && (n ? (_ *= -1, g += c <= 0 ? 180 : -180, c += c <= 0 ? 180 : -180) : (m *= -1, g += g <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = d + s, i.scaleX = V(_), i.scaleY = V(m), i.rotation = V(c) + a, i.rotationX = V(p) + a, i.rotationY = V(v) + a, i.skewX = g + a, i.skewY = w + a, i.transformPerspective = x + s, (i.zOrigin = parseFloat(u.split(" ")[2]) || !e && i.zOrigin || 0) && (r[tt] = De(u)), i.xOffset = i.yOffset = 0, i.force3D = ot.force3D, i.renderTransform = i.svg ? Vs : Yr ? Kr : Ns, i.uncache = 0, i;
}, De = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Xe = function(t, e, i) {
  var r = H(e);
  return V(parseFloat(e) + parseFloat(At(t, "x", i + "px", r))) + r;
}, Ns = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Kr(t, e);
}, Rt = "0deg", re = "0px", Lt = ") ", Kr = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, l = i.z, u = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, _ = i.skewY, m = i.scaleX, c = i.scaleY, p = i.transformPerspective, v = i.force3D, g = i.target, w = i.zOrigin, x = "", y = v === "auto" && t && t !== 1 || v === !0;
  if (w && (f !== Rt || h !== Rt)) {
    var S = parseFloat(h) * Gt, b = Math.sin(S), k = Math.cos(S), T;
    S = parseFloat(f) * Gt, T = Math.cos(S), s = Xe(g, s, b * T * -w), a = Xe(g, a, -Math.sin(S) * -w), l = Xe(g, l, k * T * -w + w);
  }
  p !== re && (x += "perspective(" + p + Lt), (r || n) && (x += "translate(" + r + "%, " + n + "%) "), (y || s !== re || a !== re || l !== re) && (x += l !== re || y ? "translate3d(" + s + ", " + a + ", " + l + ") " : "translate(" + s + ", " + a + Lt), u !== Rt && (x += "rotate(" + u + Lt), h !== Rt && (x += "rotateY(" + h + Lt), f !== Rt && (x += "rotateX(" + f + Lt), (d !== Rt || _ !== Rt) && (x += "skew(" + d + ", " + _ + Lt), (m !== 1 || c !== 1) && (x += "scale(" + m + ", " + c + Lt), g.style[L] = x || "translate(0, 0)";
}, Vs = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, l = i.rotation, u = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, _ = i.target, m = i.xOrigin, c = i.yOrigin, p = i.xOffset, v = i.yOffset, g = i.forceCSS, w = parseFloat(s), x = parseFloat(a), y, S, b, k, T;
  l = parseFloat(l), u = parseFloat(u), h = parseFloat(h), h && (h = parseFloat(h), u += h, l += h), l || u ? (l *= Gt, u *= Gt, y = Math.cos(l) * f, S = Math.sin(l) * f, b = Math.sin(l - u) * -d, k = Math.cos(l - u) * d, u && (h *= Gt, T = Math.tan(u - h), T = Math.sqrt(1 + T * T), b *= T, k *= T, h && (T = Math.tan(h), T = Math.sqrt(1 + T * T), y *= T, S *= T)), y = V(y), S = V(S), b = V(b), k = V(k)) : (y = f, k = d, S = b = 0), (w && !~(s + "").indexOf("px") || x && !~(a + "").indexOf("px")) && (w = At(_, "x", s, "px"), x = At(_, "y", a, "px")), (m || c || p || v) && (w = V(w + m - (m * y + c * b) + p), x = V(x + c - (m * S + c * k) + v)), (r || n) && (T = _.getBBox(), w = V(w + r / 100 * T.width), x = V(x + n / 100 * T.height)), T = "matrix(" + y + "," + S + "," + b + "," + k + "," + w + "," + x + ")", _.setAttribute("transform", T), g && (_.style[L] = T);
}, Bs = function(t, e, i, r, n) {
  var s = 360, a = Y(n), l = parseFloat(n) * (a && ~n.indexOf("rad") ? Ft : 1), u = l - r, h = r + u + "deg", f, d;
  return a && (f = n.split("_")[1], f === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), f === "cw" && u < 0 ? u = (u + s * $i) % s - ~~(u / s) * s : f === "ccw" && u > 0 && (u = (u - s * $i) % s - ~~(u / s) * s)), t._pt = d = new J(t._pt, e, i, r, u, Ts), d.e = h, d.u = "deg", t._props.push(i), d;
}, Ki = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, qs = function(t, e, i) {
  var r = Ki({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, l, u, h, f, d, _, m;
  r.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), s[L] = e, a = ge(i, 1), Ct(i, L), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[L], s[L] = e, a = ge(i, 1), s[L] = u);
  for (l in xt)
    u = r[l], h = a[l], u !== h && n.indexOf(l) < 0 && (_ = H(u), m = H(h), f = _ !== m ? At(i, l, u, m) : parseFloat(u), d = parseFloat(h), t._pt = new J(t._pt, a, l, f, d - f, ni), t._pt.u = m || 0, t._props.push(l));
  Ki(a, r);
};
Z("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  Me[t > 1 ? "border" + o : o] = function(a, l, u, h, f) {
    var d, _;
    if (arguments.length < 4)
      return d = s.map(function(m) {
        return yt(a, m, u);
      }), _ = d.join(" "), _.split(d[0]).length === 5 ? d[0] : _;
    d = (h + "").split(" "), _ = {}, s.forEach(function(m, c) {
      return _[m] = d[c] = d[c] || d[(c - 1) / 2 | 0];
    }), a.init(l, _, f);
  };
});
var Qr = {
  name: "css",
  register: oi,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, l = i.vars.startAt, u, h, f, d, _, m, c, p, v, g, w, x, y, S, b, k, T;
    ki || oi(), this.styles = this.styles || Wr(t), k = this.styles.props, this.tween = i;
    for (c in e)
      if (c !== "autoRound" && (h = e[c], !(it[c] && Rr(c, e, i, r, t, n)))) {
        if (_ = typeof h, m = Me[c], _ === "function" && (h = h.call(i, r, t, n), _ = typeof h), _ === "string" && ~h.indexOf("random(") && (h = de(h)), m)
          m(this, t, c, h, i) && (b = 1);
        else if (c.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(c) + "").trim(), h += "", Pt.lastIndex = 0, Pt.test(u) || (p = H(u), v = H(h), v ? p !== v && (u = At(t, c, u, v) + v) : p && (h += p)), this.add(a, "setProperty", u, h, r, n, 0, 0, c), s.push(c), k.push(c, 0, a[c]);
        else if (_ !== "undefined") {
          if (l && c in l ? (u = typeof l[c] == "function" ? l[c].call(i, r, t, n) : l[c], Y(u) && ~u.indexOf("random(") && (u = de(u)), H(u + "") || u === "auto" || (u += ot.units[c] || H(yt(t, c)) || ""), (u + "").charAt(1) === "=" && (u = yt(t, c))) : u = yt(t, c), d = parseFloat(u), g = _ === "string" && h.charAt(1) === "=" && h.substr(0, 2), g && (h = h.substr(2)), f = parseFloat(h), c in pt && (c === "autoAlpha" && (d === 1 && yt(t, "visibility") === "hidden" && f && (d = 0), k.push("visibility", 0, a.visibility), kt(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), c !== "scale" && c !== "transform" && (c = pt[c], ~c.indexOf(",") && (c = c.split(",")[0]))), w = c in xt, w) {
            if (this.styles.save(c), T = h, _ === "string" && h.substring(0, 6) === "var(--") {
              if (h = st(t, h.substring(4, h.indexOf(")"))), h.substring(0, 5) === "calc(") {
                var P = t.style.perspective;
                t.style.perspective = h, h = st(t, "perspective"), P ? t.style.perspective = P : Ct(t, "perspective");
              }
              f = parseFloat(h);
            }
            if (x || (y = t._gsap, y.renderTransform && !e.parseTransform || ge(t, e.parseTransform), S = e.smoothOrigin !== !1 && y.smooth, x = this._pt = new J(this._pt, a, L, 0, 1, y.renderTransform, y, 0, -1), x.dep = 1), c === "scale")
              this._pt = new J(this._pt, y, "scaleY", y.scaleY, (g ? Xt(y.scaleY, g + f) : f) - y.scaleY || 0, ni), this._pt.u = 0, s.push("scaleY", c), c += "X";
            else if (c === "transformOrigin") {
              k.push(tt, 0, a[tt]), h = Is(h), y.svg ? ai(t, h, 0, S, 0, this) : (v = parseFloat(h.split(" ")[2]) || 0, v !== y.zOrigin && kt(this, y, "zOrigin", y.zOrigin, v), kt(this, a, c, De(u), De(h)));
              continue;
            } else if (c === "svgOrigin") {
              ai(t, h, 1, S, 0, this);
              continue;
            } else if (c in Gr) {
              Bs(this, y, c, d, g ? Xt(d, g + h) : h);
              continue;
            } else if (c === "smoothOrigin") {
              kt(this, y, "smooth", y.smooth, h);
              continue;
            } else if (c === "force3D") {
              y[c] = h;
              continue;
            } else if (c === "transform") {
              qs(this, h, t);
              continue;
            }
          } else c in a || (c = te(c) || c);
          if (w || (f || f === 0) && (d || d === 0) && !bs.test(h) && c in a)
            p = (u + "").substr((d + "").length), f || (f = 0), v = H(h) || (c in ot.units ? ot.units[c] : p), p !== v && (d = At(t, c, u, v)), this._pt = new J(this._pt, w ? y : a, c, d, (g ? Xt(d, g + f) : f) - d, !w && (v === "px" || c === "zIndex") && e.autoRound !== !1 ? Ps : ni), this._pt.u = v || 0, w && T !== h ? (this._pt.b = u, this._pt.e = T, this._pt.r = Ss) : p !== v && v !== "%" && (this._pt.b = u, this._pt.r = ks);
          else if (c in a)
            zs.call(this, t, c, u, g ? g + h : h);
          else if (c in t)
            this.add(t, c, u || t[c], g ? g + h : h, r, n);
          else if (c !== "parseTransform") {
            _i(c, h);
            continue;
          }
          w || (c in a ? k.push(c, 0, a[c]) : typeof t[c] == "function" ? k.push(c, 2, t[c]()) : k.push(c, 1, u || t[c])), s.push(c);
        }
      }
    b && Nr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Si())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: yt,
  aliases: pt,
  getSetter: function(t, e, i) {
    var r = pt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in xt && e !== tt && (t._gsap.x || yt(t, "x")) ? i && qi === i ? e === "scale" ? Es : As : (qi = i || {}) && (e === "scale" ? Ms : Ds) : t.style && !ci(t.style[e]) ? Os : ~e.indexOf("-") ? Cs : bi(t, e);
  },
  core: {
    _removeProperty: Ct,
    _getMatrix: Oi
  }
};
et.utils.checkPrefix = te;
et.core.getStyleSaver = Wr;
(function(o, t, e, i) {
  var r = Z(o + "," + t + "," + e, function(n) {
    xt[n] = 1;
  });
  Z(t, function(n) {
    ot.units[n] = "deg", Gr[n] = 1;
  }), pt[r[13]] = o + "," + t, Z(i, function(n) {
    var s = n.split(":");
    pt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Z("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  ot.units[o] = "px";
});
et.registerPlugin(Qr);
var li = et.registerPlugin(Qr) || et;
li.core.Tween;
class $s {
  controller = new AbortController();
  disposers = [];
  constructor(t, e, i) {
    try {
      for (const r of e) {
        const n = r.mount({ root: t, signal: this.controller.signal, reducedMotion: i, cleanup: (s) => this.disposers.push(s) });
        n && this.disposers.push(n);
      }
    } catch (r) {
      throw this.destroy(), r;
    }
  }
  destroy() {
    this.controller.abort();
    for (const t of this.disposers.splice(0).reverse())
      try {
        t();
      } catch (e) {
        console.error("[ENV] cleanup", e);
      }
  }
}
async function Ws(o = {}) {
  const t = o.container ?? "[data-env-page]", e = () => document.querySelector(t);
  if (!e()) throw new Error(`[ENV] Missing container ${t}`);
  const i = [...o.modules ?? []], r = e();
  (document.documentElement.hasAttribute("data-env-reveal") || r.querySelector("[data-env-reveal]")) && i.push((await import("./reveal-4E4QmLe5.js")).reveal), (document.documentElement.hasAttribute("data-env-micro") || r.querySelector("[data-env-hover]")) && i.push((await import("./micro-B9Y5l6bO.js")).micro), document.documentElement.hasAttribute("data-env-faq") && i.push((await import("./faq-Cip6y42V.js")).faq);
  let s, a, l;
  const u = matchMedia("(prefers-reduced-motion: reduce)");
  let h = !1;
  const f = () => {
    s?.destroy(), s = new $s(e(), i, u.matches);
  };
  f();
  const d = new Set(o.pages ?? []), _ = d.has(location.pathname) ? new Tn({ containers: [t], animationSelector: !1, linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])", ignoreVisit: (p, { el: v } = {}) => {
    const g = new URL(p, location.href);
    return g.origin !== location.origin || !d.has(g.pathname) || !!v?.closest("[data-no-swup]");
  } }) : void 0, m = () => {
    const p = l;
    l = void 0, a?.progress(1), a?.kill(), a = void 0, p && (p.style === null ? p.element.removeAttribute("style") : p.element.setAttribute("style", p.style));
  };
  _?.hooks.replace("animation:out:await", async () => {
    const p = e();
    l = { element: p, style: p.getAttribute("style") }, u.matches || (a = li.to(p, { opacity: 0, y: -8, duration: 0.18 }), await a);
  }), _?.hooks.before("content:replace", () => {
    s?.destroy(), s = void 0, m();
  }), _?.hooks.on("page:view", () => {
    f(), document.querySelectorAll("a[href]").forEach((g) => {
      const w = g.origin === location.origin && g.pathname === location.pathname;
      g.classList.toggle("w--current", w), w ? g.setAttribute("aria-current", "page") : g.removeAttribute("aria-current");
    });
    const p = e();
    window.scrollTo(0, 0);
    const v = p.getAttribute("tabindex");
    p.setAttribute("tabindex", "-1"), p.focus({ preventScroll: !0 }), v === null ? p.removeAttribute("tabindex") : p.setAttribute("tabindex", v);
  }), _?.hooks.replace("animation:in:await", async () => {
    const p = e();
    l = { element: p, style: p.getAttribute("style") }, u.matches || (a = li.fromTo(p, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 }), await a, m());
  }), _?.hooks.on("fetch:error", () => m()), _?.hooks.on("visit:abort", () => m());
  const c = () => {
    h || (m(), f());
  };
  return u.addEventListener("change", c), { swup: _, destroy() {
    h || (h = !0, _?.destroy(), m(), s?.destroy(), u.removeEventListener("change", c));
  } };
}
export {
  $s as P,
  Ws as c,
  li as g
};
//# sourceMappingURL=index-9UII6FTU.js.map
