import { getChainId, getNetworkUrl } from "@/utils/network";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic as MagicBase } from "magic-sdk";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Web3 } from "web3";

export type Magic = MagicBase<OAuthExtension[]>;

type MagicContextType = {
  magic: Magic | null;
  web3: Web3 | null;
};

const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
});

export const useMagic = () => useContext(MagicContext);

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const magic = new MagicBase("pk_live_D8DB7A53EADCBECF", {
      network: {
        rpcUrl: getNetworkUrl(),
        chainId: getChainId(),
      },
      extensions: [new OAuthExtension()],
    });

    setMagic(magic);
    setWeb3(new Web3(magic.rpcProvider as unknown as Web3["currentProvider"]));
  }, []);

  const value = useMemo(() => {
    return {
      magic,
      web3,
    };
  }, [magic, web3]);

  return (
    <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
  );
};

export default MagicProvider;
