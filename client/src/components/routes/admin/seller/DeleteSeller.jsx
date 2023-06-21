import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../../utils/axios";
import { useUserAuth } from "../../../../context/UserAuthContext";
function DeleteSeller() {
  const navigate = useNavigate();
  const { user, userrole } = useUserAuth();

  const { id } = useParams();
  const { deleteUserAccount } = useUserAuth();
  const name = new URLSearchParams(location.search).get("first_name");
  const confirmation = async (value) => {
    if (value === true) {
      try {
        api.delete(`/seller/delete/${id}`);
        if (userrole === "admin") {
          navigate("/admin/seller");
        } else {
          navigate("/seller/login");
        }
        await deleteUserAccount();
        console.log("Account has been deleted");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <form>
      <label>Do you want to Delete {name}'s Account?</label>
      <br></br>
      <button type="button" onClick={() => confirmation(true)}>
        Yes
      </button>
      <button type="button" onClick={() => confirmation(false)}>
        No
      </button>
    </form>
  );
}
export default DeleteSeller;
