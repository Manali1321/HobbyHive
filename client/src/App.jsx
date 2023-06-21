import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// Browswer Route
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// ////////////******user
import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import AddEmployer from "./components/routes/Signup";
import AddSeller from "./components/routes/admin/seller/AddSeller";
import SellerLogin from "./components/routes/SellerLogin";
import SellerHome from "./components/routes/SellerHome";
import BuyerSearch from "./components/routes/admin/buyer/BuyerResult";
// ////////////******seller
import UpdateSeller from "./components/routes/admin/seller/UpdateSeller";
import DeleteSeller from "./components/routes/admin/seller/DeleteSeller";

// ////////////******buyer
import DeleteBuyer from "./components/routes/admin/buyer/DeleteBuyer";
import UpdateBuyer from "./components/routes/admin/buyer/UpdateBuyer";

// ////////////******Admin
import Admin_home from "./components/routes/admin/Home";
import AdminDetail from "./components/routes/admin/AdminList";
import SellerApproval from "./components/routes/admin/Admin";
import Seller from "./components/routes/admin/seller/Seller";
import Employer from "./components/routes/admin/buyer/Buyer";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* General path */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AddEmployer />} />
          <Route path="/seller" element={<SellerHome />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/add" element={<AddSeller />} />

          {/* Buyer stuff which can be done by admin */}
          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute isAllowed={["admin", "buyer"]}>
                <DeleteBuyer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute isAllowed={["admin", "buyer"]}>
                <UpdateBuyer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seller"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <Seller />
              </ProtectedRoute>
            }
          />
          {/* Employer */}
          <Route
            path="/buyer/seller/:id"
            element={
              <ProtectedRoute isAllowed={["buyer", "admin"]}>
                <BuyerSearch />
              </ProtectedRoute>
            }
          />
          {/* Admin Access*/}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <Admin_home />
              </ProtectedRoute>
            }
          />
          {/* Seller */}
          <Route
            path="/seller/update/:id"
            element={
              <ProtectedRoute isAllowed={["admin", "seller", "buyer"]}>
                <UpdateSeller />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/delete/:id"
            element={
              <ProtectedRoute isAllowed={["admin", "seller"]}>
                <DeleteSeller />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employer"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <Employer />
              </ProtectedRoute>
            }
          />

          {/* Category */}
          <Route
            path="/admin/category"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seller-approval"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <SellerApproval />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/list"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <AdminDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/category/add"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <AddCat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category/update/:id"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <UpdateCat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category/delete/:id"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <DeleteCat />
              </ProtectedRoute>
            }
          />

          {/* Service */}
          <Route
            path="/admin/service"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <Service />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/service/add"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <AddService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/service/update/:id"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <UpdateService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/service/delete/:id"
            element={
              <ProtectedRoute isAllowed={["admin"]}>
                <DeleteService />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
