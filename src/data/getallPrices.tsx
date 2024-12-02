import { ethers } from "ethers";
import Abi from "../../abi.json";
const CONTRACT_ADDRESS = "0xc618f702a7ceE784357ddC9c5977FFA81d60fd4b";
const CONTRACT_ABI = Abi;

export const getAllPrices = async (): Promise<number[]> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    // Create a provider linked to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access if needed
    // await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get signer to interact with the contract
    const signer = provider.getSigner();

    // Initialize the contract
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // Call the getAllPrices method from the contract
    const prices: ethers.BigNumber[] = await contract.getAllPrices();

    // Convert BigNumber to number and return
    return prices.map((price) => price.toNumber() / 1e6);
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};
