import type { MotionModule } from '../lifecycle';
export interface Slider {
    destroyed?: boolean;
    snapGrid: number[];
    virtualSize: number;
    width: number;
    activeIndex: number;
    isEnd: boolean;
    slides: ArrayLike<HTMLElement>;
    params: {
        slidesOffsetBefore?: number;
        slidesOffsetAfter?: number;
        speed?: number;
    };
    navigation: {
        update(): void;
    };
    updateSize(): void;
    updateSlides(): void;
    updateProgress(): void;
    updateSlidesClasses(): void;
    slideTo(index: number, speed: number, callbacks: boolean): void;
    destroy(deleteInstance: boolean, cleanStyles: boolean): void;
}
export interface SliderOptions {
    direction: 'horizontal';
    slidesPerView: 'auto';
    slidesPerGroup: number;
    slidesPerGroupAuto: boolean;
    spaceBetween: number;
    slidesOffsetBefore: number;
    slidesOffsetAfter: number;
    speed: number;
    grabCursor: boolean;
    loop: boolean;
    rewind: boolean;
    freeMode: boolean;
    allowTouchMove: boolean;
    simulateTouch: boolean;
    navigation: {
        nextEl: HTMLElement;
        prevEl: HTMLElement;
    };
    on: {
        init(slider: Slider): void;
    };
}
export type SliderConstructor = new (element: HTMLElement, options: SliderOptions) => Slider;
export declare function createTestimonials(Swiper: SliderConstructor): MotionModule;
