import React, { useEffect, useRef } from "react";

const vertex = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,0.,1.); }`;
const fragment = `precision highp float;
varying vec2 vUv; uniform float uTime; uniform float uAspect; uniform vec2 uPointer;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 p=vUv; p.x*=uAspect;
  vec2 d=p-vec2(uAspect*.73,.51)-uPointer*.025; float r=length(d);
  vec3 color=vec3(.31,.12,.69)*exp(-r*r*5.)*.24;
  float angle=atan(d.y,d.x);
  float ribbon=abs(r-(.34+.017*sin(angle*3.+uTime*.22)));
  color+=vec3(.48,.25,.86)*exp(-ribbon*105.)*.2;
  float arc=pow(max(0.,cos(angle-uTime*.18)),18.);
  color+=vec3(.64,.46,1.)*exp(-ribbon*150.)*arc*.6;
  for(int i=0;i<3;i++){
    float layer=float(i); vec2 field=p*(13.+layer*7.);
    field+=vec2(uTime*(.025+layer*.015),uTime*(.07+layer*.03))+uPointer*.12;
    vec2 cell=floor(field); vec2 local=fract(field)-.5;
    float seed=hash(cell+layer); vec2 offset=vec2(seed-.5,hash(cell+4.)-.5)*.65;
    float point=exp(-length(local-offset)*95.);
    float pulse=.55+.45*sin(uTime*.6+seed*23.);
    color+=mix(vec3(.49,.29,.83),vec3(.63,.86,1.),seed)*point*pulse*step(.77,seed)*(.6+layer*.2);
  }
  float vignette=smoothstep(0.,.4,vUv.x)*(1.-smoothstep(.8,1.,abs(vUv.y-.5)*2.));
  gl_FragColor=vec4(color*vignette,1.);
}`;

export default function SeoSearchLight({ active, reduced, x, y }) {
  const host = useRef(null);
  const engine = useRef(null);
  const state = useRef({ active, reduced });
  state.current = { active, reduced };
  useEffect(() => { engine.current?.sync(); }, [active, reduced]);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    // The CSS composition remains available when WebGL cannot be created.
    import("ogl").then(({ Renderer, Triangle, Program, Mesh }) => {
      if (disposed) return;
      let renderer, geometry, program, observer, raf = 0;
      const container = host.current;
      try {
        const mobile = matchMedia("(max-width: 820px)").matches;
        renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(devicePixelRatio, mobile ? 1 : 1.25), powerPreference: "low-power" });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 1);
        container.appendChild(gl.canvas);
        geometry = new Triangle(gl);
        program = new Program(gl, { vertex, fragment, depthTest: false, depthWrite: false, uniforms: {
          uTime: { value: 0 }, uAspect: { value: 1 }, uPointer: { value: [0, 0] },
        } });
        const mesh = new Mesh(gl, { geometry, program });
        let last = 0, time = 0;
        const render = () => {
          program.uniforms.uTime.value = time;
          program.uniforms.uPointer.value = [x.get() / 24, y.get() / 20];
          renderer.render({ scene: mesh });
        };
        const tick = (now) => {
          raf = 0;
          if (!state.current.active || state.current.reduced) return;
          if (now - last >= (mobile ? 1000 / 24 : 1000 / 30)) {
            time += Math.min((now - last) / 1000, .07); last = now; render();
          }
          raf = requestAnimationFrame(tick);
        };
        const sync = () => {
          cancelAnimationFrame(raf); raf = 0; last = performance.now();
          if (state.current.active) { render(); if (!state.current.reduced) raf = requestAnimationFrame(tick); }
        };
        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height); program.uniforms.uAspect.value = width / height; render();
        };
        const lost = (event) => { event.preventDefault(); cancelAnimationFrame(raf); engine.current = null; gl.canvas.style.display = "none"; };
        gl.canvas.addEventListener("webglcontextlost", lost);
        observer = new ResizeObserver(resize); observer.observe(container);
        engine.current = { sync }; resize(); sync();
        cleanup = () => {
          engine.current = null; cancelAnimationFrame(raf); observer.disconnect();
          gl.canvas.removeEventListener("webglcontextlost", lost);
          geometry.remove(); gl.deleteProgram(program.program);
          gl.getExtension("WEBGL_lose_context")?.loseContext(); gl.canvas.remove();
        };
      } catch {
        cancelAnimationFrame(raf); observer?.disconnect(); geometry?.remove();
        if (program) renderer.gl.deleteProgram(program.program);
        renderer?.gl.canvas.remove(); engine.current = null;
      }
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, [x, y]);
  return <div className="s2b-search-light" ref={host} />;
}
