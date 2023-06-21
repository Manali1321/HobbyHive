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
    <main className="bg-gray-100">
      <div className="mx-10 py-10 px-4">
        <div className="flex flex-col md:flex-row items-center p-4">
          <img src="/intro.webp" alt="image" className="w-full max-w-xs" />
          <div className="md:pl-10 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold">Welcome</h2>
            <p className="text-lg font-medium flex-grow mt-4 md:mt-0">
              Welcome to our platform! We are dedicated to bringing together
              talented freelancers and employers seeking exceptional services at
              great value. Our community provides a seamless online environment
              where passion meets opportunity.
              <br />
              Whether you're a skilled freelancer looking for exciting projects
              or an employer in need of top-notch services, our platform is the
              perfect place for you. Join our vibrant community and unlock a
              world of endless possibilities.
              <br />
              Connect, collaborate, and unleash your potential in a dynamic and
              supportive online ecosystem. Sign in below to access your seller
              account and start exploring the incredible opportunities that
              await you.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-10">
        <h2 className="text-2xl mb-4 font-semibold text-center">What We Do</h2>
        <div className="mx-10">
          <p className="text-center text-lg font-medium pb-10">
            At HobbyHive, we are dedicated to bringing together a community of
            talented freelancers and businesses across various industries. Our
            platform offers a diverse range of services, including creative
            design, programming expertise, content writing, and marketing
            strategies. We strive to empower freelancers and businesses to
            connect, collaborate, and grow together in a seamless online
            environment. Whether you're looking to hire professionals or
            showcase your skills, HobbyHive is the perfect place for you to
            thrive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <img
                src="/connect1.png"
                alt="connect-image"
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-xl font-semibold">Connect</h3>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <img
                src="/images.jpeg"
                alt="collaborate-image"
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-xl font-semibold">Collaborate</h3>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <img
                src="/earn.png"
                alt="earn-image"
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-xl font-semibold">Earn</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-10 py-10 px-4">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="images.png"
            alt="help image"
            className="md:order-last md:mr-10"
          />
          <div className="p-4">
            <h2 className="text-2xl mb-4 font-semibold">
              How Can HobbyHive Help You?
            </h2>
            <p className="text-lg font-medium pb-10">
              HobbyHive provides a multitude of benefits and opportunities for
              both freelancers and businesses. By joining our platform,
              freelancers can gain access to a wide range of projects, connect
              with potential clients, and build a successful freelance career.
              Businesses, on the other hand, can tap into a pool of skilled
              professionals, find the right talent for their projects, and
              achieve exceptional results. Whether you're seeking new
              opportunities or looking for top-notch services, HobbyHive is here
              to help you reach your goals efficiently and effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-10">
        <div className="mx-10">
          <h2 className="text-2xl mb-4 font-bold text-gray-900">
            Our Services
          </h2>
          {category && category.length > 0 ? (
            category.map((c) => (
              <div key={c._id} className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900 p-1 rounded-md pr-14 bg-blue-300">
                    {c.name}
                  </div>
                </div>
                <div className="flex overflow-x-auto">
                  {service && service.length > 0 ? (
                    service.map((s) => {
                      if (c._id === s.category) {
                        return (
                          <Link
                            to={`/buyer/seller/${s._id}?s=${s.name}`}
                            key={s._id}
                          >
                            <div className="flex-shrink-0 flex flex-col items-center justify-center mr-4 cursor-pointer bg-white rounded-lg shadow-md p-4 w-48">
                              <img
                                src={s.image}
                                alt={s.name}
                                className="w-full h-auto mb-2 transition-transform duration-300 transform hover:scale-110"
                                height={300}
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
      </div>

      <div className=" py-8 bg-black text-white flex flex-col items-center">
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
