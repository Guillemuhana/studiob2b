/* ==================================================================
   TRAGAMONEDAS — la tabla de premios y las piezas de la pantalla

   El sorteo NO esta aca: lo hace el servidor, en Postgres. Este archivo
   tiene la tabla de premios que se muestra al visitante, el armado de
   los rodillos y el sonido.

   Los rodillos van al reves de lo que parece: primero se sabe que
   premio salio -lo dice el servidor- y despues se arman las tiras para
   que frenen en ese resultado. Es como funciona cualquier promocion
   seria; las probabilidades son exactamente las publicadas, no el
   producto de tres giros sueltos que nadie puede calcular, y por eso
   la tabla se muestra entera en la pagina.
   ================================================================== */

/* El rayo quedo en los rodillos pero ya no paga: es un simbolo bajo, de los
   que rellenan. Tres iguales en la linea nunca le pueden tocar, porque las
   jugadas perdedoras se arman siempre con dos iguales y uno distinto. */
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
    id: null,
    simbolo: null,
    peso: 70,
    rango: "",
    monto: "",
    es: "Esta vez no salió",
    en: "Not this time",
    detalle_es: "Igual te queda el diagnóstico gratuito: la primera llamada nunca se cobra.",
    detalle_en: "You still get the free diagnosis: the first call is always free.",
  },
];

export const CON_PREMIO = PREMIOS.filter((p) => p.id);

/* Los pesos de arriba son los que publica la pagina, pero el sorteo no pasa
   por aca: lo hace Postgres (ver api/jugar.js y la funcion sb2b_jugar). En el
   navegador solo se elige el relleno de los rodillos, que no decide nada. */
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

/* ================= la jugada guardada =================
   Copia local de lo que dijo el servidor, para pintar la pantalla sin esperar
   el viaje de ida y vuelta. No es la autoridad: el limite de una jugada lo
   pone la base, contra la huella de IP + navegador, asi que borrar esto o
   abrir una ventana de incognito no da una jugada nueva.
   Con ?jugar=reset se limpia la copia local, util para mostrar la maquina en
   una reunion sin tocar la base. */

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
