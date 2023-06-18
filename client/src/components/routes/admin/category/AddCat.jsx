import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddCat() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
  });

  const handleInput = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  function check() {
    try {
      const response = axios.post(
        "http://localhost:8888/admin/category/add",
        category
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    await check();
    navigate("/admin/category");
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name of Category:</label>
        <input type="text" name="name" onChange={handleInput}></input>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
export default AddCat;
