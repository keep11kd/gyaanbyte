import type { AuthSession, User } from "../types/auth.types";

const AUTH_SESSION_KEY = "gyaanbyte_auth_session";
const AUTH_CHANGE_EVENT = "gyaanbyte_auth_change";

let cachedSession: AuthSession | null = null;
let hasInitialized = false;

/**
 * Runtime Type Guard to ensure the user object matches the rich frontend User model.
 */
function isValidUser(user: unknown): user is User {
  if (typeof user !== "object" || user === null) {
    return false;
  }

  const value = user as Record<string, unknown>;

  const validRoles = [
    "ROLE_STUDENT",
    "ROLE_SALES",
    "ROLE_INSTRUCTOR",
    "ROLE_ADMIN",
  ];

  const validStatuses = [
    "PENDING_VERIFICATION",
    "ACTIVE",
    "SUSPENDED",
    "DEACTIVATED",
  ];

  return (
    typeof value.id === "string" &&
    typeof value.email === "string" &&
    typeof value.firstName === "string" &&
    typeof value.lastName === "string" &&
    typeof value.fullName === "string" &&
    typeof value.emailVerified === "boolean" &&
    Array.isArray(value.roles) &&
    value.roles.every(
      (role) => typeof role === "string" && validRoles.includes(role)
    ) &&
    typeof value.status === "string" &&
    validStatuses.includes(value.status)
  );
}

/**
 * Runtime Type Guard to ensure the parsed JSON matches the AuthSession shape.
 */
function isValidAuthSession(data: unknown): data is AuthSession {
  return (
    typeof data === "object" &&
    data !== null &&
    "accessToken" in data &&
    typeof (data as AuthSession).accessToken === "string" &&
    "user" in data &&
    isValidUser((data as AuthSession).user)
  );
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSession =
    localStorage.getItem(AUTH_SESSION_KEY) ??
    sessionStorage.getItem(AUTH_SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedSession);

    if (!isValidAuthSession(parsed)) {
      removeAuthSession();
      return null;
    }

    if (
      typeof parsed.expiresAt === "string" &&
      Date.now() > new Date(parsed.expiresAt).getTime()
    ) {
      removeAuthSession();
      return null;
    }

    return parsed;
  } catch {
    removeAuthSession();
    return null;
  }
}

export function updateAuthSession(
  session: AuthSession
): void {
  if (typeof window === "undefined") {
    return;
  }

  const serializedSession =
    JSON.stringify(session);

  if (
    localStorage.getItem(AUTH_SESSION_KEY) !== null
  ) {
    localStorage.setItem(
      AUTH_SESSION_KEY,
      serializedSession
    );
  } else if (
    sessionStorage.getItem(AUTH_SESSION_KEY) !== null
  ) {
    sessionStorage.setItem(
      AUTH_SESSION_KEY,
      serializedSession
    );
  } else {
    /*
     * No existing storage was found.
     * Do not create a new persistent session.
     */
    return;
  }

  cachedSession = session;
  hasInitialized = true;

  window.dispatchEvent(
    new Event(AUTH_CHANGE_EVENT)
  );
}

export function getAuthSessionSnapshot(): AuthSession | null {
  if (!hasInitialized) {
    cachedSession = getAuthSession();
    hasInitialized = true;
  }

  return cachedSession;
}

export function saveAuthSession(
  session: AuthSession,
  rememberMe: boolean
): void {
  if (typeof window === "undefined") return;

  const targetStorage = rememberMe ? localStorage : sessionStorage;
  const alternateStorage = rememberMe ? sessionStorage : localStorage;

  alternateStorage.removeItem(AUTH_SESSION_KEY);
  targetStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));

  cachedSession = session;
  hasInitialized = true;

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function removeAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_SESSION_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);

  cachedSession = null;
  hasInitialized = true;

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

/**
 * Subscribes to authentication changes across tabs or app components.
 */
export function onAuthChange(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === AUTH_SESSION_KEY || event.key === null) {
      cachedSession = getAuthSession();
      callback();
    }
  };

  const handleCustomChange = () => {
    cachedSession = getAuthSession();
    callback();
  };

  window.addEventListener(AUTH_CHANGE_EVENT, handleCustomChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handleCustomChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}
