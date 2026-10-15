export type Cleanup = () => void;
export interface PageContext { root: HTMLElement; signal: AbortSignal; reducedMotion: boolean; cleanup: (fn: Cleanup) => void }
export interface MotionModule { name: string; mount: (context: PageContext) => void | Cleanup }
export class PageScope {
  private controller = new AbortController();
  private disposers: Cleanup[] = [];
  constructor(root: HTMLElement, modules: MotionModule[], reducedMotion: boolean) {
    try {
      for (const module of modules) {
        const dispose = module.mount({root, signal:this.controller.signal, reducedMotion, cleanup:fn=>this.disposers.push(fn)});
        if (dispose) this.disposers.push(dispose);
      }
    } catch (error) { this.destroy(); throw error; }
  }
  destroy() {
    this.controller.abort();
    for (const dispose of this.disposers.splice(0).reverse()) {
      try { dispose(); } catch (error) { console.error('[ENV] cleanup', error); }
    }
  }
}
