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
      <form>
        <label>Do you want to Delete {name} Service?</label>
        <button type="button" onClick={() => confirmation(true)}>
          Yes
        </button>
        <button type="button" onClick={() => confirmation(false)}>
          No
        </button>
      </form>
    </main>
  );
}
export default DeleteService;
