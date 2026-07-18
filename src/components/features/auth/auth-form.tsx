"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMockSession } from "@/components/shared/mock-session-provider";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

type View = "login" | "register";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading: sessionLoading } = useMockSession();

  const [view, setView] = useState<View>("login");

  const [email, setEmail] = useState("admin@aurora.care");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const returnTo = searchParams.get("returnTo") ?? "/dashboard";

  function switchView(v: View) {
    setView(v);
    setError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (view === "register") {
      if (!name.trim()) {
        setError("Completá tu nombre");
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      setLoading(true);
      setSuccess("Cuenta creada. Iniciando sesión...");
      setTimeout(async () => {
        await login(email, password);
        router.push(returnTo);
      }, 1200);
      return;
    }

    setLoading(true);
    const err = await login(email, password);
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }
    router.push(returnTo);
  }

  async function handleGoogle() {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (view === "register") {
      setSuccess("Cuenta creada. Iniciando sesión...");
      setTimeout(async () => {
        await login("admin@aurora.care", "admin");
        router.push(returnTo);
      }, 1200);
      return;
    }

    const err = await login("admin@aurora.care", "admin");
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }
    router.push(returnTo);
  }

  function handleForgotPassword() {
    alert("Próximamente: recuperación de contraseña via Auth0.");
  }

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-violet-600 dark:border-neutral-300 dark:border-t-violet-400" />
      </div>
    );
  }

  return (
    <>
      {/* Tabs */}
      <div className="mb-6 flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-200">
        <button
          type="button"
          onClick={() => switchView("login")}
          className={`flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors ${
            view === "login"
              ? "bg-white text-neutral-750 shadow-sm dark:bg-neutral-50 dark:text-neutral-750"
              : "text-neutral-500 hover:text-neutral-750 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => switchView("register")}
          className={`flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors ${
            view === "register"
              ? "bg-white text-neutral-750 shadow-sm dark:bg-neutral-50 dark:text-neutral-750"
              : "text-neutral-500 hover:text-neutral-750 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Registrarse
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-100 dark:text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-100 p-3 text-sm text-green-700 dark:bg-green-100 dark:text-green-700">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {view === "register" && (
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-750 placeholder-neutral-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-neutral-300 dark:bg-neutral-50 dark:text-neutral-750 dark:placeholder-neutral-500 dark:focus:border-violet-400 dark:focus:ring-violet-100"
              placeholder="María García"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-750 placeholder-neutral-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-neutral-300 dark:bg-neutral-50 dark:text-neutral-750 dark:placeholder-neutral-500 dark:focus:border-violet-400 dark:focus:ring-violet-100"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={view === "login" ? "current-password" : "new-password"}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm text-neutral-750 placeholder-neutral-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-neutral-300 dark:bg-neutral-50 dark:text-neutral-750 dark:placeholder-neutral-500 dark:focus:border-violet-400 dark:focus:ring-violet-100"
              placeholder={view === "register" ? "Mínimo 6 caracteres" : "••••••••"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {view === "register" && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm text-neutral-750 placeholder-neutral-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-neutral-300 dark:bg-neutral-50 dark:text-neutral-750 dark:placeholder-neutral-500 dark:focus:border-violet-400 dark:focus:ring-violet-100"
                placeholder="Repetí tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {view === "login" && (
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 active:bg-violet-800 disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600 dark:focus-visible:outline-violet-500 dark:active:bg-violet-700"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : view === "login" ? (
            "Iniciar sesión"
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-neutral-400 dark:bg-neutral-100 dark:text-neutral-500">
            o continuá con
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:opacity-50 dark:border-neutral-300 dark:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-200 dark:focus-visible:outline-neutral-400"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continuar con Google
      </button>
    </>
  );
}
