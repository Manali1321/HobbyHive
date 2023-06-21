import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function Nav() {
  const { user, logOut } = useUserAuth();
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

  const handleLogin = async () => {
    setShouldReload(true);
    await navigate("/login");
  };

  return (
    <main>
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
        {user ? (
          <>
            <li>
              <p>Welcome {user && user.email}</p>
            </li>
            <li>
              <button type="submit" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogin}>Log In</button>
            </li>
          </>
        )}
      </ul>
    </main>
  );
}

export default Nav;
