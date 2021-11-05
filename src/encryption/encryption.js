const crypto = require("crypto");

function symmetricEncryption(message, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes256", key, iv);
  const encryptedMessage = Buffer.concat([
    cipher.update(message),
    cipher.final(),
  ]);
  return `${iv.toString("hex")}:${encryptedMessage.toString("hex")}`;
}

function symmetricDecryption(cipherText, key) {
  let [iv, cipher] = cipherText.split(":");
  iv = Buffer.from(iv, "hex");
  cipher = Buffer.from(cipher, "hex");
  const decipher = crypto.createDecipheriv("aes256", key, iv);
  const decryptedMessage = Buffer.concat([
    decipher.update(cipher),
    decipher.final(),
  ]);
  return decryptedMessage.toString();
}

function asymmetricEncryption() {
  return 1;
}

module.exports = {
  asymmetricEncryption,
  symmetricEncryption,
  symmetricDecryption,
};
