import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherSearch } from "@/components/WeatherSearch";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { HourlyForecast } from "@/components/HourlyForecast";
import { WeatherDetails } from "@/components/WeatherDetails";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FavoriteLocations } from "@/components/FavoriteLocations";
import { WeatherAnimation } from "@/components/WeatherAnimation";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { AirQuality } from "@/components/AirQuality";
import { getCurrentWeather, getCurrentWeatherByCoords, getForecast, getUVIndex, getWeatherAlerts, getAirQuality } from "@/lib/weatherApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [city, setCity] = useState("London");
  const [useLocation, setUseLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const { toast } = useToast();

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ["weather", city, coords],
    queryFn: () =>
      coords
        ? getCurrentWeatherByCoords(coords.lat, coords.lon)
        : getCurrentWeather(city),
    enabled: !!city || !!coords,
    retry: 1,
  });

  const { data: forecastData } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => getForecast(city),
    enabled: !!city && !coords,
    retry: 1,
  });

  const { data: uvData } = useQuery({
    queryKey: ["uv", coords],
    queryFn: () => coords ? getUVIndex(coords.lat, coords.lon) : null,
    enabled: !!coords,
    retry: 1,
  });

  const { data: alertsData } = useQuery({
    queryKey: ["alerts", coords],
    queryFn: () => coords ? getWeatherAlerts(coords.lat, coords.lon) : null,
    enabled: !!coords,
    retry: 1,
  });

  const { data: airQualityData } = useQuery({
    queryKey: ["airQuality", coords],
    queryFn: () => coords ? getAirQuality(coords.lat, coords.lon) : null,
    enabled: !!coords,
    retry: 1,
  });

  useEffect(() => {
    if (weatherError) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please check your API key.",
        variant: "destructive",
      });
    }
  }, [weatherError, toast]);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setUseLocation(true);
          toast({
            title: "Location found",
            description: "Showing weather for your current location",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Could not get your location. Please search for a city.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    setUseLocation(false);
    setCoords(null);
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "bg-gradient-clear";
    const condition = weatherData.condition.toLowerCase();
    if (condition.includes("rain")) return "bg-gradient-cloudy";
    if (condition.includes("cloud")) return "bg-gradient-cloudy";
    return "bg-gradient-sunny";
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-all duration-1000 relative overflow-hidden`}>
      {weatherData && <WeatherAnimation condition={weatherData.condition} />}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-2">Weather Forecast</h1>
          <p className="text-muted-foreground">Real-time weather data and forecasts</p>
        </header>

        <div className="flex flex-col items-center gap-4 mb-8 animate-fade-in">
          <WeatherSearch onSearch={handleSearch} />
          <Button
            onClick={handleGetLocation}
            variant="secondary"
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            Use My Location
          </Button>
        </div>

        {weatherLoading && (
          <div className="text-center text-foreground">
            <p className="text-xl">Loading weather data...</p>
          </div>
        )}

        {weatherData && (
          <div className="max-w-4xl mx-auto space-y-6">
            <FavoriteLocations currentCity={weatherData.city} onSelectCity={handleSearch} />
            <WeatherAlerts alerts={alertsData} />
            <AirQuality data={airQualityData} />
            <CurrentWeather data={weatherData} />
            <WeatherDetails
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              windDeg={weatherData.windDeg}
              pressure={weatherData.pressure}
              visibility={weatherData.visibility}
              sunrise={weatherData.sunrise}
              sunset={weatherData.sunset}
              uvIndex={uvData}
            />
            
            {forecastData && (
              <>
                <HourlyForecast hours={forecastData.hourly} />
                <WeeklyForecast forecast={forecastData.weekly} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
