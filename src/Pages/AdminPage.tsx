import React, { useEffect } from "react";
import { useAllUsers } from "../Functions/Queries/UserHooks";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";

const AdminPage = () => {
  const { data: users } = useAllUsers();

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
        const isAuthorized = await checkIfAuthorized();
        if (isAuthorized) {
          navigate("/");
        }
      };

      checkAuthorization();
  }, [auth.user?.id_token]);

  const checkIfAuthorized = async (): Promise<boolean> => {
    if (auth.user?.id_token) {
        const data = await callAuthEndpoint(auth.user.id_token);
        const currUser = users?.find((u) => u.email === data.email);

        console.log("currUser is", currUser);

        // Check if currUser exists and has a roleId of 2
        if (currUser && currUser.roleid === 2) {
            return true; // Authorized
        } else {
            return false; // Not authorized
        }
    }
    return false; // No token, so not authorized
};

  return (
    <>
      <div>AdminPage</div>
      <div>Number of users is: {users?.length || 0}</div>
    </>
  );
};

export default AdminPage;
