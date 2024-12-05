import { useState } from "react";
import { User } from "../Data/Interfaces/User";
import { editUser } from "../Functions/UserRequests";

const UserProfile = () => {
  const currUser = localStorage.getItem("currentUser");
  const [userBiography, setUserBiography] = useState<string>();

  if (!currUser) {
    return "Please Log in";
  }

  const parsedUser: User = JSON.parse(currUser);
  const handleEditUser = () => {
    if (userBiography) {
      const newUser: User = {
        ...parsedUser,
        biography: userBiography,
      };

      editUser(newUser);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
        <h1 className="text-4xl font-extrabold tracking-wide mb-4 animate-fade-in">
          My Profile{" "}
        </h1>
        <div>{parsedUser.id}</div>
        <div>{parsedUser.email}</div>
        <div>{parsedUser.name}</div>
        <div>{parsedUser.biography}</div>
        <div>
          {parsedUser.roleId == 2 ? <div>Admin</div> : <div>GENERAL USER</div>}
        </div>

        <input type="text" onChange={(e) => setUserBiography(e.target.value)} />
        <button onClick={handleEditUser}>Set A Biography</button>
      </section>
    </>
  );
};

export default UserProfile;
