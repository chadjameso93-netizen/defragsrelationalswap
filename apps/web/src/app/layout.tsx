import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

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
        className={`${inter.variable}`}
        style={{
          margin: 0,
          background: "#050505",
          color: "#f5f5f5",
          fontFamily: "var(--font-sans), sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        }}
      >
        <style>{`
          :root {
            color-scheme: dark;
            --color-bg: #050505;
            --color-surface: rgba(255, 255, 255, 0.04);
            --color-surface-hover: rgba(255, 255, 255, 0.06);
            --color-border: rgba(255, 255, 255, 0.08);
            --color-border-hover: rgba(255, 255, 255, 0.12);
            --color-text-primary: #ffffff;
            --color-text-secondary: rgba(255, 255, 255, 0.65);
            --color-text-muted: rgba(255, 255, 255, 0.4);
            --color-accent: #22d3ee;

            --radius-md: 12px;
            --radius-lg: 24px;
            --radius-pill: 9999px;

            --shadow-subtle: 0 8px 32px rgba(0,0,0,0.5);
            --shadow-glow: 0 0 32px rgba(34, 211, 238, 0.1);
            
            --motion-spring: cubic-bezier(0.16, 1, 0.3, 1);
            --motion-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
          }
          * {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            min-width: 320px;
            overflow-x: hidden;
            background-color: var(--color-bg) !important;
            color: var(--color-text-primary) !important;
            line-height: 1.5;
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
            font-weight: 500;
            letter-spacing: -0.02em;
          }
          p {
            margin: 0;
          }
          a {
            color: inherit;
            text-decoration: none;
            transition: opacity 0.2s ease;
          }
          a:hover {
            opacity: 0.8;
          }
          button {
            cursor: pointer;
            font-family: inherit;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          button:active {
            transform: scale(0.98);
          }
          input, textarea {
            font-family: inherit;
          }

          /* Reveal Motion */
          .premium-fade-up {
            opacity: 0;
            animation: premiumFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes premiumFadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.15);
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
