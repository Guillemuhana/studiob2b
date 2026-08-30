import fs from "node:fs";
import path from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";

const dist = "dist";
const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const jsFile = fs.readdirSync(path.join(dist, "assets")).find((f) => f.endsWith(".js"));
const code = fs.readFileSync(path.join(dist, "assets", jsFile), "utf8");

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => errors.push("jsdomError: " + (e.stack || e.message)));
vc.on("error", (...a) => errors.push("console.error: " + a.join(" ")));

const dom = new JSDOM(html, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "https://sb2b.vercel.app/",
  virtualConsole: vc,
});

// polyfills que el bundle espera del navegador
const w = dom.window;
w.matchMedia = w.matchMedia || ((q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
w.scrollTo = () => {};

try {
  w.eval(code);
} catch (e) {
  errors.push("throw al ejecutar el bundle: " + (e.stack || e.message));
}

await new Promise((r) => setTimeout(r, 400));

const root = w.document.getElementById("root");
const txt = (root?.textContent || "").replace(/\s+/g, " ").trim();

console.log("nodos dentro de #root :", root ? root.childElementCount : "sin #root");
console.log("largo del texto        :", txt.length);
console.log("errores capturados     :", errors.length);
for (const e of errors) console.log("\n!! " + e.slice(0, 900));
if (txt.length) console.log("\nprimeros 220 chars:\n" + txt.slice(0, 220));

w.close();
process.exit(errors.length ? 1 : 0);
