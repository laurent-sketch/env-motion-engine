const b = {
  "/": () => import("./home-BzINyjtp.js").then((e) => e.default),
  "/about": () => import("./about-DB89lorS.js").then((e) => e.default)
}, S = ["/", "/about"];
async function w(e) {
  const s = b[e];
  if (!s) throw Error("[ENV] Page outside the certified pilot routes");
  return s();
}
function E(e, s, a = !1) {
  if (e.documentElement.getAttribute("data-wf-site") !== s.siteId || e.documentElement.getAttribute("data-wf-page") !== s.pageId || e.querySelectorAll("[data-env-page]").length !== 1) throw Error("[ENV] Page identity/container changed");
  if ([...e.scripts].find((t) => /\/js\/webflow\.[^/]+\.js$/.test(t.src))?.src !== s.bootstrap) throw Error("[ENV] Webflow export changed; refresh the pilot snapshots");
  const o = [...e.querySelectorAll('link[rel="stylesheet"]')].map((t) => t.getAttribute("href")).sort(), f = [...e.querySelectorAll("head style")].map((t) => t.textContent).join(`
`), c = a ? s.stylesheets.every((t) => o.includes(t)) && o.every((t) => s.stylesheets.includes(t) || /^https?:\/\/fonts\.googleapis\.com\//.test(t ?? "")) : JSON.stringify(o) === JSON.stringify(s.stylesheets), y = [...e.querySelectorAll("head style")].map((t) => t.textContent ?? ""), d = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}', p = a ? s.headStyles.every((t) => y.includes(t)) && y.every((t) => s.headStyles.includes(t) || t === d || !t.trim()) : f === s.styles;
  if (!c || !p) throw Error("[ENV] Page styles changed (stylesheets=" + c + ", expected=" + s.headStyles.map((t) => t.length).join(",") + ", actual=" + [...e.querySelectorAll("head style")].map((t) => t.textContent?.length).join(",") + ")");
  for (const t of e.scripts) {
    const h = t.textContent ?? "";
    if (/new\s+Swiper\s*\(/.test(h) || /querySelectorAll\(['"]\.faq-item['"]\)/.test(h)) throw Error("[ENV] Legacy widget script remains");
    if (/CRISP_WEBSITE_ID|client\.crisp\.chat/.test(h + t.src)) throw Error("[ENV] Page-specific chat is not certified for replacement");
    if (t.src) {
      const r = new URL(t.getAttribute("src"), location.href), l = ["127.0.0.1", "localhost"].includes(location.hostname) && r.origin === location.origin && /^\/(?:@vite\/|\.pilot-check\/|tests\/pilot-browser\.ts)/.test(r.pathname);
      if (!(r.href === s.bootstrap || /^https:\/\/ajax\.googleapis\.com\/ajax\/libs\/webfont\//.test(r.href) || /^https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-/.test(r.href) || /^https:\/\/cdn\.prod\.website-files\.com\/gsap\//.test(r.href) || /^https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@12\//.test(r.href)) && !l) throw Error("[ENV] Additional script needs a lifecycle adapter");
    } else if (h.trim() && t.type !== "application/ld+json" && !/WebFont\.load\(|w-mod-|createPilotEngine|createEngine/.test(h))
      throw Error("[ENV] Additional inline script needs a lifecycle adapter");
  }
  if (e.querySelector(".w-form, .w-tabs, .w-slider, .w-background-video")) throw Error("[ENV] Unsupported page component; use native navigation");
}
function g(e) {
  const s = e.querySelector("[data-env-shell]");
  if (s) return s;
  const a = e.createElement("div");
  a.setAttribute("data-env-shell", "");
  const n = [...e.body.childNodes].filter((o) => !(o.nodeType === 1 && o.matches("script, style, link, .w-webflow-badge")));
  return e.body.insertBefore(a, e.body.firstChild), n.forEach((o) => a.appendChild(o)), a;
}
function v(e, s = document) {
  for (const n of ["data-wf-page", "data-wf-site", "lang", "dir"]) {
    const o = e.documentElement.getAttribute(n);
    o === null ? s.documentElement.removeAttribute(n) : s.documentElement.setAttribute(n, o);
  }
  s.body.className = e.body.className, s.head.querySelectorAll("style[data-env-head]").forEach((n) => n.remove()), e.head.querySelectorAll("style").forEach((n) => {
    const o = n.cloneNode(!0);
    o.setAttribute("data-env-head", ""), s.head.append(o);
  });
  const a = 'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], meta[property^="twitter:"], link[rel="canonical"], link[rel="alternate"][hreflang]';
  s.head.querySelectorAll(a).forEach((n) => n.remove()), e.head.querySelectorAll(a).forEach((n) => s.head.append(n.cloneNode(!0)));
}
async function A(e, s) {
  const a = await w(s);
  E(document, a, !0);
  const n = e.require("ix2"), o = e.require("ix3"), f = e.require("navbar"), c = e.require("spline");
  if (!n?.init || !n.destroy || !o?.ready || !o.destroy || !o.getInstance || !f?.ready || !f.destroy) throw Error("[ENV] Unsupported Webflow runtime API");
  document.head.querySelectorAll("style").forEach((r) => {
    a.headStyles.includes(r.textContent ?? "") && r.setAttribute("data-env-head", "");
  }), g(document);
  const y = JSON.stringify(a.stylesheets);
  let d, p = [];
  const t = (r) => {
    let l = !1;
    const i = () => {
      r.removeEventListener("w-spline-load", i), l && c?.destroyInstance(r);
    };
    return r.addEventListener("w-spline-load", i), { release: () => r.removeEventListener("w-spline-load", i), retire: () => {
      l = !0, c?.getInstance(r) && (r.removeEventListener("w-spline-load", i), c.destroyInstance(r));
    } };
  };
  document.querySelectorAll('[data-animation-type="spline"]').forEach((r) => p.push(t(r)));
  const h = () => {
    p.splice(0).forEach((r) => r.retire());
  };
  return {
    async prepare(r, l) {
      const i = await w(new URL(l, location.href).pathname);
      if (E(r, i), JSON.stringify(i.stylesheets) !== y) throw Error("[ENV] Styles differ from the loaded page");
      if (i.spline && (!c?.createInstance || !c.destroyInstance)) throw Error("[ENV] Spline runtime unavailable; loading this page natively");
      g(r), d = i;
    },
    leave() {
      n.destroy(), o.destroy(), f.destroy(), h();
    },
    async enter(r) {
      if (!d) throw Error("[ENV] No prepared page");
      v(r), f.ready(), n.init(d.ix2), await o.ready();
      const l = o.getInstance();
      if (!l) throw Error("[ENV] IX3 did not restart");
      l.setFeatures({ timelineGroups: !1 }), l.register(d.interactions, d.timelines), document.documentElement.classList.add("w-mod-ix3"), document.querySelectorAll('[data-animation-type="spline"]').forEach((i) => {
        const u = i.getAttribute("data-spline-url");
        !u || !c || (p.push(t(i)), c.createInstance(i, u).catch((m) => console.warn("[ENV] Spline scene failed", m)));
      }), d = void 0;
    },
    // Removing ENV does not tear down the native animations of the current page.
    destroy() {
      p.splice(0).forEach((l) => l.release());
      const r = document.querySelector("[data-env-shell]");
      r && r.replaceWith(...r.childNodes);
    }
  };
}
export {
  S as certifiedPaths,
  A as createWebflowNavigation,
  w as snapshotFor,
  v as syncMetadata,
  E as validatePage,
  g as wrapPage
};
//# sourceMappingURL=navigation-rfmZzrDj.js.map
