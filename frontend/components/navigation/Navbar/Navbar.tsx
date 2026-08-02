"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import DesktopNavigation from "./DesktopNavigation";
import Logo from "./Logo";
import NavbarActions from "./NavbarActions";

const NAVBAR_SCROLL_THRESHOLD = 10;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-md"
          : "border-b border-transparent bg-white"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <DesktopNavigation />

          <NavbarActions />
        </div>
      </Container>
    </header>
  );
}
