import { FC } from "react";
import { Movie } from "../Data/Interfaces/Movie";
import { useNavigate } from "react-router-dom";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

interface CollectionMovieCardProps {
  movie: Movie;
}

const CollectionMovieCard: FC<CollectionMovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  if (movie.vote_count < 10 || movie.popularity < 2 || !movie.poster_path || !movie.title) {
    return null;
  }

  return (
    <div
      className="relative max-w-sm w-full rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mb-4"
      onClick={() => navigate(`/movieDetails/${movie.id}`)}
    >
        <img
          src={`${imageBaseUrl}/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover md:min-h-80"
        />
    </div>
  );
};

export default CollectionMovieCard;
