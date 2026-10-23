import { F as W } from "./Swup.modern-Bls6az6f.js";
import q from "./index.modern-BbQw0Nll.js";
function K(e, { doc: a = document, win: t = window, fetchHTML: f = fetch, now: n = Date.now, ttl: d = 3e5, limit: c = 8, delay: s = 1200 } = {}) {
  const i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), r = new AbortController();
  let p, u = !1, m = !1;
  const I = t.navigator.connection, N = () => I?.saveData || /(^|-)2g$/.test(I?.effectiveType || "");
  function g() {
    for (const [o, b] of i) n() - b >= d && (e.cache.delete(o), i.delete(o));
    for (; i.size > c; ) {
      const o = i.keys().next().value;
      e.cache.delete(o), i.delete(o);
    }
  }
  const T = (o, { page: b }) => {
    i.delete(b.url), i.set(b.url, n()), g();
  };
  e.hooks.on("cache:set", T);
  for (const [o] of e.cache.all || []) i.set(o, n());
  g();
  function O(o) {
    if (!o || o.closest("[data-no-swup]") || o.hasAttribute("download") || o.hasAttribute("target")) return;
    const b = new URL(o.getAttribute("href"), t.location.href);
    if (!(b.origin !== t.location.origin || b.search || b.hash || b.pathname === t.location.pathname || /\.[a-z0-9]+$/i.test(b.pathname)))
      return b.pathname;
  }
  async function R(o) {
    if (g(), m || N() || e.cache.has(o)) return;
    if (l.has(o)) return l.get(o);
    const b = new AbortController(), H = t.setTimeout(() => b.abort(), 4e3), B = (async () => {
      try {
        const S = await f(o, { headers: { "X-Requested-With": "swup", Accept: "text/html" }, credentials: "same-origin", signal: b.signal, priority: "low" });
        if (!S.ok || !S.headers.get("content-type")?.includes("text/html")) return;
        const w = new URL(S.url || o, t.location.href);
        if (w.origin !== t.location.origin || w.pathname !== o || w.search) return;
        const U = await S.text();
        !m && U && U.length < 1e6 && e.cache.set(o, { url: o, html: U });
      } catch {
      } finally {
        t.clearTimeout(H), l.delete(o);
      }
    })();
    return l.set(o, B), B;
  }
  function E() {
    t.clearTimeout(p), !(m || N()) && (p = t.setTimeout(async () => {
      if (u || a.hidden || m) return;
      const o = [...new Set([...a.querySelectorAll(".navbar-logo-center .nav-link-sd[href], .navbar-logo-center .link-menu-overlay[href]")].map(O).filter(Boolean))].slice(0, 3);
      for (const b of o) {
        if (u || m || a.hidden) break;
        await R(b);
      }
    }, s));
  }
  const y = () => {
    u = !0, t.clearTimeout(p);
  }, C = () => {
    u = !1, E();
  }, P = async (o) => {
    g(), o.cache.read && l.has(o.to.url) && await l.get(o.to.url);
  };
  e.hooks.on("visit:start", y), e.hooks.before("page:load", P);
  for (const o of ["page:view", "visit:fail", "visit:abort"]) e.hooks.on(o, C);
  const x = (o) => {
    if (!u && !a.hidden) {
      const b = O(o.target.closest?.(".navbar-logo-center a[href]"));
      b && R(b);
    }
  };
  return a.addEventListener("pointerover", x, { passive: !0, signal: r.signal }), a.addEventListener("focusin", x, { signal: r.signal }), E(), () => {
    m = !0, t.clearTimeout(p), r.abort(), e.hooks.off("cache:set", T), e.hooks.off("visit:start", y), e.hooks.off("page:load", P);
    for (const o of ["page:view", "visit:fail", "visit:abort"]) e.hooks.off(o, C);
  };
}
const $ = /* @__PURE__ */ JSON.parse('{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1755082284250},"e-60":{"id":"e-60","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-354"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755185886210},"e-66":{"id":"e-66","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1755253957866},"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1755520593128},"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530546922},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755530611763},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755706551660},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-136":{"id":"e-136","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb124d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1755783935085},"e-140":{"id":"e-140","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-141":{"id":"e-141","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755852350225},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067163},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1755854067164},"e-154":{"id":"e-154","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-155":{"id":"e-155","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755869299973},"e-156":{"id":"e-156","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755871097680},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755875094862},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755876464121},"e-159":{"id":"e-159","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1755879802104},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756115114996},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629063},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756117629064},"e-167":{"id":"e-167","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5c928fa3-5c86-f61d-5222-e3d93fef5fa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-168":{"id":"e-168","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|7632913a-e772-bc3b-f284-62960dd849c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-169":{"id":"e-169","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-170"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-170":{"id":"e-170","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-169"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1f963de5-8dea-f127-ede3-4d020e0ba26b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-171":{"id":"e-171","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-13","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|cfe9d4b9-7b9a-e2f5-08ff-ffb6a1ba6027","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-13-p","smoothing":52,"startsEntering":false,"addStartOffset":true,"addOffsetValue":30,"startsExiting":false,"addEndOffset":true,"endOffsetValue":10}],"createdOn":1756212521436},"e-172":{"id":"e-172","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-14","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|88dc88ac-c920-941c-d430-1478cfb3b1d0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-14-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-173":{"id":"e-173","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8083effd-286d-c056-cf08-ca1ef610e436","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-16","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|1398327d-77c9-fd5d-5420-2a8053bb6b2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-16-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":true,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756212521436},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-176"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-176":{"id":"e-176","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8621db78-c74c-beb7-73c1-52fe46a7f9e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-177":{"id":"e-177","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-178":{"id":"e-178","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5769f49b-dd7a-a013-fc75-caa3b1b04d85","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-179":{"id":"e-179","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-180"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-180":{"id":"e-180","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|315db6a6-6eab-c82e-ff32-b4324bc4eb4a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-181":{"id":"e-181","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-182"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-182":{"id":"e-182","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-181"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|05a82ee2-2884-b77a-166d-7cd213b8fb76","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-183":{"id":"e-183","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-184"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-184":{"id":"e-184","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-183"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d7c14fbd-e4b3-0f05-cecd-790a83ab3df1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-185":{"id":"e-185","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-186"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-186":{"id":"e-186","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad4637f5-6b95-57f6-0301-cb2aeb43c4c3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-187":{"id":"e-187","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-188"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-188":{"id":"e-188","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-187"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|4ed9bd58-f49d-437c-713d-cbcfb40aecd2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-189":{"id":"e-189","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-190"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-190":{"id":"e-190","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-189"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|f5db6f41-e930-2593-8e22-3379b8d120e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-191":{"id":"e-191","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-192":{"id":"e-192","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9d43549e-3ce5-a7bc-bb1f-742bd14059b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|b659c446-3bd2-1634-3429-6ebac8b9ef57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-199":{"id":"e-199","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-200":{"id":"e-200","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319556","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-201":{"id":"e-201","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|edfb8c43-d845-118c-e130-b09a0f319557","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d1d69ca1-d915-6f5d-14b9-b37e94cc9b3f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-32","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-32-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-4","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6835cfaa-5f2d-51fa-4750-be613923247c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-4-p","smoothing":52,"startsEntering":false,"addStartOffset":false,"addOffsetValue":30,"startsExiting":false,"addEndOffset":false,"endOffsetValue":30}],"createdOn":1756212521436},"e-207":{"id":"e-207","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-208":{"id":"e-208","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-209":{"id":"e-209","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-40","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|9105a1cb-56fb-b590-b573-5d749a12abef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-40-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-210":{"id":"e-210","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74c66cd6-9df5-c719-4566-8803f3e737fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|6380bbca-870c-e09b-b2ae-1a7c6f38371e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-213":{"id":"e-213","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-214":{"id":"e-214","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-215":{"id":"e-215","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-216":{"id":"e-216","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-215"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-217":{"id":"e-217","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-218":{"id":"e-218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f24","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-220":{"id":"e-220","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-221":{"id":"e-221","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-222":{"id":"e-222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f26","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-224":{"id":"e-224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|acd4cd5d-f474-9893-ffa1-24da4ab76f28","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-226":{"id":"e-226","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-29","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc193","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-29-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-227":{"id":"e-227","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-34","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ae16f161-7582-61c3-3c74-f3922fcfc194","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-34-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-228":{"id":"e-228","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":20,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-36","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|74db42d9-ed3d-e77d-5b24-b9dade36fffd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-36-p","smoothing":50,"startsEntering":true,"addStartOffset":true,"addOffsetValue":10,"startsExiting":true,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-230":{"id":"e-230","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-35","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|ad05cddf-9fb4-5e07-519a-af8fa115891b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-35-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-231":{"id":"e-231","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-37","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|d48797d6-991f-e29f-3ce5-bf55ca424915","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-37-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-232":{"id":"e-232","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|a11ce7bf-720c-b423-b7ad-a56de030e19e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756212521436},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|df3a989e-203b-cc90-aae9-7c7157d5b016","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-235":{"id":"e-235","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|906c32de-2295-9f98-e15c-bbe624840b1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-237":{"id":"e-237","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3c|46d2b824-dcbb-ee30-c5e2-ac30989da6b4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756212521436},"e-239":{"id":"e-239","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ee65202f-5ec5-dd10-adf8-9be98b1d7927","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1756213073122},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|ec36c25b-9dbe-2aed-0e29-667e36621186","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756215368838},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|d05a2f7f-fa8e-0b2b-5ecc-a6c8b5ac4f55","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756217402865},"e-246":{"id":"e-246","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-247"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|0da5fc5c-d841-bd9b-1ed9-49a75b766d9f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756218000274},"e-248":{"id":"e-248","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-61","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|9f92ce4b-1a9b-7ec1-b02e-e98c31bdc566","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-61-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756219072551},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-44","affectedElements":{},"duration":0}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|72cbf073-4b86-8d84-8046-b0193b288ac8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-44-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756285635295},"e-252":{"id":"e-252","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":35}],"createdOn":1756289409368},"e-253":{"id":"e-253","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"76b1f557-5f02-a651-3803-cb6eee7efaa5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-255":{"id":"e-255","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-256":{"id":"e-256","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main"],"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e14894b1-5739-3549-2969-eb4487eb1251","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756298500271},"e-257":{"id":"e-257","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-258"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450212},"e-258":{"id":"e-258","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-257"}},"mediaQueries":["main"],"target":{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4aae147-2764-0c46-e6ed-d77f02b17282","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756300450213},"e-261":{"id":"e-261","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-262":{"id":"e-262","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-261"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942289},"e-263":{"id":"e-263","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-264"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-264":{"id":"e-264","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-263"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756302942428},"e-267":{"id":"e-267","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-268":{"id":"e-268","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369697371},"e-269":{"id":"e-269","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-270":{"id":"e-270","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba2edb01-54df-c3f8-2a3c-0c3d16abebd4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756369712813},"e-271":{"id":"e-271","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756479519311},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-54","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|cf4d5725-77de-bca2-22f9-9322a951bba2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-54-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756717531882},"e-274":{"id":"e-274","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-53","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|8eab8eb5-40fb-95cb-abef-e33f4552b2ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-53-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756806270936},"e-322":{"id":"e-322","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756810004678},"e-323":{"id":"e-323","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756810004678},"e-324":{"id":"e-324","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-55","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-325"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3d","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756810004678},"e-326":{"id":"e-326","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-41","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-41-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":20}],"createdOn":1756811004558},"e-327":{"id":"e-327","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-26","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e|84e5c1bb-770d-c7c4-9e66-39403cd234b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-26-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1756811004558},"e-328":{"id":"e-328","name":"","animationType":"preset","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-329"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f3e","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756811004558},"e-330":{"id":"e-330","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-332":{"id":"e-332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-333"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-334":{"id":"e-334","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-335"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-335":{"id":"e-335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-334"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5f8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-336":{"id":"e-336","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-337"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-338":{"id":"e-338","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-339"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|14b84b42-25c4-5109-a00a-49308680c5fc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756818567276},"e-340":{"id":"e-340","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-341"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338311},"e-341":{"id":"e-341","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-340"}},"mediaQueries":["medium","small"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886338312},"e-342":{"id":"e-342","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-343"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358713},"e-343":{"id":"e-343","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-342"}},"mediaQueries":["tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|85940e19-be11-803e-78ed-6ef1852d00cc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756886358714},"e-344":{"id":"e-344","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|39dbbf89-80dd-339b-0c7b-93a161934a0b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894354535},"e-346":{"id":"e-346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-347"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|b9a33866-ae84-92c1-21eb-df11cbc7b24f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894852503},"e-348":{"id":"e-348","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-59","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|5cc0c0b2-cb36-b18b-c681-7a3561d7c7f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756894943483},"e-350":{"id":"e-350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-351"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894636},"e-351":{"id":"e-351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-350"}},"mediaQueries":["main"],"target":{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2955dea-2ce2-2aff-220b-61f902c02fd0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1756297894672},"e-352":{"id":"e-352","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-62","affectedElements":{},"duration":0}},"mediaQueries":["tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-62-p","smoothing":80,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1788970142603},"e-353":{"id":"e-353","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-63","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97347127-f873-24f4-8ff6-ec8c0637b326","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-63-p","smoothing":50,"startsEntering":false,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1789722760158},"e-354":{"id":"e-354","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-355"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a5ef9b86-4d51-c897-bb59-4a358ad336ae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1784644100563},"e-356":{"id":"e-356","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-357"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-357":{"id":"e-357","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-356"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f78","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-358":{"id":"e-358","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-359"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-359":{"id":"e-359","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-358"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-360":{"id":"e-360","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-361"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-361":{"id":"e-361","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-362":{"id":"e-362","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-363"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-363":{"id":"e-363","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-362"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-364":{"id":"e-364","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-365"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-365":{"id":"e-365","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-364"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|758d57b3-e1a9-86cf-422c-28860ce38f89","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075308105},"e-366":{"id":"e-366","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-367"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-367":{"id":"e-367","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-366"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee10d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-368":{"id":"e-368","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-369"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-369":{"id":"e-369","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-368"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee110","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-370":{"id":"e-370","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-371"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-371":{"id":"e-371","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-370"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee113","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-372":{"id":"e-372","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-373":{"id":"e-373","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-374":{"id":"e-374","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-375"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-375":{"id":"e-375","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-374"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|a85efce6-3d49-a95d-d278-e8e67dcee11e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075317787},"e-376":{"id":"e-376","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-377"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-377":{"id":"e-377","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-376"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004756","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-378":{"id":"e-378","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-379"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-379":{"id":"e-379","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-378"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004759","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-380":{"id":"e-380","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-381"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-381":{"id":"e-381","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-380"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e00475c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-382":{"id":"e-382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-383":{"id":"e-383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-384":{"id":"e-384","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-385"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-385":{"id":"e-385","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-384"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|08c7ae8b-a7b0-5f2c-cca6-de8c3e004767","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792075369826},"e-386":{"id":"e-386","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|852e733e-0b3e-a626-f7e2-3c8641abd719","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792143403693},"e-388":{"id":"e-388","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-67","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-67-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792144646842},"e-389":{"id":"e-389","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|94eaae59-8f45-2a9d-2044-b86417cc5393","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792406953011},"e-390":{"id":"e-390","name":"","animationType":"preset","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"SLIDE_EFFECT","instant":false,"config":{"actionListId":"slideInBottom","autoStopEventId":"e-391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad0cb2816e9afd85c684ff1|8907913e-4e46-c043-bf9b-ab62f8086112","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":0,"direction":"BOTTOM","effectIn":true},"createdOn":1792407576931},"e-396":{"id":"e-396","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-72","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"},"targets":[{"selector":".project-row","originalId":"6ad616f21f8cbecf97edd7bc|64fcf308-ae86-0a3b-ae90-9abe98b605b2","appliesTo":"CLASS"}],"config":[{"continuousParameterGroupId":"a-72-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792428529433},"e-398":{"id":"e-398","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-399"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1792485126279},"e-400":{"id":"e-400","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-70","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-70-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487033715},"e-401":{"id":"e-401","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc|97716614-2b7c-786e-e7bc-f05fd43c7984","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487214244},"e-402":{"id":"e-402","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-74","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|bf432e35-71d8-6096-3a1a-e825c8e8146c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-74-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487313748},"e-403":{"id":"e-403","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792487915879},"e-404":{"id":"e-404","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-75","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"6ad616f21f8cbecf97edd7bc","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-75-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792488478134},"e-405":{"id":"e-405","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-76","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|93c80bcc-b53d-4434-638d-fef5de27c72b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-76-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":30}],"createdOn":1792493994486},"e-406":{"id":"e-406","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad88b6cba1a7277fb148e6d|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792583833272},"e-407":{"id":"e-407","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad887d71c76507742d263fd|76c24629-1f25-3830-3971-8259a4f8690c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583940147},"e-408":{"id":"e-408","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad883e4d375bd5dc8fcd9b1|3961fb43-c30a-8598-6033-0cdf66efb885","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792583959514},"e-409":{"id":"e-409","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad9f3987d61e40e5753e56d|29ebfa55-3979-a437-daae-7536446e4aa9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":true,"endOffsetValue":80}],"createdOn":1792669014788},"e-410":{"id":"e-410","name":"","animationType":"custom","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ada10acf7b862f8202a551a|0ba40ec7-8b5f-b564-3669-ba3bfbb328b7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792684178623},"e-412":{"id":"e-412","name":"","animationType":"preset","eventTypeId":"SCROLLING_IN_VIEW","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-69","affectedElements":{},"duration":0}},"mediaQueries":["main","medium"],"target":{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6adb1bf31beca6c8f035e7c7|a22bcd30-fea0-f602-9cf2-b83b77af79d2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-69-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1792746547632},"e-413":{"id":"e-413","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-414"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-414":{"id":"e-414","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-415":{"id":"e-415","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-416"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-416":{"id":"e-416","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-415"}},"mediaQueries":["main"],"target":{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749085640},"e-417":{"id":"e-417","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-418"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609184},"e-418":{"id":"e-418","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-417"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5c63dd3b-9269-492b-77fb-685ce22fed6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749609186},"e-419":{"id":"e-419","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-420"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-420":{"id":"e-420","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-419"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6ad72f57e23d005096ad353f|676ec004-ce77-ce02-0534-f6af20d53033","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749777690},"e-421":{"id":"e-421","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-422"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295},"e-422":{"id":"e-422","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-421"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f4b3b24c-ad2c-ca90-0df8-1338e27cc32c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1792749800295}},"actionLists":{"a-4":{"id":"a-4","title":"Hero Big Title | Fade Reveal","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n-9","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":25,"actionItems":[{"id":"a-4-n-11","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-10","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]},{"keyframe":50,"actionItems":[{"id":"a-4-n-12","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-13","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":75,"actionItems":[{"id":"a-4-n-15","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-4-n-14","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-4-n-17","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"keyframe":100,"actionItems":[{"id":"a-4-n-16","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}},{"id":"a-4-n-18","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".orange-span","selectorGuids":["5eb64682-4ab6-7967-bd76-f227acf06ff4"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}]}],"createdOn":1755103578616},"a-11":{"id":"a-11","title":"\\"Quote\\" | Reveal On Hover","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}},{"id":"a-11-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}},{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":20,"yValue":null,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-12":{"id":"a-12","title":"\\"Quote\\" | Hide on Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-12-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".client-name.dark-blue","selectorGuids":["ec67e816-8348-56c9-deaf-5328c3627399","0e76991b-514e-14b9-79bc-577afdbcc788"]},"globalSwatchId":"--_colors---off-white","rValue":238,"bValue":224,"gValue":236,"aValue":1}},{"id":"a-12-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659295499},"a-13":{"id":"a-13","title":"Slider | Scroll Moving","continuousParameterGroups":[{"id":"a-13-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":0,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slider-wrapper","selectorGuids":["2bc92929-0934-239b-940c-eb44ed201c03"]},"xValue":-180.5,"xUnit":"vw","yUnit":"PX","zUnit":"PX"}}]}]}],"createdOn":1755254411359},"a-16":{"id":"a-16","title":"Moving | Contact Bloc","continuousParameterGroups":[{"id":"a-16-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-16-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":-20,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.orange","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","f9f90cd0-7675-ff6c-71d0-a5ce130c0ed3"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".contact-item.blue","selectorGuids":["28d2b782-59fe-ed36-d7dd-065a2c9794a7","81134e2f-106f-565b-bd7e-fdedefd8f8e8"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755520603487},"a-20":{"id":"a-20","title":"Bio Members | Fade In","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"flex"}},{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755528746326},"a-18":{"id":"a-18","title":"Team Members | Hover In","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-18-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}},{"id":"a-18-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":1,"unit":""}},{"id":"a-18-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":1,"unit":""}},{"id":"a-18-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755526280358},"a-19":{"id":"a-19","title":"Team Members | Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"inOutQuart","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".overlay-team-member","selectorGuids":["5d980a01-cd43-4090-cb74-dfd46b2a984e"]},"value":0,"unit":""}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuart","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".overlay-btn.stc","selectorGuids":["03bba5b4-5653-b26d-eb05-adc89169f6be","5c8faf76-8e52-9590-19a1-7b1af70a538e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755526280358},"a-21":{"id":"a-21","title":"Bio Members | Close Fade Out","actionItemGroups":[{"actionItems":[{"id":"a-21-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".bio-member-wrapper","selectorGuids":["865753d7-ed39-a393-bde4-269692d22a7e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755528746326},"a-27":{"id":"a-27","title":"Menu Modal in 2","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-27-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-7","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-27-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-27-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-27-n-14","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-28":{"id":"a-28","title":"Menu Modal Out 2","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-28-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"e14894b1-5739-3549-2969-eb4487eb124d"},"value":0}}]},{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-30":{"id":"a-30","title":"(D) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-30-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":712,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-30-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-30-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-31":{"id":"a-31","title":"(D) Testimonial | View Less","actionItemGroups":[{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-31-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1755852982792},"a-29":{"id":"a-29","title":"Burger Overlap","continuousParameterGroups":[{"id":"a-29-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-29-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":19,"actionItems":[{"id":"a-29-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755794506046},"a-34":{"id":"a-34","title":"Playing Lottie w/ Image","continuousParameterGroups":[{"id":"a-34-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-34-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-34-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]},{"keyframe":65,"actionItems":[{"id":"a-34-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}},{"id":"a-34-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":75,"actionItems":[{"id":"a-34-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}},{"id":"a-34-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":1,"unit":""}}]},{"keyframe":85,"actionItems":[{"id":"a-34-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":0,"unit":""}},{"id":"a-34-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._2","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","7aef3b3b-e80f-5fe6-f77c-60c37594c438"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-34-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._3","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","608d1eab-c825-4086-c1ce-260719a9fb3c"]},"value":1,"unit":""}}]}]}],"createdOn":1755264981960},"a-35":{"id":"a-35","title":"100% | Mask Moving","continuousParameterGroups":[{"id":"a-35-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-35-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":100,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-overlap-full-width.reveal-on-scroll","selectorGuids":["66e63b2d-e400-9eb1-938c-85fc916f85a7","fbed4100-fb87-3bc4-fad8-70d5f12ab641"]},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-36":{"id":"a-36","title":"100% | Text On Mask Moving","continuousParameterGroups":[{"id":"a-36-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-36-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":-540,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"keyframe":42,"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":0,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-36-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-36-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-burger._1","selectorGuids":["a948bde1-dd09-b6a2-dbf2-086d89ffc468","903bbe52-7bc2-ed76-2869-717039ec0b97"]},"value":1,"unit":""}}]}]}],"createdOn":1755871103819},"a-37":{"id":"a-37","title":"100% | Mask Moving Parallax","continuousParameterGroups":[{"id":"a-37-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-37-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":-20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":96,"actionItems":[{"id":"a-37-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".img-100","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d"]},"yValue":20,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-54":{"id":"a-54","title":"Lottie | Parallax 2.1","continuousParameterGroups":[{"id":"a-54-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-54-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-54-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-1","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","5181b581-843a-59c9-e299-1378ed2b1071"]},"value":100}}]}]}],"createdOn":1755773678347},"a-50":{"id":"a-50","title":"Hover IN | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-50-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-51":{"id":"a-51","title":"Hover OUT | Footer Links 2","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-14":{"id":"a-14","title":"Playing Lottie","continuousParameterGroups":[{"id":"a-14-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-14-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":45,"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":0,"unit":""}}]},{"keyframe":55,"actionItems":[{"id":"a-14-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h3.white.center","selectorGuids":["e783a187-9200-ba2d-8cc4-e7214bd96c6a","07bcb2c1-4c05-9031-cb89-bf47571f2c46","70923a37-5128-d1de-87bc-9a9beb4e0bfd"]},"value":1,"unit":""}}]},{"keyframe":100,"actionItems":[{"id":"a-14-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-32":{"id":"a-32","title":"Playing Lottie without Text","continuousParameterGroups":[{"id":"a-32-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-32-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":1}}]},{"keyframe":100,"actionItems":[{"id":"a-32-n-4","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".lottie-animation","selectorGuids":["8db0ade0-16a5-ef3f-6199-69261511b221"]},"value":99}}]}]}],"createdOn":1755264981960},"a-40":{"id":"a-40","title":"Lottie | Parallax 3","continuousParameterGroups":[{"id":"a-40-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-40-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-40-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3c|1ee1e152-6be2-bd2a-f4a2-3bc419d137d7"},"value":100}}]}]}],"createdOn":1755773678347},"a-41":{"id":"a-41","title":"02 DESIGN | Content Animation 2","continuousParameterGroups":[{"id":"a-41-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":5,"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":1,"unit":""}},{"id":"a-41-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":1,"unit":""}}]},{"keyframe":8,"actionItems":[{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h4.abs.alone","selectorGuids":["86716b53-5ec8-1f80-666c-a76f43673f92","ee08e203-c2ac-507a-a589-17aed11efeff","0b7b827b-83a6-495d-2d56-0f6755d7e14b"]},"value":0,"unit":""}},{"id":"a-41-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-cta-block.abs","selectorGuids":["baecbe8e-06e6-9522-55dd-f78fc3d2115d","6254371e-552e-d6c6-d789-7b3808e0e372"]},"value":0,"unit":""}}]},{"keyframe":20,"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":1,"unit":""}},{"id":"a-41-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":1,"unit":""}}]},{"keyframe":40,"actionItems":[{"id":"a-41-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._1","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","e90b7771-0510-a62d-eadb-d1f60ceb3695"]},"value":0,"unit":""}},{"id":"a-41-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._0","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","85dd17ab-92c2-b5d7-ba39-93a14d843ace"]},"value":0,"unit":""}},{"id":"a-41-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}}]},{"keyframe":60,"actionItems":[{"id":"a-41-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":1,"unit":""}},{"id":"a-41-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":1,"unit":""}}]},{"keyframe":80,"actionItems":[{"id":"a-41-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._2","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","2c7c7347-e728-0bda-254d-e6448b99e735"]},"value":0,"unit":""}},{"id":"a-41-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":0,"unit":""}},{"id":"a-41-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._2","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","a065387a-bfb9-d51e-fec1-345dce809e8b"]},"value":0,"unit":""}},{"id":"a-41-n-18","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":0,"unit":""}}]},{"keyframe":95,"actionItems":[{"id":"a-41-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-container.absolute._3","selectorGuids":["e3cd08ae-ff77-6415-4844-0b56932cb113","f796bf7e-0cde-0dec-e414-368c02da6f47","ec971a1f-35e5-fe80-7731-1b114223226e"]},"value":1,"unit":""}},{"id":"a-41-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-team-design._3","selectorGuids":["fdd659cd-62e2-26bb-bd7f-5339c691d81b","f2b68c44-14f0-1a3d-4566-d1c01e5ffdf9"]},"value":1,"unit":""}}]}]}],"createdOn":1755857273626},"a-26":{"id":"a-26","title":"Lottie | Parallax 2","continuousParameterGroups":[{"id":"a-26-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-26-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-26-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975"]},"value":100}}]}]}],"createdOn":1755773678347},"a-38":{"id":"a-38","title":"Hover IN | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":0,"yValue":0,"xUnit":"%","yUnit":"%","zUnit":"PX"}},{"id":"a-38-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":100,"yValue":-100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-42":{"id":"a-42","title":"HERO | Title Reveal","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-5","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}},{"id":"a-42-n-7","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"","rValue":217,"bValue":217,"gValue":217,"aValue":1}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._1","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","63c7084f-2421-4d12-849a-c21e0bcb9865"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._2","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","bb7baa61-cf14-f60a-3a42-ea0fcb1b32e2"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-6","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1000,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._3","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","4fb3cfbe-b048-767b-0e79-cbe86f57fbf9"]},"globalSwatchId":"--_colors---centered-orange","rValue":240,"bValue":18,"gValue":99,"aValue":1}},{"id":"a-42-n-8","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":1500,"easing":"","duration":800,"target":{"useEventTarget":"CHILDREN","selector":".h1.center._4","selectorGuids":["26849952-6c06-da76-f369-bfea3f6aa76a","7b4b1a84-e897-74fc-3c75-e8ba3061eedd","f9ef421c-41ba-8c7e-2cae-f512e9c7d8a8"]},"globalSwatchId":"--_colors---dark-blue","rValue":17,"bValue":58,"gValue":43,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756213078962},"a-53":{"id":"a-53","title":"Lottie | Parallax 2.0","continuousParameterGroups":[{"id":"a-53-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-53-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-53-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2-0","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","2cbc6f2a-b26e-77b2-e995-81c6dc4bd6e6"]},"value":100}}]}]}],"createdOn":1755773678347},"a-59":{"id":"a-59","title":"\\"Quote\\" | Reveal On Hover Mobile","actionItemGroups":[{"actionItems":[{"id":"a-59-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]},{"actionItems":[{"id":"a-59-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1601659228000},"a-61":{"id":"a-61","title":"Lottie | Parallax D-only","continuousParameterGroups":[{"id":"a-61-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-61-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":0}}]},{"keyframe":100,"actionItems":[{"id":"a-61-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".parralax-lottie._2.d-only","selectorGuids":["9fda1dbf-55e7-87db-66f2-207797540a30","4c4d29c3-9cad-9fd3-01fa-c34f09c7f975","2611b0a0-5034-1373-c0a9-0960287c6d97"]},"value":100}}]}]}],"createdOn":1755773678347},"a-44":{"id":"a-44","title":"100% Tablet | Mask Moving","continuousParameterGroups":[{"id":"a-44-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-44-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-44-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".img-100.tablet","selectorGuids":["d3a86229-a340-3b86-b288-2aab0254694d","0ce20de0-60bc-dc2d-8bd9-a3d5f9ca3ab1"]},"yValue":-30,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1755871103819},"a-45":{"id":"a-45","title":"BTN | Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-45-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-45-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-46":{"id":"a-46","title":"BTN | Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-46-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-49":{"id":"a-49","title":"Hover OUT | Footer Links","actionItemGroups":[{"actionItems":[{"id":"a-49-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-static","selectorGuids":["b4fa7f38-0a25-35d2-e8fb-adddbe983b96"]},"xValue":0,"yValue":0,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-49-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":50,"easing":[0.5,0,0,1],"duration":600,"target":{"useEventTarget":"CHILDREN","selector":".icon-abs","selectorGuids":["87a5010a-77fb-7758-5565-44cb3286b12d"]},"xValue":-100,"yValue":100,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-52":{"id":"a-52","title":"LOADING | Intro","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-52-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-52-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-52-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-52-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f38|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-52-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-52-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-55":{"id":"a-55","title":"LOADING | Intro 2","actionItemGroups":[{"actionItems":[{"id":"a-55-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-55-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-55-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-55-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-55-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-55-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-55-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-55-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3d|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-56":{"id":"a-56","title":"LOADING | Intro 3","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":0,"unit":""}},{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":0,"unit":""}},{"id":"a-56-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-56-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124e"},"value":1,"unit":""}},{"id":"a-56-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|06646223-8e83-f3c5-0092-5aefc18d63a7"},"value":1,"unit":""}},{"id":"a-56-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb1250"},"value":1,"unit":""}},{"id":"a-56-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"","duration":500,"target":{"id":"68bb0b6fbfff68e3dfd32f3e|e14894b1-5739-3549-2969-eb4487eb124a"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756479547162},"a-57":{"id":"a-57","title":"(T) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-57-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-57-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-57-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":792,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-57-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-57-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-58":{"id":"a-58","title":"(M) Testimonial | View More","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":0,"unit":""}},{"id":"a-58-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-58-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":1000,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"widthValue":100,"heightValue":892,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-58-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".view-more-wrapper","selectorGuids":["a40eebc8-02f8-75fc-526b-84f0562257c2"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btnpr-1st","selectorGuids":["11e1ab55-266d-00b2-83ca-3f2680fc6b5b"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1755852982792},"a-60":{"id":"a-60","title":"\\"Quote\\" | Reveal Hover Out Mobile","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".testimonial-item.bottom-left","selectorGuids":["fc8ef793-ccfc-1078-24b5-4050162cbd8d","fad21a9e-9790-9442-4c3d-c5cf8409610a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1601659228000},"a-62":{"id":"a-62","title":"ENV 27 | SD","continuousParameterGroups":[{"id":"a-62-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":30,"actionItems":[{"id":"a-62-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-62-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-62-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-63":{"id":"a-63","title":"ENV 27","continuousParameterGroups":[{"id":"a-63-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-63-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-63-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-63-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1788970150795},"a-64":{"id":"a-64","title":"Fadein Scale","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":0.99,"yValue":0.99,"locked":true}},{"id":"a-64-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":200,"easing":"outQuart","duration":750,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6a58a980515c70b4043c4cfd|94e8b972-1560-04d6-6eda-8925746425f7"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1784299779426},"a-65":{"id":"a-65","title":"Hover IN | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"--_colors---pure-white","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756117634304},"a-66":{"id":"a-66","title":"Hover OUT | Footer Links 3","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".global-text.white.ch-60","selectorGuids":["1cd55c9e-34ed-ea0b-ff0d-e22673383dea","bfc89ecb-1780-c0f0-ecf6-9ef2c523036e","0f70697d-cfb7-c384-4bb3-3028044a8eb5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":0.3}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756117634304},"a-67":{"id":"a-67","title":"Hero Parralax","continuousParameterGroups":[{"id":"a-67-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-67-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-67-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-67-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad0cb2816e9afd85c684ff1|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-69":{"id":"a-69","title":"Footer Move","continuousParameterGroups":[{"id":"a-69-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-69-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-69-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-72":{"id":"a-72","title":"Project Apparation","continuousParameterGroups":[{"id":"a-72-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-72-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-72-n-3","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":10,"unit":"px"}]}}]},{"keyframe":30,"actionItems":[{"id":"a-72-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-72-n-4","actionTypeId":"STYLE_FILTER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|4e80d7e4-7abf-0b0e-eb88-05a1e276b3aa"},"filters":[{"type":"blur","filterId":"c92b","value":0,"unit":"px"}]}}]}]}],"createdOn":1792428347426},"a-73":{"id":"a-73","title":"Big Logo Footer Anim","actionItemGroups":[{"actionItems":[{"id":"a-73-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":3,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":0,"unit":""}},{"id":"a-73-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-73-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-73-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":1600,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-73-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"6ad616f21f8cbecf97edd7bc|bb8667a1-61eb-e76b-c180-dc8e089fad3c"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1792485129495},"a-70":{"id":"a-70","title":"Hero Parralax 2","continuousParameterGroups":[{"id":"a-70-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-70-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-70-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-70-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad616f21f8cbecf97edd7bc|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-74":{"id":"a-74","title":"Hero Parralax 3","continuousParameterGroups":[{"id":"a-74-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-74-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-74-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-74-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":0,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]},{"keyframe":70,"actionItems":[{"id":"a-74-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|f1ec4598-c172-8532-ec98-11a15c6749be"},"yValue":60,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-74-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|3f6cf10c-d349-571c-19bb-cf48f38ba0dd"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}},{"id":"a-74-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"6ad72f57e23d005096ad353f|8e0da65b-6642-7516-d410-b16aa5676e4c"},"yValue":30,"xUnit":"PX","yUnit":"vh","zUnit":"PX"}}]}]}],"createdOn":1792144653502},"a-75":{"id":"a-75","title":"Footer Move 2","continuousParameterGroups":[{"id":"a-75-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":60,"actionItems":[{"id":"a-75-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":-150,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".main-row.footer","selectorGuids":["0593772e-8ef5-4ecd-8ef7-f10bbcb370af","51456470-2735-88ed-9126-2ab5a17eaa42"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792400108921},"a-76":{"id":"a-76","title":"Gradient Move","continuousParameterGroups":[{"id":"a-76-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-76-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":70,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]},{"keyframe":100,"actionItems":[{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".shape-gradient","selectorGuids":["2069c46c-c858-f7ab-f17c-64481d3dfaf5"]},"yValue":-50,"xUnit":"PX","yUnit":"%","zUnit":"PX"}}]}]}],"createdOn":1792493736787},"a-77":{"id":"a-77","title":"Menu Modal in 3","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-77-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"flex"}},{"id":"a-77-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-77-n-6","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":99}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-78":{"id":"a-78","title":"Menu Modal Out 3","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-78-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"68bb0b6fbfff68e3dfd32f38|7b2fe46a-81ea-f04e-8ddc-1459f4d9f5a6"},"value":0}}]},{"actionItems":[{"id":"a-78-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"a-79":{"id":"a-79","title":"BTN | Hover IN 2","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":-5,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-79-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":-100,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-79-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":200,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1756297897986},"a-80":{"id":"a-80","title":"BTN | Hover OUT 2","actionItemGroups":[{"actionItems":[{"id":"a-80-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":[0.5,0,0,1],"duration":800,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"yValue":0,"xUnit":"PX","yUnit":"%","zUnit":"PX"}},{"id":"a-80-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-btn","selectorGuids":["559cc73f-d097-9e10-0098-7131670e0d54"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1756297897986},"a-22":{"id":"a-22","title":"Menu Modal in","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"none"}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-22-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-13","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-22-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":"block"}},{"id":"a-22-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":300,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":1,"unit":""}},{"id":"a-22-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":500,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-22-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":-4.5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700003705731},"a-23":{"id":"a-23","title":"Menu Modal out","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"yValue":-3.125,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":750,"target":{"selector":".menu-modal","selectorGuids":["caf9e05f-daa0-b031-83c0-0f34141e6e30"]},"value":0,"unit":""}},{"id":"a-23-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.top","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","3f258aae-8f18-53ff-4137-d2aabbcc31b2"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":750,"target":{"useEventTarget":"CHILDREN","selector":".line-burger.bottom","selectorGuids":["79469c08-085f-4312-9125-b99fcb7e3195","43e104ff-d63d-bca4-1f56-4055bd517770"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700003705731},"slideInBottom":{"id":"slideInBottom","useFirstGroupAsInitialState":true,"actionItemGroups":[{"actionItems":[{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":0}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"duration":0,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":100,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"xValue":0,"yValue":0,"xUnit":"PX","yUnit":"PX","zUnit":"PX"}},{"actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuart","duration":1000,"target":{"id":"N/A","appliesTo":"TRIGGER_ELEMENT","useEventTarget":true},"value":1}}]}]}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'), Z = [{ id: "i-3369b7ea", scope: { type: "site" }, triggers: [["wf:scroll", { controlType: "scroll", scrollTriggerConfig: { clamp: !0, start: "top 60%", end: "bottom top", scrub: 0.8, enter: "play", leave: "none", enterBack: "none", leaveBack: "none" } }, ["wf:class", [], { relationship: "none", firstMatchOnly: !1 }]]], timelineIds: ["t-0a46efea"], deleted: !1 }, { id: "i-c5fa3e77", scope: { type: "pages", value: ["6ad0cb2816e9afd85c684ff1", "6ad616f21f8cbecf97edd7bc", "6ad72f57e23d005096ad353f", "6ad883e4d375bd5dc8fcd9b1", "6ad887d71c76507742d263fd", "6ad88b6cba1a7277fb148e6d", "6ada10acf7b862f8202a551a", "6adb1bf31beca6c8f035e7c7"] }, triggers: [["wf:load", { control: "play", controlType: "load" }]], timelineIds: ["t-f67ae376"], deleted: !1 }], J = [{ id: "t-0a46efea", deleted: !1, actions: [{ id: "ta-9e398187", targets: [["wf:trigger-only", "", { relationship: "none", firstMatchOnly: !1 }]], timing: { duration: 0, position: 0, stagger: { amount: 0.3 }, ease: 29 }, tt: 2, properties: { "wf:transform": { opacity: ["30%", "100%"] } }, splitText: { type: "chars" } }], canvasDuration: 1 }, { id: "t-f67ae376", deleted: !1, actions: [{ id: "ta-72b6a8c0", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars" } }, { id: "ta-a9ce4ab1", targets: [["wf:any-element", "*", { relationship: "within", filterBy: ["wf:class", [""]], firstMatchOnly: !1 }]], timing: { duration: 1.8, position: 0.1, stagger: { amount: 0.2 }, ease: 26 }, tt: 1, properties: { "wf:transform": { yPercent: ["140%", null] } }, splitText: { type: "chars", mask: "chars" } }] }], M = {
  ix2: $,
  interactions: Z,
  timelines: J
}, h = {
  "/home-sd": { page: "6ad0cb2816e9afd85c684ff1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.0c190c50.55c86a2cd9dc94a8.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`], slider: { script: "sd-slider.js", factory: 4345 } },
  "/work-v2": { page: "6ad887d71c76507742d263fd", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.c261bd8a.8c6cdbf88c6867c0.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] },
  "/home-sd-v2": { page: "6ad616f21f8cbecf97edd7bc", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.0c190c50.55c86a2cd9dc94a8.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] },
  "/work-v1": { page: "6ad883e4d375bd5dc8fcd9b1", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.c261bd8a.8c6cdbf88c6867c0.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] },
  "/project-page": { page: "6ad88b6cba1a7277fb148e6d", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.9dfb96661114d3db.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.c261bd8a.8c6cdbf88c6867c0.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] },
  "/about": { page: "6adb1bf31beca6c8f035e7c7", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.75d9f500.dc80e40cd61578ce.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] },
  "/press": { page: "6ada10acf7b862f8202a551a", site: "68bb0b6fbfff68e3dfd32f3f", scripts: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.f2efb3c5440a81cf.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.32e5e1df00b3654d.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.schunk.802e5a42a2e42580.js", "https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/js/webflow.75d9f500.dc80e40cd61578ce.js"], sheets: ["https://cdn.prod.website-files.com/68bb0b6fbfff68e3dfd32f3f/css/sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.shared.13f8b5d44.min.css"], styles: [`
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
`] }
};
async function ee(e, a, { doc: t = document, events: f = window, timeout: n = 4e3 } = {}) {
  let d = !t.querySelector("[data-env-reveal],[data-env-text]"), c, s;
  const i = d ? Promise.resolve() : new Promise((r) => {
    c = r, s = setTimeout(r, n);
  }), l = () => {
    d = !0, c?.();
  };
  f.addEventListener("env:animations-ready", l, { once: !0 });
  try {
    await e(), a(), await i;
  } finally {
    clearTimeout(s), f.removeEventListener("env:animations-ready", l), d || t.documentElement.setAttribute("data-env-sd-reveal-expired", ""), t.documentElement.classList.remove("env-sd-boot");
  }
}
function ae(e = document) {
  if (e.querySelector("style[data-env-sd-mobile-nav]")) return;
  const a = e.createElement("style");
  a.dataset.envSdMobileNav = "", a.textContent = `@media(max-width:991px){
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .burger-menu-wrap .line-burger{transition:none}}`, e.head.append(a);
}
function Y(e) {
  let a = e.querySelector("#env-sd-page");
  if (a) return a;
  const t = e.querySelector("main.main-wrapper");
  if (!t || t.parentElement !== e.body) throw Error("Unsupported page layout");
  a = e.createElement("div"), a.id = "env-sd-page", t.before(a), a.append(t);
  const f = e.querySelector("body > .section.footer");
  return f && a.append(f), a;
}
function D(e, a, t) {
  const f = [...e.scripts].map((s) => s.getAttribute("src")).filter((s) => s?.includes("/js/webflow.")), n = h[a], d = n || Object.values(h).find((s) => JSON.stringify(s.scripts) === JSON.stringify(f));
  if (!d || e.documentElement.getAttribute("data-wf-site") !== d.site || !e.documentElement.getAttribute("data-wf-page") || n && e.documentElement.getAttribute("data-wf-page") !== n.page) throw Error("Uncertified page");
  if (JSON.stringify(f) !== JSON.stringify(d.scripts)) throw Error("Webflow export changed; rebuild SD snapshots");
  if (!e.querySelector(".navbar-logo-center") || !e.querySelector("body > main.main-wrapper, #env-sd-page > main.main-wrapper")) throw Error("Page needs the shared SD menu and main wrapper");
  const c = [...e.querySelectorAll('link[rel="stylesheet"]')].map((s) => s.getAttribute("href"));
  if (!(t || d.sheets).every((s) => c.includes(s)) || t && c.length !== t.length) throw Error("Stylesheets changed");
  for (const s of e.scripts) {
    if (/env-motion-engine@.*\/dist\/env\.js/.test(s.src)) throw Error("Remove the legacy env.js loader on pilot routes");
    if (/const brand =/.test(s.textContent) && !/ENV SD/.test(s.textContent)) throw Error("Remove the legacy brand initializer on pilot routes");
    if (!(s.src || !s.textContent.trim() || s.type === "application/ld+json") && !/w-mod-|google_tags_first_party|dataLayer|ENV Videos|ENV SD|const brand =|ENVSite/.test(s.textContent))
      throw Error("Additional inline script needs an adapter");
  }
  if (e.querySelector('.w-form,[data-animation-type="spline"]')) throw Error("Unsupported page widget");
  return d;
}
function te(e, a) {
  const t = e.querySelector(".navbar-logo-center .link-box.mobile"), f = a.querySelector(".navbar-logo-center .link-box.mobile");
  if (t && f) {
    const n = t.querySelector(".dot-link"), d = f.querySelector(".dot-link");
    n && !d ? n.remove() : !n && d && t.append(d.cloneNode(!0));
  }
  for (const [n, d] of [[".nav-link-sd", "white"], [".dot-link", "dark"], [".burger-menu-wrap .line-burger", "white"], [".menu-modal", "darker"], [".menu-modal .link-overlay", "dark"]]) {
    const c = [...e.querySelectorAll(`.navbar-logo-center ${n}`)], s = [...a.querySelectorAll(`.navbar-logo-center ${n}`)];
    if (c.length !== s.length) throw Error("Menu variants structure changed");
    c.forEach((i, l) => i.classList.toggle(d, s[l].classList.contains(d)));
  }
}
function ne(e, a) {
  for (const t of [".navbar-brand-three", ".logo-mobile", ".menu-modal"]) {
    const f = e.querySelector(`.navbar-logo-center ${t}`), n = a.querySelector(`.navbar-logo-center ${t}`);
    if (!f && !n) continue;
    if (!f || !n) throw Error("Menu image slot changed");
    let d = [...f.querySelectorAll("img")];
    const c = [...n.querySelectorAll("img")];
    if (t !== ".logo-mobile" && d.length !== c.length) throw Error("Menu images structure changed");
    for (; d.length > c.length; ) d.pop().remove();
    for (; d.length < c.length; ) {
      const s = c[d.length].cloneNode(!0);
      f.append(s), d.push(s);
    }
    d.forEach((s, i) => {
      s.className = c[i].className;
      for (const l of ["src", "srcset", "sizes", "alt"]) {
        const r = c[i].getAttribute(l);
        r === null ? s.removeAttribute(l) : s.setAttribute(l, r);
      }
    });
  }
}
const G = new URL(import.meta.url);
G.pathname = G.pathname.replace(/[^/]*$/, "");
const ie = () => location.pathname.replace(/\/$/, ""), k = matchMedia("(prefers-reduced-motion: reduce)"), de = () => document.querySelector("main.main-wrapper");
let V = () => {
}, _, L;
const Q = /* @__PURE__ */ new Set(), A = () => {
  document.documentElement.classList.remove("env-sd-boot"), window.dispatchEvent(new Event("env:sd-ready"));
}, j = (e) => new Promise((a) => setTimeout(a, e));
function v(e, a = !1) {
  return !a && Q.has(e) ? Promise.resolve() : new Promise((t, f) => {
    const n = document.createElement("script");
    n.src = new URL(e, G).href;
    const d = setTimeout(() => {
      n.remove(), f(Error(`ENV SD timeout: ${e}`));
    }, 8e3);
    n.onload = () => {
      clearTimeout(d), Q.add(e), n.remove(), t();
    }, n.onerror = () => {
      clearTimeout(d), n.remove(), f(Error(`ENV SD could not load ${e}`));
    }, n.dataset.envSdModule = e, document.head.append(n);
  });
}
function se(e) {
  te(document, e), ne(document, e);
  const a = [...document.querySelectorAll(".navbar-logo-center a[href]")], t = [...e.querySelectorAll(".navbar-logo-center a[href]")];
  a.forEach((n, d) => {
    t[d] && n.setAttribute("href", t[d].getAttribute("href"));
  });
  for (const n of ["lang", "dir"]) {
    const d = e.documentElement.getAttribute(n);
    d === null ? document.documentElement.removeAttribute(n) : document.documentElement.setAttribute(n, d);
  }
  document.documentElement.setAttribute("data-wf-page", e.documentElement.getAttribute("data-wf-page")), document.body.className = e.body.className;
  const f = 'meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
  document.head.querySelectorAll(f).forEach((n) => n.remove()), e.head.querySelectorAll(f).forEach((n) => document.head.append(n.cloneNode(!0))), document.head.querySelectorAll("style[data-env-sd-page-style]").forEach((n) => n.remove()), e.head.querySelectorAll("style:not([data-env-sd-mobile-nav])").forEach((n) => {
    const d = n.cloneNode(!0);
    d.dataset.envSdPageStyle = "", document.head.append(d);
  });
}
function F() {
  V();
  const e = document.querySelector(".navbar-logo-center"), a = e?.querySelector(".navbar-brand-three"), t = a?.querySelector(".nav-link-sd"), f = a?.querySelector(".logo-nav");
  if (!e) return;
  ae();
  const n = new AbortController();
  let d, c = [], s = !1;
  function i(r = !1) {
    const p = document.querySelector(".hero-wrapper"), u = !p || p.getBoundingClientRect().bottom <= 0;
    if (e.classList.toggle("is-past-hero", u), !r && u === d) return;
    const m = d === void 0;
    if (d = u, !t || !f || !t.getClientRects().length) {
      c.forEach((E) => E.cancel()), c = [];
      return;
    }
    const I = [t, f], N = I.map((E) => ({ transform: getComputedStyle(E).transform, opacity: getComputedStyle(E).opacity }));
    c.forEach((E) => E.cancel());
    const g = I.map((E) => E.style.transform);
    I.forEach((E) => E.style.transform = "none");
    const T = t.getBoundingClientRect(), O = f.getBoundingClientRect();
    I.forEach((E, y) => E.style.transform = g[y]);
    const R = [
      { transform: `translateY(${u ? -T.height * 1.2 : 0}px)`, opacity: u ? 0 : 1 },
      { transform: `translate(${T.left - O.left}px,${T.top + T.height / 2 - O.top - O.height / 2 + (u ? 0 : T.height * 1.2)}px)`, opacity: u ? 1 : 0 }
    ];
    c = I.map((E, y) => E.animate([N[y], R[y]], { duration: m || k.matches ? 0 : 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }));
  }
  function l() {
    s || (s = !0, requestAnimationFrame(() => {
      s = !1, i();
    }));
  }
  addEventListener("scroll", l, { passive: !0, signal: n.signal }), addEventListener("resize", () => i(!0), { signal: n.signal }), f?.addEventListener("load", () => i(!0), { signal: n.signal }), i(), document.querySelectorAll(".navbar-logo-center a[href]").forEach((r) => {
    const p = new URL(r.href), u = p.origin === location.origin && p.pathname === location.pathname && !p.hash;
    r.classList.toggle("w--current", u), u ? r.setAttribute("aria-current", "page") : r.removeAttribute("aria-current");
  }), V = () => {
    n.abort(), c.forEach((r) => r.cancel());
  };
}
async function le() {
  if (!document.querySelector("[data-env-reveal],[data-env-text]")) return;
  if (!window.gsap) throw Error("GSAP unavailable");
  let e;
  const a = new Promise((t) => {
    e = t;
  });
  window.addEventListener("env:animations-ready", e, { once: !0 });
  try {
    await v("animations.js", !0), await Promise.race([a, j(1500)]);
  } finally {
    window.removeEventListener("env:animations-ready", e);
  }
}
async function X() {
  F(), window.ENVVideos?.refresh(), await Promise.all([
    document.querySelector(".hero-wrapper .sd-slider") ? v("hero.js", !0) : Promise.resolve(),
    le()
  ]);
  const e = [...document.querySelectorAll(".swiper-news[data-env-news]")];
  e.length && (_ = new IntersectionObserver((a) => {
    a.some((t) => t.isIntersecting) && (_.disconnect(), v("news.js", !0).catch(console.error));
  }, { rootMargin: "600px" }), e.forEach((a) => _.observe(a)));
}
function oe() {
  V(), _?.disconnect(), document.querySelector(".hero-wrapper")?.__envHeroCleanup?.(), window.ENVAnimations?.destroy(), window.ENVNews?.destroy(), window.ENVNewsMarquee?.destroy();
  const e = document.querySelector("#env-sd-page");
  e && window.ENVVideos?.release(e);
}
async function z(e, a, t, f) {
  k.matches || (L = e.animate([{ opacity: a }, { opacity: t }], { duration: f, easing: "ease", fill: "forwards" }), await L.finished.catch(() => {
  }));
}
async function fe() {
  if (window.ENVSD) {
    A();
    return;
  }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error("Install the matching SD head block before enabling navigation");
  const e = window.Webflow, a = e?.require("ix2"), t = e?.require("ix3");
  let f;
  if (!a?.init || !t?.ready) throw Error("Webflow runtime unavailable");
  const n = [...document.querySelectorAll('link[rel="stylesheet"]')].map((i) => i.getAttribute("href")), d = D(document, ie(), n);
  if (!e.require("slider")?.ready) {
    const i = h["/home-sd"].slider;
    await v(i.script);
    let l = !1;
    if (window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, (r) => {
      r(i.factory), l = !0;
    }]), !l || !e.require("slider")?.ready) throw Error("Audited slider factory unavailable");
  }
  if (f = ["slider", "navbar", "dropdown", "tabs"].map((i) => e.require(i)).filter(Boolean), Y(document), document.head.querySelectorAll("style").forEach((i) => {
    d.styles.includes(i.textContent) && (i.dataset.envSdPageStyle = "");
  }), await X(), A(), document.querySelector(".navbar-logo-center")?.setAttribute("data-env-ignore", ""), !window.lenis && !k.matches)
    try {
      await v("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"), window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: !0, easing: (i) => Math.min(1, 1.001 - Math.pow(2, -10 * i)) }), requestAnimationFrame(function i(l) {
        window.lenis?.raf(l), requestAnimationFrame(i);
      });
    } catch (i) {
      console.warn("[ENV SD] Native scroll retained", i);
    }
  const c = new W({
    containers: ["#env-sd-page"],
    animationSelector: !1,
    cache: window.ENVSDPreload === !0,
    plugins: [new q({ animateScroll: !1 })],
    linkSelector: "a[href]:not([download]):not([target]):not([data-no-swup])",
    ignoreVisit: (i, { el: l } = {}) => {
      const r = new URL(i, location.href);
      return r.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(r.pathname) || !!l?.closest("[data-no-swup]");
    }
  });
  window.ENVSD = { swup: c, status: "ready" }, window.ENVSDPreload === !0 && (window.ENVSD.stopPreload = K(c)), document.documentElement.setAttribute("data-env-sd-document", crypto.randomUUID()), c.replaceContent = (i) => {
    const l = document.querySelector("#env-sd-page"), r = i.to.document?.querySelector("#env-sd-page");
    return !l || !r ? !1 : (window.ENVVideos?.stage(r), l.replaceWith(r), document.title = i.to.document.querySelector("title")?.textContent || "", !0);
  }, c.hooks.replace("animation:out:await", async () => {
    await z(document.querySelector("#env-sd-page"), 1, 0, 200);
  }), c.hooks.replace("content:replace", async (i, l, r) => {
    const p = i.to.document;
    if (!p || !r) throw Error("Missing incoming page");
    if (D(p, new URL(i.to.url, location.href).pathname, n), p.querySelectorAll(".navbar-logo-center a[href]").length !== document.querySelectorAll(".navbar-logo-center a[href]").length) throw Error("Menu structure changed");
    const u = Y(p);
    if (u.classList.add("env-sd-pending"), u.querySelector(".w-slider") && !e.require("slider")?.ready) throw Error("Slider runtime unavailable; native visit required");
    window.lenis?.stop(), oe(), f.forEach((I) => I.destroy?.()), a.destroy(), t.destroy(), L?.cancel(), await r(i, l), se(p), f.forEach((I) => I.ready?.()), a.init(M.ix2), await Promise.race([t.ready(), j(4e3).then(() => {
      throw Error("Webflow interaction restart timeout");
    })]);
    const m = t.getInstance();
    if (!m) throw Error("Webflow interactions did not restart");
    m.setFeatures({ timelineGroups: !1 }), m.register(M.interactions, M.timelines), document.documentElement.classList.add("w-mod-ix3");
  }), c.hooks.replace("animation:in:await", async () => {
    const i = document.querySelector("#env-sd-page");
    await z(i, 0, 1, 350), L?.cancel();
  }), c.hooks.on("page:view", async (i) => {
    try {
      window.lenis?.resize(), window.lenis?.scrollTo(window.scrollY, { immediate: !0, force: !0 }), window.lenis?.start(), await X(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), !["localhost", "127.0.0.1"].includes(location.hostname) && typeof window.gtag == "function" && window.gtag("event", "page_view", { page_title: document.title, page_location: location.href });
      const l = de();
      if (l) {
        const r = l.getAttribute("tabindex");
        l.setAttribute("tabindex", "-1"), l.focus({ preventScroll: !0 }), r === null ? l.removeAttribute("tabindex") : l.setAttribute("tabindex", r);
      }
    } catch (l) {
      document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending"), console.error("[ENV SD] Page initialization failed; native fallback", l), window.location.assign(i.to.url);
    }
  });
  const s = () => {
    A(), window.lenis?.start(), L?.cancel(), document.querySelector("#env-sd-page")?.classList.remove("env-sd-pending");
  };
  c.hooks.on("visit:fail", s), c.hooks.on("visit:abort", s);
}
const ce = () => fe().catch((e) => {
  console.error("[ENV SD] Native navigation retained", e), ee(() => v("env.js"), () => {
    [...document.scripts].some((a) => /const brand =/.test(a.textContent) && !/ENV SD/.test(a.textContent)) || F();
  }).catch((a) => console.error("[ENV SD] Widget fallback failed", a)).finally(A);
});
window.Webflow = window.Webflow || [];
window.Webflow.push(ce);
//# sourceMappingURL=sd-navigation.js.map
