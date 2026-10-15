import Swup from 'swup';
import { type MotionModule } from './lifecycle';
export { PageScope, type MotionModule, type PageContext } from './lifecycle';
export interface NavigationAdapter {
    prepare(document: Document, url: string): Promise<void> | void;
    leave(): Promise<void> | void;
    enter(document: Document, url: string): Promise<void> | void;
    destroy?(): void;
}
export interface EngineOptions {
    adapter?: NavigationAdapter;
    /** Reuse a host GSAP instance instead of downloading another copy. */
    gsap?: typeof import('gsap')['gsap'];
    transitionOffset?: number;
    container?: string;
    /** Explicitly certified paths only. Empty = native navigation. */
    pages?: string[];
    modules?: MotionModule[];
}
export declare function createEngine(options?: EngineOptions): Promise<{
    swup: Swup | undefined;
    destroy(): void;
}>;
