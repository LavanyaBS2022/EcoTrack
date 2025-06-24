"use client"

import React, { useState, useMemo } from "react"
import { AlertTriangle } from "lucide-react"

import type { AirQualityData } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertsSectionProps {
  currentData: AirQualityData
}

export function AlertsSection({ currentData }: AlertsSectionProps) {
  const [thresholds, setThresholds] = useState({
    pm25: 35,
    pm10: 150,
    co2: 1000,
  })

  const handleThresholdChange = (key: keyof typeof thresholds, value: number[]) => {
    setThresholds(prev => ({ ...prev, [key]: value[0] }))
  }

  const alerts = useMemo(() => {
    const activeAlerts: string[] = []
    if (currentData.pm25 > thresholds.pm25) {
      activeAlerts.push(`High PM2.5 level: ${currentData.pm25.toFixed(1)} µg/m³ (Threshold: ${thresholds.pm25} µg/m³)`)
    }
    if (currentData.pm10 > thresholds.pm10) {
      activeAlerts.push(`High PM10 level: ${currentData.pm10.toFixed(1)} µg/m³ (Threshold: ${thresholds.pm10} µg/m³)`)
    }
    if (currentData.co2 > thresholds.co2) {
      activeAlerts.push(`High CO2 level: ${currentData.co2} ppm (Threshold: ${thresholds.co2} ppm)`)
    }
    return activeAlerts
  }, [currentData, thresholds])

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Air Quality Alerts</CardTitle>
        <CardDescription>Set thresholds to receive alerts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="pm25-slider" className="flex justify-between">
              <span>PM2.5 Threshold</span>
              <span>{thresholds.pm25} µg/m³</span>
            </Label>
            <Slider
              id="pm25-slider"
              max={100}
              step={1}
              value={[thresholds.pm25]}
              onValueChange={(value) => handleThresholdChange("pm25", value)}
            />
          </div>
          <div>
            <Label htmlFor="pm10-slider" className="flex justify-between">
              <span>PM10 Threshold</span>
              <span>{thresholds.pm10} µg/m³</span>
            </Label>
            <Slider
              id="pm10-slider"
              max={300}
              step={5}
              value={[thresholds.pm10]}
              onValueChange={(value) => handleThresholdChange("pm10", value)}
            />
          </div>
          <div>
            <Label htmlFor="co2-slider" className="flex justify-between">
              <span>CO2 Threshold</span>
              <span>{thresholds.co2} ppm</span>
            </Label>
            <Slider
              id="co2-slider"
              max={2000}
              step={50}
              value={[thresholds.co2]}
              onValueChange={(value) => handleThresholdChange("co2", value)}
            />
          </div>
        </div>
        
        {alerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unhealthy Air Quality Detected!</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
