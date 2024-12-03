import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Abi from "../abi.json";
// ABI Type Definition
interface ContractABI {
  getTotalParticipants: () => Promise<number>;
  getTotalPoolLimit: () => Promise<number>;
  getOrganizerFeePercentage: () => Promise<number>;
}

// Price Calculation Function
function calculateAllPrices(
  totalParticipants: number,
  totalPoolLimit: number,
  organizerFeePercentage: number
): number[] {
  const payableOutcome = (totalParticipants * (totalParticipants + 1)) / 2;
  const usablePool =
    totalPoolLimit - (totalPoolLimit * organizerFeePercentage) / 100;
  const c = Math.floor(usablePool / payableOutcome);

  const pricesInUsd: number[] = [];

  for (let i = 1; i <= totalParticipants; i++) {
    const price = c * i;
    pricesInUsd.push(price / 1e6);
  }

  return pricesInUsd;
}
const MotionCard = motion(Card);

// React Component for Price Fetching
const PriceFetcher: React.FC = () => {
  const [prices, setPrices] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ethpriceInUsd, setEthPriceInUsd] = useState<number>(0);
  const { user } = usePrivy();
  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };

    fetch(
      "https://api.etherscan.io/v2/api?chainid=1&module=stats&action=ethprice&apikey=IYPA2WA5KKRR3DHJ46JT626CHUI7PBKINT",
      requestOptions
    )
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        if (data.status === "1" && data.result) {
          setEthPriceInUsd(data.result.ethusd);
          console.log(data.result.ethusd); // Set ethusd in state
        } else {
          console.error("Failed to fetch ETH price:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [prices]);
  const handleDeposit = async (ethValue) => {
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

      const contractAddress = "0x92cA3A029FbBF1E27167332971b95cb1851338BF";

      const contract = new ethers.Contract(contractAddress, Abi, signer);

      // Convert ETH to Wei
      console.log(ethValue);
      console.log(ethpriceInUsd);
      const finalvalue = ethValue / ethpriceInUsd;
      console.log(finalvalue.toFixed(6).toString());
      const valueInWei = ethers.utils.parseEther(
        finalvalue.toFixed(6).toString()
      );

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
    }
  };
  useEffect(() => {
    const fetchContractData = async () => {
      const smartWallet = user?.linkedAccounts.find(
        (account) => account.type === "smart_wallet"
      );
      const wallet = user?.linkedAccounts.find(
        (account) => account.type === "wallet"
      );
      const addressToUse = smartWallet?.address ?? wallet?.address ?? "";

      try {
        // Assuming MetaMask or similar wallet is connected
        const provider = new ethers.providers.JsonRpcProvider(
          "https://eth-sepolia.g.alchemy.com/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj"
        );
        const signer = provider.getSigner(
          "0x74Faa49FC5D279354F88c2A36250601a1dB6D432"
        );

        // Contract address and ABI (replace with your actual contract details)
        const contractAddress = "0x92cA3A029FbBF1E27167332971b95cb1851338BF";
        const contractABI = [
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "participant",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "Deposit",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [],
            name: "PoolReset",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address[]",
                name: "winners",
                type: "address[]",
              },
              {
                indexed: false,
                internalType: "uint256[]",
                name: "payouts",
                type: "uint256[]",
              },
            ],
            name: "WinnersPaid",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "n",
                type: "uint256",
              },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "payoutWinners",
            outputs: [
              {
                internalType: "address[]",
                name: "",
                type: "address[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "withdrawEth",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "checkContractBalance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "contributions",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getAllPrices",
            outputs: [
              {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "n",
                type: "uint256",
              },
            ],
            name: "getNthParticipantPrice",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getOrganizerFeePercentage",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getOwner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getPoolBalance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getTotalParticipants",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getTotalPoolLimit",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getTotalPrice",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "organizerFeePercentage",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            name: "participants",
            outputs: [
              {
                internalType: "address",
                name: "participantAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "contribution",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "poolBalance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalParticipants",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalPoolLimit",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "winner",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ];

        // Create contract instance
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ) as unknown as ContractABI;

        // Fetch contract parameters
        const totalParticipants = await contract.getTotalParticipants();
        const totalPoolLimit = await contract.getTotalPoolLimit();
        const organizerFeePercentage =
          await contract.getOrganizerFeePercentage();

        // Calculate prices
        const calculatedPrices = calculateAllPrices(
          Number(totalParticipants),
          Number(totalPoolLimit),
          Number(organizerFeePercentage)
        );

        setPrices(calculatedPrices);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contract data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchContractData();
  }, [user?.linkedAccounts]);

  if (loading) return <div>Loading prices...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Win 4x Bet</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          {/* {prices[0].map((price, index) => (
            <li key={index}> */}
          <Button
            onClick={() => {
              handleDeposit(prices[1]);
            }}
            className="w-full bg-[#FF0068] hover:bg-[#FF0068]/90"
          >
            Bet: ${prices[1]}
          </Button>
          {/* </li>
          ))} */}
        </motion.div>
      </div>
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <motion.div
          className="absolute inset-0 border-2 border-[#FF0068] rounded-lg"
          animate={{
            boxShadow: [
              "0px 0px 8px 2px rgba(255, 0, 104, 0.8)",
              "0px 0px 16px 4px rgba(255, 0, 104, 0.6)",
              "0px 0px 8px 2px rgba(255, 0, 104, 0.8)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>
    </>
  );
};

export default PriceFetcher;
