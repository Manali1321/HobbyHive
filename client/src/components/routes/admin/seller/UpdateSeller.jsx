import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { ServiceContext } from "../../../../context/ServiceContext";
import { AiFillDelete } from "react-icons/ai";
import { useUserAuth } from "../../../../context/UserAuthContext";
function UpdateSeller() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { service } = useContext(ServiceContext);
  const [seller, setSeller] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userrole } = useUserAuth();
  useEffect(() => {
    api.get(`seller/${id}`).then(function (res) {
      setSeller(() => res.data);
      setData(() => ({
        first_name: res.data.user ? res.data.user.first_name : "",
        last_name: res.data.user ? res.data.user.last_name : "",
        email: res.data.user ? res.data.user.email : "",
        phone: res.data.user ? res.data.user.phone : "",
        password: res.data.user ? res.data.user.password : "",
        service: res.data.service || "",
        business_number: res.data.business_number || "",
        resume: res.data.resume || "",
        portfolio: res.data.porfolio || "",
        status: res.data.status || "",
      }));
      setLoading(false);
    });
  }, []);
  // console.log(seller);

  // If rejected
  const [image, setImage] = useState();
  const [workpermit, setWorkpermit] = useState();
  const [sin, setSin] = useState();
  const [resume, setResume] = useState();
  const [portfolio, setPortfolio] = useState();

  const [error, setError] = useState("");

  const [cpassword, setCpassword] = useState("");

  const uploadImage = async () => {
    if (image === undefined) {
      const imageurl = { url: seller.seller_image };
      // console.log(imageurl);
      return imageurl;
    } else {
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
    }
  };

  const uploadWork = async () => {
    if (workpermit === undefined) {
      const workurl = { url: seller.workpermit };
      // console.log(imageurl);
      return workurl;
    } else {
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
    }
  };
  const uploadSin = async () => {
    if (sin === undefined) {
      const sinurl = { url: seller.sin };
      // console.log(sinurl);
      return sinurl;
    } else {
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
    }
  };
  const uploadResume = async () => {
    if (resume === undefined) {
      const resume = { url: seller.resume };
      console.log(resume);
      return resume;
    } else {
      const data = new FormData();
      data.append("file", resume);
      data.append("upload_preset", "wwxgqx9l");
      data.append("cloud_name", "dywtcmvoo");
      const resumeurl = await fetch(
        "https://api.cloudinary.com/v1_1/dywtcmvoo/upload",
        {
          method: "POST",
          body: data,
        }
      );
      console.log(resumeurl);
      return await resumeurl.json();
    }
  };
  const uploadPortfolio = async () => {
    if (portfolio === undefined) {
      const portfoliourl = { url: seller.portfolio };
      console.log(portfoliourl);
      return portfoliourl;
    } else {
      const data = new FormData();
      data.append("file", portfolio);
      data.append("upload_preset", "wwxgqx9l");
      data.append("cloud_name", "dywtcmvoo");
      const portfoliourl = await fetch(
        "https://api.cloudinary.com/v1_1/dywtcmvoo/upload",
        {
          method: "POST",
          body: data,
        }
      );
      console.log(portfoliourl);
      return await portfoliourl.json();
    }
  };
  const handleInput = async (e) => {
    console.log(e.target.name);
    const { name, value, files } = e.target;
    if (name === "first_name") {
      setData((prevdata) => ({
        ...prevdata,
        first_name: e.target.value,
      }));
      console.log(data);
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
      console.log(e.target.value);
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
    } else if (name === "portfolio") {
      setPortfolio(files[0]);
    } else if (name === "resume") {
      setResume(files[0]);
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
    const resume = await uploadResume();
    console.log(resume.url);
    const porfolio = await uploadPortfolio();
    console.log(porfolio.url);

    console.log(data);
    const check = async (e) => {
      if (data.password === cpassword) {
        console.log(data.password);
        console.log(cpassword);
        try {
          let updateData = {
            ...data,
            workpermit: await work.url,
            sin: await sin.url,
            seller_image: await image.url,
            porfolio: await porfolio.url,
            resume: await resume.url,
          };

          if (data.status === "rejected") {
            updateData.status = "pending";
          }
          const response = await api.put(`/seller/update/${id}`, updateData);
          console.log(response);
          if (data.status === "pending") {
            setError("Your Profile has been submited Waiting for approval");
          } else {
            setError("Your profile is updated");
          }
          navigate(`/seller/update/${id}`);
        } catch (err) {
          console.log(err);
        }
      } else {
        setError("Password not match");
      }
    };
    check();
  };

  return (
    <main className="bg-blue-300 py-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto border-4 border-gray-300 p-14"
        >
          {seller.status === "rejected" &&
          (seller.role === "seller" || "admin") ? (
            <>
              <label htmlFor="first_name" className="block mb-2">
                First Name:
              </label>
              <input
                type="text"
                onChange={handleInput}
                value={data.first_name}
                name="first_name"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="last_name" className="block mb-2">
                Last Name:
              </label>
              <input
                type="text"
                value={data.last_name}
                onChange={handleInput}
                name="last_name"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="service" className="block mb-2">
                Select service of your service:
              </label>
              <select
                name="service"
                onChange={handleInput}
                value={data.service._id}
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Value</option>
                {service &&
                  service.map((s) => (
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
                value={data.business_number}
                name="business_number"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <div className="mb-2">
                <label htmlFor="seller_image">Update your profile</label>
                <img src={seller.seller_image} width={100} />
                <input type="file" name="seller_image" onChange={handleInput} />
              </div>
              <div className="mb-2">
                <label htmlFor="workpermit">Update Workpermit</label>
                <embed
                  src={seller.workpermit}
                  type="application/pdf"
                  className="w-32 h-40"
                />
                <input type="file" name="workpermit" onChange={handleInput} />
              </div>
              <div className="mb-2">
                <embed
                  src={seller.sin}
                  type="application/pdf"
                  className="w-30 h-60"
                />
                <label htmlFor="sin">Update SIN</label>
                <input type="file" name="sin" onChange={handleInput} />
              </div>
            </>
          ) : (
            <>
              <div className="flex-container">
                <div className="details">
                  <label htmlFor="first_name" className="block mb-2">
                    First Name:
                  </label>
                  <input
                    type="text"
                    disabled="disabled"
                    value={data.first_name}
                    name="first_name"
                    className="border border-gray-300 p-2 mb-2 bg-gray-100"
                  />
                  <label htmlFor="last_name" className="block mb-2">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={data.last_name}
                    name="last_name"
                    disabled="disabled"
                    className="border border-gray-300 p-2 mb-2 bg-gray-100"
                  />
                  <label htmlFor="service" className="block mb-2">
                    Your service:
                  </label>
                  <input
                    type="text"
                    value={data.service.name}
                    name="email"
                    disabled="disabled"
                    className="border border-gray-300 p-2 mb-2 bg-gray-100"
                  />
                  <label htmlFor="email" className="block mb-2">
                    Email:
                  </label>
                  <input
                    type="text"
                    value={data.email}
                    name="email"
                    disabled="disabled"
                    className="border border-gray-300 p-2 mb-2 bg-gray-100"
                  />
                  <label htmlFor="phone" className="block mb-2">
                    Phone:
                  </label>
                  <input
                    type="text"
                    value={data.phone}
                    name="phone"
                    disabled="disabled"
                    className="border border-gray-300 p-2 mb-2 bg-gray-100"
                  />
                </div>
                <div className="image-container">
                  <div className="mb-2">
                    <div>
                      <p>Profile:</p>
                      <img
                        src={seller.seller_image}
                        width={300}
                        alt="Profile"
                      />
                    </div>
                    {seller.resume ? (
                      <div className="mb-2">
                        <p>Resume</p>
                        <embed
                          src={seller.resume}
                          type="application/pdf"
                          className="w-30 h-60"
                        />
                      </div>
                    ) : null}
                    {seller.portfolio ? (
                      <div className="mb-2">
                        <p>Portfolio</p>
                        <embed
                          src={seller.portfolio}
                          type="application/pdf"
                          className="w-30 h-60"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {seller.status === "approved" &&
              (seller.role === "seller" || "admin") ? (
                <>
                  {seller.resume ? (
                    <>
                      <label htmlFor="resume" className="block mb-2">
                        Update your Resume
                      </label>
                      <input type="file" name="resume" onChange={handleInput} />
                    </>
                  ) : (
                    <>
                      <label htmlFor="resume" className="block mb-2">
                        Add Resume
                      </label>
                      <input
                        type="file"
                        name="resume"
                        onChange={handleInput}
                        required
                      />
                    </>
                  )}

                  {seller.portfolio ? (
                    <>
                      <label htmlFor="portfolio" className="block mb-2">
                        Update your Portfolio
                      </label>
                      <input
                        type="file"
                        name="portfolio"
                        onChange={handleInput}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="portfolio" className="block mb-2">
                        Add Portfolio
                      </label>
                      <input
                        type="file"
                        name="portfolio"
                        onChange={handleInput}
                        required
                      />
                    </>
                  )}
                </>
              ) : null}
            </>
          )}
          {seller.role === "seller" || "admin" ? (
            <>
              <label htmlFor="email" className="block mb-2">
                Email Address:
              </label>
              <input
                type="email"
                onChange={handleInput}
                value={data.email}
                name="email"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="phone" className="block mb-2">
                Phone:
              </label>
              <input
                type="number"
                onChange={handleInput}
                value={data.phone}
                name="phone"
                autoComplete="phone"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />

              <label htmlFor="password" className="block mb-2">
                Old Password or Reset Password:
              </label>
              <input
                type="password"
                onChange={handleInput}
                name="password"
                value={data.password}
                autoComplete="new-password"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="cpassword" className="block mb-2">
                Confirm password:
              </label>
              <input
                type="password"
                onChange={handleInput}
                name="cpassword"
                autoComplete="off"
                required
                className="border border-gray-300 p-2 mb-2 focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="text-red-500 mb-2">
                <Link
                  to={`/seller/delete/${seller.user._id}?first_name=${seller.user.first_name}`}
                  className="text-red-500"
                >
                  <AiFillDelete /> Delete your account
                </Link>
              </button>
              <p>{error}</p>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Update your profile
              </button>
            </>
          ) : null}
        </form>
      )}
    </main>
  );
}

export default UpdateSeller;
