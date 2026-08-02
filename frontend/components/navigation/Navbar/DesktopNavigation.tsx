"use client";

import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";
import NavigationItem from "./NavigationItem";

export default function DesktopNavigation() {
  const pathname = usePathname();

  const isActive = (href?: string) =>
    href ? pathname === href || pathname.startsWith(`${href}/`) : false;

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <NavigationItem
          key={item.title}
          item={item}
          active={isActive(item.href)}
        />
      ))}
    </nav>
  );
}
