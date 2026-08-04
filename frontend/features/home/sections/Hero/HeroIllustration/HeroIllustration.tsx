import { Bot, Code2, Globe, GraduationCap } from "lucide-react";

import FloatingCard from "@/components/design/FloatingCard";
import LaptopMockup from "./LaptopMockup";
import BackgroundGlow from "./BackgroundGlow";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto hidden w-full max-w-xl py-6 lg:block">
      {/* Background Soft Glow & Subtle Grid */}
      <BackgroundGlow />
      {/* Central Laptop Container */}
      <div className="relative z-10 w-full">
        <LaptopMockup />
      </div>

      {/* Floating Card 1: Top Left */}
      <FloatingCard
        icon={<Globe size={18} />}
        title="Website Development"
        description="Business, Portfolio & E-Commerce Websites"
        tags={["Next.js", "SEO", "Responsive"]}
        accent="lime"
        className="-left-12 top-2 z-20"
      />

      {/* Floating Card 2: Top Right */}
      <FloatingCard
        icon={<Code2 size={18} />}
        title="Software Solutions"
        description="ERP, CRM & Enterprise Applications"
        tags={["Java", "Spring", "REST"]}
        accent="orange"
        className="-right-8 top-12 z-20"
      />

      {/* Floating Card 3: Bottom Left */}
      <FloatingCard
        icon={<Bot size={18} />}
        title="AI Solutions"
        description="Chatbots, Agents & Automation"
        tags={["OpenAI", "RAG", "Agents"]}
        accent="sky"
        className="-left-8 bottom-6 z-20"
      />

      {/* Floating Card 4: Bottom Right */}
      <FloatingCard
        icon={<GraduationCap size={18} />}
        title="Industry Training"
        description="Java, Python & AI Certification"
        tags={["Live Projects", "Certificate"]}
        accent="purple"
        className="-right-4 -bottom-4 z-20"
      />
    </div>
  );
}
