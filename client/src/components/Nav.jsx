import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function Nav() {
  const { user, logOut, userrole } = useUserAuth();
  const navigate = useNavigate();
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  const handleLogout = async () => {
    try {
      await logOut();
      setShouldReload(true);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogin = async () => {
  //   setShouldReload(true);
  //   await navigate("/login");
  // };

  return (
    <nav className="bg-black">
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-white hover:text-blue-200 font-bold">
            Home
          </Link>
        </li>

        {userrole === "admin" ? (
          <li>
            <Link
              to="/admin"
              className="text-white hover:text-blue-200 font-bold"
            >
              AdminHome
            </Link>
          </li>
        ) : null}

        {user ? (
          <>
            <li>
              <p className="text-white font-bold">
                Welcome {user && user.email}
              </p>
            </li>
            <li>
              <button
                type="submit"
                onClick={handleLogout}
                className="text-white hover:text-blue-200 font-bold"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 font-bold"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/seller"
                className="text-white hover:text-blue-200 font-bold"
              >
                Seller
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
