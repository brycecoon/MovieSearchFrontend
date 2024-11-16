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
      <button onClick={() => pageChange(-1)}>Decrease Page</button>
      <button onClick={() => pageChange(1)}>Increase Page</button>
      <form onSubmit={searchForMovie}>
        <input
          placeholder="Search Movie"
          value={inputValue}
          onChange={handleInputChange}
        />{" "}
      </form>
      <div>
        <select onChange={(e) => changeSelect(Number(e.target.value))}>
          {Genres?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div>Current Page:{currPage}</div>
      <div>
        {searching
          ? searchResults?.map((m) => {
              return <MovieCard key={m.id} movie={m} />;
            })
          : (GenreMovies?.length ? GenreMovies : MoviesByPage)?.map((m) => {
              return <MovieCard key={m.id} movie={m} />;
            })}
      </div>
    </>
  );
};

export default AllMovies;
