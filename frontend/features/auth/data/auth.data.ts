import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export const forgotPasswordContent = {
  badge: "Account Recovery", // Add required badge text
  title: "Forgot Password?",
  subtitle: "Enter your email to receive a reset link.",
  description: "Enter your registered email address and we will send you instructions to reset your password.", // Add required description
  buttonText: "Send Reset Link",
  backToLoginText: "Remembered your password?",
};

export const loginContent = {
  badge: "Welcome Back",
  title: "Log in to your account",
  subtitle: "Welcome back! Please enter your details.",
  description: "Access your dashboard, manage your settings, and explore learning resources.",
  buttonText: "Sign In",
  signUpText: "Don't have an account?",
};

export const registerContent = {
  badge: "Get Started",
  title: "Create an account",
  subtitle: "Join thousands of developers and learners today.",
  description: "Sign up for a new account to unlock full access to courses, interactive tools, and personalized tracking.",
  buttonText: "Create Account",
  loginText: "Already have an account?",
};

export const resetPasswordContent = {
  badge: "Security & Recovery",
  title: "Reset your password",
  subtitle: "Choose a strong password to protect your account.",
  description: "Enter your new password below. Make sure it meets all security requirements.",
  buttonText: "Update Password",
  backToLoginText: "Back to Login",
};
export const verifyEmailContent = {
  badge: "Email Verification",
  title: "Verify your email address",
  subtitle: "We've sent a verification link to your email.",
  description: "Please check your inbox and click on the verification link to complete your registration and secure your account.",
  buttonText: "Resend Email",
  backToLoginText: "Back to Login",
};
export type AuthPageType =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "verify-email";

export interface AuthFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  gradient: string; // Tailored gradient for cards/icons
}

export interface AuthPageContent {
  badge: string;
  title: string;
  description: string;
  /** Primary call-to-action redirect link (e.g., Switch between Login/Register) */
  alternateAction?: {
    prompt: string;
    label: string;
    href: string;
  };
  /** Link back to login (useful for recovery flows) */
  showBackToLogin?: boolean;
}

export interface AuthStat {
  value: string;
  label: string;
}

export interface SocialProvider {
  id: "google" | "github";
  name: string;
  icon: string; // SVG path or Lucide component reference
  enabled: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             BRAND CONFIGURATION                            */
/* -------------------------------------------------------------------------- */

export const authBrand = {
  name: "GyaanByte",
  tagline: "Learn • Build • Succeed",
  logoUrl: "/assets/brand/logo.svg",
  copyright: `© ${new Date().getFullYear()} GyaanByte Technologies Pvt. Ltd. All rights reserved.`,
  supportEmail: "support@gyaanbyte.com",
} as const;

/* -------------------------------------------------------------------------- */
/*                         PAGE-SPECIFIC CONTENT MAP                          */
/* -------------------------------------------------------------------------- */

export const authPagesContent: Record<AuthPageType, AuthPageContent> = {
  login: {
    badge: "Secure Authentication",
    title: "Welcome Back",
    description:
      "Sign in to access your dashboard, active projects, training modules, mentorship slots, and certificates.",
    alternateAction: {
      prompt: "Don't have an account?",
      label: "Create an account",
      href: "/register",
    },
  },
  register: {
    badge: "Create Account",
    title: "Join GyaanByte",
    description:
      "Create your account to start learning, build real-world software projects, and accelerate your engineering career.",
    alternateAction: {
      prompt: "Already have an account?",
      label: "Sign in",
      href: "/login",
    },
  },
  "forgot-password": {
    badge: "Password Recovery",
    title: "Forgot Your Password?",
    description:
      "Enter your registered email address and we'll dispatch a secure recovery link to reset your credentials.",
    showBackToLogin: true,
  },
  "reset-password": {
    badge: "Security Reset",
    title: "Create a New Password",
    description:
      "Choose a strong, unique password to secure your GyaanByte account and restore full system access.",
    showBackToLogin: true,
  },
  "verify-email": {
    badge: "Email Verification",
    title: "Verify Your Email",
    description:
      "We've sent a verification magic link to your email address. Please click the link to activate your account.",
    showBackToLogin: true,
  },
};

/* -------------------------------------------------------------------------- */
/*                            HERO FEATURES & STATS                           */
/* -------------------------------------------------------------------------- */

export const authStats: AuthStat[] = [
  { value: "10K+", label: "Engineers Trained" },
  { value: "50+", label: "Capstone Projects" },
  { value: "99.9%", label: "Platform Uptime" },
];

export const authFeatures: AuthFeature[] = [
  {
    id: "projects",
    title: "Industry-Level Projects",
    description:
      "Build real-world software with clean architecture, microservices, and production-ready Java & React pipelines.",
    icon: Code2,
    badge: "Production Ready",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "training",
    title: "Professional Training",
    description:
      "Structured, hands-on learning paths designed by practicing software engineers.",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "career",
    title: "Career Growth & Mentorship",
    description:
      "Interview prep, system design reviews, 1-on-1 mentorship, and placement assistance.",
    icon: BriefcaseBusiness,
    badge: "1-on-1",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "learning",
    title: "Practice-First Approach",
    description:
      "Interactive code labs, capstone evaluations, and real-time mentor feedback.",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Protected access with JWT rotation, encrypted credentials, and strict access controls.",
    icon: ShieldCheck,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "innovation",
    title: "Continuous Innovation",
    description:
      "Stay ahead with modern full-stack engineering, cloud deployments, and AI integrations.",
    icon: Sparkles,
    badge: "Updated 2026",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

/* -------------------------------------------------------------------------- */
/*                           SOCIAL LOGIN PROVIDERS                           */
/* -------------------------------------------------------------------------- */

export const socialLoginProviders: SocialProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: "google",
    enabled: true,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    enabled: true,
  },
];
