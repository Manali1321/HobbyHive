import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../../context/CategoryContext";
import { api } from "../../../../utils/axios";
import { ServiceContext } from "../../../../context/ServiceContext";
function UpdateService() {
  const { category } = useContext(CategoryContext);
  const { refetchData } = useContext(ServiceContext);

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
      refetchData();
    } catch (err) {
      console.error(err);
    }
    navigate("/admin/service");
  };
  return (
    <main>
      <div class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <p class="text-2xl font-bold m-4 text-center">Update Service</p>
        {service.image && (
          <img
            src={service.image}
            width={200}
            alt="image of service"
            class="mb-4"
          />
        )}
        <form onSubmit={handleSubmit} class="space-y-4">
          <div key={service._id}>
            <div>
              <label htmlFor="name" class="block mb-2">
                Add Name of Service
              </label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleInput}
                class="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" class="block mb-2">
                Edit Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInput}
                class="block"
              />
            </div>
            <div>
              <label htmlFor="category" class="block mb-2">
                Category
              </label>
              <select
                value={service.category}
                name="category"
                id="category"
                onChange={handleInput}
                class="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">select value</option>
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
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
export default UpdateService;
