import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { AddUser, getUserByEmail } from "../Functions/UserRequests";
import { UserDTO } from "../Data/DTOs/userDTO";

const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    checkIfUserExists();
  }, [auth.user?.id_token]);

  async function checkIfUserExists() {
    if (auth.user && auth.user.id_token) {
      const data = await callAuthEndpoint(auth.user.id_token);
      //get user by email(data)
      const currUser = await getUserByEmail(data)
      if(!currUser)
      {
        const newUser: UserDTO = {
          email: data,
          name: data,
          biography: "",
          roleid: 1
        }
        AddUser(newUser);
      }
      //if user does not exist, add them to the database
    }
  }

  return <div>Welcome Home</div>;
};

export default Home;
