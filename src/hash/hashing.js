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

// create hash with salt
function hashWithSalt(data, salt) {
  data = salt + data;
  return crypto
    .createHash("sha512")
    .update(data)
    .digest("hex");
}

// create a hash with cost factor
function hashWithCostFactor(data, salt, cost) {
  const costFactor = cost;
  while (cost >= 1) {
    data = salt + data;
    data = crypto
      .createHash("sha512")
      .update(data)
      .digest("hex");
    cost--;
  }
  return `$${costFactor}$${salt}$${data}`;
}

// verfiy a hash
function verifyHash(data, hash) {
  const [rest, costFactor, salt, hashedData] = hash.split("$");
  const expectedHash = hashWithCostFactor(data, salt, costFactor);
  return expectedHash == hash;
}

module.exports = {
  verifyHash,
  hashWithCostFactor,
  hashWithSalt,
  hash,
  generateRandomSalt
};
