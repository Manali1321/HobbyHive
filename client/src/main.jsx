import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { CategoryProvider } from "./context/CategoryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ErrorProvider } from "./context/ErrorContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorProvider>
      <CategoryProvider>
        <ServiceProvider>
          <App />
        </ServiceProvider>
      </CategoryProvider>
    </ErrorProvider>
  </React.StrictMode>
);
