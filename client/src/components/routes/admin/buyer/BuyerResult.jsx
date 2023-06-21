import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../utils/axios";
import { SelectionContext } from "../../../../context/SelectionContext";

function BuyerSearch() {
  const [seller, setSeller] = useState([]);
  const { selectedId, fetchData, selectedData } = useContext(SelectionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  // const listData = async () => {
  //   const resSeller = await api.get(`/buyer/seller/${id}`);
  //   setSeller(resSeller.data);
  //   console.log(resSeller.data);
  // };
  // const handleClick = async (id) => {
  //   try {
  //     navigate(`/seller/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  console.log(selectedData);
  useEffect(() => {
    if (selectedData) {
      setSeller(selectedData);
    }
  }, [selectedData]);
  return (
    <main>
      {seller.map((d) => (
        <div onClick={handleClick(d.user._id)} key={d._id}>
          <img src={d.seller_image} width={200} />
          <h2>
            {d.user.first_name}
            <span>{d.user.last_name}</span>
            <div
              className={`px-4 py-2 ${
                d.status === "approved" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {d.status}
            </div>
          </h2>
        </div>
      ))}
    </main>
  );
}
export default BuyerSearch;
