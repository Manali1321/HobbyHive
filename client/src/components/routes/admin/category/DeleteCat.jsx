import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";

function DeleteCat() {
  const { refetchData } = useContext(CategoryContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const name = new URLSearchParams(location.search).get("category");

  async function confirmation(value) {
    if (value === true) {
      try {
        await api.delete(`/admin/category/delete/${id}`);
        refetchData();
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/category");
  }
  return (
    <form>
      <label>Do you want to Delete {name} Category?</label>
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
