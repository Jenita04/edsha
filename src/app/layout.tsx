import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: "--font-inter", // keep CSS variable name same to avoid breaking globals.css
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "EDSHA | Premium Gifting & Custom Hampers",
  description: "Personalized gifts crafted with love. Premium Acrylic Photo Frames and customized Gift Hampers for every special occasion. Styled in luxury black and gold.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${roboto.variable} ${playfair.variable} font-sans bg-neutral-950 text-neutral-100 min-h-screen flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200`}>
        <AuthProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
