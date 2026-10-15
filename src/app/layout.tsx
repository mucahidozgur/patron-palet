import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patron Palet — Endüstriyel Ahşap Çözümleri",
  description:
    "Dayanıklı, sürdürülebilir ve standartlara uygun ahşap palet üretimi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${space.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-void font-sans text-pure antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
