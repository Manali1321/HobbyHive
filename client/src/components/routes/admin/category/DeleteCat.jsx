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
    <main className="p-8">
      <form className="flex flex-col space-y-4">
        <label className="text-lg">
          Do you want to Delete {name} Category?
        </label>
        <button
          type="button"
          onClick={() => confirmation(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => confirmation(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          No
        </button>
      </form>
    </main>
  );
}
export default DeleteCat;
