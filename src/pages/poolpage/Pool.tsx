import PredictionsPage from "@/components/predictions-page";
// import { InvestmentCard } from '@/components/ui/InvestmentCard';
import { useEffect, useState } from "react";
import MagicProvider from "@/components/magic/MagicProvider";
import Dashboard from "@/components/magic/Dashboard";
import DepositPage from "@/components/deposit-page";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { useWallets } from "@privy-io/react-auth";
function Pool() {
  const [token, setToken] = useState("");
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
    null
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { wallets } = useWallets();
  const { user, logout, authenticated } = usePrivy();
  // if (!authenticated) {
  //   window.location.href = "/";
  // }
  const onLogout = async () => {
    await logout();
    window.location.href = "/";
  };
  useEffect(() => {
    const address = wallets?.[0]?.address;
    setWalletAddress(address ?? null);
    const smartWallet = user?.linkedAccounts.find(
      (account) => account.type === "smart_wallet"
    );
    setSmartWalletAddress(smartWallet?.address ?? null);
    console.log(smartWallet?.address);
    // Logs the smart wallet's address
    console.log(smartWallet?.type);
    setToken(localStorage.getItem("token") ?? "");
  }, [setToken, user?.linkedAccounts]);
  return (
    // <div className="min-h-screen bg-gradient-to-t from-[#061734] to-[#000000] flex items-center justify-center">
    //   <div className="w-full max-w-screen-sm px-4">
    //     <h1 className="text-lg font-bold text-gray-100 mb-8 text-center">
    //       Investment Pool
    //     </h1>
    //     <div className="flex flex-col items-center space-y-6">
    //       <InvestmentCard />
    //       <InvestmentCard />
    //       <InvestmentCard />
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <MagicProvider>
        <Dashboard token={token} setToken={setToken} />
      </MagicProvider> */}
      <nav className="flex justify-between">
        <div>
          {smartWalletAddress}
          <br />
          {walletAddress}
        </div>
        <div>
          <Button onClick={onLogout} variant={"destructive"}>
            Logout
          </Button>
        </div>
      </nav>

      <DepositPage />
    </div>
  );
}
export default Pool;
