import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
function DeleteBuyer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const name = new URLSearchParams(location.search).get("fname");
  function confirmation(value) {
    if (value === true) {
      try {
        api.delete(`/buyer/delete/${id}`).then(navigate("/login"));
        console.log("Account has been deleted");
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/employer");
  }
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
export default DeleteBuyer;