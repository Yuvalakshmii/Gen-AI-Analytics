"use client"

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { QueryResult } from "./reducers"
import { generateMockResults } from "../mock-data"

// Basic actions
export const submitQuery = createAction<string>("queries/submitQuery")
export const clearHistory = createAction("queries/clearHistory")
export const setProcessingState = createAction<{
  isProcessing: boolean
  results: QueryResult | null
}>("queries/setProcessingState")
export const setError = createAction<string>("queries/setError")

// Async thunk for processing queries
export const processQuery = createAsyncThunk("queries/processQuery", async (query: string, { dispatch }) => {
  // First dispatch the query submission
  dispatch(submitQuery(query))

  try {
    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock results
    const results = generateMockResults(query)

    // Update state with results
    dispatch(
      setProcessingState({
        isProcessing: false,
        results,
      }),
    )

    return results
  } catch (error) {
    // Handle errors
    dispatch(setError("Failed to process your query. Please try again."))
    throw error
  }
})

