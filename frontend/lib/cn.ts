import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with clsx and merges conflicting Tailwind CSS classes with tailwind-merge.
 *
 * @param inputs - Array of ClassValue items (strings, objects, arrays, expressions)
 * @returns Merged Tailwind CSS class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
