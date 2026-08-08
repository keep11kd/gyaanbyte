import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { ResetPasswordPageView } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset Password | GyaanByte",
  description:
    "Create a new secure password for your GyaanByte account.",
  openGraph: {
    title: "Reset Password | GyaanByte",
    description:
      "Create a new secure password for your GyaanByte account.",
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
function ResetPasswordLoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Loading password reset portal...
        </span>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoadingFallback />}>
      <ResetPasswordPageView />
    </Suspense>
  );
}
