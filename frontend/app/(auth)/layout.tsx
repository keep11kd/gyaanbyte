import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Authentication | GyaanByte",
    template: "%s | GyaanByte",
  },
  description:
    "Secure authentication portal for the GyaanByte Platform.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {children}
    </main>
  );
}
