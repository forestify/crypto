const {
  encrypt,
  decrypt,
  sign,
  verifySign,
  genKeyPair,
} = require("./asymmetricEncryption");
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

describe("func: sign", () => {
  it("should sign the message", () => {
    const privateKey = globalDatabase["privateKey"].toString();
    const passPhrase = globalDatabase["passPhrase"];
    const message = "its authentic yaar, believe me!";
    const signature = sign(message, privateKey, passPhrase);
    globalDatabase["signature"] = signature;
    expect(signature).not.toBeUndefined();
  });
});

describe("func: verifySign", () => {
  it("should verify the signature and return true", () => {
    const message = "its authentic yaar, believe me!";
    const publicKey = globalDatabase["publicKey"].toString();
    const signature = globalDatabase["signature"];
    const validSignature = verifySign(message, publicKey, signature);
    expect(validSignature).toEqual(true);
  });

  it("should  return false when signature is modified", () => {
    const message = "its authentic yaar";
    const publicKey = globalDatabase["publicKey"].toString();
    // tampering the signature
    const signature = globalDatabase["signature"] + "&y";
    const validSignature = verifySign(message, publicKey, signature);
    expect(validSignature).toEqual(false);
  });

  it("should  return false when public key is invalid", () => {
    const message = "its authentic yaar";
    // tampering the publicKey
    const publicKey = globalDatabase["publicKey"].toString() + "&y";
    const signature = globalDatabase["signature"];
    const validSignature = verifySign(message, publicKey, signature);
    expect(validSignature).toEqual(false);
  });
});
