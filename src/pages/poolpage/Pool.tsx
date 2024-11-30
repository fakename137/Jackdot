import { useEffect, useState } from "react";
import { ethers } from "ethers";
import DepositPage from "@/components/deposit-page";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { useLogout } from "@privy-io/react-auth";
import { Wallet, LogOut, Copy, DollarSign } from "lucide-react";

// USDC Contract ABI (minimal version for balanceOf)
const USDC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// USDC Contract Address (Ethereum Mainnet)
const USDC_CONTRACT_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

function Pool() {
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
    null
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  const { user, authenticated } = usePrivy();
  const { logout } = useLogout({
    onSuccess: () => {
      console.log("User logged out");
      window.location.href = "/";
    },
  });

  // Fetch USDC balance
  const fetchUSDCBalance = async (address: string) => {
    try {
      // Set up provider (use your preferred RPC endpoint)
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj"
      );

      // Create contract instance
      const usdcContract = new ethers.Contract(
        USDC_CONTRACT_ADDRESS,
        USDC_ABI,
        provider
      );

      // Get decimals and balance
      const decimals = await usdcContract.decimals();
      const balanceRaw = await usdcContract.balanceOf(address);

      // Format balance
      const balance = ethers.utils.formatUnits(balanceRaw, decimals);

      // Round to 2 decimal places
      setUsdcBalance(parseFloat(balance).toFixed(2));
    } catch (error) {
      console.error("Error fetching USDC balance:", error);

      setUsdcBalance("0");
    }
  };

  useEffect(() => {
    const smartWallet = user?.linkedAccounts.find(
      (account) => account.type === "smart_wallet"
    );
    const wallet = user?.linkedAccounts.find(
      (account) => account.type === "wallet"
    );

    const addressToUse = smartWallet?.address ?? wallet?.address;

    setWalletAddress(wallet?.address ?? null);
    setSmartWalletAddress(smartWallet?.address ?? null);

    if (addressToUse) {
      fetchUSDCBalance(addressToUse);
    }
  }, [user?.linkedAccounts]);

  // Truncate wallet address for display
  const truncateAddress = (address: string | null) => {
    if (!address) return "No Wallet Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Copy address to clipboard
  const copyAddress = () => {
    const addressToCopy = smartWalletAddress || walletAddress;
    if (addressToCopy) {
      navigator.clipboard
        .writeText(addressToCopy)
        .then(() => {
          console.log("Address copied to clipboard");
        })
        .catch((err) => {
          console.error("Error copying address to clipboard:", err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-3">
          <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg border border-white/20 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Wallet className="h-6 w-6 text-blue-300" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-200">
                    {smartWalletAddress
                      ? truncateAddress(smartWalletAddress)
                      : truncateAddress(walletAddress)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-green-300">
                      ${usdcBalance} USDC
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyAddress}
                  className="hover:bg-white/20 text-blue-300 transition-colors duration-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="flex items-center space-x-2 bg-red-500/30 hover:bg-red-500/50 border border-red-500/30"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 pt-24 pb-8">
        <DepositPage />
      </main>
    </div>
  );
}

export default Pool;
