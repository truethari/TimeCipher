"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1_0 = void 0;
exports.v1_0 = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        inputs: [{ internalType: "bytes", name: "encryptedMsg", type: "bytes" }],
        name: "decryptMessage",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "message", type: "string" },
            { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "encryptMessage",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTimestamp",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "encryptedMsg", type: "bytes" }],
        name: "isActive",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "encryptedMsg", type: "bytes" }],
        name: "whenActive",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];
