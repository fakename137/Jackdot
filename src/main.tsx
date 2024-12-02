import ReactDOM from "react-dom/client";
import "./global.css";
import "./index.css";
import React from "react";
import WebApp from "@twa-dev/sdk";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./App.tsx";
import Pool from "./pages/poolpage/Pool.tsx";
import Wallet from "./pages/Wallet/Wallet.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import Details from "./pages/pooldetailpage/details.tsx";
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cm40v396h0bwt10cj0m54h0fe"
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email", "wallet", "google"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <SmartWalletsProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pool" element={<Pool />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/pooldetail" element={<Details />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SmartWalletsProvider>
    </PrivyProvider>
  </React.StrictMode>
);
