"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { processQuery } from "@/lib/redux/actions"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const SUGGESTIONS = [
  "What was our revenue growth last quarter?",
  "Show me sales by region for the past 6 months",
  "Compare customer acquisition cost across marketing channels",
  "What's the conversion rate trend for our main product?",
  "Analyze customer churn by segment",
]

export default function QueryInput() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Show suggestions when input is focused and empty
    if (query === "" && document.activeElement === inputRef.current) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      dispatch(processQuery(query) as any)
      // Don't clear the query to show what was submitted
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setOpen(false)
    dispatch(processQuery(suggestion) as any)
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <div className="relative flex w-full items-center">
            <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about your data..."
              className="pl-10 pr-20 py-6 text-base"
              onFocus={() => query === "" && setOpen(true)}
            />
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="absolute right-12 h-8">
                <Sparkles className="mr-2 h-4 w-4" />
                Suggestions
              </Button>
            </PopoverTrigger>
            <Button type="submit" className="absolute right-2 h-8" disabled={!query.trim()}>
              Ask
            </Button>
          </div>

          <PopoverContent className="p-0 w-[calc(100%-2rem)]" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>No suggestions found.</CommandEmpty>
                <CommandGroup heading="Try asking">
                  {SUGGESTIONS.map((suggestion) => (
                    <CommandItem key={suggestion} onSelect={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </form>

      <p className="text-xs text-muted-foreground">
        Try asking about sales trends, customer metrics, or performance indicators
      </p>
    </div>
  )
}

