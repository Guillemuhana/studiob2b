import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowUpRight, ArrowRight, ArrowLeft, ArrowDown, Sparkles, Code2, Bot, PenTool,
  Workflow, Smartphone, Plus, Minus, Menu, X, MapPin, Check, Database, Users,
  MessageSquare, FileSignature, Search, MonitorPlay, FileText, Wallet, Rocket, CircleDollarSign,
  Instagram, Linkedin, Github, ChevronDown, Phone, Quote,
  Building2, Lightbulb, Boxes, LayoutDashboard, Plug, Layers, Repeat,
  ClipboardList, FileSpreadsheet, ShoppingCart, CalendarCheck, Store,
  GraduationCap, Truck, CreditCard, ShieldCheck, Headphones, TrendingUp,
  Target, Palette, FlaskConical, Send, Sprout, Blocks,
  KeyRound, Network, Globe, Handshake,
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
@media (max-width: 820px) {
  .s2b-lang { top:auto; bottom:24px; transform:none; padding:4px; border-radius:0 14px 14px 0; }
  .s2b-lang button { font-size:10px; padding:7px 9px; }
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

.s2b-hero { padding: 92px 0 104px; position:relative; }
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
.s2b-lab, .s2b-neural, .s2b-hint {
  -webkit-user-select:none; user-select:none;
  -webkit-touch-callout:none;
  -webkit-tap-highlight-color:transparent;
}

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

.s2b-hero p { color:#BDB4E4; font-size: clamp(16px,1.7vw,19px); max-width:57ch; margin-top:26px;
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
/* arriba del mosaico: el titulo de un lado y las categorias del otro, en
   columna, como un menu. Abajo, los logos a lo ancho de todo el panel. */
.s2b-tech-top { display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(28px,4vw,56px); align-items:end; margin-bottom:38px; }
.s2b-tech-head { max-width:760px; }
.s2b-tech-lead { margin-top:16px; font-size:16.5px; color:var(--muted); max-width:600px; }

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
  position:relative; display:grid; gap:8px; width:100%; justify-self:end; max-width:380px;
}
.s2b-tab {
  padding:13px 18px; border-radius:14px; font-size:14.5px; font-weight:600; text-align:left;
  color:#C4BCE4; background:rgba(255,255,255,.055); border:1px solid rgba(167,140,255,.26);
  transition: background .25s, color .25s, border-color .25s, transform .25s;
}
.s2b-tab:hover { color:#EDE9FF; border-color:rgba(167,140,255,.4); transform:translateX(3px); }
.s2b-tab.is-on {
  background: linear-gradient(120deg,var(--violet),#4B2FD6); color:#fff;
  border-color:transparent; box-shadow:0 16px 34px -18px rgba(109,74,255,.95);
}

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

/* ==================================================================
   SECCIONES DEL HOME NUEVO
   Todo se escribe primero para el celular -que es de donde va a llegar
   la mayoria del trafico- y recien despues crece con min-width.
   ================================================================== */

/* ---------- linea de posicionamiento debajo del titular ---------- */
.s2b-kicker { display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:8px 12px;
  margin-top:22px; font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:#B5ACD8; }
.s2b-kicker i { width:4px; height:4px; border-radius:50%; background:rgba(167,140,255,.6); flex:none; }
.s2b-hero-pie { margin-top:22px; font-size:13.5px; color:#9E97C4; max-width:46ch;
  display:flex; align-items:center; gap:8px; justify-content:center; text-align:center; }
.s2b-hero-pie svg { flex:none; color:var(--lilac); }

/* ---------- las dos puertas: empresa o idea ---------- */
.s2b-puertas { display:grid; gap:16px; margin-top:44px; }
.s2b-puerta { position:relative; display:flex; flex-direction:column; text-align:left;
  padding:26px 22px; border-radius:24px; border:1px solid var(--line); background:var(--surface);
  box-shadow:0 24px 60px -46px rgba(24,12,60,.5); overflow:hidden;
  transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s, border-color .3s; }
.s2b-puerta::before { content:''; position:absolute; inset:0 0 auto; height:3px;
  background:linear-gradient(90deg,var(--violet),var(--lilac)); opacity:.9; }
.s2b-puerta:hover { transform:translateY(-4px); border-color:rgba(109,74,255,.34);
  box-shadow:0 34px 70px -40px rgba(24,12,60,.55); }
.s2b-puerta-ico { width:48px; height:48px; border-radius:15px; display:grid; place-items:center; color:#fff;
  background:linear-gradient(150deg,var(--violet),#3B2296); margin-bottom:18px;
  box-shadow:0 14px 30px -16px rgba(109,74,255,.9); }
.s2b-puerta-rot { font-family:var(--mono); font-size:10.5px; letter-spacing:.18em; text-transform:uppercase;
  color:var(--violet); margin-bottom:9px; }
.s2b-puerta h3 { font-size:clamp(20px,4.6vw,25px); line-height:1.2; margin-bottom:12px; }
.s2b-puerta > p { color:var(--muted); font-size:15px; }
.s2b-puerta-tags { display:flex; flex-wrap:wrap; gap:7px; margin:20px 0 24px; }
.s2b-puerta .s2b-btn { align-self:flex-start; margin-top:auto; }

/* ---------- los dolores de una empresa ---------- */
.s2b-dolores { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:36px; }
.s2b-dolor { display:flex; align-items:center; gap:10px; padding:14px 15px; border-radius:15px;
  border:1px solid var(--line); background:#fff; font-size:13.5px; color:var(--text); line-height:1.3;
  transition:border-color .25s, transform .25s; }
.s2b-dolor:hover { border-color:rgba(109,74,255,.3); transform:translateY(-2px); }
.s2b-dolor svg { flex:none; color:#B0A8CC; }

/* el embudo: lo disperso arriba, un solo sistema abajo */
.s2b-embudo { display:grid; justify-items:center; gap:14px; margin-top:38px; padding:28px 20px;
  border-radius:24px; border:1px solid var(--line); background:linear-gradient(180deg,#fff,var(--paper)); }
.s2b-embudo-fila { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; }
.s2b-embudo-fila span { font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase;
  color:var(--muted); background:var(--paper); border:1px solid var(--line); padding:8px 13px; border-radius:999px; }
.s2b-embudo-flecha { color:var(--violet); opacity:.6; }
.s2b-embudo-marca { display:inline-flex; align-items:center; gap:10px; padding:13px 22px; border-radius:999px;
  font-family:var(--display); font-weight:700; font-size:16px; letter-spacing:-.01em; color:#fff;
  background:linear-gradient(120deg,var(--violet),#3B2296); box-shadow:0 18px 40px -20px rgba(109,74,255,.95); }
.s2b-embudo-fin { font-family:var(--display); font-size:clamp(19px,4.4vw,26px); font-weight:600;
  letter-spacing:-.02em; color:var(--title); text-align:center; }

/* ---------- tengo una idea ---------- */
.s2b-idea-traes { display:grid; gap:9px; margin:24px 0 0; padding:0; list-style:none; }
.s2b-idea-traes li { display:flex; align-items:flex-start; gap:10px; font-size:15px; color:var(--text); }
.s2b-idea-traes svg { flex:none; margin-top:4px; color:var(--lilac); }

/* el recorrido de una idea: en el celular es una tira que se corre sola */
.s2b-ruta { display:flex; align-items:center; gap:8px; margin-top:34px; padding-bottom:6px;
  overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch;
  -webkit-mask-image:linear-gradient(90deg,#000 90%,transparent);
          mask-image:linear-gradient(90deg,#000 90%,transparent); }
.s2b-ruta::-webkit-scrollbar { display:none; }
.s2b-ruta b { flex:none; font-family:var(--mono); font-weight:500; font-size:11.5px; letter-spacing:.08em;
  text-transform:uppercase; padding:10px 15px; border-radius:999px; white-space:nowrap;
  color:#D8CDFF; background:rgba(255,255,255,.06); border:1px solid rgba(167,140,255,.26); }
.s2b-ruta b:last-child { color:#fff; background:linear-gradient(120deg,var(--violet),#3B2296); border-color:transparent; }
.s2b-ruta i { flex:none; color:rgba(167,140,255,.5); display:grid; place-items:center; }

/* ---------- grilla de tarjetas: que desarrollamos / por que nosotros ---------- */
.s2b-cards { display:grid; grid-template-columns:1fr; gap:12px; margin-top:40px; }
.s2b-card { padding:20px; border-radius:20px; border:1px solid var(--line); background:#fff;
  transition:transform .28s cubic-bezier(.2,.8,.2,1), border-color .28s, box-shadow .28s; }
.s2b-card:hover { transform:translateY(-4px); border-color:rgba(109,74,255,.3);
  box-shadow:0 26px 54px -40px rgba(24,12,60,.6); }
.s2b-card-ico { width:40px; height:40px; border-radius:13px; display:grid; place-items:center; margin-bottom:15px;
  color:var(--violet); background:rgba(109,74,255,.09); border:1px solid rgba(109,74,255,.14);
  transition:background .28s, color .28s; }
.s2b-card:hover .s2b-card-ico { color:#fff; background:linear-gradient(150deg,var(--violet),#3B2296); border-color:transparent; }
.s2b-card h3 { font-size:17px; margin-bottom:8px; letter-spacing:-.02em; }
.s2b-card p { font-size:14px; color:var(--muted); line-height:1.55; }

/* ---------- MVP ---------- */
.s2b-mvp { display:grid; gap:32px; margin-top:38px; }
.s2b-mvp-lista { display:grid; gap:10px; padding:0; margin:0; list-style:none; }
.s2b-mvp-lista li { display:flex; align-items:flex-start; gap:12px; padding:14px 16px; border-radius:15px;
  background:rgba(255,255,255,.05); border:1px solid rgba(167,140,255,.2); font-size:14.5px; color:#C9C2E6; }
.s2b-mvp-lista svg { flex:none; margin-top:2px; color:#8FF0B8; }

/* ---------- IA: los usos, en pastillas ---------- */
.s2b-usos { display:flex; flex-wrap:wrap; gap:8px; margin-top:26px; }
.s2b-uso { display:inline-flex; align-items:center; gap:8px; padding:9px 15px; border-radius:999px;
  font-size:13.5px; color:#D8CDFF; background:rgba(255,255,255,.06); border:1px solid rgba(167,140,255,.24);
  transition:background .25s, border-color .25s, transform .25s; }
.s2b-uso:hover { background:rgba(167,140,255,.16); border-color:rgba(167,140,255,.5); transform:translateY(-2px); }
.s2b-uso i { width:5px; height:5px; border-radius:50%; background:var(--lilac); flex:none; }

/* ---------- tipos de productos: mosaico visual ---------- */
.s2b-prods { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:40px; }
.s2b-prod { display:flex; flex-direction:column; align-items:flex-start; gap:11px; padding:17px 15px;
  border-radius:18px; border:1px solid var(--line); background:#fff;
  font-family:var(--display); font-weight:600; font-size:14px; letter-spacing:-.015em; color:var(--title);
  line-height:1.25; transition:transform .25s, border-color .25s, box-shadow .25s; }
.s2b-prod:hover { transform:translateY(-3px); border-color:rgba(109,74,255,.32);
  box-shadow:0 20px 44px -34px rgba(24,12,60,.6); }
.s2b-prod svg { color:var(--violet); flex:none; }

/* ---------- portfolio: casos reales ---------- */
.s2b-casos { display:grid; grid-template-columns:1fr; gap:18px; margin-top:44px; }
.s2b-caso { display:flex; flex-direction:column; border-radius:24px; overflow:hidden;
  border:1px solid var(--line); background:#fff; box-shadow:0 24px 60px -46px rgba(24,12,60,.5);
  transition:transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
.s2b-caso:hover { transform:translateY(-4px); box-shadow:0 34px 74px -42px rgba(24,12,60,.6); }
/* la parte de arriba: la captura del trabajo, o el logo cuando no hay captura */
.s2b-caso-vis { position:relative; display:grid; place-items:center; padding:22px 18px; min-height:150px;
  background:linear-gradient(150deg,#F0ECFF,#E4DCFF); overflow:hidden; }
.s2b-caso-vis .s2b-shot { width:100%; }
.s2b-caso-marca { display:grid; justify-items:center; gap:11px; padding:14px 20px; border-radius:18px;
  background:#fff; box-shadow:0 18px 40px -30px rgba(24,12,60,.7); }
.s2b-caso-marca img { height:56px; width:auto; max-width:190px; object-fit:contain; display:block; }
.s2b-caso-cuerpo { display:flex; flex-direction:column; gap:12px; padding:22px 20px 24px; flex:1; }
.s2b-caso-top { display:flex; align-items:baseline; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.s2b-caso-cuerpo h3 { font-size:19px; letter-spacing:-.02em; }
.s2b-caso-pais { display:inline-flex; align-items:center; gap:6px; white-space:nowrap;
  font-family:var(--mono); font-size:10px; letter-spacing:.11em; text-transform:uppercase; color:var(--muted); }
.s2b-caso-tipo { display:inline-flex; align-self:flex-start; font-family:var(--mono); font-size:10.5px;
  letter-spacing:.1em; text-transform:uppercase; color:var(--violet);
  background:rgba(109,74,255,.09); border:1px solid rgba(109,74,255,.16); padding:6px 12px; border-radius:999px; }
.s2b-caso-dato { display:grid; gap:4px; }
.s2b-caso-dato b { font-family:var(--mono); font-size:9.5px; letter-spacing:.15em; text-transform:uppercase;
  color:var(--muted); font-weight:400; }
.s2b-caso-dato p { font-size:14.2px; color:var(--text); line-height:1.55; }
.s2b-caso .s2b-chips { margin:6px 0 0; }

/* la voz del cliente adentro de su propio caso: la prueba llega junto con
   el trabajo, y no en un carrusel aparte que repite los mismos seis logos */
.s2b-caso-frase { display:flex; gap:9px; margin:4px 0 0; padding:14px 15px; border-radius:14px;
  background:var(--paper); border:1px solid var(--line); }
.s2b-caso-frase svg { flex:none; margin-top:3px; color:var(--lilac); }
.s2b-caso-frase p { font-size:13.6px; line-height:1.5; color:var(--title); font-style:italic; }
.s2b-caso-frase cite { display:block; margin-top:7px; font-style:normal; font-family:var(--mono);
  font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }

/* ---------- proceso resumido en el home ---------- */
.s2b-pasos { display:grid; grid-template-columns:1fr; gap:10px; margin-top:40px; }
.s2b-paso-mini { display:grid; grid-template-columns:auto 1fr; gap:15px; align-items:start;
  padding:17px 18px; border-radius:18px; border:1px solid var(--line); background:#fff;
  transition:border-color .25s, transform .25s; }
.s2b-paso-mini:hover { border-color:rgba(109,74,255,.3); transform:translateX(3px); }
.s2b-paso-mini-ico { width:38px; height:38px; border-radius:12px; display:grid; place-items:center; flex:none;
  color:var(--violet); background:rgba(109,74,255,.09); border:1px solid rgba(109,74,255,.14); }
.s2b-paso-mini .n { font-family:var(--mono); font-size:10.5px; letter-spacing:.14em; color:var(--violet); }
.s2b-paso-mini h4 { font-size:16.5px; margin:3px 0 5px; letter-spacing:-.02em; }
.s2b-paso-mini p { font-size:14px; color:var(--muted); line-height:1.5; }

/* ---------- cierre: la ultima llamada antes del formulario ---------- */
.s2b-cierre { display:grid; gap:20px; justify-items:center; text-align:center; }
.s2b-cierre-cta { display:flex; flex-wrap:wrap; gap:11px; justify-content:center; }

/* ---------- ajustes de celular ---------- */
@media (max-width: 640px) {
  /* El hero de celular se aprieta a proposito: alguien que entra desde una
     publicidad tiene que ver titular, subtitulo y los dos botones sin scrollear,
     y la red justo abajo. Cada margen de aca se midio contra esa pantalla. */
  .s2b-hero { padding-top:34px; padding-bottom:64px; }
  /* la pastilla dice lo mismo que la linea de posicionamiento: en el celular
     sobra una de las dos, y la que queda es la que esta al lado del titular */
  .s2b-hero .s2b-pill { display:none; }
  .s2b-sweep { margin-top:0; }
  .s2b-hero p { font-size:15.3px; margin-top:17px; }
  .s2b-kicker { margin-top:15px; }
  .s2b-hero-cta { margin-top:22px; }
  .s2b-hero-pie { margin-top:15px; }
  .s2b-lab { margin-top:24px; }
  /* dos botones a lo ancho entero: el pulgar no tiene que apuntar */
  .s2b-hero-cta { width:100%; gap:10px; }
  .s2b-hero-cta .s2b-btn { flex:1 0 100%; justify-content:center; }
  .s2b-kicker { font-size:10px; letter-spacing:.13em; gap:6px 9px; }
  .s2b-hero-pie { font-size:12.8px; }
  /* el titular de seccion no puede empujar la pantalla a lo ancho */
  .s2b-h2 { max-width:100%; }
  .s2b-puerta .s2b-btn { width:100%; justify-content:center; }
  .s2b-dolor { font-size:12.6px; padding:12px 12px; gap:8px; }
  .s2b-embudo { padding:22px 14px; }
  .s2b-embudo-fila span { font-size:10px; padding:7px 11px; }
  .s2b-prod { font-size:13px; padding:15px 13px; }
  .s2b-caso-cuerpo { padding:20px 17px 22px; }
  .s2b-caso-vis { padding:18px 14px; min-height:0; }
  .s2b-caso-marca img { height:46px; max-width:150px; }
}

/* ---------- de tablet para arriba ---------- */
@media (min-width: 700px) {
  .s2b-puertas { grid-template-columns:repeat(2,1fr); gap:20px; }
  .s2b-puerta { padding:34px 30px; }
  .s2b-dolores { grid-template-columns:repeat(4,1fr); gap:12px; }
  .s2b-cards { grid-template-columns:repeat(2,1fr); gap:14px; }
  .s2b-prods { grid-template-columns:repeat(4,1fr); }
  .s2b-casos { grid-template-columns:repeat(2,1fr); gap:20px; }
  .s2b-pasos { grid-template-columns:repeat(2,1fr); }
  .s2b-mvp { grid-template-columns:1.05fr .95fr; gap:44px; align-items:center; }
  .s2b-embudo { padding:36px; gap:16px; }
  .s2b-caso-vis { min-height:190px; padding:26px 22px; }
}
@media (min-width: 1000px) {
  .s2b-cards { grid-template-columns:repeat(3,1fr); }
  .s2b-casos { grid-template-columns:repeat(3,1fr); }
  .s2b-pasos { grid-template-columns:repeat(4,1fr); }
  /* los tres primeros casos son los que tienen captura: ocupan mas lugar */
  .s2b-caso--ancho { grid-column:span 1; }
}

/* ---------- responsive ---------- */
/* las pestanas no entran a lo ancho: pasan a ser una tira que se corre */
@media (max-width: 860px) {
  .s2b-tech-top { grid-template-columns:1fr; gap:26px; align-items:start; }
  .s2b-tech-tabs {
    display:flex; gap:8px; width:100%; max-width:100%; flex-wrap:nowrap; overflow-x:auto;
    scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch;
  }
  .s2b-tech-tabs::-webkit-scrollbar { display:none; }
  /* el degrade del borde avisa que la tira sigue */
  .s2b-tech-tabs {
    -webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);
            mask-image:linear-gradient(90deg,#000 88%,transparent);
  }
  .s2b-tab { white-space:nowrap; padding:10px 15px; font-size:13px; border-radius:999px; }
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

/* ==================================================================
   COMPOSICION 2.0
   El sitio dejo de ser una pila de tarjetas: cada seccion tiene su
   propia forma -bento, split, recorrido, escalera, riel- y el fondo
   se derrama de una a la otra en vez de cortarse con un borde.
   Nada de esto cambia contenido: cambia la composicion.
   ================================================================== */

.s2b {
  --r-btn: 13px;
  --r-card: 20px;
  --r-panel: 28px;
  --ink-2: #12092B;
  --paper-2: #EFEDF9;
}

/* ---------- ritmo: mas aire y menos cortes ---------- */
.s2b-sec { padding: clamp(84px, 9vw, 132px) 0; }
.s2b-sec--sm { padding: clamp(68px, 7vw, 104px) 0; }

/* el contenido de una banda va por encima del resplandor de la costura */
.s2b-band--dark > section,
.s2b-band--dark > footer,
.s2b-band--dark > div { position: relative; z-index: 1; }

/* La costura: en lugar de un borde, un resplandor violeta centrado justo en
   el limite entre dos secciones. El fondo se derrama de una a la otra. */
.s2b-band--dark::before,
.s2b-band--dark::after {
  content: ""; position: absolute; left: 50%; transform: translateX(-50%);
  width: min(1240px, 96%); height: 300px; pointer-events: none; z-index: 0;
  background: radial-gradient(58% 50% at 50% 50%, rgba(109,74,255,.30), transparent 72%);
  filter: blur(30px);
}
.s2b-band--dark::before { top: -150px; }
.s2b-band--dark::after  { bottom: -150px; }
/* la primera banda -nav + hero- no necesita costura arriba */
.s2b > .s2b-band--dark:first-of-type::before { display: none; }
/* entre dos bandas oscuras seguidas -contacto y footer- no hay nada que coser */
.s2b-band--dark + .s2b-band--dark::before { display: none; }

/* las secciones claras tampoco son blanco plano: llevan su propio ambiente */
.s2b-amb { position: relative; }
.s2b-amb > * { position: relative; z-index: 1; }
.s2b-amb::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(680px circle at 88% 4%, rgba(109,74,255,.07), transparent 62%),
    radial-gradient(560px circle at 4% 92%, rgba(167,140,255,.09), transparent 60%);
}
/* la reticula finita: da textura sin ensuciar */
.s2b-amb--grid::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: .5;
  background-image:
    linear-gradient(rgba(24,12,60,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24,12,60,.045) 1px, transparent 1px);
  background-size: 76px 76px;
  -webkit-mask-image: radial-gradient(78% 60% at 50% 46%, #000, transparent);
          mask-image: radial-gradient(78% 60% at 50% 46%, #000, transparent);
}
/* superficie intermedia: ni blanco ni oscuro, para romper la seguidilla clara */
.s2b-band--soft { background: linear-gradient(180deg, #FFFFFF 0%, var(--paper) 34%, var(--paper-2) 100%); }

/* ---------- titulos: mas escala, mas jerarquia ---------- */
.s2b-h2 { font-size: clamp(31px, 4.9vw, 56px); letter-spacing: -.035em; }

/* ---------- botones: menos pastilla, mas SaaS ---------- */
.s2b-btn { border-radius: var(--r-btn); padding: 13px 21px; font-size: 14.5px; letter-spacing: -.005em; }
.s2b-btn--primary {
  background: linear-gradient(180deg, #7E5EFF 0%, #6D4AFF 46%, #5432DE 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.26), 0 12px 26px -14px rgba(109,74,255,.9);
}
.s2b-btn--primary:hover { box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 18px 36px -14px rgba(109,74,255,1); }
.s2b-btn--chrome { background: linear-gradient(180deg,#FFFFFF,#EDEFF6 58%,#C9CEDD); color: #0F0A22;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 12px 28px -16px rgba(24,12,60,.6); }
/* el secundario: vidrio, no un borde suelto */
.s2b-btn--glass {
  color: #fff; background: rgba(255,255,255,.07); backdrop-filter: blur(10px);
  border: 1px solid rgba(167,140,255,.28);
  transition: background .25s, border-color .25s, transform .22s cubic-bezier(.2,.8,.2,1);
}
.s2b-btn--glass:hover { background: rgba(255,255,255,.13); border-color: rgba(167,140,255,.55); }
.s2b-btn--line { border-radius: var(--r-btn); }

/* ---------- nav flotante ---------- */
/* Antes se iba con el hero. Ahora acompana todo el recorrido: una pastilla de
   vidrio oscuro que se achica apenas al bajar. */
.s2b-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 80; background: none; box-shadow: none;
  transition: padding .35s cubic-bezier(.2,.7,.2,1); padding-top: 14px; }
.s2b-nav.is-stuck { background: none; box-shadow: none; backdrop-filter: none; padding-top: 8px; }
.s2b-nav-in { padding: 8px 10px; border-radius: 18px; border: 1px solid transparent;
  transition: background .35s, border-color .35s, box-shadow .35s, padding .35s; }
.s2b-nav.is-stuck .s2b-nav-in {
  background: rgba(11,7,24,.72); backdrop-filter: blur(20px) saturate(160%);
  border-color: rgba(167,140,255,.16);
  box-shadow: 0 20px 46px -26px rgba(11,7,24,.95), inset 0 1px 0 rgba(255,255,255,.06);
  padding: 6px 8px 6px 12px;
}
/* la marca se mantiene clara siempre: la pastilla ya es oscura */
.s2b-nav.is-stuck .s2b-menu button.top { color: #D6D0F2; }
.s2b-nav.is-stuck .s2b-menu button.top:hover { color: #fff; background: rgba(255,255,255,.1); }
.s2b-nav.is-stuck .s2b-brand-txt { color: #fff; font-size: 18px; }
.s2b-nav.is-stuck .s2b-brand-txt small { color: #9E97C4; }
.s2b-nav.is-stuck .s2b-burger { color: #fff; }
.s2b-nav .s2b-brand { --mark: 64px; }
.s2b-nav.is-stuck .s2b-brand { --mark: 50px; }
.s2b-nav.is-stuck .s2b-mark-halo::before { opacity: .28; }
/* el hueco que deja el nav fijo */
.s2b-navpad { height: 96px; }

/* el menu desplegable ya no es una caja blanca suelta */
.s2b-pop { background: rgba(16,10,38,.92); backdrop-filter: blur(20px) saturate(150%);
  border-color: rgba(167,140,255,.18); border-radius: 18px;
  box-shadow: 0 34px 80px -30px rgba(0,0,0,.8); }
.s2b-pop a:hover { background: rgba(167,140,255,.1); }
.s2b-pop b { color: #fff; }
.s2b-pop span { color: #9E97C4; }

/* ---------- hero ---------- */
.s2b-hero { padding: 40px 0 104px; }
.s2b-hero h1 { font-size: clamp(36px, 6.6vw, 88px); }

/* El hero no lleva paneles flotantes: la red neuronal ya es la pieza de
   producto de esta pantalla y cualquier cosa encima la tapa. Las barritas
   quedan porque las reusa el bento. */
.s2b-float-spark { display: flex; align-items: flex-end; gap: 3px; height: 32px; margin-top: 11px; }
.s2b-float-spark i { flex: 1; border-radius: 2px 2px 0 0; background: linear-gradient(180deg, #A78CFF, rgba(109,74,255,.18)); }

/* ==================================================================
   PIEZAS DE INTERFAZ REUTILIZABLES
   Un panel, un telefono y un diagrama de nodos, todos en CSS/SVG. Son
   las que le dan a cada seccion cara de producto y no de tarjeta.
   ================================================================== */

/* --- panel tipo dashboard --- */
.s2b-ui { border-radius: 16px; overflow: hidden; border: 1px solid rgba(167,140,255,.2);
  background: linear-gradient(168deg, rgba(23,14,58,.94), rgba(11,7,24,.96));
  box-shadow: 0 30px 64px -34px rgba(11,7,24,.9); }
.s2b-ui--claro { border-color: rgba(24,12,60,.09); background: #fff;
  box-shadow: 0 30px 64px -40px rgba(24,12,60,.5); }
.s2b-ui-bar { display: flex; align-items: center; gap: 6px; padding: 11px 13px;
  border-bottom: 1px solid rgba(167,140,255,.14); }
.s2b-ui--claro .s2b-ui-bar { border-bottom-color: rgba(24,12,60,.07); background: #FBFAFF; }
.s2b-ui-bar i { width: 8px; height: 8px; border-radius: 50%; background: rgba(167,140,255,.3); flex: none; }
.s2b-ui--claro .s2b-ui-bar i:nth-child(1) { background: #FF6058; }
.s2b-ui--claro .s2b-ui-bar i:nth-child(2) { background: #FFC02E; }
.s2b-ui--claro .s2b-ui-bar i:nth-child(3) { background: #2ACB42; }
.s2b-ui-bar b { margin-left: 8px; font-family: var(--mono); font-weight: 400; font-size: 10px;
  letter-spacing: .1em; text-transform: uppercase; color: #8C85AE; }
.s2b-ui--claro .s2b-ui-bar b { color: #9A93B8; }
.s2b-ui-body { padding: 15px 14px; display: grid; gap: 11px; }
.s2b-ui-kpis { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.s2b-ui-kpi { border-radius: 11px; padding: 10px 11px; background: rgba(167,140,255,.08);
  border: 1px solid rgba(167,140,255,.14); }
.s2b-ui--claro .s2b-ui-kpi { background: var(--paper); border-color: rgba(24,12,60,.06); }
.s2b-ui-kpi em { display: block; font-style: normal; font-family: var(--mono); font-size: 8.5px;
  letter-spacing: .13em; text-transform: uppercase; color: #8C85AE; }
.s2b-ui-kpi b { display: block; font-family: var(--display); font-size: 17px; color: #fff; margin-top: 3px; letter-spacing: -.02em; }
.s2b-ui--claro .s2b-ui-kpi b { color: var(--title); }
.s2b-ui-chart { display: flex; align-items: flex-end; gap: 5px; height: 74px; padding: 0 1px; }
.s2b-ui-chart i { flex: 1; border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, #A78CFF, rgba(109,74,255,.16));
  transform-origin: bottom; animation: s2b-grow .9s cubic-bezier(.2,.8,.2,1) backwards; }
@keyframes s2b-grow { from { transform: scaleY(.06); opacity: 0; } }
.s2b-ui-rows { display: grid; gap: 7px; }
.s2b-ui-row { display: grid; grid-template-columns: 18px 1fr auto; gap: 9px; align-items: center;
  padding: 8px 10px; border-radius: 10px; background: rgba(255,255,255,.045);
  border: 1px solid rgba(167,140,255,.1); font-size: 11.5px; color: #C9C2E6; }
.s2b-ui--claro .s2b-ui-row { background: var(--paper); border-color: rgba(24,12,60,.05); color: var(--text); }
.s2b-ui-row span:last-child { font-family: var(--mono); font-size: 9.5px; letter-spacing: .1em;
  text-transform: uppercase; color: #7FE3A8; }
.s2b-ui-row svg { color: #A78CFF; }

/* --- telefono --- */
.s2b-phone { position: relative; width: 234px; max-width: 100%; margin: 0 auto; border-radius: 34px; padding: 9px;
  background: linear-gradient(160deg, #2A1C60, #100A26);
  border: 1px solid rgba(167,140,255,.28);
  box-shadow: 0 44px 84px -38px rgba(11,7,24,.95), inset 0 1px 0 rgba(255,255,255,.1); }
.s2b-phone::before { content: ""; position: absolute; top: 17px; left: 50%; transform: translateX(-50%);
  width: 64px; height: 5px; border-radius: 999px; background: rgba(255,255,255,.16); z-index: 2; }
.s2b-phone-scr { border-radius: 26px; overflow: hidden; background: #0C0720; padding: 30px 13px 15px;
  display: grid; gap: 9px; min-height: 322px; align-content: start; }
.s2b-phone-t { font-family: var(--display); font-size: 15.5px; color: #fff; letter-spacing: -.02em; }
.s2b-phone-s { font-size: 10.5px; color: #8C85AE; font-family: var(--mono); letter-spacing: .1em; text-transform: uppercase; }
.s2b-phone-card { border-radius: 13px; padding: 11px 12px; background: rgba(255,255,255,.055);
  border: 1px solid rgba(167,140,255,.16); display: grid; gap: 6px; }
.s2b-phone-card b { font-family: var(--display); font-size: 12.5px; color: #EDE9FF; font-weight: 600; }
.s2b-phone-card i { display: block; height: 5px; border-radius: 999px; background: rgba(167,140,255,.24); }
.s2b-phone-card i.w2 { width: 64%; }
.s2b-phone-cta { margin-top: 3px; border-radius: 11px; padding: 10px; text-align: center;
  font-size: 12px; font-weight: 600; color: #fff;
  background: linear-gradient(180deg,#7E5EFF,#5432DE); box-shadow: 0 12px 26px -14px rgba(109,74,255,.95); }

/* --- diagrama de nodos --- */
.s2b-nodes { width: 100%; height: auto; display: block; overflow: visible; }
.s2b-nodes .lk { stroke: rgba(167,140,255,.42); stroke-width: 1.2; fill: none;
  stroke-dasharray: 5 7; animation: s2b-dash 2.6s linear infinite; }
@keyframes s2b-dash { to { stroke-dashoffset: -24; } }
.s2b-nodes .hub { fill: url(#s2bHub); }
.s2b-nodes .hub-ring { fill: none; stroke: rgba(167,140,255,.35); stroke-width: 1;
  transform-origin: center; animation: s2b-ring 3.4s ease-out infinite; }
@keyframes s2b-ring { 0% { transform: scale(.86); opacity: .8; } 70%,100% { transform: scale(1.34); opacity: 0; } }
.s2b-nodes .sat { fill: rgba(23,14,58,.95); stroke: rgba(167,140,255,.3); stroke-width: 1; }
.s2b-nodes .lbl { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 9px;
  letter-spacing: .1em; text-transform: uppercase; fill: #BDB4E4; }
.s2b-nodes .hub-lbl { font-family: "Space Grotesk", system-ui, sans-serif; font-size: 12px;
  font-weight: 700; letter-spacing: .04em; fill: #fff; }


/* ==================================================================
   DOS PUERTAS: pantalla partida
   Antes eran dos tarjetas iguales una al lado de la otra. Ahora es un
   solo panel partido al medio: la mitad de la empresa es oscura y
   tiene un tablero; la de la idea es clara y tiene un telefono.
   ================================================================== */
.s2b-doors { display: grid; margin-top: 48px; border-radius: var(--r-panel); overflow: hidden;
  border: 1px solid var(--line); box-shadow: 0 40px 90px -50px rgba(24,12,60,.55); }
.s2b-door { position: relative; display: grid; gap: 0; padding: clamp(26px,3.6vw,46px);
  text-align: left; overflow: hidden; }
/* el telefono adentro de la puerta va mas chico: la puerta no es el hero */
.s2b-door .s2b-phone { width: 202px; }
.s2b-door .s2b-phone-scr { min-height: 254px; }
.s2b-door-in { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }
/* el resplandor que se enciende al pasar por encima */
.s2b-door::after { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0;
  transition: opacity .5s; }
.s2b-door:hover::after { opacity: 1; }

.s2b-door--emp { background: linear-gradient(158deg, #1B1049 0%, #0B0718 72%);
  --title: #fff; --text: #C9C2E6; --muted: #9E97C4; color: var(--text); }
.s2b-door--emp::after { background: radial-gradient(70% 60% at 30% 12%, rgba(109,74,255,.4), transparent 68%); }
.s2b-door--emp .s2b-door-rot { color: var(--lilac); }
.s2b-door--emp .s2b-chip { background: rgba(255,255,255,.06); border-color: rgba(167,140,255,.22); color: #BDB4E4; }

.s2b-door--idea { background: linear-gradient(158deg, #FFFFFF 0%, var(--paper) 70%, #EDE9FC 100%); }
.s2b-door--idea::after { background: radial-gradient(70% 60% at 70% 12%, rgba(167,140,255,.24), transparent 68%); }
.s2b-door--idea .s2b-door-rot { color: var(--violet); }

.s2b-door-rot { display: inline-flex; align-items: center; gap: 9px; font-family: var(--mono); font-size: 10.5px;
  letter-spacing: .19em; text-transform: uppercase; margin-bottom: 16px; }
.s2b-door-rot::before { content: ""; width: 22px; height: 1px; background: currentColor; opacity: .5; }
.s2b-door h3 { font-size: clamp(21px,2.5vw,30px); line-height: 1.16; margin-bottom: 13px; max-width: 17ch; }
.s2b-door > .s2b-door-in > p { color: var(--muted); font-size: 15.3px; max-width: 42ch; }
.s2b-door-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 20px 0 26px; }
/* la pieza de interfaz que le pone cara a cada camino */
.s2b-door-vis { margin: 26px 0 28px; position: relative; }
.s2b-door-vis::before { content: ""; position: absolute; inset: -12% -6%; z-index: 0; pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgba(109,74,255,.22), transparent 70%); filter: blur(24px); }
.s2b-door-vis > * { position: relative; z-index: 1;
  transition: transform .55s cubic-bezier(.2,.8,.2,1); }
.s2b-door:hover .s2b-door-vis > * { transform: translateY(-7px); }
.s2b-door .s2b-btn { align-self: flex-start; margin-top: auto; }

/* ==================================================================
   DEL CAOS A UN SOLO SISTEMA
   Las herramientas sueltas flotan desordenadas de un lado; del otro,
   la operacion ordenada. En el medio, la marca. Es el mismo mensaje
   que antes estaba en ocho tarjetas iguales.
   ================================================================== */
.s2b-caos-grid { display: grid; gap: 22px; margin-top: 52px; align-items: center; }
.s2b-lado { position: relative; border-radius: var(--r-panel); padding: 26px 20px;
  min-height: 300px; display: grid; align-content: center; }
.s2b-lado-rot { position: absolute; top: 18px; left: 22px; font-family: var(--mono); font-size: 10px;
  letter-spacing: .2em; text-transform: uppercase; }

/* el lado desordenado */
.s2b-lado--caos { border: 1px dashed rgba(24,12,60,.16); background:
  radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,.9), var(--paper)); }
.s2b-lado--caos .s2b-lado-rot { color: #B0A8CC; }
.s2b-nube { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; padding-top: 18px; }
.s2b-nube span { display: inline-flex; align-items: center; gap: 8px; padding: 9px 13px; border-radius: 12px;
  background: #fff; border: 1px solid var(--line); font-size: 13px; color: var(--text); white-space: nowrap;
  box-shadow: 0 10px 22px -18px rgba(24,12,60,.7);
  animation: s2b-flota 6s ease-in-out infinite alternate; }
.s2b-nube span svg { color: #B0A8CC; flex: none; }
/* cada etiqueta se mueve un poco distinto: eso es lo que lee como desorden */
.s2b-nube span:nth-child(6n+1) { transform: rotate(-2.2deg); animation-duration: 6.4s; }
.s2b-nube span:nth-child(6n+2) { transform: rotate(1.6deg);  animation-duration: 7.2s; animation-delay: -1.1s; }
.s2b-nube span:nth-child(6n+3) { transform: rotate(-1deg);   animation-duration: 5.8s; animation-delay: -2.3s; }
.s2b-nube span:nth-child(6n+4) { transform: rotate(2.4deg);  animation-duration: 7.8s; animation-delay: -.6s; }
.s2b-nube span:nth-child(6n+5) { transform: rotate(-1.8deg); animation-duration: 6.9s; animation-delay: -3.1s; }
.s2b-nube span:nth-child(6n+6) { transform: rotate(1.1deg);  animation-duration: 8.2s; animation-delay: -1.8s; }
@keyframes s2b-flota { to { translate: 0 -8px; } }

/* el paso del medio */
.s2b-puente { display: grid; justify-items: center; gap: 12px; padding: 8px 0; }
.s2b-puente-flecha { color: var(--violet); opacity: .55; }
.s2b-puente-marca { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; border-radius: 15px;
  font-family: var(--display); font-weight: 700; font-size: 16px; letter-spacing: -.01em; color: #fff;
  background: linear-gradient(180deg, #7E5EFF, #4B2FD6);
  box-shadow: 0 20px 44px -18px rgba(109,74,255,.95), inset 0 1px 0 rgba(255,255,255,.28); }
.s2b-puente-marca img { width: 24px; height: 24px; object-fit: contain; }

/* el lado ordenado */
.s2b-lado--orden { border: 1px solid rgba(167,140,255,.22);
  background: linear-gradient(158deg, #1B1049 0%, #0B0718 76%);
  box-shadow: 0 40px 90px -50px rgba(11,7,24,.95); }
.s2b-lado--orden .s2b-lado-rot { color: var(--lilac); }
.s2b-orden-lista { display: grid; gap: 8px; padding: 16px 0 0; margin: 0; list-style: none; }
.s2b-orden-lista li { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center;
  padding: 11px 14px; border-radius: 12px; font-size: 13.5px; color: #C9C2E6;
  background: rgba(255,255,255,.05); border: 1px solid rgba(167,140,255,.14); }
.s2b-orden-lista em { display: inline-flex; align-items: center; gap: 6px; font-style: normal;
  font-family: var(--mono); font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase; color: #7FE3A8; }
.s2b-orden-fin { margin-top: 16px; font-family: var(--display); font-weight: 600; font-size: clamp(19px,2.2vw,25px);
  letter-spacing: -.025em; color: #fff; }

/* ==================================================================
   EL RECORRIDO DE UNA IDEA
   Un riel con nodos y una linea que se dibuja sola al entrar en
   pantalla. En el celular el mismo riel se pone de pie.
   ================================================================== */
.s2b-journey { position: relative; margin-top: 56px; }
.s2b-journey-track { position: relative; display: grid; gap: 16px; }
/* el riel de fondo y el que se pinta */
.s2b-journey::before, .s2b-journey::after { content: ""; position: absolute; pointer-events: none; }
.s2b-jstep { position: relative; display: grid; grid-template-columns: 40px 1fr; gap: 15px; align-items: center; }
.s2b-jnodo { position: relative; z-index: 2; width: 40px; height: 40px; border-radius: 50%; flex: none;
  display: grid; place-items: center; font-family: var(--mono); font-size: 11px;
  color: #C9B6FF; background: rgba(11,7,24,.94); border: 1px solid rgba(167,140,255,.3);
  transition: color .5s, background .5s, border-color .5s, box-shadow .5s; }
.s2b-jstep.is-in .s2b-jnodo { color: #fff; border-color: rgba(201,182,255,.75);
  background: linear-gradient(160deg,#7E5EFF,#3B2296);
  box-shadow: 0 0 0 5px rgba(109,74,255,.14), 0 14px 30px -14px rgba(109,74,255,.95); }
.s2b-jlbl { font-family: var(--display); font-weight: 600; font-size: 15.5px; color: #fff; letter-spacing: -.02em; }
/* el tramo vertical hacia el paso siguiente (celular) */
.s2b-jstep::before { content: ""; position: absolute; left: 20px; top: 40px; width: 2px; height: 16px;
  background: linear-gradient(180deg, rgba(167,140,255,.6), rgba(167,140,255,.14));
  transform: scaleY(0); transform-origin: top; transition: transform .6s cubic-bezier(.2,.7,.2,1) .1s; }
.s2b-jstep.is-in::before { transform: scaleY(1); }
.s2b-jstep:last-child::before { display: none; }

@media (min-width: 900px) {
  .s2b-journey-track { grid-auto-flow: column; grid-auto-columns: 1fr; gap: 0; }
  .s2b-jstep { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 14px; }
  .s2b-jlbl { font-size: 13.5px; max-width: 14ch; }
  /* ahora la linea es horizontal y cruza por detras de los nodos */
  .s2b-jstep::before { left: 50%; top: 20px; width: 100%; height: 2px; transform: scaleX(0);
    transform-origin: left center; transition: transform .7s cubic-bezier(.2,.7,.2,1) .1s;
    background: linear-gradient(90deg, rgba(167,140,255,.55), rgba(167,140,255,.18)); }
  .s2b-jstep.is-in::before { transform: scaleX(1); }
}

/* la idea, en dos columnas: el argumento y el telefono */
.s2b-idea-grid { display: grid; gap: 40px; align-items: center; }
@media (min-width: 900px) { .s2b-idea-grid { grid-template-columns: 1.08fr .92fr; gap: 56px; } }

/* ==================================================================
   MVP: la escalera del producto
   v0.1 -> lo importante -> feedback -> v0.2 -> escala. Cada peldano
   sube un poco, para que se lea como evolucion y no como lista.
   ================================================================== */
.s2b-ladder { display: grid; gap: 10px; margin-top: 8px; }
.s2b-rung { position: relative; display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: center;
  padding: 14px 17px; border-radius: 15px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(167,140,255,.18);
  transition: background .3s, border-color .3s, transform .3s cubic-bezier(.2,.8,.2,1); }
.s2b-rung:hover { background: rgba(255,255,255,.09); border-color: rgba(167,140,255,.42); }
.s2b-rung-v { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase;
  color: #C9B6FF; background: rgba(109,74,255,.2); border: 1px solid rgba(167,140,255,.26);
  padding: 6px 9px; border-radius: 9px; white-space: nowrap; }
.s2b-rung p { font-size: 14.5px; color: #C9C2E6; }
/* el ultimo peldano es el que llega arriba: se marca distinto */
.s2b-rung--top { background: linear-gradient(120deg, rgba(109,74,255,.26), rgba(167,140,255,.1));
  border-color: rgba(167,140,255,.5); }
.s2b-rung--top .s2b-rung-v { color: #fff; background: linear-gradient(150deg,#7E5EFF,#3B2296); border-color: transparent; }
.s2b-rung--top p { color: #fff; font-weight: 600; }
@media (min-width: 700px) {
  /* el escaloncito: cada peldano arranca un poco mas a la derecha */
  .s2b-rung { margin-left: calc(var(--i, 0) * 10px); }
}


/* ==================================================================
   QUE DESARROLLAMOS: bento
   Antes cada pieza de interfaz se "sangraba" contra el borde de abajo
   de su tarjeta: quedaba recortada al medio -el panel cortado en una
   fila, el telefono partido, la tira de pasos empujada afuera- y arriba
   sobraba un hueco enorme, porque la tarjeta se estiraba para igualar a
   su vecina y el grafico se iba al pie.
   Ahora: el grafico entra entero adentro de su caja, y las tarjetas
   anchas se abren en dos columnas -texto de un lado, grafico del otro-,
   que es lo que hace que la tarjeta mida lo que mide el grafico y no
   quede aire en el medio.
   ================================================================== */
.s2b-bento { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 48px;
  grid-auto-flow: dense; }

.s2b-bt { position: relative; overflow: hidden; display: flex; flex-direction: column;
  padding: 22px; border-radius: var(--r-card); background: #fff; border: 1px solid var(--line);
  box-shadow: 0 20px 46px -40px rgba(24,12,60,.5);
  transition: transform .3s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .3s; }
.s2b-bt:hover { transform: translateY(-4px); border-color: rgba(109,74,255,.3);
  box-shadow: 0 30px 62px -38px rgba(24,12,60,.6); }
.s2b-bt-txt { flex: none; }
.s2b-bt-ico { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; margin-bottom: 14px;
  color: var(--violet); background: rgba(109,74,255,.09); border: 1px solid rgba(109,74,255,.13);
  transition: background .3s, color .3s, border-color .3s; }
.s2b-bt:hover .s2b-bt-ico { color: #fff; background: linear-gradient(160deg,#7E5EFF,#3B2296); border-color: transparent; }
.s2b-bt h3 { font-size: 16.5px; letter-spacing: -.025em; margin-bottom: 7px; }
.s2b-bt p { font-size: 13.6px; color: var(--muted); line-height: 1.55; }

/* la pieza de interfaz: entera, centrada y adentro de la tarjeta */
.s2b-bt-vis { margin-top: 18px; flex: 1 1 auto; min-height: 0;
  display: flex; align-items: center; justify-content: center; }
.s2b-bt-vis .s2b-ui,
.s2b-bt-vis .s2b-flujo { width: 100%; }
.s2b-bt-vis .s2b-nodes { width: 100%; height: 152px; }
.s2b-bt-vis .s2b-phone { width: 178px; margin: 0; }
.s2b-bt-vis .s2b-phone-scr { min-height: 0; padding: 26px 11px 13px; gap: 8px; }
.s2b-bt-vis .s2b-float-spark { width: 100%; height: 104px; margin: 0; gap: 5px; }

/* las que se abren en dos columnas */
@media (min-width: 900px) {
  .s2b-bt--parte { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,3vw,42px); align-items: center; }
  .s2b-bt--parte .s2b-bt-vis { margin-top: 0; }
}

/* las destacadas: fondo con profundidad y un poco mas de aire */
.s2b-bt--feat { padding: 26px; background:
  radial-gradient(120% 110% at 12% 0%, #FFFFFF, #F7F5FF 46%, #EFEAFF 100%); }
.s2b-bt--feat h3 { font-size: clamp(18px, 1.9vw, 23px); margin-bottom: 9px; }
.s2b-bt--feat p { font-size: 14.4px; max-width: 42ch; }
/* las oscuras: rompen el bloque claro desde adentro */
.s2b-bt--dark { background: linear-gradient(158deg, #1B1049 0%, #0B0718 78%);
  border-color: rgba(167,140,255,.2); }
.s2b-bt--dark h3 { color: #fff; }
.s2b-bt--dark p { color: #A79EC8; }
.s2b-bt--dark .s2b-bt-ico { color: #D8CDFF; background: rgba(109,74,255,.24); border-color: rgba(167,140,255,.26); }
.s2b-bt--dark:hover { border-color: rgba(167,140,255,.5); }
.s2b-bt--dark:hover .s2b-bt-ico { background: linear-gradient(160deg,#8B6BFF,#4B2FD6); }

/* --- la automatizacion, paso por paso --- */
.s2b-flujo { display: grid; gap: 0; }
.s2b-flujo-paso { position: relative; display: grid; grid-template-columns: 30px 1fr; gap: 12px;
  align-items: center; padding: 9px 0; }
.s2b-flujo-paso i { position: relative; z-index: 1; width: 30px; height: 30px; border-radius: 10px;
  display: grid; place-items: center; font-family: var(--mono); font-size: 10px; font-style: normal;
  color: var(--violet); background: #fff; border: 1px solid rgba(109,74,255,.2); }
.s2b-flujo-paso span { font-size: 13px; color: var(--text); line-height: 1.35; }
/* el tramo que une un paso con el siguiente */
.s2b-flujo-paso::before { content: ""; position: absolute; left: 15px; top: 50%; bottom: -50%; width: 2px;
  background: linear-gradient(180deg, rgba(109,74,255,.35), rgba(109,74,255,.12)); }
.s2b-flujo-paso:last-child::before { display: none; }
.s2b-flujo-paso:last-child i { color: #fff; border-color: transparent;
  background: linear-gradient(160deg,#7E5EFF,#4B2FD6); }
.s2b-bt--dark .s2b-flujo-paso i { color: #D8CDFF; background: rgba(255,255,255,.06); border-color: rgba(167,140,255,.24); }
.s2b-bt--dark .s2b-flujo-paso span { color: #C9C2E6; }
.s2b-bt--dark .s2b-flujo-paso::before { background: linear-gradient(180deg, rgba(167,140,255,.4), rgba(167,140,255,.12)); }

/* --- anchos --- */
@media (min-width: 1060px) {
  .s2b-bento { grid-template-columns: repeat(6, 1fr); }
  .s2b-bt.w4 { grid-column: span 4; }
  .s2b-bt.w3 { grid-column: span 3; }
  .s2b-bt.w2 { grid-column: span 2; }
}
@media (min-width: 760px) and (max-width: 1059px) {
  .s2b-bento { grid-template-columns: repeat(4, 1fr); }
  .s2b-bt.w4 { grid-column: span 4; }
  .s2b-bt.w3, .s2b-bt.w2 { grid-column: span 2; }
}
@media (max-width: 759px) {
  /* en el celular las que llevan grafico ocupan el ancho entero -si no, el
     grafico no se lee- y las de texto van de a dos */
  .s2b-bt.w4, .s2b-bt.w3 { grid-column: span 2; }
  .s2b-bt.w2 { grid-column: span 1; }
  /* va despues y con el mismo peso que la regla de arriba, si no le gana
     ".s2b-bt.w2" y el grafico queda espachurrado en media columna */
  .s2b-bt.s2b-bt--convis { grid-column: span 2; }
  .s2b-bt { padding: 17px; }
  .s2b-bt h3 { font-size: 15px; }
  .s2b-bt p { font-size: 12.8px; }
  .s2b-bt-ico { width: 34px; height: 34px; border-radius: 10px; margin-bottom: 11px; }
}

/* ==================================================================
   IA: el nucleo y lo que toca
   ================================================================== */
.s2b-ia-col { display: grid; gap: 20px; align-content: start; }
.s2b-ia-nodos { position: relative; border-radius: var(--r-card); padding: 22px 18px 16px;
  background: radial-gradient(120% 100% at 50% 0%, rgba(109,74,255,.24), transparent 68%), rgba(9,6,20,.5);
  border: 1px solid rgba(167,140,255,.18); }
.s2b-ia-nodos-t { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
  color: #8C85AE; margin-bottom: 10px; text-align: center; }
/* el diagrama se ajusta al alto que le doy, no al ancho de la columna */
.s2b-ia-nodos .s2b-nodes { height: 212px; }
.s2b-bt-vis .s2b-nodes { height: 166px; }
.s2b-bt .s2b-phone { width: 168px; }
.s2b-bt .s2b-phone-scr { min-height: 186px; padding-top: 26px; }

/* ==================================================================
   QUE PODEMOS CREAR: dos tiras que corren
   Dieciseis productos que eran dieciseis cuadraditos. Ahora pasan,
   como el logo de un cliente: ocupan poco y se leen de un vistazo.
   ================================================================== */
.s2b-tiras { display: grid; gap: 12px; margin-top: 44px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent); }
.s2b-tira { display: flex; gap: 12px; width: max-content; }
.s2b-tira--a { animation: s2b-tira-izq 52s linear infinite; }
.s2b-tira--b { animation: s2b-tira-der 58s linear infinite; }
.s2b-tiras:hover .s2b-tira { animation-play-state: paused; }
@keyframes s2b-tira-izq { to { transform: translateX(-50%); } }
@keyframes s2b-tira-der { from { transform: translateX(-50%); } to { transform: none; } }
.s2b-tira span { display: inline-flex; align-items: center; gap: 10px; flex: none; white-space: nowrap;
  padding: 13px 19px; border-radius: 14px; background: #fff; border: 1px solid var(--line);
  font-family: var(--display); font-weight: 600; font-size: 14.5px; letter-spacing: -.015em; color: var(--title);
  box-shadow: 0 14px 30px -26px rgba(24,12,60,.6);
  transition: border-color .25s, color .25s, box-shadow .25s; }
.s2b-tira span svg { color: var(--violet); flex: none; }
.s2b-tira span:hover { border-color: rgba(109,74,255,.4); box-shadow: 0 18px 36px -22px rgba(109,74,255,.6); }

/* ==================================================================
   PORTFOLIO: cada trabajo, un caso
   Filas grandes que alternan lado. La captura entra en su ventana de
   navegador y el texto respira al costado.
   ================================================================== */
.s2b-cases { display: grid; gap: clamp(52px, 6vw, 88px); margin-top: 56px; }
.s2b-case { display: grid; gap: 32px; align-items: center; }
.s2b-case-vis { position: relative; }
.s2b-case-vis::before { content: ""; position: absolute; inset: 4% -4%; z-index: 0; pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgba(109,74,255,.2), transparent 70%); filter: blur(28px); }
.s2b-case-vis .s2b-shot { width: 100%; z-index: 1; }
.s2b-case-n { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; color: var(--violet); }
.s2b-case-top { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin: 12px 0 6px; }
.s2b-case h3 { font-size: clamp(24px, 3vw, 36px); letter-spacing: -.035em; }
.s2b-case-pais { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.s2b-case-tipo { display: inline-flex; align-self: flex-start; font-family: var(--mono); font-size: 10.5px;
  letter-spacing: .1em; text-transform: uppercase; color: var(--violet);
  background: rgba(109,74,255,.08); border: 1px solid rgba(109,74,255,.16); padding: 6px 12px; border-radius: 999px; }
/* antes / despues, uno debajo del otro, con la linea del medio */
.s2b-case-datos { display: grid; gap: 0; margin: 22px 0 18px; }
.s2b-case-dato { display: grid; gap: 5px; padding: 16px 0; border-top: 1px solid var(--line); }
.s2b-case-dato:last-child { border-bottom: 1px solid var(--line); }
.s2b-case-dato b { font-family: var(--mono); font-size: 9.5px; letter-spacing: .16em; text-transform: uppercase;
  color: var(--muted); font-weight: 400; }
.s2b-case-dato p { font-size: 15px; color: var(--text); line-height: 1.6; max-width: 52ch; }
.s2b-case-frase { display: flex; gap: 11px; margin-top: 20px; }
.s2b-case-frase svg { flex: none; margin-top: 4px; color: var(--lilac); }
.s2b-case-frase p { font-family: var(--display); font-size: 16.5px; line-height: 1.45; letter-spacing: -.02em;
  color: var(--title); }
.s2b-case-frase cite { display: block; margin-top: 8px; font-style: normal; font-family: var(--mono);
  font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
@media (min-width: 940px) {
  .s2b-case { grid-template-columns: 1.06fr .94fr; gap: clamp(40px, 5vw, 72px); }
  /* la segunda, la cuarta... cambian de lado */
  .s2b-case:nth-child(even) .s2b-case-vis { order: 2; }
}
/* los trabajos que no tienen captura: una fila mas tranquila, con el logo */
.s2b-mas { display: grid; gap: 14px; margin-top: clamp(52px, 6vw, 80px); }
.s2b-mas-t { font-family: var(--mono); font-size: 10.5px; letter-spacing: .2em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 4px; }
.s2b-mini { display: grid; gap: 14px; padding: 22px; border-radius: var(--r-card);
  background: #fff; border: 1px solid var(--line); align-content: start;
  box-shadow: 0 20px 46px -42px rgba(24,12,60,.5);
  transition: transform .3s cubic-bezier(.2,.8,.2,1), border-color .3s; }
.s2b-mini:hover { transform: translateY(-4px); border-color: rgba(109,74,255,.28); }
.s2b-mini-logo { height: 48px; display: flex; align-items: center; }
.s2b-mini-logo img { max-height: 100%; width: auto; max-width: 165px; object-fit: contain; }
.s2b-mas-grid { display: grid; gap: 14px; }
.s2b-mini h4 { font-size: 17px; letter-spacing: -.025em; }
.s2b-mini p { font-size: 13.8px; color: var(--muted); line-height: 1.55; }
.s2b-mini-pie { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
@media (min-width: 760px) { .s2b-mas-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; } }

/* ==================================================================
   METODO: el riel de siete etapas
   ================================================================== */
.s2b-riel { display: grid; gap: 14px; margin-top: 52px; }
.s2b-etapa { position: relative; display: grid; grid-template-columns: 44px 1fr; gap: 16px; align-items: start; }
.s2b-etapa-nodo { position: relative; z-index: 2; width: 44px; height: 44px; border-radius: 14px; flex: none;
  display: grid; place-items: center; color: var(--violet);
  background: #fff; border: 1px solid var(--line);
  box-shadow: 0 12px 26px -20px rgba(24,12,60,.6);
  transition: color .5s, background .5s, border-color .5s, box-shadow .5s; }
.s2b-etapa.is-in .s2b-etapa-nodo { color: #fff; border-color: transparent;
  background: linear-gradient(160deg,#7E5EFF,#4B2FD6);
  box-shadow: 0 0 0 5px rgba(109,74,255,.1), 0 16px 32px -16px rgba(109,74,255,.85); }
.s2b-etapa .n { font-family: var(--mono); font-size: 10.5px; letter-spacing: .16em; color: var(--violet); }
.s2b-etapa h4 { font-size: 16.5px; margin: 4px 0 6px; letter-spacing: -.025em; }
.s2b-etapa p { font-size: 13.8px; color: var(--muted); line-height: 1.55; max-width: 38ch; }
/* el tramo que une una etapa con la siguiente */
.s2b-etapa::before { content: ""; position: absolute; left: 22px; top: 44px; width: 2px; bottom: -14px;
  background: linear-gradient(180deg, rgba(109,74,255,.45), rgba(109,74,255,.12));
  transform: scaleY(0); transform-origin: top; transition: transform .7s cubic-bezier(.2,.7,.2,1) .1s; }
.s2b-etapa.is-in::before { transform: scaleY(1); }
.s2b-etapa:last-child::before { display: none; }
@media (min-width: 1000px) {
  .s2b-riel { grid-auto-flow: column; grid-auto-columns: 1fr; gap: 20px; }
  .s2b-etapa { grid-template-columns: 1fr; gap: 14px; }
  .s2b-etapa::before { left: 22px; top: 21px; width: calc(100% + 20px); height: 2px; bottom: auto;
    transform: scaleX(0); transform-origin: left center;
    background: linear-gradient(90deg, rgba(109,74,255,.42), rgba(109,74,255,.1)); }
  .s2b-etapa.is-in::before { transform: scaleX(1); }
  .s2b-etapa p { font-size: 13px; max-width: none; }
}

/* ==================================================================
   POR QUE STUDIO B2B: editorial, no tarjetas
   El titulo se queda quieto de un lado mientras del otro pasan las
   seis razones, separadas por un filete y nada mas.
   ================================================================== */
.s2b-porque { display: grid; gap: 40px; margin-top: 8px; }
.s2b-porque-lista { display: grid; }
.s2b-razon { display: grid; grid-template-columns: 40px 1fr; gap: 16px; align-items: start;
  padding: 22px 0; border-top: 1px solid var(--line); transition: padding-left .32s cubic-bezier(.2,.8,.2,1); }
.s2b-razon:last-child { border-bottom: 1px solid var(--line); }
.s2b-razon:hover { padding-left: 10px; }
.s2b-razon-ico { width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center; flex: none;
  color: var(--violet); background: rgba(109,74,255,.08); border: 1px solid rgba(109,74,255,.12);
  transition: color .3s, background .3s, border-color .3s; }
.s2b-razon:hover .s2b-razon-ico { color: #fff; background: linear-gradient(160deg,#7E5EFF,#3B2296); border-color: transparent; }
.s2b-razon h3 { font-size: 18px; letter-spacing: -.025em; margin-bottom: 6px; }
.s2b-razon p { font-size: 14.6px; color: var(--muted); line-height: 1.6; max-width: 54ch; }
@media (min-width: 940px) {
  .s2b-porque { grid-template-columns: .82fr 1.18fr; gap: 64px; align-items: start; }
  .s2b-porque-head { position: sticky; top: 128px; }
}

/* ==================================================================
   AJUSTES POR ANCHO
   ================================================================== */
@media (min-width: 900px) {
  .s2b-doors { grid-template-columns: 1fr 1fr; }
  .s2b-caos-grid { grid-template-columns: 1fr auto 1fr; gap: 26px; }
  .s2b-puente { padding: 0 4px; }
  /* de costado el recorrido va de izquierda a derecha, no hacia abajo */
  .s2b-puente-flecha { transform: rotate(-90deg); }
}
@media (max-width: 899px) {
  /* el puente se acuesta: caos arriba, marca en el medio, orden abajo */
  .s2b-puente { padding: 4px 0; }
  .s2b-doors { border-radius: var(--r-card); }
}
@media (max-width: 640px) {
  .s2b-hero { padding-top: 12px; padding-bottom: 60px; }
  .s2b-nav { padding-top: 10px; }
  .s2b-lado { min-height: 0; padding: 44px 16px 22px; }
  .s2b-nube span { font-size: 12.2px; padding: 8px 11px; gap: 7px; }
  .s2b-orden-lista li { font-size: 12.6px; padding: 10px 12px; }
  .s2b-tira span { font-size: 13px; padding: 11px 15px; }
  .s2b-case-dato p { font-size: 14.2px; }
  .s2b-case-frase p { font-size: 15px; }
  .s2b-door { padding: 24px 20px; }
  .s2b-phone { width: 208px; }
  .s2b-phone-scr { min-height: 292px; }
}
@media (max-width: 820px) {
  .s2b-navpad { height: 78px; }
}

/* nada de esto se mueve si el visitante pidio menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .s2b-nube span, .s2b-tira, .s2b-nodes .lk, .s2b-nodes .hub-ring { animation: none !important; }
  .s2b-jstep::before, .s2b-etapa::before { transform: none !important; }
}


/* ==================================================================
   ARREGLO DE FONDO: el reset le estaba ganando a los botones
   Arriba de todo vive .s2b button { background:none; color:inherit;
   border:none }. Esa regla pesa mas -una clase y un tipo- que
   cualquier clase suelta como .s2b-btn--chrome, asi que el navegador
   le hacia caso al reset y no a la clase: los botones principales
   salian transparentes, con el color del texto de al lado y sin borde.
   Lo unico que se veia era la sombra, que el reset no toca, y por eso
   parecian contornos vacios.
   Se arregla subiendoles el peso -".s2b" adelante- a las clases que
   de verdad pintan. Mismo diseno, ahora aplicado.
   ================================================================== */
.s2b .s2b-btn--primary {
  color: #fff;
  background: linear-gradient(180deg, #7E5EFF 0%, #6D4AFF 46%, #5432DE 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.26), 0 12px 26px -14px rgba(109,74,255,.9);
}
.s2b .s2b-btn--primary:hover { box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 18px 36px -14px rgba(109,74,255,1); }

.s2b .s2b-btn--chrome {
  color: #0F0A22;
  background: linear-gradient(180deg, #FFFFFF, #EDEFF6 58%, #C9CEDD);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 12px 28px -16px rgba(24,12,60,.6);
}

.s2b .s2b-btn--glass {
  color: #fff; background: rgba(255,255,255,.07); backdrop-filter: blur(10px);
  border: 1px solid rgba(167,140,255,.28);
}
.s2b .s2b-btn--glass:hover { background: rgba(255,255,255,.13); border-color: rgba(167,140,255,.55); }

.s2b .s2b-btn--line { border: 1px solid var(--line); color: var(--title); background: var(--surface); }
.s2b .s2b-btn--line:hover { border-color: var(--violet); }

/* los links con flecha volvieron a ser violetas -y lilas sobre oscuro- */
.s2b .s2b-link { color: var(--violet); }
.s2b .s2b-band--dark .s2b-link,
.s2b .s2b-tech-panel .s2b-link { color: var(--lilac); }

/* la pregunta de una FAQ es un titulo, no texto corrido */
.s2b .s2b-fq { color: var(--title); }

/* las pestanas del stack: la apagada tambien tiene fondo y borde */
.s2b .s2b-tab {
  color: #C4BCE4; background: rgba(255,255,255,.055); border: 1px solid rgba(167,140,255,.26);
}
.s2b .s2b-tab:hover { color: #EDE9FF; border-color: rgba(167,140,255,.4); }
.s2b .s2b-tab.is-on {
  color: #fff; background: linear-gradient(120deg, var(--violet), #4B2FD6);
  border-color: transparent; box-shadow: 0 16px 34px -18px rgba(109,74,255,.95);
}

/* la burbuja de WhatsApp estaba saliendo hueca: solo se veia el anillo */
.s2b .s2b-wa-fab {
  color: #fff; background: linear-gradient(150deg, #4AE083, #1FA855 62%, #128C7E);
  box-shadow: 0 14px 34px -10px rgba(18,140,126,.75), inset 0 1px 0 rgba(255,255,255,.35);
}
.s2b .s2b-wa-fab:hover {
  box-shadow: 0 20px 44px -12px rgba(18,140,126,.9), inset 0 1px 0 rgba(255,255,255,.35);
}
.s2b .s2b-wa-cta { color: #fff; background: linear-gradient(140deg, #1FA855, #128C7E); }
.s2b .s2b-wa-x { color: rgba(255,255,255,.85); }
.s2b .s2b-wa-x:hover { color: #fff; background: rgba(255,255,255,.2); }

/* el boton de menu del celular, blanco sobre el hero */
.s2b .s2b-burger { color: #fff; }
.s2b .s2b-nav.is-stuck .s2b-burger { color: #fff; }

/* ==================================================================
   Y el ultimo detalle del hero: al achicar el aire de arriba, la
   pastilla se le subia encima al rotulo de la red. Le devolvemos el
   lugar justo -ni el hueco de antes, ni el choque-.
   ================================================================== */
.s2b-hero { padding-top: 78px; }
@media (max-width: 820px) { .s2b-hero { padding-top: 30px; } }
@media (max-width: 640px) { .s2b-hero { padding-top: 14px; } }


/* ==================================================================
   /PROCESO COMO PAGINA DE PUBLICIDAD
   Es el link que va en el anuncio: quien llega tiene que entender de
   que se trata y poder escribirnos sin leerse los siete pasos.
   ================================================================== */

/* el paso siguiente, arriba de todo */
.s2b-arranque {
  display: grid; gap: 22px; align-items: center; margin-top: 38px;
  padding: 24px 26px; border-radius: var(--r-panel);
  background: rgba(255,255,255,.05); border: 1px solid rgba(167,140,255,.2);
  backdrop-filter: blur(10px);
}
.s2b-arranque .s2b-btn { justify-self: start; }
.s2b-promesas { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
.s2b-promesas li { display: flex; align-items: flex-start; gap: 9px; font-size: 14.2px; color: #C9C2E6; line-height: 1.45; }
.s2b-promesas svg { flex: none; margin-top: 3px; color: #8FF0B8; }
@media (min-width: 860px) {
  .s2b-arranque { grid-template-columns: auto 1fr; gap: 34px; padding: 26px 30px; }
  .s2b-promesas { grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .s2b-promesas li { font-size: 13.4px; }
}
@media (max-width: 640px) {
  .s2b-arranque { padding: 20px; gap: 18px; margin-top: 30px; }
  .s2b-arranque .s2b-btn { justify-self: stretch; justify-content: center; }
}

/* la barra de abajo: solo en el celular, donde el formulario queda lejos */
.s2b-barra {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 91; display: none;
  align-items: center; justify-content: space-between; gap: 14px;
  padding: 11px 14px calc(11px + env(safe-area-inset-bottom, 0px));
  background: rgba(11,7,24,.9); backdrop-filter: blur(18px) saturate(160%);
  border-top: 1px solid rgba(167,140,255,.18);
  box-shadow: 0 -18px 40px -24px rgba(0,0,0,.9);
  transform: translateY(110%); transition: transform .38s cubic-bezier(.2,.8,.2,1);
}
.s2b-barra.is-shown { transform: none; }
.s2b-barra-txt { display: grid; gap: 2px; min-width: 0; }
.s2b-barra-txt b { font-family: var(--display); font-size: 14.5px; color: #fff; letter-spacing: -.02em; }
.s2b-barra-txt span { font-size: 11.5px; color: #9E97C4; }
.s2b-barra .s2b-btn { flex: none; padding: 11px 16px; font-size: 13.5px; }
@media (max-width: 820px) { .s2b-barra { display: flex; } }
/* mientras la barra esta puesta, la burbuja de WhatsApp se corre para arriba */
.s2b-wa--alto { bottom: 88px; }
/* y el cambio de idioma, que en el celular vive abajo a la izquierda */
@media (max-width: 820px) { .s2b-lang--alto { bottom: 98px; } }

/* ==================================================================
   FORMULARIO: menos campos a la vista
   ================================================================== */
.s2b-mas-datos {
  display: inline-flex; align-items: center; gap: 9px; margin: 2px 0 16px;
  font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  color: #C9B6FF; padding: 10px 14px; border-radius: 11px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(167,140,255,.22);
  transition: background .25s, border-color .25s, color .25s;
}
.s2b-mas-datos:hover { color: #fff; background: rgba(167,140,255,.14); border-color: rgba(167,140,255,.45); }
.s2b-detalle { animation: s2b-detalle-in .32s cubic-bezier(.2,.8,.2,1); }
@keyframes s2b-detalle-in { from { opacity: 0; transform: translateY(-6px); } }

/* ==================================================================
   LOS TRABAJOS SIN CAPTURA: el logo manda
   Venian con el logo a 48px, perdido arriba de un bloque de texto.
   Ahora tiene su propio panel, con luz propia y tamano de verdad.
   ================================================================== */
.s2b-mini { display: grid; gap: 0; padding: 0; overflow: hidden; align-content: start; }
.s2b-mini-logo {
  display: grid; place-items: center; padding: 30px 24px; min-height: 158px; height: auto;
  background: radial-gradient(130% 105% at 50% 0%, #FFFFFF 0%, #F5F2FF 52%, #E9E3FF 100%);
  border-bottom: 1px solid var(--line);
}
.s2b-mini-logo img {
  max-height: 84px; width: auto; max-width: min(215px, 100%); object-fit: contain;
  transition: transform .45s cubic-bezier(.2,.8,.2,1);
}
.s2b-mini:hover .s2b-mini-logo img { transform: scale(1.055); }
.s2b-mini-cuerpo { display: grid; gap: 11px; padding: 22px 22px 24px; align-content: start; }
.s2b-mini-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.s2b-mini h4 { font-size: 18px; letter-spacing: -.028em; }
.s2b-mini p { font-size: 13.8px; color: var(--muted); line-height: 1.55; }
.s2b-mini-frase { display: flex; gap: 9px; margin: 3px 0 0; padding: 13px 14px; border-radius: 13px;
  background: var(--paper); border: 1px solid var(--line); }
.s2b-mini-frase svg { flex: none; margin-top: 3px; color: var(--lilac); }
.s2b-mini-frase p { font-size: 13.2px; line-height: 1.5; color: var(--title); font-style: italic; }
.s2b-mini-frase cite { display: block; margin-top: 6px; font-style: normal; font-family: var(--mono);
  font-size: 9.5px; letter-spacing: .11em; text-transform: uppercase; color: var(--muted); }
@media (max-width: 640px) {
  .s2b-mini-logo { min-height: 132px; padding: 24px 20px; }
  .s2b-mini-logo img { max-height: 70px; }
  .s2b-mini-cuerpo { padding: 20px 18px 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .s2b-barra { transition: none !important; }
  .s2b-detalle { animation: none !important; }
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
  { n: "Nuevo Munich", src: "/clientes/nuevo-munich.png", pais: t("Argentina", "Argentina"), bandera: "ar" },
  { n: "Numera", src: "/clientes/logonumera.jpg", pais: t("Uruguay", "Uruguay"), bandera: "uy" },
  { n: "IPIC SMO", src: "/clientes/ipicsmo.png", esc: 1.2, pais: t("Estados Unidos", "United States"), bandera: "us" },
  { n: "Instituto de Investigaciones Cl\u00ednicas", src: "/clientes/IICC.png", esc: 1.1, pais: t("C\u00f3rdoba, Argentina", "C\u00f3rdoba, Argentina"), bandera: "ar" },
  { n: "Pecifa Nacional", src: "/clientes/pecifa.png", esc: 1.3, pais: t("Argentina", "Argentina"), bandera: "ar" },
  { n: "Ninit Group", src: "/clientes/ninit-group.png", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us" },
  { n: "Escuadra Builders Group", src: "/clientes/escuadra.svg", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us" },
];


/* ==================================================================
   Los dos caminos que tiene que reconocer alguien que llega de una
   publicidad: "tengo una empresa" o "tengo una idea". Todo el home se
   ordena alrededor de esa bifurcacion.
   ================================================================== */
const ayuda = (t) => [
  {
    id: "empresas", ic: Building2,
    rot: t("Para empresas", "For businesses"),
    tt: t("Software diseñado alrededor de tu negocio.", "Software built around your business."),
    d: t("Creamos sistemas personalizados para reemplazar procesos manuales, planillas de Excel, WhatsApp y herramientas desconectadas.", "We build custom systems to replace manual processes, spreadsheets and disconnected tools."),
    tags: ["CRM", t("Presupuestos", "Quotes"), t("Clientes", "Clients"), t("Inventario", "Inventory"), t("Ventas", "Sales"), t("Automatización", "Automation"), t("IA", "AI"), "Dashboards"],
    cta: t("Quiero mejorar mi empresa", "Improve my business"), to: "empresas",
  },
  {
    id: "idea", ic: Lightbulb,
    rot: t("Tengo una idea", "I have an idea"),
    tt: t("Convertí tu idea en un producto real.", "Turn your idea into a real product."),
    d: t("Te acompañamos desde la definición de la idea hasta el diseño, el desarrollo y el lanzamiento.", "We help from concept and strategy through design, development and launch."),
    tags: ["Mobile App", "Web App", "Marketplace", "SaaS", "MVP", "Platform", "AI App"],
    cta: t("Quiero desarrollar mi idea", "Build my idea"), to: "idea",
  },
];

/* Lo que hoy le duele al dueño de una empresa. Son sintomas, no promesas:
   cada uno lo reconoce en su propia operacion. */
const dolores = (t) => [
  { ic: FileSpreadsheet, t: "Excel" },
  { ic: MessageSquare, t: "WhatsApp" },
  { ic: FileText, t: t("Presupuestos manuales", "Manual quotes") },
  { ic: Users, t: t("Clientes sin seguimiento", "No client follow-up") },
  { ic: Boxes, t: t("Inventario desordenado", "Messy inventory") },
  { ic: Repeat, t: t("Tareas repetitivas", "Repetitive tasks") },
  { ic: Layers, t: t("Información dispersa", "Scattered information") },
  { ic: ClipboardList, t: t("Procesos manuales", "Manual processes") },
];

const dispersos = (t) => ["Excel", "WhatsApp", "Email", t("Papel", "Paper"), t("Sistemas sueltos", "Disconnected tools")];

/* Con que puede venir alguien que tiene una idea. La lista existe para sacarle
   la presion de encima: no hace falta traer todo resuelto. */
const ideaEntradas = (t) => [
  t("una idea", "an idea"),
  t("un boceto", "a sketch"),
  t("una necesidad", "a need"),
  t("un modelo de negocio", "a business model"),
  t("una app que querés mejorar", "an app you want to improve"),
  t("un problema que querés resolver", "a problem you want to solve"),
];

const ideaFlujo = (t) => [
  t("Idea", "Idea"), t("Validación", "Validation"), "MVP", t("Diseño UX/UI", "UX/UI design"),
  t("Desarrollo", "Development"), t("Lanzamiento", "Launch"), t("Evolución", "Growth"),
];

/* Las etiquetas de la escalera del MVP. No son texto: son el numero de version
   que le pone forma de evolucion a la lista de abajo. */
const MVP_VERSIONES = ["v0.1", "v0.2", "v0.3", "v0.4", "v0.5", "v1.0"];

const mvpObjetivos = (t) => [
  t("Validar la idea con usuarios reales.", "Validate the idea with real users."),
  t("Salir al mercado más rápido.", "Get to market faster."),
  t("Reducir la inversión inicial.", "Reduce the upfront investment."),
  t("Probar el modelo antes de escalarlo.", "Test the model before scaling it."),
  t("Mejorar el producto según resultados.", "Improve the product based on results."),
  t("Crecer por etapas, sin frenar.", "Grow in stages, without stopping."),
];

/* Todo lo que sabemos construir, en un bento con ritmo.
   Cada fila mezcla un tamano con otro y ninguna se repite seguida: ancha +
   angosta, angosta + ancha, tres iguales, ancha + angosta, tres iguales, dos
   medianas. Las cuatro que llevan una pieza de interfaz -"vis"- son las que
   marcan el pulso; el resto son tarjetas cortas.
   "parte" es la que se abre en dos columnas -texto de un lado, interfaz del
   otro-: puesta al lado y no abajo, la tarjeta mide lo que mide el grafico y
   se termina el hueco vertical que quedaba antes. El contenido es el mismo. */
const queDesarrollamos = (t) => [
  { ic: Code2, w: "w4", tono: "feat", parte: true, vis: "panel", t: t("Software a medida", "Custom software"), d: t("Sistemas diseñados alrededor de los procesos reales de cada empresa.", "Systems designed around each company's real processes.") },
  { ic: Bot, w: "w2", tono: "dark", vis: "nodos", t: t("Agentes de IA", "AI agents"), d: t("Asistentes que atienden, califican y resuelven en ventas y operaciones.", "Assistants that answer, qualify and resolve across sales and operations.") },
  { ic: Smartphone, w: "w2", tono: "feat", vis: "phone", t: t("Aplicaciones móviles", "Mobile apps"), d: t("Apps para clientes, empleados o para un producto nuevo, en iOS y Android.", "Apps for clients, staff or a brand new product, on iOS and Android.") },
  { ic: Workflow, w: "w4", tono: "feat", parte: true, vis: "flujo", t: t("Automatización", "Automation"), d: t("Las tareas repetitivas dejan de ocupar horas de tu equipo.", "Repetitive tasks stop eating your team's hours.") },
  { ic: Globe, w: "w2", t: t("Aplicaciones web", "Web apps"), d: t("Plataformas rápidas, modernas y preparadas para crecer.", "Fast, modern platforms built to scale.") },
  { ic: Building2, w: "w2", t: t("Sistemas empresariales", "Business systems"), d: t("Plataformas internas para ordenar las distintas áreas de una empresa.", "Internal platforms that bring a company's different areas together.") },
  { ic: Users, w: "w2", t: t("CRM personalizado", "Custom CRM"), d: t("Clientes, oportunidades, ventas y seguimiento en un solo lugar.", "Clients, leads, sales and follow-up in one place.") },
  { ic: Sparkles, w: "w4", tono: "dark", parte: true, vis: "chart", t: t("Inteligencia Artificial", "Artificial intelligence"), d: t("IA integrada dentro de procesos y sistemas que ya están funcionando.", "AI built into processes and systems that are already running.") },
  { ic: LayoutDashboard, w: "w2", t: "Dashboards", d: t("La información del negocio ordenada en paneles que se entienden.", "Your business data organized into panels that actually read clearly.") },
  { ic: CreditCard, w: "w2", t: "SaaS", d: t("Productos digitales por suscripción, con su panel y su facturación.", "Subscription products, with their own dashboard and billing.") },
  { ic: Store, w: "w2", t: "Marketplaces", d: t("Plataformas que conectan clientes, vendedores o proveedores.", "Platforms that connect clients, sellers or suppliers.") },
  { ic: Plug, w: "w2", t: t("Integraciones", "Integrations"), d: t("APIs, WhatsApp, email, pagos, CRM y las herramientas que ya usás.", "APIs, WhatsApp, email, payments, CRM and the tools you already use.") },
  { ic: Rocket, w: "w3", t: "MVP", d: t("La primera versión funcional de una idea, lista para salir.", "The first working version of an idea, ready to ship.") },
  { ic: KeyRound, w: "w3", t: t("Portales para clientes", "Client portals"), d: t("Accesos privados para clientes, empleados o proveedores.", "Private access for clients, staff or suppliers.") },
];

/* Donde la IA entra de verdad en un negocio. La lista existe para sacarse de
   encima la idea de que esto son chatbots. */
const iaUsos = (t) => [
  t("Agentes de ventas", "Sales agents"),
  t("Asistentes para vendedores", "Assistants for sales reps"),
  t("Atención automática", "Automated support"),
  t("Calificación de leads", "Lead qualification"),
  t("Seguimientos automáticos", "Automated follow-ups"),
  t("Análisis de documentos", "Document analysis"),
  t("Asistentes internos", "Internal assistants"),
  t("Automatización de procesos", "Process automation"),
  t("IA dentro de aplicaciones", "AI inside applications"),
  t("Análisis de información", "Data analysis"),
];

/* Productos concretos, nombrados por rubro. A proposito no repite ninguna de
   las tarjetas de "que desarrollamos": alla estan las capacidades, aca esta
   para que alguien reconozca lo suyo en una palabra. */
const productos = (t) => [
  { ic: CalendarCheck, t: t("Turnos y reservas", "Appointments and bookings") },
  { ic: FileText, t: t("Sistema de presupuestos", "Quoting system") },
  { ic: Boxes, t: t("Control de stock", "Stock control") },
  { ic: ClipboardList, t: t("Gestión de empleados", "Employee management") },
  { ic: Truck, t: t("Delivery y pedidos", "Delivery and orders") },
  { ic: ShoppingCart, t: t("Tienda online a medida", "Custom online store") },
  { ic: GraduationCap, t: t("Plataforma de cursos", "Course platform") },
  { ic: KeyRound, t: t("Sistema de membresías", "Membership system") },
  { ic: TrendingUp, t: t("App para gimnasios", "App for gyms") },
  { ic: Store, t: t("App para restaurantes", "App for restaurants") },
  { ic: Building2, t: t("App inmobiliaria", "Real estate app") },
  { ic: Network, t: t("Transporte y logística", "Transport and logistics") },
  { ic: Headphones, t: t("App para profesionales", "App for professionals") },
  { ic: Sparkles, t: t("App de eventos", "Events app") },
  { ic: CreditCard, t: t("Sistema de facturación", "Invoicing system") },
  { ic: ShieldCheck, t: t("App institucional", "Institutional app") },
];

/* Las siete etapas tecnicas de un desarrollo. Hoy no se muestran en ninguna
   pagina: estaban en el home, que se estaba haciendo largo, y /proceso -que es
   la pagina de la publicidad- tiene que llevar al formulario sin desvios. El
   texto queda aca por si mas adelante encuentra su lugar. */
const procesoResumen = (t) => [
  { n: "01", ic: Search, t: t("Descubrimiento", "Discovery"), d: t("Entendemos tu idea, tu empresa, el problema y el objetivo.", "We get to know your idea, your company, the problem and the goal.") },
  { n: "02", ic: Target, t: t("Estrategia", "Strategy"), d: t("Definimos la mejor solución y las funcionalidades necesarias.", "We define the right solution and the features it needs.") },
  { n: "03", ic: Palette, t: t("Diseño UX/UI", "UX/UI design"), d: t("Diseñamos cómo se va a ver y cómo se va a usar.", "We design how it will look and how it will be used.") },
  { n: "04", ic: Code2, t: t("Desarrollo", "Development"), d: t("Convertimos el diseño en un producto real y funcionando.", "We turn the design into a real, working product.") },
  { n: "05", ic: FlaskConical, t: t("Pruebas", "Testing"), d: t("Probamos funcionalidades, responsive y experiencia de uso.", "We test features, responsiveness and the user experience.") },
  { n: "06", ic: Send, t: t("Lanzamiento", "Launch"), d: t("Publicamos y dejamos el producto listo para usuarios reales.", "We publish and get the product ready for real users.") },
  { n: "07", ic: Sprout, t: t("Evolución", "Growth"), d: t("Seguimos desarrollando nuevas funcionalidades cuando hacen falta.", "We keep building new features as they are needed.") },
];

const porQue = (t) => [
  { ic: Blocks, t: t("Desarrollo a medida", "Built to measure"), d: t("No usamos soluciones genéricas cuando el negocio necesita algo propio.", "We don't reach for generic solutions when the business needs something of its own.") },
  { ic: Headphones, t: t("Comunicación directa", "Direct communication"), d: t("Hablás con el equipo que desarrolla, durante todo el proyecto.", "You talk to the team doing the work, for the whole project.") },
  { ic: Palette, t: t("Diseño + tecnología", "Design + technology"), d: t("No solamente programamos: pensamos producto, experiencia y funcionamiento.", "We don't just write code: we think about product, experience and how it actually runs.") },
  { ic: TrendingUp, t: t("Preparado para crecer", "Ready to scale"), d: t("Desarrollamos pensando en que el producto pueda evolucionar.", "We build so the product can keep evolving.") },
  { ic: Sparkles, t: t("IA con criterio", "AI with judgment"), d: t("Integramos inteligencia artificial cuando de verdad aporta valor, no para figurar.", "We bring artificial intelligence in when it genuinely adds value, not for show.") },
  { ic: Handshake, t: t("Acompañamiento", "Ongoing support"), d: t("Podemos seguir mejorando el sistema después del lanzamiento.", "We can keep improving the system after launch.") },
];

/* Trabajos reales, contados con lo que dijeron los propios clientes. Nada de
   esto es inventado: sale de los testimonios que ya estaban en el sitio. */
const casos = (t) => [
  {
    id: "numera", n: "Numera", tipo: t("App a medida · SaaS", "Custom app · SaaS"),
    logo: "/clientes/logonumera.jpg", pais: t("Uruguay", "Uruguay"), bandera: "uy",
    img: "/trabajos/numera.jpg", an: 1400, al: 793,
    alt: t("Numera, la plataforma de presupuestos y facturas que desarrollamos a medida", "Numera, the quoting and invoicing platform we built from scratch"),
    problema: t("Un pedido a medida para emitir presupuestos, facturas y acuerdos de confidencialidad sin depender de documentos sueltos.", "A custom request to issue quotes, invoices and confidentiality agreements without relying on loose documents."),
    solucion: t("La construimos de cero y hoy es un producto en producción que seguimos sosteniendo: más de 5.000 suscriptores la usan todos los días.", "We built it from scratch and today it is a product in production that we still maintain: more than 5,000 subscribers use it every day."),
    fn: [t("Presupuestos", "Quotes"), t("Facturas", "Invoices"), t("Firma digital", "Digital signature"), t("Suscripciones", "Subscriptions")],
    frase: t("Más de 5.000 suscriptores la usan todos los días.", "More than 5,000 subscribers use it every day."), quien: "Numera",
  },
  {
    id: "ninit", n: "Ninit Group", tipo: t("Agente de IA y CRM a medida", "AI agent and custom CRM"),
    logo: "/clientes/ninit-group.png", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us",
    img: "/trabajos/agente-n8n.png", an: 1400, al: 483,
    alt: t("Flujo de un agente en producción: entra por WhatsApp o SMS, decide, consulta la base y escribe en el CRM", "An agent flow in production: it comes in through WhatsApp or SMS, decides, queries the database and writes to the CRM"),
    problema: t("Cada consulta que entraba por WhatsApp la tenía que responder una persona, una por una.", "Every request coming in through WhatsApp had to be answered by a person, one at a time."),
    solucion: t("Un agente conectado a Meta WhatsApp, n8n y un CRM a medida: las consultas se responden solas y lo que necesita a una persona llega con todo el contexto.", "An agent connected to Meta WhatsApp, n8n and a custom CRM: requests get answered on their own and whatever needs a person arrives with the full context."),
    fn: ["WhatsApp API", "n8n", t("CRM a medida", "Custom CRM"), t("Derivación con contexto", "Context-rich handoff")],
    frase: t("Gracias a ellos automatizamos la compañía.", "Thanks to them we automated the company."), quien: t("Nicolás Hercun · CEO de Ninit Group", "Nicolás Hercun · CEO at Ninit Group"),
  },
  {
    id: "ipic", n: "IPIC SMO · IICC", tipo: t("Sitio web y base de datos", "Website and database"),
    logo: "/clientes/ipicsmo.png", pais: t("Estados Unidos · Córdoba", "United States · Córdoba"), bandera: "us",
    img: "/trabajos/ipicsmo.jpg", an: 1400, al: 646,
    alt: t("IPIC SMO, sitio y sistema de diseño que armamos para una organización de investigación clínica", "IPIC SMO, the website and design system we built for a clinical research organization"),
    problema: t("La información de los estudios clínicos necesitaba un lugar propio, ordenado y a nombre del centro.", "The clinical study information needed a place of its own, organized and in the center's name."),
    solucion: t("Sitio y base de datos donde hoy vive la información de los estudios, con los tiempos y el cuidado que pide el dato clínico. Quedó todo documentado.", "A website and database where the study information lives today, with the timelines and the care clinical data demands. Everything documented."),
    fn: [t("Sitio web", "Website"), t("Base de datos", "Database"), t("Sistema de diseño", "Design system"), t("Documentación", "Documentation")],
    frase: t("Entendieron rápido cómo trabaja un centro de investigación.", "They quickly understood how a research center works."), quien: t("Dr. Mauro Pautaso · Director Médico", "Dr. Mauro Pautaso · Medical Director"),
  },
  {
    id: "pecifa", n: "Pecifa Nacional", tipo: t("App móvil, web y portal de afiliados", "Mobile app, web and member portal"),
    logo: "/clientes/pecifa.png", pais: t("Argentina", "Argentina"), bandera: "ar", esc: 1.3,
    problema: t("Lo que el afiliado necesitaba resolver era un llamado o un papel.", "Whatever a member needed to sort out meant a phone call or a piece of paper."),
    solucion: t("App móvil, sitio y portal de afiliados funcionando juntos: el afiliado resuelve desde el celular y la organización ve todo en un solo lugar.", "Mobile app, website and member portal working together: members handle it from their phone and the organization sees everything in one place."),
    fn: [t("App móvil", "Mobile app"), t("Portal de afiliados", "Member portal"), t("Sitio web", "Website")],
    frase: t("Se hicieron cargo de la parte técnica de punta a punta.", "They took care of the technical side end to end."), quien: "Hernán Marcantonio",
  },
  {
    id: "munich", n: "Nuevo Munich", tipo: t("CRM a medida y sistema de ventas", "Custom CRM and sales system"),
    logo: "/clientes/nuevo-munich.png", pais: t("Argentina", "Argentina"), bandera: "ar",
    problema: t("Recepción y ventas trabajaban cada una con sus propias planillas y anotaciones.", "The front desk and the sales team each worked from their own spreadsheets and notes."),
    solucion: t("Un CRM a medida y un sistema de recepción y vendedores que el equipo usa todos los días, con los cambios resueltos sin hacerlos esperar.", "A custom CRM and a front-desk and sales system the team uses every single day, with change requests resolved without keeping them waiting."),
    fn: ["CRM", t("Recepción", "Front desk"), t("Ventas", "Sales"), t("Soporte continuo", "Ongoing support")],
    frase: t("Cuando pedimos un cambio está resuelto sin hacernos esperar.", "When we ask for a change it gets done without keeping us waiting."), quien: t("Equipo de Nuevo Munich", "The Nuevo Munich team"),
  },
  {
    id: "escuadra", n: "Escuadra Builders Group", tipo: t("Sitio web, cotizaciones y WhatsApp", "Website, estimates and WhatsApp"),
    logo: "/clientes/escuadra.svg", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us",
    problema: t("Las consultas llegaban sueltas y el cliente no terminaba de entender cómo trabajaba la constructora.", "Requests arrived scattered and clients never quite understood how the contractor worked."),
    solucion: t("Un sitio que explica el proceso de cuatro pasos y muestra los proyectos, con pedido de presupuesto por formulario o WhatsApp. Las consultas llegan ordenadas.", "A site that explains their four-step process and shows the projects, with estimate requests by form or WhatsApp. Requests now arrive organized."),
    fn: [t("Sitio web", "Website"), t("Cotizaciones", "Estimates"), "WhatsApp", t("Proyectos", "Projects")],
    frase: t("Las consultas llegan ordenadas y respondemos el mismo día.", "Requests come in organized and we answer the same day."), quien: t("Equipo de Escuadra Builders Group", "The Escuadra Builders Group team"),
  },
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
    d: t("Esta es la etapa donde tu app o sistema toma forma y queda en línea, funcionando de verdad. Desde ahí seguimos trabajando juntos, con tus devoluciones, hasta dejarlo perfecto. Cuando la app queda en línea se abona el 40%, y el 40% restante al finalizar la entrega.", "This is the stage where your app or system takes shape and goes online, really running. From there we keep working together, with your feedback, until it is exactly right. When the app goes live you pay 40%, and the remaining 40% on delivery."),
    chip: t("40% en línea · 40% al finalizar", "40% at launch · 40% on delivery"),
  },
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
    logos: [{ src: "/clientes/pecifa.png", alt: "Pecifa Nacional", pais: t("Argentina", "Argentina"), bandera: "ar" }],
  },
  {
    q: t("Nos armaron el sitio y la base de datos donde hoy vive la información de nuestros estudios. Entendieron rápido cómo trabaja un centro de investigación: los tiempos, el orden y el cuidado que pide el dato clínico. Quedó todo documentado y a nuestro nombre.", "They built the site and the database where our study information lives today. They quickly understood how a research center works: the timelines, the order and the care clinical data demands. Everything was documented and put in our name."),
    n: "Dr. Mauro Pautaso", r: t("Director Médico", "Medical Director"), e: "",
    cat: t("Sitio web y base de datos", "Website and database"), ic: Database,
    logos: [
      { src: "/clientes/ipicsmo.png", alt: "IPIC SMO", pais: t("Estados Unidos", "United States"), bandera: "us" },
      { src: "/clientes/iicc1.png", alt: "Instituto de Investigaciones Clínicas Córdoba", pais: t("Córdoba, Argentina", "Córdoba, Argentina"), bandera: "ar" },
    ],
  },
  {
    q: t("El agente de IA que nos armaron atiende conectado con Meta WhatsApp, n8n y el CRM a medida que también nos hicieron. Gracias a ellos automatizamos la compañía: las consultas se responden solas y lo que necesita a una persona llega con todo el contexto. Muy contentos con el trabajo.", "The AI agent they built for us answers connected to Meta WhatsApp, n8n and the custom CRM they also made for us. Thanks to them we automated the company: requests get answered on their own and whatever needs a person arrives with the full context. Very happy with the work."),
    n: "Nicolás Hercun", r: t("CEO de Ninit Group", "CEO at Ninit Group"), e: "",
    cat: t("Agente de IA y CRM a medida", "AI agent and custom CRM"), ic: Bot,
    logos: [{ src: "/clientes/ninit-group.png", alt: "Ninit Group", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us" }],
  },
  {
    q: t("Los recomendamos sin vueltas. El CRM a medida y el sistema de recepción y vendedores los usamos todos los días, y cuando pedimos un cambio está resuelto sin hacernos esperar. Estamos muy contentos con el trabajo que hacemos con ellos día a día.", "We recommend them without hesitation. We use the custom CRM and the front-desk and sales system every single day, and when we ask for a change it gets done without keeping us waiting. We are very happy with the work we do with them day to day."),
    n: t("Equipo de Nuevo Munich", "The Nuevo Munich team"), r: t("Recepción y ventas", "Front desk and sales"), e: "Nuevo Munich",
    cat: t("CRM a medida y sistema de ventas", "Custom CRM and sales system"), ic: Users,
    logos: [{ src: "/clientes/nuevo-munich.png", alt: "Nuevo Munich", pais: t("Argentina", "Argentina"), bandera: "ar" }],
  },
  {
    q: t("Somos una constructora con licencia y seguro en Miami-Dade y necesitábamos que el sitio trabajara como trabaja la obra. Hoy el cliente entiende nuestro proceso de cuatro pasos, ve los proyectos de Miami Beach, Coconut Grove, Coral Gables y Brickell, y pide su presupuesto sin costo por el formulario o por WhatsApp. Las consultas llegan ordenadas y respondemos el mismo día.", "We are a licensed and insured contractor in Miami-Dade and we needed the site to work the way the job site works. Today clients understand our four-step process, see the projects in Miami Beach, Coconut Grove, Coral Gables and Brickell, and request their free estimate through the form or WhatsApp. Requests come in organized and we answer the same day."),
    n: t("Equipo de Escuadra Builders Group", "The Escuadra Builders Group team"), r: t("Construcción y gestión de proyectos · Miami", "Construction and project management · Miami"), e: "",
    cat: t("Sitio web, cotizaciones y WhatsApp", "Website, estimates and WhatsApp"), ic: Code2,
    logos: [{ src: "/clientes/escuadra.svg", alt: "Escuadra Builders Group", pais: t("Miami, Estados Unidos", "Miami, United States"), bandera: "us" }],
  },
  {
    q: t("Numera empezó como un pedido a medida y hoy es un producto en producción: más de 5.000 suscriptores la usan todos los días para emitir presupuestos, facturas y acuerdos de confidencialidad con firma digital. La construimos de cero y la seguimos sosteniendo.", "Numera started as a custom request and today it is a product in production: more than 5,000 subscribers use it every day to issue quotes, invoices and digitally signed confidentiality agreements. We built it from scratch and we still maintain it."),
    n: "Numera", r: t("Presupuestos, facturas y acuerdos de confidencialidad", "Quotes, invoices and confidentiality agreements"), e: "",
    cat: t("App a medida · +5.000 suscriptores", "Custom app · 5,000+ subscribers"), ic: FileText,
    logos: [{ src: "/clientes/logonumera.jpg", alt: "Numera", pais: t("Uruguay", "Uruguay"), bandera: "uy" }],
  },
];

const faqs = (t) => [
  { q: t("¿Pueden ayudarme si solamente tengo una idea?", "Can you help me if all I have is an idea?"), a: t("Sí, es el caso más común. No hace falta que traigas todo definido: alcanza con la idea, un boceto o el problema que querés resolver. Nosotros te ayudamos a darle forma de producto, definir qué lleva y por dónde conviene empezar.", "Yes, that is the most common case. You don't need it all figured out: an idea, a sketch or the problem you want to solve is enough. We help you shape it into a product, define what it needs and where it makes sense to start.") },
  { q: t("¿Cuánto cuesta desarrollar una app?", "How much does it cost to build an app?"), a: t("Cada proyecto es diferente y el costo depende de las funcionalidades, el alcance, el diseño, las integraciones y la complejidad. Primero analizamos la idea o la necesidad y recién ahí preparamos una propuesta con el número.", "Every project is different and the cost depends on features, scope, design, integrations and complexity. We analyze the idea or the need first, and only then put together a proposal with the price.") },
  { q: t("¿Qué es un MVP?", "What is an MVP?"), a: t("Es la primera versión funcional de tu producto: lleva las funcionalidades más importantes, sale antes y te deja probar la idea con usuarios reales. No es una versión recortada, es una forma de invertir con menos riesgo y crecer sobre lo que funciona.", "It is the first working version of your product: it carries the most important features, ships sooner and lets you test the idea with real users. It isn't a stripped-down version, it is a way to invest with less risk and grow on what works.") },
  { q: t("¿Desarrollan aplicaciones móviles?", "Do you build mobile apps?"), a: t("Sí, para iOS y Android. Nos ocupamos del diseño, el desarrollo, la publicación en las tiendas y las actualizaciones posteriores.", "Yes, for iOS and Android. We handle design, development, store releases and later updates.") },
  { q: t("¿Pueden desarrollar un CRM?", "Can you build a CRM?"), a: t("Sí, y es de lo que más hacemos. Un CRM a medida se arma alrededor de cómo vende tu equipo, no al revés: clientes, oportunidades, seguimiento, presupuestos y los informes que de verdad mirás.", "Yes, and it is one of the things we build most. A custom CRM is shaped around how your team sells, not the other way round: clients, leads, follow-up, quotes and the reports you actually look at.") },
  { q: t("¿Pueden integrar Inteligencia Artificial?", "Can you integrate artificial intelligence?"), a: t("Sí, y la integramos adentro de sistemas y procesos que ya están funcionando: agentes de ventas, atención automática, calificación de consultas, análisis de documentos y asistentes internos. La sumamos cuando aporta valor real, no para figurar.", "Yes, and we build it into systems and processes that are already running: sales agents, automated support, lead qualification, document analysis and internal assistants. We add it when it delivers real value, not for show.") },
  { q: t("¿Pueden mejorar un sistema existente?", "Can you improve an existing system?"), a: t("Sí. Podemos tomar una app o un sistema que ya está en uso, revisarlo y seguir desarrollándolo: funcionalidades nuevas, mejoras de rendimiento, rediseño o integraciones con otras herramientas.", "Yes. We can take over an app or a system already in use, review it and keep building on it: new features, performance work, a redesign or integrations with other tools.") },
  { q: t("¿Trabajan con empresas y con emprendedores?", "Do you work with companies and with entrepreneurs?"), a: t("Con los dos. Con empresas que necesitan ordenar su operación y dejar atrás las planillas sueltas, y con emprendedores y profesionales que quieren lanzar un producto digital propio.", "With both. With companies that need to organize their operation and leave scattered spreadsheets behind, and with entrepreneurs and professionals who want to launch a digital product of their own.") },
  { q: t("¿Ofrecen soporte después del lanzamiento?", "Do you offer support after launch?"), a: t("Sí. Podemos seguir con mantenimiento, mejoras y funcionalidades nuevas después de que el producto sale. Varios de los sistemas que hicimos los seguimos sosteniendo hoy.", "Yes. We can continue with maintenance, improvements and new features after the product ships. Several of the systems we built are still maintained by us today.") },
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
const FORM_VACIO = { nombre: "", empresa: "", email: "", tel: "", tipo: "", etapa: "", presupuesto: "", msg: "" };
const WA_NUM = "5493515931673";
const WA_SHOW = "+54 9 351 593-1673";
const waLink = (msg) => "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(msg);
const waChips = (t) => [
  t("Hola, quiero un agente de IA para mi empresa.", "Hi, I'd like an AI agent for my company."),
  t("Hola, necesito desarrollar un software a medida.", "Hi, I need custom software built."),
  t("Hola, quiero hacerles una consulta.", "Hi, I have a question for you."),
];

/* La primera pregunta del formulario, agrupada por los dos publicos del sitio.
   Reemplaza a la lista suelta de tipos de app: la misma informacion, pero
   ordenada para que cada visitante encuentre lo suyo sin leer treinta lineas. */
const necesidades = (t) => [
  {
    g: t("Para mi empresa", "For my business"),
    o: [
      t("Software a medida para mi empresa", "Custom software for my business"),
      t("CRM para clientes y ventas", "CRM for clients and sales"),
      t("Sistema de gestión empresarial", "Business management system"),
      t("Sistema administrativo interno", "Internal admin system"),
      t("Facturación y presupuestos", "Invoicing and quotes"),
      t("Control de stock e inventario", "Stock and inventory control"),
      t("Turnos y reservas", "Appointments and bookings"),
      t("Administración de empleados", "Employee management"),
      t("Automatización de procesos", "Process automation"),
      t("Dashboards e informes", "Dashboards and reports"),
      t("Portal para clientes o proveedores", "Client or supplier portal"),
      t("Integración con otras herramientas", "Integration with other tools"),
      t("Mejoras en un sistema existente", "Improvements to an existing system"),
    ],
  },
  {
    g: t("Tengo una idea", "I have an idea"),
    o: [
      t("Tengo una idea para una app", "I have an idea for an app"),
      t("Aplicación móvil", "Mobile app"),
      t("Aplicación web", "Web app"),
      t("Marketplace", "Marketplace"),
      t("Plataforma SaaS", "SaaS platform"),
      t("MVP: primera versión funcional", "MVP: first working version"),
      t("Tienda online / E-commerce", "Online store / E-commerce"),
      t("Delivery y pedidos", "Delivery and orders"),
      t("Plataforma de cursos", "Course platform"),
      t("Sistema de membresías", "Membership system"),
      t("Red social o comunidad", "Social network or community"),
      t("Aplicación para eventos", "Events app"),
      t("Aplicación inmobiliaria", "Real estate app"),
      t("Aplicación de transporte o logística", "Transport or logistics app"),
    ],
  },
  {
    g: t("Inteligencia Artificial", "Artificial intelligence"),
    o: [
      t("Agente de IA", "AI agent"),
      t("Chatbot o asistente virtual", "Chatbot or virtual assistant"),
      t("Aplicación con inteligencia artificial", "App with artificial intelligence"),
      t("IA conectada con WhatsApp", "AI connected to WhatsApp"),
    ],
  },
  {
    g: t("Otro", "Other"),
    o: [
      t("Todavía no lo sé, necesito asesoramiento", "Not sure yet, I need advice"),
      t("Otro", "Other"),
    ],
  },
];

const etapasProyecto = (t) => [
  t("Tengo solamente una idea", "I only have an idea"),
  t("Estoy investigando", "I'm doing research"),
  t("Ya tengo el proyecto definido", "The project is already defined"),
  t("Tengo diseños", "I have designs"),
  t("Ya tengo una app funcionando", "I already have an app running"),
  t("Necesito mejorar un sistema existente", "I need to improve an existing system"),
  t("No estoy seguro", "Not sure"),
];

/* El presupuesto nunca es obligatorio: preguntarlo de mas espanta consultas
   que despues resultan buenas. */
const presupuestos = (t) => [
  t("Todavía no lo sé", "I don't know yet"),
  t("Hasta USD 5.000", "Up to USD 5,000"),
  "USD 5.000 - 10.000",
  "USD 10.000 - 25.000",
  "USD 25.000+",
];

const navLinks = (t) => [
  { id: "servicios", label: t("Servicios", "Services") },
  { id: "proceso", label: t("Proceso", "Process") },
  { id: "clientes", label: t("Clientes", "Clients") },
  { id: "preguntas", label: t("Preguntas frecuentes", "FAQ") },
];

/* ================= utilidades ================= */

/* Los logos casi negros (Next.js, OWASP, JWT) se aclaran para leerse sobre el panel oscuro. */
function brandColor(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.26 ? "#E7E1FF" : "#" + hex;
}

/* Windows no tiene glifos de bandera, asi que el emoji saldria como "US":
   las dibujamos chiquitas. `Bandera` recibe el codigo del pais y devuelve la
   que corresponde; sin codigo no dibuja nada. */
const banderaCaja = { borderRadius: 2, flex: "none" };

function Bandera({ c }) {
  if (c === "ar") {
    return (
      <svg viewBox="0 0 21 14" width="15" height="10" aria-hidden="true" style={banderaCaja}>
        <rect width="21" height="14" fill="#74ACDF" />
        <rect y="4.67" width="21" height="4.66" fill="#FFF" />
        <circle cx="10.5" cy="7" r="1.5" fill="#F6B40E" />
      </svg>
    );
  }
  if (c === "uy") {
    return (
      <svg viewBox="0 0 21 14" width="15" height="10" aria-hidden="true" style={banderaCaja}>
        <rect width="21" height="14" fill="#FFF" />
        {[1.56, 4.67, 7.78, 10.89].map((y) => <rect key={y} y={y} width="21" height="1.55" fill="#0038A8" />)}
        <rect width="9.33" height="7.78" fill="#FFF" />
        <circle cx="4.6" cy="3.9" r="1.7" fill="#F6B40E" />
      </svg>
    );
  }
  if (c === "us") {
    return (
      <svg viewBox="0 0 21 14" width="15" height="10" aria-hidden="true" style={banderaCaja}>
        <rect width="21" height="14" fill="#F0F1F5" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => <rect key={y} y={y} width="21" height="1.08" fill="#C8102E" />)}
        <rect width="9" height="7.6" fill="#0A3161" />
      </svg>
    );
  }
  return null;
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

function WhatsAppBubble({ t, chips, subida }) {
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
    <div className={"s2b-wa" + (shown ? " is-shown" : "") + (subida ? " s2b-wa--alto" : "")} ref={box}>
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

/* Que vista pide la direccion. El proceso y las preguntas tienen su propia URL
   para que el home no sea eterno, y para poder mandarle el link a alguien. */
/* ================= piezas de interfaz =================
   Un panel, un telefono, un diagrama de nodos y una tira de flujo. Son de
   mentira a proposito -no hay dato de nadie adentro- pero se ven como lo que
   construimos, que es mejor argumento que una foto de programadores. Todas
   son CSS y SVG: no pesan ni un kilobyte de imagen. */

function UiPanel({ claro, titulo, kpis = [], barras = [], filas = [] }) {
  return (
    <div className={"s2b-ui" + (claro ? " s2b-ui--claro" : "")} aria-hidden="true">
      <div className="s2b-ui-bar"><i /><i /><i />{titulo && <b>{titulo}</b>}</div>
      <div className="s2b-ui-body">
        {kpis.length > 0 && (
          <div className="s2b-ui-kpis">
            {kpis.map((k) => <div className="s2b-ui-kpi" key={k.k}><em>{k.k}</em><b>{k.v}</b></div>)}
          </div>
        )}
        {barras.length > 0 && (
          <div className="s2b-ui-chart">
            {barras.map((h, i) => (
              <i key={i} style={{ height: h + "%", animationDelay: i * 55 + "ms" }} />
            ))}
          </div>
        )}
        {filas.length > 0 && (
          <div className="s2b-ui-rows">
            {filas.map((f) => (
              <div className="s2b-ui-row" key={f.t}>
                <Check size={13} /><span>{f.t}</span><span>{f.e}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UiTelefono({ titulo, sub, cards = [], cta }) {
  return (
    <div className="s2b-phone" aria-hidden="true">
      <div className="s2b-phone-scr">
        {sub && <div className="s2b-phone-s">{sub}</div>}
        {titulo && <div className="s2b-phone-t">{titulo}</div>}
        {cards.map((c) => (
          <div className="s2b-phone-card" key={c}>
            <b>{c}</b><i /><i className="w2" />
          </div>
        ))}
        {cta && <div className="s2b-phone-cta">{cta}</div>}
      </div>
    </div>
  );
}

/* El nucleo y lo que toca. Las lineas van punteadas y se mueven: se lee que
   algo circula, sin ponerle particulas a toda la pantalla. */
function UiNodos({ id = "n", centro = "AI CORE", satelites = [] }) {
  const filas = [31, 100, 169];
  const puestos = satelites.slice(0, 6).map((s, i) => ({
    s, x: i < 3 ? 49 : 271, rx: i < 3 ? 6 : 228, y: filas[i % 3],
  }));
  return (
    <svg className="s2b-nodes" viewBox="0 0 320 200" role="img" aria-label={centro}>
      <defs>
        <radialGradient id={"s2bHub-" + id} cx="35%" cy="26%">
          <stop offset="0%" stopColor="#A78CFF" />
          <stop offset="60%" stopColor="#6D4AFF" />
          <stop offset="100%" stopColor="#3B2296" />
        </radialGradient>
      </defs>
      {puestos.map((p, i) => (
        <line className="lk" key={"l" + i} x1="160" y1="100" x2={p.x} y2={p.y}
          style={{ animationDelay: i * -0.4 + "s" }} />
      ))}
      <circle className="hub-ring" cx="160" cy="100" r="34" />
      <circle className="hub" cx="160" cy="100" r="34" />
      <text className="hub-lbl" x="160" y="104" textAnchor="middle">{centro}</text>
      {puestos.map((p, i) => (
        <g key={"g" + i}>
          <rect className="sat" x={p.rx} y={p.y - 13} width="86" height="26" rx="8" />
          <text className="lbl" x={p.x} y={p.y + 3} textAnchor="middle">{p.s}</text>
        </g>
      ))}
    </svg>
  );
}

/* La automatizacion, dibujada como se dibuja de verdad: los pasos uno abajo
   del otro, unidos por una linea. En horizontal no entraba sin recortarse. */
function UiFlujo({ pasos = [] }) {
  return (
    <div className="s2b-flujo" aria-hidden="true">
      {pasos.map((p, i) => (
        <div className="s2b-flujo-paso" key={p}>
          <i>{String(i + 1).padStart(2, "0")}</i>
          <span>{p}</span>
        </div>
      ))}
    </div>
  );
}

const RUTAS = { proceso: "/proceso", preguntas: "/preguntas" };
/* En que pagina vive cada ancla que no esta en el home. El formulario pasó a
   la pagina del proceso: es ahi donde se explica como trabajamos y donde el
   cliente decide, y de paso el home queda mas liviano. */
const DUENO = { contacto: "proceso" };
const vistaDeUrl = () => {
  const p = (typeof location === "undefined" ? "/" : location.pathname).replace(/\/+$/, "") || "/";
  const v = Object.keys(RUTAS).find((k) => RUTAS[k] === p);
  return v || "home";
};

/* Ancho de celular. Se usa para no montar las resenas en pantallas chicas:
   apiladas se comen media pantalla de scroll y el logo del cliente ya aparece
   arriba, en la tira de marcas. */
function useCelular() {
  const consulta = "(max-width: 820px)";
  const [celular, setCelular] = useState(
    () => typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(consulta).matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(consulta);
    const ver = (e) => setCelular(e.matches);
    setCelular(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", ver) : mq.addListener(ver);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", ver) : mq.removeListener(ver);
    };
  }, []);
  return celular;
}

/* ================= página ================= */

export default function StudioB2B() {
  const heroRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [pop, setPop] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [tab, setTab] = useState("soft");
  const [qi, setQi] = useState(0);
  const celular = useCelular();
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [detalle, setDetalle] = useState(false);
  const [form, setForm] = useState(FORM_VACIO);
  /* el proceso vive en su propia direccion para no alargar el home; sin router,
     con la URL de verdad y el boton atras del navegador andando */
  const [idioma, setIdioma] = useState(idiomaGuardado);
  const t = useMemo(() => traductor(idioma), [idioma]);
  const SOLUCIONES = useMemo(() => soluciones(t), [t]);
  const CLIENTES = useMemo(() => clientes(t), [t]);
  const SERVICIOS = useMemo(() => servicios(t), [t]);
  const PROCESO = useMemo(() => proceso(t), [t]);
  const AGENT_PTS = useMemo(() => agentPts(t), [t]);
  const TECNOLOGIAS = useMemo(() => tecnologias(t), [t]);
  const TESTIMONIOS = useMemo(() => testimonios(t), [t]);
  const FAQS = useMemo(() => faqs(t), [t]);
  const NAV_LINKS = useMemo(() => navLinks(t), [t]);
  const AYUDA = useMemo(() => ayuda(t), [t]);
  const DOLORES = useMemo(() => dolores(t), [t]);
  const DISPERSOS = useMemo(() => dispersos(t), [t]);
  const IDEA_ENTRADAS = useMemo(() => ideaEntradas(t), [t]);
  const IDEA_FLUJO = useMemo(() => ideaFlujo(t), [t]);
  const MVP_OBJETIVOS = useMemo(() => mvpObjetivos(t), [t]);
  const QUE_DESARROLLAMOS = useMemo(() => queDesarrollamos(t), [t]);
  const IA_USOS = useMemo(() => iaUsos(t), [t]);
  const PRODUCTOS = useMemo(() => productos(t), [t]);
  const POR_QUE = useMemo(() => porQue(t), [t]);
  const CASOS = useMemo(() => casos(t), [t]);
  const NECESIDADES = useMemo(() => necesidades(t), [t]);
  const ETAPAS_PROY = useMemo(() => etapasProyecto(t), [t]);
  const PRESUPUESTOS = useMemo(() => presupuestos(t), [t]);
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
    const destino = RUTAS[v] || "/";
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

  /* La barra de abajo, solo en /proceso y solo en el celular: es la pagina que
     va en la publicidad, y con siete pasos de por medio el formulario queda
     lejos. Aparece despues del primer scroll y se esconde sola cuando el
     formulario ya esta a la vista, para no pisar lo que la persona vino a
     completar. */
  const [barra, setBarra] = useState(false);
  useEffect(() => {
    if (vista !== "proceso") { setBarra(false); return; }
    const ver = () => {
      const f = document.getElementById("contacto");
      const lejos = !f || f.getBoundingClientRect().top > window.innerHeight - 140;
      setBarra(window.scrollY > 400 && lejos);
    };
    ver();
    window.addEventListener("scroll", ver, { passive: true });
    window.addEventListener("resize", ver, { passive: true });
    return () => {
      window.removeEventListener("scroll", ver);
      window.removeEventListener("resize", ver);
    };
  }, [vista]);

  /* El titulo de la pestana sigue a la vista y al idioma. El del index.html es
     el que ve Google en el home; este es el que ve la persona mientras navega. */
  useEffect(() => {
    document.title =
      vista === "proceso" ? t("El Proceso Studio B2B, paso a paso | Studio B2B", "The Studio B2B Process, step by step | Studio B2B") :
      vista === "preguntas" ? t("Preguntas frecuentes | Studio B2B", "Frequently asked questions | Studio B2B") :
      t("Studio B2B | Desarrollo de Apps, Software a Medida e Inteligencia Artificial",
        "Studio B2B | Custom Software, Apps & AI Solutions");
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", t(
      "Desarrollamos aplicaciones, software a medida, CRM, sistemas empresariales y soluciones con inteligencia artificial para empresas y emprendedores. Desde Córdoba, Argentina.",
      "Custom software, mobile apps, CRM systems and AI solutions for businesses and entrepreneurs. Built from Córdoba, Argentina."));
  }, [vista, t]);

  /* Los bloques que aparecen al bajar.
     Antes esto lo hacia un IntersectionObserver, y tenia dos agujeros: el
     observador solo avisa cuando un elemento CRUZA el borde de la pantalla
     -si alguien pega un scrollazo, o si una imagen que carga tarde empuja la
     pagina, un bloque salta de "abajo de todo" a "arriba de todo" sin cruzar
     nada- y ademas se quedaba con la lista de elementos del primer pintado,
     asi que cualquier bloque que React volviera a crear ya nunca se revelaba.
     Como los bloques arrancan en opacity 0, el resultado era contenido
     invisible para siempre: pasaba en el recorrido de la idea, en la tira de
     productos y en los primeros casos del portfolio.
     Ahora es al reves y mas simple: no se recuerda nada. Cada vez que hace
     falta se vuelve a preguntar al DOM quien sigue sin mostrarse, y se muestra
     todo lo que ya quedo por arriba del pie de pantalla. */
  const revelar = useCallback(() => {
    const pie = window.innerHeight - 60;
    document.querySelectorAll(".s2b-rv:not(.is-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < pie) el.classList.add("is-in");
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const alMover = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; revelar(); }); };
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover, { passive: true });
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [revelar]);

  /* sin lista de dependencias a proposito: corre despues de cada pintado, que
     es justo cuando React pudo haber reemplazado un bloque */
  useEffect(revelar);

  const goTo = useCallback((id) => {
    setDrawer(false); setPop(false);
    if (RUTAS[id]) { irA(id); return; }
    const ir = (suave) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
    };
    /* la seccion puede estar en otra vista: primero se cambia de pagina y
       despues se baja, ya sin animacion porque el salto fue de pantalla */
    if (document.getElementById(id)) ir(true);
    else { irA(DUENO[id] || "home"); setTimeout(() => ir(false), 80); }
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
          "Qué necesita": form.tipo || "-",
          "Etapa del proyecto": form.etapa || "-",
          "Presupuesto estimado": form.presupuesto || "-",
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

  /* El formulario vive en un solo lugar y se muestra en dos: al final del home
     -que es donde cae la mayoria del trafico- y al cierre de /proceso, que es
     el link que se le pasa al cliente. Como nunca hay dos vistas a la vez, el
     id "contacto" sigue siendo unico en la pagina. */
  const bloqueContacto = (
    <section className="s2b-sec" id="contacto">
      <div className="s2b-wrap s2b-form-grid">
        <div className="s2b-rv">
          <div className="s2b-eyebrow">{t("Siguiente paso", "Next step")}</div>
          <h2 className="s2b-h2">{t("Tu próximo proyecto", "Your next project")} <b>{t("empieza acá", "starts here")}</b></h2>
          <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
            {t("Contanos qué necesitás. Te respondemos en menos de 24 horas hábiles con una primera lectura del problema y una propuesta de diagnóstico. La primera llamada no se cobra.", "Tell us what you need. We reply within 24 business hours with a first read of the problem and a discovery proposal. The first call is free.")}
          </p>
          <a className="s2b-cline" style={{ textDecoration: "none" }} href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer"><Phone size={17} /> {WA_SHOW}</a>
          <div className="s2b-cline"><MapPin size={17} /> {t("Córdoba, Argentina · Miami, EE.UU.", "Córdoba, Argentina · Miami, USA")}</div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
            <Quote size={20} style={{ color: "var(--lilac)" }} />
            <span style={{ fontSize: 14, color: "#9E97C4" }}>{t("Respondemos todos los mensajes, también los que todavía no tienen presupuesto.", "We answer every message, including the ones that don't have a budget yet.")}</span>
          </div>
        </div>

        <div className="s2b-panel s2b-rv">
          {sent ? (
            <div>
              <div className="s2b-sent"><Check size={20} /> {t("Mensaje enviado. Te respondemos a", "Message sent. We'll reply to")} {form.email}.</div>
              <button className="s2b-btn s2b-btn--glass" onClick={() => { setSent(false); setForm(FORM_VACIO); }}>
                {t("Enviar otro", "Send another")}
              </button>
            </div>
          ) : (
            <div>
              {/* La primera pregunta es la que mas dice de la consulta: agrupada
                  por los dos publicos, para que cada uno encuentre lo suyo. */}
              <div className="s2b-f">
                <label htmlFor="f5">{t("¿Qué necesitás?", "What do you need?")}</label>
                <select id="f5" value={form.tipo} onChange={set("tipo")}>
                  <option value="">{t("Elegí una opción", "Choose an option")}</option>
                  {NECESIDADES.map((g) => (
                    <optgroup label={g.g} key={g.g}>
                      {g.o.map((o) => <option key={o}>{o}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="s2b-f"><label htmlFor="f1">{t("Nombre", "Name")}</label><input id="f1" value={form.nombre} onChange={set("nombre")} placeholder={t("Cómo te llamás", "Your name")} /></div>
              <div className="s2b-f"><label htmlFor="f3">Email</label><input id="f3" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="tu@empresa.com" /></div>
              <div className="s2b-f"><label htmlFor="f4">{t("WhatsApp / Teléfono", "WhatsApp / Phone")}</label><input id="f4" type="tel" inputMode="tel" autoComplete="tel" value={form.tel} onChange={set("tel")} placeholder="+54 9 ..." /></div>
              <div className="s2b-f"><label htmlFor="f6">{t("Contanos brevemente qué necesitás", "Tell us briefly what you need")}</label><textarea id="f6" value={form.msg} onChange={set("msg")} placeholder={t("Qué problema querés resolver y en qué plazo", "What problem you need solved and by when")} /></div>

              {/* Empresa, etapa y presupuesto son opcionales y ninguna de las
                  tres decide si contestamos. Puestas a la vista, ocho campos
                  parecen un tramite; plegadas, el formulario se ve corto y el
                  que quiere dar contexto lo da igual. No se saco ningun campo:
                  todos siguen viajando en el mismo mensaje. */}
              <button
                type="button"
                className="s2b-mas-datos"
                aria-expanded={detalle}
                onClick={() => setDetalle((d) => !d)}
              >
                {detalle ? <Minus size={15} /> : <Plus size={15} />}
                {t("Agregar más datos (opcional)", "Add more details (optional)")}
              </button>
              {detalle && (
                <div className="s2b-detalle">
                  <div className="s2b-f"><label htmlFor="f2">{t("Empresa", "Company")}</label><input id="f2" value={form.empresa} onChange={set("empresa")} placeholder={t("Dónde trabajás", "Where you work")} /></div>
                  <div className="s2b-f">
                    <label htmlFor="f7">{t("¿En qué etapa estás?", "What stage are you at?")}</label>
                    <select id="f7" value={form.etapa} onChange={set("etapa")}>
                      <option value="">{t("Elegí una opción", "Choose an option")}</option>
                      {ETAPAS_PROY.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="s2b-f">
                    <label htmlFor="f8">{t("Presupuesto estimado", "Estimated budget")}</label>
                    <select id="f8" value={form.presupuesto} onChange={set("presupuesto")}>
                      <option value="">{t("Prefiero no decirlo todavía", "I'd rather not say yet")}</option>
                      {PRESUPUESTOS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              )}
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
  );

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
        {/* el nav quedo fijo -acompana todo el recorrido, no solo el hero-, asi
            que hace falta reservarle el lugar que ya no ocupa en el flujo */}
        <div className="s2b-navpad" aria-hidden="true" />

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
              <div className="s2b-pill">{t("Software a medida · Apps · IA", "Custom Software · Apps · AI Solutions")}</div>
              <div className="s2b-sweep">
                <h1>{t("Creamos software que transforma", "We build software that transforms")} <span>{t("ideas y negocios", "ideas and businesses")}</span></h1>
              </div>
              <p>
                {t("Desarrollamos aplicaciones, sistemas a medida e inteligencia artificial para empresas, emprendedores y personas que quieren convertir una idea en un producto digital real.", "Custom software, apps and AI solutions for businesses, entrepreneurs and people who want to turn an idea into a real digital product.")}
              </p>
              {/* la linea de posicionamiento: en cuatro palabras, a que nos dedicamos */}
              <div className="s2b-kicker">
                {[t("Software a medida", "Custom software"), "Apps", "CRM", t("Inteligencia Artificial", "AI Solutions")].map((x, i) => (
                  <React.Fragment key={x}>{i > 0 && <i aria-hidden="true" />}<span>{x}</span></React.Fragment>
                ))}
              </div>
              <div className="s2b-hero-cta">
                <button className="s2b-btn s2b-btn--chrome" onClick={() => goTo("contacto")}>{t("Contanos tu proyecto", "Tell Us About Your Project")} <ArrowRight size={16} /></button>
                <button className="s2b-btn s2b-btn--glass" onClick={() => goTo("idea")}>
                  <Lightbulb size={15} /> {t("Tengo una idea de app", "I Have an App Idea")}
                </button>
              </div>
              <p className="s2b-hero-pie">
                <MapPin size={15} />
                {t("Desarrollo de soluciones digitales a medida desde Córdoba, Argentina.", "Custom digital products built from Córdoba, Argentina.")}
              </p>
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

            {/* Esta es la pagina que se pone en la publicidad. Quien llega no
                tiene por que leerse los siete pasos antes de poder escribirnos:
                el boton al formulario esta arriba de todo, y al lado las tres
                cosas que despejan la duda de "cuanto me cuesta preguntar". */}
            <div className="s2b-arranque s2b-rv">
              <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" onClick={() => goTo("contacto")}>
                {t("Contanos tu proyecto", "Tell us about your project")} <ArrowRight size={16} />
              </button>
              <ul className="s2b-promesas">
                <li><Check size={14} /> {t("La primera llamada no se cobra", "The first call is free")}</li>
                <li><Check size={14} /> {t("Respondemos en menos de 24 h hábiles", "We reply within 24 business hours")}</li>
                <li><Check size={14} /> {t("Firmamos confidencialidad antes de empezar", "We sign an NDA before we start")}</li>
              </ul>
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

            {/* /proceso es la pagina que se pone en la publicidad: cada cosa
                que se agrega aca aleja el formulario. Por eso el cierre es un
                parrafo y nada mas -antes tenia un boton a una seccion que ya
                no existe- y de aca se va derecho al formulario. */}
            <div className="s2b-flow-cierre s2b-rv">
              <span>
                {t("Del paso 7 en adelante entra el", "From step 7 onward the")} <b>{t("Método Studio", "Studio Method")}</b>{t(": diagnóstico, prototipo, entregas cada dos semanas y operación. El código y la infraestructura son tuyos desde el día uno.", " takes over: discovery, prototype, releases every two weeks and operations. The code and the infrastructure are yours from day one.")}
              </span>
            </div>

            <div className="s2b-flow-volver s2b-rv">
              <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" onClick={() => goTo("contacto")}>{t("Empezar por el paso 1", "Start with step 1")} <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

      {/* ============ TESTIMONIOS ============ */}
      {/* Viven aca y no en el home: alla los mismos seis clientes ya cuentan su
          caso en el portfolio, y repetirlos era leer dos veces lo mismo. Aca
          cierran el recorrido, justo antes del formulario. En el celular no se
          muestran: apiladas ocupan media pantalla de scroll. */}
      {!celular && <section className="s2b-sec s2b-sec--sm">
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
                            {l.pais && <em><Bandera c={l.bandera} /> {l.pais}</em>}
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
      </section>}

        {bloqueContacto}
      </div>}

      {/* ============ PREGUNTAS FRECUENTES (pagina aparte) ============ */}
      {vista === "preguntas" && <section className="s2b-sec s2b-sec--sm" id="preguntas">
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

          <div className="s2b-flow-volver s2b-rv">
            <button className="s2b-link" onClick={() => irA("home")}><ArrowLeft size={15} /> {t("Volver al inicio", "Back to home")}</button>
            <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" onClick={() => goTo("contacto")}>{t("Hacenos tu consulta", "Ask us your question")} <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>}

      {vista === "home" && <>
      {/* ============ CÓMO PODEMOS AYUDARTE ============ */}
      {/* Va pegada al hero a proposito: quien llega de una publicidad tiene que
          reconocerse en una de las dos puertas antes de seguir bajando. */}
      <section className="s2b-sec s2b-sec--sm s2b-amb" id="ayuda">
        <div className="s2b-wrap">
          <div className="s2b-rv" style={{ textAlign: "center", display: "grid", justifyItems: "center" }}>
            <div className="s2b-eyebrow">{t("Dos caminos", "Two paths")}</div>
            <h2 className="s2b-h2" style={{ maxWidth: "16ch" }}>{t("¿Cómo podemos", "How can we")} <b>{t("ayudarte?", "help you?")}</b></h2>
          </div>

          {/* Pantalla partida en vez de dos tarjetas iguales: la mitad de la
              empresa es oscura y muestra un panel; la de la idea es clara y
              muestra un telefono. Se reconoce cual es cual sin leer. */}
          <div className="s2b-doors s2b-rv">
            {AYUDA.map((a) => {
              const I = a.ic;
              const esEmpresa = a.id === "empresas";
              return (
                <article className={"s2b-door " + (esEmpresa ? "s2b-door--emp" : "s2b-door--idea")} key={a.id}>
                  <div className="s2b-door-in">
                    <div className="s2b-door-rot"><I size={13} /> {a.rot}</div>
                    <h3>{a.tt}</h3>
                    <p>{a.d}</p>

                    <div className="s2b-door-vis">
                      {esEmpresa ? (
                        <UiPanel
                          titulo={t("Tu operación", "Your operations")}
                          barras={[44, 66, 52, 78, 60, 90, 72]}
                          filas={[
                            { t: t("Presupuestos", "Quotes"), e: "OK" },
                            { t: "CRM", e: "OK" },
                            { t: t("Inventario", "Inventory"), e: "OK" },
                          ]}
                        />
                      ) : (
                        <UiTelefono
                          sub="MVP · v0.1"
                          titulo={t("Tu producto", "Your product")}
                          cards={[t("Registro", "Sign up"), t("Panel", "Dashboard")]}
                          cta={t("Empezar", "Get started")}
                        />
                      )}
                    </div>

                    <div className="s2b-door-tags">
                      {a.tags.map((c) => <span className="s2b-chip" key={c}>{c}</span>)}
                    </div>
                    <button className={"s2b-btn " + (esEmpresa ? "s2b-btn--chrome" : "s2b-btn--primary")} onClick={() => goTo(a.to)}>
                      {a.cta} <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

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
                      {c.pais && <span className="s2b-clogo-pais"><Bandera c={c.bandera} /> {c.pais}</span>}
                    </div>
                  )
                  : <div className="s2b-clogo" key={i}>{c.n}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ EL PROBLEMA DE UNA EMPRESA ============ */}
      <section className="s2b-sec s2b-sec--sm s2b-amb s2b-amb--grid" id="empresas">
        <div className="s2b-wrap">
          <div className="s2b-rv">
            <div className="s2b-eyebrow">{t("Para empresas", "For businesses")}</div>
            <h2 className="s2b-h2">{t("¿Tu empresa todavía depende de", "Is your business still running on")} <b>{t("Excel, WhatsApp y procesos manuales?", "spreadsheets, WhatsApp and manual work?")}</b></h2>
            <p className="s2b-lead">
              {t("Cuando la información está repartida entre distintas herramientas se pierde tiempo, se pierden clientes y se pierden oportunidades. Desarrollamos sistemas a medida para centralizar la operación de tu negocio.", "When your information is spread across different tools you lose time, you lose clients and you lose opportunities. We build custom systems to centralize how your business runs.")}
            </p>
          </div>

          {/* Del caos a un solo sistema, contado como una imagen y no como ocho
              tarjetas iguales: los sintomas flotan sueltos de un lado, la
              operacion ordenada del otro, y en el medio la marca. */}
          <div className="s2b-caos-grid s2b-rv">
            <div className="s2b-lado s2b-lado--caos">
              <div className="s2b-lado-rot">{t("Hoy", "Today")}</div>
              <div className="s2b-nube">
                {DOLORES.map((d) => {
                  const I = d.ic;
                  return <span key={d.t}><I size={15} />{d.t}</span>;
                })}
              </div>
            </div>

            <div className="s2b-puente" aria-hidden="true">
              <ArrowDown className="s2b-puente-flecha" size={22} />
              <div className="s2b-puente-marca">
                <img src="/logo.png" alt="" aria-hidden="true" />
                Studio B2B
              </div>
              <ArrowDown className="s2b-puente-flecha" size={22} />
            </div>

            <div className="s2b-lado s2b-lado--orden">
              <div className="s2b-lado-rot">{t("Con Studio B2B", "With Studio B2B")}</div>
              <ul className="s2b-orden-lista">
                {DISPERSOS.map((x) => (
                  <li key={x}>{x}<em><Check size={12} /> {t("integrado", "connected")}</em></li>
                ))}
              </ul>
              <div className="s2b-orden-fin">{t("Un solo sistema", "One single system")}</div>
            </div>
          </div>

          <div style={{ marginTop: 32 }} className="s2b-rv">
            <button className="s2b-btn s2b-btn--primary" onClick={() => goTo("contacto")}>
              {t("Contanos cómo trabaja tu empresa hoy", "Tell us how your business runs today")} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ TENGO UNA IDEA DE APP ============ */}
      <div className="s2b-band s2b-band--dark" id="idea">
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap">
            <div className="s2b-idea-grid">
              <div className="s2b-rv">
                <div className="s2b-eyebrow"><Lightbulb size={13} /> {t("Tengo una idea", "I have an idea")}</div>
                <h2 className="s2b-h2">{t("¿Tenés una idea", "Have an idea")} <b>{t("para una app?", "for an app?")}</b></h2>
                <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                  {t("Tu idea puede convertirse en un producto real. Ayudamos a emprendedores, profesionales y empresas a transformar ideas en aplicaciones que funcionan.", "Your idea can become a real product. We help entrepreneurs, professionals and companies turn ideas into applications that actually work.")}
                </p>
                <p style={{ color: "#BDB4E4", fontSize: 15.5, marginTop: 26 }}>
                  <b style={{ color: "#fff", fontWeight: 600 }}>{t("No necesitás tener todo definido.", "You don't need to have it all figured out.")}</b>{" "}
                  {t("Podés venir con:", "You can come with:")}
                </p>
                <ul className="s2b-idea-traes">
                  {IDEA_ENTRADAS.map((x) => <li key={x}><Check size={16} />{x}</li>)}
                </ul>
                <p style={{ color: "#9E97C4", fontSize: 14.5, marginTop: 18 }}>
                  {t("Nosotros te ayudamos a definir el producto.", "We help you define the product from there.")}
                </p>
                <button className="s2b-btn s2b-btn--chrome s2b-btn--aura" style={{ marginTop: 30 }} onClick={() => goTo("contacto")}>
                  {t("Contanos tu idea", "Tell us your idea")} <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="s2b-rv">
                <UiTelefono
                  sub={t("Tu app", "Your app")}
                  titulo={t("De la idea al producto", "From idea to product")}
                  cards={[t("Pantalla principal", "Home screen"), t("Perfil", "Profile"), t("Pagos", "Payments")]}
                  cta={t("Publicar", "Publish")}
                />
              </div>
            </div>

            {/* El recorrido de una idea. En la compu es un riel horizontal cuya
                linea se dibuja sola al entrar en pantalla; en el celular el
                mismo riel se pone de pie. Antes era una tira de pastillas. */}
            <div className="s2b-journey" aria-label={t("De la idea al producto", "From idea to product")}>
              <div className="s2b-journey-track">
                {IDEA_FLUJO.map((x, i) => (
                  <div className="s2b-jstep s2b-rv" key={x} style={{ transitionDelay: i * 70 + "ms" }}>
                    <div className="s2b-jnodo">{String(i + 1).padStart(2, "0")}</div>
                    <div className="s2b-jlbl">{x}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ MVP ============ */}
        {/* Vive en la misma banda que la idea: es la continuacion natural de
            "tengo una idea", y de paso el fondo no se corta al medio. */}
        <section className="s2b-sec s2b-sec--sm">
          <div className="s2b-wrap s2b-mvp">
            <div className="s2b-rv">
              <div className="s2b-eyebrow"><Rocket size={13} /> {t("Estrategia de producto", "Product strategy")}</div>
              <h2 className="s2b-h2">{t("No necesitás", "You don't have to")} <b>{t("empezar con todo", "start with everything")}</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                {t("Podemos empezar por un MVP: una primera versión funcional de tu producto, con las funcionalidades que de verdad importan. No es una versión recortada, es la forma más inteligente de construir.", "We can start with an MVP: a first working version of your product, with the features that genuinely matter. It isn't a stripped-down version, it is the smarter way to build.")}
              </p>
              <button className="s2b-btn s2b-btn--chrome" style={{ marginTop: 30 }} onClick={() => goTo("contacto")}>
                {t("Quiero empezar por un MVP", "Start with an MVP")} <ArrowRight size={16} />
              </button>
            </div>

            {/* la escalera del producto: cada peldano sube un poco, para que se
                lea como una evolucion y no como una lista de seis puntos */}
            <div className="s2b-ladder s2b-rv">
              {MVP_OBJETIVOS.map((o, i) => (
                <div
                  className={"s2b-rung" + (i === MVP_OBJETIVOS.length - 1 ? " s2b-rung--top" : "")}
                  key={o}
                  style={{ "--i": i }}
                >
                  <span className="s2b-rung-v">{MVP_VERSIONES[i] || "v1.0"}</span>
                  <p>{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============ QUÉ DESARROLLAMOS ============ */}
      {/* El bento. Catorce capacidades que antes eran catorce tarjetas del
          mismo tamano: ahora hay piezas grandes con interfaz adentro, dos en
          oscuro y chicas para lo que se lee de una palabra. */}
      <section className="s2b-sec s2b-sec--sm s2b-amb s2b-amb--grid" id="servicios">
        <div className="s2b-wrap">
          <div className="s2b-head s2b-rv">
            <div>
              <div className="s2b-eyebrow">{t("Soluciones", "Solutions")}</div>
              <h2 className="s2b-h2">{t("Qué podemos", "What we")} <b>{t("desarrollar", "build")}</b></h2>
            </div>
            <p className="s2b-lead">
              {t("Un mismo equipo para diseño, desarrollo e inteligencia artificial. No tercerizamos: las decisiones no se pierden entre proveedores.", "One team for design, development and artificial intelligence. We don't outsource: decisions don't get lost between vendors.")}
            </p>
          </div>

          <div className="s2b-bento">
            {QUE_DESARROLLAMOS.map((c, i) => {
              const I = c.ic;
              const tono = c.tono === "dark" ? " s2b-bt--dark" : c.tono === "feat" ? " s2b-bt--feat" : "";
              const forma = (c.parte ? " s2b-bt--parte" : "") + (c.vis ? " s2b-bt--convis" : "");
              return (
                <article className={"s2b-bt s2b-rv " + c.w + tono + forma} key={c.t} style={{ transitionDelay: (i % 3) * 60 + "ms" }}>
                  <div className="s2b-bt-txt">
                    <div className="s2b-bt-ico"><I size={18} /></div>
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                  </div>
                  {c.vis && (
                    <div className="s2b-bt-vis" aria-hidden="true">
                      {c.vis === "panel" && (
                        <UiPanel
                          claro
                          titulo={t("Sistema a medida", "Custom system")}
                          filas={[
                            { t: t("Clientes", "Clients"), e: "OK" },
                            { t: t("Presupuestos", "Quotes"), e: "OK" },
                            { t: t("Reportes", "Reports"), e: "OK" },
                          ]}
                        />
                      )}
                      {c.vis === "nodos" && (
                        <UiNodos
                          id="bt"
                          centro="AI"
                          satelites={["CRM", "WhatsApp", "Email", t("Leads", "Leads"), t("Ventas", "Sales"), t("Datos", "Data")]}
                        />
                      )}
                      {c.vis === "phone" && (
                        <UiTelefono
                          sub="iOS · Android"
                          titulo={t("Tu app", "Your app")}
                          cards={[t("Inicio", "Home")]}
                          cta={t("Entrar", "Open")}
                        />
                      )}
                      {c.vis === "flujo" && (
                        <UiFlujo pasos={[t("Llega una consulta", "A request comes in"), t("Se aplica la regla", "The rule runs"), t("Se hace la acción", "The action fires"), t("Queda en el CRM", "It lands in the CRM")]} />
                      )}
                      {c.vis === "chart" && (
                        <div className="s2b-float-spark">
                          {[34, 52, 40, 66, 48, 78, 58, 90, 70, 100].map((h, k) => <i key={k} style={{ height: h + "%" }} />)}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ INTELIGENCIA ARTIFICIAL ============ */}
      <div className="s2b-band s2b-band--dark" id="agentes">
        <section className="s2b-sec">
          <div className="s2b-wrap s2b-split">
            <div className="s2b-rv">
              <div className="s2b-eyebrow"><Sparkles size={13} /> {t("Inteligencia Artificial", "Artificial intelligence")}</div>
              <h2 className="s2b-h2">{t("IA integrada", "AI that works")} <b>{t("a tu negocio", "inside your business")}</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                {t("Integramos inteligencia artificial dentro de sistemas, CRM, aplicaciones y procesos que ya están funcionando. Esto de acá al lado es un turno real de uno de nuestros agentes: entiende la consulta, revisa el stock, responde y agenda.", "We build artificial intelligence into systems, CRMs, applications and processes that are already running. What you see here is a real shift from one of our agents: it understands the request, checks stock, replies and books the meeting.")}
              </p>
              <div className="s2b-usos">
                {IA_USOS.map((u) => <span className="s2b-uso" key={u}><i aria-hidden="true" />{u}</span>)}
              </div>
              <ul className="s2b-ul">
                {AGENT_PTS.map((p) => <li key={p}><Check size={17} />{p}</li>)}
              </ul>
              <button className="s2b-btn s2b-btn--chrome" style={{ marginTop: 30 }} onClick={() => goTo("contacto")}>
                {t("Quiero IA en mi negocio", "I want AI in my business")} <ArrowUpRight size={16} />
              </button>
            </div>
            {/* El nucleo y lo que toca, arriba; el turno real de un agente,
                abajo. Es la seccion visualmente mas fuerte del recorrido. */}
            <div className="s2b-rv s2b-ia-col">
              <div className="s2b-ia-nodos">
                <div className="s2b-ia-nodos-t">{t("La IA, adentro de tus herramientas", "AI, inside your own tools")}</div>
                <UiNodos
                  id="ia"
                  centro="AI CORE"
                  satelites={["CRM", "WhatsApp", "Email", t("Leads", "Leads"), t("Ventas", "Sales"), t("Documentos", "Documents")]}
                />
              </div>
              <Terminal lineas={AGENT_LINES} />
            </div>
          </div>
        </section>
      </div>

      {/* ============ TIPOS DE PRODUCTOS ============ */}
      <section className="s2b-sec s2b-sec--sm s2b-amb">
        <div className="s2b-wrap">
          <div className="s2b-rv">
            <div className="s2b-eyebrow">{t("Productos", "Products")}</div>
            <h2 className="s2b-h2">{t("¿Qué podemos", "What can we")} <b>{t("crear?", "create?")}</b></h2>
          </div>
          {/* Dieciseis productos que eran dieciseis cuadraditos. Ahora pasan en
              dos tiras que corren en sentidos opuestos: ocupan mucho menos
              lugar, se leen de un vistazo y le dan movimiento al scroll. */}
          <div className="s2b-tiras s2b-rv" aria-label={t("Productos que podemos crear", "Products we can create")}>
            {[PRODUCTOS.slice(0, 8), PRODUCTOS.slice(8)].map((mitad, fila) => (
              <div className={"s2b-tira " + (fila === 0 ? "s2b-tira--a" : "s2b-tira--b")} key={fila}>
                {/* la segunda mitad es la copia que hace el bucle: no se lee */}
                {[...mitad, ...mitad].map((p, i) => {
                  const I = p.ic;
                  return (
                    <span key={p.t + i} aria-hidden={i >= mitad.length ? "true" : undefined}>
                      <I size={17} />{p.t}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO ============ */}
      <section className="s2b-sec s2b-sec--sm s2b-amb" id="clientes" style={{ background: "linear-gradient(180deg,#FFFFFF,var(--paper))" }}>
        <div className="s2b-wrap">
          <div className="s2b-head s2b-rv">
            <div>
              <div className="s2b-eyebrow">{t("Trabajos", "Our work")}</div>
              <h2 className="s2b-h2">{t("Proyectos que ya están", "Projects already")} <b>{t("funcionando", "up and running")}</b></h2>
            </div>
            <p className="s2b-lead">
              {t("Sistemas, apps y agentes que se usan todos los días. Cada caso cuenta qué había antes y qué construimos.", "Systems, apps and agents in daily use. Each case says what was there before and what we built.")}
            </p>
          </div>

          {/* Los trabajos con captura se cuentan en grande y alternando lado,
              como un case study. Los que todavia no tienen captura van abajo,
              en una fila mas tranquila, sin fingir una pantalla que no hay. */}
          <div className="s2b-cases">
            {CASOS.filter((c) => c.img).map((c, i) => (
              <article className="s2b-case s2b-rv" key={c.id}>
                <div className="s2b-case-vis">
                  <div className="s2b-shot">
                    <img src={c.img} alt={c.alt} loading="lazy" width={c.an} height={c.al} />
                  </div>
                </div>
                <div>
                  <div className="s2b-case-n">{t("CASO", "CASE")} {String(i + 1).padStart(2, "0")}</div>
                  <div className="s2b-case-top">
                    <h3>{c.n}</h3>
                    <span className="s2b-case-pais"><Bandera c={c.bandera} /> {c.pais}</span>
                  </div>
                  <span className="s2b-case-tipo">{c.tipo}</span>
                  <div className="s2b-case-datos">
                    <div className="s2b-case-dato">
                      <b>{t("El problema", "The problem")}</b>
                      <p>{c.problema}</p>
                    </div>
                    <div className="s2b-case-dato">
                      <b>{t("Lo que desarrollamos", "What we built")}</b>
                      <p>{c.solucion}</p>
                    </div>
                  </div>
                  <div className="s2b-chips">{c.fn.map((f) => <span className="s2b-chip" key={f}>{f}</span>)}</div>
                  <blockquote className="s2b-case-frase">
                    <Quote size={16} aria-hidden="true" />
                    <p>{c.frase}<cite>{c.quien}</cite></p>
                  </blockquote>
                </div>
              </article>
            ))}
          </div>

          <div className="s2b-mas s2b-rv">
            <div className="s2b-mas-t">{t("También construimos para", "We also build for")}</div>
            <div className="s2b-mas-grid">
              {CASOS.filter((c) => !c.img).map((c) => (
                <article className="s2b-mini" key={c.id}>
                  <div className="s2b-mini-logo">
                    <img
                      src={c.logo}
                      alt={c.n}
                      loading="lazy"
                      style={c.esc ? { maxHeight: Math.round(84 * c.esc) } : undefined}
                    />
                  </div>
                  <div className="s2b-mini-cuerpo">
                    <div className="s2b-mini-top">
                      <h4>{c.n}</h4>
                      <span className="s2b-case-pais"><Bandera c={c.bandera} /> {c.pais}</span>
                    </div>
                    <span className="s2b-case-tipo">{c.tipo}</span>
                    <p>{c.solucion}</p>
                    <blockquote className="s2b-mini-frase">
                      <Quote size={13} aria-hidden="true" />
                      <p>{c.frase}<cite>{c.quien}</cite></p>
                    </blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Las siete etapas tecnicas -"De la primera charla al producto
          funcionando"- se fueron de aca: el home se estaba haciendo largo y ese
          recorrido es el complemento natural del proceso comercial. Ahora vive
          en /proceso, abajo del paso 7, que es justo donde se lo nombra. */}

      {/* ============ POR QUÉ STUDIO B2B ============ */}
      {/* Editorial, no tarjetas: el titulo se queda quieto de un lado mientras
          del otro pasan las seis razones, separadas por un filete y nada mas. */}
      <section className="s2b-sec s2b-sec--sm s2b-amb" style={{ background: "linear-gradient(180deg,var(--paper),#FFFFFF)" }}>
        <div className="s2b-wrap s2b-porque">
          <div className="s2b-porque-head s2b-rv">
            <div className="s2b-eyebrow">{t("El equipo", "The team")}</div>
            <h2 className="s2b-h2">{t("¿Por qué", "Why")} <b>Studio B2B</b>{t("?", "?")}</h2>
          </div>
          <div className="s2b-porque-lista">
            {POR_QUE.map((c, i) => {
              const I = c.ic;
              return (
                <article className="s2b-razon s2b-rv" key={c.t} style={{ transitionDelay: Math.min(i, 4) * 60 + "ms" }}>
                  <div className="s2b-razon-ico"><I size={18} /></div>
                  <div>
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TECNOLOGÍAS ============ */}
      <section className="s2b-sec s2b-sec--sm" id="tecnologias">
        <div className="s2b-tech-panel s2b-rv">
          <div className="s2b-tech-inner">
            <div className="s2b-tech-top">
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

      {/* ============ PREGUNTAS FRECUENTES (resumen) ============ */}
      {/* Las mas frecuentes quedan a mano en el home; el listado completo sigue
          viviendo en su propia pagina, /preguntas. */}
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap" style={{ maxWidth: 900 }}>
          <div className="s2b-rv">
            <div className="s2b-eyebrow">{t("Preguntas", "Questions")}</div>
            <h2 className="s2b-h2">{t("Lo que", "What")} <b>{t("suelen preguntarnos", "people usually ask us")}</b></h2>
          </div>
          <div className="s2b-faq">
            {FAQS.slice(0, 6).map((f, i) => (
              <div className="s2b-fi s2b-rv" key={f.q}>
                <button className="s2b-fq" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>
                  {f.q}{faq === i ? <Minus size={19} /> : <Plus size={19} />}
                </button>
                <div className={"s2b-fa" + (faq === i ? " is-open" : "")}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
          <div className="s2b-flow-volver s2b-rv" style={{ marginTop: 26 }}>
            <button className="s2b-link" onClick={() => irA("preguntas")}>
              {t("Ver todas las preguntas frecuentes", "See all frequently asked questions")} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* En el home el formulario estaba quedando sobre fondo claro, con los
          campos oscuros y el texto en lila: la misma banda que usa /proceso lo
          devuelve a su lugar y de paso el cierre entra en el mismo oscuro que
          el footer, sin corte al medio. */}
      <div className="s2b-band s2b-band--dark">
        {bloqueContacto}
      </div>
      </>}

      {/* ============ FOOTER ============ */}
      <div className="s2b-band s2b-band--dark">

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
                  <li><a href="/proceso" onClick={(e) => { e.preventDefault(); irA("proceso"); }}>{t("Cómo trabajamos", "How we work")}</a></li>
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
                  <li>{t("Córdoba, Argentina", "Córdoba, Argentina")}</li>
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

      <div className={"s2b-lang" + (barra ? " s2b-lang--alto" : "")} role="group" aria-label={t("Idioma", "Language")}>
        {IDIOMAS.map((i) => (
          <button key={i} className={idioma === i ? "is-on" : ""} aria-pressed={idioma === i} onClick={() => setIdioma(i)}>{i.toUpperCase()}</button>
        ))}
      </div>

      {/* la barra de "empezamos" en el celular de /proceso; la burbuja de
          WhatsApp se corre para arriba mientras esta puesta */}
      {vista === "proceso" && (
        <div className={"s2b-barra" + (barra ? " is-shown" : "")}>
          <div className="s2b-barra-txt">
            <b>{t("¿Empezamos?", "Shall we start?")}</b>
            <span>{t("La primera llamada no se cobra", "The first call is free")}</span>
          </div>
          <button className="s2b-btn s2b-btn--primary" onClick={() => goTo("contacto")}>
            {t("Contanos tu proyecto", "Tell us")} <ArrowRight size={15} />
          </button>
        </div>
      )}

      <WhatsAppBubble t={t} chips={WA_CHIPS} subida={barra} />
      {/* el schema de preguntas va solo en la pagina donde las preguntas se ven:
          Google lo pide asi para el resultado enriquecido */}
      {vista === "preguntas" && <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />}
    </div>
  );
}
