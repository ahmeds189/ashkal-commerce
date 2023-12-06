import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashkal - اشكال",
  description:
    "Ashkal Creations - Where Every Design Unfolds a Unique Digital Symphony of Innovation and Artistry",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark h-full min-h-screen">
      <body className={cn(inter.className, "flex h-full flex-col")}>
        <Providers>
          <Toaster richColors position="top-center" />
          <Navbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
