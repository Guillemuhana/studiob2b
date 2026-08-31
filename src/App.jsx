import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight, ArrowRight, ArrowLeft, Sparkles, Code2, Bot, PenTool,
  Workflow, Smartphone, Plus, Minus, Menu, X, Mail, MapPin, Check,
  Instagram, Linkedin, Github, ChevronDown, Phone, Quote,
} from "lucide-react";
import {
  siReact, siNextdotjs, siJavascript, siTypescript, siNodedotjs, siPython,
  siSupabase, siPostgresql, siTailwindcss, siFlutter, siGraphql, siWordpress,
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

/* retícula fina */
.s2b-neural { position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden;
  -webkit-mask-image: linear-gradient(180deg, #000 58%, transparent 96%);
          mask-image: linear-gradient(180deg, #000 58%, transparent 96%); }
.s2b-neural canvas { display:block; width:100%; height:100%; }
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
.s2b-clogo--img { height:var(--clogo-h); width:auto; object-fit:contain; opacity:1; border-radius:12px; filter:none; background:rgba(255,255,255,.12); padding:10px 16px; }
.s2b-clogo--img:hover { filter:none; opacity:1; }

/* ---------- servicios (filas alternadas) ---------- */
.s2b-rows { display:grid; gap:20px; margin-top:52px; }
.s2b-row { display:grid; grid-template-columns:1fr 1fr; gap:0; border-radius:28px; overflow:hidden; border:1px solid var(--line); background:#fff; box-shadow: 0 24px 60px -40px rgba(24,12,60,.4); }
.s2b-row:nth-child(even) .s2b-row-txt { order:2; }
.s2b-row-txt { padding: clamp(28px,4vw,52px); display:flex; flex-direction:column; justify-content:center; }
.s2b-row-txt h3 { font-size: clamp(22px,2.6vw,30px); margin-bottom:14px; }
.s2b-row-txt p { color:var(--muted); font-size:15.5px; }
.s2b-chips { display:flex; flex-wrap:wrap; gap:7px; margin:20px 0 24px; }
.s2b-chip { font-family:var(--mono); font-size:11px; padding:5px 11px; border-radius:999px; background:var(--paper); border:1px solid var(--line); color:var(--muted); }
.s2b-row-vis { position:relative; min-height:280px; overflow:hidden; display:grid; place-items:center; }
.s2b-blob { position:absolute; border-radius:50%; filter: blur(46px); opacity:.85; }
.s2b-glass { position:relative; width:78%; border-radius:18px; border:1px solid rgba(255,255,255,.5); background: rgba(255,255,255,.55); backdrop-filter: blur(14px); padding:18px; box-shadow: 0 22px 50px -22px rgba(24,12,60,.5); }
.s2b-glass .gl-bar { height:8px; border-radius:999px; background: rgba(24,12,60,.14); margin-bottom:10px; }
.s2b-glass .gl-bar.w1{width:62%} .s2b-glass .gl-bar.w2{width:88%} .s2b-glass .gl-bar.w3{width:44%}
.s2b-glass .gl-row { display:flex; gap:10px; margin-top:14px; }
.s2b-glass .gl-tile { flex:1; height:52px; border-radius:12px; background: linear-gradient(150deg, rgba(109,74,255,.22), rgba(167,140,255,.1)); border:1px solid rgba(109,74,255,.16); }

/* ---------- método ---------- */
.s2b-method { display:grid; grid-template-columns: .95fr 1.05fr; gap:44px; align-items:center; margin-top:48px; }
/* el panel del metodo: mientras no haya imagen queda el degrade solo */
.s2b-method-img { position:relative; border-radius:26px; overflow:hidden; aspect-ratio:16/10;
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
  position:relative; width:100%; margin-top:8px; padding:60px 0 64px; overflow:hidden;
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

.s2b-tiles { position:relative; display:grid; grid-template-columns:repeat(12,1fr); gap:14px; }
.s2b-tile {
  position:relative; min-width:0; aspect-ratio:1/1; border-radius:20px; display:grid; place-items:center;
  background:rgba(255,255,255,.045); border:1px solid rgba(167,140,255,.12);
  transition: transform .3s cubic-bezier(.2,.7,.2,1), background .3s, border-color .3s, box-shadow .3s;
}
.s2b-tile--void { background:rgba(255,255,255,.018); border-color:rgba(167,140,255,.07); }
.s2b-tile:not(.s2b-tile--void) { animation: s2b-tile-in .5s cubic-bezier(.2,.7,.2,1) backwards; }
@keyframes s2b-tile-in { from { opacity:0; transform:translateY(14px) scale(.94); } }
.s2b-tile:not(.s2b-tile--void):hover {
  transform:translateY(-6px); background:rgba(255,255,255,.075);
  border-color:rgba(167,140,255,.42); box-shadow:0 24px 46px -24px rgba(109,74,255,.85);
}
.s2b-tile-logo { width:38px; height:38px; transition: transform .3s; }
.s2b-tile:hover .s2b-tile-logo { transform:scale(1.09); }
.s2b-tile-name {
  position:absolute; left:6px; right:6px; bottom:11px; text-align:center;
  font-family:var(--mono); font-size:10px; letter-spacing:.03em; color:#B3ABD6;
  opacity:0; transform:translateY(5px); transition:opacity .3s, transform .3s;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.s2b-tile:hover .s2b-tile-name { opacity:1; transform:none; }
/* desfase alternado: funciona con cualquier cantidad de columnas */
.s2b-tiles > *:nth-child(even) { margin-top:26px; }

@media (max-width: 1500px) { .s2b-tiles { grid-template-columns:repeat(8,1fr); } }
@media (max-width: 1180px) { .s2b-tiles { grid-template-columns:repeat(6,1fr); } }

/* ---------- métricas ---------- */
.s2b-stats { display:grid; grid-template-columns:repeat(5,1fr); gap:0; border-radius:26px; overflow:hidden;
  border:1px solid rgba(167,140,255,.22);
  background: linear-gradient(140deg, #2A1A6B 0%, #150B3F 52%, #0B0718 100%);
  box-shadow: 0 40px 80px -50px rgba(24,12,60,.85); }
.s2b-stat { padding:34px 22px; border-right:1px solid rgba(167,140,255,.18); }
.s2b-stat:last-child { border-right:none; }
.s2b-stat b { display:block; font-family:var(--display); font-size:clamp(28px,3.2vw,40px); font-weight:700; color:#fff; }
.s2b-stat span { font-family:var(--mono); font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:#A79EC8; }

/* ---------- testimonios ---------- */
.s2b-quotes { position:relative; margin-top:44px; overflow:hidden; }
.s2b-qtrack { display:flex; transition: transform .55s cubic-bezier(.2,.8,.2,1); }
.s2b-qslide { min-width:100%; padding:2px; }
.s2b-qcard { background:#fff; border:1px solid var(--line); border-radius:26px; padding:clamp(26px,3.6vw,44px); display:grid; grid-template-columns:auto 1fr; gap:32px; box-shadow:0 26px 60px -44px rgba(24,12,60,.6); }
.s2b-qphoto { width:132px; height:160px; border-radius:20px; display:grid; place-items:center; font-family:var(--display); font-weight:700; font-size:34px; color:#fff; flex:none; }
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
.s2b-fa { overflow:hidden; max-height:0; opacity:0; transition: max-height .42s cubic-bezier(.2,.8,.2,1), opacity .32s; }
.s2b-fa.is-open { max-height:300px; opacity:1; }
.s2b-fa p { color:var(--muted); font-size:15px; padding-bottom:22px; max-width:70ch; }

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
@media (max-width: 1000px) {
  .s2b-sec { padding:80px 0; }
  .s2b-split, .s2b-method, .s2b-form-grid, .s2b-head { grid-template-columns:1fr; gap:36px; }
  .s2b-hero { padding-top:64px; }
  .s2b-shortcuts { grid-template-columns:1fr; margin-top:48px; padding-bottom:48px; }
  .s2b-row { grid-template-columns:1fr; }
  .s2b-row:nth-child(even) .s2b-row-txt { order:0; }
  .s2b-row-vis { min-height:230px; order:-1; }
  .s2b-tiles { grid-template-columns:repeat(4,1fr); }
  .s2b-tech-panel { padding:28px 0 32px; }
  .s2b-stats { grid-template-columns:repeat(2,1fr); }
  .s2b-stat { border-bottom:1px solid rgba(167,140,255,.18); }
  .s2b-qcard { grid-template-columns:1fr; gap:22px; }
  .s2b-qphoto { width:96px; height:96px; border-radius:22px; font-size:26px; }
  .s2b-foot-grid { grid-template-columns:1fr 1fr; }
  .s2b-menu { display:none; }
  .s2b-burger { display:block; }
  .s2b-head { align-items:start; }
}
@media (max-width: 600px) {
  .s2b-logos { padding:44px 0; --clogo-h:68px; }
  .s2b-marq-track { gap:44px; }
  .s2b-clogo { font-size:22px; }
  .s2b-clogo--img { padding:8px 12px; border-radius:10px; }
  .s2b-brand { --mark:58px; gap:11px; }
  .s2b-brand-txt { font-size:17px; }
  .s2b-tiles { grid-template-columns:repeat(3,1fr); gap:10px; }
  .s2b-tiles > *:nth-child(even) { margin-top:14px; }
  .s2b-tile-logo { width:30px; height:30px; }
  .s2b-foot-grid { grid-template-columns:1fr; }
  .s2b-grid { background-size:52px 52px; }
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

/* ================= datos ================= */

const SOLUCIONES = [
  { id: "software", icon: Code2, t: "Software a medida", d: "Plataformas internas y portales que tu equipo usa todos los días." },
  { id: "apps", icon: Smartphone, t: "Apps móviles", d: "iOS y Android desde una base, con publicación y updates incluidos." },
  { id: "agentes", icon: Bot, t: "Agentes de IA", d: "Asistentes que atienden y resuelven dentro de tus herramientas." },
];

/* esc: los logos que en su archivo vienen mas chicos piden un poco mas de alto */
const CLIENTES = [
  { n: "Nuevo Munich", src: "/clientes/nuevo-munich.png" },
  { n: "Numera", src: "/clientes/logonumera.jpg" },
  { n: "IPIC SMO", src: "/clientes/ipicsmo.png", esc: 1.2 },
  { n: "Instituto de Investigaciones Cl\u00ednicas", src: "/clientes/IICC.png", esc: 1.1 },
  { n: "Pecifa Nacional", src: "/clientes/pecifa.png", esc: 1.3 },
  { n: "Ninit Group", src: "/clientes/ninit-group.png" },
];

const SERVICIOS = [
  {
    icon: Bot, t: "Agentes de IA en producción",
    d: "Asistentes que atienden por WhatsApp, califican consultas y escriben en tu CRM. Con la información real del negocio adentro, no respuestas de manual. Y con una persona que toma el control cuando el caso lo pide.",
    chips: ["RAG", "Function calling", "Evaluaciones", "Handoff humano"],
    cta: "Ver cómo funciona", to: "agentes",
    blobs: ["#A78CFF", "#6D4AFF"], bg: "linear-gradient(150deg,#F0ECFF,#E4DCFF)",
  },
  {
    icon: Code2, t: "Software a medida",
    d: "Sistemas de gestión, portales de clientes y plataformas de operación. Arquitectura simple y documentada, para que tu equipo pueda sostenerla sin depender de nosotros para cada cambio.",
    chips: ["React", "Node", "PostgreSQL", "APIs", "AWS"],
    cta: "Conocer el enfoque", to: "metodo",
    blobs: ["#8FB4FF", "#6D4AFF"], bg: "linear-gradient(150deg,#EAF0FF,#E1E7FF)",
  },
  {
    icon: PenTool, t: "Diseño de producto y apps",
    d: "Investigación, flujos, prototipo navegable y sistema de diseño. Las decisiones caras se toman acá, cuando cambiar una pantalla cuesta una tarde y no dos sprints.",
    chips: ["UX research", "UI", "Design system", "React Native"],
    cta: "Ver trabajos", to: "clientes",
    blobs: ["#FFC6E8", "#A78CFF"], bg: "linear-gradient(150deg,#FBEDFF,#F0E6FF)",
  },
];

const ETAPAS = [
  { n: "01", t: "Diagnóstico", d: "Dos semanas mirando el negocio. Salís con alcance cerrado, plan y número." },
  { n: "02", t: "Prototipo", d: "Un prototipo navegable que tu equipo prueba antes de que escribamos código." },
  { n: "03", t: "Entregas", d: "Ciclos de dos semanas con demo en vivo sobre el producto real." },
  { n: "04", t: "Operación", d: "Monitoreo, soporte y roadmap trimestral. El código es tuyo desde el día uno." },
];

const AGENT_LINES = [
  { t: "> agente.iniciar('comercial')", c: "cmd" },
  { t: "conectado: WhatsApp · CRM · Calendario", c: "" },
  { t: "base de conocimiento: 412 documentos", c: "" },
  { t: "listo en 1.8s", c: "ok" },
  { t: "> consulta entrante · +54 351 ***", c: "cmd" },
  { t: "intención: cotizar · urgencia alta", c: "" },
  { t: "respuesta enviada · reunión 11:30", c: "ok" },
  { t: "> resumen diario → equipo comercial", c: "cmd" },
  { t: "84 consultas · 71 resueltas · 13 derivadas", c: "ok" },
];

const AGENT_PTS = [
  "Habla con tus precios, tu stock y tus políticas. No improvisa.",
  "Deriva a una persona con todo el contexto cuando detecta un caso sensible.",
  "Cada respuesta queda registrada y evaluada contra casos reales.",
  "Corre sobre tu infraestructura, con tus datos donde vos decidas.",
];

const TECNOLOGIAS = {
  "Desarrollo de Software": [
    siReact, siNextdotjs, siJavascript, siTypescript, siNodedotjs, siPython,
    siWordpress, siSupabase, siPostgresql, siTailwindcss, siFlutter, siGraphql,
  ],
  "Inteligencia Artificial": [
    siOpenai, siClaude, siGooglegemini, siGroq, siMistralai, siDeepseek,
    siPerplexity, siHuggingface, siLangchain, siOllama, siN8n, siElevenlabs,
  ],
  "Infraestructura IT": [
    siDocker, siKubernetes, siGooglecloud, siVercel, siCloudflare, siLinux,
    siNginx, siTerraform, siAnsible, siGithubactions, siRedis, siGrafana,
  ],
  "Ciberseguridad": [
    siOwasp, siAuth0, siKeycloak, siLetsencrypt, siJsonwebtokens, siVault,
    siWireshark, siKalilinux, siBurpsuite, siWireguard, siSnyk, siBitwarden,
  ],
};

/* Mosaico de 6x4: true = celda con logo, false = celda vacía decorativa.
   MASK_INDEX mapea cada celda llena a su posición en el array de logos. */
const TILE_MASK = [
  true, false, false, true, false, true,
  false, true, true, false, true, false,
  true, false, true, false, false, true,
  false, true, false, true, true, false,
];
const MASK_INDEX = (() => {
  let n = 0;
  return TILE_MASK.map((f) => (f ? n++ : -1));
})();

const STATS = [
  { to: 10, sfx: "+", l: "Años en el mercado" },
  { to: 140, sfx: "+", l: "Proyectos entregados" },
  { to: 32, sfx: "", l: "Agentes en operación" },
  { to: 18, sfx: "", l: "Personas en el equipo" },
  { to: 98, sfx: "%", l: "Clientes que repiten" },
];

const TESTIMONIOS = [
  { q: "Entendieron el negocio antes de proponer tecnología. En diez años trabajando con proveedores, no me había pasado. El sistema salió en el plazo que dijeron y sigue creciendo con nosotros.", n: "Marina Ferreyra", r: "Directora de Operaciones", e: "Grupo Andino", cat: "Software a medida", ic: Code2, i: "MF", g: "linear-gradient(150deg,#6D4AFF,#2A1568)" },
  { q: "El agente de WhatsApp absorbió el 70% de las consultas en el primer mes. El equipo comercial recuperó las mañanas y ahora atiende solo lo que vale la pena atender.", n: "Diego Salas", r: "Gerente Comercial", e: "Nortex", cat: "Agentes de IA", ic: Bot, i: "DS", g: "linear-gradient(150deg,#A78CFF,#4B2FD6)" },
  { q: "Trabajan con orden y comunicación real. Cada dos semanas veíamos el producto funcionando, no un informe de avance. Eso cambió la relación con nuestro directorio.", n: "Pablo Iriarte", r: "CIO", e: "Vialta", cat: "Diseño de producto", ic: PenTool, i: "PI", g: "linear-gradient(150deg,#8FB4FF,#3B2296)" },
];

const FAQS = [
  { q: "¿Cuánto tarda un proyecto?", a: "Un agente de IA acotado sale en 4 a 6 semanas. Una plataforma completa, entre 3 y 6 meses, con entregas usables cada dos semanas desde la tercera." },
  { q: "¿Cómo cobran?", a: "El diagnóstico tiene precio cerrado. Después, por ciclos mensuales o por alcance fijo, según prefieras. Sin horas sorpresa al final del mes." },
  { q: "¿El código queda nuestro?", a: "Sí. Repositorio, infraestructura y documentación a tu nombre desde el primer día. Si mañana querés seguir con otro equipo, podés hacerlo sin trabas." },
  { q: "¿Trabajan fuera de Argentina?", a: "Sí. Hoy tenemos clientes en Latinoamérica, España y Estados Unidos, en modalidad remota con reuniones fijas semanales." },
  { q: "¿Se puede empezar chico?", a: "Es lo que recomendamos. Un primer alcance de 4 a 6 semanas que resuelva un problema concreto y deje algo funcionando en producción." },
];

const FORM_TO = "guillemuhana@gmail.com";
const WA_NUM = "5493515931673";
const WA_SHOW = "+54 9 351 593-1673";
const waLink = (msg) => "https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(msg);
const WA_CHIPS = [
  "Hola, quiero un agente de IA para mi empresa.",
  "Hola, necesito desarrollar un software a medida.",
  "Hola, quiero hacerles una consulta.",
];

const NAV_LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "metodo", label: "Método" },
  { id: "clientes", label: "Clientes" },
];

/* ================= utilidades ================= */

/* Los logos casi negros (Next.js, OWASP, JWT) se aclaran para leerse sobre el panel oscuro. */
function brandColor(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.26 ? "#E7E1FF" : "#" + hex;
}

function BrandLogo({ icon }) {
  return (
    <svg className="s2b-tile-logo" viewBox="0 0 24 24" role="img" aria-label={icon.title} fill={brandColor(icon.hex)}>
      <path d={icon.path} fillRule={icon.regla || "nonzero"} />
    </svg>
  );
}

/* Fondo del hero: una red de neuronas.
   En reposo respira en violeta, apenas insinuada. Cuando el mouse -o el dedo,
   en el celular- se queda quieto sobre una zona, las neuronas de alrededor se
   van juntando: la red pensando. Cuando termina de pensar, esos mismos nodos
   se acomodan sobre el contorno de una app y la app se dibuja un segundo antes
   de deshacerse y devolver los nodos a la red. Canvas propio, sin dependencias. */
const RED = {
  densidad: 13000,   // un nodo cada N px2 de hero
  min: 34,
  max: 108,
  enlace: 150,       // distancia a la que dos nodos se unen
  velocidad: 0.22,
  puntero: 250,      // radio en el que el puntero junta neuronas
  arco: 88,          // a esta distancia de un boton o del header, el nodo hace chispa
};

/* Tiempos de una idea, en segundos: pensar, apretarse, abrirse, vivir, irse */
const IDEA = { nodos: 34, piensa: 1.8, junta: 0.46, arma: 0.62, vive: 2.1, sale: 0.8, pausa: 0.7, anillo: 22 };

/* Las ideas que llega a formar la red: lo que le construimos al cliente */
const IDEAS = [
  { rotulo: "APP A MEDIDA", w: 148, h: 104, dibujo: "grilla" },
  { rotulo: "DASHBOARD",    w: 168, h: 100, dibujo: "panel" },
  { rotulo: "APP MOVIL",    w: 84,  h: 148, dibujo: "movil" },
  { rotulo: "AGENTE IA",    w: 152, h: 104, dibujo: "chat" },
  { rotulo: "PORTAL B2B",   w: 164, h: 102, dibujo: "grilla" },
  { rotulo: "INTEGRACION",  w: 156, h: 100, dibujo: "panel" },
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

/* el interior de la app: cada idea se dibuja distinta para que se lea que no
   es un rectangulo cualquiera sino un producto */
function interiorIdea(ctx, tipo, x, y, an, al, a) {
  const linea = (op) => "rgba(214,201,255," + (op * a).toFixed(3) + ")";
  const lleno = (op) => "rgba(167,140,255," + (op * a).toFixed(3) + ")";
  const oro = (op) => "rgba(255,202,128," + (op * a).toFixed(3) + ")";
  const pad = 11;
  const cx = x + pad, ancho = an - pad * 2;

  /* barra de titulo, comun a todas */
  ctx.fillStyle = lleno(0.5);
  ctx.fillRect(cx, y + 11, Math.min(38, ancho * 0.4), 3);
  ctx.fillStyle = linea(0.3);
  ctx.fillRect(x, y + 22, an, 1);

  if (tipo === "panel") {
    const base = y + al - 13;
    const alturas = [0.32, 0.62, 0.44, 0.86, 0.58];
    const bw = 9, sep = 6;
    alturas.forEach((k, i) => {
      const bh = (al - 44) * k;
      ctx.fillStyle = lleno(0.55);
      ctx.fillRect(cx + i * (bw + sep), base - bh, bw, bh);
    });
    ctx.strokeStyle = oro(0.55);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    alturas.forEach((k, i) => {
      const px = cx + i * (bw + sep) + bw / 2;
      const py = base - (al - 44) * k - 6;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.lineWidth = 1;
  } else if (tipo === "movil") {
    for (let i = 0; i < 4; i++) {
      const fy = y + 32 + i * 16;
      ctx.fillStyle = lleno(0.4);
      ctx.fillRect(cx, fy, 9, 9);
      ctx.fillStyle = linea(0.45);
      ctx.fillRect(cx + 14, fy + 1, ancho - 14, 2);
      ctx.fillRect(cx + 14, fy + 6, ancho - 24, 2);
    }
    ctx.fillStyle = linea(0.25);
    ctx.fillRect(x, y + al - 16, an, 1);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i === 1 ? oro(0.7) : lleno(0.5);
      ctx.beginPath();
      ctx.arc(x + an * (0.28 + i * 0.22), y + al - 8, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (tipo === "chat") {
    const burbuja = (bx, by, bw, color) => {
      rutaRedonda(ctx, bx, by, bw, 13, 6);
      ctx.fillStyle = color;
      ctx.fill();
    };
    burbuja(cx, y + 31, ancho * 0.56, lleno(0.4));
    burbuja(x + an - pad - ancho * 0.62, y + 50, ancho * 0.62, oro(0.3));
    burbuja(cx, y + 69, ancho * 0.44, lleno(0.4));
    ctx.fillStyle = linea(0.4);
    ctx.fillRect(cx, y + al - 14, ancho, 2);
  } else {
    const cols = 3, filas = 2;
    const gw = (ancho - (cols - 1) * 7) / cols;
    const gh = (al - 40 - (filas - 1) * 7) / filas;
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < cols; c++) {
        rutaRedonda(ctx, cx + c * (gw + 7), y + 30 + f * (gh + 7), gw, gh, 4);
        ctx.fillStyle = f === 0 && c === 1 ? oro(0.32) : lleno(0.32);
        ctx.fill();
      }
    }
  }
}

function NeuralBg() {
  const host = useRef(null);
  const lienzo = useRef(null);

  useEffect(() => {
    const box = host.current;
    const cv = lienzo.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, nodos = [], raf = 0, vivo = true, previo = 0, cuadro = 0, reloj = 0;
    const puntero = { x: 0, y: 0, ax: 0, ay: 0, activo: false, dedo: false, carga: 0, pausa: 0 };
    let idea = null;
    let destello = 0;      // el fogonazo del instante en que la idea salta
    let pulsos = [];       // senales corriendo por la red hacia el foco
    let latidos = [];      // las ondas que larga el foco mientras se piensa
    let proxLatido = 0;

    /* header, pill y botones del hero: los nodos les tiran chispas al pasar cerca */
    let objetivos = [];
    const medirObjetivos = () => {
      const r = box.getBoundingClientRect();
      objetivos = Array.from(
        document.querySelectorAll(".s2b-nav-in, .s2b-hero .s2b-btn, .s2b-pill")
      ).map((el) => {
        const b = el.getBoundingClientRect();
        return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height };
      });
    };

    const sembrar = () => {
      const n = Math.round(Math.min(RED.max, Math.max(RED.min, (w * h) / RED.densidad)));
      nodos = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * RED.velocidad,
        vy: (Math.random() - 0.5) * RED.velocidad,
        r: 0.9 + Math.random() * 1.7,
        calor: 0,
        tomado: false,
        sx: 0, sy: 0, ax: 0, ay: 0, tx: 0, ty: 0,
      }));
      idea = null;
      puntero.carga = 0;
      pulsos = [];
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
      sembrar();
      medirObjetivos();
    };

    /* la idea cuaja: tomamos los nodos mas cercanos, primero los apretamos en un
       anillo -el instante justo antes de entender- y desde ese nudo se abren sobre
       el contorno de la app, emparejados por angulo para que no se crucen */
    const nacerIdea = (x, y) => {
      const receta = IDEAS[Math.floor(Math.random() * IDEAS.length)];
      const an = Math.min(receta.w, w - 48), al = Math.min(receta.h, h - 90);
      if (an < 70 || al < 70) return;
      const cx = Math.min(w - an / 2 - 20, Math.max(an / 2 + 20, x));
      const cy = Math.min(h - al / 2 - 70, Math.max(al / 2 + 20, y));

      const elegidos = nodos
        .filter((p) => !p.tomado)
        .map((p) => ({ p, d: Math.hypot(p.x - cx, p.y - cy) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, Math.min(IDEA.nodos, nodos.length))
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
      puntero.carga = 0;
    };

    const moverIdea = (dt) => {
      if (!idea) return;
      idea.t += dt;
      if (idea.fase === "junta") {
        /* el apreton: las neuronas caen juntas al centro y ahi se frenan */
        const k = Math.min(1, idea.t / IDEA.junta);
        const e = k * k;
        for (const p of idea.nodos) {
          p.x = p.sx + (p.ax - p.sx) * e;
          p.y = p.sy + (p.ay - p.sy) * e;
        }
        if (k >= 1) { idea.fase = "arma"; idea.t = 0; destello = 1; }
      } else if (idea.fase === "arma") {
        /* y de ese nudo se abre la app, con un pelin de rebote */
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
        /* la idea se suelta: los nodos se abren y vuelven a la red */
        const k = Math.min(1, idea.t / IDEA.sale);
        for (const p of idea.nodos) {
          const a = Math.atan2(p.ty - idea.y, p.tx - idea.x);
          p.x = p.tx + Math.cos(a) * k * 26;
          p.y = p.ty + Math.sin(a) * k * 26;
        }
        if (k >= 1) {
          for (const p of idea.nodos) {
            p.tomado = false;
            const a = Math.atan2(p.y - idea.y, p.x - idea.x);
            p.vx = Math.cos(a) * 0.34;
            p.vy = Math.sin(a) * 0.34;
          }
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

      /* el unico resplandor calido de toda la escena, y dura un segundo */
      const g = ctx.createRadialGradient(idea.x, idea.y, 0, idea.x, idea.y, idea.w * 1.1);
      g.addColorStop(0, "rgba(255,196,110," + (0.16 * a).toFixed(3) + ")");
      g.addColorStop(1, "rgba(255,196,110,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(idea.x, idea.y, idea.w * 1.1, 0, Math.PI * 2);
      ctx.fill();

      rutaRedonda(ctx, x, y, idea.w, idea.h, 14);
      ctx.fillStyle = "rgba(16,10,40," + (0.5 * a).toFixed(3) + ")";
      ctx.fill();
      ctx.strokeStyle = "rgba(226,216,255," + (0.62 * a).toFixed(3) + ")";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.save();
      rutaRedonda(ctx, x, y, idea.w, idea.h, 14);
      ctx.clip();
      interiorIdea(ctx, idea.receta.dibujo, x, y, idea.w, idea.h, a);
      ctx.restore();

      /* el remate: primero que producto es, y abajo la promesa */
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(203,186,255," + (0.85 * a).toFixed(3) + ")";
      ctx.fillText(idea.receta.rotulo, idea.x, y + idea.h + 12);

      const frase = "Convert\u00ed tu idea en realidad";
      ctx.font = "700 " + (w < 560 ? 14 : 18) + "px 'Space Grotesk', 'Segoe UI', system-ui, sans-serif";
      /* la frase es mas ancha que la tarjeta: la corremos para que entre entera */
      const anchoFrase = ctx.measureText(frase).width;
      const fx = Math.min(w - anchoFrase / 2 - 10, Math.max(anchoFrase / 2 + 10, idea.x));
      ctx.fillStyle = "rgba(255,255,255," + (0.96 * a).toFixed(3) + ")";
      ctx.fillText(frase, fx, y + idea.h + 28);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    };

    /* mientras la red piensa manda senales al foco: cuanto mas cerca esta la
       idea, mas seguido disparan */
    const soltarPulsos = (dt) => {
      if (idea || !puntero.activo || puntero.carga < 0.1 || !nodos.length) return;
      const cuantos = puntero.carga * puntero.carga * 62 * dt;
      let n = Math.floor(cuantos) + (Math.random() < cuantos % 1 ? 1 : 0);
      while (n-- > 0 && pulsos.length < 70) {
        const p = nodos[Math.floor(Math.random() * nodos.length)];
        if (!p || p.tomado) continue;
        const d = Math.hypot(p.x - puntero.x, p.y - puntero.y);
        if (d > RED.puntero || d < 34) continue;
        pulsos.push({ x0: p.x, y0: p.y, x1: puntero.x, y1: puntero.y, t: 0, dur: 0.3 + Math.random() * 0.32 });
      }
    };

    const pintarLatidos = (dt) => {
      if (!latidos.length) return;
      const siguen = [];
      ctx.lineWidth = 1.2;
      for (const o of latidos) {
        o.t += dt;
        const k = o.t / 0.9;
        if (k >= 1) continue;
        siguen.push(o);
        ctx.strokeStyle = "rgba(196,176,255," + ((1 - k) * (1 - k) * 0.3 * o.f).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(o.x, o.y, 10 + k * 130, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
      latidos = siguen;
    };

    const pintarPulsos = (dt) => {
      if (!pulsos.length) return;
      const siguen = [];
      for (const s of pulsos) {
        s.t += dt;
        const k = s.t / s.dur;
        if (k >= 1) continue;
        siguen.push(s);
        const e = k * k;                    // acelera al acercarse al foco
        const cola = Math.max(0, e - 0.18);
        const x = s.x0 + (s.x1 - s.x0) * e, y = s.y0 + (s.y1 - s.y0) * e;
        const bx = s.x0 + (s.x1 - s.x0) * cola, by = s.y0 + (s.y1 - s.y0) * cola;
        const alfa = (1 - k) * 0.95;
        ctx.strokeStyle = "rgba(214,200,255," + (alfa * 0.6).toFixed(3) + ")";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgba(246,242,255," + alfa.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      pulsos = siguen;
    };

    const pintar = (dt) => {
      ctx.clearRect(0, 0, w, h);
      reloj += dt;
      destello = Math.max(0, destello - dt * 2.3);
      const D = RED.enlace, D2 = D * D;
      /* los botones se mueven con el scroll y el nav es sticky: refrescamos seguido pero no cada cuadro */
      if (cuadro++ % 20 === 0) medirObjetivos();
      const chispas = [];

      /* cuanto se movio el puntero: pensar pide quedarse quieto */
      const corrida = Math.hypot(puntero.x - puntero.ax, puntero.y - puntero.ay);
      puntero.ax = puntero.x; puntero.ay = puntero.y;
      if (puntero.pausa > 0) puntero.pausa -= dt;

      if (!idea) {
        if (puntero.activo && puntero.pausa <= 0 && !quieto) {
          const quietud = puntero.dedo ? 1 : Math.max(0, 1 - corrida / 10);
          /* si el puntero se pasea la idea se enfria: pensar pide quedarse quieto */
          if (quietud < 0.15) puntero.carga = Math.max(0, puntero.carga - dt * 0.5);
          else puntero.carga = Math.min(1, puntero.carga + ((0.12 + quietud * 0.88) / IDEA.piensa) * dt);
          if (puntero.carga >= 1) nacerIdea(puntero.x, puntero.y);
        } else {
          puntero.carga = Math.max(0, puntero.carga - dt * 0.9);
        }
        soltarPulsos(dt);

        /* el pensamiento late: cada tanto sale una onda del foco y la red se
           cierra un poco mas de golpe. Los latidos se aceleran al final */
        if (puntero.activo && puntero.carga > 0.08) {
          proxLatido -= dt;
          if (proxLatido <= 0) {
            latidos.push({ x: puntero.x, y: puntero.y, t: 0, f: 0.5 + puntero.carga * 0.5 });
            proxLatido = 0.66 - puntero.carga * 0.38;
            for (const p of nodos) {
              if (p.tomado) continue;
              const dx = puntero.x - p.x, dy = puntero.y - p.y;
              const d = Math.hypot(dx, dy) || 1;
              if (d > RED.puntero || d < 28) continue;
              const k = (1 - d / RED.puntero) * (0.3 + puntero.carga * 0.7) * 0.55;
              p.vx += (dx / d) * k;
              p.vy += (dy / d) * k;
            }
          }
        } else {
          proxLatido = 0;
        }
      }

      for (const p of nodos) {
        if (p.tomado || quieto) continue;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.min(w, Math.max(0, p.x)); }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.min(h, Math.max(0, p.y)); }
      }

      moverIdea(dt);

      /* enlaces */
      ctx.lineWidth = 1;
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > D2) continue;
          const cerca = 1 - Math.sqrt(d2) / D;
          const calor = Math.max(a.calor, b.calor);
          const c = tono(FRIO_LINK, CLARO_LINK, calor);
          const alfa = (0.05 + cerca * 0.26) * (1 + calor * 0.9);
          ctx.strokeStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alfa.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      /* el puntero junta neuronas: cuanto mas avanzado el pensamiento, mas tiran */
      for (const p of nodos) {
        let objetivo = 0;
        if (puntero.activo && !p.tomado) {
          const dx = puntero.x - p.x, dy = puntero.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < RED.puntero) {
            const cerca = 1 - d / RED.puntero;
            objetivo = cerca * (0.12 + puntero.carga * 0.6);
            /* no caen derecho al foco: lo orbitan, como dandole vueltas al asunto,
               y con el pensamiento avanzado se frenan y se amontonan */
            const apuro = puntero.carga * puntero.carga;   // recien al final aprieta
            const fuerza = (0.012 + apuro * 0.17) * cerca;
            const giro = puntero.carga * 0.036 * cerca;
            if (d > 30) {
              p.vx += (dx / d) * fuerza - (dy / d) * giro;
              p.vy += (dy / d) * fuerza + (dx / d) * giro;
            } else {
              p.vx *= 0.88; p.vy *= 0.88;
            }
            const freno = 1 - 0.075 * puntero.carga * cerca;
            p.vx *= freno; p.vy *= freno;
          }
        }

        if (p.tomado) {
          p.calor += (0.85 - p.calor) * 0.09;
        } else {
          const v = Math.hypot(p.vx, p.vy);
          const tope = 0.9 + puntero.carga * 1.2;
          if (v > tope) { p.vx *= tope / v; p.vy *= tope / v; }
          else if (!puntero.activo && v > RED.velocidad) { p.vx *= 0.986; p.vy *= 0.986; }
          p.calor += (objetivo - p.calor) * 0.07;
        }

        /* chispas contra el header y los botones: raras, y solo si el nodo esta encendido */
        if (p.calor > 0.45) {
          for (const t of objetivos) {
            const cx = Math.max(t.x, Math.min(p.x, t.x + t.w));
            const cy = Math.max(t.y, Math.min(p.y, t.y + t.h));
            const d = Math.hypot(p.x - cx, p.y - cy);
            if (d > RED.arco) continue;
            const fuerza = 1 - d / RED.arco;
            if (Math.random() < 0.02 * fuerza * p.calor) {
              chispas.push([p.x, p.y, cx, cy, fuerza * p.calor]);
            }
          }
        }
      }

      /* halo frio detras de los nodos encendidos */
      for (const p of nodos) {
        if (p.calor < 0.25) continue;
        const R = 16 + p.calor * 44;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
        g.addColorStop(0, "rgba(186,164,255," + (0.13 * p.calor).toFixed(3) + ")");
        g.addColorStop(1, "rgba(186,164,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
        ctx.fill();
      }

      pintarLatidos(dt);
      pintarPulsos(dt);
      pintarIdea();

      /* el fogonazo: el anillo que se abre cuando la idea salta */
      if (destello > 0 && idea) {
        const k = 1 - destello;
        ctx.strokeStyle = "rgba(255,226,180," + (0.7 * destello * destello).toFixed(3) + ")";
        ctx.lineWidth = 0.6 + destello * 3.4;
        ctx.beginPath();
        ctx.arc(idea.x, idea.y, 14 + k * 190, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }

      for (const p of nodos) {
        const c = tono(FRIO_NODO, CLARO_NODO, p.calor);
        ctx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.42 + p.calor * 0.5).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + p.calor * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const c of chispas) rayo(ctx, c[0], c[1], c[2], c[3], c[4]);
      ctx.lineWidth = 1;

      /* el puntero tira hilos a lo que tiene cerca, y un anillo que se cierra
         mientras la idea se termina de pensar */
      if (puntero.activo && !idea) {
        for (const p of nodos) {
          if (p.tomado) continue;
          const d = Math.hypot(p.x - puntero.x, p.y - puntero.y);
          if (d > RED.puntero) continue;
          const alfa = (1 - d / RED.puntero) * (0.1 + puntero.carga * 0.26);
          ctx.strokeStyle = "rgba(198,180,255," + alfa.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(puntero.x, puntero.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        if (puntero.carga > 0.06) {
          /* el arco que se cierra: cuanto le falta a la idea */
          ctx.lineWidth = 1.6;
          ctx.strokeStyle = "rgba(214,198,255," + (0.14 + puntero.carga * 0.4).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(puntero.x, puntero.y, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * puntero.carga);
          ctx.stroke();
          /* y adentro un latido que se acelera a medida que se acerca */
          const late = Math.sin(reloj * (4.5 + puntero.carga * 11)) * 0.5 + 0.5;
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(226,214,255," + (0.06 + puntero.carga * late * 0.3).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(puntero.x, puntero.y, 11 + late * 9 * (0.35 + puntero.carga), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const bucle = (ahora) => {
      if (!vivo) return;
      const dt = Math.min(0.05, previo ? (ahora - previo) / 1000 : 0.016);
      previo = ahora;
      if (!document.hidden) pintar(dt);
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

    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerdown", alApoyar);
      window.removeEventListener("pointerup", alSoltar);
      window.removeEventListener("pointercancel", alSoltar);
      window.removeEventListener("pointerleave", alSalir);
    };
  }, []);

  return (
    <div className="s2b-neural" ref={host} aria-hidden="true">
      <canvas ref={lienzo} />
    </div>
  );
}

function Terminal() {
  const [n, setN] = useState(0);

  /* escribe las lineas de a una y vuelve a empezar */
  useEffect(() => {
    const quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) { setN(AGENT_LINES.length); return; }
    if (n >= AGENT_LINES.length) {
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
        {AGENT_LINES.slice(0, n).map((l, i) => (
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

function WhatsAppBubble() {
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
        <div className="s2b-wa-panel" role="dialog" aria-label="Escribinos por WhatsApp">
          <div className="s2b-wa-top">
            <img src="/logo.png" alt="" aria-hidden="true" />
            <div>
              <b>Studio B2B</b>
              <span><i /> Respondemos en el día</span>
            </div>
            <button className="s2b-wa-x" onClick={() => setOpen(false)} aria-label="Cerrar"><X size={16} /></button>
          </div>
          <div className="s2b-wa-body">
            <p className="s2b-wa-msg">¡Hola! 👋 Contanos qué necesitás y seguimos la charla por WhatsApp.</p>
            <div className="s2b-wa-chips">
              {WA_CHIPS.map((c) => <button key={c} onClick={() => go(c)}>{c}</button>)}
            </div>
          </div>
          <button className="s2b-wa-cta" onClick={() => go("Hola Studio B2B, quiero hacerles una consulta.")}>
            <WhatsappGlyph /> Abrir WhatsApp
          </button>
        </div>
      )}
      <button
        className={"s2b-wa-fab" + (open ? " is-open" : "")}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Cerrar el chat de WhatsApp" : "Escribinos por WhatsApp"}
      >
        {open ? <X size={24} /> : <WhatsappGlyph />}
        <span className="s2b-wa-tip">Escribinos por WhatsApp</span>
      </button>
    </div>
  );
}

function Counter({ to, sfx }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1500, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: .4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{Math.round(v)}{sfx}</span>;
}

/* ================= página ================= */

export default function StudioB2B() {
  const heroRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [pop, setPop] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [tab, setTab] = useState("Desarrollo de Software");
  const [qi, setQi] = useState(0);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", tel: "", tipo: "Agente de IA", msg: "" });

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
    const io = new IntersectionObserver(
      (en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: .1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".s2b-rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((id) => {
    setDrawer(false); setPop(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const send = async () => {
    if (!form.nombre.trim() || !form.email.trim()) {
      setFormErr("Necesitamos al menos tu nombre y tu email.");
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
      setFormErr("No pudimos enviar el mensaje. Escribinos por WhatsApp y lo resolvemos.");
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
            <button className="s2b-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="s2b-mark-halo"><img className="s2b-mark" src="/logo.png" alt="" aria-hidden="true" /></span>
              <div className="s2b-brand-txt">STUDIO B2B<small>DESDE 2015</small></div>
            </button>

            <nav className="s2b-menu" onMouseLeave={() => setPop(false)}>
              <div onMouseEnter={() => setPop(true)}>
                <button className="top" aria-expanded={pop}>Soluciones <ChevronDown size={15} /></button>
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
              <button className="s2b-btn s2b-btn--chrome" style={{ marginLeft: 8 }} onClick={() => goTo("contacto")}>
                Contactanos <ArrowUpRight size={16} />
              </button>
            </nav>

            <button className="s2b-burger" aria-label="Abrir menú" onClick={() => setDrawer(true)}><Menu size={24} /></button>
          </div>
        </header>

        {drawer && (
          <div className="s2b-drawer">
            <div className="s2b-drawer-top">
              <div className="s2b-brand"><span className="s2b-mark-halo"><img className="s2b-mark" src="/logo.png" alt="" aria-hidden="true" /></span><div className="s2b-brand-txt">STUDIO B2B</div></div>
              <button aria-label="Cerrar" onClick={() => setDrawer(false)}><X size={26} /></button>
            </div>
            {SOLUCIONES.map((s) => <button key={s.id} className="dl" onClick={() => goTo(s.id === "agentes" ? "agentes" : "servicios")}>{s.t}</button>)}
            {NAV_LINKS.map((n) => <button key={n.id} className="dl" onClick={() => goTo(n.id)}>{n.label}</button>)}
            <button className="s2b-btn s2b-btn--chrome" style={{ marginTop: 26, width: "100%", justifyContent: "center" }} onClick={() => goTo("contacto")}>
              Contactanos <ArrowUpRight size={16} />
            </button>
          </div>
        )}

        <section className="s2b-hero" ref={heroRef}>
          <div className="s2b-aurora" aria-hidden="true"><i /><i /><i /></div>
          <div className="s2b-grid" aria-hidden="true" />
          <NeuralBg />
          <div className="s2b-halo" aria-hidden="true" />
          <div className="s2b-wrap">
            <div className="s2b-hero-in">
              <div className="s2b-pill">Producto digital e IA · Córdoba, Argentina</div>
              <div className="s2b-sweep">
                <h1>Impulsamos tecnología que rinde en producción y <span>escala con tu negocio</span></h1>
              </div>
              <p>
                Diez años haciendo productos a medida y, desde hace tres, agentes de IA
                que trabajan adentro del negocio. Nada que se caiga cuando llega a producción.
              </p>
              <div className="s2b-hero-cta">
                <button className="s2b-btn s2b-btn--chrome" onClick={() => goTo("contacto")}>Contanos tu proyecto <ArrowRight size={16} /></button>
                <button className="s2b-btn" style={{ border: "1px solid rgba(167,140,255,.35)", color: "#fff" }} onClick={() => goTo("metodo")}>
                  <Workflow size={15} /> Cómo trabajamos
                </button>
              </div>
              <div className="s2b-hero-note"><span className="s2b-dot" /> 2 lugares para arrancar este trimestre</div>
            </div>

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
        </section>
      </div>

      {/* ============ LOGOS CLIENTES ============ */}
      <div className="s2b-band s2b-band--tint">
        <div className="s2b-logos">
          <div className="s2b-logos-t">Empresas que confían en Studio B2B</div>
          <div className="s2b-marq">
            <div className="s2b-marq-track">
              {[...CLIENTES, ...CLIENTES, ...CLIENTES, ...CLIENTES].map((c, i) =>
                c.src
                  ? <img
                      className="s2b-clogo s2b-clogo--img"
                      key={i}
                      src={c.src}
                      alt={c.n}
                      loading="lazy"
                      style={c.esc ? { height: `calc(var(--clogo-h) * ${c.esc})` } : undefined}
                    />
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
              <div className="s2b-eyebrow">Soluciones</div>
              <h2 className="s2b-h2">Tres frentes, <b>un mismo equipo</b></h2>
            </div>
            <p className="s2b-lead">
              No tercerizamos. Diseño, desarrollo e IA se sientan en la misma mesa,
              así que las decisiones no se pierden entre proveedores.
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
                    <div className="s2b-glass">
                      <div className="gl-bar w1" /><div className="gl-bar w2" /><div className="gl-bar w3" />
                      <div className="gl-row"><div className="gl-tile" /><div className="gl-tile" /><div className="gl-tile" /></div>
                    </div>
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
              <div className="s2b-eyebrow">Nuestro método</div>
              <h2 className="s2b-h2">El <b>Método Studio</b>, la forma en que trabajamos</h2>
            </div>
            <p className="s2b-lead">
              Cuatro etapas con entregables definidos. Sabés en qué punto está tu proyecto
              todas las semanas, sin tener que preguntarlo.
            </p>
          </div>

          <div className="s2b-method">
            <div className="s2b-method-img s2b-rv">
              <img
                src="/metodo.jpg"
                alt="El equipo de Studio B2B trabajando"
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
                Empezar por el diagnóstico <ArrowRight size={16} />
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
              <div className="s2b-eyebrow"><Sparkles size={13} /> Agentes en producción</div>
              <h2 className="s2b-h2">Un agente sirve <b>cuando trabaja solo</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                Esto es un turno real de uno de nuestros agentes comerciales: entiende la
                consulta, revisa el stock, responde y agenda. La persona aparece solo cuando hace falta.
              </p>
              <ul className="s2b-ul">
                {AGENT_PTS.map((p) => <li key={p}><Check size={17} />{p}</li>)}
              </ul>
              <button className="s2b-btn s2b-btn--chrome" style={{ marginTop: 30 }} onClick={() => goTo("contacto")}>
                Quiero un agente así <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="s2b-rv"><Terminal /></div>
          </div>
        </section>
      </div>

      {/* ============ TECNOLOGÍAS ============ */}
      <section className="s2b-sec s2b-sec--sm" id="tecnologias">
        <div className="s2b-tech-panel s2b-rv">
          <div className="s2b-tech-inner">
            <div className="s2b-tech-head">
              <div className="s2b-eyebrow">Stack</div>
              <h2 className="s2b-h2">Tecnologías que <b>potencian nuestras soluciones</b></h2>
              <p className="s2b-tech-lead">
                Trabajamos con un stack robusto y actualizado, que nos permite integrar sistemas
                complejos, acelerar desarrollos y garantizar seguridad en cada proyecto.
              </p>
            </div>
            <div className="s2b-tech-tabs" role="tablist" aria-label="Categorías de tecnologías">
              {Object.keys(TECNOLOGIAS).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={tab === k}
                  className={"s2b-tab" + (tab === k ? " is-on" : "")}
                  onClick={() => setTab(k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="s2b-tiles" key={tab}>
              {TILE_MASK.map((filled, i) => {
                const ic = filled ? TECNOLOGIAS[tab][MASK_INDEX[i]] : null;
                if (!ic) return <div className="s2b-tile s2b-tile--void" key={i} aria-hidden="true" />;
                return (
                  <div className="s2b-tile" key={i} style={{ animationDelay: i * 32 + "ms" }}>
                    <BrandLogo icon={ic} />
                    <span className="s2b-tile-name">{ic.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ MÉTRICAS ============ */}
      <section className="s2b-sec s2b-sec--sm" id="clientes">
        <div className="s2b-wrap">
          <div className="s2b-stats s2b-rv">
            {STATS.map((s) => (
              <div className="s2b-stat" key={s.l}>
                <b><Counter to={s.to} sfx={s.sfx} /></b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap">
          <div className="s2b-rv">
            <div className="s2b-eyebrow">Resultados</div>
            <h2 className="s2b-h2">Lo que dicen <b>los que ya trabajaron con nosotros</b></h2>
          </div>

          <div className="s2b-quotes s2b-rv">
            <div className="s2b-qtrack" style={{ transform: "translateX(-" + qi * 100 + "%)" }}>
              {TESTIMONIOS.map((t) => {
                const I = t.ic;
                return (
                  <div className="s2b-qslide" key={t.n}>
                    <div className="s2b-qcard">
                      <div className="s2b-qphoto" style={{ background: t.g }}>{t.i}</div>
                      <div>
                        <div className="s2b-qtag"><I size={14} /> {t.cat}</div>
                        <p className="s2b-qtext">{t.q}</p>
                        <div className="s2b-qfoot">
                          <div><b>{t.n}</b><span>{t.r}</span></div>
                          <div className="s2b-qlogo">{t.e}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="s2b-qnav">
            <button aria-label="Anterior" onClick={() => setQi((i) => (i - 1 + TESTIMONIOS.length) % TESTIMONIOS.length)}><ArrowLeft size={17} /></button>
            <button aria-label="Siguiente" onClick={() => setQi((i) => (i + 1) % TESTIMONIOS.length)}><ArrowRight size={17} /></button>
            <div className="s2b-qdots">{TESTIMONIOS.map((_, i) => <i key={i} className={i === qi ? "on" : ""} />)}</div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="s2b-sec s2b-sec--sm">
        <div className="s2b-wrap" style={{ maxWidth: 900 }}>
          <div className="s2b-rv">
            <div className="s2b-eyebrow">Preguntas</div>
            <h2 className="s2b-h2">Lo que <b>suelen preguntarnos</b></h2>
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

      {/* ============ CONTACTO + FOOTER ============ */}
      <div className="s2b-band s2b-band--dark" id="contacto">
        <section className="s2b-sec">
          <div className="s2b-wrap s2b-form-grid">
            <div className="s2b-rv">
              <div className="s2b-eyebrow">Siguiente paso</div>
              <h2 className="s2b-h2">Tu próximo proyecto <b>empieza acá</b></h2>
              <p className="s2b-lead" style={{ color: "#BDB4E4" }}>
                Contanos el desafío. Te respondemos en menos de 24 horas hábiles con una primera
                lectura del problema y una propuesta de diagnóstico. La primera llamada no se cobra.
              </p>
              <div className="s2b-cline"><Mail size={17} /> hola@studiob2b.com</div>
              <a className="s2b-cline" style={{ textDecoration: "none" }} href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer"><Phone size={17} /> {WA_SHOW}</a>
              <div className="s2b-cline"><MapPin size={17} /> Córdoba, Argentina · trabajo remoto</div>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <Quote size={20} style={{ color: "var(--lilac)" }} />
                <span style={{ fontSize: 14, color: "#9E97C4" }}>Respondemos todos los mensajes, también los que todavía no tienen presupuesto.</span>
              </div>
            </div>

            <div className="s2b-panel s2b-rv">
              {sent ? (
                <div>
                  <div className="s2b-sent"><Check size={20} /> Mensaje enviado. Te respondemos a {form.email}.</div>
                  <button className="s2b-btn" style={{ border: "1px solid rgba(167,140,255,.35)", color: "#fff" }} onClick={() => { setSent(false); setForm({ nombre: "", empresa: "", email: "", tel: "", tipo: "Agente de IA", msg: "" }); }}>
                    Enviar otro
                  </button>
                </div>
              ) : (
                <div>
                  <div className="s2b-f"><label htmlFor="f1">Nombre</label><input id="f1" value={form.nombre} onChange={set("nombre")} placeholder="Cómo te llamás" /></div>
                  <div className="s2b-f"><label htmlFor="f2">Empresa</label><input id="f2" value={form.empresa} onChange={set("empresa")} placeholder="Dónde trabajás" /></div>
                  <div className="s2b-f"><label htmlFor="f3">Email</label><input id="f3" type="email" value={form.email} onChange={set("email")} placeholder="tu@empresa.com" /></div>
                  <div className="s2b-f"><label htmlFor="f4">Teléfono</label><input id="f4" value={form.tel} onChange={set("tel")} placeholder="+54 9 ..." /></div>
                  <div className="s2b-f">
                    <label htmlFor="f5">Qué necesitás</label>
                    <select id="f5" value={form.tipo} onChange={set("tipo")}>
                      <option>Agente de IA</option><option>Software a medida</option><option>App móvil</option>
                      <option>Diseño de producto</option><option>Automatización</option><option>Todavía no lo tengo claro</option>
                    </select>
                  </div>
                  <div className="s2b-f"><label htmlFor="f6">Contexto</label><textarea id="f6" value={form.msg} onChange={set("msg")} placeholder="Qué problema querés resolver y en qué plazo" /></div>
                  {formErr && (
                    <div className="s2b-formerr" role="alert">
                      {formErr}{" "}
                      <a href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>
                    </div>
                  )}
                  <button
                    className="s2b-btn s2b-btn--chrome"
                    style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}
                    onClick={send}
                    disabled={sending}
                  >
                    {sending ? "Enviando…" : "Enviar mensaje"} <ArrowUpRight size={16} />
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
                  Diseñamos y construimos software a medida y agentes de IA para empresas que necesitan que las cosas funcionen.
                </p>
                <div className="s2b-social">
                  <a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a>
                  <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
                  <a href="#" aria-label="GitHub"><Github size={17} /></a>
                </div>
              </div>
              <div>
                <h5>Soluciones</h5>
                <ul>
                  {SOLUCIONES.map((s) => <li key={s.id}><a href={"#servicios"} onClick={(e) => { e.preventDefault(); goTo("servicios"); }}>{s.t}</a></li>)}
                  <li><a href="#metodo" onClick={(e) => { e.preventDefault(); goTo("metodo"); }}>Método Studio</a></li>
                </ul>
              </div>
              <div>
                <h5>Estudio</h5>
                <ul>
                  <li><a href="#clientes" onClick={(e) => { e.preventDefault(); goTo("clientes"); }}>Clientes</a></li>
                  <li><a href="#contacto" onClick={(e) => { e.preventDefault(); goTo("contacto"); }}>Trabajá con nosotros</a></li>
                </ul>
              </div>
              <div>
                <h5>Contacto</h5>
                <ul>
                  <li><a href="mailto:hola@studiob2b.com">hola@studiob2b.com</a></li>
                  <li><a href={waLink("Hola Studio B2B, quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer">WhatsApp {WA_SHOW}</a></li>
                  <li><a href="#">Córdoba, Argentina</a></li>
                </ul>
              </div>
            </div>
            <div className="s2b-foot-bot">
              <span>© {new Date().getFullYear()} Studio B2B · Todos los derechos reservados</span>
              <span>Hecho en Córdoba</span>
            </div>
          </div>
        </footer>
      </div>

      <WhatsAppBubble />
    </div>
  );
}
