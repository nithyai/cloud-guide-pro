import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface WeatherAlert {
  event: string;
  start: number;
  end: number;
  description: string;
  severity: "extreme" | "severe" | "moderate" | "minor";
  sender_name: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[] | null;
}

export const WeatherAlerts = ({ alerts }: WeatherAlertsProps) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "destructive";
      case "severe":
        return "destructive";
      case "moderate":
        return "default";
      case "minor":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "extreme":
      case "severe":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            variant={alert.severity === "extreme" || alert.severity === "severe" ? "destructive" : "default"}
            className="animate-scale-in"
          >
            <div className="flex items-start gap-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <AlertTitle className="mb-0">{alert.event}</AlertTitle>
                  <Badge variant={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <AlertDescription className="text-sm leading-relaxed">
                  {alert.description}
                </AlertDescription>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span>
                      <strong>Start:</strong>{" "}
                      {new Date(alert.start * 1000).toLocaleString()}
                    </span>
                    <span>
                      <strong>End:</strong>{" "}
                      {new Date(alert.end * 1000).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <strong>Source:</strong> {alert.sender_name}
                  </div>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};
