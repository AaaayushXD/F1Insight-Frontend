import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import scheduleReducer from './slices/scheduleSlice'
import circuitReducer from './slices/circuitSlice'
import driverReducer from './slices/driverSlice'
import constructorReducer from './slices/constructorSlice'
import resultReducer from './slices/resultSlice'

// We are using persistReducer at the slice level for granular control (whitelisting)
// But we can also use a root persist config if we prefer.
// The user requirement says: "Store Structure: store/index.ts ... slices/..."
// And "Persist ONLY... Use whitelisting".
// Since I applied persistReducer in each slice with whitelist, I can just combine them here.
// But wait, if I use persistReducer in slice files, I am wrapping them already.
// So here I just need to combine them.

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  circuit: circuitReducer, // this is already a persisted reducer
  driver: driverReducer,
  constructors: constructorReducer,
  result: resultReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
