import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { ServiceContext } from "../../../../context/ServiceContext";
import { useUserAuth } from "../../../../context/UserAuthContext";
function AddSeller() {
  const { service } = useContext(ServiceContext);
  const { signUp } = useUserAuth();

  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [workpermit, setWorkpermit] = useState();
  const [sin, setSin] = useState();
  const [error, setError] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    service: "",
    business_number: "",
  });

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wwxgqx9l");
    data.append("cloud_name", "dywtcmvoo");
    const imageurl = await fetch(
      "https://api.cloudinary.com/v1_1/dywtcmvoo/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await imageurl.json();
  };
  const uploadWork = async () => {
    const data = new FormData();
    data.append("file", workpermit);
    data.append("upload_preset", "wwxgqx9l");
    data.append("cloud_name", "dywtcmvoo");
    const workurl = await fetch(
      "https://api.cloudinary.com/v1_1/dywtcmvoo/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await workurl.json();
  };
  const uploadSin = async () => {
    const data = new FormData();
    data.append("file", sin);
    data.append("upload_preset", "wwxgqx9l");
    data.append("cloud_name", "dywtcmvoo");
    const sinurl = await fetch(
      "https://api.cloudinary.com/v1_1/dywtcmvoo/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await sinurl.json();
  };
  const handleInput = async (e) => {
    console.log(e.target.name);
    const { name, value, files } = e.target;
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
    } else if (name === "service") {
      setData((prevdata) => ({
        ...prevdata,
        service: e.target.value,
      }));
    } else if (name === "business_number") {
      setData((prevdata) => ({
        ...prevdata,
        business_number: e.target.value,
      }));
      console.log(data);
    } else if (name === "seller_image") {
      setImage(files[0]);
    } else if (name === "workpermit") {
      setWorkpermit(files[0]);
    } else if (name === "sin") {
      setSin(files[0]);
    } else if (name === "password") {
      setData((prevdata) => ({
        ...prevdata,
        password: e.target.value,
      }));
      if (e.target.value.length < 6) {
        setError("Password must be at least 6 characters");
      } else {
        setError("");
      }
    } else if (name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = await uploadImage();
    const work = await uploadWork();
    const sin = await uploadSin();
    const check = async () => {
      if (data.password === cpassword) {
        try {
          await signUp(data.email, data.password);
          const response = await api.post("/seller/signup", {
            ...data,
            workpermit: await work.url,
            sin: await sin.url,
            seller_image: await image.url,
          });
          console.log(response);
          navigate("/admin/seller");
        } catch (err) {
          console.log(err);
        }
      } else {
        setError("password not match");
      }
    };
    check();
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <p className="text-xl font-bold mb-4">To Become Seller</p>
      <form className="w-64" onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="block mb-2">
          First Name:
        </label>
        <input
          type="text"
          onChange={handleInput}
          name="first_name"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <label htmlFor="last_name" className="block mb-2">
          Last Name:
        </label>
        <input
          type="text"
          onChange={handleInput}
          name="last_name"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <label htmlFor="email" className="block mb-2">
          Email Address:
        </label>
        <input
          type="email"
          onChange={handleInput}
          name="email"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <label htmlFor="phone" className="block mb-2">
          Phone:
        </label>
        <input
          type="number"
          onChange={handleInput}
          name="phone"
          autoComplete="phone"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />

        <label htmlFor="service" className="block mb-2">
          Which service do you want to provide:
        </label>
        <select
          name="service"
          onChange={handleInput}
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select value
          </option>
          {service.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <label htmlFor="business_number" className="block mb-2">
          Business Number:
        </label>
        <input
          type="text"
          onChange={handleInput}
          name="business_number"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <label htmlFor="seller_image" className="block mb-2">
          Set your profile
        </label>
        <input
          type="file"
          name="seller_image"
          onChange={handleInput}
          className="mb-2"
          required
        />
        <label htmlFor="workpermit" className="block mb-2">
          Add your work permit
        </label>
        <input
          type="file"
          name="workpermit"
          onChange={handleInput}
          className="mb-2"
          required
        />
        <label htmlFor="sin" className="block mb-2">
          Add social insurance number
        </label>
        <input
          type="file"
          name="sin"
          onChange={handleInput}
          className="mb-2"
          required
        />
        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          onChange={handleInput}
          name="password"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <label htmlFor="cpassword" className="block mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          onChange={handleInput}
          name="cpassword"
          required
          className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
        />
        <p className="text-red-500 mb-2">{error}</p>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}

export default AddSeller;
