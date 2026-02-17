import { apiClient } from "./client";

export interface Notification {
  _id: string;
  type: "race" | "prediction" | "driver" | "system";
  title: string;
  message: string;
  read: boolean;
  pinned: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  pagination: { page: number; total: number; totalPages: number };
}

export async function getNotifications(
  page = 1,
  limit = 20,
  unreadOnly = false
): Promise<NotificationsResponse> {
  const { data } = await apiClient.get("/notifications", {
    params: { page, limit, unreadOnly: unreadOnly ? "true" : "false" },
  });
  return {
    notifications: data.data.notifications,
    unreadCount: data.data.unreadCount,
    pagination: data.pagination,
  };
}

export async function markAsRead(id: string): Promise<void> {
  await apiClient.patch(`/notifications/${id}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await apiClient.post("/notifications/read-all");
}

export async function deleteNotification(id: string): Promise<void> {
  await apiClient.delete(`/notifications/${id}`);
}
