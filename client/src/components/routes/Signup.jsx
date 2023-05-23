import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddEmployer() {
  const [data, setData] = useState({
    fName: "",
    lname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    category: [],
    role: "6468f0b21a076c81455aff1f",
  });
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/signup").then(function (response) {
      setCountry(() => response.data);
    });
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }, []);
  async function handleCity(name) {
    for (let i = 0; i < country.length; i++) {
      if (country[i].country === name) {
        console.log(country[i].city);
        setCity(() => country[i].city);
      }
    }
    console.log(city);
  }
  useEffect(() => {
    console.log(city);
  }, [city]);

  const handleInput = async (e) => {
    var { name, value, checked } = e.target;
    if (name === "fName") {
      setData((prevdata) => ({
        ...prevdata,
        fName: e.target.value,
      }));
    } else if ((name = "lName")) {
      setData((prevdata) => ({
        ...prevdata,
        lName: e.target.value,
      }));
    } else if ((name = "email")) {
      setData((prevdata) => ({
        ...prevdata,
        email: e.target.value,
      }));
    } else if ((name = "phone")) {
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
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
    await handleInput(e);
    await check();
    navigate("/login");
  }
  return (
    <main>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fName">First Name:</label>
        <input type="text" onChange={handleInput} name="fName"></input>
        <label htmlFor="lName">Last Name:</label>
        <input type="text" onChange={handleInput} name="lName"></input>
        <label htmlFor="email">Email Address:</label>
        <input type="text" onChange={handleInput} name="email"></input>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" onChange={handleInput} name="phone"></input>
        <label htmlFor="country"> Country: </label>
        <select name="country" onChange={(e) => handleCity(e.target.value)}>
          <option type="text" value="none" key="" disabled>
            Choose one country
          </option>
          {country.map((c) => (
            <option
              value={c.country}
              key={c.country}
              type="text"
              name="country"
            >
              {c.country}
            </option>
          ))}
        </select>
        <lable htmlFor="city">City:</lable>
        <select name="city" id="city">
          <option type="text" value="none" key="" disabled>
            Choose one city
          </option>
          {city.map((t) => (
            <option value={t} key={t} type="text" name="city">
              {t}
            </option>
          ))}
        </select>
        <p htmlFor="category">Select category:</p>
        {category.map((s) => (
          <div key={s._id}>
            <label htmlFor="category">{s.name}</label>
            <input
              type="checkbox"
              name="category"
              value={s._id}
              onChange={handleInput}
            ></input>
          </div>
        ))}
        <button type="submit">Sign up</button>
      </form>
    </main>
  );
}

export default AddEmployer;
