import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | АвтоМентор",
    default: "АвтоМентор | Професійне навчання правилам дорожнього руху",
  },
  description: "Індивідуальні заняття з ПДР. Зрозумійте правила та станьте експертом теорії.",
  openGraph: {
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР. Зрозумійте правила та станьте експертом теорії.",
    url: "https://automenter.example.com",
    siteName: "АвтоМентор",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР. Перший безкоштовний урок!",
  }
};

import AmbientBackground from "@/components/animations/AmbientBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AmbientBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
