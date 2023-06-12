import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
function UpdateService() {
  const [image, setImage] = useState({
    image: null,
  });
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8888/admin/service/update/${id}`)
      .then(function (response) {
        setImage(response.data);
        setData(response.data);
      });
  }, []);
  // console.log(data);

  const handleInput = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const handleFileInput = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    console.log(formData.get("name"));
    try {
      axios
        .put(`http://localhost:8888/admin/service/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(navigate(`/admin/service/`));
    } catch (err) {
      console.error(err);
    }
    // navigate("/admin/service");
  };
  return (
    <main>
      <p>Update Service</p>
      {data.image && (
        <img
          src={`http://localhost:8888/storage/${image.image.data}`}
          width={200}
          alt="image of service"
        />
      )}
      <form onSubmit={handleSubmit}>
        <div key={data._id}>
          <label htmlFor="service">Add Name of Service</label>
          <input
            type="text"
            name="service"
            value={data.name}
            onChange={handleInput}
          />

          <label htmlFor="image">Edit Image</label>
          <input type="file" name="image" onChange={handleFileInput} />
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
export default UpdateService;
