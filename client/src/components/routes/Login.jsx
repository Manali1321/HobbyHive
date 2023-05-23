import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  async function check() {
    if (!email || !password) {
      return "<p>Missing<p>";
    }
    try {
      const response = await axios.post("http://localhost:8888/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data === "Good to go") {
        navigate("/");
      } else {
        setError("* Wrong Password");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await check();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          name="email"
          id="email"
          key="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          key="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password here"
        ></input>
        <button type="Submit">Submit</button>
      </form>
      <div>
        <p>Don't Have Account yet??</p>
        <Link to="/signup">
          <button type="submit">Sign Up</button>
        </Link>
      </div>
    </main>
  );
}
export default Login;
