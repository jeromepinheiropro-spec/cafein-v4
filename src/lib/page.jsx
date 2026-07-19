import React from "react";
import { motion } from "framer-motion";
import { Magnetic, ArrowUpRight, Spark } from "./ui.jsx";
import Bubbles from "../components/Bubbles.jsx";

/* ── Hero de page intérieure (bandeau espresso + bulles) ──────── */
export function PageHero({ n, tag, title, subtitle, children }) {
  return (
    <section className="relative bg-espresso pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <Bubbles density={30} />
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-mint/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-mint"
          >
            <span className="grid place-items-center w-10 h-10 rounded-full border border-mint/40 text-mint font-bold">
              {n}
            </span>
            {tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-display font-extrabold uppercase leading-[0.95] tracking-tight text-cream text-4xl md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-cream/70 font-medium leading-relaxed max-w-xl"
          >
            {subtitle}
          </motion.p>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 16 }}
            className="hidden lg:block"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── Bande CTA de fin de page ─────────────────────────────────── */
export function CtaBand({ title, sub, label }) {
  return (
    <section className="relative bg-espresso py-24 md:py-32 overflow-hidden border-t border-cream/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-mint/8 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <Spark className="w-8 h-8 text-mint" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold uppercase text-3xl md:text-6xl text-cream leading-[0.95] tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-lg text-cream/60 font-medium"
        >
          {sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-9 flex justify-center"
        >
          <Magnetic strength={0.25}>
            <a
              href="/#contact"
              data-cursor="Go !"
              className="group inline-flex items-center gap-3 rounded-full bg-mint text-ink font-display font-bold text-lg px-9 py-4 shadow-[5px_5px_0_rgba(245,239,226,0.18)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            >
              {label}
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ compacte réutilisable (fond crème) ───────────────────── */
export function MiniFaq({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-display font-extrabold uppercase text-3xl md:text-5xl text-ink tracking-tight mb-10"
        >
          Questions fréquentes
        </motion.h2>
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b-2 border-ink/15">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left py-6 group"
              >
                <span className={`font-display font-bold text-lg md:text-xl transition-colors ${isOpen ? "text-mint-dark" : "text-ink group-hover:text-mint-dark"}`}>
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`shrink-0 grid place-items-center w-9 h-9 rounded-full border-2 transition-colors ${isOpen ? "border-mint bg-mint text-ink" : "border-ink/30 text-ink"}`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-ink/75 font-medium leading-relaxed">{f.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Étapes numérotées (grille) ───────────────────────────────── */
export function Steps({ title, steps, dark = false }) {
  return (
    <section className={`${dark ? "bg-espresso" : "bg-cream"} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={`font-display font-extrabold uppercase text-3xl md:text-5xl tracking-tight mb-12 ${dark ? "text-cream" : "text-ink"}`}
        >
          {title}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
              whileHover={{ y: -6 }}
              className={`border-2 p-7 ${dark ? "border-cream/15 bg-espresso-2/60" : "border-ink bg-white shadow-[5px_5px_0_#1FCE8A]"}`}
            >
              <span className={`font-display font-extrabold text-4xl ${dark ? "text-mint" : "text-mint-dark"}`}>{s.n}</span>
              <h3 className={`mt-4 font-display font-extrabold uppercase text-xl tracking-tight ${dark ? "text-cream" : "text-ink"}`}>
                {s.title}
              </h3>
              <p className={`mt-3 font-medium leading-relaxed text-sm ${dark ? "text-cream/60" : "text-ink/70"}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
