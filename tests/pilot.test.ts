import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { PageScope } from '../src/lifecycle';
import { pilotFaq } from '../src/pilot/faq';
import { createTestimonials, type SliderOptions, type Slider } from '../src/pilot/testimonials';
const markup = `<div class="faq-bloc"><div class="faq-item" data-faq="1">One</div><div class="faq-item" data-faq="2">Two</div><img class="img-faq-content" data-faq-content="1"><img class="img-faq-content" data-faq-content="2"></div>`;
function fixture() {
 const root=document.createElement('main');root.innerHTML=markup+`<section class="testimonial-section"><div class="max-w-global"></div><button class="swiper-button-next"></button><button class="swiper-button-prev"></button><div class="testimonial-swiper"><div class="swiper-wrapper" style="color: red"></div></div></section>`;document.body.append(root);return root;
}
const disconnect=vi.fn();
let observerCallback: () => void;
class Observer {
 constructor(callback: () => void){observerCallback=callback;}
 observe=vi.fn(); disconnect=disconnect;
}
let instance: FakeSlider;
class FakeSlider implements Slider {
 destroyed=false;snapGrid=[0,100];virtualSize=1000;width=400;activeIndex=1;isEnd=true;slides=[document.createElement('div'),document.createElement('div')];
 params:{slidesOffsetBefore?:number;slidesOffsetAfter?:number;speed?:number};
 navigation={update:vi.fn()};updateSize=vi.fn();updateSlides=vi.fn();updateProgress=vi.fn();updateSlidesClasses=vi.fn();slideTo=vi.fn();
 destroy=vi.fn(()=>{this.destroyed=true;});
 constructor(element:HTMLElement, options:SliderOptions){this.params={...options};instance=this;options.on.init(this);}
}
beforeEach(()=>{vi.useFakeTimers();vi.stubGlobal('ResizeObserver',Observer);vi.stubGlobal('requestAnimationFrame',(fn:FrameRequestCallback)=>setTimeout(()=>fn(0),16));vi.stubGlobal('cancelAnimationFrame',(id:number)=>clearTimeout(id));disconnect.mockClear();});
afterEach(()=>{document.body.replaceChildren();vi.useRealTimers();vi.unstubAllGlobals();});
it('FAQ supports keyboard, isolates groups and restores DOM/listeners on teardown',()=>{
 const root=fixture();root.insertAdjacentHTML('beforeend',markup);const before=root.innerHTML;
 const scope=new PageScope(root,[pilotFaq],false);const groups=root.querySelectorAll('.faq-bloc');const second=groups[0].querySelectorAll<HTMLElement>('.faq-item')[1];
 second.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
 expect(second.getAttribute('aria-expanded')).toBe('true');expect(groups[1].querySelector('.faq-item')?.getAttribute('aria-expanded')).toBe('true');
 scope.destroy();expect(root.innerHTML).toBe(before);second.click();expect(root.innerHTML).toBe(before);
 const again=new PageScope(root,[pilotFaq],false);expect(second.getAttribute('aria-expanded')).toBe('false');again.destroy();
});
it('Swiper preserves last-snap alignment, observes layout and cancels pending work',()=>{
 const root=fixture();const scope=new PageScope(root,[createTestimonials(FakeSlider)],true);
 expect(instance.params.speed).toBe(0);expect(instance.snapGrid[1]).toBe(600);
 vi.advanceTimersByTime(16);observerCallback();vi.advanceTimersByTime(32);
 expect(instance.updateSize).toHaveBeenCalledOnce();
 window.dispatchEvent(new Event('resize'));scope.destroy();scope.destroy();const count=instance.updateSize.mock.calls.length;
 vi.runAllTimers();window.dispatchEvent(new Event('resize'));vi.runAllTimers();
 expect(instance.updateSize).toHaveBeenCalledTimes(count);expect(disconnect).toHaveBeenCalledOnce();expect(instance.destroy).toHaveBeenCalledExactlyOnceWith(true,true);
 expect(root.querySelector('.swiper-wrapper')?.getAttribute('style')).toBe('color: red');
});
it('refuses an existing Swiper without destroying resources owned by another script',()=>{
 const root=fixture();const existing={destroy:vi.fn()};Object.assign(root.querySelector('.testimonial-swiper')!,{swiper:existing});const before=root.innerHTML;
 expect(()=>new PageScope(root,[pilotFaq,createTestimonials(FakeSlider)],false)).toThrow('already initialized');expect(existing.destroy).not.toHaveBeenCalled();expect(root.innerHTML).toBe(before);
});
it('restores the wrapper and cancels frames if construction fails',()=>{
 const root=fixture();const before=root.innerHTML;
 class Broken extends FakeSlider {constructor(el:HTMLElement,opts:SliderOptions){super(el,opts);throw Error('constructor failed');}}
 expect(()=>new PageScope(root,[createTestimonials(Broken)],false)).toThrow('constructor failed');vi.runAllTimers();expect(instance.slideTo).not.toHaveBeenCalled();expect(root.innerHTML).toBe(before);
});
