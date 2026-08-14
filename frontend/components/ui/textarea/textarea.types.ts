import type { ReactNode, TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Label for the textarea field */
  label?: ReactNode;

  /** Helper text or description rendered below the textarea */
  helperText?: ReactNode;

  /** Error state or error message string */
  error?: boolean | string;

  /** Size preset for padding and font scale */
  size?: TextareaSize;

  /** Controls CSS resize handle behavior */
  resize?: TextareaResize;

  /** Stretches the container to 100% width */
  fullWidth?: boolean;

  /** Class name for the outer container wrapper */
  containerClassName?: string;

  /** Class name for the label element */
  labelClassName?: string;
}
