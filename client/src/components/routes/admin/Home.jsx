import React from "react";
import { Link } from "react-router-dom";

class Admin_home extends React.Component {
  render() {
    return (
      <main>
        <Link to="/admin/category">
          <h2>Category</h2>
        </Link>
        <Link to="/admin/service">
          <h2>Service</h2>
        </Link>
        <h2>Admin</h2>
        <Link to="/admin/employer">
          <h2>Employer</h2>
        </Link>
        <Link to="/admin/seller">
          <h2>Seller</h2>
        </Link>
      </main>
    );
  }
}
export default Admin_home;
