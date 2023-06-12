import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddEmployer() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    category: [],
    password: "",
    role_id: "3",
  });

  const [category, setCategory] = useState([]);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }, []);

  const handleInput = async (e) => {
    var { name, value, checked } = e.target;
    if (name === "fName") {
      setData((prevdata) => ({
        ...prevdata,
        fName: e.target.value,
      }));
    } else if (name === "lName") {
      setData((prevdata) => ({
        ...prevdata,
        lName: e.target.value,
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
      if (checked) {
        setData((preveData) => ({
          ...preveData,
          category: [...preveData.category, value],
        }));
      } else {
        setData((preveData) => ({
          ...preveData,
          category: preveData.category.filter((s) => s !== value),
        }));
      }
    } else if (name === "password") {
      setData((prevdata) => ({
        ...prevdata,
        password: e.target.value,
      }));
    } else if (name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  function check() {
    console.log("here i am" + cpassword);
    if (data.password === cpassword) {
      try {
        const response = axios.post("http://localhost:8888/signup", data);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("password not match");
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await handleInput(event);
    await check();
    console.log(data);
  }
  return (
    <main>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fName">First Name:</label>
        <input type="text" onChange={handleInput} name="fName" required />
        <label htmlFor="lName">Last Name:</label>
        <input type="text" onChange={handleInput} name="lName" required />
        <label htmlFor="email">Email Address:</label>
        <input type="text" onChange={handleInput} name="email" required />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" onChange={handleInput} name="phone" required />

        <p htmlFor="category">Select category:</p>
        {category.map((s) => (
          <div key={s._id}>
            <label htmlFor="category">{s.name}</label>
            <input
              type="checkbox"
              name="category"
              value={s._id}
              onChange={handleInput}
            />
          </div>
        ))}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={handleInput}
          name="password"
          required
        />
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          onChange={handleInput}
          name="cpassword"
          required
        />
        <br></br>
        <button type="submit">Sign up</button>
      </form>
    </main>
  );
}

export default AddEmployer;
