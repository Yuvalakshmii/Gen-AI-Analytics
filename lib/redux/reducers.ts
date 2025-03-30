"use client"

import { createReducer } from "@reduxjs/toolkit"
import { submitQuery, clearHistory, setProcessingState, setError } from "./actions"

export interface QueryResult {
  title: string
  description: string
  chartType: "bar" | "line"
  data: Array<{ name: string; value: number }>
  insights: string[]
}

export interface QueriesState {
  currentQuery: string | null
  history: string[]
  results: QueryResult | null
  isProcessing: boolean
  error: string | null
}

const initialState: QueriesState = {
  currentQuery: null,
  history: [],
  results: null,
  isProcessing: false,
  error: null,
}

const queriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(submitQuery, (state, action) => {
      state.currentQuery = action.payload
      state.isProcessing = true
      state.error = null

      // Add to history if not already present
      if (!state.history.includes(action.payload)) {
        state.history = [action.payload, ...state.history].slice(0, 10)
      } else {
        // Move to top if already in history
        state.history = [action.payload, ...state.history.filter((q) => q !== action.payload)].slice(0, 10)
      }
    })
    .addCase(clearHistory, (state) => {
      state.history = []
    })
    .addCase(setProcessingState, (state, action) => {
      state.isProcessing = action.payload.isProcessing
      state.results = action.payload.results
    })
    .addCase(setError, (state, action) => {
      state.isProcessing = false
      state.error = action.payload
    })
})

export default queriesReducer

