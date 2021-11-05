const crypto = require("crypto");
const util = require("util");

/*
    symmetric encryption:

    key - Must be 256 bits (32 bytes)
    iv - Must be 16 bytes for aes algorithm
*/

function symmetricEncryption(message, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes256", key, iv);
  const encryptedMessage = Buffer.concat([
    cipher.update(message),
    cipher.final(),
  ]);

  // storing iv along with cipher text using : as deliminator
  // format - iv:ciphertext

  return `${iv.toString("hex")}:${encryptedMessage.toString("hex")}`;
}

function symmetricDecryption(scrumbledMessage, key) {
  let [iv, cipherText] = scrumbledMessage.split(":");
  iv = Buffer.from(iv, "hex");
  cipherText = Buffer.from(cipherText, "hex");
  const decipher = crypto.createDecipheriv("aes256", key, iv);
  const decryptedMessage = Buffer.concat([
    decipher.update(cipherText),
    decipher.final(),
  ]);
  return decryptedMessage.toString();
}

function genKeyPair(passPhrase) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passPhrase,
    },
  });
  return { publicKey, privateKey };
}

function asymmetricEncryption(message, publicKey) {
  const messageBuffer = Buffer.from(message, "utf-8");
  const encryptedMessage = crypto.publicEncrypt(publicKey, messageBuffer);
  return encryptedMessage.toString("hex");
}

module.exports = {
  asymmetricEncryption,
  symmetricEncryption,
  symmetricDecryption,
  genKeyPair,
};
