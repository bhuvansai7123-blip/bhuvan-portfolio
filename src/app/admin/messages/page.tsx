import { createClient } from "@/lib/supabase/server";
import { deleteMessage } from "@/app/actions/contact";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase.from("messages").select("*").order("created_at", { ascending: false });

  async function remove(formData: FormData) {
    "use server";
    await deleteMessage(String(formData.get("id")));
    revalidatePath("/admin/messages");
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Messages</h1>
      {(!messages || messages.length === 0) && <p className="text-muted text-sm">No messages yet.</p>}
      <div className="space-y-3">
        {messages?.map((m) => (
          <div key={m.id} className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm">{m.subject || "(no subject)"}</div>
                <div className="text-xs text-muted">{m.name} · {m.email} · {new Date(m.created_at).toLocaleString()}</div>
              </div>
              <form action={remove}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-xs text-red-600">Delete</button>
              </form>
            </div>
            <p className="text-sm mt-2">{m.message}</p>
          </div>
        ))}
      </div>
    </>
  );
}
