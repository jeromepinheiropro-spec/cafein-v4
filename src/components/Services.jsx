import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel, ArrowUpRight } from "../lib/ui.jsx";

/*
  Services V4 : les rangées éditoriales pleine largeur de la V2
  (numéro, titre géant uppercase, flèche) + le "wipe" de couleur
  au survol et les icônes doodle de la V3.
*/
function IconSite({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <rect x="8" y="12" width="48" height="36" rx="4" />
      <path d="M8 22h48" />
      <circle cx="15" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="21" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16 32h14M16 39h20" />
      <path d="M42 30l8 8-8 8" />
    </svg>
  );
}
function IconSeo({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <circle cx="27" cy="27" r="15" />
      <path d="M38 38 L52 52" />
      <path d="M20 30 L25 24 L30 28 L35 20" />
    </svg>
  );
}
function IconCom({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <path d="M10 40 V24 a4 4 0 0 1 4-4 h22 a4 4 0 0 1 4 4 v10 a4 4 0 0 1-4 4 H22 l-8 8 v-6 z" />
      <path d="M46 26 c6 2 8 6 8 10 v10 l-6-5 h-4" />
    </svg>
  );
}

const SERVICES = [
  {
    n: "01",
    title: "Création de site web",
    desc: "WordPress ou développement sur mesure, selon vos besoins et votre budget : vitrine, e-commerce ou plateforme spécifique, pensés pour le marché luxembourgeois.",
    tags: ["Vitrine", "E-commerce", "Sur mesure"],
    to: "/creation-site-web",
    Icon: IconSite,
    hover: "group-hover:bg-mint",
  },
  {
    n: "02",
    title: "SEO & GEO",
    desc: "Référencement naturel classique et optimisation pour être trouvé et cité par les intelligences artificielles (ChatGPT, Perplexity...), avec un focus local Luxembourg.",
    tags: ["Google", "ChatGPT", "Local"],
    to: "/seo-geo",
    Icon: IconSeo,
    hover: "group-hover:bg-caramel",
  },
  {
    n: "03",
    title: "Communication digitale",
    desc: "Stratégie, réseaux sociaux, contenus et campagnes : on gère votre communication digitale de A à Z pour faire rayonner votre marque au Luxembourg.",
    tags: ["Réseaux sociaux", "Contenus", "Campagnes"],
    to: "/communication",
    Icon: IconCom,
    hover: "group-hover:bg-sun",
  },
];

function Row({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
    >
    <Link
      to={s.to}
      data-cursor="Découvrir"
      className="group relative block border-b-[3px] border-ink overflow-hidden"
    >
      {/* wipe de couleur au survol */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${s.hover.replace("group-hover:", "")} opacity-0 group-hover:opacity-100`}
        style={{ transitionProperty: "transform, opacity" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-14 grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10">
        <span className="font-mono text-sm md:text-base font-bold text-mint-dark group-hover:text-ink transition-colors">
          {s.n}
        </span>
        <div>
          <h3 className="font-display font-extrabold uppercase leading-none tracking-tight text-ink text-3xl md:text-6xl group-hover:translate-x-3 transition-transform duration-500">
            {s.title}
          </h3>
          <p className="mt-4 max-w-2xl text-ink/70 group-hover:text-ink/85 font-medium leading-relaxed text-sm md:text-lg">
            {s.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span key={t} className="rounded-full border border-ink/25 px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60 group-hover:border-ink/50 group-hover:text-ink transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <s.Icon className="hidden md:block w-14 h-14 text-ink/0 group-hover:text-ink transition-colors duration-300" />
          <span className="grid place-items-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-ink group-hover:bg-ink group-hover:text-cream group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-cream pt-24 md:pt-32 pb-0">
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-12 md:mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>( Services )</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold uppercase text-4xl md:text-7xl text-ink mt-4 leading-[0.9] tracking-tight"
          >
            Trois expressos,
            <br />
            <span className="text-stroke-espresso">zéro déca.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xs text-ink/60 font-medium text-sm md:text-base"
        >
          Trois services complémentaires, un seul objectif : que votre marque soit vue, comprise et choisie.
        </motion.p>
      </div>

      <div className="border-t-[3px] border-ink">
        {SERVICES.map((s, i) => (
          <Row key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
