import React, { useState, useEffect, useContext } from "react";
import { Link, json } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";

function Employer() {
  const [buyer, setBuyer] = useState([]);
  // console.log(category);
  const listData = async () => {
    const resBuyer = await api.get("/admin/buyer");
    setBuyer(resBuyer.data.buyer);
    console.log(resBuyer.data.buyer);
  };
  useEffect(() => {
    listData();
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
            <th>role</th>

            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {buyer.map((d) => (
            <tr key={d.user._id}>
              <td>{d.user.first_name}</td>
              <td>{d.user.last_name}</td>
              <td>{d.user.email}</td>
              <td>{d.user.phone}</td>
              <td>{d.category.name}</td>
              <td>{d.user.password}</td>
              <td>{d.user.role}</td>
              <td>
                <Link to={`/update/${d.user._id}`}>
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td>
                <Link to={`/delete/${d.user._id}?fname=${d.user.first_name}`}>
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
