import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowUpRight, ArrowRight, ArrowLeft, Sparkles, Code2, Bot, PenTool,
  Workflow, Smartphone, Plus, Minus, Menu, X, MapPin, Check, Database, Users,
  MessageSquare, FileSignature, Search, MonitorPlay, FileText, Wallet, Rocket, CircleDollarSign,
  Instagram, Linkedin, Github, ChevronDown, Phone, Quote,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import {
  siReact, siNextdotjs, siAstro, siVuedotjs, siJavascript, siTypescript,
  siNodedotjs, siNestjs, siPython, siPhp, siLaravel, siWordpress,
  siWoocommerce, siTailwindcss, siVite, siSupabase, siPostgresql,
  siMongodb, siPrisma, siGraphql, siFlutter, siExpo, siStripe,
  siDocker, siKubernetes, siGooglecloud, siVercel, siCloudflare, siLinux,
  siNginx, siTerraform, siAnsible, siGithubactions, siRedis, siGrafana,
  siOwasp, siAuth0, siKeycloak, siLetsencrypt, siJsonwebtokens, siVault,
  siWireshark, siKalilinux, siBurpsuite, siWireguard, siSnyk, siBitwarden,
  siClaude, siGooglegemini, siMistralai, siDeepseek, siPerplexity,
  siHuggingface, siLangchain, siOllama, siN8n, siElevenlabs,
  siWhatsapp,
} from "simple-icons";

/* OpenAI y Groq salieron de simple-icons por pedido de sus marcas, asi que
   van con su path propio en el mismo formato que el resto: viewBox 24x24. */
const siOpenai = { title: "OpenAI", hex: "412991", path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" };
const siGroq = { title: "Groq", hex: "F55036", regla: "evenodd", path: "M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z" };

/* ==================================================================
   STUDIO B2B — sitio de agencia · v2
   Dirección: "cromo líquido" sobre estructura corporativa.
   Bandas oscuras (hero / agentes / contacto) contra cuerpo claro.
   ================================================================== */

const CSS = `
.s2b {
  --ink:      #0B0718;
  --deep:     #190E4C;
  --violet:   #6D4AFF;
  --lilac:    #A78CFF;
  --paper:    #F6F5FB;
  --chrome-md:#C3C8D8;
  --chrome-lo:#6E7288;

  --title:  #14102C;
  --text:   #4C4767;
  --muted:  #7A7396;
  --line:   rgba(24,12,60,0.10);
  --surface:#FFFFFF;

  --display: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
  --body: 'Inter', system-ui, -apple-system, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

  background: var(--paper);
  color: var(--text);
  font-family: var(--body);
  font-size: 16px; line-height: 1.65;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.s2b *, .s2b *::before, .s2b *::after { box-sizing: border-box; }
.s2b h1,.s2b h2,.s2b h3,.s2b h4 { font-family: var(--display); margin:0; line-height:1.06; letter-spacing:-0.03em; font-weight:600; color: var(--title); }
.s2b p { margin: 0; }
.s2b button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
.s2b a { color: inherit; text-decoration: none; }
.s2b :focus-visible { outline: 2px solid var(--violet); outline-offset: 3px; border-radius: 6px; }

/* ---------- bandas ---------- */
.s2b-band { position: relative; }
.s2b-band--dark {
  --title: #FFFFFF; --text: #C9C2E6; --muted: #9E97C4; --line: rgba(167,140,255,0.18); --surface: rgba(255,255,255,0.045);
  color: var(--text);
  background:
    radial-gradient(780px circle at 78% 6%, rgba(109,74,255,0.42), transparent 60%),
    radial-gradient(680px circle at 6% 88%, rgba(167,140,255,0.20), transparent 62%),
    linear-gradient(168deg, #150B3F 0%, #0B0718 72%);
}
.s2b-band--tint { background: linear-gradient(180deg, #FFFFFF, var(--paper)); }

.s2b-wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.s2b-sec { padding: 112px 0; }
.s2b-sec--sm { padding: 76px 0; }

.s2b-eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: var(--violet); display:inline-flex; align-items:center; gap:9px; margin-bottom:18px; }
.s2b-band--dark .s2b-eyebrow { color: var(--lilac); }
.s2b-eyebrow::before { content:''; width:24px; height:1px; background: currentColor; opacity:.55; }

.s2b-h2 { font-size: clamp(30px, 4.6vw, 50px); max-width: 20ch; }
.s2b-h2 b { font-weight: 600; background: linear-gradient(100deg, var(--violet), var(--lilac)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.s2b-lead { color: var(--muted); font-size: clamp(15px,1.5vw,17px); max-width: 58ch; margin-top: 18px; }
.s2b-head { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: end; }

.s2b-chrome { background: linear-gradient(176deg,#FFFFFF 4%,#F4F6FB 22%,#7C8095 46%,#FFFFFF 58%,#C3C8D8 76%,#8D91A8 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }

/* ---------- reveal ---------- */
.s2b-rv { opacity:0; transform: translateY(24px); transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1); }
.s2b-rv.is-in { opacity:1; transform:none; }

/* ---------- botones ---------- */
.s2b-btn { display:inline-flex; align-items:center; gap:9px; padding:14px 24px; border-radius:999px; font-weight:600; font-size:15px; position:relative; overflow:hidden; transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s; white-space:nowrap; }
.s2b-btn:hover { transform: translateY(-2px); }
.s2b-btn--primary { color:#fff; background: linear-gradient(120deg, var(--violet), #8B6BFF 55%, #4B2FD6); box-shadow: 0 12px 30px -12px rgba(109,74,255,.75); }
.s2b-btn--primary::after { content:''; position:absolute; inset:0; background: linear-gradient(100deg, transparent 34%, rgba(255,255,255,.4) 50%, transparent 66%); transform: translateX(-120%); transition: transform .7s ease; }
.s2b-btn--primary:hover::after { transform: translateX(120%); }
.s2b-btn--chrome { color:#100A24; background: linear-gradient(170deg,#FFF,var(--chrome-md) 55%,#9AA0B6); box-shadow: 0 12px 30px -14px rgba(190,200,230,.8); }
/* el contorno vivo del boton principal: el mismo giro que la pastilla del
   hero, recortado con mascara para que quede solo el filo */
.s2b-btn--aura { position:relative; }
.s2b-btn--aura::before {
  content:''; position:absolute; inset:-1.5px; border-radius:inherit; padding:1.5px; pointer-events:none;
  background: conic-gradient(from var(--s2b-ang), transparent 0 52%, #C9B6FF 68%, #6D4AFF 82%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: s2b-rot 4.5s linear infinite;
}
.s2b-btn--aura::after {
  content:''; position:absolute; inset:-6px; border-radius:inherit; pointer-events:none; z-index:-1;
  background: radial-gradient(60% 120% at 50% 50%, rgba(167,140,255,.55), transparent 70%);
  opacity:0; transition:opacity .35s;
}
.s2b-btn--aura:hover::after { opacity:1; }
.s2b-btn--line { border:1px solid var(--line); color: var(--title); background: var(--surface); }
.s2b-btn--line:hover { border-color: var(--violet); }
.s2b-link { display:inline-flex; align-items:center; gap:7px; font-weight:600; font-size:14px; color: var(--violet); }
.s2b-band--dark .s2b-link { color: var(--lilac); }
.s2b-link svg { transition: transform .25s; }
.s2b-link:hover svg { transform: translateX(4px); }

/* ---------- nav ---------- */
.s2b-nav { position: sticky; top:0; z-index:80; transition: background .3s, box-shadow .3s; }
.s2b-nav.is-stuck { background: rgba(255,255,255,.9); backdrop-filter: blur(18px) saturate(150%); box-shadow: 0 1px 0 rgba(24,12,60,.08); }
.s2b-nav-in { display:flex; align-items:center; justify-content:space-between; gap:20px; padding:10px 0; }
.s2b-brand { display:flex; align-items:center; gap:14px; }
.s2b-nav .s2b-brand { --mark:88px; }
.s2b-foot .s2b-brand { --mark:72px; }
.s2b-mark-halo { position:relative; width:var(--mark,58px); height:var(--mark,58px); flex:none; display:grid; place-items:center; }
.s2b-mark-halo::before {
  content:''; position:absolute; inset:-28%; border-radius:50%; pointer-events:none;
  background: radial-gradient(circle, rgba(167,140,255,.62), rgba(109,74,255,.24) 46%, transparent 72%);
  filter: blur(13px); animation: s2b-halo 5s ease-in-out infinite;
}
.s2b-mark-halo::after {
  content:''; position:absolute; inset:-9%; border-radius:50%; pointer-events:none; opacity:0;
  background: conic-gradient(from 0deg, transparent 0deg, rgba(199,182,255,.75) 55deg, transparent 125deg);
  -webkit-mask: radial-gradient(circle, transparent 61%, #000 63%);
          mask: radial-gradient(circle, transparent 61%, #000 63%);
  transition: opacity .4s; animation: s2b-mark-spin 3.4s linear infinite;
}
.s2b-brand:hover .s2b-mark-halo::after { opacity:1; }
@keyframes s2b-halo { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:.95; transform:scale(1.14); } }
@keyframes s2b-mark-spin { to { transform: rotate(360deg); } }
.s2b-mark { position:relative; width:100%; height:100%; object-fit:contain; display:block;
  filter: drop-shadow(0 6px 16px rgba(109,74,255,.5));
  transition: transform .45s cubic-bezier(.2,.7,.2,1), filter .45s; }
.s2b-brand:hover .s2b-mark { transform: scale(1.09) translateY(-2px); filter: drop-shadow(0 11px 26px rgba(139,107,255,.85)); }
.s2b-nav.is-stuck .s2b-mark-halo::before { animation:none; opacity:.32; }
.s2b-brand-txt { font-family: var(--display); font-weight:700; font-size:21px; letter-spacing:-.01em; line-height:1.15; color:#fff; }
.s2b-nav.is-stuck .s2b-brand-txt { color: var(--title); }
.s2b-brand-txt small { display:block; margin-top:3px; font-family: var(--mono); font-size:10px; letter-spacing:.2em; font-weight:400; color:#9E97C4; }
.s2b-nav.is-stuck .s2b-brand-txt small { color: var(--muted); }

.s2b-menu { display:flex; align-items:center; gap:2px; }
.s2b-menu > * { position: relative; }
.s2b-menu button.top { display:flex; align-items:center; gap:5px; padding:10px 14px; font-size:14px; font-weight:500; color:#D6D0F2; border-radius:999px; transition: color .2s, background .2s; }
.s2b-nav.is-stuck .s2b-menu button.top { color: var(--text); }
.s2b-menu button.top:hover { color:#fff; background: rgba(255,255,255,.1); }
.s2b-nav.is-stuck .s2b-menu button.top:hover { color: var(--title); background: rgba(109,74,255,.08); }

.s2b-pop { position:absolute; top:calc(100% + 8px); left:50%; transform: translateX(-50%); width:min(560px, 78vw);
  background:#fff; border:1px solid var(--line); border-radius:20px; padding:10px; z-index:90;
  box-shadow: 0 30px 70px -24px rgba(24,12,60,.35); display:grid; gap:2px; }
.s2b-pop a { display:grid; grid-template-columns:38px 1fr; gap:14px; padding:14px; border-radius:14px; transition: background .2s; align-items:start; }
.s2b-pop a:hover { background: var(--paper); }
.s2b-pop .ic { width:38px; height:38px; border-radius:11px; display:grid; place-items:center; color:#fff; background: linear-gradient(150deg, var(--violet), #4B2FD6); }
.s2b-pop b { display:block; font-family: var(--display); font-size:15px; color: var(--title); }
.s2b-pop span { font-size:13px; color: var(--muted); line-height:1.5; }

.s2b-burger { display:none; padding:8px; color:#fff; }
/* El cambio de idioma vive pegado al borde izquierdo, a media altura: se ve
   siempre, en cualquier seccion, sin robarle lugar a la barra de arriba. */
.s2b-lang {
  position:fixed; left:0; top:50%; transform:translateY(-50%); z-index:90;
  display:flex; flex-direction:column; gap:3px; padding:5px;
  border-radius:0 16px 16px 0; border:1px solid rgba(167,140,255,.3); border-left:none;
  background:rgba(14,9,32,.72); backdrop-filter:blur(12px);
  box-shadow:0 20px 44px -22px rgba(24,12,60,.85);
}
.s2b-lang button {
  font-family:var(--mono); font-size:11px; letter-spacing:.1em; color:#C9C2E6;
  padding:9px 10px; border-radius:11px; transition:background .25s, color .25s;
}
.s2b-lang button:hover { color:#fff; background:rgba(167,140,255,.16); }
.s2b-lang button.is-on { background:linear-gradient(150deg,#6D4AFF,#3B2296); color:#fff; }
@media (max-width: 600px) {
  .s2b-lang { padding:4px; border-radius:0 13px 13px 0; }
  .s2b-lang button { font-size:10px; padding:7px 8px; }
}
.s2b-nav.is-stuck .s2b-burger { color: var(--title); }
.s2b-drawer { position:fixed; inset:0; z-index:95; background:#0B0718; color:#fff; padding:18px 24px 40px; overflow-y:auto; }
.s2b-drawer-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:26px; }
.s2b-drawer a, .s2b-drawer button.dl { display:block; width:100%; text-align:left; font-family:var(--display); font-size:26px; color:#fff; padding:14px 0; border-bottom:1px solid rgba(167,140,255,.18); }

/* ---------- hero ---------- */
@property --s2b-g1 { syntax: '<color>'; inherits: false; initial-value: #EFE9FF; }
@property --s2b-g2 { syntax: '<color>'; inherits: false; initial-value: #A78CFF; }
@property --s2b-g3 { syntax: '<color>'; inherits: false; initial-value: #6D4AFF; }
@property --s2b-ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

.s2b-hero { padding: 92px 0 0; position:relative; }
.s2b-hero-in { position:relative; z-index:2; text-align:center; display:grid; justify-items:center; }

/* halo que sigue al cursor */
.s2b-halo { position:absolute; inset:-10% -10% 20%; z-index:0; pointer-events:none;
  background: radial-gradient(520px circle at var(--hx,50%) var(--hy,42%), rgba(167,140,255,.20), transparent 65%);
  transition: background .5s ease-out; }

/* aurora ambiente */
.s2b-aurora { position:absolute; inset:0; z-index:0; overflow:hidden; pointer-events:none; }
.s2b-aurora i { position:absolute; border-radius:50%; filter: blur(90px); opacity:.55; }
.s2b-aurora i:nth-child(1) { width:520px; height:520px; top:-190px; left:12%; background:#6D4AFF; animation: s2b-drift 19s ease-in-out infinite alternate; }
.s2b-aurora i:nth-child(2) { width:420px; height:420px; top:-90px; right:8%; background:#A78CFF; opacity:.4; animation: s2b-drift 23s ease-in-out infinite alternate-reverse; }
.s2b-aurora i:nth-child(3) { width:360px; height:360px; top:180px; left:44%; background:#3B2296; animation: s2b-drift 27s ease-in-out infinite alternate; }
@keyframes s2b-drift { to { transform: translate3d(70px, 46px, 0) scale(1.16); } }

/* el laboratorio -rotulo + red- no tiene caja propia en la compu: sus hijos se
   siguen ubicando contra el hero, como antes. En el celular se vuelve bloque. */
.s2b-lab { display: contents; }

/* retícula fina */
.s2b-neural { position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden;
  -webkit-mask-image: linear-gradient(180deg, #000 58%, transparent 96%);
          mask-image: linear-gradient(180deg, #000 58%, transparent 96%); }
.s2b-neural canvas { display:block; width:100%; height:100%; }

/* arriba al costado: el nombre de la red y como se juega con ella */
.s2b-hint-wrap { position:absolute; top:16px; left:0; right:0; z-index:2; pointer-events:none; }
.s2b-hint { display:inline-flex; align-items:center; gap:10px; max-width:100%;
  font-family:var(--mono); font-size:11.5px; letter-spacing:.15em; text-transform:uppercase;
  color:#B5ACD8; padding:9px 16px; border-radius:999px;
  background:rgba(255,255,255,.06); border:1px solid rgba(167,140,255,.24); backdrop-filter:blur(8px);
  opacity:0; animation: s2b-hint-in 1.1s 1.4s ease-out forwards; }
.s2b-hint b { color:#F2ECFF; font-weight:600; letter-spacing:.17em; }
.s2b-hint i { width:7px; height:7px; border-radius:50%; flex:none; background:#C9B6FF;
  box-shadow:0 0 0 4px rgba(201,182,255,.16); animation: s2b-hint-late 2.4s ease-in-out infinite; }
.s2b-hint span { letter-spacing:.06em; text-transform:none; font-size:12px; color:#A79EC8; }
.s2b-hint .solo-dedo { display:none; }
@keyframes s2b-hint-in { to { opacity:1; } }
@keyframes s2b-hint-late { 0%,100% { transform:scale(1); opacity:.75; } 50% { transform:scale(1.35); opacity:1; } }
@media (hover: none) {
  .s2b-hint .solo-mouse { display:none; }
  .s2b-hint .solo-dedo { display:inline; }
}
.s2b-grid { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.5;
  background-image: linear-gradient(rgba(167,140,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(167,140,255,.08) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(circle at 50% 34%, #000, transparent 72%);
          mask-image: radial-gradient(circle at 50% 34%, #000, transparent 72%); }

/* pastilla con borde cónico giratorio */
.s2b-pill { position:relative; display:inline-flex; align-items:center; gap:9px; padding:9px 18px; border-radius:999px;
  font-family:var(--mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:#D8CDFF;
  background: rgba(255,255,255,.05); backdrop-filter: blur(8px); }
.s2b-pill::before { content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
  background: conic-gradient(from var(--s2b-ang), transparent 0 58%, #C9B6FF 72%, #6D4AFF 86%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: s2b-rot 6s linear infinite; }
@keyframes s2b-rot { to { --s2b-ang: 360deg; } }

/* titular */
.s2b-sweep { margin-top:30px; width:100%;
  -webkit-mask-image: linear-gradient(104deg, #000 34%, rgba(0,0,0,.28) 50%, transparent 66%);
          mask-image: linear-gradient(104deg, #000 34%, rgba(0,0,0,.28) 50%, transparent 66%);
  -webkit-mask-size: 320% 100%; mask-size: 320% 100%;
  -webkit-mask-position: 100% 0; mask-position: 100% 0;
  animation: s2b-in 1.5s .1s cubic-bezier(.16,.84,.24,1) forwards; }
@keyframes s2b-in {
  from { -webkit-mask-position:100% 0; mask-position:100% 0; opacity:0; filter: blur(14px); transform: translateY(20px); }
  to   { -webkit-mask-position:0% 0;   mask-position:0% 0;   opacity:1; filter: blur(0);    transform: none; }
}
.s2b-hero h1 { font-size: clamp(34px, 6.4vw, 84px); font-weight:700; letter-spacing:-.045em; line-height:1.04; color:#fff;
  text-wrap: balance; max-width:19ch; width:100%; margin:0 auto; overflow-wrap:break-word; }
.s2b-hero h1 span {
  background: linear-gradient(96deg in oklab, var(--s2b-g1), var(--s2b-g2) 46%, var(--s2b-g3));
  -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent;
  animation: s2b-hue 8s ease-in-out infinite alternate; }
@keyframes s2b-hue { to { --s2b-g1:#FFFFFF; --s2b-g2:#C9B6FF; --s2b-g3:#8B6BFF; } }

.s2b-hero p { color:#BDB4E4; font-size: clamp(16px,1.7vw,19px); max-width:52ch; margin-top:26px;
  opacity:0; animation: s2b-up .9s .55s cubic-bezier(.16,.84,.24,1) forwards; }
.s2b-hero-cta { display:flex; flex-wrap:wrap; gap:12px; margin-top:36px; justify-content:center;
  opacity:0; animation: s2b-up .9s .72s cubic-bezier(.16,.84,.24,1) forwards; }
.s2b-hero-note { display:flex; align-items:center; gap:9px; margin-top:26px; font-family:var(--mono); font-size:12px; color:#9E97C4;
  opacity:0; animation: s2b-up .9s .88s cubic-bezier(.16,.84,.24,1) forwards; }
@keyframes s2b-up { from { opacity:0; transform: translateY(16px); filter: blur(6px); } to { opacity:1; transform:none; filter:blur(0); } }
.s2b-dot { width:7px; height:7px; border-radius:50%; background:#57E08F; box-shadow:0 0 0 0 rgba(87,224,143,.6); animation: s2b-pulse 2.4s infinite; }
@keyframes s2b-pulse { 70%{box-shadow:0 0 0 9px rgba(87,224,143,0);} 100%{box-shadow:0 0 0 0 rgba(87,224,143,0);} }

/* atajos del hero */
.s2b-shortcuts { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:64px; padding-bottom:64px; }
.s2b-shortcut { display:grid; gap:8px; padding:24px; border-radius:20px; border:1px solid rgba(167,140,255,.2); background: rgba(255,255,255,.05); backdrop-filter: blur(10px); transition: background .25s, border-color .25s, transform .25s; text-align:left; }
.s2b-shortcut:hover { background: rgba(255,255,255,.1); border-color: rgba(167,140,255,.5); transform: translateY(-4px); }
.s2b-shortcut .row { display:flex; align-items:center; justify-content:space-between; color:#C9B6FF; }
.s2b-shortcut b { font-family:var(--display); font-size:18px; color:#fff; font-weight:600; }
.s2b-shortcut span { font-size:13.5px; color:#A79EC8; line-height:1.55; }

/* ---------- logos clientes ---------- */
.s2b-logos { padding:60px 0; --clogo-h:104px; }
.s2b-logos-t { text-align:center; font-family:var(--mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:28px; }
.s2b-marq { overflow:hidden; -webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent); mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent); }
.s2b-marq-track { display:flex; gap:74px; width:max-content; align-items:center; animation: s2b-slide 46s linear infinite; }
.s2b-marq:hover .s2b-marq-track { animation-play-state: paused; }
@keyframes s2b-slide { to { transform: translateX(-50%); } }
.s2b-clogo { font-family:var(--display); font-weight:700; font-size:30px; letter-spacing:-.02em; color:#A9A3BE; opacity:1; white-space:nowrap; filter:none; transition: color .25s, opacity .25s; }
.s2b-clogo:hover { color: var(--violet); opacity:1; }
.s2b-clogo--img {
  height:var(--clogo-h); width:auto; object-fit:contain; opacity:1; filter:none;
  border-radius:16px; background:#fff; padding:12px 18px;
  border:1px solid rgba(24,12,60,.05); box-shadow:0 14px 30px -22px rgba(24,12,60,.55);
}
.s2b-clogo--img:hover { filter:none; opacity:1; }
/* la marca y, abajo, de donde es el cliente */
.s2b-clogo-box { display:flex; flex-direction:column; align-items:center; gap:9px; flex:none; }
.s2b-clogo-pais { display:inline-flex; align-items:center; gap:6px; white-space:nowrap;
  font-family:var(--mono); font-size:10.5px; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); }

/* ---------- servicios (filas alternadas) ---------- */
.s2b-rows { display:grid; gap:20px; margin-top:52px; }
.s2b-row { display:grid; grid-template-columns:.82fr 1.18fr; gap:0; border-radius:28px; overflow:hidden; border:1px solid var(--line); background:#fff; box-shadow: 0 24px 60px -40px rgba(24,12,60,.4); }
.s2b-row:nth-child(even) { grid-template-columns:1.18fr .82fr; }
.s2b-row:nth-child(even) .s2b-row-txt { order:2; }
.s2b-row-txt { padding: clamp(28px,4vw,52px); display:flex; flex-direction:column; justify-content:center; }
.s2b-row-txt h3 { font-size: clamp(22px,2.6vw,30px); margin-bottom:14px; }
.s2b-row-txt p { color:var(--muted); font-size:15.5px; }
.s2b-chips { display:flex; flex-wrap:wrap; gap:7px; margin:20px 0 24px; }
.s2b-chip { font-family:var(--mono); font-size:11px; padding:5px 11px; border-radius:999px; background:var(--paper); border:1px solid var(--line); color:var(--muted); }
.s2b-row-vis { position:relative; min-height:280px; overflow:hidden; display:grid; place-items:center;
  align-content:center; row-gap:20px; padding:22px 0; }
.s2b-blob { position:absolute; border-radius:50%; filter: blur(46px); opacity:.85; }
/* la captura de un trabajo real, en vez del panel de mentira. Se ve entera:
   la altura la pone la propia imagen, nada se recorta. */
.s2b-shot { position:relative; width:calc(100% - 36px); border-radius:16px; overflow:hidden;
  padding-top:27px; background:#fff; border:1px solid rgba(255,255,255,.8);
  box-shadow:0 34px 70px -28px rgba(24,12,60,.62), 0 4px 14px -8px rgba(24,12,60,.3);
  transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s; }
/* la barra de ventana, con sus tres luces */
.s2b-shot::before { content:''; position:absolute; top:0; left:0; right:0; height:27px; z-index:2;
  background:
    radial-gradient(circle 3.5px at 16px 14px, #FF6058 99%, transparent 100%),
    radial-gradient(circle 3.5px at 30px 14px, #FFC02E 99%, transparent 100%),
    radial-gradient(circle 3.5px at 44px 14px, #2ACB42 99%, transparent 100%),
    linear-gradient(180deg, #FBFAFF, #F1EEFA);
  border-bottom:1px solid rgba(24,12,60,.08); }
.s2b-shot img { width:100%; height:auto; display:block; }
.s2b-row:hover .s2b-shot { transform:translateY(-8px) scale(1.035);
  box-shadow:0 44px 84px -30px rgba(24,12,60,.7), 0 6px 18px -10px rgba(24,12,60,.35); }
/* el vidrio de arriba, para que se lea como pantalla y no como foto pegada */
.s2b-shot::after { content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit; z-index:3;
  background:linear-gradient(150deg, rgba(255,255,255,.22), rgba(255,255,255,0) 46%);
  box-shadow: inset 0 0 0 1px rgba(24,12,60,.06); }

/* abajo de la captura, con que corre eso que se esta viendo. Cada logo en su
   pastilla blanca, asi cualquier color de marca se lee sobre el panel claro. */
.s2b-vis-stack { position:relative; display:grid; justify-items:center; gap:13px; width:88%; }
.s2b-vis-stack-t { font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(46,28,102,.5); }
.s2b-vis-logos { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; }
.s2b-vis-logo { width:44px; height:44px; border-radius:13px; display:grid; place-items:center;
  background:#fff; box-shadow: 0 12px 26px -18px rgba(24,12,60,.75), inset 0 0 0 1px rgba(24,12,60,.05);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s; }
.s2b-vis-logo svg { width:22px; height:22px; display:block; }
.s2b-row:hover .s2b-vis-logo { transform:translateY(-5px); box-shadow: 0 18px 32px -18px rgba(24,12,60,.8), inset 0 0 0 1px rgba(24,12,60,.05); }

.s2b-glass { position:relative; width:78%; border-radius:18px; border:1px solid rgba(255,255,255,.5); background: rgba(255,255,255,.55); backdrop-filter: blur(14px); padding:18px; box-shadow: 0 22px 50px -22px rgba(24,12,60,.5); }
.s2b-glass .gl-bar { height:8px; border-radius:999px; background: rgba(24,12,60,.14); margin-bottom:10px; }
.s2b-glass .gl-bar.w1{width:62%} .s2b-glass .gl-bar.w2{width:88%} .s2b-glass .gl-bar.w3{width:44%}
.s2b-glass .gl-row { display:flex; gap:10px; margin-top:14px; }
.s2b-glass .gl-tile { flex:1; height:52px; border-radius:12px; background: linear-gradient(150deg, rgba(109,74,255,.22), rgba(167,140,255,.1)); border:1px solid rgba(109,74,255,.16); }

/* ---------- proceso: el diagrama de flujo ---------- */
/* Un eje vertical con los pasos colgando. La linea de cada paso se dibuja sola
   cuando el paso entra en pantalla -misma clase .s2b-rv que el resto del sitio-
   asi el recorrido se arma a medida que se baja, sin escuchar el scroll. */
/* la columna se corta a 1000px: a lo ancho de la pantalla entera el renglon se
   hace larguisimo y el paso deja de leerse de un vistazo */
.s2b-flow { --nodo:54px; --salto:26px; display:grid; margin-top:52px; max-width:1000px; }
.s2b-paso { display:grid; grid-template-columns:var(--nodo) 1fr; gap:24px; padding-bottom:var(--salto); }
.s2b-paso:last-child { padding-bottom:0; }

.s2b-paso-eje { position:relative; display:flex; justify-content:center; }
.s2b-paso-nodo { position:relative; z-index:2; width:var(--nodo); height:var(--nodo); border-radius:50%; flex:none;
  display:grid; place-items:center; font-family:var(--mono); font-size:13px; letter-spacing:.03em;
  color:#C9B6FF; background:rgba(11,7,24,.92); border:1px solid rgba(167,140,255,.3);
  transition: color .55s, border-color .55s, background .55s, box-shadow .55s; }
.s2b-paso.is-in .s2b-paso-nodo { color:#fff; border-color:rgba(201,182,255,.7);
  background:linear-gradient(150deg,#6D4AFF,#3B2296);
  box-shadow:0 0 0 6px rgba(109,74,255,.13), 0 16px 32px -16px rgba(109,74,255,.95); }
/* el tramo de linea que baja hacia el paso siguiente */
.s2b-paso-eje::after { content:''; position:absolute; left:50%; margin-left:-1px; width:2px;
  top:var(--nodo); bottom:calc(var(--salto) * -1);
  background:linear-gradient(180deg, rgba(167,140,255,.6), rgba(167,140,255,.16));
  transform:scaleY(0); transform-origin:top center;
  transition: transform .85s cubic-bezier(.2,.7,.2,1) .14s; }
.s2b-paso.is-in .s2b-paso-eje::after { transform:scaleY(1); }
.s2b-paso:last-child .s2b-paso-eje::after { display:none; }

.s2b-paso-card { border-radius:22px; padding:24px 26px; background:rgba(255,255,255,.05);
  border:1px solid rgba(167,140,255,.2); backdrop-filter:blur(10px);
  transition: background .3s, border-color .3s, transform .3s; }
.s2b-paso-card:hover { background:rgba(255,255,255,.09); border-color:rgba(167,140,255,.45); transform:translateY(-3px); }
.s2b-paso-top { display:flex; align-items:center; gap:13px; margin-bottom:11px; }
.s2b-paso-ico { width:40px; height:40px; border-radius:13px; flex:none; display:grid; place-items:center;
  color:#D8CDFF; background:rgba(109,74,255,.24); border:1px solid rgba(167,140,255,.28); }
.s2b-paso-card h3 { font-size:19.5px; color:#fff; letter-spacing:-.02em; }
.s2b-paso-card p { color:#BDB4E4; font-size:14.8px; line-height:1.62; }
.s2b-paso-chip { display:inline-flex; align-items:center; gap:8px; margin-top:15px;
  font-family:var(--mono); font-size:10.5px; letter-spacing:.11em; text-transform:uppercase;
  color:#C9B6FF; background:rgba(109,74,255,.16); border:1px solid rgba(167,140,255,.26);
  padding:7px 13px; border-radius:999px; }
/* los pasos donde hay plata de por medio se leen distinto, a propósito */
.s2b-paso-chip--pago { color:#8FF0B8; background:rgba(87,224,143,.11); border-color:rgba(87,224,143,.3); }

.s2b-flow-cierre { max-width:1000px; display:flex; align-items:center; justify-content:space-between; gap:22px; flex-wrap:wrap;
  margin-top:38px; padding:22px 26px; border-radius:20px;
  border:1px solid rgba(167,140,255,.2); background:rgba(255,255,255,.04); }
.s2b-flow-cierre span { color:#BDB4E4; font-size:14.8px; max-width:64ch; }
.s2b-flow-cierre b { color:#fff; font-weight:600; }
.s2b-flow-volver { display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap;
  max-width:1000px; margin-top:26px; }

/* ---------- método ---------- */
.s2b-method { display:grid; grid-template-columns: .95fr 1.05fr; gap:44px; align-items:center; margin-top:48px; }
/* el panel del metodo: 16/9, el mismo recorte de la foto, para que no le
   coma el logo de los costados. Si la imagen falta queda el degrade solo. */
.s2b-method-img { position:relative; border-radius:26px; overflow:hidden; aspect-ratio:16/9;
  background: radial-gradient(120% 120% at 24% 18%, #A78CFF, #6D4AFF 42%, #24124F 100%); border:1px solid rgba(167,140,255,.3);
  box-shadow: 0 30px 70px -34px rgba(24,12,60,.55); }
.s2b-method-img img { width:100%; height:100%; object-fit:cover; display:block; }
.s2b-stages { display:grid; gap:0; margin-top:6px; border-top:1px solid var(--line); }
.s2b-stage-row { display:grid; grid-template-columns:64px 1fr; gap:18px; padding:20px 0; border-bottom:1px solid var(--line); align-items:baseline; transition: padding-left .3s; }
.s2b-stage-row:hover { padding-left:8px; }
.s2b-stage-row .n { font-family:var(--mono); font-size:12px; color:var(--violet); letter-spacing:.1em; }
.s2b-stage-row h4 { font-size:19px; margin-bottom:5px; }
.s2b-stage-row p { font-size:14.5px; color:var(--muted); }

/* ---------- agentes / terminal ---------- */
.s2b-split { display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:center; }
.s2b-term { border-radius:18px; border:1px solid rgba(167,140,255,.22); background:rgba(6,4,14,.82); overflow:hidden; box-shadow:0 40px 90px -40px rgba(109,74,255,.7); }
.s2b-term-bar { display:flex; align-items:center; gap:7px; padding:13px 16px; border-bottom:1px solid rgba(167,140,255,.16); }
.s2b-term-bar i { width:10px; height:10px; border-radius:50%; background:#332B54; }
.s2b-term-bar b { margin-left:10px; font-family:var(--mono); font-size:11px; font-weight:400; color:#8C85AE; letter-spacing:.06em; }
.s2b-term-body { padding:20px 18px; font-family:var(--mono); font-size:13px; line-height:2; min-height:248px; color:#A79EC8; }
.s2b-term-body .ok { color:#7FE3A8; }
.s2b-term-body .cmd { color:#C9B6FF; }
.s2b-caret { display:inline-block; width:8px; height:15px; background:#C9B6FF; vertical-align:-2px; animation:s2b-blink 1s steps(2) infinite; }
@keyframes s2b-blink { 50%{opacity:0} }
.s2b-ul { list-style:none; padding:0; margin:28px 0 0; display:grid; gap:13px; }
.s2b-ul li { display:flex; gap:11px; align-items:flex-start; font-size:15px; color:var(--text); }
.s2b-ul svg { flex:none; margin-top:3px; color:var(--lilac); }

/* ---------- tecnologías ---------- */
.s2b-tech-head { max-width:760px; margin-bottom:30px; }
.s2b-tech-lead { margin-top:16px; font-size:16.5px; color:var(--muted); max-width:660px; }

.s2b-tech-panel {
  position:relative; width:100%; margin-top:8px; padding:48px 0 50px; overflow:hidden;
  border-top:1px solid rgba(167,140,255,.16); border-bottom:1px solid rgba(167,140,255,.16);
  background:
    radial-gradient(720px circle at 84% -12%, rgba(109,74,255,.34), transparent 62%),
    radial-gradient(560px circle at 2% 110%, rgba(167,140,255,.16), transparent 60%),
    linear-gradient(168deg,#150B3F 0%, #0B0718 74%);
  box-shadow: 0 44px 90px -54px rgba(24,12,60,.95);
  --title:#FFFFFF; --text:#C9C2E6; --muted:#9E97C4; color:var(--text);
}
.s2b-tech-panel .s2b-eyebrow { color: var(--lilac); }
.s2b-tech-inner { position:relative; width:100%; padding:0 clamp(20px,3.4vw,56px); }
.s2b-tech-panel::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(167,140,255,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167,140,255,.055) 1px, transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image: radial-gradient(72% 62% at 50% 38%, #000, transparent);
  mask-image: radial-gradient(72% 62% at 50% 38%, #000, transparent);
}
.s2b-tech-tabs {
  position:relative; display:flex; gap:6px; flex-wrap:wrap; margin-bottom:28px; padding:5px;
  border-radius:999px; background:rgba(255,255,255,.05); border:1px solid rgba(167,140,255,.18);
  width:max-content; max-width:100%;
}
.s2b-tab { padding:10px 18px; border-radius:999px; font-size:14px; font-weight:600; color:#9E97C4; transition: background .25s, color .25s; }
.s2b-tab:hover { color:#EDE9FF; }
.s2b-tab.is-on { background: linear-gradient(120deg,var(--violet),#4B2FD6); color:#fff; }

.s2b-tiles { position:relative; display:grid; grid-template-columns:repeat(14,1fr); gap:10px; }
/* discos, no cuadrados: el mosaico se lee como una constelacion */
/* el disco no crece sin freno en pantallas anchas: queda parejo y centrado */
.s2b-tiltbox { min-width:0; width:100%; max-width:92px; justify-self:center; border-radius:50%; }
.s2b-tile {
  position:relative; min-width:0; aspect-ratio:1/1; border-radius:50%; display:grid; place-items:center;
  background:
    radial-gradient(120% 120% at 30% 22%, rgba(255,255,255,.075), rgba(255,255,255,.02) 58%, rgba(255,255,255,.008));
  border:1px solid rgba(167,140,255,.16);
  transition: transform .35s cubic-bezier(.2,.7,.2,1), background .3s, border-color .3s, box-shadow .3s;
}
/* el anillo fino que aparece al acercarse */
.s2b-tile:not(.s2b-tile--void)::after {
  content:''; position:absolute; inset:-4px; border-radius:50%; pointer-events:none;
  border:1px solid rgba(167,140,255,.3); opacity:0; transform:scale(.9);
  transition: opacity .35s, transform .35s cubic-bezier(.2,.7,.2,1);
}
.s2b-tiltbox:hover .s2b-tile::after { opacity:1; transform:scale(1); }
/* las celdas decorativas quedan como puntitos de la red */
.s2b-tile--void { background:none; border:none; }
.s2b-tile--void::before {
  content:''; position:absolute; width:9px; height:9px; border-radius:50%;
  background:rgba(167,140,255,.16); box-shadow:0 0 0 5px rgba(167,140,255,.045);
}
.s2b-tile:not(.s2b-tile--void) { animation: s2b-tile-in .5s cubic-bezier(.2,.7,.2,1) backwards; }
@keyframes s2b-tile-in { from { opacity:0; transform:translateY(14px) scale(.94); } }
.s2b-tiltbox:hover .s2b-tile {
  transform:scale(1.07);
  background:
    radial-gradient(120% 120% at 30% 22%, rgba(255,255,255,.14), rgba(167,140,255,.09) 58%, rgba(255,255,255,.02));
  border-color:rgba(167,140,255,.5); box-shadow:0 26px 50px -26px rgba(109,74,255,.9);
}
.s2b-tile-logo { width:32px; height:32px; transition: transform .35s cubic-bezier(.2,.7,.2,1); }
.s2b-tiltbox:hover .s2b-tile-logo { transform:translateY(-7px) scale(1.06); }
.s2b-tile-name {
  position:absolute; left:8px; right:8px; bottom:19%; text-align:center;
  font-family:var(--mono); font-size:9.5px; letter-spacing:.03em; color:#CFC6F0;
  opacity:0; transform:translateY(6px); transition:opacity .3s, transform .3s;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.s2b-tiltbox:hover .s2b-tile-name { opacity:1; transform:none; }
/* desfase alternado: funciona con cualquier cantidad de columnas */
.s2b-tiles > *:nth-child(even) { margin-top:18px; }

/* en pantalla tactil no hay hover: los nombres van siempre puestos */
@media (hover: none) {
  .s2b-tile-name { opacity:1; transform:none; }
  .s2b-tile-logo { transform:translateY(-6px); }
  .s2b-tile:not(.s2b-tile--void)::after { opacity:.5; transform:scale(1); }
}
@media (max-width: 1500px) { .s2b-tiles { grid-template-columns:repeat(11,1fr); } }
@media (max-width: 1180px) { .s2b-tiles { grid-template-columns:repeat(9,1fr); } }

/* ---------- métricas ---------- */
/* ---------- testimonios ---------- */
.s2b-quotes { position:relative; margin-top:44px; overflow:hidden; }
.s2b-qtrack { display:flex; transition: transform .55s cubic-bezier(.2,.8,.2,1); }
.s2b-qslide { min-width:100%; padding:2px; }
.s2b-qcard { background:#fff; border:1px solid var(--line); border-radius:26px; padding:clamp(26px,3.6vw,44px); display:grid; grid-template-columns:auto 1fr; gap:32px; box-shadow:0 26px 60px -44px rgba(24,12,60,.6); }
/* el lugar del logo del cliente: una placa blanca que le sirve igual al escudo
   cuadrado que al logotipo apaisado, y que parte en dos cuando son dos marcas */
.s2b-qphoto { width:190px; height:206px; flex:none; border-radius:20px; padding:16px;
  background:#fff; border:1px solid var(--line); box-shadow:0 18px 36px -30px rgba(24,12,60,.7);
  display:grid; align-content:center; gap:13px; }
/* overflow oculto: si un logo no carga, el texto alternativo se queda adentro
   de la placa en vez de desbordarse encima de la reseña */
.s2b-qphoto span { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; min-height:0; overflow:hidden; }
.s2b-qphoto em { display:inline-flex; align-items:center; gap:5px; white-space:nowrap; font-style:normal;
  font-family:var(--mono); font-size:8.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
.s2b-qphoto span + span { border-top:1px solid var(--line); padding-top:13px; }
/* alto fijo por logo + object-fit: el alto en porcentaje no resuelve adentro de
   la placa y los logotipos altos se pasaban de su mitad. Con un solo logo se usa
   toda la placa; con dos, cada uno se queda con la suya. */
.s2b-qphoto img { width:100%; height:112px; object-fit:contain; }
.s2b-qphoto--dos img { height:58px; }
.s2b-qtag { display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--violet); margin-bottom:16px; }
.s2b-qtext { font-family:var(--display); font-size:clamp(17px,2vw,23px); line-height:1.45; letter-spacing:-.015em; color:var(--title); }
.s2b-qfoot { display:flex; align-items:center; gap:14px; margin-top:24px; flex-wrap:wrap; }
.s2b-qfoot b { display:block; font-size:14.5px; color:var(--title); font-family:var(--body); font-weight:600; }
.s2b-qfoot span { font-size:13px; color:var(--muted); }
.s2b-qlogo { margin-left:auto; font-family:var(--display); font-weight:700; font-size:15px; color:#A9A3BE; letter-spacing:-.02em; }
.s2b-qnav { display:flex; gap:8px; margin-top:22px; }
.s2b-qnav button { width:42px; height:42px; border-radius:50%; border:1px solid var(--line); display:grid; place-items:center; color:var(--title); background:#fff; transition: border-color .2s, transform .2s; }
.s2b-qnav button:hover { border-color:var(--violet); transform:translateY(-2px); }
.s2b-qdots { display:flex; gap:6px; align-items:center; margin-left:10px; }
.s2b-qdots i { width:7px; height:7px; border-radius:50%; background:var(--line); transition: width .3s, background .3s; }
.s2b-qdots i.on { width:22px; border-radius:999px; background:var(--violet); }

/* ---------- faq ---------- */
.s2b-faq { margin-top:40px; border-top:1px solid var(--line); }
.s2b-fq { width:100%; display:flex; align-items:center; justify-content:space-between; gap:20px; padding:22px 0; text-align:left; font-family:var(--display); font-size:clamp(17px,1.9vw,20px); color:var(--title); }
.s2b-fi { border-bottom:1px solid var(--line); }
/* se abre hasta el alto real de la respuesta: con un max-height fijo las
   respuestas largas se cortaban en el celular, donde ocupan el doble de lineas */
.s2b-fa { display:grid; grid-template-rows:0fr; opacity:0; transition: grid-template-rows .42s cubic-bezier(.2,.8,.2,1), opacity .32s; }
.s2b-fa.is-open { grid-template-rows:1fr; opacity:1; }
.s2b-fa p { overflow:hidden; min-height:0; color:var(--muted); font-size:15px; padding-bottom:22px; max-width:70ch; }

/* ---------- contacto ---------- */
.s2b-form-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:52px; align-items:start; }
.s2b-panel { background: rgba(255,255,255,.06); border:1px solid rgba(167,140,255,.24); border-radius:26px; padding:clamp(24px,3.4vw,38px); backdrop-filter: blur(10px); }
.s2b-f { display:grid; gap:7px; margin-bottom:15px; }
.s2b-f label { font-family:var(--mono); font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:#9E97C4; }
.s2b-f input, .s2b-f textarea, .s2b-f select { width:100%; background:rgba(6,4,14,.5); border:1px solid rgba(167,140,255,.22); border-radius:12px; padding:13px 15px; color:#fff; font-size:15px; font-family:var(--body); transition:border-color .2s, background .2s; }
.s2b-f textarea { min-height:100px; resize:vertical; }
.s2b-f input::placeholder, .s2b-f textarea::placeholder { color:#6F6890; }
.s2b-f input:focus, .s2b-f textarea:focus, .s2b-f select:focus { outline:none; border-color:var(--lilac); background:rgba(20,12,44,.7); }
.s2b-f select option { background:#150B3F; }
.s2b-cline { display:flex; align-items:center; gap:11px; color:#BDB4E4; font-size:15px; margin-top:13px; }
.s2b-cline svg { color:var(--lilac); flex:none; }
.s2b-sent { display:flex; align-items:center; gap:10px; color:#7FE3A8; font-size:15px; padding:14px 0 20px; }
.s2b-formerr { font-size:13.5px; color:#FFB4B4; background:rgba(255,90,90,.09); border:1px solid rgba(255,120,120,.3);
  border-radius:12px; padding:11px 13px; margin-bottom:13px; }
.s2b-formerr a { color:#fff; text-decoration:underline; }

/* ---------- footer ---------- */
.s2b-foot { border-top:1px solid rgba(167,140,255,.16); padding:56px 0 34px; }
.s2b-foot-grid { display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:36px; }
.s2b-foot h5 { font-family:var(--mono); font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:#9E97C4; margin:0 0 16px; font-weight:400; }
.s2b-foot ul { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
.s2b-foot ul a { font-size:14.5px; color:#C9C2E6; transition:color .2s; }
.s2b-foot ul a:hover { color:#fff; }
.s2b-social { display:flex; gap:8px; margin-top:20px; }
.s2b-social a { width:38px; height:38px; border-radius:11px; border:1px solid rgba(167,140,255,.22); display:grid; place-items:center; color:#9E97C4; transition:color .2s,border-color .2s,transform .2s; }
.s2b-social a:hover { color:#fff; border-color:var(--lilac); transform:translateY(-2px); }
.s2b-foot-bot { display:flex; justify-content:space-between; gap:18px; flex-wrap:wrap; margin-top:44px; padding-top:22px; border-top:1px solid rgba(167,140,255,.14); font-family:var(--mono); font-size:11.5px; color:#7E7799; }

/* ---------- responsive ---------- */
/* las pestanas no entran a lo ancho: pasan a ser una tira que se corre */
@media (max-width: 860px) {
  .s2b-tech-tabs {
    width:100%; max-width:100%; flex-wrap:nowrap; overflow-x:auto; border-radius:26px;
    scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch;
  }
  .s2b-tech-tabs::-webkit-scrollbar { display:none; }
  /* el degrade del borde avisa que la tira sigue */
  .s2b-tech-tabs {
    -webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);
            mask-image:linear-gradient(90deg,#000 88%,transparent);
  }
  .s2b-tab { white-space:nowrap; padding:10px 14px; font-size:13px; }
}
@media (max-width: 1000px) {
  .s2b-sec { padding:80px 0; }
  .s2b-split, .s2b-method, .s2b-form-grid, .s2b-head { grid-template-columns:1fr; gap:36px; }
  .s2b-hero { padding-top:64px; }
  .s2b-shortcuts { grid-template-columns:1fr; margin-top:48px; padding-bottom:48px; }
  .s2b-row, .s2b-row:nth-child(even) { grid-template-columns:1fr; }
  .s2b-row:nth-child(even) .s2b-row-txt { order:0; }
  .s2b-row-vis { min-height:230px; order:-1; }
  .s2b-tiles { grid-template-columns:repeat(7,1fr); }
  .s2b-tech-panel { padding:28px 0 32px; }
  .s2b-qcard { grid-template-columns:1fr; gap:22px; }
  /* apilada, la placa se acuesta y los dos logos van uno al lado del otro:
     de otra forma se come media pantalla antes de la reseña */
  .s2b-qphoto { width:100%; max-width:320px; height:auto; border-radius:16px; padding:14px; gap:14px;
    grid-auto-flow:column; grid-auto-columns:minmax(0,1fr); grid-auto-rows:auto; }
  .s2b-qphoto span { min-height:62px; }
  .s2b-qphoto img, .s2b-qphoto--dos img { height:62px; }
  .s2b-qphoto span + span { border-top:none; border-left:1px solid var(--line); padding-top:0; padding-left:14px; }
  .s2b-foot-grid { grid-template-columns:1fr 1fr; }
  .s2b-menu { display:none; }
  .s2b-burger { display:block; }
  .s2b-head { align-items:start; }
}
/* En el celular la red deja de estar atras del titular -donde se encimaba con
   el texto, los botones y la idea que se arma- y pasa a tener su propio lugar:
   una franja abajo del copy, con marco, donde se la ve entera. */
@media (max-width: 820px) {
  .s2b-hero { display:flex; flex-direction:column; padding-top:58px; }
  /* como ahora son cajas de un flex, hay que dejarlas achicarse: si no, la
     pastilla y el titular mandan su ancho minimo y el hero se va de pantalla */
  .s2b-hero > * { min-width:0; max-width:100%; }
  .s2b-hero-copy   { order:1; }
  .s2b-lab         { order:2; display:block; position:relative; margin-top:36px; padding:0 24px; }
  .s2b-hero-atajos { order:3; }
  .s2b-hero-atajos .s2b-shortcuts { margin-top:40px; }

  /* el rotulo baja con la red: ahora es el titulo de la franja, en dos
     renglones -nombre arriba, instruccion abajo- para que no se parta feo */
  .s2b-lab .s2b-hint-wrap { position:static; margin-bottom:10px; }
  .s2b-lab .s2b-hint-wrap .s2b-wrap { padding:0; }
  .s2b-hint { animation-delay:.9s; flex-wrap:wrap; row-gap:5px; padding:0; background:none; border:none; backdrop-filter:none; }
  .s2b-hint b { white-space:nowrap; }
  .s2b-hint span { flex:1 0 100%; padding-left:15px; }

  /* la vitrina: la red adentro, con su propia reticula y su borde */
  .s2b-neural {
    position:relative; inset:auto; width:100%; z-index:1;
    height: clamp(258px, 40vh, 330px);
    border-radius:24px;
    background:
      linear-gradient(rgba(167,140,255,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(167,140,255,.07) 1px, transparent 1px),
      radial-gradient(120% 92% at 50% 0%, rgba(109,74,255,.24), transparent 72%),
      rgba(10,6,22,.42);
    background-size: 44px 44px, 44px 44px, auto, auto;
    box-shadow: inset 0 0 0 1px rgba(167,140,255,.2), 0 30px 60px -44px rgba(109,74,255,.95);
    -webkit-mask-image:none; mask-image:none;
  }
  /* la reticula del fondo ya no pisa el texto: vive adentro de la vitrina */
  .s2b-grid { display:none; }
  .s2b-halo { inset:-10% -10% 46%; }
}
@media (max-width: 600px) {
  .s2b-logos { padding:44px 0; --clogo-h:68px; }
  /* el eje del proceso se achica: en el celular cada pixel de ancho es del texto */
  .s2b-flow { --nodo:40px; --salto:20px; }
  .s2b-paso { gap:14px; }
  .s2b-paso-nodo { font-size:11.5px; }
  .s2b-paso-card { padding:19px 18px; border-radius:18px; }
  .s2b-paso-top { gap:11px; margin-bottom:9px; }
  .s2b-paso-ico { width:34px; height:34px; border-radius:11px; }
  .s2b-paso-card h3 { font-size:17.5px; }
  .s2b-paso-card p { font-size:14.2px; }
  .s2b-paso-chip { font-size:9.8px; letter-spacing:.08em; padding:6px 11px; margin-top:13px; }
  .s2b-flow-cierre { padding:20px; margin-top:30px; }
  /* los seis logos entran en un solo renglon, no cinco y uno solo abajo */
  .s2b-vis-stack { width:94%; }
  .s2b-vis-logos { gap:8px; }
  .s2b-vis-logo { width:40px; height:40px; border-radius:12px; }
  .s2b-vis-logo svg { width:20px; height:20px; }
  .s2b-marq-track { gap:44px; }
  .s2b-clogo { font-size:22px; }
  .s2b-clogo--img { padding:8px 12px; border-radius:10px; }
  .s2b-brand { --mark:58px; gap:11px; }
  .s2b-brand-txt { font-size:17px; }
  .s2b-tiles { grid-template-columns:repeat(5,1fr); gap:9px; }
  .s2b-tiles > *:nth-child(even) { margin-top:11px; }
  .s2b-tile-logo { width:23px; height:23px; }
  /* a este tamaño el nombre no entra adentro del disco */
  .s2b-tile-name { display:none; }
  .s2b-tile--void { display:none; }
  .s2b-foot-grid { grid-template-columns:1fr; }
  .s2b-grid { background-size:52px 52px; }
  .s2b-hint-wrap { top:12px; }
  .s2b-hint { font-size:11px; gap:8px; }
  .s2b-hint span { font-size:11.5px; }
}
/* ---------- burbuja de WhatsApp ---------- */
.s2b-wa {
  position:fixed; right:22px; bottom:22px; z-index:92;
  display:flex; flex-direction:column; align-items:flex-end; gap:14px;
  opacity:0; transform:translateY(18px) scale(.9); pointer-events:none;
  transition: opacity .5s cubic-bezier(.2,.7,.2,1), transform .5s cubic-bezier(.2,.7,.2,1);
}
.s2b-wa.is-shown { opacity:1; transform:none; pointer-events:auto; }

.s2b-wa-fab {
  position:relative; width:60px; height:60px; border-radius:50%; flex:none; display:grid; place-items:center;
  color:#fff; background: linear-gradient(150deg,#4AE083,#1FA855 62%,#128C7E);
  box-shadow: 0 14px 34px -10px rgba(18,140,126,.75), inset 0 1px 0 rgba(255,255,255,.35);
  transition: transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s;
}
.s2b-wa-fab:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 20px 44px -12px rgba(18,140,126,.9), inset 0 1px 0 rgba(255,255,255,.35); }
.s2b-wa-fab .s2b-wa-ico { width:31px; height:31px; }
.s2b-wa-fab::before {
  content:''; position:absolute; inset:0; border-radius:50%; pointer-events:none;
  border:2px solid rgba(74,224,131,.55); animation: s2b-wa-ring 2.6s cubic-bezier(.2,.7,.2,1) infinite;
}
.s2b-wa-fab.is-open::before { display:none; }
@keyframes s2b-wa-ring { 0% { transform:scale(1); opacity:.75; } 70%, 100% { transform:scale(1.7); opacity:0; } }

.s2b-wa-tip {
  position:absolute; right:74px; top:50%; transform:translateY(-50%) translateX(6px); white-space:nowrap;
  background:#14102C; color:#fff; font-size:13px; font-weight:600; padding:9px 14px; border-radius:12px;
  box-shadow:0 12px 28px -14px rgba(0,0,0,.85); opacity:0; pointer-events:none;
  transition:opacity .25s, transform .25s;
}
.s2b-wa-fab:hover .s2b-wa-tip { opacity:1; transform:translateY(-50%); }
.s2b-wa-fab.is-open .s2b-wa-tip { display:none; }

.s2b-wa-panel {
  width:314px; max-width:calc(100vw - 44px); border-radius:22px; overflow:hidden; background:#fff;
  border:1px solid rgba(24,12,60,.10); box-shadow:0 30px 70px -28px rgba(11,7,24,.6);
  animation: s2b-wa-in .32s cubic-bezier(.2,.7,.2,1); transform-origin:bottom right;
}
@keyframes s2b-wa-in { from { opacity:0; transform:translateY(12px) scale(.94); } }
.s2b-wa-top { display:flex; align-items:center; gap:11px; padding:15px 16px; background: linear-gradient(140deg,#1FA855,#128C7E); color:#fff; }
.s2b-wa-top img { width:38px; height:38px; object-fit:contain; flex:none; border-radius:11px; background:rgba(255,255,255,.16); padding:3px; }
.s2b-wa-top b { display:block; font-family:var(--display); font-size:14.5px; line-height:1.3; }
.s2b-wa-top span { display:flex; align-items:center; gap:6px; font-size:11.5px; color:rgba(255,255,255,.88); }
.s2b-wa-top span i { width:7px; height:7px; border-radius:50%; background:#7DFFAE; box-shadow:0 0 0 3px rgba(125,255,174,.25); }
.s2b-wa-x { margin-left:auto; color:rgba(255,255,255,.85); display:grid; place-items:center; width:27px; height:27px; border-radius:9px; transition:background .2s, color .2s; }
.s2b-wa-x:hover { background:rgba(255,255,255,.2); color:#fff; }

.s2b-wa-body { padding:18px 16px 4px; background:#F3F0E9; }
.s2b-wa-msg { margin:0 0 14px; background:#fff; border-radius:4px 15px 15px 15px; padding:11px 13px; font-size:14px; line-height:1.5; color:#14102C; box-shadow:0 2px 6px -2px rgba(0,0,0,.16); }
.s2b-wa-chips { display:grid; gap:8px; padding-bottom:16px; }
.s2b-wa-chips button {
  text-align:left; font-size:13px; font-weight:600; color:#0E7A6E; background:#fff;
  border:1px solid rgba(18,140,126,.26); border-radius:13px; padding:9px 12px;
  transition: background .2s, transform .2s, border-color .2s;
}
.s2b-wa-chips button:hover { background:#E9FBF2; border-color:rgba(18,140,126,.5); transform:translateX(2px); }
.s2b-wa-cta { width:100%; display:flex; align-items:center; justify-content:center; gap:9px; padding:14px; font-size:14.5px; font-weight:700; color:#fff; background: linear-gradient(140deg,#1FA855,#128C7E); transition:filter .2s; }
.s2b-wa-cta:hover { filter:brightness(1.09); }
.s2b-wa-cta .s2b-wa-ico { width:19px; height:19px; }

@media (max-width: 600px) {
  .s2b-wa { right:16px; bottom:16px; }
  .s2b-wa-fab { width:56px; height:56px; }
  .s2b-wa-fab .s2b-wa-ico { width:28px; height:28px; }
}

@media (prefers-reduced-motion: reduce) {
  .s2b-wa-fab::before { display:none; }
  .s2b *, .s2b *::before, .s2b *::after { animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important; }
  .s2b-rv { opacity:1; transform:none; }
}
`;

/* ================= idioma =================
   El sitio habla castellano e ingles -hay un vendedor en Miami-. Cada texto se
   escribe al lado de su traduccion con t("es", "en"): asi no hay diccionario
   de claves que se desincronice y se ve de una que falta traducir. */
const IDIOMAS = ["es", "en"];
const traductor = (idioma) => (es, en) => (idioma === "en" && en !== undefined ? en : es);
const idiomaGuardado = () => {
  try {
    const g = localStorage.getItem("s2b-idioma");
    if (IDIOMAS.includes(g)) return g;
  } catch {}
  /* si el navegador no habla castellano, arranca en ingles */
  const n = typeof navigator !== "undefined" ? (navigator.language || "es") : "es";
  return n.toLowerCase().startsWith("es") ? "es" : "en";
};

/* ================= datos ================= */

const soluciones = (t) => [
  { id: "software", icon: Code2, t: t("Software a medida", "Custom software"), d: t("Plataformas internas y portales que tu equipo usa todos los días.", "Internal platforms and client portals your team uses every day.") },
  { id: "apps", icon: Smartphone, t: t("Apps móviles", "Mobile apps"), d: t("iOS y Android desde una base, con publicación y updates incluidos.", "iOS and Android from one codebase, with store releases and updates included.") },
  { id: "agentes", icon: Bot, t: t("Agentes de IA", "AI agents"), d: t("Asistentes que atienden y resuelven dentro de tus herramientas.", "Assistants that answer and resolve inside your own tools.") },
];

/* esc: los logos que en su archivo vienen mas chicos piden un poco mas de alto */
const clientes = (t) => [
  { n: "Nuevo Munich", src: "/clientes/nuevo-munich.png" },
  { n: "Numera", src: "/clientes/logonumera.jpg" },
  { n: "IPIC SMO", src: "/clientes/ipicsmo.png", esc: 1.2, pais: t("Estados Unidos", "United States") },
  { n: "Instituto de Investigaciones Cl\u00ednicas", src: "/clientes/IICC.png", esc: 1.1 },
  { n: "Pecifa Nacional", src: "/clientes/pecifa.png", esc: 1.3 },
  { n: "Ninit Group", src: "/clientes/ninit-group.png", pais: t("Miami, Estados Unidos", "Miami, United States") },
];

const servicios = (t) => [
  {
    icon: Bot, t: t("Agentes de IA en producción", "AI agents in production"),
    d: t("Asistentes que atienden por WhatsApp, califican consultas y escriben en tu CRM. Con la información real del negocio adentro, no respuestas de manual. Y con una persona que toma el control cuando el caso lo pide.", "Assistants that answer on WhatsApp, qualify leads and write to your CRM. With your real business data inside, not canned answers. And with a person taking over when the case calls for it."),
    chips: ["RAG", "Function calling", t("Evaluaciones", "Evaluations"), t("Handoff humano", "Human handoff")],
    cta: t("Ver cómo funciona", "See how it works"), to: "agentes",
    img: "/trabajos/agente-n8n.png", an: 1400, al: 483,
    alt: t("Flujo de un agente en producción: entra por WhatsApp o SMS, decide, consulta la base y escribe en el CRM", "An agent flow in production: it comes in through WhatsApp or SMS, decides, queries the database and writes to the CRM"),
    /* la captura es bien apaisada y dejaba media fila vacia: abajo van los
       logos de lo que de verdad corre adentro del agente */
    logosT: t("Corre sobre", "Runs on"),
    logos: [siN8n, siOpenai, siClaude, siGooglegemini, siGroq, siSupabase],
    blobs: ["#A78CFF", "#6D4AFF"], bg: "linear-gradient(150deg,#F0ECFF,#E4DCFF)",
  },
  {
    icon: Code2, t: t("Software a medida", "Custom software"),
    d: t("Sistemas de gestión, portales de clientes y plataformas de operación. Arquitectura simple y documentada, para que tu equipo pueda sostenerla sin depender de nosotros para cada cambio.", "Management systems, client portals and operations platforms. Simple, documented architecture, so your team can maintain it without depending on us for every change."),
    chips: ["React", "Node", "PostgreSQL", "APIs", "AWS"],
    cta: t("Conocer el enfoque", "See our approach"), to: "metodo",
    img: "/trabajos/numera.jpg", an: 1400, al: 793,
    alt: t("Numera, la plataforma de presupuestos y facturas que desarrollamos a medida", "Numera, the quoting and invoicing platform we built from scratch"),
    blobs: ["#8FB4FF", "#6D4AFF"], bg: "linear-gradient(150deg,#EAF0FF,#E1E7FF)",
  },
  {
    icon: PenTool, t: t("Diseño de producto y apps", "Product and app design"),
    d: t("Investigación, flujos, prototipo navegable y sistema de diseño. Las decisiones caras se toman acá, cuando cambiar una pantalla cuesta una tarde y no dos sprints.", "Research, flows, a clickable prototype and a design system. The expensive decisions get made here, when changing a screen costs an afternoon instead of two sprints."),
    chips: ["UX research", "UI", "Design system", "React Native"],
    cta: t("Ver trabajos", "See our work"), to: "clientes",
    img: "/trabajos/ipicsmo.jpg", an: 1400, al: 646,
    alt: t("IPIC SMO, sitio y sistema de diseño que armamos para una organización de investigación clínica", "IPIC SMO, the website and design system we built for a clinical research organization"),
    blobs: ["#FFC6E8", "#A78CFF"], bg: "linear-gradient(150deg,#FBEDFF,#F0E6FF)",
  },
];

/* El camino comercial, de la primera charla a la entrega. Es lo que el cliente
   necesita saber antes de decidir: cuando firma, cuando ve algo funcionando y
   cuando pone plata. `pago` marca los pasos donde hay dinero de por medio, que
   se pintan distinto para que no haya sorpresas. */
const proceso = (t) => [
  {
    n: "01", t: t("Charlamos tu idea", "We talk through your idea"), ic: MessageSquare,
    d: t("Una reunión para entender qué querés resolver, cómo trabaja hoy tu equipo y qué esperás de la app o del sistema. De ahí salimos con el problema escrito en criollo, no con un formulario lleno de casilleros.", "A meeting to understand what you need to solve, how your team works today and what you expect from the app or system. We come out of it with the problem written in plain language, not a form full of checkboxes."),
    chip: t("Reunión sin costo", "Free consultation"),
  },
  {
    n: "02", t: t("Firmamos confidencialidad", "We sign an NDA"), ic: FileSignature,
    d: t("Antes de tocar la idea firmamos, con firma digital, un acuerdo de confidencialidad. Lo que nos contás no sale de acá y la idea queda a tu nombre desde el minuto cero. Recién después seguimos.", "Before we touch the idea we sign a confidentiality agreement, digitally. What you tell us stays here and the idea is yours from minute one. Only then do we move on."),
    chip: t("NDA con firma digital", "NDA, digitally signed"),
  },
  {
    n: "03", t: t("Estudiamos el proyecto", "We study the project"), ic: Search,
    d: t("Analizamos la idea en serio: qué funciones lleva, con qué tecnología conviene hacerla, qué necesita de seguridad y manejo de datos, qué recursos y cuánto tiempo. De ese estudio sale el alcance y el número.", "We analyze the idea properly: what features it needs, which stack fits best, what it requires in security and data handling, what resources and how long. That study is where the scope and the price come from."),
    chip: t("Alcance · tecnología · seguridad · costos", "Scope · stack · security · costs"),
  },
  {
    n: "04", t: t("Te armamos una demo, gratis", "We build you a demo, free"), ic: MonitorPlay,
    d: t("Antes de que pongas un peso ves tu idea funcionando. Te dejamos la demo en línea las 24 horas para que la pruebes con tu equipo, la estudies con calma y nos pidas los cambios que quieras.", "Before you spend a dollar you see your idea working. We leave the demo online 24/7 so you can try it with your team, study it calmly and ask for any changes you want."),
    chip: t("Online 24 hs · sin cargo", "Online 24/7 · no charge"),
  },
  {
    n: "05", t: t("Presupuesto digital", "Digital quote"), ic: FileText,
    d: t("Te llega un presupuesto en línea hecho con Numera, nuestra propia app: qué incluye, qué no, plazos y precio, escrito para que se entienda sin ser técnico. Lo aceptás o lo rechazás desde el mismo enlace.", "You get an online quote built with Numera, our own app: what's included, what isn't, timeline and price, written to be understood without being technical. You accept or decline it from the same link."),
    chip: t("Se acepta o se rechaza online", "Accept or decline online"),
  },
  {
    n: "06", t: t("Seña para arrancar", "Deposit to start"), ic: Wallet, pago: true,
    d: t("Con el presupuesto aceptado se abona una seña del 20%. Es lo que deja tranquilas a las dos partes: nosotros reservamos al equipo y vos tenés fecha de arranque firme.", "Once the quote is accepted you pay a 20% deposit. That is what puts both sides at ease: we reserve the team and you get a firm start date."),
    chip: t("20% al aceptar", "20% on acceptance"),
  },
  {
    n: "07", t: t("Tu idea se convierte en realidad", "Your idea becomes real"), ic: Rocket, pago: true,
    d: t("Desarrollamos con demos cada dos semanas, así ves el avance sobre el producto real y no sobre un informe. Cuando la app queda en línea se abona el 40%, y el 40% restante al finalizar la entrega.", "We build with a demo every two weeks, so you see progress on the real product instead of a status report. When the app goes live you pay 40%, and the remaining 40% on delivery."),
    chip: t("40% en línea · 40% al finalizar", "40% at launch · 40% on delivery"),
  },
];

const etapas = (t) => [
  { n: "01", t: t("Diagnóstico", "Discovery"), d: t("Dos semanas mirando el negocio. Salís con alcance cerrado, plan y número.", "Two weeks looking at the business. You come out with a closed scope, a plan and a price.") },
  { n: "02", t: t("Prototipo", "Prototype"), d: t("Un prototipo navegable que tu equipo prueba antes de que escribamos código.", "A clickable prototype your team tries before we write a line of code.") },
  { n: "03", t: t("Entregas", "Delivery"), d: t("Ciclos de dos semanas con demo en vivo sobre el producto real.", "Two-week cycles with a live demo on the real product.") },
  { n: "04", t: t("Operación", "Operations"), d: t("Monitoreo, soporte y roadmap trimestral. El código es tuyo desde el día uno.", "Monitoring, support and a quarterly roadmap. The code is yours from day one.") },
];

const agentLines = (t) => [
  { t: "> agente.iniciar('comercial')", c: "cmd" },
  { t: t("conectado: WhatsApp · CRM · Calendario", "connected: WhatsApp · CRM · Calendar"), c: "" },
  { t: t("base de conocimiento: 412 documentos", "knowledge base: 412 documents"), c: "" },
  { t: t("listo en 1.8s", "ready in 1.8s"), c: "ok" },
  { t: t("> consulta entrante · +54 351 ***", "> incoming request · +1 305 ***"), c: "cmd" },
  { t: t("intención: cotizar · urgencia alta", "intent: quote · high urgency"), c: "" },
  { t: t("respuesta enviada · reunión 11:30", "reply sent · meeting at 11:30"), c: "ok" },
  { t: t("> resumen diario → equipo comercial", "> daily summary -> sales team"), c: "cmd" },
  { t: t("84 consultas · 71 resueltas · 13 derivadas", "84 requests · 71 resolved · 13 escalated"), c: "ok" },
];

const agentPts = (t) => [
  t("Habla con tus precios, tu stock y tus políticas. No improvisa.", "It answers with your prices, your stock and your policies. It does not improvise."),
  t("Deriva a una persona con todo el contexto cuando detecta un caso sensible.", "It hands off to a person with the full context when it detects a sensitive case."),
  t("Cada respuesta queda registrada y evaluada contra casos reales.", "Every answer is logged and evaluated against real cases."),
  t("Corre sobre tu infraestructura, con tus datos donde vos decidas.", "It runs on your infrastructure, with your data wherever you decide."),
];

const tecnologias = (t) => [
  { id: "soft", label: t("Desarrollo de Software", "Software development"), logos: [
    siReact, siNextdotjs, siAstro, siVuedotjs, siJavascript, siTypescript,
    siNodedotjs, siNestjs, siPython, siPhp, siLaravel, siWordpress,
    siWoocommerce, siTailwindcss, siVite, siSupabase, siPostgresql,
    siMongodb, siPrisma, siGraphql, siFlutter, siExpo, siStripe,
  ] },
  { id: "ia", label: t("Inteligencia Artificial", "Artificial intelligence"), logos: [
    siOpenai, siClaude, siGooglegemini, siGroq, siMistralai, siDeepseek,
    siPerplexity, siHuggingface, siLangchain, siOllama, siN8n, siElevenlabs,
  ] },
  { id: "infra", label: t("Infraestructura IT", "IT infrastructure"), logos: [
    siDocker, siKubernetes, siGooglecloud, siVercel, siCloudflare, siLinux,
    siNginx, siTerraform, siAnsible, siGithubactions, siRedis, siGrafana,
  ] },
  { id: "seg", label: t("Ciberseguridad", "Cybersecurity"), logos: [
    siOwasp, siAuth0, siKeycloak, siLetsencrypt, siJsonwebtokens, siVault,
    siWireshark, siKalilinux, siBurpsuite, siWireguard, siSnyk, siBitwarden,
  ] },
];

/* El mosaico se arma solo segun cuantos logos tenga la categoria: repite este
   damero de 6 columnas hasta que entren todos y devuelve, por celda, que logo
   va ahi (-1 = celda vacia decorativa). */
const DAMERO = [
  [true, false, false, true, false, true],
  [false, true, true, false, true, false],
  [true, false, true, false, false, true],
  [false, true, false, true, true, false],
];
/* con muchos logos el damero suelto estiraria la seccion de mas: ahi va este,
   con menos aire */
const DAMERO_DENSO = [
  [true, true, false, true, true, false],
  [true, false, true, true, false, true],
  [false, true, true, false, true, true],
];
function armarMosaico(cant) {
  const patron = cant > 14 ? DAMERO_DENSO : DAMERO;
  const celdas = [];
  let puestos = 0, fila = 0;
  while (puestos < cant) {
    for (const llena of patron[fila % patron.length]) {
      const usar = llena && puestos < cant;
      celdas.push(usar ? puestos++ : -1);
    }
    fila++;
  }
  while (celdas.length && celdas[celdas.length - 1] === -1) celdas.pop();
  return celdas;
}

/* Clientes de verdad, con su logo. Cada uno cuenta lo que le construimos:
   `logos` es lo que va en la tarjeta -uno, o dos cuando son dos marcas de la
   misma casa- y `e` es el nombre que queda escrito al pie. */
const testimonios = (t) => [
  {
    q: t("Gracias al equipo de Studio B2B hoy tenemos la app móvil, el sitio y el portal de afiliados funcionando juntos. Lo que antes era un llamado o un papel, el afiliado lo resuelve desde el celular, y nosotros vemos todo en un solo lugar. Se hicieron cargo de la parte técnica de punta a punta.", "Thanks to the Studio B2B team we now have the mobile app, the website and the member portal working together. What used to be a phone call or a piece of paper, our members now handle from their phone, and we see everything in one place. They took care of the technical side end to end."),
    n: "Hernán Marcantonio", r: "", e: "Pecifa Nacional",
    cat: t("App móvil, web y afiliados", "Mobile app, web and member portal"), ic: Smartphone,
    logos: [{ src: "/clientes/pecifa.png", alt: "Pecifa Nacional" }],
  },
  {
    q: t("Nos armaron el sitio y la base de datos donde hoy vive la información de nuestros estudios. Entendieron rápido cómo trabaja un centro de investigación: los tiempos, el orden y el cuidado que pide el dato clínico. Quedó todo documentado y a nuestro nombre.", "They built the site and the database where our study information lives today. They quickly understood how a research center works: the timelines, the order and the care clinical data demands. Everything was documented and put in our name."),
    n: "Dr. Mauro Pautaso", r: t("Director Médico", "Medical Director"), e: "",
    cat: t("Sitio web y base de datos", "Website and database"), ic: Database,
    logos: [
      { src: "/clientes/ipicsmo.png", alt: "IPIC SMO", pais: t("Estados Unidos", "United States"), bandera: true },
      { src: "/clientes/iicc1.png", alt: "Instituto de Investigaciones Clínicas Córdoba", pais: t("Córdoba, Argentina", "Córdoba, Argentina") },
    ],
  },
  {
    q: t("El agente de IA que nos armaron atiende conectado con Meta WhatsApp, n8n y el CRM a medida que también nos hicieron. Gracias a ellos automatizamos la compañía: las consultas se responden solas y lo que necesita a una persona llega con todo el contexto. Muy contentos con el trabajo.", "The AI agent they built for us answers connected to Meta WhatsApp, n8n and the custom CRM they also made for us. Thanks to them we automated the company: requests get answered on their own and whatever needs a person arrives with the full context. Very happy with the work."),
    n: "Nicolás Hercun", r: t("CEO de Ninit Group", "CEO at Ninit Group"), e: "",
    cat: t("Agente de IA y CRM a medida", "AI agent and custom CRM"), ic: Bot,
    logos: [{ src: "/clientes/ninit-group.png", alt: "Ninit Group", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: true }],
  },
  {
    q: t("Los recomendamos sin vueltas. El CRM a medida y el sistema de recepción y vendedores los usamos todos los días, y cuando pedimos un cambio está resuelto sin hacernos esperar. Estamos muy contentos con el trabajo que hacemos con ellos día a día.", "We recommend them without hesitation. We use the custom CRM and the front-desk and sales system every single day, and when we ask for a change it gets done without keeping us waiting. We are very happy with the work we do with them day to day."),
    n: t("Equipo de Nuevo Munich", "The Nuevo Munich team"), r: t("Recepción y ventas", "Front desk and sales"), e: "Nuevo Munich",
    cat: t("CRM a medida y sistema de ventas", "Custom CRM and sales system"), ic: Users,
    logos: [{ src: "/clientes/nuevo-munich.png", alt: "Nuevo Munich" }],
  },
];

const faqs = (t) => [
  { q: t("¿Cuánto tarda un proyecto?", "How long does a project take?"), a: t("Un agente de IA acotado sale en 4 a 6 semanas. Una plataforma completa, entre 3 y 6 meses, con entregas usables cada dos semanas desde la tercera.", "A focused AI agent ships in 4 to 6 weeks. A full platform, between 3 and 6 months, with usable releases every two weeks from week three onward.") },
  { q: t("¿Cómo cobran?", "How do you charge?"), a: t("Arrancamos con una reunión virtual para entender qué necesitás. Tu idea o tu sistema a medida pasa al área de desarrollo: lo analizamos y te armamos una demo sin ningún cargo, gratis. Recién ahí decidís si avanzás o no. Si avanzás, te entregamos el presupuesto y se arranca con una seña del 20% del trabajo, que es lo que nos deja en confianza a las dos partes; después un 40% y el resto al finalizar.", "We start with a video call to understand what you need. Your idea or custom system goes to the development team: we analyze it and build you a demo at no charge, free. Only then do you decide whether to go ahead. If you do, we send the quote and start with a 20% deposit, which is what puts both sides at ease; then 40% and the rest on delivery.") },
  { q: t("¿El código queda nuestro?", "Do we own the code?"), a: t("Sí. Repositorio, infraestructura y documentación a tu nombre desde el primer día. Además, con Numera —nuestra propia app— no solo te llega el presupuesto detallado línea por línea: junto con él va el acuerdo de confidencialidad firmado, así lo que nos contás y lo que construimos es tuyo y no sale de acá. Si mañana querés seguir con otro equipo, podés hacerlo sin trabas.", "Yes. Repository, infrastructure and documentation in your name from day one. On top of that, with Numera —our own app— you don't just get a quote itemized line by line: the signed confidentiality agreement comes with it, so what you tell us and what we build is yours and stays here. If tomorrow you want to continue with another team, you can, with nothing in your way.") },
  { q: t("¿Trabajan fuera de Argentina?", "Do you work outside Argentina?"), a: t("Sí. Hoy tenemos clientes en Latinoamérica, España y Estados Unidos, en modalidad remota con reuniones fijas semanales.", "Yes. Today we have clients across Latin America, Spain and the United States, working remotely with fixed weekly meetings.") },
  { q: t("¿Se puede empezar chico?", "Can we start small?"), a: t("Es lo que recomendamos. Un primer alcance de 4 a 6 semanas que resuelva un problema concreto y deje algo funcionando en producción.", "That's what we recommend. A first 4 to 6 week scope that solves one concrete problem and leaves something running in production.") },
];

/* Las mismas preguntas, en el formato que Google entiende. Se genera desde
   FAQS para que no se despegue nunca de lo que dice la pagina. */
const faqLd = (lista) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: lista.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const FORM_TO = "guillemuhana@gmail.com";
const WA_NUM = "5493515931673";
const WA_SHOW = "+54 9 351 593-1673";
const waLink = (msg) => "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(msg);
const waChips = (t) => [
  t("Hola, quiero un agente de IA para mi empresa.", "Hi, I'd like an AI agent for my company."),
  t("Hola, necesito desarrollar un software a medida.", "Hi, I need custom software built."),
  t("Hola, quiero hacerles una consulta.", "Hi, I have a question for you."),
];

const navLinks = (t) => [
  { id: "servicios", label: t("Servicios", "Services") },
  { id: "proceso", label: t("Proceso", "Process") },
  { id: "metodo", label: t("Nuestro método", "Our method") },
  { id: "clientes", label: t("Clientes", "Clients") },
];

/* ================= utilidades ================= */

/* Los logos casi negros (Next.js, OWASP, JWT) se aclaran para leerse sobre el panel oscuro. */
function brandColor(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.26 ? "#E7E1FF" : "#" + hex;
}

/* Windows no tiene glifos de bandera, asi que el emoji saldria como "US":
   la dibujamos, chiquita, con las barras y el canton azul. */
function BanderaUSA() {
  return (
    <svg viewBox="0 0 21 14" width="15" height="10" aria-hidden="true" style={{ borderRadius: 2, flex: "none" }}>
      <rect width="21" height="14" fill="#F0F1F5" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => <rect key={y} y={y} width="21" height="1.08" fill="#C8102E" />)}
      <rect width="9" height="7.6" fill="#0A3161" />
    </svg>
  );
}

function BrandLogo({ icon }) {
  return (
    <svg className="s2b-tile-logo" viewBox="0 0 24 24" role="img" aria-label={icon.title} fill={brandColor(icon.hex)}>
      <path d={icon.path} fillRule={icon.regla || "nonzero"} />
    </svg>
  );
}

/* La red del hero es una red neuronal, no un campo de particulas: cada neurona
   tiene su soma y sus dendritas, los axones son fijos -se tejen una vez y no
   aparecen y desaparecen por cercania- y lo que se mueve es el impulso, que
   viaja por el axon, carga a la neurona de la otra punta y, si junta suficiente,
   la hace disparar. De ahi salen las cascadas que recorren la red sola. */
const RED = {
  densidad: 27000,   // un area de N px2 por neurona
  min: 14,
  max: 44,
  axones: 2,         // cuantos axones saca cada neurona
  alcance: 260,      // hasta donde busca con quien conectarse
  puntero: 250,      // radio en el que el puntero estimula
  umbral: 1,         // carga que necesita para disparar
  descanso: 0.5,     // segundos apagada despues de disparar
  fuga: 0.5,         // cuanta carga pierde por segundo si no le llega nada
  llegada: 0.52,     // cuanta carga deja cada impulso al llegar
  espontaneo: 1.1,   // disparos por segundo que arranca la red sola
  arco: 88,          // a esta distancia de un boton, la neurona le tira una chispa
  /* En el celular el lienzo deja de ser el hero entero y pasa a ser una franja
     propia, abajo del titular. Ahi entran menos neuronas, mas chicas y con el
     alcance mas corto, asi se lee una red y no un enjambre encimado. */
  franja: { densidad: 10500, min: 10, max: 18, alcance: 152, puntero: 150, escala: 0.78, chico: true },
};

/* Tiempos de una idea, en segundos: pensar, apretarse, abrirse, vivir, irse */
const IDEA = { nodos: 34, piensa: 2.3, junta: 0.62, arma: 0.62, vive: 2.1, sale: 0.8, pausa: 0.7, anillo: 22 };

/* Lo que le construimos al cliente. Salen en este orden, una atras de otra:
   primero la app movil, despues otra cosa, y asi. Cada una tiene su acento. */
const ideas = (t) => [
  { rotulo: t("APP M\u00d3VIL", "MOBILE APP"),  w: 114, h: 216, dibujo: "movil",  acento: [150, 214, 255] },
  { rotulo: "DASHBOARD",   w: 192, h: 120, dibujo: "panel",  acento: [255, 202, 128] },
  { rotulo: t("AGENTE IA", "AI AGENT"),   w: 176, h: 120, dibujo: "chat",   acento: [176, 156, 255] },
  { rotulo: t("E-COMMERCE", "E-COMMERCE"),  w: 186, h: 120, dibujo: "tienda", acento: [125, 235, 174] },
  { rotulo: "PORTAL B2B",  w: 190, h: 118, dibujo: "grilla", acento: [143, 180, 255] },
  { rotulo: t("CRM A MEDIDA", "CUSTOM CRM"), w: 190, h: 118, dibujo: "kanban", acento: [214, 168, 255] },
];

/* Un rayo quebrado entre dos puntos: se dibuja dos veces, una gruesa y
   difusa para el resplandor y otra fina para el nucleo. */
function rayo(ctx, x1, y1, x2, y2, fuerza) {
  const dx = x2 - x1, dy = y2 - y1;
  const largo = Math.hypot(dx, dy) || 1;
  const nx = -dy / largo, ny = dx / largo;
  const tramos = 5;

  const trazo = () => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i < tramos; i++) {
      const t = i / tramos;
      const desvio = (Math.random() - 0.5) * 15 * (1 - Math.abs(t - 0.5) * 1.6);
      ctx.lineTo(x1 + dx * t + nx * desvio, y1 + dy * t + ny * desvio);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(167,140,255," + (0.12 * fuerza).toFixed(3) + ")";
  trazo();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(238,232,255," + (0.6 * fuerza).toFixed(3) + ")";
  trazo();
}

const FRIO_NODO = [190, 174, 250];
const FRIO_LINK = [128, 104, 214];
const CLARO_NODO = [236, 230, 255];
const CLARO_LINK = [176, 156, 255];
/* el ambar quedo reservado para el instante en que la idea cuaja */
const CALIDO = [255, 202, 128];

const mezcla = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

/* del violeta al blanco lila con el calor, y recien en el pico un toque de ambar */
const tono = (frio, claro, calor) => {
  const base = mezcla(frio, claro, Math.min(1, calor / 0.65));
  const chispa = Math.max(0, (calor - 0.65) / 0.35) * 0.5;
  return chispa > 0 ? mezcla(base, CALIDO, chispa) : base;
};

/* n puntos repartidos sobre el contorno de un rectangulo redondeado:
   son los asientos que ocupan las neuronas cuando la idea se arma */
function contorno(cx, cy, an, al, r, n) {
  const x0 = cx - an / 2, y0 = cy - al / 2;
  const recta = (ax, ay, bx, by) => ({
    largo: Math.hypot(bx - ax, by - ay),
    en: (t) => [ax + (bx - ax) * t, ay + (by - ay) * t],
  });
  const arco = (ox, oy, a0, a1) => ({
    largo: Math.abs(a1 - a0) * r,
    en: (t) => { const a = a0 + (a1 - a0) * t; return [ox + Math.cos(a) * r, oy + Math.sin(a) * r]; },
  });
  const tramos = [
    recta(x0 + r, y0, x0 + an - r, y0),
    arco(x0 + an - r, y0 + r, -Math.PI / 2, 0),
    recta(x0 + an, y0 + r, x0 + an, y0 + al - r),
    arco(x0 + an - r, y0 + al - r, 0, Math.PI / 2),
    recta(x0 + an - r, y0 + al, x0 + r, y0 + al),
    arco(x0 + r, y0 + al - r, Math.PI / 2, Math.PI),
    recta(x0, y0 + al - r, x0, y0 + r),
    arco(x0 + r, y0 + r, Math.PI, Math.PI * 1.5),
  ];
  const total = tramos.reduce((s, t) => s + t.largo, 0);
  const puntos = [];
  for (let i = 0; i < n; i++) {
    let d = (i / n) * total;
    for (const t of tramos) {
      if (d <= t.largo) { puntos.push(t.en(d / t.largo)); break; }
      d -= t.largo;
    }
  }
  return puntos;
}

function rutaRedonda(ctx, x, y, an, al, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + an, y, x + an, y + al, r);
  ctx.arcTo(x + an, y + al, x, y + al, r);
  ctx.arcTo(x, y + al, x, y, r);
  ctx.arcTo(x, y, x + an, y, r);
  ctx.closePath();
}

/* El interior de la app. Cada idea se dibuja distinta -y con la interfaz que
   le toca- para que se lea que no es un rectangulo cualquiera sino un producto.
   `ent(i)` es la entrada escalonada: los elementos van apareciendo de a uno. */
function interiorIdea(ctx, tipo, x, y, an, al, a, apar, acento) {
  const linea = (op) => "rgba(214,201,255," + (op * a).toFixed(3) + ")";
  const lleno = (op) => "rgba(167,140,255," + (op * a).toFixed(3) + ")";
  const ac = (op) => "rgba(" + acento[0] + "," + acento[1] + "," + acento[2] + "," + (op * a).toFixed(3) + ")";
  const ent = (i) => Math.max(0, Math.min(1, (apar - i * 0.06) / 0.26));
  const barra = (bx, by, bw, bh, r, color) => {
    rutaRedonda(ctx, bx, by, Math.max(1, bw), Math.max(1, bh), Math.min(r, bh / 2));
    ctx.fillStyle = color;
    ctx.fill();
  };
  /* cada elemento entra deslizandose un toque desde abajo */
  const entra = (i, dibujo) => {
    const e = ent(i);
    if (e <= 0) return;
    ctx.save();
    ctx.globalAlpha = e;
    ctx.translate(0, (1 - e) * 5);
    dibujo(e);
    ctx.restore();
  };

  if (tipo === "movil") {
    /* Un telefono de verdad y no un rectangulo con barras: marco, pantalla
       hundida, barra de estado, isla dinamica y botones al costado. Adentro
       la app se mueve sola mientras la idea vive: el grafico se dibuja, el
       numero sube, de la isla baja un aviso y alguien toca el boton. */
    const m = 5;                                   // el marco del equipo
    const sx = x + m, sy = y + m, sw = an - m * 2, sh = al - m * 2;
    const pad = 8, cx = sx + pad, ancho = sw - pad * 2;
    const t = (desde, dur) => Math.max(0, Math.min(1, (apar - desde) / dur));
    const suave = (k) => k * k * (3 - 2 * k);
    const blanco = (op) => "rgba(255,255,255," + (op * a).toFixed(3) + ")";

    ctx.save();
    rutaRedonda(ctx, sx, sy, sw, sh, 13);
    ctx.clip();

    /* la pantalla es mas oscura que el marco: asi se lee el equipo */
    const fondo = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
    fondo.addColorStop(0, "rgba(10,6,26," + (0.97 * a).toFixed(3) + ")");
    fondo.addColorStop(1, "rgba(19,11,44," + (0.97 * a).toFixed(3) + ")");
    ctx.fillStyle = fondo;
    ctx.fillRect(sx, sy, sw, sh);

    /* barra de estado: hora a la izquierda, senal y bateria a la derecha */
    ctx.font = "600 6px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = blanco(0.7);
    ctx.fillText("9:41", cx, sy + 9);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = blanco(0.5 + i * 0.12);
      ctx.fillRect(sx + sw - pad - 20 + i * 3, sy + 10 - (2 + i * 1.4), 2, 2 + i * 1.4);
    }
    barra(sx + sw - pad - 9, sy + 6, 9, 5, 1.6, blanco(0.28));
    barra(sx + sw - pad - 8.2, sy + 6.8, 6, 3.4, 1, blanco(0.8));
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";

    /* saludo y avatar */
    entra(0, () => {
      barra(cx, sy + 20, 30, 3.5, 2, linea(0.5));
      barra(cx, sy + 27, 46, 5, 2.5, blanco(0.85));
      const av = ctx.createLinearGradient(sx + sw - pad - 15, sy + 19, sx + sw - pad, sy + 34);
      av.addColorStop(0, ac(0.9));
      av.addColorStop(1, lleno(0.7));
      barra(sx + sw - pad - 15, sy + 19, 15, 15, 7.5, av);
    });

    /* la tarjeta viva: el numero sube y el grafico se dibuja solo */
    entra(1, () => {
      const ty = sy + 40, th = 54;
      const g = ctx.createLinearGradient(cx, ty, cx + ancho, ty + th);
      g.addColorStop(0, ac(0.55));
      g.addColorStop(1, lleno(0.5));
      rutaRedonda(ctx, cx, ty, ancho, th, 11);
      ctx.fillStyle = g;
      ctx.fill();

      barra(cx + 9, ty + 9, 26, 3, 1.5, blanco(0.55));

      /* el contador: arranca en cero y llega a su numero */
      const k = suave(t(0.25, 0.85));
      ctx.font = "700 12px 'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = blanco(0.95);
      ctx.fillText("$ " + Math.round(1248 * k).toLocaleString("es-AR"), cx + 9, ty + 28);
      ctx.textAlign = "start";

      /* la flechita de que subio */
      const sube = t(0.95, 0.3);
      if (sube > 0) {
        ctx.save();
        ctx.globalAlpha = sube;
        ctx.fillStyle = "rgba(125,235,174," + a.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(cx + 56, ty + 25);
        ctx.lineTo(cx + 59.5, ty + 19);
        ctx.lineTo(cx + 63, ty + 25);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      /* el grafico, con su area y el punto encendido en la punta */
      const px = cx + 8, pw = ancho - 16, py = ty + 34, ph = 13;
      const alto = [0.25, 0.55, 0.35, 0.7, 0.5, 0.88, 0.72, 1];
      const dib = suave(t(0.3, 0.8));
      if (dib > 0.02) {
        const ptx = (i) => px + (i / (alto.length - 1)) * pw;
        const pty = (i) => py + ph - alto[i] * ph;
        const hasta = dib * (alto.length - 1);
        const seg = Math.min(alto.length - 2, Math.floor(hasta));
        const f = Math.max(0, Math.min(1, hasta - seg));
        const hx = ptx(seg) + (ptx(seg + 1) - ptx(seg)) * f;
        const hy = pty(seg) + (pty(seg + 1) - pty(seg)) * f;
        const traza = () => {
          ctx.beginPath();
          ctx.moveTo(ptx(0), pty(0));
          for (let i = 1; i <= seg; i++) ctx.lineTo(ptx(i), pty(i));
          ctx.lineTo(hx, hy);
        };
        /* el area de abajo, apenas insinuada */
        traza();
        ctx.lineTo(hx, py + ph);
        ctx.lineTo(px, py + ph);
        ctx.closePath();
        ctx.fillStyle = blanco(0.15);
        ctx.fill();
        traza();
        ctx.strokeStyle = blanco(0.95);
        ctx.lineWidth = 1.4;
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.lineWidth = 1;
        const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 7);
        halo.addColorStop(0, blanco(0.5));
        halo.addColorStop(1, blanco(0));
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(hx, hy, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = blanco(1);
        ctx.beginPath(); ctx.arc(hx, hy, 1.9, 0, Math.PI * 2); ctx.fill();
      }
    });

    /* accesos rapidos */
    entra(2, () => {
      for (let i = 0; i < 3; i++) {
        const bw = (ancho - 10) / 3;
        barra(cx + i * (bw + 5), sy + 102, bw, 24, 8, i === 0 ? ac(0.26) : lleno(0.18));
        barra(cx + i * (bw + 5) + bw / 2 - 4.5, sy + 108, 9, 9, 4.5, i === 0 ? ac(0.85) : lleno(0.55));
        barra(cx + i * (bw + 5) + bw / 2 - 7, sy + 120, 14, 2, 1, blanco(0.22));
      }
    });

    /* la lista, con el ultimo movimiento marcado en verde */
    for (let i = 0; i < 3; i++) {
      entra(3 + i, () => {
        const fy = sy + 134 + i * 18;
        barra(cx, fy, 13, 13, 6.5, i === 0 ? ac(0.5) : lleno(0.34));
        barra(cx + 18, fy + 1, ancho - 42, 3, 1.5, linea(0.5));
        barra(cx + 18, fy + 7.5, ancho - 58, 2.5, 1.5, lleno(0.3));
        barra(sx + sw - pad - 16, fy + 3.5, 16, 6, 3,
          i === 0 ? "rgba(125,235,174," + (0.3 * a).toFixed(3) + ")" : lleno(0.16));
      });
    }

    /* barra de pestanas de vidrio */
    entra(6, () => {
      barra(cx, sy + sh - 30, ancho, 22, 11, blanco(0.09));
      for (let i = 0; i < 4; i++) {
        const bx = cx + 9 + i * ((ancho - 18) / 3.3);
        if (i === 0) barra(bx - 6, sy + sh - 27, 19, 16, 8, ac(0.32));
        ctx.fillStyle = i === 0 ? ac(0.95) : lleno(0.5);
        ctx.beginPath();
        ctx.arc(bx + 3.5, sy + sh - 19, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    /* boton flotante: late mientras trabaja y alguien lo toca */
    entra(7, () => {
      const bx = sx + sw - pad - 18, by = sy + sh - 56;
      const g = ctx.createRadialGradient(bx + 9, by + 9, 0, bx + 9, by + 9, 24);
      g.addColorStop(0, ac(0.45));
      g.addColorStop(1, ac(0));
      ctx.fillStyle = g;
      ctx.fillRect(bx - 15, by - 15, 48, 48);
      const late = (apar * 0.8) % 1;
      if (apar > 0.6) {
        ctx.strokeStyle = ac(0.45 * (1 - late));
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(bx + 9, by + 9, 9 + late * 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      barra(bx, by, 18, 18, 9, ac(0.92));
      ctx.strokeStyle = "rgba(12,8,28," + (0.85 * a).toFixed(3) + ")";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bx + 9, by + 5); ctx.lineTo(bx + 9, by + 13);
      ctx.moveTo(bx + 5, by + 9); ctx.lineTo(bx + 13, by + 9);
      ctx.stroke();
      ctx.lineWidth = 1;

      /* el toque: alguien lo aprieta y queda la onda */
      const toque = t(1.45, 0.55);
      if (toque > 0 && toque < 1) {
        ctx.strokeStyle = blanco(0.45 * (1 - toque));
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(bx + 9, by + 9, 6 + toque * 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    });

    /* la isla: al rato se estira y baja el aviso de que entro algo */
    const av = suave(t(1.05, 0.5));
    const iw = 26 + av * (ancho - 26);
    const ih = 8 + av * 13;
    const ix = sx + sw / 2 - iw / 2, iy = sy + 5;
    barra(ix, iy, iw, ih, ih / 2, "rgba(6,4,16," + (0.94 * a).toFixed(3) + ")");
    if (av > 0.35) {
      ctx.save();
      ctx.globalAlpha = (av - 0.35) / 0.65;
      ctx.fillStyle = ac(0.95);
      ctx.beginPath();
      ctx.arc(ix + 11, iy + ih / 2, 3.4, 0, Math.PI * 2);
      ctx.fill();
      barra(ix + 19, iy + ih / 2 - 4.5, 32, 3, 1.5, blanco(0.8));
      barra(ix + 19, iy + ih / 2 + 1, 21, 2.5, 1.5, blanco(0.4));
      barra(ix + iw - 22, iy + ih / 2 - 3.5, 16, 7, 3.5, "rgba(125,235,174," + (0.7 * a).toFixed(3) + ")");
      ctx.restore();
    }

    /* la rayita de abajo, la que se arrastra para salir */
    barra(sx + sw / 2 - 15, sy + sh - 6, 30, 2.4, 1.2, blanco(0.45));
    ctx.restore();

    /* filo interno de la pantalla, para que se separe del marco */
    rutaRedonda(ctx, sx, sy, sw, sh, 13);
    ctx.strokeStyle = blanco(0.12);
    ctx.lineWidth = 1;
    ctx.stroke();

    /* los botones del costado: es lo que termina de hacerlo telefono */
    barra(x - 0.6, y + 46, 1.6, 15, 0.8, blanco(0.16));
    barra(x - 0.6, y + 66, 1.6, 15, 0.8, blanco(0.16));
    barra(x + an - 1, y + 52, 1.6, 24, 0.8, blanco(0.16));
    return;
  }

  /* de aca para abajo, pantallas de escritorio: barra de ventana + panel lateral */
  const pad = 10;
  const cx = x + pad, ancho = an - pad * 2;
  const cab = 20;

  ctx.fillStyle = "rgba(255,255,255," + (0.05 * a).toFixed(3) + ")";
  ctx.fillRect(x, y, an, cab);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === 0 ? ac(0.75) : lleno(0.4);
    ctx.beginPath();
    ctx.arc(x + 12 + i * 8, y + 10, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  barra(x + 40, y + 7, Math.min(70, ancho * 0.45), 6, 3, "rgba(255,255,255," + (0.07 * a).toFixed(3) + ")");
  ctx.fillStyle = linea(0.22);
  ctx.fillRect(x, y + cab, an, 1);

  const lat = 26;
  entra(0, () => {
    ctx.fillStyle = "rgba(255,255,255," + (0.04 * a).toFixed(3) + ")";
    ctx.fillRect(x, y + cab + 1, lat, al - cab - 1);
    for (let i = 0; i < 4; i++) {
      if (i === 0) barra(x + 5, y + cab + 8 + i * 15, lat - 10, 11, 4, ac(0.26));
      barra(x + 9, y + cab + 12 + i * 15, 8, 3, 2, i === 0 ? ac(0.9) : lleno(0.45));
    }
  });

  const px = x + lat + 10, panel = an - lat - 20, py = y + cab + 10;

  if (tipo === "panel") {
    entra(1, () => {
      for (let i = 0; i < 3; i++) {
        const bw = (panel - 12) / 3;
        barra(px + i * (bw + 6), py, bw, 24, 6, "rgba(255,255,255," + (0.06 * a).toFixed(3) + ")");
        barra(px + i * (bw + 6) + 6, py + 6, bw * 0.4, 3, 2, lleno(0.4));
        barra(px + i * (bw + 6) + 6, py + 13, bw * 0.6, 5, 2, i === 1 ? ac(0.85) : linea(0.6));
      }
    });
    entra(2, () => {
      const base = y + al - 12, alto = al - cab - 56;
      const cols = [0.35, 0.6, 0.42, 0.85, 0.55, 0.72];
      const bw = 8, sep = (panel - cols.length * bw) / (cols.length - 1);
      cols.forEach((k, i) => {
        const bh = alto * k;
        const g = ctx.createLinearGradient(0, base - bh, 0, base);
        g.addColorStop(0, i === 3 ? ac(0.95) : lleno(0.75));
        g.addColorStop(1, i === 3 ? ac(0.15) : lleno(0.12));
        ctx.fillStyle = g;
        rutaRedonda(ctx, px + i * (bw + sep), base - bh, bw, bh, 3);
        ctx.fill();
      });
      /* la linea de tendencia por encima de las barras */
      ctx.strokeStyle = ac(0.8);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      cols.forEach((k, i) => {
        const qx = px + i * (bw + sep) + bw / 2, qy = base - alto * k - 5;
        if (i === 0) ctx.moveTo(qx, qy); else ctx.lineTo(qx, qy);
      });
      ctx.stroke();
      ctx.lineWidth = 1;
    });
  } else if (tipo === "chat") {
    const burbuja = (i, izq, bw, color) => {
      entra(1 + i, () => {
        const by = py + i * 22;
        const bx = izq ? px : px + panel - bw;
        barra(bx, by, bw, 17, 8, color);
        barra(bx + 7, by + 6, bw - 20, 3, 2, "rgba(255,255,255," + (0.45 * a).toFixed(3) + ")");
        if (izq) {
          ctx.fillStyle = lleno(0.55);
          ctx.beginPath();
          ctx.arc(bx - 6, by + 8, 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };
    burbuja(0, true, panel * 0.6, lleno(0.35));
    burbuja(1, false, panel * 0.68, ac(0.34));
    burbuja(2, true, panel * 0.5, lleno(0.35));
    entra(4, () => {
      /* el campo de escribir, con el cursor prendido */
      barra(px, y + al - 20, panel, 13, 6, "rgba(255,255,255," + (0.07 * a).toFixed(3) + ")");
      barra(px + 7, y + al - 15, panel * 0.3, 3, 2, lleno(0.4));
      if (Math.floor(apar * 2.2) % 2 === 0) barra(px + 9 + panel * 0.3, y + al - 17, 1.6, 7, 1, ac(0.9));
      barra(px + panel - 16, y + al - 18, 11, 9, 4, ac(0.85));
    });
  } else if (tipo === "tienda") {
    for (let i = 0; i < 3; i++) {
      entra(1 + i, () => {
        const bw = (panel - 12) / 3;
        const bx = px + i * (bw + 6);
        const alto = al - cab - 42;
        barra(bx, py, bw, alto, 6, "rgba(255,255,255," + (0.06 * a).toFixed(3) + ")");
        const g = ctx.createLinearGradient(bx, py, bx + bw, py + alto * 0.6);
        g.addColorStop(0, i === 1 ? ac(0.5) : lleno(0.4));
        g.addColorStop(1, lleno(0.14));
        rutaRedonda(ctx, bx + 4, py + 4, bw - 8, alto * 0.5, 4);
        ctx.fillStyle = g;
        ctx.fill();
        barra(bx + 4, py + alto * 0.5 + 9, bw * 0.6, 3, 2, linea(0.5));
        barra(bx + 4, py + alto * 0.5 + 16, bw * 0.35, 4, 2, ac(0.8));
      });
    }
    entra(4, () => {
      /* el carrito, con su globito de cantidad */
      const bx = x + an - 24, by = y + 6;
      barra(bx, by, 9, 8, 2, lleno(0.7));
      ctx.fillStyle = ac(0.95);
      ctx.beginPath();
      ctx.arc(bx + 10, by + 1, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (tipo === "kanban") {
    for (let c = 0; c < 3; c++) {
      const bw = (panel - 12) / 3;
      const bx = px + c * (bw + 6);
      entra(1 + c, () => {
        barra(bx, py, bw, al - cab - 22, 6, "rgba(255,255,255," + (0.045 * a).toFixed(3) + ")");
        barra(bx + 5, py + 5, bw * 0.5, 3, 2, c === 1 ? ac(0.8) : lleno(0.5));
        for (let f = 0; f < 2 + (c === 1 ? 1 : 0); f++) {
          const ty = py + 14 + f * 17;
          barra(bx + 4, ty, bw - 8, 14, 4, lleno(0.22));
          barra(bx + 8, ty + 4, bw * 0.45, 2.5, 2, linea(0.55));
          barra(bx + 8, ty + 9, bw * 0.28, 2.5, 2, c === 1 && f === 0 ? ac(0.9) : lleno(0.5));
        }
      });
    }
  } else {
    /* portal: tarjetas grandes arriba y una tabla abajo */
    entra(1, () => {
      for (let i = 0; i < 2; i++) {
        const bw = (panel - 6) / 2;
        barra(px + i * (bw + 6), py, bw, 30, 7, "rgba(255,255,255," + (0.06 * a).toFixed(3) + ")");
        barra(px + i * (bw + 6) + 7, py + 7, bw * 0.45, 3, 2, lleno(0.45));
        barra(px + i * (bw + 6) + 7, py + 15, bw * 0.62, 6, 3, i === 0 ? ac(0.85) : linea(0.6));
      }
    });
    for (let f = 0; f < 3; f++) {
      entra(2 + f, () => {
        const fy = py + 38 + f * 13;
        barra(px, fy, 8, 8, 2, f === 0 ? ac(0.7) : lleno(0.4));
        barra(px + 13, fy + 2, panel * 0.44, 3, 2, linea(0.5));
        barra(px + 13 + panel * 0.5, fy + 2, panel * 0.2, 3, 2, lleno(0.35));
        ctx.fillStyle = linea(0.14);
        ctx.fillRect(px, fy + 11, panel, 1);
      });
    }
  }
}

/* La forma de una neurona: un soma irregular y un arbol de dendritas que sale
   en estrella, con sus botones sinapticos. Se arma una sola vez por celula, en
   coordenadas locales y guardada en Path2D, asi cada cuadro son cuatro trazos
   por neurona y no cientos. */
function morfologia(esc) {
  const soma = new Path2D();
  const puntas = 7 + Math.floor(Math.random() * 4);
  const cuerpo = (3.2 + Math.random() * 1.7) * esc;
  for (let i = 0; i <= puntas; i++) {
    const a = (i / puntas) * Math.PI * 2;
    const r = cuerpo * (0.74 + Math.random() * 0.55);
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) soma.moveTo(x, y); else soma.lineTo(x, y);
  }
  soma.closePath();

  const gruesa = new Path2D(), fina = new Path2D(), cuentas = new Path2D();

  const rama = (x0, y0, a, largo, nivel) => {
    const c = (Math.random() - 0.5) * 0.55;
    const mx = x0 + Math.cos(a) * largo * 0.5 - Math.sin(a) * largo * c;
    const my = y0 + Math.sin(a) * largo * 0.5 + Math.cos(a) * largo * c;
    const x1 = x0 + Math.cos(a + c * 0.7) * largo;
    const y1 = y0 + Math.sin(a + c * 0.7) * largo;
    (nivel === 0 ? gruesa : fina).moveTo(x0, y0);
    (nivel === 0 ? gruesa : fina).quadraticCurveTo(mx, my, x1, y1);
    /* los botones: las cuentitas que se ven prendidas sobre la fibra */
    if (Math.random() < 0.66) {
      const t = 0.5 + Math.random() * 0.45, u = 1 - t;
      const bx = u * u * x0 + 2 * u * t * mx + t * t * x1;
      const by = u * u * y0 + 2 * u * t * my + t * t * y1;
      const br = (0.9 + Math.random() * 0.7) * esc;
      cuentas.moveTo(bx + br, by);
      cuentas.arc(bx, by, br, 0, Math.PI * 2);
    }
    if (nivel < 2) {
      const hijas = nivel === 0 ? 2 : (Math.random() < 0.45 ? 1 : 0);
      for (let k = 0; k < hijas; k++) {
        rama(x1, y1, a + (Math.random() - 0.5) * 1.6, largo * (0.48 + Math.random() * 0.3), nivel + 1);
      }
    }
  };

  const troncos = 9 + Math.floor(Math.random() * 8);
  const giro = Math.random() * Math.PI * 2;
  for (let i = 0; i < troncos; i++) {
    const a = giro + (i / troncos) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const l = (17 + Math.random() * 18) * esc;
    rama(Math.cos(a) * cuerpo * 0.8, Math.sin(a) * cuerpo * 0.8, a, l, 0);
  }
  return { soma, gruesa, fina, cuentas, r: cuerpo };
}

function NeuralBg({ t }) {
  const host = useRef(null);
  const lienzo = useRef(null);

  useEffect(() => {
    const box = host.current;
    const cv = lienzo.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const IDEAS = ideas(t);

    let w = 0, h = 0, raf = 0, vivo = true, previo = 0, reloj = 0, cuadro = 0;
    let neuronas = [];   // soma, dendritas y estado electrico
    let axones = [];     // las conexiones, tejidas una sola vez
    let impulsos = [];   // lo unico que se mueve de verdad
    const puntero = { x: 0, y: 0, ax: 0, ay: 0, activo: false, dedo: false, carga: 0, pausa: 0 };
    let idea = null;
    /* los numeros de la red cambian segun el lienzo que toco: el hero completo
       en la compu, la franja del celular */
    let red = RED;
    let destello = 0;
    let latidos = [];
    let proxLatido = 0;
    let cual = 0;
    let sembrado = 0;    // reloj del disparo espontaneo
    let sola = 5;        // en la franja del celular la idea tambien se arma sola
    let visible = true;  // si la red no esta en pantalla no hay nada que pintar

    /* header, pill y botones del hero: la neurona que dispara cerca les tira una chispa */
    let objetivos = [];
    const medirObjetivos = () => {
      const r = box.getBoundingClientRect();
      objetivos = Array.from(
        document.querySelectorAll(".s2b-nav-in, .s2b-hero .s2b-btn, .s2b-pill")
      ).map((el) => {
        const b = el.getBoundingClientRect();
        return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height };
      })
        /* si el boton quedo afuera del lienzo -en el celular la franja no los
           contiene- no tiene sentido tirarle una chispa que nadie ve */
        .filter((t) => t.x < w && t.y < h && t.x + t.w > 0 && t.y + t.h > 0);
    };

    /* ---- tejer la red: posiciones en grilla salteada, dendritas y axones ---- */
    const tejer = () => {
      const n = Math.round(Math.min(red.max, Math.max(red.min, (w * h) / red.densidad)));
      const cols = Math.max(2, Math.round(Math.sqrt((n * w) / h)));
      const filas = Math.max(2, Math.ceil(n / cols));
      const cw = w / cols, ch = h / filas;

      neuronas = [];
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < cols; c++) {
          if (neuronas.length >= n) break;
          const hx = (c + 0.5) * cw + (Math.random() - 0.5) * cw * 0.75;
          const hy = (f + 0.5) * ch + (Math.random() - 0.5) * ch * 0.75;
          /* casi todas medianas y alguna celula grande, como en el tejido real */
          const esc = (Math.random() < 0.18 ? 1.25 + Math.random() * 0.5 : 0.72 + Math.random() * 0.4) * (red.escala || 1);
          const forma = morfologia(esc);
          neuronas.push({
            x: hx, y: hy, hx, hy,
            f1: Math.random() * Math.PI * 2, f2: Math.random() * Math.PI * 2,
            v1: 0.16 + Math.random() * 0.2, v2: 0.11 + Math.random() * 0.16,
            amp: 3 + Math.random() * 5,
            esc,
            r: forma.r,
            soma: forma.soma, gruesa: forma.gruesa, fina: forma.fina, cuentas: forma.cuentas,
            carga: Math.random() * 0.4,
            brillo: 0,
            descanso: Math.random() * 0.6,
            fibra: 1,
            tomado: false,
            sx: 0, sy: 0, ax: 0, ay: 0, tx: 0, ty: 0,
          });
        }
      }

      /* cada neurona saca sus axones hacia las mas cercanas, sin repetir el par */
      axones = [];
      const hechos = new Set();
      neuronas.forEach((p, i) => {
        const cerca = neuronas
          .map((q, j) => ({ j, d: Math.hypot(q.hx - p.hx, q.hy - p.hy) }))
          .filter((o) => o.j !== i && o.d < red.alcance)
          .sort((a, b) => a.d - b.d)
          .slice(0, red.axones + (Math.random() < 0.3 ? 1 : 0));
        /* una de cada cinco saca ademas un axon largo, de los que cruzan */
        if (Math.random() < 0.2) {
          const lejos = neuronas
            .map((q, j) => ({ j, d: Math.hypot(q.hx - p.hx, q.hy - p.hy) }))
            .filter((o) => o.j !== i && o.d > red.alcance && o.d < red.alcance * 2.4)
            .sort((a, b) => a.d - b.d)[0];
          if (lejos) cerca.push(lejos);
        }
        for (const o of cerca) {
          const llave = Math.min(i, o.j) + "-" + Math.max(i, o.j);
          if (hechos.has(llave)) continue;
          hechos.add(llave);
          axones.push({
            de: i, a: o.j,
            /* la curva del axon: se guarda como desvio perpendicular, asi sigue
               siendo organica aunque las neuronas se muevan */
            curva: (Math.random() - 0.5) * 0.34,
            luz: 0,
          });
        }
      });
      impulsos = [];
      idea = null;
      puntero.carga = 0;
      latidos = [];
      destello = 0;
    };

    const medir = () => {
      const r = box.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* quien manda es el CSS: si el lienzo dejo de estar absoluto es porque el
         celular le dio su propia franja, y ahi la red se juega con otros numeros */
      const franja = getComputedStyle(box).position !== "absolute";
      red = franja ? { ...RED, ...RED.franja } : RED;
      tejer();
      medirObjetivos();
    };

    /* el punto de control de la curva de un axon, a partir de donde estan hoy */
    const control = (ax) => {
      const p = neuronas[ax.de], q = neuronas[ax.a];
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      const dx = q.x - p.x, dy = q.y - p.y;
      return [mx - dy * ax.curva, my + dx * ax.curva];
    };
    const enCurva = (x0, y0, cx, cy, x1, y1, t) => {
      const u = 1 - t;
      return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1];
    };

    /* disparar: la neurona se prende, queda en descanso y manda el impulso por
       cada axon que sale de ella */
    const disparar = (i) => {
      const p = neuronas[i];
      if (p.descanso > 0 || p.tomado) return;
      p.brillo = 1;
      p.carga = 0;
      p.descanso = red.descanso + Math.random() * 0.25;
      for (let k = 0; k < axones.length; k++) {
        const ax = axones[k];
        if (ax.de !== i && ax.a !== i) continue;
        const destino = ax.de === i ? ax.a : ax.de;
        if (neuronas[destino].tomado) continue;
        if (impulsos.length > 220) break;
        const largo = Math.hypot(neuronas[destino].x - p.x, neuronas[destino].y - p.y);
        impulsos.push({ e: k, desde: i, t: 0, dur: 0.28 + largo / 620 });
      }
    };

    /* ---- la idea: los mismos nodos, ahora somas, se acomodan en la app ---- */
    const nacerIdea = (x, y) => {
      const receta = IDEAS[cual % IDEAS.length];
      /* el aire de abajo es para el rotulo y la frase; en la franja del celular
         no hay ademas botones que esquivar, asi que alcanza con eso */
      const aire = red.chico ? 54 : 70;
      const an = Math.min(receta.w, w - 48), al = Math.min(receta.h, h - aire - 20);
      if (an < 70 || al < 70) return;
      const cx = Math.min(w - an / 2 - 20, Math.max(an / 2 + 20, x));
      const cy = Math.min(h - al / 2 - aire, Math.max(al / 2 + 20, y));

      /* con pocas neuronas no se las lleva todas: alguna queda latiendo afuera */
      const cupo = red.chico
        ? Math.max(8, Math.round(neuronas.length * 0.75))
        : Math.min(IDEA.nodos, neuronas.length);
      const elegidos = neuronas
        .filter((p) => !p.tomado)
        .map((p) => ({ p, d: Math.hypot(p.x - cx, p.y - cy) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, Math.min(IDEA.nodos, cupo))
        .map((o) => o.p);
      if (elegidos.length < 8) return;

      const metas = contorno(cx, cy, an, al, 14, elegidos.length);
      const ang = (px, py) => Math.atan2(py - cy, px - cx);
      elegidos.sort((a, b) => ang(a.x, a.y) - ang(b.x, b.y));
      metas.sort((a, b) => ang(a[0], a[1]) - ang(b[0], b[1]));
      const a0 = ang(elegidos[0].x, elegidos[0].y);
      elegidos.forEach((p, i) => {
        p.tomado = true;
        p.sx = p.x; p.sy = p.y;
        const a = a0 + (i / elegidos.length) * Math.PI * 2;
        const r = IDEA.anillo + Math.random() * 6;
        p.ax = cx + Math.cos(a) * r;
        p.ay = cy + Math.sin(a) * r;
        p.tx = metas[i][0]; p.ty = metas[i][1];
      });

      idea = { x: cx, y: cy, w: an, h: al, receta, t: 0, fase: "junta", nodos: elegidos };
      cual++;
      puntero.carga = 0;
    };

    const moverIdea = (dt) => {
      if (!idea) return;
      idea.t += dt;
      if (idea.fase === "junta") {
        const k = Math.min(1, idea.t / IDEA.junta);
        const e = k * k;
        for (const p of idea.nodos) {
          p.x = p.sx + (p.ax - p.sx) * e;
          p.y = p.sy + (p.ay - p.sy) * e;
        }
        if (k >= 1) { idea.fase = "arma"; idea.t = 0; destello = 1; }
      } else if (idea.fase === "arma") {
        const k = Math.min(1, idea.t / IDEA.arma);
        const e = 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2);
        for (const p of idea.nodos) {
          p.x = p.ax + (p.tx - p.ax) * e;
          p.y = p.ay + (p.ty - p.ay) * e;
        }
        if (k >= 1) { idea.fase = "vive"; idea.t = 0; }
      } else if (idea.fase === "vive") {
        for (const p of idea.nodos) { p.x = p.tx; p.y = p.ty; }
        if (idea.t >= IDEA.vive) { idea.fase = "sale"; idea.t = 0; }
      } else {
        const k = Math.min(1, idea.t / IDEA.sale);
        for (const p of idea.nodos) {
          const a = Math.atan2(p.ty - idea.y, p.tx - idea.x);
          p.x = p.tx + Math.cos(a) * k * 26;
          p.y = p.ty + Math.sin(a) * k * 26;
        }
        if (k >= 1) {
          for (const p of idea.nodos) { p.tomado = false; p.carga = 0.3; p.descanso = 0.2; }
          idea = null;
          puntero.pausa = IDEA.pausa;
        }
      }
    };

    const pintarIdea = () => {
      if (!idea) return;
      const a =
        idea.fase === "junta" ? 0
        : idea.fase === "arma" ? Math.max(0, (idea.t / IDEA.arma - 0.3) / 0.7)
        : idea.fase === "vive" ? 1
        : Math.max(0, 1 - idea.t / IDEA.sale);
      if (a <= 0.01) return;

      const x = idea.x - idea.w / 2, y = idea.y - idea.h / 2;

      const ac = idea.receta.acento;
      const rgba = (c, op) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + op.toFixed(3) + ")";
      const radio = idea.receta.dibujo === "movil" ? 16 : 12;
      /* cuanto lleva viva: manda la entrada de los elementos y el brillo */
      const apar = idea.fase === "vive" ? idea.t : idea.fase === "sale" ? IDEA.vive : 0;

      /* el resplandor, tenido con el acento de esta idea */
      const g = ctx.createRadialGradient(idea.x, idea.y, 0, idea.x, idea.y, idea.h * 1.05);
      g.addColorStop(0, rgba(ac, 0.15 * a));
      g.addColorStop(0.55, "rgba(255,196,110," + (0.05 * a).toFixed(3) + ")");
      g.addColorStop(1, rgba(ac, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(idea.x, idea.y, idea.h * 1.05, 0, Math.PI * 2);
      ctx.fill();

      /* el cuerpo: vidrio oscuro con una luz arriba a la izquierda */
      rutaRedonda(ctx, x, y, idea.w, idea.h, radio);
      const cuerpo = ctx.createLinearGradient(x, y, x + idea.w * 0.7, y + idea.h);
      cuerpo.addColorStop(0, "rgba(34,22,72," + (0.92 * a).toFixed(3) + ")");
      cuerpo.addColorStop(1, "rgba(12,7,30," + (0.94 * a).toFixed(3) + ")");
      ctx.fillStyle = cuerpo;
      ctx.fill();

      ctx.save();
      rutaRedonda(ctx, x, y, idea.w, idea.h, radio);
      ctx.clip();
      interiorIdea(ctx, idea.receta.dibujo, x, y, idea.w, idea.h, a, apar, ac);

      /* el brillo que barre la pantalla una vez, apenas termina de aparecer */
      const bar = (apar - 0.35) / 0.85;
      if (bar > 0 && bar < 1) {
        const bx = x - idea.w * 0.5 + bar * idea.w * 2;
        const br = ctx.createLinearGradient(bx - 26, y, bx + 26, y + idea.h);
        br.addColorStop(0, "rgba(255,255,255,0)");
        br.addColorStop(0.5, "rgba(255,255,255," + (0.13 * a * Math.sin(bar * Math.PI)).toFixed(3) + ")");
        br.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = br;
        ctx.fillRect(x, y, idea.w, idea.h);
      }
      ctx.restore();

      /* el borde, con el acento marcando el filo de arriba */
      rutaRedonda(ctx, x, y, idea.w, idea.h, radio);
      const filo = ctx.createLinearGradient(x, y, x, y + idea.h);
      filo.addColorStop(0, rgba(ac, 0.75 * a));
      filo.addColorStop(1, "rgba(226,216,255," + (0.3 * a).toFixed(3) + ")");
      ctx.strokeStyle = filo;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.lineWidth = 1;

      /* el remate: primero que producto es, y abajo la promesa */
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(" + ac[0] + "," + ac[1] + "," + ac[2] + "," + (0.9 * a).toFixed(3) + ")";
      ctx.fillText(idea.receta.rotulo, idea.x, y + idea.h + 12);

      const frase = t("Convertí tu idea en realidad", "Turn your idea into reality");
      ctx.font = "700 " + (w < 560 ? 14 : 18) + "px 'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
      /* la frase es mas ancha que la tarjeta: la corremos para que entre entera */
      const anchoFrase = ctx.measureText(frase).width;
      const fx = Math.min(w - anchoFrase / 2 - 10, Math.max(anchoFrase / 2 + 10, idea.x));
      ctx.fillStyle = "rgba(255,255,255," + (0.96 * a).toFixed(3) + ")";
      ctx.fillText(frase, fx, y + idea.h + 28);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    };

    /* ---- un cuadro ---- */
    const pintar = (dt) => {
      ctx.clearRect(0, 0, w, h);
      reloj += dt;
      destello = Math.max(0, destello - dt * 2.3);
      if (cuadro++ % 20 === 0) medirObjetivos();

      const corrida = Math.hypot(puntero.x - puntero.ax, puntero.y - puntero.ay);
      puntero.ax = puntero.x; puntero.ay = puntero.y;
      if (puntero.pausa > 0) puntero.pausa -= dt;

      if (!idea) {
        if (puntero.activo && puntero.pausa <= 0 && !quieto) {
          const quietud = puntero.dedo ? 1 : Math.max(0, 1 - corrida / 10);
          if (quietud < 0.15) puntero.carga = Math.max(0, puntero.carga - dt * 0.5);
          else puntero.carga = Math.min(1, puntero.carga + ((0.12 + quietud * 0.88) / IDEA.piensa) * dt);
          if (puntero.carga >= 1) nacerIdea(puntero.x, puntero.y);
        } else {
          puntero.carga = Math.max(0, puntero.carga - dt * 0.9);
        }

        /* en el celular nadie deja el dedo apoyado todo el rato: si la franja
           esta sola, cada tanto la red arma una idea por su cuenta */
        if (red.chico && !quieto && !puntero.activo) {
          sola -= dt;
          if (sola <= 0 && puntero.pausa <= 0) {
            sola = 6.5 + Math.random() * 3;
            nacerIdea(w * (0.32 + Math.random() * 0.36), h * (0.36 + Math.random() * 0.14));
          }
        }

        /* el pensamiento late: cada onda sincroniza un poco a la red de alrededor */
        if (puntero.activo && puntero.carga > 0.08 && !quieto) {
          proxLatido -= dt;
          if (proxLatido <= 0) {
            latidos.push({ x: puntero.x, y: puntero.y, t: 0, f: 0.5 + puntero.carga * 0.5 });
            proxLatido = 0.66 - puntero.carga * 0.38;
            for (const p of neuronas) {
              if (p.tomado) continue;
              const d = Math.hypot(puntero.x - p.x, puntero.y - p.y);
              if (d > red.puntero) continue;
              p.carga += (1 - d / red.puntero) * (0.2 + puntero.carga * 0.5);
            }
          }
        } else {
          proxLatido = 0;
        }
      }

      moverIdea(dt);

      /* ---- fisiologia: vaiven, carga, disparo ---- */
      if (!quieto) {
        sembrado -= dt;
        if (sembrado <= 0 && neuronas.length) {
          sembrado = 1 / red.espontaneo;
          const p = Math.floor(Math.random() * neuronas.length);
          if (!neuronas[p].tomado) neuronas[p].carga += 0.75;
        }
      }

      for (let i = 0; i < neuronas.length; i++) {
        const p = neuronas[i];
        if (!p.tomado) {
          /* la casa se corre hacia el puntero mientras se piensa: la red se
             estira hacia donde miramos, pero nadie sale volando */
          let cx = p.hx, cy = p.hy, atrae = 0;
          if (puntero.activo) {
            const dx = puntero.x - p.hx, dy = puntero.y - p.hy;
            const d = Math.hypot(dx, dy) || 1;
            if (d < red.puntero) {
              const cerca = 1 - d / red.puntero;
              const tiron = cerca * (0.06 + puntero.carga * 0.42);
              cx += dx * tiron; cy += dy * tiron;
              atrae = Math.min(1, cerca * (0.4 + puntero.carga * 0.6));
              /* y las estimula: cerca del puntero la red se pone a disparar */
              p.carga += dt * cerca * (0.45 + puntero.carga * 1.6);
            }
          }
          if (!quieto) {
            p.f1 += dt * p.v1; p.f2 += dt * p.v2;
            cx += Math.cos(p.f1) * p.amp;
            cy += Math.sin(p.f2) * p.amp * 0.8;
          }
          /* juntarse es lento a proposito: cuanto mas la tira el foco, mas
             despacio se acerca, para que se vea el movimiento */
          const paso = 3.2 - 2.3 * atrae;
          p.x += (cx - p.x) * Math.min(1, dt * paso);
          p.y += (cy - p.y) * Math.min(1, dt * paso);
          p.fibra += (1 - p.fibra) * Math.min(1, dt * 3);
        } else {
          p.fibra += (0 - p.fibra) * Math.min(1, dt * 6);
        }

        p.brillo = Math.max(0, p.brillo - dt * 1.5);
        if (p.descanso > 0) p.descanso -= dt;
        else if (!p.tomado) {
          p.carga = Math.max(0, p.carga - dt * red.fuga);
          if (p.carga >= red.umbral && !quieto) disparar(i);
        }
      }

      /* ---- los impulsos viajan y descargan al llegar ---- */
      const siguen = [];
      for (const s of impulsos) {
        s.t += dt / s.dur;
        const ax = axones[s.e];
        if (s.t >= 1) {
          const destino = ax.de === s.desde ? ax.a : ax.de;
          const q = neuronas[destino];
          if (q && !q.tomado) { q.carga += red.llegada; q.brillo = Math.max(q.brillo, 0.3); }
          ax.luz = 1;
          continue;
        }
        siguen.push(s);
      }
      impulsos = siguen;

      /* ---- dibujo: primero las fibras, despues los impulsos, al final los somas ---- */
      ctx.lineWidth = 1;
      for (const ax of axones) {
        const p = neuronas[ax.de], q = neuronas[ax.a];
        const vis = Math.min(p.fibra, q.fibra);
        if (vis < 0.02) continue;
        ax.luz = Math.max(0, ax.luz - dt * 1.6);
        const [cx, cy] = control(ax);
        const encendido = Math.max(ax.luz, Math.max(p.brillo, q.brillo) * 0.55);
        const c = tono(FRIO_LINK, CLARO_LINK, encendido);
        const col = (op) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (op * vis).toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(cx, cy, q.x, q.y);
        /* el halo primero, el nucleo del axon despues: asi la fibra brilla */
        ctx.strokeStyle = col(0.08 + encendido * 0.22);
        ctx.lineWidth = 3.2 + encendido * 2.4;
        ctx.stroke();
        ctx.strokeStyle = col(0.28 + encendido * 0.5);
        ctx.lineWidth = 1 + encendido * 0.9;
        ctx.stroke();
      }
      ctx.lineWidth = 1;

      /* el arbol de dendritas: halo, tronco, puntas y botones */
      for (const p of neuronas) {
        if (p.fibra < 0.02) continue;
        const c = tono(FRIO_LINK, CLARO_LINK, p.brillo);
        const col = (op) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (op * p.fibra).toFixed(3) + ")";
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.strokeStyle = col(0.07 + p.brillo * 0.2);
        ctx.lineWidth = 3.6 * p.esc;
        ctx.stroke(p.gruesa);
        ctx.strokeStyle = col(0.34 + p.brillo * 0.46);
        ctx.lineWidth = 1.25 * p.esc;
        ctx.stroke(p.gruesa);
        ctx.strokeStyle = col(0.2 + p.brillo * 0.42);
        ctx.lineWidth = 0.75 * p.esc;
        ctx.stroke(p.fina);
        const cn = tono(FRIO_NODO, CLARO_NODO, p.brillo);
        ctx.fillStyle = "rgba(" + cn[0] + "," + cn[1] + "," + cn[2] + "," + ((0.3 + p.brillo * 0.55) * p.fibra).toFixed(3) + ")";
        ctx.fill(p.cuentas);
        ctx.restore();
      }
      ctx.lineWidth = 1;

      const chispas = [];
      for (const s of impulsos) {
        const ax = axones[s.e];
        const p = neuronas[ax.de], q = neuronas[ax.a];
        const [cx, cy] = control(ax);
        const der = ax.de === s.desde;
        const t = der ? s.t : 1 - s.t;
        const [ix, iy] = enCurva(p.x, p.y, cx, cy, q.x, q.y, t);
        const [bx, by] = enCurva(p.x, p.y, cx, cy, q.x, q.y, Math.max(0, Math.min(1, t + (der ? -0.16 : 0.16))));
        const vis = Math.min(p.fibra, q.fibra);
        if (vis < 0.02) continue;
        /* la cola del impulso */
        ctx.strokeStyle = "rgba(214,200,255," + (0.5 * vis).toFixed(3) + ")";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(ix, iy);
        ctx.stroke();
        ctx.fillStyle = "rgba(246,242,255," + (0.92 * vis).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(ix, iy, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 1;

      /* el resplandor de la neurona que acaba de disparar */
      for (const p of neuronas) {
        if (p.brillo < 0.08) continue;
        const R = 14 + p.brillo * 46;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
        g.addColorStop(0, "rgba(196,176,255," + (0.16 * p.brillo).toFixed(3) + ")");
        g.addColorStop(1, "rgba(196,176,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
        ctx.fill();

        /* y la chispa contra el header y los botones, solo en el momento del disparo */
        if (p.brillo > 0.55) {
          for (const t of objetivos) {
            const qx = Math.max(t.x, Math.min(p.x, t.x + t.w));
            const qy = Math.max(t.y, Math.min(p.y, t.y + t.h));
            const d = Math.hypot(p.x - qx, p.y - qy);
            if (d > red.arco) continue;
            const fuerza = 1 - d / red.arco;
            if (Math.random() < 0.09 * fuerza) chispas.push([p.x, p.y, qx, qy, fuerza * p.brillo]);
          }
        }
      }

      /* las ondas del pensamiento */
      if (latidos.length) {
        const quedan = [];
        ctx.lineWidth = 1.2;
        for (const o of latidos) {
          o.t += dt;
          const k = o.t / 0.9;
          if (k >= 1) continue;
          quedan.push(o);
          ctx.strokeStyle = "rgba(196,176,255," + ((1 - k) * (1 - k) * 0.3 * o.f).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(o.x, o.y, 10 + k * 130, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.lineWidth = 1;
        latidos = quedan;
      }

      pintarIdea();

      if (destello > 0 && idea) {
        const k = 1 - destello;
        ctx.strokeStyle = "rgba(255,226,180," + (0.7 * destello * destello).toFixed(3) + ")";
        ctx.lineWidth = 0.6 + destello * 3.4;
        ctx.beginPath();
        ctx.arc(idea.x, idea.y, 14 + k * 190, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }

      /* los somas */
      for (const p of neuronas) {
        const c = tono(FRIO_NODO, CLARO_NODO, p.brillo);
        ctx.save();
        ctx.translate(p.x, p.y);
        /* la membrana difusa alrededor del cuerpo */
        const R = p.r * 3.2 * (1 + p.brillo * 0.4);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + ((0.3 + p.brillo * 0.4) * p.fibra).toFixed(3) + ")");
        g.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fill();
        /* y el cuerpo, que no es un circulo perfecto */
        ctx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.62 + p.brillo * 0.38).toFixed(3) + ")";
        ctx.fill(p.soma);
        ctx.restore();
        /* el anillo del disparo, apenas un instante */
        if (p.brillo > 0.25 && !p.tomado) {
          ctx.strokeStyle = "rgba(236,230,255," + (0.4 * p.brillo).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 5 + (1 - p.brillo) * 16 * p.esc, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.lineWidth = 1;

      for (const c of chispas) rayo(ctx, c[0], c[1], c[2], c[3], c[4]);
      ctx.lineWidth = 1;

      /* el foco del puntero mientras la idea se piensa */
      if (puntero.activo && !idea && puntero.carga > 0.06) {
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = "rgba(214,198,255," + (0.14 + puntero.carga * 0.4).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(puntero.x, puntero.y, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * puntero.carga);
        ctx.stroke();
        const late = Math.sin(reloj * (4.5 + puntero.carga * 11)) * 0.5 + 0.5;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(226,214,255," + (0.06 + puntero.carga * late * 0.3).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(puntero.x, puntero.y, 11 + late * 9 * (0.35 + puntero.carga), 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const bucle = (ahora) => {
      if (!vivo) return;
      const dt = Math.min(0.05, previo ? (ahora - previo) / 1000 : 0.016);
      previo = ahora;
      if (!document.hidden && visible) pintar(dt);
      raf = requestAnimationFrame(bucle);
    };

    const ubicar = (e) => {
      const r = box.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      puntero.x = x;
      puntero.y = y;
      puntero.activo = x > -80 && y > -80 && x < r.width + 80 && y < r.height + 80;
    };
    const alMover = (e) => {
      if (e.pointerType !== "mouse" && !puntero.dedo) return;
      ubicar(e);
    };
    /* en el celular la idea se piensa mientras el dedo esta apoyado */
    const alApoyar = (e) => {
      if (e.pointerType === "mouse") return;
      puntero.dedo = true;
      puntero.carga = 0;
      ubicar(e);
    };
    const alSoltar = (e) => {
      if (e.pointerType === "mouse") return;
      puntero.dedo = false;
      puntero.activo = false;
    };
    const alSalir = () => { puntero.activo = false; };

    medir();
    if (quieto) {
      pintar(0.016);
    } else {
      window.addEventListener("pointermove", alMover, { passive: true });
      window.addEventListener("pointerdown", alApoyar, { passive: true });
      window.addEventListener("pointerup", alSoltar, { passive: true });
      window.addEventListener("pointercancel", alSoltar, { passive: true });
      window.addEventListener("pointerleave", alSalir);
      raf = requestAnimationFrame(bucle);
    }

    const ro = new ResizeObserver(medir);
    ro.observe(box);

    /* cuando la red se fue de pantalla el bucle sigue vivo pero no pinta:
       en el celular eso es bateria que no se gasta */
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { rootMargin: "100px" });
    io.observe(box);

    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerdown", alApoyar);
      window.removeEventListener("pointerup", alSoltar);
      window.removeEventListener("pointercancel", alSoltar);
      window.removeEventListener("pointerleave", alSalir);
    };
  }, [t]);

  return (
    <div className="s2b-neural" ref={host} aria-hidden="true">
      <canvas ref={lienzo} />
    </div>
  );
}

function Terminal({ lineas }) {
  const [n, setN] = useState(0);

  /* escribe las lineas de a una y vuelve a empezar */
  useEffect(() => {
    const quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) { setN(lineas.length); return; }
    if (n >= lineas.length) {
      const t = setTimeout(() => setN(0), 3400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v + 1), n === 0 ? 480 : 760);
    return () => clearTimeout(t);
  }, [n]);

  return (
    <div className="s2b-term">
      <div className="s2b-term-bar">
        <i /><i /><i />
        <b>agente-comercial · producción</b>
      </div>
      <div className="s2b-term-body">
        {lineas.slice(0, n).map((l, i) => (
          <div key={i} className={l.c}>{l.t}</div>
        ))}
        <div className="cmd">{"> "}<span className="s2b-caret" /></div>
      </div>
    </div>
  );
}

function WhatsappGlyph() {
  return (
    <svg className="s2b-wa-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={siWhatsapp.path} />
    </svg>
  );
}

function WhatsAppBubble({ t, chips }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const box = useRef(null);

  /* entra sola despues de un momento, para no tapar el hero de arranque */
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const go = (msg) => {
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className={"s2b-wa" + (shown ? " is-shown" : "")} ref={box}>
      {open && (
        <div className="s2b-wa-panel" role="dialog" aria-label={t("Escribinos por WhatsApp", "Message us on WhatsApp")}>
          <div className="s2b-wa-top">
            <img src="/logo.png" alt="" aria-hidden="true" />
            <div>
              <b>Studio B2B</b>
              <span><i /> {t("Respondemos en el día", "We reply the same day")}</span>
            </div>
            <button className="s2b-wa-x" onClick={() => setOpen(false)} aria-label={t("Cerrar", "Close")}><X size={16} /></button>
          </div>
          <div className="s2b-wa-body">
            <p className="s2b-wa-msg">{t("¡Hola! 👋 Contanos qué necesitás y seguimos la charla por WhatsApp.", "Hi there! 👋 Tell us what you need and we'll keep the conversation on WhatsApp.")}</p>
            <div className="s2b-wa-chips">
              {chips.map((c) => <button key={c} onClick={() => go(c)}>{c}</button>)}
            </div>
          </div>
          <button className="s2b-wa-cta" onClick={() => go("Hola Studio B2B, quiero hacerles una consulta.")}>
            <WhatsappGlyph /> {t("Abrir WhatsApp", "Open WhatsApp")}
          </button>
        </div>
      )}
      <button
        className={"s2b-wa-fab" + (open ? " is-open" : "")}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? t("Cerrar el chat de WhatsApp", "Close the WhatsApp chat") : t("Escribinos por WhatsApp", "Message us on WhatsApp")}
      >
        {open ? <X size={24} /> : <WhatsappGlyph />}
        <span className="s2b-wa-tip">{t("Escribinos por WhatsApp", "Message us on WhatsApp")}</span>
      </button>
    </div>
  );
}

/* Que vista pide la direccion. El proceso tiene su propia URL para que el
   home no sea eterno, y para poder mandarle el link a alguien. */
const vistaDeUrl = () => {
  const p = typeof location === "undefined" ? "/" : location.pathname;
  return p === "/proceso" || p === "/proceso/" ? "proceso" : "home";
};

/* ================= página ================= */

export default function StudioB2B() {
  const heroRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [pop, setPop] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [tab, setTab] = useState("soft");
  const [qi, setQi] = useState(0);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", tel: "", tipo: "Agente de IA", msg: "" });
  /* el proceso vive en su propia direccion para no alargar el home; sin router,
     con la URL de verdad y el boton atras del navegador andando */
  const [idioma, setIdioma] = useState(idiomaGuardado);
  const t = useMemo(() => traductor(idioma), [idioma]);
  const SOLUCIONES = useMemo(() => soluciones(t), [t]);
  const CLIENTES = useMemo(() => clientes(t), [t]);
  const SERVICIOS = useMemo(() => servicios(t), [t]);
  const PROCESO = useMemo(() => proceso(t), [t]);
  const ETAPAS = useMemo(() => etapas(t), [t]);
  const AGENT_PTS = useMemo(() => agentPts(t), [t]);
  const TECNOLOGIAS = useMemo(() => tecnologias(t), [t]);
  const TESTIMONIOS = useMemo(() => testimonios(t), [t]);
  const FAQS = useMemo(() => faqs(t), [t]);
  const NAV_LINKS = useMemo(() => navLinks(t), [t]);
  const WA_CHIPS = useMemo(() => waChips(t), [t]);
  const AGENT_LINES = useMemo(() => agentLines(t), [t]);
  const logosTab = useMemo(() => (TECNOLOGIAS.find((c) => c.id === tab) || TECNOLOGIAS[0]).logos, [TECNOLOGIAS, tab]);

  useEffect(() => {
    try { localStorage.setItem("s2b-idioma", idioma); } catch {}
    document.documentElement.lang = idioma === "en" ? "en" : "es";
  }, [idioma]);

  const [vista, setVista] = useState(vistaDeUrl);

  useEffect(() => {
    const sync = () => setVista(vistaDeUrl());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const irA = useCallback((v) => {
    setDrawer(false); setPop(false);
    const destino = v === "proceso" ? "/proceso" : "/";
    if (location.pathname !== destino) history.pushState({}, "", destino);
    setVista(v);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    let raf = 0, x = 50, y = 42;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(() => {
        el.style.setProperty("--hx", x.toFixed(1) + "%");
        el.style.setProperty("--hy", y.toFixed(1) + "%");
        raf = 0;
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const s = () => setStuck(window.scrollY > 20);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    document.title = vista === "proceso"
      ? "El Proceso Studio B2B, paso a paso · Studio B2B"
      : "Software a medida y agentes de IA en Córdoba · Studio B2B";
  }, [vista]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: .1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".s2b-rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [vista]);

  const goTo = useCallback((id) => {
    setDrawer(false); setPop(false);
    if (id === "proceso") { irA("proceso"); return; }
    const ir = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    /* la seccion puede estar en la otra vista: se vuelve al home y despues se baja */
    if (document.getElementById(id)) ir();
    else { irA("home"); setTimeout(ir, 80); }
  }, [irA]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const send = async () => {
    if (!form.nombre.trim() || !form.email.trim()) {
      setFormErr(t("Necesitamos al menos tu nombre y tu email.", "We need at least your name and your email."));
      return;
    }
    setSending(true);
    setFormErr("");
    try {
      const r = await fetch("https://formsubmit.co/ajax/" + FORM_TO, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Consulta desde studiob2b · " + form.nombre,
          _template: "table",
          _captcha: "false",
          Nombre: form.nombre,
          Empresa: form.empresa || "-",
          Email: form.email,
          Telefono: form.tel || "-",
          "Tipo de proyecto": form.tipo,
          Contexto: form.msg || "-",
        }),
      });
      if (!r.ok) throw new Error("status " + r.status);
      setSent(true);
    } catch {
      setFormErr(t("No pudimos enviar el mensaje. Escribinos por WhatsApp y lo resolvemos.", "We couldn't send the message. Write to us on WhatsApp and we'll sort it out."));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="s2b">
      <style>{CSS}</style>

      {/* ============ HERO + NAV ============ */}
      <div className="s2b-band s2b-band--dark">
        <header className={"s2b-nav" + (stuck ? " is-stuck" : "")}>
          <div className="s2b-wrap s2b-nav-in">
            <button className="s2b-brand" onClick={() => (vista === "home" ? window.scrollTo({ top: 0, behavior: "smooth" }) : irA("home"))}>
              <span className="s2b-mark-halo"><img className="s2b-mark" src="/logo.png" alt="" aria-hidden="true" /></span>
              <div className="s2b-brand-txt">STUDIO B2B<small>DESDE 2015</small></div>
            </button>

            <nav className="s2b-menu" onMouseLeave={() => setPop(false)}>
              <div onMouseEnter={() => setPop(true)}>
                <button className="top" aria-expanded={pop}>{t("Soluciones", "Solutions")} <ChevronDown size={15} /></button>
                {pop && (
                  <div className="s2b-pop">
                    {SOLUCIONES.map((s) => {
                      const I = s.icon;
                      return (
                        <a key={s.id} href={"#" + s.id} onClick={(e) => { e.preventDefault(); goTo(s.id === "agentes" ? "agentes" : "servicios"); }}>
                          <div className="ic"><I size={18} /></div>
                          <div><b>{s.t}</b><span>{s.d}</span></div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              {NAV_LINKS.map((n) => (
                <div key={n.id}><button className="top" onClick={() => goTo(n.id)}>{n.label}</button></div>
              ))}
              <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" style={{ marginLeft: 8 }} onClick={() => goTo("contacto")}>
                {t("Contactanos", "Contact us")} <ArrowUpRight size={16} />
              </button>
            </nav>

            <button className="s2b-burger" aria-label={t("Abrir menú", "Open menu")} onClick={() => setDrawer(true)}><Menu size={24} /></button>
          </div>
        </header>

        {drawer && (
          <div className="s2b-drawer">
            <div className="s2b-drawer-top">
              <div className="s2b-brand"><span className="s2b-mark-halo"><img className="s2b-mark" src="/logo.png" alt="" aria-hidden="true" /></span><div className="s2b-brand-txt">STUDIO B2B</div></div>
              <button aria-label={t("Cerrar", "Close")} onClick={() => setDrawer(false)}><X size={26} /></button>
            </div>
            {SOLUCIONES.map((s) => <button key={s.id} className="dl" onClick={() => goTo(s.id === "agentes" ? "agentes" : "servicios")}>{s.t}</button>)}
            {NAV_LINKS.map((n) => <button key={n.id} className="dl" onClick={() => goTo(n.id)}>{n.label}</button>)}
            <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" style={{ marginTop: 26, width: "100%", justifyContent: "center" }} onClick={() => goTo("contacto")}>
              Contactanos <ArrowUpRight size={16} />
            </button>
          </div>
        )}

        {vista === "home" && <section className="s2b-hero" ref={heroRef}>
          <div className="s2b-aurora" aria-hidden="true"><i /><i /><i /></div>
          <div className="s2b-grid" aria-hidden="true" />
          <div className="s2b-halo" aria-hidden="true" />

          {/* el laboratorio: rotulo + red. En la compu no tiene caja propia y
              queda de fondo; en el celular se vuelve una franja abajo del
              titular, con su lugar, para que no se mezcle con el texto. */}
          <div className="s2b-lab">
            <div className="s2b-hint-wrap">
              <div className="s2b-wrap">
                <div className="s2b-hint">
                  <i /> <b>{t("Tus neuronas", "Your neurons")}</b>
                  <span className="solo-mouse">{t("dejá el mouse quieto y se arma una idea", "keep the mouse still and an idea takes shape")}</span>
                  <span className="solo-dedo">{t("mantené el dedo apoyado y se arma una idea", "hold your finger down and an idea takes shape")}</span>
                </div>
              </div>
            </div>
            <NeuralBg t={t} />
          </div>

          <div className="s2b-wrap s2b-hero-copy">
            <div className="s2b-hero-in">
              <div className="s2b-pill">{t("Producto digital e inteligencia artificial", "Digital product & artificial intelligence")}</div>
              <div className="s2b-sweep">
                <h1>{t("Impulsamos tecnología que rinde en producción y", "We build technology that performs in production and")} <span>{t("escala con tu negocio", "scales with your business")}</span></h1>
              </div>
              <p>
                {t("Diez años haciendo productos a medida y, desde hace tres, agentes de IA que trabajan adentro del negocio. Nada que se caiga cuando llega a producción.", "Ten years building custom products and, for the last three, AI agents that work inside the business. Nothing that falls over once it reaches production.")}
              </p>
              <div className="s2b-hero-cta">
                <button className="s2b-btn s2b-btn--chrome" onClick={() => goTo("contacto")}>{t("Contanos tu proyecto", "Tell us about your project")} <ArrowRight size={16} /></button>
                <button className="s2b-btn" style={{ border: "1px solid rgba(167,140,255,.35)", color: "#fff" }} onClick={() => goTo("metodo")}>
                  <Workflow size={15} /> {t("Cómo trabajamos", "How we work")}
                </button>
              </div>
              <div className="s2b-hero-note"><span className="s2b-dot" /> {t("2 lugares para arrancar este trimestre", "2 slots left to start this quarter")}</div>
            </div>
          </div>

          <div className="s2b-wrap s2b-hero-atajos">
            <div className="s2b-shortcuts">
              {SOLUCIONES.map((s) => {
                const I = s.icon;
                return (
                  <button key={s.id} className="s2b-shortcut" onClick={() => goTo(s.id === "agentes" ? "agentes" : "servicios")}>
                    <div className="row"><I size={22} /><ArrowUpRight size={18} /></div>
                    <b>{s.t}</b>
                    <span>{s.d}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>}
      </div>

      {/* ============ PROCESO (pagina aparte) ============ */}
      {vista === "proceso" && <div className="s2b-band s2b-band--dark" id="proceso">
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap">
            <div className="s2b-head s2b-rv">
              <div>
                <div className="s2b-eyebrow">{t("Cómo se trabaja con nosotros", "How working with us goes")}</div>
                <h2 className="s2b-h2">{t("El", "The")} <b>{t("Proceso Studio B2B", "Studio B2B Process")}</b>{t(", paso a paso", ", step by step")}</h2>
              </div>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                {t("De la primera charla a tu sistema en producción. Antes de que pongas un peso ya firmamos confidencialidad y ya viste tu idea funcionando.", "From the first conversation to your system in production. Before you spend a dollar we have already signed an NDA and you have already seen your idea working.")}
              </p>
            </div>

            <div className="s2b-flow">
              {PROCESO.map((p, i) => {
                const I = p.ic;
                return (
                  <div className="s2b-paso s2b-rv" key={p.n} style={{ transitionDelay: Math.min(i, 4) * 70 + "ms" }}>
                    <div className="s2b-paso-eje"><div className="s2b-paso-nodo">{p.n}</div></div>
                    <div className="s2b-paso-card">
                      <div className="s2b-paso-top">
                        <div className="s2b-paso-ico"><I size={19} /></div>
                        <h3>{p.t}</h3>
                      </div>
                      <p>{p.d}</p>
                      <div className={"s2b-paso-chip" + (p.pago ? " s2b-paso-chip--pago" : "")}>
                        {p.pago ? <CircleDollarSign size={13} /> : <Check size={13} />} {p.chip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="s2b-flow-cierre s2b-rv">
              <span>
                {t("Del paso 7 en adelante entra el", "From step 7 onward the")} <b>{t("Método Studio", "Studio Method")}</b>{t(": diagnóstico, prototipo, entregas cada dos semanas y operación. El código y la infraestructura son tuyos desde el día uno.", " takes over: discovery, prototype, releases every two weeks and operations. The code and the infrastructure are yours from day one.")}
              </span>
              <button className="s2b-btn s2b-btn--chrome" onClick={() => goTo("metodo")}>
                {t("Ver el método", "See the method")} <ArrowRight size={16} />
              </button>
            </div>

            <div className="s2b-flow-volver s2b-rv">
              <button className="s2b-link" onClick={() => irA("home")}><ArrowLeft size={15} /> {t("Volver al inicio", "Back to home")}</button>
              <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" onClick={() => goTo("contacto")}>{t("Empezar por el paso 1", "Start with step 1")} <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>
      </div>}

      {vista === "home" && <>
      {/* ============ LOGOS CLIENTES ============ */}
      <div className="s2b-band s2b-band--tint">
        <div className="s2b-logos">
          <div className="s2b-logos-t">{t("Empresas que confían en Studio B2B", "Companies that trust Studio B2B")}</div>
          <div className="s2b-marq">
            <div className="s2b-marq-track">
              {[...CLIENTES, ...CLIENTES, ...CLIENTES, ...CLIENTES].map((c, i) =>
                c.src
                  ? (
                    <div className="s2b-clogo-box" key={i}>
                      <img
                        className="s2b-clogo s2b-clogo--img"
                        src={c.src}
                        alt={c.n}
                        loading="lazy"
                        style={c.esc ? { height: `calc(var(--clogo-h) * ${c.esc})` } : undefined}
                      />
                      {c.pais && <span className="s2b-clogo-pais"><BanderaUSA /> {c.pais}</span>}
                    </div>
                  )
                  : <div className="s2b-clogo" key={i}>{c.n}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ SERVICIOS ============ */}
      <section className="s2b-sec" id="servicios">
        <div className="s2b-wrap">
          <div className="s2b-head s2b-rv">
            <div>
              <div className="s2b-eyebrow">{t("Soluciones", "Solutions")}</div>
              <h2 className="s2b-h2">{t("Tu idea se convierte en", "Your idea becomes")} <b>{t("realidad", "real")}</b>{t(": app, web y sistemas a medida", ": apps, web and custom systems")}</h2>
            </div>
            <p className="s2b-lead">
              {t("Tres frentes y un mismo equipo. No tercerizamos: diseño, desarrollo e IA se sientan en la misma mesa, así que las decisiones no se pierden entre proveedores.", "Three fronts and one single team. We don't outsource: design, development and AI sit at the same table, so decisions don't get lost between vendors.")}
            </p>
          </div>

          <div className="s2b-rows">
            {SERVICIOS.map((s, i) => {
              const I = s.icon;
              return (
                <article className="s2b-row s2b-rv" key={s.t} style={{ transitionDelay: i * 90 + "ms" }}>
                  <div className="s2b-row-txt">
                    <div style={{ width: 46, height: 46, borderRadius: 14, display: "grid", placeItems: "center", marginBottom: 20, color: "#fff", background: "linear-gradient(150deg,#6D4AFF,#3B2296)" }}>
                      <I size={22} />
                    </div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                    <div className="s2b-chips">{s.chips.map((c) => <span className="s2b-chip" key={c}>{c}</span>)}</div>
                    <button className="s2b-link" onClick={() => goTo(s.to)}>{s.cta} <ArrowRight size={15} /></button>
                  </div>
                  <div className="s2b-row-vis" style={{ background: s.bg }}>
                    <div className="s2b-blob" style={{ width: 240, height: 240, top: -50, right: -40, background: s.blobs[0] }} />
                    <div className="s2b-blob" style={{ width: 200, height: 200, bottom: -60, left: -30, background: s.blobs[1], opacity: .55 }} />
                    {s.img ? (
                      <>
                        <div className="s2b-shot">
                          <img src={s.img} alt={s.alt} loading="lazy" width={s.an} height={s.al} />
                        </div>
                        {s.logos && (
                          <div className="s2b-vis-stack">
                            <span className="s2b-vis-stack-t">{s.logosT}</span>
                            <div className="s2b-vis-logos">
                              {s.logos.map((l, k) => (
                                <span className="s2b-vis-logo" key={l.title} title={l.title} style={{ transitionDelay: k * 40 + "ms" }}>
                                  <svg viewBox="0 0 24 24" role="img" aria-label={l.title} fill={"#" + l.hex}>
                                    <path d={l.path} fillRule={l.regla || "nonzero"} />
                                  </svg>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="s2b-glass">
                        <div className="gl-bar w1" /><div className="gl-bar w2" /><div className="gl-bar w3" />
                        <div className="gl-row"><div className="gl-tile" /><div className="gl-tile" /><div className="gl-tile" /></div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MÉTODO ============ */}
      <section className="s2b-sec s2b-sec--sm" id="metodo" style={{ background: "linear-gradient(180deg,var(--paper),#FFFFFF)" }}>
        <div className="s2b-wrap">
          <div className="s2b-head s2b-rv">
            <div>
              <div className="s2b-eyebrow">{t("Nuestro método", "Our method")}</div>
              <h2 className="s2b-h2">{t("El", "The")} <b>{t("Método Studio", "Studio Method")}</b>{t(", la forma en que trabajamos", ", the way we work")}</h2>
            </div>
            <p className="s2b-lead">
              {t("Cuatro etapas con entregables definidos. Sabés en qué punto está tu proyecto todas las semanas, sin tener que preguntarlo.", "Four stages with defined deliverables. You know where your project stands every week without having to ask.")}
            </p>
          </div>

          <div className="s2b-method">
            <div className="s2b-method-img s2b-rv">
              <img
                src="/metodo.jpg"
                alt={t("El equipo de Studio B2B frente al tablero de tareas del día, repasando qué está por hacer, en proceso, en revisión y hecho", "The Studio B2B team at the daily task board, going over what is to do, in progress, in review and done")}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="s2b-rv">
              <div className="s2b-stages">
                {ETAPAS.map((e) => (
                  <div className="s2b-stage-row" key={e.n}>
                    <div className="n">{e.n}</div>
                    <div><h4>{e.t}</h4><p>{e.d}</p></div>
                  </div>
                ))}
              </div>
              <button className="s2b-btn s2b-btn--primary" style={{ marginTop: 28 }} onClick={() => goTo("contacto")}>
                {t("Empezar por el diagnóstico", "Start with discovery")} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AGENTES IA ============ */}
      <div className="s2b-band s2b-band--dark" id="agentes">
        <section className="s2b-sec">
          <div className="s2b-wrap s2b-split">
            <div className="s2b-rv">
              <div className="s2b-eyebrow"><Sparkles size={13} /> {t("Agentes en producción", "Agents in production")}</div>
              <h2 className="s2b-h2">{t("Un agente sirve", "An agent is worth it")} <b>{t("cuando trabaja solo", "when it works on its own")}</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                {t("Esto es un turno real de uno de nuestros agentes comerciales: entiende la consulta, revisa el stock, responde y agenda. La persona aparece solo cuando hace falta.", "This is a real shift from one of our sales agents: it understands the request, checks stock, replies and books the meeting. A person steps in only when needed.")}
              </p>
              <ul className="s2b-ul">
                {AGENT_PTS.map((p) => <li key={p}><Check size={17} />{p}</li>)}
              </ul>
              <button className="s2b-btn s2b-btn--chrome" style={{ marginTop: 30 }} onClick={() => goTo("contacto")}>
                {t("Quiero un agente así", "I want an agent like this")} <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="s2b-rv"><Terminal lineas={AGENT_LINES} /></div>
          </div>
        </section>
      </div>

      {/* ============ TECNOLOGÍAS ============ */}
      <section className="s2b-sec s2b-sec--sm" id="tecnologias">
        <div className="s2b-tech-panel s2b-rv">
          <div className="s2b-tech-inner">
            <div className="s2b-tech-head">
              <div className="s2b-eyebrow">Stack</div>
              <h2 className="s2b-h2">{t("Tecnologías que", "The technology behind")} <b>{t("potencian nuestras soluciones", "our solutions")}</b></h2>
              <p className="s2b-tech-lead">
                {t("Trabajamos con un stack robusto y actualizado, que nos permite integrar sistemas complejos, acelerar desarrollos y garantizar seguridad en cada proyecto.", "We work with a solid, up to date stack that lets us integrate complex systems, move faster and keep every project secure.")}
              </p>
            </div>
            <div className="s2b-tech-tabs" role="tablist" aria-label={t("Categorías de tecnologías", "Technology categories")}>
              {TECNOLOGIAS.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={tab === c.id}
                  className={"s2b-tab" + (tab === c.id ? " is-on" : "")}
                  onClick={() => setTab(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="s2b-tiles" key={tab}>
              {armarMosaico(logosTab.length).map((puesto, i) => {
                const ic = puesto >= 0 ? logosTab[puesto] : null;
                if (!ic) return <div className="s2b-tile s2b-tile--void" key={i} aria-hidden="true" />;
                return (
                  /* el disco se inclina en 3D hacia el cursor y le cruza un destello;
                     en el celular responde al giro del telefono */
                  <Tilt
                    key={i}
                    className="s2b-tiltbox"
                    tiltMaxAngleX={16}
                    tiltMaxAngleY={16}
                    perspective={620}
                    transitionSpeed={900}
                    glareEnable
                    glareMaxOpacity={0.26}
                    glareColor="#D9CCFF"
                    glarePosition="all"
                    glareBorderRadius="50%"
                    gyroscope
                  >
                    <div className="s2b-tile" style={{ animationDelay: i * 32 + "ms" }}>
                      <BrandLogo icon={ic} />
                      <span className="s2b-tile-name">{ic.title}</span>
                    </div>
                  </Tilt>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="s2b-sec s2b-sec--sm" id="clientes">
        <div className="s2b-wrap">
          <div className="s2b-rv">
            <div className="s2b-eyebrow">{t("Resultados", "Results")}</div>
            <h2 className="s2b-h2">{t("Lo que dicen", "What we hear from")} <b>{t("los que ya trabajaron con nosotros", "the people who already worked with us")}</b></h2>
          </div>

          <div className="s2b-quotes s2b-rv">
            <div className="s2b-qtrack" style={{ transform: "translateX(-" + qi * 100 + "%)" }}>
              {TESTIMONIOS.map((q) => {
                const I = q.ic;
                return (
                  <div className="s2b-qslide" key={q.n}>
                    <div className="s2b-qcard">
                      <div className={"s2b-qphoto" + (q.logos.length > 1 ? " s2b-qphoto--dos" : "")}>
                        {q.logos.map((l) => (
                          <span key={l.src}>
                            <img src={l.src} alt={l.alt} loading="lazy" />
                            {l.pais && <em>{l.bandera && <BanderaUSA />} {l.pais}</em>}
                          </span>
                        ))}
                      </div>
                      <div>
                        <div className="s2b-qtag"><I size={14} /> {q.cat}</div>
                        <p className="s2b-qtext">{q.q}</p>
                        <div className="s2b-qfoot">
                          <div><b>{q.n}</b>{q.r && <span>{q.r}</span>}</div>
                          {q.e && <div className="s2b-qlogo">{q.e}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="s2b-qnav">
            <button aria-label={t("Anterior", "Previous")} onClick={() => setQi((i) => (i - 1 + TESTIMONIOS.length) % TESTIMONIOS.length)}><ArrowLeft size={17} /></button>
            <button aria-label={t("Siguiente", "Next")} onClick={() => setQi((i) => (i + 1) % TESTIMONIOS.length)}><ArrowRight size={17} /></button>
            <div className="s2b-qdots">{TESTIMONIOS.map((_, i) => <i key={i} className={i === qi ? "on" : ""} />)}</div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap" style={{ maxWidth: 900 }}>
          <div className="s2b-rv">
            <div className="s2b-eyebrow">{t("Preguntas", "Questions")}</div>
            <h2 className="s2b-h2">{t("Lo que", "What")} <b>{t("suelen preguntarnos", "people usually ask us")}</b></h2>
          </div>
          <div className="s2b-faq">
            {FAQS.map((f, i) => (
              <div className="s2b-fi s2b-rv" key={f.q}>
                <button className="s2b-fq" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>
                  {f.q}{faq === i ? <Minus size={19} /> : <Plus size={19} />}
                </button>
                <div className={"s2b-fa" + (faq === i ? " is-open" : "")}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </>}

      {/* ============ CONTACTO + FOOTER ============ */}
      <div className="s2b-band s2b-band--dark" id="contacto">
        <section className="s2b-sec">
          <div className="s2b-wrap s2b-form-grid">
            <div className="s2b-rv">
              <div className="s2b-eyebrow">{t("Siguiente paso", "Next step")}</div>
              <h2 className="s2b-h2">{t("Tu próximo proyecto", "Your next project")} <b>{t("empieza acá", "starts here")}</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                {t("Contanos el desafío. Te respondemos en menos de 24 horas hábiles con una primera lectura del problema y una propuesta de diagnóstico. La primera llamada no se cobra.", "Tell us the challenge. We reply within 24 business hours with a first read of the problem and a discovery proposal. The first call is free.")}
              </p>
              <a className="s2b-cline" style={{ textDecoration: "none" }} href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer"><Phone size={17} /> {WA_SHOW}</a>
              <div className="s2b-cline"><MapPin size={17} /> {t("Córdoba, Argentina · Miami, EE.UU. · trabajo remoto", "Córdoba, Argentina · Miami, USA · remote")}</div>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <Quote size={20} style={{ color: "var(--lilac)" }} />
                <span style={{ fontSize: 14, color: "#9E97C4" }}>{t("Respondemos todos los mensajes, también los que todavía no tienen presupuesto.", "We answer every message, including the ones that don't have a budget yet.")}</span>
              </div>
            </div>

            <div className="s2b-panel s2b-rv">
              {sent ? (
                <div>
                  <div className="s2b-sent"><Check size={20} /> {t("Mensaje enviado. Te respondemos a", "Message sent. We'll reply to")} {form.email}.</div>
                  <button className="s2b-btn" style={{ border: "1px solid rgba(167,140,255,.35)", color: "#fff" }} onClick={() => { setSent(false); setForm({ nombre: "", empresa: "", email: "", tel: "", tipo: "Agente de IA", msg: "" }); }}>
                    {t("Enviar otro", "Send another")}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="s2b-f"><label htmlFor="f1">{t("Nombre", "Name")}</label><input id="f1" value={form.nombre} onChange={set("nombre")} placeholder={t("Cómo te llamás", "Your name")} /></div>
                  <div className="s2b-f"><label htmlFor="f2">{t("Empresa", "Company")}</label><input id="f2" value={form.empresa} onChange={set("empresa")} placeholder={t("Dónde trabajás", "Where you work")} /></div>
                  <div className="s2b-f"><label htmlFor="f3">Email</label><input id="f3" type="email" value={form.email} onChange={set("email")} placeholder="tu@empresa.com" /></div>
                  <div className="s2b-f"><label htmlFor="f4">{t("Teléfono", "Phone")}</label><input id="f4" value={form.tel} onChange={set("tel")} placeholder="+54 9 ..." /></div>
                  <div className="s2b-f">
                    <label htmlFor="f5">{t("Qué necesitás", "What you need")}</label>
                    <select id="f5" value={form.tipo} onChange={set("tipo")}>
                      <option>{t("Agente de IA", "AI agent")}</option><option>{t("Software a medida", "Custom software")}</option><option>{t("App móvil", "Mobile app")}</option>
                      <option>{t("Diseño de producto", "Product design")}</option><option>{t("Automatización", "Automation")}</option><option>{t("Todavía no lo tengo claro", "Not sure yet")}</option>
                    </select>
                  </div>
                  <div className="s2b-f"><label htmlFor="f6">{t("Contexto", "Context")}</label><textarea id="f6" value={form.msg} onChange={set("msg")} placeholder={t("Qué problema querés resolver y en qué plazo", "What problem you need solved and by when")} /></div>
                  {formErr && (
                    <div className="s2b-formerr" role="alert">
                      {formErr}{" "}
                      <a href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer">{t("Abrir WhatsApp", "Open WhatsApp")}</a>
                    </div>
                  )}
                  <button
                    className="s2b-btn s2b-btn--chrome"
                    style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}
                    onClick={send}
                    disabled={sending}
                  >
                    {sending ? t("Enviando…", "Sending…") : t("Enviar mensaje", "Send message")} <ArrowUpRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="s2b-foot">
          <div className="s2b-wrap">
            <div className="s2b-foot-grid">
              <div>
                <div className="s2b-brand"><span className="s2b-mark-halo"><img className="s2b-mark" src="/logo.png" alt="" aria-hidden="true" /></span><div className="s2b-brand-txt">STUDIO B2B<small>PRODUCTO DIGITAL &amp; IA</small></div></div>
                <p style={{ fontSize: 14, color: "#9E97C4", marginTop: 16, maxWidth: "34ch" }}>
                  {t("Diseñamos y construimos software a medida y agentes de IA para empresas que necesitan que las cosas funcionen.", "We design and build custom software and AI agents for companies that need things to actually work.")}
                </p>
                <div className="s2b-social">
                  <a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a>
                  <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
                  <a href="#" aria-label="GitHub"><Github size={17} /></a>
                </div>
              </div>
              <div>
                <h5>{t("Soluciones", "Solutions")}</h5>
                <ul>
                  {SOLUCIONES.map((s) => <li key={s.id}><a href={"#servicios"} onClick={(e) => { e.preventDefault(); goTo("servicios"); }}>{s.t}</a></li>)}
                  <li><a href="#metodo" onClick={(e) => { e.preventDefault(); goTo("metodo"); }}>{t("Método Studio", "Studio Method")}</a></li>
                </ul>
              </div>
              <div>
                <h5>{t("Estudio", "Studio")}</h5>
                <ul>
                  <li><a href="#clientes" onClick={(e) => { e.preventDefault(); goTo("clientes"); }}>{t("Clientes", "Clients")}</a></li>
                  <li><a href="#contacto" onClick={(e) => { e.preventDefault(); goTo("contacto"); }}>{t("Trabajá con nosotros", "Work with us")}</a></li>
                </ul>
              </div>
              <div>
                <h5>{t("Contacto", "Contact")}</h5>
                <ul>
                  <li><a href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer">WhatsApp {WA_SHOW}</a></li>
                  <li>{t("Córdoba capital · Buenos Aires · toda Argentina", "Córdoba · Buenos Aires · all of Argentina")}</li>
                  <li>{t("Miami, Estados Unidos", "Miami, United States")}</li>
                </ul>
              </div>
            </div>
            <div className="s2b-foot-bot">
              <span>© {new Date().getFullYear()} Studio B2B · {t("Todos los derechos reservados", "All rights reserved")}</span>
            </div>
          </div>
        </footer>
      </div>

      <div className="s2b-lang" role="group" aria-label={t("Idioma", "Language")}>
        {IDIOMAS.map((i) => (
          <button key={i} className={idioma === i ? "is-on" : ""} aria-pressed={idioma === i} onClick={() => setIdioma(i)}>{i.toUpperCase()}</button>
        ))}
      </div>

      <WhatsAppBubble t={t} chips={WA_CHIPS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />
    </div>
  );
}
