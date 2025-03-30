"use client"

import { useDispatch, useSelector } from "react-redux"
import { Clock, Search, Trash2 } from "lucide-react"
import { clearHistory, processQuery } from "@/lib/redux/actions"
import type { RootState } from "@/lib/redux/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function QueryHistory() {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => (state.queries ? state.queries.history || [] : []))

  const handleQueryClick = (query: string) => {
    dispatch(processQuery(query) as any)
  }

  const handleClearHistory = () => {
    dispatch(clearHistory())
  }

  return (
    <div className="py-2">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Query History</span>
          </div>

          {history.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="h-8 w-8 p-0 flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Clear history</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear history?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all your query history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory}>Clear</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-1 p-2">
          {history.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              <Search className="mx-auto mb-2 h-6 w-6 opacity-50" />
              <p>No queries yet</p>
              <p className="text-xs">Your query history will appear here</p>
            </div>
          ) : (
            history.map((query, index) => (
              <button
                key={index}
                onClick={() => handleQueryClick(query)}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="truncate">{query}</span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

