import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "About — Bhuvan Sai" };

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile").select("*").eq("id", "main").single();
  const { data: education } = await supabase.from("education").select("*").order("sort_order");

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">About</h2>
      <div className="card p-6 mb-6 space-y-3">
        <p className="text-muted">{profile?.about || "Add your introduction from Admin → Manage About."}</p>
        {profile?.career_goals && (
          <div>
            <h4 className="text-sm font-semibold mt-4 mb-1">Career Goals</h4>
            <p className="text-muted text-sm">{profile.career_goals}</p>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-3">Education</h3>
      <div className="space-y-3">
        {(!education || education.length === 0) && <p className="text-muted text-sm">No education added yet.</p>}
        {education?.map((d) => (
          <div key={d.id} className="card p-5">
            <div className="font-semibold">{d.degree}</div>
            <div className="text-sm text-muted">
              {d.institution} · {d.start_year}–{d.end_year} {d.grade && `· ${d.grade}`}
            </div>
            {d.description && <p className="text-sm mt-2 text-muted">{d.description}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
