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
      <table>
        <tr>
          <th>Name</th>
        </tr>
        {data.map((d) => (
          <tr key={d._id}>
            <td>{d.name}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}
export default Seller;
