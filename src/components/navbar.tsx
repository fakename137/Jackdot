"use client";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { useLogout } from "@privy-io/react-auth";
import { Wallet, LogOut, Copy, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import SparklesText from "./ui/sparkles-text";
import Abi from "../../abi.json";
// Contract ABI (minimal version for checkContractBalance)
const CONTRACT_ABI = Abi;
const USDC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];
const USDC_CONTRACT_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

// Replace with your contract's deployed address
const CONTRACT_ADDRESS = "0x2D606f8A476027fEC3CA3F4a4cC26CaF6DA93338";

const Navbar = () => {
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
    null
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  const [contractBalance, setContractBalance] = useState<string>("0");
  const { user, authenticated } = usePrivy();
  const { logout } = useLogout({
    onSuccess: () => {
      console.log("User logged out");
      window.location.href = "/";
    },
  });
  const fetchUSDCBalance = async (address: string) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj"
      );
      const usdcContract = new ethers.Contract(
        USDC_CONTRACT_ADDRESS,
        USDC_ABI,
        provider
      );
      const decimals = await usdcContract.decimals();

      const balanceRaw = await usdcContract.balanceOf(address);

      const balance = ethers.utils.formatUnits(balanceRaw, decimals);
      setUsdcBalance(parseFloat(balance).toFixed(2));
    } catch (error) {
      console.error("Error fetching USDC balance:", error);

      setUsdcBalance("0");
    }
  };

  // Fetch contract balance
  const fetchContractBalance = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj"
      );

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const balance = await contract.checkContractBalance();

      // Convert from Wei to Ether
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching contract balance:", error);
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
      // Optionally fetch other balances here
    }

    // Fetch contract balance on load
    fetchContractBalance();
  }, [user?.linkedAccounts]);

  const truncateAddress = (address: string | null) => {
    if (!address) return "No Wallet Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-3">
          <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg border border-white/20 p-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <SparklesText text="Jack" className=" text-white" />
                <SparklesText text=" dot" className=" text-[#FF0068]" />
              </div>

              <div className="flex">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-6 w-6 text-[#FF0068]" />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-200">
                      {smartWalletAddress
                        ? truncateAddress(smartWalletAddress)
                        : truncateAddress(walletAddress)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#FF0068]">
                        ${usdcBalance} USDC
                      </span>
                      <span className="text-xs text-[#00FF00]">
                        Total Pool Balance {contractBalance} ETH
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                    className="hover:bg-white/20 text-[#FF0068] transition-colors duration-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="flex items-center space-x-2 bg-white text-[#FF0068] hover:bg-[#FF0068] border border-[#FF0068]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
