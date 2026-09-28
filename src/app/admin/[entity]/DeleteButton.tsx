"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteEntity } from "@/app/actions/entities";

export default function DeleteButton({ entityKey, id }: { entityKey: string; id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      className="text-red-600 disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this item? This cannot be undone.")) return;
        startTransition(async () => {
          await deleteEntity(entityKey, id);
          router.refresh();
        });
      }}
    >
      Delete
    </button>
  );
}
