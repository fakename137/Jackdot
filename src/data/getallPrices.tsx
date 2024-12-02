import { ethers } from "ethers";
import Abi from "../../abi.json";

const CONTRACT_ADDRESS = "0xc618f702a7ceE784357ddC9c5977FFA81d60fd4b";
const CONTRACT_ABI = Abi;

export const getAllPrices = async (
  smartWalletAddress: string
): Promise<number[]> => {
  if (!smartWalletAddress) {
    throw new Error("Smart wallet address is not available");
  }

  try {
    // Create a provider linked to the Alchemy RPC or MetaMask
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj"
    );

    // Use the smart wallet address as the signer
    const signer = provider.getSigner(smartWalletAddress);

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
