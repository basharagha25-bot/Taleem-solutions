import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Taleem Solutions | تعليم سولوشنز",
  description: "منصتك الأولى للدراسة في الخارج - رومانيا، ألمانيا، تركيا والمزيد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} min-h-screen bg-background font-sans antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
