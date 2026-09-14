/* ==================================================================
   POST /api/visitas   cuenta esta visita y devuelve los numeros
   GET  /api/visitas   solo mira, no suma

   El contador vive en Postgres y no en el navegador por la misma razon que
   el sorteo del tragamonedas: un numero que se guarda en localStorage lo
   sube cualquiera con F12, y uno que arranca de cero en cada maquina no es
   un contador, es un adorno.

   Que cuenta cada numero, para que el cartel no mienta:
     total    - sesiones. Recargar la pagina NO suma; volver despues de
                media hora, si.
     personas - huellas distintas que pasaron alguna vez.
     hoy      - de esas personas, cuantas pasaron desde las 00:00.

   La huella es la misma de /api/jugar: sha256(sal | ip | user-agent |
   idioma), calculada aca y nunca en el cliente. La IP no se guarda en
   claro ni sale de esta funcion.
   ================================================================== */

import { createHash } from "node:crypto";

const URL_SB = process.env.SUPABASE_URL;
const KEY_SB = process.env.SUPABASE_ANON_KEY;
const SECRETO = process.env.SB2B_SECRETO;
const SAL = process.env.SB2B_SAL;

const sha = (s) => createHash("sha256").update(s).digest("hex");

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
    return res.status(500).json({ error: "contador sin configurar" });
  }
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "metodo no permitido" });
  }

  const ip = ipDe(req);
  const navegador = String(req.headers["user-agent"] || "");
  const idioma = String(req.headers["accept-language"] || "");
  const huella = sha(`${SAL}|${ip}|${navegador}|${idioma}`);

  try {
    const filas = await rpc("sb2b_visita", {
      p_secreto: SECRETO,
      p_huella: huella,
      p_sumar: req.method === "POST",
    });
    const v = Array.isArray(filas) ? filas[0] : null;
    if (!v) throw new Error("la base no devolvio el contador");

    return res.status(200).json({
      total: Number(v.total) || 0,
      personas: Number(v.personas) || 0,
      hoy: Number(v.hoy) || 0,
    });
  } catch (e) {
    console.error("[visitas]", e.message);
    /* Un contador roto no puede romper la pagina: se contesta 200 con el
       cartel apagado y el pie se dibuja sin el. */
    return res.status(200).json({ total: null, personas: null, hoy: null });
  }
}
