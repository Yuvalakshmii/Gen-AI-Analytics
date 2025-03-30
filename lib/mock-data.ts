"use client"

import type { QueryResult } from "./redux/reducers"

// Mock data generator based on query keywords
export function generateMockResults(query: string): QueryResult {
  const lowerQuery = query.toLowerCase()

  // Revenue related queries
  if (lowerQuery.includes("revenue") || lowerQuery.includes("sales")) {
    if (lowerQuery.includes("region") || lowerQuery.includes("by region")) {
      return {
        title: "Sales by Region",
        description: "Breakdown of sales performance across different regions",
        chartType: "bar",
        data: [
          { name: "North America", value: 420000 },
          { name: "Europe", value: 380000 },
          { name: "Asia Pacific", value: 290000 },
          { name: "Latin America", value: 170000 },
          { name: "Middle East", value: 120000 },
        ],
        insights: [
          "North America continues to be the strongest region, contributing 30% of total revenue.",
          "Europe shows 12% growth compared to the previous period.",
          "Asia Pacific is the fastest growing region with 18% YoY growth.",
          "Latin America performance is below target by 5%.",
        ],
      }
    }

    if (lowerQuery.includes("growth") || lowerQuery.includes("trend")) {
      return {
        title: "Revenue Growth Trend",
        description: "Quarterly revenue growth over the past year",
        chartType: "line",
        data: [
          { name: "Q1 2023", value: 850000 },
          { name: "Q2 2023", value: 920000 },
          { name: "Q3 2023", value: 980000 },
          { name: "Q4 2023", value: 1050000 },
          { name: "Q1 2024", value: 1120000 },
        ],
        insights: [
          "Consistent quarter-over-quarter growth averaging 7.2%.",
          "Q4 2023 showed the strongest performance with 7.1% growth.",
          "Overall annual growth rate of 31.8% compared to previous year.",
          "Growth is accelerating, with Q1 2024 showing the highest absolute revenue.",
        ],
      }
    }
  }

  // Customer related queries
  if (lowerQuery.includes("customer")) {
    if (lowerQuery.includes("acquisition") || lowerQuery.includes("cac")) {
      return {
        title: "Customer Acquisition Cost by Channel",
        description: "Average cost to acquire a customer across marketing channels",
        chartType: "bar",
        data: [
          { name: "Organic Search", value: 75 },
          { name: "Paid Search", value: 145 },
          { name: "Social Media", value: 120 },
          { name: "Email", value: 38 },
          { name: "Referral", value: 42 },
        ],
        insights: [
          "Email campaigns have the lowest CAC at $38, making it the most efficient channel.",
          "Paid Search has the highest CAC but also brings in customers with 28% higher LTV.",
          "Referral program shows strong performance with low CAC and high retention rates.",
          "Social Media CAC has decreased by 12% after recent campaign optimizations.",
        ],
      }
    }

    if (lowerQuery.includes("churn") || lowerQuery.includes("retention")) {
      return {
        title: "Customer Churn by Segment",
        description: "Monthly churn rate across different customer segments",
        chartType: "bar",
        data: [
          { name: "Enterprise", value: 1.2 },
          { name: "Mid-Market", value: 2.8 },
          { name: "SMB", value: 4.5 },
          { name: "Startup", value: 6.7 },
          { name: "Individual", value: 8.3 },
        ],
        insights: [
          "Enterprise segment shows the lowest churn rate at 1.2%, indicating strong product-market fit.",
          "Individual users have the highest churn at 8.3%, suggesting potential pricing or onboarding issues.",
          "Mid-Market churn has decreased by 0.7% after implementing the new customer success program.",
          "Overall weighted average churn is 3.9%, which is 0.5% lower than industry benchmark.",
        ],
      }
    }
  }

  // Conversion related queries
  if (lowerQuery.includes("conversion") || lowerQuery.includes("funnel")) {
    return {
      title: "Conversion Rate Trend",
      description: "Monthly conversion rate for main product",
      chartType: "line",
      data: [
        { name: "Jan", value: 3.2 },
        { name: "Feb", value: 3.4 },
        { name: "Mar", value: 3.8 },
        { name: "Apr", value: 4.1 },
        { name: "May", value: 4.5 },
        { name: "Jun", value: 4.7 },
      ],
      insights: [
        "Conversion rate has shown steady improvement, increasing from 3.2% to 4.7% over 6 months.",
        "The new onboarding flow implemented in March resulted in a 0.4% lift in conversion.",
        "Mobile conversion rates are 1.2% higher than desktop, suggesting a mobile-first audience.",
        "Weekend conversion rates are consistently 0.8% lower than weekday rates.",
      ],
    }
  }

  // Default response for other queries
  return {
    title: "Performance Metrics Overview",
    description: "Key business metrics for the current quarter",
    chartType: "bar",
    data: [
      { name: "Revenue", value: 1120000 },
      { name: "New Customers", value: 2840 },
      { name: "Active Users", value: 18500 },
      { name: "Conversion Rate", value: 4.7 },
      { name: "Customer Satisfaction", value: 8.6 },
    ],
    insights: [
      "Overall business performance is strong with 12% growth in revenue compared to last quarter.",
      "New customer acquisition is up 8% while CAC has decreased by 5%.",
      "Active user count has increased by 15%, indicating strong product engagement.",
      "Customer satisfaction score of 8.6/10 is at an all-time high following recent product updates.",
    ],
  }
}

