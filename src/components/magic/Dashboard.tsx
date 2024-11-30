// import React from "react";
// import WalletMethods from "./cards/WalletMethodsCard";
// import SendTransaction from "./cards/SendTransactionCard";
// import Spacer from "@/components/ui/Spacer";
import { LoginProps } from "@/utils/types";
import UserInfo from "./cards/UserInfoCard";
// import DevLinks from "./DevLinks";
// import Header from "./Header";
export default function Dashboard({ token, setToken }: LoginProps) {
  return (
    <div className="home-page">
      <div className="cards-container">
        <UserInfo token={token} setToken={setToken} />
      </div>
    </div>
  );
}
