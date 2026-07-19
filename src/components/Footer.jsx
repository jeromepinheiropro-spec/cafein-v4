import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LeafMark } from "../lib/ui.jsx";

const LINKS = [
  { l: "Création", to: "/creation-site-web" },
  { l: "SEO & GEO", to: "/seo-geo" },
  { l: "Communication", to: "/communication" },
  { l: "Lexique", to: "/lexique" },
  { l: "Blog", to: "/#blog" },
  { l: "Contact", to: "/#contact" },
];
const WORD = ["C", "A", "F", "E", "I", "N"];

/*
  Footer V4 : le CAFEIN géant en contour de la V2, qui se remplit
  lettre par lettre au survol (interaction V3).
*/
export default function Footer() {
  return (
    <footer className="relative bg-espresso border-t border-cream/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-14 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LeafMark className="h-5 w-auto" />
            <p className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-cream/40">
              © 2026 — Luxembourg
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.l}
                to={l.to}
                className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-mint transition-colors"
              >
                {l.l}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-cream/50">FR / EN</span>
            <motion.a
              href="#top"
              data-cursor="Hop !"
              whileHover={{ y: -4 }}
              className="grid place-items-center w-11 h-11 rounded-full border-2 border-mint text-mint hover:bg-mint hover:text-ink transition-colors"
              aria-label="Retour en haut"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V4m0 0l-6 6m6-6l6 6" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* CAFEIN géant en contour, se remplit au survol */}
        <div className="mt-16 select-none" aria-hidden="true">
          <div className="flex justify-between items-end">
            {WORD.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 150, damping: 16 }}
                whileHover={{ y: -18, transition: { type: "spring", stiffness: 400, damping: 12 } }}
                className="footer-letter font-display font-extrabold leading-none cursor-default text-[clamp(3rem,14vw,13rem)]"
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-cream/10 font-mono text-[11px] tracking-[0.25em] uppercase text-cream/30 flex items-center gap-2">
          Fait avec <span className="text-mint">beaucoup</span> de café
          <LeafMark className="h-3.5 w-auto" />
        </p>
      </div>
    </footer>
  );
}
