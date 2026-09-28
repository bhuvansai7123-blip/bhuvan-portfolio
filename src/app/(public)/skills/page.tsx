import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "Skills — Bhuvan Sai" };

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase.from("skills").select("*").order("sort_order");
  const categories = Array.from(new Set((skills || []).map((s) => s.category)));

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Skills</h2>
      {(!skills || skills.length === 0) && <p className="text-muted text-sm">No skills added yet.</p>}
      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">{cat}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {skills!.filter((s) => s.category === cat).map((s) => (
              <div key={s.id} className="card p-4">
                <div className="flex justify-between">
                  <span className="font-medium">{s.name}</span>
                  {s.level && <span className="tag">{s.level}</span>}
                </div>
                {s.percentage != null && (
                  <div className="w-full h-1.5 bg-panel2 rounded-full mt-2">
                    <div className="h-1.5 bg-accent rounded-full" style={{ width: `${s.percentage}%` }} />
                  </div>
                )}
                {s.description && <p className="text-xs text-muted mt-2">{s.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
