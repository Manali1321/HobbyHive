import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function DeleteService() {
  const navigate = useNavigate();
  const { id } = useParams();

  async function confirmation(value) {
    if (value === true) {
      try {
        await axios
          .delete(`http://localhost:8888/service/delete/${id}`)
          .then(navigate("/admin/service"));
        console.log("deleted");
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/service");
  }
  return (
    <main>
      <form>
        <label>Do you want to Delete Service?</label>
        <button onClick={() => confirmation(true)}>Yes</button>
        <button onClick={() => confirmation(false)}>No</button>
      </form>
    </main>
  );
}
export default DeleteService;
