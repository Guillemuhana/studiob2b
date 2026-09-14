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

/* Cualquiera de los siete puede pagar: lo que manda es cuantos iguales salen
   al hilo, no cual simbolo. El logo es el unico con premio propio -los cinco
   logos son el mayor-; los demas pagan por cantidad. */
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
    iguales: 5,
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
    iguales: 5,
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
    iguales: 5,
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
    iguales: 5,
    peso: 15,
    rango: "MINI",
    monto: "10%",
    es: "10% de descuento en tu proyecto",
    en: "10% off your project",
    detalle_es: "Sobre el presupuesto final del primer proyecto que hagamos juntos.",
    detalle_en: "Off the final quote of the first project we build together.",
  },
  {
    id: "bonus3",
    /* simbolo en null: estos no los paga un simbolo fijo sino una cantidad de
       iguales. grillaDe() usa "iguales" para armar la linea, e "icono" es
       solo para mostrarlo en la tabla y la marquesina. */
    simbolo: null,
    icono: "giro",
    iguales: 3,
    peso: 8,
    rango: "BONUS",
    monto: "+1",
    es: "¡BONUS! Otro intento",
    en: "BONUS! Another spin",
    detalle_es: "Tres iguales: esta jugada no te la contamos.",
    detalle_en: "Three in a row: this spin is on us.",
  },
  {
    id: "bonus4",
    simbolo: null,
    icono: "giro",
    iguales: 4,
    peso: 4,
    rango: "SUPER BONUS",
    monto: "+2",
    es: "¡SUPER BONUS! Dos jugadas más",
    en: "SUPER BONUS! Two more spins",
    detalle_es: "Cuatro iguales: te devolvemos la jugada y te regalamos otra.",
    detalle_en: "Four in a row: we give this spin back and add another.",
  },
  {
    id: null,
    simbolo: null,
    iguales: 0,
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

   Las cinco pagan igual: lo que decide el premio es cuantos iguales salen al
   hilo desde la izquierda, no en que linea. Tres pagan BONUS, cuatro SUPER
   BONUS y cinco el descuento, caiga donde caiga. */
export const LINEAS = [
  { id: "centro", filas: [1, 1, 1, 1, 1], es: "Línea del medio", en: "Middle line" },
  { id: "arriba", filas: [0, 0, 0, 0, 0], es: "Línea de arriba", en: "Top line" },
  { id: "abajo",  filas: [2, 2, 2, 2, 2], es: "Línea de abajo",  en: "Bottom line" },
  { id: "uve",    filas: [0, 1, 2, 1, 0], es: "Diagonal en V",   en: "V diagonal" },
  { id: "cuna",   filas: [2, 1, 0, 1, 2], es: "Diagonal invertida", en: "Inverted V" },
];

/* La grilla de 5x3 que van a mostrar los rodillos.

   El servidor ya decidio el premio; aca solo se arma lo que se ve para que
   cuadre con esa decision, y despues se rompe cualquier linea que haya salido
   completa de casualidad. Sin ese repaso se puede regalar un premio: cinco
   simbolos al azar arman una linea mas seguido de lo que parece. */
export function grillaDe(premio) {
  const grilla = Array.from({ length: RODILLOS }, () =>
    Array.from({ length: FILAS }, () => unoDe(SIMBOLOS))
  );

  /* Las celdas que forman el premio no se tocan mas: el repaso de abajo rompe
     lineas que salieron de casualidad, y sin esta lista podia romper justo la
     que paga. */
  const intocables = new Set();
  const proteger = (i, f) => intocables.add(i + "," + f);

  /* cuantos iguales al hilo trae una linea, contados desde la izquierda, que
     es como se paga en cualquier maquina */
  const corrida = (l) => {
    let n = 1;
    while (n < RODILLOS && grilla[n][l.filas[n]] === grilla[0][l.filas[0]]) n++;
    return n;
  };

  let linea = null;

  if (premio.iguales >= 3) {
    /* El premio cae en CUALQUIERA de las cinco lineas: la del medio, la de
       arriba, la de abajo o las dos diagonales. Antes siempre pagaba la del
       medio y se notaba enseguida que las otras cuatro eran decorado. */
    linea = unoDe(LINEAS);
    const simbolo = premio.simbolo || unoDe(SIMBOLOS);
    const otros = SIMBOLOS.filter((x) => x !== simbolo);
    linea.filas.forEach((f, i) => {
      /* los primeros n iguales; el que sigue distinto, o tres se convierten
         en cuatro sin querer */
      grilla[i][f] = i < premio.iguales ? simbolo : unoDe(otros);
      proteger(i, f);
    });
  } else {
    /* Perder con cinco simbolos sueltos no se mira: la jugada se termina en el
       segundo rodillo. Casi la mitad de las veces se arma un casi-premio en
       una linea al azar, ARRANCANDO EN EL SEGUNDO RODILLO. Como se paga de
       izquierda a derecha, tres iguales empezando en el primero YA son un
       BONUS, y una jugada perdida que los muestre deja al que la mira
       sintiendose estafado, con razon. */
    if (azar() < 0.45) {
      const l = unoDe(LINEAS);
      const base = unoDe(SIMBOLOS);
      const otros = SIMBOLOS.filter((x) => x !== base);
      const desde = azar() < 0.5 ? 1 : 2;
      const hasta = Math.min(RODILLOS, desde + (azar() < 0.5 ? 4 : 3));
      l.filas.forEach((f, i) => {
        grilla[i][f] = i >= desde && i < hasta ? base : unoDe(otros);
      });
    }
  }

  /* Repaso. Ninguna linea que no sea la premiada puede llegar a tres iguales
     desde la izquierda: con cinco lineas pagando, tres simbolos al azar la
     arman bastante seguido, y eso seria un BONUS que el servidor nunca dio.
     Se corrige el tercer rodillo de la linea sobrante, que es el que cierra
     la corrida mas corta que paga. */
  for (let vuelta = 0; vuelta < 80; vuelta++) {
    const sobrante = LINEAS.find(
      (l) => (!linea || l.id !== linea.id) && corrida(l) >= 3
    );
    if (!sobrante) break;
    const libres = [2, 1, 3, 4]
      .map((i) => ({ i, f: sobrante.filas[i] }))
      .filter(({ i, f }) => !intocables.has(i + "," + f));
    if (!libres.length) break;
    const { i, f } = libres[0];
    grilla[i][f] = unoDe(SIMBOLOS.filter((x) => x !== grilla[i][f]));
  }

  return { grilla, linea };
}

export const CARAS = 12;
export const PASO = 360 / CARAS;
/* la cara que queda al frente cuando el tambor esta en su angulo de parada */
export const CARA_FRENTE = 6;

/* Las doce caras de un rodillo: relleno al azar salvo las tres que van a
   quedar a la vista, que son la columna que mando el servidor. */
export function armarTambor(columna) {
  const caras = Array.from({ length: CARAS }, () => unoDe(SIMBOLOS));
  caras[CARA_FRENTE - 1] = columna[0];
  caras[CARA_FRENTE] = columna[1];
  caras[CARA_FRENTE + 1] = columna[2];
  return caras;
}

/* El angulo al que tiene que frenar: vueltas enteras mas el offset que deja
   la cara del frente mirando al jugador. */
export function anguloDeParada(vueltas) {
  return -(360 * vueltas + CARA_FRENTE * PASO);
}

/* El arranque escalonado: los rodillos de una maquina no salen los cinco
   juntos, sale uno detras de otro. Se le descuenta al tiempo de giro para que
   cada uno siga frenando cuando tiene que frenar y el sonido no se corra. */
export const SALIDA = [0, 70, 140, 210, 280];

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

    /* cada escalon que sube el medidor del bonus: una nota mas aguda que la
       anterior, que es lo que hace que se sienta que trepa */
    escalon(n) {
      const escala = [392, 466, 523, 587, 659, 784];
      const f = escala[Math.min(n, escala.length - 1)];
      nota(f, 0, 0.16, "square", 0.07);
      nota(f * 2, 0.01, 0.22, "triangle", 0.09);
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
