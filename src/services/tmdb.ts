import { tmdbClient } from "./tmdb-client";
import type { TMDBMovie, TMDBMovieDetail } from "@/types/movie";

export const tmdbService = {
  getPopular: (page = 1) =>
    tmdbClient.get<{ results: TMDBMovie[]; total_pages: number }>(
      "/movie/popular",
      { params: { page, language: "es-PE" } }
    ),

  search: (query: string, page = 1) =>
    tmdbClient.get<{ results: TMDBMovie[]; total_pages: number }>(
      "/search/movie",
      { params: { query, page, language: "es-PE" } }
    ),

  getDetail: (id: string) =>
    tmdbClient.get<TMDBMovieDetail>(`/movie/${id}`, {
      params: { language: "es-PE", append_to_response: "credits,videos" },
    }),
};