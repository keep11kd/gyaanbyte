import { Sparkles } from "lucide-react";

import { heroContent } from "../../data/home.data";

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-4 py-2">
      <Sparkles className="size-4 text-lime-600" />

      <span className="text-sm font-medium text-lime-700">
        {heroContent.badge.text}
      </span>
    </div>
  );
}
