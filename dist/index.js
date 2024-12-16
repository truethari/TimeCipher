"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContractAddress = exports.defaultABI = exports.whenActive = exports.isActive = exports.decryptMessage = exports.encryptMessage = exports.getTimestamp = exports.default = void 0;
const ABI_1 = require("./src/ABI");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return ABI_1.methods; } });
Object.defineProperty(exports, "defaultContractAddress", { enumerable: true, get: function () { return ABI_1.defaultContractAddress; } });
Object.defineProperty(exports, "defaultABI", { enumerable: true, get: function () { return ABI_1.defaultABI; } });
const { getTimestamp, encryptMessage, decryptMessage, isActive, whenActive } = ABI_1.methods;
exports.getTimestamp = getTimestamp;
exports.encryptMessage = encryptMessage;
exports.decryptMessage = decryptMessage;
exports.isActive = isActive;
exports.whenActive = whenActive;