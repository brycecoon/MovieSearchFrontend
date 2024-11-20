import { FC, useState } from "react";
import { useGetListOfMovies } from "../Functions/Queries/MovieHooks";
import MovieCard from "./MovieCard";
import { SingleMovieDetails } from "../Data/Interfaces/SingleMovie";
import { Movie } from "../Data/Interfaces/Movie";
import {
  useAllListMovies,
  useDeleteListMovie,
} from "../Functions/Queries/listMovieHooks";
import { List } from "../Data/Interfaces/List";
import { useDeleteList, useEditList } from "../Functions/Queries/ListHooks";

interface MovieListProps {
  listId: number;
}

const transformedMovie = (singleMovie: SingleMovieDetails): Movie => ({
  adult: singleMovie.adult,
  backdrop_path: singleMovie.backdrop_path,
  genre_ids: singleMovie.genres.map((genre) => genre.id), // Assuming you need the genre IDs
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

const MovieList: FC<MovieListProps> = ({ listId }) => {
  const { data: listOfMovies, isLoading } = useGetListOfMovies(listId); // List of movie details
  const { data: listMovies } = useAllListMovies(); // List of listMovies
  const deleteListMovie = useDeleteListMovie();
  const updateList = useEditList();
  const deleteList = useDeleteList();
  const [updatedListName, setUpdatedListName] = useState<string | undefined>(
    undefined
  );

  const deleteFromList = (id: number) => {
    deleteListMovie.mutate(id);
  };

  const deleteWholeList = (id: number) => {
    deleteList.mutate(id);
  };

  const updateListName = () => {
    if (updatedListName) {
      const updatedList: List = {
        id: listId,
        name: updatedListName,
        userid: 18,
      };
      updateList.mutate(updatedList);
      setUpdatedListName("")
    }

  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
              <input
        type="text"
        placeholder="New List Name"
        onChange={(e) => setUpdatedListName(e.target.value)}
      />
      <button className="bg-green-300 text-green-700" onClick={updateListName}>
        Update A Name
      </button><br/>
      <button
        className="bg-green-300 text-green-700"
        onClick={() => deleteWholeList(listId)}
      >
        Delete Whole List
      </button>
      {listOfMovies?.map((movie) => {
        const displayMovie = transformedMovie(movie);
        const currListMovie = listMovies?.find(
          (lm) => lm.movieId === movie.id && lm.listId === listId
        );

        return (
          <div key={currListMovie?.id || `movie-${movie.id}`}>
            <MovieCard movie={displayMovie} />
            {currListMovie && (
              <button
                className="bg-green-300 text-green-700"
                onClick={() => deleteFromList(currListMovie?.id)}
              >
                Delete this movie
              </button>
            )}
          </div>
        );
      })}

    </div>
  );
};

export default MovieList;
