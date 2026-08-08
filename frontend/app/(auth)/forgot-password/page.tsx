import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { ForgotPasswordPageView } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset Password | GyaanByte",
  description:
    "Recover access to your GyaanByte account by securely resetting your password.",
  openGraph: {
    title: "Reset Password | GyaanByte",
    description:
      "Recover access to your GyaanByte account by securely resetting your password.",
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
function ForgotPasswordLoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Loading recovery portal...
        </span>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordLoadingFallback />}>
      <ForgotPasswordPageView />
    </Suspense>
  );
}
