import React, { useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../../context/CategoryContext";
import { ServiceContext } from "../../../../context/ServiceContext";
function Service() {
  const { service } = useContext(ServiceContext);
  const { category } = useContext(CategoryContext);
  return (
    <main>
      <h2 className="text-2xl font-bold text-center m-4">List of Services</h2>
      <div className="overflow-x-auto m-10">
        <div className="sm:overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="py-2 border">Name</th>
                <th className="py-2 border">Image</th>
                <th className="py-2 border">Category</th>
                <th className="py-2 border">Edit</th>
                <th className="py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {service &&
                service.map((s, index) => (
                  <tr
                    key={s._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2 border">{s.name}</td>
                    <td className="py-2 border">
                      <img src={`${s.image}`} width={200} />
                    </td>
                    <td className="py-2 border">
                      {category &&
                        category.map((c) => {
                          if (c._id === s.category) {
                            return c.name;
                          }
                        })}
                    </td>
                    <td className="py-2 border">
                      <Link to={`/admin/service/update/${s._id}`}>
                        <AiFillEdit /> Edit
                      </Link>
                    </td>
                    <td className="py-2 border">
                      <Link
                        to={`/admin/service/delete/${s._id}?service=${s.name}`}
                      >
                        <AiFillDelete /> Delete
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mx-10 my-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/admin/service/add">Add Service</Link>
        </button>
      </div>
    </main>
  );
}
export default Service;
