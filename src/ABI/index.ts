import { ethers } from "ethers";

import { v1_0 } from "./abi";
import config from "../config";

import type { IExtendedConfig, IEthersError } from "../types";

const abi = [v1_0];
export const defaultABI = abi[0];
export const defaultContractAddress = config.CONTRACT_ADDRESS;

const defaults = {
  provider: new ethers.JsonRpcProvider(config.RPC_URL),
  contractAddress: config.CONTRACT_ADDRESS,
  rpcUrl: config.RPC_URL,
  abi: abi[0],
};

const getDefaults = (_config: IExtendedConfig) => ({
  provider: _config.provider || new ethers.JsonRpcProvider(_config.rpcUrl || config.RPC_URL),
  contractAddress: _config.contractAddress || config.CONTRACT_ADDRESS,
  rpcUrl: _config.rpcUrl || config.RPC_URL,
  abi: _config.abi || abi[0],
});

export const methods = {
  getTimestamp: async (_config: IExtendedConfig = defaults) => {
    const { provider, contractAddress, abi } = getDefaults(_config);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const timestamp = await contract.getTimestamp();
    return Number(timestamp);
  },

  encryptMessage: async (
    message: string,
    timestamp: number,
    _config: IExtendedConfig = defaults
  ) => {
    const { provider, contractAddress, abi } = getDefaults(_config);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return await contract.encryptMessage(message, timestamp);
  },

  decryptMessage: async (encryptedMessage: string, _config: IExtendedConfig = defaults) => {
    try {
      const { provider, contractAddress, abi } = getDefaults(_config);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      return await contract.decryptMessage(encryptedMessage);
    } catch (error: IEthersError | any) {
      if (error?.revert?.args?.length > 0) throw new Error(error.revert.args[0]);
      throw new Error(error.message);
    }
  },

  isActive: async (encryptedMsg: string, _config: IExtendedConfig = defaults) => {
    const { provider, contractAddress, abi } = getDefaults(_config);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return await contract.isActive(encryptedMsg);
  },

  whenActive: async (encryptedMsg: string, _config: IExtendedConfig = defaults) => {
    const { provider, contractAddress, abi } = getDefaults(_config);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const timestamp = await contract.whenActive(encryptedMsg);
    return Number(timestamp);
  },
};
