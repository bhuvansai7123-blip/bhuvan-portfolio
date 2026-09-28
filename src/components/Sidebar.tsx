"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, User, Wrench, FolderGit2, Award, Trophy, FileText, Mail, Menu, Settings } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: User },
  { href: "/skills", label: "Skills", Icon: Wrench },
  { href: "/projects", label: "Projects", Icon: FolderGit2 },
  { href: "/certificates", label: "Certificates", Icon: Award },
  { href: "/achievements", label: "Achievements", Icon: Trophy },
  { href: "/resume", label: "Resume", Icon: FileText },
  { href: "/contact", label: "Contact", Icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden sticky top-0 z-20 bg-[#2C3E50] border-b border-[#34495E] flex items-center justify-between px-4 py-3 text-[#ECF0F1]">
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <span className="font-serif text-lg tracking-widest uppercase">Bhuvan Sai</span>
        <span className="w-[22px]" />
      </div>

      {open && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed md:sticky top-0 left-0 md:self-start h-screen w-72 z-40 bg-[#2C3E50] border-r border-[#34495E] p-6 flex flex-col transition-transform overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mb-8 px-2 pt-2">
          <div className="font-serif text-2xl font-semibold uppercase tracking-[0.18em] text-[#ECF0F1]">
            Bhuvan Sai
          </div>
          <div className="w-12 h-[2px] bg-[#7F8C8D] my-3" />
          <div className="text-xs text-[#BDC3C7] leading-relaxed">Computer Science Engineering Student</div>
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-3 tracking-wide transition-colors ${
                  active
                    ? "bg-[#ECF0F1] text-[#2C3E50] font-semibold"
                    : "text-[#BDC3C7] hover:bg-white/10 hover:text-[#ECF0F1]"
                }`}
              >
                <Icon size={18} className={active ? "text-[#2C3E50]" : "text-[#7F8C8D]"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-xs text-[#BDC3C7] hover:text-[#ECF0F1]">
            <Settings size={16} /> Admin
          </Link>
        </div>
      </aside>
    </>
  );
}