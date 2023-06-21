import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { ServiceContext } from "../../../../context/ServiceContext";
import { AiFillDelete } from "react-icons/ai";
function UpdateSeller() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { service } = useContext(ServiceContext);
  const [seller, setSeller] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`seller/${id}`).then(function (res) {
      // console.log(res.data);
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
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {seller.status === "rejected" ? (
            <>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                onChange={handleInput}
                value={data.first_name}
                name="first_name"
                required
              />
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                value={data.last_name}
                onChange={handleInput}
                name="last_name"
                required
              />
              <label htmlFor="service">Select service of your service:</label>
              <select
                name="service"
                onChange={handleInput}
                value={data.service._id}
              >
                <option value="">Select Value</option>
                {service &&
                  service.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="business_number">Business Number:</label>
              <input
                type="text"
                onChange={handleInput}
                value={data.business_number}
                name="business_number"
                required
              />
              <div>
                <label htmlFor="seller_image">Update your profile</label>
                <img src={seller.seller_image} width={100} />
                <input type="file" name="seller_image" onChange={handleInput} />
              </div>
              <div>
                <label htmlFor="workpermit">Update Workpermit</label>
                <embed
                  src={seller.workpermit}
                  type="application/pdf"
                  className="w-32 h-40"
                />
                <input type="file" name="workpermit" onChange={handleInput} />
              </div>
              <div>
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
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                disabled="disabled"
                value={data.first_name}
                name="first_name"
              />
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                value={data.last_name}
                name="last_name"
                disabled="disabled"
              />
              <label htmlFor="service">Your service:</label>
              <input
                type="text"
                value={data.service.name}
                name="email"
                disabled="disabled"
              />
              <label htmlFor="business_number">Business Number:</label>
              <input
                type="text"
                value={data.business_number}
                name="business_number"
                disabled="disabled"
              />
              <div>
                <p>Your Profile:</p>
                <img src={seller.seller_image} width={100} />
              </div>
              <div>
                <p>Your Workpermit</p>
                <embed
                  src={seller.workpermit}
                  type="application/pdf"
                  className="w-32 h-40"
                />
              </div>
              <div>
                <p>Your SIN</p>
                <embed
                  src={seller.sin}
                  type="application/pdf"
                  className="w-30 h-60"
                />
              </div>
            </>
          )}
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            onChange={handleInput}
            value={data.email}
            name="email"
            required
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            onChange={handleInput}
            value={data.phone}
            name="phone"
            autoComplete="phone"
            required
          />
          {seller.status === "approved" ? (
            <>
              {seller.resume ? (
                <>
                  <div>
                    <p>Your Resume</p>
                    <embed
                      src={seller.resume}
                      type="application/pdf"
                      className="w-30 h-60"
                    />
                  </div>

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
                  <div>
                    <p>Your Portfolio</p>
                    <embed
                      src={seller.porfolio}
                      type="application/pdf"
                      className="w-30 h-60"
                    />
                  </div>

                  <label htmlFor="portfolio" className="block mb-2">
                    Update your Portfolio
                  </label>
                  <input type="file" name="portfolio" onChange={handleInput} />
                </>
              ) : (
                <>
                  <label htmlFor="porfolio" className="block mb-2">
                    Add Porfolio
                  </label>
                  <input
                    type="file"
                    name="porfolio"
                    onChange={handleInput}
                    required
                  />
                </>
              )}
            </>
          ) : null}

          <label htmlFor="password">Old Password or Reset Password:</label>
          <input
            type="password"
            onChange={handleInput}
            name="password"
            value={data.password}
            autoComplete="new-password"
            required
          />
          <label htmlFor="cpassword">Confirm password:</label>
          <input
            type="password"
            onChange={handleInput}
            name="cpassword"
            autoComplete="off"
            required
          />
          <button type="submit">
            <Link
              to={`/seller/delete/${seller.user._id}?first_name=${seller.user.first_name}`}
              className="text-red-500"
            >
              <AiFillDelete /> Delete your account
            </Link>
          </button>
          <p>{error}</p>
          <button type="submit">Update your profile</button>
        </form>
      )}
    </main>
  );
}

export default UpdateSeller;
