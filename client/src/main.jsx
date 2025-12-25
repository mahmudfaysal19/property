import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css"; 
import "@mantine/dates/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-m0c6t4vngjpajfst.us.auth0.com"
     clientId="FwuU99bg3GuTcAn1iwwndo4VQZIqa5XU"
     authorizationParams={{
      redirect_uri: "https://property-five-eta.vercel.app",
      audience: "http://localhost:8000",      // <--- MOVED INSIDE
      scope: "openid profile email"           // <--- MOVED INSIDE
     }}
     cacheLocation="localstorage" // Uncomment this to stay logged in on reload
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);