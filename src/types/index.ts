import type { InterfaceAbi, JsonRpcProvider } from "ethers";

export interface IExtendedConfig {
  provider?: JsonRpcProvider;
  contractAddress?: string;
  rpcUrl?: string;
  abi?: InterfaceAbi;
}

export interface IEthersError {
  message: string;
  revert: {
    args: string[];
  };
}
