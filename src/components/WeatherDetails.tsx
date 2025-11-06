import { Card } from "@/components/ui/card";
import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset, Navigation } from "lucide-react";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  uvIndex?: number | null;
}

const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getUVLevel = (uv: number) => {
  if (uv <= 2) return { level: "Low", color: "text-green-500" };
  if (uv <= 5) return { level: "Moderate", color: "text-yellow-500" };
  if (uv <= 7) return { level: "High", color: "text-orange-500" };
  if (uv <= 10) return { level: "Very High", color: "text-red-500" };
  return { level: "Extreme", color: "text-purple-500" };
};

export const WeatherDetails = ({
  humidity,
  windSpeed,
  windDeg,
  pressure,
  visibility,
  sunrise,
  sunset,
  uvIndex,
}: WeatherDetailsProps) => {
  const uvInfo = uvIndex !== null && uvIndex !== undefined ? getUVLevel(uvIndex) : null;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-[var(--shadow-soft)] animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Weather Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Humidity</span>
          <span className="text-lg font-semibold text-foreground">{humidity}%</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Wind className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Wind Speed</span>
          <span className="text-lg font-semibold text-foreground">{windSpeed} m/s</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Navigation 
            className="h-5 w-5 text-primary" 
            style={{ transform: `rotate(${windDeg}deg)` }}
          />
          <span className="text-xs text-muted-foreground">Wind Direction</span>
          <span className="text-lg font-semibold text-foreground">{getWindDirection(windDeg)}</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Gauge className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Pressure</span>
          <span className="text-lg font-semibold text-foreground">{pressure} hPa</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Eye className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Visibility</span>
          <span className="text-lg font-semibold text-foreground">{(visibility / 1000).toFixed(1)} km</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Sunrise className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Sunrise</span>
          <span className="text-lg font-semibold text-foreground">{formatTime(sunrise)}</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
          <Sunset className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Sunset</span>
          <span className="text-lg font-semibold text-foreground">{formatTime(sunset)}</span>
        </div>

        {uvInfo && (
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
            <div className="h-5 w-5 rounded-full bg-yellow-400" />
            <span className="text-xs text-muted-foreground">UV Index</span>
            <span className={`text-lg font-semibold ${uvInfo.color}`}>
              {uvIndex?.toFixed(1)} - {uvInfo.level}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
