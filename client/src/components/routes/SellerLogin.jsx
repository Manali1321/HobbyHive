import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function SellerLogin() {
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
      const response = await axios.post("http://localhost:8888/seller/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data[0] === true) {
        console.log("user is seller");
      } else if (response.data === false) {
        console.log("user is waiting");
      }
      navigate(`/seller/profile/${response.data[1]}`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await check();
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4">Seller log in</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white rounded-md shadow-md p-6"
      >
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email Address:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          key="email"
          value={email}
          autoComplete="email"
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          key="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          placeholder="Enter your password here"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="mt-4">
        <p>Don't Have an Account yet?</p>
        <Link to="/seller/add" className="mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
export default SellerLogin;
