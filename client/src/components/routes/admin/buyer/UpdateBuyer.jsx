import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, json } from "react-router-dom";
function UpdateBuyer() {
  const [buyer, setBuyer] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/update").then(function (response) {
      setBuyer(() => response.data);
    });
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }, []);
  const handleInput = async (e) => {};
  async function handleSubmit(event) {
    event.preventDefault();
    await handleInput(event);
    // await check();
    // console.log(data);
  }
  return (
    <div>
      <p>Update Profile</p>
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
          required
          autoComplete="tel"
        />

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
          autoComplete="new-password"
        />
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          onChange={handleInput}
          name="cpassword"
          required
          autoComplete="new-password"
        />
        <br></br>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default UpdateBuyer;
