export type Cleanup = () => void;
export interface PageContext {
    root: HTMLElement;
    signal: AbortSignal;
    reducedMotion: boolean;
    cleanup: (fn: Cleanup) => void;
}
export interface MotionModule {
    name: string;
    mount: (context: PageContext) => void | Cleanup;
}
export declare class PageScope {
    private controller;
    private disposers;
    constructor(root: HTMLElement, modules: MotionModule[], reducedMotion: boolean);
    destroy(): void;
}
