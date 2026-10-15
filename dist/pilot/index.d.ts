import { type SliderConstructor } from './testimonials';
export interface PilotOptions {
    /** Explicit migration contract: both legacy custom scripts must be removed. */
    legacyScriptsRemoved: true;
    /** Experimental: Home ↔ About, guarded by the audited export snapshots. */
    navigation?: boolean;
    /** Injectable for self-hosted Swiper; otherwise reuse window.Swiper. */
    Swiper?: SliderConstructor;
}
/** Phase 1: adopt existing widgets while preserving Webflow's native navigation. */
export declare function createPilotEngine(options: PilotOptions): Promise<{
    swup: import("swup").default | undefined;
    destroy(): void;
} | undefined>;
