import { useParams } from "react-router-dom";
import { useGetActorById } from "../Functions/Queries/ActorHooks";
import { Movie } from "../Data/Interfaces/Movie";

const ActorDetails = () => {
    const {id} = useParams();
  const {data: actor, isLoading} = useGetActorById(Number(id));
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  if(isLoading)
  {
    return <div>...Loading</div>
  }

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Actor Profile Picture */}
      <img
        src={`${imageBaseUrl}${actor?.profile_path}`}
        alt={actor?.name}
        className="w-full h-72 object-cover"
      />

      {/* Actor Info */}
      <div className="px-4 py-3">
        {/* Name */}
        <h2 className="font-bold text-lg text-gray-800 truncate">
          {actor?.name}
        </h2>

        {/* Known For */}
        <p className="text-gray-600 text-sm">
          <strong>Known For:</strong> {actor?.known_for_department}
        </p>

        {/* Popularity */}
        <div className="flex justify-between mt-3">
          <span className="text-gray-700 text-sm">
            <strong>Popularity:</strong> {actor?.popularity}
          </span>
        </div>

        {/* Known For Movies */}
        <div className="mt-3 text-gray-700 text-sm">
          <strong>Popular Titles:</strong>
          <ul className="list-disc pl-5">
            {actor?.biography}
          </ul>
        </div>
      </div>
    </div>  )
}

export default ActorDetails