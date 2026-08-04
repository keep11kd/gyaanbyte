import { cn } from "@/lib/utils";
import { heroContent } from "../../data/home.data";

interface HeroStatisticsProps {
  className?: string;
}

export default function HeroStatistics({ className }: HeroStatisticsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-200/80 pt-6 sm:grid-cols-3",
        className
      )}
    >
      {heroContent.statistics.map((item) => (
        <div key={item.label} className="space-y-0.5">
          {/* Stat Value */}
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            <span className="text-lime-600">{item.value}</span>
          </h3>

          {/* Stat Label */}
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
