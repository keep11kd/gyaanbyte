"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginSection from "./sections/LoginSection";
import type { LoginFormValues, SocialProviderId } from "./types";

export default function LoginPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract dynamic redirect URL if present (defaults to dashboard)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // Page View State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProviderId, setLoadingProviderId] = useState<SocialProviderId | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  /**
   * Primary Password Login Handler
   */
  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Execute authentication service call (e.g. authService.login(values))
      // Example simulated delay:
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Redirect user upon success
      router.push(callbackUrl);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Invalid email or password. Please verify your credentials.";

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * OAuth Social Login Handler
   */
  const handleSocialLogin = async (providerId: SocialProviderId) => {
    setLoadingProviderId(providerId);
    setServerError(null);

    try {
      // Execute provider OAuth redirect (e.g. signIn(providerId, { callbackUrl }))
      // Example simulated delay:
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to authenticate with ${providerId}. Please try again.`;

      setServerError(errorMessage);
      setLoadingProviderId(null);
    }
  };

  return (
    <LoginSection
      onLoginSubmit={handleLoginSubmit}
      onSocialLogin={handleSocialLogin}
      isLoading={isLoading}
      loadingProviderId={loadingProviderId}
      serverError={serverError}
    />
  );
}
