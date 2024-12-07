import { FC, useState } from "react";
import { SingleMovieDetails } from "../Data/Interfaces/SingleMovie";
import { Movie } from "../Data/Interfaces/Movie";
import { useDeleteListMovie } from "../Functions/Queries/listMovieHooks";
import { List } from "../Data/Interfaces/List";
import { useMovieListByListId } from "../Functions/Queries/MovieHooks";
import CollectionMovieCard from "./CollectionMovieCard";
import { useNavigate } from "react-router-dom";
import plusSign from "../assets/plusSign.svg";

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
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {MovieList?.map((movie) => {
          const displayMovie = transformedMovie(movie);
          return (
            <div
              className="relative flex flex-col items-end space-y-4 rounded-lg"
              key={movie.id || `movie-${movie.id}`}
            >
              <CollectionMovieCard movie={displayMovie} />
              {movie && (
                <i
                  className="absolute top-[-10px] right-[5px] bg-gray-300 bg-opacity-80 p-2 rounded-full bi bi-trash hover:cursor-pointer hover:scale-110 text-red-800"
                  onClick={() => deleteFromList(movie.id)}
                ></i>
              )}
            </div>
          );
        })}{" "}
        <div
          className="max-w-sm w-full rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer mb-4 "
          onClick={() => navigate(`/allMovies`)}
        >
          <div className="relative w-full h-full bg-gray-400 opacity-30 bg-opacity-90 flex items-center justify-center rounded-lg overflow-hidden border-4 border-slate-800">
            <img src={plusSign} className="text-slate-800 w-24 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
