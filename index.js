const {
  encrypt: asymmetricEncryption,
  decrypt: asymmetricDecryption,
  sign,
  verifySign,
  genKeyPair,
} = require("./src/asymmetric encryption");
const {
  verifyHash,
  hashWithCostFactor,
  hashWithSalt,
  hash,
  generateRandomSalt,
  generateHmac,
} = require("./src/hash");
const {
  encrypt: symmetricEncryption,
  decrypt: symmetricDecryption,
} = require("./src/symmetric encryption");

module.exports = {
  asymmetricEncryption,
  asymmetricDecryption,
  sign,
  verifySign,
  genKeyPair,
  verifyHash,
  hashWithCostFactor,
  hashWithSalt,
  hash,
  generateRandomSalt,
  generateHmac,
  symmetricEncryption,
  symmetricDecryption,
};
