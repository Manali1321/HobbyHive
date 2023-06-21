import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../../context/CategoryContext";
import { api } from "../../../../utils/axios";

function UpdateBuyer() {
  const { category } = useContext(CategoryContext);
  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState();
  const [cpassword, setCpassword] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`buyer/${id}`).then(function (response) {
      setBuyer(() => response.data);
      console.log(response.data);
      setData(() => ({
        first_name: response.data.user ? response.data.user.first_name : "",
        last_name: response.data.user ? response.data.user.last_name : "",
        email: response.data.user ? response.data.user.email : "",
        phone: response.data.user ? response.data.user.phone : "",
        password: response.data.user ? response.data.user.password : "",
        category: response.data.buyer.category || "",
        // business_number: res.data.business_number || "",
        // resume: res.data.resume || "",
        // portfolio: res.data.porfolio || "",
        // status: res.data.status || "",
      }));
      setLoading(false);
    });
  }, []);

  const handleInput = async (e) => {
    var { name } = e.target;
    if (name === "first_name") {
      setData((prevdata) => ({
        ...prevdata,
        first_name: e.target.value,
      }));
    } else if (name === "last_name") {
      setData((prevdata) => ({
        ...prevdata,
        last_name: e.target.value,
      }));
    } else if (name === "email") {
      setData((prevdata) => ({
        ...prevdata,
        email: e.target.value,
      }));
    } else if (name === "phone") {
      setData((prevdata) => ({
        ...prevdata,
        phone: e.target.value,
      }));
    } else if (name === "category") {
      setData((prevdata) => ({
        ...prevdata,
        category: e.target.value,
      }));
    } else if (name === "password") {
      console.log(e.target.value);
      setData((prevdata) => ({
        ...prevdata,
        password: e.target.value,
      }));
    } else if (name === "cpassword") {
      setCpassword(e.target.value);
    }
  };
  function check() {
    if (data.password === cpassword) {
      try {
        api.put(`/buyer/update/${id}`, data).then(navigate("/admin/employer"));
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("password not match");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await check();
  }
  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="font-bold">Update Profile</p>
          <div>
            <label htmlFor="first_name" className="block">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              onChange={handleInput}
              value={data.first_name}
              className="border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block">
              Last Name:
            </label>
            <input
              type="text"
              onChange={handleInput}
              name="last_name"
              value={data.last_name}
              className="border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email Address:
            </label>
            <input
              type="text"
              onChange={handleInput}
              name="email"
              value={data.email}
              className="border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block">
              Phone:
            </label>
            <input
              type="tel"
              onChange={handleInput}
              name="phone"
              required
              autoComplete="tel"
              value={data.phone}
              className="border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="category" className="block">
              Select category:
            </label>
            <select
              name="category"
              onChange={handleInput}
              value={data.category}
              className="border border-gray-300 p-2"
            >
              <option value="">Select Value</option>
              {category &&
                category.map((c) => (
                  <option key={c._id} value={c._id} className="mr-2">
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type="password"
              onChange={handleInput}
              name="password"
              value={data.password}
              className="border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="cpassword" className="block">
              Confirm Password:
            </label>
            <input
              type="password"
              onChange={handleInput}
              name="cpassword"
              className="border border-gray-300 p-2"
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update your profile
          </button>
        </form>
      )}
    </main>
  );
}

export default UpdateBuyer;
