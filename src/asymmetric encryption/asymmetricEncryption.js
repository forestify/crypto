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

function sign(message, privateKey, passPhrase) {
  const signer = crypto.createSign("rsa-sha256");
  signer.update(message);
  return signer.sign(
    {
      key: privateKey,
      passphrase: passPhrase,
    },
    "hex"
  );
}

function verifySign(message, publicKey, signature) {
  const verifier = crypto.createVerify("rsa-sha256");
  verifier.update(message);
  return verifier.verify(publicKey, signature, "hex");
}

module.exports = {
  encrypt,
  decrypt,
  sign,
  verifySign,
  genKeyPair,
};
