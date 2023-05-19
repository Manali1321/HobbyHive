import React, { useState, useEffect } from "react";
import axios from "axios";

function Employer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/employer").then(function (response) {
      setData(() => response.data);
    }, []);
  });
  return (
    <main>
      <table>
        <tr>
          <th>First name:</th>
          <th>Last name:</th>
        </tr>
        {data.map((d) => (
          <tr key={d._id}>
            <td>{d.first_name}</td>
            <td>{d.last_name}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}
export default Employer;
