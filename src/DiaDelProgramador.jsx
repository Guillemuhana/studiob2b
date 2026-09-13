import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Highlight } from "prism-react-renderer";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";
import {
  Play, X, Copy, Check, RotateCcw, Download, TerminalSquare, Code2, Heart,
} from "lucide-react";

import { correr, CANCELADO, TOTAL_LINEAS } from "./diaDelProgramador.js";
/* el codigo que se muestra no es una copia pegada a mano: es el archivo de
   verdad, leido en crudo por Vite. Si manana cambia stdb2b.ts, cambia lo que
   ve la gente en la web, sin tocar esta pantalla */
import fuente from "../brand/stdb2b.ts?raw";

const CODIGO = fuente.replace(/\s+$/, "");
/* JetBrains Mono no trae los caracteres de caja: el navegador los saca de otra
   fuente, que avanza 11 px donde la letra avanza 12, y el cartel ASCII se
   desarma. Las lineas que tienen arte se pasan al mono del sistema, donde
   letra y caja miden lo mismo. */
const ARTE = /[\u2500-\u259F]/;
const LINEAS = CODIGO.split("\n");
const CANT_LINEAS = LINEAS.length;
const LINEA_ARTE = LINEAS.map((l) => ARTE.test(l));

/* de que renglon del archivo salio cada linea de la consola */
function ubicar(ancla) {
  if (!ancla) return 0;
  const i = LINEAS.findIndex((l) => l.includes(ancla.ancla));
  return i < 0 ? 0 : i + 1 + (ancla.salto || 0);
}

/* el tema de Prism, escrito con la paleta del sitio en lugar de la del plugin:
   lila para las palabras clave, verde para los textos, gris tibio para los
   comentarios, que son la mitad de lo que hay para leer */
const TEMA = {
  plain: { color: "#D7D1F0", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "cdata"], style: { color: "#6C6493", fontStyle: "italic" } },
    { types: ["punctuation", "operator"], style: { color: "#8E86B6" } },
    { types: ["string", "char", "attr-value", "template-string"], style: { color: "#7FE3A8" } },
    { types: ["number", "boolean", "constant"], style: { color: "#FFC48C" } },
    { types: ["keyword", "builtin", "class-name"], style: { color: "#C9B6FF" } },
    { types: ["function"], style: { color: "#8FD6FF" } },
    { types: ["property-access", "maybe-class-name"], style: { color: "#D7D1F0" } },
    { types: ["variable", "parameter"], style: { color: "#E6E1FA" } },
    { types: ["regex", "important"], style: { color: "#FF9CC8" } },
  ],
};

const COLORES = ["#6D4AFF", "#A78CFF", "#C9B6FF", "#7FE3A8", "#FFFFFF"];

/* ================= la consola ================= */

function Consola({ t, cerrar }) {
  const reducido = useReducedMotion();
  const ritmo = reducido ? 0 : 1;

  const [salida, setSalida] = useState([]);
  const [activa, setActiva] = useState(0);
  const [corriendo, setCorriendo] = useState(true);
  const [listo, setListo] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [pestana, setPestana] = useState("salida");

  const corrida = useRef(0);
  const montado = useRef(true);
  const caja = useRef(null);
  const panelSalida = useRef(null);
  const panelCodigo = useRef(null);
  const renglones = useRef({});

  const arrancar = useCallback(() => {
    const id = ++corrida.current;
    setSalida([]);
    setActiva(0);
    setListo(false);
    setCorriendo(true);

    const vivo = () => montado.current && corrida.current === id;

    const esperar = (ms) =>
      new Promise((listo_, fallo) => {
        if (!vivo()) return fallo(CANCELADO);
        setTimeout(() => (vivo() ? listo_() : fallo(CANCELADO)), Math.max(0, ms));
      });

    const log = (texto, tipo, ancla) => {
      if (!vivo()) throw CANCELADO;
      const linea = ubicar(ancla);
      setSalida((s) => [...s, { texto, tipo, linea, k: s.length }]);
      if (linea) setActiva(linea);
    };

    correr({ log, esperar, ritmo })
      .then(() => {
        if (!vivo()) return;
        setCorriendo(false);
        setListo(true);
        if (reducido) return;
        /* el cierre: dos rafagas desde los costados, con los violetas de la marca */
        const disparo = (x, angulo) =>
          confetti({
            particleCount: 60,
            spread: 74,
            startVelocity: 42,
            origin: { x, y: 0.72 },
            angle: angulo,
            colors: COLORES,
            zIndex: 130,
            scalar: 0.9,
            disableForReducedMotion: true,
          });
        disparo(0.18, 62);
        setTimeout(() => disparo(0.82, 118), 140);
      })
      .catch((e) => {
        if (e !== CANCELADO) throw e;
      });
  }, [ritmo, reducido]);

  useEffect(() => {
    montado.current = true;
    arrancar();
    return () => {
      montado.current = false;
    };
  }, [arrancar]);

  /* escape para salir, y el fondo de la pagina quieto mientras la consola esta
     puesta: si no, el scroll del mouse mueve el sitio por debajo */
  useEffect(() => {
    const tecla = (e) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (caja.current) caja.current.focus();
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [cerrar]);

  /* la consola sigue a la ultima linea */
  useEffect(() => {
    const p = panelSalida.current;
    if (p) p.scrollTop = p.scrollHeight;
  }, [salida.length]);

  /* y el codigo sigue a la linea que esta hablando, centrada en su panel */
  useEffect(() => {
    const p = panelCodigo.current;
    const el = renglones.current[activa];
    if (!p || !el) return;
    p.scrollTo({
      top: el.offsetTop - p.clientHeight / 2 + el.offsetHeight / 2,
      behavior: reducido ? "auto" : "smooth",
    });
  }, [activa, reducido]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(CODIGO + "\n");
      setCopiado(true);
      setTimeout(() => montado.current && setCopiado(false), 1800);
    } catch {
      /* sin portapapeles queda el boton de descarga, que no depende de permisos */
    }
  };

  const descargar = () => {
    const url = URL.createObjectURL(new Blob([CODIGO + "\n"], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "stdb2b.ts";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const avance = Math.min(100, Math.round((salida.length / TOTAL_LINEAS) * 100));

  return (
    <motion.div
      className="s2b-dp-tras"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.26 }}
      onMouseDown={(e) => e.target === e.currentTarget && cerrar()}
    >
      <motion.div
        className="s2b-dp-modal"
        ref={caja}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t("Día del Programador · el script de Studio B2B", "Programmers' Day · the Studio B2B script")}
        initial={{ opacity: 0, scale: 0.94, y: 26 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
      >
        <div className="s2b-dp-head">
          <div className="s2b-dp-dots" aria-hidden="true"><i /><i /><i /></div>
          <b className="s2b-dp-file">node brand/stdb2b.ts</b>

          <div className="s2b-dp-tabs" role="tablist" aria-label={t("Vista", "View")}>
            <button role="tab" aria-selected={pestana === "salida"} className={pestana === "salida" ? "is-on" : ""} onClick={() => setPestana("salida")}>
              <TerminalSquare size={14} /> {t("Salida", "Output")}
            </button>
            <button role="tab" aria-selected={pestana === "codigo"} className={pestana === "codigo" ? "is-on" : ""} onClick={() => setPestana("codigo")}>
              <Code2 size={14} /> {t("Código", "Code")}
            </button>
          </div>

          <button className="s2b-dp-x" onClick={cerrar} aria-label={t("Cerrar", "Close")}><X size={19} /></button>
        </div>

        <div className="s2b-dp-prog" aria-hidden="true">
          <motion.i animate={{ width: avance + "%" }} transition={{ ease: "easeOut", duration: 0.4 }} />
        </div>

        <div className={"s2b-dp-panes s2b-dp-panes--" + pestana}>
          {/* ---- el archivo ---- */}
          <div className="s2b-dp-pane s2b-dp-pane--cod" ref={panelCodigo}>
            <Highlight code={CODIGO} language="typescript" theme={TEMA}>
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre className="s2b-dp-pre">
                  {tokens.map((linea, i) => {
                    const n = i + 1;
                    const viva = n === activa;
                    const props = getLineProps({ line: linea });
                    return (
                      <div
                        key={i}
                        {...props}
                        ref={(el) => { renglones.current[n] = el; }}
                        className={
                          "s2b-dp-ln" + (viva ? " is-live" : "") +
                          (LINEA_ARTE[i] ? " is-arte" : "") +
                          (props.className ? " " + props.className : "")
                        }
                      >
                        <span className="s2b-dp-num">{n}</span>
                        <span className="s2b-dp-src">
                          {linea.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
                        </span>
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          </div>

          {/* ---- lo que imprime ---- */}
          <div className="s2b-dp-pane s2b-dp-pane--out" ref={panelSalida} role="log">
            <div className="s2b-dp-out">
              {salida.map((l) => (
                <motion.div
                  key={l.k}
                  className={"s2b-dp-l s2b-dp-l--" + l.tipo}
                  initial={reducido ? false : { opacity: 0, y: 7, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.34, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {l.texto}
                </motion.div>
              ))}
              <div className="s2b-dp-l s2b-dp-l--cmd">
                {corriendo ? "> " : "> exit 0 "}
                <span className="s2b-caret" />
              </div>
            </div>
          </div>
        </div>

        <div className="s2b-dp-foot">
          <div className="s2b-dp-estado">
            <span className={"s2b-dp-pulso" + (listo ? " is-ok" : "")} aria-hidden="true" />
            {corriendo
              ? t("Ejecutando…", "Running…")
              : <><Heart size={13} /> {t("Gracias por leer el código.", "Thanks for reading the code.")}</>}
          </div>
          <div className="s2b-dp-act">
            <button className="s2b-dp-b" onClick={arrancar}><RotateCcw size={14} /> {t("Correr de nuevo", "Run again")}</button>
            <button className="s2b-dp-b" onClick={copiar}>
              {copiado ? <Check size={14} /> : <Copy size={14} />} {copiado ? t("Copiado", "Copied") : t("Copiar código", "Copy code")}
            </button>
            <button className="s2b-dp-b" onClick={descargar}><Download size={14} /> stdb2b.ts</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= la seccion del home ================= */

export default function DiaDelProgramador({ t }) {
  const [abierto, setAbierto] = useState(false);
  const reducido = useReducedMotion();
  const gatillo = useRef(null);

  const cerrar = useCallback(() => {
    setAbierto(false);
    /* el foco vuelve al boton que abrio la consola, no al principio de la pagina */
    setTimeout(() => gatillo.current && gatillo.current.focus(), 0);
  }, []);

  const asomo = useMemo(() => LINEAS.slice(0, 16).join("\n"), []);

  /* La entrada no usa la clase .s2b-rv del sitio: esa la enciende un efecto que
     vive en App, y esta seccion llega tarde -en su propio chunk-, asi que se
     anima sola cuando entra en pantalla. */
  const entrada = (demora = 0) =>
    reducido
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.72, delay: demora, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <>
      <style>{CSS_DP}</style>

      <div className="s2b-band s2b-band--dark s2b-dp-band" id="dia-del-programador">
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap s2b-dp-grid">
            <motion.div {...entrada()}>
              <div className="s2b-eyebrow">13 · 09 · {t("Día del Programador", "Programmers' Day")}</div>
              <h2 className="s2b-h2">
                {t("Detrás de cada solución hay", "Behind every solution there is")}{" "}
                <b>{t("alguien escribiendo código", "someone writing code")}</b>
              </h2>
              <p className="s2b-lead">
                {t(
                  "Escribimos un script para celebrarlo y lo dejamos acá, sin maquillar: apretá el botón, miralo correr y leé el archivo que lo hace. Es el mismo que corre en nuestras terminales.",
                  "We wrote a script to celebrate it and left it here, unretouched: hit the button, watch it run and read the file behind it. It's the same one running in our terminals."
                )}
              </p>

              <div className="s2b-dp-chips">
                <span><i />{CANT_LINEAS} {t("líneas", "lines")}</span>
                <span><i />TypeScript</span>
                <span><i />{t("sin dependencias", "zero dependencies")}</span>
              </div>

              <motion.button
                ref={gatillo}
                className="s2b-btn s2b-btn--primary s2b-btn--aura s2b-dp-cta"
                onClick={() => setAbierto(true)}
                whileHover={reducido ? undefined : { scale: 1.035 }}
                whileTap={reducido ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                <Play size={16} fill="currentColor" /> {t("Ejecutar el script", "Run the script")}
              </motion.button>

              <div className="s2b-dp-cmd">
                <span>$</span> node brand/stdb2b.ts
              </div>
            </motion.div>

            {/* el archivo asomando: se ve el codigo de verdad antes de abrir nada */}
            <motion.div className="s2b-dp-asomo-box" {...entrada(0.1)}>
              <Tilt
                className="s2b-dp-tilt"
                tiltMaxAngleX={7}
                tiltMaxAngleY={9}
                perspective={1100}
                transitionSpeed={1200}
                glareEnable
                glareMaxOpacity={0.16}
                glareColor="#C9B6FF"
                glarePosition="all"
                glareBorderRadius="22px"
                scale={1.01}
              >
                <button className="s2b-dp-card" onClick={() => setAbierto(true)} aria-label={t("Ver y ejecutar el script", "View and run the script")}>
                  <div className="s2b-dp-card-bar"><i /><i /><i /><b>stdb2b.ts</b></div>
                  <Highlight code={asomo} language="typescript" theme={TEMA}>
                    {({ tokens, getLineProps, getTokenProps }) => (
                      <pre className="s2b-dp-pre s2b-dp-pre--mini">
                        {tokens.map((linea, i) => (
                          <div key={i} {...getLineProps({ line: linea })} className="s2b-dp-ln">
                            <span className="s2b-dp-num">{i + 1}</span>
                            <span className="s2b-dp-src">
                              {linea.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
                            </span>
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                  <span className="s2b-dp-card-play"><Play size={18} fill="currentColor" /></span>
                </button>
              </Tilt>
            </motion.div>
          </div>
        </section>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <div className="s2b s2b-dp-portal">
            <AnimatePresence>{abierto && <Consola t={t} cerrar={cerrar} />}</AnimatePresence>
          </div>,
          document.body
        )}
    </>
  );
}

/* ==================================================================
   estilos
   La consola sale por un portal al body: adentro de la seccion quedaba
   presa de los transform de la animacion de entrada, que recortan
   cualquier position:fixed que cuelgue de ellos.
   ================================================================== */

const CSS_DP = `
.s2b-dp-portal { display: contents; }
.s2b-dp-arte { font-family: ui-monospace, "SF Mono", Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace; }

.s2b-dp-band { overflow: hidden; }
.s2b-dp-band::before {
  content:''; position:absolute; inset:-30% -10% auto -10%; height:120%;
  background: conic-gradient(from 210deg at 30% 20%, transparent 0 42%, rgba(109,74,255,.28) 58%, rgba(167,140,255,.16) 72%, transparent 88%);
  filter: blur(60px); pointer-events:none; opacity:.9;
}
.s2b-dp-grid { position:relative; display:grid; gap:44px; align-items:center; }

.s2b-dp-chips { display:flex; flex-wrap:wrap; gap:9px; margin-top:24px; }
.s2b-dp-chips span { display:inline-flex; align-items:center; gap:8px; padding:7px 14px; border-radius:999px;
  border:1px solid rgba(167,140,255,.26); background:rgba(255,255,255,.05);
  font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#C9C2E6; }
.s2b-dp-chips i { width:5px; height:5px; border-radius:50%; background:var(--lilac); flex:none; }

.s2b-dp-cta { margin-top:28px; }
.s2b-dp-cmd { margin-top:16px; font-family:var(--mono); font-size:12.5px; color:#8C85AE; }
.s2b-dp-cmd span { color:#7FE3A8; margin-right:7px; }

/* ---------- el archivo asomando ---------- */
.s2b-dp-tilt { width:100%; }
.s2b-dp-card { position:relative; display:block; width:100%; text-align:left; padding:0; overflow:hidden;
  border-radius:22px; border:1px solid rgba(167,140,255,.24); background:rgba(6,4,14,.78);
  box-shadow:0 46px 100px -46px rgba(109,74,255,.8); cursor:pointer; }
.s2b-dp-card-bar { display:flex; align-items:center; gap:7px; padding:12px 15px; border-bottom:1px solid rgba(167,140,255,.14); }
.s2b-dp-card-bar i { width:9px; height:9px; border-radius:50%; background:#332B54; }
.s2b-dp-card-bar b { margin-left:9px; font-family:var(--mono); font-size:11px; font-weight:400; color:#8C85AE; letter-spacing:.06em; }
.s2b-dp-card::after { content:''; position:absolute; left:0; right:0; bottom:0; height:120px;
  background:linear-gradient(180deg, transparent, rgba(6,4,14,.96)); pointer-events:none; }
.s2b-dp-card-play { position:absolute; z-index:2; left:50%; bottom:26px; transform:translateX(-50%);
  width:54px; height:54px; border-radius:50%; display:grid; place-items:center; color:#fff;
  background:linear-gradient(120deg, var(--violet), #4B2FD6); box-shadow:0 14px 34px -12px rgba(109,74,255,.9);
  transition:transform .25s cubic-bezier(.2,.8,.2,1); }
.s2b-dp-card:hover .s2b-dp-card-play { transform:translateX(-50%) scale(1.09); }
.s2b-dp-card-play::before { content:''; position:absolute; inset:-6px; border-radius:50%;
  border:1px solid rgba(201,182,255,.55); animation:s2b-dp-onda 2.4s ease-out infinite; }
@keyframes s2b-dp-onda { 0%{transform:scale(.9); opacity:.8} 70%{transform:scale(1.5); opacity:0} 100%{opacity:0} }

/* ---------- codigo ---------- */
.s2b-dp-pre { margin:0; padding:16px 0; font-family:var(--mono); font-size:12.5px; line-height:1.85; tab-size:2; }
.s2b-dp-pre--mini { padding:14px 0 70px; font-size:11.5px; pointer-events:none; }
.s2b-dp-ln { display:flex; gap:14px; padding:0 18px; position:relative; transition:background .3s, box-shadow .3s; }
.s2b-dp-num { flex:none; width:26px; text-align:right; color:#4E4770; user-select:none; font-variant-numeric:tabular-nums; }
.s2b-dp-src { white-space:pre; }
.s2b-dp-ln.is-arte .s2b-dp-src { font-family: ui-monospace, "SF Mono", Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace; }
.s2b-dp-ln.is-live { background:linear-gradient(90deg, rgba(109,74,255,.26), rgba(109,74,255,.04)); box-shadow:inset 2px 0 0 var(--lilac); }
.s2b-dp-ln.is-live .s2b-dp-num { color:#C9B6FF; }

/* ---------- la consola ---------- */
.s2b-dp-tras { position:fixed; inset:0; z-index:120; display:grid; place-items:center; padding:16px;
  background:rgba(5,3,14,.72); backdrop-filter:blur(9px) saturate(120%); -webkit-backdrop-filter:blur(9px) saturate(120%); }
.s2b-dp-modal { position:relative; width:min(1120px,100%); max-height:min(86vh,820px); display:flex; flex-direction:column;
  border-radius:22px; overflow:hidden; border:1px solid rgba(167,140,255,.26);
  background:linear-gradient(168deg,#140B36 0%,#08051A 62%);
  box-shadow:0 60px 140px -50px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.03) inset; outline:none; }
.s2b-dp-head { display:flex; align-items:center; gap:12px; padding:13px 14px; border-bottom:1px solid rgba(167,140,255,.14); flex:none; }
.s2b-dp-dots { display:flex; gap:7px; }
.s2b-dp-dots i { width:11px; height:11px; border-radius:50%; background:#332B54; }
.s2b-dp-dots i:first-child { background:#E5646B; }
.s2b-dp-dots i:nth-child(2) { background:#E5B15A; }
.s2b-dp-dots i:nth-child(3) { background:#5FC97F; }
.s2b-dp-file { font-family:var(--mono); font-size:11.5px; font-weight:400; color:#8C85AE; letter-spacing:.06em; margin-left:6px; margin-right:auto; }
.s2b-dp-tabs { display:flex; gap:4px; padding:4px; border-radius:999px; border:1px solid rgba(167,140,255,.18); background:rgba(255,255,255,.04); }
.s2b-dp-tabs button { display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:999px;
  font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#9E97C4; transition:color .2s, background .2s; }
.s2b-dp-tabs button.is-on { color:#fff; background:linear-gradient(120deg, var(--violet), #4B2FD6); }
.s2b-dp-x { width:34px; height:34px; border-radius:11px; display:grid; place-items:center; color:#9E97C4;
  border:1px solid rgba(167,140,255,.2); transition:color .2s, border-color .2s, transform .2s; flex:none; }
.s2b-dp-x:hover { color:#fff; border-color:var(--lilac); transform:rotate(90deg); }

.s2b-dp-prog { height:2px; background:rgba(167,140,255,.14); flex:none; }
.s2b-dp-prog i { display:block; height:100%; width:0%; background:linear-gradient(90deg, var(--violet), #C9B6FF); box-shadow:0 0 14px rgba(167,140,255,.8); }

.s2b-dp-panes { flex:1; min-height:0; display:grid; }
.s2b-dp-pane { overflow:auto; scrollbar-width:thin; scrollbar-color:rgba(167,140,255,.3) transparent; }
.s2b-dp-pane::-webkit-scrollbar { width:9px; height:9px; }
.s2b-dp-pane::-webkit-scrollbar-thumb { background:rgba(167,140,255,.26); border-radius:99px; }
.s2b-dp-pane--cod { background:rgba(0,0,0,.26); }

.s2b-dp-out { padding:20px 20px 26px; font-family:var(--mono); font-size:13px; line-height:1.75; color:#A79EC8; }
.s2b-dp-l { white-space:pre-wrap; word-break:break-word; }
.s2b-dp-l + .s2b-dp-l { margin-top:8px; }
.s2b-dp-l--banner, .s2b-dp-l--box { white-space:pre; overflow-x:auto; color:#C9B6FF; text-shadow:0 0 22px rgba(167,140,255,.45); font-size:12.5px; line-height:1.5;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace; }
.s2b-dp-l--regla { color:#453D6B; }
.s2b-dp-l--titulo { color:#fff; font-size:15px; letter-spacing:.02em; }
.s2b-dp-l--texto { color:#C9C2E6; }
.s2b-dp-l--kv { color:#D7D1F0; }
.s2b-dp-l--ok { color:#7FE3A8; }
.s2b-dp-l--res { color:#7FE3A8; font-size:14px; }
.s2b-dp-l--cita { color:#A79EC8; font-style:italic; border-left:2px solid rgba(167,140,255,.4); padding-left:14px; }
.s2b-dp-l--status { white-space:pre; overflow-x:auto; color:#8FD6FF; font-size:12.5px; line-height:1.6; }
.s2b-dp-l--cmd { color:#C9B6FF; margin-top:12px; }

.s2b-dp-foot { display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding:12px 16px;
  border-top:1px solid rgba(167,140,255,.14); background:rgba(0,0,0,.24); flex:none; }
.s2b-dp-estado { display:inline-flex; align-items:center; gap:9px; font-family:var(--mono); font-size:11.5px; color:#9E97C4; }
.s2b-dp-estado svg { color:#C9B6FF; }
.s2b-dp-pulso { width:8px; height:8px; border-radius:50%; background:#C9B6FF; animation:s2b-dp-late 1.1s ease-in-out infinite; }
.s2b-dp-pulso.is-ok { background:#7FE3A8; animation:none; box-shadow:0 0 12px rgba(127,227,168,.8); }
@keyframes s2b-dp-late { 50% { opacity:.25; transform:scale(.7); } }
.s2b-dp-act { margin-left:auto; display:flex; flex-wrap:wrap; gap:8px; }
.s2b-dp-b { display:inline-flex; align-items:center; gap:8px; padding:9px 14px; border-radius:999px;
  border:1px solid rgba(167,140,255,.22); background:rgba(255,255,255,.04); color:#C9C2E6;
  font-family:var(--mono); font-size:11px; letter-spacing:.07em; text-transform:uppercase;
  transition:color .2s, border-color .2s, background .2s, transform .2s; }
.s2b-dp-b:hover { color:#fff; border-color:var(--lilac); background:rgba(167,140,255,.14); transform:translateY(-1px); }

/* en pantallas anchas se ven las dos cosas a la vez: el codigo de un lado y lo
   que imprime del otro, con el renglon que esta corriendo marcado */
@media (min-width: 940px) {
  .s2b-dp-grid { grid-template-columns: 1.02fr .98fr; gap:56px; }
  .s2b-dp-panes { grid-template-columns: 1fr 1fr; }
  .s2b-dp-pane--cod { border-right:1px solid rgba(167,140,255,.14); }
  .s2b-dp-tabs { display:none; }
}
/* y en el celular, una por vez */
@media (max-width: 939px) {
  .s2b-dp-panes--salida .s2b-dp-pane--cod { display:none; }
  .s2b-dp-panes--codigo .s2b-dp-pane--out { display:none; }
  .s2b-dp-modal { max-height:88vh; width:100%; }
  .s2b-dp-file { display:none; }
  .s2b-dp-tabs { margin-left:auto; }
  .s2b-dp-act { margin-left:0; width:100%; }
}
@media (max-width: 640px) {
  .s2b-dp-asomo-box { display:none; }
  .s2b-dp-foot { padding:10px 12px; gap:10px; }
  .s2b-dp-estado { width:100%; }
  .s2b-dp-act { gap:6px; }
  .s2b-dp-b { flex:1; justify-content:center; padding:9px 8px; font-size:10px; letter-spacing:.04em; }
  .s2b-dp-tras { padding:0; }
  .s2b-dp-modal { border-radius:0; max-height:100vh; height:100%; }
  .s2b-dp-out { font-size:12px; }
  .s2b-dp-pre { font-size:11.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .s2b-dp-card-play::before, .s2b-dp-pulso { animation:none; }
}
`;
