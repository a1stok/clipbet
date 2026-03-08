"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ─── Slide Data ─── */

interface Slide {
  id: string;
  kind: "hero" | "qa" | "signup";
  title: string;
  subtitle?: string;
  question?: string;
  bullets?: string[];
}

const SLIDES: Slide[] = [
  /* ── Intro 1 ── */
  {
    id: "hook",
    kind: "hero",
    title: "Scan. Bet. Win.",
    subtitle: "Instant prediction markets at live events — powered by App Clips.",
  },
  /* ── Intro 2 ── */
  {
    id: "promise",
    kind: "hero",
    title: "No App. No Account.",
    subtitle: "Open a link, place a bet, and walk away.\nThat simple.",
  },

  /* ── Q1 : Problem Framing ── */
  {
    id: "q1",
    kind: "qa",
    title: "The Problem",
    question: "What friction are we solving?",
    bullets: [
      "Artists don't know who their fans are — ticketing platforms keep that data.",
      "Long merch lines at venues mean lost sales and frustrated fans.",
      "There is no direct relationship between the brand and the audience.",
    ],
  },
  /* ── Q2 : Proposed Solution ── */
  {
    id: "q2",
    kind: "qa",
    title: "The Solution",
    question: "How does ClipBet work?",
    bullets: [
      "Fan scans a QR code or taps an NFC tag at the venue.",
      "An App Clip opens instantly — no download, no sign-up.",
      "Fan places a prediction, engages with merch, and checks out in under 30 seconds.",
    ],
  },
  /* ── Q3 : 8-Hour Window ── */
  {
    id: "q3",
    kind: "qa",
    title: "The Window",
    question: "How do we keep fans engaged?",
    bullets: [
      "After opening, the Clip can send push notifications for 8 hours.",
      "Post-show nudges drive fans to the online store while excitement is high.",
      "This turns a single scan into a lasting direct channel.",
    ],
  },
  /* ── Q4 : Platform Extensions ── */
  {
    id: "q4",
    kind: "qa",
    title: "Platform Ideas",
    question: "What new capabilities would we build?",
    bullets: [
      "Native prediction-market primitives inside Reactiv Clips.",
      "Real-time crowd sentiment dashboards for artists and brands.",
      "Contextual AI recommendations based on time, location, and event type.",
    ],
  },
  /* ── Q5 : Impact Hypothesis ── */
  {
    id: "q5",
    kind: "qa",
    title: "The Impact",
    question: "Why does this matter for revenue?",
    bullets: [
      "Captures fan identity at scale with zero friction.",
      "Shifts merch sales from venue (revenue-shared) to online (full margin).",
      "Creates a reusable engagement channel for future tours and drops.",
    ],
  },

  /* ── Signup ── */
  {
    id: "signup",
    kind: "signup",
    title: "Join the Pool.",
    subtitle: "Enter your email below to get early access.",
  },
];

/* ─── Animation Config ─── */

const SWIFT_SPRING: any = {
  type: "spring",
  stiffness: 350,
  damping: 28,
  mass: 0.8,
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: SWIFT_SPRING },
};

/* ─── Component ─── */

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!showDemo) return;
    
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        // Placeholder YouTube ID (replace with actual unlisted YouTube video)
        videoId: "M7lc1UVf-VE", // Using a dummy YouTube Dev video for testing
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1,
          playlist: "M7lc1UVf-VE" // Required for looping single video
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          }
        }
      });
    };

    // If API is already loaded
    if (window.YT && window.YT.Player && !playerRef.current) {
      window.onYouTubeIframeAPIReady();
    }
  }, [showDemo]);

  const seekTo = (seconds: number) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seconds, true);
    }
  };

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
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
  }, [idx]);

  if (!mounted) return <div className="min-h-screen bg-[#FDFCFB]" />;

  const slide = SLIDES[idx];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FDFCFB] text-[#1A1814] selection:bg-[#7BB89A]/30 font-serif">
      {/* Header */}
      <header className="absolute top-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.9, y: 0 }}
          className="text-3xl font-semibold tracking-tight italic"
        >
          ClipBet
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          className="mono text-[9px] tracking-[0.4em] text-[#1D352F]"
        >
          HACK CANADA 2026
        </motion.span>
      </header>

      {/* ── Main ── */}
      <main className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 py-32">
        <div className="max-w-4xl w-full">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 50 : -50, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir < 0 ? 50 : -50, filter: "blur(6px)" }}
              transition={SWIFT_SPRING}
              className="flex flex-col items-center text-center"
            >
              {/* ── HERO slides ── */}
              {slide.kind === "hero" && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="space-y-10"
                >
                  <motion.h2
                    variants={fadeUp}
                    className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.88] text-[#1D352F] whitespace-nowrap"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    variants={fadeUp}
                    className="text-2xl md:text-4xl italic text-black/60 max-w-2xl mx-auto leading-relaxed whitespace-pre-line"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div variants={fadeUp} className="pt-14 opacity-15">
                    <p className="mono text-sm tracking-[0.3em]">
                      PRESS → TO CONTINUE
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {slide.kind === "qa" && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="space-y-10 w-full max-w-5xl"
                >
                  {/* Heading cluster */}
                  <div className="space-y-6">
                    <motion.h2
                      variants={fadeUp}
                      className="text-7xl md:text-8xl font-medium tracking-tighter text-[#1D352F] leading-none whitespace-nowrap"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      variants={fadeUp}
                      className="text-2xl md:text-3xl italic font-serif text-black/50"
                    >
                      {slide.question}
                    </motion.p>
                  </div>

                  {/* Divider */}
                  <motion.div
                    variants={fadeUp}
                    className="w-12 h-[1px] bg-black/10 mx-auto"
                  />

                  {/* Bullet points */}
                  <div className="space-y-5">
                    {slide.bullets?.map((b, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="flex items-center gap-4 text-left max-w-5xl mx-auto whitespace-nowrap"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7BB89A] shrink-0" />
                        <span className="text-xl md:text-2xl text-black/80 leading-none font-medium">
                          {b}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Nav hint */}
                  <motion.div variants={fadeUp} className="pt-6 opacity-15">
                    <p className="mono text-[9px] tracking-[0.4em]">
                      PRESS → TO CONTINUE
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── SIGNUP slide ── */}
              {slide.kind === "signup" && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="w-full max-w-lg"
                >
                  {!done ? (
                    <div className="space-y-14">
                      <div className="space-y-5 text-center">
                        <motion.div
                          variants={fadeUp}
                          className="mono text-sm tracking-[0.4em] text-[#1D352F] opacity-40"
                        >
                          FINAL STEP
                        </motion.div>
                        <motion.h2
                          variants={fadeUp}
                          className="text-7xl md:text-8xl font-medium tracking-tighter italic text-[#1D352F]"
                        >
                          {slide.title}
                        </motion.h2>
                        <motion.p
                          variants={fadeUp}
                          className="text-2xl md:text-3xl text-black/45 italic"
                        >
                          {slide.subtitle}
                        </motion.p>
                      </div>

                      <motion.form
                        variants={fadeUp}
                        onSubmit={submit}
                        className="space-y-0"
                      >
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
                      className="space-y-12"
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
                  ) : (
                    <motion.div
                      key="demo"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={SWIFT_SPRING}
                      className="w-[90vw] max-w-7xl -ml-[calc(45vw-50%)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center pt-8"
                    >
                      {/* Left Side: Video iframe & Controls */}
                      <div className="flex flex-col items-center gap-6 w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-8">
                        {/* Phone Bezel */}
                        <div className="w-full relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-[#111] bg-[#111] aspect-[9/16] ring-1 ring-black/10">
                           {/* YouTube Player Container - scaled slightly to hide YouTube watermarks if necessary */}
                           <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative pointer-events-none">
                              <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]" />
                           </div>
                        </div>

                        {/* Interactive Timeline Controls */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="flex gap-3 w-full"
                        >
                          <button 
                            onClick={() => seekTo(0)}
                            className="flex-1 py-3 px-4 rounded-xl bg-black/5 hover:bg-black/10 border border-black/5 text-[#1D352F] text-xs font-bold tracking-widest transition-all active:scale-95"
                          >
                            USER FLOW (0s)
                          </button>
                          <button 
                            onClick={() => seekTo(30)}
                            className="flex-1 py-3 px-4 rounded-xl bg-black/5 hover:bg-black/10 border border-black/5 text-[#1D352F] text-xs font-bold tracking-widest transition-all active:scale-95"
                          >
                            ORGANIZER FLOW (30s)
                          </button>
                        </motion.div>
                      </div>

                      {/* Right Side: Flow description layout */}
                      <div className="space-y-8 text-left max-w-lg mx-auto lg:mr-auto lg:ml-8 w-full py-12">
                        <div className="mono text-sm tracking-[0.4em] text-[#7BB89A] font-bold">
                          THE EXPERIENCE
                        </div>
                        <h3 className="text-5xl md:text-6xl italic font-medium tracking-tighter text-[#1D352F] leading-none">
                          Bettor Flow.
                        </h3>
                        <div className="space-y-6 pt-4">
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ ...SWIFT_SPRING, delay: 2.0 }} 
                            className="flex gap-4 items-start"
                          >
                            <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">
                              0:02
                            </span>
                            <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">
                              Viewing event info, total pool, and active bettors.
                            </p>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ ...SWIFT_SPRING, delay: 7.0 }} 
                            className="flex gap-4 items-start"
                          >
                            <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">
                              0:07
                            </span>
                            <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">
                              Entering email & nickname, selecting outcome and amount.
                            </p>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ ...SWIFT_SPRING, delay: 17.0 }} 
                            className="flex gap-4 items-start"
                          >
                            <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">
                              0:17
                            </span>
                            <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">
                              Rechecking estimated return, confirming, and paying.
                            </p>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ ...SWIFT_SPRING, delay: 20.0 }} 
                            className="flex gap-4 items-start"
                          >
                            <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">
                              0:20
                            </span>
                            <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">
                              Bet successfully placed. Enabling closure notifications.
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer progress */}
      <footer className="absolute bottom-0 w-full p-8 md:p-12 flex justify-between items-end z-50">
        <span className="mono text-[8px] opacity-10 tracking-[0.3em] hidden lg:block">
          CLIPBET — HACK CANADA
        </span>

        <div className="flex gap-1.5 pb-3">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === idx ? 40 : 6,
                backgroundColor:
                  i === idx
                    ? "rgba(29,53,47,0.55)"
                    : "rgba(29,53,47,0.08)",
              }}
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
