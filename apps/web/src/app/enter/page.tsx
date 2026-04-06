import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export default async function EnterPage() {
  let userId: string | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    redirect("/login");
  }

  if (userId) {
    redirect("/app");
  }

  redirect("/login");
}
