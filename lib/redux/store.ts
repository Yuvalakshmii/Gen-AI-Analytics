"use client"

import { configureStore } from "@reduxjs/toolkit"
import queriesReducer from "./reducers"

// Create the store
export const store = configureStore({
  reducer: {
    queries: queriesReducer,
  },
  // Add middleware explicitly to ensure it's properly configured
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for simplicity
    }),
})

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

