"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendMessage(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message || !email.includes("@")) {
    return { ok: false, error: "Please fill in a valid name, email, and message." };
  }

  const { error } = await supabase.from("messages").insert({ name, email, subject, message });
  if (error) return { ok: false, error: "Something went wrong. Please try again." };
  return { ok: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("messages").delete().eq("id", id);
}
