import React, { useEffect, useState } from "react";
import { useAllUsers } from "../Functions/Queries/UserHooks";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { User } from "../Data/Interfaces/User";

const AdminPage = () => {
  const { data: users } = useAllUsers();
  const [currUser, setCurrUser] = useState<User>();
  const [currUserEmail, setCurrUserEmail] = useState<string>();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
        const isAuthorized = await checkIfAuthorized();
        if (!isAuthorized) {
          navigate("/");
        }
      };

      checkAuthorization();
  }, [auth.user?.id_token]);

  const checkIfAuthorized = async (): Promise<boolean> => {
    if (auth.user && auth.user.id_token) {
        const data = await callAuthEndpoint(auth.user.id_token);

        // Find the current user based on the fetched email
        const currUser = users?.find((u) => u.email === data.email);
        setCurrUser(currUser);
        console.log("currUser is", currUser);

        if (currUser && currUser.roleid === 2) {
            return true; 
        } else {
            return false; 
        }
    }
    return false;
};

  return (
    <>
      <div>AdminPage</div>
      <div>Number of users is: {users?.length || 0}</div>
    </>
  );
};

export default AdminPage;
