import type { Viewport } from "next";
import React from "react";

import "@/app/styles/globals.css";
import { cn } from "@/lib/utils";

import { fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers";
import TailwindIndicator from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

import { env } from "@/env";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function Analytics() {
  if (env.NEXT_ANALYTICS_UMAMI_ID) {
    return (
      <script
        defer
        src="https://analytics.us.umami.is/script.js"
        data-website-id={env.NEXT_ANALYTICS_UMAMI_ID}
      ></script>
    );
  }
  return null;
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Analytics></Analytics>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable
        )}
      >
        <TailwindIndicator />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
