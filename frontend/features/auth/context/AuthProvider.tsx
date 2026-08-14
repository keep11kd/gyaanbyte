"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";


import type {
  AuthSession,
  User,
  UserRole,
} from "../types/auth.types";

import {
  getAuthSessionSnapshot,
  removeAuthSession,
  updateAuthSession,
  onAuthChange,
} from "../utils/auth-storage";

import { authService } from "../services/auth.service";
import { ApiError } from "@/lib/api";
import { mapAuthUserToFrontendUser } from "../utils/auth-mapper";

interface AuthContextValue {
  user: User | null;
  session: AuthSession | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  logout: () => void;

  refreshUser: () => Promise<void>;

  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Subscribe to authentication storage changes.
 */
function subscribe(
  callback: () => void
): () => void {
  return onAuthChange(callback);
}

/**
 * Client-side authentication snapshot.
 */
function getClientSnapshot(): AuthSession | null {
  return getAuthSessionSnapshot();
}

/**
 * Server-side authentication snapshot.
 *
 * Browser storage does not exist during SSR.
 */
function getServerSnapshot(): AuthSession | null {
  return null;
}

export function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  const session = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  /**
   * Logout the current user.
   */
  const logout = useCallback(() => {
    removeAuthSession();
  }, []);

  /**
   * Re-fetch the authenticated user's profile
   * from the backend using the current JWT.
   */
  const refreshUser = useCallback(
    async (): Promise<void> => {
      const currentSession =
        getAuthSessionSnapshot();

      if (!currentSession?.accessToken) {
        return;
      }

      try {
        const response =
  await authService.getCurrentUser();

        if (
          !response.success ||
          !response.data
        ) {
          throw new Error(
            response.message ||
              "Unable to retrieve current user."
          );
        }

        /**
         * Convert backend AuthUser
         * into the frontend User model.
         */
        const updatedUser =
          mapAuthUserToFrontendUser(
            response.data
          );

        const updatedSession: AuthSession = {
          ...currentSession,
          user: updatedUser,
        };

        /**
         * Preserve the existing storage
         * choice (localStorage/sessionStorage).
         */
        updateAuthSession(
          updatedSession
        );
      } catch (error) {
        /**
         * Only remove the local session when
         * the backend explicitly rejects the JWT.
         */
        if (
          error instanceof ApiError &&
          error.status === 401
        ) {
          logout();
        }

        throw error;
      }
    },
    [logout]
  );

  /**
   * Verify the stored JWT once when the
   * authentication provider starts.
   */
  useEffect(() => {
    const storedSession =
      getAuthSessionSnapshot();

    if (!storedSession?.accessToken) {
      return;
    }

    void refreshUser().catch(() => {
      /*
       * refreshUser() handles 401 by
       * clearing the authentication session.
       */
    });
  }, [refreshUser]);

  /**
   * Check whether the current user has
   * a specific role.
   */
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return (
        session?.user.roles.includes(role) ??
        false
      );
    },
    [session]
  );

  /**
   * Check whether the current user has
   * at least one of the specified roles.
   */
  const hasAnyRole = useCallback(
    (roles: UserRole[]): boolean => {
      return (
        session?.user.roles.some(
          (role) => roles.includes(role)
        ) ?? false
      );
    },
    [session]
  );

  /**
   * Authentication state is available synchronously
   * through useSyncExternalStore.
   */
  const isLoading = false;

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,

      session,

      accessToken:
        session?.accessToken ?? null,

      isAuthenticated:
        session !== null,

      isLoading,

      logout,

      refreshUser,

      hasRole,

      hasAnyRole,
    }),
    [
      session,
      isLoading,
      logout,
      refreshUser,
      hasRole,
      hasAnyRole,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
