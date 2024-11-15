import {
  useAllGenres,
  useMovieByGenre,
  useMovieByPage,
  useSearchByName,
} from "../Functions/Queries/MovieHooks";
import { useState } from "react";
import MovieCard from "../Components/MovieCard";
import { Form } from "react-router-dom";

const AllMovies = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [currGenre, setCurrGenre] = useState<number>(1);
  const [searching, setSearching] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [movieToSearch, setMovieToSearch] = useState<string>("barbie");
  const { data: AllMovies } = useMovieByPage(currPage);
  const { data: GenreMovies } = useMovieByGenre(currGenre, currPage);
  const { data: Genres } = useAllGenres();
  const { data: searchByName } = useSearchByName(movieToSearch, currPage);

  const pageChange = (changeNum: number) => {
    if (currPage + changeNum > 0) {
      setCurrPage((prevPage) => prevPage + changeNum);
    }
  };

  const changeSelect = (genreId: number) => {
    setSearching(true);
    setCurrGenre(genreId);
    setCurrPage(1);
  };

  const searchForMovie = (event: React.FormEvent) => {
    event.preventDefault();
    setMovieToSearch(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state with input value
  };

  return (
    <>
      <button onClick={() => pageChange(-1)}>Decrease Page</button>
      <button onClick={() => pageChange(1)}>Increase Page</button>
      <form onSubmit={searchForMovie}>
        <input
          placeholder="Search Movie"
          value={inputValue}
          onChange={handleInputChange} // Handle input change
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

      <div>On Page:{currPage}</div>
      {/* {searching
        ? GenreMovies?.map((m) => <MovieCard key={m.id} movie={m} />)
        : AllMovies?.map((m) => <MovieCard key={m.id} movie={m} />)} */}
        {searchByName?.map((s)=> <MovieCard key={s.id} movie={s}/>)}
    </>
  );
};

export default AllMovies;
