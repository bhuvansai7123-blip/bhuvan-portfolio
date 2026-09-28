import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile").select("*").eq("id", "main").single();
  const [{ count: projectCount }, { count: skillCount }, { count: certCount }, { count: achieveCount }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("achievements").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount || 0 },
    { label: "Skills", value: skillCount || 0 },
    { label: "Certificates", value: certCount || 0 },
    { label: "Achievements", value: achieveCount || 0 },
  ];

  const focusAreas = [
    { icon: "◆", title: "Software Development", desc: "Building clean, well-structured applications." },
    { icon: "☁", title: "Cloud Computing", desc: "Learning AWS and scalable cloud architecture." },
    { icon: "⚙", title: "DevOps", desc: "CI/CD, containers, and infrastructure tooling." },
    { icon: "✦", title: "AI / ML", desc: "Exploring applied machine learning." },
    { icon: "◈", title: "Problem Solving", desc: "DSA-driven, logical approach to engineering." },
  ];

  return (
    <>
      <div className="card hero p-8 md:p-12">
        <p className="text-accent text-sm mb-2">Hi, I'm</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{profile?.name || "Bhuvan Sai"}</h1>
        <h2 className="text-xl text-muted mb-4">{profile?.title || "Computer Science Engineering Student"}</h2>
        <p className="max-w-2xl text-muted mb-6">
          {profile?.intro || "Focused on Software Development, Cloud Computing, DevOps, AI/ML and problem solving."}
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/projects" className="btn-primary text-sm">View Projects</Link>
          <Link href="/resume" className="btn-outline text-sm">View Resume</Link>
          <Link href="/contact" className="btn-outline text-sm">Contact Me</Link>
        </div>
        <div className="flex gap-4 text-sm text-muted">
          {profile?.github_url && <a href={profile.github_url} target="_blank" className="hover:text-accent">GitHub</a>}
          {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" className="hover:text-accent">LinkedIn</a>}
          {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-accent">Email</a>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">What I Focus On</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {focusAreas.map((f) => (
            <div key={f.title} className="card focus-card p-5">
              <div className="text-accent text-lg mb-1">{f.icon}</div>
              <div className="font-semibold text-sm">{f.title}</div>
              <p className="text-xs text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}