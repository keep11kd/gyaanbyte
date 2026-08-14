import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional title heading for the alert message */
  title?: ReactNode;

  /** Alert content or description body */
  children?: ReactNode;

  /** Color scheme and visual theme variant */
  variant?: AlertVariant;

  /**
   * Custom icon element, or boolean `true`/`false` to toggle the default variant icon.
   * @default true
   */
  icon?: ReactNode | boolean;

  /** Callback triggered when the dismiss close button is clicked */
  onClose?: () => void;

  /** Optional action slot (e.g., a button or link) rendered on the right side */
  action?: ReactNode;
}
