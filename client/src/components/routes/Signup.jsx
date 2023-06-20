import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/axios";
import { CategoryContext } from "../../context/CategoryContext";
import { useUserAuth } from "../../context/UserAuthContext";
function AddEmployer() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();
  const { category } = useContext(CategoryContext);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    category: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleInput = async (e) => {
    var { name, value, checked } = e.target;
    if (name === "first_name") {
      setData((prevdata) => ({
        ...prevdata,
        first_name: e.target.value,
      }));
    } else if (name === "last_name") {
      setData((prevdata) => ({
        ...prevdata,
        last_name: e.target.value,
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
      setData((prevdata) => ({
        ...prevdata,
        category: e.target.value,
      }));
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
        await signUp(data.email, data.password);
        const response = api.post("/buyer/signup", data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Password not match");
    }
    navigate("/login");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await check();
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4">Sign Up</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white rounded-md shadow-md p-6"
      >
        <label
          htmlFor="first_name"
          className="block text-gray-700 font-bold mb-2"
        >
          First Name:
        </label>
        <input
          type="text"
          onChange={handleInput}
          name="first_name"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label
          htmlFor="last_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Last Name:
        </label>
        <input
          type="text"
          onChange={handleInput}
          name="last_name"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email Address:
        </label>
        <input
          type="email"
          onChange={handleInput}
          name="email"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
          Phone:
        </label>
        <input
          type="number"
          onChange={handleInput}
          name="phone"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label className="block text-gray-700 font-bold mb-2">
          Which category are you interested in:
        </label>
        <select
          className="flex items-center mb-2"
          name="category"
          onChange={handleInput}
          defaultValue=""
        >
          <option value="" disabled>
            Select value
          </option>
          {category.map((c) => (
            <option key={c._id} value={c._id} className="mr-2">
              {c.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          onChange={handleInput}
          name="password"
          autoComplete="off"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <label
          htmlFor="cpassword"
          className="block text-gray-700 font-bold mb-2"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          onChange={handleInput}
          name="cpassword"
          autoComplete="off"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />

        <p className="text-red-500 mb-4">{error}</p>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}

export default AddEmployer;
