import { Link } from "react-router-dom";
interface NavItemProps {
  to: string;
  icon: string;
  text: string;
  customIcon: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, customIcon }) => (
  <Link to={to}>
    <div className="nav-item flex flex-row pb-2 text-slate-700 relative group transition duration-300 ease-in-out">
      <i className={`bi ${icon} mr-2`}></i>
      {customIcon ? <img src={icon} className="max-w-6 min-w-6 mr-2 align-top" /> : ""}
      <div className="nav-text">{text}</div>
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </div>
  </Link>
);

export default NavItem;
