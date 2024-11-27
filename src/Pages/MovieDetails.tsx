import { useParams } from "react-router-dom";
import { useGetSingleMovie } from "../Functions/Queries/MovieHooks";
import { useAddListMovie } from "../Functions/Queries/listMovieHooks";
import { ListMovieDTO } from "../Data/DTOs/listMovieDTO";
import { useAllLists } from "../Functions/Queries/ListHooks";
import { useState } from "react";

const MovieDetails = () => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const { id } = useParams();
  const { data: singleMovie } = useGetSingleMovie(Number(id));
  const { data: Lists } = useAllLists();
  const [selectedList, setSelectedList] = useState<number>(0);
  const addListMovie = useAddListMovie(selectedList);

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
        <div className="min-h-screen bg-gray-100">
          {/* Header Image */}
          <div className="relative">
            <img
              src={`${imageBaseUrl}${
                singleMovie.backdrop_path || singleMovie.poster_path
              }`}
              alt={singleMovie.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                {singleMovie.title}
              </h1>
            </div>
          </div>

          {/* Movie Details Section */}
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Poster */}
              <div className="flex justify-center">
                <img
                  src={`${imageBaseUrl}${singleMovie.poster_path}`}
                  alt={singleMovie.title}
                  className="w-64 rounded-lg shadow-lg"
                />
              </div>

              {/* Information */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {singleMovie.title}
                </h2>
                <p className="text-gray-600 mb-6">{singleMovie.overview}</p>

                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-bold text-gray-800">
                      Release Date:
                    </span>{" "}
                    {singleMovie.release_date}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Popularity:</span>{" "}
                    {singleMovie.popularity}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Votes:</span>{" "}
                    {singleMovie.vote_count}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Rating:</span>{" "}
                    {singleMovie.vote_average}/10
                  </p>
                </div>
              </div>
            </div>

            {/* Add to List Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add to Your List
              </h3>
              <div className="flex items-center space-x-4">
                <select
                  value={Number(selectedList)}
                  onChange={(e) => setSelectedList(Number(e.target.value))}
                  className="border border-gray-300 p-2 rounded-lg"
                >
                  <option value={undefined}>Select a list</option>
                  {Lists?.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addNewListMovie}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600 text-lg">...Loading</p>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
