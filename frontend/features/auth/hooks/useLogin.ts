"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import { authService } from "../services/auth.service";
import type {
  AuthSession,
  LoginFormValues,
} from "../types/auth.types";
import { saveAuthSession } from "../utils/auth-storage";
import { mapAuthUserToFrontendUser } from "../utils/auth-mapper"; // <-- Imported the mapper

interface UseLoginResult {
  login: (values: LoginFormValues) => Promise<AuthSession>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useLogin(): UseLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track mount status to prevent state updates on unmounted components
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const resetError = useCallback(() => {
    if (isMountedRef.current) {
      setError(null);
    }
  }, []);

  const login = useCallback(
    async (values: LoginFormValues): Promise<AuthSession> => {
      if (isLoading) {
        throw new Error("A login request is already in progress.");
      }

      if (isMountedRef.current) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await authService.login({
          email: values.email,
          password: values.password,
        });

        if (!response.success || !response.data) {
          throw new Error(
            response.message || "Login failed."
          );
        }

        // Map backend AuthUser to rich frontend User model safely
        const mappedUser = mapAuthUserToFrontendUser(response.data.user);

        const session: AuthSession = {
          user: mappedUser,
          accessToken: response.data.accessToken,
        };

        saveAuthSession(session, values.rememberMe);

        return session;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to login. Please try again.";

        if (isMountedRef.current) {
          setError(message);
        }

        throw err;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [isLoading]
  );

  return {
    login,
    isLoading,
    error,
    resetError,
  };
}
