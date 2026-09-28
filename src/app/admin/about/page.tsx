import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/actions/profile";
import FileUpload from "@/components/FileUpload";

export const revalidate = 0;

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const { data: p } = await supabase.from("profile").select("*").eq("id", "main").single();

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Manage About</h1>
      <form action={updateProfile} className="space-y-4 max-w-xl">
        <div><label>Full Name</label><input name="name" defaultValue={p?.name || ""} /></div>
        <div><label>Title</label><input name="title" defaultValue={p?.title || ""} /></div>
        <div><label>Home Intro</label><textarea name="intro" rows={3} defaultValue={p?.intro || ""} /></div>
        <div><label>About Text</label><textarea name="about" rows={4} defaultValue={p?.about || ""} /></div>
        <div><label>Career Goals</label><textarea name="career_goals" rows={3} defaultValue={p?.career_goals || ""} /></div>
        <div><label>Email</label><input name="email" defaultValue={p?.email || ""} /></div>
        <div><label>GitHub URL</label><input name="github_url" defaultValue={p?.github_url || ""} /></div>
        <div><label>LinkedIn URL</label><input name="linkedin_url" defaultValue={p?.linkedin_url || ""} /></div>
        <div>
          <label>Profile Photo</label>
          <FileUpload name="avatar_url" defaultValue={p?.avatar_url} accept="image/*" />
        </div>
        <input type="hidden" name="resume_url" defaultValue={p?.resume_url || ""} />
        <button className="btn-primary text-sm">Save</button>
      </form>
    </>
  );
}
