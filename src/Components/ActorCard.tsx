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
    <div className="mb-8">
      <div className="flex justify-center text-3xl mb-1">{actor.name}</div>
      <div
        className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        onClick={() => navigate(`/actorDetails/${actor.id}`)} // Assuming you have a route for actor details
      >
        <img
          src={`${imageBaseUrl}${actor.profile_path}`}
          alt={actor.name}
          className="w-full h-72 object-cover"
        />
      </div>
    </div>
  );
};

export default ActorCard;
