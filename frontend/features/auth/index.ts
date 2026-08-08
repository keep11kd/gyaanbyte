// features/auth/index.ts

// 1. Export Page Views
export { default as ForgotPasswordPageView } from "./ForgotPasswordPageView";
export { default as LoginPageView } from "./LoginPageView";
export { default as RegisterPageView } from "./RegisterPageView";
export { default as ResetPasswordPageView } from "./ResetPasswordPageView";
export { default as VerifyEmailPageView } from "./VerifyEmailPageView";

// 2. Explicitly export Types (use 'export type' to prevent runtime bundling overhead)
export type {
  AuthFeature,
  AuthPageContent,
  RegisterFormValues,
  ResetPasswordFormValues,
} from "./types";

// 3. Explicitly export Data / Constants
export {
  authBrand,
  authFeatures,
  forgotPasswordContent,
  loginContent,
  registerContent,
  resetPasswordContent,
  verifyEmailContent,
} from "./data";
