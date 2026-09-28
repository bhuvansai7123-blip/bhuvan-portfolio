import Sidebar from "@/components/Sidebar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto p-5 md:p-10">{children}</div>
      </main>
    </div>
  );
}
