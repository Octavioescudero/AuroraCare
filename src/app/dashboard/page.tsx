import { redirect } from "next/navigation";
import { getSafeSession, isMockAuth } from "@/lib/api/auth0";
import { getMockSession } from "@/lib/auth/mock-session";
import { DashboardLogout } from "@/components/features/dashboard/dashboard-logout";

export default async function DashboardPage() {
  let userName: string | null = null;

  if (isMockAuth) {
    const user = await getMockSession();
    if (!user) redirect("/login");
    userName = user.name;
  } else {
    const session = await getSafeSession();
    if (!session) redirect("/login");
    userName = (session.user.name ?? session.user.email) as string;
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <h1 className="font-[family-name:var(--font-figtree)] text-xl font-semibold text-neutral-750">
          Aurora Care
        </h1>
        {isMockAuth ? (
          <DashboardLogout />
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">
              Hola, {userName}
            </span>
            <a
              href="/auth/logout?returnTo=/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-750"
            >
              Salir
            </a>
          </div>
        )}
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-figtree)] text-2xl font-bold text-neutral-750">
            Dashboard
          </h2>
          <p className="mt-2 text-neutral-500">
            Próximamente: estado del paciente, rutinas, alertas.
          </p>
        </div>
      </main>
    </main>
  );
}
