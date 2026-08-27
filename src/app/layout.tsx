"use client";

import "./globals.css";
import { SettingsProvider } from "@/components/SettingsContext";
import { CitiesProvider } from "@/components/CitiesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <CitiesProvider>
            <div className="mx-auto min-h-screen max-w-lg">{children}</div>
          </CitiesProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
