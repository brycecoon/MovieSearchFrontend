import { FC } from "react";
import { Movie } from "../Data/Interfaces/Movie";
import { useNavigate } from "react-router-dom";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  if (movie.vote_count < 10 || movie.popularity < 2 || !movie.poster_path || !movie.title) {
    return null;
  }

  return (
    <div
    className="max-w-sm h-[450px] flex flex-col rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    onClick={() => navigate(`/movieDetails/${movie.id}`)}
  >
    {/* Movie Poster */}
    <div className="">
      <img
        src={`${imageBaseUrl}/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
    </div>
  
    {/* Movie Info */}
    <div className="flex-grow px-4 bg-gray-400 flex flex-col">
      {/* Title */}
      <h2 className="font-bold text-xl text-gray-800 truncate pb-5 pt-3 font-extrabold">
        {movie.title}
      </h2>
  
      {/* Release Date */}
      <p className="text-gray-600 text-sm">{movie.release_date}</p>
  
      {/* Popularity and Rating */}
      <div className="flex justify-between mt-1">
        <span className="text-gray-700 text-sm">
          <strong>Popularity:</strong> {movie.popularity}
        </span>
        <span className="text-gray-700 text-sm">
          <strong>Rating:</strong> {movie.vote_average}
        </span>
      </div>
  
      {/* Votes */}
      <div className="mt-1 text-gray-700 text-sm">
        <strong>Votes:</strong> {movie.vote_count}
      </div>
    </div>
  </div>  
  );
};

export default MovieCard;
