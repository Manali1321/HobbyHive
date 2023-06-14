import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddSeller() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    service: "",
    image: null,
    sin: null,
    work_permit: null,
    photo_id: null,
    business_number: null,
    password: "",
    role_id: "4",
    timestemp: new Date().toISOString().slice(0, 16),
  });
  const [error, setError] = useState("");
  const [service, setService] = useState([]);

  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);

  const handleInput = async (e) => {
    console.log(e.target.name);
    var { name } = e.target;
    if (name === "fName") {
      setData({ ...data, fName: e.target.value });
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
    } else if (name === "service") {
      console.log(e.target.value);
      setData((prevdata) => ({
        ...prevdata,
        service: e.target.value,
      }));
    } else if (name === "image") {
      const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.onloadend = () => {
      setData((prevdata) => ({
        ...prevdata,
        image: file,
      }));
      // };
      // reader.readAsDataURL(file);
    } else if (name === "password") {
      setData((prevdata) => ({
        ...prevdata,
        password: e.target.value,
      }));
    } else if (name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  async function check() {
    if (data.password === cpassword) {
      try {
        const response = await axios.post(
          "http://localhost:8888/seller/add",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/admin/seller");
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
    console.log(data);
  }

  return (
    <main>
      <p>To Become Seller</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fName">First Name:</label>
        <input type="text" onChange={handleInput} name="fName" required />
        <label htmlFor="lName">Last Name:</label>
        <input type="text" onChange={handleInput} name="lName" required />
        <label htmlFor="email">Email Address:</label>
        <input type="text" onChange={handleInput} name="email" required />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          onChange={handleInput}
          name="phone"
          autoComplete="phone"
          required
        />

        <label htmlFor="service">Select service of your service:</label>
        <select name="service" onChange={handleInput}>
          {service.map((s) => (
            <option
              defaultValue={data.service === s._id}
              key={s._id}
              value={s._id}
            >
              {s.name}
            </option>
          ))}
        </select>
        <label htmlFor="image">Set Profile</label>
        <input type="file" name="image" onChange={handleInput} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={handleInput}
          name="password"
          autoComplete="new-password"
          required
        />
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          onChange={handleInput}
          name="cpassword"
          autoComplete="off"
          required
        />
        <p>{error}</p>
        <button type="submit">Sign up</button>
      </form>
    </main>
  );
}

export default AddSeller;
