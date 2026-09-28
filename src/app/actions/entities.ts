"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ENTITIES } from "@/lib/entities";

function dataFromForm(entityKey: string, formData: FormData) {
  const def = ENTITIES[entityKey];
  const data: Record<string, unknown> = {};
  for (const field of def.fields) {
    const raw = formData.get(field.key);
    if (field.type === "boolean") {
      data[field.key] = raw === "on" || raw === "true";
    } else if (field.type === "number") {
      data[field.key] = raw ? Number(raw) : null;
    } else {
      data[field.key] = raw ? String(raw) : null;
    }
  }
  return data;
}

export async function createEntity(entityKey: string, formData: FormData) {
  const def = ENTITIES[entityKey];
  const supabase = await createClient();
  const { error } = await supabase.from(def.table).insert(dataFromForm(entityKey, formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/" + entityKey);
  revalidatePath("/");
  redirect("/admin/" + entityKey);
}

export async function updateEntity(entityKey: string, id: string, formData: FormData) {
  const def = ENTITIES[entityKey];
  const supabase = await createClient();
  const { error } = await supabase.from(def.table).update(dataFromForm(entityKey, formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/" + entityKey);
  revalidatePath("/");
  redirect("/admin/" + entityKey);
}

export async function deleteEntity(entityKey: string, id: string) {
  const def = ENTITIES[entityKey];
  const supabase = await createClient();
  const { error } = await supabase.from(def.table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/" + entityKey);
  revalidatePath("/");
}
