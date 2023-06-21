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
    <main className="p-8">
      <div className="bg-gray-100 p-4">
        <p className="text-xl font-bold mb-4">Add New Category</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="name" className="text-lg">
            Name of Category:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            className="border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
export default AddCat;
