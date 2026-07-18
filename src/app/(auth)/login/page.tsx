import { Suspense } from "react";
import { AuthForm } from "@/components/features/auth/auth-form";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-figtree)] text-4xl font-bold tracking-tight text-neutral-750 dark:text-neutral-50">
            Aurora Care
          </h1>
          <p className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
            Panel del cuidador
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-elevation-2 dark:bg-neutral-100">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-violet-600 dark:border-neutral-300 dark:border-t-violet-400" />
              </div>
            }
          >
            <AuthForm />
          </Suspense>
        </div>

        <div className="flex items-center justify-center gap-3">
          <ThemeToggle />
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Aurora Care — Tesis UTN-FRC 2026
          </p>
        </div>
      </div>
    </main>
  );
}
