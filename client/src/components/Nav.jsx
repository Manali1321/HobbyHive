import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-900 font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/seller"
            className="text-blue-600 hover:text-blue-900 font-bold"
          >
            Become Seller
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-900 font-bold"
          >
            Admin
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-900 font-bold"
          >
            User Login
          </Link>
        </li>
      </ul>
    );
  }
}
export default Nav;
