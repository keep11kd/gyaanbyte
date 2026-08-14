import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Array of options to render automatically */
  options?: SelectOption[];

  /** Placeholder text rendered as a disabled default selection option */
  placeholder?: string;

  /** Label for the select field */
  label?: ReactNode;

  /** Helper text or description rendered below the select field */
  helperText?: ReactNode;

  /** Error state or error message string */
  error?: boolean | string;

  /** Size preset for padding and height scale */
  size?: SelectSize;

  /** Stretches the container to 100% width */
  fullWidth?: boolean;

  /** Class name for the outer container wrapper */
  containerClassName?: string;

  /** Class name for the label element */
  labelClassName?: string;
}
