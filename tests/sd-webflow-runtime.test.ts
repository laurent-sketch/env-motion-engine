import { expect, it, vi } from 'vitest';
import { inspectWebflowRuntime, waitForWebflowRuntime } from '../src/sd/webflow-runtime.js';
function fixture() {
  const instance = { register: vi.fn(), setFeatures: vi.fn() };
  const modules: any = { ix2:{init:vi.fn(),destroy:vi.fn()}, ix3:{ready:vi.fn(),destroy:vi.fn(),getInstance:()=>instance}, navbar:{ready:vi.fn(),destroy:vi.fn()} };
  return {runtime:{require:(name:string)=>modules[name]},modules,instance};
}
it('checks required runtime functions without restarting or destroying anything', () => {
  const f=fixture();expect(inspectWebflowRuntime(f.runtime).compatible).toBe(true);
  expect(f.modules.ix2.init).not.toHaveBeenCalled();expect(f.modules.ix3.ready).not.toHaveBeenCalled();expect(f.modules.navbar.destroy).not.toHaveBeenCalled();expect(f.instance.register).not.toHaveBeenCalled();
});
it('rejects incomplete interaction and native widget APIs', () => {
  for(const [module,key] of [['ix2','destroy'],['ix3','ready']]){
    const f=fixture();delete f.modules[module][key];expect(inspectWebflowRuntime(f.runtime).compatible).toBe(false);
  }
  const f=fixture();delete (f.instance as any).register;expect(inspectWebflowRuntime(f.runtime).compatible).toBe(false);
  const g=fixture();g.modules.navbar.destroy=true;expect(inspectWebflowRuntime(g.runtime).compatible).toBe(false);
});
it('waits for initial async IX3 setup without invoking it a second time', async () => {
  const f=fixture();let tick=0;f.modules.ix3.getInstance=()=>tick>=100?f.instance:undefined;
  const result=await waitForWebflowRuntime(f.runtime,{now:()=>tick,pause:async ms=>{tick+=ms;}});
  expect(result.compatible).toBe(true);expect(f.modules.ix3.ready).not.toHaveBeenCalled();
});
it('times out if initial IX3 setup never becomes ready', async () => {
  const f=fixture();let tick=0;f.modules.ix3.getInstance=()=>undefined;
  await expect(waitForWebflowRuntime(f.runtime,{timeout:100,now:()=>tick,pause:async ms=>{tick+=ms;}})).rejects.toThrow('not ready');
});
