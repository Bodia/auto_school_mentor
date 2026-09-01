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
  metadataBase: new URL("https://automenter.example.com"),
  title: {
    template: "%s | АвтоМентор",
    default: "АвтоМентор | Професійне навчання правилам дорожнього руху (ПДР)",
  },
  description: "Індивідуальні заняття з ПДР онлайн. Зрозумійте правила дорожнього руху та станьте експертом теорії з АвтоМентором. Підготовка до іспиту з ПДР в Україні.",
  keywords: ["АвтоМентор", "ПДР", "правила дорожнього руху", "навчання ПДР", "автошкола", "теорія водіння", "іспит ПДР", "індивідуальні заняття ПДР", "онлайн навчання", "підготовка до іспиту"],
  authors: [{ name: "АвтоМентор" }],
  creator: "АвтоМентор",
  publisher: "АвтоМентор",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР онлайн. Зрозумійте правила дорожнього руху та станьте експертом теорії з АвтоМентором.",
    url: "https://automenter.example.com",
    siteName: "АвтоМентор",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні заняття з ПДР. Перший безкоштовний урок!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import AmbientBackground from "@/components/animations/AmbientBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for AI bots (ChatGPT, Gemini, Google Search)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "АвтоМентор",
    "description": "Професійне індивідуальне навчання правилам дорожнього руху (ПДР) онлайн.",
    "url": "https://automenter.example.com",
    "logo": "https://automenter.example.com/favicon.ico",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "UA"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "UAH",
      "name": "Безкоштовний перший урок ПДР"
    }
  };

  return (
    <html lang="uk">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <MantineProvider defaultColorScheme="auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <AmbientBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
