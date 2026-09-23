/* ==================================================================
   Una página estática por ruta, con sus propias etiquetas sociales.

   POR QUÉ EXISTE ESTE ARCHIVO. El sitio es una SPA: el servidor
   devuelve siempre el mismo index.html y el resto lo arma el navegador.
   Los robots de Facebook, Instagram, WhatsApp, X y LinkedIn NO ejecutan
   JavaScript: leen el HTML tal cual sale del servidor. Con una sola
   plantilla, el link de cualquier ruta se previsualiza con el título, la
   descripción y la imagen del home.

   Eso, en una publicidad paga, significa pagar por un aviso cuyo enlace
   muestra otra cosa. No es un detalle de SEO: es el aviso roto.

   QUÉ HACE. Después del build copia dist/index.html a un archivo por
   ruta y le reemplaza title, description, canonical y las etiquetas
   og:/twitter:. El bundle es el mismo, así que la página se comporta
   igual; lo único que cambia es lo que lee el robot. vercel.json manda
   cada ruta a su archivo.

   Los nombres de los assets salen del index.html ya construido, así que
   esto no se desactualiza cuando cambia el hash.
   ================================================================== */
import fs from "node:fs";
import path from "node:path";

const RAIZ = "https://sb2b.vercel.app";
const DIST = "dist";

const PAGINAS = [
  {
    archivo: "app-web-inteligente.html",
    ruta: "/app-web-inteligente",
    titulo: "App web inteligente + IA | Tu web que atiende y califica | Studio B2B",
    desc: "Obtené tu app web inteligente: vende por vos las 24 horas. Atiende en segundos, califica cada consulta y te la entrega lista para llamar. Desde $750.000, dominio y servidor propio incluidos. Solicitá tu demo gratis.",
    img: "/og-app-web-inteligente.png",
  },
  {
    archivo: "aplicaciones-web.html",
    ruta: "/aplicaciones-web",
    titulo: "Aplicaciones web inteligentes desde US$ 950 | Studio B2B",
    desc: "Aplicaciones web a medida para administrar, automatizar y hacer crecer tu negocio desde una sola plataforma. SEO, panel, roles y IA integrada. Lista en 7 días.",
    img: "/og.png",
  },
  {
    archivo: "precios.html",
    ruta: "/precios",
    titulo: "Precios | Planes, aplicaciones web y proyectos a medida | Studio B2B",
    desc: "Planes mensuales desde US$ 67, aplicaciones web desde US$ 950 y proyectos a medida. Precios claros y qué incluye cada uno.",
    img: "/og.png",
  },
];

const base = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

/* Reemplaza el contenido de una etiqueta, sea meta name= o property=.

   Sin expresiones regulares a proposito. La primera version usaba una, y
   las barras invertidas no sobrevivieron el viaje hasta el archivo: el
   patron quedo buscando "<metas+" en vez de "<meta\s+" y no reemplazo
   nada. El title si se cambiaba -su patron no llevaba barras- asi que a
   simple vista parecia andar. Buscando por posicion no hay nada que
   escapar y el error no se puede repetir. */
function meta(html, clave, valor) {
  const marca = '="' + clave + '"';
  const i = html.indexOf(marca);
  if (i === -1) { console.warn("  ojo: no encontre la etiqueta " + clave); return html; }
  const c = html.indexOf('content="', i);
  if (c === -1) { console.warn("  ojo: " + clave + " sin content="); return html; }
  const desde = c + 'content="'.length;
  const hasta = html.indexOf('"', desde);
  return html.slice(0, desde) + valor.replace(/"/g, "&quot;") + html.slice(hasta);
}

let hechas = 0;
for (const p of PAGINAS) {
  let h = base;
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${p.titulo}</title>`);
  h = h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${RAIZ}${p.ruta}$2`);
  for (const [clave, valor] of [
    ["description", p.desc],
    ["og:title", p.titulo],
    ["og:description", p.desc],
    ["og:url", RAIZ + p.ruta],
    ["og:image", RAIZ + p.img],
    ["twitter:title", p.titulo],
    ["twitter:description", p.desc],
    ["twitter:image", RAIZ + p.img],
  ]) h = meta(h, clave, valor);

  /* el propio archivo avisa por qué existe, para el que lo encuentre suelto */
  h = h.replace("<head>", `<head>\n    <!-- Generado por scripts/paginas.mjs. No editar a mano: se reescribe en cada build. -->`);
  fs.writeFileSync(path.join(DIST, p.archivo), h);
  hechas++;
  console.log("  " + p.ruta.padEnd(24) + "-> " + p.archivo);
}
console.log(`\n${hechas} páginas con etiquetas sociales propias.`);
