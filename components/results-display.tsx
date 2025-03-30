"use client"

import { useSelector } from "react-redux"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import type { RootState } from "@/lib/redux/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ResultsDisplay() {
  const { currentQuery, results, isProcessing } = useSelector(
    (state: RootState) => state.queries || { currentQuery: null, results: null, isProcessing: false },
  )

  if (isProcessing) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Analyzing your data...</p>
        </div>
      </div>
    )
  }

  if (!currentQuery || !results) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Ask a question to see insights from your data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Results</h3>

      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{results.title}</CardTitle>
              <CardDescription>{results.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {results.chartType === "bar" ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>AI-generated analysis of your data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {results.insights &&
                  results.insights.map((insight, index) => (
                    <li key={index} className="flex gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {index + 1}
                      </div>
                      <p>{insight}</p>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Raw Data</CardTitle>
              <CardDescription>Underlying data for your query</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr className="m-0 p-0">
                      <th className="h-10 px-4 text-left font-medium">Category</th>
                      <th className="h-10 px-4 text-left font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.data &&
                      results.data.map((item, index) => (
                        <tr key={index} className="m-0 p-0 border-b">
                          <td className="p-2 px-4">{item.name}</td>
                          <td className="p-2 px-4">{item.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

