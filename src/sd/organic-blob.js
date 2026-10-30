// Page-owned canvas atmosphere. Reinstalled after each Swup visit.
export function installOrganicBlob() {
  window.ENVOrganicBlob?.destroy();
  const controller = new AbortController();
  const signal = controller.signal;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const cleanups = [];
  document.querySelectorAll('#env-sd-page [data-env-blob="orange"]').forEach(section => {
    if (section.closest('[data-env-transition-snapshot]')) return;
    const layer = document.createElement('div');
    layer.className = 'env-blob-background'; layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;border-radius:inherit';
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;filter:blur(32px)';
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    layer.append(canvas); section.prepend(layer);
    let w=1,h=1,frame=0,last=0,time=0,visible=false,inside=false;
    let px=0,py=0,x=0,y=0,tx=0,ty=0;
    function draw() {
      ctx.clearRect(0,0,w,h);
      const t=reduced.matches?0:time;
      const rx=Math.min(w*.38,500)*2.1*1.35, ry=Math.min(h*.49,350)*2.1*.78;
      const cx=w*.23+x+Math.sin(t*.29)*w*.13, cy=h*.98+y+Math.cos(t*.23)*h*.075;
      const points=[];
      for(let i=0;i<10;i++) { const a=i/10*Math.PI*2; const wave=1+.55*(.20*Math.sin(a*3+t*.33)+.13*Math.cos(a*2-t*.25)+.07*Math.sin(a*5+t*.17)); points.push({x:cx+Math.cos(a)*rx*wave,y:cy+Math.sin(a)*ry*wave}); }
      ctx.beginPath();
      points.forEach((p,i)=>{const prev=points[(i+9)%10],next=points[(i+1)%10];if(!i)ctx.moveTo((prev.x+p.x)/2,(prev.y+p.y)/2);ctx.quadraticCurveTo(p.x,p.y,(p.x+next.x)/2,(p.y+next.y)/2);});
      ctx.closePath(); ctx.save(); ctx.translate(cx,cy); ctx.scale(rx/ry,1);
      const gradient=ctx.createRadialGradient(-ry*.12,-ry*.20,0,0,0,ry*.94);
      [[0,.5],[.28,.36],[.60,.15],[.82,.035],[1,0]].forEach(([stop,alpha])=>gradient.addColorStop(stop,`rgba(238,69,43,${alpha})`));
      ctx.fillStyle=gradient;ctx.fill();ctx.restore();
    }
    function target() {
      if(!inside||reduced.matches||!fine.matches){tx=ty=0;return;}
      const r=section.getBoundingClientRect();
      tx=((px-r.left)/w-.5)*Math.min(w*.65,760)*.7;
      ty=((py-r.top)/h-.5)*Math.min(h*.28,180)*.7;
    }
    function tick(now) {
      frame=0;if(!visible||document.hidden)return;
      const dt=Math.min((now-(last||now))/1000,.05);last=now;
      if(!reduced.matches)time+=dt;
      const ease=1-Math.exp(-dt*4.5);x+=(tx-x)*ease;y+=(ty-y)*ease;draw();
      if(!reduced.matches)frame=requestAnimationFrame(tick);
    }
    function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
    function wake(){if(!frame&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
    function reset(){inside=false;target();}
    const resize=new ResizeObserver(()=>{const r=section.getBoundingClientRect();w=Math.max(r.width,1);h=Math.max(r.height,1);const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);target();draw();});
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else stop();});
    resize.observe(section);intersection.observe(section);
    section.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;inside=true;px=e.clientX;py=e.clientY;target();},{passive:true,signal});
    section.addEventListener('pointerleave',reset,{signal});
    window.addEventListener('scroll',target,{passive:true,signal});window.addEventListener('blur',reset,{signal});
    document.addEventListener('visibilitychange',()=>document.hidden?stop():wake(),{signal});
    reduced.addEventListener('change',()=>{x=y=tx=ty=0;draw();wake();},{signal});fine.addEventListener('change',reset,{signal});
    cleanups.push(()=>{stop();resize.disconnect();intersection.disconnect();layer.remove();});
  });
  window.ENVOrganicBlob={destroy(){controller.abort();cleanups.forEach(fn=>fn());if(window.ENVOrganicBlob===this)delete window.ENVOrganicBlob;}};
}
