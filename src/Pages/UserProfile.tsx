import { useState } from "react";
import { User } from "../Data/Interfaces/User";
import { editUser } from "../Functions/UserRequests";
import { toast } from "react-toastify";

const UserProfile = () => {
  const currUser = localStorage.getItem("currentUser");
  const [userBiography, setUserBiography] = useState<string>(
    currUser ? JSON.parse(currUser).biography : ""
  );

  if (!currUser) {
    return (
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12 flex items-center justify-center">
        <div className="text-3xl font-semibold">
          Please Log In To View Your Profile.
        </div>
      </section>
    );
  }

  const parsedUser: User = JSON.parse(currUser);

  const handleEditUser = () => {
    if (!userBiography.trim()) {
      return;
    }
    const updatedUser: User = {
      ...parsedUser,
      biography: userBiography.trim(),
    };
    editUser(updatedUser);
    toast.warn("Changes Saved, Log out then log back in to see changes");
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-3 py-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide text-center mb-6 animate-fade-in">
          My Profile
        </h1>

        <div className="space-y-4 text-lg">
          <div>
            <strong>Email:</strong> {parsedUser.email}
          </div>
          <div>
            <strong>Name:</strong> {parsedUser.name}
          </div>
          <div>
            <strong>Biography:</strong>{" "}
            <p className="italic">{parsedUser.biography}</p>
          </div>
          <div>
            <strong>Role:</strong>{" "}
            {parsedUser.roleId === 2 ? (
              <span className="text-yellow-400">Admin</span>
            ) : (
              <span className="text-green-400">General User</span>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-lg font-semibold" htmlFor="biography">
            Update Biography:
          </label>
          <textarea
            id="biography"
            value={userBiography}
            onChange={(e) => setUserBiography(e.target.value)}
            placeholder="Enter a short biography"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
          <button
            onClick={handleEditUser}
            className="w-full py-2 mt-4 bg-emerald-800 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Set Biography
          </button>
        </div>
      </div>
      <div className="m-5 flex items-center justify-center">
        <em>
          *This page is just to use local storage so it doesn't automatically
          update
        </em>
      </div>
    </section>
  );
};

export default UserProfile;
