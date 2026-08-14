import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "subtle";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon" | "icon-sm";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant style of the button */
  variant?: ButtonVariant;

  /** Size preset for padding, font-size, and icon dimensions */
  size?: ButtonSize;

  /** Displays a loading spinner and disables user interaction */
  loading?: boolean;

  /** Optional text override displayed while in loading state */
  loadingText?: string;

  /** Icon element rendered before button children */
  leftIcon?: ReactNode;

  /** Icon element rendered after button children */
  rightIcon?: ReactNode;

  /** Stretches the button to occupy full parent width */
  fullWidth?: boolean;

  /** Button contents */
  children?: ReactNode;
}
