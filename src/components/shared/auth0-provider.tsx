import { ThemeProvider } from "next-themes";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { MockSessionProvider } from "@/components/shared/mock-session-provider";
import { isMockAuth } from "@/lib/auth/mock-session";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {isMockAuth ? (
        <MockSessionProvider>{children}</MockSessionProvider>
      ) : (
        <Auth0Provider>{children}</Auth0Provider>
      )}
    </ThemeProvider>
  );
}
