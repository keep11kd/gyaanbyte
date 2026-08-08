import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Access Denied | GyaanByte",
  description:
    "You do not have permission to access this resource. Please log in with appropriate credentials.",
  openGraph: {
    title: "Access Denied | GyaanByte",
    description:
      "You do not have permission to access this resource. Please log in with appropriate credentials.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* Ambient Background Lighting Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-lime-500/5 blur-[140px]"
      />

      <div className="relative w-full max-w-xl">
        {/* Glassmorphic Container Card */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12">
          {/* Status Badge */}
          <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 shadow-sm">
            403 • Access Restricted
          </span>

          {/* Warning Icon Display */}
          <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/5">
            <ShieldAlert className="h-10 w-10 shrink-0 text-red-400" />
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Access Denied
          </h1>

          {/* Description */}
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Sorry, you don&apos;t have permission to access this page. If you believe this is a mistake, please contact your administrator or sign in with an account that has the required permissions.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="
                inline-flex h-12 items-center justify-center gap-2 rounded-xl
                bg-lime-400 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-lime-950/30
                transition-all duration-200
                hover:bg-lime-300 hover:shadow-lime-400/20
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
                active:scale-[0.99]
              "
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>

            <Link
              href="/"
              className="
                inline-flex h-12 items-center justify-center gap-2 rounded-xl
                border border-slate-800 bg-slate-900/80 px-6 text-sm font-semibold text-slate-200
                shadow-md transition-all duration-200
                hover:border-lime-400/50 hover:bg-slate-800 hover:text-lime-400
                focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:ring-offset-2 focus:ring-offset-slate-950
                active:scale-[0.99]
              "
            >
              <Home className="h-4 w-4" />
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
