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
      "No simple way to act on in-the-moment hype at bars, games, or concerts.",
      "Traditional apps require accounts and identity checks that kill the spontaneity.",
      "Venues lack tools to turn fan energy into revenue and captured identity.",
    ],
  },
  /* ── Q2 : Proposed Solution ── */
  {
    id: "q2",
    kind: "qa",
    title: "The Solution",
    question: "How does ClipBet work?",
    bullets: [
      "Scan a QR code or tap an NFC tag to launch the Clip instantly.",
      "Place a small prediction and pay with Apple Pay in under 30 seconds.",
      "No app download or account creation required to participate.",
    ],
  },
  /* ── Q3 : 8-Hour Window ── */
  {
    id: "q3",
    kind: "qa",
    title: "The Window",
    question: "How do we close the loop?",
    bullets: [
      "8-hour notification window is used to send results, not spam.",
      "Alerts for 'Bets Close' and 'Event Resolution' keep fans engaged.",
      "Automatic settlements ensure a fair and trustless experience.",
    ],
  },
  /* ── Q4 : Platform Extensions ── */
  {
    id: "q4",
    kind: "qa",
    title: "Platform Ideas",
    question: "What new capabilities are we adding?",
    bullets: [
      "Persistent organizer sessions for managing multiple live markets.",
      "Role-aware views: same URL shows dashboard for owners, bettor UI for fans.",
      "Seamless integration with venue-specific payouts and analytics.",
    ],
  },
  /* ── Q5 : Impact Hypothesis ── */
  {
    id: "q5",
    kind: "qa",
    title: "The Impact",
    question: "Why does this matter?",
    bullets: [
      "Estimated 20-30% participation rate by removing the download barrier.",
      "Turns passive observers into active participants at peak excitement.",
      "Builds direct relationships between venues, organizers, and fans.",
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
