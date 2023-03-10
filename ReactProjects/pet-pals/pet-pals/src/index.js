import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { PetsProvider } from "./contexts/pets.context";
import { LandsProvider } from "./contexts/lands.context";
import { InfoProvider } from "./contexts/info.context";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <UserProvider>
        <LandsProvider>
          <PetsProvider>
            <InfoProvider>
              <App />
            </InfoProvider>
          </PetsProvider>
        </LandsProvider>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
