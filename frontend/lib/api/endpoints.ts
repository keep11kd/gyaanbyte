export const AUTH_ENDPOINTS = {
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  me: "/api/v1/auth/me",

  forgotPassword: "/api/v1/auth/forgot-password",
  resetPassword: "/api/v1/auth/reset-password",
  verifyEmail: "/api/v1/auth/verify-email",
  logout: "/api/v1/auth/logout",
} as const;
