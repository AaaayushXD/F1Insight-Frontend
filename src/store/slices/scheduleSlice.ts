import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Race } from '../../services/types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Define a type for the slice state
interface ScheduleState {
  races: Race[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Define the initial state
const initialState: ScheduleState = {
  races: [],
  status: 'idle',
  error: null,
}

// Async Thunk for fetching schedule
export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async (year: string = '2026') => {
    const response = await api.getSchedule(year)
    return response
  }
)

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    // Standard reducer logic, potentially for manual resets
    resetSchedule: (state) => {
      state.status = 'idle'
      state.races = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSchedule.fulfilled, (state, action: PayloadAction<Race[]>) => {
        state.status = 'succeeded'
        state.races = action.payload
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch schedule'
      })
  },
})

export const { resetSchedule } = scheduleSlice.actions

// Persist Config for this slice
const persistConfig = {
  key: 'schedule',
  storage,
  whitelist: ['races'], // Persist ONLY races, NOT status/error
}

export default persistReducer(persistConfig, scheduleSlice.reducer)
