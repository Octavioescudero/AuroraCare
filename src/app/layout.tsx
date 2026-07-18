import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import { Providers } from "@/components/shared/auth0-provider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora Care",
  description:
    "App de monitoreo y cuidado para pacientes con Alzheimer. Panel del cuidador.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aurora Care",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F7FC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={`${figtree.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 font-sans text-neutral-750 dark:bg-neutral-0 dark:text-neutral-750">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
