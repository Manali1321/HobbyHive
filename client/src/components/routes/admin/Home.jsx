import React from "react";

class Admin_home extends React.Component {
  render() {
    return (
      <main>
        <a href="./admin/category">
          <h2>Category</h2>
        </a>
        <a href="./admin/service">
          <h2>Service</h2>
        </a>
        <h2>Admin</h2>
        <a href="./admin/employer">
          <h2>Employer</h2>
        </a>
        <a href="./admin/seller">
          <h2>Seller</h2>
        </a>
      </main>
    );
  }
}
export default Admin_home;
