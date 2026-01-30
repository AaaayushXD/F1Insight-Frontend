import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Circuit } from '../../services/types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface CircuitState {
  circuits: Circuit[]
  selectedCircuit: Circuit | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CircuitState = {
  circuits: [],
  selectedCircuit: null,
  status: 'idle',
  error: null,
}

// Fetch single circuit details
export const fetchCircuit = createAsyncThunk(
  'circuit/fetchCircuit',
  async (circuitId: string) => {
    const response = await api.getCircuit(circuitId)
    if (!response) throw new Error('Circuit not found')
    return response
  }
)

// Fetch all circuits for the season
export const fetchCircuits = createAsyncThunk(
  'circuit/fetchCircuits',
  async (year: string = '2026') => {
    const response = await api.getAllCircuits(year)
    return response
  }
)

export const circuitSlice = createSlice({
  name: 'circuit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Single Circuit
      .addCase(fetchCircuit.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCircuit.fulfilled, (state, action: PayloadAction<Circuit>) => {
        state.status = 'succeeded'
        state.selectedCircuit = action.payload
      })
      .addCase(fetchCircuit.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch circuit'
      })
      // Fetch All Circuits
      .addCase(fetchCircuits.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCircuits.fulfilled, (state, action: PayloadAction<Circuit[]>) => {
        state.status = 'succeeded'
        state.circuits = action.payload
      })
      .addCase(fetchCircuits.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch circuits'
      })
  },
})

const persistConfig = {
  key: 'circuit',
  storage,
  whitelist: ['circuits', 'selectedCircuit'],
}

export default persistReducer(persistConfig, circuitSlice.reducer)
