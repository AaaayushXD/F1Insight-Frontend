import type { MRData, Race, Driver, Constructor, Circuit } from "./types"

const BASE_URL = "https://api.jolpi.ca/ergast/f1"

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  const data = await response.json()
  return data
}

export const api = {
  getSchedule: async (year: string = "2026"): Promise<Race[]> => {
    const data = await fetchAPI<MRData>(`/${year}.json`)
    return data.MRData.RaceTable?.Races || []
  },

  getDrivers: async (year: string = "2026"): Promise<Driver[]> => {
    const data = await fetchAPI<MRData>(`/${year}/drivers.json`)
    return data.MRData.DriverTable?.Drivers || []
  },

  getConstructors: async (year: string = "2026"): Promise<Constructor[]> => {
    const data = await fetchAPI<MRData>(`/${year}/constructors.json`)
    return data.MRData.ConstructorTable?.Constructors || []
  },

  getCircuit: async (circuitId: string): Promise<Circuit | null> => {
    const data = await fetchAPI<MRData>(`/circuits/${circuitId}.json`)
    return data.MRData.CircuitTable?.Circuits[0] || null
  },
  
  getAllCircuits: async (year: string = "2026"): Promise<Circuit[]> => {
       const data = await fetchAPI<MRData>(`/${year}/circuits.json`)
       return data.MRData.CircuitTable?.Circuits || []
  },

  getRaceResults: async (year: string, round: string): Promise<Race> => {
    const data = await fetchAPI<MRData>(`/${year}/${round}/results.json`)
    return data.MRData.RaceTable?.Races[0] as Race
  },
  
  getLastRaceResults: async (): Promise<Race> => {
      const data = await fetchAPI<MRData>(`/current/last/results.json`)
      return data.MRData.RaceTable?.Races[0] as Race
  }
}
