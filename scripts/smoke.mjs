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

  const pages = [
    { path: "/posicionamiento-seo-para-ia", markers: ['id="seo-ia"', 'id="seo-alcance"', "s2b-seop-brief"], absent: ['id="ayuda"'] },
    { path: "/", markers: ["s2b-hero", "s2b-doors", 'id="clientes"', 'id="contacto"'], absent: ['id="camino"', 'id="servicios"', 'id="agentes"'] },
    { path: "/aplicaciones-web", markers: ['id="aplicaciones"', 'id="empresas"', 'id="servicios"', 'id="agentes"'] },
    { path: "/app-web-inteligente", markers: ["s2b-ia-cab", "s2b-plan-letra"] },
    { path: "/desarrollar-app", markers: ['id="idea"', "s2b-journey"], absent: ['id="ayuda"'] },
    { path: "/precios", markers: ['id="precios"', "s2b-planes"] },
    { path: "/proceso", markers: ['id="proceso"', 'id="contacto"'] },
  ];
  let failures = 0;
  for (const page of pages) {
    const r = spawnSync(chrome, [
      "--headless", "--disable-gpu", "--no-sandbox", "--no-first-run",
      "--timeout=10000", "--window-size=1440,900",
      "--dump-dom", URL.slice(0, -1) + page.path,
    ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 30000 });
    const dom = r.stdout || "";
    // Restrict checks to rendered markup: CSS also contains class names.
    const root = dom.indexOf('id="root"');
    const body = root < 0 ? "" : dom.slice(root).replace(/<style[^>]*>[\s\S]*?<\/style>/g, "");
    const missing = page.markers.filter((marker) => !body.includes(marker));
    const unexpected = (page.absent || []).filter((marker) => body.includes(marker));
    const ok = !r.error && body.length > 2000 && !missing.length && !unexpected.length;
    if (!ok) failures++;
    console.log(`${ok ? "OK" : "FAIL"} ${page.path}`);
    if (!ok) console.log({ error: r.error?.message, missing, unexpected, length: body.length });
    if (page.path === "/") {
      const count = (body.match(/class="s2b-door /g) || []).length;
      console.log(`${count === 4 ? "OK" : "FAIL"} four solution choices (${count})`);
      if (count !== 4) failures++;
    }
  }
  code = failures ? 1 : 0;
  console.log(failures ? `${failures} failures.` : "All routes OK.");
} catch (e) {
  console.error(e.message);
  code = 2;
} finally {
  server.kill();
}
process.exit(code);
