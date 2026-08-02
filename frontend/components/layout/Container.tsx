import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ContainerSize = "md" | "lg" | "xl";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  fluid?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Container({
  children,
  className,
  size = "xl",
  fluid = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        !fluid && sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
