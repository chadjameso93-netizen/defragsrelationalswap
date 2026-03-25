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
        color-scheme: light;
        --bg: #f5f0e7;
        --panel: rgba(255,255,255,0.86);
        --ink: #1b1d19;
        --muted: #5f6358;
        --line: rgba(27,29,25,0.12);
        --accent: #264653;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Iowan Old Style", "Palatino Linotype", Georgia, serif;
        background:
          radial-gradient(circle at top left, rgba(38,70,83,0.12), transparent 34%),
          linear-gradient(180deg, #f8f2e8 0%, #efe7db 100%);
        color: var(--ink);
      }
      .card {
        margin: 0;
        padding: 18px;
        min-height: 100vh;
      }
      .panel {
        max-width: 560px;
        margin: 0 auto;
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 18px;
        box-shadow: 0 16px 48px rgba(27,29,25,0.08);
      }
      .kicker {
        margin: 0 0 8px;
        font: 600 11px/1.2 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted);
      }
      h1 {
        margin: 0 0 10px;
        font-size: 24px;
        line-height: 1.1;
      }
      p {
        margin: 0;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.45;
      }
      ul {
        margin: 14px 0 0;
        padding-left: 18px;
        color: var(--ink);
      }
      li + li { margin-top: 8px; }
      .actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 16px;
      }
      .cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        text-decoration: none;
        background: var(--accent);
        color: white;
        font: 600 13px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .note {
        margin-top: 14px;
        color: var(--muted);
        font: 12px/1.4 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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

