import React, { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { ServiceContext } from "../../context/ServiceContext";
import { useUserAuth } from "../../context/UserAuthContext";

function Home() {
  const { category } = useContext(CategoryContext);
  const { service } = useContext(ServiceContext);
  let { user } = useUserAuth;

  console.log(user);
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
                  return (
                    <div key={s._id}>
                      <img src={s.image} alt={s.name} width={300} />
                      <p>{s.name}</p>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        In this updated code, the inner map function checks if the category ID
        matches the category property of each service. If there is a match, it
        returns the JSX elements with the service's image and name. If there is
        no match, it returns null or you can omit that line if you don't want to
        display anything for non-matching services. Note: Make sure that
        category and service are valid arrays with the necessary data before
        rendering this code.
      </div>
    </main>
  );
}
export default Home;
