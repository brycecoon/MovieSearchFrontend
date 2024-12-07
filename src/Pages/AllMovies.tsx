import {
  useAllGenres,
  useMovieByGenre,
  useMovieByPage,
  useSearchByName,
} from "../Functions/Queries/MovieHooks";
import { useState } from "react";
import CollectionMovieCard from "../Components/CollectionMovieCard";
import MoviesLoadingSkeleton from "../Components/LoadingSkeletons/MoviesLoadingSkeleton";
import { useGTextInput } from "../Components/Generics/gTextInput";
import GTextInput from "../Components/Generics/gTextInputController";

const AllMovies = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [currGenre, setCurrGenre] = useState<number>(1);
  const [searching, setSearching] = useState<boolean>(false);
  const { value, setValue } = useGTextInput();
  const [movieToSearch, setMovieToSearch] = useState<string>("a");
  const {
    data: MoviesByPage,
    isLoading: isLoadingMoviesByPage,
    isError: moviesError,
    error,
  } = useMovieByPage(currPage);
  const {
    data: GenreMovies,
    isLoading: isLoadingGenreMovies,
    isError: genreError,
  } = useMovieByGenre(currGenre, currPage);
  const {
    data: searchResults,
    isLoading: isLoadingSearchResults,
    isError: nameError,
  } = useSearchByName(movieToSearch, currPage);
  const {
    data: Genres,
    isLoading: isLoadingGenres,
    isError: allGenresError,
  } = useAllGenres();

  const pageChange = (changeNum: number) => {
    if (currPage + changeNum > 0) {
      setCurrPage((prevPage) => prevPage + changeNum);
    }
  };

  const changeSelect = (genreId: number) => {
    setCurrGenre(genreId);
    setSearching(false);
    setCurrPage(1);
  };

  const searchForMovie = (event: React.FormEvent) => {
    event.preventDefault();
    setMovieToSearch(value);
    setSearching(true);
  };

  if (
    isLoadingMoviesByPage ||
    isLoadingGenreMovies ||
    isLoadingGenres ||
    isLoadingSearchResults
  ) {
    <MoviesLoadingSkeleton />;
  }
  if (moviesError || genreError || nameError || allGenresError) {
    throw error;
  }

  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
        <h1 className="text-4xl font-extrabold tracking-wide mb-4 animate-fade-in">
          Search All Movies
        </h1>
        <div className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
            <form
              onSubmit={searchForMovie}
              className="flex items-center bg-gray-100 rounded-lg px-4 py-2 shadow"
            >
              <GTextInput
                placeHolder="Search Movie"
                className="bg-transparent outline-none flex-1 px-2 text-gray-800"
                control={{ value, setValue }}
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Search
              </button>
            </form>
            <div className="relative">
              <select
                onChange={(e) => changeSelect(Number(e.target.value))}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow focus:ring focus:ring-blue-200 hover:cursor-pointer text-gray-800"
              >
                <option value="">Select Genre</option>
                {Genres?.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
            {searching
              ? searchResults?.map((m) => (
                  <CollectionMovieCard key={m.id} movie={m} />
                ))
              : (GenreMovies?.length ? GenreMovies : MoviesByPage)?.map((m) => (
                  <CollectionMovieCard key={m.id} movie={m} />
                ))}
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
          <button
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            onClick={() => pageChange(-1)}
          >
            Previous Page
          </button>
          <div className="text-lg font-semibold mx-6">Page: {currPage}</div>
          <button
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            onClick={() => pageChange(1)}
          >
            Next Page
          </button>
        </div>
      </section>
    </>
  );
};

export default AllMovies;
