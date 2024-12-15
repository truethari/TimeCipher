/**

████████╗██╗███╗   ███╗███████╗ ██████╗██╗██████╗ ██╗  ██╗███████╗██████╗     ██╗   ██╗ ██╗    ██████╗ 
╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝██║██╔══██╗██║  ██║██╔════╝██╔══██╗    ██║   ██║███║   ██╔═████╗
   ██║   ██║██╔████╔██║█████╗  ██║     ██║██████╔╝███████║█████╗  ██████╔╝    ██║   ██║╚██║   ██║██╔██║
   ██║   ██║██║╚██╔╝██║██╔══╝  ██║     ██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗    ╚██╗ ██╔╝ ██║   ████╔╝██║
   ██║   ██║██║ ╚═╝ ██║███████╗╚██████╗██║██║     ██║  ██║███████╗██║  ██║     ╚████╔╝  ██║██╗╚██████╔╝
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚═╝╚═╝ ╚═════╝ 

Github: https://github.com/truethari/TimeCipher

**/

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract TimeCipher {
    bytes32 private secret_key;

    struct Wallet {
        address pubAddress;
        bytes32 privateKey;
    }

    constructor() {
        secret_key = generateSecureWallet().privateKey;
    }

    // ====================================== methods ======================================
    function encryptMessage(string memory message, uint256 timestamp) public view returns (bytes memory) {
        string memory messageWithTimestamp = string(abi.encodePacked(message, ":::"));
        messageWithTimestamp = string(abi.encodePacked(messageWithTimestamp, uintToString(timestamp)));
                bytes memory msgBytes = bytes(messageWithTimestamp);
        
        bytes memory encryptedMsg = new bytes(msgBytes.length);
        
        for (uint i = 0; i < msgBytes.length; i++) {
            encryptedMsg[i] = bytes1(uint8(msgBytes[i]) ^ uint8(secret_key[i % 32]));
        }

        return encryptedMsg;
    }

    function decryptMessage(bytes memory encryptedMsg) public view returns (string memory) {
        bytes memory decryptedMsg = new bytes(encryptedMsg.length);
        
        for (uint i = 0; i < encryptedMsg.length; i++) {
            decryptedMsg[i] = bytes1(uint8(encryptedMsg[i]) ^ uint8(secret_key[i % 32]));
        }
        
        string memory combinedMessage = string(decryptedMsg);
        (string memory originalMessage, uint256 userTimestamp) = splitMessageAndTimestamp(combinedMessage);
        
        require(block.timestamp >= userTimestamp, "Decryption not allowed yet.");
        return originalMessage;
    }

    function isActive(bytes memory encryptedMsg) public view returns (bool) {
        bytes memory decryptedMsg = new bytes(encryptedMsg.length);
        
        for (uint i = 0; i < encryptedMsg.length; i++) {
            decryptedMsg[i] = bytes1(uint8(encryptedMsg[i]) ^ uint8(secret_key[i % 32]));
        }
        
        string memory combinedMessage = string(decryptedMsg);
        (, uint256 userTimestamp) = splitMessageAndTimestamp(combinedMessage);

        return block.timestamp >= userTimestamp;
    }

    function whenActive(bytes memory encryptedMsg) public view returns (uint256) {
        bytes memory decryptedMsg = new bytes(encryptedMsg.length);
        
        for (uint i = 0; i < encryptedMsg.length; i++) {
            decryptedMsg[i] = bytes1(uint8(encryptedMsg[i]) ^ uint8(secret_key[i % 32]));
        }
        
        string memory combinedMessage = string(decryptedMsg);
        (, uint256 userTimestamp) = splitMessageAndTimestamp(combinedMessage);
        
        return userTimestamp;
    }

    function getTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    // ======================================= utils =======================================
    function generateSecureWallet() internal view returns (Wallet memory) {
        bytes32 seed = keccak256(abi.encodePacked(
            block.timestamp,      // Current timestamp
            block.prevrandao,     // Previous block's randomness
            block.number,         // Block number
            msg.sender,           // Caller's address
            gasleft(),            // Remaining gas
            blockhash(block.number - 1),  // Previous block's hash
            tx.origin,      // Additional entropy
            address(this)   // Contract's own address adds uniqueness
        ));

        bytes32 privateKey = keccak256(abi.encodePacked(seed, block.timestamp));
        address pubAddress = deriveAddressFromPrivateKey(privateKey);

        return Wallet({
            pubAddress: pubAddress,
            privateKey: privateKey
        });
    }

    function toHex(bytes32 data) internal pure returns (string memory) {
        bytes memory hexChars = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint256 i = 0; i < 32; i++) {
            str[i * 2] = hexChars[uint8(data[i] >> 4)];
            str[1 + i * 2] = hexChars[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }

    function deriveAddressFromPrivateKey(bytes32 privateKey) internal pure returns (address) {
        return address(uint160(uint256(keccak256(abi.encodePacked(privateKey)))));
    }

    function retrieveSecretKey() private view returns (string memory) {
        return toHex(secret_key);
    }

    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function splitMessageAndTimestamp(string memory combinedMessage) internal pure returns (string memory, uint256) {
        bytes memory combinedBytes = bytes(combinedMessage);
        uint256 delimiterIndex;
        for (uint256 i = 0; i < combinedBytes.length - 2; i++) {
            if (
                combinedBytes[i] == ":" &&
                combinedBytes[i + 1] == ":" &&
                combinedBytes[i + 2] == ":"
            ) {
                delimiterIndex = i;
                break;
            }
        }
        
        // Extract the original message and timestamp
        bytes memory messageBytes = new bytes(delimiterIndex);
        for (uint256 i = 0; i < delimiterIndex; i++) {
            messageBytes[i] = combinedBytes[i];
        }
        
        bytes memory timestampBytes = new bytes(combinedBytes.length - delimiterIndex - 3);
        for (uint256 i = 0; i < timestampBytes.length; i++) {
            timestampBytes[i] = combinedBytes[delimiterIndex + 3 + i];
        }
        
        return (string(messageBytes), stringToUint(string(timestampBytes)));
    }

    function stringToUint(string memory s) internal pure returns (uint256) {
        bytes memory b = bytes(s);
        uint256 result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
                result = result * 10 + (uint8(b[i]) - 48);
            }
        }
        return result;
    }
} 
