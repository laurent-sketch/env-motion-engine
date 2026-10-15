const v = { name: "faq", mount({ root: n, signal: o, cleanup: r }) {
  const e = [...n.querySelectorAll("[data-env-faq]")], c = [...n.querySelectorAll("[data-env-faq-content]")], d = [...e, ...c].map((t) => ({ el: t, active: t.classList.contains("active"), expanded: t.getAttribute("aria-expanded") })), i = (t) => {
    e.forEach((a) => {
      const s = a.dataset.envFaq === t;
      a.classList.toggle("active", s), a.setAttribute("aria-expanded", String(s));
    }), c.forEach((a) => a.classList.toggle("active", a.dataset.envFaqContent === t));
  };
  e.forEach((t) => t.addEventListener("click", () => i(t.dataset.envFaq), { signal: o })), e.length && i(e[0].dataset.envFaq), r(() => d.forEach(({ el: t, active: a, expanded: s }) => {
    t.classList.toggle("active", a), s === null ? t.removeAttribute("aria-expanded") : t.setAttribute("aria-expanded", s);
  }));
} };
export {
  v as faq
};
//# sourceMappingURL=faq-Cip6y42V.js.map
