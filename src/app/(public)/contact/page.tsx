import { createClient } from "@/lib/supabase/server";
import ContactForm from "./ContactForm";

export const revalidate = 0;
export const metadata = { title: "Contact — Bhuvan Sai" };

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile").select("email, github_url, linkedin_url").eq("id", "main").single();

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Contact</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-2 text-sm">
          <div><b>Email:</b> {profile?.email || "—"}</div>
          <div><b>GitHub:</b> {profile?.github_url || "—"}</div>
          <div><b>LinkedIn:</b> {profile?.linkedin_url || "—"}</div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
