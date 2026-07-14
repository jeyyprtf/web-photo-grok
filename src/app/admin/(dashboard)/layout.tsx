import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div>
      <AdminNav name={session.name} />
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
