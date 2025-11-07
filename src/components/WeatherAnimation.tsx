interface WeatherAnimationProps {
  condition: string;
}

export const WeatherAnimation = ({ condition }: WeatherAnimationProps) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  if (conditionLower.includes("snow")) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snow-flake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: Math.random() * 0.6 + 0.4,
            }}
          />
        ))}
      </div>
    );
  }
  
  if (conditionLower.includes("cloud")) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              top: `${10 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  return null;
};
