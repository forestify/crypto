const crypto = require("crypto");

function symmetricEncryption(message, key) {
  const randomIV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes256", key, randomIV);
  const encryptedMessage =
    cipher.update(message, "utf-8", "hex") + cipher.final("hex");
  return encryptedMessage;
}

function asymmetricEncryption() {
  return 1;
}

module.exports = { asymmetricEncryption, symmetricEncryption };
