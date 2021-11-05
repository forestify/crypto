const { encrypt, decrypt, genKeyPair } = require("./asymmetricEncryption");
const crypto = require("crypto");
const globalDatabase = {};

describe("func: genKeyPair", () => {
  it("should return private & public keys", () => {
    const passPhrase = crypto.randomBytes(32).toString();
    globalDatabase["passPhrase"] = passPhrase;
    const { publicKey, privateKey } = genKeyPair(passPhrase);
    globalDatabase["publicKey"] = publicKey;
    globalDatabase["privateKey"] = privateKey;
    expect(publicKey).not.toEqual(privateKey);
  });
});

describe("func: encrypt", () => {
  it("should return encrypted message", () => {
    const publicKey = globalDatabase["publicKey"].toString();
    const message = "i love you";
    const encryptedData = encrypt(message, publicKey);
    globalDatabase["encryptedData"] = encryptedData;
    expect(encryptedData).not.toBeUndefined;
  });
});

describe("func: decrypt", () => {
  it("should return decrypted message", () => {
    const privateKey = globalDatabase["privateKey"].toString();
    const encryptedMessage = globalDatabase["encryptedData"];
    const passPhrase = globalDatabase["passPhrase"];
    const decryptedMessage = decrypt(encryptedMessage, privateKey, passPhrase);
    expect(decryptedMessage).toEqual("i love you");
  });
});
