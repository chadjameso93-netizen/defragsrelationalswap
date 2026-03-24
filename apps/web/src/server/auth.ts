import { createClient } from "../utils/supabase/server";

export interface AuthenticatedUser {
  userId: string;
  email: string;
}

export async function getAuthenticatedUserOrNull(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email ?? "unknown@defrag.app",
  };
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}
