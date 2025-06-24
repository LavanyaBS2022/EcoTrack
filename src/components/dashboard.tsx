"use client"

import React, { useState, useEffect } from "react"
import { Header } from "./header"
import { AirQualityGrid } from "./air-quality-grid"
import { HistoricalChart } from "./historical-chart"
import { AlertsSection } from "./alerts-section"
import { RecommendationsSection } from "./recommendations-section"
import { CommunityForum } from "./community-forum"
import type { AirQualityData } from "@/lib/types"

const initialAirQuality: AirQualityData = {
  pm25: 12.5,
  pm10: 45.2,
  co2: 550,
  temperature: 22.1,
  humidity: 60,
}

function getSimulatedValue(value: number, max: number, factor: number) {
  const change = (Math.random() - 0.5) * factor;
  const newValue = value + change;
  if (newValue < 0) return 0;
  if (newValue > max) return max;
  return parseFloat(newValue.toFixed(1));
}

export function Dashboard() {
  const [airQuality, setAirQuality] = useState<AirQualityData>(initialAirQuality)

  useEffect(() => {
    const interval = setInterval(() => {
      setAirQuality(prev => ({
        pm25: getSimulatedValue(prev.pm25, 100, 1),
        pm10: getSimulatedValue(prev.pm10, 200, 2),
        co2: Math.round(getSimulatedValue(prev.co2, 1500, 20)),
        temperature: getSimulatedValue(prev.temperature, 40, 0.2),
        humidity: getSimulatedValue(prev.humidity, 100, 1),
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-6">
        <AirQualityGrid data={airQuality} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <HistoricalChart />
          </div>
          <div className="lg:col-span-2">
            <AlertsSection currentData={airQuality} />
          </div>
        </div>
        <RecommendationsSection airQualityData={airQuality} />
        <CommunityForum />
      </main>
      <footer className="text-center p-4 text-xs text-muted-foreground border-t">
        <p>EcoTrack &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  )
}
