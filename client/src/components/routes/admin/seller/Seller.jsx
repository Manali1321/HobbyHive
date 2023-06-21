import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../../../utils/axios";
import { useUserAuth } from "../../../../context/UserAuthContext";

function Seller() {
  const [seller, setSeller] = useState([]);
  // const navigate = useNavigate();
  // console.log(user);
  // console.log(seller);

  useEffect(() => {
    api.get("/admin/seller").then(function (response) {
      setSeller(() => response.data);
    });
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
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">SIN</th>
            <th className="px-4 py-2">Work Permit</th>
            <th className="px-4 py-2">Business Number</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((d) => (
            <tr key={d._id}>
              <td className="px-4 py-2">{d.user.first_name}</td>
              <td className="px-4 py-2">{d.user.last_name}</td>
              <td className="px-4 py-2">{d.user.email}</td>
              <td className="px-4 py-2">{d.user.phone}</td>
              <td className="px-4 py-2">{d.service.name}</td>
              <td className="px-4 py-2">{d.status}</td>
              <td className="px-4 py-2">
                <img src={d.seller_image} width={200} />
              </td>
              <td className="px-4 py-2">{d.business_number}</td>
              <td className="px-4 py-2">
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  className="w-32 h-40"
                />
              </td>
              <td className="px-4 py-2">
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  className="w-32 h-40"
                />
              </td>
              <td className="px-4 py-2">{d.user.password}</td>
              <td className="px-4 py-2">
                {d.status === "approved" || d.status === "rejected" ? (
                  <Link
                    to={`/seller/update/${d.user._id}`}
                    className="text-blue-500"
                  >
                    <AiFillEdit /> Edit
                  </Link>
                ) : (
                  <span className="text-red-500 underlines">
                    You can't Edit your profile; Decision pending
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/seller/delete/${d.user._id}?first_name=${d.user.first_name}`}
                  className="text-red-500"
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
          to={`/seller/add`}
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Seller
        </Link>
      </button>
    </main>
  );
}
export default Seller;
