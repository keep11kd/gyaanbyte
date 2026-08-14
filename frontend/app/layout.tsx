import type { Metadata } from "next";

import "./globals.css";

import { Navbar } from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

import { AuthProvider } from "@/features/auth/context/AuthProvider";

export const metadata: Metadata = {
  title: "GyaanByte",
  description: "Learn. Build. Succeed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <AuthProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
