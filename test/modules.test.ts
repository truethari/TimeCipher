import timeciper from "../index";

test("getTimestamp", async () => {
  const timestamp = await timeciper.getTimestamp();
  expect(typeof timestamp).toBe("number");
});

test("encryptMessage", async () => {
  const timestamp = await timeciper.getTimestamp();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const encryptedMessage = await timeciper.encryptMessage("test", timestamp);
  expect(typeof encryptedMessage).toBe("string");
});

test("decryptMessage", async () => {
  const timestamp = await timeciper.getTimestamp();
  const encryptedMessage = await timeciper.encryptMessage("test", timestamp);
  const decryptedMessage = await timeciper.decryptMessage(encryptedMessage);
  expect(decryptedMessage).toBe("test");
});

test("isActive", async () => {
  const timestamp = await timeciper.getTimestamp();
  const encryptedMessage = await timeciper.encryptMessage("test", timestamp);
  const active = await timeciper.isActive(encryptedMessage);
  expect(active).toBe(true);
});

test("whenActive", async () => {
  const timestamp = await timeciper.getTimestamp();
  const encryptedMessage = await timeciper.encryptMessage("test", timestamp);
  const whenActive = await timeciper.whenActive(encryptedMessage);
  expect(whenActive).toBe(timestamp);
});
