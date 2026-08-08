"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { socialLoginProviders } from "../data";
import type { SocialLoginProvider, SocialProviderId } from "../types";

export interface SocialLoginButtonsProps {
  /** Optional override for active social providers list */
  providers?: SocialLoginProvider[];
  /** Callback fired when a social login provider button is clicked */
  onSelectProvider?: (providerId: SocialProviderId) => void;
  /** Active provider ID currently processing authentication */
  loadingProviderId?: SocialProviderId | null;
  /** Global loading state */
  isLoading?: boolean;
  /** Global disabled state */
  disabled?: boolean;
  /** Layout style: grid (2 columns), flex (horizontal), or stack (vertical) */
  layout?: "grid" | "flex" | "stack";
  /** Custom wrapper container classes */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                            BRAND SVG COMPONENTS                            */
/* -------------------------------------------------------------------------- */

function GoogleIcon({ className = "h-4.5 w-4.5" }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
      />
    </svg>
  );
}

function GithubIcon({ className = "h-4.5 w-4.5" }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function MicrosoftIcon({ className = "h-4.5 w-4.5" }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4.5 w-4.5" }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const providerIcons: Record<SocialProviderId, React.ReactNode> = {
  google: <GoogleIcon />,
  github: <GithubIcon />,
  microsoft: <MicrosoftIcon />,
  linkedin: <LinkedInIcon className="text-[#0A66C2]" />,
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function SocialLoginButtons({
  providers = socialLoginProviders as SocialLoginProvider[],
  onSelectProvider,
  loadingProviderId,
  isLoading = false,
  disabled = false,
  layout = "grid",
  className = "",
}: Readonly<SocialLoginButtonsProps>) {
  const [isPending, startTransition] = useTransition();

  const enabledProviders = providers.filter((p) => p.enabled !== false);

  const handleProviderClick = (providerId: SocialProviderId) => {
    if (disabled || isLoading || isPending) return;

    startTransition(() => {
      onSelectProvider?.(providerId);
    });
  };

  const layoutClasses = {
    grid: "grid grid-cols-2 gap-3",
    flex: "flex flex-wrap items-center gap-3",
    stack: "flex flex-col gap-3",
  }[layout];

  return (
    <div className={`${layoutClasses} ${className}`.trim()}>
      {enabledProviders.map((provider) => {
        const isThisLoading =
          loadingProviderId === provider.id || (isPending && loadingProviderId === provider.id);
        const isDisabled = disabled || isLoading || isPending;

        return (
          <button
            key={provider.id}
            type="button"
            disabled={isDisabled}
            onClick={() => handleProviderClick(provider.id)}
            aria-label={`Sign in with ${provider.name}`}
            className="
              group relative inline-flex h-11 items-center justify-center gap-2.5 rounded-xl
              border border-slate-800 bg-slate-900/80 px-4 text-sm font-semibold text-slate-200
              shadow-sm backdrop-blur-md transition-all duration-200
              hover:border-slate-700 hover:bg-slate-800 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:ring-offset-2 focus:ring-offset-slate-950
              active:scale-[0.98]
              disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
            "
          >
            {isThisLoading ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin text-lime-400" />
            ) : (
              <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                {providerIcons[provider.id]}
              </span>
            )}

            <span className="truncate">{provider.name}</span>
          </button>
        );
      })}
    </div>
  );
}
