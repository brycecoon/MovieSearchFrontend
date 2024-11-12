import React from "react";
import NavItem from "./NavItem";
import LoginButton from "../../AuthStuff/LoginButton";

const Navbar = () => {
  return (
    <>
      <div className="bg-black">
        <div className="myNav p-4 d-none d-md-flex bg-info">
          {" "}
          <NavItem to="/" icon="bi-house-door" text="Home" />
          <NavItem to="/allMovies" icon="bi-film" text="All Movies" />
          <div className="fixed bottom-4 right-4">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
