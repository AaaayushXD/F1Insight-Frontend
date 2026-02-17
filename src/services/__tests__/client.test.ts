import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";

// We need to test the client module in isolation, so we mock axios
vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");
  const mockInstance = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    defaults: { headers: { common: {} } },
  };
  return {
    ...actual,
    default: {
      ...actual.default,
      create: vi.fn(() => mockInstance),
      post: vi.fn(),
    },
  };
});

describe("client module", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates an axios instance with correct config", async () => {
    const { apiClient } = await import("../client");
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(apiClient).toBeDefined();
  });

  it("sets and gets access token", async () => {
    const { setAccessToken, getAccessToken } = await import("../client");
    expect(getAccessToken()).toBeNull();
    setAccessToken("test-token-123");
    expect(getAccessToken()).toBe("test-token-123");
    setAccessToken(null);
    expect(getAccessToken()).toBeNull();
  });

  it("registers request interceptor for auth header", async () => {
    await import("../client");
    const instance = (axios.create as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    expect(instance.interceptors.request.use).toHaveBeenCalled();
  });

  it("registers response interceptor for 401 handling", async () => {
    await import("../client");
    const instance = (axios.create as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    expect(instance.interceptors.response.use).toHaveBeenCalled();
  });
});
