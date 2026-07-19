import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Magnetic, Bean, Spark, ArrowUpRight, Cup } from "../lib/ui.jsx";
import Bubbles from "./Bubbles.jsx";

const letters = ["C", "a", "f", "e", "i", "n"];

/* Badge circulaire qui tourne — version claire pour fond sombre */
function RotatingBadge() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      className="relative w-28 h-28 md:w-36 md:h-36"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="circlePathV4" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="font-mono uppercase" fontSize="9.5" letterSpacing="2.5" fill="#F5EFE2">
          <textPath href="#circlePathV4">
            agence · luxembourg · web · seo · geo ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Cup className="w-9 h-9 md:w-11 md:h-11" stroke="#1FCE8A" />
      </div>
    </motion.div>
  );
}

/*
  Hero V4 : le fond espresso professionnel de la V1/V2, les lettres
  cinétiques et les grains flottants de la V3.
*/
export default function Hero({ started }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yBeans = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const beanStyle = (fx, fy) => ({
    x: useTransform(smx, (v) => v * fx),
    y: useTransform(smy, (v) => v * fy),
  });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-espresso pt-28 pb-16"
    >
      {/* Halos discrets */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-mint/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <div aria-hidden className="absolute -bottom-48 -left-40 w-[36rem] h-[36rem] rounded-full bg-caramel/8 blur-3xl" />

      {/* Bulles interactives (effet V1) */}
      <Bubbles />

      {/* Grains flottants */}
      <motion.div aria-hidden style={{ y: yBeans }} className="absolute inset-0 pointer-events-none">
        <motion.div style={beanStyle(40, 30)} className="absolute top-[15%] left-[42%] hidden sm:block">
          <motion.div animate={{ y: [0, -14, 0], rotate: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
            <Bean className="w-9 h-9 md:w-11 md:h-11 opacity-80" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(-55, 45)} className="absolute top-[24%] right-[10%]">
          <motion.div animate={{ y: [0, 16, 0], rotate: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 6.5 }}>
            <Bean className="w-7 h-7 md:w-9 md:h-9 opacity-70" fill="#F4A259" />
          </motion.div>
        </motion.div>
        <motion.div style={beanStyle(30, -40)} className="absolute bottom-[28%] right-[24%] hidden md:block">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }}>
            <Spark className="w-5 h-5 text-mint/70" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yTitle, opacity }} className="relative mx-auto max-w-7xl px-6 md:px-10 w-full">
        {/* Sur-titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="inline-flex items-center gap-2 border border-cream/20 px-4 py-1.5 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
            </span>
            Agence basée au Luxembourg
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            {/* Titre géant lettre par lettre — crème sur espresso */}
            <h1 className="font-display font-extrabold leading-[0.85] tracking-tight text-cream text-[clamp(4.5rem,16vw,14rem)] select-none">
              <span className="sr-only">Cafein — agence de communication digitale au Luxembourg</span>
              <span aria-hidden className="inline-flex">
                {letters.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", rotate: i % 2 ? 6 : -6, opacity: 0 }}
                    animate={started ? { y: "0%", rotate: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.07, type: "spring", stiffness: 200, damping: 16 }}
                    whileHover={{ y: -16, color: "#1FCE8A", transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    className="inline-block cursor-default"
                  >
                    {l === "i" ? (
                      <span className="relative inline-block">
                        ı
                        <motion.span
                          initial={{ y: -120, opacity: 0 }}
                          animate={started ? { y: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.85, type: "spring", stiffness: 320, damping: 11 }}
                          className="absolute left-1/2 top-[0.02em] -translate-x-1/2 w-[0.16em] h-[0.16em]"
                        >
                          <motion.span
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 1.6 }}
                            className="block w-full h-full"
                          >
                            <Bean className="w-full h-full" />
                          </motion.span>
                        </motion.span>
                      </span>
                    ) : (
                      l
                    )}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-7 max-w-xl text-lg md:text-2xl text-cream/75 font-medium leading-relaxed"
            >
              Votre agence de <span className="squiggle font-bold text-cream">marketing web</span> au
              Luxembourg. Sites sur mesure, communication digitale et visibilité —{" "}
              <span className="font-bold text-mint">SEO&nbsp;&amp;&nbsp;GEO</span>. Le tout, servi
              bien serré.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  data-cursor="C'est parti"
                  className="group inline-flex items-center gap-3 rounded-full bg-mint text-ink font-display font-bold text-base md:text-lg px-8 py-4 shadow-[5px_5px_0_rgba(245,239,226,0.18)] hover:shadow-[0px_0px_0_rgba(245,239,226,0)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
                >
                  Parlons de votre projet
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#realisations"
                  data-cursor="Mater"
                  className="inline-flex items-center gap-3 rounded-full text-cream font-display font-bold text-base md:text-lg px-8 py-4 border-2 border-cream/30 hover:bg-cream hover:text-ink transition-colors duration-300"
                >
                  Voir nos réalisations
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Badge rotatif */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={started ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 1, type: "spring", stiffness: 150, damping: 15 }}
            className="hidden lg:block mb-6"
          >
            <RotatingBadge />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 inset-x-0 flex items-center justify-between px-6 md:px-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/40"
      >
        <span className="hidden sm:block">Sites web — SEO/GEO — Communication</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="flex items-center gap-2">
          Scroll
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
        <span>FR / EN</span>
      </motion.div>
    </section>
  );
}
