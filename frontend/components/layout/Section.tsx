import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionBackground =
  | "white"
  | "gray"
  | "primary";

type SectionSpacing =
  | "sm"
  | "md"
  | "lg";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
}

const backgroundClasses: Record<SectionBackground, string> = {
  white: "bg-white",
  gray: "bg-slate-50",
  primary: "bg-lime-50",
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-16",
  md: "py-24",
  lg: "py-32",
};

export default function Section({
  children,
  className,
  background = "white",
  spacing = "md",
}: SectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
