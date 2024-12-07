import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { AddUser, getUserByEmail } from "../Functions/UserRequests";
import { UserDTO } from "../Data/DTOs/userDTO";
import { useAllTrendingMovies } from "../Functions/Queries/MovieHooks";
import CollectionMovieCard from "../Components/CollectionMovieCard";
import MoviesLoadingSkeleton from "../Components/LoadingSkeletons/MoviesLoadingSkeleton";

const Home = () => {
  const auth = useAuth();
  const { data: Movies, isLoading, isError, error } = useAllTrendingMovies();

  useEffect(() => {
    checkIfUserExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.id_token]);

  if (isLoading) {
    <MoviesLoadingSkeleton />;
  }
  if (isError) {
    throw error;
  }

  async function checkIfUserExists() {
    if (auth.user && auth.user.id_token) {
      const currUserEmail = await callAuthEndpoint(auth.user.id_token);
      const currUser = await getUserByEmail(currUserEmail);

      if (!currUser) {
        const newUser: UserDTO = {
          email: currUserEmail,
          name: currUserEmail,
          biography: "",
          roleid: 1,
        };
        await AddUser(newUser);
      }
      const savedUser = await getUserByEmail(currUserEmail);
      localStorage.setItem("currentUser", JSON.stringify(savedUser));
    }
  }

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto py-8">
          {/* Intro Section */}
          <section className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-wide mb-4 animate-fade-in">
              Discover Your Next Favorite Movie
            </h1>
            <p className="text-lg font-light text-gray-300">
              Browse through our collection, create custom movie lists, and find
              the perfect movie for any occasion.
            </p>
          </section>

          {/* Movie Grid */}
          <section>
            <h3 className="text-xl font-bold m-4 ">Trending Movies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
              {Movies?.map((m) => (
                <CollectionMovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-600 text-gray-200 py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 MovieSearch. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Home;
