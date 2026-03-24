import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DEFRAG",
  description: "Guidance for real conversations, clearer next steps, and calmer follow-through.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable}`}
        style={{
          margin: 0,
          background: "#050505",
          color: "#f5f5f5",
          fontFamily: "var(--font-sans), sans-serif",
        }}
      >
        <style>{`
          :root {
            color-scheme: dark;
            --motion-spring: cubic-bezier(0.22, 1, 0.36, 1);
          }
          * {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            min-width: 320px;
          }
          h1, h2, h3, h4 {
            font-family: var(--font-display), serif;
            font-weight: 500;
          }
          a {
            transition: transform 180ms var(--motion-spring), opacity 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
          }
          button, input, textarea, select {
            font: inherit;
          }
          button {
            transition: transform 180ms var(--motion-spring), opacity 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
          }
          a:hover,
          button:hover {
            transform: translateY(-1px);
          }
          textarea:focus,
          input:focus,
          select:focus,
          button:focus {
            outline: 2px solid rgba(214,195,161,0.45);
            outline-offset: 2px;
          }
          .premium-fade-up {
            animation: premiumFadeUp 700ms var(--motion-spring) both;
          }
          .premium-fade-up[data-delay="1"] {
            animation-delay: 70ms;
          }
          .premium-fade-up[data-delay="2"] {
            animation-delay: 140ms;
          }
          .premium-fade-up[data-delay="3"] {
            animation-delay: 210ms;
          }
          .premium-panel {
            transition: transform 220ms var(--motion-spring), border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease;
          }
          .premium-panel:hover {
            transform: translateY(-3px);
            border-color: rgba(255,255,255,0.14) !important;
            box-shadow: 0 20px 50px rgba(0,0,0,0.24);
          }
          @keyframes premiumFadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
