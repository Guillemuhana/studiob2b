/**
 * Smoke test: levanta el build, lo abre en Chrome headless y verifica que la
 * pagina realmente se pinte. El `vite build` pasa aunque la app explote al
 * montar, asi que esto es lo unico que detecta una pantalla en blanco.
 *
 *   npm run build && npm run smoke
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";

const PORT = 4188;
const URL = `http://localhost:${PORT}/`;

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA || ""}/Google/Chrome/Application/chrome.exe`,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => { try { return fs.existsSync(p); } catch { return false; } });
if (!chrome) {
  console.error("No encontre Chrome. Defini la variable CHROME con la ruta al ejecutable.");
  process.exit(2);
}

if (!fs.existsSync("dist/index.html")) {
  console.error("Falta dist/. Corre `npm run build` antes del smoke.");
  process.exit(2);
}

const esperarPuerto = async (url, intentos = 60) => {
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('el server de preview no levanto');
};

const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
});

let code = 0;
try {
  await esperarPuerto(URL);

  const r = spawnSync(chrome, [
    "--headless", "--disable-gpu", "--no-sandbox",
    "--virtual-time-budget=6000", "--window-size=1440,900",
    "--dump-dom", URL,
  ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

  const dom = r.stdout || "";
  const i = dom.indexOf('id="root"');
  const cuerpo = i === -1 ? "" : dom.slice(i);

  const marcas = {
    "hero renderizado": "Impulsamos tecnolog",
    "nav con logo": "/logo.png",
    "terminal de agentes": "agente-comercial",
    "bloque de tecnologias": "potencian nuestras soluciones",
    "burbuja de WhatsApp": "s2b-wa-fab",
    "fondo neuronal": "s2b-neural",
  };

  let fallos = 0;
  console.log(`contenido dentro de #root: ${cuerpo.length} caracteres\n`);
  for (const [k, v] of Object.entries(marcas)) {
    const ok = dom.includes(v);
    if (!ok) fallos++;
    console.log(`${ok ? "OK    " : "FALLA "}${k}`);
  }

  if (cuerpo.length < 2000) {
    console.error("\nLa app no pinto nada: #root quedo vacio (pantalla en blanco).");
    fallos++;
  }
  code = fallos ? 1 : 0;
  console.log(fallos ? `\n${fallos} problema(s).` : "\nTodo OK.");
} catch (e) {
  console.error(e.message);
  code = 2;
} finally {
  server.kill();
}
process.exit(code);
