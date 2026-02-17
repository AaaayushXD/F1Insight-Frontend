import { apiClient } from "./client"
import type { Race, Driver, Constructor, Circuit, DriverStanding, ConstructorStanding } from "./types"

/**
 * API adapter layer.
 *
 * The backend f1.service transforms Ergast PascalCase keys to camelCase
 * (e.g. Circuit → circuit, FirstPractice → firstPractice).
 * This adapter remaps them back so existing frontend components work unchanged.
 */

// --- Remapping helpers ---

function remapRace(r: any): Race {
  return {
    season: r.season,
    round: r.round,
    url: r.url || "",
    raceName: r.raceName,
    Circuit: r.circuit || r.Circuit,
    date: r.date,
    time: r.time || "",
    FirstPractice: r.firstPractice || r.FirstPractice || undefined,
    SecondPractice: r.secondPractice || r.SecondPractice || undefined,
    ThirdPractice: r.thirdPractice || r.ThirdPractice || undefined,
    Qualifying: r.qualifying || r.Qualifying || undefined,
    Sprint: r.sprint || r.Sprint || undefined,
    Results: r.results || r.Results || undefined,
  }
}

// --- Public API ---

export const api = {
  getSchedule: async (year: string = "2026"): Promise<Race[]> => {
    const { data } = await apiClient.get(`/f1/${year}/schedule`)
    const races = data.data?.races || []
    return races.map(remapRace)
  },

  getDrivers: async (year: string = "2026"): Promise<Driver[]> => {
    const { data } = await apiClient.get(`/f1/${year}/drivers`)
    return data.data?.drivers || []
  },

  getConstructors: async (year: string = "2026"): Promise<Constructor[]> => {
    const { data } = await apiClient.get(`/f1/${year}/constructors`)
    return data.data?.constructors || []
  },

  getCircuit: async (circuitId: string): Promise<Circuit | null> => {
    const { data } = await apiClient.get(`/f1/circuits/${circuitId}`)
    return data.data || null
  },

  getAllCircuits: async (year: string = "2026"): Promise<Circuit[]> => {
    const { data } = await apiClient.get(`/f1/${year}/circuits`)
    return data.data?.circuits || []
  },

  getRaceResults: async (year: string, round: string): Promise<Race> => {
    const { data } = await apiClient.get(`/f1/${year}/${round}/results`)
    return remapRace(data.data)
  },

  getLastRaceResults: async (): Promise<Race> => {
    const { data } = await apiClient.get(`/f1/current/last/results`)
    return remapRace(data.data)
  },

  getDriverStandings: async (year: string): Promise<DriverStanding[]> => {
    const { data } = await apiClient.get(`/f1/${year}/standings/drivers`)
    return data.data?.standings || []
  },

  getConstructorStandings: async (year: string): Promise<ConstructorStanding[]> => {
    const { data } = await apiClient.get(`/f1/${year}/standings/constructors`)
    return data.data?.standings || []
  },

  getSeasons: async (): Promise<{ season: string; url: string }[]> => {
    const { data } = await apiClient.get(`/f1/seasons`)
    return data.data?.seasons || []
  },
}
