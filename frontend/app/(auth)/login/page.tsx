import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { LoginPageView } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign In | GyaanByte",
  description:
    "Sign in to your GyaanByte account to access your dashboard, projects, training, certificates, and mentorship sessions.",
  openGraph: {
    title: "Sign In | GyaanByte",
    description:
      "Sign in to your GyaanByte account to access your dashboard, projects, training, certificates, and mentorship sessions.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
  Fallback component displayed during route hydration while search parameters resolve.
 */
function LoginLoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Loading login portal...
        </span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoadingFallback />}>
      <LoginPageView />
    </Suspense>
  );
}
