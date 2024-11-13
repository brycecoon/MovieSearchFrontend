import { useEffect } from "react";
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
        if (!isAuthorized) {
          navigate("/");
        }
      };

      checkAuthorization();
  }, [auth.user?.id_token]);

  const checkIfAuthorized = async (): Promise<boolean> => {
    if (auth.user && auth.user.id_token) {
        const data = await callAuthEndpoint(auth.user.id_token);
        console.log("data: " + data)
        const loggedInUser = await users?.find((u) => u.email === data);
        console.log("currUser is", loggedInUser);

        if (loggedInUser && loggedInUser.roleId == 2) {
            return true; 
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
