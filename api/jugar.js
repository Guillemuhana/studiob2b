/* ==================================================================
   POST /api/jugar     juega (o devuelve la jugada que ya existe)
   GET  /api/jugar     solo consulta, no crea nada

   Por que existe este archivo: el sorteo no puede vivir en el navegador.
   Cualquiera abre el inspector, pisa crypto.getRandomValues y se fabrica el
   premio mayor -de hecho es exactamente lo que hace nuestra propia prueba-.
   Aca el premio lo decide Postgres y el codigo sale de la base, unico por
   construccion.

   El tope es de tres jugadas por IP y lo cuenta Postgres, con un cerrojo por
   IP para que dos clics simultaneos no entren los dos.

   Ni la IP ni la huella las manda el cliente: si viajaran en el cuerpo del
   pedido, cambiarlas seria tan facil como editar un fetch. Las dos se hashean
   con sal, asi que la IP nunca se guarda en claro ni sale de esta funcion.
   ================================================================== */

import { createHash } from "node:crypto";

const URL_SB = process.env.SUPABASE_URL;
const KEY_SB = process.env.SUPABASE_ANON_KEY;
const SECRETO = process.env.SB2B_SECRETO;
const SAL = process.env.SB2B_SAL;
/* solo para contestar cuando todavia no hay ninguna fila; el tope de verdad
   lo tiene la base, en sb2b_config_num */
const TOPE = 3;

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

  try {
    if (req.method === "GET") {
      const filas = (await rpc("sb2b_consultar", { p_secreto: SECRETO, p_ip_hash: ipHash })) || [];
      return res.status(200).json({
        jugadas: filas.map((j) => ({
          premio: j.premio,
          codigo: j.codigo,
          creado: j.creado,
          canjeado: !!j.canjeado_en,
        })),
        /* si no hay ninguna fila la base no devuelve restantes: entonces no
           jugo nadie desde esta IP y le quedan las tres */
        restantes: filas.length ? filas[0].restantes : TOPE,
      });
    }

    const filas = await rpc("sb2b_jugar", {
      p_secreto: SECRETO,
      p_huella: huella,
      p_ip_hash: ipHash,
    });
    const j = Array.isArray(filas) ? filas[0] : null;
    if (!j) throw new Error("la base no devolvio jugada");

    if (j.agotado) {
      return res.status(200).json({ agotado: true, restantes: 0 });
    }
    return res.status(200).json({
      premio: j.premio,
      codigo: j.codigo,
      creado: j.creado,
      restantes: j.restantes,
      agotado: false,
    });
  } catch (e) {
    console.error("[jugar]", e.message);
    return res.status(502).json({ error: "no pudimos girar la maquina" });
  }
}
