import { apiClient } from "@/lib/api";
import { AUTH_ENDPOINTS } from "@/lib/api";

import type {
  ApiResponse,
  AuthUser,
  LoginResponseData,
  RegisterFormValues,
  RegisterResponseData,
} from "../types/auth.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async register(
    values: RegisterFormValues
  ): Promise<ApiResponse<RegisterResponseData>> {
    const payload: RegisterPayload = {
      name: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      password: values.password,
    };

    return apiClient<ApiResponse<RegisterResponseData>>(
      AUTH_ENDPOINTS.register,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<LoginResponseData>> {
    return apiClient<ApiResponse<LoginResponseData>>(
      AUTH_ENDPOINTS.login,
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );
  },

  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    return apiClient<ApiResponse<AuthUser>>(
      AUTH_ENDPOINTS.me,
      {
        method: "GET",
      }
    );
  },
};
