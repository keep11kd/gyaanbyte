import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";
import ServicesCTA from "./ServicesCTA";

interface ServicesProps {
  className?: string;
}

export default function Services({ className }: ServicesProps) {
  return (
    <section
      id="services"
      className={cn(
        "relative overflow-hidden bg-slate-50/50 py-20 lg:py-28 border-y border-slate-200/60",
        className
      )}
    >
      {/* Background Decorative Tech Glow & Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none overflow-hidden"
      >
        {/* Subtle Lime Ambient Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-lime-500/10 blur-[120px]" />

        {/* Subtle Sky Blue Ambient Light */}
        <div className="absolute -bottom-24 right-10 h-[300px] w-[400px] rounded-full bg-sky-500/10 blur-[100px]" />

        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Container size="xl">
        {/* Header Section */}
        <ServicesHeader />

        {/* Services & Training Grid Container */}
        <div className="mt-12 sm:mt-16">
          <ServicesGrid />
        </div>
        <ServicesCTA />
      </Container>
    </section>
  );
}
