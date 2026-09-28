"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const fields = ["name", "title", "intro", "about", "career_goals", "email", "github_url", "linkedin_url", "avatar_url", "resume_url"];
  const data: Record<string, unknown> = {};
  fields.forEach((f) => (data[f] = formData.get(f) || null));
  const { error } = await supabase.from("profile").upsert({ id: "main", ...data });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/about");
  revalidatePath("/admin/resume");
  revalidatePath("/");
}
