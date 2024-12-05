import { FC } from "react";
import { Actor } from "../Data/Interfaces/Actor"; // Make sure this matches your actual interface path
import { useNavigate } from "react-router-dom";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

interface ActorCardProps {
  actor: Actor;
}

const ActorCard: FC<ActorCardProps> = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/actorDetails/${actor.id}`)} // Assuming you have a route for actor details
    >
      {/* Actor Profile Picture */}
      <img
        src={`${imageBaseUrl}${actor.profile_path}`}
        alt={actor.name}
        className="w-full h-72 object-cover"
      />

      {/* Actor Info */}
      <div className="px-4 py-3">
        {/* Name */}
        <h2 className="font-bold text-lg text-gray-800 truncate">
          {actor.name}
        </h2>

        {/* Known For */}
        <p className="text-gray-600 text-sm">
          <strong>Known For:</strong> {actor.known_for_department}
        </p>

        {/* Popularity */}
        <div className="flex justify-between mt-3">
          <span className="text-gray-700 text-sm">
            <strong>Popularity:</strong> {actor.popularity}
          </span>
        </div>

        {/* Known For Movies */}
        <div className="mt-3 text-gray-700 text-sm">
          <strong>Popular Titles:</strong>
          <ul className="list-disc pl-5">
            {actor.known_for.map((movie) =>
              movie.title ? (
                <li key={movie.id} className="text-sm text-gray-600">
                  {movie.title}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
