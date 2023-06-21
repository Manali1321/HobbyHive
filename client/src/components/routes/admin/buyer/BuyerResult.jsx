import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../utils/axios";

function BuyerSearch() {
  const [seller, setSeller] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const name = new URLSearchParams(location.search).get("s");

  const handleClick = async (d) => {
    try {
      navigate(`/seller/update/${d}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await api.get(`/buyer/seller/${id}`);
        setSeller(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeller();
  }, []);
  return (
    <main>
      <h2 className="text-center font-bold text-3xl py-4">Welcome to {name}</h2>
      <div className="flex flex-wrap gap-8 mx-10">
        {seller &&
          seller.map((d) => (
            <div
              key={d._id}
              onClick={() => handleClick(d.user._id)}
              className="card hover:scale-105 bg-gray-400 p-6 rounded-lg"
            >
              <div>
                <img
                  src={d.seller_image}
                  width={200}
                  className="mb-4 rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {d.user.first_name}
                    <span>{d.user.last_name}</span>{" "}
                  </h2>
                  <p className="text-gray-700">{d.user.email}</p>
                  <div
                    className={`px-4 py-2 ${
                      d.status === "approved" ? "bg-green-400" : "bg-red-400"
                    } status`}
                  >
                    {d.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
export default BuyerSearch;
