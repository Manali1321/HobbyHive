// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SellerProfile() {
  const [data, setData] = useState({});
  const [service, setService] = useState([]);
  // const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8888/seller/${id}`).then(function (response) {
      setData(() => response.data);
    });
    axios.get(`http://localhost:8888/service`).then(function (response) {
      setService(() => response.data);
    });
    // console.log(data);
  }, []);

  return (
    <main>
      <p>Profile</p>
      <form>
        <label htmlFor="fName">First Name:</label>
        <input type="text" name="fName" value={data.first_name} required />
        <label htmlFor="lName">Last Name:</label>
        <input type="text" name="lName" value={data.last_name} required />
        <label htmlFor="email">Email Address:</label>
        <input type="text" name="email" value={data.email} required />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          autoComplete="phone"
          value={data.phone}
          required
        />

        <label htmlFor="service">Select service of your service:</label>
        <select name="service">
          {service.map((s) => (
            <option
              defaultValue={data.service === s._id}
              key={s._id}
              value={data.service}
            >
              {s.name}
            </option>
          ))}
        </select>
        {/* <label htmlFor="image">Set Profile</label>
        <input type="file" name="image" /> */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          // autoComplete="new-password"
          value={data.password}
          required
        />
        {/* <label htmlFor="cpassword">Confirm Password:</label> */}
        {/* <input type="password" name="cpassword" autoComplete="off" required /> */}
        {/* <p>{error}</p> */}
        {/* <button type="submit">Sign up</button> */}
      </form>
    </main>
  );
}
export default SellerProfile;
