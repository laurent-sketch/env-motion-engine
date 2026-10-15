import { it,expect,vi } from 'vitest';
import { PageScope } from '../src/lifecycle';
it('aborts listeners and cleans resources exactly once in reverse order',()=>{
 const root=document.createElement('main'), calls:string[]=[],event=vi.fn();
 const scope=new PageScope(root,[{name:'a',mount({signal,cleanup}){root.addEventListener('click',event,{signal});cleanup(()=>calls.push('a'));}},{name:'b',mount:()=>()=>calls.push('b')}],false);
 root.click();scope.destroy();scope.destroy();root.click();expect(event).toHaveBeenCalledTimes(1);expect(calls).toEqual(['b','a']);
});
it('cleans partial initialization after failure',()=>{
 const dispose=vi.fn();expect(()=>new PageScope(document.createElement('main'),[{name:'broken',mount({cleanup}){cleanup(dispose);throw Error('failed');}}],false)).toThrow('failed');expect(dispose).toHaveBeenCalledOnce();
});
