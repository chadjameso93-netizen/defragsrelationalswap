"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function enablePreviewMode(plan: string = "studio") {
  const cookieStore = await cookies();
  cookieStore.set("__defrag_preview", plan, { path: "/", httpOnly: true });
  redirect("/preview");
}

export async function disablePreviewMode() {
  const cookieStore = await cookies();
  cookieStore.delete("__defrag_preview");
  redirect("/preview");
}
