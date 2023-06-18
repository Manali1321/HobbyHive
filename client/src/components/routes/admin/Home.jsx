import React from "react";
import { Link } from "react-router-dom";

class Admin_home extends React.Component {
  render() {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Link to="/admin/category" className="mb-4">
          <h2 className="text-2xl font-bold text-blue-500 hover:underline">
            Category
          </h2>
        </Link>
        <Link to="/admin/service" className="mb-4">
          <h2 className="text-2xl font-bold text-blue-500 hover:underline">
            Service
          </h2>
        </Link>
        <Link to="/admin/seller-approval">
          <h2 className="text-2xl font-bold mb-4">Admin</h2>
        </Link>
        <Link to="/admin/employer" className="mb-4">
          <h2 className="text-2xl font-bold text-blue-500 hover:underline">
            Employer
          </h2>
        </Link>
        <Link to="/admin/seller" className="mb-4">
          <h2 className="text-2xl font-bold text-blue-500 hover:underline">
            Seller
          </h2>
        </Link>
      </main>
    );
  }
}
export default Admin_home;
