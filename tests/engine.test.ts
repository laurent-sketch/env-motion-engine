import { afterEach, expect, it, vi } from 'vitest';
const registry=vi.hoisted(()=>new Map<string,Function>());
vi.mock('swup',()=>({default:class {
 hooks={before:(name:string,fn:Function)=>registry.set('before:'+name,fn),on:(name:string,fn:Function)=>registry.set('on:'+name,fn),replace:(name:string,fn:Function)=>registry.set('replace:'+name,fn)};
 destroy=vi.fn();
}}));
import { createEngine } from '../src/index';
afterEach(()=>{vi.unstubAllGlobals();registry.clear();document.body.replaceChildren();});
function setup(){document.body.innerHTML='<main data-env-page>old</main>';vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()}));}
it('validates before teardown and resumes native runtime before mounting the new widgets',async()=>{
 setup();const calls:string[]=[];
 const engine=await createEngine({pages:['/'],modules:[{name:'test',mount({root}){calls.push('mount:'+root.textContent);return()=>calls.push('cleanup');}}],adapter:{prepare:()=>{calls.push('prepare');},leave:()=>{calls.push('leave');},enter:()=>{calls.push('enter');}}});
 const visit={to:{document, url:'/'},ignore:vi.fn()};await registry.get('replace:content:replace')!(visit,{},()=>{document.querySelector('main')!.textContent='new';});
 expect(calls).toEqual(['mount:old','prepare','cleanup','leave','enter','mount:new']);engine.destroy();
});
it('keeps existing widgets alive and propagates failures from the replacement handler',async()=>{
 setup();const cleanup=vi.fn(),leave=vi.fn(),replace=vi.fn();vi.spyOn(console,'info').mockImplementation(()=>{});
 const engine=await createEngine({pages:['/'],modules:[{name:'test',mount:()=>cleanup}],adapter:{prepare:()=>{throw Error('changed export');},leave,enter:vi.fn()}});
 await expect(registry.get('replace:content:replace')!({to:{document,url:'/'}},{},replace)).rejects.toThrow('changed export');
 expect(replace).not.toHaveBeenCalled();expect(cleanup).not.toHaveBeenCalled();expect(leave).not.toHaveBeenCalled();engine.destroy();vi.restoreAllMocks();
});

it('does not resurrect widgets when destroyed during async validation',async()=>{
 setup();let resume!:()=>void;const pending=new Promise<void>(resolve=>resume=resolve),leave=vi.fn(),enter=vi.fn(),replace=vi.fn(),mount=vi.fn(()=>()=>{});
 const engine=await createEngine({pages:['/'],modules:[{name:'test',mount}],adapter:{prepare:()=>pending,leave,enter}});
 const visit=registry.get('replace:content:replace')!({to:{document,url:'/'}},{},replace);engine.destroy();resume();await visit;
 expect(mount).toHaveBeenCalledOnce();expect(leave).not.toHaveBeenCalled();expect(replace).not.toHaveBeenCalled();expect(enter).not.toHaveBeenCalled();
});
