import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
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
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 Taleem Solutions. جميع الحقوق محفوظة.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
