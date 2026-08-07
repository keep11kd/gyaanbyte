import type { Metadata } from "next";
import TestimonialsPageView from "@/features/testimonials/TestimonialsPageView";

export const metadata: Metadata = {
  title: "Testimonials & Success Stories | GyaanByte",
  description:
    "Read real success stories and testimonials from students and professionals who built their careers with GyaanByte.",
};

export default function TestimonialsPage() {
  return <TestimonialsPageView />;
}
