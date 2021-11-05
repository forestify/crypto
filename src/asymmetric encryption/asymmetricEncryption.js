const crypto = require("crypto");

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

function encrypt(message, publicKey) {
  const messageBuffer = Buffer.from(message, "utf-8");
  const encryptedMessage = crypto.publicEncrypt(publicKey, messageBuffer);
  return encryptedMessage.toString("hex");
}

function decrypt(message, privateKey, passPhrase) {
  const messageBuffer = Buffer.from(message, "hex");
  const decryptedMessage = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: passPhrase,
    },
    messageBuffer
  );
  return decryptedMessage.toString();
}

module.exports = {
  encrypt,
  decrypt,
  genKeyPair,
};
