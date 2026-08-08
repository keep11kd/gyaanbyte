"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyEmailSection from "./sections/VerifyEmailSection";

export default function VerifyEmailPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email") ?? "";

  // Ref to ensure token verification runs only once
  const hasVerifiedRef = useRef(false);

  // Page View States
  const [isVerifying, setIsVerifying] = useState<boolean>(Boolean(token));
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Automatic Email Verification execution when token parameter exists
   */
  useEffect(() => {
    if (!token || hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    let isMounted = true;

    const verifyToken = async () => {
      try {
        // Execute API verification call (e.g., authService.verifyEmail({ token }))
        // Simulated API latency:
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (!isMounted) return;

        setIsVerified(true);
        setSuccessMessage("Email address successfully verified! Redirecting to login...");

        // Automatically redirect to login page with query feedback
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 2500);
      } catch (error: unknown) {
        if (!isMounted) return;

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Verification failed. The token may be invalid or expired.";

        setServerError(errorMessage);
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  /**
   * Resend Verification Link Handler
   */
  const handleResendVerification = async (targetEmail?: string) => {
    const emailToUse = targetEmail || emailParam;

    if (!emailToUse) {
      setServerError("Please enter a valid email address to resend the verification link.");
      return;
    }

    setIsResending(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      // Execute API resend call (e.g., authService.resendVerification({ email: emailToUse }))
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccessMessage(
        `A new verification link has been dispatched to ${emailToUse}. Please check your inbox.`
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to resend verification email. Please try again in a few moments.";

      setServerError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <VerifyEmailSection
      email={emailParam}
      token={token}
      isVerifying={isVerifying}
      isResending={isResending}
      isVerified={isVerified}
      serverError={serverError}
      successMessage={successMessage}
      onResend={handleResendVerification}
    />
  );
}
