import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">
          {children}
        </main>
      </div>
    </>
  );
}