import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  const { user, userrole } = useUserAuth();

  if (!user || !userrole) {
    return <Navigate to={"/login"} replace />;
  }

  if (!isAllowed && !isAllowed.includes(userrole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
