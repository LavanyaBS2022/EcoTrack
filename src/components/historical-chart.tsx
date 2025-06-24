"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Monday", pm25: 12, pm10: 25 },
  { day: "Tuesday", pm25: 15, pm10: 30 },
  { day: "Wednesday", pm25: 14, pm10: 28 },
  { day: "Thursday", pm25: 18, pm10: 35 },
  { day: "Friday", pm25: 22, pm10: 45 },
  { day: "Saturday", pm25: 20, pm10: 40 },
  { day: "Sunday", pm25: 16, pm10: 32 },
]

const chartConfig = {
  pm25: {
    label: "PM2.5",
    color: "hsl(var(--chart-1))",
  },
  pm10: {
    label: "PM10",
    color: "hsl(var(--chart-2))",
  },
}

export function HistoricalChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Historical Data</CardTitle>
        <CardDescription>Last 7 days air quality trend</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} µg/m³`}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              dataKey="pm25"
              type="monotone"
              stroke="var(--color-pm25)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="pm10"
              type="monotone"
              stroke="var(--color-pm10)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
