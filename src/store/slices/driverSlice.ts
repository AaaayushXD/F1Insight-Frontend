import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Driver } from '../../services/types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface DriverState {
  drivers: Driver[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DriverState = {
  drivers: [],
  status: 'idle',
  error: null,
}

export const fetchDrivers = createAsyncThunk(
  'driver/fetchDrivers',
  async (year: string = '2026') => {
    const response = await api.getDrivers(year)
    return response
  }
)

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDrivers.fulfilled, (state, action: PayloadAction<Driver[]>) => {
        state.status = 'succeeded'
        state.drivers = action.payload
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch drivers'
      })
  },
})

const persistConfig = {
  key: 'driver',
  storage,
  whitelist: ['drivers'],
}

export default persistReducer(persistConfig, driverSlice.reducer)
