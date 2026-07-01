import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { tmdbService } from "@/services/tmdb";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/page-container";
import MovieCard from "@/components/movies/movie-card";

export function MoviesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Debounce: espera 300ms después de que el usuario deja de escribir
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () =>
      query
        ? tmdbService.search(query, page).then((res) => res.data)
        : tmdbService.getPopular(page).then((res) => res.data),
  });

  return (
    <PageContainer>
      <header className="my-8">
        <h1 className="text-3xl font-bold">Movies</h1>

        <Input
          placeholder="Buscar película..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mt-4 h-10 max-w-sm"
        />
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

      {data && data.results.length === 0 && (
        <p className="text-muted-foreground">
          No se encontraron resultados para "{query}".
        </p>
      )}

      {data && data.results.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>

            <span className="text-sm text-muted-foreground">
              Página {page} de {data.total_pages}
            </span>

            <Button
              variant="outline"
              disabled={page >= data.total_pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}
    </PageContainer>
  );
}