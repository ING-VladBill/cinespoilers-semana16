export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: TMDBCastMember[];
  };
  videos: {
    results: TMDBVideo[];
  };
}