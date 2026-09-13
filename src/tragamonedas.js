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
    id: "giro",
    /* simbolo en null a proposito: este premio no lo paga un simbolo sino una
       linea cruzada, y grillaDe() usa simbolo para saber que armar. Para
       mostrarlo en pantalla va icono, que es solo dibujo. */
    simbolo: null,
    icono: "giro",
    peso: 12,
    rango: "BONUS",
    monto: "+1",
    es: "¡Otro intento!",
    en: "Another spin!",
    detalle_es: "Cinco iguales en una línea cruzada: esta jugada no te la contamos.",
    detalle_en: "Five in a row on a crossed line: this spin is on us.",
  },
  {
    id: null,
    simbolo: null,
    peso: 58,
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
export const FILAS = 3;

/* Las cinco lineas de pago, como en cualquier maquina. Cada una dice, para
   cada rodillo, en que fila mira: 0 arriba, 1 medio, 2 abajo.

   La del medio paga los descuentos. Las otras cuatro pagan "otro intento":
   devuelven la jugada. Asi el cartel cruzado tambien sirve de algo, que es lo
   que hace que una maquina se sienta viva en vez de un boton de si o no. */
export const LINEAS = [
  { id: "centro", filas: [1, 1, 1, 1, 1], es: "Línea del medio", en: "Middle line" },
  { id: "arriba", filas: [0, 0, 0, 0, 0], es: "Línea de arriba", en: "Top line" },
  { id: "abajo",  filas: [2, 2, 2, 2, 2], es: "Línea de abajo",  en: "Bottom line" },
  { id: "uve",    filas: [0, 1, 2, 1, 0], es: "Diagonal en V",   en: "V diagonal" },
  { id: "cuna",   filas: [2, 1, 0, 1, 2], es: "Diagonal invertida", en: "Inverted V" },
];

const LINEA_PAGA = "centro";

const completa = (grilla, linea) => {
  const s = grilla[0][linea.filas[0]];
  return linea.filas.every((f, i) => grilla[i][f] === s);
};

/* Devuelve la primera linea completa, si hay alguna. Se usa para dibujarla y
   tambien para comprobar que no quede ninguna de regalo. */
export function lineaGanadora(grilla) {
  return LINEAS.find((l) => completa(grilla, l)) || null;
}

/* La grilla de 5x3 que van a mostrar los rodillos.

   El servidor ya decidio el premio; aca solo se arma lo que se ve para que
   cuadre con esa decision, y despues se rompe cualquier linea que haya salido
   completa de casualidad. Sin ese repaso se puede regalar un premio: cinco
   simbolos al azar arman una linea mas seguido de lo que parece. */
export function grillaDe(premio) {
  const grilla = Array.from({ length: RODILLOS }, () =>
    Array.from({ length: FILAS }, () => unoDe(SIMBOLOS))
  );

  let buena = null;
  if (premio.simbolo) {
    buena = LINEAS.find((l) => l.id === LINEA_PAGA);
    buena.filas.forEach((f, i) => { grilla[i][f] = premio.simbolo; });
  } else if (premio.id === "giro") {
    const otras = LINEAS.filter((l) => l.id !== LINEA_PAGA);
    buena = unoDe(otras);
    const simbolo = unoDe(SIMBOLOS);
    buena.filas.forEach((f, i) => { grilla[i][f] = simbolo; });
  }

  /* repaso: ninguna linea completa que no sea la que corresponde */
  for (let vuelta = 0; vuelta < 60; vuelta++) {
    const sobrante = LINEAS.find((l) => (!buena || l.id !== buena.id) && completa(grilla, l));
    if (!sobrante) break;

    /* se cambia una celda de la linea sobrante que no pertenezca a la buena:
       tocar una compartida borraria el premio. Dos lineas distintas siempre
       difieren en al menos dos rodillos, asi que siempre hay donde tocar. */
    const libres = sobrante.filas
      .map((f, i) => ({ i, f }))
      .filter(({ i, f }) => !buena || buena.filas[i] !== f);
    const { i, f } = unoDe(libres);
    grilla[i][f] = unoDe(SIMBOLOS.filter((s) => s !== grilla[i][f]));
  }

  return grilla;
}

export const TIRA_LARGO = 26;

/* La tira de un rodillo: relleno al azar y, al final, las tres celdas que van
   a quedar a la vista, de arriba hacia abajo. */
export function armarTira(columna) {
  const tira = [];
  for (let i = 0; i < TIRA_LARGO - FILAS; i++) tira.push(unoDe(SIMBOLOS));
  return tira.concat(columna);
}

export const PARADA = TIRA_LARGO - FILAS;

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
   Sin archivos de audio: todo se genera con Web Audio en el momento.

   Un oscilador suelto suena a juguete siempre, por mas notas que se le pongan.
   Lo que hace que algo suene grabado son cuatro cosas, y las cuatro estan
   aca:

   1. SALA. Nada suena en el vacio. Hay una reverb hecha con ruido que decae
      -una respuesta al impulso sintetica- y todo manda una parte ahi. Es el
      cambio que mas se nota de todos: sin sala, el mejor sonido sigue
      pareciendo un beep.
   2. CUERPO INARMONICO. Un metal no vibra en armonicos enteros como una
      cuerda. Las monedas y las campanas se arman con parciales corridos y
      desafinados al azar entre golpe y golpe; dos monedas iguales delatan
      la sintesis al instante.
   3. TRANSITORIO. El primer milisegundo de cualquier golpe real es ruido de
      banda ancha, no un tono. Cada pieza arranca con su chasquido filtrado.
   4. ESPACIO Y PEGAMENTO. Las monedas caen repartidas en el estereo y todo
      pasa por un compresor al final, que es lo que junta las piezas en una
      sola cosa en vez de sonar como capas apiladas.

   Todo lo largo se programa de una vez contra el reloj del audio, que no se
   corre aunque el navegador se distraiga. El contexto se crea en el primer
   clic, que es cuando el navegador deja. */

export function crearSonido() {
  let ctx = null;
  let ruido = null;
  let bus = null;

  const arrancar = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const bufferRuido = (c) => {
    if (ruido) return ruido;
    const n = Math.floor(c.sampleRate * 1);
    ruido = c.createBuffer(1, n, c.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return ruido;
  };

  /* la sala: ruido que decae, mas oscuro hacia el final, como cualquier
     ambiente grande */
  const impulso = (c, seg, caida) => {
    const n = Math.floor(c.sampleRate * seg);
    const b = c.createBuffer(2, n, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      let previo = 0;
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const crudo = (Math.random() * 2 - 1) * Math.pow(1 - t, caida);
        /* un pasabajos de un polo: la cola se va apagando en agudos */
        previo = previo + (crudo - previo) * (0.55 - t * 0.35);
        d[i] = previo;
      }
    }
    return b;
  };

  /* seco y humedo, con un compresor al final que junta todo */
  const maestro = (c) => {
    if (bus) return bus;
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 20;
    comp.ratio.value = 4;
    comp.attack.value = 0.004;
    comp.release.value = 0.2;
    comp.connect(c.destination);

    const sala = c.createConvolver();
    sala.buffer = impulso(c, 1.7, 2.4);
    const humedo = c.createGain();
    humedo.gain.value = 0.42;
    sala.connect(humedo).connect(comp);

    bus = { seco: comp, sala };
    return bus;
  };

  /* punto de entrada de una pieza: su lugar en el estereo y cuanto manda a
     la sala */
  const punto = (c, pan = 0, envio = 0.3, destino = null) => {
    const m = maestro(c);
    const p = c.createStereoPanner ? c.createStereoPanner() : null;
    const g = c.createGain();
    const salida = p || g;
    if (p) { p.pan.value = pan; p.connect(g); }
    g.connect(destino || m.seco);
    const env = c.createGain();
    env.gain.value = envio;
    g.connect(env).connect(m.sala);
    return salida;
  };

  const alAzar = (a, b) => a + Math.random() * (b - a);

  /* el transitorio: ruido corto por un pasabanda */
  const chasquido = (c, cuando, vol, frec, destino, largo = 0.035, q = 3.2) => {
    const s = c.createBufferSource();
    s.buffer = bufferRuido(c);
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = frec;
    f.Q.value = q;
    const g = c.createGain();
    const t0 = c.currentTime + cuando;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.0015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + largo);
    s.connect(f).connect(g).connect(destino);
    s.start(t0, Math.random() * 0.9);
    s.stop(t0 + largo + 0.02);
  };

  const parcial = (c, freq, cuando, largo, vol, destino, tipo = "sine") => {
    const osc = c.createOscillator();
    const g = c.createGain();
    const t0 = c.currentTime + cuando;
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + largo);
    osc.connect(g).connect(destino);
    osc.start(t0);
    osc.stop(t0 + largo + 0.04);
  };

  const nota = (freq, cuando, largo, tipo = "triangle", vol = 0.16, pan = 0) => {
    const c = arrancar();
    if (!c) return;
    parcial(c, freq, cuando, largo, vol, punto(c, pan, 0.28), tipo);
  };

  /* CAMPANA: parciales inarmonicos, desafinados distinto en cada golpe */
  const campana = (c, f0, cuando, largo, vol, pan = 0) => {
    const d = punto(c, pan, 0.5);
    [1, 2.76, 5.4, 8.93, 13.3].forEach((r, i) => {
      const peso = [1, 0.5, 0.3, 0.16, 0.08][i];
      parcial(c, f0 * r * alAzar(0.994, 1.006), cuando, largo * (1 - i * 0.13), vol * peso, d);
    });
    chasquido(c, cuando, vol * 0.4, 4200, d, 0.02);
  };

  /* MONEDA: cuatro parciales corridos que caen de tono, cada una distinta */
  const moneda = (c, cuando, vol = 0.075, pan = alAzar(-0.75, 0.75)) => {
    const d = punto(c, pan, 0.42);
    const base = alAzar(1500, 3100);
    const ratios = [1, alAzar(1.6, 1.9), alAzar(2.3, 2.7), alAzar(3.1, 3.6)];
    ratios.forEach((r, i) => {
      const largo = alAzar(0.12, 0.3) * (1 - i * 0.12);
      const osc = c.createOscillator();
      const g = c.createGain();
      const t0 = c.currentTime + cuando;
      osc.type = i ? "sine" : "triangle";
      osc.frequency.setValueAtTime(base * r, t0);
      osc.frequency.exponentialRampToValueAtTime(base * r * alAzar(0.74, 0.86), t0 + largo);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol * [1, 0.5, 0.3, 0.17][i]), t0 + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + largo);
      osc.connect(g).connect(d);
      osc.start(t0);
      osc.stop(t0 + largo + 0.04);
    });
    chasquido(c, cuando, vol * 0.7, alAzar(4200, 7000), d, 0.016, 1.6);
  };

  /* la bandeja: monedas al azar, repartidas en el estereo, con el volumen
     cayendo como cuando se termina de pagar */
  const bandeja = (c, cuantas, desde, largo, fuerza = 1) => {
    for (let i = 0; i < cuantas; i++) {
      const t = desde + Math.pow(i / cuantas, 0.85) * largo + alAzar(0, 0.045);
      moneda(c, t, 0.075 * fuerza * (1 - (i / cuantas) * 0.5));
    }
  };

  /* el frenazo de un rodillo: cuerpo grave, el golpe seco del tope y el
     timbre metalico que queda sonando */
  const golpe = (c, cuando, fuerza = 1, pan = 0) => {
    const d = punto(c, pan, 0.35);
    const osc = c.createOscillator();
    const g = c.createGain();
    const t0 = c.currentTime + cuando;
    osc.type = "sine";
    osc.frequency.setValueAtTime(180 * fuerza, t0);
    osc.frequency.exponentialRampToValueAtTime(52, t0 + 0.18);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(0.3 * fuerza, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26);
    osc.connect(g).connect(d);
    osc.start(t0);
    osc.stop(t0 + 0.3);
    chasquido(c, cuando, 0.22 * fuerza, 1500, d, 0.05, 1.4);
    chasquido(c, cuando + 0.004, 0.14 * fuerza, 5200, d, 0.02, 2.2);
    campana(c, alAzar(700, 880), cuando + 0.006, 0.22, 0.045 * fuerza, pan);
  };

  const FANFARRIA = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568];

  return {
    palanca() {
      const c = arrancar();
      if (!c) return;
      const d = punto(c, 0, 0.22);
      /* un boton real son dos ruidos: el contacto y el tope de abajo */
      chasquido(c, 0, 0.32, 3200, d, 0.018, 1.5);
      chasquido(c, 0.016, 0.2, 900, d, 0.05, 1.2);
      parcial(c, 78, 0.014, 0.13, 0.2, d, "sine");
    },

    rodando(frenosMs) {
      const c = arrancar();
      if (!c) return () => {};
      const m = maestro(c);

      const corte = c.createGain();
      corte.gain.value = 1;
      corte.connect(m.seco);
      const envio = c.createGain();
      envio.gain.value = 0.22;
      corte.connect(envio).connect(m.sala);

      const frenos = frenosMs.map((x) => x / 1000);
      const fin = Math.max(...frenos);
      const t0 = c.currentTime;

      /* el motor: ruido grave con una resonancia que baja al frenar */
      const motor = c.createBufferSource();
      motor.buffer = bufferRuido(c);
      motor.loop = true;
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(1100, t0);
      f.Q.value = 3.5;
      const gm = c.createGain();
      gm.gain.setValueAtTime(0.0001, t0);
      gm.gain.linearRampToValueAtTime(0.055, t0 + 0.12);
      frenos.forEach((x, i) => gm.gain.linearRampToValueAtTime(0.055 * (1 - (i + 1) / frenos.length), t0 + x));
      f.frequency.linearRampToValueAtTime(240, t0 + fin);
      motor.connect(f).connect(gm).connect(corte);
      motor.start(t0);
      motor.stop(t0 + fin + 0.3);

      /* las muescas: mas fuertes cuantos mas rodillos queden, y cada una con
         su tono, que es lo que evita el efecto de loop */
      const paso = 0.052;
      for (let t = 0; t < fin; t += paso) {
        const activos = frenos.filter((x) => x > t).length;
        if (!activos) break;
        chasquido(c, t, 0.03 + 0.02 * activos, alAzar(1800, 3200), corte, 0.028, 2.4);
      }

      frenos.forEach((x, i) =>
        golpe(c, x, i === frenos.length - 1 ? 1.3 : 0.85, -0.6 + i * 0.3));

      /* el subidon antes del ultimo rodillo */
      const previo = frenos[frenos.length - 2] ?? 0;
      const largo = Math.max(0.25, fin - previo);
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, t0 + previo);
      osc.frequency.exponentialRampToValueAtTime(720, t0 + fin);
      g.gain.setValueAtTime(0.0001, t0 + previo);
      g.gain.linearRampToValueAtTime(0.045, t0 + previo + largo * 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + fin + 0.05);
      osc.connect(g).connect(corte);
      osc.start(t0 + previo);
      osc.stop(t0 + fin + 0.1);

      return () => {
        try {
          const ahora = c.currentTime;
          corte.gain.cancelScheduledValues(ahora);
          corte.gain.setTargetAtTime(0, ahora, 0.02);
          setTimeout(() => { try { corte.disconnect(); } catch {} }, 400);
        } catch {}
      };
    },

    gano(nivel) {
      const c = arrancar();
      if (!c) return;
      const notas = nivel >= 2 ? FANFARRIA : FANFARRIA.slice(0, 4);

      notas.forEach((f, i) => {
        nota(f, i * 0.082, 0.28, "square", 0.055, -0.25);
        nota(f, i * 0.082, 0.44, "triangle", 0.1, 0.25);
      });
      const cierre = notas.length * 0.082;
      [notas[0], notas[2], notas[notas.length - 1]].forEach((f, i) =>
        nota(f, cierre, 0.95, "triangle", 0.085, (i - 1) * 0.35));

      if (nivel >= 2) {
        [0, 0.33, 0.66].forEach((t, i) => campana(c, 1046.5, cierre + t, 1.6, 0.15, (i - 1) * 0.3));
        bandeja(c, 44, cierre + 0.1, 2.6, 1.05);
        FANFARRIA.forEach((f, i) => nota(f * 2, cierre + 0.5 + i * 0.06, 0.6, "sine", 0.04, alAzar(-0.5, 0.5)));
      } else {
        campana(c, 880, cierre, 1.2, 0.1);
        bandeja(c, 18, cierre + 0.06, 1.1, 0.85);
      }
    },

    bonus() {
      const c = arrancar();
      if (!c) return;
      nota(659.25, 0, 0.22, "triangle", 0.11, -0.2);
      nota(987.77, 0.115, 0.4, "triangle", 0.11, 0.2);
      campana(c, 1318.5, 0.115, 0.85, 0.075);
      bandeja(c, 7, 0.2, 0.5, 0.65);
    },

    perdio() {
      nota(330, 0, 0.15, "triangle", 0.07);
      nota(247, 0.125, 0.28, "triangle", 0.06);
    },
  };
}
