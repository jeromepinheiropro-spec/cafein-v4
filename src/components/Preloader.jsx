import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LeafMark } from "../lib/ui.jsx";

/*
  Préloader V4 : l'esprit "pro" de la V1/V2 (compteur % géant en bas à droite,
  label technique, barre de progression) + la tasse qui se remplit de la V3.
*/
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    let raf;
    const start = performance.now();
    const DURATION = 1700;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduce]);

  const fill = count / 100;

  return (
    <motion.div
      className="fixed inset-0 z-[9000] bg-espresso overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-label="Chargement"
    >
      <motion.div
        className="absolute inset-0 bg-mint"
        initial={{ y: "100%" }}
        exit={{ y: "0%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.06 } }}
      />

      {/* Logo + tasse au centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <LeafMark className="h-7 w-auto" />
          <span className="font-display font-bold text-2xl text-cream tracking-tight">
            Cafe
            <span className="relative inline-block">
              ı
              <span className="absolute left-1/2 top-[0.08em] h-[0.13em] w-[0.13em] -translate-x-1/2 rounded-[30%] bg-mint" />
            </span>
            n
          </span>
        </div>
        <svg viewBox="0 0 120 110" className="w-20 h-20 md:w-24 md:h-24" fill="none">
          <defs>
            <clipPath id="cupClipV4">
              <path d="M25 38h56v26c0 15.5-12.5 28-28 28S25 79.5 25 64V38z" />
            </clipPath>
          </defs>
          <g clipPath="url(#cupClipV4)">
            <motion.rect x="20" width="66" height="60" fill="#1FCE8A" animate={{ y: 92 - fill * 54 }} transition={{ type: "tween", duration: 0.15 }} />
          </g>
          <path d="M25 38h56v26c0 15.5-12.5 28-28 28S25 79.5 25 64V38z" stroke="#F5EFE2" strokeWidth="4" strokeLinejoin="round" />
          <path d="M81 44h8a10 10 0 0 1 0 20h-8" stroke="#F5EFE2" strokeWidth="4" strokeLinecap="round" />
          <motion.path d="M43 26c0-5 5-5 5-10" stroke="#1FCE8A" strokeWidth="3.5" strokeLinecap="round" animate={{ opacity: [0, 1, 0], y: [4, -3] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }} />
          <motion.path d="M57 26c0-5 5-5 5-10" stroke="#1FCE8A" strokeWidth="3.5" strokeLinecap="round" animate={{ opacity: [0, 1, 0], y: [4, -3] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut", delay: 0.35 }} />
        </svg>
      </div>

      {/* Label technique en bas à gauche (V1/V2) */}
      <p className="absolute bottom-8 left-8 font-mono text-[10px] md:text-xs tracking-[0.4em] text-cream/50 uppercase">
        Marketing web — chargement
      </p>

      {/* % géant en bas à droite (V1/V2) */}
      <p className="absolute bottom-4 right-8 font-display font-extrabold text-7xl md:text-9xl text-mint tabular-nums leading-none">
        {count}
        <span className="text-3xl md:text-5xl align-top">%</span>
      </p>

      {/* Barre de progression en bas */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-mint"
        animate={{ width: `${count}%` }}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </motion.div>
  );
}
