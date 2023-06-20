import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { CategoryProvider } from "./context/CategoryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ErrorProvider } from "./context/ErrorContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorProvider>
      <UserAuthContextProvider>
        <CategoryProvider>
          <ServiceProvider>
            <App />
          </ServiceProvider>
        </CategoryProvider>
      </UserAuthContextProvider>
    </ErrorProvider>
  </React.StrictMode>
);
