import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Middleware scope: auth/session gates only.
 * Redirect ownership for public entry paths (e.g. `/`, `/workspace`) lives in vercel.json and route handlers/pages,
 * and must not be duplicated here to avoid redirect conflicts.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}
