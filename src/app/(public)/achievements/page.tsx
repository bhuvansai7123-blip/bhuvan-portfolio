import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "Achievements — Bhuvan Sai" };

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: items } = await supabase.from("achievements").select("*").order("date", { ascending: false });

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Achievements</h2>
      {(!items || items.length === 0) && <p className="text-muted text-sm">No achievements added yet.</p>}
      <div className="space-y-4">
        {items?.map((a) => (
          <div key={a.id} className="card p-4">
            <div className="font-semibold">{a.title}</div>
            <div className="text-xs text-muted">{a.organization} {a.date && `· ${a.date}`}</div>
            {a.description && <p className="text-sm text-muted mt-1">{a.description}</p>}
            {a.external_link && <a href={a.external_link} target="_blank" className="text-xs text-accent underline">Link</a>}
          </div>
        ))}
      </div>
    </>
  );
}
