import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { VerifyEmailPageView } from "@/features/auth";

export const metadata: Metadata = {
  title: "Verify Email | GyaanByte",
  description:
    "Verify your email address to activate your GyaanByte account and access all platform features.",
  openGraph: {
    title: "Verify Email | GyaanByte",
    description:
      "Verify your email address to activate your GyaanByte account and access all platform features.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Fallback component displayed during route hydration while search parameters resolve.
 */
function VerifyEmailLoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Loading verification portal...
        </span>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoadingFallback />}>
      <VerifyEmailPageView />
    </Suspense>
  );
}
