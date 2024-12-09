import { useAllUsers } from "../Functions/Queries/UserHooks";
import AdminLoadingSkeleton from "../Components/LoadingSkeletons/AdminLoadingSkeleton";

const AdminPage = () => {
  const { data: users, isLoading, isError, error } = useAllUsers(); // Assuming `useAllUsers` returns `isLoading`
  const currentUser = localStorage.getItem("currentUser")

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }
  if (isError) {
    throw error;
  }

  if (currentUser && (JSON.parse(currentUser).roleId) != 2) {
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
      </div>
    </section>
  );
};

export default AdminPage;
