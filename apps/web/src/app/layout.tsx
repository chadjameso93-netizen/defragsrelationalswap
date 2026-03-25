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
  description: "Understand what happened, see the pattern, and know what to do next.",
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
            --color-bg: #050505;
            --color-surface: rgba(255, 255, 255, 0.04);
            --color-surface-hover: rgba(255, 255, 255, 0.06);
            --color-border: rgba(255, 255, 255, 0.1);
            --color-border-hover: rgba(255, 255, 255, 0.15);
            --color-text-primary: #f5f5f5;
            --color-text-secondary: rgba(245, 245, 245, 0.7);
            --color-text-muted: rgba(245, 245, 245, 0.45);
            --color-accent: #22d3ee;
            
            --motion-spring: cubic-bezier(0.16, 1, 0.3, 1);
            --motion-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
            --motion-duration-fast: 120ms;
            --motion-duration-normal: 250ms;
            --motion-duration-slow: 500ms;
            
            --shadow-subtle: 0 8px 32px rgba(0,0,0,0.5);
            --shadow-glow: 0 0 32px rgba(34, 211, 238, 0.1);

            --radius-md: 12px;
            --radius-lg: 24px;
            --radius-pill: 9999px;
          }
          * {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            min-width: 320px;
            background-color: var(--color-bg) !important;
            color: var(--color-text-primary) !important;
          }
          h1, h2, h3, h4 {
            font-family: var(--font-display), serif;
            font-weight: 500;
          }
          a, button {
            transition: transform var(--motion-duration-normal) var(--motion-spring), 
                        opacity var(--motion-duration-fast) var(--motion-ease), 
                        border-color var(--motion-duration-fast) var(--motion-ease), 
                        background-color var(--motion-duration-fast) var(--motion-ease), 
                        box-shadow var(--motion-duration-normal) var(--motion-spring),
                        color var(--motion-duration-fast) var(--motion-ease);
          }
          a:hover, button:hover {
            transform: translateY(-1px);
          }
          textarea:focus, input:focus, select:focus, button:focus {
            outline: 2px solid color-mix(in srgb, var(--color-accent) 45%, transparent);
            outline-offset: 2px;
          }
          
          /* Reveal Motion Elements */
          .premium-fade-up {
            opacity: 0;
            animation: premiumFadeUp var(--motion-duration-slow) var(--motion-spring) forwards;
          }
          .premium-fade-up[data-delay="1"] { animation-delay: 80ms; }
          .premium-fade-up[data-delay="2"] { animation-delay: 160ms; }
          .premium-fade-up[data-delay="3"] { animation-delay: 240ms; }
          
          .premium-panel {
            transition: transform var(--motion-duration-normal) var(--motion-spring), 
                        border-color var(--motion-duration-normal) var(--motion-ease), 
                        background-color var(--motion-duration-normal) var(--motion-ease), 
                        box-shadow var(--motion-duration-normal) var(--motion-spring);
          }
          .premium-panel:hover {
            transform: translateY(-3px);
            border-color: var(--color-border-hover) !important;
            box-shadow: var(--shadow-subtle);
          }
          
          @keyframes premiumFadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after {
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
