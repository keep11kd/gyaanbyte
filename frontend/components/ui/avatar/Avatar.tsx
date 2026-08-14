"use client";

import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

import type { AvatarProps } from "./avatar.types";
import {
  avatarSizes,
  avatarStatusColors,
  getInitials,
} from "./avatar.utils";

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = "md",
      status,
      ring = false,
      className,
      containerClassName,
      onError,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // Reset error state if image source changes
    useEffect(() => {
      setImageError(false);
    }, [src]);

    const handleImageError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
      setImageError(true);
      onError?.(e);
    };

    const sizeConfig = avatarSizes[size] || avatarSizes.md;
    const fallbackText = fallback ?? getInitials(alt);

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 select-none items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700 border border-slate-200/80 overflow-hidden",
          sizeConfig.box,
          sizeConfig.text,
          ring && "ring-2 ring-lime-400 ring-offset-2 ring-offset-white",
          containerClassName
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={handleImageError}
            className={cn("h-full w-full object-cover rounded-full", className)}
            {...props}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium uppercase text-slate-600">
            {fallbackText}
          </span>
        )}

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 shrink-0",
              sizeConfig.status,
              avatarStatusColors[status]
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
