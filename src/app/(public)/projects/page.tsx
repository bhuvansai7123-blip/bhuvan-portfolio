import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "Projects — Bhuvan Sai" };

export default async function ProjectsPage() {
  const supabase =await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order");

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Projects</h2>
      {(!projects || projects.length === 0) && <p className="text-muted text-sm">No projects added yet.</p>}
      <div className="grid sm:grid-cols-2 gap-5">
        {projects?.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            {p.image_url && (
              <div className="relative w-full h-40">
                <Image src={p.image_url} alt={p.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                {p.featured && <span className="tag">Featured</span>}
              </div>
              <p className="text-sm text-muted my-2 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {(p.tech || "").split(",").filter(Boolean).map((t: string) => (
                  <span key={t} className="tag">{t.trim()}</span>
                ))}
              </div>
              <div className="flex gap-2 text-xs">
                {p.github_url && <a href={p.github_url} target="_blank" className="btn-outline px-3 py-1.5">GitHub</a>}
                {p.demo_url && <a href={p.demo_url} target="_blank" className="btn-primary px-3 py-1.5">Live Demo</a>}
                <Link href={`/projects/${p.id}`} className="btn-outline px-3 py-1.5">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
