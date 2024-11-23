import { FC, useState } from "react";
// import { useGetListOfMovies } from "../Functions/Queries/MovieHooks";
import MovieCard from "./MovieCard";
import { SingleMovieDetails } from "../Data/Interfaces/SingleMovie";
import { Movie } from "../Data/Interfaces/Movie";
import { useDeleteListMovie } from "../Functions/Queries/listMovieHooks";
import { List } from "../Data/Interfaces/List";
import { useDeleteList, useEditList } from "../Functions/Queries/ListHooks";
import { useMovieListByListId } from "../Functions/Queries/MovieHooks";

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
  const updateList = useEditList();
  const deleteList = useDeleteList();
  const [updatedListName, setUpdatedListName] = useState<string | undefined>(
    undefined
  );

  const deleteFromList = (movieId: number) => {
    setdeletedMovieId(movieId);
    deleteListMovie.mutate();
  };

  const deleteWholeList = (id: number) => {
    deleteList.mutate(id);
  };

  const updateListName = () => {
    if (updatedListName) {
      const updatedList: List = {
        id: list.id,
        name: updatedListName,
        userid: 18,
      };
      updateList.mutate(updatedList);
      setUpdatedListName("");
    }
  };

  if (MovieListLoading) {
    return <div className="text-center text-lg font-semibold">...Loading</div>;
  }


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="New List Name"
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
          onChange={(e) => setUpdatedListName(e.target.value)}
          value={updatedListName}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={updateListName}
        >
          Update List Name
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => deleteWholeList(list.id)}
        >
          Delete Whole List
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MovieList?.length === 0 ? (
          <div className="text-center text-lg font-semibold">
            No movies found.
          </div>
        ) : (
          MovieList?.map((movie) => {
            const displayMovie = transformedMovie(movie);
            return (
              <div
                className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg shadow-md"
                key={movie.id || `movie-${movie.id}`}
              >
                <MovieCard movie={displayMovie} />
                {movie && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => deleteFromList(movie.id)}
                  >
                    Delete this movie
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MovieList;
