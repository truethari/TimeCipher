import { methods, defaultContractAddress, defaultABI } from "./src/ABI";
import type { IEthersError, IExtendedConfig } from "./src/types";

const { getTimestamp, encryptMessage, decryptMessage, isActive, whenActive } = methods;
export {
  methods as default,
  getTimestamp,
  encryptMessage,
  decryptMessage,
  isActive,
  whenActive,
  defaultABI,
  defaultContractAddress,
  type IEthersError,
  type IExtendedConfig,
};
