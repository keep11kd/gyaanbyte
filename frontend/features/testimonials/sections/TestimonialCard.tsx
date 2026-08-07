"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Testimonial } from "../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

// Inline SVG component for LinkedIn to avoid icon package export mismatches
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const {
    name,
    role,
    organization,
    avatar,
    rating,
    message,
    linkedin,
    verified,
    category,
  } = testimonial;

  const [imageError, setImageError] = useState(false);

  // Extract initials for fallback avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[340px] flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-lime-400/60 hover:shadow-[0_20px_50px_rgba(132,204,22,0.12)]",
        className
      )}
    >
      <div>
        {/* Top Header: Star Ratings + Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                  index < rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {category && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {category}
              </span>
            )}
            <Quote className="h-8 w-8 text-slate-200 transition-colors duration-300 group-hover:text-lime-400/80" />
          </div>
        </div>

        {/* Review Message */}
        <blockquote className="mt-5">
          <p className="text-[15px] leading-relaxed font-normal text-slate-600 italic">
            &ldquo;{message}&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Footer Section */}
      <div>
        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Author Details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar image with fallback */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-2 ring-slate-100 transition-all duration-300 group-hover:ring-lime-400">
              {!imageError && avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-xs font-bold text-slate-600">
                  {initials}
                </span>
              )}
            </div>

            {/* Name, Role & Organization */}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 leading-snug">
                  {name}
                </h3>
                {verified && (
                  <CheckCircle2
                    aria-label="Verified Student/Reviewer"
                    className="h-4 w-4 text-lime-600 shrink-0"
                  />
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium">
                {role}
              </p>

              <p className="text-xs font-semibold text-lime-700">
                {organization}
              </p>
            </div>
          </div>

          {/* LinkedIn Profile Link */}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}'s LinkedIn Profile`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
