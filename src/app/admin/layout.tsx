import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { ENTITIES } from "@/lib/entities";

const EXTRA = [
  { href: "/admin/about", label: "About" },
  { href: "/admin/resume", label: "Resume" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const entityLinks = Object.entries(ENTITIES).map(([key, def]) => ({
    href: `/admin/${key}`,
    label: def.labelPlural,
  }));

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-panel border-r border-border p-5 flex flex-col gap-1">
        <div className="font-bold mb-2">Admin Dashboard</div>
        <Link href="/" className="rounded-lg px-3 py-2 mb-2 text-sm text-accent hover:bg-panel2">← View website</Link>
        <Link href="/admin" className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-panel2 hover:text-ink">Dashboard</Link>
        {entityLinks.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-panel2 hover:text-ink">Manage {l.label}</Link>
        ))}
        {EXTRA.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-panel2 hover:text-ink">{l.label}</Link>
        ))}
        <form action={logout} className="mt-auto pt-4 border-t border-border">
          <button className="text-xs text-muted hover:text-ink">Log out</button>
        </form>
      </aside>
      <main className="flex-1 p-6 md:p-10 max-w-4xl">{children}</main>
    </div>
  );
}