// Check the API actually used by navigation; do not restart the live page here.
export function inspectWebflowRuntime(runtime) {
  try {
    if (typeof runtime?.require !== 'function') return { compatible: false, reason: 'Webflow.require unavailable' };
    const ix2 = runtime.require('ix2'), ix3 = runtime.require('ix3');
    for (const [name, value] of [
      ['ix2.init', ix2?.init], ['ix2.destroy', ix2?.destroy],
      ['ix3.ready', ix3?.ready], ['ix3.destroy', ix3?.destroy], ['ix3.getInstance', ix3?.getInstance]
    ]) if (typeof value !== 'function') return { compatible: false, reason: `Webflow ${name} unavailable` };
    const instance = ix3.getInstance();
    if (!instance) return { compatible: false, pending: true, reason: 'Webflow interactions not ready' };
    for (const name of ['register', 'setFeatures']) {
      if (typeof instance[name] !== 'function') return { compatible: false, reason: `Webflow interactions.${name} unavailable` };
    }
    const native = ['slider', 'navbar', 'dropdown', 'tabs'].map(name => [name, runtime.require(name)]).filter(([, module]) => module);
    for (const [name, module] of native) {
      if (typeof module.ready !== 'function' || (module.destroy != null && typeof module.destroy !== 'function')) return { compatible: false, reason: `Webflow ${name} lifecycle unavailable` };
    }
    return { compatible: true, ix2, ix3, native: native.map(([, module]) => module) };
  } catch (_) { return { compatible: false, reason: 'Webflow runtime inspection failed' }; }
}
export async function waitForWebflowRuntime(runtime, { timeout = 4000, pause = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now } = {}) {
  const start = now();
  for (;;) {
    const result = inspectWebflowRuntime(runtime);
    if (result.compatible) return result;
    if (!result.pending || now() - start >= timeout) throw Error(result.reason);
    await pause(50);
  }
}
