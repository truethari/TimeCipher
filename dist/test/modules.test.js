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
const index_1 = __importDefault(require("../index"));
test("getTimestamp", () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield index_1.default.getTimestamp();
    expect(typeof timestamp).toBe("number");
}));
test("encryptMessage", () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield index_1.default.getTimestamp();
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    const encryptedMessage = yield index_1.default.encryptMessage("test", timestamp);
    expect(typeof encryptedMessage).toBe("string");
}));
test("decryptMessage", () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield index_1.default.getTimestamp();
    const encryptedMessage = yield index_1.default.encryptMessage("test", timestamp);
    const decryptedMessage = yield index_1.default.decryptMessage(encryptedMessage);
    expect(decryptedMessage).toBe("test");
}));
test("isActive", () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield index_1.default.getTimestamp();
    const encryptedMessage = yield index_1.default.encryptMessage("test", timestamp);
    const active = yield index_1.default.isActive(encryptedMessage);
    expect(active).toBe(true);
}));
test("whenActive", () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield index_1.default.getTimestamp();
    const encryptedMessage = yield index_1.default.encryptMessage("test", timestamp);
    const whenActive = yield index_1.default.whenActive(encryptedMessage);
    expect(whenActive).toBe(timestamp);
}));
