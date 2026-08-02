"use client";

import { Button } from "@/components/primitives/Button";
import MobileNavigation from "./MobileNavigation";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Desktop CTA */}
      <div className="hidden lg:block">
        <Button>
          Book Consultation
        </Button>
      </div>

      {/* Mobile Menu */}
      <MobileNavigation />
    </div>
  );
}
