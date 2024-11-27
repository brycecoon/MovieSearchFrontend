import { useEffect, useState } from "react";
import { useAllUsers } from "../Functions/Queries/UserHooks";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { User } from "../Data/Interfaces/User";

const checkIfAuthorized = async (auth: AuthContextProps, users: User[] | undefined): Promise<boolean> => {
  if (auth.user && auth.user.id_token) {
      const data = await callAuthEndpoint(auth.user.id_token);
      const loggedInUser = await users?.find((u) => u.email === data);

      if (loggedInUser && loggedInUser.roleId == 2) {
          return true; 
      } 
  }
  return false;
};

const AdminPage = () => {
  const { data: users } = useAllUsers();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthorization = async () => {
        setIsAuthorized(await checkIfAuthorized(auth, users));
      };
      checkAuthorization();
  }, [auth, auth.user?.id_token, navigate, users]);

  if (!isAuthorized)
  {
    return (
      <div>Not Authorized</div>
    )
  }

  return (
    <>
      <div>AdminPage</div>
      <div>Number of registered users is: {users?.length || 0}</div>
    </>
  );
};

export default AdminPage;
