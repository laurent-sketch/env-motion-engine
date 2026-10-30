import { afterEach, expect, it, vi } from 'vitest';
import { installOrganicBlob } from '../src/sd/organic-blob.js';
afterEach(()=>{window.ENVOrganicBlob?.destroy();document.body.innerHTML='';vi.restoreAllMocks();vi.unstubAllGlobals();});
function setup(){
 document.body.innerHTML='<div id="env-sd-page"><section data-env-blob="orange"></section></div><div data-env-transition-snapshot><section data-env-blob="orange"></section></div>';
 vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener(){}}));
 const disconnect=vi.fn();
 vi.stubGlobal('ResizeObserver',class{observe(){}disconnect=disconnect;});
 vi.stubGlobal('IntersectionObserver',class{observe(){}disconnect=disconnect;});
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({} as any);
 return {disconnect};
}
it('mounts once on the real page and leaves transition snapshots untouched',()=>{
 setup();installOrganicBlob();installOrganicBlob();
 expect(document.querySelectorAll('#env-sd-page canvas')).toHaveLength(1);
 expect(document.querySelector('[data-env-transition-snapshot] canvas')).toBeNull();
 window.ENVOrganicBlob.destroy();expect(document.querySelector('canvas')).toBeNull();
});
it('reinstalls on the destination and releases the previous canvas and observers',()=>{
 const {disconnect}=setup();installOrganicBlob();const old=document.querySelector('#env-sd-page section')!;
 document.querySelector('#env-sd-page')!.innerHTML='<section data-env-blob="orange"></section>';
 installOrganicBlob();
 expect(old.querySelector('canvas')).toBeNull();
 expect(document.querySelectorAll('#env-sd-page canvas')).toHaveLength(1);
 expect(disconnect).toHaveBeenCalledTimes(2);
});
