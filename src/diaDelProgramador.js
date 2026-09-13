/* ==================================================================
   DIA DEL PROGRAMADOR — el mismo script que corre en la terminal

   brand/stdb2b.ts se ejecuta con `node brand/stdb2b.ts`. Aca esta
   portado con un solo cambio: console.log() paso a ser log(), asi la
   salida cae en la pantalla en lugar de la consola. Los textos, el
   orden y la espera de 500 ms entre etapas son los del original.

   Cada linea que sale lleva su ancla: el pedazo de codigo fuente que
   la imprimio. Con eso la pantalla puede ir marcando, mientras corre,
   que linea del archivo esta hablando.
   ================================================================== */

export const CANCELADO = { cancelado: true };

const RITMO = 240;   // pausa entre lineas sueltas, para que se lea como terminal
const ETAPA = 500;   // la del for...of del original

/* los tres bloques que se recorren de a un renglon: en vez de buscar
   cada valor por separado -hay claves repetidas entre los dos objetos-
   se ancla el arranque del bloque y se cuenta desde ahi */
const B_STUDIO = "const studioB2B: Developer = {";
const B_PROCESO = "const proceso = [";
const B_PROGRAMADOR = "const programador = {";

const studioB2B = {
  pasion: true,
  creatividad: 100,
  cafe: Infinity,
  bugs: 404,
  soluciones: 200,
  motivacion: "infinita",
};

const recortar = (s) => s.replace(/^\n+/, "").replace(/\n+$/, "");

async function transformarIdeas(log, esperar, ritmo) {
  const proceso = [
    "💡 Analizar la idea",
    "🎨 Diseñar la experiencia",
    "💻 Escribir código",
    "🧠 Resolver problemas",
    "🐛 Corregir bugs",
    "🚀 Crear soluciones",
    "🌎 Construir un futuro mejor",
  ];

  await esperar(RITMO * ritmo);
  log(
    recortar(`
╔══════════════════════════════════════════════╗
║                                              ║
║       FELIZ DÍA DEL PROGRAMADOR              ║
║                                              ║
║            < / >  STUDIOB2B                  ║
║                                              ║
║   CÓDIGO QUE TRANSFORMA IDEAS EN REALIDAD    ║
║                                              ║
╚══════════════════════════════════════════════╝
`),
    "banner",
    { ancla: "╔═" }
  );

  for (let i = 0; i < proceso.length; i++) {
    await esperar(ETAPA * ritmo);
    log(`✓ ${proceso[i]}`, "ok", { ancla: B_PROCESO, salto: 1 + i });
  }

  return "Proyecto listo para cambiar el mundo 🚀";
}

async function celebrarProgramadores(log, esperar, ritmo) {
  const programador = {
    ideas: "∞",
    creatividad: "∞",
    aprendizaje: "constante",
    errores: "parte del proceso",
    soluciones: "siempre aparecen",
    futuro: "lo estamos programando",
  };

  const regla = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  const anclaTitulo = { ancla: "👨‍💻" };

  log(regla, "regla", anclaTitulo);
  await esperar(RITMO * ritmo);
  log("👨‍💻 FELIZ DÍA DEL PROGRAMADOR 👩‍💻", "titulo", anclaTitulo);
  await esperar(RITMO * ritmo);
  log(regla, "regla", anclaTitulo);

  await esperar(RITMO * ritmo);
  log(
    recortar(`
Gracias a quienes convierten
una pantalla vacía en una idea,
una idea en código
y el código en una solución.
`),
    "texto",
    { ancla: "una pantalla vacía en una idea," }
  );

  const filas = Object.entries(programador);
  for (let i = 0; i < filas.length; i++) {
    const [clave, valor] = filas[i];
    await esperar(RITMO * 0.62 * ritmo);
    log(`⚡ ${clave.toUpperCase()}: ${valor}`, "kv", { ancla: B_PROGRAMADOR, salto: 1 + i });
  }

  await esperar(RITMO * ritmo);
  log(
    recortar(`
"Programar no es solamente escribir código.
Es imaginar algo que todavía no existe
y encontrar la forma de hacerlo realidad."

— StudioB2B 💙
`),
    "cita",
    { ancla: "Programar no es solamente escribir código." }
  );
}

export async function correr({ log, esperar, ritmo = 1 }) {
  await celebrarProgramadores(log, esperar, ritmo);

  const resultado = await transformarIdeas(log, esperar, ritmo);

  await esperar(RITMO * ritmo);
  log(resultado, "res", { ancla: "Proyecto listo para cambiar el mundo" });

  await esperar(RITMO * ritmo);
  log(
    recortar(`
[ STATUS ] STUDIOB2B
  pasion .................. ${studioB2B.pasion}
  creatividad ............. ${studioB2B.creatividad}
  cafe .................... ${studioB2B.cafe}
  bugs encontrados ........ ${studioB2B.bugs}
  soluciones entregadas ... ${studioB2B.soluciones}
  motivacion .............. ${studioB2B.motivacion}
`),
    "status",
    { ancla: B_STUDIO, salto: 1 }
  );

  await esperar(RITMO * ritmo);
  log(
    recortar(`
┌────────────────────────────────────────────┐
│              STUDIOB2B                     │
│                                            │
│       IDEAS → CÓDIGO → SOLUCIONES          │
│                                            │
│          KEEP CODING... 🚀                 │
└────────────────────────────────────────────┘
`),
    "box",
    { ancla: "┌─" }
  );
}

/* cuantas lineas va a escribir la corrida: sirve para la barra de progreso
   sin tener que correrla antes.
   3 reglas y titulo + 1 poema + 6 atributos + 1 cita + 1 cartel + 7 etapas
   + 1 resultado + 1 status + 1 cierre */
export const TOTAL_LINEAS = 3 + 1 + 6 + 1 + 1 + 7 + 1 + 1 + 1;
