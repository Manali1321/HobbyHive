import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CategoryContext } from "../../context/CategoryContext";
import { ServiceContext } from "../../context/ServiceContext";

function Home() {
  const { category } = useContext(CategoryContext);
  const { service } = useContext(ServiceContext);

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
        {category &&
          category.map((c) => (
            <div key={c._id}>
              <h3>{c.name}</h3>
              {service.map((s) => {
                if (c._id === s.category) {
                  return s.name;
                }
              })}
            </div>
          ))}
      </div>
    </main>
  );
}
export default Home;
