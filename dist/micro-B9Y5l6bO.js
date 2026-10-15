function ps(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function nt(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const q = (t, e, n) => n > e ? e : n < t ? t : n;
function Ke(t, e) {
  return e ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : t;
}
let oe = () => {
}, G = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (oe = (t, e, n) => {
  !t && typeof console < "u" && console.warn(Ke(e, n));
}, G = (t, e, n) => {
  if (!t)
    throw new Error(Ke(e, n));
});
const X = {}, rn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), ms = (t) => typeof t == "object" && t !== null, on = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function an(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const ae = /* @__NO_SIDE_EFFECTS__ */ (t) => t, st = (...t) => t.reduce((e, n) => (s) => n(e(s))), it = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s ? (n - t) / s : 1;
};
class ln {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return ps(this.subscriptions, e), () => nt(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const O = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, K = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, un = /* @__NO_SIDE_EFFECTS__ */ (t, e) => e ? t * (1e3 / e) : 0, Rt = /* @__PURE__ */ new Set();
function cn(t, e, n) {
  t || Rt.has(e) || (console.warn(Ke(e, n)), Rt.add(e));
}
const gs = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, fn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, ys = 1e-7, bs = 12;
function Ts(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = fn(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > ys && ++a < bs);
  return o;
}
// @__NO_SIDE_EFFECTS__
function ve(t, e, n, s) {
  if (t === e && n === s)
    return ae;
  const i = (r) => Ts(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : fn(i(r), e, s);
}
const hn = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, rt = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => 1 - t(1 - e), dn = /* @__PURE__ */ ve(0.33, 1.53, 0.69, 0.99), ot = /* @__PURE__ */ rt(dn), pn = /* @__PURE__ */ hn(ot), mn = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * ot(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), at = (t) => 1 - Math.sin(Math.acos(t)), vs = /* @__PURE__ */ rt(at), gn = /* @__PURE__ */ hn(at), Ss = /* @__PURE__ */ ve(0.42, 0, 1, 1), Vs = /* @__PURE__ */ ve(0, 0, 0.58, 1), yn = /* @__PURE__ */ ve(0.42, 0, 0.58, 1), bn = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] != "number";
// @__NO_SIDE_EFFECTS__
function Tn(t, e) {
  return /* @__PURE__ */ bn(t) ? t[gs(0, t.length, e)] : t;
}
const vn = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] == "number", Pt = {
  linear: ae,
  easeIn: Ss,
  easeInOut: yn,
  easeOut: Vs,
  circIn: at,
  circInOut: gn,
  circOut: vs,
  backIn: ot,
  backInOut: pn,
  backOut: dn,
  anticipate: mn
}, Ms = (t) => typeof t == "string", kt = (t) => {
  if (/* @__PURE__ */ vn(t)) {
    G(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, n, s, i] = t;
    return /* @__PURE__ */ ve(e, n, s, i);
  } else if (Ms(t))
    return G(Pt[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Pt[t];
  return t;
}, Me = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function As(t) {
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = !1, i = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function a(c) {
    r.has(c) && (l.schedule(c), t()), c(o);
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, f = !1) => {
      const m = f && s ? e : n;
      return u && r.add(c), m.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      n.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (o = c, s) {
        i = !0;
        return;
      }
      s = !0;
      const u = e;
      e = n, n = u, e.forEach(a), e.clear(), s = !1, i && (i = !1, l.process(c));
    }
  };
  return l;
}
const ws = 40;
function Sn(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = Me.reduce((A, V) => (A[V] = As(r), A), {}), { setup: a, read: l, resolveKeyframes: c, preUpdate: u, update: f, preRender: h, render: m, postRender: y } = o, g = () => {
    const A = X.useManualTiming, V = A ? i.timestamp : performance.now();
    n = !1, A || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(V - i.timestamp, ws), 1)), i.timestamp = V, i.isProcessing = !0, a.process(i), l.process(i), c.process(i), u.process(i), f.process(i), h.process(i), m.process(i), y.process(i), i.isProcessing = !1, n && e && (s = !1, t(g));
  }, p = () => {
    n = !0, s = !0, i.isProcessing || t(g);
  };
  return { schedule: Me.reduce((A, V) => {
    const v = o[V];
    return A[V] = (x, F = !1, S = !1) => (n || p(), v.schedule(x, F, S)), A;
  }, {}), cancel: (A) => {
    for (let V = 0; V < Me.length; V++)
      o[Me[V]].cancel(A);
  }, state: i, steps: o };
}
const { schedule: $, cancel: Le, state: xe } = /* @__PURE__ */ Sn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ae, !0);
let we;
function xs() {
  we = void 0;
}
const k = {
  now: () => (we === void 0 && k.set(xe.isProcessing || X.useManualTiming ? xe.timestamp : performance.now()), we),
  set: (t) => {
    we = t, queueMicrotask(xs);
  }
}, Vn = (t) => (e) => typeof e == "string" && e.startsWith(t), Mn = /* @__PURE__ */ Vn("--"), Cs = /* @__PURE__ */ Vn("var(--"), lt = (t) => Cs(t) ? Es.test(t.split("/*")[0].trim()) : !1, Es = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Ot(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const le = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ye = {
  ...le,
  transform: (t) => q(0, 1, t)
}, Ae = {
  ...le,
  default: 1
}, ge = (t) => Math.round(t * 1e5) / 1e5, ut = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Fs(t) {
  return t == null;
}
const Ds = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ct = (t, e) => (n) => !!(typeof n == "string" && Ds.test(n) && n.startsWith(t) || e && !Fs(n) && Object.prototype.hasOwnProperty.call(n, e)), An = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(ut);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Rs = (t) => q(0, 255, t), Pe = {
  ...le,
  transform: (t) => Math.round(Rs(t))
}, H = {
  test: /* @__PURE__ */ ct("rgb", "red"),
  parse: /* @__PURE__ */ An("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Pe.transform(t) + ", " + Pe.transform(e) + ", " + Pe.transform(n) + ", " + ge(ye.transform(s)) + ")"
};
function Ps(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const $e = {
  test: /* @__PURE__ */ ct("#"),
  parse: Ps,
  transform: H.transform
}, Se = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), j = /* @__PURE__ */ Se("deg"), se = /* @__PURE__ */ Se("%"), d = /* @__PURE__ */ Se("px"), ks = /* @__PURE__ */ Se("vh"), Os = /* @__PURE__ */ Se("vw"), Bt = {
  ...se,
  parse: (t) => se.parse(t) / 100,
  transform: (t) => se.transform(t * 100)
}, te = {
  test: /* @__PURE__ */ ct("hsl", "hue"),
  parse: /* @__PURE__ */ An("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + se.transform(ge(e)) + ", " + se.transform(ge(n)) + ", " + ge(ye.transform(s)) + ")"
}, D = {
  test: (t) => H.test(t) || $e.test(t) || te.test(t),
  parse: (t) => H.test(t) ? H.parse(t) : te.test(t) ? te.parse(t) : $e.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? H.transform(t) : te.transform(t),
  getAnimatableNone: (t) => {
    const e = D.parse(t);
    return e.alpha = 0, D.transform(e);
  }
}, Bs = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Is(t) {
  return isNaN(t) && typeof t == "string" && (t.match(ut)?.length || 0) + (t.match(Bs)?.length || 0) > 0;
}
const wn = "number", xn = "color", Ns = "var", Ks = "var(", It = "${}", Ls = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ie(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(Ls, (l) => (D.test(l) ? (s.color.push(r), i.push(xn), n.push(D.parse(l))) : l.startsWith(Ks) ? (s.var.push(r), i.push(Ns), n.push(l)) : (s.number.push(r), i.push(wn), n.push(parseFloat(l))), ++r, It)).split(It);
  return { values: n, split: a, indexes: s, types: i };
}
function $s(t) {
  return ie(t).values;
}
function Cn({ split: t, types: e }) {
  const n = t.length;
  return (s) => {
    let i = "";
    for (let r = 0; r < n; r++)
      if (i += t[r], s[r] !== void 0) {
        const o = e[r];
        o === wn ? i += ge(s[r]) : o === xn ? i += D.transform(s[r]) : i += s[r];
      }
    return i;
  };
}
function Ws(t) {
  return Cn(ie(t));
}
const _s = (t) => typeof t == "number" ? 0 : D.test(t) ? D.getAnimatableNone(t) : t, Us = (t, e) => typeof t == "number" ? e?.trim().endsWith("/") ? t : 0 : _s(t);
function js(t) {
  const e = ie(t);
  return Cn(e)(e.values.map((s, i) => Us(s, e.split[i])));
}
const L = {
  test: Is,
  parse: $s,
  createTransformer: Ws,
  getAnimatableNone: js
};
function ke(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Gs({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = ke(l, a, t + 1 / 3), r = ke(l, a, t), o = ke(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function Ce(t, e) {
  return (n) => n > 0 ? e : t;
}
const ue = (t, e, n) => t + (e - t) * n, Oe = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Ys = [$e, H, te], zs = (t) => Ys.find((e) => e.test(t));
function Nt(t) {
  const e = zs(t);
  if (oe(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !e)
    return !1;
  let n = e.parse(t);
  return e === te && (n = Gs(n)), n;
}
const Kt = (t, e) => {
  const n = Nt(t), s = Nt(e);
  if (!n || !s)
    return Ce(t, e);
  const i = { ...n };
  return (r) => (i.red = Oe(n.red, s.red, r), i.green = Oe(n.green, s.green, r), i.blue = Oe(n.blue, s.blue, r), i.alpha = ue(n.alpha, s.alpha, r), H.transform(i));
}, We = /* @__PURE__ */ new Set(["none", "hidden"]);
function qs(t, e) {
  return We.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Xs(t, e) {
  return (n) => ue(t, e, n);
}
function ft(t) {
  return typeof t == "number" ? Xs : typeof t == "string" ? lt(t) ? Ce : D.test(t) ? Kt : Js : Array.isArray(t) ? En : typeof t == "object" ? D.test(t) ? Kt : Hs : Ce;
}
function En(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => ft(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function Hs(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = ft(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function Zs(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const r = e.types[i], o = t.indexes[r][s[r]], a = t.values[o] ?? 0;
    n[i] = a, s[r]++;
  }
  return n;
}
const Js = (t, e) => {
  const n = L.createTransformer(e), s = ie(t), i = ie(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? We.has(t) && !i.values.length || We.has(e) && !s.values.length ? qs(t, e) : st(En(Zs(s, i), i.values), n) : (oe(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ce(t, e));
};
function Fn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? ue(t, e, n) : ft(t)(t, e);
}
const Qs = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => $.update(e, n),
    stop: () => Le(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => xe.isProcessing ? xe.timestamp : k.now()
  };
}, Dn = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += Math.round(t(r / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Ee = 2e4;
function ht(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Ee; )
    e += n, s = t.next(e);
  return e >= Ee ? 1 / 0 : e;
}
function Rn(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(ht(s), Ee);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ K(i)
  };
}
const E = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function _e(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const ei = 12;
function ti(t, e, n) {
  let s = n;
  for (let i = 1; i < ei; i++)
    s = s - t(s) / e(s);
  return s;
}
const Be = 1e-3;
function ni({ duration: t = E.duration, bounce: e = E.bounce, velocity: n = E.velocity, mass: s = E.mass }) {
  let i, r;
  oe(t <= /* @__PURE__ */ O(E.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - e;
  o = q(E.minDamping, E.maxDamping, o), t = q(E.minDuration, E.maxDuration, /* @__PURE__ */ K(t)), o < 1 ? (i = (c) => {
    const u = c * o, f = u * t, h = u - n, m = _e(c, o), y = Math.exp(-f);
    return Be - h / m * y;
  }, r = (c) => {
    const f = c * o * t, h = f * n + n, m = Math.pow(o, 2) * Math.pow(c, 2) * t, y = Math.exp(-f), g = _e(Math.pow(c, 2), o);
    return (-i(c) + Be > 0 ? -1 : 1) * ((h - m) * y) / g;
  }) : (i = (c) => {
    const u = Math.exp(-c * t), f = (c - n) * t + 1;
    return -Be + u * f;
  }, r = (c) => {
    const u = Math.exp(-c * t), f = (n - c) * (t * t);
    return u * f;
  });
  const a = 5 / t, l = ti(i, r, a);
  if (t = /* @__PURE__ */ O(t), isNaN(l))
    return {
      stiffness: E.stiffness,
      damping: E.damping,
      duration: t
    };
  {
    const c = Math.pow(l, 2) * s;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(s * c),
      duration: t
    };
  }
}
const si = ["duration", "bounce"], ii = ["stiffness", "damping", "mass"];
function Lt(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function ri(t) {
  let e = {
    velocity: E.velocity,
    stiffness: E.stiffness,
    damping: E.damping,
    mass: E.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Lt(t, ii) && Lt(t, si))
    if (e.velocity = 0, t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * q(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: E.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = ni({ ...t, velocity: 0 });
      e = {
        ...e,
        ...n,
        mass: E.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function be(t = E.visualDuration, e = E.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: u, duration: f, velocity: h, isResolvedFromDuration: m } = ri({
    ...n,
    velocity: -/* @__PURE__ */ K(n.velocity || 0)
  }), y = h || 0, g = c / (2 * Math.sqrt(l * u)), p = o - r, b = /* @__PURE__ */ K(Math.sqrt(l / u)), C = Math.abs(p) < 5;
  s || (s = C ? E.restSpeed.granular : E.restSpeed.default), i || (i = C ? E.restDelta.granular : E.restDelta.default);
  let A, V, v, x, F, S;
  if (g < 1)
    v = _e(b, g), x = (y + g * b * p) / v, A = (T) => {
      const w = Math.exp(-g * b * T);
      return o - w * (x * Math.sin(v * T) + p * Math.cos(v * T));
    }, F = g * b * x + p * v, S = g * b * p - x * v, V = (T) => Math.exp(-g * b * T) * (F * Math.sin(v * T) + S * Math.cos(v * T));
  else if (g === 1) {
    A = (w) => o - Math.exp(-b * w) * (p + (y + b * p) * w);
    const T = y + b * p;
    V = (w) => Math.exp(-b * w) * (b * T * w - y);
  } else {
    const T = b * Math.sqrt(g * g - 1);
    A = (I) => {
      const W = Math.exp(-g * b * I), _ = Math.min(T * I, 300);
      return o - W * ((y + g * b * p) * Math.sinh(_) + T * p * Math.cosh(_)) / T;
    };
    const w = (y + g * b * p) / T, B = g * b * w - p * T, P = g * b * p - w * T;
    V = (I) => {
      const W = Math.exp(-g * b * I), _ = Math.min(T * I, 300);
      return W * (B * Math.sinh(_) + P * Math.cosh(_));
    };
  }
  const M = {
    calculatedDuration: m && f || null,
    velocity: (T) => /* @__PURE__ */ O(V(T)),
    next: (T) => {
      if (!m && g < 1) {
        const B = Math.exp(-g * b * T), P = Math.sin(v * T), I = Math.cos(v * T), W = o - B * (x * P + p * I), _ = /* @__PURE__ */ O(B * (F * P + S * I));
        return a.done = Math.abs(_) <= s && Math.abs(o - W) <= i, a.value = a.done ? o : W, a;
      }
      const w = A(T);
      if (m)
        a.done = T >= f;
      else {
        const B = /* @__PURE__ */ O(V(T));
        a.done = Math.abs(B) <= s && Math.abs(o - w) <= i;
      }
      return a.value = a.done ? o : w, a;
    },
    toString: () => {
      const T = Math.min(ht(M), Ee), w = Dn((B) => M.next(T * B).value, T, 30);
      return T + "ms " + w;
    },
    toTransition: () => {
    }
  };
  return M;
}
be.applyToOptions = (t) => {
  const e = Rn(t, 100, be);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ O(e.duration), t.type = "keyframes", t;
};
const oi = 5;
function Pn(t, e, n) {
  const s = Math.max(e - oi, 0);
  return /* @__PURE__ */ un(n - t(s), e - s);
}
function Ue({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const f = t[0], h = {
    done: !1,
    value: f
  }, m = (S) => a !== void 0 && S < a || l !== void 0 && S > l, y = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let g = n * e;
  const p = f + g, b = o === void 0 ? p : o(p);
  b !== p && (g = b - f);
  const C = (S) => -g * Math.exp(-S / s), A = (S) => b + C(S), V = (S) => {
    const M = C(S), T = A(S);
    h.done = Math.abs(M) <= c, h.value = h.done ? b : T;
  };
  let v, x;
  const F = (S) => {
    m(h.value) && (v = S, x = be({
      keyframes: [h.value, y(h.value)],
      velocity: Pn(A, S, h.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: c,
      restSpeed: u
    }));
  };
  return F(0), {
    calculatedDuration: null,
    next: (S) => {
      let M = !1;
      return !x && v === void 0 && (M = !0, V(S), F(S)), v !== void 0 && S >= v ? x.next(S - v) : (!M && V(S), h);
    }
  };
}
function ai(t, e, n) {
  const s = [], i = n || X.mix || Fn, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || ae : e;
      a = st(l, a);
    }
    s.push(a);
  }
  return s;
}
function li(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (G(r === e.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ai(e, s, i), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let f = 0;
    if (l > 1)
      for (; f < t.length - 2 && !(u < t[f + 1]); f++)
        ;
    const h = /* @__PURE__ */ it(t[f], t[f + 1], u);
    return a[f](h);
  };
  return n ? (u) => c(q(t[0], t[r - 1], u)) : c;
}
function kn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ it(0, e, s);
    t.push(ue(n, 1, i));
  }
}
function On(t) {
  const e = [0];
  return kn(e, t.length - 1), e;
}
function ui(t, e) {
  return t.map((n) => n * e);
}
function ci(t, e) {
  return t.map(() => e || yn).splice(0, t.length - 1);
}
function ne({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = /* @__PURE__ */ bn(s) ? s.map(kt) : kt(s), r = {
    done: !1,
    value: e[0]
  }, o = ui(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : On(e),
    t
  ), a = li(o, e, {
    ease: Array.isArray(i) ? i : ci(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const fi = (t) => t !== null;
function Re(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const r = t.filter(fi), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || s === void 0 ? r[a] : s;
}
const hi = {
  decay: Ue,
  inertia: Ue,
  tween: ne,
  keyframes: ne,
  spring: be
};
function Bn(t) {
  typeof t.type == "string" && (t.type = hi[t.type]);
}
class dt {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const di = (t) => t / 100;
class Fe extends dt {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== k.now() && this.tick(k.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Bn(e);
    const { type: n = ne, repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || ne;
    process.env.NODE_ENV !== "production" && l !== ne && G(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== ne && typeof a[0] != "number" && (this.mixKeyframes = st(di, Fn(a[0], a[1])), a = [0, 100]);
    const c = l({ ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = ht(c));
    const { calculatedDuration: u } = c;
    this.calculatedDuration = u, this.resolvedDuration = u + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = c;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: c = 0, keyframes: u, repeat: f, repeatType: h, repeatDelay: m, type: y, onUpdate: g, finalKeyframe: p } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const b = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), C = this.playbackSpeed >= 0 ? b < 0 : b > i;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let A = this.currentTime, V = s;
    if (f) {
      const S = Math.min(this.currentTime, i) / a;
      let M = Math.floor(S), T = S % 1;
      !T && S >= 1 && (T = 1), T === 1 && M--, M = Math.min(M, f + 1), M % 2 && (h === "reverse" ? (T = 1 - T, m && (T -= m / a)) : h === "mirror" && (V = o)), A = q(0, 1, T) * a;
    }
    let v;
    C ? (this.delayState.value = u[0], v = this.delayState) : v = V.next(A), r && !C && (v.value = r(v.value));
    let { done: x } = v;
    !C && l !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const F = this.holdTime === null && (this.state === "finished" || this.state === "running" && x);
    return F && y !== Ue && (v.value = Re(u, this.options, p, this.speed)), g && g(v.value), F && this.finish(), v;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ K(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ K(e);
  }
  get time() {
    return /* @__PURE__ */ K(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ O(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(e);
    const n = this.generator.next(e).value;
    return Pn((s) => this.generator.next(s).value, e, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    n && this.driver && this.updateTime(k.now()), this.playbackSpeed = e, n && this.driver && (this.time = /* @__PURE__ */ K(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Qs, startTime: n } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(k.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function pi(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const Z = (t) => t * 180 / Math.PI, je = (t) => {
  const e = Z(Math.atan2(t[1], t[0]));
  return Ge(e);
}, mi = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: je,
  rotateZ: je,
  skewX: (t) => Z(Math.atan(t[1])),
  skewY: (t) => Z(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Ge = (t) => (t = t % 360, t < 0 && (t += 360), t), $t = je, Wt = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), _t = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), gi = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Wt,
  scaleY: _t,
  scale: (t) => (Wt(t) + _t(t)) / 2,
  rotateX: (t) => Ge(Z(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Ge(Z(Math.atan2(-t[2], t[0]))),
  rotateZ: $t,
  rotate: $t,
  skewX: (t) => Z(Math.atan(t[4])),
  skewY: (t) => Z(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ye(t) {
  return t.includes("scale") ? 1 : 0;
}
function ze(t, e) {
  if (!t || t === "none")
    return Ye(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = gi, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = mi, i = a;
  }
  if (!i)
    return Ye(e);
  const r = s[e], o = i[1].split(",").map(bi);
  return typeof r == "function" ? r(o) : o[r];
}
const yi = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return ze(n, e);
};
function bi(t) {
  return parseFloat(t.trim());
}
const ce = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], fe = /* @__PURE__ */ new Set([...ce, "pathRotation"]), Ut = (t) => t === le || t === d, Ti = /* @__PURE__ */ new Set(["x", "y", "z"]), vi = ce.filter((t) => !Ti.has(t));
function Si(t) {
  const e = [];
  return vi.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const z = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => ze(e, "x"),
  y: (t, { transform: e }) => ze(e, "y")
};
z.translateX = z.x;
z.translateY = z.y;
const J = /* @__PURE__ */ new Set();
let qe = !1, Xe = !1, He = !1;
function In() {
  if (Xe) {
    const t = Array.from(J).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = Si(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        s.getValue(r)?.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Xe = !1, qe = !1, J.forEach((t) => t.complete(He)), J.clear();
}
function Nn() {
  J.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Xe = !0);
  });
}
function Vi() {
  He = !0, Nn(), In(), He = !1;
}
class pt {
  constructor(e, n, s, i, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (J.add(this), qe || (qe = !0, $.read(Nn), $.resolveKeyframes(In))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const r = i?.get(), o = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), i && r === void 0 && i.set(e[0]);
    }
    pi(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), J.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (J.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Mi = (t) => t.startsWith("--");
function Kn(t, e, n) {
  Mi(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const Ai = {};
function Ln(t, e) {
  const n = /* @__PURE__ */ an(t);
  return () => Ai[e] ?? n();
}
const wi = /* @__PURE__ */ Ln(() => window.ScrollTimeline !== void 0, "scrollTimeline"), $n = /* @__PURE__ */ Ln(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), me = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, jt = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ me([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ me([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ me([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ me([0.33, 1.53, 0.69, 0.99])
};
function Wn(t, e) {
  if (t)
    return typeof t == "function" ? $n() ? Dn(t, e) : "ease-out" : /* @__PURE__ */ vn(t) ? me(t) : Array.isArray(t) ? t.map((n) => Wn(n, e) || jt.easeOut) : jt[t];
}
function xi(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, c = void 0) {
  const u = {
    [e]: n
  };
  l && (u.offset = l);
  const f = Wn(a, i);
  Array.isArray(f) && (u.easing = f);
  const h = {
    delay: s,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return c && (h.pseudoElement = c), t.animate(u, h);
}
function mt(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Ci({ type: t, ...e }) {
  return mt(t) && $n() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class _n extends dt {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, G(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = Ci(e);
    this.animation = xi(n, s, i, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const u = Re(i, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(u), Kn(n, s, u), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const e = this.options?.element;
    !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ K(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ K(e);
  }
  get time() {
    return /* @__PURE__ */ K(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ O(e), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: n, rangeEnd: s, observe: i }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && wi() ? (this.animation.timeline = e, n && (this.animation.rangeStart = n), s && (this.animation.rangeEnd = s), ae) : i(this);
  }
}
const Un = {
  anticipate: mn,
  backInOut: pn,
  circInOut: gn
};
function Ei(t) {
  return t in Un;
}
function Fi(t) {
  typeof t.ease == "string" && Ei(t.ease) && (t.ease = Un[t.ease]);
}
const Ie = 10;
class Di extends _n {
  constructor(e) {
    Fi(e), Bn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: r, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Fe({
      ...o,
      autoplay: !1
    }), l = Math.max(Ie, k.now() - this.startTime), c = q(0, Ie, l - Ie), u = a.sample(l).value, { name: f } = this.options;
    r && f && Kn(r, f, u), n.setWithVelocity(a.sample(Math.max(0, l - c)).value, u, c), a.stop();
  }
}
const Gt = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(L.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Ri(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Pi(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = Gt(i, e), a = Gt(r, e);
  return oe(o === a, `You are trying to animate ${e} from "${i}" to "${r}". "${o ? r : i}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : Ri(t) || (n === "spring" || mt(n)) && s;
}
function Ze(t) {
  t.duration = 0, t.type = "keyframes";
}
const jn = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), ki = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Oi(t) {
  for (let e = 0; e < t.length; e++)
    if (typeof t[e] == "string" && ki.test(t[e]))
      return !0;
  return !1;
}
const Bi = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), Ii = /* @__PURE__ */ an(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ni(t) {
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: r, type: o, keyframes: a } = t, l = e?.owner?.current;
  if (!(l instanceof HTMLElement) && !(l instanceof SVGElement))
    return !1;
  const { onUpdate: c, transformTemplate: u } = e.owner.getProps();
  return Ii() && n && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (jn.has(n) || Bi.has(n) && Oi(a)) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !c && !s && i !== "mirror" && r !== 0 && o !== "inertia";
}
const Ki = 40;
class Li extends dt {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: c, element: u, ...f }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = k.now();
    const h = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: c,
      element: u,
      ...f
    }, m = u?.KeyframeResolver || pt;
    this.keyframeResolver = new m(a, (y, g, p) => this.onKeyframesResolved(y, g, h, !p), l, c, u), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: c, onUpdate: u } = s;
    this.resolvedAt = k.now();
    let f = !0;
    Pi(e, r, o, a) || (f = !1, (X.instantAnimations || !l) && u?.(Re(e, s, n)), e[0] = e[e.length - 1], Ze(s), s.repeat = 0);
    const m = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ki ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, y = f && !c && Ni(m), g = m.motionValue?.owner?.current;
    let p;
    if (y)
      try {
        p = new Di({
          ...m,
          element: g
        });
      } catch {
        p = new Fe(m);
      }
    else
      p = new Fe(m);
    p.finished.then(() => {
      this.notifyFinished();
    }).catch(ae), this.pendingTimeline && (this.stopTimeline = p.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = p;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Vi()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
class $i {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][e] = n;
  }
  attachTimeline(e) {
    const n = this.animations.map((s) => s.attachTimeline(e));
    return () => {
      n.forEach((s, i) => {
        s && s(), this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return Yt(this.animations, "duration");
  }
  get iterationDuration() {
    return Yt(this.animations, "iterationDuration");
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function Yt(t, e) {
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s][e];
    i !== null && i > n && (n = i);
  }
  return n;
}
class Wi extends $i {
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
}
const zt = 30, _i = (t) => !isNaN(parseFloat(t));
class Ui {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const i = k.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = k.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = _i(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && cn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new ln());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), $.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = k.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > zt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, zt);
    return /* @__PURE__ */ un(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function re(t, e) {
  return new Ui(t, e);
}
function Gn(t, e) {
  if (t?.inherit && e) {
    const { inherit: n, ...s } = t;
    return { ...e, ...s };
  }
  return t;
}
function Yn(t, e) {
  const n = t?.[e] ?? t?.default ?? t;
  return n !== t ? Gn(n, t) : n;
}
const ji = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Gi = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Yi = {
  type: "keyframes",
  duration: 0.8
}, zi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, qi = (t, { keyframes: e }) => e.length > 2 ? Yi : fe.has(t) ? t.startsWith("scale") ? Gi(e[1]) : ji : zi, Xi = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function Hi(t) {
  for (const e in t)
    if (!Xi.has(e))
      return !0;
  return !1;
}
const zn = (t, e, n, s = {}, i, r) => (o) => {
  const a = Yn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ O(l);
  const u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (h) => {
      e.set(h), a.onUpdate && a.onUpdate(h);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  Hi(a) || Object.assign(u, qi(t, u)), u.duration && (u.duration = /* @__PURE__ */ O(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ O(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let f = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (Ze(u), u.delay === 0 && (f = !0)), (X.instantAnimations || X.skipAnimations || i?.shouldSkipAnimations || a.skipAnimations) && (f = !0, Ze(u), u.delay = 0), u.allowFlatten = !a.type && !a.ease, f && !r && e.get() !== void 0) {
    const h = Re(u.keyframes, a);
    if (h !== void 0) {
      $.update(() => {
        u.onUpdate(h), u.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Fe(u) : new Li(u);
}, Zi = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ji(t) {
  const e = Zi.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const Qi = 4;
function qn(t, e, n = 1) {
  G(n <= Qi, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, i] = Ji(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return rn(o) ? parseFloat(o) : o;
  }
  return lt(i) ? qn(i, e, n + 1) : i;
}
function qt(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Xn(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = qt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = qt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function er(t, e, n) {
  const s = t.getProps();
  return Xn(s, e, s.custom, t);
}
const Hn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ce
]), tr = (t) => Array.isArray(t);
function nr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, re(n));
}
function sr(t) {
  return tr(t) ? t[t.length - 1] || 0 : t;
}
function ir(t, e) {
  const n = er(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = sr(r[o]);
    nr(t, o, a);
  }
}
const R = (t) => !!(t && t.getVelocity);
function rr(t) {
  return !!(R(t) && t.add);
}
function or(t, e) {
  const n = t.getValue("willChange");
  if (rr(n))
    return n.add(e);
  if (!n && X.WillChange) {
    const s = new X.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function gt(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const ar = "framerAppearId", lr = "data-" + gt(ar);
function ur(t) {
  return t.props[lr];
}
function cr({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function fr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: r, transitionEnd: o, ...a } = e;
  const l = t.getDefaultTransition();
  r = r ? Gn(r, l) : l;
  const c = r?.reduceMotion, u = r?.skipAnimations;
  s && (r = s);
  const f = [], h = i && t.animationState && t.animationState.getState()[i], m = r?.path;
  m && m.animateVisualElement(t, a, r, n, f);
  for (const y in a) {
    const g = t.getValue(y, t.latestValues[y] ?? null), p = a[y];
    if (p === void 0 || h && cr(h, y))
      continue;
    const b = {
      delay: n,
      ...Yn(r || {}, y)
    };
    u && (b.skipAnimations = !0);
    const C = g.get();
    if (C !== void 0 && !g.isAnimating() && !Array.isArray(p) && p === C && !b.velocity) {
      $.update(() => g.set(p));
      continue;
    }
    let A = !1;
    if (window.MotionHandoffAnimation) {
      const x = ur(t);
      if (x) {
        const F = window.MotionHandoffAnimation(x, y, $);
        F !== null && (b.startTime = F, A = !0);
      }
    }
    or(t, y);
    const V = c ?? t.shouldReduceMotion;
    g.start(zn(y, g, p, V && Hn.has(y) ? { type: !1 } : b, t, A));
    const v = g.animation;
    v && f.push(v);
  }
  if (o) {
    const y = () => $.update(() => {
      o && ir(t, o);
    });
    f.length ? Promise.all(f).then(y) : y();
  }
  return f;
}
const hr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Zn = (t) => (e) => e.test(t), Jn = [le, d, se, j, Os, ks, hr], Xt = (t) => Jn.find(Zn(t));
function dr(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || on(t) : !0;
}
const pr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function mr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(ut) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = pr.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const gr = /\b([a-z-]*)\(.*?\)/gu, Je = {
  ...L,
  getAnimatableNone: (t) => {
    const e = t.match(gr);
    return e ? e.map(mr).join(" ") : t;
  }
}, Qe = {
  ...L,
  getAnimatableNone: (t) => {
    const e = L.parse(t);
    return L.createTransformer(t)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Ht = {
  ...le,
  transform: Math.round
}, yr = {
  rotate: j,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: j,
  rotateX: j,
  rotateY: j,
  rotateZ: j,
  scale: Ae,
  scaleX: Ae,
  scaleY: Ae,
  scaleZ: Ae,
  skew: j,
  skewX: j,
  skewY: j,
  distance: d,
  translateX: d,
  translateY: d,
  translateZ: d,
  x: d,
  y: d,
  z: d,
  perspective: d,
  transformPerspective: d,
  opacity: ye,
  originX: Bt,
  originY: Bt,
  originZ: d
}, De = {
  // Border props
  borderWidth: d,
  borderTopWidth: d,
  borderRightWidth: d,
  borderBottomWidth: d,
  borderLeftWidth: d,
  borderRadius: d,
  borderTopLeftRadius: d,
  borderTopRightRadius: d,
  borderBottomRightRadius: d,
  borderBottomLeftRadius: d,
  // Positioning props
  width: d,
  maxWidth: d,
  height: d,
  maxHeight: d,
  top: d,
  right: d,
  bottom: d,
  left: d,
  inset: d,
  insetBlock: d,
  insetBlockStart: d,
  insetBlockEnd: d,
  insetInline: d,
  insetInlineStart: d,
  insetInlineEnd: d,
  // Spacing props
  padding: d,
  paddingTop: d,
  paddingRight: d,
  paddingBottom: d,
  paddingLeft: d,
  paddingBlock: d,
  paddingBlockStart: d,
  paddingBlockEnd: d,
  paddingInline: d,
  paddingInlineStart: d,
  paddingInlineEnd: d,
  margin: d,
  marginTop: d,
  marginRight: d,
  marginBottom: d,
  marginLeft: d,
  marginBlock: d,
  marginBlockStart: d,
  marginBlockEnd: d,
  marginInline: d,
  marginInlineStart: d,
  marginInlineEnd: d,
  // Typography
  fontSize: d,
  // Misc
  backgroundPositionX: d,
  backgroundPositionY: d,
  ...yr,
  zIndex: Ht,
  // SVG
  fillOpacity: ye,
  strokeOpacity: ye,
  numOctaves: Ht
}, br = {
  ...De,
  // Color props
  color: D,
  backgroundColor: D,
  outlineColor: D,
  fill: D,
  stroke: D,
  // Border props
  borderColor: D,
  borderTopColor: D,
  borderRightColor: D,
  borderBottomColor: D,
  borderLeftColor: D,
  filter: Je,
  WebkitFilter: Je,
  mask: Qe,
  WebkitMask: Qe
}, Qn = (t) => br[t], Tr = /* @__PURE__ */ new Set([Je, Qe]);
function es(t, e) {
  let n = Qn(t);
  return Tr.has(n) || (n = L), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const vr = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Sr(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !vr.has(r) && ie(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = es(n, i);
}
class Vr extends pt {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let u = 0; u < e.length; u++) {
      let f = e[u];
      if (typeof f == "string" && (f = f.trim(), lt(f))) {
        const h = qn(f, n.current);
        h !== void 0 && (e[u] = h), u === e.length - 1 && (this.finalKeyframe = f);
      }
    }
    if (this.resolveNoneKeyframes(), !Hn.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = Xt(i), a = Xt(r), l = Ot(i), c = Ot(r);
    if (l !== c && z[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (Ut(o) && Ut(a))
        for (let u = 0; u < e.length; u++) {
          const f = e[u];
          typeof f == "string" && (e[u] = parseFloat(f));
        }
      else z[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      (e[i] === null || dr(e[i])) && s.push(i);
    s.length && Sr(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = z[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const r = s.length - 1, o = s[r];
    s[r] = z[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
const Mr = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function ts(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    e && (s = e.current);
    const i = n?.[t] ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const et = (t, e) => e && typeof t == "number" ? e.transform(t) : t, { schedule: Ar } = /* @__PURE__ */ Sn(queueMicrotask, !1), wr = {
  y: !1
};
function xr() {
  return wr.y;
}
function Cr(t, e) {
  const n = ts(t), s = new AbortController(), i = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function Er(t) {
  return !(t.pointerType === "touch" || xr());
}
function Fr(t, e, n = {}) {
  const [s, i, r] = Cr(t, n);
  return s.forEach((o) => {
    let a = !1, l = !1, c;
    const u = () => {
      o.removeEventListener("pointerleave", y);
    }, f = (p) => {
      c && (c(p), c = void 0), u();
    }, h = (p) => {
      a = !1, window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), l && (l = !1, f(p));
    }, m = () => {
      a = !0, window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", h, i);
    }, y = (p) => {
      if (p.pointerType !== "touch") {
        if (a) {
          l = !0;
          return;
        }
        f(p);
      }
    }, g = (p) => {
      if (!Er(p))
        return;
      l = !1;
      const b = e(o, p);
      typeof b == "function" && (c = b, o.addEventListener("pointerleave", y, i));
    };
    o.addEventListener("pointerenter", g, i), o.addEventListener("pointerdown", m, i);
  }), r;
}
function ns(t) {
  return ms(t) && "ownerSVGElement" in t;
}
function Dr(t) {
  return ns(t) && t.tagName === "svg";
}
const Rr = [...Jn, D, L], Pr = (t) => Rr.find(Zn(t)), Zt = () => ({ min: 0, max: 0 }), yt = () => ({
  x: Zt(),
  y: Zt()
}), Te = /* @__PURE__ */ new WeakMap();
function kr(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Or(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Br = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ir = ["initial", ...Br];
function ss(t) {
  return kr(t.animate) || Ir.some((e) => Or(t[e]));
}
function Nr(t) {
  return !!(ss(t) || t.variants);
}
function Kr(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (R(i))
      t.addValue(s, i);
    else if (R(r))
      t.addValue(s, re(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, re(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const tt = { current: null }, is = { current: !1 }, Lr = typeof window < "u";
function $r() {
  if (is.current = !0, !!Lr)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => tt.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      tt.current = !1;
}
const Jt = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Qt = {};
class rs {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, skipAnimations: r, blockInitialAnimation: o, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = pt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const m = k.now();
      this.renderScheduledAt < m && (this.renderScheduledAt = m, $.render(this.render, !1, !0));
    };
    const { latestValues: c, renderState: u } = a;
    this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = n.initial ? { ...c } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = ss(n), this.isVariantNode = Nr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: f, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const m in h) {
      const y = h[m];
      c[m] !== void 0 && R(y) && y.set(c[m]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const n in this.initialValues)
        this.values.get(n)?.jump(this.initialValues[n]), this.latestValues[n] = this.initialValues[n];
    this.current = e, Te.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (is.current || $r(), this.shouldReduceMotion = tt.current), process.env.NODE_ENV !== "production" && cn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Le(this.notifyUpdate), Le(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && jn.has(e) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: l, ease: c, duration: u } = n.accelerate, f = new _n({
        element: this.current,
        name: e,
        keyframes: a,
        times: l,
        ease: c,
        duration: /* @__PURE__ */ O(u)
      }), h = o(f);
      this.valueSubscriptions.set(e, () => {
        h(), f.cancel();
      });
      return;
    }
    const s = fe.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && $.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r && r();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in Qt) {
      const n = Qt[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : yt();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Jt.length; s++) {
      const i = Jt[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Kr(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = re(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (rn(s) || on(s)) ? s = parseFloat(s) : !Pr(s) && L.test(n) && (s = es(e, n)), this.setBaseTarget(e, R(s) ? s.get() : s)), R(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const r = Xn(this.props, n, this.presenceContext?.custom);
      r && (s = r[e]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !R(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new ln()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    Ar.render(this.render);
  }
}
class os extends rs {
  constructor() {
    super(...arguments), this.KeyframeResolver = Vr;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const s = e.style;
    return s ? s[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    R(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Wr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function _r(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Ur(t, e) {
  return Wr(_r(t.getBoundingClientRect(), e));
}
const jr = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Gr = ce.length;
function Yr(t, e, n) {
  let s = "", i = !0;
  for (let o = 0; o < Gr; o++) {
    const a = ce[o], l = t[a];
    if (l === void 0)
      continue;
    let c = !0;
    if (typeof l == "number")
      c = l === (a.startsWith("scale") ? 1 : 0);
    else {
      const u = parseFloat(l);
      c = a.startsWith("scale") ? u === 1 : u === 0;
    }
    if (!c || n) {
      const u = et(l, De[a]);
      if (!c) {
        i = !1;
        const f = jr[a] || a;
        s += `${f}(${u}) `;
      }
      n && (e[a] = u);
    }
  }
  const r = t.pathRotation;
  return r && (i = !1, s += `rotate(${et(r, De.pathRotation)}) `), s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function as(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (fe.has(l)) {
      o = !0;
      continue;
    } else if (Mn(l)) {
      i[l] = c;
      continue;
    } else {
      const u = et(c, De[l]);
      l.startsWith("origin") ? (a = !0, r[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = Yr(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = r;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
function ls(t, { style: e, vars: n }, s, i) {
  const r = t.style;
  let o;
  for (o in e)
    r[o] = e[o];
  i?.applyProjectionStyles(r, s);
  for (o in n)
    r.setProperty(o, n[o]);
}
function en(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const pe = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (d.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = en(t, e.target.x), s = en(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, zr = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = L.parse(t);
    if (i.length > 5)
      return s;
    const r = L.createTransformer(t), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    i[0 + o] /= a, i[1 + o] /= l;
    const c = ue(a, l, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= c), typeof i[3 + o] == "number" && (i[3 + o] /= c), r(i);
  }
}, qr = {
  borderRadius: {
    ...pe,
    applyTo: [...Mr]
  },
  borderTopLeftRadius: pe,
  borderTopRightRadius: pe,
  borderBottomLeftRadius: pe,
  borderBottomRightRadius: pe,
  boxShadow: zr
};
function Xr(t, { layout: e, layoutId: n }) {
  return fe.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!qr[t] || t === "opacity");
}
function us(t, e, n) {
  const s = t.style, i = e?.style, r = {};
  if (!s)
    return r;
  for (const o in s)
    (R(s[o]) || i && R(i[o]) || Xr(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (r[o] = s[o]);
  return r;
}
function Hr(t) {
  return window.getComputedStyle(t);
}
class Zr extends os {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ls;
  }
  mount(e) {
    G(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
  }
  readValueFromInstance(e, n) {
    if (fe.has(n))
      return this.projection?.isProjecting ? Ye(n) : yi(e, n);
    {
      const s = Hr(e), i = (Mn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Ur(e, n);
  }
  build(e, n, s) {
    as(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return us(e, n, s);
  }
}
function Jr(t, e) {
  return t in e;
}
class Qr extends rs {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (Jr(n, e)) {
      const s = e[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(e, n) {
    delete n.output[e];
  }
  measureInstanceViewportBox() {
    return yt();
  }
  build(e, n) {
    Object.assign(e.output, n);
  }
  renderInstance(e, { output: n }) {
    Object.assign(e, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const eo = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, to = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function no(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? eo : to;
  t[r.offset] = `${-s}`, t[r.array] = `${e} ${n}`;
}
const so = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function io(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, c, u) {
  if (as(t, a, c), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: f, style: h } = t;
  f.transform && (h.transform = f.transform, delete f.transform), (h.transform || f.transformOrigin) && (h.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), h.transform && (h.transformBox = u?.transformBox ?? "fill-box", delete f.transformBox);
  for (const m of so)
    f[m] !== void 0 && (h[m] = f[m], delete f[m]);
  e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), i !== void 0 && no(f, i, r, o, !1);
}
const cs = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), ro = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function oo(t, e, n, s) {
  ls(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(cs.has(i) ? i : gt(i), e.attrs[i]);
}
function ao(t, e, n) {
  const s = us(t, e, n);
  for (const i in t)
    if (R(t[i]) || R(e[i])) {
      const r = ce.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class lo extends os {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = yt;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (fe.has(n)) {
      const s = Qn(n);
      return s && s.default || 0;
    }
    return n = cs.has(n) ? n : gt(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return ao(e, n, s);
  }
  build(e, n, s) {
    io(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    oo(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = ro(e.tagName), super.mount(e);
  }
}
function uo(t, e, n) {
  const s = R(t) ? t : re(t);
  return s.start(zn("", s, e, n)), s.animation;
}
function bt(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function fs(t, e, n, s) {
  return t == null ? [] : typeof t == "string" && bt(e) ? ts(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t.filter((i) => i != null) : [t];
}
function co(t, e, n) {
  return t * (e + 1) + n * e;
}
function tn(t, e, n, s) {
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : e.startsWith("<") ? Math.max(0, n + parseFloat(e.slice(1))) : s.get(e) ?? t;
}
function fo(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (nt(t, i), s--);
  }
}
function ho(t, e, n, s, i, r) {
  fo(t, i, r);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: ue(i, r, s[o]),
      easing: /* @__PURE__ */ Tn(n, o)
    });
}
function po(t, e, n = 0) {
  const s = e + 1 + e * n;
  for (let i = 0; i < t.length; i++)
    t[i] = t[i] / s;
}
function mo(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const go = "easeInOut", Ne = 20;
function yo(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let u = 0, f = 0, h = 0;
  for (let m = 0; m < t.length; m++) {
    const y = t[m];
    if (typeof y == "string") {
      c.set(y, f);
      continue;
    } else if (!Array.isArray(y)) {
      c.set(y.name, tn(f, y.at, u, c));
      continue;
    }
    let [g, p, b = {}] = y;
    b.at !== void 0 && (f = tn(f, b.at, u, c));
    let C = 0;
    const A = (V, v, x, F = 0, S = 0) => {
      const M = bo(V), { delay: T = 0, times: w = On(M), type: B = e.type || "keyframes", repeat: P, repeatType: I, repeatDelay: W = 0, ..._ } = v;
      let { ease: U = e.ease || "easeOut", duration: N } = v;
      const Tt = typeof T == "function" ? T(F, S) : T, vt = M.length, St = mt(B) ? B : i?.[B || "keyframes"];
      if (vt <= 2 && St) {
        let Q = 100;
        if (vt === 2 && So(M)) {
          const he = M[1] - M[0];
          Q = Math.abs(he);
        }
        const ee = {
          ...e,
          ..._
        };
        N !== void 0 && (ee.duration = /* @__PURE__ */ O(N));
        const Ve = Rn(ee, Q, St);
        U = Ve.ease, N = Ve.duration;
      }
      N ?? (N = r);
      const Vt = f + Tt;
      w.length === 1 && w[0] === 0 && (w[1] = 1);
      const Mt = w.length - M.length;
      if (Mt > 0 && kn(w, Mt), M.length === 1 && M.unshift(null), P && oe(P < Ne, `Sequence segments can't repeat ${P} times — ignoring repeat option. Use a value below ${Ne} or apply repeat at the sequence level instead.`), P && P < Ne) {
        const Q = N > 0 ? W / N : 0;
        N = co(N, P, W);
        const ee = [...M], Ve = [...w];
        U = Array.isArray(U) ? [...U] : [U];
        const he = [...U], wt = I === "reverse" || I === "mirror";
        let xt = ee, Ct = he;
        wt && (xt = [...ee].reverse(), I === "reverse" && (Ct = [...he].reverse().map((Y) => typeof Y == "function" ? /* @__PURE__ */ rt(Y) : Y)));
        for (let Y = 0; Y < P; Y++) {
          const Et = wt && Y % 2 === 0, Ft = Et ? xt : ee, ds = Et ? Ct : he, Dt = (Y + 1) * (1 + Q);
          Q > 0 && (M.push(M[M.length - 1]), w.push(Dt), U.push("linear")), M.push(...Ft);
          for (let de = 0; de < Ft.length; de++)
            w.push(Ve[de] + Dt), U.push(de === 0 ? "linear" : /* @__PURE__ */ Tn(ds, de - 1));
        }
        po(w, P, Q);
      }
      const At = Vt + N;
      ho(x, M, U, w, Vt, At), C = Math.max(Tt + N, C), h = Math.max(At, h);
    };
    if (R(g)) {
      const V = nn(g, a);
      A(p, b, sn("default", V));
    } else {
      const V = fs(g, p, s, l), v = V.length;
      for (let x = 0; x < v; x++) {
        p = p, b = b;
        const F = V[x], S = nn(F, a);
        for (const M in p)
          A(p[M], To(b, M), sn(M, S), x, v);
      }
    }
    u = f, f += C;
  }
  return a.forEach((m, y) => {
    for (const g in m) {
      const p = m[g];
      p.sort(mo);
      const b = [], C = [], A = [];
      for (let F = 0; F < p.length; F++) {
        const { at: S, value: M, easing: T } = p[F];
        b.push(M), C.push(/* @__PURE__ */ it(0, h, S)), A.push(T || "easeOut");
      }
      C[0] !== 0 && (C.unshift(0), b.unshift(b[0]), A.unshift(go)), C[C.length - 1] !== 1 && (C.push(1), b.push(null)), o.has(y) || o.set(y, {
        keyframes: {},
        transition: {}
      });
      const V = o.get(y);
      V.keyframes[g] = b;
      const { type: v, ...x } = e;
      V.transition[g] = {
        ...x,
        duration: h,
        ease: A,
        times: C,
        ...n
      };
    }
  }), o;
}
function nn(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function sn(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function bo(t) {
  return Array.isArray(t) ? t : [t];
}
function To(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const vo = (t) => typeof t == "number", So = (t) => t.every(vo);
function Vo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, n = ns(t) && !Dr(t) ? new lo(e) : new Zr(e);
  n.mount(t), Te.set(t, n);
}
function Mo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Qr(e);
  n.mount(t), Te.set(t, n);
}
function Ao(t, e) {
  return R(t) || typeof t == "number" || typeof t == "string" && !bt(e);
}
function hs(t, e, n, s) {
  const i = [];
  if (Ao(t, e))
    i.push(uo(t, bt(e) && e.default || e, n && (n.default || n)));
  else {
    if (t == null)
      return i;
    const r = fs(t, e, s), o = r.length;
    G(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a], c = l instanceof Element ? Vo : Mo;
      Te.has(l) || c(l);
      const u = Te.get(l), f = { ...n };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), i.push(...fr(u, { ...e, transition: f }, {}));
    }
  }
  return i;
}
function wo(t, e, n) {
  const s = [], i = t.map((o) => {
    if (Array.isArray(o) && typeof o[0] == "function") {
      const a = o[0], l = re(0);
      return l.on("change", a), o.length === 1 ? [l, [0, 1]] : o.length === 2 ? [l, [0, 1], o[1]] : [l, o[1], o[2]];
    }
    return o;
  });
  return yo(i, e, n, { spring: be }).forEach(({ keyframes: o, transition: a }, l) => {
    s.push(...hs(l, o, a));
  }), s;
}
function xo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function Co(t = {}) {
  const { scope: e, reduceMotion: n, skipAnimations: s } = t;
  function i(r, o, a) {
    let l = [], c;
    const u = {};
    if (n !== void 0 && (u.reduceMotion = n), s !== void 0 && (u.skipAnimations = s), xo(r)) {
      const { onComplete: h, ...m } = o || {};
      typeof h == "function" && (c = h), l = wo(r, { ...u, ...m }, e);
    } else {
      const { onComplete: h, ...m } = a || {};
      typeof h == "function" && (c = h), l = hs(r, o, { ...u, ...m }, e);
    }
    const f = new Wi(l);
    return c && f.finished.then(c), e && (e.animations.push(f), f.finished.then(() => {
      nt(e.animations, f);
    })), f;
  }
  return i;
}
const Eo = Co(), Fo = { name: "micro", mount({ root: t, reducedMotion: e, signal: n, cleanup: s }) {
  e || t.querySelectorAll("[data-env-hover]").forEach((i) => {
    const r = i.getAttribute("style");
    let o;
    const a = (l) => {
      o?.cancel(), o = Eo(i, { scale: l }, { duration: 0.18 });
    };
    s(Fr(i, () => (a(1.035), () => a(1)))), i.addEventListener("focus", () => a(1.035), { signal: n }), i.addEventListener("blur", () => a(1), { signal: n }), s(() => {
      o?.cancel(), r === null ? i.removeAttribute("style") : i.setAttribute("style", r);
    });
  });
} };
export {
  Fo as micro
};
//# sourceMappingURL=micro-B9Y5l6bO.js.map
