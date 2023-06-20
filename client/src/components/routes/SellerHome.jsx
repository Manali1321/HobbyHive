import React from "react";
import { Link } from "react-router-dom";
function SellerHome() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-lg text-center mb-6">
        Intro for seller home and how to become home and procedure
      </p>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <Link to="/seller/login">Seller Login</Link>
        </button>
      </div>
    </main>
  );
}
export default SellerHome;
