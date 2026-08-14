import { buttonBase, buttonSizes, buttonVariants } from "./button.styles";
import type { ButtonSize, ButtonVariant } from "./button.types";

export { buttonBase, buttonSizes, buttonVariants };

interface GetButtonClassesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Utility helper function to compose light-theme Tailwind CSS classes for the Button component.
 */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: GetButtonClassesOptions = {}): string {
  const base = buttonBase;
  const variantClass = buttonVariants[variant] ?? buttonVariants.primary;
  const sizeClass = buttonSizes[size] ?? buttonSizes.md;
  const widthClass = fullWidth ? "w-full" : "";

  return [base, variantClass, sizeClass, widthClass, className]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
