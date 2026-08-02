import { heroContent } from "../../data/home.data";
import TechBadge from "./HeroIllustration/TechBadge";

export default function HeroTechStack() {
  return (
    <div className="mt-12">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Technologies We Work With
      </p>

      <div className="flex flex-wrap gap-3">
        {heroContent.technologies.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </div>
  );
}
