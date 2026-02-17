import { apiClient, setAccessToken } from "./client";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
}

interface SignupResponse {
  success: boolean;
  data: {
    userId: string;
    message: string;
  };
}

interface OTPRequiredResponse {
  success: false;
  message: string;
  data: {
    requiresOTP: true;
    userId: string;
  };
}

export type LoginResult =
  | { authenticated: true; user: User }
  | { authenticated: false; requiresOTP: true; userId: string };

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    setAccessToken(data.data.accessToken);
    return { authenticated: true, user: data.data.user };
  } catch (error: any) {
    if (error.response?.status === 403 && error.response?.data?.data?.requiresOTP) {
      const resp = error.response.data as OTPRequiredResponse;
      return {
        authenticated: false,
        requiresOTP: true,
        userId: resp.data.userId,
      };
    }
    throw error;
  }
}

export async function signupApi(
  email: string,
  password: string,
  name: string
): Promise<{ userId: string }> {
  const { data } = await apiClient.post<SignupResponse>("/auth/signup", {
    email,
    password,
    name,
  });
  return { userId: data.data.userId };
}

export async function verifyOTPApi(
  userId: string,
  code: string
): Promise<User> {
  const { data } = await apiClient.post<AuthResponse>("/auth/verify", {
    userId,
    code,
  });
  setAccessToken(data.data.accessToken);
  return data.data.user;
}

export async function resendOTPApi(
  userId: string,
  purpose: "signup" | "login" | "password-reset" = "signup"
): Promise<void> {
  await apiClient.post("/auth/resend-otp", { userId, purpose });
}

export async function refreshTokenApi(): Promise<User | null> {
  try {
    const { data } = await apiClient.post<{
      success: boolean;
      data: { accessToken: string };
    }>("/auth/refresh");
    setAccessToken(data.data.accessToken);
    // We don't get user data from refresh — caller uses stored user
    return null;
  } catch {
    return null;
  }
}

export async function logoutApi(): Promise<void> {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    setAccessToken(null);
  }
}
