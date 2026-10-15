/** Modules can run during readyState=interactive before later defer scripts. */
export function waitForDeferredScripts(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise(resolve => {
    const done = () => {
      document.removeEventListener('DOMContentLoaded', done);
      window.removeEventListener('load', done);
      resolve();
    };
    document.addEventListener('DOMContentLoaded', done, { once: true });
    // If DOMContentLoaded already fired while readyState is interactive,
    // the load event is the reliable remaining barrier.
    window.addEventListener('load', done, { once: true });
  });
}
