import type { MotionModule } from '../lifecycle';

/** Adapter for the pilot's existing class/data contract. No cloned DOM. */
export const pilotFaq: MotionModule = {
  name: 'pilot-faq',
  mount({ root, signal, cleanup }) {
    for (const group of root.querySelectorAll<HTMLElement>('.faq-bloc')) {
      const items = [...group.querySelectorAll<HTMLElement>('.faq-item[data-faq]')];
      const images = [...group.querySelectorAll<HTMLElement>('.img-faq-content[data-faq-content]')];
      const attributes = ['class', 'role', 'tabindex', 'aria-expanded'];
      const snapshots = [...items, ...images].map(element => ({
        element, values: attributes.map(name => element.getAttribute(name)),
      }));
      cleanup(() => snapshots.forEach(({ element, values }) => attributes.forEach((name, index) => {
        const value = values[index];
        if (value === null) element.removeAttribute(name);
        else element.setAttribute(name, value);
      })));
      const activate = (id: string | undefined) => {
        items.forEach(item => {
          const active = item.dataset.faq === id;
          item.classList.toggle('active', active);
          item.setAttribute('aria-expanded', String(active));
        });
        images.forEach(image => image.classList.toggle('active', image.dataset.faqContent === id));
      };
      for (const item of items) {
        const native = item.matches('button, a[href], input, select, textarea');
        if (!native) {
          item.setAttribute('role', 'button');
          item.setAttribute('tabindex', '0');
          item.addEventListener('keydown', event => {
            if (event.target !== item || !['Enter', ' '].includes(event.key)) return;
            event.preventDefault();
            activate(item.dataset.faq);
          }, { signal });
        }
        item.addEventListener('click', () => activate(item.dataset.faq), { signal });
      }
      if (items.length) activate(items[0].dataset.faq);
    }
  },
};
