/* ENV hero shape — standalone, no dependencies. */
(() => {
  if (window.ENVHeroShape) { window.ENVHeroShape.refresh(); return; }
  if (!document.querySelector('style[data-env-hero-shape-style]')) {
    const style=document.createElement('style');style.dataset.envHeroShapeStyle='';
    style.textContent='[data-env-hero-shape]{position:relative;isolation:isolate;overflow:hidden;background-color:#103e30}\n[data-env-hero-shape]>.env-hero-shape-canvas{position:absolute;inset:0;z-index:-1;display:block;width:100%;height:100%;pointer-events:none;background-size:cover;background-position:center}';document.head.append(style);
  }
  const instances = new Map();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const vertex = `attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment = `precision mediump float;
    varying vec2 uv;uniform vec2 resolution,pointer,pointerB,pointerC;
    uniform float time,motion,hover;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
    float cloud(vec2 p){return noise(p)*.57+noise(p*2.03+7.1)*.28+noise(p*4.01+17.7)*.15;}
    mat2 rotate(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
    float ellipse(vec2 p,vec2 center,vec2 size,float angle){return (length(rotate(angle)*(p-center)/size)-1.)*min(size.x,size.y);}
    float unite(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
    void main(){
      float aspect=resolution.x/resolution.y;
      vec2 p=(uv-.5)*vec2(aspect,1.);
      float t=time*.38*motion;
      // Each volume has an independent pointer response; scale remains unchanged.
      vec2 moveA=pointer*vec2(aspect,1.)*.095*hover;
      vec2 moveB=pointerB*vec2(aspect,1.)*.055*hover;
      vec2 moveC=pointerC*vec2(aspect,1.)*.13*hover;
      vec2 drift=vec2(sin(t*.8),cos(t*.65))*.065;
      vec2 q=p+vec2(cloud(p*2.8+vec2(t*.32,-t*.21)),cloud(p*2.8+vec2(-t*.25,t*.3)+8.))*.15-.075;
      float a=ellipse(q,vec2(-.16,.17)+drift+moveA,vec2(.39+.07*sin(t*.9),.22+.035*cos(t*1.1)),-.55+.20*sin(t*.6));
      float b=ellipse(q,vec2(-.44,-.40)+vec2(cos(t*.7),sin(t*.85))*.09+moveB,vec2(.46,.22),-.44-.18*sin(t*.8));
      float c=ellipse(q,vec2(.57,-.43)+vec2(sin(t*.6),cos(t*.8))*.09+moveC,vec2(.45,.19),-.25+.20*cos(t*.65));
      float d=unite(unite(a,b,.27),c,.23);
      d+=(cloud(q*7.+vec2(t*.4,-t*.2))-.5)*.038;
      vec3 forest=mix(vec3(.033,.19,.135),vec3(.065,.25,.19),uv.y*.65+noise(p*2.)*.2);
      vec3 blue=mix(vec3(.07,.32,.76),vec3(.22,.43,.98),cloud(q*3.-t*.12));
      vec3 coral=vec3(.94,.44,.29);
      vec3 cream=vec3(1.,.91,.66);
      vec3 color=mix(forest,blue,1.-smoothstep(.015,.14,d));
      color=mix(color,coral,1.-smoothstep(-.07,.012,d));
      color=mix(color,cream,(1.-smoothstep(-.17,-.09,d))*.95);
      float grain=hash(gl_FragCoord.xy)-.5;
      color+=grain*.043;
      gl_FragColor=vec4(color,1.);
    }`;

  function mount(root) {
    const url=root.getAttribute('data-env-hero-shape');
    if (instances.has(root)) return;
    const canvas=document.createElement('canvas');
    canvas.className='env-hero-shape-canvas';canvas.setAttribute('aria-hidden','true');

    root.prepend(canvas);
    const gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
    const abort=new AbortController();
    let frame=0,alive=true,visible=false,ready=false,last=0,clock=0;
    let width=1,height=1,px=0,py=0,tx=0,ty=0,vx=0,vy=0,bx=0,by=0,cx=0,cy=0,hover=0,targetHover=0;
    let resize,intersection,texture,program,buffer;

    function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
    function destroy(){
      alive=false;stop();abort.abort();resize?.disconnect();intersection?.disconnect();
      reduced.removeEventListener('change',restart);fine.removeEventListener('change',restart);

      if(gl){if(texture)gl.deleteTexture(texture);if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);}
      canvas.remove();instances.delete(root);
    }
    instances.set(root,{destroy});
    if(!gl)return;
    const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw Error('Shader compilation failed');}return s;};
    let uniforms;
    function draw(now){
      frame=0;if(!alive||!ready||!visible||document.hidden)return;
      const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;
      const amount=1-Math.exp(-dt*5);
      // Damped spring: soft acceleration, subtle settling, frame-rate independent.
      const steps=Math.max(1,Math.ceil(dt/(1/120))),step=dt/steps;
      for(let i=0;i<steps;i++){
        vx+=((tx-px)*48-vx*11)*step;vy+=((ty-py)*48-vy*11)*step;
        px+=vx*step;py+=vy*step;
      }
      const slow=1-Math.exp(-dt*2.6),slower=1-Math.exp(-dt*1.45);
      bx+=(tx-bx)*slow;by+=(ty-by)*slow;
      cx+=(tx-cx)*slower;cy+=(ty-cy)*slower;
      hover+=(targetHover-hover)*amount;
      if(!reduced.matches)clock+=dt;
      gl.uniform2f(uniforms.resolution,width,height);
      gl.uniform1f(uniforms.time,clock);
      gl.uniform1f(uniforms.motion,reduced.matches?0:1);
      gl.uniform1f(uniforms.hover,reduced.matches?0:hover);
      gl.uniform2f(uniforms.pointer,px,py);
      gl.uniform2f(uniforms.pointerB,bx,by);
      gl.uniform2f(uniforms.pointerC,cx,cy);
      gl.drawArrays(gl.TRIANGLES,0,6);
      if(!reduced.matches)frame=requestAnimationFrame(draw);
    }
    function restart(){stop();if(!fine.matches){tx=ty=targetHover=0;}if(ready&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
    function fit(){
      const rect=root.getBoundingClientRect();width=Math.max(1,rect.width);height=Math.max(1,rect.height);
      const ratio=Math.min(devicePixelRatio||1,fine.matches?1.5:1);
      canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      gl.viewport(0,0,canvas.width,canvas.height);restart();
    }
    try{
      const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
      program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
      gl.deleteShader(vs);gl.deleteShader(fs);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader link failed');
      gl.useProgram(program);
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
      uniforms=Object.fromEntries(['resolution','time','motion','hover','pointer','pointerB','pointerC'].map(k=>[k,gl.getUniformLocation(program,k)]));
      ready=true;
      resize=new ResizeObserver(fit);resize.observe(root);
      intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;restart();});intersection.observe(root);
      root.addEventListener('pointermove',e=>{
        if(!fine.matches||reduced.matches||e.pointerType==='touch')return;
        const r=root.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=1-(e.clientY-r.top)/r.height*2;targetHover=1;
      },{passive:true,signal:abort.signal});
      root.addEventListener('pointerleave',()=>{tx=ty=targetHover=0;},{signal:abort.signal});
      document.addEventListener('visibilitychange',restart,{signal:abort.signal});
      canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stop();ready=false;},{signal:abort.signal});
      canvas.addEventListener('webglcontextrestored',()=>{destroy();mount(root);},{signal:abort.signal});
      reduced.addEventListener('change',restart);fine.addEventListener('change',restart);
      fit();
    }catch(error){console.warn('[ENV Hero Shape]',error);stop();}
  }
  function refresh(){
    instances.forEach((instance,root)=>{if(!root.isConnected)instance.destroy();});
    document.querySelectorAll('[data-env-hero-shape]').forEach(mount);
  }
  let scheduled=false;
  const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;refresh();});});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.ENVHeroShape={refresh,destroy(){observer.disconnect();[...instances.values()].forEach(i=>i.destroy());delete window.ENVHeroShape;}};
  refresh();
})();
