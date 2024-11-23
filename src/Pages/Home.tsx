import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { AddUser, getUserByEmail } from "../Functions/UserRequests";
import { UserDTO } from "../Data/DTOs/userDTO";
import MovieCard from "../Components/MovieCard";
import { useAllTrendingMovies } from "../Functions/Queries/MovieHooks";

const Home = () => {
  const auth = useAuth();
  const { data: Movies } = useAllTrendingMovies();

  useEffect(() => {
    checkIfUserExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.id_token]);

  async function checkIfUserExists() {
    if (auth.user && auth.user.id_token) {
      const data = await callAuthEndpoint(auth.user.id_token);
      const currUser = await getUserByEmail(data);
      if (!currUser) {
        const newUser: UserDTO = {
          email: data,
          name: data,
          biography: "",
          roleid: 1,
        };
        AddUser(newUser);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        {/* Intro Section */}
        <section className="mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-gray-700">
            Browse through our collection, create custom movie lists, and find
            the perfect movie for any occasion.
          </p>
        </section>
  
        {/* Movie Grid */}
        <section>
          <h3 className="text-xl font-bold mb-4">Movies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Movies?.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      </main>
  
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MovieSearch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );  
};

export default Home;
