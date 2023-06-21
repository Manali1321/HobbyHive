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
    <main className="p-8">
      <form className="space-y-4">
        <label className="block">Do you want to Delete {name}'s Account?</label>
        <br />
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
export default DeleteBuyer;
