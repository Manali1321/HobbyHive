import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
function UpdateCat() {
  const [category, setCategory] = useState({
    name: "",
    service: [],
  });
  const [service, setService] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8888/admin/category/update/${id}`)
      .then(function (response) {
        setCategory(() => response.data);
      });
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);
  const handleInput = (e) => {
    const { name, value, checked } = e.target;
    if (name == "name") {
      setCategory((preveData) => ({
        ...preveData,
        name: e.target.value,
      }));
    } else if (name === "service") {
      if (checked) {
        setCategory((preveData) => ({
          ...preveData,
          service: [...preveData.service, value],
        }));
      } else {
        setCategory((preveData) => ({
          ...preveData,
          service: preveData.service.filter((s) => s !== value),
        }));
      }
    }
    console.log(category);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:8888/admin/category/update/${id}`, category)
        .then(navigate(`/admin/category/`));
    } catch (err) {
      console.error(err);
    }
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
          <p htmlFor="service">Attached Service:</p>
          {service.map((s) => (
            <div key={s._id}>
              <label htmlFor="service">{s.name}</label>
              <input
                type="checkbox"
                name="service"
                value={s._id}
                checked={category.service.includes(s._id)}
                onChange={handleInput}
              ></input>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
export default UpdateCat;
