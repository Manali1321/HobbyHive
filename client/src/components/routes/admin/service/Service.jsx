import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../../context/CategoryContext";
import { ServiceContext } from "../../../../context/ServiceContext";
import { api } from "../../../../utils/axios";
function Service() {
  const { service } = useContext(ServiceContext);
  const { category } = useContext(CategoryContext);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {service &&
            service.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>
                  <img src={`${s.image}`} width={200} />
                </td>
                <td>
                  {category &&
                    category.map((c) => {
                      if (c._id === s.category) {
                        return c.name;
                      }
                    })}
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
