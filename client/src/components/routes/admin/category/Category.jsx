import React, { useState, useEffect } from "react";
import axios from "axios";
function Category() {
  const [category, setCategory] = useState([]);
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <tr>
          <th>Name</th>
          <th>Service name</th>
        </tr>
        {category.map((d) => (
          <tr key={d._id}>
            <td>{d.name}</td>
            <td>
              {d.service_id.map((i) => {
                const match = service.find((s) => s._id === i);
                if (match) {
                  return <span key={match._id}>{match.name}, </span>;
                }
                return null;
              })}
            </td>
          </tr>
        ))}
      </table>
      <a href="/admin/category/add">
        <button>Add Category</button>
      </a>
    </main>
  );
}
export default Category;
