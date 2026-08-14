"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  studentDashboardService,
} from "../services/student-dashboard.service";

import type {
  StudentDashboardData,
} from "@/features/dashboard/types/student-dashboard.types";

interface UseStudentDashboardResult {
  data: StudentDashboardData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useStudentDashboard(): UseStudentDashboardResult {
  const [data, setData] =
    useState<StudentDashboardData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Refresh dashboard data manually.
   *
   * Used when the user explicitly requests
   * a refresh after the initial load.
   */
  const refresh = useCallback(
    async (): Promise<void> => {
      if (isMountedRef.current) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response =
          await studentDashboardService.getDashboard();

        if (
          !response.success ||
          !response.data
        ) {
          throw new Error(
            response.message ||
              "Unable to load student dashboard."
          );
        }

        if (isMountedRef.current) {
          setData(response.data);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load student dashboard.";

        if (isMountedRef.current) {
          setError(message);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  /**
   * Initial dashboard load.
   *
   * We intentionally don't call refresh() here because
   * refresh() performs synchronous setState calls.
   * isLoading is already true for the initial request.
   */
  useEffect(() => {
    let cancelled = false;

    const loadInitialDashboard = async () => {
      try {
        const response =
          await studentDashboardService.getDashboard();

        if (
          !response.success ||
          !response.data
        ) {
          throw new Error(
            response.message ||
              "Unable to load student dashboard."
          );
        }

        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load student dashboard.";

        if (!cancelled) {
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
}
