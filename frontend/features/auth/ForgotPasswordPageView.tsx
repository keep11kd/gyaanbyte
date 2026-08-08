"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ForgotPasswordSection from "./sections/ForgotPasswordSection";
import type { ForgotPasswordFormValues } from "./types";

export default function ForgotPasswordPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Page View State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Password Reset Request Handler
   */
  const handleForgotPasswordSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      // Execute password reset dispatch API call (e.g. authService.requestPasswordReset(values))
      // Example simulated delay:
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccessMessage(
        "If an account exists with that email address, we have sent a password reset link to your inbox."
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to process password reset request. Please check your connection and try again.";

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordSection
      onSubmit={handleForgotPasswordSubmit}
      isLoading={isLoading}
      serverError={serverError}
      successMessage={successMessage}
    />
  );
}
