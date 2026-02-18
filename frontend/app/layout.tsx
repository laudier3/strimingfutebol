import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Futebol ao Vivo - Assista sem travar",
  description: "Assista futebol ao vivo online com qualidade HD e acesso imediato.",

  openGraph: {
    title: "Futebol ao Vivo - Assista sem travar",
    description: "Transmissão rápida, segura e em Full HD. Acesse agora.",
    url: "https://www.futebollaovivo.online/",
    siteName: "Futebol ao Vivo",
    images: [
      {
        url: "https://www.futebollaovivo.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Futebol ao Vivo - Streaming HD",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Futebol ao Vivo - Assista sem travar",
    description: "Transmissão esportiva oficial em Full HD.",
    images: ["https://www.futebollaovivo.online/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
