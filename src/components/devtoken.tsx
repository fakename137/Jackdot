import React, { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";

const DevTokenBalance: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevTokenBalance = async () => {
      try {
        // Reset states
        setLoading(true);
        setError(null);

        // Find the first wallet (typically MetaMask)
        const wallet = wallets.find((w) => w.walletClientType === "metamask");

        if (!wallet) {
          setError("No MetaMask wallet found");
          setLoading(false);
          return;
        }

        // Get the provider
        const provider = await wallet.getEthersProvider();

        // Get user's wallet address
        const address = await wallet.address;

        // Fetch native token (DEV) balance
        const balanceWei = await provider.getBalance(address);

        // Convert balance to a readable format
        const balanceInDevTokens = ethers.utils.formatUnits(balanceWei, 18);

        setBalance(balanceInDevTokens);
      } catch (err) {
        console.error("Error fetching DEV token balance:", err);
        setError("Failed to fetch DEV token balance");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated and wallets are ready
    if (ready && authenticated && wallets.length > 0) {
      fetchDevTokenBalance();
    }
  }, [ready, authenticated, wallets]);

  if (!ready) return <div>Loading...</div>;
  if (!authenticated) return <div>Please log in</div>;

  return (
    <div>
      {loading ? (
        <p>Fetching balance...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>DEV Token Balance: {balance.slice(0, 6)}</p>
      )}
    </div>
  );
};

export default DevTokenBalance;
