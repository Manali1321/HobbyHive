import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Browswer Route
import Header from "./components/Header";
import Footer from "./components/Footer";

// Landing page
import Home from "./components/routes/Home";

// ////////////******Admin
import Admin_home from "./components/routes/admin/Home";
import Seller from "./components/routes/admin/seller/Seller";
import Employer from "./components/routes/admin/buyer/Buyer";
import AddEmployer from "./components/routes/Signup";

// Service
import Service from "./components/routes/admin/service/Service";
import AddService from "./components/routes/admin/service/AddService";
import DeleteService from "./components/routes/admin/service/DeleteService";

// Category
import Category from "./components/routes/admin/category/Category";
import AddCat from "./components/routes/admin/category/AddCat";
import UpdateCat from "./components/routes/admin/category/UpdateCat";
import DeleteCat from "./components/routes/admin/category/DeleteCat";

// Employer
import Login from "./components/routes/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AddEmployer />} />
          {/* Admin */}
          <Route path="/admin" element={<Admin_home />} />
          {/* Seller */}
          <Route path="/admin/seller" element={<Seller />} />
          {/* Employer */}
          <Route path="/admin/employer" element={<Employer />} />

          {/* Category */}
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/category/add" element={<AddCat />} />
          <Route path="/admin/category/update/:id" element={<UpdateCat />} />
          <Route path="/admin/category/delete/:id" element={<DeleteCat />} />

          {/* Service */}
          <Route path="/admin/service" element={<Service />} />
          <Route path="/admin/service/add" element={<AddService />} />
          <Route path="/admin/service/delete/:id" element={<DeleteService />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
