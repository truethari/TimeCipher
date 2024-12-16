import type { IExtendedConfig } from "../types";
export declare const defaultABI: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
})[];
export declare const defaultContractAddress: string;
export declare const methods: {
    getTimestamp: (_config?: IExtendedConfig) => Promise<number>;
    encryptMessage: (message: string, timestamp: number, _config?: IExtendedConfig) => Promise<any>;
    decryptMessage: (encryptedMessage: string, _config?: IExtendedConfig) => Promise<any>;
    isActive: (encryptedMsg: string, _config?: IExtendedConfig) => Promise<any>;
    whenActive: (encryptedMsg: string, _config?: IExtendedConfig) => Promise<number>;
};
