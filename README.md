# TimeCipher

TimeCipher is a blockchain-based time-locked messaging system that securely encrypts messages with a timestamp, ensuring they can only be decrypted after the specified time. This innovative solution combines privacy and delayed access, perfect for secure future communication.

### Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Types](#types)
- [License](#license)

## Installation

Install the library using npm or yarn or bun:

```bash
npm install timecipher
```

or

```bash
yarn install timecipher
```

or

```bash
bun install timecipher
```

## Features

- Encrypt and decrypt messages using the contract's logic.
- Check the active status of an encrypted message.
- Get the activation timestamp of an encrypted message.
- Retrieve timestamps from the smart contract.

## Usage

First, import the necessary methods from the library:

```javascript
import { getTimestamp, encryptMessage, decryptMessage, isActive, whenActive } from "timecipher";
```

Example: Encrypting a message

```javascript
const message = "Hello, World!";
const timestamp = Math.floor(Date.now() / 1000);

const encryptedMessage = await encryptMessage(message, timestamp);
console.log("Encrypted Message:", encryptedMessage);
```

Example: Decrypting a message

```javascript
const decryptedMessage = await decryptMessage(encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);
```

Example: Checking if a message is active

```javascript
const active = await isActive(encryptedMessage);
console.log("Is Active:", active);
```

Example: Getting the activation timestamp

```javascript
const activationTimestamp = await whenActive(encryptedMessage);
console.log("Activation Timestamp:", activationTimestamp);
```

Example: Retrieving the current timestamp

```javascript
const timestamp = await getTimestamp();
console.log("Current Timestamp:", timestamp);
```

## API Documentation

`decryptMessage(encryptedMessage: string, _config?: IExtendedConfig): Promise<string>`

Decrypts an encrypted message using the smart contract.

**Parameters:**

- encryptedMessage: The encrypted message to decrypt.
- `_config` (optional): An object to override default configuration.

**Returns:**

- A promise that resolves to the decrypted message as a string.

---

`isActive(encryptedMsg: string, _config?: IExtendedConfig): Promise<boolean>`

Checks if a message is active in the smart contract.

**Parameters:**

- encryptedMsg: The encrypted message to check.
- `_config` (optional): An object to override default configuration.

**Returns:**

- A promise that resolves to a boolean indicating if the message is active.

---

`whenActive(encryptedMsg: string, _config?: IExtendedConfig): Promise<number>`

Gets the activation timestamp of an encrypted message.

**Parameters:**

- encryptedMsg: The encrypted message to check.
- `_config` (optional): An object to override default configuration.

**Returns:**

- A promise that resolves to the activation timestamp as a number.

---

`getTimestamp(_config?: IExtendedConfig): Promise<number>`

Retrieves the current timestamp from the smart contract.

**Parameters:**

- `_config` (optional): An object to override default configuration.

**Returns:**

- A promise that resolves to the current timestamp as a number.

## Types

```typescript
interface IExtendedConfig {
  provider?: ethers.JsonRpcProvider;
  contractAddress?: string;
  rpcUrl?: string;
  abi?: any;
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
