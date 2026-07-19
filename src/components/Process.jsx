import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel, Cup } from "../lib/ui.jsx";

/*
  Méthode V4 : le défilement horizontal piloté au scroll de la V2
  + la tasse qui avance sur la barre de progression de la V3.
*/
const STEPS = [
  {
    n: "01",
    title: "On échange",
    desc: "Un premier appel pour cadrer votre projet, vos objectifs et votre budget.",
  },
  {
    n: "02",
    title: "On construit",
    desc: "Design, développement, contenu : on avance vite sans sacrifier la qualité.",
  },
  {
    n: "03",
    title: "On lance",
    desc: "Mise en ligne et suivi des premiers résultats, ensemble.",
  },
  {
    n: "→",
    title: "3–4 semaines",
    desc: "C'est le délai moyen pour un site vitrine : découverte, design, développement, lancement.",
    highlight: true,
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.9], ["2%", "-58%"]);
  const cupX = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "96%"]);
  const barW = useTransform(scrollYProgress, [0.05, 0.9], ["3%", "100%"]);

  return (
    <section id="methode" ref={ref} className="relative bg-espresso" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10 w-full mb-10">
          <SectionLabel dark>( La méthode )</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold uppercase text-4xl md:text-7xl text-cream mt-4 leading-[0.9] tracking-tight"
            >
              Comment ça marche
            </motion.h2>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/40">
              Scrollez —
            </span>
          </div>
        </div>

        {/* Rangée horizontale pilotée par le scroll vertical */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-6 md:pl-10 w-max">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`w-[320px] md:w-[480px] shrink-0 border-2 p-8 md:p-12 min-h-[300px] md:min-h-[360px] flex flex-col justify-between ${
                s.highlight
                  ? "border-mint bg-mint/10"
                  : "border-cream/15 bg-espresso-2/60"
              }`}
            >
              <div>
                {s.highlight ? (
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-mint mb-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                  >
                    <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                ) : (
                  <span className="block font-display font-extrabold text-5xl md:text-7xl text-mint mb-6">
                    {s.n}
                  </span>
                )}
                <h3 className="font-display font-extrabold uppercase text-2xl md:text-4xl text-cream tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-cream/60 font-medium leading-relaxed text-sm md:text-lg max-w-sm">
                  {s.desc}
                </p>
              </div>
              {s.highlight && (
                <div className="mt-6 grid grid-cols-4 gap-2 font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-cream/50">
                  {["Découverte", "Design", "Dév.", "Lancement"].map((w, j) => (
                    <span key={w} className="border-t border-mint/40 pt-2">
                      <span className="text-mint">S{j + 1}</span> {w}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Barre de progression + tasse (V3) */}
        <div className="mx-auto max-w-7xl px-6 md:px-10 w-full mt-12">
          <div className="relative h-[3px] bg-cream/10">
            <motion.div style={{ width: barW }} className="absolute inset-y-0 left-0 bg-mint" />
            <motion.div style={{ left: cupX }} className="absolute -top-9 -translate-x-1/2">
              <motion.div animate={{ rotate: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                <Cup className="w-8 h-8" stroke="#F5EFE2" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
