"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordSection from "./sections/ResetPasswordSection";
import type { ResetPasswordFormValues } from "./types";

export default function ResetPasswordPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Page View State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Password Reset Submission Handler
   */
  const handleResetPasswordSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    if (!token) {
      setServerError("Invalid or missing password reset token. Please request a new password reset link.");
      setIsLoading(false);
      return;
    }

    try {
      // Execute password reset API call (e.g., authService.resetPassword({ token, ...values }))
      // Example simulated API delay:
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccessMessage("Your password has been successfully reset! Redirecting to login...");

      // Redirect user to login page after success confirmation display
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 2000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to reset password. The link may have expired or is invalid.";

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordSection
      onSubmit={handleResetPasswordSubmit}
      isLoading={isLoading}
      serverError={serverError}
      successMessage={successMessage}
      hasValidToken={Boolean(token)}
    />
  );
}
