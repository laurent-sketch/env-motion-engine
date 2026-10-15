import { afterEach, expect, it, vi } from 'vitest';
import { waitForDeferredScripts } from '../src/pilot/ready';
afterEach(()=>vi.restoreAllMocks());
it('waits during interactive until deferred scripts have finished',async()=>{
 vi.spyOn(document,'readyState','get').mockReturnValue('interactive');
 const done=vi.fn();const ready=waitForDeferredScripts().then(done);
 await Promise.resolve();expect(done).not.toHaveBeenCalled();document.dispatchEvent(new Event('DOMContentLoaded'));await ready;expect(done).toHaveBeenCalledOnce();
});
it('resolves via load if DOMContentLoaded was already dispatched',async()=>{
 vi.spyOn(document,'readyState','get').mockReturnValue('interactive');document.dispatchEvent(new Event('DOMContentLoaded'));
 const done=vi.fn();const ready=waitForDeferredScripts().then(done);await Promise.resolve();expect(done).not.toHaveBeenCalled();window.dispatchEvent(new Event('load'));await ready;document.dispatchEvent(new Event('DOMContentLoaded'));expect(done).toHaveBeenCalledOnce();
});
it('does not wait when the document is complete',async()=>{
 vi.spyOn(document,'readyState','get').mockReturnValue('complete');await expect(waitForDeferredScripts()).resolves.toBeUndefined();
});
