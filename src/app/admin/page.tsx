import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [projects, skills, certs, achievements, messages] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("achievements").select("*", { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Total Projects", value: projects.count || 0 },
    { label: "Total Skills", value: skills.count || 0 },
    { label: "Total Certificates", value: certs.count || 0 },
    { label: "Total Achievements", value: achievements.count || 0 },
    { label: "Total Messages", value: messages.count || 0 },
  ];

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5 text-center">
            <div className="text-2xl font-bold text-accent">{c.value}</div>
            <div className="text-xs text-muted mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
