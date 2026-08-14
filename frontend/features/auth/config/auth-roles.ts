import type { UserRole } from "../types/auth.types";

export const USER_ROLES = {
  STUDENT: "ROLE_STUDENT",
  SALES: "ROLE_SALES",
  INSTRUCTOR: "ROLE_INSTRUCTOR",
  ADMIN: "ROLE_ADMIN",
} as const satisfies Record<string, UserRole>;
