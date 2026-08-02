import Container from "@/components/layout/Container";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroStatistics from "./HeroStatistics";
import HeroIllustration from "./HeroIllustration/HeroIllustration";
import HeroTechStack from "./HeroTechStack";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
      <Container>
        <div className="grid items-center gap-24 lg:grid-cols-2">
          <div>
            <HeroBadge />

            <HeroContent />

            <HeroButtons />

            <HeroTechStack />
            <HeroStatistics />
          </div>

          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}
