import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function DeleteCat() {
  // console.log(id);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // async function categoryList() {
  //   await axios.get("http://localhost:8888/category").then(function (response) {
  //     setCategory(() => response.data);
  //   });
  // }
  async function confirmation(value) {
    if (value === true) {
      try {
        await axios
          .delete(`http://localhost:8888/category/delete/${id}`)
          .then(navigate("/admin/category"));
        console.log("deleted");
        // await categoryList();
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
