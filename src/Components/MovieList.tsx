import { FC, useState } from "react";
import { SingleMovieDetails } from "../Data/Interfaces/SingleMovie";
import { Movie } from "../Data/Interfaces/Movie";
import { useDeleteListMovie } from "../Functions/Queries/listMovieHooks";
import { List } from "../Data/Interfaces/List";
import { useMovieListByListId } from "../Functions/Queries/MovieHooks";
import CollectionMovieCard from "./CollectionMovieCard";
import { useNavigate } from "react-router-dom";

interface MovieListProps {
  list: List;
}

const transformedMovie = (singleMovie: SingleMovieDetails): Movie => ({
  adult: singleMovie.adult,
  backdrop_path: singleMovie.backdrop_path,
  genre_ids: singleMovie.genres.map((genre) => genre.id),
  id: singleMovie.id,
  original_language: singleMovie.original_language,
  original_title: singleMovie.original_title,
  overview: singleMovie.overview,
  popularity: singleMovie.popularity,
  poster_path: singleMovie.poster_path,
  release_date: singleMovie.release_date,
  title: singleMovie.title,
  video: singleMovie.video,
  vote_average: singleMovie.vote_average,
  vote_count: singleMovie.vote_count,
});

const MovieList: FC<MovieListProps> = ({ list }) => {
  const [deletedMovieId, setdeletedMovieId] = useState<number>(0);
  const { data: MovieList, isLoading: MovieListLoading } = useMovieListByListId(
    list.id
  );
  const deleteListMovie = useDeleteListMovie(list.id, deletedMovieId);
  const navigate = useNavigate();

  const deleteFromList = (movieId: number) => {
    setdeletedMovieId(movieId);
    deleteListMovie.mutate();
  };

  if (MovieListLoading) {
    return <div className="text-center text-lg font-semibold">...Loading</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MovieList?.map((movie) => {
          const displayMovie = transformedMovie(movie);
          return (
            <div
              className="relative flex flex-col items-center space-y-4 rounded-lg "
              key={movie.id || `movie-${movie.id}`}
            >
              <CollectionMovieCard movie={displayMovie} />
              {movie && (
                <i
                  className="absolute top-[-15px] right-[0px] bg-gray-300 bg-opacity-80 p-2 rounded-full bi bi-trash hover:cursor-pointer hover:scale-110 text-red-800"
                  onClick={() => deleteFromList(movie.id)}
                ></i>
              )}
            </div>
          );
        })}{" "}
        {/* Close the map function here */}
        <div className="text-center text-lg font-semibold flex justify-center col-span-2">
          <p>
            Find Movies to Add{" "}
            <a
              className="hover:cursor-pointer text-blue-600 hover:text-blue-300 hover:bg-gray-600 transition-all bg-gray-200 p-1 rounded-lg"
              onClick={() => navigate(`/allMovies`)}
            >
              Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
