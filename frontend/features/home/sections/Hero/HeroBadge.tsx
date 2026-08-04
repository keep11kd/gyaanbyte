import { Sparkles } from "lucide-react";
import { heroContent } from "../../data/home.data";

export default function HeroBadge() {
  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-4 py-2 text-sm font-medium text-lime-700">
      <Sparkles className="h-4 w-4" />
      {heroContent.badge.text}
    </div>
  );
}
