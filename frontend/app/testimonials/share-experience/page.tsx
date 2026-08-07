"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send, Star } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

export default function ShareExperiencePage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[130px]" />
      </div>

      <Container size="md">
        {/* Back Link */}
        <Link
          href="/testimonials"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Testimonials
        </Link>

        {submitted ? (
          /* Success Screen */
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500/10 text-lime-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Thank You for Sharing!
            </h2>

            <p className="mt-3 text-slate-600 leading-relaxed max-w-md mx-auto">
              Your feedback has been received and sent for review. It will be published on our wall of love soon!
            </p>

            <Link href="/" className="inline-block mt-8">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                Return to Home
              </Button>
            </Link>
          </div>
        ) : (
          /* Review Form */
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs">
            <div className="text-center">
              <span className="rounded-full bg-lime-500/10 px-3.5 py-1 text-xs font-semibold text-lime-700">
                Community Feedback
              </span>
              <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Share Your Experience
              </h1>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Help future students and professionals by sharing your journey with GyaanByte.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-100 text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid: Name & Role */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Aman Sharma"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-slate-900">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    id="role"
                    required
                    placeholder="e.g. B.Tech CSE / Software Engineer"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Grid: Organization & LinkedIn */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-slate-900">
                    College / Company *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    required
                    placeholder="e.g. AKTU / HCL Technologies"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-semibold text-slate-900">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Review Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
                  Your Testimonial / Feedback *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your learning experience, project support, or career growth..."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm outline-none focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10 transition-all"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-slate-900 text-white hover:bg-slate-800"
              >
                <Send className="mr-2 h-4 w-4 text-lime-400" />
                Submit Testimonial
              </Button>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
}
