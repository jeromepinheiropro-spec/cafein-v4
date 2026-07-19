import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, Magnetic, LeafMark, ArrowUpRight } from "../lib/ui.jsx";

/* Confettis maison (V3) */
function Confetti() {
  const parts = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 480,
    y: -(120 + Math.random() * 320),
    r: Math.random() * 540 - 270,
    s: 0.6 + Math.random() * 1.1,
    c: ["#1FCE8A", "#F4A259", "#FFD166", "#F5EFE2"][i % 4],
    shape: i % 3,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {parts.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 40, opacity: 1, rotate: 0, scale: p.s }}
          animate={{ x: p.x, y: p.y, opacity: [1, 1, 0], rotate: p.r }}
          transition={{ duration: 1.4 + Math.random() * 0.6, ease: [0.15, 0.6, 0.4, 1] }}
          className="absolute"
          style={{
            width: p.shape === 0 ? 12 : 9,
            height: p.shape === 1 ? 12 : 9,
            backgroundColor: p.c,
            borderRadius: p.shape === 2 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

/* Ciel étoilé discret (V2) — positions figées au premier rendu */
function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3,
      })),
    []
  );
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-mint/60"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay }}
        />
      ))}
    </div>
  );
}

function Field({ label, id, type = "text", as = "input", value, onChange, required }) {
  const Comp = as;
  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="block font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-cream/60 mb-2 group-focus-within:text-mint transition-colors"
      >
        {label} {required && <span className="text-mint">*</span>}
      </label>
      <Comp
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={as === "textarea" ? 4 : undefined}
        className="w-full bg-transparent border-b-[3px] border-cream/25 focus:border-mint outline-none py-3 text-lg md:text-xl font-medium text-cream placeholder-cream/25 transition-colors resize-none"
        placeholder={as === "textarea" ? "Racontez-nous tout…" : ""}
      />
    </div>
  );
}

/*
  Contact V4 : la mise en page deux colonnes + ciel étoilé de la V2,
  le formulaire animé + confettis de la V3.
*/
export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function submit(e) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 900);
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="relative bg-espresso py-24 md:py-36 overflow-hidden">
      <Starfield />
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-mint/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel dark>( Contact )</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold uppercase text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] text-cream mt-4 tracking-tight"
          >
            Un<br />
            <span className="text-mint">projet&nbsp;?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-cream/70 font-medium max-w-md leading-relaxed"
          >
            Une question, un projet ? Écrivez-nous, on vous répond rapidement — le temps de faire
            couler un café.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 font-mono text-xs tracking-[0.2em] uppercase text-cream/50"
          >
            <span className="border border-cream/20 px-4 py-2">Luxembourg</span>
            <span className="border border-cream/20 px-4 py-2">FR / EN</span>
            <span className="border border-cream/20 px-4 py-2">Réponse rapide</span>
          </motion.div>

          <motion.div
            aria-hidden
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
            className="mt-16 hidden lg:block opacity-50"
          >
            <LeafMark className="h-14 w-auto" />
          </motion.div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="relative rounded-[2rem] bg-mint border-[3px] border-ink p-10 md:p-14 text-center shadow-[10px_10px_0_rgba(245,239,226,0.15)]"
              >
                <Confetti />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 14 }}
                  className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-ink mb-6"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#1FCE8A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l5 5L20 7" />
                  </svg>
                </motion.div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-ink">C'est envoyé !</h3>
                <p className="mt-3 text-ink/80 font-medium text-lg">
                  Merci {form.nom.split(" ")[0] || ""} — on revient vers vous très vite.
                  <br />
                  (Le temps d'un espresso, promis.)
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -20 }} className="space-y-9 pt-4">
                <Field label="Nom" id="nom" value={form.nom} onChange={set("nom")} required />
                <Field label="Email" id="email" type="email" value={form.email} onChange={set("email")} required />
                <Field label="Message" id="message" as="textarea" value={form.message} onChange={set("message")} required />
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="Envoyer !"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 bg-mint text-ink font-mono font-bold text-sm tracking-[0.2em] uppercase px-9 py-4 hover:bg-cream transition-colors duration-300 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 rounded-full border-[3px] border-ink border-t-transparent"
                        />
                        Envoi…
                      </>
                    ) : (
                      <>
                        Envoyer
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
