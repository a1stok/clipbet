export interface Slide {
  id: string;
  kind: "hero" | "qa" | "signup";
  title: string;
  subtitle?: string;
  question?: string;
  bullets?: string[];
}

export const SLIDES: Slide[] = [
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
