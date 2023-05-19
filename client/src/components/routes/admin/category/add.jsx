import React, { useState, useEffect } from "react";
import axios from "axios";
function AddCat() {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const [service, setService] = useState([]);

  return (
    <form action="http://localhost:8888/category/add" onSubmit={handleSubmit}>
      <label htmlFor="name">Name of Category:</label>
      <input type="text" id="name" key="name" name="name"></input>
      <label htmlFor="service">Attached Service:</label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default AddCat;
