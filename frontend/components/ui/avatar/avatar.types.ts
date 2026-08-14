import type { ImgHTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size" | "src"> {
  /** Image source URL (supports string, null, or undefined) */
  src?: string | null;

  /** Alternative text for accessibility and automatic initials generation */
  alt: string;

  /** Custom fallback content (e.g. string initials or custom icon node) */
  fallback?: ReactNode;

  /** Size preset for container dimensions and font scale */
  size?: AvatarSize;

  /** Optional status indicator badge */
  status?: AvatarStatus;

  /** Shows an accent ring highlight border around the avatar */
  ring?: boolean;

  /** Class name for the outer wrapper element */
  containerClassName?: string;
}
