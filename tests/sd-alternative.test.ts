import { afterEach, expect, it, vi } from 'vitest';
import { createAlternativeTransition, freezePageMotion } from '../src/sd/alternative-transition.js';
afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fixture(reduced = false) {
  document.body.innerHTML = '<nav id="menu"></nav><div id="env-sd-page"><main class="main-wrapper"><h1 id="title" data-env-reveal="fade-up">Work</h1><script>example()</script></main></div>';
  vi.stubGlobal('matchMedia', () => ({ matches: reduced }));
  const cancel = vi.fn();
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, writable: true, value: vi.fn(() => ({ finished: Promise.resolve(), cancel })) });
  return { runtime: createAlternativeTransition(), cancel };
}
it('creates an inert visual snapshot without duplicate IDs, scripts, or reveal targets', () => {
  const { runtime } = fixture(); runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.getAttribute('aria-hidden')).toBe('true');
  expect(snapshot.querySelector('[id],script,[data-env-reveal]')).toBeNull();
  expect(document.querySelectorAll('#menu')).toHaveLength(1);
  runtime.cleanup(); expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
});
it('restores incoming inline styles after revealing and removes the old snapshot', async () => {
  const { runtime, cancel } = fixture(); runtime.capture();
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  root.style.color = 'red'; const original = root.getAttribute('style');
  runtime.prepare(root); expect(root.style.clipPath).toContain('100%');
  await runtime.reveal(root);
  expect(root.getAttribute('style')).toBe(original);
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
  expect(cancel).toHaveBeenCalledTimes(3);
});
it('leaves navigation instantaneous with reduced motion', async () => {
  const { runtime } = fixture(true); runtime.capture();
  await runtime.reveal(document.querySelector('#env-sd-page'));
  expect(Element.prototype.animate).not.toHaveBeenCalled();
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
});

it('uses viewport-sized mask travel and synchronizes a black shade with both page layers', async () => {
  const { runtime } = fixture(); runtime.capture();
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  const shade = document.querySelector('[data-env-transition-shade]') as HTMLElement;
  expect(shade.style.background).toBe('rgb(0, 0, 0)');
  runtime.prepare(root); await runtime.reveal(root);
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls).toHaveLength(3);
  expect(calls[1][0][0].clipPath).toContain(`${window.innerHeight}px`);
  expect(calls[1][0][0].clipPath).not.toContain('100%,100% 110%');
  expect(calls[2][0]).toEqual([{ opacity: 0 }, { opacity: 0.35 }]);
  expect(calls.map(call => call[1])).toEqual([calls[0][1], calls[0][1], calls[0][1]]);
});

// Webflow centers background videos with negative offsets and auto margins.
// Omitting those resolved margins places the captured frame outside its wrapper.
it('preserves background video centering when replacing it with a frame', () => {
  const { runtime } = fixture();
  const root = document.querySelector('#env-sd-page')!;
  root.innerHTML = '<div class="w-background-video"><video style="position:absolute;top:-100px;left:-200px;width:200px;height:100px;margin:100px 200px;object-fit:cover"></video></div>';
  const source = root.querySelector('video')!;
  Object.defineProperty(source, 'readyState', { value: 4 });
  const drawImage = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as any);
  runtime.capture();
  const frame = document.querySelector('[data-env-transition-snapshot] canvas') as HTMLCanvasElement;
  expect(drawImage).toHaveBeenCalled();
  expect(frame.style.marginTop).toBe('100px');
  expect(frame.style.marginLeft).toBe('200px');
  expect(frame.style.top).toBe('-100px');
  expect(frame.style.left).toBe('-200px');
  runtime.cleanup();
});

it('freezes outgoing page styles before destination CSS and slider initialization change', () => {
  const { runtime } = fixture();
  const sheet = document.createElement('style');
  sheet.textContent = '#title { color: red; margin-top: 42px; } .w-slide { width: 300px; }';
  document.head.append(sheet);
  document.querySelector('#title')!.classList.add('w-slide');
  runtime.capture();
  sheet.textContent = '.w-slide { width: 900px; }';
  const heading = document.querySelector('[data-env-transition-snapshot] h1') as HTMLElement;
  expect(heading.style.color).toBe('rgb(255, 0, 0)');
  expect(heading.style.marginTop).toBe('42px');
  expect(heading.style.width).toBe('300px');
  expect(heading.classList.contains('w-slide')).toBe(false);
  runtime.cleanup(); sheet.remove();
});

it('compensates section displacement caused by freezing auto heights', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section class="section news">News</section>';
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = this.closest('[data-env-transition-snapshot]') ? 44 : 100;
    return { top, left: 0, bottom: top + 200, right: 300, width: 300, height: 200, x: 0, y: top, toJSON() {} };
  });
  runtime.capture();
  const section = document.querySelector('[data-env-transition-snapshot] .news') as HTMLElement;
  expect(section.style.transform).toContain('translate(0px,56px)');
  runtime.cleanup();
});

it('isolates the frozen footer from class-targeted Webflow parallax', () => {
  const { runtime } = fixture();
  document.querySelector('#env-sd-page')!.insertAdjacentHTML('beforeend', '<footer class="section footer static" style="transform:translateY(-2px)">Footer</footer>');
  runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.querySelector('.footer')).toBeNull();
  expect((snapshot.querySelector('footer') as HTMLElement).style.transform).toContain('-2px');
  runtime.cleanup();
});

it('removes attribute-based services targets only from the outgoing snapshot', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<div data-services="reveal"><div class="bloc-100 gap24 padding-right" style="opacity:1">Brand strategy</div></div>';
  runtime.capture();
  expect(document.querySelector('[data-env-transition-snapshot] [data-services]')).toBeNull();
  expect(document.querySelector('[data-env-transition-snapshot] .bloc-100')).toBeNull();
  expect(document.querySelector('#env-sd-page [data-services="reveal"]')).not.toBeNull();
  expect((document.querySelector('[data-env-transition-snapshot] main > div > div') as HTMLElement).style.opacity).toBe('1');
  runtime.cleanup();
});

it('freezes nested sticky titles without changing the live page', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section><div class="sticky" style="position:sticky;top:112px"><h1>Built Differently</h1></div></section>';
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = this.closest('[data-env-transition-snapshot]') ? -200 : 112;
    return { top, left: 0, bottom: top + 100, right: 300, width: 300, height: 100, x: 0, y: top, toJSON() {} };
  });
  runtime.capture();
  const live = document.querySelector('#env-sd-page .sticky') as HTMLElement;
  const frozen = document.querySelector('[data-env-transition-snapshot] .sticky') as HTMLElement;
  expect(live.style.position).toBe('sticky');
  expect(frozen.style.position).toBe('relative');
  expect(frozen.style.inset).toBe('auto');
  expect(frozen.style.transform).toContain('translate(');
  runtime.cleanup();
});

it('copies painted canvas pixels into the transition snapshot', () => {
  const { runtime } = fixture();
  const source = document.createElement('canvas');source.width=600;source.height=300;
  document.querySelector('.main-wrapper')!.append(source);
  const drawImage=vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({drawImage} as any);
  runtime.capture();
  const frozen=document.querySelector('[data-env-transition-snapshot] canvas') as HTMLCanvasElement;
  expect(frozen.width).toBe(600);expect(frozen.height).toBe(300);
  expect(drawImage).toHaveBeenCalledWith(source,0,0);
  runtime.cleanup();
});

it('isolates Work parallax cards while preserving their captured transforms', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section><a class="project-item work left" style="transform:translateY(-4px)">Left</a><a class="project-item work right" style="transform:translateY(4px)">Right</a></section>';
  runtime.capture();
  const snapshot=document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.querySelector('.project-item.work')).toBeNull();
  const cards=snapshot.querySelectorAll('a');
  expect(cards[0].style.transform).toContain('-4px');
  expect(cards[1].style.transform).toContain('4px');
  expect(document.querySelectorAll('#env-sd-page .project-item.work')).toHaveLength(2);
  runtime.cleanup();
});

it('freezes only outgoing motion without reverting and resumes it on an aborted visit', () => {
  fixture();
  const root = document.querySelector('#env-sd-page')!;
  const running = { playState: 'running', pause: vi.fn(), play: vi.fn() };
  const alreadyPaused = { playState: 'paused', pause: vi.fn(), play: vi.fn() };
  const getAnimations = vi.fn(() => [running, alreadyPaused]);
  Object.assign(root, { getAnimations });
  const tween = { paused: () => false, pause: vi.fn(), resume: vi.fn() };
  const idle = { paused: () => true, pause: vi.fn(), resume: vi.fn() };
  const trigger = { trigger: root.querySelector('h1'), enabled: true, disable: vi.fn(), enable: vi.fn(), animation: tween };
  const menuTrigger = { trigger: document.querySelector('nav'), enabled: true, disable: vi.fn() };
  const lenis = { isStopped: false, stop: vi.fn(), start: vi.fn() };
  const win = { ScrollTrigger: { getAll: () => [trigger, menuTrigger] }, gsap: { getTweensOf: vi.fn(() => [tween, idle]) }, lenis };
  const release = freezePageMotion(root, win as any);
  expect(getAnimations).toHaveBeenCalledWith({ subtree: true });
  expect(running.pause).toHaveBeenCalledOnce();
  expect(alreadyPaused.pause).not.toHaveBeenCalled();
  expect(trigger.disable).toHaveBeenCalledWith(false, false);
  expect(menuTrigger.disable).not.toHaveBeenCalled();
  expect(tween.pause).toHaveBeenCalledOnce();
  expect(idle.pause).not.toHaveBeenCalled();
  expect(lenis.stop).toHaveBeenCalledOnce();
  running.playState = 'paused';
  release();
  expect(trigger.enable).toHaveBeenCalledWith(false, false);
  expect(tween.resume).toHaveBeenCalledOnce();
  expect(idle.resume).not.toHaveBeenCalled();
  expect(running.play).toHaveBeenCalledOnce();
  expect(lenis.start).toHaveBeenCalledOnce();
});

it('never resumes motion belonging to an outgoing page that has been removed', () => {
  fixture();
  const root = document.querySelector('#env-sd-page')!;
  const tween = { paused: () => false, pause: vi.fn(), resume: vi.fn() };
  const lenis = { isStopped: false, stop: vi.fn(), start: vi.fn() };
  const release = freezePageMotion(root, { gsap: { getTweensOf: () => [tween] }, lenis } as any);
  root.remove(); release();
  expect(tween.pause).toHaveBeenCalledOnce();
  expect(tween.resume).not.toHaveBeenCalled();
  expect(lenis.start).not.toHaveBeenCalled();
});

it('isolates Home grid containers from native IX2 restart without losing their captured appearance', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section class="project-work grid is-padding" style="transform:translateY(5px)"><div class="project-row grid-8" style="filter:blur(2px);transform:scale(.99)"><a class="project-item home">Project</a></div></section>';
  runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.querySelector('.project-row,.project-work')).toBeNull();
  // Model the real native IX2 global selector that resets targets on page change.
  document.querySelectorAll('.project-row.grid-8').forEach(element => {
    const target = element as HTMLElement;
    target.style.filter = 'blur(10px)'; target.style.transform = 'scale(.95)';
  });
  const frozenRow = snapshot.querySelector('section > div') as HTMLElement;
  expect(frozenRow.style.filter).toBe('blur(2px)');
  expect(frozenRow.style.transform).toBe('scale(.99)');
  expect((snapshot.querySelector('section') as HTMLElement).style.transform).toBe('translateY(5px)');
  expect((document.querySelector('#env-sd-page .project-row') as HTMLElement).style.filter).toBe('blur(10px)');
  runtime.cleanup();
});

it('preserves centered CMS Next rows inside an otherwise aligned section', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section class="section next-project"><div class="main-row"><div class="w-dyn-list"><div class="next-project-row"><a class="next-project-media">Next</a></div></div></div></section>';
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const row = this.matches('.main-row');
    const snapshot = !!this.closest('[data-env-transition-snapshot]');
    const left = row ? (snapshot ? 48 : 173.333) : 0;
    return { top: 200, left, bottom: 750, right: left + 1360, width: 1360, height: 550, x: left, y: 200, toJSON() {} };
  });
  runtime.capture();
  const row = document.querySelector('[data-env-transition-snapshot] .main-row') as HTMLElement;
  expect(row.style.transform).toContain('translate(125.333');
  expect((document.querySelector('#env-sd-page .main-row') as HTMLElement).style.transform).toBe('');
  runtime.cleanup();
});

it('keeps the frozen Step cards and background out of native IX2 restarts', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section><div class="step-single-item rev" style="transform:scale(.98);filter:blur(1px)"><div class="content-step"><div class="step-content">Consider</div></div><div class="bg-services-wrapper" style="transform:translateY(-12%)">Background</div></div></section>';
  runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.querySelector('.step-single-item,.bg-services-wrapper')).toBeNull();
  // The published native events target .step-single-item globally, then its
  // descendant background. Simulate the destination's initial-state reset.
  document.querySelectorAll('.step-single-item').forEach(element => {
    const card = element as HTMLElement;
    card.style.transform = 'scale(.88)'; card.style.filter = 'blur(10px)';
    (card.querySelector('.bg-services-wrapper') as HTMLElement).style.transform = 'translateY(0%)';
  });
  const card = snapshot.querySelector('.rev') as HTMLElement;
  expect(card.style.transform).toBe('scale(.98)');
  expect(card.style.filter).toBe('blur(1px)');
  expect((card.lastElementChild as HTMLElement).style.transform).toBe('translateY(-12%)');
  expect(document.querySelector('#env-sd-page .step-single-item.rev')).not.toBeNull();
  runtime.cleanup();
});

it('removes all native text reveal markers from frozen copies only', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<div data-reveal-text="trigger-about"><p data-reveal-text="text" style="opacity:.6">Copy</p></div>';
  runtime.capture();
  expect(document.querySelector('[data-env-transition-snapshot] [data-reveal-text]')).toBeNull();
  expect(document.querySelectorAll('#env-sd-page [data-reveal-text]')).toHaveLength(2);
  expect((document.querySelector('[data-env-transition-snapshot] p') as HTMLElement).style.opacity).toBe('0.6');
  runtime.cleanup();
});

it('clips the incoming fixed About hero even when the page root begins below the viewport', async () => {
  const { runtime } = fixture();
  runtime.capture();
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  root.innerHTML='<main style="position:relative"><section class="section hero-about" style="position:fixed;top:0;left:0;height:720px">Hero</section></main>';
  const hero=root.querySelector('.hero-about') as HTMLElement;
  const original=hero.getAttribute('style');
  vi.spyOn(root,'getBoundingClientRect').mockReturnValue({top:720,left:0,width:1280,height:9000} as DOMRect);
  vi.spyOn(hero,'getBoundingClientRect').mockImplementation(()=>({top:hero.style.position==='absolute'?720:0,left:0,width:1280,height:720} as DOMRect));
  runtime.prepare(root);
  expect(hero.style.position).toBe('absolute');
  expect(root.style.display).toBe('flow-root');
  expect(hero.style.top).toBe('-720px');
  runtime.prepare(root); // Same-page setup must not overwrite the saved fixed style.
  await runtime.reveal(root);
  const calls=vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls[1][0][0].clipPath).toContain(`${window.innerHeight-720}px`);
  expect(calls[1][0][1].clipPath).toContain('-720px');
  expect(hero.getAttribute('style')).toBe(original);
});

it('restores incoming hero positioning on an aborted mask and leaves the menu fixed', () => {
  const { runtime } = fixture();
  const menu=document.querySelector('nav') as HTMLElement;menu.style.position='fixed';
  runtime.capture();
  const root=document.querySelector('#env-sd-page') as HTMLElement;
  root.insertAdjacentHTML('beforeend','<section class="section hero-about" style="position:fixed">Hero</section>');
  runtime.prepare(root);
  expect((root.querySelector('.hero-about') as HTMLElement).style.position).toBe('absolute');
  runtime.cleanup();
  expect((root.querySelector('.hero-about') as HTMLElement).style.position).toBe('fixed');
  expect(menu.style.position).toBe('fixed');
});

it('starts a departure before incoming content is ready and continues from its visible position', async () => {
  const { runtime, cancel } = fixture();
  runtime.capture(); runtime.depart(); runtime.depart();
  const overlay = document.querySelector('[data-env-transition-snapshot]') as HTMLElement;
  const shade = document.querySelector('[data-env-transition-shade]') as HTMLElement;
  expect(vi.mocked(Element.prototype.animate).mock.calls).toHaveLength(2);
  expect(document.querySelector('#env-sd-page')!.getAttribute('style')).toBeNull();
  overlay.style.transform = 'translateY(-10px) scale(1.003)'; shade.style.opacity = '.04';
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  runtime.prepare(root); await runtime.reveal(root);
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls).toHaveLength(5);
  expect(calls[2][0][0].transform).toBe('translateY(-10px) scale(1.003)');
  expect(calls[4][0][0].opacity).toBe(.04);
  expect(cancel).toHaveBeenCalledTimes(5);
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
});
it('cleans early departure effects and releases scroll on failed navigation', () => {
  const { runtime, cancel } = fixture();
  runtime.capture(); runtime.depart(); runtime.cleanup();
  expect(cancel).toHaveBeenCalledTimes(2);
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
  expect(document.documentElement.hasAttribute('data-env-transition-active')).toBe(false);
});

it('captures a viewport-fixed descendant even when its parent is far offscreen, without resolving distant text', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section class="hero-host"><div class="fixed-hero">Hero</div></section><section class="far"><p class="far-text">Many split words below the viewport</p></section>';
  const sheet = document.createElement('style');
  sheet.textContent = '.fixed-hero{position:fixed;color:red}.far-text{color:blue}';
  document.head.append(sheet);
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = this.matches('.hero-host') ? -3000 : this.matches('.far,.far-text') ? 5000 : 0;
    const height = this.matches('#env-sd-page,main') ? 9000 : 500;
    return { top, left: 0, bottom: top + height, right: 1200, width: 1200, height, x: 0, y: top, toJSON() {} };
  });
  runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect((snapshot.querySelector('.fixed-hero') as HTMLElement).style.color).toBe('rgb(255, 0, 0)');
  expect((snapshot.querySelector('.far-text') as HTMLElement).style.color).toBe('');
  expect(snapshot.querySelector('.hero-host')).not.toBeNull();
  runtime.cleanup(); sheet.remove();
});
