import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { LeafMark, Magnetic } from "../lib/ui.jsx";

const LINKS = [
  { label: "Création de site", to: "/creation-site-web" },
  { label: "SEO & GEO", to: "/seo-geo" },
  { label: "Communication", to: "/communication" },
  { label: "Lexique", to: "/lexique" },
];

/*
  Nav V4 : la sobriété pro de la V2 (liens mono uppercase, CONTACT encadré,
  fond sombre) + les micro-interactions de la V3 (magnétisme, soulignement
  à ressort, menu mobile en cercle).
*/
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 180 && !open);
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={`fixed top-0 inset-x-0 z-[500] transition-colors duration-500 ${
          scrolled ? "bg-espresso/85 backdrop-blur-xl border-b border-cream/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-4">
          <Link to="/" className="flex items-center gap-2.5" data-cursor="Hello" aria-label="Cafein — accueil">
            <motion.div whileHover={{ rotate: -14, scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
              <LeafMark className="h-6 w-auto" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight text-cream">
              Cafe
              <span className="relative inline-block">
                ı
                <span className="absolute left-1/2 top-[0.08em] h-[0.13em] w-[0.13em] -translate-x-1/2 rounded-[30%] bg-mint" />
              </span>
              n
            </span>
          </Link>

          {/* Liens desktop — style V2 */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `group relative font-mono text-[11px] tracking-[0.25em] uppercase transition-colors py-2 ${
                    isActive ? "text-mint" : "text-cream/70 hover:text-cream"
                  }`
                }
              >
                {l.label}
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-mint origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href="/#contact"
                data-cursor="Go !"
                className="hidden sm:inline-flex items-center gap-2 border-2 border-cream/40 text-cream font-mono text-[11px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-mint hover:text-ink hover:border-mint transition-colors duration-300"
              >
                Contact
              </a>
            </Magnetic>

            {/* Burger mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-11 h-11 border-2 border-cream/30 flex flex-col items-center justify-center gap-[5px]"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-cream" />
              <motion.span animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-cream" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[400] bg-espresso-2 flex flex-col justify-center px-8"
          >
            {[...LINKS, { label: "Contact", to: "/#contact" }].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.07 } }}
                exit={{ opacity: 0 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display font-extrabold text-4xl uppercase text-cream py-3 flex items-center gap-4"
                >
                  <span className="font-mono text-sm text-mint">0{i + 1}</span>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-8 font-mono text-xs tracking-[0.3em] text-cream/40 uppercase"
            >
              Luxembourg — FR / EN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
