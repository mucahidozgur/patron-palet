import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import Providers from "@/components/Providers";
import IntroGate from "@/components/layout/Intro";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
  title: "TR Patron Palet — Sıfır Palet Üretimi & İkinci El Palet Alım Satımı",
  description:
    "Ankara'dan Türkiye'ye ve tüm dünyaya: sıfır ahşap palet üretimi, ikinci el palet alım satımı ve ISPM 15 uyumlu ihracat sandığı imalatı.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${orbitron.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink font-sans text-ivory antialiased">
        <Providers>
          <IntroGate>{children}</IntroGate>
        </Providers>
      </body>
    </html>
  );
}
