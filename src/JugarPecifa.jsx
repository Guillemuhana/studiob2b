import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { KeyRound, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, UserRound, Trophy, Crown, Pencil } from "lucide-react";
import {
  claveGuardada, guardarClave, olvidarClave, headerClave,
  nombreGuardado, guardarNombre, limpiarNombre, headerNombre, EVENTO_RANKING,
} from "./clave.js";

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
  const [nombre, setNombre] = useState(() => nombreGuardado());
  /* si vuelve a cambiar el nombre, la clave ya la puso: no se la pedimos */
  const [clave, setClave] = useState(() => claveGuardada());
  const [ver, setVer] = useState(false);
  const [estado, setEstado] = useState("");      // "", "probando", "mal", "error"
  const [sacudir, setSacudir] = useState(0);
  const campo = useRef(null);

  const campoNombre = useRef(null);
  useEffect(() => {
    (nombre ? campo.current : campoNombre.current)?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nombreOk = limpiarNombre(nombre).length >= 2;

  const entrar = async (e) => {
    e.preventDefault();
    const c = clave.trim();
    const n = limpiarNombre(nombre);
    if (n.length < 2) { setEstado("nombre"); campoNombre.current?.focus(); return; }
    if (!c || estado === "probando") return;
    setEstado("probando");
    const r = await probarClave(c);
    if (r === "ok") {
      guardarClave(c);
      guardarNombre(n);
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
              {t("Poné tu nombre para aparecer en el ranking y la contraseña para entrar.", "Enter your name to appear on the leaderboard, and the password to get in.")}
            </p>

            <form className="s2b-pf-form" onSubmit={entrar} noValidate>
              <label className={"s2b-pf-campo" + (estado === "nombre" ? " is-mal" : "")}>
                <UserRound size={18} aria-hidden="true" />
                <input
                  ref={campoNombre}
                  type="text"
                  value={nombre}
                  maxLength={40}
                  onChange={(e) => { setNombre(e.target.value); if (estado === "nombre") setEstado(""); }}
                  placeholder={t("Tu nombre y apellido", "Your full name")}
                  aria-label={t("Tu nombre", "Your name")}
                  autoComplete="name"
                  autoCapitalize="words"
                  spellCheck={false}
                />
              </label>
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
                disabled={!clave.trim() || !nombreOk || estado === "probando"}
              >
                {estado === "probando"
                  ? <><Loader2 size={16} className="s2b-pf-rueda" /> {t("Verificando…", "Checking…")}</>
                  : <>{t("Entrar a jugar", "Enter and play")} <ArrowRight size={16} /></>}
              </button>

              <p id="s2b-pf-msj" className="s2b-pf-msj" role="alert">
                {estado === "nombre" && t("Poné tu nombre para sumar en el ranking.", "Enter your name to score on the leaderboard.")}
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

const MEDALLAS = ["oro", "plata", "bronce"];
const numero = (n) => Number(n || 0).toLocaleString("es-AR");

/* La tabla de posiciones. Se pide al entrar, despues de cada tirada -la
   maquina avisa con un evento- y cada 20 segundos, para ver subir a los
   demas mientras uno juega. */
function Ranking({ t, alCambiarNombre }) {
  const [filas, setFilas] = useState(null);
  const [error, setError] = useState(false);
  /* igual que sb2b_norm en la base: sin mayusculas, acentos ni espacios de mas */
  const norm = (n) => limpiarNombre(n).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const yo = norm(nombreGuardado());

  useEffect(() => {
    let vivo = true;
    const pedir = async () => {
      try {
        const r = await fetch("/api/jugar?ranking=1", {
          headers: { Accept: "application/json", ...headerClave(claveGuardada()), ...headerNombre(nombreGuardado()) },
          cache: "no-store",
        });
        if (!r.ok) throw new Error("api " + r.status);
        const d = await r.json();
        if (vivo) { setFilas(d.ranking || []); setError(false); }
      } catch {
        if (vivo) setError(true);
      }
    };
    pedir();
    const cada = setInterval(pedir, 20000);
    /* un respiro despues de la tirada, para que la base ya tenga la fila */
    const alJugar = () => setTimeout(pedir, 400);
    window.addEventListener(EVENTO_RANKING, alJugar);
    return () => { vivo = false; clearInterval(cada); window.removeEventListener(EVENTO_RANKING, alJugar); };
  }, []);

  const podio = (filas || []).slice(0, 3);
  const resto = (filas || []).slice(3);
  const esYo = (f) => yo && norm(f.nombre) === yo;

  return (
    <div className="s2b-band s2b-pf-rk" id="ranking">
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap">
          <div className="s2b-pf-dir-top">
            <div className="s2b-eyebrow"><Trophy size={13} /> {t("Tabla de posiciones", "Leaderboard")}</div>
            <h2 className="s2b-h2 s2b-pf-h2">{t("El", "The")} <b>ranking</b></h2>
            <p className="s2b-pf-lead">
              {t("Jugás como", "Playing as")} <b className="s2b-pf-yo">{nombreGuardado() || "—"}</b>
              {" · "}
              <button className="s2b-pf-cambiar" onClick={alCambiarNombre}><Pencil size={13} /> {t("Cambiar nombre", "Change name")}</button>
            </p>
          </div>

          {filas === null && !error && <p className="s2b-pf-rk-vacio">{t("Cargando el ranking…", "Loading the leaderboard…")}</p>}
          {error && filas === null && <p className="s2b-pf-rk-vacio">{t("No pudimos cargar el ranking. Probá recargar la página.", "We couldn't load the leaderboard. Try reloading.")}</p>}
          {filas && filas.length === 0 && <p className="s2b-pf-rk-vacio">{t("Todavía no jugó nadie. ¡Girá y sé el primero!", "Nobody has played yet. Spin and be the first!")}</p>}

          {podio.length > 0 && (
            <ol className="s2b-pf-podio">
              {podio.map((f, i) => (
                <li key={f.nombre + i} className={"s2b-pf-podio-" + MEDALLAS[i] + (esYo(f) ? " is-yo" : "")}>
                  <span className="s2b-pf-medalla">{i === 0 ? <Crown size={20} /> : i + 1}</span>
                  <b className="s2b-pf-rk-nombre">{f.nombre}</b>
                  <span className="s2b-pf-rk-pts">{numero(f.puntos)} <small>pts</small></span>
                  <small className="s2b-pf-rk-jug">{numero(f.jugadas)} {Number(f.jugadas) === 1 ? t("tirada", "spin") : t("tiradas", "spins")}</small>
                </li>
              ))}
            </ol>
          )}

          {resto.length > 0 && (
            <ol className="s2b-pf-lista" start={4}>
              {resto.map((f, i) => (
                <li key={f.nombre + i} className={esYo(f) ? "is-yo" : ""}>
                  <span className="s2b-pf-lista-n">{i + 4}</span>
                  <b className="s2b-pf-rk-nombre">{f.nombre}</b>
                  <small className="s2b-pf-rk-jug">{numero(f.jugadas)} {t("tiradas", "spins")}</small>
                  <span className="s2b-pf-rk-pts">{numero(f.puntos)} <small>pts</small></span>
                </li>
              ))}
            </ol>
          )}
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
  const [fase, setFase] = useState(() => (claveGuardada() && nombreGuardado() ? "revisando" : "cerrada"));

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
          <Ranking t={t} alCambiarNombre={() => { setFase("cerrada"); window.scrollTo({ top: 0 }); }} />
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


/* ---------- el ranking ---------- */
.s2b-pf-rk {
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  background:
    radial-gradient(640px circle at 50% 10%, rgba(249,216,88,.12), transparent 62%),
    linear-gradient(180deg, #0D0A20, #0B0718);
}
.s2b-pf-rk .s2b-eyebrow { color: var(--oro2); }
.s2b-pf-yo { color:#fff; font-weight:600; }
.s2b .s2b-pf-cambiar { display:inline-flex; align-items:center; gap:5px; color:var(--oro2); font-size:14px; }
.s2b .s2b-pf-cambiar:hover { color:var(--oro1); text-decoration:underline; }
.s2b .s2b-pf-rk-vacio { text-align:center; color:var(--muted); margin-top:36px; }
.s2b-pf-podio {
  list-style:none; margin:44px auto 0; padding:0; max-width:880px;
  display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); align-items:end; gap:16px;
}
.s2b-pf-podio li {
  position:relative; display:grid; justify-items:center; text-align:center; gap:6px;
  padding:28px 14px 22px; border-radius:22px;
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.1);
  box-shadow: 0 24px 50px -28px rgba(0,0,0,.9);
}
.s2b-pf-podio-oro { order:2; padding-top:40px !important; padding-bottom:34px !important;
  border-color: rgba(249,216,88,.55) !important;
  background: linear-gradient(180deg, rgba(249,216,88,.18), rgba(249,216,88,.03)) !important;
  box-shadow: 0 0 60px -12px rgba(249,216,88,.35), 0 24px 50px -28px rgba(0,0,0,.9) !important; }
.s2b-pf-podio-plata { order:1; }
.s2b-pf-podio-bronce { order:3; }
.s2b-pf-medalla {
  width:44px; height:44px; border-radius:50%; display:grid; place-items:center;
  font-family:var(--display); font-weight:700; font-size:18px; color:#1E1405;
  background: conic-gradient(from 200deg, #FFF6D0, #F9D858, #D09A1C, #7C4E06, #F9D858, #FFF6D0);
  box-shadow: 0 6px 16px rgba(0,0,0,.5);
}
.s2b-pf-podio-plata .s2b-pf-medalla { background: conic-gradient(from 200deg, #FFFFFF, #D9DEE8, #9BA3B4, #5E6576, #D9DEE8, #FFFFFF); }
.s2b-pf-podio-bronce .s2b-pf-medalla { background: conic-gradient(from 200deg, #FFE1C4, #E0A36A, #A86432, #5C3212, #E0A36A, #FFE1C4); }
.s2b-pf-podio-oro .s2b-pf-medalla { width:54px; height:54px; }
.s2b-pf-rk-nombre { font-family:var(--display); font-weight:600; color:var(--title); font-size:17px; line-height:1.2; overflow-wrap:anywhere; }
.s2b-pf-rk-pts { font-family:var(--display); font-weight:700; font-size:26px; color:var(--oro2); line-height:1; }
.s2b-pf-rk-pts small { font-size:12px; font-weight:500; color:var(--muted); }
.s2b-pf-podio-oro .s2b-pf-rk-pts { font-size:34px; }
.s2b-pf-rk-jug { font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; color:var(--muted); text-transform:uppercase; }
.s2b-pf-podio li.is-yo, .s2b-pf-lista li.is-yo { outline:2px solid #7CFFB2; outline-offset:2px; }
.s2b-pf-lista { list-style:none; margin:18px auto 0; padding:0; max-width:880px; display:grid; gap:8px; }
.s2b-pf-lista li {
  display:grid; grid-template-columns:40px minmax(0,1fr) auto auto; align-items:center; gap:14px;
  padding:12px 18px; border-radius:14px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
}
.s2b-pf-lista-n { font-family:var(--mono); font-size:14px; color:var(--muted); text-align:center; }
.s2b-pf-lista .s2b-pf-rk-nombre { font-size:15.5px; }
.s2b-pf-lista .s2b-pf-rk-pts { font-size:19px; }
@media (max-width: 560px) {
  .s2b-pf-podio { gap:8px; margin-top:32px; }
  .s2b-pf-podio li { padding:20px 6px 16px; border-radius:16px; }
  .s2b-pf-podio-oro { padding-top:28px !important; padding-bottom:22px !important; }
  .s2b-pf-rk-nombre { font-size:14px; }
  .s2b-pf-rk-pts, .s2b-pf-podio-oro .s2b-pf-rk-pts { font-size:20px; }
  .s2b-pf-medalla { width:36px; height:36px; font-size:15px; }
  .s2b-pf-podio-oro .s2b-pf-medalla { width:42px; height:42px; }
  .s2b-pf-lista li { grid-template-columns:28px minmax(0,1fr) auto; gap:10px; padding:11px 12px; }
  .s2b-pf-lista .s2b-pf-rk-jug { display:none; }
}

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
