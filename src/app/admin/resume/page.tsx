import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/actions/profile";
import FileUpload from "@/components/FileUpload";

export const revalidate = 0;

export default async function AdminResumePage() {
  const supabase = await createClient();
  const { data: p } = await supabase.from("profile").select("*").eq("id", "main").single();

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Resume</h1>
      <p className="text-sm text-muted mb-4">Upload a new PDF any time — the public Resume page always shows the latest one, automatically.</p>
      <form action={updateProfile} className="space-y-4 max-w-xl">
        {/* Pass through the other profile fields unchanged */}
        <input type="hidden" name="name" defaultValue={p?.name || ""} />
        <input type="hidden" name="title" defaultValue={p?.title || ""} />
        <input type="hidden" name="intro" defaultValue={p?.intro || ""} />
        <input type="hidden" name="about" defaultValue={p?.about || ""} />
        <input type="hidden" name="career_goals" defaultValue={p?.career_goals || ""} />
        <input type="hidden" name="email" defaultValue={p?.email || ""} />
        <input type="hidden" name="github_url" defaultValue={p?.github_url || ""} />
        <input type="hidden" name="linkedin_url" defaultValue={p?.linkedin_url || ""} />
        <input type="hidden" name="avatar_url" defaultValue={p?.avatar_url || ""} />
        <div>
          <label>Resume PDF</label>
          <FileUpload name="resume_url" defaultValue={p?.resume_url} accept="application/pdf" />
        </div>
        <button className="btn-primary text-sm">Save</button>
      </form>
    </>
  );
}
