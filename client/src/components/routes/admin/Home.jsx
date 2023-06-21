import React from "react";
import { Link } from "react-router-dom";

class Admin_home extends React.Component {
  render() {
    return (
      <main className="h-screen bg-gray-100">
        <div className="flex flex-wrap justify-center items-center p-20">
          <Link
            to="/admin/category"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Category
            </h2>
          </Link>
          <Link
            to="/admin/service"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Service
            </h2>
          </Link>
          <Link
            to="/admin/list"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Admin Data
            </h2>
          </Link>
          <Link
            to="/admin/seller-approval"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Seller Request
            </h2>
          </Link>
          <Link
            to="/admin/employer"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Employer
            </h2>
          </Link>
          <Link
            to="/admin/seller"
            className="flex flex-col items-center mx-4 mb-4 p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-500 hover:underline">
              Seller
            </h2>
          </Link>
        </div>
      </main>
    );
  }
}
export default Admin_home;
