import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CategoryContext } from "../../../../context/CategoryContext";

function Category() {
  const { category } = useContext(CategoryContext);
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">List of Category</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Edit</th>
            <th className="p-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {category &&
            category.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-4">{c.name}</td>
                <td className="p-4">
                  <Link
                    to={`/admin/category/update/${c._id}`}
                    className="text-blue-500"
                  >
                    <AiFillEdit /> Edit
                  </Link>
                </td>
                <td className="p-4">
                  <Link
                    to={`/admin/category/delete/${c._id}?category=${c.name}`}
                    className="text-red-500"
                  >
                    <AiFillDelete /> Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/admin/category/add" className="block mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </Link>
    </main>
  );
}
export default Category;
