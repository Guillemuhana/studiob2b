import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/* ==================================================================
   El fondo de la app web inteligente: dos capas.

   ABAJO, una aurora en la placa de video (OGL, WebGL). Es un shader de ruido
   que fluye despacio en los violetas de la marca y un celeste frio; el
   puntero la empuja un poco. Pintarla en la GPU es lo que la deja moverse
   sin comerse el procesador: el mismo efecto con degrades de CSS animados
   repinta la pantalla entera en cada cuadro.

   ARRIBA, una red de neuronas en un canvas 2D. Mas liviana que la del hero:
   aca no hay ideas que se arman, solo neuronas, axones fijos e impulsos que
   viajan. Cerca del puntero las neuronas disparan, que es lo que hace que la
   seccion se sienta viva cuando alguien la mira.

   Las dos capas se frenan cuando la seccion sale de pantalla o la pestana
   queda de fondo, y con movimiento reducido se pinta un solo cuadro quieto.
   Si el navegador no tiene WebGL, la aurora no aparece y queda la red.
   ================================================================== */

const VERT = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
varying vec2 vUv;

// ruido simplex 2D (Ashima Arts, dominio publico)
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

void main() {
  vec2 uv = vUv;
  float asp = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uTime * 0.06;

  // el puntero tuerce el flujo cerca suyo
  vec2 m = vec2(uMouse.x * asp, uMouse.y);
  float cerca = exp(-3.2 * distance(p, m));
  p += (p - m) * cerca * 0.12;

  float n1 = snoise(vec2(p.x * 0.9 + t, p.y * 1.6 - t * 0.7));
  float n2 = snoise(vec2(p.x * 1.7 - t * 1.3, p.y * 0.8 + t));
  float n3 = snoise(vec2(p.x * 0.5 + n1 * 0.4, p.y * 0.5 + t * 0.5));

  // tres cortinas de luz: violeta, lila y un celeste frio
  float c1 = smoothstep(0.05, 0.85, n1 * 0.5 + 0.5 - abs(uv.y - 0.62) * 0.9);
  float c2 = smoothstep(0.15, 0.95, n2 * 0.5 + 0.5 - abs(uv.y - 0.38) * 1.1);
  float c3 = smoothstep(0.35, 1.0, n3 * 0.5 + 0.5);

  vec3 violeta = vec3(0.427, 0.290, 1.0);
  vec3 lila    = vec3(0.655, 0.549, 1.0);
  vec3 celeste = vec3(0.24, 0.72, 1.0);

  vec3 col = violeta * c1 * 1.25 + lila * c2 * 0.8 + celeste * c3 * 0.55;
  col += lila * cerca * 0.35;

  // se apaga hacia los bordes para fundirse con la pagina
  float vi = smoothstep(0.0, 0.28, uv.y) * smoothstep(1.0, 0.7, uv.y);
  vi *= smoothstep(0.0, 0.16, uv.x) * smoothstep(1.0, 0.84, uv.x);
  float a = clamp(max(max(c1, c2 * 0.85), c3 * 0.7) * vi * 0.95, 0.0, 1.0);
  gl_FragColor = vec4(col * vi, a);
}
`;

/* la red de arriba */
const RED = { densidad: 16000, min: 18, max: 70, vecinos: 3, alcance: 190, puntero: 170, espontaneo: 1.6 };

export default function FondoIA() {
  const host = useRef(null);
  const glHost = useRef(null);
  const lienzo = useRef(null);

  useEffect(() => {
    const box = host.current;
    const cv = lienzo.current;
    if (!box || !cv) return;
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* ---------- la aurora (WebGL) ---------- */
    let renderer = null, program = null, mesh = null;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: Math.min(dpr, 1.5), antialias: false });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      glHost.current.appendChild(gl.canvas);
      program = new Program(gl, {
        vertex: VERT, fragment: FRAG, transparent: true,
        uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0.7, 0.55] } },
      });
      mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    } catch {
      renderer = null; // sin WebGL queda solo la red
    }

    /* ---------- la red (canvas 2D) ---------- */
    const ctx = cv.getContext("2d");
    let w = 0, h = 0;
    let nodos = [], axones = [], impulsos = [];
    const puntero = { x: -9999, y: -9999, sx: 0.7, sy: 0.55, activo: false };

    const tejer = () => {
      const n = Math.round(Math.min(RED.max, Math.max(RED.min, (w * h) / RED.densidad)));
      nodos = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
        r: 1.2 + Math.random() * 1.8, luz: 0, descanso: 0,
      }));
      axones = [];
      const visto = new Set();
      nodos.forEach((p, i) => {
        nodos
          .map((q, j) => ({ j, d: Math.hypot(q.x - p.x, q.y - p.y) }))
          .filter((o) => o.j !== i && o.d < RED.alcance)
          .sort((a, b) => a.d - b.d)
          .slice(0, RED.vecinos)
          .forEach(({ j }) => {
            const k = i < j ? i + "-" + j : j + "-" + i;
            if (visto.has(k)) return;
            visto.add(k);
            axones.push({ a: i, b: j, luz: 0 });
          });
      });
    };

    const medir = () => {
      const r = box.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (renderer) {
        renderer.setSize(w, h);
        program.uniforms.uRes.value = [w, h];
      }
      tejer();
    };

    /* disparar: la neurona se enciende y manda impulsos por sus axones */
    const disparar = (i) => {
      const p = nodos[i];
      if (!p || p.descanso > 0) return;
      p.luz = 1; p.descanso = 0.7;
      axones.forEach((ax) => {
        if (ax.a !== i && ax.b !== i) return;
        const de = ax.a === i ? ax.a : ax.b, a = ax.a === i ? ax.b : ax.a;
        impulsos.push({ ax, de, a, t: 0, vel: 0.9 + Math.random() * 0.8 });
      });
    };

    let semilla = 0;
    const paso = (dt) => {
      semilla += dt * RED.espontaneo;
      while (semilla > 1) { semilla -= 1; disparar(Math.floor(Math.random() * nodos.length)); }

      nodos.forEach((p, i) => {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.luz = Math.max(0, p.luz - dt * 1.6);
        p.descanso = Math.max(0, p.descanso - dt);
        if (puntero.activo && Math.hypot(p.x - puntero.x, p.y - puntero.y) < RED.puntero * 0.45 && Math.random() < dt * 3) disparar(i);
      });
      axones.forEach((ax) => { ax.luz = Math.max(0, ax.luz - dt * 1.4); });
      impulsos = impulsos.filter((im) => {
        im.t += dt * im.vel;
        im.ax.luz = Math.max(im.ax.luz, 0.8);
        if (im.t >= 1) {
          /* al llegar, a veces sigue la cascada */
          if (Math.random() < 0.34) disparar(im.a);
          else nodos[im.a].luz = Math.max(nodos[im.a].luz, 0.6);
          return false;
        }
        return true;
      });
      if (impulsos.length > 160) impulsos.splice(0, impulsos.length - 160);
    };

    const pintar = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      axones.forEach((ax) => {
        const p = nodos[ax.a], q = nodos[ax.b];
        const d = Math.hypot(q.x - p.x, q.y - p.y);
        if (d > RED.alcance * 1.35) return;
        const cerca = puntero.activo
          ? Math.max(0, 1 - Math.hypot((p.x + q.x) / 2 - puntero.x, (p.y + q.y) / 2 - puntero.y) / RED.puntero)
          : 0;
        const al = (1 - d / (RED.alcance * 1.35)) * (0.16 + ax.luz * 0.55 + cerca * 0.4);
        ctx.strokeStyle = `rgba(190,172,255,${al.toFixed(3)})`;
        ctx.lineWidth = 0.8 + ax.luz * 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      });
      impulsos.forEach((im) => {
        const p = nodos[im.de], q = nodos[im.a];
        const x = p.x + (q.x - p.x) * im.t, y = p.y + (q.y - p.y) * im.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, "rgba(255,255,255,.95)");
        g.addColorStop(0.35, "rgba(170,210,255,.55)");
        g.addColorStop(1, "rgba(120,90,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
      });
      nodos.forEach((p) => {
        const cerca = puntero.activo ? Math.max(0, 1 - Math.hypot(p.x - puntero.x, p.y - puntero.y) / RED.puntero) : 0;
        const luz = Math.min(1, p.luz + cerca * 0.5);
        if (luz > 0.05) {
          const R = p.r * 6 + luz * 10;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
          g.addColorStop(0, `rgba(200,186,255,${(luz * 0.55).toFixed(3)})`);
          g.addColorStop(1, "rgba(109,74,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(${Math.round(200 + 55 * luz)},${Math.round(190 + 65 * luz)},255,${(0.55 + luz * 0.45).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + luz * 1.4, 0, Math.PI * 2); ctx.fill();
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
        puntero.sx += ((puntero.activo ? puntero.x / w : 0.7) - puntero.sx) * Math.min(1, dt * 2.5);
        puntero.sy += ((puntero.activo ? 1 - puntero.y / h : 0.55) - puntero.sy) * Math.min(1, dt * 2.5);
        program.uniforms.uTime.value = reloj;
        program.uniforms.uMouse.value = [puntero.sx, puntero.sy];
        renderer.render({ scene: mesh });
      }
      paso(dt);
      pintar();
      if (!quieto && visible && !document.hidden) raf = requestAnimationFrame(cuadro);
    };
    const arrancar = () => { if (!raf && vivo) { previo = 0; raf = requestAnimationFrame(cuadro); } };

    medir();
    if (quieto) {
      reloj = 12; paso(0.016); cuadro(performance.now());
    } else arrancar();

    /* el puntero se escucha en la seccion entera, no solo en el lienzo: el
       lienzo va debajo del contenido y no recibe eventos */
    const zona = box.parentElement || box;
    const mover = (e) => {
      const r = box.getBoundingClientRect();
      puntero.x = e.clientX - r.left; puntero.y = e.clientY - r.top; puntero.activo = true;
    };
    const salir = () => { puntero.activo = false; };
    zona.addEventListener("pointermove", mover, { passive: true });
    zona.addEventListener("pointerleave", salir);

    const ro = new ResizeObserver(() => { medir(); if (quieto) cuadro(performance.now()); });
    ro.observe(box);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !quieto) arrancar();
    });
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
        const gl = renderer.gl;
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
