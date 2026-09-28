import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "Resume — Bhuvan Sai" };

export default async function ResumePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile").select("resume_url").eq("id", "main").single();

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Resume</h2>
      <div className="card p-8">
        {profile?.resume_url ? (
          <>
            <p className="text-muted mb-4">My latest resume is available below.</p>
            <a href={profile.resume_url} target="_blank" className="btn-primary inline-block text-sm">Download / View Resume</a>
            <div className="mt-6 border border-border rounded-xl overflow-hidden" style={{ height: 600 }}>
              <iframe src={profile.resume_url} className="w-full h-full" title="Resume preview" />
            </div>
          </>
        ) : (
          <p className="text-muted">No resume uploaded yet.</p>
        )}
      </div>
    </>
  );
}
