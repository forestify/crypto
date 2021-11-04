const crypto = require("crypto");

// create random salt
function generateRandomSalt(length) {
  return crypto.randomBytes(length / 2).toString("hex");
}

// create a hash
function hash(data) {
  return crypto
    .createHash("sha512")
    .update(data)
    .digest("hex");
}

module.exports = {
  hash,
  generateRandomSalt
};
