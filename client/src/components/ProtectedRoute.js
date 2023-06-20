import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  let { user } = useUserAuth();
  // console.log(user.role);
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    else if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log(user.role);
      navigate("/access-denied");
    }
  }, [user, allowedRoles, navigate]);

  return children;
}
export default ProtectedRoute;