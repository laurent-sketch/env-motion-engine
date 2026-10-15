import type { NavigationAdapter } from '../index';
export interface Snapshot {
    path: string;
    pageId: string;
    siteId: string;
    bootstrap: string;
    configUrl: string;
    stylesheets: string[];
    styles: string;
    headStyles: string[];
    spline: boolean;
    ix2: Record<string, unknown>;
    interactions: Record<string, unknown>[];
    timelines: Record<string, unknown>[];
}
export interface WebflowRuntime {
    require(name: string): unknown;
}
declare const snapshots: {
    '/': () => Promise<Snapshot>;
    '/about': () => Promise<Snapshot>;
};
export type CertifiedPath = keyof typeof snapshots;
export declare const certifiedPaths: CertifiedPath[];
export declare function snapshotFor(path: string): Promise<Snapshot>;
export declare function validatePage(document: Document, snapshot: Snapshot, live?: boolean): void;
export declare function wrapPage(document: Document): HTMLElement;
export declare function syncMetadata(incoming: Document, current?: Document): void;
/** Experimental bridge pinned to the audited Webflow exports; no downloaded code execution. */
export declare function createWebflowNavigation(runtime: WebflowRuntime, initialPath: string): Promise<NavigationAdapter>;
export {};
