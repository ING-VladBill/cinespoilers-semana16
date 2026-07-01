import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { tmdbService } from "@/services/tmdb";
import { MarqueeLights } from "@/components/ui/marquee-lights";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const HeroSection = () => {
  const { data: movies } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => tmdbService.getPopular().then((res) => res.data.results),
  });

  const mosaic = movies?.filter((m) => m.poster_path).slice(0, 12) ?? [];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 gap-1 opacity-25">
        {mosaic.map((movie) => (
          <img
            key={movie.id}
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />

      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Now Showing
        </span>

        <h1 className="font-marquee mt-5 text-6xl leading-none tracking-wide text-foreground md:text-8xl">
          Your next
          <br />
          night at the movies
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
          Browse the marquee, read the reviews, and reserve your seat —
          all before the lights go down.
        </p>

        <div className="mt-10">
          <Link
            to="/movies"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See what's playing
          </Link>
        </div>

        <MarqueeLights className="mt-14" />
      </div>
    </section>
  );
};

export default HeroSection;