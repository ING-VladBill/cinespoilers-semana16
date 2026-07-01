import { Link } from "react-router-dom";

import type { TMDBMovie } from "@/types/movie";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

interface Props {
  movie: TMDBMovie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : "https://placehold.co/500x750?text=Sin+poster"
          }
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />

        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {movie.overview}
          </p>

          <Link
            to={`/movies/${movie.id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;