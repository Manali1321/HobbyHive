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
  const [buyer, setBuyer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    category: "",
    password: "",
  });
  console.log(buyer);
  const [cpassword, setCpassword] = useState("");
  useEffect(() => {
    api.get(`buyer/${id}`).then(function (response) {
      setBuyer(() => response.data);
    });
  }, []);
  const handlePassword = async (e) => {
    setCpassword(e.target.value);
    console.log(cpassword);
  };

  const handleInput = async (e) => {
    var { name, value, checked } = e.target;
    if (name === "first_name") {
      setBuyer((prevdata) => ({
        ...prevdata,
        first_name: e.target.value,
      }));
    } else if (name === "last_name") {
      setBuyer((prevdata) => ({
        ...prevdata,
        last_name: e.target.value,
      }));
    } else if (name === "email") {
      setBuyer((prevdata) => ({
        ...prevdata,
        email: e.target.value,
      }));
    } else if (name === "phone") {
      setBuyer((prevdata) => ({
        ...prevdata,
        phone: e.target.value,
      }));
    } else if (name === "category") {
      setBuyer((prevdata) => ({
        ...prevdata,
        category: e.target.value,
      }));
    } else if (name === "password") {
      setBuyer((prevdata) => ({
        ...prevdata,
        password: e.target.value,
      }));
    }
    console.log(buyer);
  };
  function check() {
    // console.log(buyer.password);

    if (buyer.password === cpassword) {
      try {
        axios
          .put(`/buyer/update/${id}`, buyer)
          .then(navigate("/admin/employer"));
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
    // console.log(data);
  }
  return (
    <div>
      <p>Update Profile</p>
      <form onSubmit={handleSubmit}>
        <div key={buyer._id}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            onChange={handleInput}
            value={buyer.first_name}
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            onChange={handleInput}
            name="last_name"
            value={buyer.last_name}
          />
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            onChange={handleInput}
            name="email"
            value={buyer.email}
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            onChange={handleInput}
            name="phone"
            required
            autoComplete="tel"
            value={buyer.phone}
          />

          <label htmlFor="category">Select category:</label>
          {/* <select name="category" onChange={handleInput}>
            {category.map((c) => (
              <option
                type="checkbox"
                key={c._id}
                value={c._id}
                className="mr-2"
              >
                {c.name}
              </option>
            ))}
          </select> */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={handleInput}
            name="password"
            value={buyer.password}
            autoComplete="off"
          />
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            onChange={handlePassword}
            name="cpassword"
            value={cpassword}
            autoComplete="off"
          />
          <br></br>
          <p>{error}</p>
          <button type="submit">Update your profile</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBuyer;
