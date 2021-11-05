const {
  verifyHash,
  hashWithCostFactor,
  hashWithSalt,
  hash,
  generateRandomSalt,
  generateHmac,
} = require("./hashing.js");

const globalDatabase = {};

describe("function: generateRandomSalt", () => {
  it("should generate salt with requested length", () => {
    const saltLength = 16;
    const randomSalt1 = generateRandomSalt(saltLength);
    expect(randomSalt1.length).toEqual(saltLength);
  });

  it("should generate random salts", () => {
    const saltLength = 16;
    const randomSalt1 = generateRandomSalt(saltLength);
    const randomSalt2 = generateRandomSalt(saltLength);
    expect(randomSalt1).not.toEqual(randomSalt2);
  });
});

describe("function: hash", () => {
  it("should generate hash using sha256", () => {
    const data = "hello world";
    const hashedData = hash(data);
    expect(hashedData).not.toBeNull;
  });

  it("should return hash of length 128", () => {
    const data = "hello world";
    const hashedData = hash(data);
    expect(hashedData.length).toEqual(128);
  });
});

describe("function: hashWithSalt", () => {
  it("should generate hash with adding salt to it", () => {
    const data = "hello world";
    const salt = generateRandomSalt(16);
    const hashedData = hashWithSalt(data, salt);
    const hashedDataWithOutSalt = hash(data);
    expect(hashedData).not.toEqual(hashedDataWithOutSalt);
  });

  it("should return hash of length 128", () => {
    const data = "hello world";
    const salt = generateRandomSalt(16);
    const hashedData = hashWithSalt(data, salt);
    expect(hashedData.length).toEqual(128);
  });
});

describe("function: hashWithCostFactor", () => {
  it("should generate hash with adding salt and given cost factor", () => {
    const data = "hello world";
    const salt = generateRandomSalt(16);
    const costFactor = 12;
    const hashedData = hashWithCostFactor(data, salt, costFactor);
    const hashedDataWithOutSaltRounds = hashWithSalt(data, salt);
    globalDatabase["data"] = data;
    globalDatabase["hash"] = hashedData;
    expect(hashedData).not.toEqual(hashedDataWithOutSaltRounds);
  });

  it("should return hash of length 128", () => {
    const data = "hello world";
    const salt = generateRandomSalt(16);
    const hashedData = hashWithSalt(data, salt);
    expect(hashedData.length).toEqual(128);
  });
});

describe("function: verifyHash", () => {
  it("should return true", () => {
    const data = globalDatabase["data"];
    const hash = globalDatabase["hash"];
    expect(verifyHash(data, hash)).toBe(true);
  });
  it("should return false", () => {
    const data = "helloworld!";
    const hash = globalDatabase["hash"];
    expect(verifyHash(data, hash)).toBe(false);
  });
});

describe("function: generateHmac", () => {
  it("should return hash based on keys", () => {
    const key1 = "secret";
    const key2 = "supersecret";
    const message = "hello world";
    const hmac1 = generateHmac(message, key1);
    const hmac2 = generateHmac(message, key2);
    expect(hmac1).not.toEqual(hmac2);
  });
});
