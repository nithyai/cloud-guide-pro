import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

export const WeatherSearch = ({ onSearch }: WeatherSearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Search city..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="bg-card/50 backdrop-blur-sm border-border/50"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
