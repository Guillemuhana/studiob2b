import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "motion/react";
import SeoSearchLight from "./SeoSearchLight.jsx";

const STREAMS = Array.from({ length: 24 }, (_, column) =>
  Array.from({ length: 36 }, (_, row) => ((row * 7 + column * 11 + row * row) % 13) % 2).join("\n")
);
const HITS = [{ label: "SEO", x: 380, y: 160 }, { label: "IA", x: 130, y: 420 }];

export default function SeoSearchBackground() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 48, damping: 22, mass: 1.2 });
  const y = useSpring(0, { stiffness: 48, damping: 22, mass: 1.2 });
  const uid = useId().replace(/:/g, "");
  useEffect(() => {
    const el = ref.current;
    const host = el.parentElement;
    let visible = false;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    const move = (event) => {
      if (reduced || !visible || document.hidden || event.pointerType === "touch") return;
      const box = host.getBoundingClientRect();
      x.set(((event.clientX - box.left) / box.width - .5) * 32);
      y.set(((event.clientY - box.top) / box.height - .5) * 24);
    };
    const reset = () => { x.set(0); y.set(0); };
    if (reduced) { x.jump(0); y.jump(0); }
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", reset);
    return () => {
      observer.disconnect(); document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", reset);
    };
  }, [reduced, x, y]);
  return (
    <div ref={ref} className="s2b-search-scene" aria-hidden="true" data-active={active}>
      <SeoSearchLight active={active} reduced={reduced} x={x} y={y} />
      <div className="s2b-search-rain">
        {STREAMS.map((digits, i) => <div className="s2b-search-column" key={i} style={{
          left: `${i * 4.2}%`, "--duration": `${26 + (i % 6) * 5}s`, "--delay": `${-i * 3.7}s`,
          "--strength": .13 + (i % 4) * .07, "--size": `${10 + ((i * 5) % 4)}px`,
        }}><span>{digits}{"\n"}</span><span>{digits}{"\n"}</span></div>)}
      </div>
      <motion.div className="s2b-search-instrument" style={{ x, y }}>
        <svg viewBox="0 0 560 560" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${uid}-metal`} x1="150" y1="130" x2="440" y2="440" gradientUnits="userSpaceOnUse">
              <stop stopColor="#eee6ff"/><stop offset=".28" stopColor="#9571de"/><stop offset=".55" stopColor="#46326f"/><stop offset=".78" stopColor="#c6b1ec"/><stop offset="1" stopColor="#72549f"/>
            </linearGradient>
            <radialGradient id={`${uid}-glass`} cx=".34" cy=".25" r=".8">
              <stop stopColor="#c9bcff" stopOpacity=".12"/><stop offset=".5" stopColor="#7f51d9" stopOpacity=".035"/><stop offset="1" stopColor="#aa7eff" stopOpacity=".16"/>
            </radialGradient>
            <linearGradient id={`${uid}-beam`}><stop stopColor="#aa85ff" stopOpacity="0"/><stop offset=".6" stopColor="#aa85ff"/><stop offset="1" stopColor="#c8f4ff"/></linearGradient>
            <clipPath id={`${uid}-clip`}><circle cx="268" cy="263" r="122"/></clipPath>
          </defs>
          <g className="s2b-search-orbital">
            <circle cx="280" cy="280" r="224" stroke="#ac8cfb" strokeOpacity=".12"/>
            <circle cx="280" cy="280" r="210" stroke="#ba9fed" strokeOpacity=".25" strokeDasharray="1 16"/>
            <path d="M280 56a224 224 0 0 1 224 224" stroke={`url(#${uid}-metal)`} strokeOpacity=".6"/>
            <circle cx="504" cy="280" r="3" fill="#d2bdff"/>
          </g>
          <ellipse cx="280" cy="280" rx="265" ry="88" transform="rotate(-32 280 280)" stroke="#a487dc" strokeOpacity=".15"/>
          <g className="s2b-search-lens">
            <path d="m362 357 87 87" stroke="#1c122d" strokeWidth="19" strokeLinecap="round"/>
            <path d="m362 357 87 87" stroke={`url(#${uid}-metal)`} strokeWidth="11" strokeLinecap="round"/>
            <circle cx="268" cy="263" r="135" stroke={`url(#${uid}-metal)`} strokeWidth="7"/>
            <circle cx="268" cy="263" r="127" stroke="#d4baff" strokeOpacity=".5"/>
            <circle cx="268" cy="263" r="122" fill={`url(#${uid}-glass)`}/>
            <g clipPath={`url(#${uid}-clip)`}>
              <path d="M132 217h272M132 263h272M132 309h272M222 128v270M268 128v270M314 128v270" stroke="#cfbaff" strokeOpacity=".08"/>
              <g className="s2b-search-sweep"><path d="M133 263h270" stroke={`url(#${uid}-beam)`} strokeWidth="1.5"/><path d="M133 255h270" stroke="#b797ff" strokeOpacity=".08" strokeWidth="16"/></g>
              <g stroke="#cbb7ff" strokeOpacity=".7" strokeWidth="1.2"><path d="M211 231v-12h12M313 219h12v12M211 295v12h12M313 307h12v-12"/></g>
              <circle className="s2b-search-target" cx="268" cy="263" r="5" fill="#c4efff"/>
              <path d="m246 263h12m20 0h12m-22-22v12m0 20v12" stroke="#c4b0ef" strokeOpacity=".6"/>
              <path d="M162 215a120 120 0 0 1 152-61" stroke="#f1eaff" strokeOpacity=".17" strokeWidth="12" strokeLinecap="round"/>
            </g>
          </g>
          {HITS.map((hit, i) => <g key={hit.label} className="s2b-search-hit" style={{ animationDelay: `${i * -5}s` }}>
            <rect x={hit.x} y={hit.y} width="52" height="28" rx="8" fill="#1b142d" stroke="#b096e2" strokeOpacity=".3"/>
            <text x={hit.x + 26} y={hit.y + 18} textAnchor="middle" fill="#c9b5ed" fontSize="10" fontFamily="monospace" letterSpacing="2">{hit.label}</text>
          </g>)}
          <g stroke="#c8b5e8" strokeOpacity=".3"><path d="M94 180h10m-5-5v10M438 370h10m-5-5v10"/><circle cx="182" cy="75" r="3"/></g>
        </svg>
      </motion.div>
    </div>
  );
}
