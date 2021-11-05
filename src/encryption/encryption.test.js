const {
  asymmetricEncryption,
  symmetricEncryption,
  symmetricDecryption,
} = require("./encryption");
const crypto = require("crypto");
const globalDatabase = {};

describe("func: symmetricEncryption", () => {
  it("should return encrypted cipher", () => {
    const key = crypto.randomBytes(32);
    const message = "you know what!";
    const cipherText = symmetricEncryption(message, key);
    globalDatabase["cipherText"] = cipherText;
    expect(cipherText.length).toBeGreaterThan(31);
  });

  it("should not create same cipher text for same input message", () => {
    const key = crypto.randomBytes(32);
    const message = "you know what!";
    const cipherText = symmetricEncryption(message, key);
    expect(globalDatabase["cipherText"]).not.toEqual(cipherText);
  });
});

describe("func: symmetricDecryption", () => {
  it("should return encrypted cipher", () => {
    const key = crypto.randomBytes(32);
    const message = "you know what!";
    const cipherText = symmetricEncryption(message, key);
    globalDatabase["message"] = message;
    globalDatabase["key"] = key.toString("hex");
    globalDatabase["cipherText"] = cipherText;
    expect(cipherText.length).toBeGreaterThan(31);
  });

  it("should not create same cipher text for same input message", () => {
    const key = crypto.randomBytes(32);
    const message = "you know what!";
    const cipherText = symmetricEncryption(message, key);
    expect(globalDatabase["cipherText"]).not.toEqual(cipherText);
  });
});

describe("func: symmetricDecryption", () => {
  it("should return message", () => {
    const key = Buffer.from(globalDatabase["key"], "hex");
    const cipherText = globalDatabase["cipherText"];
    const decryptedMessage = symmetricDecryption(cipherText, key);
    expect(decryptedMessage.toString()).toEqual(globalDatabase["message"]);
  });
});

describe("func: asymmetricEncryption", () => {
  it("should return something", () => {
    expect(asymmetricEncryption()).toBe(1);
  });
});
