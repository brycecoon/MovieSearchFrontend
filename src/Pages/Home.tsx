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
    <>
      <div>
        {Movies?.map((m) => {
          return <MovieCard movie={m}/>;
        })}
      </div>
    </>
  );
};

export default Home;
