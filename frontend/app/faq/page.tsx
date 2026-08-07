import type { Metadata } from "next";
import { FAQPageView } from "@/features/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | GyaanByte",
  description:
    "Find answers to common questions about GyaanByte's training programs, academic projects, IEEE papers, and technical guidance.",
};

export default function FAQPage() {
  return <FAQPageView />;
}
