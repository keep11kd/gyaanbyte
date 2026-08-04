import Container from "@/components/layout/Container";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroStatistics from "./HeroStatistics";
import HeroIllustration from "./HeroIllustration/HeroIllustration";
import HeroTechStack from "./HeroTechStack";

export default function Hero() {
  return (
    // Changed overflow-hidden to overflow-x-clip to prevent horizontal scrollbars while keeping cards visible
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-x-clip py-12 lg:py-16">
      <Container size="xl">
        {/* Reduced grid gap from gap-24 to gap-8 lg:gap-12 to give space for floating cards */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Left Column (5 Cols) */}
          <div className="flex flex-col space-y-6 lg:col-span-5">
            <HeroBadge />
            <HeroContent />
            <HeroButtons />
            <HeroTechStack />
            <HeroStatistics />
          </div>

          {/* Right Column Illustration (7 Cols) */}
          <div className="relative flex justify-center lg:col-span-7 lg:justify-end">
            <HeroIllustration />
          </div>

        </div>
      </Container>
    </section>
  );
}
