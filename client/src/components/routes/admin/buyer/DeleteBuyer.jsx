import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function DeleteBuyer() {
  const navigate = useNavigate();
  const { id } = useParams();

  function confirmation(value) {
    if (value === true) {
      try {
        axios
          .delete(`http://localhost:8888/delete/${id}`)
          .then(navigate("/login"));
        console.log("Account has been deleted");
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/employer");
  }
  return (
    <form>
      <label>Do you want to Delete User?</label>
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
