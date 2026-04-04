interface WidgetAction {
  label: string;
  url?: string;
}

interface WidgetPageInput {
  title: string;
  kicker: string;
  summary: string;
  bullets?: string[];
  actions?: WidgetAction[];
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderWidgetPage(input: WidgetPageInput) {
  const bullets = (input.bullets ?? [])
    .slice(0, 3)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  const actions = (input.actions ?? [])
    .slice(0, 2)
    .map(
      (action) =>
        `<a class="cta" href="${escapeHtml(action.url ?? "#")}" target="_blank" rel="noreferrer">${escapeHtml(action.label)}</a>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(input.title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --color-bg: #030303;
        --color-surface: rgba(255, 255, 255, 0.02);
        --color-border: rgba(255, 255, 255, 0.06);
        --color-text-primary: #f8f8f8;
        --color-text-secondary: rgba(248, 248, 248, 0.65);
        --color-text-muted: rgba(248, 248, 248, 0.40);
        --color-accent: #d6c3a1;

        --radius-md: 16px;
        --radius-lg: 24px;
        --radius-pill: 9999px;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: var(--font-sans), ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: var(--color-bg);
        color: var(--color-text-primary);
        padding: 0;
      }
      .card {
        margin: 0;
        padding: 18px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .panel {
        max-width: 560px;
        margin: 0 auto;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 24px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
      }
      .kicker {
        margin: 0 0 10px;
        font: 600 11px/1.2 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-accent);
      }
      h1 {
        margin: 0 0 12px;
        font-size: 24px;
        line-height: 1.2;
        font-family: var(--font-display), serif;
        font-weight: 500;
      }
      p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 15px;
        line-height: 1.6;
      }
      ul {
        margin: 16px 0 0;
        padding-left: 20px;
        color: var(--color-text-primary);
      }
      li + li { margin-top: 10px; }
      .actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      .cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 18px;
        border-radius: var(--radius-pill);
        text-decoration: none;
        background: var(--color-text-primary);
        color: var(--color-bg);
        font: 600 13px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        transition: transform 150ms ease, opacity 150ms ease;
      }
      .cta:hover {
        transform: translateY(-1px);
        opacity: 0.9;
      }
      .note {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid var(--color-border);
        color: var(--color-text-muted);
        font: 12px/1.5 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <section class="panel">
        <p class="kicker">${escapeHtml(input.kicker)}</p>
        <h1>${escapeHtml(input.title)}</h1>
        <p>${escapeHtml(input.summary)}</p>
        ${bullets ? `<ul>${bullets}</ul>` : ""}
        ${actions ? `<div class="actions">${actions}</div>` : ""}
        <p class="note">Inline-first DEFRAG widget. Business state stays on DEFRAG infrastructure.</p>
      </section>
    </main>
  </body>
</html>`;
}

