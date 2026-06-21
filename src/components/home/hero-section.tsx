import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-medium text-blue-600">
          Cinema Experience
        </span>

        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
          Discover your next movie.
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Browse movies, explore details and prepare
          your next cinema experience with CineSpoilerS.
        </p>

        <div className="mt-10">
          <Link
            to="/movies"
            className="
              inline-flex
              items-center
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition-colors
              hover:bg-blue-700
            "
          >
            Explore Movies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
