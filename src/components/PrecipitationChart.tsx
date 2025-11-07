import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Droplets } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface PrecipitationData {
  time: string;
  probability: number; // 0-100
  intensity: number; // mm
}

interface PrecipitationChartProps {
  data: PrecipitationData[];
}

export const PrecipitationChart = ({ data }: PrecipitationChartProps) => {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{payload[0].payload.time}</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">Probability:</span>
              <span className="font-medium">{payload[0].value}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-3 w-3 text-accent" />
              <span className="text-muted-foreground">Intensity:</span>
              <span className="font-medium">{payload[1]?.value || 0} mm</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const maxIntensity = Math.max(...data.map(d => d.intensity), 5);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          Precipitation Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Probability Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Rain Probability (%)
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="probability"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProbability)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Intensity Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <CloudRain className="h-4 w-4" />
            Rain Intensity (mm)
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                domain={[0, maxIntensity]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="intensity"
                fill="hsl(var(--accent))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
          <Droplets className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Probability shows the chance of rain, while intensity indicates expected rainfall amount in millimeters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
