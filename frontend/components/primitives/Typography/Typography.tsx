import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption";

interface TypographyProps {
  as?: ElementType;
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
}

const variants = {
  h1: "text-5xl font-bold tracking-tight text-slate-900",
  h2: "text-4xl font-bold tracking-tight text-slate-900",
  h3: "text-2xl font-semibold text-slate-900",
  body: "text-base leading-7 text-slate-600",
  caption: "text-sm text-slate-500",
};

export default function Typography({
  as,
  variant = "body",
  className,
  children,
}: TypographyProps) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn(
        variants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
