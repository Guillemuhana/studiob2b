// 13 de Septiembre - Día del Programador
// StudioB2B celebra a quienes transforman ideas en realidad 🚀

type Developer = {
  pasion: boolean;
  creatividad: number;
  cafe: number;
  bugs: number;
  soluciones: number;
  motivacion: "infinita";
};

const studioB2B: Developer = {
  pasion: true,
  creatividad: 100,
  cafe: Infinity,
  bugs: 404,
  soluciones: 200,
  motivacion: "infinita",
};

const transformarIdeas = async (): Promise<string> => {
  const proceso = [
    "💡 Analizar la idea",
    "🎨 Diseñar la experiencia",
    "💻 Escribir código",
    "🧠 Resolver problemas",
    "🐛 Corregir bugs",
    "🚀 Crear soluciones",
    "🌎 Construir un futuro mejor",
  ];

  console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║       FELIZ DÍA DEL PROGRAMADOR              ║
║                                              ║
║            < / >  STUDIOB2B                  ║
║                                              ║
║   CÓDIGO QUE TRANSFORMA IDEAS EN REALIDAD    ║
║                                              ║
╚══════════════════════════════════════════════╝
`);

  for (const etapa of proceso) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`✓ ${etapa}`);
  }

  return "Proyecto listo para cambiar el mundo 🚀";
};

function celebrarProgramadores(): void {
  const programador = {
    ideas: "∞",
    creatividad: "∞",
    aprendizaje: "constante",
    errores: "parte del proceso",
    soluciones: "siempre aparecen",
    futuro: "lo estamos programando",
  };

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👨‍💻 FELIZ DÍA DEL PROGRAMADOR 👩‍💻");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  console.log(`
Gracias a quienes convierten
una pantalla vacía en una idea,
una idea en código
y el código en una solución.
`);

  Object.entries(programador).forEach(([key, value]) => {
    console.log(`⚡ ${key.toUpperCase()}: ${value}`);
  });

  console.log(`
"Programar no es solamente escribir código.
Es imaginar algo que todavía no existe
y encontrar la forma de hacerlo realidad."

— StudioB2B 💙
`);
}

async function main() {
  celebrarProgramadores();

  const resultado = await transformarIdeas();

  console.log("\n" + resultado);

  console.log(`
[ STATUS ] STUDIOB2B
  pasion .................. ${studioB2B.pasion}
  creatividad ............. ${studioB2B.creatividad}
  cafe .................... ${studioB2B.cafe}
  bugs encontrados ........ ${studioB2B.bugs}
  soluciones entregadas ... ${studioB2B.soluciones}
  motivacion .............. ${studioB2B.motivacion}
`);

  console.log(`
┌────────────────────────────────────────────┐
│              STUDIOB2B                     │
│                                            │
│       IDEAS → CÓDIGO → SOLUCIONES          │
│                                            │
│          KEEP CODING... 🚀                 │
└────────────────────────────────────────────┘
`);
}

main();