import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/employer").then(function (response) {
      setData(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>First name:</th>
            <th>Last name:</th>
            <th>Email:</th>
            <th>Phone:</th>
            <th>City:</th>
            <th>Province:</th>
            <th>Account Careated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.first_name}</td>
              <td>{d.last_name}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>{d.city}</td>
              <td>{d.province}</td>
              <td>{new Date(d.created).toLocaleString()}</td>
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
