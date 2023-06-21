import React from "react";
import { Link } from "react-router-dom";
function SellerHome() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="mx-auto w-1/2 p-8 bg-white rounded-md shadow-lg">
        <p className="text-lg text-center mb-6">
          "Joining HobbyHive as a seller lets you work on your passions and grow
          your business. You can set your own schedule, showcase your skills,
          and collaborate with others who share your vision. HobbyHive supports
          and empowers you to pursue what you love and succeed in a flexible and
          friendly environment. Join us today and unleash your entrepreneurial
          spirit."
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <Link to="/seller/login">Seller Login</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
export default SellerHome;
