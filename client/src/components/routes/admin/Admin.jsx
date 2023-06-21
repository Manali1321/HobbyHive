import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../../utils/axios";

function SellerApproval() {
  const [seller, setSeller] = useState([]);
  const navigate = useNavigate();
  // console.log(seller);
  const handleApprove = async (id) => {
    try {
      const updatedSeller = seller.map((seller) =>
        seller.user._id === id ? { ...seller, status: "approved" } : seller
      );

      const updated = updatedSeller.find(
        (seller) => seller.status === "approved"
      );
      if (updated) {
        const response = await api.put(`/seller/update/${id}`, updated);
        console.log(response);
        setSeller(updatedSeller);
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/admin/seller-approval");
  };

  const handleDenied = async (id) => {
    try {
      const updatedSeller = seller.map((seller) =>
        seller.user._id === id ? { ...seller, status: "rejected" } : seller
      );

      const updated = updatedSeller.find(
        (seller) => seller.status === "rejected"
      );
      if (updated) {
        const response = await api.put(`/seller/update/${id}`, updated);
        console.log(response);
        setSeller(updatedSeller);
      }
    } catch (err) {
      console.log(err);
    }
    navigate("admin/seller-approval");
  };

  useEffect(() => {
    api.get("/admin/seller/request").then(function (response) {
      setSeller(() => response.data);
    });
  }, []);

  return (
    <main className="p-8">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4">First Name</th>
            <th className="p-4">Last Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Service</th>
            <th className="p-4">Photo</th>
            <th className="p-4">SIN</th>
            <th className="p-4">WorkPermit</th>
            <th className="p-4">Business Number</th>
            <th className="p-4">Password</th>
            <th className="p-4">Edit</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((d) => (
            <tr key={d._id} className="border-b border-gray-300">
              <td className="p-4">{d.user.first_name}</td>
              <td className="p-4">{d.user.last_name}</td>
              <td className="p-4">{d.user.email}</td>
              <td className="p-4">{d.user.phone}</td>
              {/* <td className="p-4">{d.service.name}</td> */}
              <td className="p-4">
                <img src={d.seller_image} width={200} alt="Seller" />
              </td>
              <td className="p-4">{d.business_number}</td>
              <td className="p-4">
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  width="100%"
                  height="100px"
                />
              </td>
              <td className="p-4">
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  width="100%"
                  height="100px"
                />
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleApprove(d.user._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  <AiFillEdit /> Approve
                </button>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDenied(d.user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <AiFillDelete /> Denied
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default SellerApproval;
