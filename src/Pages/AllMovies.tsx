import { useAllGenres, useMovieByGenre, useMovieByPage } from "../Functions/Queries/MovieHooks";
import { useState } from "react";
import MovieCard from "../Components/MovieCard";

const AllMovies = () => {
  const [currPage, setCurrPage] = useState<number>(3);
  const [currGenre, setCurrGenre] = useState<number>(3);
  const { data: Movies } = useMovieByPage(currPage);
  const { data: GenreMovies } = useMovieByGenre(currGenre, currPage);
  const { data: Genres } = useAllGenres();

  const pageChange = (changeNum: number) => {
    if (currPage + changeNum > 0) {
      setCurrPage((prevPage) => prevPage + changeNum);
    }
  };

  const changeSelect = (genreId: number) => {
    setCurrGenre(genreId)
  }

  return (
    <>
      <button onClick={() => pageChange(-1)}>Decrease Page</button>
      <button onClick={() => pageChange(1)}>Increase Page</button>
      <div>
        <select onChange={(e) => changeSelect(Number(e.target.value))}>
          {Genres?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      {GenreMovies?.map((m) => {
        return <MovieCard key={m.id} movie={m} />;
      })}
    </>
  );
};

export default AllMovies;
