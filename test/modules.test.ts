import { methods } from "../index";

test("getTimestamp", async () => {
  const timestamp = await methods.getTimestamp();
  expect(typeof timestamp).toBe("number");
});

test("encryptMessage", async () => {
  const timestamp = await methods.getTimestamp();
  const encryptedMessage = await methods.encryptMessage("test", timestamp);
  expect(typeof encryptedMessage).toBe("string");
});

test("decryptMessage", async () => {
  const timestamp = await methods.getTimestamp();
  const encryptedMessage = await methods.encryptMessage("test", timestamp);
  const decryptedMessage = await methods.decryptMessage(encryptedMessage);
  expect(decryptedMessage).toBe("test");
});

test("isActive", async () => {
  const timestamp = await methods.getTimestamp();
  const encryptedMessage = await methods.encryptMessage("test", timestamp);
  const active = await methods.isActive(encryptedMessage);
  expect(active).toBe(true);
});

test("whenActive", async () => {
  const timestamp = await methods.getTimestamp();
  const encryptedMessage = await methods.encryptMessage("test", timestamp);
  const whenActive = await methods.whenActive(encryptedMessage);
  expect(whenActive).toBe(timestamp);
});
