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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin_home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
