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
      <div class="overflow-x-auto">
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th class="px-4 py-2">First Name</th>
              <th class="px-4 py-2">Last Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Photo</th>
              <th class="px-4 py-2">SIN</th>
              <th class="px-4 py-2">Work Permit</th>
              <th class="px-4 py-2">Business Number</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Edit</th>
              <th class="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {seller &&
              seller.map((d) => (
                <tr key={d._id}>
                  <td class="px-4 py-2">{d.user.first_name}</td>
                  <td class="px-4 py-2">{d.user.last_name}</td>
                  <td class="px-4 py-2">{d.user.email}</td>
                  <td class="px-4 py-2">{d.user.phone}</td>
                  <td class="px-4 py-2">
                    <img src={d.seller_image} width={200} />
                  </td>
                  <td class="px-4 py-2">{d.business_number}</td>
                  <td class="px-4 py-2">
                    <embed
                      src={d.workpermit}
                      type="application/pdf"
                      class="w-32 h-40"
                    />
                  </td>
                  <td class="px-4 py-2">
                    <embed
                      src={d.workpermit}
                      type="application/pdf"
                      class="w-32 h-40"
                    />
                  </td>
                  <td class="px-4 py-2">{d.status}</td>
                  <td class="px-4 py-2">
                    {d.status === "approved" || d.status === "rejected" ? (
                      <Link
                        to={`/seller/update/${d.user._id}`}
                        class="text-blue-500"
                      >
                        <AiFillEdit /> Edit
                      </Link>
                    ) : (
                      <span class="text-red-500 underlines">
                        You can't Edit your profile; Decision pending
                      </span>
                    )}
                  </td>
                  <td class="px-4 py-2">
                    <Link
                      to={`/seller/delete/${d.user._id}?first_name=${d.user.first_name}`}
                      class="text-red-500"
                    >
                      <AiFillDelete /> Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to={`/seller/add`}>Create Seller</Link>
        </button>
      </div>
    </main>
  );
}
export default Seller;
