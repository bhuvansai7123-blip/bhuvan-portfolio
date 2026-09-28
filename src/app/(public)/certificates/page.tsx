import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const metadata = { title: "Certificates — Bhuvan Sai" };

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: certs } = await supabase.from("certificates").select("*").order("issue_date", { ascending: false });

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Certificates</h2>
      {(!certs || certs.length === 0) && <p className="text-muted text-sm">No certificates added yet.</p>}
      <div className="grid sm:grid-cols-2 gap-5">
        {certs?.map((c) => (
          <div key={c.id} className="card p-4">
            {c.image_url && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                <Image src={c.image_url} alt={c.name} fill className="object-cover" />
              </div>
            )}
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs text-muted">{c.org} {c.issue_date && `· ${c.issue_date}`}</div>
            <div className="flex gap-3 mt-2 text-xs">
              {c.credential_url && <a href={c.credential_url} target="_blank" className="text-accent underline">View Credential</a>}
              {c.pdf_url && <a href={c.pdf_url} target="_blank" className="text-accent underline">PDF</a>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
