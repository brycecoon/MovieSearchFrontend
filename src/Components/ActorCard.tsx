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
      className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mb-8"
      onClick={() => navigate(`/actorDetails/${actor.id}`)}
    >
      <div className="flex justify-center text-3xl mb-1">{actor.name}</div>
      <img
        src={`${imageBaseUrl}${actor.profile_path}`}
        alt={actor.name}
        className="rounded-lg"
      />
    </div>
  );
};

export default ActorCard;
