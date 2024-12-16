"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.defaultContractAddress = exports.defaultABI = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("./abi");
const config_1 = __importDefault(require("../config"));
const abi = [abi_1.v1_0];
exports.defaultABI = abi[0];
exports.defaultContractAddress = config_1.default.CONTRACT_ADDRESS;
const defaults = {
    provider: new ethers_1.ethers.JsonRpcProvider(config_1.default.RPC_URL),
    contractAddress: config_1.default.CONTRACT_ADDRESS,
    rpcUrl: config_1.default.RPC_URL,
    abi: abi[0],
};
const getDefaults = (_config) => ({
    provider: _config.provider || new ethers_1.ethers.JsonRpcProvider(_config.rpcUrl || config_1.default.RPC_URL),
    contractAddress: _config.contractAddress || config_1.default.CONTRACT_ADDRESS,
    rpcUrl: _config.rpcUrl || config_1.default.RPC_URL,
    abi: _config.abi || abi[0],
});
exports.methods = {
    getTimestamp: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (_config = defaults) {
        const { provider, contractAddress, abi } = getDefaults(_config);
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
        const timestamp = yield contract.getTimestamp();
        return Number(timestamp);
    }),
    encryptMessage: (message_1, timestamp_1, ...args_1) => __awaiter(void 0, [message_1, timestamp_1, ...args_1], void 0, function* (message, timestamp, _config = defaults) {
        const { provider, contractAddress, abi } = getDefaults(_config);
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
        return yield contract.encryptMessage(message, timestamp);
    }),
    decryptMessage: (encryptedMessage_1, ...args_1) => __awaiter(void 0, [encryptedMessage_1, ...args_1], void 0, function* (encryptedMessage, _config = defaults) {
        var _a, _b;
        try {
            const { provider, contractAddress, abi } = getDefaults(_config);
            const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
            return yield contract.decryptMessage(encryptedMessage);
        }
        catch (error) {
            if (((_b = (_a = error === null || error === void 0 ? void 0 : error.revert) === null || _a === void 0 ? void 0 : _a.args) === null || _b === void 0 ? void 0 : _b.length) > 0)
                throw new Error(error.revert.args[0]);
            throw new Error(error.message);
        }
    }),
    isActive: (encryptedMsg_1, ...args_1) => __awaiter(void 0, [encryptedMsg_1, ...args_1], void 0, function* (encryptedMsg, _config = defaults) {
        const { provider, contractAddress, abi } = getDefaults(_config);
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
        return yield contract.isActive(encryptedMsg);
    }),
    whenActive: (encryptedMsg_1, ...args_1) => __awaiter(void 0, [encryptedMsg_1, ...args_1], void 0, function* (encryptedMsg, _config = defaults) {
        const { provider, contractAddress, abi } = getDefaults(_config);
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
        const timestamp = yield contract.whenActive(encryptedMsg);
        return Number(timestamp);
    }),
};
