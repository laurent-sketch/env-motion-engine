import Swup from 'swup';
import { type MotionModule } from './lifecycle';
export { PageScope, type MotionModule, type PageContext } from './lifecycle';
export interface EngineOptions {
    container?: string;
    /** Explicitly certified paths only. Empty = native navigation. */
    pages?: string[];
    modules?: MotionModule[];
}
export declare function createEngine(options?: EngineOptions): Promise<{
    swup: Swup | undefined;
    destroy(): void;
}>;
