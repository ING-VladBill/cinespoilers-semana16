import { useQuery } from "@tanstack/react-query";

import { tmdbService } from "@/services/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

import MovieCard from "./movie-card";

const MoviesGrid = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => tmdbService.getPopular().then((res) => res.data.results),
  });

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Featured Movies</h2>

        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          No pudimos cargar las películas. Intenta de nuevo más tarde.
        </p>
      )}

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-2/3 w-full" />
          ))}
        </div>
      )}

      {data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MoviesGrid;