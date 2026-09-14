import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/* ==================================================================
   /api en desarrollo

   `npm run dev` levanta Vite, y Vite no ejecuta las funciones de la
   carpeta api/: eso lo hace Vercel en produccion. Sin esto, en local
   el POST a /api/jugar da 404, la maquina muestra "no pudimos
   conectar" y el boton de girar no hace nada. Anda en el sitio
   publicado y no anda en la maquina de uno, que es la peor forma de
   que algo este roto.

   El plugin resuelve las dos situaciones:

   - Con las variables de entorno puestas (npx vercel env pull
     .env.local), corre la funcion de verdad, contra la base de
     verdad. Es identico a produccion.
   - Sin las variables, contesta una jugada simulada para que la
     maquina se pueda usar igual mientras se trabaja en el diseno.
     Esas jugadas no existen en ningun lado: son solo para la pantalla.
   ================================================================== */
function apiEnDesarrollo(env) {
  const hayBase = !!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY && env.SB2B_SECRETO && env.SB2B_SAL);

  /* sorteo local, con los mismos pesos que publica la pagina */
  const simularJugada = (metodo) => {
    if (metodo !== "POST") return { jugadas: [], restantes: 9999, libre: false, simulado: true };
    const r = Math.random() * 100;
    const premio = r < 8 ? "logo" : r < 18 ? "diamante" : r < 31 ? "lingote"
      : r < 48 ? "moneda" : r < 57 ? "bonus3" : r < 62 ? "bonus4" : "nada";
    const raiz = { logo: "30OFF", diamante: "20OFF", lingote: "15OFF", moneda: "10OFF" }[premio];
    const cola = Array.from({ length: 5 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
    return {
      premio,
      codigo: raiz ? `SB2B-LOCAL-${raiz}-${cola}` : null,
      creado: new Date().toISOString(),
      restantes: 9999,
      agotado: false,
      libre: false,
      simulado: true,
    };
  };

  /* el contador en local: numeros de mentira, pero que se mueven, para poder
     mirar como queda el cartel sin tocar los de verdad */
  let visitasFalsas = 1234;
  const simularVisitas = (metodo) => {
    if (metodo === "POST") visitasFalsas += 1;
    return { total: visitasFalsas, personas: Math.round(visitasFalsas * 0.62), hoy: 17, simulado: true };
  };

  const simular = (nombre, metodo) =>
    nombre === "visitas" ? simularVisitas(metodo) : simularJugada(metodo);

  return {
    name: "sb2b-api-en-desarrollo",
    apply: "serve",
    configureServer(server) {
      if (hayBase) Object.assign(process.env, env);
      else server.config.logger.warn(
        "\n  [casino] Sin variables de entorno: /api/jugar y /api/visitas responden datos simulados.\n" +
        "           Para probar contra la base real: npx vercel env pull .env.local\n"
      );

      server.middlewares.use(async (req, res, siguiente) => {
        if (!req.url || !req.url.startsWith("/api/")) return siguiente();

        const url = new URL(req.url, "http://localhost");
        const nombre = url.pathname.replace("/api/", "");

        const responder = (codigo, cuerpo) => {
          res.statusCode = codigo;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(cuerpo));
        };

        if (!hayBase) return responder(200, simular(nombre, req.method));

        try {
          const mod = await server.ssrLoadModule(`/api/${nombre}.js`);
          const manejar = mod.default;
          if (typeof manejar !== "function") return siguiente();

          /* el cuerpo llega en trozos; Vercel lo entrega ya parseado */
          const crudo = await new Promise((ok) => {
            let d = "";
            req.on("data", (t) => { d += t; });
            req.on("end", () => ok(d));
          });
          req.query = Object.fromEntries(url.searchParams);
          try { req.body = crudo ? JSON.parse(crudo) : {}; } catch { req.body = {}; }

          /* el minimo de la interfaz de Vercel que usan las funciones */
          res.status = (n) => { res.statusCode = n; return res; };
          res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); return res; };

          await manejar(req, res);
        } catch (e) {
          server.config.logger.error(`  [casino] /api/${nombre} fallo en dev: ${e.message}`);
          responder(500, { error: "la funcion fallo en desarrollo" });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), apiEnDesarrollo(env)],
    server: { port: 5173, open: true },
  };
});
