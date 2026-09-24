import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Sphere, Plane, Triangle } from "ogl";

/* ==================================================================
   El fondo de la app web inteligente: un sistema solar en la placa de video.

   Todo es WebGL con OGL, una libreria chica (unos 10 kB) que da camara,
   escena y geometrias sin el peso de three.js. Cuatro piezas:

   - NEBULOSA: un shader de ruido a pantalla completa, en los violetas de la
     marca, con un sol lejano arriba a la izquierda que es de donde viene la
     luz de todo lo demas.
   - ESTRELLAS: un par de miles de puntos repartidos en profundidad. Cada una
     titila a su ritmo, y como estan a distintas distancias, cuando la camara
     se mueve con el puntero las cercanas se desplazan mas que las lejanas:
     eso es lo que da la sensacion de espacio de verdad.
   - EL PLANETA: una esfera con superficie de bandas y tormentas hecha con
     ruido, iluminada de costado -se ve el terminador, la linea de la noche-,
     con una atmosfera que brilla en el borde, un anillo y tres lunas en
     orbita que pasan por delante y por detras.
   - ESTRELLAS FUGACES: en un canvas 2D encima, cada tantos segundos.

   Se frena cuando la seccion sale de pantalla o la pestana queda de fondo.
   Con movimiento reducido se pinta un solo cuadro quieto. Sin WebGL queda el
   fondo oscuro de siempre.
   ================================================================== */

const RUIDO = /* glsl */ `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * snoise(p); p *= 2.03; a *= 0.5; }
  return v;
}
`;

/* ---------- la nebulosa, a pantalla completa ---------- */
const NEB_V = /* glsl */ `
attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;
const NEB_F = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
varying vec2 vUv;
${RUIDO}
void main() {
  float asp = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(vUv.x * asp, vUv.y) + uMouse * 0.03;
  float t = uTime * 0.02;
  float n = fbm(p * 1.3 + vec2(t, -t * 0.6));
  float n2 = fbm(p * 2.4 - vec2(t * 0.7, t) + n);
  float nube = smoothstep(-0.2, 0.9, n * 0.6 + n2 * 0.5);
  vec3 col = mix(vec3(0.16, 0.08, 0.42), vec3(0.45, 0.30, 0.95), nube);
  col = mix(col, vec3(0.25, 0.55, 0.95), smoothstep(0.35, 0.95, n2) * 0.45);
  float a = nube * 0.62;
  // el sol lejano, de donde viene la luz
  vec2 sol = vec2(0.1 * asp, 0.92);
  float d = distance(p, sol);
  col += vec3(1.0, 0.92, 0.85) * (0.018 / (d + 0.02)) * 0.5;
  a += 0.4 / (1.0 + d * 18.0);
  // se funde arriba y abajo con la pagina
  float vi = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
  gl_FragColor = vec4(col, clamp(a * vi, 0.0, 1.0));
}
`;

/* ---------- las estrellas ---------- */
const EST_V = /* glsl */ `
attribute vec3 position; attribute vec4 random;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
uniform float uTime; uniform float uDpr;
varying float vBrillo; varying vec3 vColor;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float titila = 0.55 + 0.45 * sin(uTime * (0.8 + random.x * 2.6) + random.y * 6.283);
  vBrillo = titila * (0.35 + random.z * 0.65);
  // unas pocas azuladas y otras calidas, como las de verdad
  vColor = mix(vec3(0.78, 0.84, 1.0), vec3(1.0, 0.86, 0.74), step(0.82, random.w));
  vColor = mix(vColor, vec3(0.72, 0.62, 1.0), step(random.w, 0.18));
  gl_PointSize = clamp((1.3 + random.z * 3.2) * uDpr * (26.0 / -mv.z), 1.0, 9.0 * uDpr);
}
`;
const EST_F = /* glsl */ `
precision highp float;
varying float vBrillo; varying vec3 vColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float nucleo = smoothstep(0.5, 0.0, d);
  float cruz = max(0.0, 1.0 - abs(c.x) * 14.0) * max(0.0, 1.0 - abs(c.y) * 2.2)
             + max(0.0, 1.0 - abs(c.y) * 14.0) * max(0.0, 1.0 - abs(c.x) * 2.2);
  float a = (nucleo * nucleo + cruz * 0.35) * vBrillo;
  gl_FragColor = vec4(vColor, a);
}
`;

/* ---------- los cuerpos: planeta y lunas ---------- */
const CUERPO_V = /* glsl */ `
attribute vec3 position; attribute vec3 normal;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform mat3 normalMatrix;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
void main() {
  vN = normalize(normalMatrix * normal);
  vP = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;
const PLANETA_F = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec3 uLuz;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
${RUIDO}
void main() {
  vec3 n = normalize(vN);
  // bandas de gas que corren con la rotacion, y tormentas encima
  float lon = atan(vP.z, vP.x) + uTime * 0.05;
  float lat = vP.y;
  float turb = fbm(vec2(lon * 1.1, lat * 3.2) + vec2(uTime * 0.01, 0.0));
  float bandas = sin(lat * 9.0 + turb * 2.1) * 0.5 + 0.5;
  float tormenta = smoothstep(0.55, 0.9, fbm(vec2(lon * 3.0, lat * 9.0) - uTime * 0.02));
  vec3 a = vec3(0.20, 0.12, 0.52);
  vec3 b = vec3(0.58, 0.46, 0.98);
  vec3 c = vec3(0.62, 0.86, 1.00);
  vec3 sup = mix(a, b, bandas);
  sup = mix(sup, c, tormenta * 0.55);
  sup = mix(sup, vec3(0.95, 0.9, 1.0), smoothstep(0.82, 1.0, bandas) * 0.25);
  // luz de costado: la linea de la noche es suave, como en una foto
  float dif = dot(n, normalize(uLuz));
  float luz = smoothstep(-0.18, 0.55, dif);
  vec3 col = sup * (0.06 + luz * 1.15);
  // brillo del sol sobre la superficie
  vec3 h = normalize(normalize(uLuz) + vV);
  col += vec3(0.9, 0.85, 1.0) * pow(max(dot(n, h), 0.0), 40.0) * 0.25 * luz;
  // la atmosfera se nota en el borde iluminado
  float borde = pow(1.0 - max(dot(n, vV), 0.0), 3.0);
  col += vec3(0.55, 0.62, 1.0) * borde * (0.25 + luz * 0.9);
  gl_FragColor = vec4(col, 1.0);
}
`;
const HALO_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
void main() {
  vec3 n = normalize(vN);
  float f = pow(max(0.0, 1.0 - abs(dot(n, vV))), 2.2);
  float lado = smoothstep(-0.6, 0.8, dot(n, normalize(uLuz)));
  vec3 col = mix(vec3(0.42, 0.30, 1.0), vec3(0.6, 0.85, 1.0), lado);
  gl_FragColor = vec4(col, f * (0.25 + lado * 0.75) * 0.9);
}
`;
const LUNA_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz; uniform vec3 uColor;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
${RUIDO}
void main() {
  vec3 n = normalize(vN);
  float crater = fbm(vP.xy * 6.0 + vP.z * 3.0) * 0.5 + 0.5;
  vec3 sup = uColor * (0.7 + crater * 0.5);
  float luz = smoothstep(-0.1, 0.7, dot(n, normalize(uLuz)));
  float borde = pow(1.0 - max(dot(n, vV), 0.0), 3.0);
  gl_FragColor = vec4(sup * (0.05 + luz * 1.1) + uColor * borde * 0.3 * luz, 1.0);
}
`;

/* ---------- el anillo ---------- */
const ANILLO_V = /* glsl */ `
attribute vec3 position; attribute vec2 uv;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const ANILLO_F = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  if (r < 0.56 || r > 0.98) discard;
  float bandas = 0.55 + 0.45 * sin(r * 120.0) * sin(r * 37.0 + 1.3);
  float borde = smoothstep(0.56, 0.62, r) * smoothstep(0.98, 0.9, r);
  float hueco = 1.0 - smoothstep(0.74, 0.76, r) * (1.0 - smoothstep(0.78, 0.8, r)) * 0.85;
  vec3 col = mix(vec3(0.62, 0.55, 1.0), vec3(0.85, 0.92, 1.0), r);
  gl_FragColor = vec4(col, borde * bandas * hueco * 0.55);
}
`;

export default function FondoIA() {
  const host = useRef(null);
  const glHost = useRef(null);
  const lienzo = useRef(null);

  useEffect(() => {
    const box = host.current;
    const cv = lienzo.current;
    if (!box || !cv) return;
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const chico = window.innerWidth < 700;

    let renderer, gl, camera, scene, nebulosa, estrellas, planeta, halo, anillo, sistema;
    const lunas = [];
    const LUZ = [-0.92, 0.38, 0.12];
    try {
      renderer = new Renderer({ alpha: true, dpr, antialias: true, premultipliedAlpha: false });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      glHost.current.appendChild(gl.canvas);

      camera = new Camera(gl, { fov: 35, near: 0.1, far: 100 });
      camera.position.set(0, 0, 12);
      scene = new Transform();

      /* la nebulosa va primero y sin profundidad: es el cielo */
      nebulosa = new Mesh(gl, {
        geometry: new Triangle(gl),
        program: new Program(gl, {
          vertex: NEB_V, fragment: NEB_F, transparent: true, depthTest: false, depthWrite: false,
          uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0, 0] } },
        }),
      });
      nebulosa.frustumCulled = false;

      /* las estrellas, en una cascara gruesa alrededor de la camara */
      const N = chico ? 1100 : 2600;
      const pos = new Float32Array(N * 3), rnd = new Float32Array(N * 4);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 34;
        pos[i * 3 + 2] = -Math.random() * 40 + 4;
        for (let k = 0; k < 4; k++) rnd[i * 4 + k] = Math.random();
      }
      const progEst = new Program(gl, {
        vertex: EST_V, fragment: EST_F, transparent: true, depthTest: false, depthWrite: false,
        uniforms: { uTime: { value: 0 }, uDpr: { value: dpr } },
      });
      progEst.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      estrellas = new Mesh(gl, {
        mode: gl.POINTS,
        geometry: new Geometry(gl, { position: { size: 3, data: pos }, random: { size: 4, data: rnd } }),
        program: progEst,
      });
      estrellas.setParent(scene);

      /* el sistema: planeta, halo, anillo y lunas, inclinado como en una foto */
      sistema = new Transform();
      sistema.setParent(scene);

      planeta = new Mesh(gl, {
        geometry: new Sphere(gl, { radius: 1, widthSegments: 96, heightSegments: 64 }),
        program: new Program(gl, {
          vertex: CUERPO_V, fragment: PLANETA_F,
          uniforms: { uTime: { value: 0 }, uLuz: { value: LUZ } },
        }),
      });
      planeta.setParent(sistema);

      const progHalo = new Program(gl, {
        vertex: CUERPO_V, fragment: HALO_F, transparent: true, depthWrite: false, cullFace: gl.FRONT,
        uniforms: { uLuz: { value: LUZ } },
      });
      progHalo.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      halo = new Mesh(gl, { geometry: new Sphere(gl, { radius: 1.22, widthSegments: 64, heightSegments: 40 }), program: progHalo });
      halo.setParent(sistema);

      const progAnillo = new Program(gl, {
        vertex: ANILLO_V, fragment: ANILLO_F, transparent: true, depthWrite: false, cullFace: null,
      });
      progAnillo.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      anillo = new Mesh(gl, { geometry: new Plane(gl, { width: 4.4, height: 4.4 }), program: progAnillo });
      anillo.rotation.x = -Math.PI / 2;
      anillo.setParent(sistema);

      const geoLuna = new Sphere(gl, { radius: 1, widthSegments: 32, heightSegments: 24 });
      [
        { r: 0.13, orbita: 1.75, vel: 0.32, fase: 0.4, incl: 0.18, color: [0.85, 0.82, 0.95] },
        { r: 0.085, orbita: 2.25, vel: 0.2, fase: 2.4, incl: -0.12, color: [0.7, 0.85, 1.0] },
        { r: 0.06, orbita: 2.7, vel: 0.14, fase: 4.6, incl: 0.3, color: [0.95, 0.85, 0.8] },
      ].forEach((l) => {
        const m = new Mesh(gl, {
          geometry: geoLuna,
          program: new Program(gl, { vertex: CUERPO_V, fragment: LUNA_F, uniforms: { uLuz: { value: LUZ }, uColor: { value: l.color } } }),
        });
        m.scale.set(l.r);
        m.setParent(sistema);
        lunas.push({ ...l, m });
      });

      sistema.rotation.z = 0.32;
      sistema.rotation.x = 0.22;
    } catch {
      renderer = null;
    }

    /* ---------- estrellas fugaces (2D) ---------- */
    const ctx = cv.getContext("2d");
    let w = 1, h = 1;
    let fugaces = [];
    let proxFugaz = 1.5;

    const puntero = { x: 0, y: 0, sx: 0, sy: 0 };

    const medir = () => {
      const r = box.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!renderer) return;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
      nebulosa.program.uniforms.uRes.value = [w, h];
      /* el planeta se acomoda al lienzo: a la derecha en la compu, asomando
         arriba en el celular, donde no tapa el titular */
      /* medio alto y medio ancho visibles a la profundidad del planeta */
      const z = -4;
      const altoVis = Math.tan((35 * Math.PI) / 360) * (12 - z);
      const anchoVis = altoVis * (w / h);
      if (w / h < 0.9) {
        sistema.position.set(anchoVis * 0.7, altoVis * 0.88, z);
        sistema.scale.set(altoVis * 0.13);
      } else {
        /* arriba a la derecha, asomando por encima de la caja del precio */
        sistema.position.set(anchoVis * 0.74, altoVis * 0.6, z);
        sistema.scale.set(altoVis * 0.27);
      }
    };

    const fugaz = () => {
      const deIzq = Math.random() < 0.5;
      fugaces.push({
        x: deIzq ? Math.random() * w * 0.6 : w * (0.4 + Math.random() * 0.6),
        y: Math.random() * h * 0.45,
        vx: (deIzq ? 1 : -1) * (520 + Math.random() * 380), vy: 180 + Math.random() * 160,
        vida: 0, dura: 0.9 + Math.random() * 0.6, largo: 110 + Math.random() * 120,
      });
    };

    const pintarFugaces = (dt) => {
      ctx.clearRect(0, 0, w, h);
      proxFugaz -= dt;
      if (proxFugaz <= 0) { fugaz(); proxFugaz = 2.4 + Math.random() * 4; }
      fugaces = fugaces.filter((f) => {
        f.vida += dt; f.x += f.vx * dt; f.y += f.vy * dt;
        const k = f.vida / f.dura;
        if (k >= 1) return false;
        const alfa = Math.sin(Math.PI * k);
        const v = Math.hypot(f.vx, f.vy);
        const tx = f.x - (f.vx / v) * f.largo, ty = f.y - (f.vy / v) * f.largo;
        const g = ctx.createLinearGradient(f.x, f.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${alfa})`);
        g.addColorStop(0.2, `rgba(190,210,255,${alfa * 0.55})`);
        g.addColorStop(1, "rgba(140,110,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${alfa})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, 1.6, 0, Math.PI * 2); ctx.fill();
        return true;
      });
    };

    /* ---------- el reloj ---------- */
    let raf = 0, previo = 0, reloj = 0, visible = true, vivo = true;
    const cuadro = (ahora) => {
      if (!vivo) return;
      raf = 0;
      const dt = Math.min(0.05, previo ? (ahora - previo) / 1000 : 0.016);
      previo = ahora;
      reloj += dt;

      if (renderer) {
        /* la camara sigue al puntero despacio: las estrellas cercanas se mueven
           mas que las lejanas y el planeta gira un poco en perspectiva */
        puntero.sx += (puntero.x - puntero.sx) * Math.min(1, dt * 2);
        puntero.sy += (puntero.y - puntero.sy) * Math.min(1, dt * 2);
        camera.position.x = puntero.sx * 0.9;
        camera.position.y = puntero.sy * 0.55;
        camera.lookAt([0, 0, -4]);

        estrellas.program.uniforms.uTime.value = reloj;
        estrellas.rotation.z = reloj * 0.004;
        planeta.program.uniforms.uTime.value = reloj;
        planeta.rotation.y = reloj * 0.06;
        anillo.rotation.z = reloj * 0.02;
        lunas.forEach((l) => {
          const a = l.fase + reloj * l.vel;
          l.m.position.set(Math.cos(a) * l.orbita, Math.sin(a) * l.orbita * l.incl, Math.sin(a) * l.orbita);
          l.m.rotation.y = reloj * 0.3;
        });
        nebulosa.program.uniforms.uTime.value = reloj;
        nebulosa.program.uniforms.uMouse.value = [puntero.sx, puntero.sy];

        renderer.autoClear = true;
        renderer.render({ scene: nebulosa });
        renderer.autoClear = false;
        renderer.render({ scene, camera, clear: false });
      }
      pintarFugaces(quieto ? 0 : dt);
      if (!quieto && visible && !document.hidden) raf = requestAnimationFrame(cuadro);
    };
    const arrancar = () => { if (!raf && vivo) { previo = 0; raf = requestAnimationFrame(cuadro); } };

    medir();
    if (quieto) { reloj = 20; cuadro(performance.now()); } else arrancar();

    const zona = box.parentElement || box;
    const mover = (e) => {
      const r = box.getBoundingClientRect();
      puntero.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      puntero.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const salir = () => { puntero.x = 0; puntero.y = 0; };
    zona.addEventListener("pointermove", mover, { passive: true });
    zona.addEventListener("pointerleave", salir);

    const ro = new ResizeObserver(() => { medir(); if (quieto) cuadro(performance.now()); });
    ro.observe(box);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !quieto) arrancar(); });
    io.observe(box);
    const pestana = () => { if (!document.hidden && !quieto) arrancar(); };
    document.addEventListener("visibilitychange", pestana);

    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", pestana);
      zona.removeEventListener("pointermove", mover);
      zona.removeEventListener("pointerleave", salir);
      if (renderer) {
        gl.canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  return (
    <div className="s2b-iah-fondo" ref={host} aria-hidden="true">
      <div className="s2b-iah-aurora" ref={glHost} />
      <canvas className="s2b-iah-red" ref={lienzo} />
    </div>
  );
}
