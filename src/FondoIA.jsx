import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Sphere, Plane, Triangle, Box, Cylinder } from "ogl";

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
  col += vec3(1.0, 0.8, 0.6) * (0.006 / (d + 0.02)) * 0.3;
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
/* Un gigante gaseoso como los de las fotos de la NASA: muchas bandas finas en
   tonos crema, arena y violeta, con turbulencia donde se tocan -el viento
   corre para lados opuestos en bandas vecinas-, una tormenta ovalada, el
   borde oscurecido (limb darkening) y la noche que entra suave. */
const PLANETA_F = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec3 uLuz;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
${RUIDO}
void main() {
  vec3 n = normalize(vN);
  vec3 q = normalize(vP);
  float lat = q.y;
  float lon = atan(q.z, q.x);
  // cada banda gira a su velocidad: eso tuerce los bordes entre bandas
  float corr = sin(lat * 23.0) * 0.08;
  float lonV = lon + uTime * (0.02 + corr);
  float turb = fbm(vec2(lonV * 2.2, lat * 18.0)) * 0.6 + fbm(vec2(lonV * 6.0, lat * 40.0)) * 0.2;
  float y = lat + turb * 0.045;
  float b1 = sin(y * 26.0) * 0.5 + 0.5;
  float b2 = sin(y * 61.0 + 1.7) * 0.5 + 0.5;
  float b3 = sin(y * 9.0 + 0.4) * 0.5 + 0.5;
  vec3 crema  = vec3(0.90, 0.85, 0.80);
  vec3 arena  = vec3(0.70, 0.60, 0.58);
  vec3 violeta = vec3(0.52, 0.44, 0.74);
  vec3 hondo  = vec3(0.30, 0.25, 0.46);
  vec3 sup = mix(violeta, crema, smoothstep(0.25, 0.85, b1));
  sup = mix(sup, arena, smoothstep(0.4, 1.0, b3) * 0.45);
  sup = mix(sup, hondo, smoothstep(0.7, 1.0, b2) * 0.35);
  sup *= 0.92 + fbm(vec2(lonV * 12.0, lat * 70.0)) * 0.12;
  // la tormenta: un ovalo en el hemisferio sur que gira con su banda
  vec2 ct = vec2((mod(lonV + 3.14159, 6.28318) - 3.14159 - 0.6) * 0.55, (lat + 0.32) * 1.6);
  float ov = length(ct * vec2(1.0, 1.8));
  float remolino = fbm(vec2(atan(ct.y, ct.x) * 1.5 + ov * 6.0, ov * 4.0));
  float torm = 1.0 - smoothstep(0.08, 0.14, ov);
  sup = mix(sup, mix(vec3(0.78, 0.50, 0.58), vec3(0.95, 0.80, 0.78), remolino * 0.5 + 0.5), torm * 0.85);
  // polos un poco mas oscuros y azulados
  sup = mix(sup, vec3(0.34, 0.33, 0.52), smoothstep(0.72, 0.98, abs(lat)) * 0.6);

  vec3 l = normalize(uLuz);
  float dif = dot(n, l);
  float luz = smoothstep(-0.12, 0.7, dif);
  // limb darkening: el borde del disco se ve mas oscuro, como en las fotos reales
  float mu = max(dot(n, normalize(vV)), 0.0);
  float limbo = pow(mu, 0.42);
  vec3 col = sup * luz * limbo * 1.12;
  // un poco de dispersion azul en el borde iluminado, muy fina
  float borde = pow(1.0 - mu, 5.0);
  col += vec3(0.45, 0.55, 0.95) * borde * smoothstep(-0.2, 0.6, dif) * 0.55;
  col += sup * 0.012;
  gl_FragColor = vec4(col, 1.0);
}
`;
/* la atmosfera: una capa finita pegada al disco, solo del lado del sol */
const HALO_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
void main() {
  vec3 n = normalize(vN);
  float f = pow(max(0.0, 1.0 - abs(dot(n, vV))), 5.0);
  float lado = smoothstep(-0.2, 0.7, dot(n, normalize(uLuz)));
  gl_FragColor = vec4(vec3(0.55, 0.65, 1.0), f * lado * 0.6);
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

/* ---------- la luna grande ----------
   Como la de las fotos: mares oscuros y lisos, tierras altas claras llenas
   de crateres -cada uno con el fondo en sombra y el borde iluminado del lado
   del sol- y la linea de la noche que corta suave. El ruido es 3D sobre la
   esfera, asi no hay costura. */
const LUNA_REAL_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz;
uniform vec4 uImpacto;   // direccion del golpe y cuanto calor le queda
varying vec3 vN; varying vec3 vP; varying vec3 vV;
vec3 hash3(vec3 p) {
  p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453);
}
float ruido3(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float n = mix(mix(mix(hash3(i).x, hash3(i + vec3(1,0,0)).x, f.x), mix(hash3(i + vec3(0,1,0)).x, hash3(i + vec3(1,1,0)).x, f.x), f.y),
                mix(mix(hash3(i + vec3(0,0,1)).x, hash3(i + vec3(1,0,1)).x, f.x), mix(hash3(i + vec3(0,1,1)).x, hash3(i + vec3(1,1,1)).x, f.x), f.y), f.z);
  return n;
}
float fbm3(vec3 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * ruido3(p); p *= 2.07; a *= 0.5; } return v; }
// crateres: celdas de voronoi; devuelve cuanto hunde y cuanto levanta el borde
vec2 crateres(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  float hundido = 0.0, borde = 0.0;
  for (int x = -1; x <= 1; x++) for (int y = -1; y <= 1; y++) for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 h = hash3(i + g);
    if (h.z > 0.55) continue;            // no todas las celdas tienen crater
    float rad = 0.18 + h.x * 0.28;
    float d = length(g + h * 0.8 + 0.1 - f) / rad;
    hundido = max(hundido, 1.0 - smoothstep(0.0, 1.0, d));
    borde = max(borde, smoothstep(0.75, 1.0, d) * (1.0 - smoothstep(1.0, 1.25, d)));
  }
  return vec2(hundido, borde);
}
void main() {
  vec3 n = normalize(vN);
  vec3 q = normalize(vP);
  // los mares: manchas grandes y oscuras
  float mar = smoothstep(0.52, 0.62, fbm3(q * 1.6 + 3.0));
  vec3 tierra = vec3(0.78, 0.77, 0.80);
  vec3 maria = vec3(0.36, 0.36, 0.40);
  vec3 col = mix(tierra, maria, mar);
  col *= 0.85 + fbm3(q * 9.0) * 0.3;
  // crateres en dos tamanos, menos sobre los mares
  vec2 c1 = crateres(q * 4.0);
  vec2 c2 = crateres(q * 11.0 + 7.0);
  float hund = max(c1.x, c2.x * 0.7) * (1.0 - mar * 0.6);
  float bord = max(c1.y, c2.y * 0.7) * (1.0 - mar * 0.6);
  vec3 l = normalize(uLuz);
  // el crater se sombrea del lado del sol y el borde se ilumina del otro
  float lado = dot(n, l);
  col *= 1.0 - hund * 0.35;
  col += vec3(0.12) * bord;
  float luz = smoothstep(-0.05, 0.6, lado);
  vec3 fin = col * (0.03 + luz * 1.05);
  // un reflejo apenas azulado de la tierra en la cara oscura
  fin += vec3(0.05, 0.06, 0.1) * (1.0 - luz) * 0.5;
  // el punto del golpe queda incandescente y se enfria: blanco, naranja, rojo
  float g = max(dot(n, normalize(uImpacto.xyz + 1e-4)), 0.0);
  float nucleo = pow(g, 900.0), aura = pow(g, 160.0);
  float calor = uImpacto.w;
  vec3 brasa = mix(vec3(0.9, 0.18, 0.05), vec3(1.0, 0.7, 0.35), calor);
  fin += brasa * (nucleo * 2.4 + aura * 0.6) * calor * calor;
  // y deja una mancha oscura de material eyectado alrededor
  fin *= 1.0 - smoothstep(0.985, 0.998, g) * 0.35 * (1.0 - calor * 0.5) * step(0.001, uImpacto.w + 0.001);
  gl_FragColor = vec4(fin, 1.0);
}
`;

/* ---------- el anillo ---------- */
/* El anillo: decenas de bandas de hielo y polvo de distinta densidad, la
   division de Cassini y la sombra del planeta cayendo sobre el. La sombra se
   calcula de verdad: desde cada punto del anillo se tira un rayo hacia el sol
   y, si choca con la esfera del planeta, ahi es de noche. */
const ANILLO_V = /* glsl */ `
attribute vec3 position; attribute vec2 uv;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying vec2 vUv; varying vec3 vVista; varying vec3 vCentro; varying float vRadio;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vVista = mv.xyz;
  vCentro = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vRadio = length((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
  gl_Position = projectionMatrix * mv;
}
`;
const ANILLO_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz;
varying vec2 vUv; varying vec3 vVista; varying vec3 vCentro; varying float vRadio;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  if (r < 0.55 || r > 0.99) discard;
  // densidad: bandas de varios tamanos, sumadas
  float k = (r - 0.55) / 0.44;
  /* pocas bandas y anchas: el anillo se ve casi de canto, y una banda fina
     en el plano queda de un pixel en pantalla y se rompe en puntitos */
  float d = 0.66 + 0.2 * sin(k * 21.0) + 0.1 * sin(k * 53.0 + 1.1);
  // anillo interior tenue, el principal denso y el exterior mas finito
  d *= mix(0.35, 1.0, smoothstep(0.0, 0.18, k));
  d *= 1.0 - smoothstep(0.78, 1.0, k) * 0.55;
  // la division de Cassini
  d *= 1.0 - (smoothstep(0.58, 0.6, k) * (1.0 - smoothstep(0.65, 0.67, k))) * 0.92;
  d *= smoothstep(0.0, 0.03, k) * (1.0 - smoothstep(0.97, 1.0, k));
  vec3 col = mix(vec3(0.62, 0.56, 0.58), vec3(0.86, 0.82, 0.78), smoothstep(0.1, 0.7, k));
  // la sombra del planeta
  vec3 L = normalize(uLuz);
  vec3 oc = vVista - vCentro;
  float b = dot(oc, L);
  float c = dot(oc, oc) - vRadio * vRadio;
  float disc = b * b - c;
  float sombra = (b < 0.0) ? smoothstep(-0.02, 0.06, disc / (vRadio * vRadio)) : 0.0;
  col *= 1.0 - sombra * 0.9;
  gl_FragColor = vec4(col * 1.05, clamp(d, 0.0, 1.0) * 0.9);
}
`;

/* ---------- el satelite ----------
   Armado con piezas simples, como los de verdad: un cuerpo forrado en lamina
   dorada -la manta termica arrugada que se ve en las fotos-, dos paneles
   solares con sus celdas, una antena parabolica y una luz que titila. */
const PIEZA_V = /* glsl */ `
attribute vec3 position; attribute vec3 normal; attribute vec2 uv;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform mat3 normalMatrix;
varying vec3 vN; varying vec3 vP; varying vec3 vV; varying vec2 vUv;
void main() {
  vN = normalize(normalMatrix * normal);
  vP = position; vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;
/* metal: la lamina dorada del cuerpo o el aluminio de la antena */
const METAL_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz; uniform vec3 uColor; uniform float uArruga;
varying vec3 vN; varying vec3 vP; varying vec3 vV; varying vec2 vUv;
${RUIDO}
void main() {
  vec3 n = normalize(vN);
  // la lamina arrugada tuerce la normal y rompe el reflejo en manchas
  float ar = snoise(vP.xy * 7.0 + vP.z * 5.0) * uArruga;
  n = normalize(n + vec3(ar, -ar, ar * 0.5));
  vec3 l = normalize(uLuz);
  float dif = max(dot(n, l), 0.0);
  vec3 h = normalize(l + vV);
  float esp = pow(max(dot(n, h), 0.0), 28.0);
  vec3 col = uColor * (0.08 + dif * 0.95) + vec3(1.0, 0.95, 0.85) * esp * 0.9;
  gl_FragColor = vec4(col, 1.0);
}
`;
/* los paneles: celdas azul oscuro con su grilla y un reflejo que se corre */
const PANEL_F = /* glsl */ `
precision highp float;
uniform vec3 uLuz;
varying vec3 vN; varying vec3 vP; varying vec3 vV; varying vec2 vUv;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec2 celda = fract(vUv * vec2(14.0, 4.0));
  float linea = step(celda.x, 0.06) + step(celda.y, 0.08);
  float marco = step(vUv.x, 0.02) + step(0.98, vUv.x) + step(vUv.y, 0.07) + step(0.93, vUv.y);
  vec3 base = mix(vec3(0.08, 0.16, 0.45), vec3(0.16, 0.30, 0.70), vUv.y);
  vec3 l = normalize(uLuz);
  float dif = max(dot(n, l), 0.0);
  vec3 h = normalize(l + vV);
  float esp = pow(max(dot(n, h), 0.0), 60.0);
  vec3 col = base * (0.45 + dif * 0.9) + vec3(0.6, 0.75, 1.0) * esp * 1.2;
  col = mix(col, vec3(0.55, 0.6, 0.7) * (0.3 + dif), clamp(linea * 0.6 + marco, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;
const LUZ_F = /* glsl */ `
precision highp float;
uniform float uTime;
void main() {
  float on = step(0.82, fract(uTime * 0.7));
  gl_FragColor = vec4(vec3(1.0, 0.25, 0.25) * (0.35 + on * 2.0), 1.0);
}
`;

/* ---------- el asteroide y el choque ----------
   La roca es una esfera deformada con ruido en la placa de video, asi no hay
   dos iguales. Las chispas, la estela y el polvo son un solo sistema de
   particulas: se mueven en el procesador y se pintan de una vez como puntos. */
const ROCA_V = /* glsl */ `
attribute vec3 position; attribute vec3 normal;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform mat3 normalMatrix;
uniform float uSemilla;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
${RUIDO}
void main() {
  float d = snoise(position.xy * 2.2 + position.z * 1.7 + uSemilla) * 0.28
          + snoise(position.yz * 5.0 + uSemilla) * 0.08;
  vec3 pos = position * (1.0 + d);
  vN = normalize(normalMatrix * normal);
  vP = pos;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;
const CHISPA_V = /* glsl */ `
attribute vec3 position; attribute vec4 dato;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uDpr;
varying float vA; varying float vTipo;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vA = dato.x; vTipo = dato.z;
  gl_PointSize = dato.y * uDpr * (13.0 / -mv.z);
}
`;
const CHISPA_F = /* glsl */ `
precision highp float;
varying float vA; varying float vTipo;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0 || vA <= 0.0) discard;
  vec3 col; float a;
  if (vTipo < 0.5) {            // fuego: blanco en el centro, naranja afuera
    col = mix(vec3(1.0, 0.95, 0.85), vec3(1.0, 0.45, 0.12), d);
    a = pow(1.0 - d, 1.6);
  } else if (vTipo < 1.5) {     // polvo: una nube suave, gris lila
    col = vec3(0.72, 0.68, 0.82);
    a = pow(1.0 - d, 2.0) * 0.75;
  } else {                      // destello del impacto
    col = mix(vec3(1.0), vec3(0.65, 0.8, 1.0), d);
    a = pow(1.0 - d, 2.0);
  }
  gl_FragColor = vec4(col, a * vA);
}
`;

/* ---------- la galaxia ----------
   Una espiral de miles de estrellas en la placa de video. Cada una sabe su
   radio y su angulo de partida; el shader la hace girar con rotacion
   diferencial -el centro da la vuelta mas rapido que los brazos-, que es
   como giran las galaxias de verdad y lo que hace que los brazos se vean
   enroscarse despacio en vez de girar como un disco rigido. */
const GAL_V = /* glsl */ `
attribute vec3 position; attribute vec4 dato;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
uniform float uTime; uniform float uDpr;
varying vec3 vColor; varying float vA;
void main() {
  float r = dato.x;
  float ang = dato.y + uTime * 0.035 / (0.25 + r);
  vec3 p = vec3(cos(ang) * r, position.y, sin(ang) * r) + vec3(position.x, 0.0, position.z) * (0.35 + r);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  // nucleo amarillento y brazos azul violeta, con alguna estrella rosada suelta
  // el bulbo: estrellas viejas, amarillo anaranjadas, mas calidas hacia el centro
  vec3 nucleo = mix(vec3(1.0, 0.55, 0.2), vec3(1.0, 0.78, 0.42), smoothstep(0.0, 0.22, r));
  vec3 brazo = mix(vec3(0.55, 0.62, 1.0), vec3(0.62, 0.45, 1.0), dato.z);
  vColor = mix(nucleo, brazo, smoothstep(0.12, 0.5, r));
  vColor = mix(vColor, vec3(1.0, 0.55, 0.8), step(0.965, dato.w));
  vA = (0.24 + dato.w * 0.45) * (1.0 - smoothstep(0.7, 1.0, r) * 0.75) * (0.3 + smoothstep(0.0, 0.32, r) * 0.7);
  gl_PointSize = (1.2 + dato.w * 2.2) * uDpr * (78.0 / -mv.z);
}
`;
const GAL_F = /* glsl */ `
precision highp float;
varying vec3 vColor; varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  gl_FragColor = vec4(vColor, pow(1.0 - d, 2.0) * vA);
}
`;
/* el resplandor del centro, un solo punto grande y suave */
const NUCLEO_F = /* glsl */ `
precision highp float;
varying vec3 vColor; varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  // centro amarillo y halo naranja
  vec3 c = mix(vec3(1.0, 0.8, 0.42), vec3(1.0, 0.4, 0.1), smoothstep(0.0, 0.6, d));
  gl_FragColor = vec4(c, pow(1.0 - d, 1.8) * 0.95);
}
`;

/* ---------- el sol ----------
   Una esfera emisiva, sin luz propia que le llegue de afuera: la luz es
   ella. La superficie es granulacion -las celdas de plasma que hierven- con
   ruido 3D animado, zonas activas mas brillantes y fibrillas, y el borde mas
   oscuro y rojizo (limb darkening), que es lo que la vuelve una esfera y no
   un circulo naranja. Detras va la corona: un plano que mira a la camara con
   un resplandor que cae rapido y rayos de ruido que se mueven. */
const SOL_F = /* glsl */ `
precision highp float;
uniform float uTime;
varying vec3 vN; varying vec3 vP; varying vec3 vV;
vec3 hs(vec3 p) {
  p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453);
}
float rn(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hs(i).x, hs(i + vec3(1,0,0)).x, f.x), mix(hs(i + vec3(0,1,0)).x, hs(i + vec3(1,1,0)).x, f.x), f.y),
             mix(mix(hs(i + vec3(0,0,1)).x, hs(i + vec3(1,0,1)).x, f.x), mix(hs(i + vec3(0,1,1)).x, hs(i + vec3(1,1,1)).x, f.x), f.y), f.z);
}
float fb(vec3 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * rn(p); p *= 2.1; a *= 0.5; } return v; }
void main() {
  vec3 n = normalize(vN);
  vec3 q = normalize(vP);
  float t = uTime * 0.06;
  // granulacion: celdas chicas que hierven
  float gr = fb(q * 22.0 + vec3(t * 1.3, -t, t * 0.7));
  float gr2 = fb(q * 55.0 - vec3(t * 2.0));
  // manchas grandes de temperatura y zonas activas
  float big = fb(q * 3.2 + vec3(0.0, t * 0.4, 0.0));
  float act = smoothstep(0.62, 0.82, fb(q * 5.5 - vec3(t * 0.25, 0.0, t * 0.2)));
  float fib = pow(abs(sin((q.x + q.y * 1.7) * 60.0 + fb(q * 8.0) * 9.0)), 12.0) * act;
  vec3 hondo = vec3(0.86, 0.26, 0.02);
  vec3 medio = vec3(1.0, 0.55, 0.08);
  vec3 claro = vec3(1.0, 0.86, 0.45);
  vec3 col = mix(hondo, medio, smoothstep(0.25, 0.65, gr));
  col = mix(col, claro, smoothstep(0.55, 0.85, gr * 0.7 + gr2 * 0.3 + big * 0.35));
  col += vec3(1.0, 0.95, 0.8) * (act * 0.55 + fib * 0.9);
  // rios de plasma que se mueven como lava sobre la superficie
  vec3 w = q * 6.0 + vec3(fb(q * 3.0 + t), fb(q * 3.0 - t), 0.0) * 2.4;
  float rio = pow(fb(w + vec3(0.0, t * 0.6, 0.0)), 3.0);
  col += vec3(1.0, 0.78, 0.35) * rio * 1.4;
  // manchas activas que se encienden y apagan
  col += vec3(1.0, 0.96, 0.85) * act * (0.5 + 0.5 * sin(uTime * 1.3 + fb(q * 4.0) * 20.0)) * 0.6;
  // borde oscuro y rojizo: el limb darkening de las fotos
  float mu = max(dot(n, normalize(vV)), 0.0);
  col *= mix(0.42, 1.0, pow(mu, 0.45));
  col = mix(col * vec3(1.0, 0.5, 0.2), col, smoothstep(0.0, 0.45, mu));
  gl_FragColor = vec4(col * 1.2, 1.0);
}
`;
const CORONA_V = /* glsl */ `
attribute vec3 position; attribute vec2 uv;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
/* La corona con lo que la hace un sol de verdad:
   - PROTUBERANCIAS: arcos de plasma que salen del borde y vuelven a entrar,
     siguiendo el campo magnetico. Cada una es una banda con filamentos de
     ruido que suben por el arco, y sube y baja despacio.
   - ESPICULAS: la "hierba" de chorritos finos que cubre todo el borde.
   - FULGURACIONES: cada unos segundos un punto del borde se enciende blanco,
     tira un chorro hacia afuera y se apaga. El lugar sale sorteado. */
const CORONA_F = /* glsl */ `
precision highp float;
uniform float uTime; uniform float uBorde;
varying vec2 vUv;
${RUIDO}
float h1(float x) { return fract(sin(x * 127.1) * 43758.5453); }

// un arco entre dos angulos, con su altura maxima H
float arco(float a, float r, float a1, float a2, float H, float s) {
  if (a < a1 || a > a2) return 0.0;
  float k = (a - a1) / (a2 - a1);
  float respira = 0.8 + 0.2 * sin(uTime * 0.23 + s * 5.0);
  float alt = uBorde + H * respira * sin(3.14159 * k);
  float w = 0.004 + 0.012 * sin(3.14159 * k);
  float d = abs(r - alt);
  float banda = exp(-d * d / (w * w));
  // filamentos que corren por el arco, como el plasma siguiendo el campo
  float fil = fbm(vec2(k * 14.0 - uTime * 0.18 + s, (r - alt) * 90.0 + s * 3.0)) * 0.5 + 0.5;
  // las patas del arco se funden con la superficie
  float pie = smoothstep(uBorde - 0.004, uBorde + 0.012, r);
  return banda * (0.35 + fil * 1.1) * pie;
}

void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  if (r > 1.0) discard;
  float a = atan(p.y, p.x);
  float x = max(r - uBorde, 0.0);
  float fuera = step(uBorde, r);

  // la corona suave, finita
  float glow = exp(-x * 18.0);
  float rayo = fbm(vec2(a * 4.0, x * 5.0 - uTime * 0.12)) * 0.5 + 0.5;
  float c = glow * (0.4 + rayo * 0.5);
  vec3 e = mix(vec3(1.0, 0.7, 0.38), vec3(1.0, 0.93, 0.78), clamp(exp(-x * 10.0), 0.0, 1.0)) * c;

  // espiculas: chorritos finos en todo el borde
  float esp = pow(fbm(vec2(a * 160.0, uTime * 0.25)) * 0.5 + 0.5, 3.0);
  e += vec3(1.0, 0.55, 0.2) * esp * exp(-x * 90.0) * 1.4 * fuera;

  // protuberancias sobre el borde que se ve
  float pr = arco(a, r, -0.52, -0.2, 0.085, 1.0)
           + arco(a, r, 0.05, 0.3, 0.05, 2.0)
           + arco(a, r, 0.28, 0.74, 0.13, 3.0) * 0.9
           + arco(a, r, -0.9, -0.62, 0.06, 4.0);
  // una protuberancia de "seto": plasma colgando sobre el borde
  float seto = smoothstep(0.58, 0.85, fbm(vec2(a * 22.0, x * 30.0 - uTime * 0.1))) * exp(-x * 26.0)
             * smoothstep(-0.05, 0.1, a) * (1.0 - smoothstep(0.2, 0.35, a));
  vec3 plasma = mix(vec3(0.95, 0.22, 0.05), vec3(1.0, 0.6, 0.25), clamp(pr, 0.0, 1.0));
  e += plasma * (pr + seto * 0.8) * fuera;

  // fulguraciones: una cada 7 segundos, en un lugar sorteado del borde
  float T = 7.0;
  float n = floor(uTime / T);
  float f = fract(uTime / T);
  float ang = h1(n) * 1.3 - 0.65;
  float env = smoothstep(0.0, 0.03, f) * exp(-f * 7.0);
  vec2 punto = uBorde * vec2(cos(ang), sin(ang));
  float dp = distance(p, punto);
  float flash = exp(-dp * 70.0) * 2.2 + exp(-dp * 18.0) * 0.35;
  float da = abs(a - ang);
  float chorro = exp(-da * 55.0) * exp(-x * 10.0 / max(f * 3.0, 0.15)) * smoothstep(uBorde, uBorde + 0.01, r);
  e += vec3(1.0, 0.95, 0.85) * flash * env + vec3(1.0, 0.7, 0.4) * chorro * env * 1.3;

  e *= 1.0 - smoothstep(0.82, 1.0, r);
  gl_FragColor = vec4(e, 1.0);
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
    let satelite = null;
    let luna = null, roca = null, chispas = null, zonaLuna = null, galaxia = null;
    let solG = null, sol = null, corona = null, solBase = null;
    const CAP = 700;
    const pPos = new Float32Array(CAP * 3), pDat = new Float32Array(CAP * 4);
    let parts = [];
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
        vertex: EST_V, fragment: EST_F, transparent: true, depthTest: true, depthWrite: false,
        uniforms: { uTime: { value: 0 }, uDpr: { value: dpr } },
      });
      progEst.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      estrellas = new Mesh(gl, {
        mode: gl.POINTS,
        geometry: new Geometry(gl, { position: { size: 3, data: pos }, random: { size: 4, data: rnd } }),
        program: progEst,
      });
      estrellas.setParent(scene);

      /* el sol, que asoma por la izquierda */
      solG = new Transform();
      solG.setParent(scene);
      sol = new Mesh(gl, {
        geometry: new Sphere(gl, { radius: 1, widthSegments: 96, heightSegments: 64 }),
        program: new Program(gl, { vertex: CUERPO_V, fragment: SOL_F, uniforms: { uTime: { value: 0 } } }),
      });
      sol.setParent(solG);
      const progCorona = new Program(gl, {
        vertex: CORONA_V, fragment: CORONA_F, transparent: true, depthWrite: false, cullFace: null,
        uniforms: { uTime: { value: 0 }, uBorde: { value: 1 / 2.8 } },
      });
      progCorona.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      corona = new Mesh(gl, { geometry: new Plane(gl, { width: 2, height: 2 }), program: progCorona });
      corona.scale.set(2.8);
      corona.setParent(solG);

      /* la galaxia, lejos de todo */
      {
        const NG = chico ? 6000 : 14000, BRAZOS = 3;
        const gp = new Float32Array(NG * 3), gd = new Float32Array(NG * 4);
        for (let i = 0; i < NG; i++) {
          const r0 = Math.pow(Math.random(), 1.7);
          const brazo = i % BRAZOS;
          /* el angulo sigue la espiral; la dispersion es mayor cerca del
             centro, donde las estrellas se amontonan en el bulbo */
          const ang = (brazo / BRAZOS) * Math.PI * 2 + r0 * 5.2 + (Math.random() - 0.5) * (0.5 + (1 - r0) * 1.6);
          const g = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
          gp[i * 3] = g() * 0.07;
          gp[i * 3 + 1] = g() * 0.05 * (1.4 - r0);
          gp[i * 3 + 2] = g() * 0.07;
          gd[i * 4] = r0; gd[i * 4 + 1] = ang; gd[i * 4 + 2] = Math.random(); gd[i * 4 + 3] = Math.random();
        }
        const progGal = new Program(gl, {
          vertex: GAL_V, fragment: GAL_F, transparent: true, depthTest: true, depthWrite: false,
          uniforms: { uTime: { value: 0 }, uDpr: { value: dpr } },
        });
        progGal.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        galaxia = new Transform();
        galaxia.setParent(scene);
        const brazos = new Mesh(gl, {
          mode: gl.POINTS,
          geometry: new Geometry(gl, { position: { size: 3, data: gp }, dato: { size: 4, data: gd } }),
          program: progGal,
        });
        brazos.setParent(galaxia);
        const progNuc = new Program(gl, {
          vertex: GAL_V, fragment: NUCLEO_F, transparent: true, depthTest: true, depthWrite: false,
          uniforms: { uTime: { value: 0 }, uDpr: { value: dpr * 17 } },
        });
        progNuc.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        const nucleo = new Mesh(gl, {
          mode: gl.POINTS,
          geometry: new Geometry(gl, { position: { size: 3, data: new Float32Array(3) }, dato: { size: 4, data: new Float32Array([0, 0, 0, 1]) } }),
          program: progNuc,
        });
        nucleo.setParent(galaxia);
        galaxia.rotation.set(0.72, 0, 0.5);
        galaxia.programas = [progGal, progNuc];
      }

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
      halo = new Mesh(gl, { geometry: new Sphere(gl, { radius: 1.035, widthSegments: 64, heightSegments: 40 }), program: progHalo });
      halo.setParent(sistema);

      const progAnillo = new Program(gl, {
        vertex: ANILLO_V, fragment: ANILLO_F, transparent: true, depthWrite: false, cullFace: null,
        uniforms: { uLuz: { value: LUZ } },
      });
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
          program: new Program(gl, { vertex: CUERPO_V, fragment: LUNA_REAL_F, uniforms: { uLuz: { value: LUZ }, uImpacto: { value: [0, 0, 1, 0] } } }),
        });
        m.scale.set(l.r);
        m.setParent(sistema);
        lunas.push({ ...l, m });
      });

      /* el satelite: cada pieza es una malla colgada de un mismo grupo */
      const sat = new Transform();
      sat.setParent(sistema);
      const pieza = (geometry, fragment, uniforms, cullFace) => {
        const prog = new Program(gl, { vertex: PIEZA_V, fragment, uniforms: { uLuz: { value: LUZ }, ...uniforms }, cullFace });
        const m = new Mesh(gl, { geometry, program: prog });
        m.setParent(sat);
        return m;
      };
      /* como los de ahora: cuerpo blanco plateado y solo un modulo chico en
         lamina dorada, no todo el satelite forrado */
      const dorado = { uColor: { value: [0.88, 0.7, 0.36] }, uArruga: { value: 0.1 } };
      const aluminio = { uColor: { value: [0.82, 0.84, 0.9] }, uArruga: { value: 0.04 } };
      const blanco = { uColor: { value: [0.9, 0.91, 0.94] }, uArruga: { value: 0.03 } };
      pieza(new Box(gl, { width: 0.36, height: 0.3, depth: 0.3 }), METAL_F, blanco);
      const modulo = pieza(new Box(gl, { width: 0.26, height: 0.16, depth: 0.24 }), METAL_F, dorado);
      modulo.position.set(0, -0.23, 0);
      /* el brazo que sostiene los paneles */
      pieza(new Box(gl, { width: 2.3, height: 0.022, depth: 0.022 }), METAL_F, aluminio);
      [-1, 1].forEach((lado) => {
        const panel = pieza(new Plane(gl, { width: 0.95, height: 0.28 }), PANEL_F, {}, null);
        panel.position.x = lado * 0.72;
        panel.rotation.x = 0.25;
      });
      /* la parabolica, mirando hacia el planeta, con su antena al centro */
      const plato = pieza(new Cylinder(gl, { radiusTop: 0.2, radiusBottom: 0.02, height: 0.1, radialSegments: 28, openEnded: true }), METAL_F, aluminio, null);
      plato.position.set(0, 0, 0.26);
      plato.rotation.x = Math.PI / 2;
      const antena = pieza(new Cylinder(gl, { radiusTop: 0.008, radiusBottom: 0.008, height: 0.22, radialSegments: 6 }), METAL_F, aluminio);
      antena.position.set(0, 0.26, 0);
      const luz = new Mesh(gl, {
        geometry: new Sphere(gl, { radius: 0.025, widthSegments: 8, heightSegments: 6 }),
        program: new Program(gl, { vertex: CUERPO_V, fragment: LUZ_F, uniforms: { uTime: { value: 0 } } }),
      });
      luz.position.set(0, 0.38, 0);
      luz.setParent(sat);
      satelite = { t: sat, luz, orbita: 2.5, vel: 0.09, fase: 3.7, incl: -0.35 };
      sat.scale.set(0.58);

      /* la luna grande: la que se lleva el golpe */
      luna = new Mesh(gl, {
        geometry: new Sphere(gl, { radius: 1, widthSegments: 72, heightSegments: 48 }),
        program: new Program(gl, { vertex: CUERPO_V, fragment: LUNA_REAL_F, uniforms: { uLuz: { value: LUZ }, uImpacto: { value: [0, 0, 1, 0] } } }),
      });
      luna.scale.set(0.56);
      zonaLuna = new Transform();
      zonaLuna.setParent(scene);
      luna.setParent(zonaLuna);

      roca = new Mesh(gl, {
        geometry: new Sphere(gl, { radius: 1, widthSegments: 22, heightSegments: 16 }),
        program: new Program(gl, { vertex: ROCA_V, fragment: LUNA_F, uniforms: { uLuz: { value: LUZ }, uColor: { value: [0.5, 0.42, 0.36] }, uSemilla: { value: 0 } } }),
      });
      roca.scale.set(0.022);
      roca.visible = false;
      roca.setParent(zonaLuna);

      const geoChispas = new Geometry(gl, { position: { size: 3, data: pPos }, dato: { size: 4, data: pDat } });
      const progChispas = new Program(gl, {
        vertex: CHISPA_V, fragment: CHISPA_F, transparent: true, depthWrite: false,
        uniforms: { uDpr: { value: dpr } },
      });
      progChispas.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
      chispas = new Mesh(gl, { mode: gl.POINTS, geometry: geoChispas, program: progChispas });
      chispas.frustumCulled = false;
      chispas.setParent(zonaLuna);

      sistema.rotation.z = 0.32;
      sistema.rotation.x = 0.22;
    } catch {
      renderer = null;
    }

    /* ---------- el asteroide ---------- */
    /* la luna flota arriba a la izquierda del planeta, siempre a la vista
       -si orbitara, la mitad del tiempo quedaria detras de la caja del
       precio y el choque no lo veria nadie- con un vaiven lento */
    const lunaEn = (tt) => {
      const a = tt * 0.18;
      return [Math.cos(a) * 0.1, Math.sin(a * 1.3) * 0.07, 0];
    };
    const azar = (a, b) => a + Math.random() * (b - a);
    const esfera = () => {
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, k = Math.sqrt(1 - u * u);
      return [k * Math.cos(th), u, k * Math.sin(th)];
    };
    const soltar = (x, y, z, vx, vy, vz, dura, tam, tipo, freno = 0, crece = 0) => {
      if (parts.length >= CAP) parts.shift();
      parts.push({ x, y, z, vx, vy, vz, vida: 0, dura, tam, tipo, freno, crece });
    };
    let ast = null;
    let calor = 0;
    let proxAst = quieto ? Infinity : 3.5;

    const lanzar = () => {
      const dura = azar(4.6, 5.6);
      const dest = lunaEn(reloj + dura);
      /* entra desde un costado y un poco hacia la camara, para que se vea venir */
      const dir = [azar(-1, 1), azar(0.35, 0.9), azar(0.2, 0.8)];
      const m = Math.hypot(...dir);
      const d = dir.map((v) => v / m);
      const lejos = 6.5;
      ast = { t0: reloj, dura, d, desde: dest.map((v, i) => v + d[i] * lejos), giro: esfera() };
      roca.program.uniforms.uSemilla.value = Math.random() * 50;
      roca.visible = true;
    };

    const chocar = (centro, d) => {
      const R = 0.56;
      const p = centro.map((v, i) => v + d[i] * R);
      /* el destello */
      soltar(...p, 0, 0, 0, 0.5, 80, 2, 0, 1.2);
      soltar(...p, 0, 0, 0, 0.9, 50, 2, 0, 2);
      soltar(...p, 0, 0, 0, 0.3, 30, 0, 0, 2);
      /* las esquirlas calientes, disparadas hacia afuera del crater */
      for (let i = 0; i < 140; i++) {
        const e = esfera();
        const v = azar(0.25, 0.9);
        const dir = [d[0] * 0.9 + e[0], d[1] * 0.9 + e[1], d[2] * 0.9 + e[2]];
        soltar(...p, dir[0] * v, dir[1] * v, dir[2] * v, azar(0.8, 1.6), azar(3, 6), 0, 1.8);
      }
      /* la nube de polvo que se abre despacio */
      for (let i = 0; i < 150; i++) {
        const e = esfera();
        const v = azar(0.05, 0.22);
        soltar(...p, (d[0] * 0.6 + e[0]) * v, (d[1] * 0.6 + e[1]) * v, (d[2] * 0.6 + e[2]) * v, azar(2.2, 3.6), azar(9, 18), 1, 0.9, 1.2);
      }
      /* el anillo de la onda expansiva, sobre la superficie */
      const t1 = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
      const a1 = [d[1] * t1[2] - d[2] * t1[1], d[2] * t1[0] - d[0] * t1[2], d[0] * t1[1] - d[1] * t1[0]];
      const m1 = Math.hypot(...a1); a1.forEach((v, i) => (a1[i] = v / m1));
      const a2 = [d[1] * a1[2] - d[2] * a1[1], d[2] * a1[0] - d[0] * a1[2], d[0] * a1[1] - d[1] * a1[0]];
      for (let i = 0; i < 70; i++) {
        const th = (i / 70) * Math.PI * 2;
        const v = azar(0.32, 0.42);
        const dir = a1.map((c, k) => c * Math.cos(th) + a2[k] * Math.sin(th));
        soltar(...p, dir[0] * v, dir[1] * v, dir[2] * v, azar(1.2, 1.7), azar(7, 11), 1, 1.3, 0.8);
      }
    };

    const moverAsteroide = (dt) => {
      if (!luna) return;
      const lp = lunaEn(reloj);
      luna.position.set(...lp);
      /* el crater se enfria en unos seis segundos; la marca queda */
      if (calor > 0) {
        calor = Math.max(0, calor - dt / 6);
        const u = luna.program.uniforms.uImpacto.value;
        luna.program.uniforms.uImpacto.value = [u[0], u[1], u[2], calor];
      }
      luna.rotation.y = reloj * 0.08;

      proxAst -= dt;
      if (!ast && proxAst <= 0) lanzar();
      if (ast) {
        const k = Math.min(1, (reloj - ast.t0) / ast.dura);
        const e = Math.pow(k, 1.25);
        const dest = lunaEn(ast.t0 + ast.dura);
        const pos = ast.desde.map((v, i) => v + (dest[i] - v) * e);
        roca.position.set(...pos);
        roca.rotation.x += dt * 2.1 * ast.giro[0];
        roca.rotation.y += dt * 2.1 * ast.giro[1];
        /* la estela: se enciende a medida que entra */
        const n = 6;
        for (let i = 0; i < n; i++) {
          const j = esfera();
          soltar(pos[0] + j[0] * 0.02, pos[1] + j[1] * 0.02, pos[2] + j[2] * 0.02,
            ast.d[0] * 0.25 + j[0] * 0.05, ast.d[1] * 0.25 + j[1] * 0.05, ast.d[2] * 0.25 + j[2] * 0.05,
            azar(0.4, 0.8), azar(5, 10) * (0.5 + e), 0, 0.5);
        }
        if (Math.random() < 0.35) soltar(...pos, ast.d[0] * 0.08, ast.d[1] * 0.08, ast.d[2] * 0.08, azar(1.2, 2), azar(5, 9), 1, 0.4, 1);
        if (k >= 1) {
          chocar(dest, ast.d);
          luna.program.uniforms.uImpacto.value = [...ast.d, 1];
          calor = 1;
          roca.visible = false;
          ast = null;
          proxAst = azar(10, 15);
        }
      }

      /* las particulas */
      parts = parts.filter((q) => {
        q.vida += dt;
        if (q.vida >= q.dura) return false;
        const f = Math.max(0, 1 - q.freno * dt);
        q.vx *= f; q.vy *= f; q.vz *= f;
        q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
        return true;
      });
      for (let i = 0; i < CAP; i++) {
        const q = parts[i];
        if (!q) { pDat[i * 4] = 0; continue; }
        const k = q.vida / q.dura;
        pPos[i * 3] = q.x; pPos[i * 3 + 1] = q.y; pPos[i * 3 + 2] = q.z;
        pDat[i * 4] = q.tipo === 1 ? Math.sin(Math.PI * Math.min(1, k * 1.4 + 0.05)) * (1 - k) : Math.pow(1 - k, 1.4);
        pDat[i * 4 + 1] = q.tam * (1 + q.crece * k);
        pDat[i * 4 + 2] = q.tipo;
      }
      chispas.geometry.attributes.position.needsUpdate = true;
      chispas.geometry.attributes.dato.needsUpdate = true;
    };

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
      /* Cada cuerpo a su distancia, y separados: el planeta lejos arriba a la
         derecha, la luna mas cerca en el hueco entre el titular y el precio,
         la galaxia al fondo de todo. vis(z) da el medio alto y el medio ancho
         que se ven a esa profundidad, asi las posiciones son proporciones de
         la pantalla y no numeros sueltos. */
      const vis = (z) => { const hh = Math.tan((35 * Math.PI) / 360) * (12 - z); return [hh * (w / h), hh]; };
      if (w / h < 0.9) {
        let [ww, hh] = vis(-9);
        sistema.position.set(ww * 0.66, hh * 0.78, -9);
        sistema.scale.set(hh * 0.085);
        [ww, hh] = vis(-3);
        zonaLuna.position.set(ww * 0.02, hh * 0.84, -3);
        zonaLuna.scale.set(hh * 0.1);
        [ww, hh] = vis(-26);
        galaxia.position.set(-ww * 0.05, hh * 0.55, -26);
        galaxia.scale.set(hh * 0.62);
        [ww, hh] = vis(-14);
        solBase = { ww, hh, R: hh * 0.2, y: hh * 0.84 };
      } else {
        let [ww, hh] = vis(-9);
        sistema.position.set(ww * 0.8, hh * 0.64, -9);
        sistema.scale.set(hh * 0.19);
        [ww, hh] = vis(-3);
        zonaLuna.position.set(ww * 0.17, hh * 0.64, -3);
        zonaLuna.scale.set(hh * 0.16);
        [ww, hh] = vis(-26);
        galaxia.position.set(-ww * 0.02, hh * 0.64, -26);
        galaxia.scale.set(hh * 0.78);
        [ww, hh] = vis(-14);
        solBase = { ww, hh, R: hh * 0.55, y: hh * 0.72 };
      }
      solG.scale.set(solBase.R);
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
        camera.position.x = 0;
        camera.position.y = 0;
        camera.lookAt([0, 0, -4]);

        estrellas.program.uniforms.uTime.value = reloj;
        estrellas.rotation.z = reloj * 0.004;
        if (galaxia) galaxia.programas.forEach((pg) => { pg.uniforms.uTime.value = reloj; });
        if (solG && solBase) {
          /* un ciclo de 42 s: asoma, se queda mostrando un tercio mientras
             gira, y se vuelve a esconder detras del borde */
          const ph = ((reloj + 3) % 42) / 42;
          const suave = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
          const asoma = suave(0.0, 0.22, ph) * (1 - suave(0.72, 0.95, ph));
          const { ww, R, y } = solBase;
          /* asoma poco: en el punto maximo se ve apenas una franja del borde */
          solG.position.set(-ww - R * 1.9 + asoma * R * 0.97, y, -14);
          sol.rotation.y = reloj * 0.035;
          sol.program.uniforms.uTime.value = reloj;
          corona.program.uniforms.uTime.value = reloj;
        }
        planeta.program.uniforms.uTime.value = reloj;
        planeta.rotation.y = reloj * 0.06;
        anillo.rotation.z = reloj * 0.02;
        moverAsteroide(dt);
        if (satelite) {
          const a = satelite.fase + reloj * satelite.vel;
          satelite.t.position.set(Math.cos(a) * satelite.orbita, Math.sin(a) * satelite.orbita * satelite.incl - 0.15, Math.sin(a) * satelite.orbita);
          /* gira despacio sobre si mismo, con un cabeceo leve */
          /* los paneles miran siempre mas o menos a la camara, con un vaiven lento,
             asi se leen las alas y no queda de canto */
          satelite.t.rotation.y = -0.35 + Math.sin(reloj * 0.25) * 0.35;
          satelite.t.rotation.x = 0.55 + Math.sin(reloj * 0.18) * 0.12;
          satelite.t.rotation.z = -0.32 + Math.sin(reloj * 0.3) * 0.12;
          satelite.luz.program.uniforms.uTime.value = reloj;
        }
        lunas.forEach((l) => {
          const a = l.fase + reloj * l.vel;
          l.m.position.set(Math.cos(a) * l.orbita, Math.sin(a) * l.orbita * l.incl, Math.sin(a) * l.orbita);
          l.m.rotation.y = reloj * 0.3;
        });
        nebulosa.program.uniforms.uTime.value = reloj;
        nebulosa.program.uniforms.uMouse.value = [0, 0];

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
    /* ?espacio=N adelanta la escena N segundos: sirve para revisar el choque
       sin esperarlo */
    const salto = Number(new URLSearchParams(location.search).get("espacio")) || 0;
    if (renderer && salto > 0) {
      while (reloj < salto) { reloj += 1 / 60; moverAsteroide(1 / 60); }
    }
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
