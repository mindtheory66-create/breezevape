import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGroteskFont = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const orbitronFont = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breezevapestore.com"),
  title: "Breeze Vape Directory — Temukan Toko Vapor Terdekat di Indonesia",
  description: "Cari toko vapor terbaik dengan Breeze Vape Directory. Direktori toko vape modern, nyentrik, dan youth-centric pertama di Indonesia.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${spaceGroteskFont.variable} ${orbitronFont.variable} antialiased font-inter bg-background text-foreground`}
        suppressHydrationWarning
      >
        <div className="vapor-mesh" />
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <div className="fixed bottom-0 left-0 right-0 bg-neon-pink text-black py-1 px-4 text-[10px] font-bold text-center z-[100] tracking-widest uppercase">
          21+ SAJA — VAPE DENGAN BIJAK
        </div>
      </body>
    </html>
  );
}
