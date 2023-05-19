import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
function Category() {
  const [category, setCategory] = useState([]);
  async function categoryList() {
    await axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }
  useEffect(() => {
    categoryList();
  }, []);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {category.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.service}</td>
              <td>
                <Link to={`admin/category/update/${d._id}`}>
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td>
                <Link to={`/admin/category/delete/${d._id}`} value={d._id}>
                  <AiFillDelete /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/category/add">
        <button>Add Category</button>
      </Link>
    </main>
  );
}
export default Category;
