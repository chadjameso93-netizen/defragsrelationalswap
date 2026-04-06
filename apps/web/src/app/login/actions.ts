"use server";

import { createClient } from "../../utils/supabase/server";

export async function enterEmailSystemLink(email: string, nextPath: string) {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return {
      error:
        "Sign in is unavailable in this environment right now. Please try again when Supabase environment variables are configured.",
    };
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(nextPath)}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
