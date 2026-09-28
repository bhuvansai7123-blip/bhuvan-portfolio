import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/entities";
import { createEntity } from "@/app/actions/entities";
import EntityForm from "@/components/EntityForm";

export default async function NewEntityPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();

  async function action(formData: FormData) {
    "use server";
    await createEntity(entity, formData);
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-5">Add {def.label}</h1>
      <EntityForm def={def} action={action} />
    </>
  );
}