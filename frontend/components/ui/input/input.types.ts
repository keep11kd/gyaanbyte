import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size preset for padding, font-size, and icon dimensions */
  size?: InputSize;

  /** Optional label rendered above the input field */
  label?: ReactNode;

  /** Helper text displayed below the input field when there is no error */
  helperText?: ReactNode;

  /** Error message string or boolean flag indicating invalid state */
  error?: string | boolean;

  /** Icon element rendered inside the left side of the input */
  leftIcon?: ReactNode;

  /** Icon element rendered inside the right side of the input */
  rightIcon?: ReactNode;

  /** Stretches the input container to occupy full parent width */
  fullWidth?: boolean;

  /** Additional CSS class names for the outer wrapper container */
  containerClassName?: string;

  /** Additional CSS class names for the label element */
  labelClassName?: string;
}
