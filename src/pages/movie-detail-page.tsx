import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { tmdbService } from "@/services/tmdb";
import { useCartStore } from "@/store/cart-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/page-container";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => tmdbService.getDetail(movieId!).then((res) => res.data),
    enabled: !!movieId,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <Skeleton className="h-80 w-full mb-6" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <p className="text-sm text-destructive">
          No pudimos cargar esta película.
        </p>
      </PageContainer>
    );
  }

  const trailer = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  const handleAddToCart = () => {
    addItem(movie);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      {movie.backdrop_path && (
        <div
          className="h-72 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})`,
          }}
        />
      )}

      <PageContainer>
        <div className="flex flex-col gap-6 md:flex-row md:-mt-24">
          {movie.poster_path && (
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-48 shrink-0 rounded-lg shadow-lg"
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}

              <span className="text-sm text-muted-foreground">
                {movie.runtime} min
              </span>

              <span className="text-sm font-medium">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <p className="mt-4 text-muted-foreground">{movie.overview}</p>

            <Button className="mt-6" onClick={handleAddToCart} disabled={added}>
              {added ? "Agregado ✓" : "Comprar"}
            </Button>
          </div>
        </div>

        {movie.credits.cast.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Reparto</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {movie.credits.cast.slice(0, 8).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_URL}${actor.profile_path}`
                        : "https://placehold.co/200x300?text=Sin+foto"
                    }
                    alt={actor.name}
                    className="aspect-2/3 w-full rounded-md object-cover"
                  />
                  <p className="mt-2 text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {trailer && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Trailer</h2>

            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}
      </PageContainer>
    </>
  );
}