import NavItem from "./NavItem";
import LoginButton from "../../AuthStuff/LoginButton";

const Navbar = () => {
  return (
    <>
      <div className="bg-blue-200 p-4 flex items-center justify-between shadow-md w-screen">
        <div className="flex space-x-4">
          <NavItem to="/" icon="bi-house-door" text="Home" />
          <NavItem to="/allMovies" icon="bi-film" text="All Movies" />
          <NavItem to="/adminpage" icon="bi-person-badge" text="Admin" />
        </div>

        <div>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;
