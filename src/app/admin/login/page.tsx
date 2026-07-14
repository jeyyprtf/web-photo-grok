import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <p className="font-serif text-3xl tracking-[0.2em] text-center mb-2">JUAN</p>
        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-fg-subtle mb-10">
          Studio Access
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
