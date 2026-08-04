import { cn } from "@/lib/utils";
import { heroContent } from "../../data/home.data";

interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className }: HeroContentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Hero Heading */}
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15] lg:text-6xl">
        {heroContent.heading.line1}{" "}
        <span className="block">{heroContent.heading.line2}</span>
        <span className="bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          {heroContent.heading.highlight}
        </span>
      </h1>

      {/* Hero Description */}
      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
        {heroContent.description}
      </p>
    </div>
  );
}
