import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "elevated" | "outline" | "ghost";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card body content */
  children: ReactNode;

  /** Visual variant style of the card */
  variant?: CardVariant;

  /** Adds smooth scale and border highlight on hover */
  hoverable?: boolean;
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section content */
  children: ReactNode;
}
