import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../../context/CategoryContext";
import { api } from "../../../../utils/axios";
function UpdateService() {
  const { category } = useContext(CategoryContext);
  const [service, setService] = useState({
    name: "",
    image: "",
    category: "",
  });
  // const [check, setCheck] = useState("");
  const [image, setImage] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const fetchService = await api.get(`/admin/service/${id}`);
    console.log(fetchService);
    setService(fetchService.data);
    // setCheck(fetchService.data.image);
    // console.log(fetchService.data.image);
    // setImage(fetchService.data.image);
    // const resCategory = await api.get(`/admin/category/`);
    // setCategory(resCategory.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "name") {
      setService((service) => ({
        ...service,
        name: value,
      }));
    } else if (name === "image") {
      // console.log(files[0]);
      setImage(files[0]);
    } else if (name === "category") {
      setService((prevService) => ({
        ...prevService,
        category: value,
      }));
    }
    console.log(setImage);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("file", image);
      data.append("upload_preset", "wwxgqx9l");
      data.append("cloud_name", "dywtcmvoo");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dywtcmvoo/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const result = await response.json();
      console.log(result.url);

      await api.put(`/admin/service/update/${id}`, {
        ...service,
        image: result.url,
      });
      console.log(service);
    } catch (err) {
      console.error(err);
    }
    navigate("/admin/service");
  };
  return (
    <main>
      <p>Update Service</p>
      {service.image && (
        <img src={service.image} width={200} alt="image of service" />
      )}
      <form onSubmit={handleSubmit}>
        <div key={service._id}>
          <label htmlFor="name">Add Name of Service</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleInput}
          />

          <label htmlFor="image">Edit Image</label>
          <input type="file" name="image" onChange={handleInput} />
          <label htmlFor="category">Category</label>
          <select
            value={service.category}
            name="category"
            id="category"
            onChange={handleInput}
          >
            <option value="">select value</option>
            {category &&
              category.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
export default UpdateService;
