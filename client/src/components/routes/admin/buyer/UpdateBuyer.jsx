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
        <form onSubmit={handleSubmit}>
          <p>Update Profile</p>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              name="first_name"
              onChange={handleInput}
              value={data.first_name}
            />
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              onChange={handleInput}
              name="last_name"
              value={data.last_name}
            />
            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              onChange={handleInput}
              name="email"
              value={data.email}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              onChange={handleInput}
              name="phone"
              required
              autoComplete="tel"
              value={data.phone}
            />

            <label htmlFor="category">Select category:</label>
            <select
              name="category"
              onChange={handleInput}
              value={data.category}
            >
              <option value="">Select Value</option>
              {category &&
                category.map((c) => (
                  <option key={c._id} value={c._id} className="mr-2">
                    {c.name}
                  </option>
                ))}
            </select>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={handleInput}
              name="password"
              value={data.password}
            />
            <label htmlFor="cpassword">Confirm Password:</label>
            <input type="password" onChange={handleInput} name="cpassword" />
            <br></br>
            <p>{error}</p>
            <button type="submit">Update your profile</button>
          </div>
        </form>
      )}
    </main>
  );
}

export default UpdateBuyer;
