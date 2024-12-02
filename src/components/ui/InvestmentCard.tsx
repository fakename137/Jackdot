import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { useProgress } from "@/hooks/useProgress";
import { useState } from "react";
import { ethers } from "ethers";
import Abi from "../../../abi.json";
interface InvestmentCardProps {
  amount: number;
  multiplier: {
    min: number;
    max: number;
  };
  buyAmount: number;
  winAmount: number;
}

function InvestmentCard({
  amount,
  multiplier,
  buyAmount,
  winAmount,
}: InvestmentCardProps) {
  const { progress } = useProgress();
  const [showModal, setShowModal] = useState(false);
  const [ethValue, setEthValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const handleDeposit = async () => {
    if (!ethValue) {
      alert("Please enter an ETH amount.");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }

      setLoading(true);

      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace with your contract ABI and address

      const contractAddress = "0x2D606f8A476027fEC3CA3F4a4cC26CaF6DA93338";

      const contract = new ethers.Contract(contractAddress, Abi, signer);

      // Convert ETH to Wei
      const valueInWei = ethers.utils.parseEther(ethValue);

      // Call the deposit function with participantIndex as 1 (hardcoded here)
      const tx = await contract.deposit(1, { value: valueInWei });
      console.log("Transaction Sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction Mined:", receipt);

      alert("Deposit successful!");
    } catch (error: unknown) {
      console.error("Error during deposit:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message || "Transaction failed"}`);
      } else {
        alert("Transaction failed");
      }
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="w-[300px] p-6 rounded-lg bg-black/20 backdrop-blur-sm">
      <div className="p-0 space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-3xl font-bold text-[#FF0068]">${amount}</span>
          <div className="flex items-center gap-1 text-[#ffffff]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">
              {multiplier.min}x to {multiplier.max}x
            </span>
          </div>
        </div>
        <p className="text-white">open</p>
        <ProgressIndicator progress={progress} />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full border-2 border-[#c9fa00] text-[#c9fa00] hover:bg-[#c9fa00]/10 hover:text-[#c9fa00] transition-colors"
            onClick={() => {
              window.location.href = "/pooldetail";
            }}
          >
            Join
          </Button>
          <p className="text-center text-sm text-[#c9fa00]">
            Win Up to ${winAmount}
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-4">Deposit ETH</h2>
            <input
              type="text"
              value={ethValue}
              onChange={(e) => setEthValue(e.target.value)}
              placeholder="Enter ETH amount"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="border border-red-500 text-red-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeposit}
                disabled={loading}
                className="bg-green-500 text-white"
              >
                {loading ? "Processing..." : "Deposit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestmentCard;
