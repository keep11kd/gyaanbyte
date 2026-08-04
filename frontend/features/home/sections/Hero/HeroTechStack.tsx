import { cn } from "@/lib/utils";
import { heroContent } from "../../data/home.data";
import TechBadge from "./HeroIllustration/TechBadge";

interface HeroTechStackProps {
  className?: string;
}

export default function HeroTechStack({ className }: HeroTechStackProps) {
  return (
    <div className={cn("space-y-3 pt-2", className)}>
      {/* Label Header */}
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Technologies We Work With
      </p>

      {/* Badges Container */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {heroContent.technologies.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </div>
  );
}
