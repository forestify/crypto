const {
  asymmetricEncryption,
  symmetricEncryption,
  symmetricDecryption,
  genKeyPair,
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

describe("func: genKeyPair", () => {
  it("should return private & public keys", () => {
    const passPhrase = crypto.randomBytes(32);
    const { publicKey, privateKey } = genKeyPair(passPhrase);
    globalDatabase["publicKey"] = publicKey;
    globalDatabase["privateKey"] = privateKey;
    expect(publicKey).not.toEqual(privateKey);
  });
});

describe("func: asymmetricEncryption", () => {
  it("should return encrypted message", () => {
    const publicKey = globalDatabase["publicKey"].toString();
    const message = "i love you";
    const encryptedData = asymmetricEncryption(message, publicKey);
    globalDatabase["encryptedData"] = encryptedData;
    expect(encryptedData).not.toBeUndefined;
  });
});
