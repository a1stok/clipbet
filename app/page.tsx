"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDES } from "./lib/slides";
import { SWIFT_SPRING, stagger, fadeUp } from "./lib/animations";
import { DemoOverlay } from "./components/DemoOverlay";

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (done || showDemo) return;
      if (e.key === "ArrowRight" && idx < SLIDES.length - 1) {
        setDir(1);
        setIdx((p) => p + 1);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        setDir(-1);
        setIdx((p) => p - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, done]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (!mounted) return null;

  const slide = SLIDES[idx];

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] text-[#1D352F] overflow-hidden selection:bg-[#7BB89A]/30 flex flex-col items-center justify-center">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(123,184,154,0.08),transparent_50%)]" />

      {/* ── GLOBAL PRELOADED DEMO OVERLAY ── */}
      <DemoOverlay showDemo={showDemo} />

      <main className="relative z-10 w-full px-8 md:px-12 pt-12 pb-32 flex flex-col justify-center min-h-screen max-w-[1600px] mx-auto overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.98, filter: "blur(4px)" }}
              transition={{ ...SWIFT_SPRING, duration: 0.7 }}
              className="w-full flex justify-center items-center py-12"
            >
              {/* ── HERO slide ── */}
              {slide.kind === "hero" && (
                <motion.div variants={stagger} initial="hidden" animate="show" className="text-center w-full max-w-5xl space-y-12">
                  <motion.h1 variants={fadeUp} className="text-[12vw] md:text-[9vw] font-medium tracking-tighter italic text-[#1D352F] leading-[0.9] pr-4 whitespace-nowrap">
                    {slide.title}
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-2xl md:text-3xl lg:text-4xl text-black/45 font-serif italic max-w-2xl mx-auto leading-normal whitespace-pre-line">
                    {slide.subtitle}
                  </motion.p>
                  <motion.div variants={fadeUp} className="pt-12 opacity-15">
                    <p className="mono text-[9px] tracking-[0.4em]">PRESS → TO CONTINUE</p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── QA slide ── */}
              {slide.kind === "qa" && (
                <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-4xl text-center space-y-16">
                  <div className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <span className="mono text-sm tracking-[0.4em] text-[#7BB89A] font-bold">
                        {slide.title.toUpperCase()}
                      </span>
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl italic font-medium tracking-tighter text-[#1D352F] leading-[0.95] whitespace-nowrap">
                      {slide.question}
                    </motion.h2>
                  </div>

                  <motion.div variants={fadeUp} className="w-12 h-[1px] bg-black/10 mx-auto" />

                  {/* Bullet points */}
                  <div className="space-y-5">
                    {slide.bullets?.map((b, i) => (
                      <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 text-left max-w-3xl">
                        <span className="w-2 h-2 rounded-full bg-[#7BB89A] shrink-0 mt-2.5" />
                        <span className="text-xl md:text-2xl text-black/80 leading-[1.4] font-medium">{b}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Nav hint */}
                  <motion.div variants={fadeUp} className="pt-6 opacity-15">
                    <p className="mono text-[9px] tracking-[0.4em]">PRESS → TO CONTINUE</p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── SIGNUP slide ── */}
              {slide.kind === "signup" && (
                <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-lg">
                    {/* Form State */}
                    {!done ? (
                      <div className="space-y-14">
                        <div className="space-y-5 text-center">
                          <motion.div variants={fadeUp} className="mono text-sm tracking-[0.4em] text-[#1D352F] opacity-40">
                            FINAL STEP
                          </motion.div>
                          <motion.h2 variants={fadeUp} className="text-7xl md:text-8xl font-medium tracking-tighter italic text-[#1D352F]">
                            {slide.title}
                          </motion.h2>
                          <motion.p variants={fadeUp} className="text-2xl md:text-3xl text-black/45 italic">
                            {slide.subtitle}
                          </motion.p>
                        </div>

                        <motion.form variants={fadeUp} onSubmit={submit} className="space-y-0 relative z-20">
                          <input
                            id="email"
                            type="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full bg-transparent border-b-2 border-black/10 py-5 text-3xl font-serif focus:outline-none focus:border-[#7BB89A] transition-colors placeholder:opacity-50 placeholder:text-black/40 italic text-[#1D352F] text-center"
                            required
                          />
                          <button
                            type="submit"
                            className="mt-10 w-full py-6 rounded-full bg-[#1D352F] text-white mono text-base font-bold tracking-[0.2em] hover:bg-black transition-all active:scale-[0.97] shadow-xl"
                          >
                            ENTER THE MARKET →
                          </button>
                        </motion.form>
                      </div>
                    ) : !showDemo ? (
                      <motion.div
                        key="allSet"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={SWIFT_SPRING}
                        className="space-y-12 text-center"
                      >
                        <div className="space-y-3">
                          <h3 className="text-7xl md:text-8xl italic font-medium tracking-tighter text-[#1D352F]">
                            All Set.
                          </h3>
                          <p className="opacity-50 max-w-sm mx-auto text-2xl font-serif italic leading-relaxed">
                            We will reach out when<br />the next market opens.
                          </p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="pt-8"
                        >
                          <button
                            onClick={() => setShowDemo(true)}
                            className="px-10 py-5 rounded-full border border-[#1D352F]/20 text-[#1D352F] mono text-sm font-bold tracking-[0.2em] hover:bg-[#1D352F]/5 transition-all active:scale-[0.97]"
                          >
                            WATCH DEMO
                          </button>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </motion.div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer progress */}
      <footer className="absolute bottom-0 w-full p-8 md:p-12 flex justify-between items-end z-50 pointer-events-none">
        <span className="mono text-[8px] opacity-10 tracking-[0.3em] hidden lg:block">
          CLIPBET — HACK CANADA
        </span>

        <div className="flex gap-1.5 pb-3">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === idx ? 40 : 6, backgroundColor: i === idx ? "rgba(29,53,47,0.55)" : "rgba(29,53,47,0.08)" }}
              className="h-[1.5px] rounded-full"
            />
          ))}
        </div>

        <span className="mono text-[9px] opacity-20 tracking-widest font-bold">
          {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </footer>

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
