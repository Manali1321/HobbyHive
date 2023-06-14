import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Seller() {
  const [data, setData] = useState([]);
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/seller").then(function (response) {
      setData(() => response.data);
    }, []);
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Photo</th>
            <th>SIN</th>
            <th>WorkPermit</th>
            <th>PhotoId</th>
            <th>Business Number</th>
            <th>Password</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.first_name}</td>
              <td>{d.last_name}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>{d.service}</td>
              <td>{d.password}</td>
              <td>{d.timestemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to={`/seller/add`}>Create Seller</Link>
      </button>
    </main>
  );
}
export default Seller;
