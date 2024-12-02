import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import PoolFactoryABI from "@/abis/PoolFactory.json";
import BondingCurvePoolABI from "@/abis/BondingCurvePool.json";

const FACTORY_ADDRESS = "0xCE684c393AD72c592C6fcB2b559bb11FE7a8eBd9";

const AdminPanel: React.FC = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [factoryContract, setFactoryContract] =
    useState<ethers.Contract | null>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const [formData, setFormData] = useState({
    totalPoolLimit: "",
    totalParticipants: "",
    winner: "",
  });

  interface Pool {
    address: string;
    poolBalance: string;
    totalPoolLimit: string;
    totalParticipants: string;
    winner: string;
    owner: string;
  }

  const fetchPools = useCallback(async () => {
    if (!factoryContract) return;

    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      const poolAddresses: string[] = await factoryContract.getAllPools();

      const poolData = await Promise.all(
        poolAddresses.map(async (address: string) => {
          const poolContract = new ethers.Contract(
            address,
            BondingCurvePoolABI,
            signer
          );
          const [
            poolBalance,
            totalPoolLimit,
            totalParticipants,
            winner,
            owner,
          ] = await poolContract.getPoolStats();

          return {
            address,
            poolBalance: ethers.utils.formatEther(poolBalance),
            totalPoolLimit: ethers.utils.formatEther(totalPoolLimit),
            totalParticipants: totalParticipants.toString(),
            winner: winner.toString(),
            owner,
          };
        })
      );

      setPools(poolData);
    } catch (error) {
      console.error("Error fetching pools:", error);
    }
  }, [factoryContract]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          const signer = web3Provider.getSigner();
          const contract = new ethers.Contract(
            FACTORY_ADDRESS,
            PoolFactoryABI,
            signer
          );

          setProvider(web3Provider);
          setFactoryContract(contract);
        } catch (error) {
          console.error("Error initializing provider or contract:", error);
        }
      } else {
        console.error("MetaMask not detected.");
      }
    };

    init();
  }, []);

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const createPool = async () => {
    if (!factoryContract) return;
    const { totalPoolLimit, totalParticipants, winner } = formData;

    try {
      const tx = await factoryContract.createNewPool(
        ethers.utils.parseEther(totalPoolLimit),
        parseInt(totalParticipants),
        parseInt(winner)
      );
      await tx.wait();
      alert("Pool created successfully!");
      fetchPools(); // Refresh pools
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Create Pool Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Pool</h2>
        <div className="grid gap-4">
          <input
            type="text"
            name="totalPoolLimit"
            placeholder="Total Pool Limit (ETH)"
            value={formData.totalPoolLimit}
            onChange={handleInputChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="totalParticipants"
            placeholder="Total Participants"
            value={formData.totalParticipants}
            onChange={handleInputChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="winner"
            placeholder="Winner"
            value={formData.winner}
            onChange={handleInputChange}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={createPool}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Create Pool
          </button>
        </div>
      </div>

      {/* Pools List Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Pools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pools.map((pool, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">
                Pool Address: {pool.address}
              </h3>
              <p className="text-gray-600">Balance: {pool.poolBalance} ETH</p>
              <p className="text-gray-600">
                Total Limit: {pool.totalPoolLimit}
              </p>
              <p className="text-gray-600">
                Participants: {pool.totalParticipants}
              </p>
              <p className="text-gray-600">Winner: {pool.winner}</p>
              <p className="text-gray-600">Owner: {pool.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
