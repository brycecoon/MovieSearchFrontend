import { useParams } from "react-router-dom";
import { useGetSingleMovie } from "../Functions/Queries/MovieHooks";
import { useAddListMovie } from "../Functions/Queries/listMovieHooks";
import { ListMovieDTO } from "../Data/DTOs/listMovieDTO";
import { useAllLists } from "../Functions/Queries/ListHooks";
import { useState } from "react";

const MovieDetails = () => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
  const { id } = useParams();
  const { data: singleMovie } = useGetSingleMovie(Number(id));
  const addListMovie = useAddListMovie();
  const { data: Lists } = useAllLists();
  const [selectedList, setSelectedList] = useState<number | undefined>(undefined);

  const addNewListMovie = () => {
    if (selectedList) {
      const newListMovie: ListMovieDTO = {
        listId: selectedList,
        movieId: Number(id),
      };
      addListMovie.mutate(newListMovie);
    } 
  };
  return (
    <>
      {singleMovie ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <img
            src={`${imageBaseUrl}/${singleMovie.poster_path}`}
            alt={singleMovie.title}
            className="w-full h-72 object-cover"
          />

          <div className="px-4 py-2">
            <h2 className="font-bold text-xl text-gray-800">
              {singleMovie.title}
            </h2>
            <p className="text-gray-600 text-sm">{singleMovie.release_date}</p>
            <div className="flex justify-between mt-2">
              <span className="text-gray-700">
                Popularity: {singleMovie.popularity}
              </span>
              <span className="text-gray-700">
                Rating: {singleMovie.vote_average}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-700">
                Votes: {singleMovie.vote_count}
              </span>
            </div>
          </div>
          <button
            className="bg-black text-white p-2 rounded"
            onClick={addNewListMovie}
          >
            Add To A List
          </button>
          <select
            value={Number(selectedList)}
            onChange={(e) => setSelectedList(Number(e.target.value))}
          >
            <option value={undefined}>Select a list</option>{" "}
            {Lists?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>...Loading</div>
      )}
    </>
  );
};

export default MovieDetails;