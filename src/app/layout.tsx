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
  title: "АвтоМентор | Професійний викладач ПДР",
  description: "Ефективне вивчення правил дорожнього руху. Індивідуальний підхід та сучасні методики. Забронюйте перший безкоштовний урок!",
  openGraph: {
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР та практичного водіння. Подолайте страх дороги та станьте безпечним водієм.",
    url: "https://automenter.example.com",
    siteName: "АвтоМентор",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР та практичного водіння. Перший безкоштовний урок!",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
