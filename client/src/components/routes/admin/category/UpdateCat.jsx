import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
function UpdateCat() {
  const [category, setCategory] = useState([]);
  const [servicei, setService] = useState([]);
  async function listData() {
    await axios
      .get("http://localhost:8888/admin/category/update/:id")
      .then(function (response) {
        setCategory(() => response.data);
      });
    await axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }
  return (
    <div>
      <p>Update Category</p>
    </div>
  );
}
export default UpdateCat;
