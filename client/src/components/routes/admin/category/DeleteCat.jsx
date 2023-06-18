import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
function DeleteCat() {
  const navigate = useNavigate();
  const { id } = useParams();

  async function confirmation(value) {
    if (value === true) {
      try {
        api
          .delete(`http://localhost:8888/admin/category/delete/${id}`)
          .then(navigate("/admin/category"));
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/category");
  }
  return (
    <form>
      <label>Do you want to Delete Category?</label>
      <button type="button" onClick={() => confirmation(true)}>
        Yes
      </button>
      <button type="button" onClick={() => confirmation(false)}>
        No
      </button>
    </form>
  );
}
export default DeleteCat;
