import { useAllMoviesNowPlaying } from "../Functions/Queries/MovieHooks";
import MovieCard from "../Components/MovieCard";

const InTheatres = () => {
  const { data: Movies } = useAllMoviesNowPlaying();
  return (
    <>
      <div className="grid grid-cols-3">
      {Movies?.map((m) => {
          return <MovieCard key={m.id} movie={m} />;
        })}
      </div>
    </>
  );
};

export default InTheatres;
