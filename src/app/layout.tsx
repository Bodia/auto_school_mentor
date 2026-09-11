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
  metadataBase: new URL("https://www.avtomentor.com"),
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
    description: "Індивідуальні онлайн-заняття з ПДР. Зрозумійте логіку доріг без стресу та зубріння. Перший урок — безкоштовно!",
    url: "https://www.avtomentor.com",
    siteName: "АвтоМентор",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/og/variant-4.jpg",
        width: 1200,
        height: 630,
        alt: "АвтоМентор — Твій персональний наставник з ПДР",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "АвтоМентор | Професійний викладач ПДР",
    description: "Індивідуальні онлайн-заняття з ПДР. Перший безкоштовний урок!",
    images: ["/og/variant-4.jpg"],
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import AmbientBackground from "@/components/animations/AmbientBackground";
import { getContactsData, getActiveSocials } from "@/lib/contacts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = getContactsData();
  const activeSocials = getActiveSocials(contacts.socials);
  const socialUrls = activeSocials.map((s) => s.url);

  // Structured Data for AI bots (ChatGPT, Gemini, Google Search)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "АвтоМентор",
    "alternateName": ["AvtoMentor", "Авто Ментор"],
    "description": "Професійне індивідуальне навчання правилам дорожнього руху (ПДР) онлайн.",
    "url": "https://www.avtomentor.com",
    "telephone": contacts.phone,
    "email": contacts.email,
    "sameAs": socialUrls,
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.avtomentor.com/icon.png",
      "width": 192,
      "height": 192,
      "caption": "АвтоМентор логотип"
    },
    "image": "https://www.avtomentor.com/og/variant-4.jpg",
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
    <html lang="uk" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <MantineProvider defaultColorScheme="auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <AmbientBackground />
          <Navbar contacts={contacts} />
          <main>{children}</main>
          <Footer contacts={contacts} />
        </MantineProvider>
      </body>
    </html>
  );
}
