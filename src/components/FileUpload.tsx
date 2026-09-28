"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Uploads to the public "portfolio" bucket and writes the resulting URL
// into the hidden input named `name`, so it submits with the rest of
// the form. Works for images and PDFs.
export default function FileUpload({ name, defaultValue, accept = "image/*" }: { name: string; defaultValue?: string | null; accept?: string; }) {
  const [url, setUrl] = useState(defaultValue || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const supabase = createClient();
    const path = `${name}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, { upsert: true });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    setUrl(data.publicUrl);
    setBusy(false);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        <input type="file" accept={accept} onChange={handleFile} className="text-sm" />
        {busy && <span className="text-xs text-muted">Uploading…</span>}
      </div>
      {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
      {url && accept.includes("image") && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview" className="mt-2 h-24 rounded-lg border border-border object-cover" />
      )}
      {url && !accept.includes("image") && (
        <a href={url} target="_blank" className="text-xs text-accent underline mt-2 inline-block">Current file ↗</a>
      )}
    </div>
  );
}
