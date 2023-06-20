import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// Browswer Route
import Header from "./components/Header";
import Footer from "./components/Footer";

// Landing page
import Home from "./components/routes/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// ////////////******Admin
import Admin_home from "./components/routes/admin/Home";
import Seller from "./components/routes/admin/seller/Seller";
import SellerApproval from "./components/routes/admin/Admin";

import AddSeller from "./components/routes/admin/seller/AddSeller";
import UpdateSeller from "./components/routes/admin/seller/UpdateSeller";

import DeleteSeller from "./components/routes/admin/seller/DeleteSeller";

// Seller
import SellerHome from "./components/routes/SellerHome";
import SellerLogin from "./components/routes/SellerLogin";

// Service
import Service from "./components/routes/admin/service/Service";
import AddService from "./components/routes/admin/service/AddService";
import DeleteService from "./components/routes/admin/service/DeleteService";
import UpdateService from "./components/routes/admin/service/UpdateService";

// Category
import Category from "./components/routes/admin/category/Category";
import AddCat from "./components/routes/admin/category/AddCat";
import UpdateCat from "./components/routes/admin/category/UpdateCat";
import DeleteCat from "./components/routes/admin/category/DeleteCat";

// Employer
import Login from "./components/routes/Login";
import DeleteBuyer from "./components/routes/admin/buyer/DeleteBuyer";
import UpdateBuyer from "./components/routes/admin/buyer/UpdateBuyer";
import Employer from "./components/routes/admin/buyer/Buyer";
import AddEmployer from "./components/routes/Signup";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AddEmployer />} />
          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute>
                <DeleteBuyer />
              </ProtectedRoute>
            }
          />
          <Route path="/update/:id" element={<UpdateBuyer />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin_home />} />
          {/* Seller */}
          <Route
            path="/admin/seller"
            element={
              <ProtectedRoute>
                <Seller />
              </ProtectedRoute>
            }
          />
          <Route path="/seller" element={<SellerHome />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/add" element={<AddSeller />} />

          <Route
            path="/seller/update/:id"
            element={
              // <ProtectedRoute allowedRoles={["seller"]}>
              <UpdateSeller />
              // </ProtectedRoute>
            }
          />

          <Route path="/seller/delete/:id" element={<DeleteSeller />} />

          {/* Employer */}
          <Route path="/admin/employer" element={<Employer />} />

          {/* Category */}
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/seller-approval" element={<SellerApproval />} />

          <Route path="/admin/category/add" element={<AddCat />} />
          <Route path="/admin/category/update/:id" element={<UpdateCat />} />
          <Route path="/admin/category/delete/:id" element={<DeleteCat />} />

          {/* Service */}
          <Route path="/admin/service" element={<Service />} />
          <Route path="/admin/service/add" element={<AddService />} />
          <Route path="/admin/service/update/:id" element={<UpdateService />} />
          <Route path="/admin/service/delete/:id" element={<DeleteService />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
