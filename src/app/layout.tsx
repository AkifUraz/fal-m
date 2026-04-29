import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileBottomCTA from "@/components/MobileBottomCTA";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aslanhan Hukuk & Danışmanlık | Hukuki Sorunlarınızda Yanınızdayız",
  description:
    "Aile hukuku, iş hukuku, tüketici hakları ve daha fazlasında uzman hukuki danışmanlık. Hemen arayın.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="tr">
        <body className={`${lora.variable} ${nunito.variable}`}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
          <MobileBottomCTA />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
