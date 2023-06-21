import React, { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { ServiceContext } from "../../context/ServiceContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { SelectionContext } from "../../context/SelectionContext";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { category } = useContext(CategoryContext);
  const { service } = useContext(ServiceContext);
  const navigate = useNavigate();
  let { user } = useUserAuth();
  let { selectedId, setSelectedId } = useContext(SelectionContext);
  const handleClick = async (id) => {
    setSelectedId(id);
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/`);
    }
  };

  return (
    <main className="bg-gray-100 py-10 px-4">
      <div className="mx-10">
        <h2 className="text-2xl mb-4 font-semibold text-center">
          Welcome to HobbyHive
        </h2>

        <p className="text-center text-lg font-medium pb-10">
          Welcome to our platform! We are dedicated to bringing together
          talented freelancers and employers seeking exceptional services at
          great value. Our community provides a seamless online environment
          where passion meets opportunity. Whether you're a skilled freelancer
          looking for exciting projects or an employer in need of top-notch
          services, our platform is the perfect place for you. Join our vibrant
          community and unlock a world of endless possibilities. Connect,
          collaborate, and unleash your potential in a dynamic and supportive
          online ecosystem. Sign in below to access your seller account and
          start exploring the incredible opportunities that await you.
        </p>
      </div>
      <div className="mx-10">
        <h2 className="text-2xl mb-4 font-semibold text-center">What We Do</h2>
        <p className="text-center text-lg font-medium pb-10">
          At HobbyHive, we are dedicated to bringing together a community of
          talented freelancers and businesses across various industries. Our
          platform offers a diverse range of services, including creative
          design, programming expertise, content writing, and marketing
          strategies. We strive to empower freelancers and businesses to
          connect, collaborate, and grow together in a seamless online
          environment. Whether you're looking to hire professionals or showcase
          your skills, HobbyHive is the perfect place for you to thrive.
        </p>
      </div>
      <div className="mx-10">
        <h2 className="text-2xl mb-4 font-semibold text-center">
          How Can HobbyHive Help You?
        </h2>
        <p className="text-center text-lg font-medium pb-10">
          HobbyHive provides a multitude of benefits and opportunities for both
          freelancers and businesses. By joining our platform, freelancers can
          gain access to a wide range of projects, connect with potential
          clients, and build a successful freelance career. Businesses, on the
          other hand, can tap into a pool of skilled professionals, find the
          right talent for their projects, and achieve exceptional results.
          Whether you're seeking new opportunities or looking for top-notch
          services, HobbyHive is here to help you reach your goals efficiently
          and effectively.
        </p>
      </div>
      <div className="mx-10">
        <h2 className="text-2xl mb-4 font-bold text-gray-900">Our Services</h2>
        {category && category.length > 0 ? (
          category.map((c) => (
            <div key={c._id} className="mb-8">
              <div className="text-lg font-semibold text-gray-900 bg-gray-300 p-2 rounded-md mr-2">
                {c.name}
              </div>
              <div className="flex overflow-x-auto">
                {service && service.length > 0 ? (
                  service.map((s) => {
                    if (c._id === s.category) {
                      return (
                        <Link to={`/buyer/seller/${s._id}?s=${s.name}`}>
                          <div
                            key={s._id}
                            className="flex-shrink-0 flex flex-col items-center justify-center mr-4 cursor-pointer bg-white rounded-lg shadow-md p-4"
                            // onClick={() => handleClick(s._id)}
                          >
                            <img
                              src={s.image}
                              alt={s.name}
                              className="w-48 h-auto mb-2"
                            />
                            <p className="text-gray-900 text-lg font-semibold">
                              {s.name}
                            </p>
                          </div>
                        </Link>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p>No services available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <div className="mx-10 py-5 bg-black text-white flex flex-col items-center">
        <h3 className="text-lg font-bold">How It Works:</h3>
        <p className="mt-2">Joining HobbyHive is quick and easy:</p>

        <ol className="list-decimal ml-4 mt-2">
          <li className="pb-2">Create an account and complete your profile.</li>
          <li className="pb-2">
            Browse through the available services Which you are intrested to get
            or looking for.
          </li>
          <li className="pb-2">
            Communicate, collaborate, and securely exchange information direct
            with varified Seller.
          </li>
          <li className="pb-2">
            Release payment once you are satisfied with the services.
          </li>
        </ol>
        <button className="bg-green-800 px-10 py-2 mt-5 mb-5">
          <Link to="/signup">SignUp</Link>
        </button>
      </div>
    </main>
  );
}

export default Home;
