"use client";

import { useMemo, useState } from "react";
import type { InsightApiResponse } from "@/types/contracts";

type ShareCardMode = "summary" | "prep" | "next" | "teaser";

interface InsightShareStudioProps {
  result: InsightApiResponse;
  request?: string;
}

function buildCardCopy(mode: ShareCardMode, result: InsightApiResponse, request?: string) {
  const title =
    mode === "summary"
      ? "A calmer read"
      : mode === "prep"
        ? "Conversation prep"
        : mode === "next"
          ? "What to try next"
          : "A small teaser";

  const headline =
    mode === "summary"
      ? result.insight.what_may_be_happening
      : mode === "prep"
        ? result.structured_synthesis?.timing_assessment ?? "This may land better if the first step stays slower and smaller."
        : mode === "next"
          ? result.insight.what_to_try_next[0] ?? "Keep the next move small and easy to answer."
          : result.structured_synthesis?.dynamic_between ?? result.insight.what_it_may_be_causing;

  const body =
    mode === "summary"
      ? result.insight.what_it_may_be_causing
      : mode === "prep"
        ? result.structured_synthesis?.other_experience ?? "The other person may be hearing pressure before they can hear intent."
        : mode === "next"
          ? result.insight.what_to_try_next.slice(1, 3).join(" ")
          : "A softer read can sometimes reveal more than the first story we tell ourselves.";

  const footer =
    mode === "teaser"
      ? "Shared from DEFRAG"
      : request
        ? `From: ${request.slice(0, 72)}${request.length > 72 ? "…" : ""}`
        : "Shared from DEFRAG";

  return { title, headline, body, footer };
}

function makeSvgCard(copy: ReturnType<typeof buildCardCopy>, result: InsightApiResponse) {
  const safe = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const lines = (text: string, limit: number) => {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > limit) {
        if (current) chunks.push(current);
        current = word;
      } else {
        current = next;
      }
    }

    if (current) chunks.push(current);
    return chunks.slice(0, 4);
  };

  const headlineLines = lines(copy.headline, 28);
  const bodyLines = lines(copy.body, 40);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
      <defs>
        <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0b1018"/>
          <stop offset="100%" stop-color="#06070c"/>
        </linearGradient>
        <radialGradient id="glowA" cx="0.18" cy="0.12" r="0.6">
          <stop offset="0%" stop-color="rgba(217,196,159,0.34)"/>
          <stop offset="100%" stop-color="rgba(217,196,159,0)"/>
        </radialGradient>
        <radialGradient id="glowB" cx="0.86" cy="0.18" r="0.5">
          <stop offset="0%" stop-color="rgba(123,164,224,0.26)"/>
          <stop offset="100%" stop-color="rgba(123,164,224,0)"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1500" fill="#04050a"/>
      <rect width="1200" height="1500" fill="url(#glowA)"/>
      <rect width="1200" height="1500" fill="url(#glowB)"/>
      <rect x="56" y="56" rx="44" ry="44" width="1088" height="1388" fill="url(#panel)" stroke="rgba(255,255,255,0.08)" />
      <text x="108" y="150" fill="#d9c49f" font-size="30" font-family="Georgia, serif" letter-spacing="10">DEFRAG</text>
      <text x="108" y="218" fill="rgba(245,245,245,0.58)" font-size="24" font-family="Arial, sans-serif" letter-spacing="4">${safe(copy.title.toUpperCase())}</text>
      ${headlineLines
        .map(
          (line, index) =>
            `<text x="108" y="${332 + index * 74}" fill="#f5f5f5" font-size="56" font-family="Georgia, serif">${safe(line)}</text>`,
        )
        .join("")}
      ${bodyLines
        .map(
          (line, index) =>
            `<text x="108" y="${730 + index * 44}" fill="rgba(245,245,245,0.72)" font-size="30" font-family="Arial, sans-serif">${safe(line)}</text>`,
        )
        .join("")}
      <rect x="108" y="930" rx="24" ry="24" width="984" height="300" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.06)" />
      <text x="146" y="1002" fill="rgba(245,245,245,0.58)" font-size="22" font-family="Arial, sans-serif" letter-spacing="4">WHAT TO HOLD</text>
      ${result.insight.what_to_try_next
        .slice(0, 3)
        .map(
          (item, index) =>
            `<text x="146" y="${1074 + index * 60}" fill="#f5f5f5" font-size="28" font-family="Arial, sans-serif">0${index + 1}  ${safe(item)}</text>`,
        )
        .join("")}
      <text x="108" y="1344" fill="rgba(245,245,245,0.48)" font-size="24" font-family="Arial, sans-serif">${safe(copy.footer)}</text>
    </svg>
  `;
}

export default function InsightShareStudio({ result, request }: InsightShareStudioProps) {
  const [mode, setMode] = useState<ShareCardMode>("summary");
  const [status, setStatus] = useState<string | null>(null);

  const copy = useMemo(() => buildCardCopy(mode, result, request), [mode, request, result]);

  const shareText = `${copy.title}\n\n${copy.headline}\n\n${copy.body}\n\n${result.insight.what_to_try_next
    .slice(0, 2)
    .map((item) => `• ${item}`)
    .join("\n")}\n\nShared from DEFRAG`;

  const downloadCard = async () => {
    const svg = makeSvgCard(copy, result);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `defrag-${mode}-card.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Card downloaded.");
  };

  const copyCard = async () => {
    await navigator.clipboard.writeText(shareText);
    setStatus("Card text copied.");
  };

  const shareCard = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "DEFRAG insight card",
        text: shareText,
      });
      setStatus("Share sheet opened.");
      return;
    }

    await copyCard();
  };

  return (
    <section
      className="premium-panel premium-fade-up"
      data-delay="2"
      style={{
        display: "grid",
        gap: 18,
        padding: 24,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "radial-gradient(circle at top left, rgba(217,196,159,0.14), transparent 28%), radial-gradient(circle at 82% 18%, rgba(123,164,224,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d9c49f" }}>Share studio</p>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.45, color: "#f5f5f5" }}>
          Turn this read into a message-sized card that stays gentle, specific, and safe to share.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          ["summary", "One-card summary"],
          ["prep", "Conversation prep"],
          ["next", "What to try next"],
          ["teaser", "Subtle teaser"],
        ].map(([value, label]) => {
          const active = mode === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value as ShareCardMode)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: active ? "1px solid rgba(217,196,159,0.45)" : "1px solid rgba(255,255,255,0.1)",
                background: active ? "rgba(217,196,159,0.08)" : "rgba(255,255,255,0.02)",
                color: active ? "#f8ecd4" : "#d4d4d8",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          padding: 22,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at top left, rgba(217,196,159,0.16), transparent 34%), linear-gradient(180deg, rgba(8,10,15,0.98), rgba(7,8,12,0.96))",
          display: "grid",
          gap: 18,
          boxShadow: "0 24px 60px rgba(0,0,0,0.32)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d9c49f" }}>DEFRAG</div>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.48)" }}>{copy.title}</div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 28, lineHeight: 1.18, color: "#f5f5f5", fontFamily: "var(--font-display), serif" }}>{copy.headline}</p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(245,245,245,0.7)" }}>{copy.body}</p>
        </div>
        <div style={{ display: "grid", gap: 8, padding: 16, borderRadius: 18, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>What to hold</div>
          {result.insight.what_to_try_next.slice(0, 3).map((item, index) => (
            <div key={item} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 10, alignItems: "start" }}>
              <span style={{ color: "#d9c49f", fontSize: 11, paddingTop: 3 }}>0{index + 1}</span>
              <span style={{ color: "#f5f5f5", lineHeight: 1.6, fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end", color: "rgba(245,245,245,0.45)", fontSize: 12 }}>
          <span>{copy.footer}</span>
          <span>defrag.app</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={shareCard}
          style={{ padding: "12px 16px", borderRadius: 999, border: 0, background: "#f5f5f5", color: "#050505", fontWeight: 700, cursor: "pointer" }}
        >
          Share card
        </button>
        <button
          type="button"
          onClick={copyCard}
          style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "transparent", color: "#f5f5f5", cursor: "pointer" }}
        >
          Copy text
        </button>
        <button
          type="button"
          onClick={downloadCard}
          style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", background: "transparent", color: "#f5f5f5", cursor: "pointer" }}
        >
          Download SVG
        </button>
      </div>

      {status ? <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>{status}</p> : null}
    </section>
  );
}
