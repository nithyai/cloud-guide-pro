import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface HourData {
  time: string;
  temp: number;
  condition: string;
  icon: string;
}

interface HourlyForecastProps {
  hours: HourData[];
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return <CloudRain className="h-6 w-6" />;
  if (lower.includes("snow")) return <CloudSnow className="h-6 w-6" />;
  if (lower.includes("cloud")) return <Cloud className="h-6 w-6" />;
  return <Sun className="h-6 w-6" />;
};

export const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-[var(--shadow-soft)] animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-foreground">24-Hour Forecast</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6 pb-4">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              <span className="text-sm text-muted-foreground">{hour.time}</span>
              <div className="text-primary">
                {getWeatherIcon(hour.condition)}
              </div>
              <span className="text-lg font-semibold text-foreground">
                {Math.round(hour.temp)}°
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};
