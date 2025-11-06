// OpenWeatherMap API integration
// Get your free API key at: https://openweathermap.org/api

const API_KEY = "YOUR_API_KEY_HERE"; // Users should replace this with their own key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ForecastDay {
  day: string;
  condition: string;
  high: number;
  low: number;
  icon: string;
}

export interface HourlyData {
  time: string;
  temp: number;
  condition: string;
  icon: string;
}

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const getForecast = async (city: string): Promise<{
  weekly: ForecastDay[];
  hourly: HourlyData[];
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Forecast not available");
    }

    const data = await response.json();
    
    // Process daily forecast (next 7 days)
    const dailyData: { [key: string]: any } = {};
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString("en-US", { weekday: "short" });
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          temps: [],
          conditions: item.weather[0].main,
          icon: item.weather[0].icon,
        };
      }
      dailyData[dayKey].temps.push(item.main.temp);
    });

    const weekly = Object.keys(dailyData).slice(0, 7).map((day) => ({
      day,
      condition: dailyData[day].conditions,
      high: Math.max(...dailyData[day].temps),
      low: Math.min(...dailyData[day].temps),
      icon: dailyData[day].icon,
    }));

    // Process hourly forecast (next 24 hours)
    const hourly = data.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      temp: item.main.temp,
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
    }));

    return { weekly, hourly };
  } catch (error) {
    throw new Error("Failed to fetch forecast data");
  }
};
