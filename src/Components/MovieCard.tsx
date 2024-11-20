import { FC } from "react";
import { Movie } from "../Data/Interfaces/Movie";
import { useNavigate } from "react-router-dom";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          src={`${imageBaseUrl}/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover"
          onClick={() => navigate(`/movieDetails/${movie.id}`)}
        />
        <div className="px-4 py-2">
          <h2 className="font-bold text-xl text-gray-800">{movie.title}</h2>
          <h2 className="font-bold text-xl text-gray-800">{movie.id}</h2>
          <p className="text-gray-600 text-sm">{movie.release_date}</p>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">
              Popularity: {movie.popularity}
            </span>
            <span className="text-gray-700">Rating: {movie.vote_average}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Votes: {movie.vote_count}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
