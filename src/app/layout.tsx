"use client";

import "./globals.css";
import { SettingsProvider } from "@/components/SettingsContext";
import { CitiesProvider } from "@/components/CitiesContext";
import { AuthProvider } from "@/components/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gradient-to-b from-sky-500 via-blue-600 to-indigo-800 font-sans text-white"
        style={{ backgroundAttachment: "fixed" }}
      >
        <AuthProvider>
          <SettingsProvider>
            <CitiesProvider>{children}</CitiesProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
