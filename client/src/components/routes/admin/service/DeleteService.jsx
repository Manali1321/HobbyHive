import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../../../context/ServiceContext";
import { api } from "../../../../utils/axios";

function DeleteService() {
  const { refetchData } = useContext(ServiceContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const name = new URLSearchParams(location.search).get("service");

  async function confirmation(value) {
    if (value === true) {
      try {
        await api.delete(`/admin/service/delete/${id}`);
        refetchData();
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/admin/service");
  }
  return (
    <main>
      <form class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <label class="block mb-4">Do you want to Delete {name} Service?</label>
        <div class="flex justify-center">
          <button
            type="button"
            onClick={() => confirmation(true)}
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => confirmation(false)}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </form>
    </main>
  );
}
export default DeleteService;
