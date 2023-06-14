import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
function Service() {
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {service.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>
                <img
                  src={`http://localhost:8888/storage/service/${s.image.data}`}
                  width={200}
                />
              </td>
              <td>
                <Link to={`/admin/service/update/${s._id}`}>
                  <AiFillEdit /> Edit
                </Link>
              </td>
              <td>
                <Link to={`/admin/service/delete/${s._id}`} value={s._id}>
                  <AiFillDelete /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button>
          <Link to="/admin/service/add">Add Service </Link>
        </button>
      </div>
    </main>
  );
}
export default Service;
