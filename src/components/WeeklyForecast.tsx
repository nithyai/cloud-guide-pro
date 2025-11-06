import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";

interface DayForecast {
  day: string;
  condition: string;
  high: number;
  low: number;
  icon: string;
}

interface WeeklyForecastProps {
  forecast: DayForecast[];
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return <CloudRain className="h-8 w-8" />;
  if (lower.includes("snow")) return <CloudSnow className="h-8 w-8" />;
  if (lower.includes("cloud")) return <Cloud className="h-8 w-8" />;
  return <Sun className="h-8 w-8" />;
};

export const WeeklyForecast = ({ forecast }: WeeklyForecastProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-[var(--shadow-soft)] animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-foreground">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-medium text-foreground w-16">{day.day}</span>
              <div className="text-primary">
                {getWeatherIcon(day.condition)}
              </div>
              <span className="text-sm text-muted-foreground flex-1">{day.condition}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-sm font-semibold text-foreground">{Math.round(day.high)}°</span>
              <span className="text-sm text-muted-foreground">{Math.round(day.low)}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
