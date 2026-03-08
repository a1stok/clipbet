import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ClipBet | Instant Prediction Markets",
  description: "Hyperlocal prediction markets via App Clips. No app, no account, no friction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${dmMono.variable} antialiased selection:bg-[#7BB89A]/30`}
      >
        {children}
      </body>
    </html>
  );
}
