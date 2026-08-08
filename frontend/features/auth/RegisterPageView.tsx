"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterSection from "./sections/RegisterSection";
import type { RegisterFormValues, SocialProviderId } from "./types";

export default function RegisterPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract dynamic redirect URL if present (defaults to dashboard)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // Page View State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProviderId, setLoadingProviderId] = useState<SocialProviderId | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  /**
   * Account Registration Submission Handler
   */
  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Execute registration API call (e.g. authService.register(values))
      // Example simulated delay:
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Redirect user upon successful account creation
      router.push(callbackUrl);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create account. An account with this email may already exist.";

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * OAuth Social Authentication Handler
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
    <RegisterSection
      onRegisterSubmit={handleRegisterSubmit}
      onSocialLogin={handleSocialLogin}
      isLoading={isLoading}
      loadingProviderId={loadingProviderId}
      serverError={serverError}
    />
  );
}
