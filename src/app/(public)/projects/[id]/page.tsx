import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: p } = await supabase.from("projects").select("*").eq("id", params.id).single();
  if (!p) notFound();

  const screenshots: string[] = Array.isArray(p.screenshots) ? p.screenshots : [];

  return (
    <div className="card p-6 md:p-10">
      {p.image_url && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
          <Image src={p.image_url} alt={p.name} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-1">{p.name}</h1>
      <div className="text-xs text-muted mb-4">{p.start_date} — {p.end_date || "Present"}</div>
      <p className="text-muted mb-4">{p.description}</p>
      <div className="flex flex-wrap gap-1 mb-6">
        {(p.tech || "").split(",").filter(Boolean).map((t: string) => (
          <span key={t} className="tag">{t.trim()}</span>
        ))}
      </div>
      <div className="flex gap-3 mb-8">
        {p.github_url && <a href={p.github_url} target="_blank" className="btn-outline text-sm">GitHub</a>}
        {p.demo_url && <a href={p.demo_url} target="_blank" className="btn-primary text-sm">Live Demo</a>}
      </div>
      {screenshots.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {screenshots.map((s, i) => (
            <div key={i} className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={s} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
