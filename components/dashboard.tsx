"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChevronRight, Database, History, Loader2 } from "lucide-react"
import QueryInput from "./query-input"
import QueryHistory from "./query-history"
import ResultsDisplay from "./results-display"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  const dispatch = useDispatch()
  const { currentQuery, isProcessing, error } = useSelector(
    (state: RootState) => state.queries || { currentQuery: null, isProcessing: false, error: null },
  )
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 md:flex-col md:border-r">
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <Database className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Gen AI Analytics</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <QueryHistory />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          {isMobileView && (
            <Button variant="ghost" size="icon" className="md:hidden">
              <Database className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <span className="font-medium">Query Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              Documentation
            </Button>
            <Button size="sm">Upgrade Plan</Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold tracking-tight">Ask anything about your data</h2>
                {isProcessing && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing query...
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">
                Ask complex business questions in natural language and get instant insights.
              </p>
            </div>

            <QueryInput />

            {error && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">{error}</div>
            )}

            {currentQuery && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4" />
                  <span>Your query</span>
                </div>
                <p className="mt-2 font-medium">{currentQuery}</p>
              </div>
            )}

            <Separator />

            <ResultsDisplay />
          </div>
        </main>
      </div>

      {/* Mobile sidebar (conditionally rendered) */}
      {isMobileView && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden hidden">
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs border-r bg-background">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Gen AI Analytics</h1>
              </div>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Close sidebar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <QueryHistory />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

