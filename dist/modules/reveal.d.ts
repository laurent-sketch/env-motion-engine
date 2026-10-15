import type { gsap as GSAP } from 'gsap';
import type { MotionModule } from '../lifecycle';
/** Explicit attributes transfer ownership to ENV; never add them to native animated targets. */
export declare function createReveal(gsap: typeof GSAP): MotionModule;
