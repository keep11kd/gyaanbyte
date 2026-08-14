"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useEffect } from "react";

import LoginSection from "./sections/LoginSection";
import { useLogin } from "./hooks/useLogin";
import { useAuth } from "./hooks/useAuth";

import type {
  LoginFormValues,
  SocialProviderId,
} from "./types";

/**
 * Validates the callback URL to prevent open redirect vulnerabilities.
 *
 * Only internal relative paths are allowed.
 */
function getSafeCallbackUrl(
  paramUrl: string | null
): string {
  if (!paramUrl) {
    return "/dashboard";
  }

  if (
    paramUrl.startsWith("/") &&
    !paramUrl.startsWith("//")
  ) {
    return paramUrl;
  }

  return "/dashboard";
}

export default function LoginPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
const {
  isAuthenticated,
  isLoading: authLoading,
} = useAuth();

  const callbackUrl = getSafeCallbackUrl(
    searchParams.get("callbackUrl")
  );

  useEffect(() => {
  if (authLoading) {
    return;
  }

  if (isAuthenticated) {
    router.replace(callbackUrl);
  }
}, [
  authLoading,
  isAuthenticated,
  callbackUrl,
  router,
]);

  const {
    login,
    isLoading,
    error: serverError,
    resetError,
  } = useLogin();

  /**
   * Primary password login.
   */
  const handleLoginSubmit = async (
    values: LoginFormValues
  ) => {
    resetError();

    try {
      await login(values);

      // Refresh the Next.js router state.
      router.refresh();

      // Redirect after successful authentication.
      router.push(callbackUrl);
    } catch {
      // useLogin() already manages the error state.
    }
  };

  /**
   * Social login.
   *
   * OAuth integration will be implemented later.
   */
  const handleSocialLogin = (
    providerId: SocialProviderId
  ) => {
    console.log(
      `Social login requested: ${providerId}`
    );
  };

  return (
    <LoginSection
      onLoginSubmit={handleLoginSubmit}
      onSocialLogin={handleSocialLogin}
      isLoading={isLoading}
      serverError={serverError}
    />
  );
}
