import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { SelectionContext } from "../../context/SelectionContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();
  let { selectedId } = useContext(SelectionContext);

  const handleInput = (e) => {
    var { name } = e.target;
    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password") {
      setPass(e.target.value);
      if (e.target.value.length < 6) {
        setError("Password must be at least 6 characters");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const see = await logIn(email, password, "buyer");
      if (selectedId) {
        navigate(`/buyer/seller/${selectedId}`);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {error && <p className="text-red-600">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white rounded-md shadow-md p-6 space-y-4"
      >
        <label htmlFor="email" className="block text-gray-700 font-bold">
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label htmlFor="password" className="block text-gray-700 font-bold">
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="flex flex-col items-center mt-4">
        <p className="mb-2">Don't Have an Account yet?</p>
        <Link to="/signup">
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
