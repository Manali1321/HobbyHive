import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Seller;
