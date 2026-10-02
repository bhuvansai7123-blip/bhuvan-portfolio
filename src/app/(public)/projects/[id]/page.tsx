import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

function fmt(d?: string | null) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: p, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log("Project fetch error:", { id, error });
  if (!p) notFound();

  const screenshots: string[] = Array.isArray(p.screenshots)
    ? p.screenshots
    : (p.screenshots || "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);

  const features: string[] = (p.features || "")
    .split("\n")
    .map((f: string) => f.trim())
    .filter(Boolean);

  const tech: string[] = (p.tech || "")
    .split(",")
    .map((t: string) => t.trim().replace(/\.$/, ""))
    .filter(Boolean);

  return (
    <div className="card p-6 md:p-10">
      <Link href="/projects" className="text-sm text-muted hover:underline mb-4 inline-block">
        ← Back to projects
      </Link>

      {p.image_url && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
          <Image src={p.image_url} alt={p.name} fill className="object-cover" />
        </div>
      )}

      {p.category && (
        <div className="text-xs uppercase tracking-wide text-muted mb-1">{p.category}</div>
      )}
      <h1 className="text-2xl font-bold mb-1">{p.name}</h1>
      <div className="text-xs text-muted mb-4">
        {fmt(p.start_date)} — {p.end_date ? fmt(p.end_date) : "Present"}
        {p.role ? ` · ${p.role}` : ""}
      </div>

      <p className="text-muted mb-4">{p.description}</p>

      <div className="flex flex-wrap gap-1 mb-6">
        {tech.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        {p.github_url && (
          <a href={p.github_url} target="_blank" rel="noreferrer" className="btn-outline text-sm">
            GitHub
          </a>
        )}
        {p.demo_url && (
          <a href={p.demo_url} target="_blank" rel="noreferrer" className="btn-primary text-sm">
            Live Demo
          </a>
        )}
      </div>

      {features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {p.challenges && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Challenges & What I Learned</h2>
          <p className="text-muted whitespace-pre-line">{p.challenges}</p>
        </section>
      )}

      {screenshots.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Screenshots</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {screenshots.map((s, i) => (
              <div key={i} className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image src={s} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}