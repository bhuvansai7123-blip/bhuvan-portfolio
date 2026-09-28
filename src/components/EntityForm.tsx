"use client";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";
import type { EntityDef } from "@/lib/entities";

export default function EntityForm({
  def,
  action,
  initial,
}: {
  def: EntityDef;
  action: (formData: FormData) => Promise<void>;
  initial?: Record<string, any>;
}) {
  const router = useRouter();

  return (
    <form action={action} className="space-y-4">
      {def.fields.map((f) => {
        const value = initial?.[f.key] ?? "";
        if (f.type === "url" && (f.key.includes("image") || f.key.includes("logo") || f.key.includes("icon") || f.key.includes("pdf"))) {
          return (
            <div key={f.key}>
              <label>{f.label}</label>
              <FileUpload name={f.key} defaultValue={value} accept={f.key.includes("pdf") ? "application/pdf" : "image/*"} />
            </div>
          );
        }
        if (f.type === "textarea") {
          return (
            <div key={f.key}>
              <label>{f.label}{f.required && " *"}</label>
              <textarea name={f.key} defaultValue={value} rows={4} required={f.required} />
            </div>
          );
        }
        if (f.type === "boolean") {
          return (
            <label key={f.key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name={f.key} defaultChecked={!!value} className="w-auto" />
              {f.label}
            </label>
          );
        }
        return (
          <div key={f.key}>
            <label>{f.label}{f.required && " *"}</label>
            <input
              type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
              name={f.key}
              defaultValue={value}
              required={f.required}
            />
            {f.help && <p className="text-xs text-muted mt-1">{f.help}</p>}
          </div>
        );
      })}
      <div className="flex gap-2">
        <button className="btn-primary text-sm">Save</button>
        <button type="button" onClick={() => router.back()} className="btn-outline text-sm">Cancel</button>
      </div>
    </form>
  );
}
