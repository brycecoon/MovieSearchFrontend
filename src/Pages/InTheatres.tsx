import React from "react";
import { useAllMoviesNowPlaying } from "../Functions/Queries/MovieHooks";
import MovieCard from "../Components/MovieCard";

const InTheatres = () => {
  const { data: Movies } = useAllMoviesNowPlaying();
  return (
    <>
      <div>
        {Movies?.map((m) => {
          return <MovieCard key={m.id} movie={m} />;
        })}
      </div>
    </>
  );
};

export default InTheatres;
