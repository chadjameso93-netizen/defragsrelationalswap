import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";
import type { Database } from "../../types/supabase";

function required(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required Supabase env var: ${name}`);
  }
  return value;
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: CookieOptions }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}
