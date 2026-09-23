/* ==================================================================
   POST /api/jugar     juega (o devuelve la jugada que ya existe)
   GET  /api/jugar     solo consulta, no crea nada

   Por que existe este archivo: el sorteo no puede vivir en el navegador.
   Cualquiera abre el inspector, pisa crypto.getRandomValues y se fabrica el
   premio mayor -de hecho es exactamente lo que hace nuestra propia prueba-.
   Aca el premio lo decide Postgres y el codigo sale de la base, unico por
   construccion.

   El tope es de tres jugadas por IP y lo cuenta Postgres, con un cerrojo por
   IP para que dos clics simultaneos no entren los dos. Los codigos, en cambio,
   son por navegador: la IP la comparte media oficina y el premio de uno no es
   de todos.

   Ni la IP ni la huella las manda el cliente: si viajaran en el cuerpo del
   pedido, cambiarlas seria tan facil como editar un fetch. Las dos se hashean
   con sal, asi que la IP nunca se guarda en claro ni sale de esta funcion.
   ================================================================== */

import { createHash, timingSafeEqual } from "node:crypto";

const URL_SB = process.env.SUPABASE_URL;
const KEY_SB = process.env.SUPABASE_ANON_KEY;
const SECRETO = process.env.SB2B_SECRETO;
const SAL = process.env.SB2B_SAL;
/* solo para contestar cuando todavia no hay ninguna fila; el tope de verdad
   lo tiene la base, en sb2b_config_num */
const TOPE = 3;
/* La llave de prueba: quien la trae juega sin tope y sus jugadas quedan
   marcadas como prueba, asi no ensucian las estadisticas ni le comen el cupo
   a nadie. Es un header y no un dato del cuerpo para que no se cuele por una
   copia del link sin querer. */
const LIBRE = process.env.SB2B_LIBRE;

/* La contrasena de la puerta. La pantalla que la pide esta en el navegador,
   pero quien la hace valer es este archivo: sin ella la API no gira ni
   consulta, asi que saltearse la pantalla desde el inspector no sirve de
   nada. Se cambia en Vercel con SB2B_CLAVE_JUGAR, sin tocar codigo. */
const CLAVE = process.env.SB2B_CLAVE_JUGAR || "pecifajuega";

const sha = (s) => createHash("sha256").update(s).digest("hex");

/* Viaja con encodeURIComponent porque un header no acepta acentos ni la ene.
   Se compara sin mayusculas ni espacios de mas -en el celular el teclado
   pone la primera en mayuscula solo- y en tiempo constante. */
function claveOk(bruta) {
  let clave = "";
  try { clave = decodeURIComponent(String(bruta || "")); } catch { return false; }
  const a = Buffer.from(sha(clave.trim().toLowerCase()), "hex");
  const b = Buffer.from(sha(CLAVE.trim().toLowerCase()), "hex");
  return timingSafeEqual(a, b);
}

/* El nombre del jugador, para el ranking de Pecifa. Viaja codificado como la
   clave; si no viene o no se lee, se juega igual y la jugada no suma. */
function nombreDe(req) {
  try {
    return decodeURIComponent(String(req.headers["x-sb2b-nombre"] || "")).replace(/\s+/g, " ").trim().slice(0, 40);
  } catch {
    return "";
  }
}

/* x-forwarded-for llega como "cliente, proxy1, proxy2": el primero es el que
   importa. Vercel lo arma el mismo, asi que no lo puede falsear el cliente. */
function ipDe(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) return xff.split(",")[0].trim();
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "desconocida";
}

async function rpc(nombre, cuerpo) {
  const r = await fetch(`${URL_SB}/rest/v1/rpc/${nombre}`, {
    method: "POST",
    headers: {
      apikey: KEY_SB,
      Authorization: `Bearer ${KEY_SB}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cuerpo),
  });
  const texto = await r.text();
  if (!r.ok) throw new Error(`supabase ${r.status}: ${texto.slice(0, 300)}`);
  return texto ? JSON.parse(texto) : null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!URL_SB || !KEY_SB || !SECRETO || !SAL) {
    return res.status(500).json({ error: "casino sin configurar" });
  }
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "metodo no permitido" });
  }

  const ip = ipDe(req);
  const navegador = String(req.headers["user-agent"] || "");
  const idioma = String(req.headers["accept-language"] || "");
  const huella = sha(`${SAL}|${ip}|${navegador}|${idioma}`);
  const ipHash = sha(`${SAL}|${ip}`);
  const libre = !!LIBRE && req.headers["x-sb2b-libre"] === LIBRE;

  if (!libre && !claveOk(req.headers["x-sb2b-clave"])) {
    /* un respiro antes de contestar, para que probar claves de a miles no
       sea gratis */
    await new Promise((r) => setTimeout(r, 600));
    return res.status(401).json({ error: "clave incorrecta" });
  }

  try {
    /* GET /api/jugar?ranking=1 -> la tabla de posiciones. Va detras de la
       misma clave que la maquina, asi que solo la ven los que juegan. */
    if (req.method === "GET" && req.query?.ranking) {
      const filas = (await rpc("sb2b_ranking_top", { p_secreto: SECRETO, p_limite: 20 })) || [];
      return res.status(200).json({ ranking: filas });
    }

    if (req.method === "GET") {
      const filas = (await rpc("sb2b_consultar", {
        p_secreto: SECRETO,
        p_huella: huella,
        p_ip_hash: ipHash,
        p_libre: libre,
      })) || [];
      /* los puntos de este jugador, para pintar el marcador al entrar */
      let mios = null;
      const nombre = nombreDe(req);
      if (nombre) {
        try {
          const r = await rpc("sb2b_mis_puntos", { p_secreto: SECRETO, p_huella: huella, p_nombre: nombre, p_libre: libre });
          const f = Array.isArray(r) ? r[0] : null;
          if (f) mios = { total: Number(f.total), jugadas: Number(f.jugadas), puesto: f.puesto == null ? null : Number(f.puesto) };
        } catch (e) {
          console.error("[ranking]", e.message);
        }
      }
      return res.status(200).json({
        mios,
        /* las jugadas de la IP cuentan para el tope, pero solo viajan las de
           este navegador: en una oficina todos comparten IP y el codigo del
           companero no tiene por que aparecer -ni poder reclamarse- aca */
        jugadas: filas.filter((j) => j.mia).map((j) => ({
          premio: j.premio,
          codigo: j.codigo,
          creado: j.creado,
          canjeado: !!j.canjeado_en,
        })),
        usadasEnLaIp: filas.length,
        /* si no hay ninguna fila la base no devuelve restantes: entonces no
           jugo nadie desde esta IP y le quedan las tres */
        restantes: libre ? 99 : (filas.length ? filas[0].restantes : TOPE),
        libre,
      });
    }

    const filas = await rpc("sb2b_jugar", {
      p_secreto: SECRETO,
      p_huella: huella,
      p_ip_hash: ipHash,
      p_libre: libre,
    });
    const j = Array.isArray(filas) ? filas[0] : null;
    if (!j) throw new Error("la base no devolvio jugada");

    if (j.agotado) {
      return res.status(200).json({ agotado: true, restantes: 0 });
    }

    /* Los puntos se anotan aca, con el premio que acaba de dar la base: el
       navegador no dice cuanto gano, solo quien es. Si el ranking falla, la
       jugada vale igual. */
    let puntos = null;
    let total = null;
    const nombre = nombreDe(req);
    if (nombre) {
      try {
        const r = await rpc("sb2b_sumar", {
          p_secreto: SECRETO, p_huella: huella, p_nombre: nombre, p_premio: j.premio, p_libre: libre,
        });
        const fila = Array.isArray(r) ? r[0] : null;
        if (fila) { puntos = fila.puntos; total = Number(fila.total); }
      } catch (e) {
        console.error("[ranking]", e.message);
      }
    }

    return res.status(200).json({
      puntos,
      total,
      premio: j.premio,
      codigo: j.codigo,
      creado: j.creado,
      restantes: j.restantes,
      agotado: false,
      libre,
    });
  } catch (e) {
    console.error("[jugar]", e.message);
    return res.status(502).json({ error: "no pudimos girar la maquina" });
  }
}
