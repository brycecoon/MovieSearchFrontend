import { useState } from "react";
import NavItem from "./NavItem";
import LoginButton from "../../AuthStuff/LoginButton";
import PopcornIcon from "../../assets/popcorn.svg";
import listIcon from "../../assets/list.svg";
import movieStarIcon from "../../assets/movieStar.svg";
import factsIcon from "../../assets/facts.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-300 shadow-md sticky top-0 z-10">
      {/* Navbar Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          className="text-xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <NavItem to="/" icon="bi-house-door" text="Home" customIcon={false} />
          <NavItem to="/allMovies" icon="bi-film" text="All Movies" customIcon={false} />
          <NavItem to="/inTheatres" icon={PopcornIcon} text="In Theatres" customIcon={true} />
          <NavItem to="/myLists" icon={listIcon} text="My Lists" customIcon={true} />
          <NavItem to="/actordirector" icon={movieStarIcon} text="Movie Stars" customIcon={true} />
          <NavItem to="/movieFacts" icon={factsIcon} text="Movie Facts" customIcon={true} />
          <NavItem to="/adminpage" icon="bi-person-badge" text="Admin" customIcon={false} />
          <NavItem to="/userProfile" icon="bi-person-circle" text="My Profile" customIcon={false} />
        </div>

        {/* Login Button */}
        <div className="mr-2">
          <LoginButton />
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 pl-5">
          <NavItem to="/" icon="bi-house-door" text="Home" customIcon={false} />
          <NavItem to="/allMovies" icon="bi-film" text="All Movies" customIcon={false} />
          <NavItem to="/inTheatres" icon={PopcornIcon} text="In Theatres" customIcon={true} />
          <NavItem to="/myLists" icon={listIcon} text="My Lists" customIcon={true} />
          <NavItem to="/actordirector" icon={movieStarIcon} text="Movie Stars" customIcon={true} />
          <NavItem to="/movieFacts" icon={factsIcon} text="Movie Facts" customIcon={true} />
          <NavItem to="/adminpage" icon="bi-person-badge" text="Admin" customIcon={false} />
          <NavItem to="/userProfile" icon="bi-person-circle" text="My Profile" customIcon={false} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
