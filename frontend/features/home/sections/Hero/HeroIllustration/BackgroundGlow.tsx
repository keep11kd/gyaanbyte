import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  className?: string;
}

export default function BackgroundGlow({ className }: BackgroundGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none",
        className
      )}
    >
      {/* 1. Primary Lime Radial Ambient Glow */}
      <div className="absolute h-[300px] w-[300px] rounded-full bg-lime-500/20 blur-[100px] sm:h-[400px] sm:w-[400px]" />

      {/* 2. Secondary Sky Blue Ambient Glow (Top Left Offset) */}
      <div className="absolute -top-10 -left-10 h-[250px] w-[250px] rounded-full bg-sky-500/15 blur-[90px] sm:h-[350px] sm:w-[350px]" />

      {/* 3. Accent Orange Ambient Glow (Bottom Right Offset) */}
      <div className="absolute -bottom-10 -right-10 h-[250px] w-[250px] rounded-full bg-orange-500/15 blur-[90px] sm:h-[350px] sm:w-[350px]" />

      {/* 4. Fine Grid Overlay Texture for Tech Aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}
