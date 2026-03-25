interface RateLimitWindow {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitWindow>();

function now() {
  return Date.now();
}

export function checkRateLimit(key: string, maxRequests: number, windowMs: number) {
  const current = buckets.get(key);
  const ts = now();

  if (!current || current.resetAt <= ts) {
    const next = { count: 1, resetAt: ts + windowMs };
    buckets.set(key, next);
    return { allowed: true, remaining: maxRequests - 1, resetAt: next.resetAt };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  buckets.set(key, current);
  return { allowed: true, remaining: Math.max(0, maxRequests - current.count), resetAt: current.resetAt };
}
