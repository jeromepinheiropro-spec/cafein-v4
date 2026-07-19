import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../lib/ui.jsx";

/*
  FAQ V4 : la mise en page en deux colonnes de la V2 (titre sticky à gauche,
  questions à droite) + l'accordéon à ressort de la V3.
*/
const FAQS = [
  {
    q: "Vous travaillez avec quel type d'entreprises ?",
    a: "Principalement des PME, indépendants et commerces luxembourgeois qui veulent un site professionnel et une vraie visibilité locale. Vitrine, e-commerce ou plateforme spécifique : on s'adapte à votre secteur et à votre budget.",
  },
  {
    q: "Combien coûte un site web ?",
    a: "Ça dépend du projet : un site vitrine n'a pas le même budget qu'un e-commerce ou une plateforme sur mesure. On établit un devis clair et sans surprise après un premier échange — gratuit, évidemment. Vous savez exactement ce que vous payez, et pourquoi.",
  },
  {
    q: "En combien de temps peut-on être visible sur Google ?",
    a: "Le SEO est un travail de fond : comptez généralement 3 à 6 mois pour des résultats significatifs sur des mots-clés locaux. Certaines optimisations techniques donnent des effets plus rapides, et on suit les positions ensemble, mois après mois.",
  },
];

function Item({ faq, i, open, toggle }) {
  const isOpen = open === i;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.08 }}
      className="border-b-2 border-ink/15"
    >
      <button
        onClick={() => toggle(i)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left py-7 group"
      >
        <span className={`font-display font-extrabold text-lg md:text-2xl transition-colors ${isOpen ? "text-mint-dark" : "text-ink group-hover:text-mint-dark"}`}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`shrink-0 grid place-items-center w-10 h-10 rounded-full border-2 transition-colors ${
            isOpen ? "border-mint bg-mint text-ink" : "border-ink/30 text-ink"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="overflow-hidden"
          >
            <p className="pb-7 text-ink/75 font-medium leading-relaxed text-base md:text-lg max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-32">
          <SectionLabel>( FAQ )</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold uppercase text-4xl md:text-6xl text-ink mt-4 leading-[0.9] tracking-tight"
          >
            Questions
            <br />
            fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-ink/60 font-medium max-w-sm"
          >
            Une autre question ? Écrivez-nous, on répond vite — et sans jargon.
          </motion.p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <Item key={i} faq={f} i={i} open={open} toggle={(n) => setOpen(open === n ? -1 : n)} />
          ))}
        </div>
      </div>
    </section>
  );
}
