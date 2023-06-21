import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CategoryProvider } from "./context/CategoryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { SelectionProvider } from "./context/SelectionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <SelectionProvider>
        <CategoryProvider>
          <ServiceProvider>
            <App />
          </ServiceProvider>
        </CategoryProvider>
      </SelectionProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
