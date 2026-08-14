import type {
  AuthUser,
  User,
  UserRole,
} from "../types/auth.types";

/**
 * Maps a backend role to the frontend role representation.
 *
 * Backend:
 * STUDENT
 *
 * Frontend:
 * ROLE_STUDENT
 */
function mapBackendRoleToFrontend(
  role: AuthUser["role"]
): UserRole {
  const roleMap: Record<
    AuthUser["role"],
    UserRole
  > = {
    STUDENT: "ROLE_STUDENT",
    SALES: "ROLE_SALES",
    INSTRUCTOR: "ROLE_INSTRUCTOR",
    ADMIN: "ROLE_ADMIN",
  };

  return roleMap[role];
}

/**
 * Converts the backend authentication user
 * into the richer frontend User model.
 */
export function mapAuthUserToFrontendUser(
  authUser: AuthUser
): User {
  const fullName = authUser.name.trim();

  const nameParts = fullName
    ? fullName.split(/\s+/)
    : [];

  const firstName = nameParts[0] ?? "";

  const lastName =
    nameParts.slice(1).join(" ");

  return {
    id: authUser.id,
    email: authUser.email,

    firstName,
    lastName,
    fullName,

    status: authUser.emailVerified
      ? "ACTIVE"
      : "PENDING_VERIFICATION",

    roles: [
      mapBackendRoleToFrontend(
        authUser.role
      ),
    ],

    emailVerified:
      authUser.emailVerified,
  };
}
