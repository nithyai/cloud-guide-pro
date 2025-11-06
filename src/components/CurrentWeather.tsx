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
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            {data.city}, {data.country}
          </h2>
          <p className="text-muted-foreground">{data.condition}</p>
        </div>
        
        <div className="text-primary">
          {getWeatherIcon(data.condition)}
        </div>
        
        <div>
          <div className="text-7xl font-bold text-foreground">
            {Math.round(data.temp)}°
          </div>
          <p className="text-muted-foreground mt-2">
            Feels like {Math.round(data.feelsLike)}°
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-4 w-full max-w-xs">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold text-foreground">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-lg font-semibold text-foreground">{data.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
