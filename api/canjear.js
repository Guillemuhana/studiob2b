/* ==================================================================
   POST /api/canjear   { codigo, por }   canjea un codigo. Una sola vez.
   GET  /api/canjear?codigo=...          solo mira, no lo marca

   Es la pantalla del otro lado del mostrador: cuando alguien llega con su
   codigo, esto dice si existe, si ya lo uso y si sigue en fecha.

   Va con clave: la cabecera x-sb2b-admin tiene que traer SB2B_ADMIN. Sin eso
   cualquiera podria quemar codigos ajenos.
   ================================================================== */

const URL_SB = process.env.SUPABASE_URL;
const KEY_SB = process.env.SUPABASE_ANON_KEY;
const SECRETO = process.env.SB2B_SECRETO;
const ADMIN = process.env.SB2B_ADMIN;

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

  if (!URL_SB || !KEY_SB || !SECRETO || !ADMIN) {
    return res.status(500).json({ error: "casino sin configurar" });
  }

  const clave = req.headers["x-sb2b-admin"];
  if (!clave || clave !== ADMIN) return res.status(401).json({ error: "no autorizado" });

  const codigo = req.method === "GET"
    ? String(req.query?.codigo || "")
    : String((req.body && req.body.codigo) || "");
  if (!codigo.trim()) return res.status(400).json({ error: "falta el codigo" });

  try {
    /* Un GET no puede cambiar nada: va contra sb2b_ver, que solo mira. El
       POST es el unico que marca el canje. */
    if (req.method === "GET") {
      const filas = await rpc("sb2b_ver", { p_secreto: SECRETO, p_codigo: codigo });
      const j = Array.isArray(filas) ? filas[0] : null;
      return res.status(200).json(j || { estado: "inexistente" });
    }

    const filas = await rpc("sb2b_canjear", {
      p_secreto: SECRETO,
      p_codigo: codigo,
      p_por: String((req.body && req.body.por) || "mostrador").slice(0, 80),
    });
    const j = Array.isArray(filas) ? filas[0] : null;
    return res.status(200).json(j || { estado: "inexistente" });
  } catch (e) {
    console.error("[canjear]", e.message);
    return res.status(502).json({ error: "no pudimos consultar el codigo" });
  }
}
