import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Race } from '../../services/types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface ResultState {
  resultsByRound: Record<string, Record<string, Race>> // year -> round -> Race
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ResultState = {
  resultsByRound: {},
  status: 'idle',
  error: null,
}

export const fetchResults = createAsyncThunk(
  'result/fetchResults',
  async ({ year, round }: { year: string; round: string }) => {
    const response = await api.getRaceResults(year, round)
    return { year, round, data: response }
  }
)

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { year, round, data } = action.payload
        if (!state.resultsByRound[year]) {
          state.resultsByRound[year] = {}
        }
        state.resultsByRound[year][round] = data
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch results'
      })
  },
})

const persistConfig = {
  key: 'result',
  storage,
  whitelist: ['resultsByRound'],
}

export default persistReducer(persistConfig, resultSlice.reducer)
