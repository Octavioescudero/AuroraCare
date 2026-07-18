"use client";

import { useRouter } from "next/navigation";
import { useMockSession } from "@/components/shared/mock-session-provider";
import { LogOut } from "lucide-react";

export function DashboardLogout() {
  const { user, logout } = useMockSession();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-neutral-500">
        Hola, {user.name}
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-750"
      >
        <LogOut className="h-4 w-4" />
        Salir
      </button>
    </div>
  );
}
