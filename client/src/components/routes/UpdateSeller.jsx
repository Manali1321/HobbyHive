import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/axios";
import { ServiceContext } from "../../context/ServiceContext";
function UpdateSeller() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { service } = useContext(ServiceContext);

  const [seller, setSeller] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    service: "",
    business_number: "",
  });

  useEffect(() => {
    api.get(`seller/${id}`).then(function (res) {
      setSeller(() => res.data);
      setLoading(false);
    });
  }, []);
  const [loading, setLoading] = useState(true);
  // console.log(seller);

  // If rejected
  const [image, setImage] = useState();
  const [workpermit, setWorkpermit] = useState();
  const [sin, setSin] = useState();

  const [error, setError] = useState("");

  const [cpassword, setCpassword] = useState("");

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
      // console.log(data);
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
    } else if (name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = await uploadImage();
    const work = await uploadWork();
    const sin = await uploadSin();
    const check = async (e) => {
      if (data.password === cpassword) {
        try {
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

  // console.log(seller);
  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            onChange={handleInput}
            value={seller.user.first_name}
            name="first_name"
            required
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            value={seller.user.last_name}
            onChange={handleInput}
            name="last_name"
            required
          />
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            onChange={handleInput}
            value={seller.user.email}
            name="email"
            required
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            onChange={handleInput}
            value={seller.user.phone}
            name="phone"
            autoComplete="phone"
            required
          />

          <label htmlFor="service">Select service of your service:</label>
          <select name="service" onChange={handleInput}>
            {service.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <label htmlFor="business_number">Business Number:</label>
          <input
            type="text"
            onChange={handleInput}
            value={seller.business_number}
            name="business_number"
            required
          />
          <div>
            <label htmlFor="seller_image">Update your profile</label>
            {/* <img src={seller.seller_image} width={100} /> */}
            <input type="file" name="seller_image" onChange={handleInput} />
          </div>
          <div>
            <label htmlFor="workpermit">Update Workpermit</label>
            {/* <embed
              src={seller.workpermit}
              type="application/pdf"
              class="w-32 h-40"
            /> */}
            <input type="file" name="workpermit" onChange={handleInput} />
          </div>
          <div>
            {/* <embed src={seller.sin} type="application/pdf" class="w-30 h-60" /> */}
            <label htmlFor="sin">Update SIN</label>
            <input type="file" name="sin" onChange={handleInput} />
          </div>
          <label htmlFor="password">Old Password:</label>
          <input
            type="password"
            onChange={handleInput}
            name="password"
            value={seller.user.password}
            autoComplete="new-password"
            required
          />
          <label htmlFor="cpassword">Confirm password to make changes:</label>
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
      )}
    </main>
  );
}

export default UpdateSeller;
