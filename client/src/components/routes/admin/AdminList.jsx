import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../utils/axios";

function AdminDetail() {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [confirme, setConfirm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/admin/list");
        setAdmins(response.data);
      } catch (error) {
        console.log("Error retrieving admin list:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/admin/add", { email });
      setConfirm(response.data);
    } catch (error) {
      console.log("Error adding admin:", error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      const response = await api.put(`/admin/update/${id}`, {
        confirme,
        role: "admin",
      });
      setConfirm(response.data);
    } catch (error) {
      console.log("Error confirming admin:", error);
    }
  };

  return (
    <main className="m-10">
      <div className="">
        <h2> List of Admin</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="py-2 px-4">{admin.first_name}</td>
                <td className="py-2 px-4">{admin.last_name}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.phone}</td>
                <td className="py-2 px-4">{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange}
            className="py-2 px-4 border rounded"
          />
          <button
            type="submit"
            className="ml-2 py-2 px-4 bg-blue-500 text-white rounded"
          >
            Make Admin
          </button>
        </form>
      </div>

      {confirme ? (
        <div key={confirme._id} className="mt-4">
          <form onSubmit={() => handleConfirm(confirme._id)}>
            <div className="mb-2">
              <label htmlFor="first_name" className="block">
                First Name:
              </label>
              <input
                type="text"
                value={confirme.first_name}
                readOnly
                className="py-2 px-4 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="last_name" className="block">
                Last Name:
              </label>
              <input
                type="text"
                value={confirme.last_name}
                readOnly
                className="py-2 px-4 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="emailInput" className="block">
                Email:
              </label>
              <input
                type="email"
                value={confirme.email}
                readOnly
                className="py-2 px-4 border rounded"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Add Admin
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-4">
          <h2>User Not Found</h2>
        </div>
      )}
    </main>
  );
}

export default AdminDetail;
