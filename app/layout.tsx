import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { cn, constructMetadata } from "@/lib/utils";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full min-h-screen">
      <body className={cn(inter.className, "flex h-full flex-col")}>
        <Providers>
          <Toaster richColors position="top-center" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
