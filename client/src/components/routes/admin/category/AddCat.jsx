import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCat() {
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const [data, setData] = useState({
    name: "",
    service: [],
  });

  const handleInput = (e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setData((preveData) => ({
        ...preveData,
        name: e.target.value,
      }));
    } else if (name === "service") {
      if (checked) {
        setData((preveData) => ({
          ...preveData,
          service: [...preveData.service, value],
        }));
      } else {
        setData((preveData) => ({
          ...preveData,
          service: preveData.service.filter((s) => s !== value),
        }));
      }
    }
  };
  function check() {
    try {
      const response = axios.post("http://localhost:8888/category/add", data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    axios
      .get("http://localhost:8888/service")
      .then(function (response) {
        setService(() => response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleInput(event);
    await check();
    navigate("/admin/category");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name of Category:</label>
      <input type="text" name="name" onChange={handleInput}></input>
      <p htmlFor="service">Attached Service:</p>
      {service.map((s) => (
        <div key={s._id}>
          <label htmlFor="service">{s.name}</label>
          <input
            type="checkbox"
            name="service"
            value={s.name}
            onChange={handleInput}
          ></input>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
export default AddCat;
