import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddService() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
  });
  const handleInput = (e) => {
    setData({ name: e.target.value });
  };
  function check() {
    try {
      const response = axios
        .post("http://localhost:8888/service/add", data)
        .then(navigate("/admin/service"));
    } catch (err) {
      console.error(err);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleInput(e);
    await check();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="service">Add Name of Service</label>
        <input type="text" name="service" onChange={handleInput}></input>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
export default AddService;
