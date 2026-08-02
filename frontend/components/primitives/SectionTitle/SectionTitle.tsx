import { cn } from "@/lib/utils";
import { Typography } from "@/components/primitives/Typography";

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-flex rounded-full bg-lime-100 px-4 py-1 text-sm font-medium text-lime-700">
          {badge}
        </span>
      )}

      <Typography
        as="h2"
        variant="h2"
        className="mb-4"
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body"
          className="mx-auto max-w-2xl"
        >
          {description}
        </Typography>
      )}
    </div>
  );
}
