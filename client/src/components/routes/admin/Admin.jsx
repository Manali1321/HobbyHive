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
            <th>Business Number</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((d) => (
            <tr key={d._id}>
              <td>{d.user.first_name}</td>
              <td>{d.user.last_name}</td>
              <td>{d.user.email}</td>
              <td>{d.user.phone}</td>
              <td>{d.service.name}</td>
              <td>
                <img src={d.seller_image} width={200} />
              </td>
              <td>{d.business_number}</td>
              <td>
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  width="100%"
                  height="100px"
                />
              </td>
              <td>
                <embed
                  src={d.workpermit}
                  type="application/pdf"
                  width="100%"
                  height="100px"
                />
              </td>
              <td>
                <button onClick={() => handleApprove(d.user._id)}>
                  <AiFillEdit /> Approve
                </button>
              </td>
              <td>
                <button onClick={() => handleDenied(d.user._id)}>
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
