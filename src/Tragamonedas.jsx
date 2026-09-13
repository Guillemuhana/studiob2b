import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import confetti from "canvas-confetti";
import {
  Volume2, VolumeX, X, Copy, Check, ArrowRight, ArrowLeft, Sparkles, Info, ShieldCheck, Clock,
  RotateCw, Gift, Layers,
} from "lucide-react";

import {
  PREMIOS, CON_PREMIO, PARADA, RODILLOS, TIRA_LARGO, LINEAS, SALIDA,
  grillaDe, armarTira,
  jugadaGuardada, guardarJugada, crearSonido,
} from "./tragamonedas.js";

/* Los cinco rodillos paran escalonados de izquierda a derecha: el ultimo
   tarda el doble que el primero, que es de donde sale el suspenso de una
   maquina de verdad. */
const FRENOS = [2100, 2620, 3140, 3680, 4300];

/* ANTICIPACION. Cuando los primeros cuatro rodillos ya muestran el mismo
   simbolo en la linea que paga, el quinto tarda el doble y la maquina lo
   marca. Es el truco con el que un casino estira el suspenso, y no es una
   trampa: se dispara con la grilla que ya decidio el servidor, no se fabrica
   un casi-premio que no paso. Pasa en todo premio -los cinco son iguales- y
   en las jugadas perdidas que salieron con cuatro repetidos. */
const ESPERA_ANSIA = 2300;

const detectarAnsia = (grilla) => {
  const s0 = grilla[0][1];
  return [0, 1, 2, 3].every((i) => grilla[i][1] === s0);
};

const frenosDe = (ansia) =>
  ansia ? FRENOS.map((f, i) => (i === RODILLOS - 1 ? f + ESPERA_ANSIA : f)) : FRENOS;

/* El premio y el codigo los decide el servidor (api/jugar.js -> Postgres).
   Aca solo se pide y se muestra: si el sorteo viviera en el navegador,
   cualquiera se fabrica el premio mayor desde el inspector. */
const API = "/api/jugar";

/* La llave de prueba entra una sola vez por la URL (?libre=...) y se queda en
   sessionStorage: asi se puede navegar el sitio sin arrastrarla en la barra de
   direcciones, y se va sola al cerrar la pestana. Sin llave valida el servidor
   la ignora, asi que compartir el link no regala jugadas. */
const LLAVE_LIBRE = "s2b-libre";

function llaveDePrueba() {
  try {
    const u = new URLSearchParams(location.search).get("libre");
    if (u) sessionStorage.setItem(LLAVE_LIBRE, u);
    return u || sessionStorage.getItem(LLAVE_LIBRE) || "";
  } catch {
    return "";
  }
}

async function pedirJugada(metodo) {
  const llave = llaveDePrueba();
  const r = await fetch(API, {
    method: metodo,
    headers: llave
      ? { Accept: "application/json", "x-sb2b-libre": llave }
      : { Accept: "application/json" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error("api " + r.status);
  return r.json();
}

const premioDe = (id) => PREMIOS.find((p) => (p.id || "nada") === id) || PREMIOS[PREMIOS.length - 1];
const TOPE = 3;

/* Las monedas que rodean el gabinete. Van escritas a mano y no sorteadas:
   sorteadas en cada pintado saltarian de lugar con cada giro. */
const MONEDAS = [
  { left: "-3%", top: "5%", width: "62px", "--giro": "-18deg", "--demora": "0s" },
  { left: "1%", top: "60%", width: "46px", "--giro": "12deg", "--demora": ".9s" },
  { left: "-4%", top: "85%", width: "72px", "--giro": "24deg", "--demora": "1.7s" },
  { right: "-3%", top: "10%", width: "54px", "--giro": "16deg", "--demora": ".4s" },
  { right: "0%", top: "52%", width: "68px", "--giro": "-22deg", "--demora": "1.3s" },
  { right: "-2%", top: "87%", width: "44px", "--giro": "8deg", "--demora": "2.1s" },
  { left: "-5%", top: "34%", width: "40px", "--giro": "-10deg", "--demora": "1.1s" },
  { right: "-5%", top: "32%", width: "52px", "--giro": "20deg", "--demora": ".2s" },
];
const COLORES = ["#6D4AFF", "#A78CFF", "#C9B6FF", "#FFC53D", "#FFFFFF"];

/* ================= los simbolos =================
   Dibujados como vectores en vez de fotos bajadas de algun lado: pesan cero,
   se ven nitidos en cualquier pantalla, entran en la paleta del sitio y no
   arrastran la licencia de nadie. El unico bitmap es el logo, que es tuyo.

   Lo que los hace parecer objetos y no iconos son tres cosas, y estan en los
   seis: la pieza se parte en caras con luz distinta -no un relleno plano-,
   cada cara lleva su brillo especular arriba a la izquierda, que es de donde
   viene la luz, y los bordes tienen un filo claro contra el fondo oscuro. */

function Defs() {
  return (
    <svg className="s2b-tm-defs" aria-hidden="true" focusable="false">
      <defs>
        {/* diamante: mesa, corona y pabellon, cada uno con su luz */}
        <linearGradient id="tmDiaMesa" x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset=".5" stopColor="#C9F3FF" /><stop offset="1" stopColor="#7FD8FA" />
        </linearGradient>
        <linearGradient id="tmDiaCorona" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A6E6FF" /><stop offset="1" stopColor="#3E9FE0" />
        </linearGradient>
        <linearGradient id="tmDiaCoronaB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#63BEF0" /><stop offset="1" stopColor="#2A6FC4" />
        </linearGradient>
        <linearGradient id="tmDiaPabCentro" x1=".5" y1="0" x2=".5" y2="1">
          <stop offset="0" stopColor="#BEEDFF" /><stop offset=".55" stopColor="#4EA8E8" /><stop offset="1" stopColor="#1B4FA8" />
        </linearGradient>
        <linearGradient id="tmDiaPabLado" x1=".5" y1="0" x2=".5" y2="1">
          <stop offset="0" stopColor="#4C9EDC" /><stop offset="1" stopColor="#12337A" />
        </linearGradient>

        {/* oro: tres caras del lingote y el metal de la moneda */}
        <linearGradient id="tmOroTapa" x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#FFF9DF" /><stop offset=".45" stopColor="#FFDE7A" /><stop offset="1" stopColor="#E8AE2E" />
        </linearGradient>
        <linearGradient id="tmOroFrente" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0C24F" /><stop offset="1" stopColor="#9A6208" />
        </linearGradient>
        <linearGradient id="tmOroLado" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C98F18" /><stop offset="1" stopColor="#6E4204" />
        </linearGradient>
        <radialGradient id="tmMonMetal" cx=".34" cy=".28" r=".82">
          <stop offset="0" stopColor="#FFF6CE" /><stop offset=".42" stopColor="#F7CF62" /><stop offset=".78" stopColor="#D3980F" /><stop offset="1" stopColor="#8C5C05" />
        </radialGradient>
        <radialGradient id="tmMonCara" cx=".36" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFF3C0" /><stop offset=".6" stopColor="#F0C24F" /><stop offset="1" stopColor="#B87D0C" />
        </radialGradient>

        {/* rayo: cuerpo caliente y nucleo casi blanco */}
        <linearGradient id="tmRayoCuerpo" x1=".2" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#FFF7CB" /><stop offset=".38" stopColor="#FFD23D" /><stop offset=".75" stopColor="#FF9A1C" /><stop offset="1" stopColor="#E5560B" />
        </linearGradient>
        <linearGradient id="tmRayoNucleo" x1=".5" y1="0" x2=".5" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#FFE9A0" />
        </linearGradient>

        {/* chip: cuerpo, patas metalicas y el nucleo encendido */}
        <linearGradient id="tmChipCuerpo" x1=".1" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#4C3A86" /><stop offset=".5" stopColor="#2A1D5C" /><stop offset="1" stopColor="#150E36" />
        </linearGradient>
        <linearGradient id="tmChipPata" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2ECFF" /><stop offset=".5" stopColor="#B9A7E8" /><stop offset="1" stopColor="#6A5AA0" />
        </linearGradient>
        <radialGradient id="tmChipNucleo" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#E7DBFF" /><stop offset=".5" stopColor="#9A72FF" /><stop offset="1" stopColor="#4B21C9" />
        </radialGradient>

        {/* estrella: dos caras por punta, para que tenga arista */}
        <linearGradient id="tmEstClara" x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#FFE27A" />
        </linearGradient>
        <linearGradient id="tmEstOscura" x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor="#F3BE3C" /><stop offset="1" stopColor="#B4740A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* el destello que llevan casi todos: cruz de cuatro puntas, el guino que
   usan los juegos para decir "esto brilla" */
const Destello = ({ x, y, r, o = 0.95 }) => (
  <path
    d={`M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`}
    fill="#FFFFFF"
    opacity={o}
  />
);

const DIBUJOS = {
  /* Brillante de talla redonda: mesa arriba, corona en el medio y pabellon
     bajando a la punta. Las caras del pabellon alternan claro y oscuro, que
     es lo que hace que se lea como piedra y no como triangulo celeste. */
  diamante: (
    <svg viewBox="0 0 64 64">
      <path d="M4 24 L14 11 H50 L60 24 L32 61 Z" fill="#0B2B52" />
      <path d="M4 24 L20 24 L32 61 Z" fill="url(#tmDiaPabLado)" />
      <path d="M44 24 L60 24 L32 61 Z" fill="url(#tmDiaPabLado)" />
      <path d="M20 24 H44 L32 61 Z" fill="url(#tmDiaPabCentro)" />
      <path d="M4 24 L14 11 L26 11 L20 24 Z" fill="url(#tmDiaCorona)" />
      <path d="M60 24 L50 11 L38 11 L44 24 Z" fill="url(#tmDiaCoronaB)" />
      <path d="M20 24 L26 11 H38 L44 24 Z" fill="url(#tmDiaMesa)" />
      <path d="M4 24 H60" stroke="#EAF9FF" strokeOpacity=".75" strokeWidth="1.6" fill="none" />
      <path d="M4 24 L14 11 H50 L60 24 L32 61 Z" fill="none" stroke="#DFF6FF" strokeOpacity=".5" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M26 13.5 h9 l-2.5 7 h-9 Z" fill="#FFFFFF" opacity=".55" />
      <Destello x={47} y={17} r={6} o={0.9} />
    </svg>
  ),

  /* Lingote de verdad: el frente se ensancha hacia abajo. Con el frente
     recto parecia una caja de carton; es esa inclinacion, y no el color, lo
     que dice "lingote". */
  lingote: (
    <svg viewBox="0 0 64 64">
      <path d="M18 27 L46 27 L54 49 L10 49 Z" fill="#5A3703" opacity=".5" transform="translate(1.5,2)" />
      <path d="M18 27 L28 18 L56 18 L46 27 Z" fill="url(#tmOroTapa)" />
      <path d="M18 27 L46 27 L54 49 L10 49 Z" fill="url(#tmOroFrente)" />
      <path d="M46 27 L56 18 L60 38 L54 49 Z" fill="url(#tmOroLado)" />
      <path d="M18 27 L28 18 L56 18 L46 27 Z" fill="none" stroke="#FFF9E2" strokeOpacity=".85" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M18 27 L46 27 L56 18" fill="none" stroke="#7A4A08" strokeOpacity=".5" strokeWidth="1.2" />
      <path d="M22 25.5 L30 20 L48 20 L41 25.5 Z" fill="#FFFEF4" opacity=".6" />
      <path d="M20 31 L45 31 L46.6 36 L18.6 36 Z" fill="#FFF3CC" opacity=".28" />
      <rect x="23" y="39" width="18" height="3.6" rx="1.8" fill="#8A5A08" opacity=".45" />
      <rect x="23" y="38.4" width="18" height="2.4" rx="1.2" fill="#FFF3CC" opacity=".45" />
      <Destello x={52} y={24} r={5.5} o={0.85} />
    </svg>
  ),

  /* Moneda con canto: el anillo exterior mas oscuro le da espesor, las
     muescas del borde la vuelven metal y el signo va estampado -sombra
     abajo, luz arriba- en vez de dibujado encima. */
  moneda: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="33.5" r="27" fill="#7A4E04" opacity=".55" />
      <circle cx="32" cy="32" r="27" fill="url(#tmMonMetal)" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#8C5C05" strokeOpacity=".6" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="24.4" fill="none" stroke="#6E4204" strokeOpacity=".55" strokeWidth="4"
        strokeDasharray="2.2 3.4" />
      <circle cx="32" cy="32" r="21.5" fill="url(#tmMonCara)" />
      <circle cx="32" cy="32" r="21.5" fill="none" stroke="#FFF6CE" strokeOpacity=".65" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="17.5" fill="none" stroke="#8C5C05" strokeOpacity=".35" strokeWidth="1.1" />
      <g strokeLinecap="round" fill="none">
        <path d="M32 18.5v27M38.6 25c-1.8-2.7-4.4-3.8-7.2-3.8-3.6 0-6.3 1.9-6.3 5 0 6.3 13.5 4.5 13.5 10.8 0 3.2-2.7 5-6.3 5-3.1 0-5.8-1.4-7.2-3.8"
          stroke="#6B3F06" strokeOpacity=".7" strokeWidth="4.6" transform="translate(0,1.3)" />
        <path d="M32 18.5v27M38.6 25c-1.8-2.7-4.4-3.8-7.2-3.8-3.6 0-6.3 1.9-6.3 5 0 6.3 13.5 4.5 13.5 10.8 0 3.2-2.7 5-6.3 5-3.1 0-5.8-1.4-7.2-3.8"
          stroke="#FFF4CE" strokeWidth="4.2" />
      </g>
      <path d="M14 24 A21.5 21.5 0 0 1 30 13" fill="none" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="3.4" strokeLinecap="round" />
      <Destello x={49} y={16} r={6} o={0.9} />
    </svg>
  ),

  /* Rayo con nucleo: el cuerpo caliente afuera y una veta casi blanca
     adentro, que es lo que lo hace ver encendido y no amarillo. */
  rayo: (
    <svg viewBox="0 0 64 64">
      <path d="M38 2 L12 35 h13.5 L20 62 L52 27 H36 Z" fill="#7A2B00" opacity=".5" transform="translate(1.5,2)" />
      <path d="M38 2 L12 35 h13.5 L20 62 L52 27 H36 Z" fill="url(#tmRayoCuerpo)" />
      <path d="M38 2 L12 35 h13.5 L20 62 L52 27 H36 Z" fill="none" stroke="#FFF6CF" strokeOpacity=".75" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M36.5 10 L20.5 31 h9 L25 52 L44 29.5 h-11 Z" fill="url(#tmRayoNucleo)" opacity=".9" />
      <Destello x={45} y={12} r={5.5} o={0.9} />
    </svg>
  ),

  /* Chip: cuerpo con bisel, patas metalicas de verdad -degrade vertical, no
     una linea- y el nucleo encendido adentro. */
  chip: (
    <svg viewBox="0 0 64 64">
      <g fill="url(#tmChipPata)">
        <rect x="21" y="5" width="5" height="12" rx="2" />
        <rect x="29.5" y="5" width="5" height="12" rx="2" />
        <rect x="38" y="5" width="5" height="12" rx="2" />
        <rect x="21" y="47" width="5" height="12" rx="2" />
        <rect x="29.5" y="47" width="5" height="12" rx="2" />
        <rect x="38" y="47" width="5" height="12" rx="2" />
        <rect x="5" y="21" width="12" height="5" rx="2" />
        <rect x="5" y="29.5" width="12" height="5" rx="2" />
        <rect x="5" y="38" width="12" height="5" rx="2" />
        <rect x="47" y="21" width="12" height="5" rx="2" />
        <rect x="47" y="29.5" width="12" height="5" rx="2" />
        <rect x="47" y="38" width="12" height="5" rx="2" />
      </g>
      <rect x="13" y="13" width="38" height="38" rx="7" fill="#0A0620" opacity=".6" transform="translate(1.5,2)" />
      <rect x="13" y="13" width="38" height="38" rx="7" fill="url(#tmChipCuerpo)" />
      <rect x="13" y="13" width="38" height="38" rx="7" fill="none" stroke="#CFC0FF" strokeOpacity=".55" strokeWidth="1.4" />
      <path d="M16 20 a4 4 0 0 1 4-4 h24" fill="none" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
      <rect x="23" y="23" width="18" height="18" rx="4" fill="url(#tmChipNucleo)" />
      <rect x="23" y="23" width="18" height="18" rx="4" fill="none" stroke="#E7DBFF" strokeOpacity=".6" strokeWidth="1" />
      <circle cx="19" cy="19" r="1.8" fill="#CFC0FF" opacity=".8" />
      <Destello x={44} y={19} r={4.5} o={0.75} />
    </svg>
  ),

  /* Otro intento: la flecha que vuelve. No es un simbolo de rodillo, solo
     sirve para mostrar el premio en la marquesina y en la tabla. */
  giro: (
    <svg viewBox="0 0 64 64">
      <path d="M32 9 A23 23 0 1 1 12.5 20.5" fill="none" stroke="#7A4E04" strokeOpacity=".5"
        strokeWidth="8.5" strokeLinecap="round" transform="translate(1.2,2)" />
      <path d="M32 9 A23 23 0 1 1 12.5 20.5" fill="none" stroke="url(#tmOroTapa)"
        strokeWidth="7.5" strokeLinecap="round" />
      <path d="M32 9 A23 23 0 1 1 12.5 20.5" fill="none" stroke="#FFFDF0" strokeOpacity=".55"
        strokeWidth="2.4" strokeLinecap="round" />
      <path d="M31 1 L45 9.5 L31 18 Z" fill="#7A4E04" opacity=".5" transform="translate(1.2,2)" />
      <path d="M31 1 L45 9.5 L31 18 Z" fill="url(#tmOroTapa)" stroke="#FFF9E2" strokeOpacity=".7" strokeWidth="1.2" strokeLinejoin="round" />
      <Destello x={48} y={44} r={5.5} o={0.85} />
    </svg>
  ),

  /* Estrella facetada: cada punta partida en dos caras, una a la luz y otra
     a la sombra. Una estrella de un solo color es una calcomania. */
  estrella: (
    <svg viewBox="0 0 64 64">
      <path d="M32 4 L39.1 22.3 L58.6 23.3 L43.4 35.7 L48.5 54.7 L32 44 L15.5 54.7 L20.6 35.7 L5.4 23.3 L24.9 22.3 Z"
        fill="#7A4E04" opacity=".5" transform="translate(1.2,2)" />
      <g>
        <path d="M32 32 L32 4 L39.1 22.3 Z" fill="url(#tmEstClara)" />
        <path d="M32 32 L39.1 22.3 L58.6 23.3 Z" fill="url(#tmEstOscura)" />
        <path d="M32 32 L58.6 23.3 L43.4 35.7 Z" fill="url(#tmEstClara)" />
        <path d="M32 32 L43.4 35.7 L48.5 54.7 Z" fill="url(#tmEstOscura)" />
        <path d="M32 32 L48.5 54.7 L32 44 Z" fill="url(#tmEstClara)" />
        <path d="M32 32 L32 44 L15.5 54.7 Z" fill="url(#tmEstOscura)" />
        <path d="M32 32 L15.5 54.7 L20.6 35.7 Z" fill="url(#tmEstClara)" />
        <path d="M32 32 L20.6 35.7 L5.4 23.3 Z" fill="url(#tmEstOscura)" />
        <path d="M32 32 L5.4 23.3 L24.9 22.3 Z" fill="url(#tmEstClara)" />
        <path d="M32 32 L24.9 22.3 L32 4 Z" fill="url(#tmEstOscura)" />
      </g>
      <path d="M32 4 L39.1 22.3 L58.6 23.3 L43.4 35.7 L48.5 54.7 L32 44 L15.5 54.7 L20.6 35.7 L5.4 23.3 L24.9 22.3 Z"
        fill="none" stroke="#FFF6D2" strokeOpacity=".7" strokeWidth="1.3" strokeLinejoin="round" />
      <Destello x={48} y={14} r={5} o={0.85} />
    </svg>
  ),
};

/* El dibujo de una linea de pago: una grilla de 5x3 con el camino marcado.
   En la tabla dice mas que cualquier texto. */
function Forma({ linea }) {
  return (
    <svg className="s2b-tm-forma" viewBox="0 0 50 30" aria-hidden="true">
      {[0, 1, 2].map((f) =>
        [0, 1, 2, 3, 4].map((i) => (
          <rect key={f + "-" + i} x={i * 10 + 1.5} y={f * 10 + 1.5} width="7" height="7" rx="1.6"
            fill={linea.filas[i] === f ? "#F9D858" : "rgba(249,216,88,.18)"} />
        ))
      )}
      <polyline points={linea.filas.map((f, i) => `${i * 10 + 5},${f * 10 + 5}`).join(" ")}
        fill="none" stroke="#FFF6D0" strokeOpacity=".8" strokeWidth="1.2" />
    </svg>
  );
}

function Simbolo({ id }) {
  if (id === "logo") {
    return (
      <span className="s2b-tm-sim s2b-tm-sim--logo">
        <img src="/logo.png" alt="" aria-hidden="true" />
      </span>
    );
  }
  return <span className={"s2b-tm-sim s2b-tm-sim--" + id}>{DIBUJOS[id]}</span>;
}

/* ================= la maquina ================= */

export default function Tragamonedas({ t, waLink, irA }) {
  const reducido = useReducedMotion();

  const guardada = useMemo(jugadaGuardada, []);
  const premioGuardado = useMemo(
    () => (guardada ? PREMIOS.find((p) => (p.id || "nada") === guardada.premio) : null),
    [guardada]
  );

  const [tiras, setTiras] = useState(() => {
    const base = premioGuardado
      ? grillaDe(premioGuardado)
      : [["lingote", "diamante", "logo"], ["estrella", "moneda", "diamante"],
         ["rayo", "logo", "moneda"], ["moneda", "lingote", "chip"],
         ["diamante", "estrella", "rayo"]];
    return base.map((col) => armarTira(col));
  });
  const [pos, setPos] = useState(() => Array(RODILLOS).fill(PARADA));
  const [anim, setAnim] = useState(false);
  const [rodando, setRodando] = useState(() => Array(RODILLOS).fill(false));
  /* los tiempos de esta jugada: cambian si hay anticipacion */
  const [frenos, setFrenos] = useState(FRENOS);
  const [ansia, setAnsia] = useState(false);
  const [fase, setFase] = useState("listo");
  const [restantes, setRestantes] = useState(TOPE);
  const [ganados, setGanados] = useState([]);
  const [libre, setLibre] = useState(false);
  /* El tope vive en la base (sb2b_config_num). Si esta abierto, el servidor
     devuelve un numero grande y no tiene sentido mostrar "9999 / 3": se
     muestra el infinito, igual que en modo prueba. */
  const sinTope = libre || restantes > TOPE * 4;
  const [resultado, setResultado] = useState(
    premioGuardado ? { premio: premioGuardado, codigo: guardada.codigo } : null
  );
  const [sincronizado, setSincronizado] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [sonando, setSonando] = useState(true);
  const [error, setError] = useState("");
  /* Perder no abre ventana: frenar una maquina para decirte que no ganaste es
     castigar al que sigue jugando. Queda un aviso corto abajo de los rodillos
     que se va solo. */
  const [aviso, setAviso] = useState("");
  /* que linea pago, para poder dibujarla encima de los rodillos */
  const [lineaGana, setLineaGana] = useState(null);
  const [golpe, setGolpe] = useState(false);

  const relojes = useRef([]);
  const cortarSonido = useRef(null);
  const audio = useRef(null);
  const montado = useRef(true);

  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
      relojes.current.forEach(clearTimeout);
      /* el giro esta programado de una vez en el reloj del audio, asi que si
         alguien se va a mitad de la corrida hay que apagarlo a mano */
      if (cortarSonido.current) cortarSonido.current();
    };
  }, []);

  /* La copia de localStorage sirve para pintar rapido, pero la verdad la tiene
     el servidor: si ahi no consta la jugada -otro navegador, otra maquina- la
     persona puede jugar, y si consta, no importa lo que diga el navegador. */
  useEffect(() => {
    let vivo = true;
    pedirJugada("GET")
      .then((d) => {
        if (!vivo || !montado.current) return;
        setSincronizado(true);
        setLibre(!!d.libre);
        setRestantes(typeof d.restantes === "number" ? d.restantes : TOPE);
        setGanados((d.jugadas || []).filter((j) => j.codigo));
        const ultima = (d.jugadas || [])[d.jugadas.length - 1];
        if (ultima) {
          const premio = premioDe(ultima.premio);
          setResultado({ premio, codigo: ultima.codigo });
          setTiras(grillaDe(premio).map((col) => armarTira(col)));
          setPos(Array(RODILLOS).fill(PARADA));
          guardarJugada(premio, ultima.codigo);
        }
        setFase("listo");
      })
      .catch(() => {
        /* sin API la maquina sigue jugable, pero el premio no queda
           registrado: se avisa recien si falla el giro */
      });
    return () => { vivo = false; };
  }, []);

  const son = useCallback((fn, ...args) => {
    if (!sonando || reducido) return undefined;
    try {
      if (!audio.current) audio.current = crearSonido();
      return audio.current[fn](...args);
    } catch {
      /* si el navegador no deja sonar, la maquina anda igual */
      return undefined;
    }
  }, [sonando, reducido]);

  const festejar = useCallback((alto) => {
    if (reducido) return;
    const tiro = (x, angulo, n) =>
      confetti({
        particleCount: n, spread: alto ? 95 : 68, startVelocity: alto ? 55 : 40,
        origin: { x, y: 0.62 }, angle: angulo, colors: COLORES, zIndex: 130, scalar: alto ? 1.1 : 0.9,
        disableForReducedMotion: true,
      });
    tiro(0.2, 60, alto ? 90 : 45);
    setTimeout(() => tiro(0.8, 120, alto ? 90 : 45), 160);
    if (alto) setTimeout(() => tiro(0.5, 90, 120), 420);
  }, [reducido]);

  const girar = useCallback(async () => {
    if (fase !== "listo") return;

    setFase("girando");
    setResultado(null);
    setError("");
    setAviso("");
    setLineaGana(null);
    son("palanca");

    /* Se le pide el resultado al servidor antes de mover nada: los rodillos
       tienen que frenar donde diga la base, no al reves. El viaje es corto y
       el boton ya dice GIRANDO, asi que no se siente la espera. */
    let datos;
    try {
      datos = await pedirJugada("POST");
    } catch {
      if (!montado.current) return;
      setFase("listo");
      setError(t(
        "No pudimos conectar con la máquina. Probá de nuevo en un momento.",
        "We couldn't reach the machine. Please try again in a moment."
      ));
      return;
    }
    if (!montado.current) return;

    if (datos.agotado) {
      setFase("listo");
      setRestantes(0);
      setError(t(
        "Ya usaste las 3 jugadas de esta conexión.",
        "You've used all 3 spins from this connection."
      ));
      return;
    }

    const premio = premioDe(datos.premio);
    const codigo = datos.codigo || null;
    setLibre(!!datos.libre);
    setRestantes(typeof datos.restantes === "number" ? datos.restantes : 0);

    const grilla = grillaDe(premio);
    const hayAnsia = !reducido && detectarAnsia(grilla);
    const tiempos = reducido ? [120, 140, 160, 180, 200] : frenosDe(hayAnsia);
    setFrenos(tiempos);
    const linea = premio.simbolo
      ? LINEAS[0]
      : premio.id === "giro"
        ? LINEAS.find((l) => l.filas.every((f, i) => grilla[i][f] === grilla[0][l.filas[0]]) && l.id !== "centro")
        : null;
    const nuevas = grilla.map((col) => armarTira(col));

    setTiras(nuevas);
    setAnim(false);
    setPos(Array(RODILLOS).fill(0));
    setRodando(Array(RODILLOS).fill(true));
    setAnsia(false);
    if (cortarSonido.current) cortarSonido.current();
    cortarSonido.current = son("rodando", tiempos) || null;

    /* Se limpian los relojes de la jugada anterior ACA, antes de programar los
       de esta. Estaba despues, y lo primero que hacia era cancelar el
       temporizador de la anticipacion que se acababa de programar. */
    relojes.current.forEach(clearTimeout);
    relojes.current = [];

    /* el momento en que quedan cuatro iguales y falta uno */
    if (hayAnsia) {
      relojes.current.push(setTimeout(() => montado.current && setAnsia(true), FRENOS[RODILLOS - 2] + 120));
    }

    /* dos cuadros de espera: uno para que el navegador pinte los rodillos
       arriba de todo sin transicion, y recien ahi se enciende la animacion */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!montado.current) return;
      setAnim(true);
      setPos(Array(RODILLOS).fill(PARADA));
    }));

    /* el desenfoque se apaga ANTES de la frenada, no despues: un rodillo se
       va aclarando mientras desacelera, y si se limpia recien al parar la
       nitidez llega tarde */
    relojes.current = relojes.current.concat(tiempos.map((ms, i) =>
      setTimeout(() => {
        if (!montado.current) return;
        setRodando((r) => r.map((v, j) => (j === i ? false : v)));
      }, reducido ? 60 * (i + 1) : Math.max(0, ms - 480))
    ));

    /* el sacudon del gabinete cuando para el ultimo */
    relojes.current.push(setTimeout(() => {
      if (!montado.current) return;
      setAnsia(false);
      setGolpe(true);
      relojes.current.push(setTimeout(() => montado.current && setGolpe(false), 420));
    }, reducido ? 260 : tiempos[RODILLOS - 1]));

    relojes.current.push(setTimeout(() => {
      if (!montado.current) return;
      setResultado({ premio, codigo });
      setFase("listo");
      guardarJugada(premio, codigo);
      if (codigo) setGanados((g) => [...g, { premio: premio.id, codigo, canjeado: false }]);

      setLineaGana(linea || null);

      if (premio.id === "giro") {
        /* devolver la jugada no merece frenar la maquina con una ventana:
           alcanza con el cartel y la linea cruzada encendida */
        son("gano", false);
        festejar(false);
        setAviso(t("¡Otro intento! Esta jugada no te la contamos.", "Another spin! This one is on us."));
        relojes.current.push(setTimeout(() => montado.current && setAviso(""), 4200));
      } else if (premio.id) {
        setAbierto(true);
        son("gano", premio.id === "logo");
        festejar(premio.id === "logo" || premio.id === "diamante");
      } else {
        son("perdio");
        setAviso(t("Esta vez no salió. Probá de nuevo.", "Not this time. Give it another spin."));
        relojes.current.push(setTimeout(() => montado.current && setAviso(""), 3600));
      }
    }, (reducido ? 260 : tiempos[RODILLOS - 1]) + 420));
  }, [fase, son, festejar, reducido, t]);

  /* Con el premio abierto el fondo se queda quieto: en el celular, si no, el
     dedo mueve la pagina de atras y la tarjeta parece trabada. Se guarda el
     valor anterior en vez de asumir que era "", que es como se rompe el
     scroll cuando dos cosas hacen lo mismo. */
  useEffect(() => {
    if (!abierto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = antes; };
  }, [abierto]);

  const copiar = async () => {
    if (!resultado?.codigo) return;
    try {
      await navigator.clipboard.writeText(resultado.codigo);
      setCopiado(true);
      setTimeout(() => montado.current && setCopiado(false), 1800);
    } catch {
      /* queda a la vista para copiarlo a mano */
    }
  };

  const mensajeWa = (r) =>
    r?.codigo
      ? `Hola Studio B2B, jugué en la web y gané ${r.premio.es}. Mi código es ${r.codigo}.`
      : "Hola Studio B2B, jugué en la web y quiero mi diagnóstico gratuito.";

  const ganador = resultado?.premio?.id;

  return (
    <>
      <style>{CSS_TM}</style>
      <Defs />

      <div className="s2b-band s2b-band--dark s2b-tm-band" id="jugar">
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap">

            <div className="s2b-tm-top">
              <div className="s2b-eyebrow">{t("Casino Studio B2B", "Studio B2B Casino")}</div>
              <h2 className="s2b-h2 s2b-tm-h2">
                {t("Girá y", "Spin and")} <b>{t("llevate tu descuento", "take your discount")}</b>
              </h2>
              <p className="s2b-lead s2b-tm-lead">
                {t(
                  "Sin registro y sin pagar nada. Si salen los cinco símbolos iguales en la línea del medio, el premio es tuyo y lo usás en tu próximo proyecto con nosotros.",
                  "No sign-up and nothing to pay. Five matching symbols on the middle line and the prize is yours, to use on your next project with us."
                )}
              </p>
            </div>

            {/* la tira de premios, como el cartel de arriba de una maquina */}
            <div className="s2b-tm-marquesina">
              {CON_PREMIO.map((p, i) => (
                <motion.div
                  key={p.id}
                  className={"s2b-tm-jack s2b-tm-jack--" + p.id + (ganador === p.id ? " is-ganado" : "")}
                  initial={reducido ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <span className="s2b-tm-jack-rango">{p.rango}</span>
                  <span className="s2b-tm-jack-monto">{p.monto}</span>
                  <Simbolo id={p.simbolo || p.icono} />
                </motion.div>
              ))}
            </div>

            {/* el mueble */}
            <div className="s2b-tm-escena">
              {/* las monedas van por delante del gabinete, no adentro */}
              <div className="s2b-tm-monedas" aria-hidden="true">
                {MONEDAS.map((m, i) => (
                  <span key={i} className="s2b-tm-moneda" style={m}>
                    <Simbolo id="moneda" />
                  </span>
                ))}
              </div>

              <div className="s2b-tm-tilt">
                <div className={"s2b-tm-mueble"
                  + (fase === "girando" ? " is-girando" : "")
                  + (ansia ? " is-ansia" : "")
                  + (golpe ? " is-golpe" : "")}>
                  <div className="s2b-tm-cuerpo">

                    {/* la barra de arriba, como el HUD de una maquina: en vez de
                        saldo y apuesta -que aca no existen- lleva las jugadas
                        que quedan y el premio mayor */}
                    <div className="s2b-tm-hud">
                      <button className="s2b-tm-hud-btn" onClick={() => irA("home")}>{t("INICIO", "HOME")}</button>
                      <span className="s2b-tm-hud-saldo">
                        <Simbolo id="moneda" />
                        <b>{sinTope ? "∞" : restantes}</b>
                        <small>{libre ? t("modo prueba", "test mode") : t("jugadas", "spins")}</small>
                      </span>
                      <span className="s2b-tm-hud-jack">
                        <Simbolo id="logo" />
                        <em>{t("GRAN PREMIO", "JACKPOT")}</em>
                        <b>30%</b>
                      </span>
                      <button
                        className="s2b-tm-hud-ico"
                        onClick={() => setSonando((v) => {
                          if (v && cortarSonido.current) cortarSonido.current();
                          return !v;
                        })}
                        aria-pressed={sonando}
                        aria-label={sonando ? t("Silenciar", "Mute") : t("Activar sonido", "Unmute")}
                      >
                        {sonando ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      </button>
                      <button
                        className="s2b-tm-hud-ico"
                        onClick={() => document.querySelector(".s2b-tm-tabla")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                        aria-label={t("Ver la tabla de premios", "See the prize table")}
                      >
                        <Info size={16} />
                      </button>
                    </div>

                    <div className="s2b-tm-rodillos">
                      <div className="s2b-tm-rayos" aria-hidden="true" />
                      <div className="s2b-tm-riel s2b-tm-riel--izq" aria-hidden="true" />
                      <div className="s2b-tm-riel s2b-tm-riel--der" aria-hidden="true" />
                      <div className="s2b-tm-ventanas">
                        <div className="s2b-tm-linea" aria-hidden="true" />
                        {/* la linea que pago, dibujada por los centros de las
                            celdas. El vector-effect mantiene el grosor aunque
                            el viewBox se estire distinto en cada eje. */}
                        {lineaGana && fase !== "girando" && (
                          <svg className="s2b-tm-trazo" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polyline
                              points={lineaGana.filas.map((f, i) => `${(i + 0.5) * 20},${(f + 0.5) * (100 / 3)}`).join(" ")}
                              fill="none" vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        )}
                        {/* las columnas que separan rodillo de rodillo: van por
                            encima y no como gap, para que caigan justo en el
                            borde de cada ventana */}
                        {[1, 2, 3, 4].map((n) => (
                          <span key={n} className="s2b-tm-pilar" style={{ left: n * 20 + "%" }} aria-hidden="true" />
                        ))}
                        {tiras.map((tira, i) => (
                          <div
                            className={"s2b-tm-ventana" + (ansia && i === RODILLOS - 1 ? " is-ansia" : "")}
                            key={i}
                          >
                            <div
                              className={"s2b-tm-tira" + (rodando[i] ? " is-rodando" : "")}
                              style={{
                                /* porcentaje del alto de la propia tira, no px:
                                   asi la maquina escala con la pantalla sin que
                                   haya que recalcular nada */
                                transform: `translateY(-${(pos[i] / TIRA_LARGO) * 100}%)`,
                                /* la curva se pasa del 1 y vuelve: es el rebote
                                 del rodillo contra su tope. El retraso de
                                 salida se le descuenta al giro para que la
                                 frenada caiga igual donde tiene que caer. */
                              transition: anim
                                  ? `transform ${(reducido ? 120 : frenos[i] - SALIDA[i]) / 1000}s cubic-bezier(.13,.74,.26,1.11) ${(reducido ? 0 : SALIDA[i]) / 1000}s`
                                  : "none",
                              }}
                            >
                              {tira.map((sim, k) => (
                                <div
                                  className={"s2b-tm-celda" +
                                    (lineaGana && fase !== "girando" && k === PARADA + lineaGana.filas[i] ? " is-premiada" : "")}
                                  key={k}
                                ><Simbolo id={sim} /></div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* la botonera de abajo: las mismas cajas que una maquina,
                        pero diciendo la verdad, porque aca no hay apuesta ni
                        saldo que mover */}
                    <div className="s2b-tm-barra">
                      <div className="s2b-tm-caja">
                        <small>{t("JUGADAS", "SPINS")}</small>
                        <b>{sinTope ? "∞" : `${restantes} / ${TOPE}`}</b>
                      </div>
                      <div className="s2b-tm-caja s2b-tm-caja--win">
                        <small>{t("PREMIO", "WIN")}</small>
                        <b>{resultado?.premio?.id ? resultado.premio.monto : "—"}</b>
                      </div>

                      {/* El boton va metido en su zocalo: el aro de oro y el
                          pozo oscuro se quedan quietos y lo unico que baja al
                          apretar es la tapa. Un circulo suelto que se mueve
                          entero no parece un boton, parece una calcomania. */}
                      <div className={"s2b-tm-zocalo" + (fase === "girando" ? " is-girando" : "")}>
                        {restantes <= 0 && sincronizado && !sinTope ? (
                          <button
                            className="s2b-tm-spin s2b-tm-spin--visto"
                            onClick={() => resultado && setAbierto(true)}
                            disabled={!resultado}
                          >
                            <i className="s2b-tm-spin-brillo" aria-hidden="true" />
                            <Gift className="s2b-tm-spin-ico" aria-hidden="true" />
                            <b>{ganados.length ? t("PREMIOS", "PRIZES") : t("SIN JUGADAS", "NO SPINS")}</b>
                          </button>
                        ) : (
                          <button
                            className={"s2b-tm-spin" + (fase === "girando" ? " is-girando" : "")}
                            onClick={girar}
                            disabled={fase === "girando"}
                            aria-label={t("Girar", "Spin")}
                          >
                            <i className="s2b-tm-spin-brillo" aria-hidden="true" />
                            {/* las flechas dan la vuelta mientras los rodillos giran */}
                            <RotateCw className="s2b-tm-spin-ico" aria-hidden="true" />
                            <b>{fase === "girando" ? "…" : t("GIRAR", "SPIN")}</b>
                          </button>
                        )}
                      </div>
                    </div>

                    {error && <div className="s2b-tm-error" role="alert">{error}</div>}
                    {aviso && !error && (
                      <motion.div
                        className="s2b-tm-aviso"
                        role="status"
                        initial={reducido ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {aviso}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* lo que ya se gano, para que no haya que buscarlo en el chat */}
            {ganados.length > 0 && (
              <div className="s2b-tm-billetera">
                <h3><Sparkles size={15} /> {t("Tus códigos", "Your codes")}</h3>
                {ganados.length > 1 && (
                  <p className="s2b-tm-solouno">
                    <Layers size={14} />
                    {t("No son acumulables: elegí uno. Al canjearlo, los otros quedan anulados.",
                       "They don't stack: pick one. Redeeming it voids the others.")}
                  </p>
                )}
                <ul>
                  {ganados.map((g) => {
                    const p = premioDe(g.premio);
                    return (
                      <li key={g.codigo}>
                        <Simbolo id={p.simbolo} />
                        <span className="s2b-tm-billetera-txt">
                          <b>{t(p.es, p.en)}</b>
                          <code>{g.codigo}</code>
                        </span>
                        {g.canjeado
                          ? <span className="s2b-tm-usado">{t("canjeado", "redeemed")}</span>
                          : <a className="s2b-tm-pedir" href={waLink(`Hola Studio B2B, gané ${p.es} y mi código es ${g.codigo}.`)} target="_blank" rel="noopener noreferrer">
                              {t("Reclamar", "Claim")} <ArrowRight size={14} />
                            </a>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* la tabla, a la vista y no escondida en un pie de pagina */}
            <div className="s2b-tm-abajo">
              <div className="s2b-tm-tabla">
                <h3><Info size={16} /> {t("Qué se puede ganar", "What you can win")}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>{t("Cinco iguales en…", "Five in a row on…")}</th>
                      <th>{t("Premio", "Prize")}</th>
                      <th>{t("Probabilidad", "Odds")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREMIOS.map((p) => (
                      <tr key={p.id || "nada"} className={ganador === p.id && fase === "hecho" ? "is-ganado" : ""}>
                        <td>
                          {p.simbolo ? (
                            <span className="s2b-tm-tres">
                              {Array.from({ length: RODILLOS }).map((_, k) => <Simbolo key={k} id={p.simbolo} />)}
                            </span>
                          ) : p.id === "giro" ? (
                            <span className="s2b-tm-formas">
                              {LINEAS.filter((l) => l.id !== "centro").map((l) => <Forma key={l.id} linea={l} />)}
                            </span>
                          ) : (
                            <span className="s2b-tm-nada">{t("Cualquier otra", "Any other")}</span>
                          )}
                        </td>
                        <td>{t(p.es, p.en)}</td>
                        <td className="s2b-tm-prob">{p.peso}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="s2b-tm-bases">
                <h3><ShieldCheck size={16} /> {t("Cómo funciona", "How it works")}</h3>
                <ul>
                  <li><Clock size={14} /> {sinTope
                    ? t("Por ahora podés girar las veces que quieras: la promoción está abierta.", "For now you can spin as many times as you like: the promotion is open.")
                    : t("Tres jugadas por conexión. Se cuentan en nuestro servidor, así que abrir otra ventana o borrar el historial no suma jugadas.", "Three spins per connection. They are counted on our server, so opening another window or clearing your history won't add more.")}</li>
                  <li><ShieldCheck size={14} /> {t("El sorteo y el código se generan en nuestro servidor, no en tu navegador, y las probabilidades son exactamente las de la tabla.", "The draw and the code are generated on our server, not in your browser, and the odds are exactly the ones in the table.")}</li>
                  <li><Layers size={14} /> {t("Los descuentos NO son acumulables: si ganás más de uno, se usa uno solo. Al canjear el que elijas, los demás quedan anulados.", "Discounts are NOT cumulative: if you win more than one, only one is used. When you redeem the one you pick, the rest are voided.")}</li>
                  <li><Sparkles size={14} /> {t("Cada código es único, se aplica sobre el presupuesto final de un proyecto nuevo y se canjea una sola vez.", "Every code is unique, applies to the final quote of a new project and can be redeemed only once.")}</li>
                  <li><RotateCw size={14} /> {t("Cinco iguales en una línea cruzada devuelven la jugada: no te la contamos.", "Five in a row on a crossed line gives the spin back: it doesn't count.")}</li>
                  <li><ArrowRight size={14} /> {t("Para reclamarlo, mandanos el código por WhatsApp. Vale 30 días desde la jugada.", "To claim it, send us the code on WhatsApp. Valid for 30 days from the spin.")}</li>
                </ul>
                <button className="s2b-link s2b-tm-volver" onClick={() => irA("home")}>
                  <ArrowLeft size={15} /> {t("Volver al inicio", "Back to home")}
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>

      {typeof document !== "undefined" && createPortal(
        <div className="s2b s2b-tm-portal">
          <AnimatePresence>
            {abierto && resultado && (
              <motion.div
                className="s2b-tm-tras"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onMouseDown={(e) => e.target === e.currentTarget && setAbierto(false)}
              >
                <motion.div
                  className={"s2b-tm-premio" + (resultado.premio.id ? " is-gano" : "")}
                  role="dialog" aria-modal="true"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <button className="s2b-tm-x" onClick={() => setAbierto(false)} aria-label={t("Cerrar", "Close")}><X size={19} /></button>

                  {resultado.premio.id && <div className="s2b-tm-halo" aria-hidden="true" />}

                  {/* el contenido va en su propia caja: antes se subia sobre el
                      halo con una regla al hijo directo, y esa regla le pisaba
                      el position:absolute al boton de cerrar */}
                  <div className="s2b-tm-premio-in">
                  {resultado.premio.id ? (
                    <>
                      <div className="s2b-tm-premio-sim"><Simbolo id={resultado.premio.simbolo || resultado.premio.icono} /></div>
                      <span className="s2b-tm-premio-rango">{resultado.premio.rango}</span>
                      <h3 className="s2b-tm-premio-tit">{t(resultado.premio.es, resultado.premio.en)}</h3>
                      <p className="s2b-tm-premio-det">{t(resultado.premio.detalle_es, resultado.premio.detalle_en)}</p>

                      <button className="s2b-tm-codigo" onClick={copiar} title={t("Copiar código", "Copy code")}>
                        <span>{resultado.codigo}</span>
                        {copiado ? <Check size={16} /> : <Copy size={16} />}
                      </button>

                      <a
                        className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-tm-reclamar"
                        href={waLink(mensajeWa(resultado))}
                        target="_blank" rel="noopener noreferrer"
                      >
                        {t("Reclamar por WhatsApp", "Claim on WhatsApp")} <ArrowRight size={16} />
                      </a>
                      <span className="s2b-tm-chico">
                        {t("Guardá el código: vale 30 días.", "Keep the code: valid for 30 days.")}
                        {restantes > 0 && !sinTope && " · " + t(`Te quedan ${restantes} jugadas`, `${restantes} spins left`)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="s2b-tm-premio-sim s2b-tm-premio-sim--nada"><Simbolo id="chip" /></div>
                      <h3 className="s2b-tm-premio-tit">{t(resultado.premio.es, resultado.premio.en)}</h3>
                      <p className="s2b-tm-premio-det">{t(resultado.premio.detalle_es, resultado.premio.detalle_en)}</p>
                      {restantes > 0 ? (
                        <button
                          className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-tm-reclamar"
                          onClick={() => setAbierto(false)}
                        >
                          {t(`Probar de nuevo · te quedan ${restantes}`, `Try again · ${restantes} left`)} <ArrowRight size={16} />
                        </button>
                      ) : (
                        <a
                          className="s2b-btn s2b-btn--chrome s2b-btn--aura s2b-tm-reclamar"
                          href={waLink(mensajeWa(resultado))}
                          target="_blank" rel="noopener noreferrer"
                        >
                          {t("Quiero mi diagnóstico gratis", "I want my free diagnosis")} <ArrowRight size={16} />
                        </a>
                      )}
                    </>
                  )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>
  );
}

/* ================= estilos ================= */

const CSS_TM = `
.s2b-tm-portal { display: contents; }
.s2b-tm-defs { position:absolute; width:0; height:0; overflow:hidden; }

/* La paleta de casino: oro de verdad -cuatro paradas, no un amarillo plano- y
   el terciopelo rojo del gabinete. El violeta de la marca queda de fondo, para
   que la pagina siga siendo de Studio B2B y no de otro lado. */
.s2b-tm-band {
  overflow:hidden;
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  --rojo1:#B8213B; --rojo2:#7A1024; --rojo3:#3D0714; --rojo4:#1E040B;
}
.s2b-tm-band::before {
  content:''; position:absolute; inset:-20% -10% auto -10%; height:130%; pointer-events:none;
  background:
    radial-gradient(760px circle at 50% 40%, rgba(255,180,50,.26), transparent 62%),
    radial-gradient(560px circle at 12% 8%, rgba(216,40,70,.24), transparent 64%),
    conic-gradient(from 200deg at 76% 26%, transparent 0 46%, rgba(109,74,255,.26) 62%, transparent 88%);
  filter: blur(56px);
}
.s2b-tm-top { position:relative; text-align:center; display:grid; justify-items:center; }
.s2b-tm-h2 { max-width:22ch; }
.s2b-tm-lead { margin-left:auto; margin-right:auto; }

/* ---------- simbolos ----------
   Las medidas van en px o en calc() sobre --celda, nunca en porcentaje: un
   alto en % dentro de un grid centrado se resuelve contra el ancho del padre
   y el simbolo terminaba midiendo 326 px en una celda de 116. */
.s2b-tm-sim { position:relative; display:grid; place-items:center; flex:none; }
.s2b-tm-sim > svg, .s2b-tm-sim > img { width:100%; height:100%; object-fit:contain; display:block; }
.s2b-tm-sim > svg { filter: drop-shadow(0 5px 10px rgba(0,0,0,.6)); }

.s2b-tm-sim--logo::before {
  content:''; position:absolute; inset:-16%; border-radius:50%; pointer-events:none;
  background: radial-gradient(circle at 50% 44%, rgba(255,226,150,.8), rgba(255,170,40,.34) 48%, transparent 72%);
}
.s2b-tm-sim--logo > img { position:relative; z-index:1;
  filter: drop-shadow(0 0 9px rgba(255,226,160,.95)) drop-shadow(0 4px 9px rgba(0,0,0,.7)); }

/* ---------- marquesina de premios ---------- */
.s2b-tm-marquesina { position:relative; display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin:38px 0 24px; }
.s2b-tm-jack { position:relative; overflow:hidden; display:grid; grid-template-columns:1fr auto; align-items:center; gap:8px;
  padding:11px 13px; border-radius:14px;
  border:1px solid rgba(249,216,88,.38);
  background:linear-gradient(160deg, rgba(184,33,59,.55), rgba(61,7,20,.78));
  box-shadow:inset 0 1px 0 rgba(255,246,208,.28), 0 10px 26px -16px rgba(0,0,0,.9); }
.s2b-tm-jack .s2b-tm-sim { width:36px; height:36px; grid-row:span 2; }
.s2b-tm-jack-rango { grid-column:1; font-family:var(--mono); font-size:9.5px; letter-spacing:.18em; color:var(--oro2); }
.s2b-tm-jack-monto { grid-column:1; font-family:var(--display); font-size:clamp(17px,2.6vw,23px); font-weight:600; line-height:1.1;
  background:linear-gradient(180deg,var(--oro1) 6%,var(--oro2) 42%,var(--oro3) 74%,var(--oro1));
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 1px 0 rgba(0,0,0,.55)); }
.s2b-tm-jack--giro { border-color:rgba(126,240,168,.45);
  background:linear-gradient(160deg, rgba(20,120,64,.34), rgba(61,7,20,.78)); }
.s2b-tm-jack--giro .s2b-tm-jack-rango { color:#8FEAB0; }
.s2b-tm-jack--logo { border-color:var(--oro2);
  background:linear-gradient(160deg, rgba(208,154,28,.5), rgba(61,7,20,.82));
  box-shadow:inset 0 1px 0 rgba(255,246,208,.45), 0 0 26px -8px rgba(249,216,88,.6); }
.s2b-tm-jack--logo::after {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(100deg, transparent 36%, rgba(255,255,255,.34) 50%, transparent 64%);
  transform:translateX(-120%); animation:s2b-tm-brillo 3.6s ease-in-out infinite;
}
@keyframes s2b-tm-brillo { 0%,55%{transform:translateX(-120%)} 85%,100%{transform:translateX(120%)} }
.s2b-tm-jack.is-ganado { border-color:#7FE3A8; box-shadow:0 0 0 1px #7FE3A8, 0 14px 40px -18px rgba(127,227,168,.8); }

/* ---------- monedas sueltas ---------- */
.s2b-tm-escena { position:relative; }
.s2b-tm-monedas { position:absolute; inset:-6% -5%; pointer-events:none; z-index:3; }
.s2b-tm-moneda { position:absolute; display:block; aspect-ratio:1; opacity:.92;
  transform:rotate(var(--giro)); animation:s2b-tm-flotar 5.5s ease-in-out infinite;
  animation-delay:var(--demora); filter:drop-shadow(0 8px 14px rgba(0,0,0,.6)); }
.s2b-tm-moneda .s2b-tm-sim { width:100%; height:100%; }
@keyframes s2b-tm-flotar {
  50% { transform:rotate(var(--giro)) translateY(-12px) scale(1.05); }
}

/* ---------- el mueble ----------
   El marco dorado es una capa propia y no un border-image: asi lleva bisel
   adentro, resplandor afuera y esquinas redondeadas sin cortar el degrade. */
.s2b-tm-tilt { position:relative; z-index:2; }
.s2b-tm-mueble { position:relative; contain:paint; padding:clamp(7px,1.1vw,11px); border-radius:clamp(20px,2.6vw,32px);
  background:linear-gradient(158deg, var(--oro1) 0%, var(--oro2) 16%, var(--oro4) 38%, var(--oro2) 56%, var(--oro3) 72%, var(--oro1) 100%);
  box-shadow:
    0 0 0 1px rgba(124,78,6,.9),
    0 22px 70px -20px rgba(255,170,40,.55),
    0 60px 130px -50px rgba(0,0,0,.95); }
.s2b-tm-cuerpo { position:relative; border-radius:clamp(14px,2vw,24px); padding:clamp(10px,1.6vw,16px);
  background:linear-gradient(180deg, var(--rojo2) 0%, var(--rojo3) 56%, var(--rojo4) 100%);
  box-shadow:inset 0 2px 0 rgba(0,0,0,.55), inset 0 -2px 0 rgba(255,246,208,.14); }

/* ---------- la barra de arriba ---------- */
.s2b-tm-hud { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:clamp(9px,1.3vw,13px); }
.s2b .s2b-tm-hud-btn { padding:7px 14px; border-radius:9px; border:2px solid var(--oro4); color:#40100A;
  font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.14em;
  background:linear-gradient(180deg,var(--oro1),var(--oro2) 48%,var(--oro3));
  box-shadow:0 3px 0 var(--oro4); transition:transform .12s, box-shadow .12s; }
.s2b .s2b-tm-hud-btn:active { transform:translateY(2px); box-shadow:0 1px 0 var(--oro4); }
.s2b-tm-hud-saldo, .s2b-tm-hud-jack { display:inline-flex; align-items:center; gap:7px; padding:6px 13px; border-radius:999px;
  border:1px solid rgba(249,216,88,.45); background:rgba(0,0,0,.42); }
.s2b-tm-hud-saldo .s2b-tm-sim, .s2b-tm-hud-jack .s2b-tm-sim { width:20px; height:20px; }
.s2b-tm-hud-saldo b, .s2b-tm-hud-jack b { font-family:var(--display); font-size:15px; font-weight:700; color:var(--oro1); }
.s2b-tm-hud-saldo small { font-family:var(--mono); font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; color:#D9B98A; }
.s2b-tm-hud-jack { margin-left:auto; }
.s2b-tm-hud-jack em { font-style:normal; font-family:var(--mono); font-size:9px; letter-spacing:.16em; color:var(--oro2); }
.s2b .s2b-tm-hud-ico { width:32px; height:32px; flex:none; border-radius:9px; display:grid; place-items:center;
  color:var(--oro2); border:1px solid rgba(249,216,88,.4); background:rgba(0,0,0,.42);
  transition:color .2s, border-color .2s; }
.s2b .s2b-tm-hud-ico:hover { color:#fff; border-color:var(--oro2); }

/* ---------- el fieltro rojo y los rodillos ----------
   Nada mide en px aca: el ancho de columna lo reparte el grid y el alto sale
   de un aspect-ratio sobre ese ancho. Antes la celda tenia alto fijo y ancho
   elastico, asi que en el celular quedaban mas altas que anchas. */
.s2b-tm-rodillos { position:relative; padding:clamp(8px,1.4vw,12px) clamp(13px,2.6vw,30px);
  border-radius:14px; overflow:hidden;
  background:radial-gradient(120% 90% at 50% 42%, var(--rojo1) 0%, var(--rojo2) 44%, var(--rojo4) 100%);
  box-shadow:inset 0 0 0 2px rgba(208,154,28,.62), inset 0 6px 22px rgba(0,0,0,.75),
             inset 0 0 60px rgba(249,216,88,.14); }
.s2b-tm-rayos { position:absolute; inset:-40%; pointer-events:none; opacity:.34;
  background:repeating-conic-gradient(from 0deg at 50% 50%,
    rgba(255,214,120,.45) 0deg 3deg, transparent 3deg 9deg);
  transform:rotate(8deg); }
@keyframes s2b-tm-girar { to { transform:rotate(368deg); } }
/* gira solo mientras la maquina gira, y en su propia capa */
.s2b-tm-mueble.is-girando .s2b-tm-rayos { opacity:.55; will-change:transform;
  animation:s2b-tm-girar 10s linear infinite; }

/* Los rieles son LEDs sueltos, no un degrade corrido: el corte duro entre
   color y color es lo que los hace leer como lamparitas. El negro de abajo es
   la tira apagada que se ve entre una y otra. */
.s2b-tm-riel { position:absolute; top:8px; bottom:8px; width:clamp(5px,1vw,9px); border-radius:99px;
  pointer-events:none; z-index:2;
  background:
    repeating-linear-gradient(180deg,
      #FF2E74 0 13px, transparent 13px 17px,
      #FFC53D 17px 30px, transparent 30px 34px,
      #5BE58F 34px 47px, transparent 47px 51px,
      #3FC4FF 51px 64px, transparent 64px 68px,
      #A96BFF 68px 81px, transparent 81px 85px),
    linear-gradient(180deg, #16020A, #16020A);
  background-size:100% 85px, 100% 100%;
  box-shadow:0 0 14px rgba(255,255,255,.55), 0 0 26px rgba(255,120,190,.35), inset 0 0 5px rgba(0,0,0,.6); }
.s2b-tm-riel--izq { left:clamp(4px,.8vw,7px); }
.s2b-tm-riel--der { right:clamp(4px,.8vw,7px); }
@keyframes s2b-tm-neon { to { background-position:0 -85px, 0 0; } }
.s2b-tm-mueble.is-girando .s2b-tm-riel { animation:s2b-tm-neon .5s linear infinite; }

/* sin gap: las ventanas se tocan y lo que separa es la columna dorada, como
   en el mueble de verdad */
.s2b-tm-ventanas { position:relative; z-index:1; display:grid; grid-template-columns:repeat(5,1fr); gap:0;
  border-radius:9px; overflow:hidden; box-shadow:0 0 0 2px rgba(208,154,28,.5); }
.s2b-tm-pilar { position:absolute; top:0; bottom:0; width:clamp(2px,.3vw,3px); transform:translateX(-50%);
  z-index:4; pointer-events:none;
  background:linear-gradient(180deg, var(--oro1), var(--oro3) 46%, var(--oro4) 52%, var(--oro2) 100%);
  box-shadow:0 0 6px rgba(0,0,0,.8); }
/* tres celdas a la vista: el alto de la ventana es tres veces el de una celda */
.s2b-tm-ventana { position:relative; aspect-ratio:1 / 2.79; overflow:hidden;
  background:linear-gradient(180deg,#3A0811,#1B0309 50%,#3A0811); }
/* la curva del tambor: un rodillo es un cilindro, y lo que se va para atras
   recibe menos luz. Sin esto los tres simbolos se ven planos, pegados en una
   pared. */
.s2b-tm-ventana::after { content:''; position:absolute; inset:0; z-index:3; pointer-events:none;
  background:linear-gradient(180deg,
    rgba(0,0,0,.72) 0%, rgba(0,0,0,.34) 12%, rgba(0,0,0,0) 34%,
    rgba(255,240,210,.05) 50%,
    rgba(0,0,0,0) 66%, rgba(0,0,0,.34) 88%, rgba(0,0,0,.72) 100%); }
.s2b-tm-tira { display:block; will-change:transform; filter:blur(0); transition:filter .45s ease-out; }
.s2b-tm-tira.is-rodando { filter:blur(1.7px); transition:filter .12s ease-in; }

/* el simbolo manda: la placa de atras queda apenas insinuada */
.s2b-tm-celda { position:relative; aspect-ratio:1 / .93; display:grid; place-items:center; }
.s2b-tm-celda::before { content:''; position:absolute; inset:4px; border-radius:6px;
  background:linear-gradient(180deg, rgba(184,33,59,.4), rgba(30,4,11,.5));
  box-shadow:inset 0 0 0 1px rgba(249,216,88,.12); }
.s2b-tm-celda .s2b-tm-sim { position:relative; z-index:1; width:74%; aspect-ratio:1; height:auto; }
/* el simbolo que pago late despues de la frenada */
.s2b-tm-celda.is-premiada::before { background:linear-gradient(180deg, rgba(249,216,88,.42), rgba(208,154,28,.22));
  box-shadow:inset 0 0 0 1px rgba(255,246,208,.7); }
.s2b-tm-celda.is-premiada .s2b-tm-sim { animation:s2b-tm-latido 1.1s ease-in-out infinite; }
@keyframes s2b-tm-latido { 50% { transform:scale(1.12); filter:drop-shadow(0 0 10px rgba(255,236,170,.9)); } }

/* ---------- anticipacion ----------
   El ultimo rodillo, cuando los otros cuatro ya salieron iguales. Se le
   enciende el marco y el fieltro sube de temperatura: es todo lo que hace
   falta para que la vista se vaya sola ahi. */
.s2b-tm-ventana.is-ansia { box-shadow:inset 0 0 0 2px var(--oro2), 0 0 22px rgba(249,216,88,.55);
  animation:s2b-tm-ansia .55s ease-in-out infinite; z-index:2; }
@keyframes s2b-tm-ansia { 50% { box-shadow:inset 0 0 0 2px #FFF6D0, 0 0 34px rgba(255,214,120,.95); } }
.s2b-tm-mueble.is-ansia .s2b-tm-rodillos { box-shadow:inset 0 0 0 2px var(--oro2), inset 0 6px 22px rgba(0,0,0,.75), inset 0 0 80px rgba(249,216,88,.3); }
.s2b-tm-mueble.is-ansia .s2b-tm-riel { animation-duration:.22s; }

/* el sacudon: el mueble acusa la frenada del ultimo rodillo. Es transform,
   asi que se compone en GPU y no cuesta un repintado. */
.s2b-tm-mueble.is-golpe .s2b-tm-cuerpo { animation:s2b-tm-sacudon .4s cubic-bezier(.36,.07,.19,.97); }
@keyframes s2b-tm-sacudon {
  0%, 100% { transform:translate3d(0,0,0); }
  12% { transform:translate3d(0,3px,0); }
  28% { transform:translate3d(-1.5px,-2px,0); }
  46% { transform:translate3d(1.5px,1.5px,0); }
  68% { transform:translate3d(-1px,-1px,0); }
}

/* la linea que paga: adentro de las ventanas, donde "un tercio" es exacto */
.s2b-tm-linea { position:absolute; left:0; right:0; top:33.333%; height:33.333%;
  z-index:5; pointer-events:none;
  border-top:2px solid var(--oro2); border-bottom:2px solid var(--oro2);
  box-shadow:0 0 14px rgba(249,216,88,.6), inset 0 0 34px rgba(249,216,88,.1); }
/* el trazo de la linea que pago: se dibuja sola de izquierda a derecha */
/* width y height explicitos, no solo inset: un <svg> que solo trae viewBox no
   tiene tamano intrinseco pero si relacion de aspecto, y con las cuatro
   posiciones en cero el navegador lo resuelve por la relacion en vez de
   llenar la caja. El trazo caia hasta 238 px mas abajo de la celda. */
.s2b-tm-trazo { position:absolute; inset:0; width:100%; height:100%; z-index:6; pointer-events:none; overflow:visible; }
.s2b-tm-trazo polyline { stroke:#FFF6D0; stroke-width:4; stroke-linecap:round; stroke-linejoin:round;
  filter:drop-shadow(0 0 7px rgba(249,216,88,.95)) drop-shadow(0 0 16px rgba(255,180,40,.7));
  stroke-dasharray:400; stroke-dashoffset:400;
  animation:s2b-tm-trazar .7s ease-out forwards, s2b-tm-latir 1.6s .7s ease-in-out infinite; }
@keyframes s2b-tm-trazar { to { stroke-dashoffset:0; } }
@keyframes s2b-tm-latir { 50% { opacity:.55; } }

.s2b-tm-mueble.is-girando .s2b-tm-linea { animation:s2b-tm-late 1s ease-in-out infinite; }
@keyframes s2b-tm-late { 50% { box-shadow:0 0 28px rgba(255,214,120,.95), inset 0 0 44px rgba(249,216,88,.24); } }

/* ---------- la botonera de abajo ----------
   Va en su propio panel oscuro, como la consola de una maquina: sobre el
   fieltro rojo las cajas flotaban y parecian pegadas encima. */
.s2b-tm-barra { display:flex; align-items:center; gap:clamp(6px,1.2vw,12px);
  margin-top:clamp(8px,1.3vw,13px); padding:clamp(8px,1.2vw,13px);
  border-radius:14px; border:1px solid rgba(249,216,88,.3);
  background:linear-gradient(180deg,#1C0912 0%,#0A0407 100%);
  box-shadow:inset 0 1px 0 rgba(249,216,88,.28), inset 0 10px 22px rgba(0,0,0,.75); }
.s2b-tm-caja { flex:1 1 0; min-width:0; max-width:200px; display:grid; align-content:center; justify-items:center; gap:2px;
  padding:8px 6px; border-radius:11px; text-align:center;
  border:2px solid rgba(249,216,88,.55); background:linear-gradient(180deg, rgba(0,0,0,.75), rgba(30,6,14,.6));
  box-shadow:inset 0 3px 9px rgba(0,0,0,.8); }
.s2b-tm-caja small { font-family:var(--mono); font-size:clamp(7.5px,1.5vw,8.5px); letter-spacing:.14em; color:#E0BE8C; }
.s2b-tm-caja b { font-family:var(--display); font-size:clamp(14px,3.4vw,21px); font-weight:700; color:#fff; line-height:1.1;
  white-space:nowrap; text-shadow:0 0 12px rgba(255,214,120,.35); }
.s2b-tm-caja--win b { color:var(--oro1); }

/* ---------- el boton de girar ----------
   Son tres piezas y no una: el aro de oro (zocalo), el pozo oscuro donde
   apoya (::before) y la tapa (el button). Al apretar baja solo la tapa,
   dentro del pozo, y su pared lateral se achica. Eso es lo que hace que se
   lea como un boton fisico y no como un circulo que se mueve entero. */
.s2b-tm-zocalo { position:relative; flex:none; margin-left:auto;
  width:clamp(80px,20vw,146px); aspect-ratio:1; border-radius:50%;
  padding:clamp(6px,1.1vw,10px);
  background:linear-gradient(160deg, var(--oro1) 0%, var(--oro2) 16%, var(--oro4) 42%, var(--oro2) 62%, var(--oro3) 78%, var(--oro1) 100%);
  box-shadow:
    0 0 0 1px rgba(92,58,4,.95),
    0 3px 0 rgba(92,58,4,.7),
    0 16px 30px -12px rgba(0,0,0,.95); }
/* el pozo: sombra hacia adentro para que la tapa parezca metida */
.s2b-tm-zocalo::before { content:''; position:absolute; inset:clamp(5px,.9vw,8px); border-radius:50%;
  background:radial-gradient(circle at 50% 40%, #2A1806, #0B0602 78%);
  box-shadow:inset 0 5px 9px rgba(0,0,0,.95), inset 0 -2px 3px rgba(255,246,208,.22); }

.s2b .s2b-tm-spin { position:relative; width:100%; height:100%; border-radius:50%; padding:0;
  display:grid; place-items:center; color:#EAFFF0; overflow:hidden;
  background:
    /* el rebote de luz que sube desde el borde de abajo */
    radial-gradient(circle at 50% 116%, rgba(190,255,214,.5), transparent 46%),
    /* la cupula */
    radial-gradient(circle at 50% 16%, #D3FFE0 0%, #82EEA9 18%, #3FCB77 46%, #17924A 74%, #0A5A2B 100%);
  box-shadow:
    inset 0 -12px 18px rgba(0,0,0,.42),
    inset 0 3px 4px rgba(255,255,255,.55),
    0 7px 0 -1px #073F1E,
    0 12px 20px -6px rgba(0,0,0,.85),
    0 0 30px -6px rgba(90,230,140,.55);
  transition:transform .1s ease-out, box-shadow .1s ease-out, filter .2s; }
.s2b .s2b-tm-spin b { position:relative; z-index:3; font-family:var(--display);
  font-size:clamp(11px,2.4vw,18px); font-weight:700; letter-spacing:.1em;
  /* grabado: sombra arriba, luz abajo */
  text-shadow:0 -1px 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.3), 0 2px 5px rgba(0,0,0,.4); }
.s2b-tm-spin-ico { position:absolute; z-index:2; width:76%; height:76%; stroke-width:1.05;
  color:rgba(255,255,255,.45); }
.s2b .s2b-tm-spin.is-girando .s2b-tm-spin-ico { animation:s2b-tm-vuelta .8s linear infinite; }
@keyframes s2b-tm-vuelta { to { transform:rotate(360deg); } }

/* el reflejo: una elipse arriba, mas angosta que el boton, con el borde
   difuminado. Una elipse de borde duro se ve pegada encima; esta se funde. */
.s2b-tm-spin-brillo { position:absolute; z-index:1; top:6%; left:16%; right:16%; height:38%;
  border-radius:50%; pointer-events:none;
  background:radial-gradient(ellipse at 50% 100%, rgba(255,255,255,.85), rgba(255,255,255,.28) 52%, transparent 72%);
  filter:blur(.5px); }

.s2b .s2b-tm-spin:hover { filter:brightness(1.07); }
.s2b .s2b-tm-spin:active,
.s2b .s2b-tm-spin.is-girando {
  transform:translateY(6px);
  box-shadow:
    inset 0 -8px 14px rgba(0,0,0,.55),
    inset 0 6px 12px rgba(0,0,0,.4),
    inset 0 1px 2px rgba(255,255,255,.3),
    0 1px 0 -1px #073F1E,
    0 3px 7px -3px rgba(0,0,0,.9); }
.s2b .s2b-tm-spin.is-girando { cursor:progress; }
.s2b .s2b-tm-spin:disabled { cursor:not-allowed; }

/* mientras se puede apretar, el aro respira: es la invitacion */
.s2b-tm-zocalo::after { content:''; position:absolute; inset:-5px; border-radius:50%; pointer-events:none;
  box-shadow:0 0 0 2px rgba(126,240,168,.5), 0 0 22px 3px rgba(90,230,140,.4);
  opacity:0; animation:s2b-tm-respira 2.4s ease-in-out infinite; }
.s2b-tm-zocalo.is-girando::after { animation:none; opacity:0; }
@keyframes s2b-tm-respira { 0%,100% { opacity:0; transform:scale(.97); } 50% { opacity:.85; transform:scale(1.02); } }

.s2b .s2b-tm-spin--visto {
  background:
    radial-gradient(circle at 50% 116%, rgba(226,210,255,.5), transparent 46%),
    radial-gradient(circle at 50% 16%, #EFE6FF 0%, #C0A8FF 18%, #8E68F5 46%, #5730C4 74%, #2F1780 100%);
  box-shadow:
    inset 0 -12px 18px rgba(0,0,0,.42),
    inset 0 3px 4px rgba(255,255,255,.55),
    0 7px 0 -1px #23106B,
    0 12px 20px -6px rgba(0,0,0,.85),
    0 0 30px -6px rgba(150,110,255,.55); }
.s2b .s2b-tm-spin--visto:active {
  box-shadow:
    inset 0 -8px 14px rgba(0,0,0,.55),
    inset 0 6px 12px rgba(0,0,0,.4),
    inset 0 1px 2px rgba(255,255,255,.3),
    0 1px 0 -1px #23106B,
    0 3px 7px -3px rgba(0,0,0,.9); }

.s2b-tm-aviso { margin-top:10px; padding:9px 14px; border-radius:11px; text-align:center;
  font-family:var(--mono); font-size:11.5px; letter-spacing:.1em; text-transform:uppercase;
  color:#E0BE8C; background:rgba(0,0,0,.4); border:1px solid rgba(249,216,88,.3); }
.s2b-tm-error { margin-top:12px; padding:11px 14px; border-radius:12px; font-size:13.5px;
  color:#FFD9D9; background:rgba(255,60,60,.18); border:1px solid rgba(255,120,120,.45); }

/* ---------- los codigos ganados ---------- */
.s2b-tm-billetera { position:relative; margin-top:26px; padding:18px 20px; border-radius:20px;
  border:1px solid rgba(249,216,88,.35); background:linear-gradient(160deg, rgba(184,33,59,.26), rgba(0,0,0,.3)); }
.s2b .s2b-tm-billetera h3 { display:flex; align-items:center; gap:9px; margin:0 0 14px; font-family:var(--mono);
  font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--oro2); font-weight:400; }
.s2b-tm-billetera h3 svg { color:var(--oro2); }
.s2b-tm-billetera ul { list-style:none; margin:0; padding:0; display:grid; gap:10px; }
.s2b-tm-billetera li { display:flex; align-items:center; gap:13px; padding:11px 14px; border-radius:14px;
  border:1px solid rgba(249,216,88,.22); background:rgba(0,0,0,.34); flex-wrap:wrap; }
.s2b-tm-billetera li .s2b-tm-sim { width:34px; height:34px; }
.s2b-tm-billetera-txt { display:grid; gap:2px; flex:1; min-width:150px; }
.s2b-tm-billetera-txt b { font-size:14px; color:#fff; font-weight:600; }
.s2b-tm-billetera-txt code { font-family:var(--mono); font-size:13px; letter-spacing:.08em; color:var(--oro1); }
.s2b-tm-pedir { display:inline-flex; align-items:center; gap:7px; padding:8px 14px; border-radius:999px;
  border:1px solid var(--oro2); color:var(--oro1); font-family:var(--mono); font-size:10.5px;
  letter-spacing:.1em; text-transform:uppercase; transition:background .2s, color .2s; }
.s2b-tm-pedir:hover { background:var(--oro2); color:#3A0B14; }
.s2b-tm-usado { font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:#7FE3A8; }

/* ---------- tabla y bases ---------- */
.s2b-tm-abajo { position:relative; display:grid; gap:20px; margin-top:26px; }
.s2b-tm-tabla, .s2b-tm-bases { border:1px solid rgba(249,216,88,.22); border-radius:20px; padding:20px 22px;
  background:linear-gradient(160deg, rgba(255,255,255,.06), rgba(0,0,0,.22)); }
.s2b .s2b-tm-tabla h3, .s2b .s2b-tm-bases h3 { display:flex; align-items:center; gap:9px; font-family:var(--mono); font-size:11px;
  letter-spacing:.16em; text-transform:uppercase; color:var(--oro2); font-weight:400; margin:0 0 14px; }
.s2b-tm-tabla h3 svg, .s2b-tm-bases h3 svg { color:var(--oro2); }
.s2b-tm-tabla table { width:100%; border-collapse:collapse; }
.s2b-tm-tabla th { text-align:left; font-family:var(--mono); font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
  color:#9E97C4; font-weight:400; padding-bottom:9px; border-bottom:1px solid rgba(249,216,88,.24); }
.s2b-tm-tabla td { padding:11px 0; border-bottom:1px solid rgba(167,140,255,.1); font-size:14px; color:#D8D2EC; vertical-align:middle; }
.s2b-tm-tabla tr:last-child td { border-bottom:none; }
.s2b-tm-tabla tr.is-ganado td { color:#fff; background:linear-gradient(90deg, rgba(127,227,168,.16), transparent); }
.s2b-tm-tres { display:inline-flex; gap:2px; }
.s2b-tm-tres .s2b-tm-sim { width:23px; height:23px; }
.s2b-tm-nada { font-family:var(--mono); font-size:11px; color:#7E7799; }
.s2b-tm-formas { display:inline-flex; gap:6px; flex-wrap:wrap; }
.s2b-tm-forma { width:40px; height:24px; flex:none; }
.s2b-tm-solouno { display:flex; gap:9px; align-items:flex-start; margin:-4px 0 14px;
  font-size:12.5px; line-height:1.5; color:#E0BE8C; }
.s2b-tm-solouno svg { flex:none; margin-top:2px; color:var(--oro2); }
.s2b-tm-prob { font-family:var(--mono); font-size:13px; color:var(--oro2); white-space:nowrap; }
.s2b-tm-bases ul { list-style:none; margin:0; padding:0; display:grid; gap:11px; }
.s2b-tm-bases li { display:flex; gap:10px; align-items:flex-start; font-size:14px; color:#BDB4E4; line-height:1.55; }
.s2b-tm-bases li svg { flex:none; margin-top:4px; color:var(--oro2); }
.s2b-tm-volver { margin-top:18px; }

/* ---------- el premio ---------- */
/* align-items:start + margin:auto en la tarjeta: centrada cuando entra,
   scrolleable cuando no. Con place-items:center una tarjeta mas alta que la
   pantalla se corta arriba y abajo y no hay forma de llegar al boton. */
.s2b-tm-tras { position:fixed; inset:0; z-index:125; display:grid; justify-items:center; align-items:start;
  overflow-y:auto; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; padding:18px;
  --title:#FFFFFF; --text:#C9C2E6; --muted:#9E97C4; color:var(--text);
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  background:rgba(5,3,14,.76); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
.s2b-tm-premio { position:relative; width:min(470px,100%); margin:auto; text-align:center; padding:38px 30px 30px; border-radius:26px;
  border:1px solid rgba(167,140,255,.3); background:linear-gradient(168deg,#1B0F44,#0A0620 70%); overflow:hidden;
  box-shadow:0 60px 140px -50px rgba(0,0,0,.95); }
.s2b-tm-premio.is-gano { border:2px solid var(--oro2);
  background:linear-gradient(168deg,#4A1024 0%,#25091C 52%,#0A0620 100%);
  box-shadow:0 0 40px -6px rgba(249,216,88,.45), 0 60px 140px -50px rgba(0,0,0,.95); }
.s2b-tm-halo { position:absolute; inset:-50% -20% auto -20%; height:130%;
  background:conic-gradient(from 0deg, transparent 0 28%, rgba(255,214,120,.42) 42%, rgba(216,40,70,.4) 58%, transparent 72%);
  filter:blur(38px); animation:s2b-tm-rot 9s linear infinite; pointer-events:none; }
@keyframes s2b-tm-rot { to { transform:rotate(360deg); } }
.s2b .s2b-tm-x { position:absolute; top:12px; right:12px; z-index:3; width:34px; height:34px; border-radius:11px; display:grid;
  place-items:center; color:#E4D9C0; border:1px solid rgba(249,216,88,.35); transition:color .2s, transform .2s; }
.s2b .s2b-tm-x:hover { color:#fff; transform:rotate(90deg); }
.s2b-tm-premio-in { position:relative; z-index:2; }
.s2b-tm-premio-sim { display:grid; place-items:center; margin:0 auto 16px; }
.s2b-tm-premio-sim .s2b-tm-sim { width:112px; height:112px; }
.s2b-tm-premio-sim--nada { opacity:.4; }
.s2b-tm-premio-sim--nada .s2b-tm-sim { width:78px; height:78px; }
.s2b-tm-premio-rango { display:inline-block; font-family:var(--mono); font-size:10px; letter-spacing:.24em; color:var(--oro2); margin-bottom:10px; }
.s2b .s2b-tm-premio-tit { font-size:clamp(23px,4vw,31px); color:#fff; margin:0 0 10px; }
.s2b-tm-premio-det { font-size:14.5px; color:#D8D2EC; max-width:38ch; margin:0 auto; line-height:1.6; }
.s2b .s2b-tm-codigo { display:inline-flex; align-items:center; gap:12px; margin:22px 0 18px; padding:13px 20px; border-radius:14px;
  border:2px dashed var(--oro2); background:rgba(249,216,88,.12); color:var(--oro1);
  font-family:var(--mono); font-size:16px; letter-spacing:.1em; transition:background .2s, border-color .2s; }
.s2b .s2b-tm-codigo:hover { background:rgba(249,216,88,.22); }
.s2b-tm-reclamar { width:100%; justify-content:center; margin-top:6px; }
.s2b-tm-chico { display:block; margin-top:14px; font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; color:#9E97C4; }

/* ==================================================================
   Responsive
   El gabinete se limita a 760 px y se centra: mas ancho que eso no es
   una maquina, es un cartel. De ahi para abajo todo baja solo, porque
   las medidas salen de proporciones y no de px fijos.
   ================================================================== */
.s2b-tm-escena { max-width:760px; margin-left:auto; margin-right:auto; }

@media (min-width: 760px) {
  .s2b-tm-marquesina { grid-template-columns:repeat(4,1fr); max-width:760px; margin-left:auto; margin-right:auto; }
  .s2b-tm-abajo { grid-template-columns:1.15fr .85fr; }
}

/* Tablet y celular grande: se achica el marco y se recuperan los costados. */
@media (max-width: 760px) {
  /* Un filter: blur() sobre una capa del tamano de la pantalla se recalcula
     en cada cuadro de scroll. Los degrades ya salen suaves solos; el blur
     costaba mas de lo que aportaba. */
  .s2b-tm-band::before { filter:none; opacity:.75; }
  .s2b-tm-monedas { display:none; }
  .s2b-tm-hud-jack { margin-left:0; order:3; }
  .s2b-tm-mueble { padding:7px; }
  .s2b-tm-cuerpo { padding:9px; }
}

/* Celular: el gabinete se come el margen de la pagina para que los cinco
   rodillos entren sin quedar en miniatura. */
@media (max-width: 560px) {
  .s2b-tm-escena { margin-left:-14px; margin-right:-14px; }
  /* la marquesina es informacion secundaria en el celular: la maquina es lo
     que importa, y estas cinco tarjetas se comian media pantalla */
  .s2b-tm-marquesina { gap:6px; margin:24px 0 14px; }
  .s2b-tm-jack { padding:6px 9px; gap:6px; border-radius:10px; }
  .s2b-tm-jack .s2b-tm-sim { width:22px; height:22px; }
  .s2b-tm-jack-rango { font-size:7.5px; letter-spacing:.1em; }
  .s2b-tm-jack-monto { font-size:15px; }
  /* con cinco tarjetas en dos columnas la ultima queda huerfana */
  .s2b-tm-jack:last-child { grid-column:1 / -1; }
  .s2b-tm-mueble { padding:5px; border-radius:18px; }
  .s2b-tm-cuerpo { padding:7px; border-radius:14px; }
  .s2b-tm-rodillos { padding:6px 12px; }
  .s2b-tm-hud { gap:5px; margin-bottom:7px; }
  .s2b .s2b-tm-hud-btn { padding:6px 10px; font-size:9px; }
  .s2b-tm-hud-saldo, .s2b-tm-hud-jack { padding:5px 9px; gap:5px; }
  .s2b-tm-hud-saldo .s2b-tm-sim, .s2b-tm-hud-jack .s2b-tm-sim { width:16px; height:16px; }
  .s2b-tm-hud-saldo b, .s2b-tm-hud-jack b { font-size:13px; }
  .s2b .s2b-tm-hud-ico { width:28px; height:28px; }
  .s2b-tm-barra { padding:7px; gap:6px; }
  .s2b-tm-caja { padding:6px 4px; border-width:1px; }
  /* cinco simbolos por fila no entran al lado del texto: se achican */
  .s2b-tm-tres .s2b-tm-sim { width:16px; height:16px; }
  .s2b-tm-tabla td { font-size:12.5px; padding:9px 0; }
  .s2b-tm-prob { font-size:11.5px; }
}

/* Celular angosto: la marquesina pasa a una sola columna y el HUD deja de
   repetir lo que ya dice la botonera. */
@media (max-width: 400px) {
  .s2b-tm-hud-saldo { display:none; }
  .s2b-tm-tabla, .s2b-tm-bases { padding:16px 13px; }
  .s2b-tm-billetera { padding:15px 14px; }
  .s2b-tm-billetera li { padding:10px 11px; gap:10px; }
}

@media (prefers-reduced-motion: reduce) {
  .s2b-tm-jack--logo::after, .s2b-tm-halo, .s2b-tm-linea,
  .s2b-tm-rayos, .s2b-tm-riel, .s2b-tm-moneda, .s2b-tm-spin-ico { animation:none !important; }
  .s2b-tm-trazo polyline { animation:none !important; stroke-dashoffset:0; }
  .s2b-tm-celda.is-premiada .s2b-tm-sim,
  .s2b-tm-ventana.is-ansia,
  .s2b-tm-mueble.is-golpe .s2b-tm-cuerpo { animation:none !important; }
  .s2b-tm-zocalo::after { animation:none !important; opacity:0; }
}
`;
