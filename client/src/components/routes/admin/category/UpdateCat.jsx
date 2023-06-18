import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";

function UpdateCat() {
  const { category, setCategory } = useContext(CategoryContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    const resCategory = await api.get(`/admin/category/${id}`);
    setCategory(resCategory.data);
  };
  useEffect(() => {
    fetchData();
    console.log(category);
  }, []);
  const handleInput = (e) => {
    const { name } = e.target;
    if (name == "name") {
      setCategory((preveData) => ({
        ...preveData,
        name: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      api
        .put(`admin/category/update/${id}`, category)
        .then(navigate("/admin/category/"));
    } catch (err) {
      console.error(err);
    }
    // navigate(`/admin/category/`);
  };
  return (
    <main>
      <p>Update Category</p>
      <form onSubmit={handleSubmit}>
        <div key={category._id}>
          <label htmlFor="name">Name of Category:</label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={category.name}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
export default UpdateCat;
