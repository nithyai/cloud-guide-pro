import { Wind, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface AirQualityData {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

interface AirQualityProps {
  data: AirQualityData | null;
}

export const AirQuality = ({ data }: AirQualityProps) => {
  if (!data) return null;

  const getAQILevel = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "bg-green-500", variant: "default" as const, textColor: "text-green-600" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500", variant: "secondary" as const, textColor: "text-yellow-600" };
      case 3:
        return { label: "Moderate", color: "bg-orange-500", variant: "default" as const, textColor: "text-orange-600" };
      case 4:
        return { label: "Poor", color: "bg-red-500", variant: "destructive" as const, textColor: "text-red-600" };
      case 5:
        return { label: "Very Poor", color: "bg-purple-500", variant: "destructive" as const, textColor: "text-purple-600" };
      default:
        return { label: "Unknown", color: "bg-gray-500", variant: "secondary" as const, textColor: "text-gray-600" };
    }
  };

  const getAQIDescription = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "Air quality is satisfactory, and air pollution poses little or no risk.";
      case 2:
        return "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
      case 3:
        return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
      case 4:
        return "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.";
      case 5:
        return "Health alert: The risk of health effects is increased for everyone.";
      default:
        return "Air quality data unavailable.";
    }
  };

  const aqiLevel = getAQILevel(data.aqi);
  const aqiProgress = (data.aqi / 5) * 100;

  const pollutants = [
    { name: "PM2.5", value: data.components.pm2_5, unit: "μg/m³", description: "Fine particles" },
    { name: "PM10", value: data.components.pm10, unit: "μg/m³", description: "Coarse particles" },
    { name: "NO₂", value: data.components.no2, unit: "μg/m³", description: "Nitrogen dioxide" },
    { name: "O₃", value: data.components.o3, unit: "μg/m³", description: "Ozone" },
    { name: "SO₂", value: data.components.so2, unit: "μg/m³", description: "Sulphur dioxide" },
    { name: "CO", value: data.components.co, unit: "μg/m³", description: "Carbon monoxide" },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AQI Level Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${aqiLevel.color}`} />
                <span className={`text-2xl font-bold ${aqiLevel.textColor}`}>
                  {aqiLevel.label}
                </span>
                <Badge variant={aqiLevel.variant}>AQI {data.aqi}</Badge>
              </div>
            </div>
          </div>
          
          <Progress value={aqiProgress} className="h-3" />
          
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
            <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {getAQIDescription(data.aqi)}
            </p>
          </div>
        </div>

        {/* Pollutants Grid */}
        <div>
          <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
            Pollutant Concentrations
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pollutants.map((pollutant) => (
              <div
                key={pollutant.name}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      {pollutant.name}
                    </span>
                  </div>
                  <div className="text-lg font-bold">
                    {pollutant.value.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {pollutant.unit}
                  </div>
                  <div className="text-xs text-muted-foreground opacity-70">
                    {pollutant.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
