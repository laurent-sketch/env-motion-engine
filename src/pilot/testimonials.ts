import type { MotionModule } from '../lifecycle';

// Structural interface keeps Swiper out of ENV's bundle: reuse the site's Swiper 12.
export interface Slider {
  destroyed?: boolean;
  snapGrid: number[];
  virtualSize: number;
  width: number;
  activeIndex: number;
  isEnd: boolean;
  slides: ArrayLike<HTMLElement>;
  params: { slidesOffsetBefore?: number; slidesOffsetAfter?: number; speed?: number };
  navigation: { update(): void };
  updateSize(): void;
  updateSlides(): void;
  updateProgress(): void;
  updateSlidesClasses(): void;
  slideTo(index: number, speed: number, callbacks: boolean): void;
  destroy(deleteInstance: boolean, cleanStyles: boolean): void;
}
export interface SliderOptions {
  direction: 'horizontal'; slidesPerView: 'auto'; slidesPerGroup: number;
  slidesPerGroupAuto: boolean; spaceBetween: number; slidesOffsetBefore: number;
  slidesOffsetAfter: number; speed: number; grabCursor: boolean; loop: boolean;
  rewind: boolean; freeMode: boolean; allowTouchMove: boolean; simulateTouch: boolean;
  navigation: { nextEl: HTMLElement; prevEl: HTMLElement };
  on: { init(slider: Slider): void };
}
export type SliderConstructor = new (element: HTMLElement, options: SliderOptions) => Slider;

export function createTestimonials(Swiper: SliderConstructor): MotionModule {
  return { name: 'pilot-testimonials', mount({ root, reducedMotion, signal, cleanup }) {
    for (const section of root.querySelectorAll<HTMLElement>('.testimonial-section')) {
      const container = section.querySelector<HTMLElement>('.testimonial-swiper');
      const wrapper = container?.querySelector<HTMLElement>('.swiper-wrapper');
      const reference = section.querySelector<HTMLElement>('.max-w-global');
      const next = section.querySelector<HTMLElement>('.swiper-button-next');
      const previous = section.querySelector<HTMLElement>('.swiper-button-prev');
      if (!container || !wrapper || !reference || !next || !previous) {
        throw new Error('[ENV] Incomplete testimonial markup');
      }
      if ((container as HTMLElement & { swiper?: Slider }).swiper) {
        throw new Error('[ENV] Swiper already initialized: remove the old testimonial script first');
      }
      if (typeof ResizeObserver === 'undefined') throw new Error('[ENV] ResizeObserver required');
      let frame: number | undefined;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let observer: ResizeObserver | undefined;
      let slider: Slider | undefined;
      let alive = true;
      const originalStyle = wrapper.getAttribute('style');
      cleanup(() => {
        alive = false;
        if (frame !== undefined) cancelAnimationFrame(frame);
        clearTimeout(timer);
        observer?.disconnect();
        if (slider && !slider.destroyed) slider.destroy(true, true);
        if (originalStyle === null) wrapper.removeAttribute('style');
        else wrapper.setAttribute('style', originalStyle);
      });
      const insetBefore = () => Math.max(reference.getBoundingClientRect().left - container.getBoundingClientRect().left, 0);
      const insetAfter = () => Math.max(container.getBoundingClientRect().right - next.getBoundingClientRect().right, 0);
      const alignLast = (instance: Slider) => {
        if (instance.snapGrid.length) instance.snapGrid[instance.snapGrid.length - 1] =
          Math.max(instance.virtualSize - instance.width - Number(instance.params.slidesOffsetAfter || 0), 0);
      };
      const schedule = (fn: () => void) => {
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { frame = undefined; if (alive) fn(); });
      };
      const update = () => {
        if (!alive || !slider || slider.destroyed) return;
        const index = slider.activeIndex;
        const wasAtEnd = slider.isEnd;
        slider.params.slidesOffsetBefore = insetBefore();
        slider.params.slidesOffsetAfter = insetAfter();
        slider.updateSize(); slider.updateSlides(); alignLast(slider);
        slider.updateProgress(); slider.updateSlidesClasses();
        schedule(() => {
          if (!slider || slider.destroyed) return;
          slider.slideTo(wasAtEnd ? Math.max(slider.slides.length - 1, 0) : index, 0, false);
          slider.updateProgress(); slider.updateSlidesClasses(); slider.navigation.update();
        });
      };
      Object.assign(wrapper.style, { margin: '0', width: '100%', maxWidth: 'none' });
      slider = new Swiper(container, {
        direction: 'horizontal', slidesPerView: 'auto', slidesPerGroup: 1,
        slidesPerGroupAuto: false, spaceBetween: 16,
        slidesOffsetBefore: insetBefore(), slidesOffsetAfter: insetAfter(),
        speed: reducedMotion ? 0 : 700, grabCursor: true, loop: false,
        rewind: false, freeMode: false, allowTouchMove: true, simulateTouch: true,
        navigation: { nextEl: next, prevEl: previous },
        on: { init(instance) {
          alignLast(instance);
          schedule(() => { instance.slideTo(0, 0, false); instance.navigation.update(); });
        } },
      });
      observer = new ResizeObserver(() => schedule(update));
      [container, reference, section].forEach(element => observer!.observe(element));
      window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(update, 100); }, { signal });
    }
  } };
}
