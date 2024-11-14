import { useMovieByPage } from "../Functions/Queries/MovieHooks";
import { useState } from "react";
import MovieCard from "../Components/MovieCard";

const AllMovies = () => {
  const [currPage, setCurrPage] = useState<number>(3);
  const { data: Movies } = useMovieByPage(currPage);

  const pageChange = (changeNum: number) => {
    if (currPage + changeNum > 0) {
      setCurrPage((prevPage) => prevPage + changeNum);
    }
  };

  return (
    <>
      <button onClick={() => pageChange(-1)}>Decrease Page</button>
      <button onClick={() => pageChange(1)}>Increase Page</button>
      <div>
        {Movies?.map((m) => {
          return <MovieCard key={m.id} movie={m} />;
        })}
      </div>
    </>
  );
};

export default AllMovies;
