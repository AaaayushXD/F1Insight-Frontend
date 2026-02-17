import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockPost, mockSetAccessToken } = vi.hoisted(() => ({
  mockPost: vi.fn(),
  mockSetAccessToken: vi.fn(),
}));

vi.mock("../client", () => ({
  apiClient: {
    get: vi.fn(),
    post: mockPost,
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
  setAccessToken: mockSetAccessToken,
  getAccessToken: vi.fn(),
}));

import {
  loginApi,
  signupApi,
  verifyOTPApi,
  resendOTPApi,
  logoutApi,
} from "../auth.service";

describe("Auth service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loginApi", () => {
    it("returns authenticated user on successful login", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            user: { id: "u1", email: "test@test.com", name: "Test" },
            accessToken: "jwt-token-123",
          },
        },
      });

      const result = await loginApi("test@test.com", "password");
      expect(mockPost).toHaveBeenCalledWith("/auth/login", {
        email: "test@test.com",
        password: "password",
      });
      expect(result).toEqual({
        authenticated: true,
        user: { id: "u1", email: "test@test.com", name: "Test" },
      });
      expect(mockSetAccessToken).toHaveBeenCalledWith("jwt-token-123");
    });

    it("returns requiresOTP on 403 with OTP flag", async () => {
      const error = {
        response: {
          status: 403,
          data: {
            success: false,
            message: "OTP required",
            data: { requiresOTP: true, userId: "u1" },
          },
        },
      };
      mockPost.mockRejectedValueOnce(error);

      const result = await loginApi("test@test.com", "password");
      expect(result).toEqual({
        authenticated: false,
        requiresOTP: true,
        userId: "u1",
      });
    });

    it("throws on non-OTP errors", async () => {
      const error = {
        response: { status: 500, data: { message: "Server error" } },
      };
      mockPost.mockRejectedValueOnce(error);

      await expect(loginApi("test@test.com", "password")).rejects.toEqual(
        error
      );
    });
  });

  describe("signupApi", () => {
    it("returns userId on successful signup", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          success: true,
          data: { userId: "u1", message: "OTP sent" },
        },
      });

      const result = await signupApi("test@test.com", "password", "Test");
      expect(mockPost).toHaveBeenCalledWith("/auth/signup", {
        email: "test@test.com",
        password: "password",
        name: "Test",
      });
      expect(result).toEqual({ userId: "u1" });
    });
  });

  describe("verifyOTPApi", () => {
    it("returns user and sets token on successful verification", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            user: { id: "u1", email: "test@test.com", name: "Test" },
            accessToken: "new-jwt-token",
          },
        },
      });

      const user = await verifyOTPApi("u1", "123456");
      expect(mockPost).toHaveBeenCalledWith("/auth/verify", {
        userId: "u1",
        code: "123456",
      });
      expect(user).toEqual({
        id: "u1",
        email: "test@test.com",
        name: "Test",
      });
      expect(mockSetAccessToken).toHaveBeenCalledWith("new-jwt-token");
    });
  });

  describe("resendOTPApi", () => {
    it("sends resend request with userId and purpose", async () => {
      mockPost.mockResolvedValueOnce({ data: { success: true } });

      await resendOTPApi("u1", "signup");
      expect(mockPost).toHaveBeenCalledWith("/auth/resend-otp", {
        userId: "u1",
        purpose: "signup",
      });
    });
  });

  describe("logoutApi", () => {
    it("calls logout endpoint and clears token", async () => {
      mockPost.mockResolvedValueOnce({ data: { success: true } });

      await logoutApi();
      expect(mockPost).toHaveBeenCalledWith("/auth/logout");
      expect(mockSetAccessToken).toHaveBeenCalledWith(null);
    });

    it("clears token even if API call fails", async () => {
      mockPost.mockRejectedValueOnce(new Error("Network error"));

      await expect(logoutApi()).rejects.toThrow("Network error");
      expect(mockSetAccessToken).toHaveBeenCalledWith(null);
    });
  });
});
