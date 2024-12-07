import { useParams } from "react-router-dom";
import { useGetActorById } from "../Functions/Queries/ActorHooks";

const ActorDetails = () => {
  const { id } = useParams();
  const { data: actor, isLoading } = useGetActorById(Number(id));
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">...Loading</p>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
      <div className="min-h-screen bg-gray-800 py-10 rounded-lg">
        <div className="mx-auto px-6 max-w-screen-xl">
          <div className="text-gray-900 bg-gray-200 rounded-lg shadow-lg p-3 shadow-gray-500">
            {/* Actor's Details */}
            <div className="w-full p-6">
              <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
                {actor?.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 text-lg justify-center items-center">
                <p>
                  <strong className="text-gray-800">Known For:</strong>{" "}
                  {actor?.known_for_department}
                </p>
                <p>
                  <strong className="text-gray-800">Popularity:</strong>{" "}
                  {actor?.popularity}
                </p>
                <p>
                  <strong className="text-gray-800">Birthday:</strong>{" "}
                  {actor?.birthday || "Unknown"}
                </p>
                <p>
                  <strong className="text-gray-800">Place of Birth:</strong>{" "}
                  {actor?.place_of_birth || "Unknown"}
                </p>
                <p>
                  <strong className="text-gray-800">Deathday:</strong>{" "}
                  {actor?.deathday || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-800">HomePage:</strong>{" "}
                  {actor?.homepage || "N/A"}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Actor's Image */}
                <div className="w-full flex justify-center">
                  <img
                    src={`${imageBaseUrl}${actor?.profile_path}`}
                    alt={actor?.name}
                    className="sm:w-64 md:w-96 lg:w-auto object-cover rounded-lg shadow-xl"
                  />
                </div>

                {/* Biography Section */}
                <div className="w-full flex justify-center items-center">
                  <div className="w-full max-w-[700px]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                      Biography:
                    </h2>
                    <p className="text-gray-200 bg-gray-800 rounded-lg p-3 text-md leading-6 overflow-y-auto">
                      {actor?.biography || "No biography available."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActorDetails;
