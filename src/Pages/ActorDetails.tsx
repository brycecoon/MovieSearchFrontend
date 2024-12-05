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
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Actor's Image */}
            <div className="w-full md:w-1/3">
              <img
                src={`${imageBaseUrl}${actor?.profile_path}`}
                alt={actor?.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Actor's Details */}
            <div className="w-full md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {actor?.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                <strong>Known For:</strong> {actor?.known_for_department}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Biography:
                </h2>
                <p className="text-gray-600 text-sm leading-6">
                  {actor?.biography || "No biography available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActorDetails;
