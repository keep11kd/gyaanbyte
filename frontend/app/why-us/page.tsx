// app/why-us/page.tsx
import type { Metadata } from "next";
import { WhyUsPageView } from "@/features/why-us";

export const metadata: Metadata = {
  title: "Why Choose Us | GyaanByte",
  description:
    "Discover why GyaanByte is the trusted platform for hands-on industrial training, IEEE project implementations, and 1-on-1 viva preparation.",
};

export default function WhyUsPage() {
  return <WhyUsPageView />;
}
