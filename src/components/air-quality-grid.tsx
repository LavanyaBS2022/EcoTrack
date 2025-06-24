"use client";

import { Wind, Cloudy, Leaf, Thermometer, Droplets } from "lucide-react";
import { AirQualityCard } from "./air-quality-card";
import type { AirQualityData } from "@/lib/types";

interface AirQualityGridProps {
  data: AirQualityData;
}

export function AirQualityGrid({ data }: AirQualityGridProps) {
  
  const getPm25Color = (value: number) => {
    if (value > 35) return "text-destructive";
    if (value > 12) return "text-orange-500";
    return "text-primary";
  };

  const getPm10Color = (value: number) => {
    if (value > 150) return "text-destructive";
    if (value > 54) return "text-orange-500";
    return "text-primary";
  };
  
  const getCo2Color = (value: number) => {
    if (value > 1000) return "text-destructive";
    if (value > 800) return "text-orange-500";
    return "text-primary";
  }

  const getTempColor = (value: number) => {
    if (value > 30 || value < 10) return "text-orange-500";
    return "text-primary";
  }

  const getHumidityColor = (value: number) => {
    if (value > 70 || value < 30) return "text-orange-500";
    return "text-primary";
  }

  const metrics = [
    {
      title: "PM2.5",
      value: data.pm25,
      unit: "µg/m³",
      icon: <Wind className="h-4 w-4" />,
      description: "Fine particulate matter",
      getColor: getPm25Color,
    },
    {
      title: "PM10",
      value: data.pm10,
      unit: "µg/m³",
      icon: <Cloudy className="h-4 w-4" />,
      description: "Coarse particulate matter",
      getColor: getPm10Color,
    },
    {
      title: "CO2",
      value: data.co2,
      unit: "ppm",
      icon: <Leaf className="h-4 w-4" />,
      description: "Carbon dioxide level",
      getColor: getCo2Color,
    },
    {
      title: "Temperature",
      value: data.temperature,
      unit: "°C",
      icon: <Thermometer className="h-4 w-4" />,
      description: "Ambient temperature",
      getColor: getTempColor,
    },
    {
      title: "Humidity",
      value: data.humidity,
      unit: "%",
      icon: <Droplets className="h-4 w-4" />,
      description: "Relative humidity",
      getColor: getHumidityColor,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric) => (
        <AirQualityCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          unit={metric.unit}
          icon={metric.icon}
          description={metric.description}
          getAlertColor={metric.getColor}
        />
      ))}
    </div>
  );
}
