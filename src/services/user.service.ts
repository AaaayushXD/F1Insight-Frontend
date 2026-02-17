import { apiClient } from "./client";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  favoriteDriver: string | null;
  favoriteTeam: string | null;
  preferences: UserPreferences;
  stats: {
    totalPredictions: number;
    avgAccuracy: number | null;
    memberSince: string;
    lastLogin: string;
  };
}

export interface UserPreferences {
  theme: "dark" | "light" | "system";
  raceAlerts: boolean;
  qualifyingAlerts: boolean;
  predictionAlerts: boolean;
  driverNewsAlerts: boolean;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
}

export async function getProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get("/users/me");
  return data.data;
}

export async function updateProfile(
  updates: Partial<Pick<UserProfile, "name" | "avatar" | "favoriteDriver" | "favoriteTeam">>
): Promise<UserProfile> {
  const { data } = await apiClient.patch("/users/me", updates);
  return data.data;
}

export async function updatePreferences(
  prefs: Partial<UserPreferences>
): Promise<UserPreferences> {
  const { data } = await apiClient.patch("/users/me/preferences", prefs);
  return data.data;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await apiClient.patch("/users/me/password", { currentPassword, newPassword });
}
