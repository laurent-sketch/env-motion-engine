const ft = /* @__PURE__ */ new Set(["68bb0b6fbfff68e3dfd32f3d", "68bb0b6fbfff68e3dfd32f3e"]);
function Pe(n) {
  if (n.documentElement.getAttribute("data-wf-site") !== "68bb0b6fbfff68e3dfd32f3f" || !ft.has(n.documentElement.getAttribute("data-wf-page")) || n.querySelector("main.main-wrapper")) return;
  const e = n.querySelector("body > .section.footer"), t = [...n.querySelectorAll("body > section:not(.footer)")];
  if (!e || t.length !== 2 || !t[0].matches(".section.policy") || !t[1].matches(".section.padding-top-bottom") || t.some((i) => i.compareDocumentPosition(e) & 2)) return;
  const a = n.createElement("main");
  a.className = "main-wrapper", a.setAttribute("data-env-legal-main", ""), t[0].before(a), t.forEach((i) => a.append(i));
}
function ut(n, e, t) {
  return Math.max(0, Math.min(1, (t - n) / Math.max(1, Math.min(e, t))));
}
function pt(n, e = window) {
  const t = n?.querySelector(".section.footer.static");
  if (!t) return () => {
  };
  const a = t.ownerDocument, i = t.getAttribute("data-env-footer-reveal"), o = t.style.getPropertyValue("--env-footer-y"), s = t.style.getPropertyPriority("--env-footer-y"), r = a.createElement("style");
  r.textContent = "[data-env-footer-reveal]{transform:translate3d(0,var(--env-footer-y,0px),0)!important}", a.head.append(r), t.setAttribute("data-env-footer-reveal", "");
  const l = e.matchMedia("(prefers-reduced-motion: reduce)"), d = e.matchMedia("(min-width: 768px)");
  let c = 0, g = 0, b = !1, m = 0, h = !1;
  function y() {
    !b && !g && (g = e.requestAnimationFrame(T));
  }
  function T(S) {
    if (g = 0, b || !n.isConnected) return;
    if (a.documentElement.hasAttribute("data-env-transition-active") || n.hasAttribute("data-env-alt-reveal-wait")) {
      m = 0;
      return;
    }
    const u = t.getBoundingClientRect(), p = ut(u.top - c, u.height, e.innerHeight), I = l.matches || !d.matches ? 0 : -300 * (1 - p), v = !h || l.matches ? 1 : 1 - Math.exp(-Math.min(Math.max(S - m, 0), 64) / 90);
    c += (I - c) * v, Math.abs(I - c) < 0.1 && (c = I), t.style.setProperty("--env-footer-y", `${c.toFixed(3)}px`), m = S, h = !0, c !== I && y();
  }
  const O = e.ResizeObserver ? new e.ResizeObserver(y) : null;
  O?.observe(t);
  const w = new e.MutationObserver(y);
  return w.observe(a.documentElement, { attributes: !0, attributeFilter: ["data-env-transition-active"] }), w.observe(n, { attributes: !0, attributeFilter: ["data-env-alt-reveal-wait"] }), e.addEventListener("scroll", y, { passive: !0 }), e.addEventListener("resize", y), l.addEventListener("change", y), d.addEventListener("change", y), t.addEventListener("load", y, !0), a.fonts?.ready.then(y), T(e.performance.now()), () => {
    b = !0, e.cancelAnimationFrame(g), O?.disconnect(), w.disconnect(), e.removeEventListener("scroll", y), e.removeEventListener("resize", y), l.removeEventListener("change", y), d.removeEventListener("change", y), t.removeEventListener("load", y, !0), i === null ? t.removeAttribute("data-env-footer-reveal") : t.setAttribute("data-env-footer-reveal", i), o ? t.style.setProperty("--env-footer-y", o, s) : t.style.removeProperty("--env-footer-y"), r.remove();
  };
}
function bt(n = document, e = window) {
  function t(a) {
    if (!e.matchMedia("(max-width: 767px)").matches || a.defaultPrevented || a.button !== 0 || a.ctrlKey || a.metaKey || a.shiftKey || a.altKey || n.documentElement.hasAttribute("data-env-transition-active")) return;
    const i = a.target.closest?.("a[href]");
    if (!i || i.hasAttribute("target") || i.hasAttribute("download") || i.closest("[data-no-swup]")) return;
    let o;
    try {
      o = new URL(i.href, e.location.href);
    } catch {
      return;
    }
    if (o.origin !== e.location.origin || o.pathname !== e.location.pathname || o.search !== e.location.search || o.hash !== "#work") return;
    const s = n.getElementById("work");
    if (!s) return;
    a.preventDefault(), a.stopImmediatePropagation();
    const r = parseFloat(e.getComputedStyle(n.documentElement).scrollPaddingTop), l = Number.isFinite(r) ? r : 90, d = e.matchMedia("(prefers-reduced-motion: reduce)").matches;
    e.lenis && !e.lenis.isStopped ? e.lenis.scrollTo(s, { offset: -l, immediate: d }) : e.scrollTo({ top: Math.max(0, s.getBoundingClientRect().top + e.scrollY - l), behavior: d ? "instant" : "smooth" });
  }
  return n.addEventListener("click", t, !0), () => n.removeEventListener("click", t, !0);
}
function mt(n, e, t = window) {
  if (!n || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0 || n.hasAttribute("target") || n.hasAttribute("download") || n.closest("[data-no-swup]") || t.ENVSD?.status !== "ready" || t.ENVSDTransition !== "mask" || t.matchMedia("(prefers-reduced-motion: reduce)").matches) return !1;
  const a = new URL(n.href, t.location.href);
  return a.origin === t.location.origin && (a.pathname !== t.location.pathname || a.search !== t.location.search) && !/\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(a.pathname);
}
function gt(n, e = window) {
  const t = n?.querySelector(".burger-menu-wrap"), a = n?.querySelector(".menu-modal"), i = t?.querySelector(".line-burger.top"), o = t?.querySelector(".line-burger.bottom");
  if (!t || !a || !i || !o) return () => {
  };
  const s = e.matchMedia("(max-width: 991px)"), r = e.matchMedia("(prefers-reduced-motion: reduce)"), l = new AbortController(), d = new Map(["role", "tabindex", "aria-expanded", "aria-label", "aria-controls"].map((f) => [f, t.getAttribute(f)])), c = a.getAttribute("id"), g = a.inert, b = t.style.getPropertyValue("--env-burger-shift");
  c || (a.id = "env-sd-mobile-menu"), t.tagName !== "BUTTON" && (t.setAttribute("role", "button"), t.hasAttribute("tabindex") || t.setAttribute("tabindex", "0")), t.setAttribute("aria-controls", a.id), n.classList.add("is-env-burger-managed");
  let m = !1, h = null, y = !1, T = Number(a.style.opacity || 0);
  const O = /* @__PURE__ */ new Set();
  function w() {
    O.forEach((f) => f.cancel()), O.clear();
  }
  function S() {
    const f = (o.offsetTop + o.offsetHeight / 2 - i.offsetTop - i.offsetHeight / 2) / 2;
    t.style.setProperty("--env-burger-shift", `${f > 0 ? f : 4.5}px`);
  }
  function u() {
    if (w(), r.matches || !t.animate) return;
    [...a.querySelectorAll(".logo-menu-mobile, .link-menu-overlay")].forEach((L, N) => {
      const k = e.getComputedStyle(L), C = k.transform, R = L.animate([
        { opacity: 0, transform: `translateY(18px) ${C === "none" ? "" : C}`.trim() },
        { opacity: k.opacity, transform: C }
      ], { duration: 550, delay: 70 + N * 65, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      O.add(R), R.finished?.then(() => O.delete(R), () => O.delete(R));
    });
  }
  function p(f) {
    const L = f !== m;
    m = f, n.classList.toggle("is-env-menu-open", m), a.inert = !m, t.setAttribute("aria-expanded", String(m)), t.setAttribute("aria-label", m ? "Close menu" : "Open menu"), L && (m ? (S(), u()) : w());
  }
  function I() {
    if (y) return;
    const f = Number(a.style.opacity || e.getComputedStyle(a).opacity), L = (a.style.display || e.getComputedStyle(a).display) === "none" || a.hidden || a.getAttribute("aria-hidden") === "true";
    s.matches ? h === !0 ? !L && f >= 0.999 && (h = null) : h === !1 ? (L || f <= 1e-3) && (h = null) : L || f <= 1e-3 || f < T - 1e-3 ? p(!1) : (f > T + 1e-3 || f >= 0.999) && p(!0) : (h = null, p(!1)), T = f;
  }
  t.addEventListener("click", () => {
    s.matches && (h = !m, p(h));
  }, { capture: !0, signal: l.signal }), t.addEventListener("keydown", (f) => {
    t.tagName === "BUTTON" || !s.matches || !["Enter", " "].includes(f.key) || (f.preventDefault(), t.click());
  }, { signal: l.signal }), a.addEventListener("click", (f) => {
    const L = f.target.closest?.("a[href]");
    m && s.matches && L && !mt(L, f, e) && t.click();
  }, { signal: l.signal }), n.ownerDocument.addEventListener("keydown", (f) => {
    f.key === "Escape" && m && s.matches && (f.preventDefault(), t.click());
  }, { signal: l.signal });
  const v = new e.MutationObserver(I);
  return v.observe(a, { attributes: !0, attributeFilter: ["style", "hidden", "aria-hidden"] }), s.addEventListener("change", I), t.setAttribute("aria-expanded", "false"), t.setAttribute("aria-label", "Open menu"), I(), () => {
    y = !0, v.disconnect(), l.abort(), s.removeEventListener("change", I), w(), n.classList.remove("is-env-burger-managed", "is-env-menu-open"), d.forEach((f, L) => f === null ? t.removeAttribute(L) : t.setAttribute(L, f)), a.inert = g, c === null && a.removeAttribute("id"), b ? t.style.setProperty("--env-burger-shift", b) : t.style.removeProperty("--env-burger-shift");
  };
}
function yt(n, e = window) {
  const t = n?.querySelector(".contact-modal-bloc");
  if (!t) return () => {
  };
  const a = e.matchMedia("(max-width: 767px)"), i = new e.AbortController(), o = /* @__PURE__ */ new Map();
  let s = !1;
  const r = ["role", "tabindex", "aria-label"];
  function l() {
    if (s) return;
    const b = !t.hidden && t.getAttribute("aria-hidden") !== "true" && e.getComputedStyle(t).display !== "none";
    n.classList.toggle("is-env-contact-open", a.matches && b), t.querySelectorAll(".close-bloc").forEach((m) => {
      o.has(m) || o.set(m, new Map(r.map((y) => [y, m.getAttribute(y)])));
      const h = o.get(m);
      a.matches ? (m.tagName !== "BUTTON" && m.tagName !== "A" && (h.get("role") || m.setAttribute("role", "button"), h.get("tabindex") === null && m.setAttribute("tabindex", "0")), h.get("aria-label") || m.setAttribute("aria-label", "Close contact form")) : d(m, h);
    });
  }
  function d(b, m) {
    m.forEach((h, y) => h === null ? b.removeAttribute(y) : b.setAttribute(y, h));
  }
  function c(b) {
    if (!a.matches) return;
    const m = b.target.closest?.(".close-bloc");
    if (!m || !t.contains(m) || b.target.closest(".close-btn")) return;
    const h = m.querySelector(".close-btn") || t.querySelector(".close-btn");
    h && (b.preventDefault(), b.stopPropagation(), h.click());
  }
  t.addEventListener("click", c, { signal: i.signal }), t.addEventListener("keydown", (b) => {
    !a.matches || !["Enter", " "].includes(b.key) || !b.target.matches?.(".close-bloc") || b.target.matches("button,a[href]") || c(b);
  }, { signal: i.signal });
  const g = new e.MutationObserver(l);
  return g.observe(t, { attributes: !0, attributeFilter: ["style", "hidden", "aria-hidden"] }), a.addEventListener("change", l), l(), () => {
    s = !0, i.abort(), g.disconnect(), a.removeEventListener("change", l), n.classList.remove("is-env-contact-open"), o.forEach((b, m) => d(m, b));
  };
}
function Et(n, e = window) {
  const t = n?.querySelector(".contact-modal-bloc"), a = n?.querySelector(".menu-modal");
  if (!t && !a) return () => {
  };
  const i = n.ownerDocument, o = i.documentElement, s = e.matchMedia("(max-width: 991px)"), r = new e.AbortController(), l = [t, a].filter(Boolean), d = new Map(l.map((f) => [f, f.getAttribute("data-lenis-prevent")])), c = t?.style.getPropertyValue("--env-modal-header-height");
  l.forEach((f) => f.setAttribute("data-lenis-prevent", ""));
  let g = [], b = !1, m = !1, h, y = !1, T;
  const O = [];
  function w() {
    if (!t) return;
    const f = n.querySelector(".navbar-logo-center-container") || n;
    t.style.setProperty("--env-modal-header-height", `${f.getBoundingClientRect().height || 78}px`);
  }
  function S(f, L, N) {
    O.push([f, L, f.style.getPropertyValue(L), f.style.getPropertyPriority(L)]), f.style.setProperty(L, N, "important");
  }
  function u() {
    b && (b = !1, O.splice(0).forEach(([f, L, N, k]) => {
      N ? f.style.setProperty(L, N, k) : f.style.removeProperty(L);
    }), o.removeAttribute("data-env-modal-scroll-lock"), y && !o.hasAttribute("data-env-transition-active") && h?.start(), h = null, y = !1);
  }
  function p() {
    if (!m) {
      if (g = l.filter((f) => {
        const L = e.getComputedStyle(f);
        return !f.isConnected || f.hidden || L.display === "none" || f.getAttribute("aria-hidden") === "true" ? !1 : f === t || s.matches && (n.classList.contains("is-env-menu-open") || Number(L.opacity) > 1e-3);
      }), !g.length) {
        u();
        return;
      }
      b || (b = !0, h = e.lenis, y = !!h && !h.isStopped, h?.stop(), S(o, "scrollbar-gutter", "stable"), S(o, "overflow", "hidden"), S(i.body, "overflow", "hidden"), o.setAttribute("data-env-modal-scroll-lock", ""));
    }
  }
  function I(f, L) {
    const N = g.find((k) => k.contains(f));
    if (!N) return !1;
    for (let k = f; k && N.contains(k); k = k.parentElement) {
      const C = e.getComputedStyle(k);
      if (/(auto|scroll)/.test(C.overflowY) && k.scrollHeight > k.clientHeight + 1 && (L < 0 && k.scrollTop > 0 || L > 0 && k.scrollTop + k.clientHeight < k.scrollHeight - 1))
        return !0;
      if (k === N) break;
    }
    return !1;
  }
  i.addEventListener("wheel", (f) => {
    b && !f.ctrlKey && f.deltaY && !I(f.target, f.deltaY) && f.preventDefault();
  }, { capture: !0, passive: !1, signal: r.signal }), i.addEventListener("touchstart", (f) => {
    T = f.touches.length === 1 ? f.touches[0].clientY : void 0;
  }, { capture: !0, passive: !0, signal: r.signal }), i.addEventListener("touchmove", (f) => {
    if (!b || f.touches.length !== 1 || T === void 0) return;
    const L = f.touches[0].clientY, N = T - L;
    T = L, N && !I(f.target, N) && f.preventDefault();
  }, { capture: !0, passive: !1, signal: r.signal }), i.addEventListener("keydown", (f) => {
    if (!b || !["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(f.key) || f.target.closest?.('input,textarea,select,button,a[href],[role="button"],[contenteditable="true"]')) return;
    const L = ["ArrowUp", "PageUp", "Home"].includes(f.key) || f.key === " " && f.shiftKey ? -1 : 1;
    I(f.target, L) || f.preventDefault();
  }, { capture: !0, signal: r.signal });
  const v = new e.MutationObserver(p);
  return l.forEach((f) => v.observe(f, { attributes: !0, attributeFilter: ["style", "hidden", "aria-hidden"] })), v.observe(n, { attributes: !0, attributeFilter: ["class"] }), s.addEventListener("change", p), e.addEventListener("resize", w, { signal: r.signal }), w(), p(), () => {
    m = !0, r.abort(), v.disconnect(), s.removeEventListener("change", p), u(), d.forEach((f, L) => f === null ? L.removeAttribute("data-lenis-prevent") : L.setAttribute("data-lenis-prevent", f)), t && (c ? t.style.setProperty("--env-modal-header-height", c) : t.style.removeProperty("--env-modal-header-height"));
  };
}
const ht = (n) => [...n.querySelectorAll('link[rel="stylesheet"]')].map((e) => e.getAttribute("href"));
function Be(n, e) {
  try {
    const t = new URL(n);
    if (t.origin !== "https://cdn.prod.website-files.com" || t.search || t.hash || t.username || t.password) return null;
    const a = `/${e}/css/`;
    if (!t.pathname.startsWith(a)) return null;
    const i = t.pathname.slice(a.length).match(/^([a-zA-Z0-9_-]+\.webflow\.shared)\.[a-f0-9]{6,32}\.min\.css$/);
    return i ? a + i[1] : null;
  } catch {
    return null;
  }
}
function Tt(n, e, t) {
  const a = ht(n);
  if (a.length !== e.length) throw Error("Stylesheets changed");
  const i = [];
  return a.forEach((o, s) => {
    const r = e[s];
    if (o === r) return;
    const l = Be(r, t);
    if (!l || Be(o, t) !== l) throw Error("Stylesheets changed");
    i.push({ from: r, to: o, media: n.querySelectorAll('link[rel="stylesheet"]')[s].getAttribute("media") || "all" });
  }), { sheets: a, replacements: i };
}
async function vt(n, e, { timeout: t = 5e3 } = {}) {
  const a = [];
  let i = !1;
  const o = () => {
    i || a.forEach((s) => s.remove());
  };
  try {
    await Promise.all(e.replacements.map(({ to: s }) => new Promise((r, l) => {
      const d = n.createElement("link");
      d.rel = "stylesheet", d.href = s, d.media = "not all", d.setAttribute("data-env-staged-sheet", ""), a.push(d);
      const c = setTimeout(() => g(Error("Webflow stylesheet update timed out")), t), g = (b) => {
        clearTimeout(c), d.onload = d.onerror = null, b ? l(b) : r();
      };
      d.onload = () => g(), d.onerror = () => g(Error("Webflow stylesheet update failed")), n.head.append(d);
    })));
  } catch (s) {
    throw o(), s;
  }
  return { rollback: o, commit() {
    if (i) return;
    i = !0, a.forEach((r, l) => {
      r.media = e.replacements[l].media, r.removeAttribute("data-env-staged-sheet");
    });
    const s = new Set(e.replacements.map((r) => r.from));
    n.querySelectorAll('link[rel="stylesheet"]:not([data-env-staged-sheet])').forEach((r) => {
      s.has(r.getAttribute("href")) && r.remove();
    });
  } };
}
function It(n, e = window) {
  if (!n?.querySelector(".hero-about")) return { refresh() {
  }, destroy() {
  } };
  const t = new e.AbortController(), a = [...n.querySelectorAll("img")], i = new Set(n.querySelectorAll(".bloc-big-text > img"));
  let o = !1, s = 0, r = 0, l = !1, d = -1 / 0;
  const c = /* @__PURE__ */ new WeakMap();
  function g() {
    if (s = 0, !(o || !n.isConnected || !l)) {
      if (e.document.documentElement.hasAttribute("data-env-transition-active") || n.hasAttribute("data-env-alt-reveal-wait") || e.performance.now() - d < 140) {
        r = e.setTimeout(b, 160);
        return;
      }
      l = !1, e.lenis?.resize(), e.ScrollTrigger?.refresh();
    }
  }
  function b() {
    o || (l = !0, e.clearTimeout(r), s || (s = e.requestAnimationFrame(g)));
  }
  function m(y) {
    const T = y.currentTarget;
    i.has(T) && T.naturalWidth && T.naturalHeight && !T.hasAttribute("width") && !T.hasAttribute("height") && (T.setAttribute("width", T.naturalWidth), T.setAttribute("height", T.naturalHeight)), b();
  }
  a.forEach((y) => {
    y.addEventListener("load", m, { signal: t.signal }), y.addEventListener("error", b, { signal: t.signal }), i.has(y) && (y.loading = "eager"), y.complete && y.naturalWidth && m({ currentTarget: y });
  });
  const h = e.ResizeObserver ? new e.ResizeObserver((y) => {
    let T = !1;
    y.forEach(({ target: O, contentRect: w }) => {
      const S = `${w.width.toFixed(1)}:${w.height.toFixed(1)}`, u = c.get(O);
      c.set(O, S), u !== void 0 && u !== S && (T = !0);
    }), T && b();
  }) : null;
  return n.querySelectorAll(".section").forEach((y) => h?.observe(y)), e.addEventListener("scroll", () => {
    d = e.performance.now(), l && (e.clearTimeout(r), r = e.setTimeout(b, 160));
  }, { passive: !0, signal: t.signal }), e.addEventListener("resize", b, { signal: t.signal }), e.addEventListener("pageshow", b, { signal: t.signal }), e.document.fonts?.ready.then(b), b(), { refresh: b, destroy() {
    o = !0, t.abort(), h?.disconnect(), e.cancelAnimationFrame(s), e.clearTimeout(r);
  } };
}
function wt(n, e = window) {
  const t = n?.querySelector(".about-hero");
  if (!t?.querySelector(".hero-about")) return { destroy() {
  } };
  const a = new e.AbortController(), i = e.document.createElement("style");
  i.textContent = "[data-env-about-word]{opacity:var(--env-about-opacity,1)!important}[data-env-about-mask]{clip-path:inset(var(--env-about-inset,10%))!important}", e.document.head.append(i);
  const o = e.matchMedia("(prefers-reduced-motion: reduce)"), s = [...t.querySelectorAll('[data-reveal-text="trigger"]')].map((u) => ({ trigger: u, text: u.querySelector('[data-reveal-text="text-white"]'), progress: null, words: [] })).filter((u) => u.text), r = [...n.querySelectorAll(".section.mask")].map((u) => ({ element: u, progress: null })), l = /* @__PURE__ */ new Map();
  let d = 0, c = !1, g = 0;
  const b = (u) => Math.max(0, Math.min(1, u));
  function m(u, p, I) {
    l.has(u) || (l.set(u, { attribute: p, property: I, attr: u.getAttribute(p), value: u.style.getPropertyValue(I), priority: u.style.getPropertyPriority(I) }), u.setAttribute(p, ""));
  }
  function h(u) {
    const p = l.get(u);
    if (!p) return;
    const { attribute: I, property: v, attr: f, value: L, priority: N } = p;
    f === null ? u.removeAttribute(I) : u.setAttribute(I, f), L ? u.style.setProperty(v, L, N) : u.style.removeProperty(v), l.delete(u);
  }
  function y() {
    s.forEach((u) => {
      const p = [...u.text.querySelectorAll(".gsap_split_word")];
      u.words.filter((I) => !(p.length ? p : [u.text]).includes(I)).forEach(h), u.words = p.length ? p : [u.text], u.words.forEach((I) => m(I, "data-env-about-word", "--env-about-opacity"));
    });
  }
  r.forEach(({ element: u }) => m(u, "data-env-about-mask", "--env-about-inset")), y();
  function T() {
    !c && !d && (d = e.requestAnimationFrame(O));
  }
  function O(u) {
    if (d = 0, c || !n.isConnected) return;
    if (e.document.documentElement.hasAttribute("data-env-transition-active") || n.hasAttribute("data-env-alt-reveal-wait")) {
      g = 0;
      return;
    }
    const p = e.innerHeight, I = o.matches || !g ? 1 : 1 - Math.exp(-Math.min(u - g, 64) / 90);
    g = u;
    let v = !1;
    const f = s.map((k) => {
      const C = k.trigger.getBoundingClientRect();
      return b((p * 0.65 - C.top) / Math.max(C.height, 1));
    }), L = r.map(({ element: k }) => b((p - k.getBoundingClientRect().top) / (p * 0.85)));
    function N(k, C) {
      return k.progress = k.progress === null ? C : k.progress + (C - k.progress) * I, Math.abs(C - k.progress) < 1e-3 ? k.progress = C : v = !0, o.matches ? 1 : k.progress;
    }
    s.forEach((k, C) => {
      const R = N(k, f[C]), A = 1 + 0.3 * (k.words.length - 1);
      k.words.forEach((V, U) => {
        const j = 0.1 + 0.9 * b(R * A - U * 0.3);
        V.style.setProperty("--env-about-opacity", j.toFixed(4));
      });
    }), r.forEach((k, C) => k.element.style.setProperty("--env-about-inset", `${((1 - N(k, L[C])) * 10).toFixed(4)}%`)), v ? T() : g = 0;
  }
  const w = new e.MutationObserver((u) => {
    u.some((p) => p.type === "childList") && y(), T();
  });
  w.observe(t, { childList: !0, subtree: !0 }), w.observe(n, { attributes: !0, attributeFilter: ["data-env-alt-reveal-wait"] }), w.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["data-env-transition-active"] });
  const S = e.ResizeObserver ? new e.ResizeObserver(T) : null;
  return n.querySelectorAll(".section").forEach((u) => S?.observe(u)), e.addEventListener("scroll", T, { passive: !0, signal: a.signal }), e.addEventListener("resize", T, { signal: a.signal }), e.addEventListener("pageshow", T, { signal: a.signal }), o.addEventListener("change", T, { signal: a.signal }), T(), { destroy() {
    c = !0, a.abort(), w.disconnect(), S?.disconnect(), e.cancelAnimationFrame(d), i.remove(), [...l.keys()].forEach(h);
  } };
}
function Ot(n, e = window) {
  if (!n) return () => {
  };
  const t = [...n.querySelectorAll("img.image-project[srcset], img.cover-project[srcset]")].filter((l) => /^\s*\d+(?:\.\d+)?px\s*$/.test(l.getAttribute("sizes") || "") && /\s\d+w(?:\s*,|\s*$)/.test(l.getAttribute("srcset") || ""));
  if (!t.length) return () => {
  };
  let a = !1, i;
  function o(l) {
    if (a || !n.isConnected || !l.isConnected) return;
    const d = l.clientWidth;
    if (!(d > 0)) return;
    const c = `${Math.ceil(d)}px`;
    l.getAttribute("sizes") !== c && l.setAttribute("sizes", c);
  }
  t.forEach(o);
  const s = e.ResizeObserver ? new e.ResizeObserver((l) => {
    l.forEach((d) => o(d.target));
  }) : null;
  t.forEach((l) => s?.observe(l));
  const r = () => {
    a || i != null || (i = e.requestAnimationFrame(() => {
      i = null, t.forEach(o);
    }));
  };
  return s || e.addEventListener("resize", r, { passive: !0 }), () => {
    a = !0, s?.disconnect(), e.removeEventListener("resize", r), i != null && e.cancelAnimationFrame(i);
  };
}
function Lt() {
  window.ENVOrganicBlob?.destroy();
  const n = new AbortController(), e = n.signal, t = matchMedia("(prefers-reduced-motion: reduce)"), a = matchMedia("(hover: hover) and (pointer: fine)"), i = [];
  document.querySelectorAll('#env-sd-page [data-env-blob="orange"]').forEach((o) => {
    if (o.closest("[data-env-transition-snapshot]")) return;
    const s = document.createElement("div");
    s.className = "env-blob-background", s.setAttribute("aria-hidden", "true"), s.style.cssText = "position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit";
    const r = document.createElement("canvas");
    r.style.cssText = "display:block;width:100%;height:100%;filter:blur(32px)";
    const l = r.getContext("2d");
    if (!l) return;
    s.append(r), o.prepend(s);
    let d = 1, c = 1, g = 0, b = 0, m = 0, h = !1, y = !1, T = 0, O = 0, w = 0, S = 0, u = 0, p = 0;
    function I() {
      l.clearRect(0, 0, d, c);
      const A = t.matches ? 0 : m, V = Math.min(d * 0.38, 500) * 2.1 * 1.35, U = Math.min(c * 0.49, 350) * 2.1 * 0.78, j = d * 0.23 + w + Math.sin(A * 0.29) * d * 0.13, D = c * 0.98 + S + Math.cos(A * 0.23) * c * 0.075, G = [];
      for (let E = 0; E < 10; E++) {
        const _ = E / 10 * Math.PI * 2, x = 1 + 0.55 * (0.2 * Math.sin(_ * 3 + A * 0.33) + 0.13 * Math.cos(_ * 2 - A * 0.25) + 0.07 * Math.sin(_ * 5 + A * 0.17));
        G.push({ x: j + Math.cos(_) * V * x, y: D + Math.sin(_) * U * x });
      }
      l.beginPath(), G.forEach((E, _) => {
        const x = G[(_ + 9) % 10], M = G[(_ + 1) % 10];
        _ || l.moveTo((x.x + E.x) / 2, (x.y + E.y) / 2), l.quadraticCurveTo(E.x, E.y, (E.x + M.x) / 2, (E.y + M.y) / 2);
      }), l.closePath(), l.save(), l.translate(j, D), l.scale(V / U, 1);
      const Z = l.createRadialGradient(-U * 0.12, -U * 0.2, 0, 0, 0, U * 0.94);
      [[0, 0.5], [0.28, 0.36], [0.6, 0.15], [0.82, 0.035], [1, 0]].forEach(([E, _]) => Z.addColorStop(E, `rgba(238,69,43,${_})`)), l.fillStyle = Z, l.fill(), l.restore();
    }
    function v() {
      if (!y || t.matches || !a.matches) {
        u = p = 0;
        return;
      }
      const A = o.getBoundingClientRect();
      u = ((T - A.left) / d - 0.5) * Math.min(d * 0.65, 760) * 0.7, p = ((O - A.top) / c - 0.5) * Math.min(c * 0.28, 180) * 0.7;
    }
    function f(A) {
      if (g = 0, !h || document.hidden) return;
      const V = Math.min((A - (b || A)) / 1e3, 0.05);
      b = A, t.matches || (m += V);
      const U = 1 - Math.exp(-V * 4.5);
      w += (u - w) * U, S += (p - S) * U, I(), t.matches || (g = requestAnimationFrame(f));
    }
    function L() {
      cancelAnimationFrame(g), g = 0, b = 0;
    }
    function N() {
      !g && h && !document.hidden && (b = 0, g = requestAnimationFrame(f));
    }
    function k() {
      y = !1, v();
    }
    const C = new ResizeObserver(() => {
      const A = o.getBoundingClientRect();
      d = Math.max(A.width, 1), c = Math.max(A.height, 1);
      const V = Math.min(devicePixelRatio || 1, 1.5);
      r.width = Math.round(d * V), r.height = Math.round(c * V), l.setTransform(V, 0, 0, V, 0, 0), v(), I();
    }), R = new IntersectionObserver((A) => {
      h = A[0].isIntersecting, h ? N() : L();
    });
    C.observe(o), R.observe(o), o.addEventListener("pointermove", (A) => {
      A.pointerType !== "touch" && (y = !0, T = A.clientX, O = A.clientY, v());
    }, { passive: !0, signal: e }), o.addEventListener("pointerleave", k, { signal: e }), window.addEventListener("scroll", v, { passive: !0, signal: e }), window.addEventListener("blur", k, { signal: e }), document.addEventListener("visibilitychange", () => document.hidden ? L() : N(), { signal: e }), t.addEventListener("change", () => {
      w = S = u = p = 0, I(), N();
    }, { signal: e }), a.addEventListener("change", k, { signal: e }), i.push(() => {
      L(), C.disconnect(), R.disconnect(), s.remove();
    });
  }), window.ENVOrganicBlob = { destroy() {
    n.abort(), i.forEach((o) => o()), window.ENVOrganicBlob === this && delete window.ENVOrganicBlob;
  } };
}
function je(n) {
  if (!n.querySelector(".section-animation-about, .section.hero-about + .section.about-second")) return;
  const e = n.querySelector("main.main-wrapper"), t = [...n.querySelectorAll(".navbar-logo-center")].find((o) => !e?.contains(o));
  if (!e || !t) return;
  const a = (o) => JSON.stringify([...o.querySelectorAll("a[href]")].map((s) => [s.getAttribute("href"), s.textContent.trim()])), i = a(t);
  e.querySelectorAll(".navbar-logo-center").forEach((o) => {
    o.querySelector(".navbar-brand-three") && a(o) === i && o.remove();
  });
}
function St(n, e) {
  const t = e.querySelector('script[data-env-page-animation="about"], meta[data-env-page-animation="about"]'), a = t ? [...t.attributes].filter((o) => o.name === "data-env-page-animation" || o.name.startsWith("data-env-about-")) : [];
  if (n.querySelectorAll('[data-env-page-animation="about"]').forEach((o) => o.remove()), !a.length) return;
  const i = n.createElement("meta");
  a.forEach((o) => i.setAttribute(o.name, o.value)), n.head.append(i);
}
const Nt = `
(() => {
  const root =
    document.querySelector(".section-animation-about") ||
    document.querySelector(".section.hero-about")?.parentElement;

  if (!root) return;

  const lines = [...root.querySelectorAll(".bloc-big-text > img")];
  if (!lines.length) return;

  window.ENVAboutPageTest?.destroy();
  window.ENVAboutReveals?.destroy();

  /* TEXTES 1 À 4 */
  const firstGroup = {
    start: "top 110%",
    end: "top 60%",
    distance: 0.42,
    distanceMobile: 0.55,
    blur: 20,

    downDuration: 0.7,
    downEase: "power3.out",

    upDuration: 0.7,
    upEase: "power3.out"
  };

  /* TEXTES 5 ET 6 — réglages indépendants */
  const secondGroup = {
    start: "top 105%",
    end: "top 60%",
    distance: 0.32,
    distanceMobile: 0.42,
    blur: 20,

    downDuration: 0.95,
    downEase: "power3.out",

    upDuration: 0.7,
    upEase: "power1.out"
  };

  const originalIgnore = new Map(
    lines.map(line => [line, line.getAttribute("data-env-ignore")])
  );

  lines.forEach(line => {
    line.setAttribute("data-env-ignore", "");
  });

  let disposed = false;
  let media;
  let observer;
  let refreshFrame;

  const followers = new Set();

  function destroy() {
    if (disposed) return;
    disposed = true;

    observer?.disconnect();
    cancelAnimationFrame(refreshFrame);
    followers.forEach(tween => tween.kill());
    followers.clear();
    media?.revert();

    lines.forEach(line => {
      line.removeEventListener("load", refresh);

      const previous = originalIgnore.get(line);
      if (previous === null) line.removeAttribute("data-env-ignore");
      else line.setAttribute("data-env-ignore", previous);
    });
  }

  function refresh() {
    if (disposed || refreshFrame) return;

    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;

      if (!disposed && root.isConnected) {
        ScrollTrigger.refresh();
      }
    });
  }

  window.ENVAboutPageTest = { destroy };

  window.Webflow = window.Webflow || [];
  window.Webflow.push(() => {
    if (disposed || !window.gsap || !window.ScrollTrigger) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    media = gsap.matchMedia();
    media.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)"
    }, context => {
      const isMobile = context.conditions.mobile;

      gsap.context(() => {
      gsap.set(root, { overflowX: "clip" });

      lines.forEach((line, index) => {
        const settings = index < 4 ? firstGroup : secondGroup;
        const direction = index % 2 === 0 ? -1 : 1;
        const state = { progress: 0 };

        let follower;

        const animation = gsap.fromTo(line,
          isMobile ? {
            opacity: 0.1
          } : {
            x: () => direction * Math.min(innerWidth * settings.distance, 720),
            opacity: 0,
            filter: \`blur(\${settings.blur}px)\`
          },
          isMobile ? {
            opacity: 1,
            duration: 1,
            ease: "none",
            paused: true
          } : {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "none",
            paused: true
          }
        );

        function follow(trigger, immediate = false) {
          if (follower) {
            follower.kill();
            followers.delete(follower);
          }

          if (immediate) {
            state.progress = trigger.progress;
            animation.progress(state.progress);
            return;
          }

          const scrollingDown = trigger.direction >= 0;

          follower = gsap.to(state, {
            progress: trigger.progress,
            duration: scrollingDown
              ? settings.downDuration
              : settings.upDuration,
            ease: scrollingDown
              ? settings.downEase
              : settings.upEase,
            onUpdate: () => animation.progress(state.progress),
            onComplete: () => followers.delete(follower)
          });

          followers.add(follower);
        }

        ScrollTrigger.create({
          trigger: line,
          start: settings.start,
          end: settings.end,
          invalidateOnRefresh: true,
          onUpdate: trigger => follow(trigger),
          onRefresh: trigger => {
            animation.invalidate();
            follow(trigger, true);
          }
        });
      });
      }, root);

      // Cancel direction-following tweens when switching breakpoints.
      // matchMedia restores the previous transforms/blur automatically.
      return () => {
        followers.forEach(tween => tween.kill());
        followers.clear();
      };
    });

    lines.forEach(line => {
      if (!line.complete) {
        line.addEventListener("load", refresh, { once: true });
      }
    });

    document.fonts?.ready.then(refresh);
    refresh();

    observer = new MutationObserver(() => {
      if (!root.isConnected) destroy();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
`, Rt = `
(() => {
  const root =
    document.querySelector(".section-animation-about") ||
    document.querySelector(".section.hero-about")?.parentElement;

  if (!root) return;

  const lines = [...root.querySelectorAll(".bloc-big-text > img")];
  if (!lines.length) return;

  window.ENVAboutPageTest?.destroy();
  window.ENVAboutReveals?.destroy();

  /* TEXTES 1 À 4 */
  const firstGroup = {
    start: "top 110%",
    end: "top 60%",
    distance: 0.42,
    distanceMobile: 0.55,
    blur: 20,

    downDuration: 0.7,
    downEase: "power3.out",

    upDuration: 0.7,
    upEase: "power3.out"
  };

  /* TEXTES 5 ET 6 — réglages indépendants */
  const secondGroup = {
    start: "top 105%",
    end: "top 60%",
    distance: 0.32,
    distanceMobile: 0.42,
    blur: 20,

    downDuration: 0.95,
    downEase: "power3.out",

    upDuration: 0.7,
    upEase: "power1.out"
  };

  const originalIgnore = new Map(
    lines.map(line => [line, line.getAttribute("data-env-ignore")])
  );

  lines.forEach(line => {
    line.setAttribute("data-env-ignore", "");
  });

  let disposed = false;
  let ctx;
  let observer;
  let refreshFrame;

  const followers = new Set();

  function destroy() {
    if (disposed) return;
    disposed = true;

    observer?.disconnect();
    cancelAnimationFrame(refreshFrame);
    followers.forEach(tween => tween.kill());
    followers.clear();
    ctx?.revert();

    lines.forEach(line => {
      line.removeEventListener("load", refresh);

      const previous = originalIgnore.get(line);
      if (previous === null) line.removeAttribute("data-env-ignore");
      else line.setAttribute("data-env-ignore", previous);
    });
  }

  function refresh() {
    if (disposed || refreshFrame) return;

    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;

      if (!disposed && root.isConnected) {
        ScrollTrigger.refresh();
      }
    });
  }

  window.ENVAboutPageTest = { destroy };

  window.Webflow = window.Webflow || [];
  window.Webflow.push(() => {
    if (disposed || !window.gsap || !window.ScrollTrigger) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      gsap.set(root, { overflowX: "clip" });

      lines.forEach((line, index) => {
        const settings = index < 4 ? firstGroup : secondGroup;
        const direction = index % 2 === 0 ? -1 : 1;
        const state = { progress: 0 };

        let follower;

        const animation = gsap.fromTo(line, {
          x: () => {
            const distance = innerWidth <= 767
              ? settings.distanceMobile
              : settings.distance;

            return direction * Math.min(innerWidth * distance, 720);
          },
          opacity: 0,
          filter: \`blur(\${settings.blur}px)\`
        }, {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "none",
          paused: true
        });

        function follow(trigger, immediate = false) {
          if (follower) {
            follower.kill();
            followers.delete(follower);
          }

          if (immediate) {
            state.progress = trigger.progress;
            animation.progress(state.progress);
            return;
          }

          const scrollingDown = trigger.direction >= 0;

          follower = gsap.to(state, {
            progress: trigger.progress,
            duration: scrollingDown
              ? settings.downDuration
              : settings.upDuration,
            ease: scrollingDown
              ? settings.downEase
              : settings.upEase,
            onUpdate: () => animation.progress(state.progress),
            onComplete: () => followers.delete(follower)
          });

          followers.add(follower);
        }

        ScrollTrigger.create({
          trigger: line,
          start: settings.start,
          end: settings.end,
          invalidateOnRefresh: true,
          onUpdate: trigger => follow(trigger),
          onRefresh: trigger => {
            animation.invalidate();
            follow(trigger, true);
          }
        });
      });
    }, root);

    lines.forEach(line => {
      if (!line.complete) {
        line.addEventListener("load", refresh, { once: true });
      }
    });

    document.fonts?.ready.then(refresh);
    refresh();

    observer = new MutationObserver(() => {
      if (!root.isConnected) destroy();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
`, At = `
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
`, kt = `
(() => {
  const hero = document.querySelector(".section.hero-about");
  const content = hero?.parentElement.querySelector(
    ":scope > .section.about-second"
  );

  if (!hero || !content) return;

  hero.__envReleaseCleanup?.();

  const controller = new AbortController();
  let frame = null;

  function destroy() {
    controller.abort();
    if (frame !== null) cancelAnimationFrame(frame);
    hero.removeAttribute("data-env-hero-released");
    delete hero.__envReleaseCleanup;
  }

  function update() {
    frame = null;

    if (!hero.isConnected) return destroy();

    hero.toggleAttribute(
      "data-env-hero-released",
      content.getBoundingClientRect().top <= 0
    );
  }

  function schedule() {
    if (frame === null) frame = requestAnimationFrame(update);
  }

  hero.__envReleaseCleanup = destroy;

  addEventListener("scroll", schedule, {
    passive: true,
    signal: controller.signal
  });

  addEventListener("resize", schedule, {
    signal: controller.signal
  });

  addEventListener("pageshow", schedule, {
    signal: controller.signal
  });

  update();
})();
`, we = {
  responsive: Nt,
  legacy: Rt,
  mask: At,
  hero: kt
}, te = (n) => n.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "").replace(/\s+/g, ""), Ee = /* @__PURE__ */ new Set(["start", "end", "distance", "distanceMobile", "blur", "downDuration", "downEase", "upDuration", "upEase"]);
function nt(n) {
  const e = {};
  let t = n;
  for (const a of ["firstGroup", "secondGroup"]) {
    const i = new RegExp(`const\\s+${a}\\s*=\\s*(\\{[\\s\\S]*?\\});`), o = t.match(i);
    if (!o) return null;
    let s;
    try {
      const r = o[1].replace(/\b([A-Za-z]\w*)\s*:/g, '"$1":').replace(/,\s*}/g, "}");
      s = JSON.parse(r);
    } catch {
      return null;
    }
    if (!s || Object.keys(s).length !== Ee.size || Object.keys(s).some((r) => !Ee.has(r))) return null;
    for (const r of Ee) {
      const l = s[r];
      if (r === "start" || r === "end") {
        if (typeof l != "string" || !/^top\s+(?:\d+(?:\.\d+)?)%$/.test(l) || Number(l.match(/[\d.]+/)[0]) > 150) return null;
      } else if (r.endsWith("Ease")) {
        if (typeof l != "string" || !/^(?:none|linear|(?:power[0-4]|sine|expo|circ)\.(?:in|out|inOut))$/.test(l)) return null;
      } else {
        const d = r === "blur" ? 60 : r.includes("Duration") ? 5 : 2;
        if (typeof l != "number" || !Number.isFinite(l) || l < 0 || l > d) return null;
      }
    }
    e[a] = s, t = t.replace(i, `const ${a} = {};`);
  }
  return { groups: e, signature: te(t) };
}
const Ye = Object.fromEntries(["responsive", "legacy"].map((n) => [n, nt(we[n]).signature]));
function ze(n) {
  const e = { sources: [], story: null, hero: !1, mask: !1 };
  for (const t of n.scripts) {
    if (t.src || !t.textContent.trim()) continue;
    const a = t.textContent;
    if (a.includes("ENVAboutPageTest")) {
      const i = nt(a);
      if (!i) continue;
      const o = Object.keys(Ye).find((s) => Ye[s] === i.signature);
      if (!o || e.story) continue;
      e.story = { groups: i.groups, responsive: o === "responsive" };
    } else if (te(a) === te(we.hero)) e.hero = !0;
    else if (te(a) === te(we.mask)) e.mask = !0;
    else continue;
    e.sources.push(a);
  }
  return e;
}
function _t(n) {
  const e = /* @__PURE__ */ new Map();
  return n.querySelectorAll('#env-sd-page .hero-about > .big--logo.middle[data-env-reveal="fade-scale"]').forEach((t) => {
    const a = n.createElement("div");
    a.setAttribute("data-env-about-logo-layer", ""), a.style.cssText = "display:grid;place-items:center;width:100%;height:100%;min-width:0;flex-shrink:0;", t.before(a), a.append(t), e.set(t, a);
  }), () => e.forEach((t, a) => {
    a.parentElement === t && t.replaceWith(a);
  });
}
function xt(n, e = !0) {
  const t = document.querySelector(".section-animation-about") || document.querySelector(".section.hero-about")?.parentElement;
  if (!t) return;
  const a = [...t.querySelectorAll(".bloc-big-text > img")];
  if (!a.length) return;
  window.ENVAboutPageTest?.destroy(), window.ENVAboutReveals?.destroy();
  const i = n.firstGroup, o = n.secondGroup, s = new Map(
    a.map((m) => [m, m.getAttribute("data-env-ignore")])
  );
  a.forEach((m) => {
    m.setAttribute("data-env-ignore", "");
  });
  let r = !1, l, d;
  const c = /* @__PURE__ */ new Set();
  function g() {
    r || (r = !0, cancelAnimationFrame(d), c.forEach((m) => m.kill()), c.clear(), l?.revert(), a.forEach((m) => {
      m.removeEventListener("load", b);
      const h = s.get(m);
      h === null ? m.removeAttribute("data-env-ignore") : m.setAttribute("data-env-ignore", h);
    }));
  }
  function b() {
    r || d || (d = requestAnimationFrame(() => {
      d = null, !r && t.isConnected && ScrollTrigger.refresh();
    }));
  }
  window.ENVAboutPageTest = { destroy: g }, window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    r || !window.gsap || !window.ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches || (gsap.registerPlugin(ScrollTrigger), l = gsap.matchMedia(), l.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)"
    }, (m) => {
      const h = e && m.conditions.mobile;
      return gsap.context(() => {
        gsap.set(t, { overflowX: "clip" }), a.forEach((y, T) => {
          const O = T < 4 ? i : o, w = T % 2 === 0 ? -1 : 1, S = { progress: 0 };
          let u;
          const p = gsap.fromTo(
            y,
            h ? {
              opacity: 0.1
            } : {
              x: () => w * Math.min(innerWidth * (innerWidth <= 767 ? O.distanceMobile : O.distance), 720),
              opacity: 0,
              filter: `blur(${O.blur}px)`
            },
            h ? {
              opacity: 1,
              duration: 1,
              ease: "none",
              paused: !0
            } : {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "none",
              paused: !0
            }
          );
          function I(v, f = !1) {
            if (u && (u.kill(), c.delete(u)), f) {
              S.progress = v.progress, p.progress(S.progress);
              return;
            }
            const L = v.direction >= 0;
            u = gsap.to(S, {
              progress: v.progress,
              duration: L ? O.downDuration : O.upDuration,
              ease: L ? O.downEase : O.upEase,
              onUpdate: () => p.progress(S.progress),
              onComplete: () => c.delete(u)
            }), c.add(u);
          }
          ScrollTrigger.create({
            trigger: y,
            start: O.start,
            end: O.end,
            invalidateOnRefresh: !0,
            onUpdate: (v) => I(v),
            onRefresh: (v) => {
              p.invalidate(), I(v, !0);
            }
          });
        });
      }, t), () => {
        c.forEach((y) => y.kill()), c.clear();
      };
    }), a.forEach((m) => {
      m.complete || m.addEventListener("load", b, { once: !0 });
    }), document.fonts?.ready.then(b), b());
  });
}
function Mt() {
  const n = document.querySelector(".section.hero-about"), e = n?.parentElement.querySelector(
    ":scope > .section.about-second"
  );
  if (!n || !e) return;
  const t = e.nextElementSibling, i = (n.closest("#env-sd-page") || document).querySelector("footer, .section.footer");
  n.__envReleaseCleanup?.();
  const o = new AbortController();
  let s = null;
  function r() {
    o.abort(), s !== null && cancelAnimationFrame(s), n.removeAttribute("data-env-hero-released"), delete n.__envReleaseCleanup;
  }
  function l() {
    if (s = null, !n.isConnected) return r();
    n.toggleAttribute(
      "data-env-hero-released",
      e.getBoundingClientRect().top <= 0 || t && t.getBoundingClientRect().top <= 0 || i && i.getBoundingClientRect().top < innerHeight
    );
  }
  function d() {
    s === null && (s = requestAnimationFrame(l));
  }
  n.__envReleaseCleanup = r, addEventListener("scroll", d, {
    passive: !0,
    signal: o.signal
  }), addEventListener("resize", d, {
    signal: o.signal
  }), addEventListener("pageshow", d, {
    signal: o.signal
  }), l();
}
function Ct() {
  window.ENVCTABlob?.destroy();
  const n = new AbortController(), { signal: e } = n, t = matchMedia("(hover: hover) and (pointer: fine)"), a = matchMedia("(prefers-reduced-motion: reduce)");
  let i = null, o = 0, s = 0, r = 0, l = 0, d = 0;
  function c() {
    cancelAnimationFrame(d), d = 0, i?.style.removeProperty("--blob-x"), i?.style.removeProperty("--blob-y"), i = null, o = s = r = l = 0;
  }
  function g() {
    if (d = 0, !i?.isConnected) {
      c();
      return;
    }
    o += (r - o) * 0.07, s += (l - s) * 0.07, i.style.setProperty("--blob-x", `${o.toFixed(2)}px`), i.style.setProperty("--blob-y", `${s.toFixed(2)}px`), Math.abs(r - o) + Math.abs(l - s) > 0.1 && (d = requestAnimationFrame(g));
  }
  function b(y, T) {
    r = y, l = T, d || (d = requestAnimationFrame(g));
  }
  function m() {
    i && b(0, 0);
  }
  document.addEventListener("pointermove", (y) => {
    if (!t.matches || a.matches || y.pointerType === "touch") {
      c();
      return;
    }
    const T = y.target instanceof Element ? y.target.closest(".section.cta") : null;
    if (!T) {
      m();
      return;
    }
    T !== i && (c(), i = T);
    const O = i.getBoundingClientRect();
    b(
      ((y.clientX - O.left) / O.width - 0.5) * Math.min(O.width * 0.3, 320),
      ((y.clientY - O.top) / O.height - 0.5) * Math.min(O.height * 0.12, 60)
    );
  }, { passive: !0, signal: e }), document.documentElement.addEventListener("pointerleave", m, { signal: e }), window.addEventListener("blur", m, { signal: e }), window.addEventListener("scroll", m, { passive: !0, signal: e });
  const h = () => {
    (!t.matches || a.matches) && c();
  };
  t.addEventListener("change", h, { signal: e }), a.addEventListener("change", h, { signal: e }), window.ENVCTABlob = {
    destroy() {
      n.abort(), c();
    }
  };
}
async function Ut({ visit: n, useMask: e, transition: t, root: a, lenis: i, mount: o }) {
  const s = e && n.animation.animate;
  s || (t.cleanup(), a?.removeAttribute("data-env-alt-reveal-wait"), i?.start()), await o({ deferReveals: s });
}
function J(n, e = window, t = e.lenis) {
  const a = !n.history.popstate && n.scroll.reset && !(n.scroll.target ?? n.to.hash), i = a ? 0 : e.scrollY, o = a ? 0 : e.scrollX;
  a && e.scrollTo({ top: i, left: o, behavior: "instant" }), t?.resize(), t?.scrollTo(i, { immediate: !0, force: !0 });
}
const ee = /* @__PURE__ */ new Set();
function Vt(n = document, e = window) {
  const t = [
    [".navbar-logo-center .nav-link-sd", "color"],
    [".navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd)", "color"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "color"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "backgroundColor"],
    [".navbar-logo-center :is(.btn-sd.nav,.btn-primary)", "borderColor"],
    [".navbar-logo-center .dot-link, .navbar-logo-center .line-burger", "backgroundColor"]
  ].flatMap(([a, i]) => [...n.querySelectorAll(a)].map((o) => ({
    el: o,
    property: i,
    before: e.getComputedStyle(o)[i],
    transition: o.style.getPropertyValue("transition"),
    priority: o.style.getPropertyPriority("transition")
  })));
  return ee.forEach((a) => a.cancel()), ee.clear(), t.forEach(({ el: a }) => a.style.setProperty("transition", "none", "important")), () => {
    const a = t.map((i) => ({ ...i, after: e.getComputedStyle(i.el)[i.property] }));
    for (const { el: i, property: o, before: s, after: r, transition: l, priority: d } of a) {
      if (s !== r && !e.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const c = i.animate([{ [o]: s }, { [o]: r }], { duration: 400, easing: "ease", fill: "both" });
        ee.add(c), c.finished.then(() => {
          c.cancel(), ee.delete(c);
        }).catch(() => ee.delete(c));
      }
      l ? i.style.setProperty("transition", l, d) : i.style.removeProperty("transition");
    }
  };
}
function Gt(n, e = window) {
  const t = (n.getAnimations?.({ subtree: !0 }) || []).filter((l) => l.playState === "running");
  t.forEach((l) => l.pause());
  const a = (e.ScrollTrigger?.getAll() || []).filter((l) => l.enabled !== !1 && l.trigger && n.contains(l.trigger)), i = new Set(e.gsap?.getTweensOf([n, ...n.querySelectorAll("*")]) || []);
  a.forEach((l) => {
    l.animation && i.add(l.animation);
    const d = l.getTween?.();
    d && i.add(d);
  });
  const o = [...i].filter((l) => !l.paused());
  a.forEach((l) => l.disable(!1, !1)), o.forEach((l) => l.pause());
  const s = e.lenis, r = s && !s.isStopped;
  return r && s.stop(), () => {
    if (!n.isConnected) return;
    const l = e.ScrollTrigger?.getAll() || [];
    a.forEach((d) => {
      l.includes(d) && d.enable(!1, !1);
    }), o.forEach((d) => d.resume()), t.forEach((d) => {
      d.playState === "paused" && d.play();
    }), r && s.start();
  };
}
function Pt({ doc: n = document, win: e = window } = {}) {
  let t, a, i, o, s, r = [], l = 0, d = [], c = () => {
  };
  const g = () => e.matchMedia("(prefers-reduced-motion: reduce)").matches, b = (w) => w.preventDefault();
  function m() {
    l++, r.forEach((w) => w.cancel()), r = [], t?.remove(), t = null, a = null, c(), c = () => {
    }, s?.(), s = null, d.forEach(({ element: w, style: S }) => {
      S === null ? w.removeAttribute("style") : w.setAttribute("style", S);
    }), d = [], i && (o === null ? i.removeAttribute("style") : i.setAttribute("style", o), i = null), e.removeEventListener("wheel", b, !0), e.removeEventListener("touchmove", b, !0), n.documentElement.removeAttribute("data-env-transition-active");
  }
  function h() {
    m();
    const w = n.querySelector("#env-sd-page");
    if (!w || g()) return;
    const S = e.performance.now();
    s = Gt(w, e);
    const u = w.cloneNode(!0), p = [w, ...w.querySelectorAll("*")], I = [u, ...u.querySelectorAll("*")], v = [], f = [], L = p.map((E) => E.getBoundingClientRect()), N = L[0].width > 0, k = (E) => E.width > 0 && E.height > 0 && E.bottom > -e.innerHeight * 0.25 && E.top < e.innerHeight * 1.35 && E.right > -e.innerWidth * 0.1 && E.left < e.innerWidth * 1.1, C = ".main-row, .project-work, .project-row, .project-item.work.left, .project-item.work.right", R = /* @__PURE__ */ new Set([w]);
    p.forEach((E, _) => {
      if (!N || k(L[_]) || E.matches(C) || E.parentElement === w || E.parentElement?.matches("main.main-wrapper"))
        for (let x = E; x && w.contains(x); x = x.parentElement) R.add(x);
    }), I.forEach((E, _) => {
      const x = e.getComputedStyle(p[_]);
      if (R.has(p[_])) {
        const M = [];
        for (let Y = 0; Y < x.length; Y++) {
          const P = x[Y];
          M.push(`${P}:${x.getPropertyValue(P)}`);
        }
        E.style.cssText = M.join(";");
      }
      x.position === "sticky" && ((!N || k(L[_])) && v.push({ element: E, rect: L[_] }), E.style.position = "relative", E.style.inset = "auto"), p[_].matches(".main-row, .project-work, .project-row") && (!N || k(L[_])) && f.push({ element: E, rect: L[_] }), E.style.setProperty("animation", "none", "important"), E.style.setProperty("transition", "none", "important"), E.classList.remove("w-slider", "w-slide", "w-slider-mask", "w-slider-nav", "w-slider-dot"), E.classList.remove("footer"), p[_].matches(".project-row, .project-work, .project-item.work.left, .project-item.work.right") && E.removeAttribute("class"), E.classList.remove("step-single-item", "bg-services-wrapper"), p[_].closest('[data-services="reveal"]') && E.removeAttribute("class");
    });
    const A = p.map((E, _) => ({ element: E, copy: I[_] })).filter(({ element: E }) => E.parentElement === w || E.parentElement?.matches("main.main-wrapper")).filter(({ element: E }) => !E.matches("main.main-wrapper")).map(({ element: E, copy: _ }) => ({ copy: _, rect: L[p.indexOf(E)] }));
    u.querySelectorAll("script").forEach((E) => E.remove()), [u, ...u.querySelectorAll("*")].forEach((E) => {
      E.removeAttribute("id"), E.removeAttribute("data-services"), E.removeAttribute("data-reveal-text");
      for (const _ of [...E.attributes]) (_.name.startsWith("data-env-") || _.name.startsWith("data-w-id")) && E.removeAttribute(_.name);
    });
    const V = w.querySelectorAll("canvas");
    u.querySelectorAll("canvas").forEach((E, _) => {
      const x = V[_];
      E.width = x.width, E.height = x.height;
      try {
        E.getContext("2d")?.drawImage(x, 0, 0);
      } catch {
      }
    });
    const U = new Map(p.filter((E) => E.tagName === "VIDEO").map((E) => [E, L[p.indexOf(E)]])), j = w.querySelectorAll("video");
    u.querySelectorAll("video").forEach((E, _) => {
      const x = j[_], M = n.createElement("canvas");
      M.style.cssText = E.style.cssText, M.className = E.className;
      const Y = e.getComputedStyle(x);
      for (const P of ["position", "top", "left", "right", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "objectFit", "objectPosition", "transform", "zIndex", "marginTop", "marginRight", "marginBottom", "marginLeft", "display", "boxSizing", "borderRadius"]) M.style[P] = Y[P];
      if (N && !k(U.get(x))) {
        const P = n.createElement("div");
        P.style.cssText = M.style.cssText, E.replaceWith(P);
        return;
      }
      M.width = x.videoWidth || 320, M.height = x.videoHeight || 180;
      try {
        if (x.readyState < 2) throw Error("Video frame unavailable");
        M.getContext("2d").drawImage(x, 0, 0, M.width, M.height), E.replaceWith(M);
      } catch {
        const z = x.poster || x.closest(".w-background-video")?.getAttribute("data-poster-url");
        if (z) {
          const F = n.createElement("img");
          F.src = z, F.style.cssText = M.style.cssText, F.className = E.className, E.replaceWith(F);
        } else E.remove();
      }
    }), u.style.cssText = `position:absolute;left:0;top:${-e.scrollY}px;width:100%;margin:0;background:#fff;pointer-events:none;z-index:0;`, t = n.createElement("div"), t.dataset.envTransitionSnapshot = "", t.dataset.envIgnore = "", t.setAttribute("aria-hidden", "true"), t.inert = !0, t.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:8;background:#fff;transform-origin:50% 50%;", a = n.createElement("div"), a.dataset.envTransitionShade = "", a.style.cssText = "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:1;", t.append(u, a);
    const D = [], G = n.querySelector(".navbar-logo-center.is-env-menu-open .menu-modal");
    if (G && e.matchMedia("(max-width: 991px)").matches) {
      const E = G.cloneNode(!0), _ = [G, ...G.querySelectorAll("*")], x = [E, ...E.querySelectorAll("*")];
      _.forEach((z, F) => {
        const W = e.getComputedStyle(z), H = x[F];
        (z.scrollTop || z.scrollLeft) && D.push({ source: z, target: H });
        for (let Q = 0; Q < W.length; Q++) {
          const Ge = W.item(Q);
          H.style.setProperty(Ge, W.getPropertyValue(Ge), "important");
        }
        H.removeAttribute("id"), H.removeAttribute("class");
        for (const Q of [...H.attributes]) Q.name.startsWith("data-w-id") && H.removeAttribute(Q.name);
        for (const Q of [...H.attributes]) Q.name.startsWith("data-env-") && H.removeAttribute(Q.name);
        H.style.setProperty("animation", "none", "important"), H.style.setProperty("transition", "none", "important");
      });
      const M = G.getBoundingClientRect();
      for (const [z, F] of Object.entries({ position: "absolute", top: `${M.top}px`, left: `${M.left}px`, right: "auto", bottom: "auto", width: `${M.width}px`, height: `${M.height}px`, margin: "0", transform: "none", zIndex: "0", pointerEvents: "none" }))
        E.style.setProperty(z.replace(/[A-Z]/g, (W) => `-${W.toLowerCase()}`), F, "important");
      E.querySelectorAll("script").forEach((z) => z.remove()), E.dataset.envTransitionMenu = "", E.inert = !0, E.setAttribute("aria-hidden", "true"), t.insertBefore(E, a);
      const Y = G.style.getPropertyValue("visibility"), P = G.style.getPropertyPriority("visibility");
      G.style.setProperty("visibility", "hidden", "important"), c = () => {
        Y ? G.style.setProperty("visibility", Y, P) : G.style.removeProperty("visibility");
      };
    }
    n.body.append(t), D.forEach(({ source: E, target: _ }) => {
      _.scrollTop = E.scrollTop, _.scrollLeft = E.scrollLeft;
    }), A.map(({ copy: E, rect: _ }) => {
      const x = E.getBoundingClientRect();
      return { element: E, x: _.left - x.left, y: _.top - x.top };
    }).forEach(({ element: E, x: _, y: x }) => {
      if (Math.abs(_) < 0.1 && Math.abs(x) < 0.1) return;
      const M = E.style.transform;
      E.style.transform = `translate(${_}px,${x}px) ${M === "none" ? "" : M}`;
    }), f.forEach(({ element: E, rect: _ }) => {
      const x = E.getBoundingClientRect(), M = _.left - x.left, Y = _.top - x.top;
      if (Math.abs(M) < 0.1 && Math.abs(Y) < 0.1) return;
      const P = E.style.transform;
      E.style.transform = `translate(${M}px,${Y}px) ${P === "none" ? "" : P}`;
    }), v.forEach(({ element: E, rect: _ }) => {
      const x = E.getBoundingClientRect(), M = _.left - x.left, Y = _.top - x.top;
      if (Math.abs(M) < 0.1 && Math.abs(Y) < 0.1) return;
      const P = E.style.transform;
      E.style.transform = `translate(${M}px,${Y}px) ${P === "none" ? "" : P}`;
    }), t.dataset.envCaptureMs = String(Math.round(e.performance.now() - S)), n.documentElement.setAttribute("data-env-transition-active", ""), e.addEventListener("wheel", b, { capture: !0, passive: !1 }), e.addEventListener("touchmove", b, { capture: !0, passive: !1 });
  }
  function y() {
    if (!t || g() || r.length) return;
    const w = { duration: 1200, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" };
    r = [
      a.animate([{ opacity: 0 }, { opacity: 0.08 }], w)
    ];
  }
  function T(w) {
    !t || g() || i === w || (i = w, o = w.getAttribute("style"), d = [...w.querySelectorAll(".section.hero-about")].filter((S) => e.getComputedStyle(S).position === "fixed").map((S) => ({ element: S, style: S.getAttribute("style"), rect: S.getBoundingClientRect() })), Object.assign(w.style, { display: "flow-root", position: "relative", zIndex: "9", clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)", backgroundColor: "#fff", willChange: "clip-path" }), d.forEach(({ element: S, rect: u }) => {
      Object.assign(S.style, { position: "absolute", top: "0px", left: "0px", right: "auto", bottom: "auto", margin: "0px", width: `${u.width}px`, height: `${u.height}px` });
      const p = S.getBoundingClientRect();
      S.style.left = `${u.left - p.left}px`, S.style.top = `${u.top - p.top}px`;
    }));
  }
  async function O(w) {
    if (!t || g()) {
      m();
      return;
    }
    i || T(w);
    const S = l, u = -w.getBoundingClientRect().top, p = e.innerHeight, I = `polygon(0 ${u + p}px,100% ${u + p}px,100% 100%,0 100%)`, v = `polygon(0 ${u}px,100% ${u}px,100% 100%,0 100%)`, f = { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" }, L = r.length ? Number(e.getComputedStyle(a).opacity) : 0;
    r.forEach((k) => k.cancel()), r = [
      t.animate([{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-12vh) scale(1.04)" }], f),
      w.animate([{ clipPath: I }, { clipPath: v }], f),
      a.animate([{ opacity: L }, { opacity: 0.35 }], f)
    ];
    const N = n.timeline?.currentTime;
    N != null && r.forEach((k) => {
      k.startTime = N;
    }), await Promise.all(r.map((k) => k.finished.catch(() => {
    }))), S === l && m();
  }
  return { capture: h, depart: y, prepare: T, reveal: O, cleanup: m };
}
const he = /* @__PURE__ */ new WeakMap();
function Te(n, e, t, a) {
  if (!n && !he.has(e))
    return !1;
  const i = he.get(e) ?? /* @__PURE__ */ new WeakMap();
  he.set(e, i);
  const o = i.get(t) ?? /* @__PURE__ */ new Set();
  i.set(t, o);
  const s = o.has(a);
  return n ? o.add(a) : o.delete(a), s && n;
}
function Bt(n, e) {
  let t = n.target;
  if (t instanceof Text && (t = t.parentElement), t instanceof Element && n.currentTarget instanceof Node) {
    const a = t.closest(e);
    if (a && n.currentTarget.contains(a))
      return a;
  }
}
function at(n, e, t, a = {}) {
  if (Array.isArray(e)) {
    for (const h of e)
      at(n, h, t, a);
    return;
  }
  const i = e, { signal: o, base: s = document } = a;
  if (o?.aborted)
    return;
  const { once: r, ...l } = a, d = s instanceof Document ? s.documentElement : s, c = !!(typeof a == "object" ? a.capture : a), g = (h) => {
    const y = Bt(h, String(n));
    if (y) {
      const T = Object.assign(h, { delegateTarget: y });
      t.call(d, T), r && (d.removeEventListener(i, g, l), Te(!1, d, t, b));
    }
  }, b = JSON.stringify({ selector: n, type: i, capture: c });
  Te(!0, d, t, b) || d.addEventListener(i, g, l), o?.addEventListener("abort", () => {
    Te(!1, d, t, b);
  });
}
function B() {
  return B = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, B.apply(null, arguments);
}
const it = (n, e) => String(n).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || e || "", K = ({ hash: n } = {}) => window.location.pathname + window.location.search + (n ? window.location.hash : ""), jt = (n, e = {}) => {
  const t = B({ url: n = n || K({ hash: !0 }), random: Math.random(), source: "swup" }, e);
  window.history.pushState(t, "", n);
}, ne = (n = null, e = {}) => {
  n = n || K({ hash: !0 });
  const t = B({}, window.history.state || {}, { url: n, random: Math.random(), source: "swup" }, e);
  window.history.replaceState(t, "", n);
}, Yt = (n, e, t, a) => {
  const i = new AbortController();
  return a = B({}, a, { signal: i.signal }), at(n, e, t, a), { destroy: () => i.abort() };
};
let X = class ue extends URL {
  constructor(e, t = document.baseURI) {
    super(e.toString(), t), Object.setPrototypeOf(this, ue.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(e) {
    const t = e.getAttribute("href") || e.getAttribute("xlink:href") || "";
    return new ue(t);
  }
  static fromUrl(e) {
    return new ue(e);
  }
};
class le extends Error {
  constructor(e, t) {
    super(e), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = t.url, this.status = t.status, this.aborted = t.aborted || !1, this.timedOut = t.timedOut || !1;
  }
}
async function zt(n, e = {}) {
  var t;
  n = X.fromUrl(n).url;
  const { visit: a = this.visit } = e, i = B({}, this.options.requestHeaders, e.headers), o = (t = e.timeout) != null ? t : this.options.timeout, s = new AbortController(), { signal: r } = s;
  e = B({}, e, { headers: i, signal: r });
  let l, d = !1, c = null;
  o && o > 0 && (c = setTimeout(() => {
    d = !0, s.abort("timeout");
  }, o));
  try {
    l = await this.hooks.call("fetch:request", a, { url: n, options: e }, (T, { url: O, options: w }) => fetch(O, w)), c && clearTimeout(c);
  } catch (T) {
    throw d ? (this.hooks.call("fetch:timeout", a, { url: n }), new le(`Request timed out: ${n}`, { url: n, timedOut: d })) : T?.name === "AbortError" || r.aborted ? new le(`Request aborted: ${n}`, { url: n, aborted: !0 }) : T;
  }
  const { status: g, url: b } = l, m = await l.text();
  if (g === 500) throw this.hooks.call("fetch:error", a, { status: g, response: l, url: b }), new le(`Server error: ${b}`, { status: g, url: b });
  if (!m) throw new le(`Empty response: ${b}`, { status: g, url: b });
  const { url: h } = X.fromUrl(b), y = { url: h, html: m };
  return !a.cache.write || e.method && e.method !== "GET" || n !== h || this.cache.set(y.url, y), y;
}
class Dt {
  constructor(e) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = e;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const e = /* @__PURE__ */ new Map();
    return this.pages.forEach((t, a) => {
      e.set(a, B({}, t));
    }), e;
  }
  has(e) {
    return this.pages.has(this.resolve(e));
  }
  get(e) {
    const t = this.pages.get(this.resolve(e));
    return t && B({}, t);
  }
  set(e, t) {
    t = B({}, t, { url: e = this.resolve(e) }), this.pages.set(e, t), this.swup.hooks.callSync("cache:set", void 0, { page: t });
  }
  update(e, t) {
    e = this.resolve(e);
    const a = B({}, this.get(e), t, { url: e });
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
    const { url: t } = X.fromUrl(e);
    return this.swup.resolveUrl(t);
  }
}
const Oe = (n, e = document) => e.querySelector(n), Ce = (n, e = document) => Array.from(e.querySelectorAll(n)), ot = () => new Promise((n) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n();
    });
  });
});
function st(n) {
  return !!n && (typeof n == "object" || typeof n == "function") && typeof n.then == "function";
}
function Ft(n, e = []) {
  return new Promise((t, a) => {
    const i = n(...e);
    st(i) ? i.then(t, a) : t(i);
  });
}
function De(n, e) {
  const t = n?.closest(`[${e}]`);
  return t != null && t.hasAttribute(e) ? t?.getAttribute(e) || !0 : void 0;
}
class Ht {
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
    return this.selector.trim() ? Ce(this.selector) : [];
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
class rt {
  constructor(e, t) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: a, from: i, hash: o, el: s, event: r } = t;
    this.id = Math.random(), this.state = 1, this.from = { url: i ?? e.location.url, hash: e.location.hash }, this.to = { url: a, hash: o }, this.containers = e.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: e.options.native, scope: e.options.animationScope, selector: e.options.animationSelector }, this.trigger = { el: s, event: r }, this.cache = { read: e.options.cache, write: e.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
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
function qt(n) {
  return new rt(this, n);
}
class Xt {
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
    const o = B({}, a, { id: ++this.nextHookId, hook: e, handler: t });
    return i.set(t, o), () => this.off(e, t);
  }
  before(e, t, a = {}) {
    return this.on(e, t, B({}, a, { before: !0 }));
  }
  replace(e, t, a = {}) {
    return this.on(e, t, B({}, a, { replace: !0 }));
  }
  once(e, t, a = {}) {
    return this.on(e, t, B({}, a, { once: !0 }));
  }
  off(e, t) {
    const a = this.get(e);
    a && t ? a.delete(t) || console.warn(`Handler for hook '${e}' not found.`) : a && a.clear();
  }
  async call(e, t, a, i) {
    const [o, s, r] = this.parseCallArgs(e, t, a, i), { before: l, handler: d, after: c } = this.getHandlers(e, r);
    await this.run(l, o, s);
    const [g] = await this.run(d, o, s, !0);
    return await this.run(c, o, s), this.dispatchDomEvent(e, o, s), g;
  }
  callSync(e, t, a, i) {
    const [o, s, r] = this.parseCallArgs(e, t, a, i), { before: l, handler: d, after: c } = this.getHandlers(e, r);
    this.runSync(l, o, s);
    const [g] = this.runSync(d, o, s, !0);
    return this.runSync(c, o, s), this.dispatchDomEvent(e, o, s), g;
  }
  parseCallArgs(e, t, a, i) {
    return t instanceof rt || typeof t != "object" && typeof a != "function" ? [t, a, i] : [void 0, t, a];
  }
  async run(e, t = this.swup.visit, a, i = !1) {
    const o = [];
    for (const { hook: s, handler: r, defaultHandler: l, once: d } of e) if (t == null || !t.done) {
      d && this.off(s, r);
      try {
        const c = await Ft(r, [t, a, l]);
        o.push(c);
      } catch (c) {
        if (i) throw c;
        console.error(`Error in hook '${s}':`, c);
      }
    }
    return o;
  }
  runSync(e, t = this.swup.visit, a, i = !1) {
    const o = [];
    for (const { hook: s, handler: r, defaultHandler: l, once: d } of e) if (t == null || !t.done) {
      d && this.off(s, r);
      try {
        const c = r(t, a, l);
        o.push(c), st(c) && console.warn(`Swup will not await Promises in handler for synchronous hook '${s}'.`);
      } catch (c) {
        if (i) throw c;
        console.error(`Error in hook '${s}':`, c);
      }
    }
    return o;
  }
  getHandlers(e, t) {
    const a = this.get(e);
    if (!a) return { found: !1, before: [], handler: [], after: [], replaced: !1 };
    const i = Array.from(a.values()), o = this.sortRegistrations, s = i.filter(({ before: g, replace: b }) => g && !b).sort(o), r = i.filter(({ replace: g }) => g).filter((g) => !0).sort(o), l = i.filter(({ before: g, replace: b }) => !g && !b).sort(o), d = r.length > 0;
    let c = [];
    if (t && (c = [{ id: 0, hook: e, handler: t }], d)) {
      const g = r.length - 1, { handler: b, once: m } = r[g], h = (y) => {
        const T = r[y - 1];
        return T ? (O, w) => T.handler(O, w, h(y - 1)) : t;
      };
      c = [{ id: 0, hook: e, once: m, handler: b, defaultHandler: h(g) }];
    }
    return { found: !0, before: s, handler: c, after: l, replaced: d };
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
    return [t, a.reduce((i, o) => B({}, i, { [o]: !0 }), {})];
  }
}
const Qt = (n) => {
  if (n && n.charAt(0) === "#" && (n = n.substring(1)), !n) return null;
  const e = decodeURIComponent(n);
  let t = document.getElementById(n) || document.getElementById(e) || Oe(`a[name='${CSS.escape(n)}']`) || Oe(`a[name='${CSS.escape(e)}']`);
  return t || n !== "top" || (t = document.body), t;
}, de = "transition", ve = "animation";
async function Wt({ selector: n, elements: e }) {
  if (n === !1 && !e) return;
  let t = [];
  if (e) t = Array.from(e);
  else if (n && (t = Ce(n, document.body), !t.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${n}\``);
  const a = t.map((i) => (function(o) {
    const { type: s, timeout: r, propCount: l } = (function(d) {
      const c = window.getComputedStyle(d), g = ce(c, `${de}Delay`), b = ce(c, `${de}Duration`), m = Fe(g, b), h = ce(c, `${ve}Delay`), y = ce(c, `${ve}Duration`), T = Fe(h, y), O = Math.max(m, T), w = O > 0 ? m > T ? de : ve : null;
      return { type: w, timeout: O, propCount: w ? w === de ? b.length : y.length : 0 };
    })(o);
    return !(!s || !r) && new Promise((d) => {
      const c = `${s}end`, g = performance.now();
      let b = 0;
      const m = () => {
        o.removeEventListener(c, h), d();
      }, h = (y) => {
        y.target === o && ((performance.now() - g) / 1e3 < y.elapsedTime || ++b >= l && m());
      };
      setTimeout(() => {
        b < l && m();
      }, r + 1), o.addEventListener(c, h);
    });
  })(i)).filter((i) => i !== !1);
  a.length ? await Promise.all(a) : n && console.warn(`[swup] No CSS animation duration defined on elements matching \`${n}\``);
}
function ce(n, e) {
  return (n[e] || "").split(", ");
}
function Fe(n, e) {
  for (; n.length < e.length; ) n = n.concat(n);
  return Math.max(...e.map((t, a) => He(t) + He(n[a])));
}
function He(n) {
  return 1e3 * parseFloat(n);
}
function $t(n, e = {}, t = {}) {
  if (typeof n != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(n, { el: t.el, event: t.event })) return void window.location.assign(n);
  const { url: a, hash: i } = X.fromUrl(n), o = this.createVisit(B({}, t, { to: a, hash: i }));
  this.performNavigation(o, e);
}
async function Kt(n, e = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return n.state = 2, void (this.onVisitEnd = () => this.performNavigation(n, e));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = n;
  const { el: t } = n.trigger;
  e.referrer = e.referrer || this.location.url, e.animate === !1 && (n.animation.animate = !1), n.animation.animate || this.classes.clear();
  const a = e.history || De(t, "data-swup-history");
  typeof a == "string" && ["push", "replace"].includes(a) && (n.history.action = a);
  const i = e.animation || De(t, "data-swup-animation");
  var o, s;
  typeof i == "string" && (n.animation.name = i), n.meta = e.meta || {}, typeof e.cache == "object" ? (n.cache.read = (o = e.cache.read) != null ? o : n.cache.read, n.cache.write = (s = e.cache.write) != null ? s : n.cache.write) : e.cache !== void 0 && (n.cache = { read: !!e.cache, write: !!e.cache }), delete e.cache;
  try {
    await this.hooks.call("visit:start", n, void 0), n.state = 3;
    const r = this.hooks.call("page:load", n, { options: e }, async (d, c) => {
      let g;
      return d.cache.read && (g = this.cache.get(d.to.url)), c.page = g || await this.fetchPage(d.to.url, c.options), c.cache = !!g, c.page;
    });
    r.then(({ html: d }) => {
      n.advance(5), n.to.html = d, n.to.document = new DOMParser().parseFromString(d, "text/html");
    });
    const l = n.to.url + n.to.hash;
    if (n.history.popstate || (n.history.action === "replace" || n.to.url === this.location.url ? ne(l) : (this.currentHistoryIndex++, jt(l, { index: this.currentHistoryIndex }))), this.location = X.fromUrl(l), n.history.popstate && this.classes.add("is-popstate"), n.animation.name && this.classes.add(`to-${it(n.animation.name)}`), n.animation.wait && await r, n.ignored) throw new Error(`Visit to ${n.to.url} manually ignored`);
    if (n.done || (await this.hooks.call("visit:transition", n, void 0, async () => {
      if (!n.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(n, await r);
      n.advance(4), await this.animatePageOut(n), n.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(n, await r)).finished : await this.renderPage(n, await r), await this.animatePageIn(n);
    }), n.done)) return;
    await this.hooks.call("visit:end", n, void 0, () => this.classes.clear()), n.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (r) {
    if (!r || r != null && r.aborted) return void n.advance(8);
    if (n.ignored) return void qe.call(this, n);
    await this.hooks.call("visit:fail", n, { error: r }, (l, { error: d }) => {
      console.error(d), qe.call(this, l);
    }), n.advance(9);
  } finally {
    delete n.to.document, this.visit === n && (this.navigating = !1);
  }
}
function qe(n) {
  const e = n.to.url + n.to.hash;
  K() === n.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(e), { once: !0 }), window.history.back()) : window.location.assign(e);
}
const Zt = async function(n) {
  await this.hooks.call("animation:out:start", n, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", n, { skip: !1 }, (e, { skip: t }) => {
    if (!t) return this.awaitAnimations({ selector: e.animation.selector });
  }), await this.hooks.call("animation:out:end", n, void 0);
}, Jt = function(n) {
  var e;
  const t = n.to.document;
  if (!t) return !1;
  const a = ((e = t.querySelector("title")) == null ? void 0 : e.innerText) || "";
  document.title = a;
  const i = Ce('[data-swup-persist]:not([data-swup-persist=""])'), o = n.containers.map((s) => {
    const r = document.querySelector(s), l = t.querySelector(s);
    return r && l ? (r.replaceWith(l.cloneNode(!0)), !0) : (r || console.warn(`[swup] Container missing in current document: ${s}`), l || console.warn(`[swup] Container missing in incoming document: ${s}`), !1);
  }).filter(Boolean);
  return i.forEach((s) => {
    const r = s.getAttribute("data-swup-persist"), l = Oe(`[data-swup-persist="${r}"]`);
    l && l !== s && l.replaceWith(s);
  }), o.length === n.containers.length;
}, en = function(n) {
  const e = { behavior: "auto" }, { target: t, reset: a } = n.scroll, i = t ?? n.to.hash;
  let o = !1;
  return i && (o = this.hooks.callSync("scroll:anchor", n, { hash: i, options: e }, (s, { hash: r, options: l }) => {
    const d = this.getAnchorElement(r);
    return d && d.scrollIntoView(l), !!d;
  })), a && !o && (o = this.hooks.callSync("scroll:top", n, { options: e }, (s, { options: r }) => (window.scrollTo(B({ top: 0, left: 0 }, r)), !0))), o;
}, tn = async function(n) {
  if (n.done) return;
  const e = this.hooks.call("animation:in:await", n, { skip: !1 }, (t, { skip: a }) => {
    if (!a) return this.awaitAnimations({ selector: t.animation.selector });
  });
  await ot(), await this.hooks.call("animation:in:start", n, void 0, () => {
    this.classes.remove("is-animating");
  }), await e, await this.hooks.call("animation:in:end", n, void 0);
}, nn = async function(n, e) {
  if (n.done) return;
  n.advance(6);
  const { url: t } = e;
  this.isSameResolvedUrl(K(), t) || (ne(t), this.location = X.fromUrl(t), n.to.url = this.location.url, n.to.hash = this.location.hash), await this.hooks.call("content:replace", n, { page: e }, (a, {}) => {
    if (this.classes.remove("is-leaving"), a.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(a)) throw new Error("[swup] Container mismatch, aborting");
    a.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), a.animation.name && this.classes.add(`to-${it(a.animation.name)}`));
  }), await this.hooks.call("content:scroll", n, void 0, () => this.scrollToContent(n)), await this.hooks.call("page:view", n, { url: this.location.url, title: document.title });
}, an = function(n) {
  var e;
  if (e = n, !!e?.isSwupPlugin) {
    if (n.swup = this, !n._checkRequirements || n._checkRequirements()) return n._beforeMount && n._beforeMount(), n.mount(), this.plugins.push(n), this.plugins;
  } else console.error("Not a swup plugin instance", n);
};
function on(n) {
  const e = this.findPlugin(n);
  if (e) return e.unmount(), e._afterUnmount && e._afterUnmount(), this.plugins = this.plugins.filter((t) => t !== e), this.plugins;
  console.error("No such plugin", e);
}
function sn(n) {
  return this.plugins.find((e) => typeof n == "string" ? [`Swup${n}`, n].includes(e.name) : e === n);
}
function rn(n) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), n;
  const e = this.options.resolveUrl(n);
  return e && typeof e == "string" ? e.startsWith("//") || e.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), n) : e : (console.warn("[swup] options.resolveUrl needs to return a url"), n);
}
function ln(n, e) {
  return this.resolveUrl(n) === this.resolveUrl(e);
}
const dn = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (n, { el: e } = {}) => !(e == null || !e.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (n) => n, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (n) => {
  var e;
  return ((e = n.state) == null ? void 0 : e.source) !== "swup";
}, timeout: 0 };
class cn {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(e = {}) {
    var t, a;
    this.version = "4.10.0", this.options = void 0, this.defaults = dn, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = X.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = an, this.unuse = on, this.findPlugin = sn, this.log = () => {
    }, this.navigate = $t, this.performNavigation = Kt, this.createVisit = qt, this.delegateEvent = Yt, this.fetchPage = zt, this.awaitAnimations = Wt, this.renderPage = nn, this.replaceContent = Jt, this.animatePageIn = tn, this.animatePageOut = Zt, this.scrollToContent = en, this.getAnchorElement = Qt, this.getCurrentUrl = K, this.resolveUrl = rn, this.isSameResolvedUrl = ln, this.options = B({}, this.defaults, e), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new Dt(this), this.classes = new Ht(this), this.hooks = new Xt(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (t = (a = window.history.state) == null ? void 0 : a.index) != null ? t : 1, this.enable();
  }
  async enable() {
    var e;
    const { linkSelector: t } = this.options;
    this.clickDelegate = this.delegateEvent(t, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((a) => this.use(a));
    for (const [a, i] of Object.entries(this.options.hooks)) {
      const [o, s] = this.hooks.parseName(a);
      this.hooks.on(o, i, s);
    }
    ((e = window.history.state) == null ? void 0 : e.source) !== "swup" && ne(null, { index: this.currentHistoryIndex }), await ot(), await this.hooks.call("enable", void 0, void 0, () => {
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
    const { origin: i, url: o, hash: s } = X.fromUrl(e);
    return i !== window.location.origin || !(!t || !this.triggerWillOpenNewWindow(t)) || !!this.options.ignoreVisit(o + s, { el: t, event: a });
  }
  handleLinkClick(e) {
    const t = e.delegateTarget, { href: a, url: i, hash: o } = X.fromElement(t);
    if (this.shouldIgnoreVisit(a, { el: t, event: e })) return;
    if (this.navigating && i === this.visit.to.url) return void e.preventDefault();
    const s = this.createVisit({ to: i, hash: o, el: t, event: e });
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? this.hooks.callSync("link:newtab", s, { href: a }) : e.button === 0 && this.hooks.callSync("link:click", s, { el: t, event: e }, () => {
      var r;
      const l = (r = s.from.url) != null ? r : "";
      e.preventDefault(), i && i !== l ? this.isSameResolvedUrl(i, l) || this.performNavigation(s) : o ? this.hooks.callSync("link:anchor", s, { hash: o }, () => {
        ne(i + o), this.scrollToContent(s);
      }) : this.hooks.callSync("link:self", s, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(s) : (ne(i), this.scrollToContent(s));
      });
    });
  }
  handlePopState(e) {
    var t, a, i, o;
    const s = (t = (a = e.state) == null ? void 0 : a.url) != null ? t : window.location.href;
    if (this.options.skipPopStateHandling(e) || this.isSameResolvedUrl(K(), this.location.url)) return;
    const { url: r, hash: l } = X.fromUrl(s), d = this.createVisit({ to: r, hash: l, event: e });
    d.history.popstate = !0;
    const c = (i = (o = e.state) == null ? void 0 : o.index) != null ? i : 0;
    c && c !== this.currentHistoryIndex && (d.history.direction = c - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = c), d.animation.animate = !1, d.scroll.reset = !1, d.scroll.target = !1, this.options.animateHistoryBrowsing && !e.hasUAVisualTransition && (d.animation.animate = !0, d.scroll.reset = !0), this.hooks.callSync("history:popstate", d, { event: e }, () => {
      this.performNavigation(d);
    });
  }
  triggerWillOpenNewWindow(e) {
    return !!e.matches('[download], [target="_blank"]');
  }
}
function fn(n, { doc: e = document, win: t = window, fetchHTML: a = fetch, now: i = Date.now, ttl: o = 3e5, limit: s = 8, delay: r = 1200, concurrency: l = 1, pendingWait: d = 180, warmPage: c } = {}) {
  const g = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), h = new AbortController();
  let y, T = !1, O = !1;
  const w = t.navigator.connection, S = () => w?.saveData || /(^|-)2g$/.test(w?.effectiveType || "");
  function u() {
    for (const [R, A] of g) i() - A >= o && (n.cache.delete(R), g.delete(R));
    for (; g.size > s; ) {
      const R = g.keys().next().value;
      n.cache.delete(R), g.delete(R);
    }
  }
  const p = (R, { page: A }) => {
    g.delete(A.url), g.set(A.url, i()), u();
  };
  n.hooks.on("cache:set", p);
  for (const [R] of n.cache.all || []) g.set(R, i());
  u();
  function I(R) {
    if (!R || R.closest("[data-no-swup]") || R.matches('[aria-current="page"],.w--current') || R.hasAttribute("download") || R.hasAttribute("target")) return;
    const A = new URL(R.getAttribute("href"), t.location.href);
    if (!(A.origin !== t.location.origin || A.search || A.hash || A.pathname === t.location.pathname || /\.[a-z0-9]+$/i.test(A.pathname)))
      return A.pathname;
  }
  async function v(R) {
    if (u(), O || S() || n.cache.has(R)) return;
    if (b.has(R)) return b.get(R);
    const A = new AbortController();
    m.set(R, A);
    const V = t.setTimeout(() => A.abort(), 4e3), U = (async () => {
      try {
        const j = await a(R, { headers: { "X-Requested-With": "swup", Accept: "text/html" }, credentials: "same-origin", signal: A.signal, priority: "low" });
        if (!j.ok || !j.headers.get("content-type")?.includes("text/html")) return;
        const D = new URL(j.url || R, t.location.href);
        if (D.origin !== t.location.origin || D.pathname !== R || D.search) return;
        const G = await j.text();
        !O && !A.signal.aborted && G && G.length < 1e6 && (n.cache.set(R, { url: R, html: G }), c && Promise.resolve().then(() => c(G)).catch(() => {
        }));
      } catch {
      } finally {
        t.clearTimeout(V), m.get(R) === A && (m.delete(R), b.delete(R));
      }
    })();
    return b.set(R, U), U;
  }
  function f() {
    t.clearTimeout(y), !(O || S()) && (y = t.setTimeout(async () => {
      if (T || e.hidden || O) return;
      const R = [...new Set([...e.querySelectorAll(".navbar-logo-center a[href]")].map(I).filter(Boolean))].slice(0, 3);
      let A = 0;
      const V = async () => {
        for (; !T && !O && !e.hidden && A < R.length; ) await v(R[A++]);
      };
      await Promise.all(Array.from({ length: Math.min(Math.max(1, l), 2, R.length) }, V));
    }, r));
  }
  const L = () => {
    T = !0, t.clearTimeout(y);
  }, N = () => {
    T = !1, f();
  }, k = async (R) => {
    u();
    const A = R.to.url, V = b.get(A);
    if (!R.cache.read || !V) return;
    let U;
    await Promise.race([V, new Promise((j) => {
      U = t.setTimeout(j, d);
    })]), t.clearTimeout(U), !n.cache.has(A) && b.get(A) === V && (m.get(A)?.abort(), m.delete(A), b.delete(A));
  };
  n.hooks.on("visit:start", L), n.hooks.before("page:load", k);
  for (const R of ["page:view", "visit:fail", "visit:abort"]) n.hooks.on(R, N);
  const C = (R) => {
    if (!T && !e.hidden) {
      const A = I(R.target.closest?.(".navbar-logo-center a[href]"));
      A && v(A);
    }
  };
  return e.addEventListener("pointerover", C, { passive: !0, signal: h.signal }), e.addEventListener("pointerdown", C, { passive: !0, signal: h.signal }), e.addEventListener("focusin", C, { signal: h.signal }), e.addEventListener("visibilitychange", () => {
    !e.hidden && !T && f();
  }, { signal: h.signal }), f(), () => {
    O = !0, t.clearTimeout(y), h.abort(), m.forEach((R) => R.abort()), m.clear(), b.clear(), n.hooks.off("cache:set", p), n.hooks.off("visit:start", L), n.hooks.off("page:load", k);
    for (const R of ["page:view", "visit:fail", "visit:abort"]) n.hooks.off(R, N);
  };
}
function un({ doc: n = document, win: e = window } = {}) {
  const t = n.createElement("style");
  t.dataset.envSdGradientStyle = "", t.textContent = "#env-sd-gradient{position:absolute;pointer-events:none;z-index:0;opacity:0;transition:opacity 350ms ease,height 350ms ease}#env-sd-page[data-env-sd-gradient-page]>.main-wrapper{background-color:transparent!important}#env-sd-page [data-env-sd-gradient-source]{background-image:none!important;background-color:transparent!important}@media(prefers-reduced-motion:reduce){#env-sd-gradient{transition:none}}", n.head.append(t);
  const a = n.createElement("div");
  a.id = "env-sd-gradient", a.setAttribute("aria-hidden", "true"), n.querySelector("#env-sd-page").before(a);
  let i, o, s, r, l = !1;
  const d = () => {
    if (!i?.isConnected) return;
    const m = i.getBoundingClientRect();
    a.style.top = `${m.top + e.scrollY}px`, a.style.left = `${m.left + e.scrollX}px`, a.style.width = `${m.width}px`, a.style.height = `${m.height}px`;
  }, c = () => {
    r || (r = e.requestAnimationFrame(() => {
      r = 0, d();
    }));
  };
  function g() {
    if (s?.disconnect(), i?.removeAttribute("data-env-sd-gradient-source"), o?.removeAttribute("data-env-sd-gradient-page"), o = n.querySelector("#env-sd-page"), i = o?.querySelector(".hero-wrapper.gradient-blue"), l = !!i, !i) return;
    i.removeAttribute("data-env-sd-gradient-source");
    const m = e.getComputedStyle(i);
    for (const h of ["backgroundImage", "backgroundColor", "backgroundSize", "backgroundPosition", "backgroundRepeat", "backgroundAttachment", "backgroundBlendMode"]) a.style[h] = m[h];
    o.setAttribute("data-env-sd-gradient-page", ""), i.setAttribute("data-env-sd-gradient-source", ""), d(), e.ResizeObserver && (s = new e.ResizeObserver(c), s.observe(i));
  }
  const b = () => {
    d(), a.style.opacity = l ? "1" : "0";
  };
  return e.addEventListener("resize", c, { passive: !0 }), g(), b(), {
    prepare: g,
    commit: b,
    refresh() {
      g(), b();
    },
    destroy() {
      s?.disconnect(), e.cancelAnimationFrame(r), e.removeEventListener("resize", c), i?.removeAttribute("data-env-sd-gradient-source"), o?.removeAttribute("data-env-sd-gradient-page"), t.remove(), a.remove();
    }
  };
}
function ae() {
  return ae = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, ae.apply(this, arguments);
}
const Xe = (n) => String(n).split(".").map((e) => String(parseInt(e || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");
let pn = class {
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
      if (!(function(a, i, o) {
        const s = (function(r, l) {
          var d;
          if (r === "swup") return (d = l.version) != null ? d : "";
          {
            var c;
            const g = l.findPlugin(r);
            return (c = g?.version) != null ? c : "";
          }
        })(a, o);
        return !!s && ((r, l) => l.every((d) => {
          const [, c, g] = d.match(/^([\D]+)?(.*)$/) || [];
          var b, m;
          return ((h, y) => {
            const T = { "": (O) => O === 0, ">": (O) => O > 0, ">=": (O) => O >= 0, "<": (O) => O < 0, "<=": (O) => O <= 0 };
            return (T[y] || T[""])(h);
          })((m = g, b = Xe(b = r), m = Xe(m), b.localeCompare(m, void 0, { numeric: !0 })), c || ">=");
        }))(s, i);
      })(e, t = Array.isArray(t) ? t : [t], this.swup)) {
        const a = `${e} ${t.join(", ")}`;
        throw new Error(`Plugin version mismatch: ${this.name} requires ${a}`);
      }
    }), !0;
  }
  on(e, t, a = {}) {
    var i;
    t = !(i = t).name.startsWith("bound ") || i.hasOwnProperty("prototype") ? t.bind(this) : t;
    const o = this.swup.hooks.on(e, t, a);
    return this.handlersToUnregister.push(o), o;
  }
  once(e, t, a = {}) {
    return this.on(e, t, ae({}, a, { once: !0 }));
  }
  before(e, t, a = {}) {
    return this.on(e, t, ae({}, a, { before: !0 }));
  }
  replace(e, t, a = {}) {
    return this.on(e, t, ae({}, a, { replace: !0 }));
  }
  off(e, t) {
    return this.swup.hooks.off(e, t);
  }
};
const Qe = (n) => typeof n == "object" && n != null && n.nodeType === 1, We = (n, e) => (!e || n !== "hidden") && n !== "visible" && n !== "clip", Ie = (n, e) => {
  if (n.clientHeight < n.scrollHeight || n.clientWidth < n.scrollWidth) {
    const t = getComputedStyle(n, null);
    return We(t.overflowY, e) || We(t.overflowX, e) || ((a) => {
      const i = ((o) => {
        if (!o.ownerDocument || !o.ownerDocument.defaultView) return null;
        try {
          return o.ownerDocument.defaultView.frameElement;
        } catch {
          return null;
        }
      })(a);
      return !!i && (i.clientHeight < a.scrollHeight || i.clientWidth < a.scrollWidth);
    })(n);
  }
  return !1;
}, bn = (n) => {
  const e = n.parentElement;
  return e ?? (n.getRootNode().host || null);
}, mn = (n, e) => {
  var t, a, i, o;
  if (typeof document > "u") return [];
  const { boundary: s, skipOverflowHiddenElements: r } = e, l = typeof s == "function" ? s : (L) => L !== s;
  if (!Qe(n)) throw new TypeError("Invalid target");
  const d = document.scrollingElement || document.documentElement, c = [];
  let g = n;
  for (; Qe(g) && l(g); ) {
    if (g = bn(g), g === d) {
      c.push(g);
      break;
    }
    g != null && g === document.body && Ie(g) && !Ie(document.documentElement) || g != null && Ie(g, r) && c.push(g);
  }
  (a = (t = window.visualViewport) == null ? void 0 : t.width) != null || innerWidth, (o = (i = window.visualViewport) == null ? void 0 : i.height) != null || innerHeight;
  const { scrollX: b, scrollY: m } = window, { height: h, width: y, top: T, right: O, bottom: w, left: S } = n.getBoundingClientRect(), { top: u, left: p } = ((L) => {
    const N = window.getComputedStyle(L);
    return { top: parseFloat(N.scrollMarginTop) || 0, right: parseFloat(N.scrollMarginRight) || 0, bottom: parseFloat(N.scrollMarginBottom) || 0, left: parseFloat(N.scrollMarginLeft) || 0 };
  })(n);
  let I = T - u, v = S - p;
  const f = [];
  for (let L = 0; L < c.length; L++) {
    const N = c[L], { height: k, width: C, top: R, right: A, bottom: V, left: U } = N.getBoundingClientRect(), j = getComputedStyle(N), D = parseInt(j.borderLeftWidth, 10), G = parseInt(j.borderTopWidth, 10), Z = parseInt(j.borderRightWidth, 10), E = parseInt(j.borderBottomWidth, 10);
    let _ = 0, x = 0;
    const M = "offsetWidth" in N ? N.offsetWidth - N.clientWidth - D - Z : 0, Y = "offsetHeight" in N ? N.offsetHeight - N.clientHeight - G - E : 0, P = "offsetWidth" in N ? N.offsetWidth === 0 ? 0 : C / N.offsetWidth : 0, z = "offsetHeight" in N ? N.offsetHeight === 0 ? 0 : k / N.offsetHeight : 0;
    if (d === N) _ = I, x = v, _ = Math.max(0, _ + m), x = Math.max(0, x + b);
    else {
      _ = I - R - G, x = v - U - D;
      const { scrollLeft: F, scrollTop: W } = N;
      _ = z === 0 ? 0 : Math.max(0, Math.min(W + _ / z, N.scrollHeight - k / z + Y)), x = P === 0 ? 0 : Math.max(0, Math.min(F + x / P, N.scrollWidth - C / P + M)), I += W - _, v += F - x;
    }
    f.push({ el: N, top: _, left: x });
  }
  return f;
};
function Le() {
  return Le = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }
    return n;
  }, Le.apply(null, arguments);
}
const $e = (n, e = document) => Array.from(e.querySelectorAll(n));
class gn extends pn {
  constructor(e = {}) {
    super(), this.name = "SwupScrollPlugin", this.requires = { swup: ">=4.2.0" }, this.defaults = { doScrollingRightAway: !1, animateScroll: { betweenPages: !0, samePageWithHash: !0, samePage: !0 }, getAnchorElement: void 0, offset: 0, scrollContainers: "[data-swup-scroll-container]", shouldResetScrollPosition: () => !0, markScrollTarget: !1, scrollFunction: void 0 }, this.options = void 0, this.cachedScrollPositions = {}, this.previousScrollRestoration = void 0, this.currentCacheKey = void 0, this.getAnchorElement = (t = "") => typeof this.options.getAnchorElement == "function" ? this.options.getAnchorElement(t) : this.swup.getAnchorElement(t), this.getOffset = (t, a, i) => {
      let o;
      return o = typeof this.options.offset == "function" ? this.options.offset(t, a, i) : this.options.offset, typeof o == "object" && typeof o.top == "number" && typeof o.left == "number" ? o : { top: parseInt(String(o ?? ""), 10) || 0, left: 0 };
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
      const o = this.getCachedScrollPositions(t.to.url), { top: s = 0, left: r = 0 } = o?.window || { top: 0, left: 0 };
      requestAnimationFrame(() => this.scrollTo({ top: s, left: r }, t.scroll.animate)), t.scroll.scrolledToContent = !0;
    }, this.maybeResetScrollPositions = (t) => {
      const { popstate: a } = t.history, { url: i } = t.to, { el: o } = t.trigger;
      a || o && !this.options.shouldResetScrollPosition(o) || this.resetScrollPositions(i);
    }, this.options = Le({}, this.defaults, e);
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
    const t = this.swup.resolveUrl(e), a = $e(this.options.scrollContainers).map((o) => ({ top: o.scrollTop, left: o.scrollLeft })), i = { window: { top: window.scrollY, left: window.scrollX }, containers: a };
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
    t && t.containers.length !== 0 && $e(this.options.scrollContainers).forEach((a, i) => {
      const o = t.containers[i];
      o != null && (a.scrollTop = o.top, a.scrollLeft = o.left);
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
    const o = this.swup.createVisit({ to: this.swup.location.url }), { top: s = 0, left: r = 0 } = typeof e == "number" ? { top: e } : e;
    a != null || (a = this.getRootScrollContainer()), ((i = this.options.scrollFunction) != null ? i : this.applyScroll)(a, s, r, t, () => this.swup.hooks.callSync("scroll:start", o, void 0), () => this.swup.hooks.callSync("scroll:end", o, void 0));
  }
  applyScroll(e, t, a, i, o, s) {
    const r = e instanceof HTMLHtmlElement || e instanceof HTMLBodyElement ? window : e;
    o(), r.addEventListener("scrollend", s, { once: !0 }), r.addEventListener("wheel", () => {
      e.scrollTo({ top: e.scrollTop, left: e.scrollLeft, behavior: "instant" });
    }, { once: !0 }), e.scrollTo({ top: t, left: a, behavior: i ? "smooth" : "instant" });
  }
  scrollElementIntoView(e, t = !1) {
    mn(e, {}).forEach(({ top: a, left: i, el: o }) => {
      const { top: s = 0, left: r = 0 } = this.getOffset(e, o, { top: a, left: i });
      this.scrollTo({ top: a - s, left: i - r }, t, o);
    });
  }
}
const yn = /* @__PURE__ */ JSON.parse('{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1755082284250},"e-60":{"id":"e-60","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-354"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-66":{"id":"e-66","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1755253957866},"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1755520593128},"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530611763},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-136":{"id":"e-136","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-140":{"id":"e-140","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-141":{"id":"e-141","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067163},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067164},"e-154":{"id":"e-154","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-155":{"id":"e-155","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-156":{"id":"e-156","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755871097680},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755875094862},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755876464121},"e-159":{"id":"e-159","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755879802104},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756115114996},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629063},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629064},"e-167":{"id":"e-167","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-168":{"id":"e-168","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-169":{"id":"e-169","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-170"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-170":{"id":"e-170","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-169"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-171":{"id":"e-171","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1756212521436},"e-172":{"id":"e-172","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-14","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-14-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-173":{"id":"e-173","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756212521436},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-176"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-176":{"id":"e-176","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-177":{"id":"e-177","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-178":{"id":"e-178","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-179":{"id":"e-179","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-180"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-180":{"id":"e-180","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-181":{"id":"e-181","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-182"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-182":{"id":"e-182","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-181"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-183":{"id":"e-183","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-184"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-184":{"id":"e-184","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-183"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-185":{"id":"e-185","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-186"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-186":{"id":"e-186","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-187":{"id":"e-187","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-188"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-188":{"id":"e-188","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-187"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-189":{"id":"e-189","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-190"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-190":{"id":"e-190","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-189"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-191":{"id":"e-191","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-192":{"id":"e-192","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-199":{"id":"e-199","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-200":{"id":"e-200","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-201":{"id":"e-201","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-32","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-32-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-207":{"id":"e-207","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-208":{"id":"e-208","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-209":{"id":"e-209","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-40","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-40-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-210":{"id":"e-210","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-213":{"id":"e-213","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-214":{"id":"e-214","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-215":{"id":"e-215","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-216":{"id":"e-216","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-215"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-217":{"id":"e-217","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-218":{"id":"e-218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-220":{"id":"e-220","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-221":{"id":"e-221","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-222":{"id":"e-222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-224":{"id":"e-224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-226":{"id":"e-226","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-227":{"id":"e-227","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-228":{"id":"e-228","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-230":{"id":"e-230","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-231":{"id":"e-231","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-232":{"id":"e-232","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-235":{"id":"e-235","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-237":{"id":"e-237","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-239":{"id":"e-239","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1756213073122},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756215368838},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756217402865},"e-246":{"id":"e-246","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-247"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-248":{"id":"e-248","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-61","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-61-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756219072551},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-44","affectedElements":{},"duration":0}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-44-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756285635295},"e-252":{"id":"e-252","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":35}],"createdOn":1756289409368},"e-253":{"id":"e-253","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-255":{"id":"e-255","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-256":{"id":"e-256","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-257":{"id":"e-257","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-258"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450212},"e-258":{"id":"e-258","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-257"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450213},"e-261":{"id":"e-261","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-262":{"id":"e-262","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-261"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-263":{"id":"e-263","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-264"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-264":{"id":"e-264","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-263"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-267":{"id":"e-267","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-268":{"id":"e-268","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-269":{"id":"e-269","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-270":{"id":"e-270","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-271":{"id":"e-271","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756479519311},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756717531882},"e-274":{"id":"e-274","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756806270936},"e-322":{"id":"e-322","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756810004678},"e-323":{"id":"e-323","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756810004678},"e-324":{"id":"e-324","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-55","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-325"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756810004678},"e-326":{"id":"e-326","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756811004558},"e-327":{"id":"e-327","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756811004558},"e-328":{"id":"e-328","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-329"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756811004558},"e-330":{"id":"e-330","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-332":{"id":"e-332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-333"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-334":{"id":"e-334","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-335"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-335":{"id":"e-335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-334"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-336":{"id":"e-336","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-337"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-338":{"id":"e-338","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-339"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-340":{"id":"e-340","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-341"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338311},"e-341":{"id":"e-341","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-340"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338312},"e-342":{"id":"e-342","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-343"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358713},"e-343":{"id":"e-343","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-342"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358714},"e-344":{"id":"e-344","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894354535},"e-346":{"id":"e-346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-347"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894852503},"e-348":{"id":"e-348","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894943483},"e-350":{"id":"e-350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-351":{"id":"e-351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-352":{"id":"e-352","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-62","affectedElements":{},"duration":0}},"mediaQueries":["tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-62-p","smoothing":80,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1788970142603},"e-353":{"id":"e-353","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-63","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-63-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1789722760158},"e-354":{"id":"e-354","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-355"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1784644100563},"e-356":{"id":"e-356","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-357"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-357":{"id":"e-357","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-356"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-358":{"id":"e-358","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-359"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-359":{"id":"e-359","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-358"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-360":{"id":"e-360","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-361"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-361":{"id":"e-361","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-362":{"id":"e-362","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-363"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-363":{"id":"e-363","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-362"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-364":{"id":"e-364","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-365"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-365":{"id":"e-365","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-364"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-366":{"id":"e-366","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-367"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-367":{"id":"e-367","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-366"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-368":{"id":"e-368","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-369"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-369":{"id":"e-369","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-368"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-370":{"id":"e-370","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-371"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-371":{"id":"e-371","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-370"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-372":{"id":"e-372","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-373":{"id":"e-373","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-374":{"id":"e-374","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-375"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-375":{"id":"e-375","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-374"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-376":{"id":"e-376","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-377"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-377":{"id":"e-377","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-376"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-378":{"id":"e-378","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-379"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-379":{"id":"e-379","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-378"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-380":{"id":"e-380","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-381"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-381":{"id":"e-381","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-380"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-382":{"id":"e-382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-383":{"id":"e-383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-384":{"id":"e-384","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-385"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-385":{"id":"e-385","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-384"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-386":{"id":"e-386","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792143403693},"e-388":{"id":"e-388","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792144646842},"e-389":{"id":"e-389","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792406953011},"e-390":{"id":"e-390","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"SLIDE_EFFECT","instant":false,"config":{"actionListId":"slideInBottom","autoStopEventId":"e-391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":0,"direction":"BOTTOM","effectIn":true},"createdOn":1792407576931},"e-396":{"id":"e-396","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-72","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"},"targets":[{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"}],"config":[{"continuousParameterGroupId":"a-72-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792428529433},"e-398":{"id":"e-398","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-399"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792485126279},"e-400":{"id":"e-400","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-70","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-70-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487033715},"e-401":{"id":"e-401","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487214244},"e-402":{"id":"e-402","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487313748},"e-403":{"id":"e-403","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487915879},"e-404":{"id":"e-404","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792488478134},"e-405":{"id":"e-405","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-76","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-76-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":30}],"createdOn":1792493994486},"e-406":{"id":"e-406","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792583833272},"e-407":{"id":"e-407","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583940147},"e-408":{"id":"e-408","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583959514},"e-409":{"id":"e-409","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792669014788},"e-410":{"id":"e-410","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792684178623},"e-412":{"id":"e-412","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792746547632},"e-413":{"id":"e-413","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-414"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-414":{"id":"e-414","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-415":{"id":"e-415","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-416"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-416":{"id":"e-416","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-415"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-417":{"id":"e-417","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-418"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609184},"e-418":{"id":"e-418","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-417"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609186},"e-419":{"id":"e-419","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-420"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-420":{"id":"e-420","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-419"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-421":{"id":"e-421","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-422"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-422":{"id":"e-422","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-421"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-423":{"id":"e-423","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792765396560}},"actionLists":{"a-4":{"id":"a-4","title":"Hero Big Title | Fade Reveal","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n-9","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":25,"actionItems":[{"id":"a-4-n-11","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-10","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]},{"keyframe":50,"actionItems":[{"id":"a-4-n-12","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-13","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":75,"actionItems":[{"id":"a-4-n-15","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-14","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-17","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":100,"actionItems":[{"id":"a-4-n-16","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}},{"id":"a-4-n-18","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}]}],"createdOn":1755103578616},"a-11":{"id":"a-11","title":"\\"Quote\\" | Reveal On Hover","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}},{"id":"a-11-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}},{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":20,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-12":{"id":"a-12","title":"\\"Quote\\" | Hide on Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-12-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}},{"id":"a-12-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659295499},"a-13":{"id":"a-13","title":"Slider | Scroll Moving","continuousParameterGroups":[{"id":"a-13-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":0,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":-180.5,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]}]}],"createdOn":1755254411359},"a-16":{"id":"a-16","title":"Moving | Contact Bloc","continuousParameterGroups":[{"id":"a-16-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-16-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":-20,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755520603487},"a-20":{"id":"a-20","title":"Bio Members | Fade In","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"flex"}},{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755528746326},"a-18":{"id":"a-18","title":"Team Members | Hover In","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-18-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}},{"id":"a-18-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":1,"unit":""}},{"id":"a-18-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":1,"unit":""}},{"id":"a-18-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755526280358},"a-19":{"id":"a-19","title":"Team Members | Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755526280358},"a-21":{"id":"a-21","title":"Bio Members | Close Fade Out","actionItemGroups":[{"actionItems":[{"id":"a-21-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755528746326},"a-27":{"id":"a-27","title":"Menu Modal in 2","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-27-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-7","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-27-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-27-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-14","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-28":{"id":"a-28","title":"Menu Modal Out 2","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-28-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-30":{"id":"a-30","title":"(D) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-30-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":712,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-30-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-31":{"id":"a-31","title":"(D) Testimonial | View Less","actionItemGroups":[{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-31-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755852982792},"a-29":{"id":"a-29","title":"Burger Overlap","continuousParameterGroups":[{"id":"a-29-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-29-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":19,"actionItems":[{"id":"a-29-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755794506046},"a-34":{"id":"a-34","title":"Playing Lottie w/ Image","continuousParameterGroups":[{"id":"a-34-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-34-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-34-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]},{"keyframe":65,"actionItems":[{"id":"a-34-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}},{"id":"a-34-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":75,"actionItems":[{"id":"a-34-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}},{"id":"a-34-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":1,"unit":""}}]},{"keyframe":85,"actionItems":[{"id":"a-34-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":0,"unit":""}},{"id":"a-34-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-34-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":1,"unit":""}}]}]}],"createdOn":1755264981960},"a-35":{"id":"a-35","title":"100% | Mask Moving","continuousParameterGroups":[{"id":"a-35-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-35-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":100,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-36":{"id":"a-36","title":"100% | Text On Mask Moving","continuousParameterGroups":[{"id":"a-36-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-36-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":-540,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"keyframe":42,"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-36-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-36-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]}]}],"createdOn":1755871103819},"a-37":{"id":"a-37","title":"100% | Mask Moving Parallax","continuousParameterGroups":[{"id":"a-37-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-37-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":-20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":96,"actionItems":[{"id":"a-37-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-54":{"id":"a-54","title":"Lottie | Parallax 2.1","continuousParameterGroups":[{"id":"a-54-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-54-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-54-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":100}}]}]}],"createdOn":1755773678347},"a-50":{"id":"a-50","title":"Hover IN | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-50-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-51":{"id":"a-51","title":"Hover OUT | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-14":{"id":"a-14","title":"Playing Lottie","continuousParameterGroups":[{"id":"a-14-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-14-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-14-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":1,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-14-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-32":{"id":"a-32","title":"Playing Lottie without Text","continuousParameterGroups":[{"id":"a-32-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-32-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":100,"actionItems":[{"id":"a-32-n-4","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-40":{"id":"a-40","title":"Lottie | Parallax 3","continuousParameterGroups":[{"id":"a-40-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-40-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-40-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":100}}]}]}],"createdOn":1755773678347},"a-41":{"id":"a-41","title":"02 DESIGN | Content Animation 2","continuousParameterGroups":[{"id":"a-41-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":5,"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":1,"unit":""}},{"id":"a-41-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":1,"unit":""}}]},{"keyframe":8,"actionItems":[{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":0,"unit":""}},{"id":"a-41-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":0,"unit":""}}]},{"keyframe":20,"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":1,"unit":""}},{"id":"a-41-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":1,"unit":""}}]},{"keyframe":40,"actionItems":[{"id":"a-41-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":0,"unit":""}},{"id":"a-41-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}}]},{"keyframe":60,"actionItems":[{"id":"a-41-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":1,"unit":""}},{"id":"a-41-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":1,"unit":""}}]},{"keyframe":80,"actionItems":[{"id":"a-41-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":0,"unit":""}},{"id":"a-41-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}},{"id":"a-41-n-18","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-41-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":1,"unit":""}},{"id":"a-41-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":1,"unit":""}}]}]}],"createdOn":1755857273626},"a-26":{"id":"a-26","title":"Lottie | Parallax 2","continuousParameterGroups":[{"id":"a-26-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-26-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-26-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":100}}]}]}],"createdOn":1755773678347},"a-38":{"id":"a-38","title":"Hover IN | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":0,"yValue":0,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":100,"yValue":-100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-42":{"id":"a-42","title":"HERO | Title Reveal","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-5","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1000,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-8","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756213078962},"a-53":{"id":"a-53","title":"Lottie | Parallax 2.0","continuousParameterGroups":[{"id":"a-53-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-53-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-53-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":100}}]}]}],"createdOn":1755773678347},"a-59":{"id":"a-59","title":"\\"Quote\\" | Reveal On Hover Mobile","actionItemGroups":[{"actionItems":[{"id":"a-59-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]},{"actionItems":[{"id":"a-59-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-61":{"id":"a-61","title":"Lottie | Parallax D-only","continuousParameterGroups":[{"id":"a-61-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-61-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-61-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":100}}]}]}],"createdOn":1755773678347},"a-44":{"id":"a-44","title":"100% Tablet | Mask Moving","continuousParameterGroups":[{"id":"a-44-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-44-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-44-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-45":{"id":"a-45","title":"BTN | Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-45-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-46":{"id":"a-46","title":"BTN | Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-46-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-49":{"id":"a-49","title":"Hover OUT | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-49-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-49-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-52":{"id":"a-52","title":"LOADING | Intro","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-52-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-52-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-52-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-52-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-52-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-52-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-55":{"id":"a-55","title":"LOADING | Intro 2","actionItemGroups":[{"actionItems":[{"id":"a-55-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-55-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-55-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-55-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-55-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-55-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-55-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-55-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-56":{"id":"a-56","title":"LOADING | Intro 3","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-56-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-56-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-56-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-56-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-56-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-57":{"id":"a-57","title":"(T) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-57-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-57-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-57-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":792,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-57-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-58":{"id":"a-58","title":"(M) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-58-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-58-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":892,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-60":{"id":"a-60","title":"\\"Quote\\" | Reveal Hover Out Mobile","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659228000},"a-62":{"id":"a-62","title":"ENV 27 | SD","continuousParameterGroups":[{"id":"a-62-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":30,"actionItems":[{"id":"a-62-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-62-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-63":{"id":"a-63","title":"ENV 27","continuousParameterGroups":[{"id":"a-63-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-63-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-63-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-64":{"id":"a-64","title":"Fadein Scale","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":0.99,"yValue":0.99,"locked":true}},{"id":"a-64-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":200,"easing":"outQuart","duration":750,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1784299779426},"a-65":{"id":"a-65","title":"Hover IN | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-66":{"id":"a-66","title":"Hover OUT | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-67":{"id":"a-67","title":"Hero Parralax","continuousParameterGroups":[{"id":"a-67-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-67-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-67-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-69":{"id":"a-69","title":"Footer Move","continuousParameterGroups":[{"id":"a-69-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-69-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-69-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-72":{"id":"a-72","title":"Project Apparation","continuousParameterGroups":[{"id":"a-72-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-72-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-72-n-3","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":10,"unit":"px"}]}}]},{"keyframe":30,"actionItems":[{"id":"a-72-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-72-n-4","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":0,"unit":"px"}]}}]}]}],"createdOn":1792428347426},"a-73":{"id":"a-73","title":"Big Logo Footer Anim","actionItemGroups":[{"actionItems":[{"id":"a-73-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":3,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":0,"unit":""}},{"id":"a-73-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-73-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-73-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1792485129495},"a-70":{"id":"a-70","title":"Hero Parralax 2","continuousParameterGroups":[{"id":"a-70-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-70-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-70-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-75":{"id":"a-75","title":"Footer Move 2","continuousParameterGroups":[{"id":"a-75-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":60,"actionItems":[{"id":"a-75-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-150,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-76":{"id":"a-76","title":"Gradient Move","continuousParameterGroups":[{"id":"a-76-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-76-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":-50,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792493736787},"a-77":{"id":"a-77","title":"Menu Modal in 3","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-77-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-77-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-78":{"id":"a-78","title":"Menu Modal Out 3","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-78-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-78-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-79":{"id":"a-79","title":"BTN | Hover IN 2","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-79-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-80":{"id":"a-80","title":"BTN | Hover OUT 2","actionItemGroups":[{"actionItems":[{"id":"a-80-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-80-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-22":{"id":"a-22","title":"Menu Modal in","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-22-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-13","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-22-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"block"}},{"id":"a-22-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":300,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":1,"unit":""}},{"id":"a-22-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":-4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-23":{"id":"a-23","title":"Menu Modal out","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-23-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"slideInBottom":{"id":"slideInBottom","useFirstGroupAsInitialState":true,"actionItemGroups":[{"actionItems":[{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":0}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":100,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":0,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}},{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":1}}]}]}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'), En = [{ id: "i-3369b7ea", scope: { type: "site" }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "top 60%", end: "bottom top", scrub: 0.8, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", [], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-0a46efea"], deleted: !1 }, { id: "i-c5fa3e77", scope: { type: "pages", value: ["6ad0cb2816e9afd85c684ff1", "6ad616f21f8cbecf97edd7bc", "6ad72f57e23d005096ad353f", "6ad883e4d375bd5dc8fcd9b1", "6ad887d71c76507742d263fd", "6ad88b6cba1a7277fb148e6d", "6ada10acf7b862f8202a551a", "6adb1bf31beca6c8f035e7c7"] }, triggers: [["wf:load", { control: "play", controlType: "load" }]], timelineIds: ["t-f67ae376"], deleted: !1 }, { id: "i-4d923125", scope: { type: "pages", value: ["6ad883e4d375bd5dc8fcd9b1"] }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "20% bottom", end: "bottom bottom", scrub: 1.4, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", ["section.big-padding-top-bottom"], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-5be7f1c4"], deleted: !1 }], hn = [{ id: "t-0a46efea", deleted: !1, actions: [{ id: "ta-9e398187", targets: [["wf:trigger-only", "", { relationship: "none", firstMatchOnly: !1 }]], timing: { duration: 0, position: 0, stagger: { amount: 0.3 }, ease: 29 }, tt: 2, properties: { "wf:transform": { opacity: ["30%", "100%"] } }, splitText: { type: "chars" } }], canvasDuration: 1 }, { id: "t-f67ae376", deleted: !1, actions: [{ id: "ta-72b6a8c0", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars" } }, { id: "ta-a9ce4ab1", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars", mask: "chars" } }] }, { id: "t-5be7f1c4", deleted: !1, actions: [{ id: "ta-ef2e1e28", targets: [["wf:class", ["h3.first"], { relationship: "within", filterBy: ["wf:trigger-only", ""], firstMatchOnly: !1 }]], timing: { duration: 1.233, position: 0.8220000000000001, stagger: { each: 0.12329999999999999 }, ease: 0 }, tt: 2, properties: { "wf:transform": { opacity: ["20%", "100%"] }, "wf:style": { color: ["var(--_colors---normal-blue)", "var(--_colors---dark-blue)"] } }, splitText: { type: "words" } }], canvasDuration: 4.11 }], Tn = {
  ix2: yn,
  interactions: En,
  timelines: hn
}, Se = {
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
}, vn = {
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
}, Ne = [
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
], In = [
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
async function wn(n, e, { doc: t = document, events: a = window, timeout: i = 4e3 } = {}) {
  let o = !t.querySelector("[data-env-reveal],[data-env-text]"), s, r;
  const l = o ? Promise.resolve() : new Promise((c) => {
    s = c, r = setTimeout(c, i);
  }), d = () => {
    o = !0, s?.();
  };
  a.addEventListener("env:animations-ready", d, { once: !0 });
  try {
    await n(), e(), await l;
  } finally {
    clearTimeout(r), a.removeEventListener("env:animations-ready", d), o || t.documentElement.setAttribute("data-env-sd-reveal-expired", ""), t.documentElement.classList.remove("env-sd-boot");
  }
}
function On(n) {
  try {
    if (typeof n?.require != "function") return { compatible: !1, reason: "Webflow.require unavailable" };
    const e = n.require("ix2"), t = n.require("ix3");
    for (const [o, s] of [
      ["ix2.init", e?.init],
      ["ix2.destroy", e?.destroy],
      ["ix3.ready", t?.ready],
      ["ix3.destroy", t?.destroy],
      ["ix3.getInstance", t?.getInstance]
    ]) if (typeof s != "function") return { compatible: !1, reason: `Webflow ${o} unavailable` };
    const a = t.getInstance();
    if (!a) return { compatible: !1, pending: !0, reason: "Webflow interactions not ready" };
    for (const o of ["register", "setFeatures"])
      if (typeof a[o] != "function") return { compatible: !1, reason: `Webflow interactions.${o} unavailable` };
    const i = ["slider", "navbar", "dropdown", "tabs"].map((o) => [o, n.require(o)]).filter(([, o]) => o);
    for (const [o, s] of i)
      if (typeof s.ready != "function" || s.destroy != null && typeof s.destroy != "function") return { compatible: !1, reason: `Webflow ${o} lifecycle unavailable` };
    return { compatible: !0, ix2: e, ix3: t, native: i.map(([, o]) => o) };
  } catch {
    return { compatible: !1, reason: "Webflow runtime inspection failed" };
  }
}
async function Ln(n, { timeout: e = 4e3, pause: t = (i) => new Promise((o) => setTimeout(o, i)), now: a = Date.now } = {}) {
  const i = a();
  for (; ; ) {
    const o = On(n);
    if (o.compatible) return o;
    if (!o.pending || a() - i >= e) throw Error(o.reason);
    await t(50);
  }
}
function Sn(n, e = !1) {
  return Math.max(0, n) > (e ? 2 : 8);
}
function Nn(n) {
  return [n?.querySelector(".main-picto") || n?.querySelector(".nav-link-sd"), n?.querySelector(".logo-nav")];
}
function Rn(n, e, t, a, i = window) {
  if (!n || !e?.matches(".main-picto")) return;
  let o = !1, s = !1;
  const r = () => t(o || s);
  e.addEventListener("pointerenter", (l) => {
    l.pointerType === "touch" || !i.matchMedia("(hover: hover) and (pointer: fine)").matches || (o = !0, r());
  }, { signal: a }), n.addEventListener("pointerleave", () => {
    o = !1, r();
  }, { signal: a }), n.addEventListener("focusin", () => {
    s = !0, r();
  }, { signal: a }), n.addEventListener("focusout", (l) => {
    l.relatedTarget && n.contains(l.relatedTarget) || (s = !1, r());
  }, { signal: a });
}
function An(n, e) {
  n?.querySelectorAll(".navbar-brand-three img.main-picto, .logo-mobile img.logo-nav").forEach((t) => {
    !t.matches(".main-picto") && !/sd-picto(?:-blue)?\.svg(?:[?#]|$)/i.test(t.getAttribute("src") || "") || (t.classList.add("is-env-nav-picto"), t.removeAttribute("srcset"), t.src = e);
  });
}
function kn(n, e, t) {
  if (n.matches(".main-picto")) return [
    { transform: "none", opacity: 1 },
    { transform: `translateX(${t ? 0 : -10}px)`, opacity: t ? 1 : 0 }
  ];
  const a = n.getBoundingClientRect(), i = e.getBoundingClientRect();
  return [
    { transform: `translateY(${t ? -a.height * 1.2 : 0}px)`, opacity: t ? 0 : 1 },
    { transform: `translate(${a.left - i.left}px,${a.top + a.height / 2 - i.top - i.height / 2 + (t ? 0 : a.height * 1.2)}px)`, opacity: t ? 1 : 0 }
  ];
}
function _n(n = document) {
  if (n.querySelector("style[data-env-sd-mobile-nav]")) return;
  const e = n.createElement("style");
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
.navbar-logo-center .contact-modal-bloc{max-height:100vh;max-height:100dvh;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .contact-modal-bloc .contact-form-wrapper{min-height:0!important;max-height:calc(100vh - 24px)!important;max-height:calc(100dvh - 24px)!important;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .navbar-brand-three:has(.main-picto) .logo-nav{opacity:0}
.navbar-logo-center .navbar-brand-three .logo-nav{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .logo-nav{filter:brightness(0) invert(1)}
.navbar-logo-center .navbar-brand-three .main-picto{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .main-picto{filter:brightness(0) invert(1)}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .navbar-brand-three .main-picto,.navbar-logo-center .navbar-brand-three .logo-nav{transition:none}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-sd.nav{transition:none}}
@media(max-width:991px){
.navbar-logo-center .menu-modal{max-height:100vh;max-height:100dvh;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .menu-modal-element-wrapper{height:auto!important;min-height:100%;flex-shrink:0}
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-env-burger-managed .burger-menu-wrap{position:relative;z-index:5;cursor:pointer}
.navbar-logo-center.is-env-burger-managed .burger-menu-wrap .line-burger{transform:none!important;transform-origin:center;transition:transform 450ms cubic-bezier(.22,1,.36,1),background-color 300ms ease}
.navbar-logo-center.is-env-burger-managed.is-env-menu-open .burger-menu-wrap .line-burger.top{transform:translateY(var(--env-burger-shift,4.5px)) rotate(45deg)!important}
.navbar-logo-center.is-env-burger-managed.is-env-menu-open .burger-menu-wrap .line-burger.bottom{transform:translateY(calc(-1 * var(--env-burger-shift,4.5px))) rotate(-45deg)!important}
.navbar-logo-center.is-env-menu-open .burger-menu-wrap .line-burger{background-color:#fff!important}
.navbar-logo-center.is-env-menu-open .logo-mobile>.logo-nav{filter:brightness(0) invert(1)!important}
.navbar-logo-center.is-env-menu-open::before{opacity:0!important}
.navbar-logo-center.is-env-burger-managed:not(.is-env-menu-open) .menu-modal{pointer-events:none!important}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(1) invert(0);transition:opacity 400ms ease,filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(0) invert(1)}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(max-width:767px){
.navbar-logo-center .contact-modal-bloc{top:var(--env-modal-header-height,78px)!important;bottom:0!important;height:calc(100vh - var(--env-modal-header-height,78px))!important;height:calc(100dvh - var(--env-modal-header-height,78px))!important;max-height:calc(100vh - var(--env-modal-header-height,78px))!important;max-height:calc(100dvh - var(--env-modal-header-height,78px))!important}
.navbar-logo-center .contact-modal-bloc .contact-form-wrapper{box-sizing:border-box;height:100%!important;max-height:100%!important;padding-top:24px!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open){background:#fff!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open)::before{opacity:1!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) :is(.navbar-brand-three .main-picto,.navbar-brand-three .logo-nav,.logo-mobile>.logo-nav){filter:brightness(1) invert(0)!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) .nav-link-sd{color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))!important}
.navbar-logo-center .contact-modal-bloc .close-bloc{cursor:pointer}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto,.navbar-logo-center.is-env-burger-managed .burger-menu-wrap .line-burger{transition:none!important}}`, n.head.append(e);
}
function Ke(n) {
  let e = n.querySelector("#env-sd-page");
  if (e) return e;
  const t = n.querySelector("main.main-wrapper");
  if (!t || t.parentElement !== n.body) throw Error("Unsupported page layout");
  e = n.createElement("div"), e.id = "env-sd-page", t.before(e), e.append(t);
  const a = n.querySelector("body > .section.footer");
  if (a) {
    const i = t.hasAttribute("data-env-legal-main") && a.nextElementSibling?.matches(".uplaod--video.w-background-video") ? a.nextElementSibling : null;
    e.append(a), i && e.append(i);
  }
  return e;
}
function Ze(n, e, t, { refreshRuntime: a = !1, gsapScripts: i, profiles: o = Se, inlineScripts: s = [], persistentContact: r = !1, auditedCores: l = [], runtimeCompatible: d = !1 } = {}) {
  const c = [...n.scripts].map((u) => u.getAttribute("src")).filter((u) => u?.includes("/js/webflow.")), g = o[e], b = n.documentElement.getAttribute("data-wf-page"), m = n.documentElement.getAttribute("data-wf-site"), h = a && g?.page !== b && Object.values(o).find((u) => u.page === b && u.site === m) || g, y = h || Object.values(o).find((u) => JSON.stringify(u.scripts) === JSON.stringify(c)) || (a ? Se["/home-sd"] : void 0);
  if (!y || n.documentElement.getAttribute("data-wf-site") !== y.site || !n.documentElement.getAttribute("data-wf-page") || h && n.documentElement.getAttribute("data-wf-page") !== h.page) throw Error("Uncertified page");
  const T = JSON.stringify(c) !== JSON.stringify(y.scripts);
  if (T && !a) throw Error("Webflow export changed; rebuild SD snapshots");
  const O = [...Object.values(o).map((u) => u.scripts.slice(0, 2)), ...l].some((u) => u.length === 2 && u.every((p) => c.includes(p)));
  if (T && !O) {
    const u = c.slice(0, 2), p = u.length === 2 && u.every((I) => {
      try {
        const v = new URL(I);
        return v.origin === "https://cdn.prod.website-files.com" && v.pathname.startsWith(`/${y.site}/js/webflow.schunk.`) && /\.[a-f0-9]{16}\.js$/.test(v.pathname) && !v.search && !v.hash && !v.username && !v.password;
      } catch {
        return !1;
      }
    });
    if (!d || !p) throw Error("Webflow shared core changed");
  }
  const w = c.find((u) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(u));
  if (T && !w) throw Error("Missing Webflow data bootstrap");
  if (i && [...n.scripts].map((u) => u.src).filter((u) => u.includes("/gsap/")).some((u) => !i.includes(u))) throw Error("New GSAP dependency requires native navigation");
  if (!n.querySelector(".navbar-logo-center") || !n.querySelector("body > main.main-wrapper, #env-sd-page > main.main-wrapper")) throw Error("Page needs the shared SD menu and main wrapper");
  const S = [...n.querySelectorAll('link[rel="stylesheet"]')].map((u) => u.getAttribute("href"));
  if (!(t || y.sheets).every((u) => S.includes(u)) || t && S.length !== t.length) throw Error("Stylesheets changed");
  for (const u of n.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(u.src)) throw Error("Remove the legacy env.js loader on pilot routes");
    if (/const brand =/.test(u.textContent) && !/ENV SD/.test(u.textContent)) throw Error("Remove the legacy brand initializer on pilot routes");
    if (!(u.src || !u.textContent.trim() || u.type === "application/ld+json") && !s.includes(u.textContent) && !/^\s*window\.ENVSDTransition\s*=\s*(['"])[a-zA-Z-]*\1\s*;?\s*$/.test(u.textContent) && !/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(u.textContent))
      throw Error("Additional inline script needs an adapter");
  }
  if (n.querySelector('[data-animation-type="spline"]') || [...n.querySelectorAll(".w-form")].some((u) => !r || !u.closest(".navbar-logo-center .contact-modal-bloc"))) throw Error("Unsupported page widget");
  return a ? { ...y, runtimeChanged: T, bootstrap: w, dataScripts: c.slice(2) } : y;
}
function xn(n, e) {
  const t = n.querySelector(".navbar-logo-center .link-box.mobile"), a = e.querySelector(".navbar-logo-center .link-box.mobile");
  if (t && a) {
    const i = t.querySelector(".dot-link"), o = a.querySelector(".dot-link");
    i && !o ? i.remove() : !i && o && t.append(o.cloneNode(!0));
  }
  for (const [i, o] of [[".nav-link-sd", "white"], [".dot-link", "dark"], [".burger-menu-wrap .line-burger", "white"], [".menu-modal", "darker"], [".menu-modal .link-overlay", "dark"]]) {
    const s = [...n.querySelectorAll(`.navbar-logo-center ${i}`)], r = [...e.querySelectorAll(`.navbar-logo-center ${i}`)];
    if (s.length !== r.length) throw Error("Menu variants structure changed");
    s.forEach((l, d) => l.classList.toggle(o, r[d].classList.contains(o)));
  }
}
function Mn(n, e) {
  for (const t of [".navbar-brand-three", ".logo-mobile", ".menu-modal"]) {
    const a = n.querySelector(`.navbar-logo-center ${t}`), i = e.querySelector(`.navbar-logo-center ${t}`);
    if (!a && !i) continue;
    if (!a || !i) throw Error("Menu image slot changed");
    let o = [...a.querySelectorAll("img")];
    const s = [...i.querySelectorAll("img")];
    if (t !== ".logo-mobile" && o.length !== s.length) throw Error("Menu images structure changed");
    for (; o.length > s.length; ) o.pop().remove();
    for (; o.length < s.length; ) {
      const r = s[o.length].cloneNode(!0);
      a.append(r), o.push(r);
    }
    o.forEach((r, l) => {
      r.className = s[l].className;
      for (const d of ["src", "srcset", "sizes", "alt"]) {
        const c = s[l].getAttribute(d);
        c === null ? r.removeAttribute(d) : r.setAttribute(d, c);
      }
    });
  }
}
const Re = { ...Se, ...vn }, Cn = { profiles: Re, inlineScripts: Ne, persistentContact: !0, auditedCores: In }, Ue = document.createElement("style");
Ue.dataset.envAlternativeRevealGate = "";
Ue.textContent = '.navbar-logo-center [data-modal="contact"]{pointer-events:auto!important}#env-sd-page[data-env-alt-reveal-wait] :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden!important}';
document.head.append(Ue);
const Ve = document.createElement("style");
Ve.dataset.envNavBackground = "";
Ve.textContent = `
.navbar-logo-center { background:transparent!important; transition:none!important; isolation:isolate; }
.navbar-logo-center::before { content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:#fff;opacity:0;transition:opacity 400ms ease;will-change:opacity; }
.navbar-logo-center.is-past-hero::before { opacity:1; }
@media(prefers-reduced-motion:reduce){.navbar-logo-center::before{transition:none}}
`;
document.head.append(Ve);
const se = new URL(import.meta.url);
se.pathname = se.pathname.replace(/[^/]*$/, "");
const Un = () => location.pathname.replace(/\/$/, "") || "/", ie = matchMedia("(prefers-reduced-motion: reduce)"), Vn = () => document.querySelector("main.main-wrapper");
let Ae = () => {
}, pe, oe, fe, ke = [], me = () => {
}, _e, xe = () => {
}, re, ge;
function Me() {
  const n = document.querySelector("#env-sd-page");
  n !== _e && (xe(), re?.destroy(), ge?.destroy(), _e = n, xe = Ot(n), re = It(n), ge = wt(n));
}
let q = { sources: [], story: null, hero: !1, mask: !1 }, ye = () => {
};
const Je = /* @__PURE__ */ new Set(), be = () => {
  document.documentElement.classList.remove("env-sd-boot"), window.dispatchEvent(new Event("env:sd-ready"));
}, lt = (n) => new Promise((e) => setTimeout(e, n));
function $(n, e = !1) {
  return !e && Je.has(n) ? Promise.resolve() : new Promise((t, a) => {
    const i = document.createElement("script");
    i.src = new URL(n, se).href;
    const o = setTimeout(() => {
      i.remove(), a(Error(`ENV SD timeout: ${n}`));
    }, 8e3);
    i.onload = () => {
      clearTimeout(o), Je.add(n), i.remove(), t();
    }, i.onerror = () => {
      clearTimeout(o), i.remove(), a(Error(`ENV SD could not load ${n}`));
    }, i.dataset.envSdModule = n, document.head.append(i);
  });
}
function Gn(n, e = () => {
}) {
  const t = Vt();
  try {
    e(), St(document, n), xn(document, n), Mn(document, n);
    const a = [...document.querySelectorAll(".navbar-logo-center a[href]")], i = [...n.querySelectorAll(".navbar-logo-center a[href]")];
    a.forEach((s, r) => {
      i[r] && s.setAttribute("href", i[r].getAttribute("href"));
    });
    for (const s of ["lang", "dir"]) {
      const r = n.documentElement.getAttribute(s);
      r === null ? document.documentElement.removeAttribute(s) : document.documentElement.setAttribute(s, r);
    }
    document.documentElement.setAttribute("data-wf-page", n.documentElement.getAttribute("data-wf-page")), document.body.className = n.body.className;
    const o = 'meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
    document.head.querySelectorAll(o).forEach((s) => s.remove()), n.head.querySelectorAll(o).forEach((s) => document.head.append(s.cloneNode(!0))), document.head.querySelectorAll("style[data-env-sd-page-style]").forEach((s) => s.remove()), n.head.querySelectorAll("style:not([data-env-sd-mobile-nav]):not([data-env-sd-gradient-style])").forEach((s) => {
      const r = s.cloneNode(!0);
      r.dataset.envSdPageStyle = "", document.head.append(r);
    });
  } finally {
    t();
  }
}
function dt() {
  Ae();
  const n = document.querySelector(".navbar-logo-center"), e = n?.querySelector(".navbar-brand-three");
  An(n, new URL("sd-picto-blue.svg", se).href);
  const [t, a] = Nn(e);
  if (!n) return;
  _n();
  const i = new AbortController();
  let o, s, r = !1, l = [], d = !1;
  function c(y = !1) {
    const T = Sn(window.scrollY, o);
    n.classList.toggle("is-past-hero", T), o = T;
    const O = T || r;
    if (!y && O === s) return;
    const w = s === void 0;
    if (s = O, !t || !a || !t.getClientRects().length) {
      l.forEach((v) => v.cancel()), l = [];
      return;
    }
    const S = [t, a], u = S.map((v) => ({ transform: getComputedStyle(v).transform, opacity: getComputedStyle(v).opacity }));
    l.forEach((v) => v.cancel());
    const p = S.map((v) => v.style.transform);
    S.forEach((v) => v.style.transform = "none");
    const I = kn(t, a, O);
    S.forEach((v, f) => v.style.transform = p[f]), l = S.map((v, f) => v.animate([u[f], I[f]], { duration: w || ie.matches ? 0 : 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }));
  }
  const g = gt(n), b = yt(n), m = Et(n);
  Rn(e, t, (y) => {
    r = y, c();
  }, i.signal);
  function h() {
    d || (d = !0, requestAnimationFrame(() => {
      d = !1, c();
    }));
  }
  addEventListener("scroll", h, { passive: !0, signal: i.signal }), addEventListener("resize", () => c(!0), { signal: i.signal }), [t, a].forEach((y) => y?.addEventListener("load", () => c(!0), { signal: i.signal })), c(), document.querySelectorAll(".navbar-logo-center a[href]").forEach((y) => {
    const T = new URL(y.href), O = T.origin === location.origin && T.pathname === location.pathname && !T.hash;
    y.classList.toggle("w--current", O), O ? y.setAttribute("aria-current", "page") : y.removeAttribute("aria-current");
  }), Ae = () => {
    m(), b(), g(), i.abort(), l.forEach((y) => y.cancel());
  };
}
async function ct() {
  if (q.story ? (ye(), ye = _t(document), xt(q.story.groups, q.story.responsive)) : document.querySelector('[data-env-page-animation="about"]') && (await $("about-page.js"), window.ENVAboutPage?.init()), !document.querySelector("[data-env-reveal],[data-env-text]")) return;
  if (!window.gsap) throw Error("GSAP unavailable");
  let n;
  const e = new Promise((t) => {
    n = t;
  });
  window.addEventListener("env:animations-ready", n, { once: !0 });
  try {
    await $("animations.js", !0), await Promise.race([e, lt(1500)]);
  } finally {
    window.removeEventListener("env:animations-ready", n);
  }
}
async function et({ deferReveals: n = !1 } = {}) {
  Me(), dt(), me(), me = pt(document.querySelector("#env-sd-page")), q.hero && Mt(), Ct(), Lt(), window.ENVVideos?.refresh(), window.gsap && window.ScrollTrigger && document.querySelectorAll("#env-sd-page .section.mask").forEach((t) => {
    t.hasAttribute("data-env-about-mask") || t.dataset.maskInitialized || (t.dataset.maskInitialized = "true", ke.push(window.gsap.fromTo(t, { clipPath: q.mask ? "inset(15%)" : "inset(10%)" }, { clipPath: "inset(0%)", ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "top 15%", scrub: 0.6, invalidateOnRefresh: !0 } })));
  }), await Promise.all([
    document.querySelector("#env-sd-page .hero-wrapper .sd-slider") ? $("hero.js", !0) : Promise.resolve(),
    document.querySelector("#env-sd-page [data-env-hero-shape]") ? $("hero-shape.js", !0) : Promise.resolve(),
    n ? Promise.resolve() : ct()
  ]), re?.refresh();
  const e = [...document.querySelectorAll(".swiper-news[data-env-news]")];
  e.length && (pe = new IntersectionObserver((t) => {
    t.some((a) => a.isIntersecting) && (pe.disconnect(), $("news.js", !0).catch(console.error));
  }, { rootMargin: "600px" }), e.forEach((t) => pe.observe(t)));
}
function Pn() {
  me(), me = () => {
  }, ge?.destroy(), ge = null, re?.destroy(), re = null, xe(), _e = null, window.ENVAnimations?.destroy(), window.ENVAboutPageTest?.destroy(), ye(), ye = () => {
  }, document.querySelector("#env-sd-page .hero-about")?.__envReleaseCleanup?.(), window.ENVAboutPage?.destroy(), window.ENVAboutReveals?.destroy(), window.ENVHeroShape?.destroy(), window.ENVOrganicBlob?.destroy(), window.ENVCTABlob?.destroy(), ke.forEach((e) => {
    e.scrollTrigger?.kill(), e.kill();
  }), ke = [], window.ScrollTrigger?.getAll().filter((e) => e.trigger?.matches?.("#env-sd-page .section.mask")).forEach((e) => e.kill()), Ae(), pe?.disconnect(), document.querySelector(".hero-wrapper")?.__envHeroCleanup?.(), window.ENVNews?.destroy(), window.ENVNewsMarquee?.destroy();
  const n = document.querySelector("#env-sd-page");
  n && window.ENVVideos?.release(n);
}
async function tt(n, e, t, a) {
  ie.matches || (oe = n.animate([{ opacity: e }, { opacity: t }], { duration: a, easing: "ease", fill: "forwards" }), await oe.finished.catch(() => {
  }));
}
async function Bn() {
  if (window.ENVSD) {
    be();
    return;
  }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error("Install the matching SD head block before enabling navigation");
  const n = Pt(), e = window.ENVSDTransition === "mask", t = window.ENVSDPreload !== !1;
  document.documentElement.dataset.envTransitionMode = e ? "mask" : "classic";
  const a = window.Webflow, i = await Ln(a), { ix2: o, ix3: s } = i, r = { ...Cn, runtimeCompatible: i.compatible };
  let l, d = [...document.querySelectorAll('link[rel="stylesheet"]')].map((p) => p.getAttribute("href"));
  const c = /* @__PURE__ */ new Map(), g = [...document.scripts].map((p) => p.src).filter((p) => p.includes("/gsap/"));
  Pe(document), je(document), q = ze(document);
  const b = Ze(document, Un(), d, { refreshRuntime: !0, gsapScripts: g, ...r, inlineScripts: [...Ne, ...q.sources] });
  q.story && window.ENVAboutPageTest?.destroy(), q.hero && document.querySelector(".hero-about")?.__envReleaseCleanup?.();
  let m;
  const h = async (p) => !p.runtimeChanged && !p.currentExport ? Tn : (m ||= import("./runtime-config-Dr6I2voi.js"), (await m).runtimeConfig([...new Set([p.bootstrap, ...p.dataScripts || []].filter(Boolean))], p.site)), y = /* @__PURE__ */ new Set(), T = (p) => {
    const I = [];
    /data-env-(?:reveal|text)=/.test(p) && I.push("animations.js"), /class=["'][^"']*\bsd-slider\b/.test(p) && I.push("hero.js"), /data-env-hero-shape/.test(p) && I.push("hero-shape.js"), /data-env-page-animation=["']about["']/.test(p) && I.push("about-page.js"), I.forEach((v) => {
      if (y.has(v)) return;
      y.add(v);
      const f = document.createElement("link");
      f.rel = "prefetch", f.as = "script", f.href = new URL(v, se).href, f.dataset.envSdPrefetch = "", document.head.append(f);
    });
  }, O = (p) => {
    T(p);
    const I = [...p.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((f) => f[1]), v = I.find((f) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(f));
    if (!(!v || Object.values(Re).some((f) => !f.currentExport && f.scripts.includes(v))))
      return h({ runtimeChanged: !0, bootstrap: v, dataScripts: I.filter((f) => f.includes("/js/webflow.")).slice(2), site: b.site });
  }, w = async () => {
    if (a.require("slider")?.ready) return;
    const p = b.slider || Re["/home-sd"].slider;
    await $(p.script);
    let I = !1;
    if (window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, (v) => {
      v(p.factory), I = !0;
    }]), !I || !a.require("slider")?.ready) throw Error("Audited slider factory unavailable");
  };
  l = i.native, Ke(document), Me(), fe = e ? null : un(), document.head.querySelectorAll("style").forEach((p) => {
    b.styles.includes(p.textContent) && (p.dataset.envSdPageStyle = "");
  }), await window.ENVSDLoader?.prepare?.(), await et(), document.querySelector(".navbar-logo-center")?.setAttribute("data-env-ignore", "");
  const S = new cn({
    containers: ["#env-sd-page"],
    animationSelector: !1,
    cache: t,
    plugins: [new gn({ animateScroll: { betweenPages: !1, samePageWithHash: !ie.matches, samePage: !ie.matches } })],
    linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])",
    ignoreVisit: (p, { el: I } = {}) => {
      const v = new URL(p, location.href);
      return v.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(v.pathname) || !!I?.closest("[data-no-swup]");
    }
  });
  bt(), window.ENVSD = { swup: S, status: "ready" }, t && (window.ENVSD.stopPreload = fn(S, { warmPage: O, delay: 400, concurrency: 2 }), h(b).catch(() => {
  })), document.documentElement.setAttribute("data-env-sd-document", crypto.randomUUID()), S.replaceContent = (p) => {
    const I = document.querySelector("#env-sd-page"), v = p.to.document?.querySelector("#env-sd-page");
    return !I || !v ? !1 : (window.ENVVideos?.stage(v), I.replaceWith(v), document.title = p.to.document.querySelector("title")?.textContent || "", !0);
  }, S.hooks.before("visit:start", (p) => {
    e && p.animation.animate && (n.capture(), n.depart());
  }), S.hooks.replace("animation:out:await", async () => {
    e || await tt(document.querySelector("#env-sd-page"), 1, 0, 200);
  }), S.hooks.replace("content:replace", async (p, I, v) => {
    const f = p.to.document;
    if (!f || !v) throw Error("Missing incoming page");
    Pe(f), je(f);
    const L = ze(f), N = Tt(f, d, b.site), k = Ze(f, new URL(p.to.url, location.href).pathname, N.sheets, { refreshRuntime: !0, gsapScripts: g, ...r, inlineScripts: [...Ne, ...L.sources] }), C = await h(k);
    if (p.done) return;
    if (f.querySelectorAll(".navbar-logo-center a[href]").length !== document.querySelectorAll(".navbar-logo-center a[href]").length) throw Error("Menu structure changed");
    const R = Ke(f);
    if (R.classList.add("env-sd-pending"), e && R.setAttribute("data-env-alt-reveal-wait", ""), R.querySelector(".w-slider") && !a.require("slider")?.ready) {
      await w();
      const U = a.require("slider");
      l.includes(U) || l.push(U);
    }
    let A;
    try {
      A = await vt(document, N);
    } catch (U) {
      if (p.done) return;
      throw U;
    }
    if (p.done) {
      A.rollback();
      return;
    }
    c.set(p, A), window.lenis?.stop(), document.querySelector(".navbar-logo-center.is-env-menu-open .burger-menu-wrap")?.click(), Pn(), l.forEach((U) => U.destroy?.()), o.destroy(), s.destroy(), oe?.cancel(), await v(p, I), Me(), q = L, Gn(f, () => {
      A.commit(), d = N.sheets, c.delete(p), N.replacements.length && S.cache.clear();
    }), fe?.prepare(), J(p), await new Promise((U) => requestAnimationFrame(U)), J(p), e && n.prepare(document.querySelector("#env-sd-page")), l.forEach((U) => U.ready?.()), o.init(C.ix2), await Promise.race([s.ready(), lt(4e3).then(() => {
      throw Error("Webflow interaction restart timeout");
    })]);
    const V = s.getInstance();
    if (!V) throw Error("Webflow interactions did not restart");
    V.setFeatures({ timelineGroups: !1 }), V.register(C.interactions, C.timelines), document.documentElement.classList.add("w-mod-ix3");
  }), S.hooks.replace("animation:in:await", async (p) => {
    J(p);
    const I = document.querySelector("#env-sd-page");
    if (e) {
      await n.reveal(I);
      try {
        await ct();
      } finally {
        I.removeAttribute("data-env-alt-reveal-wait"), window.lenis?.start();
      }
    } else
      await tt(I, 0, 1, 350), oe?.cancel();
  }), S.hooks.on("page:view", async (p) => {
    try {
      await new Promise((v) => requestAnimationFrame(v)), J(p), await Ut({ visit: p, useMask: e, transition: n, root: document.querySelector("#env-sd-page"), lenis: window.lenis, mount: et }), window.ScrollTrigger?.refresh(), J(p), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), fe?.commit(), !["localhost", "127.0.0.1"].includes(location.hostname) && typeof window.gtag == "function" && window.gtag("event", "page_view", { page_title: document.title, page_location: location.href });
      const I = Vn();
      if (I) {
        const v = I.getAttribute("tabindex");
        I.setAttribute("tabindex", "-1"), I.focus({ preventScroll: !0 }), v === null ? I.removeAttribute("tabindex") : I.setAttribute("tabindex", v);
      }
    } catch (I) {
      document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), console.error("[ENV SD] Page initialization failed; native fallback", I), window.location.assign(p.to.url);
    }
  });
  const u = (p) => {
    c.get(p)?.rollback(), c.delete(p), document.querySelector("#env-sd-page")?.removeAttribute("data-env-alt-reveal-wait"), n.cleanup(), fe?.refresh(), be(), window.lenis?.start(), oe?.cancel(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending");
  };
  S.hooks.on("visit:fail", u), S.hooks.on("visit:abort", u), be(), (async () => {
    if (!window.lenis && !ie.matches)
      try {
        await $("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"), window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: !0, easing: (p) => Math.min(1, 1.001 - Math.pow(2, -10 * p)) }), requestAnimationFrame(function p(I) {
          window.lenis?.raf(I), requestAnimationFrame(p);
        });
      } catch (p) {
        console.warn("[ENV SD] Native scroll retained", p);
      }
  })();
}
const jn = () => Bn().catch((n) => {
  console.error("[ENV SD] Native navigation retained", n), wn(() => $("env.js"), () => {
    [...document.scripts].some((e) => /const brand =/.test(e.textContent) && !/ENV SD/.test(e.textContent)) || dt();
  }).catch((e) => console.error("[ENV SD] Widget fallback failed", e)).finally(be);
});
window.Webflow = window.Webflow || [];
window.Webflow.push(jn);
//# sourceMappingURL=sd-navigation-alternative.js.map
