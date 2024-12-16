import { methods, defaultContractAddress, defaultABI } from "./src/ABI";
import type { IEthersError, IExtendedConfig } from "./src/types";
declare const getTimestamp: (_config?: IExtendedConfig) => Promise<number>, encryptMessage: (message: string, timestamp: number, _config?: IExtendedConfig) => Promise<any>, decryptMessage: (encryptedMessage: string, _config?: IExtendedConfig) => Promise<any>, isActive: (encryptedMsg: string, _config?: IExtendedConfig) => Promise<any>, whenActive: (encryptedMsg: string, _config?: IExtendedConfig) => Promise<number>;
export { methods as default, getTimestamp, encryptMessage, decryptMessage, isActive, whenActive, defaultABI, defaultContractAddress, type IEthersError, type IExtendedConfig, };
