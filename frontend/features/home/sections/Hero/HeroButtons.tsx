import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { heroContent } from "../../data/home.data";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Link href={heroContent.actions.primary.href}>
        <Button size="lg">
          {heroContent.actions.primary.label}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      <Link href={heroContent.actions.secondary.href}>
        <Button variant="outline" size="lg">
          {heroContent.actions.secondary.label}
        </Button>
      </Link>
    </div>
  );
}
