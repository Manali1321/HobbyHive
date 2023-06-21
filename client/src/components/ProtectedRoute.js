import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { SelectionContext } from "../context/SelectionContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const { user, userrole } = useUserAuth();
  const { selectedId } = useContext(SelectionContext);
  useEffect(() => {
    if (user && userrole === "admin") {
      navigate(`/admin`);
    } else if (user && selectedId && userrole === "buyer") {
      navigate(`/buyer/seller/${selectedId}`);
    } else if (user && userrole === "buyer") {
      navigate(`/`);
    }
    // else if (user && userrole === "seller") {
    //   navigate("/seller/update/${userId}");
    // }
    else
      if (!user || (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        navigate("/login");
      }
  }, [user, userrole, allowedRoles, navigate]);

  return children;
};
export default ProtectedRoute;