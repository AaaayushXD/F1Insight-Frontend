import { apiClient } from "./client";

export interface StrategyParams {
  predictedPositionMean: number;
  predictedPositionStd?: number;
  circuitId?: string;
  raceLaps?: number;
  trackTemp?: number;
  rainProbability?: number;
}

export interface StrategyResult {
  strategyId: string;
  bestStrategy: {
    label: string;
    expectedPosition: number;
    stdPosition: number;
  };
  strategyRanking: Array<{
    label: string;
    expected_position: number;
    std_position: number;
  }>;
  safetyCarAnalysis?: {
    probability?: number;
    [key: string]: any;
  };
  weatherImpact?: Record<string, any>;
  compoundStrategies?: Array<{
    name: string;
    compounds: string[];
    [key: string]: any;
  }>;
  tacticalRecommendations?: Array<string | { type: string; action: string; confidence: number }>;
}

export async function getStrategyRecommendation(
  params: StrategyParams
): Promise<StrategyResult> {
  const { data } = await apiClient.post("/strategy/recommend", params);
  return data.data;
}
