import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               DOMAIN MODELS                                */
/* -------------------------------------------------------------------------- */

/**
 * Frontend application roles.
 *
 * These use the ROLE_* convention because they represent
 * Spring Security authorities on the frontend side.
 */
export type UserRole =
  | "ROLE_STUDENT"
  | "ROLE_SALES"
  | "ROLE_INSTRUCTOR"
  | "ROLE_ADMIN";

/**
 * Backend currently returns roles without the ROLE_ prefix.
 *
 * Example:
 * STUDENT
 */
export type BackendUserRole =
  | "STUDENT"
  | "SALES"
  | "INSTRUCTOR"
  | "ADMIN";

export type UserAccountStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED";

/**
 * Rich frontend user model.
 *
 * This represents the user model we ultimately want
 * throughout the GyaanByte frontend.
 */
export interface User {
  id: string;
  email: string;

  firstName: string;
  lastName: string;
  fullName: string;

  phoneNumber?: string;
  avatarUrl?: string;

  status: UserAccountStatus;
  roles: UserRole[];

  emailVerified: boolean;
  createdAt?: string;
}

/**
 * Authentication session used by the frontend.
 */
export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt?: string;
}

/**
 * User returned by the CURRENT backend authentication API.
 *
 * Backend currently returns:
 *
 * {
 *   id,
 *   name,
 *   email,
 *   role,
 *   emailVerified
 * }
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: BackendUserRole;
  emailVerified: boolean;
}

/* -------------------------------------------------------------------------- */
/*                          UI & CONTENT CONFIG TYPES                         */
/* -------------------------------------------------------------------------- */

export type AuthPageType =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "verify-email";

export interface AuthBrand {
  name: string;
  tagline: string;
  copyright: string;
  logoUrl?: string;
  supportEmail?: string;
}

export interface AuthPageContent {
  badge: string;
  title: string;
  description: string;

  alternateAction?: {
    prompt: string;
    label: string;
    href: string;
  };

  showBackToLogin?: boolean;
}

export interface AuthFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  gradient?: string;
}

export interface AuthStat {
  value: string;
  label: string;
}

export type SocialProviderId =
  | "google"
  | "github"
  | "microsoft"
  | "linkedin";

export interface SocialLoginProvider {
  id: SocialProviderId;
  name: string;
  icon?: string;
  enabled: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             FORM VALUE TYPES                               */
/* -------------------------------------------------------------------------- */

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface VerifyEmailFormValues {
  email: string;
  otp?: string;
  token?: string;
}

/* -------------------------------------------------------------------------- */
/*                          API RESPONSE CONTRACTS                            */
/* -------------------------------------------------------------------------- */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorDetails {
  code: string;
  details?: Record<string, string> | ValidationError[] | null;
}

/**
 * Generic response returned by the GyaanByte backend.
 *
 * Example:
 *
 * {
 *   success: true,
 *   message: "...",
 *   data: {...},
 *   timestamp: "...",
 *   path: "..."
 * }
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  error?: ApiErrorDetails;
  requestId?: string;
  timestamp?: string;
  path?: string;
}

/* -------------------------------------------------------------------------- */
/*                              LOGIN API TYPES                               */
/* -------------------------------------------------------------------------- */

export interface LoginResponseData {
  user: AuthUser;
  accessToken: string;
}

export type LoginResponse =
  ApiResponse<LoginResponseData>;

/* -------------------------------------------------------------------------- */
/*                            REGISTER API TYPES                              */
/* -------------------------------------------------------------------------- */

export interface RegisterResponseData {
  id: string;
  name: string;
  email: string;
  role: BackendUserRole;
  emailVerified: boolean;
}

export type RegisterResponse =
  ApiResponse<RegisterResponseData>;

/* -------------------------------------------------------------------------- */
/*                           CURRENT USER API TYPES                           */
/* -------------------------------------------------------------------------- */

export type CurrentUserResponse =
  ApiResponse<AuthUser>;

/* -------------------------------------------------------------------------- */
/*                          COMPONENT PROPS TYPES                             */
/* -------------------------------------------------------------------------- */

export interface AuthHeaderProps {
  badge?: string;
  title: string;
  description: string;
  className?: string;
}

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export interface SocialLoginButtonsProps {
  providers?: SocialLoginProvider[];
  isLoading?: boolean;
  onSelectProvider?: (
    providerId: SocialProviderId
  ) => void;
}
