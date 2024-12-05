import {
  useAllGenres,
  useMovieByGenre,
  useMovieByPage,
  useSearchByName,
} from "../Functions/Queries/MovieHooks";
import { useState } from "react";
import MovieCard from "../Components/MovieCard";

const AllMovies = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [currGenre, setCurrGenre] = useState<number>(1);
  const [searching, setSearching] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [movieToSearch, setMovieToSearch] = useState<string>("a");
  const { data: MoviesByPage, isLoading: isLoadingMoviesByPage } =
    useMovieByPage(currPage);
  const { data: GenreMovies, isLoading: isLoadingGenreMovies } =
    useMovieByGenre(currGenre, currPage);
  const { data: searchResults, isLoading: isLoadingSearchResults } =
    useSearchByName(movieToSearch, currPage);
  const { data: Genres, isLoading: isLoadingGenres } = useAllGenres();

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
    setMovieToSearch(inputValue);
    setSearching(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  if (
    isLoadingMoviesByPage ||
    isLoadingGenreMovies ||
    isLoadingGenres ||
    isLoadingSearchResults
  ) {
    return <div>Loading...</div>;
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
              <input
                className="bg-transparent outline-none flex-1 px-2"
                placeholder="Search Movie"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
              >
                Search
              </button>
            </form>
            <div className="relative">
              <select
                onChange={(e) => changeSelect(Number(e.target.value))}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow focus:ring focus:ring-blue-200"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searching
              ? searchResults?.map((m) => <MovieCard key={m.id} movie={m} />)
              : (GenreMovies?.length ? GenreMovies : MoviesByPage)?.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => pageChange(-1)}
          >
            Previous Page
          </button>
          <div className="text-lg font-semibold">Current Page: {currPage}</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
