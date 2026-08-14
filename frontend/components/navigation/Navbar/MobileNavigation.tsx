"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui";
import { navigation } from "@/constants/navigation";

export default function MobileNavigation() {
  // Track open state for accordion sections by title
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sheet>
      <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-colors">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open navigation menu</span>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 p-6 overflow-y-auto">
        <nav className="mt-8 flex flex-col gap-3">
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openSections[item.title] || false;

            return (
              <div key={item.title} className="flex flex-col">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-semibold text-slate-800 transition-colors hover:text-indigo-600"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSection(item.title)}
                      className="flex items-center justify-between py-2 text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors w-full text-left"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>

                    {hasChildren && isOpen && (
                      <div className="ml-4 flex flex-col gap-2 border-l-2 border-indigo-100 pl-3 py-1.5 animate-fadeIn">
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}

          <Button size="md" className="mt-6 w-full font-semibold">
            Book Consultation
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
