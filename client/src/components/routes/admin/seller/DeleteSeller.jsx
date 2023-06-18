import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function DeleteSeller() {
  const navigate = useNavigate();
  const { id } = useParams();
  const name = new URLSearchParams(location.search).get("first_name");
  function confirmation(value) {
    if (value === true) {
      try {
        axios
          .delete(`http://localhost:8888/seller/delete/${id}`)
          .then(navigate("/seller/login"));
        console.log("Account has been deleted");
      } catch (err) {
        console.error(err);
      }
    }
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
export default DeleteSeller;
