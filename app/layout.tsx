import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Sidebar from "./ui/Sidebar";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Exhibitions",
  description: "Browse collections of art, sculptures, and artifacts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only absolute top-0 left-0 bg-blue-600 text-white p-2 z-50"
        >
          Skip to main content
        </a>
        <Sidebar userDetails={session?.user} />
        <Header />
        <main className="flex-auto" id="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
