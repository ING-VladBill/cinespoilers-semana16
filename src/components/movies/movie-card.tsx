import { Link } from "react-router-dom";

import type { TMDBMovie } from "@/types/movie";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

interface Props {
  movie: TMDBMovie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <article className="overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/60">
        <div className="relative">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_URL}${movie.poster_path}`
                : "https://placehold.co/500x750?text=Sin+poster"
            }
            alt={movie.title}
            className="aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <span className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <div className="border-t border-dashed border-border p-4">
          <h3 className="truncate font-medium text-foreground">
            {movie.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {movie.overview}
          </p>

          <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:underline">
            View details →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;