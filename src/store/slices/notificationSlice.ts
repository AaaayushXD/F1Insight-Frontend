import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "race" | "prediction" | "driver" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  autoClose?: number;
  pinned?: boolean;
}

interface NotificationState {
  queue: Notification[];
}

const initialState: NotificationState = {
  queue: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    pushNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "timestamp">>,
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      const timestamp = Date.now();
      state.queue.unshift({ ...action.payload, id, timestamp });

      // Keep only last 10 in queue (visible is limited in UI, but keep state clean)
      if (state.queue.length > 10) {
        state.queue = state.queue.slice(0, 10);
      }
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((n) => n.id !== action.payload);
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const notification = state.queue.find((n) => n.id === action.payload);
      if (notification) {
        notification.pinned = !notification.pinned;
      }
    },
    clearAll: (state) => {
      state.queue = state.queue.filter((n) => n.pinned);
    },
  },
});

export const { pushNotification, dismissNotification, togglePin, clearAll } =
  notificationSlice.actions;
export default notificationSlice.reducer;
