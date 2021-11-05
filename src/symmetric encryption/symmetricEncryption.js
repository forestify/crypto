const crypto = require("crypto");

/*
    symmetric encryption:

    key - Must be 256 bits (32 bytes)
    iv - Must be 16 bytes for aes algorithm
*/

function encrypt(message, key) {
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

function decrypt(scrumbledMessage, key) {
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

module.exports = {
  encrypt,
  decrypt,
};
