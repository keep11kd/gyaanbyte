import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                DOMAIN MODELS                               */
/* -------------------------------------------------------------------------- */

export type UserRole =
  | "ROLE_STUDENT"
  | "ROLE_SALES"
  | "ROLE_INSTRUCTOR"
  | "ROLE_ADMIN";

export type UserAccountStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED";

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

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt: string;
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

export type SocialProviderId = "google" | "github" | "microsoft" | "linkedin";

export interface SocialLoginProvider {
  id: SocialProviderId;
  name: string;
  icon?: string;
  enabled: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             FORM VALUES TYPES                              */
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
/*                         API RESPONSE & ERROR CONTRACTS                     */
/* -------------------------------------------------------------------------- */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorDetails {
  code: string;
  details?: Record<string, string> | ValidationError[] | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiErrorDetails;
  requestId?: string;
  timestamp?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

export interface LoginResponseData {
  user: User;
  accessToken: string;
  expiresAt: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RegisterResponse = ApiResponse<{ userId: string; email: string }>;

/* -------------------------------------------------------------------------- */
/*                           COMPONENT PROPS TYPES                            */
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
  onSelectProvider?: (providerId: SocialProviderId) => void;
}
