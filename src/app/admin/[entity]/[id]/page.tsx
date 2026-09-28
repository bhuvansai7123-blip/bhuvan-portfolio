import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ENTITIES } from "@/lib/entities";
import { updateEntity } from "@/app/actions/entities";
import EntityForm from "@/components/EntityForm";

export default async function EditEntityPage({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();

  const supabase = await createClient();
  const { data: row } = await supabase.from(def.table).select("*").eq("id", id).single();
  if (!row) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateEntity(entity, id, formData);
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Edit {def.label}</h1>
      <EntityForm def={def} action={action} initial={row} />
    </>
  );
}