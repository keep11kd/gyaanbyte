import type { AvatarSize, AvatarStatus } from "./avatar.types";

export const avatarSizes: Record<
  AvatarSize,
  { box: string; text: string; status: string }
> = {
  xs: { box: "h-6 w-6", text: "text-[10px]", status: "h-1.5 w-1.5" },
  sm: { box: "h-8 w-8", text: "text-xs", status: "h-2 w-2" },
  md: { box: "h-10 w-10", text: "text-sm", status: "h-2.5 w-2.5" },
  lg: { box: "h-12 w-12", text: "text-base", status: "h-3 w-3" },
  xl: { box: "h-16 w-16", text: "text-lg", status: "h-4 w-4" },
};

export const avatarStatusColors: Record<AvatarStatus, string> = {
  online: "bg-emerald-500 ring-white",
  offline: "bg-slate-400 ring-white",
  busy: "bg-red-500 ring-white",
  away: "bg-amber-500 ring-white",
};

/**
 * Extracts up to 2 uppercase initials from a full name or alt string.
 */
export function getInitials(name: string): string {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
