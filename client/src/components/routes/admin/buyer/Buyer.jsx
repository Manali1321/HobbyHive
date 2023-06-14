import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Employer() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/employer").then(function (response) {
      setData(() => response.data);
    });
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Password</th>
            <th>Account Careated</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.first_name}</td>
              <td>{d.last_name}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>
                {d.category.map((s) => {
                  const test = category.find((item) => item._id === s);
                  if (test) {
                    return <p key={test._id}>{test.name}</p>;
                  }
                })}
              </td>
              <td>{d.password}</td>
              <td>{d.timestemp}</td>
              <td>
                <Link to={`/update/${d._id}`}>
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td>
                <Link to={`/delete/${d._id}?fname=${d.first_name}`}>
                  <AiFillDelete /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to="/signup">Add New Employer</Link>
      </button>
    </main>
  );
}
export default Employer;
