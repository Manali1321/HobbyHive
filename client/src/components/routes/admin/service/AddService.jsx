import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { CategoryContext } from "../../../../context/CategoryContext";
import { ServiceContext } from "../../../../context/ServiceContext";

function AddService() {
  const navigate = useNavigate();
  const { category, setCategory } = useContext(CategoryContext);
  const { refetchData } = useContext(ServiceContext);

  const [service, setService] = useState({
    name: "",
    // image: "",
    category: "",
  });
  const [image, setImage] = useState();

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "name") {
      setService((prevService) => ({
        ...prevService,
        name: value,
      }));
    } else if (name === "image") {
      setImage(files[0]);
    } else if (name === "category") {
      setService((prevService) => ({
        ...prevService,
        category: value,
      }));
    }
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wwxgqx9l");
    data.append("cloud_name", "dywtcmvoo");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dywtcmvoo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await response.json();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (service.name !== "" && service.category !== "" && image) {
      const result = await uploadImage();

      try {
        await api.post("admin/service/add", { ...service, image: result.url });
        refetchData();
        navigate("/admin/service");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchData = async () => {
    const resCategory = await api.get("/admin/category");
    setCategory(resCategory.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-8">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="text-lg font-bold">
            Add Name of Service
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            required
            className="border border-gray-300 p-2 block w-full"
          />
        </div>
        <div>
          <label htmlFor="image" className="text-lg font-bold">
            Add Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleInput}
            required
            className="border border-gray-300 p-2 block w-full"
          />
        </div>
        <div>
          <label htmlFor="category" className="text-lg font-bold">
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleInput}
            defaultValue=""
            required
            className="border border-gray-300 p-2 block w-full"
          >
            <option value="" disabled>
              Select value
            </option>
            {category &&
              category.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddService;
