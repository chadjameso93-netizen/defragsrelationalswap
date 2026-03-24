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
  description: "Relational reasoning system for Companion, billing, and World.",
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
          }
          * {
            box-sizing: border-box;
          }
          body {
            min-width: 320px;
          }
          h1, h2, h3, h4 {
            font-family: var(--font-display), serif;
            font-weight: 500;
          }
          button, input, textarea, select {
            font: inherit;
          }
          button {
            transition: transform 160ms ease, opacity 160ms ease, border-color 160ms ease, background-color 160ms ease;
          }
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
        `}</style>
        {children}
      </body>
    </html>
  );
}
