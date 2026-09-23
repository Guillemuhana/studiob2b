import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { KeyRound, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { claveGuardada, guardarClave, olvidarClave, headerClave } from "./clave.js";

/* La maquina se baja mientras la persona escribe la contrasena: cuando
   aprieta "Entrar" ya esta en el navegador y no hay un segundo de espera. */
const cargarMaquina = () => import("./Tragamonedas.jsx");
const Tragamonedas = lazy(cargarMaquina);

/* La conduccion nacional de Pecifa. Las fotos salen de public/pecifa, ya
   recortadas en cuadrado con la cara al centro. El nombre y el cargo van
   vacios hasta tenerlos confirmados: si estan, aparecen debajo de la foto;
   si no, la foto va sola. */
const DIRIGENTES = Array.from({ length: 18 }, (_, i) => ({
  src: `/pecifa/${String(i + 1).padStart(2, "0")}.jpg`,
  n: "",
  r: "",
}));

/* las caras que giran alrededor del escudo en la puerta */
const ORBITA = [0, 1, 2, 5, 6, 7, 8, 10, 13, 14].map((i) => DIRIGENTES[i]);

/* "ok", "mal" o "error". Quien decide es el servidor: sin la clave la API no
   gira, asi que esta pantalla es la cara de la cerradura, no la cerradura. */
async function probarClave(clave) {
  try {
    const r = await fetch("/api/jugar", {
      headers: { Accept: "application/json", ...headerClave(clave) },
      cache: "no-store",
    });
    if (r.status === 401) return "mal";
    if (r.ok) return "ok";
    /* con `vite` a secas no hay /api: se deja pasar para poder trabajar */
    if (import.meta.env.DEV && r.status === 404) return "ok";
    return "error";
  } catch {
    return "error";
  }
}

function Puerta({ t, irA, alAbrir }) {
  const [clave, setClave] = useState("");
  const [ver, setVer] = useState(false);
  const [estado, setEstado] = useState("");      // "", "probando", "mal", "error"
  const [sacudir, setSacudir] = useState(0);
  const campo = useRef(null);

  useEffect(() => { campo.current?.focus({ preventScroll: true }); }, []);

  const entrar = async (e) => {
    e.preventDefault();
    const c = clave.trim();
    if (!c || estado === "probando") return;
    setEstado("probando");
    const r = await probarClave(c);
    if (r === "ok") {
      guardarClave(c);
      alAbrir();
      return;
    }
    setEstado(r);
    if (r === "mal") {
      setSacudir((n) => n + 1);
      setClave("");
      campo.current?.focus();
    }
  };

  return (
    <div className="s2b-band s2b-band--dark s2b-pf-band">
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap s2b-pf-puerta">

          <div className="s2b-pf-orbita" aria-hidden="true">
            <div className="s2b-pf-giro">
              {ORBITA.map((d, i) => (
                <span key={d.src} className="s2b-pf-sat" style={{ "--i": i, "--n": ORBITA.length }}>
                  <img src={d.src} alt="" width="120" height="120" decoding="async" />
                </span>
              ))}
            </div>
            <div className="s2b-pf-escudo">
              <img src="/pecifa/escudo.webp" alt="" width="480" height="480" />
            </div>
          </div>

          <div className="s2b-pf-caja">
            <div className="s2b-eyebrow">{t("Acceso exclusivo para afiliados", "Members only")}</div>
            <h2 className="s2b-h2 s2b-pf-h2">
              {t("Jugá con", "Play with")} <b>Pecifa Nacional</b>
            </h2>
            <p className="s2b-pf-lead">
              {t("Ingresá la contraseña para entrar a jugar.", "Enter the password to start playing.")}
            </p>

            <form className="s2b-pf-form" onSubmit={entrar} noValidate>
              <label className={"s2b-pf-campo" + (estado === "mal" ? " is-mal" : "")} key={sacudir}>
                <KeyRound size={18} aria-hidden="true" />
                <input
                  ref={campo}
                  type={ver ? "text" : "password"}
                  value={clave}
                  onChange={(e) => { setClave(e.target.value); if (estado === "mal" || estado === "error") setEstado(""); }}
                  placeholder={t("Contraseña", "Password")}
                  aria-label={t("Contraseña", "Password")}
                  aria-invalid={estado === "mal"}
                  aria-describedby="s2b-pf-msj"
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="s2b-pf-ojo"
                  onClick={() => setVer((v) => !v)}
                  aria-label={ver ? t("Ocultar contraseña", "Hide password") : t("Mostrar contraseña", "Show password")}
                >
                  {ver ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              <button
                type="submit"
                className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-pf-entrar"
                disabled={!clave.trim() || estado === "probando"}
              >
                {estado === "probando"
                  ? <><Loader2 size={16} className="s2b-pf-rueda" /> {t("Verificando…", "Checking…")}</>
                  : <>{t("Entrar a jugar", "Enter and play")} <ArrowRight size={16} /></>}
              </button>

              <p id="s2b-pf-msj" className="s2b-pf-msj" role="alert">
                {estado === "mal" && t("Esa no es la contraseña. Probá de nuevo.", "That's not the password. Try again.")}
                {estado === "error" && t("No pudimos verificarla. Revisá tu conexión y probá otra vez.", "We couldn't check it. Check your connection and try again.")}
              </p>
            </form>

            <button className="s2b-link s2b-pf-volver" onClick={() => irA("home")}>
              <ArrowLeft size={15} /> {t("Volver al inicio", "Back to home")}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

function Conduccion({ t }) {
  return (
    <div className="s2b-band s2b-pf-dir">
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap">
          <div className="s2b-pf-dir-top">
            <img className="s2b-pf-dir-escudo" src="/pecifa/escudo.webp" alt="Pecifa" width="480" height="480" loading="lazy" />
            <div className="s2b-eyebrow">{t("Pecifa Nacional", "Pecifa Nacional")}</div>
            <h2 className="s2b-h2 s2b-pf-h2">
              {t("Nuestra", "Our")} <b>{t("conducción", "leadership")}</b>
            </h2>
            <p className="s2b-pf-lead">
              {t(
                "Unión Personal Civil de las Fuerzas Armadas. Las caras de quienes conducen, en todo el país.",
                "Civilian Staff Union of the Armed Forces. The faces of those who lead it, across the country."
              )}
            </p>
          </div>

          <ul className="s2b-pf-grilla">
            {DIRIGENTES.map((d, i) => (
              <li key={d.src} className="s2b-pf-dirigente" style={{ "--i": i }}>
                <span className="s2b-pf-aro">
                  <img src={d.src} alt={d.n || t("Dirigente de Pecifa Nacional", "Pecifa Nacional leader")} width="480" height="480" loading="lazy" decoding="async" />
                </span>
                {d.n && <b>{d.n}</b>}
                {d.r && <small>{d.r}</small>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default function JugarPecifa({ t, waLink, irA }) {
  /* con una clave guardada se revisa antes de abrir: si la cambiaron en el
     servidor, vuelve a la puerta en vez de mostrar una maquina que no gira */
  const [fase, setFase] = useState(() => (claveGuardada() ? "revisando" : "cerrada"));

  useEffect(() => {
    cargarMaquina();
    if (fase !== "revisando") return;
    let vivo = true;
    probarClave(claveGuardada()).then((r) => {
      if (!vivo) return;
      if (r === "mal") olvidarClave();
      setFase(r === "mal" ? "cerrada" : "abierta");
    });
    return () => { vivo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fase === "abierta") window.scrollTo({ top: 0 });
  }, [fase]);

  return (
    <>
      <style>{CSS_PF}</style>
      {fase === "revisando" && <div className="s2b-band s2b-band--dark" style={{ minHeight: 620 }} aria-hidden="true" />}
      {fase === "cerrada" && <Puerta t={t} irA={irA} alAbrir={() => setFase("abierta")} />}
      {fase === "abierta" && (
        <>
          <Suspense fallback={<div className="s2b-band s2b-band--dark" style={{ minHeight: 620 }} aria-hidden="true" />}>
            <Tragamonedas t={t} waLink={waLink} irA={irA} />
          </Suspense>
          <Conduccion t={t} />
        </>
      )}
    </>
  );
}

/* ================= estilos =================
   El oro es el mismo del casino, asi la puerta y la galeria se leen como
   parte de la misma pagina y no como un agregado. */
const CSS_PF = `
.s2b-pf-band, .s2b-pf-dir {
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  overflow:hidden;
}
.s2b-pf-band::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(520px circle at 30% 48%, rgba(255,180,50,.16), transparent 64%),
    radial-gradient(620px circle at 82% 20%, rgba(74,144,226,.16), transparent 62%);
}
.s2b-pf-puerta {
  position:relative; min-height:560px;
  display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); align-items:center; gap:56px;
}

/* ---------- la orbita ---------- */
.s2b-pf-orbita {
  --lado: 400px; --cara: 78px;
  position:relative; width:var(--lado); height:var(--lado); justify-self:center;
}
.s2b-pf-orbita::before {
  content:''; position:absolute; inset: calc(var(--cara) / 2); border-radius:50%;
  border:1px dashed rgba(249,216,88,.28);
}
.s2b-pf-giro { position:absolute; inset:0; animation: s2b-pf-gira 60s linear infinite; }
.s2b-pf-sat {
  position:absolute; left:50%; top:50%;
  width:var(--cara); height:var(--cara); margin: calc(var(--cara) / -2) 0 0 calc(var(--cara) / -2);
  transform:
    rotate(calc(var(--i) * 360deg / var(--n)))
    translateY(calc((var(--lado) - var(--cara)) / -2))
    rotate(calc(var(--i) * -360deg / var(--n)));
}
.s2b-pf-sat img {
  width:100%; height:100%; border-radius:50%; object-fit:cover; display:block;
  padding:3px; background: conic-gradient(from 200deg, var(--oro1), var(--oro2), var(--oro3), var(--oro4), var(--oro2), var(--oro1));
  box-shadow: 0 12px 26px -10px rgba(0,0,0,.8);
  animation: s2b-pf-gira 60s linear infinite reverse;
}
.s2b-pf-escudo {
  position:absolute; left:50%; top:50%; width:44%; aspect-ratio:1; transform:translate(-50%,-50%);
  display:grid; place-items:center; border-radius:50%;
  box-shadow: 0 0 70px rgba(255,190,70,.4), 0 24px 50px -18px rgba(0,0,0,.8);
}
.s2b-pf-escudo img { width:100%; height:auto; display:block; }
@keyframes s2b-pf-gira { to { transform: rotate(360deg); } }

/* ---------- el formulario ---------- */
.s2b-pf-caja { position:relative; max-width:480px; }
.s2b-pf-h2 { max-width:16ch; }
.s2b-pf-h2 b { background: linear-gradient(100deg, var(--oro2), var(--oro1) 50%, var(--oro3)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.s2b .s2b-pf-lead { color:var(--muted); font-size:clamp(15px,1.5vw,17px); margin-top:16px; max-width:44ch; }
.s2b-pf-form { margin-top:28px; display:grid; gap:12px; }
.s2b-pf-campo {
  display:flex; align-items:center; gap:12px; height:56px; padding:0 8px 0 18px;
  border-radius:16px; border:1px solid rgba(249,216,88,.32); background: rgba(255,255,255,.05);
  color: var(--oro2); transition: border-color .2s, box-shadow .2s, background .2s;
}
.s2b-pf-campo:focus-within { border-color: var(--oro2); background: rgba(255,255,255,.08); box-shadow: 0 0 0 4px rgba(249,216,88,.14); }
.s2b-pf-campo.is-mal { border-color:#FF6B7F; color:#FF6B7F; animation: s2b-pf-no .42s cubic-bezier(.36,.07,.19,.97); }
.s2b .s2b-pf-campo input:focus-visible { outline:none; }
.s2b-pf-campo input {
  flex:1; min-width:0; height:100%; border:0; outline:0; background:none;
  font: 500 17px/1 var(--body); color:#fff; letter-spacing:.04em;
}
.s2b-pf-campo input::placeholder { color: var(--muted); letter-spacing:0; }
.s2b .s2b-pf-ojo { width:40px; height:40px; border-radius:12px; display:grid; place-items:center; color:var(--muted); }
.s2b .s2b-pf-ojo:hover { color:#fff; background: rgba(255,255,255,.07); }
.s2b-pf-entrar { height:54px; justify-content:center; }
.s2b-pf-entrar:disabled { opacity:.55; cursor:not-allowed; box-shadow:none; }
.s2b-pf-rueda { animation: s2b-pf-gira .9s linear infinite; }
.s2b-pf-msj { min-height:22px; font-size:14px; color:#FF8A9A; }
.s2b-pf-volver { margin-top:8px; display:inline-flex; align-items:center; gap:8px; color:var(--muted); font-size:14px; }
.s2b-pf-volver:hover { color:#fff; }
@keyframes s2b-pf-no {
  10%,90% { transform:translateX(-2px); } 20%,80% { transform:translateX(4px); }
  30%,50%,70% { transform:translateX(-7px); } 40%,60% { transform:translateX(7px); }
}

/* ---------- la conduccion ---------- */
.s2b-pf-dir {
  background:
    radial-gradient(700px circle at 50% 0%, rgba(249,216,88,.10), transparent 60%),
    linear-gradient(180deg, #0B0718, var(--paper));
}
.s2b-pf-dir-top { text-align:center; display:grid; justify-items:center; }
.s2b-pf-dir .s2b-eyebrow { color: var(--oro2); }
.s2b .s2b-pf-dir-top .s2b-pf-lead { text-align:center; }
.s2b-pf-dir-escudo {
  width:96px; height:96px; object-fit:contain; margin-bottom:20px; border-radius:50%;
  box-shadow: 0 0 50px rgba(255,190,70,.35);
}
.s2b-pf-grilla {
  list-style:none; margin:48px auto 0; padding:0; max-width:1040px;
  display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap:34px 22px;
}
.s2b-pf-dirigente { display:grid; justify-items:center; text-align:center; gap:4px; }
.s2b-pf-aro {
  position:relative; width:100%; max-width:168px; aspect-ratio:1; border-radius:50%; padding:4px; margin-bottom:10px;
  background: conic-gradient(from calc(var(--i) * 40deg), var(--oro1), var(--oro2), var(--oro3), var(--oro4), var(--oro2), var(--oro1));
  box-shadow: 0 18px 40px -18px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.04);
  transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s;
}
.s2b-pf-aro img { width:100%; height:100%; border-radius:50%; object-fit:cover; display:block; border:3px solid #0B0718; }
.s2b-pf-dirigente:hover .s2b-pf-aro { transform: translateY(-6px) scale(1.03); box-shadow: 0 26px 50px -18px rgba(0,0,0,.9), 0 0 36px rgba(249,216,88,.28); }
.s2b-pf-dirigente b { font-family:var(--display); font-weight:600; color:var(--title); font-size:15px; line-height:1.25; }
.s2b-pf-dirigente small { color:var(--oro2); font-family:var(--mono); font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; }

@media (max-width: 900px) {
  .s2b-pf-puerta { grid-template-columns: minmax(0,1fr); gap:36px; min-height:0; }
  .s2b-pf-caja .s2b-eyebrow { flex-wrap:wrap; }
  .s2b-pf-caja { justify-self:center; text-align:center; width:100%; }
  .s2b-pf-caja .s2b-eyebrow { justify-content:center; }
  .s2b-pf-h2, .s2b-pf-lead { margin-left:auto; margin-right:auto; }
  .s2b-pf-orbita { --lado: 300px; --cara: 60px; }
}
@media (max-width: 520px) {
  .s2b-pf-orbita { --lado: min(280px, calc(100vw - 48px)); --cara: 54px; }
  .s2b-pf-grilla { grid-template-columns: repeat(2, minmax(0, 1fr)); gap:26px 16px; margin-top:36px; }
}
@media (prefers-reduced-motion: reduce) {
  .s2b-pf-giro, .s2b-pf-sat img, .s2b-pf-rueda { animation:none; }
  .s2b-pf-campo.is-mal { animation:none; }
}
`;
