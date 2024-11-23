import NavItem from "./NavItem";
import LoginButton from "../../AuthStuff/LoginButton";
import PopcornIcon from '../../assets/popcorn.svg';
import listIcon from '../../assets/list.svg';
import movieStarIcon from '../../assets/movieStar.svg';
import factsIcon from '../../assets/facts.svg';

const Navbar = () => {
  return (
    <>
      <div className="bg-emerald-200 p-4 flex items-center justify-between shadow-md w-screen">
        <div className="flex space-x-4">
          <NavItem to="/" icon="bi-house-door" text="Home" customIcon={false}/>
          <NavItem to="/allMovies" icon="bi-film" text="All Movies" customIcon={false}/>
          <NavItem to="/inTheatres" icon={PopcornIcon} text="In Theatres" customIcon={true} />
          <NavItem to="/myLists" icon={listIcon} text="My Lists" customIcon={true}/>
          <NavItem to="/actordirector" icon={movieStarIcon} text="Movie Stars" customIcon={true}/>
          <NavItem to="/movieFacts" icon={factsIcon} text="Movie Facts" customIcon={true}/>
          <NavItem to="/adminpage" icon="bi-person-badge" text="Admin" customIcon={false}/>
        </div>

        <div>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;
