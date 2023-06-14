import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddService() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const handleInput = (e) => {
    setData({ ...data, name: e.target.value });
    setData({ ...data, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      axios
        .post("http://localhost:8888/service/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(navigate("/admin/service"));
    } catch (err) {
      console.error(err);
    }
    navigate("/admin/service");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="service">Add Name of Service</label>
        <input type="text" name="service" onChange={handleInput} />
        <label htmlFor="image">Add Image</label>
        <input type="file" name="image" onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
export default AddService;
