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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            {/* <th className="px-4 py-2">Category</th> */}
            {/* <th className="px-4 py-2">Password</th> */}
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {buyer.map((d) => (
            <tr key={d.user._id}>
              <td className="px-4 py-2">{d.user.first_name}</td>
              <td className="px-4 py-2">{d.user.last_name}</td>
              <td className="px-4 py-2">{d.user.email}</td>
              <td className="px-4 py-2">{d.user.phone}</td>
              {/* <td className="px-4 py-2">{d.category.name}</td> */}
              {/* <td className="px-4 py-2">{d.user.password}</td> */}
              <td className="px-4 py-2">{d.user.role}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/update/${d.user._id}`}
                  className="text-blue-500 hover:underline"
                >
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/delete/${d.user._id}?fname=${d.user.first_name}`}
                  className="text-red-500 hover:underline"
                >
                  <AiFillDelete /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4">
        <Link
          to="/signup"
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Employer
        </Link>
      </button>
    </main>
  );
}
export default Employer;
