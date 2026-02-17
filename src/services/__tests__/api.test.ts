import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock("../client", () => ({
  apiClient: {
    get: mockGet,
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
  setAccessToken: vi.fn(),
  getAccessToken: vi.fn(),
}));

import { api } from "../api";

describe("API adapter layer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSchedule", () => {
    it("fetches schedule and remaps camelCase to PascalCase", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: {
            races: [
              {
                season: "2025",
                round: "1",
                raceName: "Bahrain GP",
                circuit: {
                  circuitId: "bahrain",
                  circuitName: "Bahrain International Circuit",
                },
                date: "2025-03-02",
                time: "15:00:00Z",
                firstPractice: { date: "2025-02-28", time: "11:30:00Z" },
                qualifying: { date: "2025-03-01", time: "15:00:00Z" },
              },
            ],
          },
        },
      });

      const races = await api.getSchedule("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/schedule");
      expect(races).toHaveLength(1);
      expect(races[0].Circuit).toEqual({
        circuitId: "bahrain",
        circuitName: "Bahrain International Circuit",
      });
      expect(races[0].FirstPractice).toEqual({
        date: "2025-02-28",
        time: "11:30:00Z",
      });
      expect(races[0].Qualifying).toEqual({
        date: "2025-03-01",
        time: "15:00:00Z",
      });
      expect(races[0].raceName).toBe("Bahrain GP");
    });

    it("handles already-PascalCase data gracefully", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: {
            races: [
              {
                season: "2025",
                round: "1",
                raceName: "Test GP",
                Circuit: { circuitId: "test", circuitName: "Test Circuit" },
                date: "2025-03-02",
              },
            ],
          },
        },
      });

      const races = await api.getSchedule("2025");
      expect(races[0].Circuit).toEqual({
        circuitId: "test",
        circuitName: "Test Circuit",
      });
    });

    it("returns empty array if no races data", async () => {
      mockGet.mockResolvedValueOnce({ data: { data: {} } });
      const races = await api.getSchedule("2025");
      expect(races).toEqual([]);
    });
  });

  describe("getDrivers", () => {
    it("fetches and returns drivers array", async () => {
      const drivers = [
        { driverId: "verstappen", givenName: "Max", familyName: "Verstappen" },
      ];
      mockGet.mockResolvedValueOnce({
        data: { data: { drivers } },
      });

      const result = await api.getDrivers("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/drivers");
      expect(result).toEqual(drivers);
    });
  });

  describe("getConstructors", () => {
    it("fetches and returns constructors array", async () => {
      const constructors = [{ constructorId: "red_bull", name: "Red Bull" }];
      mockGet.mockResolvedValueOnce({
        data: { data: { constructors } },
      });

      const result = await api.getConstructors("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/constructors");
      expect(result).toEqual(constructors);
    });
  });

  describe("getRaceResults", () => {
    it("fetches and remaps race result data", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: {
            season: "2025",
            round: "1",
            raceName: "Bahrain GP",
            circuit: { circuitId: "bahrain", circuitName: "Bahrain" },
            date: "2025-03-02",
            results: [
              { position: "1", Driver: { driverId: "verstappen" } },
            ],
          },
        },
      });

      const result = await api.getRaceResults("2025", "1");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/1/results");
      expect(result.Circuit).toEqual({
        circuitId: "bahrain",
        circuitName: "Bahrain",
      });
      expect(result.Results).toHaveLength(1);
      expect(result.Results![0].position).toBe("1");
    });
  });

  describe("getDriverStandings", () => {
    it("fetches driver standings", async () => {
      const standings = [
        { position: "1", points: "395", Driver: { driverId: "verstappen" } },
      ];
      mockGet.mockResolvedValueOnce({
        data: { data: { standings } },
      });

      const result = await api.getDriverStandings("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/standings/drivers");
      expect(result).toEqual(standings);
    });
  });

  describe("getConstructorStandings", () => {
    it("fetches constructor standings", async () => {
      const standings = [
        {
          position: "1",
          points: "800",
          Constructor: { constructorId: "red_bull" },
        },
      ];
      mockGet.mockResolvedValueOnce({
        data: { data: { standings } },
      });

      const result = await api.getConstructorStandings("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/standings/constructors");
      expect(result).toEqual(standings);
    });
  });

  describe("getAllCircuits", () => {
    it("fetches all circuits for a year", async () => {
      const circuits = [{ circuitId: "bahrain", circuitName: "Bahrain" }];
      mockGet.mockResolvedValueOnce({
        data: { data: { circuits } },
      });

      const result = await api.getAllCircuits("2025");
      expect(mockGet).toHaveBeenCalledWith("/f1/2025/circuits");
      expect(result).toEqual(circuits);
    });
  });

  describe("getSeasons", () => {
    it("fetches available seasons", async () => {
      const seasons = [{ season: "2025", url: "" }];
      mockGet.mockResolvedValueOnce({
        data: { data: { seasons } },
      });

      const result = await api.getSeasons();
      expect(mockGet).toHaveBeenCalledWith("/f1/seasons");
      expect(result).toEqual(seasons);
    });
  });
});
