import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ENTITIES } from "@/lib/entities";
import DeleteButton from "./DeleteButton";

export const revalidate = 0;

export default async function EntityListPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();

  const supabase = await createClient();
  const { data: rows } = await supabase.from(def.table).select("*").order(def.orderBy || "created_at");

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Manage {def.labelPlural}</h1>
        <Link href={`/admin/${entity}/new`} className="btn-primary text-sm">+ Add {def.label}</Link>
      </div>
      <div className="space-y-2">
        {(!rows || rows.length === 0) && <p className="text-muted text-sm">No {def.labelPlural.toLowerCase()} yet.</p>}
        {rows?.map((row) => (
          <div key={row.id} className="card p-3 flex justify-between items-center">
            <span className="text-sm truncate">{row[def.titleField] || row.id}</span>
            <span className="flex gap-3 text-xs">
              <Link href={`/admin/${entity}/${row.id}`} className="text-accent">Edit</Link>
              <DeleteButton entityKey={entity} id={row.id} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}