import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
    axios.get("http://localhost:8888/category").then(function (response) {
      setCategory(() => response.data);
    });
  }, []);
  const handleClick = async (e) => {
    navigate("/login");
  };
  return (
    <main>
      <p>
        Welcome to our platform, where passion meets opportunity. Whether you're
        a talented freelancer or an employer seeking top-notch services at great
        value, our community is the perfect place for you. Connect, collaborate,
        and unleash your potential in a seamless online environment. Join us
        today and unlock a world of endless possibilities.
      </p>
      <div>
        <h2>List of Service</h2>
        {category.map((c) => (
          <div key={c._id}>
            <h3>{c.name}</h3>
            <div className="service-wrapper">
              {c.service.map((s) => {
                const test = service.find((item) => item._id === s);
                if (test) {
                  return (
                    <div
                      key={test._id}
                      className="service"
                      onClick={handleClick}
                    >
                      <img
                        src={`http://localhost:8888/storage/service/${test.image.data}`}
                        width={175}
                        height={200}
                      />
                      <h4>{test.name}</h4>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
export default Home;
