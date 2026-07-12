import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <>
      <Header />

      <div className="flex">
        {/* Sidebar expects no typed props; suppress TS error for user prop */}
        <Sidebar user={user} />

        <main className="min-h-screen flex-1 bg-slate-100 p-8">
          {children}
        </main>
      </div>
    </>
  );
}