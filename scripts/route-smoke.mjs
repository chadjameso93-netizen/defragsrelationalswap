import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const appDir = path.join(repoRoot, "apps/web/src/app");
const vercelConfigPath = path.join(repoRoot, "vercel.json");

function walk(dir, predicate, acc = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, predicate, acc);
      continue;
    }
    if (predicate(fullPath)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function normalizeRouteFromPageFile(pageFile) {
  const relative = path.relative(appDir, pageFile).replace(/\\/g, "/");
  const withoutPage = relative.replace(/\/page\.tsx$/, "");
  if (!withoutPage) return "/";
  return `/${withoutPage}`;
}

function normalizePath(input) {
  const url = input.split("?")[0]?.split("#")[0] ?? input;
  if (!url || url === "/") return "/";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolvePath(pathname, routes, redirectMap, seen = new Set()) {
  const normalized = normalizePath(pathname);
  if (routes.has(normalized)) {
    return { ok: true, finalPath: normalized };
  }
  const redirectDestination = redirectMap.get(normalized);
  if (!redirectDestination) {
    return { ok: false, finalPath: normalized, reason: "missing route and redirect" };
  }
  if (seen.has(normalized)) {
    return { ok: false, finalPath: normalized, reason: "redirect loop detected" };
  }
  seen.add(normalized);
  return resolvePath(redirectDestination, routes, redirectMap, seen);
}

function extractLocalHrefs(filePath) {
  const contents = readFileSync(filePath, "utf8");
  const hrefMatches = contents.matchAll(/href=["'`](\/[^"'`?#\s]*)/g);
  return [...hrefMatches].map((match) => normalizePath(match[1]));
}

const pageFiles = walk(appDir, (fullPath) => fullPath.endsWith("/page.tsx"));
const routes = new Set(pageFiles.map(normalizeRouteFromPageFile));

const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
const redirects = Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : [];
const redirectMap = new Map(
  redirects
    .filter((redirect) => typeof redirect.source === "string" && typeof redirect.destination === "string")
    .map((redirect) => [normalizePath(redirect.source), normalizePath(redirect.destination)]),
);

const requiredRoutes = [
  "/",
  "/studio",
  "/about",
  "/plans",
  "/signin/studio",
  "/signup/studio",
  "/forgot-password",
  "/reset-password",
  "/onboarding",
  "/intake",
  "/workspace/clarity-v2",
];

const navSources = [
  path.join(repoRoot, "apps/web/src/components/app-shell.tsx"),
  path.join(repoRoot, "apps/web/src/app/studio/page.tsx"),
];

const navAndFooterLinks = navSources.flatMap(extractLocalHrefs);

const bannedDynamicsCtaFiles = [
  path.join(repoRoot, "apps/web/src/components/app-shell.tsx"),
  path.join(repoRoot, "apps/web/src/app/studio/page.tsx"),
  path.join(repoRoot, "apps/web/src/app/landing/page.tsx"),
  path.join(repoRoot, "apps/web/src/app/about/page.tsx"),
  path.join(repoRoot, "apps/web/src/app/account/page.tsx"),
];

const failures = [];

for (const routePath of [...requiredRoutes, ...navAndFooterLinks]) {
  const result = resolvePath(routePath, routes, redirectMap);
  if (!result.ok) {
    failures.push(`Unresolvable path '${routePath}': ${result.reason}.`);
  }
}

for (const filePath of bannedDynamicsCtaFiles) {
  const contents = readFileSync(filePath, "utf8");
  if (contents.includes('href="/dynamics"') || contents.includes('secondaryHref="/dynamics"')) {
    failures.push(`Public CTA in ${path.relative(repoRoot, filePath)} still points at /dynamics.`);
  }
}

if (failures.length > 0) {
  console.error("Route smoke checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Route smoke checks passed.");
