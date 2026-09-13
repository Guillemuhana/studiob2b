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

/* Todos los premios son porcentajes de descuento sobre el presupuesto, no
   montos fijos: asi el premio acompana al tamano del proyecto en vez de
   perder valor con la inflacion.

   Los pesos suman 100, asi que cada uno se lee directo como probabilidad.
   Tocar estos numeros es tocar la promocion entera, y hay que tocarlos
   tambien en la funcion sb2b_jugar de Postgres, que es la que sortea. */
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
    monto: "20%",
    es: "20% de descuento en tu proyecto",
    en: "20% off your project",
    detalle_es: "Sobre el presupuesto final del primer proyecto que hagamos juntos.",
    detalle_en: "Off the final quote of the first project we build together.",
  },
  {
    id: "lingote",
    simbolo: "lingote",
    peso: 8,
    rango: "MENOR",
    monto: "15%",
    es: "15% de descuento en tu proyecto",
    en: "15% off your project",
    detalle_es: "Sobre el presupuesto final del primer proyecto que hagamos juntos.",
    detalle_en: "Off the final quote of the first project we build together.",
  },
  {
    id: "moneda",
    simbolo: "moneda",
    peso: 15,
    rango: "MINI",
    monto: "10%",
    es: "10% de descuento en tu proyecto",
    en: "10% off your project",
    detalle_es: "Sobre el presupuesto final del primer proyecto que hagamos juntos.",
    detalle_en: "Off the final quote of the first project we build together.",
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

export const RODILLOS = 5;

/* Los cinco simbolos de la linea de pago. Con premio van los cinco iguales;
   sin premio se sortea cuantos repetidos salen -entre dos y cuatro- y el
   resto se completa con otros. Perder de un pelo se mira; perder con cinco
   simbolos sueltos al azar no se mira, y perder siempre con cuatro iguales
   se nota amanado. */
export function lineaDe(premio) {
  if (premio.simbolo) return Array(RODILLOS).fill(premio.simbolo);

  const base = unoDe(SIMBOLOS);
  const otros = SIMBOLOS.filter((s) => s !== base);
  const repetidos = 2 + Math.floor(azar() * 3);        // 2, 3 o 4
  const linea = Array.from({ length: RODILLOS }, () => unoDe(otros));

  /* mezcla honesta: un sort() con comparador al azar reparte sesgado */
  const puestos = [0, 1, 2, 3, 4];
  for (let i = puestos.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [puestos[i], puestos[j]] = [puestos[j], puestos[i]];
  }
  /* nunca los cinco: repetidos llega hasta cuatro y el resto sale de otros,
     que ya excluye a base */
  puestos.slice(0, repetidos).forEach((i) => { linea[i] = base; });
  return linea;
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
   Sin archivos: todo se genera con Web Audio en el momento. Un paquete de
   mp3 de maquinita son 200 kB y suena a otra marca; esto pesa cero.

   El giro no es un tono: es una tanda de chasquidos programados de una vez,
   uno por cada muesca de rodillo, mas una capa de ruido filtrado que hace el
   zumbido. Como se sabe de antemano cuando frena cada rodillo, se puede
   programar todo junto al arrancar y queda perfectamente en tiempo con lo que
   se ve -si se disparara desde un setInterval, el audio se correria cada vez
   que el navegador se distrae-.

   El contexto se crea en el primer clic, que es cuando el navegador deja. */

export function crearSonido() {
  let ctx = null;
  let ruido = null;

  const arrancar = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  /* un segundo de ruido blanco, reutilizado por todos los chasquidos */
  const bufferRuido = (c) => {
    if (ruido) return ruido;
    const n = Math.floor(c.sampleRate * 1);
    ruido = c.createBuffer(1, n, c.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return ruido;
  };

  const nota = (freq, cuando, largo, tipo = "triangle", vol = 0.16, destino = null) => {
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
    osc.connect(gan).connect(destino || c.destination);
    osc.start(t0);
    osc.stop(t0 + largo + 0.03);
  };

  /* el chasquido de una muesca: ruido corto pasado por un pasabanda */
  const chasquido = (c, cuando, vol, frec, destino) => {
    const s = c.createBufferSource();
    s.buffer = bufferRuido(c);
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = frec;
    f.Q.value = 3.2;
    const g = c.createGain();
    const t0 = c.currentTime + cuando;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);
    s.connect(f).connect(g).connect(destino);
    /* cada chasquido entra por un punto distinto del ruido: arrancando todos
       en cero suenan calcados y el oido lo lee como un loop, no como una
       maquina */
    s.start(t0, Math.random() * 0.9);
    s.stop(t0 + 0.05);
  };

  /* el golpe seco de un rodillo al frenar: un tono que cae mas el chasquido */
  const golpe = (c, cuando, destino, fuerza = 1) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    const t0 = c.currentTime + cuando;
    osc.type = "sine";
    osc.frequency.setValueAtTime(190 * fuerza, t0);
    osc.frequency.exponentialRampToValueAtTime(58, t0 + 0.16);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(0.3 * fuerza, t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    osc.connect(g).connect(destino);
    osc.start(t0);
    osc.stop(t0 + 0.26);
    chasquido(c, cuando, 0.22 * fuerza, 1800, destino);
  };

  return {
    /* el clac del boton al hundirse */
    palanca() {
      const c = arrancar();
      if (!c) return;
      chasquido(c, 0, 0.3, 2600, c.destination);
      nota(150, 0.01, 0.1, "square", 0.12);
      nota(70, 0.03, 0.16, "sine", 0.16);
    },

    /* Toda la corrida de una: chasquidos mientras haya rodillos girando, el
       zumbido de fondo, el golpe de cada frenada y el subidon antes del
       ultimo. Devuelve como cortarlo si la persona se va de la pagina. */
    rodando(frenosMs) {
      const c = arrancar();
      if (!c) return () => {};

      const bus = c.createGain();
      bus.gain.value = 0.9;
      bus.connect(c.destination);

      const frenos = frenosMs.map((m) => m / 1000);
      const fin = Math.max(...frenos);

      /* el zumbido: ruido grave que se va apagando a medida que frenan */
      const zumbido = c.createBufferSource();
      zumbido.buffer = bufferRuido(c);
      zumbido.loop = true;
      const filtro = c.createBiquadFilter();
      filtro.type = "lowpass";
      filtro.frequency.setValueAtTime(900, c.currentTime);
      filtro.Q.value = 1.2;
      const gz = c.createGain();
      const t0 = c.currentTime;
      gz.gain.setValueAtTime(0.0001, t0);
      gz.gain.linearRampToValueAtTime(0.05, t0 + 0.12);
      frenos.forEach((f, i) => {
        gz.gain.linearRampToValueAtTime(0.05 * (1 - (i + 1) / frenos.length), t0 + f);
      });
      filtro.frequency.linearRampToValueAtTime(260, t0 + fin);
      zumbido.connect(filtro).connect(gz).connect(bus);
      zumbido.start(t0);
      zumbido.stop(t0 + fin + 0.3);

      /* las muescas: una cada 55 ms, mas fuertes cuantos mas rodillos queden */
      const paso = 0.055;
      for (let t = 0; t < fin; t += paso) {
        const activos = frenos.filter((f) => f > t).length;
        if (!activos) break;
        chasquido(c, t, 0.035 + 0.022 * activos, 2400 + (activos % 2) * 500, bus);
      }

      /* el golpe de cada frenada; el ultimo pega mas fuerte */
      frenos.forEach((f, i) => golpe(c, f, bus, i === frenos.length - 1 ? 1.25 : 0.85));

      /* el subidon antes de que pare el ultimo rodillo: es el momento en que
         la persona ya sabe si gano o no */
      const previo = frenos[frenos.length - 2] ?? 0;
      const largo = Math.max(0.25, fin - previo);
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, t0 + previo);
      osc.frequency.exponentialRampToValueAtTime(760, t0 + fin);
      g.gain.setValueAtTime(0.0001, t0 + previo);
      g.gain.linearRampToValueAtTime(0.05, t0 + previo + largo * 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + fin + 0.05);
      osc.connect(g).connect(bus);
      osc.start(t0 + previo);
      osc.stop(t0 + fin + 0.1);

      return () => {
        try {
          const ahora = c.currentTime;
          bus.gain.cancelScheduledValues(ahora);
          bus.gain.setTargetAtTime(0, ahora, 0.02);
          setTimeout(() => { try { bus.disconnect(); } catch {} }, 400);
        } catch {}
      };
    },

    gano(alto) {
      const escala = alto ? [523, 659, 784, 1047, 1319] : [440, 554, 659];
      escala.forEach((f, i) => nota(f, i * 0.1, 0.34, "triangle", 0.15));
      if (alto) {
        escala.forEach((f, i) => nota(f * 2, 0.5 + i * 0.07, 0.5, "sine", 0.09));
        /* la lluvia de monedas del premio mayor */
        const c = arrancar();
        if (c) for (let i = 0; i < 26; i++) chasquido(c, 0.25 + i * 0.045, 0.1, 2600 + Math.random() * 2200, c.destination);
      }
    },

    perdio() { nota(300, 0, 0.18, "triangle", 0.09); nota(220, 0.14, 0.3, "triangle", 0.08); },
  };
}
