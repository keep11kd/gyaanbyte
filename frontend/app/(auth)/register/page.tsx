import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { RegisterPageView } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create Account | GyaanByte",
  description:
    "Create your GyaanByte account and start learning, building projects, and connecting with expert mentors.",
  openGraph: {
    title: "Create Account | GyaanByte",
    description:
      "Create your GyaanByte account and start learning, building projects, and connecting with expert mentors.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Fallback component displayed during route hydration while search parameters resolve.
 */
function RegisterLoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Loading registration portal...
        </span>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoadingFallback />}>
      <RegisterPageView />
    </Suspense>
  );
}
