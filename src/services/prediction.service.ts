import { apiClient } from "./client";

export interface DriverPrediction {
  driverId: string;
  constructorId: string;
  predictedFinishPosition: number;
  podiumProbability: number;
}

export interface RacePrediction {
  predictionId: string;
  season: number;
  round: number;
  predictions: DriverPrediction[];
}

export interface SinglePrediction {
  predictionId: string;
  driverId: string;
  predictedFinishPosition: number;
  podiumProbability: number;
}

export interface PredictionHistoryItem {
  _id: string;
  season: number;
  round: number;
  type: "single" | "race";
  driverId?: string;
  results: DriverPrediction[];
  createdAt: string;
}

export async function predictRace(
  season: number,
  round: number
): Promise<RacePrediction> {
  const { data } = await apiClient.get("/predictions/race", {
    params: { season, round },
  });
  return data.data;
}

export async function predictSingle(
  season: number,
  round: number,
  driverId: string
): Promise<SinglePrediction> {
  const { data } = await apiClient.get("/predictions/single", {
    params: { season, round, driverId },
  });
  return data.data;
}

export async function getPredictionHistory(
  page = 1,
  limit = 20,
  season?: number
): Promise<{
  predictions: PredictionHistoryItem[];
  pagination: { page: number; total: number; totalPages: number };
}> {
  const { data } = await apiClient.get("/predictions/history", {
    params: { page, limit, ...(season ? { season } : {}) },
  });
  return { predictions: data.data.predictions, pagination: data.pagination };
}
