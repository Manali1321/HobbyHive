import React, { useState, useEffect } from "react";
import axios from "axios";

function Seller() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/seller").then(function (response) {
      setData(() => response.data);
    }, []);
  });
  return (
    <main>
      {data.map((d) => (
        <p key={d._id}>{d.name}</p>
      ))}
    </main>
  );
}
export default Seller;
