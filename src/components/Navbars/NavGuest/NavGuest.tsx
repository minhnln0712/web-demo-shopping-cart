import { Link } from "react-router-dom";
import logo from "./../../../assets/images/logo.png";

export default function NavGuest(params: any) {
  return (
    <div className="nav-guest">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/login"> Login </Link>
        </li>
        <li>
          <Link to="/user"> User </Link>
        </li>
      </ul>
    </div>
  );
}
