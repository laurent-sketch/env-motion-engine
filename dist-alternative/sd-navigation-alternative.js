function sn(t, e = window) {
  const n = t?.querySelector(".burger-menu-wrap"), a = t?.querySelector(".menu-modal"), o = n?.querySelector(".line-burger.top"), i = n?.querySelector(".line-burger.bottom");
  if (!n || !a || !o || !i) return () => {
  };
  const s = e.matchMedia("(max-width: 991px)"), d = e.matchMedia("(prefers-reduced-motion: reduce)"), l = new AbortController(), c = new Map(["role", "tabindex", "aria-expanded", "aria-label", "aria-controls"].map((L) => [L, n.getAttribute(L)])), f = a.getAttribute("id"), u = a.inert, g = n.style.getPropertyValue("--env-burger-shift");
  f || (a.id = "env-sd-mobile-menu"), n.tagName !== "BUTTON" && (n.setAttribute("role", "button"), n.hasAttribute("tabindex") || n.setAttribute("tabindex", "0")), n.setAttribute("aria-controls", a.id), t.classList.add("is-env-burger-managed");
  let p = !1, I = null, E = !1, T = Number(a.style.opacity || 0);
  const b = /* @__PURE__ */ new Set();
  function O() {
    b.forEach((L) => L.cancel()), b.clear();
  }
  function R() {
    const L = (i.offsetTop + i.offsetHeight / 2 - o.offsetTop - o.offsetHeight / 2) / 2;
    n.style.setProperty("--env-burger-shift", `${L > 0 ? L : 4.5}px`);
  }
  function r() {
    if (O(), d.matches || !n.animate) return;
    [...a.querySelectorAll(".logo-menu-mobile, .link-menu-overlay")].forEach((k, N) => {
      const M = e.getComputedStyle(k), C = M.transform, w = k.animate([
        { opacity: 0, transform: `translateY(18px) ${C === "none" ? "" : C}`.trim() },
        { opacity: M.opacity, transform: C }
      ], { duration: 550, delay: 70 + N * 65, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      b.add(w), w.finished?.then(() => b.delete(w), () => b.delete(w));
    });
  }
  function m(L) {
    const k = L !== p;
    p = L, t.classList.toggle("is-env-menu-open", p), a.inert = !p, n.setAttribute("aria-expanded", String(p)), n.setAttribute("aria-label", p ? "Close menu" : "Open menu"), k && (p ? (R(), r()) : O());
  }
  function v() {
    if (E) return;
    const L = Number(a.style.opacity || e.getComputedStyle(a).opacity), k = (a.style.display || e.getComputedStyle(a).display) === "none" || a.hidden || a.getAttribute("aria-hidden") === "true";
    s.matches ? I === !0 ? !k && L >= 0.999 && (I = null) : I === !1 ? (k || L <= 1e-3) && (I = null) : k || L <= 1e-3 || L < T - 1e-3 ? m(!1) : (L > T + 1e-3 || L >= 0.999) && m(!0) : (I = null, m(!1)), T = L;
  }
  n.addEventListener("click", () => {
    s.matches && (I = !p, m(I));
  }, { capture: !0, signal: l.signal }), n.addEventListener("keydown", (L) => {
    n.tagName === "BUTTON" || !s.matches || !["Enter", " "].includes(L.key) || (L.preventDefault(), n.click());
  }, { signal: l.signal }), a.addEventListener("click", (L) => {
    p && s.matches && L.target.closest?.("a[href]") && n.click();
  }, { signal: l.signal }), t.ownerDocument.addEventListener("keydown", (L) => {
    L.key === "Escape" && p && s.matches && (L.preventDefault(), n.click());
  }, { signal: l.signal });
  const h = new e.MutationObserver(v);
  return h.observe(a, { attributes: !0, attributeFilter: ["style", "hidden", "aria-hidden"] }), s.addEventListener("change", v), n.setAttribute("aria-expanded", "false"), n.setAttribute("aria-label", "Open menu"), v(), () => {
    E = !0, h.disconnect(), l.abort(), s.removeEventListener("change", v), O(), t.classList.remove("is-env-burger-managed", "is-env-menu-open"), c.forEach((L, k) => L === null ? n.removeAttribute(k) : n.setAttribute(k, L)), a.inert = u, f === null && a.removeAttribute("id"), g ? n.style.setProperty("--env-burger-shift", g) : n.style.removeProperty("--env-burger-shift");
  };
}
function rn(t, e = window) {
  if (!t?.querySelector(".hero-about")) return { refresh() {
  }, destroy() {
  } };
  const n = new e.AbortController(), a = [...t.querySelectorAll("img")], o = new Set(t.querySelectorAll(".bloc-big-text > img"));
  let i = !1, s = 0, d = 0, l = !1, c = -1 / 0;
  const f = /* @__PURE__ */ new WeakMap();
  function u() {
    if (s = 0, !(i || !t.isConnected || !l)) {
      if (e.document.documentElement.hasAttribute("data-env-transition-active") || t.hasAttribute("data-env-alt-reveal-wait") || e.performance.now() - c < 140) {
        d = e.setTimeout(g, 160);
        return;
      }
      l = !1, e.lenis?.resize(), e.ScrollTrigger?.refresh();
    }
  }
  function g() {
    i || (l = !0, e.clearTimeout(d), s || (s = e.requestAnimationFrame(u)));
  }
  function p(E) {
    const T = E.currentTarget;
    o.has(T) && T.naturalWidth && T.naturalHeight && !T.hasAttribute("width") && !T.hasAttribute("height") && (T.setAttribute("width", T.naturalWidth), T.setAttribute("height", T.naturalHeight)), g();
  }
  a.forEach((E) => {
    E.addEventListener("load", p, { signal: n.signal }), E.addEventListener("error", g, { signal: n.signal }), o.has(E) && (E.loading = "eager"), E.complete && E.naturalWidth && p({ currentTarget: E });
  });
  const I = e.ResizeObserver ? new e.ResizeObserver((E) => {
    let T = !1;
    E.forEach(({ target: b, contentRect: O }) => {
      const R = `${O.width.toFixed(1)}:${O.height.toFixed(1)}`, r = f.get(b);
      f.set(b, R), r !== void 0 && r !== R && (T = !0);
    }), T && g();
  }) : null;
  return t.querySelectorAll(".section").forEach((E) => I?.observe(E)), e.addEventListener("scroll", () => {
    c = e.performance.now(), l && (e.clearTimeout(d), d = e.setTimeout(g, 160));
  }, { passive: !0, signal: n.signal }), e.addEventListener("resize", g, { signal: n.signal }), e.addEventListener("pageshow", g, { signal: n.signal }), e.document.fonts?.ready.then(g), g(), { refresh: g, destroy() {
    i = !0, n.abort(), I?.disconnect(), e.cancelAnimationFrame(s), e.clearTimeout(d);
  } };
}
function ln(t, e = window) {
  const n = t?.querySelector(".about-hero");
  if (!n?.querySelector(".hero-about")) return { destroy() {
  } };
  const a = new e.AbortController(), o = e.document.createElement("style");
  o.textContent = "[data-env-about-word]{opacity:var(--env-about-opacity,1)!important}[data-env-about-mask]{clip-path:inset(var(--env-about-inset,10%))!important}", e.document.head.append(o);
  const i = e.matchMedia("(prefers-reduced-motion: reduce)"), s = [...n.querySelectorAll('[data-reveal-text="trigger"]')].map((r) => ({ trigger: r, text: r.querySelector('[data-reveal-text="text-white"]'), progress: null, words: [] })).filter((r) => r.text), d = [...t.querySelectorAll(".section.mask")].map((r) => ({ element: r, progress: null })), l = /* @__PURE__ */ new Map();
  let c = 0, f = !1, u = 0;
  const g = (r) => Math.max(0, Math.min(1, r));
  function p(r, m, v) {
    l.has(r) || (l.set(r, { attribute: m, property: v, attr: r.getAttribute(m), value: r.style.getPropertyValue(v), priority: r.style.getPropertyPriority(v) }), r.setAttribute(m, ""));
  }
  function I(r) {
    const m = l.get(r);
    if (!m) return;
    const { attribute: v, property: h, attr: L, value: k, priority: N } = m;
    L === null ? r.removeAttribute(v) : r.setAttribute(v, L), k ? r.style.setProperty(h, k, N) : r.style.removeProperty(h), l.delete(r);
  }
  function E() {
    s.forEach((r) => {
      const m = [...r.text.querySelectorAll(".gsap_split_word")];
      r.words.filter((v) => !(m.length ? m : [r.text]).includes(v)).forEach(I), r.words = m.length ? m : [r.text], r.words.forEach((v) => p(v, "data-env-about-word", "--env-about-opacity"));
    });
  }
  d.forEach(({ element: r }) => p(r, "data-env-about-mask", "--env-about-inset")), E();
  function T() {
    !f && !c && (c = e.requestAnimationFrame(b));
  }
  function b(r) {
    if (c = 0, f || !t.isConnected) return;
    if (e.document.documentElement.hasAttribute("data-env-transition-active") || t.hasAttribute("data-env-alt-reveal-wait")) {
      u = 0;
      return;
    }
    const m = e.innerHeight, v = i.matches || !u ? 1 : 1 - Math.exp(-Math.min(r - u, 64) / 90);
    u = r;
    let h = !1;
    const L = s.map((M) => {
      const C = M.trigger.getBoundingClientRect();
      return g((m * 0.65 - C.top) / Math.max(C.height, 1));
    }), k = d.map(({ element: M }) => g((m - M.getBoundingClientRect().top) / (m * 0.85)));
    function N(M, C) {
      return M.progress = M.progress === null ? C : M.progress + (C - M.progress) * v, Math.abs(C - M.progress) < 1e-3 ? M.progress = C : h = !0, i.matches ? 1 : M.progress;
    }
    s.forEach((M, C) => {
      const w = N(M, L[C]), S = 1 + 0.3 * (M.words.length - 1);
      M.words.forEach((G, P) => {
        const j = 0.1 + 0.9 * g(w * S - P * 0.3);
        G.style.setProperty("--env-about-opacity", j.toFixed(4));
      });
    }), d.forEach((M, C) => M.element.style.setProperty("--env-about-inset", `${((1 - N(M, k[C])) * 10).toFixed(4)}%`)), h ? T() : u = 0;
  }
  const O = new e.MutationObserver((r) => {
    r.some((m) => m.type === "childList") && E(), T();
  });
  O.observe(n, { childList: !0, subtree: !0 }), O.observe(t, { attributes: !0, attributeFilter: ["data-env-alt-reveal-wait"] }), O.observe(e.document.documentElement, { attributes: !0, attributeFilter: ["data-env-transition-active"] });
  const R = e.ResizeObserver ? new e.ResizeObserver(T) : null;
  return t.querySelectorAll(".section").forEach((r) => R?.observe(r)), e.addEventListener("scroll", T, { passive: !0, signal: a.signal }), e.addEventListener("resize", T, { signal: a.signal }), e.addEventListener("pageshow", T, { signal: a.signal }), i.addEventListener("change", T, { signal: a.signal }), T(), { destroy() {
    f = !0, a.abort(), O.disconnect(), R?.disconnect(), e.cancelAnimationFrame(c), o.remove(), [...l.keys()].forEach(I);
  } };
}
function dn(t, e = window) {
  if (!t) return () => {
  };
  const n = [...t.querySelectorAll("img.image-project[srcset], img.cover-project[srcset]")].filter((l) => /^\s*\d+(?:\.\d+)?px\s*$/.test(l.getAttribute("sizes") || "") && /\s\d+w(?:\s*,|\s*$)/.test(l.getAttribute("srcset") || ""));
  if (!n.length) return () => {
  };
  let a = !1, o;
  function i(l) {
    if (a || !t.isConnected || !l.isConnected) return;
    const c = l.clientWidth;
    if (!(c > 0)) return;
    const f = `${Math.ceil(c)}px`;
    l.getAttribute("sizes") !== f && l.setAttribute("sizes", f);
  }
  n.forEach(i);
  const s = e.ResizeObserver ? new e.ResizeObserver((l) => {
    l.forEach((c) => i(c.target));
  }) : null;
  n.forEach((l) => s?.observe(l));
  const d = () => {
    a || o != null || (o = e.requestAnimationFrame(() => {
      o = null, n.forEach(i);
    }));
  };
  return s || e.addEventListener("resize", d, { passive: !0 }), () => {
    a = !0, s?.disconnect(), e.removeEventListener("resize", d), o != null && e.cancelAnimationFrame(o);
  };
}
function cn() {
  window.ENVOrganicBlob?.destroy();
  const t = new AbortController(), e = t.signal, n = matchMedia("(prefers-reduced-motion: reduce)"), a = matchMedia("(hover: hover) and (pointer: fine)"), o = [];
  document.querySelectorAll('#env-sd-page [data-env-blob="orange"]').forEach((i) => {
    if (i.closest("[data-env-transition-snapshot]")) return;
    const s = document.createElement("div");
    s.className = "env-blob-background", s.setAttribute("aria-hidden", "true"), s.style.cssText = "position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit";
    const d = document.createElement("canvas");
    d.style.cssText = "display:block;width:100%;height:100%;filter:blur(32px)";
    const l = d.getContext("2d");
    if (!l) return;
    s.append(d), i.prepend(s);
    let c = 1, f = 1, u = 0, g = 0, p = 0, I = !1, E = !1, T = 0, b = 0, O = 0, R = 0, r = 0, m = 0;
    function v() {
      l.clearRect(0, 0, c, f);
      const S = n.matches ? 0 : p, G = Math.min(c * 0.38, 500) * 2.1 * 1.35, P = Math.min(f * 0.49, 350) * 2.1 * 0.78, j = c * 0.23 + O + Math.sin(S * 0.29) * c * 0.13, y = f * 0.98 + R + Math.cos(S * 0.23) * f * 0.075, A = [];
      for (let x = 0; x < 10; x++) {
        const U = x / 10 * Math.PI * 2, V = 1 + 0.55 * (0.2 * Math.sin(U * 3 + S * 0.33) + 0.13 * Math.cos(U * 2 - S * 0.25) + 0.07 * Math.sin(U * 5 + S * 0.17));
        A.push({ x: j + Math.cos(U) * G * V, y: y + Math.sin(U) * P * V });
      }
      l.beginPath(), A.forEach((x, U) => {
        const V = A[(U + 9) % 10], F = A[(U + 1) % 10];
        U || l.moveTo((V.x + x.x) / 2, (V.y + x.y) / 2), l.quadraticCurveTo(x.x, x.y, (x.x + F.x) / 2, (x.y + F.y) / 2);
      }), l.closePath(), l.save(), l.translate(j, y), l.scale(G / P, 1);
      const _ = l.createRadialGradient(-P * 0.12, -P * 0.2, 0, 0, 0, P * 0.94);
      [[0, 0.5], [0.28, 0.36], [0.6, 0.15], [0.82, 0.035], [1, 0]].forEach(([x, U]) => _.addColorStop(x, `rgba(238,69,43,${U})`)), l.fillStyle = _, l.fill(), l.restore();
    }
    function h() {
      if (!E || n.matches || !a.matches) {
        r = m = 0;
        return;
      }
      const S = i.getBoundingClientRect();
      r = ((T - S.left) / c - 0.5) * Math.min(c * 0.65, 760) * 0.7, m = ((b - S.top) / f - 0.5) * Math.min(f * 0.28, 180) * 0.7;
    }
    function L(S) {
      if (u = 0, !I || document.hidden) return;
      const G = Math.min((S - (g || S)) / 1e3, 0.05);
      g = S, n.matches || (p += G);
      const P = 1 - Math.exp(-G * 4.5);
      O += (r - O) * P, R += (m - R) * P, v(), n.matches || (u = requestAnimationFrame(L));
    }
    function k() {
      cancelAnimationFrame(u), u = 0, g = 0;
    }
    function N() {
      !u && I && !document.hidden && (g = 0, u = requestAnimationFrame(L));
    }
    function M() {
      E = !1, h();
    }
    const C = new ResizeObserver(() => {
      const S = i.getBoundingClientRect();
      c = Math.max(S.width, 1), f = Math.max(S.height, 1);
      const G = Math.min(devicePixelRatio || 1, 1.5);
      d.width = Math.round(c * G), d.height = Math.round(f * G), l.setTransform(G, 0, 0, G, 0, 0), h(), v();
    }), w = new IntersectionObserver((S) => {
      I = S[0].isIntersecting, I ? N() : k();
    });
    C.observe(i), w.observe(i), i.addEventListener("pointermove", (S) => {
      S.pointerType !== "touch" && (E = !0, T = S.clientX, b = S.clientY, h());
    }, { passive: !0, signal: e }), i.addEventListener("pointerleave", M, { signal: e }), window.addEventListener("scroll", h, { passive: !0, signal: e }), window.addEventListener("blur", M, { signal: e }), document.addEventListener("visibilitychange", () => document.hidden ? k() : N(), { signal: e }), n.addEventListener("change", () => {
      O = R = r = m = 0, v(), N();
    }, { signal: e }), a.addEventListener("change", M, { signal: e }), o.push(() => {
      k(), C.disconnect(), w.disconnect(), s.remove();
    });
  }), window.ENVOrganicBlob = { destroy() {
    t.abort(), o.forEach((i) => i()), window.ENVOrganicBlob === this && delete window.ENVOrganicBlob;
  } };
}
function Ce(t) {
  if (!t.querySelector(".section-animation-about, .section.hero-about + .section.about-second")) return;
  const e = t.querySelector("main.main-wrapper"), n = [...t.querySelectorAll(".navbar-logo-center")].find((i) => !e?.contains(i));
  if (!e || !n) return;
  const a = (i) => JSON.stringify([...i.querySelectorAll("a[href]")].map((s) => [s.getAttribute("href"), s.textContent.trim()])), o = a(n);
  e.querySelectorAll(".navbar-logo-center").forEach((i) => {
    i.querySelector(".navbar-brand-three") && a(i) === o && i.remove();
  });
}
function fn(t, e) {
  const n = e.querySelector('script[data-env-page-animation="about"], meta[data-env-page-animation="about"]'), a = n ? [...n.attributes].filter((i) => i.name === "data-env-page-animation" || i.name.startsWith("data-env-about-")) : [];
  if (t.querySelectorAll('[data-env-page-animation="about"]').forEach((i) => i.remove()), !a.length) return;
  const o = t.createElement("meta");
  a.forEach((i) => o.setAttribute(i.name, i.value)), t.head.append(o);
}
const un = `
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
`, pn = `
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
`, bn = `
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
`, mn = `
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
`, Ee = {
  responsive: un,
  legacy: pn,
  mask: bn,
  hero: mn
}, W = (t) => t.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "").replace(/\s+/g, ""), pe = /* @__PURE__ */ new Set(["start", "end", "distance", "distanceMobile", "blur", "downDuration", "downEase", "upDuration", "upEase"]);
function $e(t) {
  const e = {};
  let n = t;
  for (const a of ["firstGroup", "secondGroup"]) {
    const o = new RegExp(`const\\s+${a}\\s*=\\s*(\\{[\\s\\S]*?\\});`), i = n.match(o);
    if (!i) return null;
    let s;
    try {
      const d = i[1].replace(/\b([A-Za-z]\w*)\s*:/g, '"$1":').replace(/,\s*}/g, "}");
      s = JSON.parse(d);
    } catch {
      return null;
    }
    if (!s || Object.keys(s).length !== pe.size || Object.keys(s).some((d) => !pe.has(d))) return null;
    for (const d of pe) {
      const l = s[d];
      if (d === "start" || d === "end") {
        if (typeof l != "string" || !/^top\s+(?:\d+(?:\.\d+)?)%$/.test(l) || Number(l.match(/[\d.]+/)[0]) > 150) return null;
      } else if (d.endsWith("Ease")) {
        if (typeof l != "string" || !/^(?:none|linear|(?:power[0-4]|sine|expo|circ)\.(?:in|out|inOut))$/.test(l)) return null;
      } else {
        const c = d === "blur" ? 60 : d.includes("Duration") ? 5 : 2;
        if (typeof l != "number" || !Number.isFinite(l) || l < 0 || l > c) return null;
      }
    }
    e[a] = s, n = n.replace(o, `const ${a} = {};`);
  }
  return { groups: e, signature: W(n) };
}
const Ue = Object.fromEntries(["responsive", "legacy"].map((t) => [t, $e(Ee[t]).signature]));
function Ve(t) {
  const e = { sources: [], story: null, hero: !1, mask: !1 };
  for (const n of t.scripts) {
    if (n.src || !n.textContent.trim()) continue;
    const a = n.textContent;
    if (a.includes("ENVAboutPageTest")) {
      const o = $e(a);
      if (!o) continue;
      const i = Object.keys(Ue).find((s) => Ue[s] === o.signature);
      if (!i || e.story) continue;
      e.story = { groups: o.groups, responsive: i === "responsive" };
    } else if (W(a) === W(Ee.hero)) e.hero = !0;
    else if (W(a) === W(Ee.mask)) e.mask = !0;
    else continue;
    e.sources.push(a);
  }
  return e;
}
function gn(t) {
  const e = /* @__PURE__ */ new Map();
  return t.querySelectorAll('#env-sd-page .hero-about > .big--logo.middle[data-env-reveal="fade-scale"]').forEach((n) => {
    const a = t.createElement("div");
    a.setAttribute("data-env-about-logo-layer", ""), a.style.cssText = "display:grid;place-items:center;width:100%;height:100%;min-width:0;flex-shrink:0;", n.before(a), a.append(n), e.set(n, a);
  }), () => e.forEach((n, a) => {
    a.parentElement === n && n.replaceWith(a);
  });
}
function yn(t, e = !0) {
  const n = document.querySelector(".section-animation-about") || document.querySelector(".section.hero-about")?.parentElement;
  if (!n) return;
  const a = [...n.querySelectorAll(".bloc-big-text > img")];
  if (!a.length) return;
  window.ENVAboutPageTest?.destroy(), window.ENVAboutReveals?.destroy();
  const o = t.firstGroup, i = t.secondGroup, s = new Map(
    a.map((p) => [p, p.getAttribute("data-env-ignore")])
  );
  a.forEach((p) => {
    p.setAttribute("data-env-ignore", "");
  });
  let d = !1, l, c;
  const f = /* @__PURE__ */ new Set();
  function u() {
    d || (d = !0, cancelAnimationFrame(c), f.forEach((p) => p.kill()), f.clear(), l?.revert(), a.forEach((p) => {
      p.removeEventListener("load", g);
      const I = s.get(p);
      I === null ? p.removeAttribute("data-env-ignore") : p.setAttribute("data-env-ignore", I);
    }));
  }
  function g() {
    d || c || (c = requestAnimationFrame(() => {
      c = null, !d && n.isConnected && ScrollTrigger.refresh();
    }));
  }
  window.ENVAboutPageTest = { destroy: u }, window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    d || !window.gsap || !window.ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches || (gsap.registerPlugin(ScrollTrigger), l = gsap.matchMedia(), l.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)"
    }, (p) => {
      const I = e && p.conditions.mobile;
      return gsap.context(() => {
        gsap.set(n, { overflowX: "clip" }), a.forEach((E, T) => {
          const b = T < 4 ? o : i, O = T % 2 === 0 ? -1 : 1, R = { progress: 0 };
          let r;
          const m = gsap.fromTo(
            E,
            I ? {
              opacity: 0.1
            } : {
              x: () => O * Math.min(innerWidth * (innerWidth <= 767 ? b.distanceMobile : b.distance), 720),
              opacity: 0,
              filter: `blur(${b.blur}px)`
            },
            I ? {
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
          function v(h, L = !1) {
            if (r && (r.kill(), f.delete(r)), L) {
              R.progress = h.progress, m.progress(R.progress);
              return;
            }
            const k = h.direction >= 0;
            r = gsap.to(R, {
              progress: h.progress,
              duration: k ? b.downDuration : b.upDuration,
              ease: k ? b.downEase : b.upEase,
              onUpdate: () => m.progress(R.progress),
              onComplete: () => f.delete(r)
            }), f.add(r);
          }
          ScrollTrigger.create({
            trigger: E,
            start: b.start,
            end: b.end,
            invalidateOnRefresh: !0,
            onUpdate: (h) => v(h),
            onRefresh: (h) => {
              m.invalidate(), v(h, !0);
            }
          });
        });
      }, n), () => {
        f.forEach((E) => E.kill()), f.clear();
      };
    }), a.forEach((p) => {
      p.complete || p.addEventListener("load", g, { once: !0 });
    }), document.fonts?.ready.then(g), g());
  });
}
function En() {
  const t = document.querySelector(".section.hero-about"), e = t?.parentElement.querySelector(
    ":scope > .section.about-second"
  );
  if (!t || !e) return;
  const n = e.nextElementSibling, o = (t.closest("#env-sd-page") || document).querySelector("footer, .section.footer");
  t.__envReleaseCleanup?.();
  const i = new AbortController();
  let s = null;
  function d() {
    i.abort(), s !== null && cancelAnimationFrame(s), t.removeAttribute("data-env-hero-released"), delete t.__envReleaseCleanup;
  }
  function l() {
    if (s = null, !t.isConnected) return d();
    t.toggleAttribute(
      "data-env-hero-released",
      e.getBoundingClientRect().top <= 0 || n && n.getBoundingClientRect().top <= 0 || o && o.getBoundingClientRect().top < innerHeight
    );
  }
  function c() {
    s === null && (s = requestAnimationFrame(l));
  }
  t.__envReleaseCleanup = d, addEventListener("scroll", c, {
    passive: !0,
    signal: i.signal
  }), addEventListener("resize", c, {
    signal: i.signal
  }), addEventListener("pageshow", c, {
    signal: i.signal
  }), l();
}
function Tn() {
  window.ENVCTABlob?.destroy();
  const t = new AbortController(), { signal: e } = t, n = matchMedia("(hover: hover) and (pointer: fine)"), a = matchMedia("(prefers-reduced-motion: reduce)");
  let o = null, i = 0, s = 0, d = 0, l = 0, c = 0;
  function f() {
    cancelAnimationFrame(c), c = 0, o?.style.removeProperty("--blob-x"), o?.style.removeProperty("--blob-y"), o = null, i = s = d = l = 0;
  }
  function u() {
    if (c = 0, !o?.isConnected) {
      f();
      return;
    }
    i += (d - i) * 0.07, s += (l - s) * 0.07, o.style.setProperty("--blob-x", `${i.toFixed(2)}px`), o.style.setProperty("--blob-y", `${s.toFixed(2)}px`), Math.abs(d - i) + Math.abs(l - s) > 0.1 && (c = requestAnimationFrame(u));
  }
  function g(E, T) {
    d = E, l = T, c || (c = requestAnimationFrame(u));
  }
  function p() {
    o && g(0, 0);
  }
  document.addEventListener("pointermove", (E) => {
    if (!n.matches || a.matches || E.pointerType === "touch") {
      f();
      return;
    }
    const T = E.target instanceof Element ? E.target.closest(".section.cta") : null;
    if (!T) {
      p();
      return;
    }
    T !== o && (f(), o = T);
    const b = o.getBoundingClientRect();
    g(
      ((E.clientX - b.left) / b.width - 0.5) * Math.min(b.width * 0.3, 320),
      ((E.clientY - b.top) / b.height - 0.5) * Math.min(b.height * 0.12, 60)
    );
  }, { passive: !0, signal: e }), document.documentElement.addEventListener("pointerleave", p, { signal: e }), window.addEventListener("blur", p, { signal: e }), window.addEventListener("scroll", p, { passive: !0, signal: e });
  const I = () => {
    (!n.matches || a.matches) && f();
  };
  n.addEventListener("change", I, { signal: e }), a.addEventListener("change", I, { signal: e }), window.ENVCTABlob = {
    destroy() {
      t.abort(), f();
    }
  };
}
async function In({ visit: t, useMask: e, transition: n, root: a, lenis: o, mount: i }) {
  const s = e && t.animation.animate;
  s || (n.cleanup(), a?.removeAttribute("data-env-alt-reveal-wait"), o?.start()), await i({ deferReveals: s });
}
function Q(t, e = window, n = e.lenis) {
  const a = !t.history.popstate && t.scroll.reset && !(t.scroll.target ?? t.to.hash), o = a ? 0 : e.scrollY, i = a ? 0 : e.scrollX;
  a && e.scrollTo({ top: o, left: i, behavior: "instant" }), n?.resize(), n?.scrollTo(o, { immediate: !0, force: !0 });
}
const q = /* @__PURE__ */ new Set();
function vn(t = document, e = window) {
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
  return q.forEach((a) => a.cancel()), q.clear(), n.forEach(({ el: a }) => a.style.setProperty("transition", "none", "important")), () => {
    const a = n.map((o) => ({ ...o, after: e.getComputedStyle(o.el)[o.property] }));
    for (const { el: o, property: i, before: s, after: d, transition: l, priority: c } of a) {
      if (s !== d && !e.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const f = o.animate([{ [i]: s }, { [i]: d }], { duration: 400, easing: "ease", fill: "both" });
        q.add(f), f.finished.then(() => {
          f.cancel(), q.delete(f);
        }).catch(() => q.delete(f));
      }
      l ? o.style.setProperty("transition", l, c) : o.style.removeProperty("transition");
    }
  };
}
function hn(t, e = window) {
  const n = (t.getAnimations?.({ subtree: !0 }) || []).filter((l) => l.playState === "running");
  n.forEach((l) => l.pause());
  const a = (e.ScrollTrigger?.getAll() || []).filter((l) => l.enabled !== !1 && l.trigger && t.contains(l.trigger)), o = new Set(e.gsap?.getTweensOf([t, ...t.querySelectorAll("*")]) || []);
  a.forEach((l) => {
    l.animation && o.add(l.animation);
    const c = l.getTween?.();
    c && o.add(c);
  });
  const i = [...o].filter((l) => !l.paused());
  a.forEach((l) => l.disable(!1, !1)), i.forEach((l) => l.pause());
  const s = e.lenis, d = s && !s.isStopped;
  return d && s.stop(), () => {
    if (!t.isConnected) return;
    const l = e.ScrollTrigger?.getAll() || [];
    a.forEach((c) => {
      l.includes(c) && c.enable(!1, !1);
    }), i.forEach((c) => c.resume()), n.forEach((c) => {
      c.playState === "paused" && c.play();
    }), d && s.start();
  };
}
function wn({ doc: t = document, win: e = window } = {}) {
  let n, a, o, i, s, d = [], l = 0, c = [];
  const f = () => e.matchMedia("(prefers-reduced-motion: reduce)").matches, u = (b) => b.preventDefault();
  function g() {
    l++, d.forEach((b) => b.cancel()), d = [], n?.remove(), n = null, a = null, s?.(), s = null, c.forEach(({ element: b, style: O }) => {
      O === null ? b.removeAttribute("style") : b.setAttribute("style", O);
    }), c = [], o && (i === null ? o.removeAttribute("style") : o.setAttribute("style", i), o = null), e.removeEventListener("wheel", u, !0), e.removeEventListener("touchmove", u, !0), t.documentElement.removeAttribute("data-env-transition-active");
  }
  function p() {
    g();
    const b = t.querySelector("#env-sd-page");
    if (!b || f()) return;
    const O = e.performance.now();
    s = hn(b, e);
    const R = b.cloneNode(!0), r = [b, ...b.querySelectorAll("*")], m = [R, ...R.querySelectorAll("*")], v = [], h = [], L = r.map((y) => y.getBoundingClientRect()), k = L[0].width > 0, N = (y) => y.width > 0 && y.height > 0 && y.bottom > -e.innerHeight * 0.25 && y.top < e.innerHeight * 1.35 && y.right > -e.innerWidth * 0.1 && y.left < e.innerWidth * 1.1, M = ".main-row, .project-work, .project-row, .project-item.work.left, .project-item.work.right", C = /* @__PURE__ */ new Set([b]);
    r.forEach((y, A) => {
      if (!k || N(L[A]) || y.matches(M) || y.parentElement === b || y.parentElement?.matches("main.main-wrapper"))
        for (let _ = y; _ && b.contains(_); _ = _.parentElement) C.add(_);
    }), m.forEach((y, A) => {
      const _ = e.getComputedStyle(r[A]);
      if (C.has(r[A])) {
        const x = [];
        for (let U = 0; U < _.length; U++) {
          const V = _[U];
          x.push(`${V}:${_.getPropertyValue(V)}`);
        }
        y.style.cssText = x.join(";");
      }
      _.position === "sticky" && ((!k || N(L[A])) && v.push({ element: y, rect: L[A] }), y.style.position = "relative", y.style.inset = "auto"), r[A].matches(".main-row, .project-work, .project-row") && (!k || N(L[A])) && h.push({ element: y, rect: L[A] }), y.style.setProperty("animation", "none", "important"), y.style.setProperty("transition", "none", "important"), y.classList.remove("w-slider", "w-slide", "w-slider-mask", "w-slider-nav", "w-slider-dot"), y.classList.remove("footer"), r[A].matches(".project-row, .project-work, .project-item.work.left, .project-item.work.right") && y.removeAttribute("class"), y.classList.remove("step-single-item", "bg-services-wrapper"), r[A].closest('[data-services="reveal"]') && y.removeAttribute("class");
    });
    const w = r.map((y, A) => ({ element: y, copy: m[A] })).filter(({ element: y }) => y.parentElement === b || y.parentElement?.matches("main.main-wrapper")).filter(({ element: y }) => !y.matches("main.main-wrapper")).map(({ element: y, copy: A }) => ({ copy: A, rect: L[r.indexOf(y)] }));
    R.querySelectorAll("script").forEach((y) => y.remove()), [R, ...R.querySelectorAll("*")].forEach((y) => {
      y.removeAttribute("id"), y.removeAttribute("data-services"), y.removeAttribute("data-reveal-text");
      for (const A of [...y.attributes]) (A.name.startsWith("data-env-") || A.name.startsWith("data-w-id")) && y.removeAttribute(A.name);
    });
    const S = b.querySelectorAll("canvas");
    R.querySelectorAll("canvas").forEach((y, A) => {
      const _ = S[A];
      y.width = _.width, y.height = _.height;
      try {
        y.getContext("2d")?.drawImage(_, 0, 0);
      } catch {
      }
    });
    const G = new Map(r.filter((y) => y.tagName === "VIDEO").map((y) => [y, L[r.indexOf(y)]])), P = b.querySelectorAll("video");
    R.querySelectorAll("video").forEach((y, A) => {
      const _ = P[A], x = t.createElement("canvas");
      x.style.cssText = y.style.cssText, x.className = y.className;
      const U = e.getComputedStyle(_);
      for (const V of ["position", "top", "left", "right", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "objectFit", "objectPosition", "transform", "zIndex", "marginTop", "marginRight", "marginBottom", "marginLeft", "display", "boxSizing", "borderRadius"]) x.style[V] = U[V];
      if (k && !N(G.get(_))) {
        const V = t.createElement("div");
        V.style.cssText = x.style.cssText, y.replaceWith(V);
        return;
      }
      x.width = _.videoWidth || 320, x.height = _.videoHeight || 180;
      try {
        if (_.readyState < 2) throw Error("Video frame unavailable");
        x.getContext("2d").drawImage(_, 0, 0, x.width, x.height), y.replaceWith(x);
      } catch {
        const F = _.poster || _.closest(".w-background-video")?.getAttribute("data-poster-url");
        if (F) {
          const X = t.createElement("img");
          X.src = F, X.style.cssText = x.style.cssText, X.className = y.className, y.replaceWith(X);
        } else y.remove();
      }
    }), R.style.cssText = `position:absolute;left:0;top:${-e.scrollY}px;width:100%;margin:0;background:#fff;pointer-events:none;z-index:0;`, n = t.createElement("div"), n.dataset.envTransitionSnapshot = "", n.dataset.envIgnore = "", n.setAttribute("aria-hidden", "true"), n.inert = !0, n.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:8;background:#fff;transform-origin:50% 50%;", a = t.createElement("div"), a.dataset.envTransitionShade = "", a.style.cssText = "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:1;", n.append(R, a), t.body.append(n), w.map(({ copy: y, rect: A }) => {
      const _ = y.getBoundingClientRect();
      return { element: y, x: A.left - _.left, y: A.top - _.top };
    }).forEach(({ element: y, x: A, y: _ }) => {
      if (Math.abs(A) < 0.1 && Math.abs(_) < 0.1) return;
      const x = y.style.transform;
      y.style.transform = `translate(${A}px,${_}px) ${x === "none" ? "" : x}`;
    }), h.forEach(({ element: y, rect: A }) => {
      const _ = y.getBoundingClientRect(), x = A.left - _.left, U = A.top - _.top;
      if (Math.abs(x) < 0.1 && Math.abs(U) < 0.1) return;
      const V = y.style.transform;
      y.style.transform = `translate(${x}px,${U}px) ${V === "none" ? "" : V}`;
    }), v.forEach(({ element: y, rect: A }) => {
      const _ = y.getBoundingClientRect(), x = A.left - _.left, U = A.top - _.top;
      if (Math.abs(x) < 0.1 && Math.abs(U) < 0.1) return;
      const V = y.style.transform;
      y.style.transform = `translate(${x}px,${U}px) ${V === "none" ? "" : V}`;
    }), n.dataset.envCaptureMs = String(Math.round(e.performance.now() - O)), t.documentElement.setAttribute("data-env-transition-active", ""), e.addEventListener("wheel", u, { capture: !0, passive: !1 }), e.addEventListener("touchmove", u, { capture: !0, passive: !1 });
  }
  function I() {
    if (!n || f() || d.length) return;
    const b = { duration: 1200, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" };
    d = [
      a.animate([{ opacity: 0 }, { opacity: 0.08 }], b)
    ];
  }
  function E(b) {
    !n || f() || o === b || (o = b, i = b.getAttribute("style"), c = [...b.querySelectorAll(".section.hero-about")].filter((O) => e.getComputedStyle(O).position === "fixed").map((O) => ({ element: O, style: O.getAttribute("style"), rect: O.getBoundingClientRect() })), Object.assign(b.style, { display: "flow-root", position: "relative", zIndex: "9", clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)", backgroundColor: "#fff", willChange: "clip-path" }), c.forEach(({ element: O, rect: R }) => {
      Object.assign(O.style, { position: "absolute", top: "0px", left: "0px", right: "auto", bottom: "auto", margin: "0px", width: `${R.width}px`, height: `${R.height}px` });
      const r = O.getBoundingClientRect();
      O.style.left = `${R.left - r.left}px`, O.style.top = `${R.top - r.top}px`;
    }));
  }
  async function T(b) {
    if (!n || f()) {
      g();
      return;
    }
    o || E(b);
    const O = l, R = -b.getBoundingClientRect().top, r = e.innerHeight, m = `polygon(0 ${R + r}px,100% ${R + r}px,100% 100%,0 100%)`, v = `polygon(0 ${R}px,100% ${R}px,100% 100%,0 100%)`, h = { duration: 850, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" }, L = d.length ? Number(e.getComputedStyle(a).opacity) : 0;
    d.forEach((N) => N.cancel()), d = [
      n.animate([{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-12vh) scale(1.04)" }], h),
      b.animate([{ clipPath: m }, { clipPath: v }], h),
      a.animate([{ opacity: L }, { opacity: 0.35 }], h)
    ];
    const k = t.timeline?.currentTime;
    k != null && d.forEach((N) => {
      N.startTime = k;
    }), await Promise.all(d.map((N) => N.finished.catch(() => {
    }))), O === l && g();
  }
  return { capture: p, depart: I, prepare: E, reveal: T, cleanup: g };
}
const be = /* @__PURE__ */ new WeakMap();
function me(t, e, n, a) {
  if (!t && !be.has(e))
    return !1;
  const o = be.get(e) ?? /* @__PURE__ */ new WeakMap();
  be.set(e, o);
  const i = o.get(n) ?? /* @__PURE__ */ new Set();
  o.set(n, i);
  const s = i.has(a);
  return t ? i.add(a) : i.delete(a), s && t;
}
function On(t, e) {
  let n = t.target;
  if (n instanceof Text && (n = n.parentElement), n instanceof Element && t.currentTarget instanceof Node) {
    const a = n.closest(e);
    if (a && t.currentTarget.contains(a))
      return a;
  }
}
function Ke(t, e, n, a = {}) {
  if (Array.isArray(e)) {
    for (const I of e)
      Ke(t, I, n, a);
    return;
  }
  const o = e, { signal: i, base: s = document } = a;
  if (i?.aborted)
    return;
  const { once: d, ...l } = a, c = s instanceof Document ? s.documentElement : s, f = !!(typeof a == "object" ? a.capture : a), u = (I) => {
    const E = On(I, String(t));
    if (E) {
      const T = Object.assign(I, { delegateTarget: E });
      n.call(c, T), d && (c.removeEventListener(o, u, l), me(!1, c, n, g));
    }
  }, g = JSON.stringify({ selector: t, type: o, capture: f });
  me(!0, c, n, g) || c.addEventListener(o, u, l), i?.addEventListener("abort", () => {
    me(!1, c, n, g);
  });
}
function B() {
  return B = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) ({}).hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, B.apply(null, arguments);
}
const Ze = (t, e) => String(t).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || e || "", H = ({ hash: t } = {}) => window.location.pathname + window.location.search + (t ? window.location.hash : ""), Ln = (t, e = {}) => {
  const n = B({ url: t = t || H({ hash: !0 }), random: Math.random(), source: "swup" }, e);
  window.history.pushState(n, "", t);
}, $ = (t = null, e = {}) => {
  t = t || H({ hash: !0 });
  const n = B({}, window.history.state || {}, { url: t, random: Math.random(), source: "swup" }, e);
  window.history.replaceState(n, "", t);
}, Sn = (t, e, n, a) => {
  const o = new AbortController();
  return a = B({}, a, { signal: o.signal }), Ke(t, e, n, a), { destroy: () => o.abort() };
};
let z = class se extends URL {
  constructor(e, n = document.baseURI) {
    super(e.toString(), n), Object.setPrototypeOf(this, se.prototype);
  }
  get url() {
    return this.pathname + this.search;
  }
  static fromElement(e) {
    const n = e.getAttribute("href") || e.getAttribute("xlink:href") || "";
    return new se(n);
  }
  static fromUrl(e) {
    return new se(e);
  }
};
class te extends Error {
  constructor(e, n) {
    super(e), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = n.url, this.status = n.status, this.aborted = n.aborted || !1, this.timedOut = n.timedOut || !1;
  }
}
async function Nn(t, e = {}) {
  var n;
  t = z.fromUrl(t).url;
  const { visit: a = this.visit } = e, o = B({}, this.options.requestHeaders, e.headers), i = (n = e.timeout) != null ? n : this.options.timeout, s = new AbortController(), { signal: d } = s;
  e = B({}, e, { headers: o, signal: d });
  let l, c = !1, f = null;
  i && i > 0 && (f = setTimeout(() => {
    c = !0, s.abort("timeout");
  }, i));
  try {
    l = await this.hooks.call("fetch:request", a, { url: t, options: e }, (T, { url: b, options: O }) => fetch(b, O)), f && clearTimeout(f);
  } catch (T) {
    throw c ? (this.hooks.call("fetch:timeout", a, { url: t }), new te(`Request timed out: ${t}`, { url: t, timedOut: c })) : T?.name === "AbortError" || d.aborted ? new te(`Request aborted: ${t}`, { url: t, aborted: !0 }) : T;
  }
  const { status: u, url: g } = l, p = await l.text();
  if (u === 500) throw this.hooks.call("fetch:error", a, { status: u, response: l, url: g }), new te(`Server error: ${g}`, { status: u, url: g });
  if (!p) throw new te(`Empty response: ${g}`, { status: u, url: g });
  const { url: I } = z.fromUrl(g), E = { url: I, html: p };
  return !a.cache.write || e.method && e.method !== "GET" || t !== I || this.cache.set(E.url, E), E;
}
class Rn {
  constructor(e) {
    this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = e;
  }
  get size() {
    return this.pages.size;
  }
  get all() {
    const e = /* @__PURE__ */ new Map();
    return this.pages.forEach((n, a) => {
      e.set(a, B({}, n));
    }), e;
  }
  has(e) {
    return this.pages.has(this.resolve(e));
  }
  get(e) {
    const n = this.pages.get(this.resolve(e));
    return n && B({}, n);
  }
  set(e, n) {
    n = B({}, n, { url: e = this.resolve(e) }), this.pages.set(e, n), this.swup.hooks.callSync("cache:set", void 0, { page: n });
  }
  update(e, n) {
    e = this.resolve(e);
    const a = B({}, this.get(e), n, { url: e });
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
    const { url: n } = z.fromUrl(e);
    return this.swup.resolveUrl(n);
  }
}
const Te = (t, e = document) => e.querySelector(t), Ae = (t, e = document) => Array.from(e.querySelectorAll(t)), Je = () => new Promise((t) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t();
    });
  });
});
function en(t) {
  return !!t && (typeof t == "object" || typeof t == "function") && typeof t.then == "function";
}
function An(t, e = []) {
  return new Promise((n, a) => {
    const o = t(...e);
    en(o) ? o.then(n, a) : n(o);
  });
}
function Ge(t, e) {
  const n = t?.closest(`[${e}]`);
  return n != null && n.hasAttribute(e) ? n?.getAttribute(e) || !0 : void 0;
}
class kn {
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
    return this.selector.trim() ? Ae(this.selector) : [];
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
class nn {
  constructor(e, n) {
    this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
    const { to: a, from: o, hash: i, el: s, event: d } = n;
    this.id = Math.random(), this.state = 1, this.from = { url: o ?? e.location.url, hash: e.location.hash }, this.to = { url: a, hash: i }, this.containers = e.options.containers, this.animation = { animate: !0, wait: !1, name: void 0, native: e.options.native, scope: e.options.animationScope, selector: e.options.animationSelector }, this.trigger = { el: s, event: d }, this.cache = { read: e.options.cache, write: e.options.cache }, this.history = { action: "push", popstate: !1, direction: void 0 }, this.scroll = { reset: !0, target: void 0 }, this.meta = {};
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
function _n(t) {
  return new nn(this, t);
}
class xn {
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
    const i = B({}, a, { id: ++this.nextHookId, hook: e, handler: n });
    return o.set(n, i), () => this.off(e, n);
  }
  before(e, n, a = {}) {
    return this.on(e, n, B({}, a, { before: !0 }));
  }
  replace(e, n, a = {}) {
    return this.on(e, n, B({}, a, { replace: !0 }));
  }
  once(e, n, a = {}) {
    return this.on(e, n, B({}, a, { once: !0 }));
  }
  off(e, n) {
    const a = this.get(e);
    a && n ? a.delete(n) || console.warn(`Handler for hook '${e}' not found.`) : a && a.clear();
  }
  async call(e, n, a, o) {
    const [i, s, d] = this.parseCallArgs(e, n, a, o), { before: l, handler: c, after: f } = this.getHandlers(e, d);
    await this.run(l, i, s);
    const [u] = await this.run(c, i, s, !0);
    return await this.run(f, i, s), this.dispatchDomEvent(e, i, s), u;
  }
  callSync(e, n, a, o) {
    const [i, s, d] = this.parseCallArgs(e, n, a, o), { before: l, handler: c, after: f } = this.getHandlers(e, d);
    this.runSync(l, i, s);
    const [u] = this.runSync(c, i, s, !0);
    return this.runSync(f, i, s), this.dispatchDomEvent(e, i, s), u;
  }
  parseCallArgs(e, n, a, o) {
    return n instanceof nn || typeof n != "object" && typeof a != "function" ? [n, a, o] : [void 0, n, a];
  }
  async run(e, n = this.swup.visit, a, o = !1) {
    const i = [];
    for (const { hook: s, handler: d, defaultHandler: l, once: c } of e) if (n == null || !n.done) {
      c && this.off(s, d);
      try {
        const f = await An(d, [n, a, l]);
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
    for (const { hook: s, handler: d, defaultHandler: l, once: c } of e) if (n == null || !n.done) {
      c && this.off(s, d);
      try {
        const f = d(n, a, l);
        i.push(f), en(f) && console.warn(`Swup will not await Promises in handler for synchronous hook '${s}'.`);
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
    const o = Array.from(a.values()), i = this.sortRegistrations, s = o.filter(({ before: u, replace: g }) => u && !g).sort(i), d = o.filter(({ replace: u }) => u).filter((u) => !0).sort(i), l = o.filter(({ before: u, replace: g }) => !u && !g).sort(i), c = d.length > 0;
    let f = [];
    if (n && (f = [{ id: 0, hook: e, handler: n }], c)) {
      const u = d.length - 1, { handler: g, once: p } = d[u], I = (E) => {
        const T = d[E - 1];
        return T ? (b, O) => T.handler(b, O, I(E - 1)) : n;
      };
      f = [{ id: 0, hook: e, once: p, handler: g, defaultHandler: I(u) }];
    }
    return { found: !0, before: s, handler: f, after: l, replaced: c };
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
    return [n, a.reduce((o, i) => B({}, o, { [i]: !0 }), {})];
  }
}
const Mn = (t) => {
  if (t && t.charAt(0) === "#" && (t = t.substring(1)), !t) return null;
  const e = decodeURIComponent(t);
  let n = document.getElementById(t) || document.getElementById(e) || Te(`a[name='${CSS.escape(t)}']`) || Te(`a[name='${CSS.escape(e)}']`);
  return n || t !== "top" || (n = document.body), n;
}, ae = "transition", ge = "animation";
async function Cn({ selector: t, elements: e }) {
  if (t === !1 && !e) return;
  let n = [];
  if (e) n = Array.from(e);
  else if (t && (n = Ae(t, document.body), !n.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${t}\``);
  const a = n.map((o) => (function(i) {
    const { type: s, timeout: d, propCount: l } = (function(c) {
      const f = window.getComputedStyle(c), u = ie(f, `${ae}Delay`), g = ie(f, `${ae}Duration`), p = Pe(u, g), I = ie(f, `${ge}Delay`), E = ie(f, `${ge}Duration`), T = Pe(I, E), b = Math.max(p, T), O = b > 0 ? p > T ? ae : ge : null;
      return { type: O, timeout: b, propCount: O ? O === ae ? g.length : E.length : 0 };
    })(i);
    return !(!s || !d) && new Promise((c) => {
      const f = `${s}end`, u = performance.now();
      let g = 0;
      const p = () => {
        i.removeEventListener(f, I), c();
      }, I = (E) => {
        E.target === i && ((performance.now() - u) / 1e3 < E.elapsedTime || ++g >= l && p());
      };
      setTimeout(() => {
        g < l && p();
      }, d + 1), i.addEventListener(f, I);
    });
  })(o)).filter((o) => o !== !1);
  a.length ? await Promise.all(a) : t && console.warn(`[swup] No CSS animation duration defined on elements matching \`${t}\``);
}
function ie(t, e) {
  return (t[e] || "").split(", ");
}
function Pe(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((n, a) => Be(n) + Be(t[a])));
}
function Be(t) {
  return 1e3 * parseFloat(t);
}
function Un(t, e = {}, n = {}) {
  if (typeof t != "string") throw new Error("swup.navigate() requires a URL parameter");
  if (this.shouldIgnoreVisit(t, { el: n.el, event: n.event })) return void window.location.assign(t);
  const { url: a, hash: o } = z.fromUrl(t), i = this.createVisit(B({}, n, { to: a, hash: o }));
  this.performNavigation(i, e);
}
async function Vn(t, e = {}) {
  if (this.navigating) {
    if (this.visit.state >= 6) return t.state = 2, void (this.onVisitEnd = () => this.performNavigation(t, e));
    await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
  }
  this.navigating = !0, this.visit = t;
  const { el: n } = t.trigger;
  e.referrer = e.referrer || this.location.url, e.animate === !1 && (t.animation.animate = !1), t.animation.animate || this.classes.clear();
  const a = e.history || Ge(n, "data-swup-history");
  typeof a == "string" && ["push", "replace"].includes(a) && (t.history.action = a);
  const o = e.animation || Ge(n, "data-swup-animation");
  var i, s;
  typeof o == "string" && (t.animation.name = o), t.meta = e.meta || {}, typeof e.cache == "object" ? (t.cache.read = (i = e.cache.read) != null ? i : t.cache.read, t.cache.write = (s = e.cache.write) != null ? s : t.cache.write) : e.cache !== void 0 && (t.cache = { read: !!e.cache, write: !!e.cache }), delete e.cache;
  try {
    await this.hooks.call("visit:start", t, void 0), t.state = 3;
    const d = this.hooks.call("page:load", t, { options: e }, async (c, f) => {
      let u;
      return c.cache.read && (u = this.cache.get(c.to.url)), f.page = u || await this.fetchPage(c.to.url, f.options), f.cache = !!u, f.page;
    });
    d.then(({ html: c }) => {
      t.advance(5), t.to.html = c, t.to.document = new DOMParser().parseFromString(c, "text/html");
    });
    const l = t.to.url + t.to.hash;
    if (t.history.popstate || (t.history.action === "replace" || t.to.url === this.location.url ? $(l) : (this.currentHistoryIndex++, Ln(l, { index: this.currentHistoryIndex }))), this.location = z.fromUrl(l), t.history.popstate && this.classes.add("is-popstate"), t.animation.name && this.classes.add(`to-${Ze(t.animation.name)}`), t.animation.wait && await d, t.ignored) throw new Error(`Visit to ${t.to.url} manually ignored`);
    if (t.done || (await this.hooks.call("visit:transition", t, void 0, async () => {
      if (!t.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(t, await d);
      t.advance(4), await this.animatePageOut(t), t.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(t, await d)).finished : await this.renderPage(t, await d), await this.animatePageIn(t);
    }), t.done)) return;
    await this.hooks.call("visit:end", t, void 0, () => this.classes.clear()), t.state = 7, this.navigating = !1, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
  } catch (d) {
    if (!d || d != null && d.aborted) return void t.advance(8);
    if (t.ignored) return void je.call(this, t);
    await this.hooks.call("visit:fail", t, { error: d }, (l, { error: c }) => {
      console.error(c), je.call(this, l);
    }), t.advance(9);
  } finally {
    delete t.to.document, this.visit === t && (this.navigating = !1);
  }
}
function je(t) {
  const e = t.to.url + t.to.hash;
  H() === t.to.url ? (window.removeEventListener("popstate", this.handlePopState), window.addEventListener("popstate", () => window.location.assign(e), { once: !0 }), window.history.back()) : window.location.assign(e);
}
const Gn = async function(t) {
  await this.hooks.call("animation:out:start", t, void 0, () => {
    this.classes.add("is-changing", "is-animating", "is-leaving");
  }), await this.hooks.call("animation:out:await", t, { skip: !1 }, (e, { skip: n }) => {
    if (!n) return this.awaitAnimations({ selector: e.animation.selector });
  }), await this.hooks.call("animation:out:end", t, void 0);
}, Pn = function(t) {
  var e;
  const n = t.to.document;
  if (!n) return !1;
  const a = ((e = n.querySelector("title")) == null ? void 0 : e.innerText) || "";
  document.title = a;
  const o = Ae('[data-swup-persist]:not([data-swup-persist=""])'), i = t.containers.map((s) => {
    const d = document.querySelector(s), l = n.querySelector(s);
    return d && l ? (d.replaceWith(l.cloneNode(!0)), !0) : (d || console.warn(`[swup] Container missing in current document: ${s}`), l || console.warn(`[swup] Container missing in incoming document: ${s}`), !1);
  }).filter(Boolean);
  return o.forEach((s) => {
    const d = s.getAttribute("data-swup-persist"), l = Te(`[data-swup-persist="${d}"]`);
    l && l !== s && l.replaceWith(s);
  }), i.length === t.containers.length;
}, Bn = function(t) {
  const e = { behavior: "auto" }, { target: n, reset: a } = t.scroll, o = n ?? t.to.hash;
  let i = !1;
  return o && (i = this.hooks.callSync("scroll:anchor", t, { hash: o, options: e }, (s, { hash: d, options: l }) => {
    const c = this.getAnchorElement(d);
    return c && c.scrollIntoView(l), !!c;
  })), a && !i && (i = this.hooks.callSync("scroll:top", t, { options: e }, (s, { options: d }) => (window.scrollTo(B({ top: 0, left: 0 }, d)), !0))), i;
}, jn = async function(t) {
  if (t.done) return;
  const e = this.hooks.call("animation:in:await", t, { skip: !1 }, (n, { skip: a }) => {
    if (!a) return this.awaitAnimations({ selector: n.animation.selector });
  });
  await Je(), await this.hooks.call("animation:in:start", t, void 0, () => {
    this.classes.remove("is-animating");
  }), await e, await this.hooks.call("animation:in:end", t, void 0);
}, Yn = async function(t, e) {
  if (t.done) return;
  t.advance(6);
  const { url: n } = e;
  this.isSameResolvedUrl(H(), n) || ($(n), this.location = z.fromUrl(n), t.to.url = this.location.url, t.to.hash = this.location.hash), await this.hooks.call("content:replace", t, { page: e }, (a, {}) => {
    if (this.classes.remove("is-leaving"), a.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(a)) throw new Error("[swup] Container mismatch, aborting");
    a.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), a.animation.name && this.classes.add(`to-${Ze(a.animation.name)}`));
  }), await this.hooks.call("content:scroll", t, void 0, () => this.scrollToContent(t)), await this.hooks.call("page:view", t, { url: this.location.url, title: document.title });
}, zn = function(t) {
  var e;
  if (e = t, !!e?.isSwupPlugin) {
    if (t.swup = this, !t._checkRequirements || t._checkRequirements()) return t._beforeMount && t._beforeMount(), t.mount(), this.plugins.push(t), this.plugins;
  } else console.error("Not a swup plugin instance", t);
};
function Dn(t) {
  const e = this.findPlugin(t);
  if (e) return e.unmount(), e._afterUnmount && e._afterUnmount(), this.plugins = this.plugins.filter((n) => n !== e), this.plugins;
  console.error("No such plugin", e);
}
function Fn(t) {
  return this.plugins.find((e) => typeof t == "string" ? [`Swup${t}`, t].includes(e.name) : e === t);
}
function Xn(t) {
  if (typeof this.options.resolveUrl != "function") return console.warn("[swup] options.resolveUrl expects a callback function."), t;
  const e = this.options.resolveUrl(t);
  return e && typeof e == "string" ? e.startsWith("//") || e.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), t) : e : (console.warn("[swup] options.resolveUrl needs to return a url"), t);
}
function Hn(t, e) {
  return this.resolveUrl(t) === this.resolveUrl(e);
}
const Qn = { animateHistoryBrowsing: !1, animationSelector: '[class*="transition-"]', animationScope: "html", cache: !0, containers: ["#swup"], hooks: {}, ignoreVisit: (t, { el: e } = {}) => !(e == null || !e.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: !1, plugins: [], resolveUrl: (t) => t, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (t) => {
  var e;
  return ((e = t.state) == null ? void 0 : e.source) !== "swup";
}, timeout: 0 };
class qn {
  get currentPageUrl() {
    return this.location.url;
  }
  constructor(e = {}) {
    var n, a;
    this.version = "4.10.0", this.options = void 0, this.defaults = Qn, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = z.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = !1, this.onVisitEnd = void 0, this.use = zn, this.unuse = Dn, this.findPlugin = Fn, this.log = () => {
    }, this.navigate = Un, this.performNavigation = Vn, this.createVisit = _n, this.delegateEvent = Sn, this.fetchPage = Nn, this.awaitAnimations = Cn, this.renderPage = Yn, this.replaceContent = Pn, this.animatePageIn = jn, this.animatePageOut = Gn, this.scrollToContent = Bn, this.getAnchorElement = Mn, this.getCurrentUrl = H, this.resolveUrl = Xn, this.isSameResolvedUrl = Hn, this.options = B({}, this.defaults, e), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new Rn(this), this.classes = new kn(this), this.hooks = new xn(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = (n = (a = window.history.state) == null ? void 0 : a.index) != null ? n : 1, this.enable();
  }
  async enable() {
    var e;
    const { linkSelector: n } = this.options;
    this.clickDelegate = this.delegateEvent(n, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((a) => this.use(a));
    for (const [a, o] of Object.entries(this.options.hooks)) {
      const [i, s] = this.hooks.parseName(a);
      this.hooks.on(i, o, s);
    }
    ((e = window.history.state) == null ? void 0 : e.source) !== "swup" && $(null, { index: this.currentHistoryIndex }), await Je(), await this.hooks.call("enable", void 0, void 0, () => {
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
    const { origin: o, url: i, hash: s } = z.fromUrl(e);
    return o !== window.location.origin || !(!n || !this.triggerWillOpenNewWindow(n)) || !!this.options.ignoreVisit(i + s, { el: n, event: a });
  }
  handleLinkClick(e) {
    const n = e.delegateTarget, { href: a, url: o, hash: i } = z.fromElement(n);
    if (this.shouldIgnoreVisit(a, { el: n, event: e })) return;
    if (this.navigating && o === this.visit.to.url) return void e.preventDefault();
    const s = this.createVisit({ to: o, hash: i, el: n, event: e });
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? this.hooks.callSync("link:newtab", s, { href: a }) : e.button === 0 && this.hooks.callSync("link:click", s, { el: n, event: e }, () => {
      var d;
      const l = (d = s.from.url) != null ? d : "";
      e.preventDefault(), o && o !== l ? this.isSameResolvedUrl(o, l) || this.performNavigation(s) : i ? this.hooks.callSync("link:anchor", s, { hash: i }, () => {
        $(o + i), this.scrollToContent(s);
      }) : this.hooks.callSync("link:self", s, void 0, () => {
        this.options.linkToSelf === "navigate" ? this.performNavigation(s) : ($(o), this.scrollToContent(s));
      });
    });
  }
  handlePopState(e) {
    var n, a, o, i;
    const s = (n = (a = e.state) == null ? void 0 : a.url) != null ? n : window.location.href;
    if (this.options.skipPopStateHandling(e) || this.isSameResolvedUrl(H(), this.location.url)) return;
    const { url: d, hash: l } = z.fromUrl(s), c = this.createVisit({ to: d, hash: l, event: e });
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
function Wn(t, { doc: e = document, win: n = window, fetchHTML: a = fetch, now: o = Date.now, ttl: i = 3e5, limit: s = 8, delay: d = 1200, concurrency: l = 1, pendingWait: c = 180, warmPage: f } = {}) {
  const u = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), I = new AbortController();
  let E, T = !1, b = !1;
  const O = n.navigator.connection, R = () => O?.saveData || /(^|-)2g$/.test(O?.effectiveType || "");
  function r() {
    for (const [w, S] of u) o() - S >= i && (t.cache.delete(w), u.delete(w));
    for (; u.size > s; ) {
      const w = u.keys().next().value;
      t.cache.delete(w), u.delete(w);
    }
  }
  const m = (w, { page: S }) => {
    u.delete(S.url), u.set(S.url, o()), r();
  };
  t.hooks.on("cache:set", m);
  for (const [w] of t.cache.all || []) u.set(w, o());
  r();
  function v(w) {
    if (!w || w.closest("[data-no-swup]") || w.matches('[aria-current="page"],.w--current') || w.hasAttribute("download") || w.hasAttribute("target")) return;
    const S = new URL(w.getAttribute("href"), n.location.href);
    if (!(S.origin !== n.location.origin || S.search || S.hash || S.pathname === n.location.pathname || /\.[a-z0-9]+$/i.test(S.pathname)))
      return S.pathname;
  }
  async function h(w) {
    if (r(), b || R() || t.cache.has(w)) return;
    if (g.has(w)) return g.get(w);
    const S = new AbortController();
    p.set(w, S);
    const G = n.setTimeout(() => S.abort(), 4e3), P = (async () => {
      try {
        const j = await a(w, { headers: { "X-Requested-With": "swup", Accept: "text/html" }, credentials: "same-origin", signal: S.signal, priority: "low" });
        if (!j.ok || !j.headers.get("content-type")?.includes("text/html")) return;
        const y = new URL(j.url || w, n.location.href);
        if (y.origin !== n.location.origin || y.pathname !== w || y.search) return;
        const A = await j.text();
        !b && !S.signal.aborted && A && A.length < 1e6 && (t.cache.set(w, { url: w, html: A }), f && Promise.resolve().then(() => f(A)).catch(() => {
        }));
      } catch {
      } finally {
        n.clearTimeout(G), p.get(w) === S && (p.delete(w), g.delete(w));
      }
    })();
    return g.set(w, P), P;
  }
  function L() {
    n.clearTimeout(E), !(b || R()) && (E = n.setTimeout(async () => {
      if (T || e.hidden || b) return;
      const w = [...new Set([...e.querySelectorAll(".navbar-logo-center a[href]")].map(v).filter(Boolean))].slice(0, 3);
      let S = 0;
      const G = async () => {
        for (; !T && !b && !e.hidden && S < w.length; ) await h(w[S++]);
      };
      await Promise.all(Array.from({ length: Math.min(Math.max(1, l), 2, w.length) }, G));
    }, d));
  }
  const k = () => {
    T = !0, n.clearTimeout(E);
  }, N = () => {
    T = !1, L();
  }, M = async (w) => {
    r();
    const S = w.to.url, G = g.get(S);
    if (!w.cache.read || !G) return;
    let P;
    await Promise.race([G, new Promise((j) => {
      P = n.setTimeout(j, c);
    })]), n.clearTimeout(P), !t.cache.has(S) && g.get(S) === G && (p.get(S)?.abort(), p.delete(S), g.delete(S));
  };
  t.hooks.on("visit:start", k), t.hooks.before("page:load", M);
  for (const w of ["page:view", "visit:fail", "visit:abort"]) t.hooks.on(w, N);
  const C = (w) => {
    if (!T && !e.hidden) {
      const S = v(w.target.closest?.(".navbar-logo-center a[href]"));
      S && h(S);
    }
  };
  return e.addEventListener("pointerover", C, { passive: !0, signal: I.signal }), e.addEventListener("pointerdown", C, { passive: !0, signal: I.signal }), e.addEventListener("focusin", C, { signal: I.signal }), e.addEventListener("visibilitychange", () => {
    !e.hidden && !T && L();
  }, { signal: I.signal }), L(), () => {
    b = !0, n.clearTimeout(E), I.abort(), p.forEach((w) => w.abort()), p.clear(), g.clear(), t.hooks.off("cache:set", m), t.hooks.off("visit:start", k), t.hooks.off("page:load", M);
    for (const w of ["page:view", "visit:fail", "visit:abort"]) t.hooks.off(w, N);
  };
}
function $n({ doc: t = document, win: e = window } = {}) {
  const n = t.createElement("style");
  n.dataset.envSdGradientStyle = "", n.textContent = "#env-sd-gradient{position:absolute;pointer-events:none;z-index:0;opacity:0;transition:opacity 350ms ease,height 350ms ease}#env-sd-page[data-env-sd-gradient-page]>.main-wrapper{background-color:transparent!important}#env-sd-page [data-env-sd-gradient-source]{background-image:none!important;background-color:transparent!important}@media(prefers-reduced-motion:reduce){#env-sd-gradient{transition:none}}", t.head.append(n);
  const a = t.createElement("div");
  a.id = "env-sd-gradient", a.setAttribute("aria-hidden", "true"), t.querySelector("#env-sd-page").before(a);
  let o, i, s, d, l = !1;
  const c = () => {
    if (!o?.isConnected) return;
    const p = o.getBoundingClientRect();
    a.style.top = `${p.top + e.scrollY}px`, a.style.left = `${p.left + e.scrollX}px`, a.style.width = `${p.width}px`, a.style.height = `${p.height}px`;
  }, f = () => {
    d || (d = e.requestAnimationFrame(() => {
      d = 0, c();
    }));
  };
  function u() {
    if (s?.disconnect(), o?.removeAttribute("data-env-sd-gradient-source"), i?.removeAttribute("data-env-sd-gradient-page"), i = t.querySelector("#env-sd-page"), o = i?.querySelector(".hero-wrapper.gradient-blue"), l = !!o, !o) return;
    o.removeAttribute("data-env-sd-gradient-source");
    const p = e.getComputedStyle(o);
    for (const I of ["backgroundImage", "backgroundColor", "backgroundSize", "backgroundPosition", "backgroundRepeat", "backgroundAttachment", "backgroundBlendMode"]) a.style[I] = p[I];
    i.setAttribute("data-env-sd-gradient-page", ""), o.setAttribute("data-env-sd-gradient-source", ""), c(), e.ResizeObserver && (s = new e.ResizeObserver(f), s.observe(o));
  }
  const g = () => {
    c(), a.style.opacity = l ? "1" : "0";
  };
  return e.addEventListener("resize", f, { passive: !0 }), u(), g(), {
    prepare: u,
    commit: g,
    refresh() {
      u(), g();
    },
    destroy() {
      s?.disconnect(), e.cancelAnimationFrame(d), e.removeEventListener("resize", f), o?.removeAttribute("data-env-sd-gradient-source"), i?.removeAttribute("data-env-sd-gradient-page"), n.remove(), a.remove();
    }
  };
}
function K() {
  return K = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, K.apply(this, arguments);
}
const Ye = (t) => String(t).split(".").map((e) => String(parseInt(e || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");
let Kn = class {
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
        const s = (function(d, l) {
          var c;
          if (d === "swup") return (c = l.version) != null ? c : "";
          {
            var f;
            const u = l.findPlugin(d);
            return (f = u?.version) != null ? f : "";
          }
        })(a, i);
        return !!s && ((d, l) => l.every((c) => {
          const [, f, u] = c.match(/^([\D]+)?(.*)$/) || [];
          var g, p;
          return ((I, E) => {
            const T = { "": (b) => b === 0, ">": (b) => b > 0, ">=": (b) => b >= 0, "<": (b) => b < 0, "<=": (b) => b <= 0 };
            return (T[E] || T[""])(I);
          })((p = u, g = Ye(g = d), p = Ye(p), g.localeCompare(p, void 0, { numeric: !0 })), f || ">=");
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
    return this.on(e, n, K({}, a, { once: !0 }));
  }
  before(e, n, a = {}) {
    return this.on(e, n, K({}, a, { before: !0 }));
  }
  replace(e, n, a = {}) {
    return this.on(e, n, K({}, a, { replace: !0 }));
  }
  off(e, n) {
    return this.swup.hooks.off(e, n);
  }
};
const ze = (t) => typeof t == "object" && t != null && t.nodeType === 1, De = (t, e) => (!e || t !== "hidden") && t !== "visible" && t !== "clip", ye = (t, e) => {
  if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
    const n = getComputedStyle(t, null);
    return De(n.overflowY, e) || De(n.overflowX, e) || ((a) => {
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
}, Zn = (t) => {
  const e = t.parentElement;
  return e ?? (t.getRootNode().host || null);
}, Jn = (t, e) => {
  var n, a, o, i;
  if (typeof document > "u") return [];
  const { boundary: s, skipOverflowHiddenElements: d } = e, l = typeof s == "function" ? s : (k) => k !== s;
  if (!ze(t)) throw new TypeError("Invalid target");
  const c = document.scrollingElement || document.documentElement, f = [];
  let u = t;
  for (; ze(u) && l(u); ) {
    if (u = Zn(u), u === c) {
      f.push(u);
      break;
    }
    u != null && u === document.body && ye(u) && !ye(document.documentElement) || u != null && ye(u, d) && f.push(u);
  }
  (a = (n = window.visualViewport) == null ? void 0 : n.width) != null || innerWidth, (i = (o = window.visualViewport) == null ? void 0 : o.height) != null || innerHeight;
  const { scrollX: g, scrollY: p } = window, { height: I, width: E, top: T, right: b, bottom: O, left: R } = t.getBoundingClientRect(), { top: r, left: m } = ((k) => {
    const N = window.getComputedStyle(k);
    return { top: parseFloat(N.scrollMarginTop) || 0, right: parseFloat(N.scrollMarginRight) || 0, bottom: parseFloat(N.scrollMarginBottom) || 0, left: parseFloat(N.scrollMarginLeft) || 0 };
  })(t);
  let v = T - r, h = R - m;
  const L = [];
  for (let k = 0; k < f.length; k++) {
    const N = f[k], { height: M, width: C, top: w, right: S, bottom: G, left: P } = N.getBoundingClientRect(), j = getComputedStyle(N), y = parseInt(j.borderLeftWidth, 10), A = parseInt(j.borderTopWidth, 10), _ = parseInt(j.borderRightWidth, 10), x = parseInt(j.borderBottomWidth, 10);
    let U = 0, V = 0;
    const F = "offsetWidth" in N ? N.offsetWidth - N.clientWidth - y - _ : 0, X = "offsetHeight" in N ? N.offsetHeight - N.clientHeight - A - x : 0, fe = "offsetWidth" in N ? N.offsetWidth === 0 ? 0 : C / N.offsetWidth : 0, ue = "offsetHeight" in N ? N.offsetHeight === 0 ? 0 : M / N.offsetHeight : 0;
    if (c === N) U = v, V = h, U = Math.max(0, U + p), V = Math.max(0, V + g);
    else {
      U = v - w - A, V = h - P - y;
      const { scrollLeft: xe, scrollTop: Me } = N;
      U = ue === 0 ? 0 : Math.max(0, Math.min(Me + U / ue, N.scrollHeight - M / ue + X)), V = fe === 0 ? 0 : Math.max(0, Math.min(xe + V / fe, N.scrollWidth - C / fe + F)), v += Me - U, h += xe - V;
    }
    L.push({ el: N, top: U, left: V });
  }
  return L;
};
function Ie() {
  return Ie = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) ({}).hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ie.apply(null, arguments);
}
const Fe = (t, e = document) => Array.from(e.querySelectorAll(t));
class et extends Kn {
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
      const i = this.getCachedScrollPositions(n.to.url), { top: s = 0, left: d = 0 } = i?.window || { top: 0, left: 0 };
      requestAnimationFrame(() => this.scrollTo({ top: s, left: d }, n.scroll.animate)), n.scroll.scrolledToContent = !0;
    }, this.maybeResetScrollPositions = (n) => {
      const { popstate: a } = n.history, { url: o } = n.to, { el: i } = n.trigger;
      a || i && !this.options.shouldResetScrollPosition(i) || this.resetScrollPositions(o);
    }, this.options = Ie({}, this.defaults, e);
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
    const n = this.swup.resolveUrl(e), a = Fe(this.options.scrollContainers).map((i) => ({ top: i.scrollTop, left: i.scrollLeft })), o = { window: { top: window.scrollY, left: window.scrollX }, containers: a };
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
    n && n.containers.length !== 0 && Fe(this.options.scrollContainers).forEach((a, o) => {
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
    const i = this.swup.createVisit({ to: this.swup.location.url }), { top: s = 0, left: d = 0 } = typeof e == "number" ? { top: e } : e;
    a != null || (a = this.getRootScrollContainer()), ((o = this.options.scrollFunction) != null ? o : this.applyScroll)(a, s, d, n, () => this.swup.hooks.callSync("scroll:start", i, void 0), () => this.swup.hooks.callSync("scroll:end", i, void 0));
  }
  applyScroll(e, n, a, o, i, s) {
    const d = e instanceof HTMLHtmlElement || e instanceof HTMLBodyElement ? window : e;
    i(), d.addEventListener("scrollend", s, { once: !0 }), d.addEventListener("wheel", () => {
      e.scrollTo({ top: e.scrollTop, left: e.scrollLeft, behavior: "instant" });
    }, { once: !0 }), e.scrollTo({ top: n, left: a, behavior: o ? "smooth" : "instant" });
  }
  scrollElementIntoView(e, n = !1) {
    Jn(e, {}).forEach(({ top: a, left: o, el: i }) => {
      const { top: s = 0, left: d = 0 } = this.getOffset(e, i, { top: a, left: o });
      this.scrollTo({ top: a - s, left: o - d }, n, i);
    });
  }
}
const nt = /* @__PURE__ */ JSON.parse('{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1755082284250},"e-60":{"id":"e-60","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-354"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-66":{"id":"e-66","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1755253957866},"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1755520593128},"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530611763},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-136":{"id":"e-136","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-140":{"id":"e-140","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-141":{"id":"e-141","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067163},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067164},"e-154":{"id":"e-154","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-155":{"id":"e-155","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-156":{"id":"e-156","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755871097680},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755875094862},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755876464121},"e-159":{"id":"e-159","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755879802104},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756115114996},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629063},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629064},"e-167":{"id":"e-167","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-168":{"id":"e-168","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-169":{"id":"e-169","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-170"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-170":{"id":"e-170","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-169"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-171":{"id":"e-171","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1756212521436},"e-172":{"id":"e-172","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-14","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-14-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-173":{"id":"e-173","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756212521436},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-176"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-176":{"id":"e-176","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-177":{"id":"e-177","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-178":{"id":"e-178","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-179":{"id":"e-179","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-180"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-180":{"id":"e-180","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-181":{"id":"e-181","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-182"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-182":{"id":"e-182","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-181"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-183":{"id":"e-183","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-184"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-184":{"id":"e-184","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-183"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-185":{"id":"e-185","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-186"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-186":{"id":"e-186","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-187":{"id":"e-187","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-188"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-188":{"id":"e-188","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-187"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-189":{"id":"e-189","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-190"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-190":{"id":"e-190","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-189"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-191":{"id":"e-191","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-192":{"id":"e-192","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-199":{"id":"e-199","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-200":{"id":"e-200","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-201":{"id":"e-201","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-32","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-32-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-207":{"id":"e-207","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-208":{"id":"e-208","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-209":{"id":"e-209","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-40","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-40-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-210":{"id":"e-210","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-213":{"id":"e-213","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-214":{"id":"e-214","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-215":{"id":"e-215","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-216":{"id":"e-216","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-215"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-217":{"id":"e-217","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-218":{"id":"e-218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-220":{"id":"e-220","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-221":{"id":"e-221","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-222":{"id":"e-222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-224":{"id":"e-224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-226":{"id":"e-226","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-227":{"id":"e-227","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-228":{"id":"e-228","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-230":{"id":"e-230","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-231":{"id":"e-231","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-232":{"id":"e-232","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-235":{"id":"e-235","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-237":{"id":"e-237","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-239":{"id":"e-239","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1756213073122},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756215368838},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756217402865},"e-246":{"id":"e-246","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-247"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-248":{"id":"e-248","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-61","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-61-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756219072551},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-44","affectedElements":{},"duration":0}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-44-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756285635295},"e-252":{"id":"e-252","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":35}],"createdOn":1756289409368},"e-253":{"id":"e-253","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-255":{"id":"e-255","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-256":{"id":"e-256","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-257":{"id":"e-257","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-258"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450212},"e-258":{"id":"e-258","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-257"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450213},"e-261":{"id":"e-261","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-262":{"id":"e-262","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-261"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-263":{"id":"e-263","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-264"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-264":{"id":"e-264","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-263"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-267":{"id":"e-267","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-268":{"id":"e-268","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-269":{"id":"e-269","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-270":{"id":"e-270","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-271":{"id":"e-271","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756479519311},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756717531882},"e-274":{"id":"e-274","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756806270936},"e-322":{"id":"e-322","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756810004678},"e-323":{"id":"e-323","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756810004678},"e-324":{"id":"e-324","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-55","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-325"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756810004678},"e-326":{"id":"e-326","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756811004558},"e-327":{"id":"e-327","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756811004558},"e-328":{"id":"e-328","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-329"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756811004558},"e-330":{"id":"e-330","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-332":{"id":"e-332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-333"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-334":{"id":"e-334","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-335"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-335":{"id":"e-335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-334"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-336":{"id":"e-336","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-337"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-338":{"id":"e-338","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-339"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-340":{"id":"e-340","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-341"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338311},"e-341":{"id":"e-341","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-340"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338312},"e-342":{"id":"e-342","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-343"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358713},"e-343":{"id":"e-343","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-342"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358714},"e-344":{"id":"e-344","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894354535},"e-346":{"id":"e-346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-347"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894852503},"e-348":{"id":"e-348","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894943483},"e-350":{"id":"e-350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-351":{"id":"e-351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-352":{"id":"e-352","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-62","affectedElements":{},"duration":0}},"mediaQueries":["tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-62-p","smoothing":80,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1788970142603},"e-353":{"id":"e-353","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-63","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-63-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1789722760158},"e-354":{"id":"e-354","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-355"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1784644100563},"e-356":{"id":"e-356","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-357"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-357":{"id":"e-357","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-356"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-358":{"id":"e-358","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-359"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-359":{"id":"e-359","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-358"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-360":{"id":"e-360","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-361"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-361":{"id":"e-361","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-362":{"id":"e-362","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-363"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-363":{"id":"e-363","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-362"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-364":{"id":"e-364","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-365"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-365":{"id":"e-365","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-364"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-366":{"id":"e-366","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-367"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-367":{"id":"e-367","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-366"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-368":{"id":"e-368","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-369"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-369":{"id":"e-369","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-368"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-370":{"id":"e-370","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-371"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-371":{"id":"e-371","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-370"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-372":{"id":"e-372","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-373":{"id":"e-373","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-374":{"id":"e-374","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-375"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-375":{"id":"e-375","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-374"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-376":{"id":"e-376","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-377"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-377":{"id":"e-377","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-376"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-378":{"id":"e-378","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-379"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-379":{"id":"e-379","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-378"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-380":{"id":"e-380","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-381"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-381":{"id":"e-381","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-380"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-382":{"id":"e-382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-383":{"id":"e-383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-384":{"id":"e-384","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-385"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-385":{"id":"e-385","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-384"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-386":{"id":"e-386","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792143403693},"e-388":{"id":"e-388","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792144646842},"e-389":{"id":"e-389","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792406953011},"e-390":{"id":"e-390","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"SLIDE_EFFECT","instant":false,"config":{"actionListId":"slideInBottom","autoStopEventId":"e-391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":0,"direction":"BOTTOM","effectIn":true},"createdOn":1792407576931},"e-396":{"id":"e-396","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-72","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"},"targets":[{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"}],"config":[{"continuousParameterGroupId":"a-72-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792428529433},"e-398":{"id":"e-398","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-399"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792485126279},"e-400":{"id":"e-400","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-70","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-70-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487033715},"e-401":{"id":"e-401","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487214244},"e-402":{"id":"e-402","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487313748},"e-403":{"id":"e-403","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487915879},"e-404":{"id":"e-404","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792488478134},"e-405":{"id":"e-405","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-76","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-76-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":30}],"createdOn":1792493994486},"e-406":{"id":"e-406","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792583833272},"e-407":{"id":"e-407","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583940147},"e-408":{"id":"e-408","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583959514},"e-409":{"id":"e-409","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792669014788},"e-410":{"id":"e-410","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792684178623},"e-412":{"id":"e-412","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792746547632},"e-413":{"id":"e-413","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-414"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-414":{"id":"e-414","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-415":{"id":"e-415","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-416"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-416":{"id":"e-416","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-415"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-417":{"id":"e-417","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-418"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609184},"e-418":{"id":"e-418","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-417"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609186},"e-419":{"id":"e-419","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-420"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-420":{"id":"e-420","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-419"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-421":{"id":"e-421","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-422"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-422":{"id":"e-422","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-421"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-423":{"id":"e-423","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|d6dbae61-3197-1e40-d143-51eed0e38248","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792765396560}},"actionLists":{"a-4":{"id":"a-4","title":"Hero Big Title | Fade Reveal","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n-9","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":25,"actionItems":[{"id":"a-4-n-11","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-10","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]},{"keyframe":50,"actionItems":[{"id":"a-4-n-12","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-13","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":75,"actionItems":[{"id":"a-4-n-15","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-14","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-17","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":100,"actionItems":[{"id":"a-4-n-16","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}},{"id":"a-4-n-18","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}]}],"createdOn":1755103578616},"a-11":{"id":"a-11","title":"\\"Quote\\" | Reveal On Hover","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}},{"id":"a-11-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}},{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":20,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-12":{"id":"a-12","title":"\\"Quote\\" | Hide on Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-12-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}},{"id":"a-12-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659295499},"a-13":{"id":"a-13","title":"Slider | Scroll Moving","continuousParameterGroups":[{"id":"a-13-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":0,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":-180.5,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]}]}],"createdOn":1755254411359},"a-16":{"id":"a-16","title":"Moving | Contact Bloc","continuousParameterGroups":[{"id":"a-16-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-16-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":-20,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755520603487},"a-20":{"id":"a-20","title":"Bio Members | Fade In","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"flex"}},{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755528746326},"a-18":{"id":"a-18","title":"Team Members | Hover In","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-18-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}},{"id":"a-18-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":1,"unit":""}},{"id":"a-18-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":1,"unit":""}},{"id":"a-18-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755526280358},"a-19":{"id":"a-19","title":"Team Members | Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755526280358},"a-21":{"id":"a-21","title":"Bio Members | Close Fade Out","actionItemGroups":[{"actionItems":[{"id":"a-21-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755528746326},"a-27":{"id":"a-27","title":"Menu Modal in 2","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-27-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-7","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-27-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-27-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-14","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-28":{"id":"a-28","title":"Menu Modal Out 2","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-28-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-30":{"id":"a-30","title":"(D) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-30-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":712,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-30-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-31":{"id":"a-31","title":"(D) Testimonial | View Less","actionItemGroups":[{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-31-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755852982792},"a-29":{"id":"a-29","title":"Burger Overlap","continuousParameterGroups":[{"id":"a-29-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-29-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":19,"actionItems":[{"id":"a-29-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755794506046},"a-34":{"id":"a-34","title":"Playing Lottie w/ Image","continuousParameterGroups":[{"id":"a-34-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-34-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-34-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]},{"keyframe":65,"actionItems":[{"id":"a-34-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}},{"id":"a-34-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":75,"actionItems":[{"id":"a-34-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}},{"id":"a-34-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":1,"unit":""}}]},{"keyframe":85,"actionItems":[{"id":"a-34-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":0,"unit":""}},{"id":"a-34-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-34-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":1,"unit":""}}]}]}],"createdOn":1755264981960},"a-35":{"id":"a-35","title":"100% | Mask Moving","continuousParameterGroups":[{"id":"a-35-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-35-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":100,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-36":{"id":"a-36","title":"100% | Text On Mask Moving","continuousParameterGroups":[{"id":"a-36-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-36-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":-540,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"keyframe":42,"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-36-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-36-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]}]}],"createdOn":1755871103819},"a-37":{"id":"a-37","title":"100% | Mask Moving Parallax","continuousParameterGroups":[{"id":"a-37-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-37-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":-20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":96,"actionItems":[{"id":"a-37-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-54":{"id":"a-54","title":"Lottie | Parallax 2.1","continuousParameterGroups":[{"id":"a-54-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-54-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-54-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":100}}]}]}],"createdOn":1755773678347},"a-50":{"id":"a-50","title":"Hover IN | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-50-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-51":{"id":"a-51","title":"Hover OUT | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-14":{"id":"a-14","title":"Playing Lottie","continuousParameterGroups":[{"id":"a-14-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-14-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-14-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":1,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-14-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-32":{"id":"a-32","title":"Playing Lottie without Text","continuousParameterGroups":[{"id":"a-32-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-32-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":100,"actionItems":[{"id":"a-32-n-4","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-40":{"id":"a-40","title":"Lottie | Parallax 3","continuousParameterGroups":[{"id":"a-40-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-40-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-40-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":100}}]}]}],"createdOn":1755773678347},"a-41":{"id":"a-41","title":"02 DESIGN | Content Animation 2","continuousParameterGroups":[{"id":"a-41-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":5,"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":1,"unit":""}},{"id":"a-41-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":1,"unit":""}}]},{"keyframe":8,"actionItems":[{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":0,"unit":""}},{"id":"a-41-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":0,"unit":""}}]},{"keyframe":20,"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":1,"unit":""}},{"id":"a-41-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":1,"unit":""}}]},{"keyframe":40,"actionItems":[{"id":"a-41-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":0,"unit":""}},{"id":"a-41-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}}]},{"keyframe":60,"actionItems":[{"id":"a-41-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":1,"unit":""}},{"id":"a-41-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":1,"unit":""}}]},{"keyframe":80,"actionItems":[{"id":"a-41-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":0,"unit":""}},{"id":"a-41-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}},{"id":"a-41-n-18","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-41-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":1,"unit":""}},{"id":"a-41-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":1,"unit":""}}]}]}],"createdOn":1755857273626},"a-26":{"id":"a-26","title":"Lottie | Parallax 2","continuousParameterGroups":[{"id":"a-26-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-26-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-26-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":100}}]}]}],"createdOn":1755773678347},"a-38":{"id":"a-38","title":"Hover IN | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":0,"yValue":0,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":100,"yValue":-100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-42":{"id":"a-42","title":"HERO | Title Reveal","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-5","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1000,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-8","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756213078962},"a-53":{"id":"a-53","title":"Lottie | Parallax 2.0","continuousParameterGroups":[{"id":"a-53-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-53-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-53-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":100}}]}]}],"createdOn":1755773678347},"a-59":{"id":"a-59","title":"\\"Quote\\" | Reveal On Hover Mobile","actionItemGroups":[{"actionItems":[{"id":"a-59-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]},{"actionItems":[{"id":"a-59-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-61":{"id":"a-61","title":"Lottie | Parallax D-only","continuousParameterGroups":[{"id":"a-61-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-61-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-61-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":100}}]}]}],"createdOn":1755773678347},"a-44":{"id":"a-44","title":"100% Tablet | Mask Moving","continuousParameterGroups":[{"id":"a-44-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-44-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-44-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-45":{"id":"a-45","title":"BTN | Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-45-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-46":{"id":"a-46","title":"BTN | Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-46-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-49":{"id":"a-49","title":"Hover OUT | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-49-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-49-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-52":{"id":"a-52","title":"LOADING | Intro","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-52-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-52-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-52-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-52-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-52-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-52-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-55":{"id":"a-55","title":"LOADING | Intro 2","actionItemGroups":[{"actionItems":[{"id":"a-55-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-55-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-55-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-55-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-55-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-55-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-55-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-55-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-56":{"id":"a-56","title":"LOADING | Intro 3","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-56-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-56-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-56-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-56-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-56-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-57":{"id":"a-57","title":"(T) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-57-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-57-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-57-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":792,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-57-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-58":{"id":"a-58","title":"(M) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-58-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-58-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":892,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-60":{"id":"a-60","title":"\\"Quote\\" | Reveal Hover Out Mobile","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659228000},"a-62":{"id":"a-62","title":"ENV 27 | SD","continuousParameterGroups":[{"id":"a-62-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":30,"actionItems":[{"id":"a-62-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-62-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-63":{"id":"a-63","title":"ENV 27","continuousParameterGroups":[{"id":"a-63-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-63-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-63-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-64":{"id":"a-64","title":"Fadein Scale","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":0.99,"yValue":0.99,"locked":true}},{"id":"a-64-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":200,"easing":"outQuart","duration":750,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1784299779426},"a-65":{"id":"a-65","title":"Hover IN | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-66":{"id":"a-66","title":"Hover OUT | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-67":{"id":"a-67","title":"Hero Parralax","continuousParameterGroups":[{"id":"a-67-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-67-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-67-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-69":{"id":"a-69","title":"Footer Move","continuousParameterGroups":[{"id":"a-69-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-69-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-69-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-72":{"id":"a-72","title":"Project Apparation","continuousParameterGroups":[{"id":"a-72-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-72-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-72-n-3","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":10,"unit":"px"}]}}]},{"keyframe":30,"actionItems":[{"id":"a-72-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-72-n-4","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":0,"unit":"px"}]}}]}]}],"createdOn":1792428347426},"a-73":{"id":"a-73","title":"Big Logo Footer Anim","actionItemGroups":[{"actionItems":[{"id":"a-73-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":3,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":0,"unit":""}},{"id":"a-73-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-73-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-73-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1792485129495},"a-70":{"id":"a-70","title":"Hero Parralax 2","continuousParameterGroups":[{"id":"a-70-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-70-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-70-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-75":{"id":"a-75","title":"Footer Move 2","continuousParameterGroups":[{"id":"a-75-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":60,"actionItems":[{"id":"a-75-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-150,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-76":{"id":"a-76","title":"Gradient Move","continuousParameterGroups":[{"id":"a-76-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-76-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":-50,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792493736787},"a-77":{"id":"a-77","title":"Menu Modal in 3","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-77-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-77-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-78":{"id":"a-78","title":"Menu Modal Out 3","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-78-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-78-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-79":{"id":"a-79","title":"BTN | Hover IN 2","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-79-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-80":{"id":"a-80","title":"BTN | Hover OUT 2","actionItemGroups":[{"actionItems":[{"id":"a-80-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-80-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-22":{"id":"a-22","title":"Menu Modal in","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-22-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-13","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-22-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"block"}},{"id":"a-22-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":300,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":1,"unit":""}},{"id":"a-22-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":-4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-23":{"id":"a-23","title":"Menu Modal out","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-23-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"slideInBottom":{"id":"slideInBottom","useFirstGroupAsInitialState":true,"actionItemGroups":[{"actionItems":[{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":0}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":100,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":0,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}},{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":1}}]}]}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'), tt = [{ id: "i-3369b7ea", scope: { type: "site" }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "top 60%", end: "bottom top", scrub: 0.8, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", [], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-0a46efea"], deleted: !1 }, { id: "i-c5fa3e77", scope: { type: "pages", value: ["6ad0cb2816e9afd85c684ff1", "6ad616f21f8cbecf97edd7bc", "6ad72f57e23d005096ad353f", "6ad883e4d375bd5dc8fcd9b1", "6ad887d71c76507742d263fd", "6ad88b6cba1a7277fb148e6d", "6ada10acf7b862f8202a551a", "6adb1bf31beca6c8f035e7c7"] }, triggers: [["wf:load", { control: "play", controlType: "load" }]], timelineIds: ["t-f67ae376"], deleted: !1 }, { id: "i-4d923125", scope: { type: "pages", value: ["6ad883e4d375bd5dc8fcd9b1"] }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "20% bottom", end: "bottom bottom", scrub: 1.4, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", ["section.big-padding-top-bottom"], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-5be7f1c4"], deleted: !1 }], at = [{ id: "t-0a46efea", deleted: !1, actions: [{ id: "ta-9e398187", targets: [["wf:trigger-only", "", { relationship: "none", firstMatchOnly: !1 }]], timing: { duration: 0, position: 0, stagger: { amount: 0.3 }, ease: 29 }, tt: 2, properties: { "wf:transform": { opacity: ["30%", "100%"] } }, splitText: { type: "chars" } }], canvasDuration: 1 }, { id: "t-f67ae376", deleted: !1, actions: [{ id: "ta-72b6a8c0", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars" } }, { id: "ta-a9ce4ab1", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars", mask: "chars" } }] }, { id: "t-5be7f1c4", deleted: !1, actions: [{ id: "ta-ef2e1e28", targets: [["wf:class", ["h3.first"], { relationship: "within", filterBy: ["wf:trigger-only", ""], firstMatchOnly: !1 }]], timing: { duration: 1.233, position: 0.8220000000000001, stagger: { each: 0.12329999999999999 }, ease: 0 }, tt: 2, properties: { "wf:transform": { opacity: ["20%", "100%"] }, "wf:style": { color: ["var(--_colors---normal-blue)", "var(--_colors---dark-blue)"] } }, splitText: { type: "words" } }], canvasDuration: 4.11 }], it = {
  ix2: nt,
  interactions: tt,
  timelines: at
}, ve = {
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
}, ot = {
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
}, he = [
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
], st = [
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
async function rt(t, e, { doc: n = document, events: a = window, timeout: o = 4e3 } = {}) {
  let i = !n.querySelector("[data-env-reveal],[data-env-text]"), s, d;
  const l = i ? Promise.resolve() : new Promise((f) => {
    s = f, d = setTimeout(f, o);
  }), c = () => {
    i = !0, s?.();
  };
  a.addEventListener("env:animations-ready", c, { once: !0 });
  try {
    await t(), e(), await l;
  } finally {
    clearTimeout(d), a.removeEventListener("env:animations-ready", c), i || n.documentElement.setAttribute("data-env-sd-reveal-expired", ""), n.documentElement.classList.remove("env-sd-boot");
  }
}
function lt(t) {
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
async function dt(t, { timeout: e = 4e3, pause: n = (o) => new Promise((i) => setTimeout(i, o)), now: a = Date.now } = {}) {
  const o = a();
  for (; ; ) {
    const i = lt(t);
    if (i.compatible) return i;
    if (!i.pending || a() - o >= e) throw Error(i.reason);
    await n(50);
  }
}
function ct(t, e = !1) {
  return Math.max(0, t) > (e ? 2 : 8);
}
function ft(t) {
  return [t?.querySelector(".main-picto") || t?.querySelector(".nav-link-sd"), t?.querySelector(".logo-nav")];
}
function ut(t, e, n, a, o = window) {
  if (!t || !e?.matches(".main-picto")) return;
  let i = !1, s = !1;
  const d = () => n(i || s);
  e.addEventListener("pointerenter", (l) => {
    l.pointerType === "touch" || !o.matchMedia("(hover: hover) and (pointer: fine)").matches || (i = !0, d());
  }, { signal: a }), t.addEventListener("pointerleave", () => {
    i = !1, d();
  }, { signal: a }), t.addEventListener("focusin", () => {
    s = !0, d();
  }, { signal: a }), t.addEventListener("focusout", (l) => {
    l.relatedTarget && t.contains(l.relatedTarget) || (s = !1, d());
  }, { signal: a });
}
function pt(t, e) {
  t?.querySelectorAll(".navbar-brand-three img.main-picto, .logo-mobile img.logo-nav").forEach((n) => {
    !n.matches(".main-picto") && !/sd-picto(?:-blue)?\.svg(?:[?#]|$)/i.test(n.getAttribute("src") || "") || (n.classList.add("is-env-nav-picto"), n.removeAttribute("srcset"), n.src = e);
  });
}
function bt(t, e, n) {
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
function mt(t = document) {
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
.navbar-logo-center .navbar-brand-three .logo-nav{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .logo-nav{filter:brightness(0) invert(1)}
.navbar-logo-center .navbar-brand-three .main-picto{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .main-picto{filter:brightness(0) invert(1)}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .navbar-brand-three .main-picto,.navbar-logo-center .navbar-brand-three .logo-nav{transition:none}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-sd.nav{transition:none}}
@media(max-width:991px){
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
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto,.navbar-logo-center.is-env-burger-managed .burger-menu-wrap .line-burger{transition:none!important}}`, t.head.append(e);
}
function Xe(t) {
  let e = t.querySelector("#env-sd-page");
  if (e) return e;
  const n = t.querySelector("main.main-wrapper");
  if (!n || n.parentElement !== t.body) throw Error("Unsupported page layout");
  e = t.createElement("div"), e.id = "env-sd-page", n.before(e), e.append(n);
  const a = t.querySelector("body > .section.footer");
  return a && e.append(a), e;
}
function He(t, e, n, { refreshRuntime: a = !1, gsapScripts: o, profiles: i = ve, inlineScripts: s = [], persistentContact: d = !1, auditedCores: l = [], runtimeCompatible: c = !1 } = {}) {
  const f = [...t.scripts].map((r) => r.getAttribute("src")).filter((r) => r?.includes("/js/webflow.")), u = i[e], g = t.documentElement.getAttribute("data-wf-page"), p = t.documentElement.getAttribute("data-wf-site"), I = a && u?.page !== g && Object.values(i).find((r) => r.page === g && r.site === p) || u, E = I || Object.values(i).find((r) => JSON.stringify(r.scripts) === JSON.stringify(f)) || (a ? ve["/home-sd"] : void 0);
  if (!E || t.documentElement.getAttribute("data-wf-site") !== E.site || !t.documentElement.getAttribute("data-wf-page") || I && t.documentElement.getAttribute("data-wf-page") !== I.page) throw Error("Uncertified page");
  const T = JSON.stringify(f) !== JSON.stringify(E.scripts);
  if (T && !a) throw Error("Webflow export changed; rebuild SD snapshots");
  const b = [...Object.values(i).map((r) => r.scripts.slice(0, 2)), ...l].some((r) => r.length === 2 && r.every((m) => f.includes(m)));
  if (T && !b) {
    const r = f.slice(0, 2), m = r.length === 2 && r.every((v) => {
      try {
        const h = new URL(v);
        return h.origin === "https://cdn.prod.website-files.com" && h.pathname.startsWith(`/${E.site}/js/webflow.schunk.`) && /\.[a-f0-9]{16}\.js$/.test(h.pathname) && !h.search && !h.hash && !h.username && !h.password;
      } catch {
        return !1;
      }
    });
    if (!c || !m) throw Error("Webflow shared core changed");
  }
  const O = f.find((r) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(r));
  if (T && !O) throw Error("Missing Webflow data bootstrap");
  if (o && [...t.scripts].map((r) => r.src).filter((r) => r.includes("/gsap/")).some((r) => !o.includes(r))) throw Error("New GSAP dependency requires native navigation");
  if (!t.querySelector(".navbar-logo-center") || !t.querySelector("body > main.main-wrapper, #env-sd-page > main.main-wrapper")) throw Error("Page needs the shared SD menu and main wrapper");
  const R = [...t.querySelectorAll('link[rel="stylesheet"]')].map((r) => r.getAttribute("href"));
  if (!(n || E.sheets).every((r) => R.includes(r)) || n && R.length !== n.length) throw Error("Stylesheets changed");
  for (const r of t.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(r.src)) throw Error("Remove the legacy env.js loader on pilot routes");
    if (/const brand =/.test(r.textContent) && !/ENV SD/.test(r.textContent)) throw Error("Remove the legacy brand initializer on pilot routes");
    if (!(r.src || !r.textContent.trim() || r.type === "application/ld+json") && !s.includes(r.textContent) && !/^\s*window\.ENVSDTransition\s*=\s*(['"])[a-zA-Z-]*\1\s*;?\s*$/.test(r.textContent) && !/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(r.textContent))
      throw Error("Additional inline script needs an adapter");
  }
  if (t.querySelector('[data-animation-type="spline"]') || [...t.querySelectorAll(".w-form")].some((r) => !d || !r.closest(".navbar-logo-center .contact-modal-bloc"))) throw Error("Unsupported page widget");
  return a ? { ...E, runtimeChanged: T, bootstrap: O, dataScripts: f.slice(2) } : E;
}
function gt(t, e) {
  const n = t.querySelector(".navbar-logo-center .link-box.mobile"), a = e.querySelector(".navbar-logo-center .link-box.mobile");
  if (n && a) {
    const o = n.querySelector(".dot-link"), i = a.querySelector(".dot-link");
    o && !i ? o.remove() : !o && i && n.append(i.cloneNode(!0));
  }
  for (const [o, i] of [[".nav-link-sd", "white"], [".dot-link", "dark"], [".burger-menu-wrap .line-burger", "white"], [".menu-modal", "darker"], [".menu-modal .link-overlay", "dark"]]) {
    const s = [...t.querySelectorAll(`.navbar-logo-center ${o}`)], d = [...e.querySelectorAll(`.navbar-logo-center ${o}`)];
    if (s.length !== d.length) throw Error("Menu variants structure changed");
    s.forEach((l, c) => l.classList.toggle(i, d[c].classList.contains(i)));
  }
}
function yt(t, e) {
  for (const n of [".navbar-brand-three", ".logo-mobile", ".menu-modal"]) {
    const a = t.querySelector(`.navbar-logo-center ${n}`), o = e.querySelector(`.navbar-logo-center ${n}`);
    if (!a && !o) continue;
    if (!a || !o) throw Error("Menu image slot changed");
    let i = [...a.querySelectorAll("img")];
    const s = [...o.querySelectorAll("img")];
    if (n !== ".logo-mobile" && i.length !== s.length) throw Error("Menu images structure changed");
    for (; i.length > s.length; ) i.pop().remove();
    for (; i.length < s.length; ) {
      const d = s[i.length].cloneNode(!0);
      a.append(d), i.push(d);
    }
    i.forEach((d, l) => {
      d.className = s[l].className;
      for (const c of ["src", "srcset", "sizes", "alt"]) {
        const f = s[l].getAttribute(c);
        f === null ? d.removeAttribute(c) : d.setAttribute(c, f);
      }
    });
  }
}
const we = { ...ve, ...ot }, Et = { profiles: we, inlineScripts: he, persistentContact: !0, auditedCores: st }, ke = document.createElement("style");
ke.dataset.envAlternativeRevealGate = "";
ke.textContent = '.navbar-logo-center [data-modal="contact"]{pointer-events:auto!important}#env-sd-page[data-env-alt-reveal-wait] :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden!important}';
document.head.append(ke);
const _e = document.createElement("style");
_e.dataset.envNavBackground = "";
_e.textContent = `
.navbar-logo-center { background:transparent!important; transition:none!important; isolation:isolate; }
.navbar-logo-center::before { content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:#fff;opacity:0;transition:opacity 400ms ease;will-change:opacity; }
.navbar-logo-center.is-past-hero::before { opacity:1; }
@media(prefers-reduced-motion:reduce){.navbar-logo-center::before{transition:none}}
`;
document.head.append(_e);
const ee = new URL(import.meta.url);
ee.pathname = ee.pathname.replace(/[^/]*$/, "");
const Tt = () => location.pathname.replace(/\/$/, "") || "/", Z = matchMedia("(prefers-reduced-motion: reduce)"), It = () => document.querySelector("main.main-wrapper");
let Oe = () => {
}, re, J, oe, Le = [], Se, Ne = () => {
}, ne, de;
function Re() {
  const t = document.querySelector("#env-sd-page");
  t !== Se && (Ne(), ne?.destroy(), de?.destroy(), Se = t, Ne = dn(t), ne = rn(t), de = ln(t));
}
let Y = { sources: [], story: null, hero: !1, mask: !1 }, ce = () => {
};
const Qe = /* @__PURE__ */ new Set(), le = () => {
  document.documentElement.classList.remove("env-sd-boot"), window.dispatchEvent(new Event("env:sd-ready"));
}, tn = (t) => new Promise((e) => setTimeout(e, t));
function D(t, e = !1) {
  return !e && Qe.has(t) ? Promise.resolve() : new Promise((n, a) => {
    const o = document.createElement("script");
    o.src = new URL(t, ee).href;
    const i = setTimeout(() => {
      o.remove(), a(Error(`ENV SD timeout: ${t}`));
    }, 8e3);
    o.onload = () => {
      clearTimeout(i), Qe.add(t), o.remove(), n();
    }, o.onerror = () => {
      clearTimeout(i), o.remove(), a(Error(`ENV SD could not load ${t}`));
    }, o.dataset.envSdModule = t, document.head.append(o);
  });
}
function vt(t) {
  const e = vn();
  try {
    fn(document, t), gt(document, t), yt(document, t);
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
function an() {
  Oe();
  const t = document.querySelector(".navbar-logo-center"), e = t?.querySelector(".navbar-brand-three");
  pt(t, new URL("sd-picto-blue.svg", ee).href);
  const [n, a] = ft(e);
  if (!t) return;
  mt();
  const o = new AbortController();
  let i, s, d = !1, l = [], c = !1;
  function f(p = !1) {
    const I = ct(window.scrollY, i);
    t.classList.toggle("is-past-hero", I), i = I;
    const E = I || d;
    if (!p && E === s) return;
    const T = s === void 0;
    if (s = E, !n || !a || !n.getClientRects().length) {
      l.forEach((m) => m.cancel()), l = [];
      return;
    }
    const b = [n, a], O = b.map((m) => ({ transform: getComputedStyle(m).transform, opacity: getComputedStyle(m).opacity }));
    l.forEach((m) => m.cancel());
    const R = b.map((m) => m.style.transform);
    b.forEach((m) => m.style.transform = "none");
    const r = bt(n, a, E);
    b.forEach((m, v) => m.style.transform = R[v]), l = b.map((m, v) => m.animate([O[v], r[v]], { duration: T || Z.matches ? 0 : 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }));
  }
  const u = sn(t);
  ut(e, n, (p) => {
    d = p, f();
  }, o.signal);
  function g() {
    c || (c = !0, requestAnimationFrame(() => {
      c = !1, f();
    }));
  }
  addEventListener("scroll", g, { passive: !0, signal: o.signal }), addEventListener("resize", () => f(!0), { signal: o.signal }), [n, a].forEach((p) => p?.addEventListener("load", () => f(!0), { signal: o.signal })), f(), document.querySelectorAll(".navbar-logo-center a[href]").forEach((p) => {
    const I = new URL(p.href), E = I.origin === location.origin && I.pathname === location.pathname && !I.hash;
    p.classList.toggle("w--current", E), E ? p.setAttribute("aria-current", "page") : p.removeAttribute("aria-current");
  }), Oe = () => {
    u(), o.abort(), l.forEach((p) => p.cancel());
  };
}
async function on() {
  if (Y.story ? (ce(), ce = gn(document), yn(Y.story.groups, Y.story.responsive)) : document.querySelector('[data-env-page-animation="about"]') && (await D("about-page.js"), window.ENVAboutPage?.init()), !document.querySelector("[data-env-reveal],[data-env-text]")) return;
  if (!window.gsap) throw Error("GSAP unavailable");
  let t;
  const e = new Promise((n) => {
    t = n;
  });
  window.addEventListener("env:animations-ready", t, { once: !0 });
  try {
    await D("animations.js", !0), await Promise.race([e, tn(1500)]);
  } finally {
    window.removeEventListener("env:animations-ready", t);
  }
}
async function qe({ deferReveals: t = !1 } = {}) {
  Re(), an(), Y.hero && En(), Tn(), cn(), window.ENVVideos?.refresh(), window.gsap && window.ScrollTrigger && document.querySelectorAll("#env-sd-page .section.mask").forEach((n) => {
    n.hasAttribute("data-env-about-mask") || n.dataset.maskInitialized || (n.dataset.maskInitialized = "true", Le.push(window.gsap.fromTo(n, { clipPath: Y.mask ? "inset(15%)" : "inset(10%)" }, { clipPath: "inset(0%)", ease: "none", scrollTrigger: { trigger: n, start: "top bottom", end: "top 15%", scrub: 0.6, invalidateOnRefresh: !0 } })));
  }), await Promise.all([
    document.querySelector("#env-sd-page .hero-wrapper .sd-slider") ? D("hero.js", !0) : Promise.resolve(),
    document.querySelector("#env-sd-page [data-env-hero-shape]") ? D("hero-shape.js", !0) : Promise.resolve(),
    t ? Promise.resolve() : on()
  ]), ne?.refresh();
  const e = [...document.querySelectorAll(".swiper-news[data-env-news]")];
  e.length && (re = new IntersectionObserver((n) => {
    n.some((a) => a.isIntersecting) && (re.disconnect(), D("news.js", !0).catch(console.error));
  }, { rootMargin: "600px" }), e.forEach((n) => re.observe(n)));
}
function ht() {
  de?.destroy(), de = null, ne?.destroy(), ne = null, Ne(), Se = null, window.ENVAnimations?.destroy(), window.ENVAboutPageTest?.destroy(), ce(), ce = () => {
  }, document.querySelector("#env-sd-page .hero-about")?.__envReleaseCleanup?.(), window.ENVAboutPage?.destroy(), window.ENVAboutReveals?.destroy(), window.ENVHeroShape?.destroy(), window.ENVOrganicBlob?.destroy(), window.ENVCTABlob?.destroy(), Le.forEach((e) => {
    e.scrollTrigger?.kill(), e.kill();
  }), Le = [], window.ScrollTrigger?.getAll().filter((e) => e.trigger?.matches?.("#env-sd-page .section.mask")).forEach((e) => e.kill()), Oe(), re?.disconnect(), document.querySelector(".hero-wrapper")?.__envHeroCleanup?.(), window.ENVNews?.destroy(), window.ENVNewsMarquee?.destroy();
  const t = document.querySelector("#env-sd-page");
  t && window.ENVVideos?.release(t);
}
async function We(t, e, n, a) {
  Z.matches || (J = t.animate([{ opacity: e }, { opacity: n }], { duration: a, easing: "ease", fill: "forwards" }), await J.finished.catch(() => {
  }));
}
async function wt() {
  if (window.ENVSD) {
    le();
    return;
  }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error("Install the matching SD head block before enabling navigation");
  const t = wn(), e = window.ENVSDTransition === "mask", n = window.ENVSDPreload !== !1;
  document.documentElement.dataset.envTransitionMode = e ? "mask" : "classic";
  const a = window.Webflow, o = await dt(a), { ix2: i, ix3: s } = o, d = { ...Et, runtimeCompatible: o.compatible };
  let l;
  const c = [...document.querySelectorAll('link[rel="stylesheet"]')].map((r) => r.getAttribute("href")), f = [...document.scripts].map((r) => r.src).filter((r) => r.includes("/gsap/"));
  Ce(document), Y = Ve(document);
  const u = He(document, Tt(), c, { refreshRuntime: !0, gsapScripts: f, ...d, inlineScripts: [...he, ...Y.sources] });
  Y.story && window.ENVAboutPageTest?.destroy(), Y.hero && document.querySelector(".hero-about")?.__envReleaseCleanup?.();
  let g;
  const p = async (r) => !r.runtimeChanged && !r.currentExport ? it : (g ||= import("./runtime-config-Dr6I2voi.js"), (await g).runtimeConfig([...new Set([r.bootstrap, ...r.dataScripts || []].filter(Boolean))], r.site)), I = /* @__PURE__ */ new Set(), E = (r) => {
    const m = [];
    /data-env-(?:reveal|text)=/.test(r) && m.push("animations.js"), /class=["'][^"']*\bsd-slider\b/.test(r) && m.push("hero.js"), /data-env-hero-shape/.test(r) && m.push("hero-shape.js"), /data-env-page-animation=["']about["']/.test(r) && m.push("about-page.js"), m.forEach((v) => {
      if (I.has(v)) return;
      I.add(v);
      const h = document.createElement("link");
      h.rel = "prefetch", h.as = "script", h.href = new URL(v, ee).href, h.dataset.envSdPrefetch = "", document.head.append(h);
    });
  }, T = (r) => {
    E(r);
    const m = [...r.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((h) => h[1]), v = m.find((h) => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(h));
    if (!(!v || Object.values(we).some((h) => !h.currentExport && h.scripts.includes(v))))
      return p({ runtimeChanged: !0, bootstrap: v, dataScripts: m.filter((h) => h.includes("/js/webflow.")).slice(2), site: u.site });
  }, b = async () => {
    if (a.require("slider")?.ready) return;
    const r = u.slider || we["/home-sd"].slider;
    await D(r.script);
    let m = !1;
    if (window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, (v) => {
      v(r.factory), m = !0;
    }]), !m || !a.require("slider")?.ready) throw Error("Audited slider factory unavailable");
  };
  l = o.native, Xe(document), Re(), oe = e ? null : $n(), document.head.querySelectorAll("style").forEach((r) => {
    u.styles.includes(r.textContent) && (r.dataset.envSdPageStyle = "");
  }), await window.ENVSDLoader?.prepare?.(), await qe(), document.querySelector(".navbar-logo-center")?.setAttribute("data-env-ignore", "");
  const O = new qn({
    containers: ["#env-sd-page"],
    animationSelector: !1,
    cache: n,
    plugins: [new et({ animateScroll: { betweenPages: !1, samePageWithHash: !Z.matches, samePage: !Z.matches } })],
    linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])",
    ignoreVisit: (r, { el: m } = {}) => {
      const v = new URL(r, location.href);
      return v.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(v.pathname) || !!m?.closest("[data-no-swup]");
    }
  });
  window.ENVSD = { swup: O, status: "ready" }, n && (window.ENVSD.stopPreload = Wn(O, { warmPage: T, delay: 400, concurrency: 2 }), p(u).catch(() => {
  })), document.documentElement.setAttribute("data-env-sd-document", crypto.randomUUID()), O.replaceContent = (r) => {
    const m = document.querySelector("#env-sd-page"), v = r.to.document?.querySelector("#env-sd-page");
    return !m || !v ? !1 : (window.ENVVideos?.stage(v), m.replaceWith(v), document.title = r.to.document.querySelector("title")?.textContent || "", !0);
  }, O.hooks.before("visit:start", (r) => {
    e && r.animation.animate && (t.capture(), t.depart());
  }), O.hooks.replace("animation:out:await", async () => {
    e || await We(document.querySelector("#env-sd-page"), 1, 0, 200);
  }), O.hooks.replace("content:replace", async (r, m, v) => {
    const h = r.to.document;
    if (!h || !v) throw Error("Missing incoming page");
    Ce(h);
    const L = Ve(h), k = He(h, new URL(r.to.url, location.href).pathname, c, { refreshRuntime: !0, gsapScripts: f, ...d, inlineScripts: [...he, ...L.sources] }), N = await p(k);
    if (h.querySelectorAll(".navbar-logo-center a[href]").length !== document.querySelectorAll(".navbar-logo-center a[href]").length) throw Error("Menu structure changed");
    const M = Xe(h);
    if (M.classList.add("env-sd-pending"), e && M.setAttribute("data-env-alt-reveal-wait", ""), M.querySelector(".w-slider") && !a.require("slider")?.ready) {
      await b();
      const w = a.require("slider");
      l.includes(w) || l.push(w);
    }
    window.lenis?.stop(), ht(), l.forEach((w) => w.destroy?.()), i.destroy(), s.destroy(), J?.cancel(), await v(r, m), Re(), Y = L, vt(h), oe?.prepare(), Q(r), await new Promise((w) => requestAnimationFrame(w)), Q(r), e && t.prepare(document.querySelector("#env-sd-page")), l.forEach((w) => w.ready?.()), i.init(N.ix2), await Promise.race([s.ready(), tn(4e3).then(() => {
      throw Error("Webflow interaction restart timeout");
    })]);
    const C = s.getInstance();
    if (!C) throw Error("Webflow interactions did not restart");
    C.setFeatures({ timelineGroups: !1 }), C.register(N.interactions, N.timelines), document.documentElement.classList.add("w-mod-ix3");
  }), O.hooks.replace("animation:in:await", async (r) => {
    Q(r);
    const m = document.querySelector("#env-sd-page");
    if (e) {
      await t.reveal(m);
      try {
        await on();
      } finally {
        m.removeAttribute("data-env-alt-reveal-wait"), window.lenis?.start();
      }
    } else
      await We(m, 0, 1, 350), J?.cancel();
  }), O.hooks.on("page:view", async (r) => {
    try {
      await new Promise((v) => requestAnimationFrame(v)), Q(r), await In({ visit: r, useMask: e, transition: t, root: document.querySelector("#env-sd-page"), lenis: window.lenis, mount: qe }), window.ScrollTrigger?.refresh(), Q(r), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), oe?.commit(), !["localhost", "127.0.0.1"].includes(location.hostname) && typeof window.gtag == "function" && window.gtag("event", "page_view", { page_title: document.title, page_location: location.href });
      const m = It();
      if (m) {
        const v = m.getAttribute("tabindex");
        m.setAttribute("tabindex", "-1"), m.focus({ preventScroll: !0 }), v === null ? m.removeAttribute("tabindex") : m.setAttribute("tabindex", v);
      }
    } catch (m) {
      document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), console.error("[ENV SD] Page initialization failed; native fallback", m), window.location.assign(r.to.url);
    }
  });
  const R = () => {
    document.querySelector("#env-sd-page")?.removeAttribute("data-env-alt-reveal-wait"), t.cleanup(), oe?.refresh(), le(), window.lenis?.start(), J?.cancel(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending");
  };
  O.hooks.on("visit:fail", R), O.hooks.on("visit:abort", R), le(), (async () => {
    if (!window.lenis && !Z.matches)
      try {
        await D("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"), window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: !0, easing: (r) => Math.min(1, 1.001 - Math.pow(2, -10 * r)) }), requestAnimationFrame(function r(m) {
          window.lenis?.raf(m), requestAnimationFrame(r);
        });
      } catch (r) {
        console.warn("[ENV SD] Native scroll retained", r);
      }
  })();
}
const Ot = () => wt().catch((t) => {
  console.error("[ENV SD] Native navigation retained", t), rt(() => D("env.js"), () => {
    [...document.scripts].some((e) => /const brand =/.test(e.textContent) && !/ENV SD/.test(e.textContent)) || an();
  }).catch((e) => console.error("[ENV SD] Widget fallback failed", e)).finally(le);
});
window.Webflow = window.Webflow || [];
window.Webflow.push(Ot);
//# sourceMappingURL=sd-navigation-alternative.js.map
