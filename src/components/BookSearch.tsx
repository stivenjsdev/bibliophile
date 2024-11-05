import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookFilters, BookStatus } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

type BookSearchProps = {
  filters: BookFilters;
  onFilterChange: (
    key: keyof BookFilters,
    value: string | number | null
  ) => void;
  onSearch: () => void;
  uniqueGenres: string[];
  autoFocus?: boolean;
};

export const BookSearch = ({
  filters,
  onFilterChange,
  onSearch,
  uniqueGenres,
  autoFocus = false,
}: BookSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1 w-full md:w-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar por título o autor..."
          value={filters.title || ""}
          onChange={(e) => onFilterChange("title", e.target.value)}
          className="w-full pl-8"
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
        <Select
          value={filters.status?.toString() || "all"}
          onValueChange={(value) =>
            onFilterChange("status", value === "all" ? null : Number(value))
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value={BookStatus.TO_READ.toString()}>
              Por leer
            </SelectItem>
            <SelectItem value={BookStatus.READING.toString()}>
              Leyendo
            </SelectItem>
            <SelectItem value={BookStatus.READ.toString()}>Leído</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.genre || "all"}
          onValueChange={(value) =>
            onFilterChange("genre", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los géneros</SelectItem>
            {uniqueGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSearch}>Buscar</Button>
    </div>
  );
};
