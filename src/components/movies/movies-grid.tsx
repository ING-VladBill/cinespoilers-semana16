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
    <section className="py-16">
      <header className="mb-10 border-b border-border pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Now Playing
        </span>

        <h2 className="font-marquee mt-2 text-4xl tracking-wide">
          Featured Movies
        </h2>
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