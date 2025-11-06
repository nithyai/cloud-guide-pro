import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  data: {
    city: string;
    country: string;
    temp: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    sunrise: number;
    sunset: number;
    pressure: number;
    visibility: number;
    icon: string;
  };
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return <CloudRain className="h-24 w-24" />;
  if (lower.includes("snow")) return <CloudSnow className="h-24 w-24" />;
  if (lower.includes("cloud")) return <Cloud className="h-24 w-24" />;
  return <Sun className="h-24 w-24" />;
};

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-[var(--shadow-soft)] animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="flex-1 text-center w-full">
          <h2 className="text-3xl font-bold mb-1 text-foreground">
            {data.city}, {data.country}
          </h2>
          <p className="text-xl text-muted-foreground mb-4">{data.condition}</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-primary">
              {getWeatherIcon(data.condition)}
            </div>
            <div>
              <div className="text-6xl font-bold text-foreground">
                {Math.round(data.temp)}°
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Feels like {Math.round(data.feelsLike)}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
