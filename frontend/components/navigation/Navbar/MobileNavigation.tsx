"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/primitives/Button";
import { navigation } from "@/constants/navigation";

export default function MobileNavigation() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger
  render={
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Open navigation menu"
    />
  }
>
  <Menu className="size-5" />
</SheetTrigger>

        <SheetContent side="right" className="w-80">
          <nav className="mt-10 flex flex-col gap-4">
            {navigation.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium text-slate-700 hover:text-lime-600"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <div className="mb-2 flex items-center justify-between py-2 font-medium text-slate-700">
                      {item.title}
                      <ChevronDown className="size-4" />
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="py-1 text-sm text-slate-600 hover:text-lime-600"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            <Button className="mt-6">
              Book Consultation
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
