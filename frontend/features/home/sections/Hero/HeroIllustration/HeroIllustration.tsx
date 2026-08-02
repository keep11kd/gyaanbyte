import {
  Bot,
  Code2,
  Globe,
} from "lucide-react";

import FloatingCard from "@/components/design/FloatingCard";

import LaptopMockup from "./LaptopMockup";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto hidden w-full max-w-2xl lg:block">
      <LaptopMockup />

      <FloatingCard
        icon={<Globe size={20} />}
        title="Web Development"
        description="Modern Business Websites"
        className="-left-10 top-10 w-52"
      />

      <FloatingCard
        icon={<Code2 size={20} />}
        title="Software Solutions"
        description="Enterprise Applications"
        className="-right-8 top-32 w-56"
      />

      <FloatingCard
        icon={<Bot size={20} />}
        title="AI Solutions"
        description="Automation & Chatbots"
        className="bottom-8 left-10 w-52"
      />
    </div>
  );
}
