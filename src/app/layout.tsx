import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "GeoWeather",
  description: "A modern weather app",
};

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
