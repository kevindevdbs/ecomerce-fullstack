import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. IMPORTAR O CONTEXTO E O DRAWER
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/context/CartDrawer";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/ui/BackToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ray Resina Art",
  description: "Artes exclusivas em resina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />

          {children}

          <BackToTopButton />
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
