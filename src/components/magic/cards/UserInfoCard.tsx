import { useCallback, useEffect, useState } from "react";
import Divider from "@/components/ui/Divider";
import { LoginProps } from "@/utils/types";
import { logout } from "@/utils/common";
import { useMagic } from "../MagicProvider";
import { Card } from "@/components/ui/card";
import CardHeader from "@/components/ui/CardHeader";
import CardLabel from "@/components/ui/CardLabel";
import Spinner from "@/components/ui/Spinner";
import { getNetworkName, getNetworkToken } from "@/utils/network";
import { useZeroDevKernel } from "@/components/zeroDev/useZeroDevKernel";
import { Copy } from "lucide-react";
const UserInfo = ({ token, setToken }: LoginProps) => {
  const { magic, web3 } = useMagic();
  const { kernelClient, scaAddress } = useZeroDevKernel();

  const [magicBalance, setMagicBalance] = useState<string>("...");
  const [scaBalance, setScaBalance] = useState<string>("...");
  const [magicAddress] = useState(localStorage.getItem("user"));
  const [copied, setCopied] = useState("Copy");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [publicAddress] = useState(localStorage.getItem("user"));

  const getBalance = useCallback(async () => {
    if (magicAddress && web3) {
      const magicBalance = await web3.eth.getBalance(magicAddress);
      if (magicBalance == BigInt(0)) {
        setMagicBalance("0");
      } else {
        setMagicBalance(web3.utils.fromWei(magicBalance, "ether"));
      }
    }
    if (scaAddress && web3) {
      const aaBalance = await web3.eth.getBalance(scaAddress);
      if (aaBalance == BigInt(0)) {
        setScaBalance("0");
      } else {
        setScaBalance(web3.utils.fromWei(aaBalance, "ether"));
      }
    }
  }, [web3, magicAddress, scaAddress]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await getBalance();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  }, [getBalance]);

  useEffect(() => {
    if (web3) {
      refresh();
    }
  }, [web3, refresh]);

  useEffect(() => {
    setMagicBalance("...");
    setScaBalance("...");
  }, [magic]);

  const disconnect = useCallback(async () => {
    if (magic) {
      await logout(setToken, magic);
    }
    window.location.href = "/";
  }, [magic, setToken]);

  const copy = useCallback(() => {
    if (publicAddress && copied === "Copy") {
      setCopied("Copied!");
      navigator.clipboard.writeText(publicAddress);
      setTimeout(() => {
        setCopied("Copy");
      }, 1000);
    }
  }, [copied, publicAddress]);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg flex items-center justify-between">
      {/* Network Status */}
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span className="text-sm">Connected to {getNetworkName()}</span>
      </div>

      {/* Address Section */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">
          Magic:{" "}
          {magicAddress ? `${magicAddress.slice(0, 6)}...` : "Fetching..."}
        </span>
        <button
          onClick={copy}
          className="text-blue-500 hover:underline flex items-center"
        >
          <Copy />
        </button>
      </div>

      {/* Disconnect Button */}
      <button
        onClick={disconnect}
        className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
      >
        Disconnect
      </button>
    </nav>
  );
};

export default UserInfo;
