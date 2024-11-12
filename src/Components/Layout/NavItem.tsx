import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <Link to={to}>
    <div className="nav-item">
      <i className={`bi ${icon} mr-2`}></i>
      <div className="nav-text">{text}</div>
    </div>
  </Link>
);

export default NavItem;
