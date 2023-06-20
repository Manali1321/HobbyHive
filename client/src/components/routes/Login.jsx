import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

  const handleInput = (e) => {
    var { name } = e.target;
    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password") {
      setPass(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await logIn(email, password, "buyer");
      navigate("/admin/seller");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {error && <p>{error}</p>}
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
          required
          onChange={handleInput}
          autoComplete="email"
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
          required
          onChange={handleInput}
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
        <Link to="/signup" className="mt-2">
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
export default Login;
