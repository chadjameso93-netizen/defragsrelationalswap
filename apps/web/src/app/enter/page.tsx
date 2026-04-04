import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export default async function EnterPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  redirect("/signin");
}
