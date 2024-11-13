import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { getUserByEmail } from "../Functions/UserRequests";

const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    checkIfUserExists();
  }, [auth.user?.id_token]);

  async function checkIfUserExists() {
    if (auth.user && auth.user.id_token) {
      const data = await callAuthEndpoint(auth.user.id_token);
      //get user by email(data)
      console.log(data)
      //if user does not exist, add them to the database
    }
  }

  return <div>Welcome Home</div>;
};

export default Home;
