import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FavoriteLocationsProps {
  currentCity: string;
  onSelectCity: (city: string) => void;
}

export const FavoriteLocations = ({ currentCity, onSelectCity }: FavoriteLocationsProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("favoriteLocations");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFavorites(parsed);
      setIsFavorite(parsed.includes(currentCity));
    }
  }, [currentCity]);

  const toggleFavorite = () => {
    let newFavorites: string[];
    
    if (isFavorite) {
      newFavorites = favorites.filter((city) => city !== currentCity);
      toast({
        title: "Removed from favorites",
        description: `${currentCity} has been removed from your favorites.`,
      });
    } else {
      newFavorites = [...favorites, currentCity];
      toast({
        title: "Added to favorites",
        description: `${currentCity} has been added to your favorites.`,
      });
    }
    
    setFavorites(newFavorites);
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteLocations", JSON.stringify(newFavorites));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={toggleFavorite}
          variant={isFavorite ? "default" : "outline"}
          className="gap-2"
        >
          <Star className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Saved" : "Save Location"}
        </Button>
      </div>

      {favorites.length > 0 && (
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Favorite Locations</h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map((city) => (
              <Button
                key={city}
                onClick={() => onSelectCity(city)}
                variant="secondary"
                size="sm"
                className="gap-2"
              >
                <Star className="h-3 w-3 fill-current" />
                {city}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
