import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
function Category() {
  const [category, setCategory] = useState([]);
  const [servicei, setService] = useState([]);

  async function listData() {
    await axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
    await axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }
  useEffect(() => {
    listData();
  }, []);

  return (
    <main>
      <h2>List of Category</h2>
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
          {/* {JSON.stringify(servicei)} */}
          {category.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>
                {c.service.map((s) => {
                  const test = servicei.find((item) => item._id === s);
                  if (test) {
                    return <p key={test._id}>{test.name}</p>;
                  }
                })}
              </td>
              <td>
                <Link to={`/admin/category/update/${c._id}`}>
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td>
                <Link to={`/admin/category/delete/${c._id}`} value={c._id}>
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
