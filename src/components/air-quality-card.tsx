import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AirQualityCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
  description: string;
  getAlertColor: (value: number) => string;
}

export function AirQualityCard({ title, value, unit, icon, description, getAlertColor }: AirQualityCardProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getAlertColor(numericValue)}`}>
          {value}
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
