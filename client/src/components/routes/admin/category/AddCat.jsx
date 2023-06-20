import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";
function AddCat() {
  const { refetchData } = useContext(CategoryContext);

  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
  });

  const handleInput = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/admin/category/add", category);
      refetchData();
    } catch (err) {
      console.error(err);
    }
    navigate("/admin/category");
  };
  return (
    <main>
      <div>
        <p>Add New Category</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name of Category:</label>
          <input type="text" name="name" onChange={handleInput}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
export default AddCat;
