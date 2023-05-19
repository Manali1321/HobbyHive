import React, { useState, useEffect } from "react";
import axios from "axios";

function Service() {
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8888/service").then(function (response) {
      setService(() => response.data);
    });
  }, []);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {service.map((s) => (
            <tr key={s._id}>
              <td>{s._id}</td>
              <td>{s.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Service;
