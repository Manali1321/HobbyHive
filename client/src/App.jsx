import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Browswer Route
import Header from "./components/Header";
import Footer from "./components/Footer";

// Landing page
import Home from "./components/routes/Home";

// Admin
import Admin_home from "./components/routes/admin/Home";
import Seller from "./components/routes/admin/seller/Seller";
import Employer from "./components/routes/admin/buyer/Buyer";
import Service from "./components/routes/admin/service/Service";
// Category
import Category from "./components/routes/admin/category/Category";

// Employer
import Login from "./components/routes/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin_home />} />
          <Route path="/admin/seller" element={<Seller />} />
          <Route path="/admin/employer" element={<Employer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/service" element={<Service />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
