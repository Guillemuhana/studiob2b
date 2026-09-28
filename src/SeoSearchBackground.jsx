import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

// Deterministic, decorative streams: no timers or per-frame React updates.
const STREAMS = Array.from({ length: 20 }, (_, column) =>
  Array.from({ length: 36 }, (_, row) => ((row * 7 + column * 11 + row * row) % 13) % 2).join("\n")
);

export default function SeoSearchBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let visible = true;
    const sync = () => { el.dataset.active = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return (
    <div ref={ref} className="s2b-search-scene" aria-hidden="true" data-active="false">
      <div className="s2b-search-rain">
        {STREAMS.map((digits, i) => <div className="s2b-search-column" key={i} style={{
          left: `${i * 5}%`, "--duration": `${19 + (i % 6) * 4}s`, "--delay": `${-i * 3.7}s`, "--strength": .2 + (i % 4) * .13,
        }}><span>{digits}{"\n"}</span><span>{digits}{"\n"}</span></div>)}
      </div>
      <div className="s2b-search-orbit" />
      <div className="s2b-search-lens"><Search strokeWidth={.8} /><span className="s2b-search-cross" /></div>
      <Search className="s2b-search-mini s2b-search-mini--one" strokeWidth={1} />
      <Search className="s2b-search-mini s2b-search-mini--two" strokeWidth={1} />
      <div className="s2b-search-scan" />
    </div>
  );
}
