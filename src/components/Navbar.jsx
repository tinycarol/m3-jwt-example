import { NavLink } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function Navbar({ onLogout, user }) {
  return (
    <nav className="navbar navbar-light navbar-expand-lg bg-light">
      <div className="navbar-brand">
        <img src="/amazhack.svg" width="50" height="50" alt="" />
      </div>
      <NavLink activeClassName="active" className="navbar-brand" to="/products">
        AmazHack
      </NavLink>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink activeClassName="active" className="nav-link" to="/products">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/products">
            Products
          </NavLink>
        </li>
      </ul>
      <UserInfo user={user} onLogout={onLogout} />
    </nav>
  );
}
