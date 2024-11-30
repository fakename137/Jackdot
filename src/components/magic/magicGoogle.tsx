import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { getChainId, getNetworkUrl } from "@/utils/network";

const createMagic = (key: string) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      network: {
        rpcUrl: getNetworkUrl(),
        chainId: getChainId(),
      },
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic("pk_live_D8DB7A53EADCBECF");
