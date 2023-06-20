import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";

function UpdateCat() {
  const { category, refetchData } = useContext(CategoryContext);

  const [update, setUpdate] = useState({
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    const resCategory = await api.get(`/admin/category/${id}`);
    setUpdate(resCategory.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleInput = (e) => {
    const { name } = e.target;
    if (name == "category") {
      setUpdate((preveData) => ({
        ...preveData,
        name: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/category/update/${id}`, update);
      refetchData();
    } catch (err) {
      console.error(err);
    }
    navigate("/admin/category/");
  };
  return (
    <main>
      <p>Update Category</p>
      <div>
        <form onSubmit={handleSubmit}>
          <div key={update._id}>
            <label htmlFor="category">Name of Category:</label>
            <input
              type="text"
              name="category"
              onChange={handleInput}
              value={update.name}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
export default UpdateCat;
