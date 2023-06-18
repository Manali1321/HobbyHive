import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CategoryContext } from "../../../../context/CategoryContext";
import { api } from "../../../../utils/axios";

function Category() {
  const { category } = useContext(CategoryContext);

  return (
    <main>
      <h2>List of Category</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {category &&
            category.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <Link to={`/admin/category/update/${c._id}`}>
                    <AiFillEdit /> Edit
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/category/delete/${c._id}`}>
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
