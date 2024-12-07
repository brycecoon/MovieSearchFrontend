import { useAllMoviesNowPlaying } from "../Functions/Queries/MovieHooks";
import CollectionMovieCard from "../Components/CollectionMovieCard";
import MoviesLoadingSkeleton from "../Components/LoadingSkeletons/MoviesLoadingSkeleton";

const InTheatres = () => {
  const { data: Movies, isLoading } = useAllMoviesNowPlaying();

  if(isLoading)
  {
    <MoviesLoadingSkeleton />;
  }

  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-12 py-12">
        {/* Dynamic Banner */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide mb-4 animate-fade-in">
            Lights, Camera, Action! 🎬
          </h1>
          <p className="text-lg font-light text-gray-300">
            Grab your popcorn and check out the latest hits lighting up the big screen!
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-in">
          {Movies?.map((m) => (
            <CollectionMovieCard key={m.id} movie={m} />
          ))}
        </div>

        {/* Decorative Spotlight */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />
      </section>
    </>
  );
};

export default InTheatres;
