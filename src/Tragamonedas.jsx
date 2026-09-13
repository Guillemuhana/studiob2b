import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";
import {
  Volume2, VolumeX, X, Copy, Check, ArrowRight, ArrowLeft, Sparkles, Info, ShieldCheck, Clock,
} from "lucide-react";

import {
  PREMIOS, CON_PREMIO, PARADA,
  lineaDe, armarTira,
  jugadaGuardada, guardarJugada, crearSonido,
} from "./tragamonedas.js";

/* Los tres rodillos paran escalonados: el ultimo tarda casi el doble que el
   primero, que es de donde sale el suspenso de una maquina de verdad. */
const FRENOS = [2400, 3150, 3950];

/* El premio y el codigo los decide el servidor (api/jugar.js -> Postgres).
   Aca solo se pide y se muestra: si el sorteo viviera en el navegador,
   cualquiera se fabrica el premio mayor desde el inspector. */
const API = "/api/jugar";

async function pedirJugada(metodo) {
  const r = await fetch(API, {
    method: metodo,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error("api " + r.status);
  return r.json();
}

const premioDe = (id) => PREMIOS.find((p) => (p.id || "nada") === id) || PREMIOS[PREMIOS.length - 1];
const TOPE = 3;
const COLORES = ["#6D4AFF", "#A78CFF", "#C9B6FF", "#FFC53D", "#FFFFFF"];

/* ================= los simbolos =================
   Dibujados como vectores en vez de fotos bajadas de algun lado: pesan cero,
   se ven nitidos en cualquier pantalla, entran en la paleta del sitio y no
   arrastran la licencia de nadie. El unico bitmap es el logo, que es tuyo. */

function Defs() {
  return (
    <svg className="s2b-tm-defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tmDia" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D9F6FF" /><stop offset=".42" stopColor="#57C7F7" /><stop offset="1" stopColor="#6D4AFF" />
        </linearGradient>
        <linearGradient id="tmOro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF0BD" /><stop offset=".5" stopColor="#F5B942" /><stop offset="1" stopColor="#A96C14" />
        </linearGradient>
        <linearGradient id="tmOroClaro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF7D8" /><stop offset="1" stopColor="#F2C75C" />
        </linearGradient>
        <linearGradient id="tmRayo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFBE0" /><stop offset=".55" stopColor="#FFD54A" /><stop offset="1" stopColor="#FF8A2B" />
        </linearGradient>
        <linearGradient id="tmChip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFC0FF" /><stop offset="1" stopColor="#5B38E8" />
        </linearGradient>
        <linearGradient id="tmEstrella" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#B49CFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const DIBUJOS = {
  diamante: (
    <svg viewBox="0 0 64 64">
      <path d="M16 12h32l14 15-30 35L2 27z" fill="url(#tmDia)" />
      <path d="M16 12l8 15H2zM48 12l-8 15h22zM24 27h16l-8 35z" fill="#FFFFFF" opacity=".22" />
      <path d="M16 12l8 15 8-15 8 15 8-15M2 27h60M24 27l8 35 8-35" fill="none" stroke="#04122B" strokeOpacity=".35" strokeWidth="1.6" />
    </svg>
  ),
  lingote: (
    <svg viewBox="0 0 64 64">
      <path d="M12 24h40l8 22H4z" fill="url(#tmOro)" />
      <path d="M18 16h28l6 8H12z" fill="url(#tmOroClaro)" />
      <path d="M12 24h40M18 16h28" fill="none" stroke="#7A4A08" strokeOpacity=".45" strokeWidth="1.5" />
      <rect x="20" y="31" width="24" height="3" rx="1.5" fill="#FFF6D4" opacity=".65" />
    </svg>
  ),
  moneda: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="26" fill="url(#tmOro)" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#FFF3C9" strokeOpacity=".8" strokeWidth="2" />
      <path d="M32 17v30M39 24c-2-3-5-4-8-4-4 0-7 2-7 5.5 0 7 15 5 15 12 0 3.5-3 5.5-7 5.5-3.5 0-6.5-1.5-8-4"
        fill="none" stroke="#6B3F06" strokeOpacity=".75" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  ),
  rayo: (
    <svg viewBox="0 0 64 64">
      <path d="M37 3L13 35h13l-5 26 25-33H32z" fill="url(#tmRayo)" />
      <path d="M37 3L13 35h13l-5 26 25-33H32z" fill="none" stroke="#8A4A00" strokeOpacity=".4" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 64 64">
      <rect x="16" y="16" width="32" height="32" rx="6" fill="url(#tmChip)" />
      <rect x="24" y="24" width="16" height="16" rx="3" fill="#0B0718" opacity=".45" />
      <g stroke="#CFC0FF" strokeWidth="3" strokeLinecap="round">
        <path d="M24 16V8M32 16V8M40 16V8M24 56v-8M32 56v-8M40 56v-8M16 24H8M16 32H8M16 40H8M56 24h-8M56 32h-8M56 40h-8" />
      </g>
    </svg>
  ),
  estrella: (
    <svg viewBox="0 0 64 64">
      <path d="M32 4l8.4 17.6L59 24.4 45.5 38l3.2 19.2L32 48.1 15.3 57.2 18.5 38 5 24.4l18.6-2.8z" fill="url(#tmEstrella)" />
    </svg>
  ),
};

function Simbolo({ id }) {
  if (id === "logo") {
    return (
      <span className="s2b-tm-sim s2b-tm-sim--logo">
        <img src="/logo.png" alt="" aria-hidden="true" />
      </span>
    );
  }
  return <span className={"s2b-tm-sim s2b-tm-sim--" + id}>{DIBUJOS[id]}</span>;
}

/* ================= la maquina ================= */

export default function Tragamonedas({ t, waLink, irA }) {
  const reducido = useReducedMotion();

  const guardada = useMemo(jugadaGuardada, []);
  const premioGuardado = useMemo(
    () => (guardada ? PREMIOS.find((p) => (p.id || "nada") === guardada.premio) : null),
    [guardada]
  );

  const [tiras, setTiras] = useState(() => {
    const linea = premioGuardado ? lineaDe(premioGuardado) : ["diamante", "logo", "lingote"];
    return linea.map((c) => armarTira(c));
  });
  const [pos, setPos] = useState([PARADA, PARADA, PARADA]);
  const [anim, setAnim] = useState(false);
  const [rodando, setRodando] = useState([false, false, false]);
  const [fase, setFase] = useState("listo");
  const [restantes, setRestantes] = useState(TOPE);
  const [ganados, setGanados] = useState([]);
  const [resultado, setResultado] = useState(
    premioGuardado ? { premio: premioGuardado, codigo: guardada.codigo } : null
  );
  const [sincronizado, setSincronizado] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [sonando, setSonando] = useState(true);
  const [error, setError] = useState("");

  const relojes = useRef([]);
  const audio = useRef(null);
  const montado = useRef(true);

  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
      relojes.current.forEach(clearTimeout);
    };
  }, []);

  /* La copia de localStorage sirve para pintar rapido, pero la verdad la tiene
     el servidor: si ahi no consta la jugada -otro navegador, otra maquina- la
     persona puede jugar, y si consta, no importa lo que diga el navegador. */
  useEffect(() => {
    let vivo = true;
    pedirJugada("GET")
      .then((d) => {
        if (!vivo || !montado.current) return;
        setSincronizado(true);
        setRestantes(typeof d.restantes === "number" ? d.restantes : TOPE);
        setGanados((d.jugadas || []).filter((j) => j.codigo));
        const ultima = (d.jugadas || [])[d.jugadas.length - 1];
        if (ultima) {
          const premio = premioDe(ultima.premio);
          setResultado({ premio, codigo: ultima.codigo });
          setTiras(lineaDe(premio).map((c) => armarTira(c)));
          setPos([PARADA, PARADA, PARADA]);
          guardarJugada(premio, ultima.codigo);
        }
        setFase("listo");
      })
      .catch(() => {
        /* sin API la maquina sigue jugable, pero el premio no queda
           registrado: se avisa recien si falla el giro */
      });
    return () => { vivo = false; };
  }, []);

  const son = useCallback((fn, ...args) => {
    if (!sonando || reducido) return;
    try {
      if (!audio.current) audio.current = crearSonido();
      audio.current[fn](...args);
    } catch {
      /* si el navegador no deja sonar, la maquina anda igual */
    }
  }, [sonando, reducido]);

  const festejar = useCallback((alto) => {
    if (reducido) return;
    const tiro = (x, angulo, n) =>
      confetti({
        particleCount: n, spread: alto ? 95 : 68, startVelocity: alto ? 55 : 40,
        origin: { x, y: 0.62 }, angle: angulo, colors: COLORES, zIndex: 130, scalar: alto ? 1.1 : 0.9,
        disableForReducedMotion: true,
      });
    tiro(0.2, 60, alto ? 90 : 45);
    setTimeout(() => tiro(0.8, 120, alto ? 90 : 45), 160);
    if (alto) setTimeout(() => tiro(0.5, 90, 120), 420);
  }, [reducido]);

  const girar = useCallback(async () => {
    if (fase !== "listo") return;

    setFase("girando");
    setResultado(null);
    setError("");
    son("palanca");

    /* Se le pide el resultado al servidor antes de mover nada: los rodillos
       tienen que frenar donde diga la base, no al reves. El viaje es corto y
       el boton ya dice GIRANDO, asi que no se siente la espera. */
    let datos;
    try {
      datos = await pedirJugada("POST");
    } catch {
      if (!montado.current) return;
      setFase("listo");
      setError(t(
        "No pudimos conectar con la máquina. Probá de nuevo en un momento.",
        "We couldn't reach the machine. Please try again in a moment."
      ));
      return;
    }
    if (!montado.current) return;

    if (datos.agotado) {
      setFase("listo");
      setRestantes(0);
      setError(t(
        "Ya usaste las 3 jugadas de esta conexión.",
        "You've used all 3 spins from this connection."
      ));
      return;
    }

    const premio = premioDe(datos.premio);
    const codigo = datos.codigo || null;
    setRestantes(typeof datos.restantes === "number" ? datos.restantes : 0);
    const nuevas = lineaDe(premio).map((c) => armarTira(c));

    setTiras(nuevas);
    setAnim(false);
    setPos([0, 0, 0]);
    setRodando([true, true, true]);
    son("giro");

    /* dos cuadros de espera: uno para que el navegador pinte los rodillos
       arriba de todo sin transicion, y recien ahi se enciende la animacion */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!montado.current) return;
      setAnim(true);
      setPos([PARADA, PARADA, PARADA]);
    }));

    relojes.current.forEach(clearTimeout);
    relojes.current = FRENOS.map((ms, i) =>
      setTimeout(() => {
        if (!montado.current) return;
        setRodando((r) => r.map((v, j) => (j === i ? false : v)));
        son("tope", i);
      }, reducido ? 60 * (i + 1) : ms)
    );

    relojes.current.push(setTimeout(() => {
      if (!montado.current) return;
      setResultado({ premio, codigo });
      setFase("listo");
      setAbierto(true);
      guardarJugada(premio, codigo);
      if (codigo) setGanados((g) => [...g, { premio: premio.id, codigo, canjeado: false }]);
      if (premio.id) { son("gano", premio.id === "logo"); festejar(premio.id === "logo" || premio.id === "diamante"); }
      else son("perdio");
    }, (reducido ? 260 : FRENOS[2]) + 420));
  }, [fase, son, festejar, reducido, t]);

  const copiar = async () => {
    if (!resultado?.codigo) return;
    try {
      await navigator.clipboard.writeText(resultado.codigo);
      setCopiado(true);
      setTimeout(() => montado.current && setCopiado(false), 1800);
    } catch {
      /* queda a la vista para copiarlo a mano */
    }
  };

  const mensajeWa = (r) =>
    r?.codigo
      ? `Hola Studio B2B, jugué en la web y gané ${r.premio.es}. Mi código es ${r.codigo}.`
      : "Hola Studio B2B, jugué en la web y quiero mi diagnóstico gratuito.";

  const ganador = resultado?.premio?.id;

  return (
    <>
      <style>{CSS_TM}</style>
      <Defs />

      <div className="s2b-band s2b-band--dark s2b-tm-band" id="jugar">
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap">

            <div className="s2b-tm-top">
              <div className="s2b-eyebrow">{t("Casino Studio B2B", "Studio B2B Casino")}</div>
              <h2 className="s2b-h2 s2b-tm-h2">
                {t("Girá y", "Spin and")} <b>{t("llevate tu descuento", "take your discount")}</b>
              </h2>
              <p className="s2b-lead s2b-tm-lead">
                {t(
                  "Tres jugadas por persona, sin registro y sin pagar nada. Si salen tres iguales en la línea del medio, el premio es tuyo y lo usás en tu próximo proyecto con nosotros.",
                  "Three spins per person, no sign-up and nothing to pay. Three matching symbols on the middle line and the prize is yours, to use on your next project with us."
                )}
              </p>
            </div>

            {/* la tira de premios, como el cartel de arriba de una maquina */}
            <div className="s2b-tm-marquesina">
              {CON_PREMIO.map((p, i) => (
                <motion.div
                  key={p.id}
                  className={"s2b-tm-jack s2b-tm-jack--" + p.id + (ganador === p.id ? " is-ganado" : "")}
                  initial={reducido ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <span className="s2b-tm-jack-rango">{p.rango}</span>
                  <span className="s2b-tm-jack-monto">{p.monto}</span>
                  <Simbolo id={p.simbolo} />
                </motion.div>
              ))}
            </div>

            {/* el mueble */}
            <Tilt
              className="s2b-tm-tilt"
              tiltMaxAngleX={reducido ? 0 : 4}
              tiltMaxAngleY={reducido ? 0 : 5}
              perspective={1400}
              transitionSpeed={1400}
              glareEnable={!reducido}
              glareMaxOpacity={0.12}
              glareColor="#C9B6FF"
              glarePosition="all"
              glareBorderRadius="28px"
            >
              <div className={"s2b-tm-mueble" + (fase === "girando" ? " is-girando" : "")}>
                {/* el marco dorado es una capa aparte: un border-image no deja
                    poner el bisel de adentro ni el resplandor de afuera */}
                <div className="s2b-tm-cuerpo">
                  <div className="s2b-tm-luces" aria-hidden="true">
                    {Array.from({ length: 26 }).map((_, i) => <i key={i} style={{ animationDelay: i * 80 + "ms" }} />)}
                  </div>

                  <div className="s2b-tm-rodillos">
                    <div className="s2b-tm-rayos" aria-hidden="true" />
                    <div className="s2b-tm-riel s2b-tm-riel--izq" aria-hidden="true" />
                    <div className="s2b-tm-riel s2b-tm-riel--der" aria-hidden="true" />
                    <div className="s2b-tm-linea" aria-hidden="true" />

                    <div className="s2b-tm-ventanas">
                      {tiras.map((tira, i) => (
                        <div className="s2b-tm-ventana" key={i}>
                          <div
                            className={"s2b-tm-tira" + (rodando[i] ? " is-rodando" : "")}
                            style={{
                              transform: `translateY(calc(var(--celda) * -${pos[i]}))`,
                              transition: anim
                                ? `transform ${(reducido ? 120 : FRENOS[i]) / 1000}s cubic-bezier(.16,.72,.24,1)`
                                : "none",
                            }}
                          >
                            {tira.map((s, k) => (
                              <div className="s2b-tm-celda" key={k}><Simbolo id={s} /></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="s2b-tm-barra">
                    <button
                      className="s2b-tm-son"
                      onClick={() => setSonando((s) => !s)}
                      aria-pressed={sonando}
                      aria-label={sonando ? t("Silenciar", "Mute") : t("Activar sonido", "Unmute")}
                    >
                      {sonando ? <Volume2 size={17} /> : <VolumeX size={17} />}
                    </button>

                    <span className="s2b-tm-fichas" title={t("Jugadas que te quedan", "Spins left")}>
                      <Sparkles size={14} />
                      <b>{restantes}</b> / {TOPE}
                      <i className="s2b-tm-creditos" aria-hidden="true">
                        {Array.from({ length: TOPE }).map((_, i) => (
                          <em key={i} className={i < restantes ? "is-on" : ""} />
                        ))}
                      </i>
                    </span>

                    {restantes <= 0 && sincronizado ? (
                      <button
                        className="s2b-tm-spin s2b-tm-spin--visto"
                        onClick={() => resultado && setAbierto(true)}
                        disabled={!resultado}
                      >
                        <b>{ganados.length ? t("MIS PREMIOS", "MY PRIZES") : t("SIN JUGADAS", "NO SPINS")}</b>
                        <small>{ganados.length ? t("tocá para verlos", "tap to see them") : t("volvé en otro momento", "come back another time")}</small>
                      </button>
                    ) : (
                      <motion.button
                        className="s2b-tm-spin"
                        onClick={girar}
                        disabled={fase === "girando"}
                        whileHover={reducido || fase === "girando" ? undefined : { scale: 1.04 }}
                        whileTap={reducido || fase === "girando" ? undefined : { scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 420, damping: 20 }}
                      >
                        <b>{fase === "girando" ? t("GIRANDO…", "SPINNING…") : t("GIRAR", "SPIN")}</b>
                        <small>{t("una sola jugada", "one spin only")}</small>
                      </motion.button>
                    )}
                  </div>

                  {error && <div className="s2b-tm-error" role="alert">{error}</div>}
                </div>
              </div>
            </Tilt>

            {/* lo que ya se gano, para que no haya que buscarlo en el chat */}
            {ganados.length > 0 && (
              <div className="s2b-tm-billetera">
                <h3><Sparkles size={15} /> {t("Tus códigos", "Your codes")}</h3>
                <ul>
                  {ganados.map((g) => {
                    const p = premioDe(g.premio);
                    return (
                      <li key={g.codigo}>
                        <Simbolo id={p.simbolo} />
                        <span className="s2b-tm-billetera-txt">
                          <b>{t(p.es, p.en)}</b>
                          <code>{g.codigo}</code>
                        </span>
                        {g.canjeado
                          ? <span className="s2b-tm-usado">{t("canjeado", "redeemed")}</span>
                          : <a className="s2b-tm-pedir" href={waLink(`Hola Studio B2B, gané ${p.es} y mi código es ${g.codigo}.`)} target="_blank" rel="noopener noreferrer">
                              {t("Reclamar", "Claim")} <ArrowRight size={14} />
                            </a>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* la tabla, a la vista y no escondida en un pie de pagina */}
            <div className="s2b-tm-abajo">
              <div className="s2b-tm-tabla">
                <h3><Info size={16} /> {t("Qué se puede ganar", "What you can win")}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>{t("Combinación", "Combination")}</th>
                      <th>{t("Premio", "Prize")}</th>
                      <th>{t("Probabilidad", "Odds")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREMIOS.map((p) => (
                      <tr key={p.id || "nada"} className={ganador === p.id && fase === "hecho" ? "is-ganado" : ""}>
                        <td>
                          {p.simbolo
                            ? <span className="s2b-tm-tres"><Simbolo id={p.simbolo} /><Simbolo id={p.simbolo} /><Simbolo id={p.simbolo} /></span>
                            : <span className="s2b-tm-nada">{t("Cualquier otra", "Any other")}</span>}
                        </td>
                        <td>{t(p.es, p.en)}</td>
                        <td className="s2b-tm-prob">{p.peso}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="s2b-tm-bases">
                <h3><ShieldCheck size={16} /> {t("Cómo funciona", "How it works")}</h3>
                <ul>
                  <li><Clock size={14} /> {t("Tres jugadas por conexión. Se cuentan en nuestro servidor, así que abrir otra ventana o borrar el historial no suma jugadas.", "Three spins per connection. They are counted on our server, so opening another window or clearing your history won't add more.")}</li>
                  <li><ShieldCheck size={14} /> {t("El sorteo y el código se generan en nuestro servidor, no en tu navegador, y las probabilidades son exactamente las de la tabla.", "The draw and the code are generated on our server, not in your browser, and the odds are exactly the ones in the table.")}</li>
                  <li><Sparkles size={14} /> {t("Cada código es único y se puede canjear una sola vez.", "Every code is unique and can be redeemed only once.")}</li>
                  <li><Sparkles size={14} /> {t("Los descuentos se aplican sobre el presupuesto final de un proyecto nuevo y no se acumulan entre sí.", "Discounts apply to the final quote of a new project and cannot be combined.")}</li>
                  <li><ArrowRight size={14} /> {t("Para reclamarlo, mandanos el código por WhatsApp. Vale 30 días desde la jugada.", "To claim it, send us the code on WhatsApp. Valid for 30 days from the spin.")}</li>
                </ul>
                <button className="s2b-link s2b-tm-volver" onClick={() => irA("home")}>
                  <ArrowLeft size={15} /> {t("Volver al inicio", "Back to home")}
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>

      {typeof document !== "undefined" && createPortal(
        <div className="s2b s2b-tm-portal">
          <AnimatePresence>
            {abierto && resultado && (
              <motion.div
                className="s2b-tm-tras"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onMouseDown={(e) => e.target === e.currentTarget && setAbierto(false)}
              >
                <motion.div
                  className={"s2b-tm-premio" + (resultado.premio.id ? " is-gano" : "")}
                  role="dialog" aria-modal="true"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <button className="s2b-tm-x" onClick={() => setAbierto(false)} aria-label={t("Cerrar", "Close")}><X size={19} /></button>

                  {resultado.premio.id && <div className="s2b-tm-halo" aria-hidden="true" />}

                  {/* el contenido va en su propia caja: antes se subia sobre el
                      halo con una regla al hijo directo, y esa regla le pisaba
                      el position:absolute al boton de cerrar */}
                  <div className="s2b-tm-premio-in">
                  {resultado.premio.id ? (
                    <>
                      <div className="s2b-tm-premio-sim"><Simbolo id={resultado.premio.simbolo} /></div>
                      <span className="s2b-tm-premio-rango">{resultado.premio.rango}</span>
                      <h3 className="s2b-tm-premio-tit">{t(resultado.premio.es, resultado.premio.en)}</h3>
                      <p className="s2b-tm-premio-det">{t(resultado.premio.detalle_es, resultado.premio.detalle_en)}</p>

                      <button className="s2b-tm-codigo" onClick={copiar} title={t("Copiar código", "Copy code")}>
                        <span>{resultado.codigo}</span>
                        {copiado ? <Check size={16} /> : <Copy size={16} />}
                      </button>

                      <a
                        className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-tm-reclamar"
                        href={waLink(mensajeWa(resultado))}
                        target="_blank" rel="noopener noreferrer"
                      >
                        {t("Reclamar por WhatsApp", "Claim on WhatsApp")} <ArrowRight size={16} />
                      </a>
                      <span className="s2b-tm-chico">
                        {t("Guardá el código: vale 30 días.", "Keep the code: valid for 30 days.")}
                        {restantes > 0 && " · " + t(`Te quedan ${restantes} jugadas`, `${restantes} spins left`)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="s2b-tm-premio-sim s2b-tm-premio-sim--nada"><Simbolo id="chip" /></div>
                      <h3 className="s2b-tm-premio-tit">{t(resultado.premio.es, resultado.premio.en)}</h3>
                      <p className="s2b-tm-premio-det">{t(resultado.premio.detalle_es, resultado.premio.detalle_en)}</p>
                      {restantes > 0 ? (
                        <button
                          className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-tm-reclamar"
                          onClick={() => setAbierto(false)}
                        >
                          {t(`Probar de nuevo · te quedan ${restantes}`, `Try again · ${restantes} left`)} <ArrowRight size={16} />
                        </button>
                      ) : (
                        <a
                          className="s2b-btn s2b-btn--chrome s2b-btn--aura s2b-tm-reclamar"
                          href={waLink(mensajeWa(resultado))}
                          target="_blank" rel="noopener noreferrer"
                        >
                          {t("Quiero mi diagnóstico gratis", "I want my free diagnosis")} <ArrowRight size={16} />
                        </a>
                      )}
                    </>
                  )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>
  );
}

/* ================= estilos ================= */

const CSS_TM = `
.s2b-tm-portal { display: contents; }
.s2b-tm-defs { position:absolute; width:0; height:0; overflow:hidden; }

/* La paleta de casino: oro de verdad -cuatro paradas, no un amarillo plano- y
   el terciopelo rojo del gabinete. El violeta de la marca queda de fondo, para
   que la pagina siga siendo de Studio B2B y no de otro lado. */
.s2b-tm-band {
  overflow:hidden;
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  --rojo1:#A81D33; --rojo2:#6B0F20; --rojo3:#370713; --rojo4:#1E040B;
}
.s2b-tm-band::before {
  content:''; position:absolute; inset:-20% -10% auto -10%; height:130%; pointer-events:none;
  background:
    radial-gradient(680px circle at 50% 34%, rgba(255,190,60,.2), transparent 62%),
    radial-gradient(520px circle at 14% 8%, rgba(216,40,70,.18), transparent 64%),
    conic-gradient(from 200deg at 72% 28%, transparent 0 44%, rgba(109,74,255,.3) 60%, rgba(167,140,255,.16) 74%, transparent 90%);
  filter: blur(54px);
}
.s2b-tm-top { position:relative; text-align:center; display:grid; justify-items:center; }
.s2b-tm-h2 { max-width:22ch; }
.s2b-tm-lead { margin-left:auto; margin-right:auto; }

/* ---------- simbolos ----------
   Las medidas van en px o en calc() sobre --celda, nunca en porcentaje: un
   alto en % dentro de un grid centrado se resuelve contra el ancho del padre
   y el simbolo terminaba midiendo 326 px en una celda de 116. */
.s2b-tm-sim { position:relative; display:grid; place-items:center; flex:none; }
.s2b-tm-sim > svg, .s2b-tm-sim > img { width:100%; height:100%; object-fit:contain; display:block; }
.s2b-tm-sim > svg { filter: drop-shadow(0 5px 10px rgba(0,0,0,.6)); }

.s2b-tm-sim--logo::before {
  content:''; position:absolute; inset:-16%; border-radius:50%; pointer-events:none;
  background: radial-gradient(circle at 50% 44%, rgba(255,226,150,.75), rgba(255,170,40,.32) 48%, transparent 72%);
}
.s2b-tm-sim--logo > img { position:relative; z-index:1;
  filter: drop-shadow(0 0 9px rgba(255,226,160,.95)) drop-shadow(0 4px 9px rgba(0,0,0,.7)); }

/* ---------- marquesina de premios ---------- */
.s2b-tm-marquesina { position:relative; display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin:38px 0 24px; }
.s2b-tm-jack { position:relative; overflow:hidden; display:grid; grid-template-columns:1fr auto; align-items:center; gap:8px;
  padding:11px 13px; border-radius:14px;
  border:1px solid rgba(249,216,88,.38);
  background:linear-gradient(160deg, rgba(168,29,51,.5), rgba(55,7,19,.72));
  box-shadow:inset 0 1px 0 rgba(255,246,208,.28), 0 10px 26px -16px rgba(0,0,0,.9); }
.s2b-tm-jack .s2b-tm-sim { width:36px; height:36px; grid-row:span 2; }
.s2b-tm-jack-rango { grid-column:1; font-family:var(--mono); font-size:9.5px; letter-spacing:.18em; color:var(--oro2); }
.s2b-tm-jack-monto { grid-column:1; font-family:var(--display); font-size:clamp(17px,2.6vw,23px); font-weight:600; line-height:1.1;
  background:linear-gradient(180deg,var(--oro1) 6%,var(--oro2) 42%,var(--oro3) 74%,var(--oro1));
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 1px 0 rgba(0,0,0,.55)); }
.s2b-tm-jack--logo { border-color:var(--oro2);
  background:linear-gradient(160deg, rgba(208,154,28,.45), rgba(55,7,19,.8));
  box-shadow:inset 0 1px 0 rgba(255,246,208,.45), 0 0 26px -8px rgba(249,216,88,.55); }
.s2b-tm-jack--logo::after {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(100deg, transparent 36%, rgba(255,255,255,.34) 50%, transparent 64%);
  transform:translateX(-120%); animation:s2b-tm-brillo 3.6s ease-in-out infinite;
}
@keyframes s2b-tm-brillo { 0%,55%{transform:translateX(-120%)} 85%,100%{transform:translateX(120%)} }
.s2b-tm-jack.is-ganado { border-color:#7FE3A8; box-shadow:0 0 0 1px #7FE3A8, 0 14px 40px -18px rgba(127,227,168,.8); }

/* ---------- el mueble ----------
   El marco dorado es una capa propia y no un border-image: asi lleva bisel
   adentro, resplandor afuera y esquinas redondeadas sin cortar el degrade. */
.s2b-tm-tilt { position:relative; }
.s2b-tm-mueble { position:relative; padding:clamp(8px,1.2vw,12px); border-radius:clamp(20px,2.6vw,30px);
  background:linear-gradient(158deg, var(--oro1) 0%, var(--oro2) 18%, var(--oro4) 40%, var(--oro2) 58%, var(--oro3) 74%, var(--oro1) 100%);
  box-shadow:
    0 0 0 1px rgba(124,78,6,.85),
    0 22px 60px -22px rgba(255,170,40,.5),
    0 60px 130px -50px rgba(0,0,0,.95); }
.s2b-tm-cuerpo { position:relative; border-radius:clamp(14px,2vw,22px); padding:clamp(12px,2vw,20px);
  background:linear-gradient(180deg, var(--rojo2) 0%, var(--rojo3) 58%, var(--rojo4) 100%);
  box-shadow:inset 0 2px 0 rgba(0,0,0,.55), inset 0 -2px 0 rgba(255,246,208,.12); }

.s2b-tm-luces { position:absolute; left:14px; right:14px; top:6px; pointer-events:none; display:flex; justify-content:space-between; }
.s2b-tm-luces i { width:5px; height:5px; border-radius:50%; background:var(--oro1); opacity:.35;
  animation:s2b-tm-luz 1.6s ease-in-out infinite; }
@keyframes s2b-tm-luz { 50% { opacity:1; box-shadow:0 0 9px var(--oro2), 0 0 16px rgba(249,216,88,.7); } }

/* el fieltro rojo, con el estallido de luz atras de los rodillos */
.s2b-tm-rodillos { --celda: clamp(74px, 19vw, 116px);
  position:relative; margin-top:14px; padding:clamp(9px,1.4vw,14px) clamp(22px,3.4vw,34px);
  border-radius:16px; overflow:hidden;
  background:radial-gradient(120% 90% at 50% 42%, var(--rojo1) 0%, var(--rojo2) 46%, var(--rojo4) 100%);
  box-shadow:inset 0 0 0 2px rgba(208,154,28,.55), inset 0 6px 22px rgba(0,0,0,.7); }
.s2b-tm-rayos { position:absolute; inset:-40%; pointer-events:none; opacity:.3;
  background:repeating-conic-gradient(from 0deg at 50% 50%,
    rgba(255,214,120,.42) 0deg 3deg, transparent 3deg 9deg);
  animation:s2b-tm-girar 44s linear infinite; }
@keyframes s2b-tm-girar { to { transform:rotate(360deg); } }
.s2b-tm-mueble.is-girando .s2b-tm-rayos { opacity:.5; animation-duration:11s; }

/* los rieles de neon de los costados */
.s2b-tm-riel { position:absolute; top:10px; bottom:10px; width:9px; border-radius:99px; pointer-events:none; z-index:1;
  background:linear-gradient(180deg,#FF3D7F,#FFD54A 22%,#7FE3A8 44%,#57C7F7 64%,#A78CFF 84%,#FF3D7F);
  background-size:100% 220%; box-shadow:0 0 12px rgba(255,255,255,.5), inset 0 0 6px rgba(0,0,0,.4);
  animation:s2b-tm-neon 2.6s linear infinite; }
.s2b-tm-riel--izq { left:8px; }
.s2b-tm-riel--der { right:8px; }
@keyframes s2b-tm-neon { to { background-position:0 -220%; } }
.s2b-tm-mueble.is-girando .s2b-tm-riel { animation-duration:.7s; }

.s2b-tm-ventanas { position:relative; z-index:1; display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(6px,1vw,10px); }
.s2b-tm-ventana { position:relative; height:calc(var(--celda) * 3); overflow:hidden; border-radius:10px;
  background:linear-gradient(180deg,#2B0610,#13030A 50%,#2B0610);
  box-shadow:inset 0 0 0 1px rgba(249,216,88,.35), inset 0 20px 26px -20px #000, inset 0 -20px 26px -20px #000; }
.s2b-tm-tira { display:block; will-change:transform; }
.s2b-tm-tira.is-rodando { filter:blur(1.5px); }
.s2b-tm-celda { height:var(--celda); display:grid; place-items:center; }
.s2b-tm-celda .s2b-tm-sim { width:calc(var(--celda) * .72); height:calc(var(--celda) * .72); }

/* la linea que paga, en oro y por encima de todo */
.s2b-tm-linea { position:absolute; left:clamp(14px,2.6vw,24px); right:clamp(14px,2.6vw,24px); top:50%;
  height:calc(var(--celda) + 6px); transform:translateY(-50%); z-index:2; pointer-events:none; border-radius:8px;
  border-top:2px solid var(--oro2); border-bottom:2px solid var(--oro2);
  box-shadow:0 0 14px rgba(249,216,88,.55), inset 0 0 30px rgba(249,216,88,.1); }
.s2b-tm-mueble.is-girando .s2b-tm-linea { animation:s2b-tm-late 1s ease-in-out infinite; }
@keyframes s2b-tm-late { 50% { box-shadow:0 0 26px rgba(255,214,120,.95), inset 0 0 40px rgba(249,216,88,.22); } }

/* ---------- la botonera ---------- */
.s2b-tm-barra { display:flex; align-items:center; gap:clamp(8px,1.4vw,14px); margin-top:clamp(12px,1.8vw,18px); }
.s2b .s2b-tm-son { width:48px; height:48px; flex:none; border-radius:12px; display:grid; place-items:center;
  color:#3A0B14; border:2px solid var(--oro4);
  background:linear-gradient(180deg,var(--oro1),var(--oro2) 45%,var(--oro3));
  box-shadow:0 4px 0 var(--oro4), 0 10px 20px -10px rgba(0,0,0,.9);
  transition:transform .12s, box-shadow .12s; }
.s2b .s2b-tm-son:hover { transform:translateY(-1px); }
.s2b .s2b-tm-son:active { transform:translateY(3px); box-shadow:0 1px 0 var(--oro4); }

.s2b .s2b-tm-spin { flex:1; min-height:64px; border-radius:16px; position:relative; overflow:hidden;
  display:grid; align-content:center; gap:1px; color:#fff; text-align:center;
  border:3px solid var(--oro2);
  background:linear-gradient(180deg,#7BE08F 0%,#35BE64 42%,#137A38 100%);
  box-shadow:0 5px 0 #0B5327, 0 16px 34px -14px rgba(19,122,56,.9), inset 0 1px 0 rgba(255,255,255,.5);
  transition:transform .12s, box-shadow .12s; }
.s2b .s2b-tm-spin b { font-family:var(--display); font-size:clamp(19px,2.8vw,26px); font-weight:700; letter-spacing:.08em;
  text-shadow:0 2px 0 rgba(0,0,0,.32); }
.s2b .s2b-tm-spin small { font-family:var(--mono); font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; opacity:.85; }
.s2b .s2b-tm-spin::after { content:''; position:absolute; inset:0;
  background:linear-gradient(100deg, transparent 36%, rgba(255,255,255,.42) 50%, transparent 64%);
  transform:translateX(-120%); transition:transform .7s ease; }
.s2b .s2b-tm-spin:hover::after { transform:translateX(120%); }
.s2b .s2b-tm-spin:active { transform:translateY(4px); box-shadow:0 1px 0 #0B5327; }
.s2b .s2b-tm-spin:disabled { opacity:.68; cursor:progress; transform:none; }
.s2b .s2b-tm-spin--visto { background:linear-gradient(180deg,#C9A6FF 0%,#7B54F0 42%,#3F1FA8 100%);
  box-shadow:0 5px 0 #2A1277, 0 16px 34px -14px rgba(109,74,255,.9), inset 0 1px 0 rgba(255,255,255,.5); }
.s2b .s2b-tm-spin--visto:active { box-shadow:0 1px 0 #2A1277; }

.s2b-tm-fichas { display:inline-flex; align-items:center; gap:7px; flex:none; padding:9px 14px; border-radius:10px;
  border:1px solid rgba(249,216,88,.4); background:rgba(0,0,0,.35);
  font-family:var(--mono); font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--oro2); }
.s2b-tm-fichas svg { color:var(--oro1); }
.s2b-tm-fichas b { color:var(--oro1); font-size:13px; font-weight:600; }
.s2b-tm-creditos { display:inline-flex; gap:3px; margin-left:3px; font-style:normal; }
.s2b-tm-creditos em { width:7px; height:7px; border-radius:50%; background:rgba(249,216,88,.22); }
.s2b-tm-creditos em.is-on { background:var(--oro2); box-shadow:0 0 7px var(--oro2); }

/* ---------- los codigos ganados ---------- */
.s2b-tm-billetera { position:relative; margin-top:26px; padding:18px 20px; border-radius:20px;
  border:1px solid rgba(249,216,88,.35); background:linear-gradient(160deg, rgba(168,29,51,.24), rgba(0,0,0,.28)); }
.s2b .s2b-tm-billetera h3 { display:flex; align-items:center; gap:9px; margin:0 0 14px; font-family:var(--mono);
  font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--oro2); font-weight:400; }
.s2b-tm-billetera h3 svg { color:var(--oro2); }
.s2b-tm-billetera ul { list-style:none; margin:0; padding:0; display:grid; gap:10px; }
.s2b-tm-billetera li { display:flex; align-items:center; gap:13px; padding:11px 14px; border-radius:14px;
  border:1px solid rgba(249,216,88,.22); background:rgba(0,0,0,.3); flex-wrap:wrap; }
.s2b-tm-billetera li .s2b-tm-sim { width:34px; height:34px; }
.s2b-tm-billetera-txt { display:grid; gap:2px; flex:1; min-width:150px; }
.s2b-tm-billetera-txt b { font-size:14px; color:#fff; font-weight:600; }
.s2b-tm-billetera-txt code { font-family:var(--mono); font-size:13px; letter-spacing:.08em; color:var(--oro1); }
.s2b-tm-pedir { display:inline-flex; align-items:center; gap:7px; padding:8px 14px; border-radius:999px;
  border:1px solid var(--oro2); color:var(--oro1); font-family:var(--mono); font-size:10.5px;
  letter-spacing:.1em; text-transform:uppercase; transition:background .2s, color .2s; }
.s2b-tm-pedir:hover { background:var(--oro2); color:#3A0B14; }
.s2b-tm-usado { font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:#7FE3A8; }
.s2b-tm-error { margin-top:12px; padding:11px 14px; border-radius:12px; font-size:13.5px;
  color:#FFD9D9; background:rgba(255,60,60,.16); border:1px solid rgba(255,120,120,.45); }

/* ---------- tabla y bases ---------- */
.s2b-tm-abajo { position:relative; display:grid; gap:20px; margin-top:34px; }
.s2b-tm-tabla, .s2b-tm-bases { border:1px solid rgba(249,216,88,.22); border-radius:20px; padding:20px 22px;
  background:linear-gradient(160deg, rgba(255,255,255,.06), rgba(0,0,0,.2)); }
.s2b .s2b-tm-tabla h3, .s2b .s2b-tm-bases h3 { display:flex; align-items:center; gap:9px; font-family:var(--mono); font-size:11px;
  letter-spacing:.16em; text-transform:uppercase; color:var(--oro2); font-weight:400; margin:0 0 14px; }
.s2b-tm-tabla h3 svg, .s2b-tm-bases h3 svg { color:var(--oro2); }
.s2b-tm-tabla table { width:100%; border-collapse:collapse; }
.s2b-tm-tabla th { text-align:left; font-family:var(--mono); font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
  color:#9E97C4; font-weight:400; padding-bottom:9px; border-bottom:1px solid rgba(249,216,88,.24); }
.s2b-tm-tabla td { padding:11px 0; border-bottom:1px solid rgba(167,140,255,.1); font-size:14px; color:#D8D2EC; vertical-align:middle; }
.s2b-tm-tabla tr:last-child td { border-bottom:none; }
.s2b-tm-tabla tr.is-ganado td { color:#fff; background:linear-gradient(90deg, rgba(127,227,168,.16), transparent); }
.s2b-tm-tres { display:inline-flex; gap:3px; }
.s2b-tm-tres .s2b-tm-sim { width:27px; height:27px; }
.s2b-tm-nada { font-family:var(--mono); font-size:11px; color:#7E7799; }
.s2b-tm-prob { font-family:var(--mono); font-size:13px; color:var(--oro2); white-space:nowrap; }
.s2b-tm-bases ul { list-style:none; margin:0; padding:0; display:grid; gap:11px; }
.s2b-tm-bases li { display:flex; gap:10px; align-items:flex-start; font-size:14px; color:#BDB4E4; line-height:1.55; }
.s2b-tm-bases li svg { flex:none; margin-top:4px; color:var(--oro2); }
.s2b-tm-volver { margin-top:18px; }

/* ---------- el premio ---------- */
.s2b-tm-tras { position:fixed; inset:0; z-index:125; display:grid; place-items:center; padding:18px;
  --title:#FFFFFF; --text:#C9C2E6; --muted:#9E97C4; color:var(--text);
  --oro1:#FFF6D0; --oro2:#F9D858; --oro3:#D09A1C; --oro4:#7C4E06;
  background:rgba(5,3,14,.76); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
.s2b-tm-premio { position:relative; width:min(470px,100%); text-align:center; padding:38px 30px 30px; border-radius:26px;
  border:1px solid rgba(167,140,255,.3); background:linear-gradient(168deg,#1B0F44,#0A0620 70%); overflow:hidden;
  box-shadow:0 60px 140px -50px rgba(0,0,0,.95); }
.s2b-tm-premio.is-gano { border:2px solid var(--oro2);
  background:linear-gradient(168deg,#4A1024 0%,#25091C 52%,#0A0620 100%);
  box-shadow:0 0 40px -6px rgba(249,216,88,.45), 0 60px 140px -50px rgba(0,0,0,.95); }
.s2b-tm-halo { position:absolute; inset:-50% -20% auto -20%; height:130%;
  background:conic-gradient(from 0deg, transparent 0 28%, rgba(255,214,120,.42) 42%, rgba(216,40,70,.4) 58%, transparent 72%);
  filter:blur(38px); animation:s2b-tm-rot 9s linear infinite; pointer-events:none; }
@keyframes s2b-tm-rot { to { transform:rotate(360deg); } }
.s2b .s2b-tm-x { position:absolute; top:12px; right:12px; z-index:3; width:34px; height:34px; border-radius:11px; display:grid;
  place-items:center; color:#E4D9C0; border:1px solid rgba(249,216,88,.35); transition:color .2s, transform .2s; }
.s2b .s2b-tm-x:hover { color:#fff; transform:rotate(90deg); }
.s2b-tm-premio-in { position:relative; z-index:2; }
.s2b-tm-premio-sim { display:grid; place-items:center; margin:0 auto 16px; }
.s2b-tm-premio-sim .s2b-tm-sim { width:112px; height:112px; }
.s2b-tm-premio-sim--nada { opacity:.4; }
.s2b-tm-premio-sim--nada .s2b-tm-sim { width:78px; height:78px; }
.s2b-tm-premio-rango { display:inline-block; font-family:var(--mono); font-size:10px; letter-spacing:.24em; color:var(--oro2); margin-bottom:10px; }
.s2b .s2b-tm-premio-tit { font-size:clamp(23px,4vw,31px); color:#fff; margin:0 0 10px; }
.s2b-tm-premio-det { font-size:14.5px; color:#D8D2EC; max-width:38ch; margin:0 auto; line-height:1.6; }
.s2b .s2b-tm-codigo { display:inline-flex; align-items:center; gap:12px; margin:22px 0 18px; padding:13px 20px; border-radius:14px;
  border:2px dashed var(--oro2); background:rgba(249,216,88,.12); color:var(--oro1);
  font-family:var(--mono); font-size:16px; letter-spacing:.1em; transition:background .2s, border-color .2s; }
.s2b .s2b-tm-codigo:hover { background:rgba(249,216,88,.22); }
.s2b-tm-reclamar { width:100%; justify-content:center; margin-top:6px; }
.s2b-tm-chico { display:block; margin-top:14px; font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; color:#9E97C4; }

@media (min-width: 760px) {
  .s2b-tm-marquesina { grid-template-columns:repeat(4,1fr); }
  .s2b-tm-abajo { grid-template-columns:1.15fr .85fr; }
}
@media (max-width: 520px) {
  .s2b-tm-barra { flex-wrap:wrap; }
  .s2b .s2b-tm-spin { order:-1; width:100%; flex:none; }
  .s2b-tm-fichas { margin-left:auto; }
  .s2b-tm-riel { width:6px; }
  .s2b-tm-tabla, .s2b-tm-bases { padding:16px 15px; }
  .s2b-tm-tabla td { font-size:13px; }
}
@media (prefers-reduced-motion: reduce) {
  .s2b-tm-luces i, .s2b-tm-jack--logo::after, .s2b-tm-halo, .s2b-tm-linea,
  .s2b-tm-rayos, .s2b-tm-riel { animation:none !important; }
}
`;
