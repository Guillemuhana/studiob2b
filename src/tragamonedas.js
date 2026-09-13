/* ==================================================================
   TRAGAMONEDAS — el motor
   Aca vive todo lo que decide: los premios, las probabilidades, el
   sorteo y el codigo que se lleva el ganador. La pantalla no decide
   nada, solo muestra lo que sale de aca.

   El sorteo es al reves de lo que parece: primero se sortea el premio
   con los pesos de la tabla y despues se arman los rodillos para que
   den ese resultado. Es como funciona cualquier promocion seria -las
   probabilidades son exactamente las publicadas, no el producto de
   tres giros sueltos que nadie puede calcular- y por eso la tabla de
   abajo se muestra tal cual en las bases.
   ================================================================== */

export const SIMBOLOS = ["logo", "diamante", "lingote", "moneda", "rayo", "chip", "estrella"];

/* Los pesos suman 100, asi que cada uno se lee directo como porcentaje.
   Tocar estos numeros es tocar la promocion entera: es el unico lugar. */
export const PREMIOS = [
  {
    id: "logo",
    simbolo: "logo",
    peso: 2,
    rango: "GRAN PREMIO",
    monto: "30%",
    es: "30% de descuento en tu proyecto",
    en: "30% off your project",
    detalle_es: "Sobre el presupuesto final del primer proyecto que hagamos juntos.",
    detalle_en: "Off the final quote of the first project we build together.",
  },
  {
    id: "diamante",
    simbolo: "diamante",
    peso: 5,
    rango: "MAYOR",
    monto: "$100.000",
    es: "$100.000 de descuento",
    en: "$100,000 ARS off",
    detalle_es: "Se descuenta del presupuesto final de tu proyecto.",
    detalle_en: "Taken off the final quote of your project.",
  },
  {
    id: "lingote",
    simbolo: "lingote",
    peso: 8,
    rango: "MENOR",
    monto: "$50.000",
    es: "$50.000 de descuento",
    en: "$50,000 ARS off",
    detalle_es: "Se descuenta del presupuesto final de tu proyecto.",
    detalle_en: "Taken off the final quote of your project.",
  },
  {
    id: "moneda",
    simbolo: "moneda",
    peso: 15,
    rango: "MINI",
    monto: "$25.000",
    es: "$25.000 de descuento",
    en: "$25,000 ARS off",
    detalle_es: "Se descuenta del presupuesto final de tu proyecto.",
    detalle_en: "Taken off the final quote of your project.",
  },
  {
    id: "rayo",
    simbolo: "rayo",
    peso: 20,
    rango: "EXTRA",
    monto: "1 h",
    es: "Una hora de consultoría, gratis",
    en: "One hour of consulting, free",
    detalle_es: "Una videollamada de una hora con un desarrollador, sin compromiso.",
    detalle_en: "A one hour call with a developer, no strings attached.",
  },
  {
    id: null,
    simbolo: null,
    peso: 50,
    rango: "",
    monto: "",
    es: "Esta vez no salió",
    en: "Not this time",
    detalle_es: "Igual te queda el diagnóstico gratuito: la primera llamada nunca se cobra.",
    detalle_en: "You still get the free diagnosis: the first call is always free.",
  },
];

export const CON_PREMIO = PREMIOS.filter((p) => p.id);
const TOTAL_PESO = PREMIOS.reduce((a, p) => a + p.peso, 0);

/* Math.random() alcanza de sobra para esto, pero cuando el navegador tiene
   crypto no hay razon para usar algo peor: el sorteo de un premio real
   merece la fuente buena. */
function azar() {
  try {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const v = new Uint32Array(1);
      crypto.getRandomValues(v);
      return v[0] / 4294967296;
    }
  } catch {}
  return Math.random();
}

const unoDe = (lista) => lista[Math.floor(azar() * lista.length)];

export function sortearPremio() {
  let r = azar() * TOTAL_PESO;
  for (const p of PREMIOS) {
    r -= p.peso;
    if (r <= 0) return p;
  }
  return PREMIOS[PREMIOS.length - 1];
}

/* Los tres simbolos de la linea de pago. Si hay premio, van los tres iguales;
   si no, dos iguales y uno distinto: perder de un pelo se mira, perder con
   tres simbolos al azar no se mira. */
export function lineaDe(premio) {
  if (premio.simbolo) return [premio.simbolo, premio.simbolo, premio.simbolo];
  const a = unoDe(SIMBOLOS);
  /* el distinto se elige de los que sobran en vez de reintentar hasta acertar:
     un while que depende del azar es un cuelgue esperando una racha */
  const b = unoDe(SIMBOLOS.filter((s) => s !== a));
  const suelto = Math.floor(azar() * 3);
  return [0, 1, 2].map((i) => (i === suelto ? b : a));
}

export const TIRA_LARGO = 26;

/* La tira de cada rodillo: relleno al azar y, al final, los tres simbolos que
   van a quedar a la vista. El del medio es el que paga. */
export function armarTira(centro) {
  const tira = [];
  for (let i = 0; i < TIRA_LARGO - 3; i++) tira.push(unoDe(SIMBOLOS));
  tira.push(unoDe(SIMBOLOS), centro, unoDe(SIMBOLOS));
  return tira;
}

export const PARADA = TIRA_LARGO - 3;

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // sin I, O, 0, 1: se confunden al dictarlos

export function generarCodigo(premio) {
  let cola = "";
  for (let i = 0; i < 4; i++) cola += ALFABETO[Math.floor(azar() * ALFABETO.length)];
  const raiz = { logo: "30OFF", diamante: "100K", lingote: "50K", moneda: "25K", rayo: "1HORA" }[premio.id];
  return "SB2B-" + raiz + "-" + cola;
}

/* ================= la jugada guardada =================
   Una jugada por persona: el resultado queda en el navegador para que al
   volver vea su premio y no una maquina nueva. Con ?jugar=reset se limpia,
   que es como se muestra la maquina en una reunion sin quedarse sin fichas. */

const LLAVE = "s2b-jugada";

export function jugadaGuardada() {
  try {
    if (new URLSearchParams(location.search).get("jugar") === "reset") {
      localStorage.removeItem(LLAVE);
      return null;
    }
    const crudo = localStorage.getItem(LLAVE);
    if (!crudo) return null;
    const j = JSON.parse(crudo);
    return j && typeof j.premio === "string" ? j : null;
  } catch {
    return null;
  }
}

export function guardarJugada(premio, codigo) {
  try {
    localStorage.setItem(LLAVE, JSON.stringify({ premio: premio.id || "nada", codigo, fecha: Date.now() }));
  } catch {
    /* si el navegador no deja guardar, la jugada vale igual: el codigo ya
       esta en pantalla y el premio se reclama por WhatsApp */
  }
}

/* ================= sonido =================
   Sin archivos: las notas se generan con Web Audio en el momento. Un mp3 de
   maquinita son 40 kB y suena a otra marca; esto pesa cero y afina con el
   sitio. El contexto se crea recien en el primer clic, que es cuando el
   navegador deja. */

export function crearSonido() {
  let ctx = null;
  const arrancar = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const nota = (freq, cuando, largo, tipo = "triangle", vol = 0.16) => {
    const c = arrancar();
    if (!c) return;
    const osc = c.createOscillator();
    const gan = c.createGain();
    const t0 = c.currentTime + cuando;
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, t0);
    gan.gain.setValueAtTime(0.0001, t0);
    gan.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gan.gain.exponentialRampToValueAtTime(0.0001, t0 + largo);
    osc.connect(gan).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + largo + 0.03);
  };

  return {
    palanca() { nota(180, 0, 0.14, "sawtooth", 0.1); nota(320, 0.05, 0.2, "triangle", 0.08); },
    giro() { nota(90, 0, 0.5, "sine", 0.05); },
    tope(i) { nota(420 + i * 110, 0, 0.1, "square", 0.07); nota(210 + i * 55, 0, 0.16, "triangle", 0.09); },
    gano(alto) {
      const escala = alto ? [523, 659, 784, 1047, 1319] : [440, 554, 659];
      escala.forEach((f, i) => nota(f, i * 0.1, 0.34, "triangle", 0.15));
      if (alto) escala.forEach((f, i) => nota(f * 2, 0.5 + i * 0.07, 0.5, "sine", 0.09));
    },
    perdio() { nota(300, 0, 0.18, "triangle", 0.09); nota(220, 0.14, 0.3, "triangle", 0.08); },
  };
}
