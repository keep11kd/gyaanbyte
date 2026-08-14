import type { SVGAttributes } from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type SpinnerVariant =
  | "primary"
  | "secondary"
  | "white"
  | "slate"
  | "current";

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  /** Size preset for the spinner dimensions */
  size?: SpinnerSize;

  /** Color variant for the animated spinner */
  variant?: SpinnerVariant;

  /** Accessible label for screen readers (defaults to "Loading...") */
  label?: string;
}
