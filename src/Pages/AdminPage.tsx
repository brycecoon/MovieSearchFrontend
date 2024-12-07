import { useEffect, useState } from "react";
import { useAllUsers } from "../Functions/Queries/UserHooks";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { callAuthEndpoint } from "../AuthStuff/services/UserService";
import { User } from "../Data/Interfaces/User";
import AdminLoadingSkeleton from "../Components/LoadingSkeletons/AdminLoadingSkeleton";

const checkIfAuthorized = async (
  auth: AuthContextProps,
  users: User[] | undefined
): Promise<boolean> => {
  if (auth.user && auth.user.id_token) {
    const data = await callAuthEndpoint(auth.user.id_token);
    const loggedInUser = await users?.find((u) => u.email === data);

    if (loggedInUser && loggedInUser.roleId === 2) {
      return true;
    }
  }
  return false;
};

const AdminPage = () => {
  const { data: users, isLoading } = useAllUsers(); // Assuming `useAllUsers` returns `isLoading`
  const auth = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      setIsAuthorized(await checkIfAuthorized(auth, users));
    };
    if (auth.user) {
      checkAuthorization();
    }
  }, [auth, users]);

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  if (!isAuthorized) {
    return (
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12 flex items-center justify-center">
        <div className="text-3xl font-semibold">
          You are not authorized to view this page.
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 animate-fade-in">
          Admin Dashboard
        </h1>

        <div className="space-y-6">
          <div className="text-xl">
            <strong>Admin Role:</strong>{" "}
            <span className="text-yellow-400">You have admin access.</span>
          </div>
          <div className="text-xl">
            <strong>Number of Registered Users:</strong> {users?.length || 0}
          </div>
          <div className="text-xl">
            <strong>Last Update:</strong> {new Date().toLocaleString()}
          </div>
        </div>

        {/* Additional Admin Options could go here */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/manage-users")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
          >
            Manage Users
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
