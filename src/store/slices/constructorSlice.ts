import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Constructor } from '../../services/types'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface ConstructorState {
  constructors: Constructor[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ConstructorState = {
  constructors: [],
  status: 'idle',
  error: null,
}

export const fetchConstructors = createAsyncThunk(
  'constructor/fetchConstructors',
  async (year: string = '2026') => {
    const response = await api.getConstructors(year)
    return response
  }
)

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConstructors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchConstructors.fulfilled, (state, action: PayloadAction<Constructor[]>) => {
        state.status = 'succeeded'
        state.constructors = action.payload
      })
      .addCase(fetchConstructors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch constructors'
      })
  },
})

const persistConfig = {
  key: 'constructor',
  storage,
  whitelist: ['constructors'],
}

export default persistReducer(persistConfig, constructorSlice.reducer)
